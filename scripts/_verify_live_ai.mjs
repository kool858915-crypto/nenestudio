/**
 * 本番と同じ経路（公開URL → サーバー代理 → Gemini）で実際にAIを動かし、
 * 返ってきた中身の質を確認する。
 *
 * 使い方:
 *   1. .env に GEMINI_API_KEY=（実キー）を書く
 *   2. npm run verify:live
 */
import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import "dotenv/config";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PORT = 4321;
const BASE = `http://127.0.0.1:${PORT}`;

const hasKey = String(process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || "").trim().length > 20;
if (!hasKey) {
  console.log("");
  console.log("本番AIの確認には Gemini のAPIキーが必要です。まだ設定されていません。");
  console.log("");
  console.log("手順1  https://aistudio.google.com/apikey でキーを作る（無料枠あり）");
  console.log("手順2  nene-studio-wireframe/.env に次の1行を追加する");
  console.log("       GEMINI_API_KEY=ここに貼る");
  console.log("手順3  もう一度 npm run verify:live を実行する");
  console.log("");
  console.log("※ キーはサーバー側だけで使われ、成果物HTMLには一切書き込まれません。");
  process.exit(2);
}

/* ---------- サーバーを起動 ---------- */
const server = spawn(process.execPath, ["server/index.js"], {
  cwd: root,
  env: { ...process.env, PORT: String(PORT), NODE_ENV: "development" },
  stdio: ["ignore", "pipe", "pipe"],
});
const serverLog = [];
server.stdout.on("data", (chunk) => serverLog.push(String(chunk)));
server.stderr.on("data", (chunk) => serverLog.push(String(chunk)));

async function waitForServer() {
  for (let i = 0; i < 40; i += 1) {
    try {
      const res = await fetch(`${BASE}/api/server/status`);
      if (res.ok) return true;
    } catch { /* まだ起動中 */ }
    await new Promise((r) => setTimeout(r, 400));
  }
  return false;
}

function stop(code) {
  try { server.kill(); } catch { /* noop */ }
  process.exit(code);
}

if (!(await waitForServer())) {
  console.error("サーバーを起動できませんでした:\n" + serverLog.join(""));
  stop(1);
}
console.log(`サーバー起動: ${BASE}`);

/* ---------- 静的配信（Studio画面用）はサーバーが兼ねる ---------- */
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
const pageErrors = [];
page.on("pageerror", (e) => pageErrors.push(e.message));
await page.goto(`${BASE}/index.html`, { waitUntil: "networkidle" });

/* ---------- ログイン用アカウントを用意 ---------- */
const email = `verify_${Date.now()}@example.com`;
const password = "verify-password-123";
const auth = await page.evaluate(async ({ email, password }) => {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password, remember: true }),
  });
  return { status: res.status, data: await res.json().catch(() => ({})) };
}, { email, password });
if (auth.status !== 200) {
  console.error("テスト用アカウントを作れませんでした:", auth);
  await browser.close(); stop(1);
}
console.log("テスト用アカウント作成: OK");

/* ---------- ツールを生成して公開 ---------- */
const published = await page.evaluate(async () => {
  state.language = "ja";
  state.selectedCategoryIndex = 0;
  state.selectedProposalIndex = 0;
  state.answers = {
    purpose: "テーマを選ぶだけで注目株を半自動選定する",
    market: "日本株",
    output: "選定理由つきリスト",
  };
  if (typeof prepareNodes === "function") prepareNodes();

  const files = buildRunnableToolFiles({ forceDemo: false, forPublish: true });
  const passed = runPublishSafetyCheck();

  const res = await fetch("/api/publish", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      title: getSelectedProposal().title,
      html: files.indexHtml,
      systemPrompt: files.mainPrompt,
      toolMode: getToolMode(),
      provider: "gemini",
      requireSearch: true,
      testReport: state.lastTestReport,
      testPassed: passed,
      visibility: "private",
    }),
  });
  return { status: res.status, data: await res.json().catch(() => ({})), prompt: files.mainPrompt };
});

if (published.status !== 200) {
  console.error("公開に失敗しました:", published);
  await browser.close(); stop(1);
}
const slug = published.data.slug;
console.log(`公開URL発行: ${published.data.url}`);
console.log(`サーバー側キー: ${published.data.hasServerKey ? "あり" : "なし"}`);

