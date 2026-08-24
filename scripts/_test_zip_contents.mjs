/** 保存したZIPが Windows の標準機能で開けるか、中身が正しいかを確認する */
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import { chromium } from "playwright";

const BASE = "http://localhost:8787";
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "nene-zip-"));
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ acceptDownloads: true });
await page.goto(`${BASE}/index.html`, { waitUntil: "networkidle" });

await page.evaluate(async (email) => {
  await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password: "zip-test-123", remember: true }),
  });
}, `zip_${Date.now()}@example.com`);
await page.reload({ waitUntil: "networkidle" });
await page.waitForTimeout(500);

await page.evaluate(async () => {
  state.language = "ja";
  state.selectedCategoryIndex = 0;
  state.selectedProposalIndex = 0;
  state.answers = { purpose: "テーマを選ぶだけで注目株を半自動選定する", market: "日本株", output: "選定理由つきリスト" };
  if (typeof prepareNodes === "function") prepareNodes();
  await publishCreatedTool({ openAfter: false, autoTest: true });
});
await page.evaluate(() => activateScreen("export"));
await page.waitForTimeout(400);

const [download] = await Promise.all([
  page.waitForEvent("download", { timeout: 15000 }),
  page.click("#download-zip-tool"),
]);
const zipPath = path.join(tmpDir, "tool.zip");
await download.saveAs(zipPath);
console.log(`保存したZIP: ${download.suggestedFilename()}  (${fs.statSync(zipPath).size} バイト)`);

const extractDir = path.join(tmpDir, "extracted");
try {
  execFileSync("powershell", ["-NoProfile", "-Command",
    `Expand-Archive -LiteralPath '${zipPath}' -DestinationPath '${extractDir}' -Force`],
    { stdio: "pipe" });
  console.log("OK  Windowsの標準機能で展開できた");
} catch (error) {
  console.log("NG  展開できなかった:", String(error.stderr || error.message).slice(0, 200));
  await browser.close();
  process.exit(1);
}

const files = fs.readdirSync(extractDir);
console.log("OK  中身:", files.join(", "));
const hasTool = files.includes("tool.html");
const hasReadme = files.includes("README.txt");
console.log(`${hasTool ? "OK " : "NG "} tool.html がある`);
console.log(`${hasReadme ? "OK " : "NG "} README.txt がある`);

const readme = fs.readFileSync(path.join(extractDir, "README.txt"), "utf8");
console.log(`${readme.includes("使い方") ? "OK " : "NG "} 使い方が日本語で読める`);
console.log(`${/http:\/\/localhost:8787\/t\//.test(readme) ? "OK " : "NG "} 公開URLが書いてある`);

// 展開した tool.html が実際に動くか
const local = await browser.newPage();
const calls = [];
local.on("response", (r) => { if (r.url().includes("/run")) calls.push(String(r.status())); });
local.on("requestfailed", (r) => { if (r.url().includes("/run")) calls.push(`失敗(${r.failure()?.errorText})`); });
await local.goto(pathToFileURL(path.join(extractDir, "tool.html")).href, { waitUntil: "domcontentloaded" });
await local.waitForTimeout(400);
await local.click("#generate-button");
await local.waitForTimeout(7000);
const reached = calls.some((item) => /^\d{3}$/.test(item));
console.log(`${reached ? "OK " : "NG "} 展開したtool.htmlがサーバーに届く  → ${calls.join(" / ") || "通信なし"}`);

console.log("\n--- README.txt の中身 ---");
console.log(readme);

await browser.close();
fs.rmSync(tmpDir, { recursive: true, force: true });
process.exit(hasTool && hasReadme && reached ? 0 : 1);
