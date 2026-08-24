/** 全カテゴリで成果物HTMLを生成し、実際に開いて操作できるかを一括で確認する */
import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const workDir = path.join(root, "scripts", "_all_cat");

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
await new Promise((r) => server.listen(8770, r));

fs.rmSync(workDir, { recursive: true, force: true });
fs.mkdirSync(workDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const studio = await browser.newPage();
await studio.goto("http://127.0.0.1:8770/index.html", { waitUntil: "networkidle" });

const categoryNames = await studio.evaluate(() => categories.map((item) => item.name));
const rows = [];
let allOk = true;

for (let index = 0; index < categoryNames.length; index += 1) {
  const name = categoryNames[index];
  const built = await studio.evaluate((categoryIndex) => {
    state.language = "ja";
    state.selectedCategoryIndex = categoryIndex;
    state.selectedProposalIndex = 0;
    const theme = getTheme();
    state.answers = {
      purpose: theme.purposeOptions[0],
      market: theme.scopeOptions[0],
      output: theme.outputOptions[0],
    };
    if (typeof prepareNodes === "function") prepareNodes();
    const files = buildRunnableToolFiles({ forceDemo: true });
    const recipe = resolveToolRecipe();
    return { html: files.indexHtml, recipeId: recipe.id, axes: recipe.axes.length };
  }, index);

  const file = path.join(workDir, `cat${index}.html`);
  fs.writeFileSync(file, built.html);

  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`http://127.0.0.1:8770/scripts/_all_cat/cat${index}.html`, { waitUntil: "networkidle" });

  await page.click("#generate-button");
  await page.waitForSelector("#result:not([hidden])", { timeout: 15000 }).catch(() => {});

  const outcome = await page.evaluate(() => ({
    chips: document.querySelectorAll(".chip").length,
    items: document.querySelectorAll("#result .item").length,
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    title: (document.querySelector("h1") || {}).textContent || "",
    runLabel: (document.querySelector("#generate-button") || {}).textContent || "",
  }));

  await page.click('.vw[data-view="table"]');
  const tableRows = await page.evaluate(() => document.querySelectorAll("#result table tbody tr").length);
  await page.close();

  const ok = errors.length === 0
    && built.axes >= 3
    && outcome.chips > 0
    && outcome.items > 0
    && tableRows > 0
    && outcome.overflow <= 1;
  if (!ok) allOk = false;

  rows.push({ name, recipe: built.recipeId, axes: built.axes, chips: outcome.chips, items: outcome.items, table: tableRows, overflow: outcome.overflow, err: errors.length, ok });
  console.log(
    `${ok ? "OK " : "NG "} ${name.padEnd(22, "　")} レシピ=${built.recipeId.padEnd(14)} 軸=${built.axes} ボタン=${outcome.chips} 結果=${outcome.items}件 表=${tableRows}行 はみ出し=${outcome.overflow}px エラー=${errors.length}`
    + (errors.length ? `\n     ${errors.join(" / ")}` : "")
  );
}

await browser.close();
server.close();

const ng = rows.filter((row) => !row.ok);
console.log(`\n合計 ${rows.length} カテゴリ / 合格 ${rows.length - ng.length} / 不合格 ${ng.length}`);
if (!allOk) {
  console.log("不合格:", ng.map((row) => row.name).join(", "));
  process.exit(1);
}
console.log("PASS");
