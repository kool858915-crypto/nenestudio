/**
 * 画面のファイルを書き換えたのに版番号（?v=）を上げ忘れると、
 * ブラウザが古いファイルを使い続けて「直したのに変わらない」状態になる。
 * それを防ぐため、版番号がそろっているかを検査する。
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const indexHtml = fs.readFileSync(path.join(root, "index.html"), "utf8");
const swJs = fs.readFileSync(path.join(root, "sw.js"), "utf8");
const appScript = path.join(root, "script.js");

const problems = [];

const versions = [...indexHtml.matchAll(/(?:src|href)="\.\/([\w.-]+)\?v=(\d+)"/g)]
  .map((match) => ({ file: match[1], version: Number(match[2]) }));

if (versions.length === 0) {
  problems.push("index.html に ?v= 付きの読み込みが1つもありません。");
}

const unique = [...new Set(versions.map((item) => item.version))];
if (unique.length > 1) {
  const detail = versions.map((item) => `${item.file}=v${item.version}`).join(", ");
  problems.push(`index.html の版番号がそろっていません（${detail}）。すべて同じ番号にしてください。`);
}

const swCache = swJs.match(/CACHE_NAME\s*=\s*"nene-studio-v(\d+)"/);
if (!swCache) {
  problems.push("sw.js の CACHE_NAME が見つかりません。");
}

const swRegister = fs.readFileSync(appScript, "utf8").match(/sw\.js\?v=(\d+)/);
if (!swRegister) {
  problems.push("script.js の sw.js 登録に ?v= がありません。");
}

const current = unique[0];
if (swCache && Number(swCache[1]) !== current) {
  problems.push(`sw.js の CACHE_NAME が v${swCache[1]} で、index.html の v${current} と違います。`);
}
if (swRegister && Number(swRegister[1]) !== current) {
  problems.push(`script.js の sw.js?v=${swRegister[1]} が、index.html の v${current} と違います。`);
}

// 版番号を上げずに script.js を書き換えていないかを、記録した中身の指紋で確かめる
const stampPath = path.join(root, "scripts", ".cache-version-stamp.json");
const scriptSize = fs.statSync(appScript).size;
let stamp = null;
try { stamp = JSON.parse(fs.readFileSync(stampPath, "utf8")); } catch { /* 初回はなし */ }

if (stamp && stamp.version === current && stamp.scriptSize !== scriptSize) {
  problems.push(
    `script.js の中身が変わっているのに版番号が v${current} のままです。`
    + `（記録時 ${stamp.scriptSize} バイト → 現在 ${scriptSize} バイト）`
    + " index.html・sw.js・script.js の3か所の番号を1つ上げてください。",
  );
}

if (problems.length) {
  console.error("キャッシュ版番号の検査: 失敗\n");
  problems.forEach((line) => console.error("  NG  " + line));
  console.error("\n直し方: index.html の ?v= 、sw.js の CACHE_NAME 、script.js の sw.js?v= を同じ番号に上げる。");
  process.exit(1);
}

fs.writeFileSync(stampPath, JSON.stringify({ version: current, scriptSize }, null, 2), "utf8");
console.log(`キャッシュ版番号の検査: 成功（現在 v${current}）`);
