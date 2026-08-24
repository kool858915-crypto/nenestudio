/** 起動したサーバーの画面が実際に開けるかを確認し、スクリーンショットを撮る */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const shotDir = path.join(root, "scripts", "_shots");
fs.mkdirSync(shotDir, { recursive: true });
const BASE = "http://localhost:8787";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
const failed = []; page.on("requestfailed", (r) => failed.push(r.url())); page.on("response", (r) => { if (r.status() >= 400) failed.push(r.status() + " " + new URL(r.url()).pathname); }); globalThis.__failed = failed;

await page.setViewportSize({ width: 420, height: 1000 });
const started = Date.now();
await page.goto(`${BASE}/index.html`, { waitUntil: "networkidle" });
const loadedMs = Date.now() - started;

const info = await page.evaluate(() => ({
  title: document.title,
  heading: (document.querySelector("h1") || {}).textContent || "",
  categories: typeof categories !== "undefined" ? categories.length : 0,
  builder: typeof buildRunnableToolFiles,
  recipes: typeof TOOL_RECIPES !== "undefined" ? TOOL_RECIPES.length : 0,
}));

await page.screenshot({ path: path.join(shotDir, "20-studio-mobile.png"), fullPage: false });

console.log(`表示までの時間: ${loadedMs}ms`);
console.log(`タイトル: ${info.title}`);
console.log(`見出し: ${info.heading.trim()}`);
console.log(`カテゴリ数: ${info.categories}`);
console.log(`レシピ数: ${info.recipes}（残りは自動生成で対応）`);
console.log(`生成機能: ${info.builder}`);
console.log("4xx以上の通信:", globalThis.__failed.length ? globalThis.__failed.join(", ") : "なし"); console.log(errors.length === 0 ? "OK  JSエラーなし" : "NG  JSエラー: " + errors.join(" / "));

await browser.close();
process.exit(errors.length === 0 && info.builder === "function" ? 0 : 1);
