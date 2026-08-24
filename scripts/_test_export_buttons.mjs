import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outHtml = path.join(root, "scripts", "_generated_tool.html");

function contentType(file) {
  const ext = path.extname(file);
  return {
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".json": "application/json",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".ico": "image/x-icon",
  }[ext] || "text/plain; charset=utf-8";
}

async function main() {
  const server = http.createServer((req, res) => {
    let urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
    if (urlPath === "/") urlPath = "/index.html";
    const file = path.resolve(root, "." + urlPath);
    if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      res.writeHead(404);
      res.end("not found");
      return;
    }
    res.writeHead(200, { "Content-Type": contentType(file) });
    fs.createReadStream(file).pipe(res);
  });
  await new Promise((resolve) => server.listen(8765, resolve));

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const studioErrors = [];
  page.on("pageerror", (e) => studioErrors.push(e.message));
  page.on("console", (m) => {
    if (m.type() === "error") studioErrors.push("console:" + m.text());
  });

  await page.goto("http://127.0.0.1:8765/index.html", { waitUntil: "networkidle" });
  await page.waitForTimeout(400);

  const has = await page.evaluate(() => ({
    builder: typeof buildRunnableToolFiles,
    launch: typeof buildLaunchHtml,
  }));
  console.log("studio", has);
  console.log("studioErrors", studioErrors.slice(0, 12));
  if (has.builder !== "function") {
    await browser.close();
    server.close();
    process.exit(1);
  }

  const result = await page.evaluate(() => {
    state.language = "ja";
    state.selectedCategoryIndex = 0;
    state.selectedProposalIndex = 0;
    state.answers = {
      purpose: "テーマを選ぶだけで注目株を半自動選定する",
      market: "日本株",
      output: "選定理由つきリスト",
    };
    state.settings.userApiProvider = "gemini";
    state.settings.userApiKey = "";
    if (typeof prepareNodes === "function") prepareNodes();
    const files = buildRunnableToolFiles();
    return {
      html: buildLaunchHtml(files),
      scriptJs: files.scriptJs,
      indexHtml: files.indexHtml,
      configJs: files.configJs,
    };
  });

  fs.writeFileSync(outHtml, result.html, "utf8");
  fs.writeFileSync(path.join(root, "scripts", "_generated_script.js"), result.scriptJs, "utf8");
  fs.writeFileSync(path.join(root, "scripts", "_generated_index.html"), result.indexHtml, "utf8");
  fs.writeFileSync(path.join(root, "scripts", "_generated_config.js"), result.configJs, "utf8");

  try {
    // eslint-disable-next-line no-new
    new vm.Script(result.scriptJs, { filename: "tool.js" });
    console.log("tool script SYNTAX_OK");
  } catch (error) {
    console.log("tool script SYNTAX_FAIL", error.message);
  }

  // Also validate ZIP-style separate files together
  const zipPageHtml = result.indexHtml
    .replace("./style.css", "/scripts/_generated_style.css")
    .replace("./config.js", "/scripts/_generated_config.js")
    .replace("./script.js", "/scripts/_generated_script.js");
  // Write style from launch html extract is harder; use inline style file from files via regenerate
  const styleMatch = result.html.match(/<style>([\s\S]*?)<\/style>/i);
  fs.writeFileSync(path.join(root, "scripts", "_generated_style.css"), styleMatch ? styleMatch[1] : "", "utf8");
  fs.writeFileSync(path.join(root, "scripts", "_generated_zip_index.html"), zipPageHtml, "utf8");

  const page2 = await browser.newPage();
  const toolErrors = [];
  page2.on("pageerror", (e) => toolErrors.push("pageerror:" + e.message));
  page2.on("console", (m) => {
    if (m.type() === "error") toolErrors.push("console:" + m.text());
  });
  await page2.goto("http://127.0.0.1:8765/scripts/_generated_tool.html");
  await page2.waitForTimeout(400);

  const before = await page2.evaluate(() => ({
    bootHidden: !!document.querySelector("#boot-tip")?.hidden,
    status: document.querySelector("#status")?.textContent || "",
    selected: document.querySelector("#selected-theme")?.textContent || "",
    hasGenerate: !!document.querySelector("#generate-button"),
    chips: document.querySelectorAll("[data-topic]").length,
  }));
  console.log("BEFORE", before);

  await page2.click('[data-topic="防衛"]');
  const chip = await page2.evaluate(() => ({
    selected: document.querySelector("#selected-theme")?.textContent || "",
    status: document.querySelector("#status")?.textContent || "",
    topic: document.querySelector("#tool-topic")?.value || "",
  }));
  console.log("CHIP", chip);

  await page2.click("#generate-button");
  await page2.waitForTimeout(250);
  const gen = await page2.evaluate(() => ({
    status: document.querySelector("#status")?.textContent || "",
    button: document.querySelector("#generate-button")?.textContent || "",
    result: (document.querySelector("#result")?.textContent || "").slice(0, 180),
    loadingVisible: !!(document.querySelector("#loading-box") && !document.querySelector("#loading-box").hidden),
  }));
  console.log("GEN", gen);
  console.log("TOOL_ERRORS", toolErrors);

  // ZIP-style (external JS)
  const page3 = await browser.newPage();
  const zipErrors = [];
  page3.on("pageerror", (e) => zipErrors.push(e.message));
  await page3.goto("http://127.0.0.1:8765/scripts/_generated_zip_index.html");
  await page3.waitForTimeout(400);
  const zipBefore = await page3.evaluate(() => ({
    bootHidden: !!document.querySelector("#boot-tip")?.hidden,
    hasGenerate: !!document.querySelector("#generate-button"),
    status: document.querySelector("#status")?.textContent || "",
  }));
  await page3.click("#generate-button");
  await page3.waitForTimeout(200);
  const zipGen = await page3.evaluate(() => ({
    status: document.querySelector("#status")?.textContent || "",
    result: (document.querySelector("#result")?.textContent || "").slice(0, 120),
  }));
  console.log("ZIP_BEFORE", zipBefore);
  console.log("ZIP_GEN", zipGen);
  console.log("ZIP_ERRORS", zipErrors);

  await browser.close();
  server.close();

  const ok =
    before.hasGenerate
    && chip.selected.includes("防衛")
    && /APIキー|必要|受け付け|選定/.test(gen.status + gen.button + gen.result)
    && toolErrors.length === 0
    && zipErrors.length === 0
    && /APIキー|必要|受け付け|選定/.test(zipGen.status + zipGen.result);

  if (!ok) process.exit(1);
  console.log("PASS");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
