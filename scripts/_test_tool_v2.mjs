/**
 * レシピ方式で生成した成果物HTMLを、実ブラウザで操作して検証する。
 * 1) Studio で HTML を生成 → ファイルに保存
 * 2) 生成HTMLを開き、チップ選択・実行・表示切替・保存を実際に押して確認
 */
import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outFile = path.join(root, "scripts", "_generated_tool_v2.html");

function contentType(file) {
  return {
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8",
  }[path.extname(file)] || "text/plain; charset=utf-8";
}

const checks = [];
function check(ok, label, detail) {
  checks.push({ ok: Boolean(ok), label, detail: detail || "" });
  console.log(`${ok ? "OK " : "NG "} ${label}${detail ? "  → " + detail : ""}`);
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
  await new Promise((resolve) => server.listen(8767, resolve));

  const browser = await chromium.launch({ headless: true });

  /* ---------- 1. Studio で生成 ---------- */
  const studio = await browser.newPage();
  const studioErrors = [];
  studio.on("pageerror", (error) => studioErrors.push(error.message));
  await studio.goto("http://127.0.0.1:8767/index.html", { waitUntil: "networkidle" });

  const built = await studio.evaluate(() => {
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
      html: files.indexHtml,
      configJs: files.configJs,
      scriptJs: files.scriptJs,
      bytes: files.indexHtml.length,
    };
  });

  check(studioErrors.length === 0, "Studio側でJSエラーが出ない", studioErrors.join(" / "));
  check(/apiKey:\s*""/.test(built.configJs), "APIキーを埋め込んでいない");
  check(!/generativelanguage\.googleapis\.com/.test(built.scriptJs), "Geminiへ直接つながない");
  check(!/api\.openai\.com/.test(built.scriptJs), "OpenAIへ直接つながない");
  check(/runViaPublishedProxy/.test(built.scriptJs), "サーバー代理で動く");
  check(/"recipe"|recipe:/.test(built.configJs), "レシピが埋め込まれている");
  fs.writeFileSync(outFile, built.html);
  console.log(`   生成サイズ: ${(built.bytes / 1024).toFixed(1)} KB`);

  /* ---------- 2. 生成ツールを実際に操作 ---------- */
  const tool = await browser.newPage();
  const toolErrors = [];
  tool.on("pageerror", (error) => toolErrors.push(error.message));

  const started = Date.now();
  await tool.goto("http://127.0.0.1:8767/scripts/_generated_tool_v2.html", { waitUntil: "domcontentloaded" });

  // JSが動く前から画面が完成しているか（起動の速さ）
  const beforeJs = await tool.evaluate(() => ({
    chips: document.querySelectorAll(".chip").length,
    button: (document.querySelector("#generate-button") || {}).textContent || "",
    picked: (document.querySelector("#picked") || {}).textContent || "",
    loadingWord: /読み込み中/.test(document.body.textContent || ""),
  }));
  check(beforeJs.chips > 0, "最初からボタンが表示される", `チップ ${beforeJs.chips} 個`);
  check(Boolean(beforeJs.button.trim()), "実行ボタンに文字が入っている", beforeJs.button.trim());
  check(Boolean(beforeJs.picked.trim()), "選択内容が最初から出ている", beforeJs.picked.trim());
  check(!beforeJs.loadingWord, "「読み込み中」表示が出ない");

  await tool.waitForLoadState("networkidle");
  const loadedMs = Date.now() - started;
  check(loadedMs < 1500, "表示完了までが速い", `${loadedMs}ms`);

  const requests = [];
  tool.on("request", (request) => requests.push(request.url()));

  // 別のチップを押す
  await tool.click('.row[data-axis="theme"] .chip[data-value="防衛"]');
  const afterChip = await tool.evaluate(() => document.querySelector("#picked").textContent);
  check(afterChip.includes("防衛"), "チップを押すと選択が変わる", afterChip);

  // 自由入力に打ち替える
  await tool.click('.row[data-axis="theme"] .pencil');
  await tool.fill('.row[data-axis="theme"] .free input', "宇宙・衛星ビジネス");
  const afterFree = await tool.evaluate(() => document.querySelector("#picked").textContent);
  check(afterFree.includes("宇宙・衛星ビジネス"), "自由入力が選択より優先される", afterFree);

  // 実行（お試しモード）
  await tool.click("#generate-button");
  await tool.waitForSelector("#result:not([hidden])", { timeout: 15000 });
  const afterRun = await tool.evaluate(() => ({
    items: document.querySelectorAll("#result .item").length,
    text: (document.querySelector("#result") || {}).textContent || "",
    actionsVisible: !document.querySelector("#actions").hidden,
    skeletonHidden: document.querySelector("#skeleton").hidden,
  }));
  check(afterRun.items > 0, "結果がカードで表示される", `${afterRun.items} 件`);
  check(afterRun.text.length > 80, "結果に中身がある", `${afterRun.text.length} 文字`);
  check(afterRun.actionsVisible, "保存ボタンが出る");
  check(afterRun.skeletonHidden, "読み込み中の骨組みが消える");

  // 表示切替
  await tool.click('.vw[data-view="table"]');
  const tableView = await tool.evaluate(() => document.querySelectorAll("#result table tbody tr").length);
  check(tableView > 0, "表に切り替えられる", `${tableView} 行`);
  await tool.click('.vw[data-view="fold"]');
  const foldView = await tool.evaluate(() => document.querySelectorAll("#result details.fold").length);
  check(foldView > 0, "折りたたみに切り替えられる", `${foldView} 件`);
  await tool.click('.vw[data-view="card"]');

  // 保存（ダウンロードが実際に発生するか）
  for (const [action, label] of [["txt", "テキスト保存"], ["html", "HTML保存"], ["zip", "ZIP保存"]]) {
    const [download] = await Promise.all([
      tool.waitForEvent("download", { timeout: 8000 }).catch(() => null),
      tool.click(`[data-do="${action}"]`),
    ]);
    check(Boolean(download), `${label}ができる`, download ? download.suggestedFilename() : "ダウンロードなし");
  }

  // 外部通信をしていないこと
  const external = requests.filter((url) => !url.startsWith("http://127.0.0.1:8767"));
  check(external.length === 0, "外部への通信が発生しない", external.join(" / "));

  // スマホ幅で崩れないこと
  await tool.setViewportSize({ width: 390, height: 844 });
  const mobile = await tool.evaluate(() => ({
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    buttonWidth: document.querySelector("#generate-button").getBoundingClientRect().width,
  }));
  check(mobile.overflow <= 1, "スマホ幅で横にはみ出さない", `はみ出し ${mobile.overflow}px`);
  check(mobile.buttonWidth > 200, "スマホで実行ボタンが押しやすい", `${Math.round(mobile.buttonWidth)}px`);

  check(toolErrors.length === 0, "成果物側でJSエラーが出ない", toolErrors.join(" / "));

  await browser.close();
  server.close();

  const failed = checks.filter((item) => !item.ok);
  console.log(`\n合計 ${checks.length} 項目 / 合格 ${checks.length - failed.length} / 不合格 ${failed.length}`);
  if (failed.length) {
    console.log("不合格:", failed.map((item) => item.label).join(", "));
    process.exit(1);
  }
  console.log("PASS");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
