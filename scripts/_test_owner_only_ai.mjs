/**
 * .env のキーは作成者の確認用だけ、という約束を守れているか。
 * 他人（未ログイン）が公開ツールを実行しても Gemini は呼ばれず、見本が返る。
 */
import { chromium } from "playwright";

const BASE = "http://localhost:8787";
const checks = [];
const check = (ok, label, detail) => {
  checks.push({ ok: Boolean(ok) });
  console.log(`${ok ? "OK " : "NG "} ${label}${detail ? "  → " + detail : ""}`);
};

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.goto(`${BASE}/index.html`, { waitUntil: "networkidle" });

await page.evaluate(async (email) => {
  await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password: "owner-only-123", remember: true }),
  });
}, `owner_${Date.now()}@example.com`);
await page.reload({ waitUntil: "networkidle" });

const published = await page.evaluate(async () => {
  state.language = "ja";
  state.selectedCategoryIndex = 0;
  state.selectedProposalIndex = 0;
  state.answers = { purpose: "テーマを選ぶだけで注目株を半自動選定する", market: "日本株", output: "選定理由つきリスト" };
  if (typeof prepareNodes === "function") prepareNodes();
  await publishCreatedTool({ openAfter: false, autoTest: true });
  return { slug: state.lastPublish?.slug, url: state.lastPublish?.url };
});
check(Boolean(published.slug), "公開できた", published.url);

const guestRes = await fetch(`${BASE}/api/public/tools/${published.slug}/run`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ input: "test", demo: false }),
});
const guestData = await guestRes.json();
const guestRun = {
  status: guestRes.status,
  demo: guestData.demo,
  notice: guestData.notice || "",
  text: String(guestData.text || "").slice(0, 80),
};
check(guestRun.status === 200, "他人の実行は成功扱い（キーは使わない）", String(guestRun.status));
check(guestRun.demo === true, "他人には見本が返る");
check(/作成者の確認用|見本/.test(guestRun.notice + guestRun.text), "見本だと分かる案内がある", guestRun.notice);

const ownerRun = await page.evaluate(async (slug) => {
  const res = await fetch(`/api/public/tools/${slug}/run`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ input: "test", demo: false }),
  });
  const data = await res.json();
  return { status: res.status, code: data.code || "", demo: Boolean(data.demo), error: data.error || "" };
}, published.slug);
check(
  ownerRun.status === 503 && ownerRun.code === "SERVER_API_KEY_MISSING",
  "作成者の実行だけ本番AIを試みる（キー未設定なら 503）",
  `${ownerRun.status} ${ownerRun.code}`,
);
check(ownerRun.demo !== true, "作成者ルートは見本でごまかさない");

const ng = checks.filter((item) => !item.ok).length;
console.log(`\n合計 ${checks.length} / 合格 ${checks.length - ng} / 不合格 ${ng}`);
try { await browser.close(); } catch { /* Windows で終了時に出ることがある */ }
process.exit(ng ? 1 : 0);
