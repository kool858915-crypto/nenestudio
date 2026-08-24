/**
 * 広告バナーが「画像として」表示されるかを実ブラウザで確認する。
 * 過去に、画像が読めず文字カードに落ちる不具合があったため毎回確かめる。
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const shotDir = path.join(root, "scripts", "_shots");
fs.mkdirSync(shotDir, { recursive: true });
const BASE = "http://localhost:8787";

const results = [];
const check = (ok, label, detail) => {
  results.push({ ok: Boolean(ok), label });
  console.log(`${ok ? "OK " : "NG "} ${label}${detail ? "  → " + detail : ""}`);
};

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
const blocked = [];
const cspErrors = [];
page.on("requestfailed", (r) => { if (r.url().includes("a8.net")) blocked.push(`${r.failure()?.errorText} ${r.url().slice(0, 60)}`); });
page.on("console", (m) => { if (/Content Security Policy|Refused to/i.test(m.text())) cspErrors.push(m.text()); });

await page.goto(`${BASE}/index.html`, { waitUntil: "networkidle" });

/* ---- 設定が読めているか ---- */
const config = await page.evaluate(() => {
  const list = window.NENE_ADS?.a8?.banners || [];
  return {
    enabled: window.NENE_ADS?.enabled,
    count: list.length,
    names: list.map((b) => b.alt),
    noEmptyName: list.every((b) => String(b.alt || "").trim().length > 0),
    allHavePixel: list.every((b) => String(b.pixelUrl || "").trim().length > 0),
  };
});
check(config.enabled === true, "広告が有効になっている");
check(config.count === 4, `バナーが${config.count}件登録されている`, config.names.join(" / "));
check(!config.names.includes("ムームードメイン"), "ドメイン系の広告が残っていない");
check(
  ["ココナラ", "3D Phantom", "CLOUD PHONE", "ホームページDX"].every((name) => config.names.includes(name)),
  "差し替えた4件が入っている",
);
check(new Set(config.names).size === config.names.length, "広告主名の重複がない");
check(config.noEmptyName, "すべてのバナーに広告主名が入っている");
check(config.allHavePixel, "すべてのバナーに計測用画像がある");

const waits = await page.evaluate(() => {
  const allowed = [5, 15, 30];
  const seen = [];
  for (let i = 0; i < 40; i += 1) seen.push(window.NeneAds.getWaitSeconds());
  return {
    allowed: seen.every((n) => allowed.includes(n)),
    kinds: [...new Set(seen)].sort((a, b) => a - b),
    samples: seen.slice(0, 8),
  };
});
check(waits.allowed, "待ち時間は 5 / 15 / 30 秒のいずれか", waits.samples.join(", "));
check(waits.kinds.length >= 2, "待ち時間が毎回同じではない", waits.kinds.join(" / "));

/* ---- 両方の画像が実際に読み込めるか ---- */
for (const name of config.names) {
  const loaded = await page.evaluate(async (targetName) => {
    const banner = window.NENE_ADS.a8.banners.find((b) => b.alt === targetName);
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve({ ok: img.naturalWidth > 1, w: img.naturalWidth, h: img.naturalHeight });
      img.onerror = () => resolve({ ok: false, w: 0, h: 0 });
      setTimeout(() => resolve({ ok: false, w: 0, h: 0, timeout: true }), 8000);
      img.src = banner.imageUrl;
    });
  }, name);
  check(loaded.ok, `「${name}」のバナー画像が読み込める`, `${loaded.w}x${loaded.h}${loaded.timeout ? " (時間切れ)" : ""}`);
}

