/**
 * Cloudflare Pages 用の静的ファイルのみを dist/ にコピーする。
 * server/、scripts/、.env、DB などは含めない。
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.resolve(__dirname, "..");
const distRoot = path.join(appRoot, "dist");

const PUBLIC_FILES = [
  "index.html",
  "styles.css",
  "script.js",
  "config.js",
  "ads.js",
  "ads.config.js",
  "manifest.webmanifest",
  "sw.js",
  "_headers",
  "_redirects",
  "robots.txt",
];

const PUBLIC_DIRS = ["assets"];

const FORBIDDEN_PATTERNS = [
  /sk_(live|test|proj)_[A-Za-z0-9]{10,}/i,
  /whsec_[A-Za-z0-9]{10,}/i,
  /"passwordHash"\s*:\s*"\$2[aby]\$/,
  /"stripeCustomerId"\s*:\s*"cus_/i,
  /"stripeSubscriptionId"\s*:\s*"sub_/i,
  /JWT_SECRET\s*=\s*[A-Za-z0-9+/=_-]{20,}/i,
];

function copyFile(src, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

function copyDir(srcDir, destDir) {
  if (!fs.existsSync(srcDir)) return;
  fs.mkdirSync(destDir, { recursive: true });
  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const src = path.join(srcDir, entry.name);
    const dest = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      copyDir(src, dest);
    } else {
      copyFile(src, dest);
    }
  }
}

function scanForSecrets(dir) {
  const hits = [];
  function walk(current) {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        walk(full);
        continue;
      }
      const text = fs.readFileSync(full, "utf8");
      for (const pattern of FORBIDDEN_PATTERNS) {
        if (pattern.test(text)) {
          hits.push({ file: path.relative(distRoot, full), pattern: pattern.source });
        }
      }
    }
  }
  walk(dir);
  return hits;
}

if (fs.existsSync(distRoot)) {
  fs.rmSync(distRoot, { recursive: true, force: true });
}
fs.mkdirSync(distRoot, { recursive: true });

for (const file of PUBLIC_FILES) {
  const src = path.join(appRoot, file);
  if (!fs.existsSync(src)) {
    console.error(`[build-static] 必須ファイルがありません: ${file}`);
    process.exit(1);
  }
  copyFile(src, path.join(distRoot, file));
}

for (const dir of PUBLIC_DIRS) {
  copyDir(path.join(appRoot, dir), path.join(distRoot, dir));
}

const secretHits = scanForSecrets(distRoot);
if (secretHits.length > 0) {
  console.error("[build-static] dist/ に秘密情報らしき文字列が含まれています:");
  for (const hit of secretHits) {
    console.error(`  - ${hit.file} (${hit.pattern})`);
  }
  process.exit(1);
}

console.log(`[build-static] OK: ${distRoot}`);
console.log(`[build-static] ファイル: ${PUBLIC_FILES.join(", ")}`);
console.log(`[build-static] ディレクトリ: ${PUBLIC_DIRS.join(", ")}`);
