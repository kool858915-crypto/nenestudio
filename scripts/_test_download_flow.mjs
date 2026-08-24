/**
 * 「公開URLを発行 → HTMLで保存 → ダブルクリックで開く」が
 * 実際に最後まで動くかを、画面のボタンを押して確認する。
 */
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import http from "node:http";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright";

const BASE = "http://localhost:8787";
const checks = [];
const check = (ok, label, detail) => {
  checks.push({ ok: Boolean(ok), label });
  console.log(`${ok ? "OK " : "NG "} ${label}${detail ? "  → " + detail : ""}`);
};

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "nene-dl-"));
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ acceptDownloads: true });
const studioErrors = [];
page.on("pageerror", (e) => studioErrors.push(e.message));
await page.goto(`${BASE}/index.html`, { waitUntil: "networkidle" });

/* ---- 設計図テキストが画面から消えているか ---- */
const removed = await page.evaluate(() => ({
  formatCards: document.querySelectorAll("[data-export-format]").length,
  copyExport: Boolean(document.querySelector("#copy-export")),
  downloadHtml: Boolean(document.querySelector("#download-html-tool")),
  downloadZip: Boolean(document.querySelector("#download-zip-tool")),
  downloadHidden: document.querySelector("#publish-download-actions")?.hidden,
}));
check(removed.formatCards === 0, "設計図テキストの選択カードが消えている", `残り ${removed.formatCards} 個`);
check(!removed.copyExport, "設計図テキストの書き出しボタンが消えている");
check(removed.downloadHtml, "HTML保存ボタンがある");
check(removed.downloadZip, "ZIP保存ボタンがある");
check(removed.downloadHidden === true, "公開前はダウンロードボタンが隠れている");

/* ---- ログインして公開 ---- */
await page.evaluate(async (email) => {
  await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password: "download-test-123", remember: true }),
  });
}, `dl_${Date.now()}@example.com`);

// 登録でCookieが入るので、読み込み直してログイン状態を反映させる
await page.reload({ waitUntil: "networkidle" });
await page.waitForTimeout(600);
const loggedIn = await page.evaluate(() => Boolean(state.auth?.authenticated || state.auth?.token));
check(loggedIn, "ログイン状態になっている");

await page.evaluate(async () => {
  state.language = "ja";
  state.selectedCategoryIndex = 0;
  state.selectedProposalIndex = 0;
  state.answers = { purpose: "テーマを選ぶだけで注目株を半自動選定する", market: "日本株", output: "選定理由つきリスト" };
  if (typeof prepareNodes === "function") prepareNodes();
});

const publishResult = await page.evaluate(async () => {
  await publishCreatedTool({ openAfter: false, autoTest: true });
  return state.lastPublish ? { slug: state.lastPublish.slug, url: state.lastPublish.url } : null;
});
check(Boolean(publishResult?.slug), "公開URLを発行できた", publishResult?.url || "発行できず");
check(String(publishResult?.url || "").includes("/t/"), "公開URLに /t/ が入っている", publishResult?.url || "");
const lanIps = Object.values(os.networkInterfaces()).flat()
  .filter((item) => item && (item.family === "IPv4" || item.family === 4) && !item.internal)
  .map((item) => item.address)
  .filter((ip) => /^(10\.|192\.168\.|172\.(1[6-9]|2\d|3[0-1])\.)/.test(ip));
check(
  !/localhost|127\.0\.0\.1/.test(String(publishResult?.url || "")),
  "公開URLがlocalhostではない",
  publishResult?.url || "",
);
if (!publishResult?.slug) {
  const status = await page.evaluate(() => state.status);
  console.log("   状態:", status);
  await browser.close();
  process.exit(1);
}

await page.evaluate(() => activateScreen("export"));
await page.waitForTimeout(400);
const shown = await page.evaluate(() => {
  const el = document.querySelector("#publish-download-actions");
  return { hidden: el?.hidden, visible: Boolean(el && el.getClientRects().length) };
});
check(shown.hidden === false && shown.visible, "公開後にダウンロードボタンが見える");

/* ---- スマホから開いたときは、その番号で公開URLを作る ---- */
const cookies = await page.context().cookies();
const cookieHeader = cookies.map((item) => `${item.name}=${item.value}`).join("; ");
const lanBody = JSON.stringify({
  title: "LAN URL test",
  html: "<!doctype html><title>t</title>",
  visibility: "private",
  testPassed: true,
  testReport: "公開前チェック: 成功",
});
const lanData = await new Promise((resolve, reject) => {
  const req = http.request({
    hostname: "127.0.0.1",
    port: 8787,
    path: "/api/publish",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Host: "192.168.10.11:8787",
      Cookie: cookieHeader,
      "Content-Length": Buffer.byteLength(lanBody),
    },
  }, (res) => {
    let raw = "";
    res.on("data", (chunk) => { raw += chunk; });
    res.on("end", () => {
      try { resolve(JSON.parse(raw)); }
      catch { resolve({ error: raw || `HTTP ${res.statusCode}` }); }
    });
  });
  req.on("error", reject);
  req.write(lanBody);
  req.end();
});
check(
  String(lanData.url || "").startsWith("http://192.168.10.11:8787/t/"),
  "スマホの番号で公開URLが作られる",
  lanData.url || lanData.error || "URLなし",
);