/* ---- 1件ずつ強制表示して、すべてが「画像」で出るか確かめる ---- */
const perBanner = await page.evaluate(async () => {
  const slot = document.querySelector("#ad-slot") || (() => {
    const el = document.createElement("div");
    el.className = "ad-slot";
    document.body.appendChild(el);
    return el;
  })();
  const all = window.NENE_ADS.a8.banners;
  const out = [];
  for (const banner of all) {
    window.NENE_ADS.a8.banners = [banner];
    await window.NeneAds.loadSlot(slot);
    const img = slot.querySelector("img.ad-banner-image");
    const textCard = slot.querySelector(".ad-affiliate-text");
    const wrap = slot.querySelector(".ad-banner-wrap");
    out.push({
      name: banner.alt,
      isImage: Boolean(img),
      isText: Boolean(textCard),
      pixels: img ? `${img.naturalWidth}x${img.naturalHeight}` : "",
      ratio: wrap ? wrap.style.getPropertyValue("--ad-aspect-ratio").trim() : "",
      label: window.NeneAds.getLastBannerName(),
    });
  }
  window.NENE_ADS.a8.banners = all;
  return out;
});

for (const item of perBanner) {
  check(item.isImage && !item.isText, `「${item.name}」が画像として表示される`, `${item.pixels} / 比 ${item.ratio}`);
  check(item.label === item.name, `「${item.name}」の広告主名が正しく記録される`, item.label);
}

/* ---- ランダム表示でも文字カードに落ちないか ---- */
const randomRuns = await page.evaluate(async () => {
  const slot = document.querySelector("#ad-slot");
  const seen = [];
  for (let i = 0; i < 15; i += 1) {
    await window.NeneAds.loadSlot(slot);
    seen.push({
      isImage: Boolean(slot.querySelector("img.ad-banner-image")),
      name: window.NeneAds.getLastBannerName(),
    });
  }
  return seen;
});
check(randomRuns.every((r) => r.isImage), "15回続けて画像で表示された（文字カードに落ちない）");
console.log(`   内訳: ${[...new Set(randomRuns.map((r) => r.name))].join(" / ")}`);

/* ---- 通信がブロックされていないか ---- */
check(blocked.length === 0, "a8.net への通信がブロックされていない", blocked.join(" / "));
check(cspErrors.length === 0, "セキュリティ設定に弾かれていない", cspErrors.slice(0, 2).join(" / "));

/* ---- 縦長・正方形の広告でも画面が破綻しないか（スマホ幅で1件ずつ） ---- */
await page.setViewportSize({ width: 390, height: 760 });
const layout = await page.evaluate(async () => {
  const all = window.NENE_ADS.a8.banners;
  const overlay = document.querySelector("#ad-overlay");
  overlay.hidden = false;
  overlay.classList.add("active");
  const slot = document.querySelector("#ad-slot");
  const continueBtn = document.querySelector("#ad-continue");
  continueBtn.hidden = false;
  continueBtn.disabled = false;
  const out = [];
  for (const banner of all) {
    window.NENE_ADS.a8.banners = [banner];
    await window.NeneAds.loadSlot(slot);
    const card = document.querySelector("#ad-overlay .ad-card") || overlay;
    const img = slot.querySelector("img.ad-banner-image");
    const imgBox = img.getBoundingClientRect();
    const cardBox = card.getBoundingClientRect();
    const btnBox = continueBtn.getBoundingClientRect();
    const ratio = (Number(banner.width) || 1) / (Number(banner.height) || 1);
    out.push({
      name: banner.alt,
      imgWidth: Math.round(imgBox.width),
      imgHeight: Math.round(imgBox.height),
      isWide: ratio >= 2.5,
      overflowX: Math.round(Math.max(0, imgBox.right - cardBox.right, cardBox.left - imgBox.left)),
      buttonInView: btnBox.top >= 0 && btnBox.bottom <= window.innerHeight,
      buttonBottom: Math.round(btnBox.bottom),
      viewportHeight: window.innerHeight,
    });
  }
  window.NENE_ADS.a8.banners = all;
  return out;
});

for (const item of layout) {
  check(item.overflowX === 0, `「${item.name}」が横にはみ出さない`, `${item.overflowX}px`);
  check(
    item.buttonInView,
    `「${item.name}」でも「続ける」がスマホ画面に収まる`,
    `画像の高さ ${item.imgHeight}px / ボタン下端 ${item.buttonBottom}px / 画面 ${item.viewportHeight}px`,
  );
  const minWidth = item.isWide ? 300 : 240;
  check(
    item.imgWidth >= minWidth,
    `「${item.name}」が小さすぎない`,
    `${item.imgWidth}x${item.imgHeight}`,
  );
}
await page.setViewportSize({ width: 1024, height: 768 });

