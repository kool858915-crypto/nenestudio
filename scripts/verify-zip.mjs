/**
 * ZIP 生成ロジックの解凍検証（script.js と同じヘッダー仕様）。
 * Expand-Archive と Windows Shell（エクスプローラー相当）の両方で確認する。
 */
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const zipPath = path.join(root, "test-fixed.zip");
const outDir = path.join(root, "test-unzip2");
const shellOutDir = path.join(root, "test-shell-unzip");

const script = fs.readFileSync(path.join(root, "script.js"), "utf8");
const start = script.indexOf("function createZipBlob");
const end = script.indexOf("function fallbackCopy");
if (start < 0 || end < 0) throw new Error("ZIP helpers not found");
const chunk = script.slice(start, end);
const moduleSource = chunk
  .replace(/^function /gm, "export function ")
  .replace(/^const crcTable/m, "export const crcTable");
const helperPath = path.join(root, "_zip_helpers.mjs");
fs.writeFileSync(helperPath, moduleSource);
const { createZipBlob } = await import(`${pathToFileURL(helperPath).href}?t=${Date.now()}`);

const files = {
  "README.md": "# テスト\n使い方を確認します。",
  "index.html": "<!doctype html><html><body>ok</body></html>",
  "style.css": "body{color:red}",
  "script.js": "console.log('ok')",
  "config/api_keys.example": "KEY=xxx",
  "prompts/main_prompt.md": "日本語プロンプト",
  "workflow/nodes.md": "1. step",
  "output/sample_output.md": "sample",
};

const blob = createZipBlob(files);
const buf = Buffer.from(await blob.arrayBuffer());
fs.writeFileSync(zipPath, buf);

fs.rmSync(outDir, { recursive: true, force: true });
execFileSync("powershell", [
  "-NoProfile",
  "-Command",
  `Expand-Archive -LiteralPath '${zipPath.replace(/'/g, "''")}' -DestinationPath '${outDir.replace(/'/g, "''")}' -Force`,
], { stdio: "inherit" });

for (const [name, expected] of Object.entries(files)) {
  const actual = fs.readFileSync(path.join(outDir, name), "utf8");
  if (actual !== expected) {
    console.error(`[NG Expand-Archive] ${name}`);
    process.exit(1);
  }
  console.log(`[OK Expand-Archive] ${name}`);
}

// Shell.Application は日本語パスで NameSpace が null になることがあるため ASCII パスで検証
const asciiZip = "C:\\Temp\\nene-verify.zip";
const asciiOut = "C:\\Temp\\nene-verify-out";
fs.mkdirSync("C:\\Temp", { recursive: true });
fs.copyFileSync(zipPath, asciiZip);
fs.rmSync(asciiOut, { recursive: true, force: true });
fs.mkdirSync(asciiOut, { recursive: true });
const psPath = path.join(root, "_shell_extract.ps1");
fs.writeFileSync(psPath, `
$ErrorActionPreference = 'Stop'
$shell = New-Object -ComObject Shell.Application
$zip = $shell.NameSpace('${asciiZip}')
$dest = $shell.NameSpace('${asciiOut}')
if ($null -eq $zip) { throw 'zip namespace null' }
if ($null -eq $dest) { throw 'dest namespace null' }
$dest.CopyHere($zip.Items(), 20)
$deadline = (Get-Date).AddSeconds(8)
do {
  Start-Sleep -Milliseconds 200
} while (-not (Test-Path '${asciiOut}\\README.md') -and (Get-Date) -lt $deadline)
if (-not (Test-Path '${asciiOut}\\README.md')) { throw 'Shell extract missing README.md' }
if (-not (Test-Path '${asciiOut}\\config\\api_keys.example')) { throw 'Shell extract missing nested file' }
`, "utf8");
execFileSync("powershell", ["-NoProfile", "-ExecutionPolicy", "Bypass", "-File", psPath], { stdio: "inherit" });

const shellReadme = fs.readFileSync(path.join(asciiOut, "README.md"), "utf8");
if (shellReadme !== files["README.md"]) {
  console.error("[NG Shell] README.md mismatch");
  process.exit(1);
}
console.log("[OK Shell] README.md + nested files");
console.log("[verify-zip] Expand-Archive and Windows Shell extract succeeded.");

fs.unlinkSync(helperPath);
fs.unlinkSync(psPath);
fs.rmSync(shellOutDir, { recursive: true, force: true });