/* ---- HTMLとZIPを実際に保存 ---- */
const [htmlDownload] = await Promise.all([
  page.waitForEvent("download", { timeout: 10000 }).catch(() => null),
  page.click("#download-html-tool"),
]);
check(Boolean(htmlDownload), "HTMLファイルを保存できた", htmlDownload?.suggestedFilename());
const htmlPath = path.join(tmpDir, "tool.html");
if (htmlDownload) await htmlDownload.saveAs(htmlPath);

const [zipDownload] = await Promise.all([
  page.waitForEvent("download", { timeout: 10000 }).catch(() => null),
  page.click("#download-zip-tool"),
]);
check(Boolean(zipDownload), "ZIPファイルを保存できた", zipDownload?.suggestedFilename());
const zipPath = path.join(tmpDir, "tool.zip");
if (zipDownload) await zipDownload.saveAs(zipPath);

/* ---- 保存したHTMLの中身を確認 ---- */
const savedHtml = fs.readFileSync(htmlPath, "utf8");
// 差し込み用の目印そのものが残っていないか（安全確認のコード内に出てくる "__NENE_" は正常）
const leftovers = ["__NENE_SLUG__", "__NENE_API_BASE__", "__NENE_DEMO_MODE__"].filter((mark) => savedHtml.includes(mark));
check(leftovers.length === 0, "置き換え漏れの目印が残っていない", leftovers.join(", "));
check(savedHtml.includes(publishResult.slug), "公開先の識別子が入っている");
check(/apiBase:\s*"http/.test(savedHtml), "サーバーのURLが絶対指定で入っている");
check(!/AIza[0-9A-Za-z_-]{20,}|sk-[0-9A-Za-z]{20,}/.test(savedHtml), "APIキーが含まれていない");
check(!/<script\s+src=/i.test(savedHtml), "外部ファイル不要（1つで完結）");

/* ---- ダブルクリックで開いた状態を再現して実行 ---- */
const local = await browser.newPage();
const localErrors = [];
const runCalls = [];
local.on("pageerror", (e) => localErrors.push(e.message));
local.on("response", (r) => { if (r.url().includes("/run")) runCalls.push(String(r.status())); });
local.on("requestfailed", (r) => { if (r.url().includes("/run")) runCalls.push(`失敗(${r.failure()?.errorText})`); });

await local.goto(pathToFileURL(htmlPath).href, { waitUntil: "domcontentloaded" });
await local.waitForTimeout(400);
const localConfig = await local.evaluate(() => ({
  demo: Boolean(window.TOOL_CONFIG?.demoMode),
  chips: document.querySelectorAll(".chip").length,
}));
check(localConfig.chips > 0, "ファイルを開くと画面が出る", `ボタン ${localConfig.chips} 個`);
check(!localConfig.demo, "お試しモードではなく本番設定になっている");

await local.click("#generate-button");
await local.waitForTimeout(8000);
const localMsg = await local.evaluate(() => (document.querySelector("#result") || {}).textContent || "");

const reached = runCalls.some((item) => /^\d{3}$/.test(item));
check(reached, "ダブルクリックで開いてもサーバーに通信が届く", runCalls.join(" / ") || "通信なし");
check(!/通信に失敗|つながりませんでした/.test(localMsg), "通信エラーになっていない", localMsg.trim().slice(0, 80));
check(localErrors.length === 0, "保存したファイルでJSエラーが出ない", localErrors.join(" / "));

console.log(`\n参考：サーバーの応答 ${runCalls.join(" / ")}`);
console.log(`参考：画面の表示「${localMsg.trim().slice(0, 100)}」`);
console.log("（APIキー未設定のため 503 が正常です。CORSで止まる場合は「失敗」と出ます）");

await browser.close();
fs.rmSync(tmpDir, { recursive: true, force: true });

const ng = checks.filter((item) => !item.ok);
console.log(`\n合計 ${checks.length} 項目 / 合格 ${checks.length - ng.length} / 不合格 ${ng.length}`);
if (ng.length) {
  console.log("不合格:", ng.map((item) => item.label).join(", "));
  process.exit(1);
}
console.log("PASS");