/* ---- 公開ボタンを押す前は広告が出ず、押したあとに全画面で出るか ---- */
await page.evaluate(() => {
  const overlay = document.querySelector("#ad-overlay");
  if (overlay) overlay.hidden = true;
  if (typeof activateScreen === "function") activateScreen("export");
});
const beforeClick = await page.evaluate(() => ({
  sponsorHidden: document.querySelector("#export-sponsor")?.hidden !== false,
  overlayHidden: document.querySelector("#ad-overlay")?.hidden !== false,
  hasPublish: Boolean(document.querySelector("#publish-tool")),
}));
check(beforeClick.hasPublish, "公開URLボタンがある");
check(beforeClick.sponsorHidden, "公開前はボタン前の広告が出ない");
check(beforeClick.overlayHidden, "公開前は全画面広告が出ない");

await page.evaluate(() => {
  showAdBeforeOutput(() => {});
});
await page.waitForTimeout(800);
const afterClick = await page.evaluate(() => {
  const overlay = document.querySelector("#ad-overlay");
  const img = overlay?.querySelector("img.ad-banner-image");
  return {
    overlayVisible: overlay && !overlay.hidden,
    isImage: Boolean(img && img.getClientRects().length),
    name: window.NeneAds.getLastBannerName?.() || "",
  };
});
check(afterClick.overlayVisible, "公開ボタンのあとに全画面広告が出る");
check(afterClick.isImage, "その広告が画像で出る", afterClick.name);
const hasLaunch = await page.evaluate(() => Boolean(document.querySelector("#ad-launch")));
check(hasLaunch, "広告のあとに「ツールを起動する」ボタンがある");
const hasPublishUrl = await page.evaluate(() => Boolean(document.querySelector("#ad-publish-url")));
check(!hasPublishUrl, "広告の下に公開URLを置いていない");
await page.locator("#ad-overlay .ad-box, #ad-overlay").first()
  .screenshot({ path: path.join(shotDir, "32-export-ad.png") }).catch(() => {});

/* ---- 実際にユーザーが見る広告画面で確認する ---- */
const overlay = await page.evaluate(async () => {
  const el = document.querySelector("#ad-overlay");
  if (!el) return null;
  el.hidden = false;
  el.classList.add("active");
  const slot = document.querySelector("#ad-slot");
  const label = document.querySelector("#ad-label");
  await window.NeneAds.loadSlot(slot);
  const name = window.NeneAds.getLastBannerName?.() || "";
  if (label) label.textContent = name ? `スポンサー（${name}）` : "スポンサー";
  const img = slot.querySelector("img.ad-banner-image");
  return {
    labelText: label ? label.textContent : "",
    shownAlt: img ? img.alt : "",
    visible: Boolean(img && img.getClientRects().length),
  };
});
check(Boolean(overlay), "広告画面が存在する");
if (overlay) {
  check(overlay.visible, "広告画面でバナーが見える状態になっている");
  check(
    overlay.labelText.includes(overlay.shownAlt),
    "ラベルと表示中の広告主が一致している",
    `ラベル「${overlay.labelText}」/ 表示「${overlay.shownAlt}」`,
  );
}
await page.waitForTimeout(1200);
const shot = path.join(shotDir, "30-ads.png");
await page.locator("#ad-overlay .ad-card, #ad-overlay").first().screenshot({ path: shot })
  .catch(() => page.screenshot({ path: shot }));
console.log(`\nスクリーンショット: ${shot}`);

await browser.close();
const ng = results.filter((r) => !r.ok);
console.log(`\n合計 ${results.length} 項目 / 合格 ${results.length - ng.length} / 不合格 ${ng.length}`);
if (ng.length) {
  console.log("不合格:", ng.map((r) => r.label).join(", "));
  process.exit(1);
}
console.log("PASS");
