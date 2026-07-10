/**
 * dist/ が公開用ホワイトリストのみか検証する（デプロイ前チェック）。
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distRoot = path.resolve(__dirname, "..", "dist");

const ALLOWED_TOP_LEVEL = new Set([
  "index.html",
  "styles.css",
  "script.js",
  "config.js",
  "ads.js",
  "ads.config.js",
  "ads.txt",
  "manifest.webmanifest",
  "sw.js",
  "_headers",
  "_redirects",
  "robots.txt",
  "assets",
]);

const FORBIDDEN_NAMES = [
  ".env",
  "JWT_SECRET.local.txt",
  "nene-studio-db.json",
  "package.json",
  "render.yaml",
  "DEPLOYMENT.md",
  "NEXT_SESSION.md",
  "README.md",
];

if (!fs.existsSync(distRoot)) {
  console.error("[verify-static] dist/ がありません。先に npm run build:static を実行してください。");
  process.exit(1);
}

let failed = false;

for (const name of fs.readdirSync(distRoot)) {
  if (!ALLOWED_TOP_LEVEL.has(name)) {
    console.error(`[verify-static] NG: 許可されていないファイル/フォルダ: ${name}`);
    failed = true;
  }
}

function walkForbidden(current, relative = "") {
  for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
    const rel = path.join(relative, entry.name).replace(/\\/g, "/");
    if (FORBIDDEN_NAMES.includes(entry.name)) {
      console.error(`[verify-static] NG: 禁止ファイルが含まれています: ${rel}`);
      failed = true;
    }
    if (entry.isDirectory()) {
      walkForbidden(path.join(current, entry.name), rel);
    }
  }
}
walkForbidden(distRoot);

if (failed) {
  process.exit(1);
}

console.log("[verify-static] OK: dist/ は公開用ホワイトリストのみです。");