/* ---------- 公開ツールの画面を開いて、実際にボタンを押す ---------- */
const tool = await browser.newPage();
const toolErrors = [];
tool.on("pageerror", (e) => toolErrors.push(e.message));
await tool.setViewportSize({ width: 420, height: 1000 });
await tool.goto(`${BASE}/t/${slug}`, { waitUntil: "networkidle" });

const isDemo = await tool.evaluate(() => Boolean(window.TOOL_CONFIG?.demoMode));
console.log(`お試しモード: ${isDemo ? "オン（本番になっていない）" : "オフ（本番実行）"}`);

console.log("\n実行中…（検索つきのため30〜60秒かかることがあります）");
const started = Date.now();
await tool.click("#generate-button");
await tool.waitForSelector("#result:not([hidden])", { timeout: 120000 });
await tool.waitForFunction(() => {
  const button = document.querySelector("#generate-button");
  return button && !button.disabled;
}, { timeout: 120000 });
const elapsed = Math.round((Date.now() - started) / 1000);

const outcome = await tool.evaluate(() => {
  const data = window.__neneTool.getData();
  return {
    data,
    error: (document.querySelector("#result .errbox") || {}).textContent || "",
    text: (document.querySelector("#result") || {}).textContent || "",
  };
});

fs.mkdirSync(path.join(root, "scripts", "_shots"), { recursive: true });
await tool.screenshot({ path: path.join(root, "scripts", "_shots", "10-live-result.png"), fullPage: true });

console.log(`所要時間: ${elapsed}秒\n`);

if (outcome.error) {
  console.log("エラーが返りました:", outcome.error);
  console.log("\nサーバーログ:\n" + serverLog.slice(-20).join(""));
  await browser.close(); stop(1);
}

/* ---------- 出力の中身を採点 ---------- */
const data = outcome.data || {};
const items = data.items || [];
const checks = [];
const check = (ok, label, detail) => {
  checks.push(ok);
  console.log(`${ok ? "OK " : "NG "} ${label}${detail ? "  → " + detail : ""}`);
};

check(!data.raw, "JSONとして正しく読み取れた", data.raw ? "文章のまま返ってきた" : "");
check(Boolean(data.summary), "全体の要約がある", (data.summary || "").slice(0, 60));
check(items.length > 0, "候補が出た", `${items.length}件`);

const FIELDS = ["選定理由", "関連ニュース", "発表日", "情報源", "リスク"];
const missing = [];
items.forEach((item, index) => {
  FIELDS.forEach((field) => {
    if (!((item.fields || {})[field] || "").trim()) missing.push(`${index + 1}番の「${field}」`);
  });
});
check(missing.length === 0, "全項目が埋まっている", missing.length ? "空欄: " + missing.join(", ") : "");

const dated = items.filter((item) => /\d{4}-\d{2}-\d{2}/.test((item.fields || {}).発表日 || "")).length;
check(dated === items.length, "発表日が日付形式で入っている", `${dated}/${items.length}件`);

const sourced = items.filter((item) => ((item.fields || {}).情報源 || "").trim().length > 2).length;
check(sourced === items.length, "情報源が書かれている", `${sourced}/${items.length}件`);

check((data.checklist || []).length >= 3, "買う前チェックが3つ以上ある", `${(data.checklist || []).length}個`);
check(toolErrors.length === 0, "画面でJSエラーが出ない", toolErrors.join(" / "));
check(elapsed <= 90, "待ち時間が許容範囲", `${elapsed}秒`);

console.log("\n---------------- 実際に返ってきた内容 ----------------");
console.log("要約:", data.summary || "(なし)");
items.forEach((item, index) => {
  console.log(`\n【${index + 1}】${item.title}  ${item.level ? "（" + item.level + "）" : ""}`);
  FIELDS.forEach((field) => {
    const value = (item.fields || {})[field];
    if (value) console.log(`   ${field}: ${value}`);
  });
});
if ((data.checklist || []).length) {
  console.log("\n買う前チェック:");
  data.checklist.forEach((line) => console.log("   ・" + line));
}
console.log("------------------------------------------------------\n");

await browser.close();

const ng = checks.filter((ok) => !ok).length;
console.log(`合計 ${checks.length} 項目 / 合格 ${checks.length - ng} / 不合格 ${ng}`);
console.log("スクリーンショット: scripts/_shots/10-live-result.png");
stop(ng === 0 ? 0 : 1);
