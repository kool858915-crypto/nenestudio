/** 成果物ツールが作るZIPが、実際に解凍できる正しい形式かを確認する */
import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const tmp = path.join(root, "scripts", "_zip_check");

const server = http.createServer((req, res) => {
  let urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
  if (urlPath === "/") urlPath = "/index.html";
  const file = path.resolve(root, "." + urlPath);
  if (!file.startsWith(root) || !fs.existsSync(file)) {
    res.writeHead(404); res.end("not found"); return;
  }
  const type = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8" }[path.extname(file)] || "text/plain";
  res.writeHead(200, { "Content-Type": type });
  fs.createReadStream(file).pipe(res);
});
await new Promise((resolve) => server.listen(8768, resolve));

fs.rmSync(tmp, { recursive: true, force: true });
fs.mkdirSync(tmp, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ acceptDownloads: true });
await page.goto("http://127.0.0.1:8768/scripts/_generated_tool_v2.html", { waitUntil: "networkidle" });
await page.click("#generate-button");
await page.waitForSelector("#result:not([hidden])");

const [download] = await Promise.all([
  page.waitForEvent("download"),
  page.click('[data-do="zip"]'),
]);
const zipPath = path.join(tmp, "tool.zip");
await download.saveAs(zipPath);
await browser.close();
server.close();

const size = fs.statSync(zipPath).size;
console.log(`ZIPサイズ: ${(size / 1024).toFixed(1)} KB`);

const extractDir = path.join(tmp, "out");
execFileSync("powershell", [
  "-NoProfile", "-Command",
  `Expand-Archive -LiteralPath '${zipPath}' -DestinationPath '${extractDir}' -Force`,
], { stdio: "inherit" });

const entries = fs.readdirSync(extractDir);
console.log("中身:", entries.join(" / "));

let ok = true;
for (const expected of ["結果.txt", "結果.html", "ツール.html", "README.txt"]) {
  const exists = entries.includes(expected);
  const bytes = exists ? fs.statSync(path.join(extractDir, expected)).size : 0;
  console.log(`${exists && bytes > 0 ? "OK " : "NG "} ${expected} (${bytes} bytes)`);
  if (!exists || bytes === 0) ok = false;
}

// ZIPに入れた「ツール.html」がそれ単体で開けるか（自己完結しているか）
const toolHtml = fs.readFileSync(path.join(extractDir, "ツール.html"), "utf8");
const selfContained = !/<script\s+src=/i.test(toolHtml) && /window\.TOOL_CONFIG/.test(toolHtml);
console.log(`${selfContained ? "OK " : "NG "} ツール.html が単体で動く形になっている`);
if (!selfContained) ok = false;

const noKey = !/AIza[0-9A-Za-z_-]{20,}|sk-[0-9A-Za-z]{20,}/.test(toolHtml);
console.log(`${noKey ? "OK " : "NG "} ZIP内にAPIキーが含まれない`);
if (!noKey) ok = false;

console.log(ok ? "PASS" : "FAIL");
process.exit(ok ? 0 : 1);
