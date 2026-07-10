/**
 * ZIP 生成ロジックの解凍検証（script.js と同じヘッダー仕様）。
 */
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const zipPath = path.join(root, "test-fixed.zip");
const outDir = path.join(root, "test-unzip2");

function makeZipHeader(signature, values) {
  const fieldSizes = {
    0x04034b50: [2, 2, 2, 2, 2, 4, 4, 4, 2, 2],
    0x02014b50: [2, 2, 2, 2, 2, 2, 4, 4, 4, 2, 2, 2, 2, 2, 4, 4],
    0x06054b50: [2, 2, 2, 2, 4, 4, 2],
  }[signature];
  if (!fieldSizes || values.length !== fieldSizes.length) {
    throw new Error(`ZIP header mismatch for 0x${signature.toString(16)}`);
  }
  const size = 4 + fieldSizes.reduce((sum, bytes) => sum + bytes, 0);
  const buffer = new ArrayBuffer(size);
  const view = new DataView(buffer);
  let pointer = 0;
  view.setUint32(pointer, signature, true);
  pointer += 4;
  values.forEach((value, index) => {
    const bytes = fieldSizes[index];
    if (bytes === 2) view.setUint16(pointer, value & 0xffff, true);
    else view.setUint32(pointer, value >>> 0, true);
    pointer += bytes;
  });
  return new Uint8Array(buffer);
}

function crc32(bytes) {
  let crc = -1;
  const crcTable = Array.from({ length: 256 }, (_, index) => {
    let c = index;
    for (let k = 0; k < 8; k += 1) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    return c >>> 0;
  });
  for (let index = 0; index < bytes.length; index += 1) {
    crc = (crc >>> 8) ^ crcTable[(crc ^ bytes[index]) & 0xff];
  }
  return (crc ^ -1) >>> 0;
}

function zipDosDateTime(date) {
  const year = Math.max(1980, date.getFullYear());
  const dosTime = (date.getHours() << 11) | (date.getMinutes() << 5) | Math.floor(date.getSeconds() / 2);
  const dosDate = ((year - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate();
  return { time: dosTime & 0xffff, date: dosDate & 0xffff };
}

function createZipBuffer(fileMap) {
  const encoder = new TextEncoder();
  const localParts = [];
  const centralParts = [];
  let offset = 0;
  const utf8Flag = 0x0800;
  const dosDateTime = zipDosDateTime(new Date());

  Object.entries(fileMap).forEach(([entryPath, content]) => {
    const nameBytes = encoder.encode(entryPath.replace(/\\/g, "/"));
    const dataBytes = encoder.encode(String(content ?? ""));
    const crc = crc32(dataBytes);
    const localHeader = makeZipHeader(0x04034b50, [
      20, utf8Flag, 0, dosDateTime.time, dosDateTime.date,
      crc, dataBytes.length, dataBytes.length, nameBytes.length, 0,
    ]);
    localParts.push(localHeader, nameBytes, dataBytes);
    const centralHeader = makeZipHeader(0x02014b50, [
      20, 20, utf8Flag, 0, dosDateTime.time, dosDateTime.date,
      crc, dataBytes.length, dataBytes.length, nameBytes.length, 0, 0, 0, 0, 0, offset,
    ]);
    centralParts.push(centralHeader, nameBytes);
    offset += localHeader.length + nameBytes.length + dataBytes.length;
  });

  const centralSize = centralParts.reduce((sum, part) => sum + part.length, 0);
  const fileCount = Object.keys(fileMap).length;
  const endHeader = makeZipHeader(0x06054b50, [
    0, 0, fileCount, fileCount, centralSize, offset, 0,
  ]);
  return Buffer.concat([...localParts, ...centralParts, endHeader].map((part) => Buffer.from(part)));
}

const files = {
  "README.md": "# テスト",
  "index.html": "<!doctype html><html><body>ok</body></html>",
  "style.css": "body{color:red}",
  "script.js": "console.log('ok')",
  "config/api_keys.example": "KEY=xxx",
  "prompts/main_prompt.md": "日本語プロンプト",
};

fs.rmSync(outDir, { recursive: true, force: true });
fs.writeFileSync(zipPath, createZipBuffer(files));
execSync(
  `powershell -NoProfile -Command "Expand-Archive -LiteralPath '${zipPath.replace(/'/g, "''")}' -DestinationPath '${outDir.replace(/'/g, "''")}' -Force"`,
  { stdio: "inherit" },
);

for (const [name, expected] of Object.entries(files)) {
  const actual = fs.readFileSync(path.join(outDir, name), "utf8");
  if (actual !== expected) {
    console.error(`[NG] ${name}`);
    console.error(" expected:", JSON.stringify(expected));
    console.error(" actual  :", JSON.stringify(actual));
    process.exit(1);
  }
  console.log(`[OK] ${name}`);
}

console.log("[verify-zip] Expand-Archive succeeded with correct contents.");
