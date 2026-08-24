/**
 * 1) AIの応答が乱れても結果表示が壊れないかを確認する
 * 2) 完成した画面のスクリーンショットを撮る
 */
import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const shotDir = path.join(root, "scripts", "_shots");
fs.mkdirSync(shotDir, { recursive: true });

const server = http.createServer((req, res) => {
  let urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
  if (urlPath === "/") urlPath = "/index.html";
  const file = path.resolve(root, "." + urlPath);
  if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    res.writeHead(404); res.end("not found"); return;
  }
  const type = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8" }[path.extname(file)] || "text/plain; charset=utf-8";
  res.writeHead(200, { "Content-Type": type });
  fs.createReadStream(file).pipe(res);
});
await new Promise((r) => server.listen(8771, r));

const browser = await chromium.launch({ headless: true });

/* ---- 生成（本番モードに近い設定で作る）---- */
const studio = await browser.newPage();
await studio.goto("http://127.0.0.1:8771/index.html", { waitUntil: "networkidle" });
const html = await studio.evaluate(() => {
  state.language = "ja";
  state.selectedCategoryIndex = 0;
  state.selectedProposalIndex = 0;
  state.answers = { purpose: "テーマを選ぶだけで注目株を半自動選定する", market: "日本株", output: "選定理由つきリスト" };
  if (typeof prepareNodes === "function") prepareNodes();
  return buildRunnableToolFiles({ forceDemo: true }).indexHtml;
});
const toolFile = path.join(root, "scripts", "_shot_tool.html");
fs.writeFileSync(toolFile, html);

const page = await browser.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
await page.setViewportSize({ width: 420, height: 1000 });
await page.goto("http://127.0.0.1:8771/scripts/_shot_tool.html", { waitUntil: "networkidle" });

/* ---- 1. AIの応答が乱れたときの耐性 ---- */
const REAL_JSON = JSON.stringify({
  summary: "AI・半導体テーマは生成AI向け需要の話題が続いています。直近の公開発表3件を確認しました。",
  items: [
    { title: "アドバンテスト（6857）", level: "高", fields: { 選定理由: "AI向け半導体の検査装置需要が伸びているため。", 関連ニュース: "第2四半期決算で受注が増加したと発表。", 発表日: "2026-08-14", 情報源: "会社適時開示", リスク: "すでに株価に織り込まれている可能性があります。" } },
    { title: "ソシオネクスト（6526）", level: "中", fields: { 選定理由: "カスタム半導体の受託が増えているため。", 関連ニュース: "車載向けの新規受注を公表。", 発表日: "2026-08-08", 情報源: "会社公式リリース", リスク: "受注が特定顧客に偏っています。" } },
  ],
  checklist: ["決算発表の日程を確認する", "直近3か月の値動きを見る", "一度に全額を入れない"],
  note: "価格は必ず最新の値をご確認ください。",
});

const cases = [
  { label: "そのままのJSON", text: REAL_JSON, expectItems: 2 },
  { label: "```json で囲まれたJSON", text: "```json\n" + REAL_JSON + "\n```", expectItems: 2 },
  { label: "前後に説明文が付いたJSON", text: "承知しました。以下が結果です。\n" + REAL_JSON + "\n以上です。", expectItems: 2 },
  { label: "JSONではない普通の文章", text: "本日の条件では有力候補は見つかりませんでした。\n理由：直近の開示に該当テーマの新規材料がなかったためです。", expectItems: 0 },
  { label: "途中で切れた壊れたJSON", text: '{"summary":"途中で切れました","items":[{"title":"A"', expectItems: 0 },
];

let ok = true;
for (const testCase of cases) {
  const outcome = await page.evaluate((text) => {
    const parsed = window.__neneTool.parse(text);
    return { items: (parsed.items || []).length, raw: Boolean(parsed.raw), summary: parsed.summary || "" };
  }, testCase.text);
  const pass = outcome.items === testCase.expectItems && (testCase.expectItems > 0 ? !outcome.raw : true);
  if (!pass) ok = false;
  console.log(`${pass ? "OK " : "NG "} ${testCase.label} → 項目${outcome.items}件 ${outcome.raw ? "（そのまま文章表示）" : ""}`);
}

/* ---- 2. 実データを画面に出してスクリーンショット ---- */
await page.evaluate((text) => window.__neneTool.showText(text), REAL_JSON);
await page.waitForTimeout(300);

const shots = [];
await page.screenshot({ path: path.join(shotDir, "01-card-mobile.png"), fullPage: true });
shots.push("01-card-mobile.png");

await page.click('.vw[data-view="table"]');
await page.waitForTimeout(200);
await page.screenshot({ path: path.join(shotDir, "02-table-mobile.png"), fullPage: true });
shots.push("02-table-mobile.png");

await page.click('.vw[data-view="fold"]');
await page.waitForTimeout(200);
await page.screenshot({ path: path.join(shotDir, "03-fold-mobile.png"), fullPage: true });
shots.push("03-fold-mobile.png");

await page.click('.vw[data-view="card"]');
await page.setViewportSize({ width: 1280, height: 900 });
await page.waitForTimeout(250);
await page.screenshot({ path: path.join(shotDir, "04-card-desktop.png"), fullPage: true });
shots.push("04-card-desktop.png");

console.log(`${errors.length === 0 ? "OK " : "NG "} 画面でJSエラーが出ない ${errors.join(" / ")}`);
if (errors.length) ok = false;
console.log("スクリーンショット:", shots.join(", "));

await browser.close();
server.close();
console.log(ok ? "PASS" : "FAIL");
process.exit(ok ? 0 : 1);
