import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function contentType(file) {
  const ext = path.extname(file);
  return {
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8",
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
  await new Promise((resolve) => server.listen(8766, resolve));

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  page.on("pageerror", (e) => console.log("PAGEERROR", e.message));
  await page.goto("http://127.0.0.1:8766/index.html", { waitUntil: "networkidle" });
  await page.waitForTimeout(500);

  const ui = await page.evaluate(() => ({
    preview: !!document.querySelector("#preview-tool"),
    test: !!document.querySelector("#test-tool"),
    zip: !!document.querySelector("#download-zip-tool"),
    publish: !!document.querySelector("#publish-tool"),
    builder: typeof buildRunnableToolFiles,
  }));
  console.log("UI", ui);
  if (!ui.preview || !ui.test || !ui.zip || !ui.publish || ui.builder !== "function") {
    throw new Error("export UI incomplete");
  }

  // Go to export screen
  await page.click('[data-step-screen="export"], [data-screen="export"], .step-item[data-step-screen="export"]');
  await page.waitForTimeout(200);

  const result = await page.evaluate(async () => {
    state.language = "ja";
    state.selectedCategoryIndex = 0;
    state.selectedProposalIndex = 0;
    state.answers = {
      purpose: "テーマを選ぶだけで注目株を半自動選定する",
      market: "日本株",
      output: "選定理由つきリスト",
    };
    if (typeof prepareNodes === "function") prepareNodes();
    const files = buildRunnableToolFiles({ forceDemo: true });
    return {
      hasDemo: /demoMode:\s*true/.test(files.configJs),
      emptyKey: /apiKey:\s*""/.test(files.configJs),
      noGemini: !/generativelanguage\.googleapis\.com/.test(files.scriptJs),
      hasProxy: /runViaPublishedProxy/.test(files.scriptJs),
      hasDemoFn: /buildDemoData/.test(files.scriptJs),
      html: files.indexHtml,
    };
  });
  console.log("FILES", {
    hasDemo: result.hasDemo,
    emptyKey: result.emptyKey,
    noGemini: result.noGemini,
    hasProxy: result.hasProxy,
    hasDemoFn: result.hasDemoFn,
  });

  fs.writeFileSync(path.join(root, "scripts", "_generated_tool.html"), result.html);

  // Click test button in studio (折りたたみの中にあるので先に開く)
  await page.evaluate(() => {
    document.querySelectorAll("details").forEach((item) => { item.open = true; });
  });
  await page.click("#test-tool");
  await page.waitForTimeout(4000);
  const report = await page.evaluate(() => document.querySelector("#export-test-report")?.textContent || "");
  console.log("TEST_REPORT_HEAD", report.split("\n").slice(0, 12).join(" | "));

  // Preview dialog
  await page.click("#preview-tool");
  await page.waitForTimeout(400);
  const previewOpen = await page.evaluate(() => {
    const dialog = document.querySelector("#tool-preview-dialog");
    return !!(dialog && dialog.open);
  });
  console.log("PREVIEW_OPEN", previewOpen);

  await browser.close();
  server.close();

  if (!result.hasDemo || !result.emptyKey || !result.noGemini || !result.hasProxy || !result.hasDemoFn) {
    process.exit(1);
  }
  if (!/成功|OK/.test(report)) {
    console.log("FULL_REPORT\n", report);
    process.exit(1);
  }
  console.log("PASS");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
