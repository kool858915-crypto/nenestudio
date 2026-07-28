import "dotenv/config";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Stripe from "stripe";
import { OAuth2Client } from "google-auth-library";
import appleSignin from "apple-signin-auth";
import {
  AUTH_COOKIE_NAME,
  SECURITY_HEADERS,
  buildAuthCookie,
  buildClearAuthCookie,
  isPublicStaticPath,
  parseCookies,
} from "./security.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const appRoot = path.resolve(__dirname, "..");

const app = express();
const port = Number(process.env.PORT || 8787);
const appBaseUrl = process.env.APP_BASE_URL || `http://localhost:${port}`;
const publicAppUrl = process.env.PUBLIC_APP_URL || appBaseUrl;
const corsOrigins = (process.env.CORS_ORIGIN || publicAppUrl)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const jwtSecret = process.env.JWT_SECRET || "dev-only-change-me";
const isProduction = process.env.NODE_ENV === "production";
const cookieDomain = process.env.COOKIE_DOMAIN || "";
const requirePersistentDb = process.env.REQUIRE_PERSISTENT_DB === "true";
const databasePath = path.resolve(appRoot, process.env.DATABASE_PATH || "./server/nene-studio-db.json");
assertProductionSecurity();
const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;

const SUBSCRIPTION_PLANS = {
  adfree: { aiLimit: 0, priceYen: 480 },
  ai50: { aiLimit: 50, priceYen: 980 },
  ai100: { aiLimit: 100, priceYen: 1250 },
};

const STRIPE_PRICE_BY_PLAN = {
  adfree: process.env.STRIPE_PRICE_ID_ADFREE,
  ai50: process.env.STRIPE_PRICE_ID_AI50 || process.env.STRIPE_PRICE_ID,
  ai100: process.env.STRIPE_PRICE_ID_AI100,
};

const store = loadStore();
const googleOAuthClient = process.env.GOOGLE_CLIENT_ID
  ? new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
  : null;

app.use((request, response, next) => {
  Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
    response.setHeader(key, value);
  });
  return next();
});

app.use((request, response, next) => {
  const origin = request.headers.origin;
  if (origin && (corsOrigins.includes(origin) || corsOrigins.includes("*"))) {
    response.setHeader("Access-Control-Allow-Origin", origin);
    response.setHeader("Vary", "Origin");
    response.setHeader("Access-Control-Allow-Credentials", "true");
  }
  response.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization,Stripe-Signature");
  if (request.method === "OPTIONS") {
    return response.sendStatus(204);
  }
  return next();
});

app.post("/api/stripe/webhook", express.raw({ type: "application/json" }), (request, response) => {
  if (!stripe || !process.env.STRIPE_WEBHOOK_SECRET) {
    return response.status(500).send("Stripe webhook is not configured.");
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      request.body,
      request.headers["stripe-signature"],
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (error) {
    return response.status(400).send(`Webhook Error: ${error.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const plan = resolvePlanFromCheckout(session);
    markUserPaid(session.client_reference_id, session.customer, session.subscription, "active", plan);
  }

  if (event.type === "customer.subscription.updated") {
    const subscription = event.data.object;
    const user = store.users.find((item) => item.stripeSubscriptionId === subscription.id);
    if (user && subscription.status === "active") {
      user.subscriptionStatus = "active";
      user.subscriptionPlan = resolvePlanFromPriceId(subscription.items?.data?.[0]?.price?.id) || user.subscriptionPlan || "free";
      saveStore();
    }
  }

  if (event.type === "customer.subscription.deleted") {
    const subscription = event.data.object;
    const user = store.users.find((item) => item.stripeSubscriptionId === subscription.id);
    if (user) {
      user.subscriptionStatus = "free";
      user.subscriptionPlan = "free";
      saveStore();
    }
  }

  if (event.type === "invoice.payment_failed") {
    const invoice = event.data.object;
    const user = store.users.find((item) => item.stripeCustomerId === invoice.customer);
    if (user) {
      user.subscriptionStatus = "past_due";
      saveStore();
    }
  }

  return response.json({ received: true });
});

app.use(express.json({ limit: "2mb" }));

const TOOLS_PUBLIC_BASE = String(process.env.TOOLS_PUBLIC_BASE_URL || "https://tools.nenestudio.net").replace(/\/$/, "");

function isToolsHost(request) {
  const host = String(request.headers["x-forwarded-host"] || request.headers.host || "")
    .split(",")[0]
    .trim()
    .split(":")[0]
    .toLowerCase();
  return host === "tools.nenestudio.net"
    || host === "tools.localhost"
    || host.startsWith("tools.");
}

/** tools.nenestudio.net 用：検索除外・ツール配信 */
app.use((request, response, next) => {
  if (!isToolsHost(request)) return next();
  if (request.path.startsWith("/api/")) return next();
  if (request.path === "/robots.txt") {
    return response.type("text").send("User-agent: *\nDisallow: /\n");
  }
  if (request.method === "GET" && (request.path === "/" || request.path === "")) {
    return response.type("html").send(buildToolsPortalHtml());
  }
  if (request.method === "GET" && /^\/[a-z0-9]{6,40}\/?$/i.test(request.path)) {
    const slug = request.path.replace(/\//g, "");
    return servePublishedToolPage(request, response, slug);
  }
  return response.status(404).type("html").send(buildNoIndexHtml("ページが見つかりません", "<p>このURLは無効です。</p>"));
});

app.use((request, response, next) => {
  if (!isPublicStaticPath(request.path)) {
    return next();
  }
  if (request.path === "/" || request.path === "") {
    return response.sendFile(path.join(appRoot, "index.html"));
  }
  return response.sendFile(path.join(appRoot, request.path.replace(/^\//, "")));
});

/** 互換: api ドメインでも /t/:slug で開ける */
app.get("/t/:slug", (request, response) => servePublishedToolPage(request, response, request.params.slug));

app.get("/t/:slug/robots.txt", (request, response) => {
  response.type("text").send("User-agent: *\nDisallow: /\n");
});

function servePublishedToolPage(request, response, slug) {
  ensurePublishedStore();
  const tool = store.publishedTools.find((item) => item.slug === slug && item.status === "active");
  if (!tool) {
    return response.status(404).type("html").send(buildNoIndexHtml("未公開", "<p>この公開URLは見つかりません。</p>"));
  }

  // private=リンクを知っている人のみ（検索非掲載・デフォルト）
  // password=パスワード保護 / public=一般公開（将来の一覧掲載用フラグ）
  const visibility = tool.visibility || "private";
  const unlock = getToolUnlock(request, slug);

  if (visibility === "password" && !unlock && !isToolOwner(request, tool)) {
    return response.type("html").send(buildPasswordGateHtml(slug, tool.title));
  }

  // 同一オリジン /api に固定（パスワードCookieが届くようにする）
  const apiBase = "/api";
  let html = String(tool.html || "")
    .replaceAll("__NENE_SLUG__", tool.slug)
    .replaceAll("__NENE_API_BASE__", apiBase)
    .replaceAll("__NENE_DEMO_MODE__", "false");
  if (!/<meta\s+name=["']robots["']/i.test(html)) {
    html = html.replace(/<head([^>]*)>/i, '<head$1>\n  <meta name="robots" content="noindex,nofollow" />');
  }
  response.setHeader("X-Robots-Tag", "noindex, nofollow");
  response.setHeader("Content-Security-Policy", [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https: blob:",
    "connect-src 'self' https://api.nenestudio.net https://nenestudio.onrender.com",
    "object-src 'none'",
    "base-uri 'self'",
  ].join("; "));
  return response.type("html").send(html);
}

app.post("/api/public/tools/:slug/unlock", (request, response) => {
  ensurePublishedStore();
  const tool = store.publishedTools.find((item) => item.slug === request.params.slug && item.status === "active");
  if (!tool) return response.status(404).json({ error: "公開ツールが見つかりません。" });
  if ((tool.visibility || "private") !== "password") {
    return response.status(400).json({ error: "このツールはパスワード保護ではありません。" });
  }
  const password = String(request.body?.password || "");
  if (!tool.passwordHash || !bcrypt.compareSync(password, tool.passwordHash)) {
    return response.status(401).json({ error: "パスワードが違います。", code: "BAD_PASSWORD" });
  }
  const token = signToolUnlock(tool.slug);
  response.setHeader("Set-Cookie", buildToolUnlockCookie(tool.slug, token));
  return response.json({ ok: true });
});

/** 公開ツールのAI実行（ブラウザ→NENE API→Gemini。直結禁止） */
app.post("/api/public/tools/:slug/run", async (request, response) => {
  ensurePublishedStore();
  const tool = store.publishedTools.find((item) => item.slug === request.params.slug && item.status === "active");
  if (!tool) {
    return response.status(404).json({ error: "公開ツールが見つかりません。", code: "NOT_FOUND" });
  }
  if (!canAccessPublishedTool(request, tool)) {
    return response.status(403).json({ error: "このツールへのアクセス権がありません。", code: "FORBIDDEN" });
  }

  const { input, systemPrompt, demo } = request.body || {};
  if (demo) {
    return response.json({
      text: buildDemoResult(tool.toolMode || "task_auto", tool.title),
      source: "demo",
      demo: true,
    });
  }

  const provider = tool.provider || "gemini";
  const apiKey = getServerProviderKey(provider);
  if (!apiKey) {
    return response.status(503).json({
      error: "サーバー側のAPIキー（環境変数）が未設定です。運営に連絡してください。",
      code: "SERVER_API_KEY_MISSING",
    });
  }

  try {
    const text = await runExternalAi({
      provider,
      apiKey,
      systemPrompt: systemPrompt || tool.systemPrompt || "入力を整理してください。",
      input: String(input || ""),
      requireSearch: Boolean(tool.requireSearch),
    });
    if (!String(text || "").trim()) {
      return response.status(502).json({ error: "AIから空の応答が返りました。", code: "EMPTY_RESPONSE" });
    }
    tool.runCount = (tool.runCount || 0) + 1;
    tool.lastRunAt = new Date().toISOString();
    tool.updatedAt = tool.lastRunAt;
    saveStore();
    return response.json({
      text,
      source: "server_env_proxy",
      demo: false,
      usage: {
        runCount: tool.runCount,
        lastRunAt: tool.lastRunAt,
      },
    });
  } catch (error) {
    const message = error.message || "公開ツールの実行に失敗しました。";
    const code = /API key|api key|権限|invalid|401|403/i.test(message)
      ? "API_KEY_ERROR"
      : /network|fetch|ENOTFOUND|timeout/i.test(message)
        ? "NETWORK_ERROR"
        : "AI_ERROR";
    return response.status(400).json({ error: message, code });
  }
});

/** Studioから公開：自動テスト合格必須。キーはサーバー環境変数のみ使用 */
app.post("/api/publish", requireAuth, async (request, response) => {
  ensurePublishedStore();
  const {
    title,
    html,
    systemPrompt,
    toolMode,
    provider,
    requireSearch,
    testReport,
    testPassed,
    visibility,
    password,
  } = request.body || {};
  if (!title || !html) {
    return response.status(400).json({ error: "公開するツール名とHTMLが必要です。", code: "BAD_REQUEST" });
  }
  if (!testPassed || !isPassingTestReport(testReport)) {
    return response.status(400).json({
      error: "公開前チェックに合格したツールだけ公開できます。",
      code: "TEST_REQUIRED",
    });
  }

  const vis = ["private", "password", "public"].includes(visibility) ? visibility : "private";
  if (vis === "password" && String(password || "").length < 4) {
    return response.status(400).json({ error: "パスワード保護には4文字以上のパスワードが必要です。", code: "PASSWORD_REQUIRED" });
  }

  const serverKey = getServerProviderKey(provider === "openai" ? "openai" : "gemini");
  // キー未設定でも公開URLは発行する（本番AI実行時だけキーが必要）

  const slug = makePublishSlug();
  const now = new Date().toISOString();
  const record = {
    id: nextId("publishedTools"),
    slug,
    userId: request.user.id,
    title: String(title).slice(0, 120),
    html: String(html),
    systemPrompt: String(systemPrompt || ""),
    toolMode: String(toolMode || "task_auto"),
    provider: provider === "openai" ? "openai" : "gemini",
    requireSearch: Boolean(requireSearch),
    visibility: vis,
    passwordHash: vis === "password" ? bcrypt.hashSync(String(password), 10) : "",
    // 将来の販売・課金・モデル切替用フィールド
    monetization: {
      sellable: false,
      subscription: false,
      creditCost: 0,
      usageLimit: 0,
      modelId: provider === "openai"
        ? (process.env.OPENAI_MODEL || "gpt-4o-mini")
        : (process.env.GEMINI_MODEL || "gemini-2.5-flash"),
    },
    testReport: testReport || null,
    status: "active",
    runCount: 0,
    lastRunAt: "",
    createdAt: now,
    updatedAt: now,
  };
  store.publishedTools.push(record);
  saveStore();

  // tools.nenestudio.net のDNSが未設定でも開けるよう、API側URLを主URLにする
  const apiFallbackUrl = `${getPublicApiOrigin(request)}/t/${slug}`;
  const toolsUrl = `${TOOLS_PUBLIC_BASE}/${slug}`;
  const url = apiFallbackUrl;
  return response.json({
    id: record.id,
    slug,
    url,
    toolsUrl,
    apiFallbackUrl,
    visibility: vis,
    hasServerKey: Boolean(serverKey),
    testReport: record.testReport,
    createdAt: record.createdAt,
    qrUrl: `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(url)}`,
    shareText: `${record.title}\n${url}`,
  });
});

app.get("/api/published/:slug/stats", requireAuth, (request, response) => {
  ensurePublishedStore();
  const tool = store.publishedTools.find((item) => item.slug === request.params.slug);
  if (!tool || tool.userId !== request.user.id) {
    return response.status(404).json({ error: "見つかりません。" });
  }
  return response.json({
    slug: tool.slug,
    runCount: tool.runCount || 0,
    lastRunAt: tool.lastRunAt || "",
    createdAt: tool.createdAt,
    updatedAt: tool.updatedAt || tool.createdAt,
    visibility: tool.visibility || "private",
  });
});

app.post("/api/auth/register", (request, response) => {
  const { email, password, remember } = request.body || {};
  if (!isValidEmail(email) || !isValidPassword(password)) {
    return response.status(400).json({ error: "メールアドレスと8文字以上のパスワードを入力してください。" });
  }

  const normalizedEmail = email.toLowerCase();
  const existing = store.users.find((user) => user.email === normalizedEmail);
  if (existing) {
    if (existing.authProvider === "google") {
      return response.status(409).json({ error: "このメールアドレスは Google 登録済みです。Google でログインしてください。" });
    }
    if (existing.authProvider === "apple") {
      return response.status(409).json({ error: "このメールアドレスは Apple 登録済みです。Apple でログインしてください。" });
    }
    return response.status(409).json({ error: "このメールアドレスはすでに登録されています。ログインをお試しください。" });
  }

  const user = createUserRecord({
    email: normalizedEmail,
    passwordHash: bcrypt.hashSync(password, 12),
    authProvider: "email",
  });
  store.users.push(user);
  saveStore();
  return sendAuthResponse(request, response, user, remember !== false);
});

app.post("/api/auth/login", (request, response) => {
  const { email, password, remember } = request.body || {};
  const user = store.users.find((item) => item.email === String(email || "").toLowerCase());
  if (!user || user.authProvider === "google" || user.authProvider === "apple") {
    return response.status(401).json({ error: "メールアドレスまたはパスワードが違います。Google / Apple ログインをお試しください。" });
  }
  if (!user.passwordHash || !bcrypt.compareSync(String(password || ""), user.passwordHash)) {
    return response.status(401).json({ error: "メールアドレスまたはパスワードが違います。" });
  }
  return sendAuthResponse(request, response, user, remember !== false);
});

app.post("/api/auth/logout", (request, response) => {
  response.setHeader("Set-Cookie", buildClearAuthCookie({ isProduction, cookieDomain }));
  return response.json({ ok: true });
});

app.get("/api/auth/providers", (request, response) => {
  response.json({
    google: {
      enabled: Boolean(process.env.GOOGLE_CLIENT_ID),
      clientId: process.env.GOOGLE_CLIENT_ID || "",
    },
    apple: {
      enabled: Boolean(process.env.APPLE_CLIENT_ID),
      clientId: process.env.APPLE_CLIENT_ID || "",
    },
  });
});

app.get("/api/server/status", (request, response) => {
  response.json({
    auth: {
      email: true,
      google: Boolean(process.env.GOOGLE_CLIENT_ID),
      apple: Boolean(process.env.APPLE_CLIENT_ID),
      jwtConfigured: Boolean(jwtSecret && jwtSecret !== "dev-only-change-me"),
    },
    billing: {
      stripe: Boolean(stripe),
      plans: Object.entries(SUBSCRIPTION_PLANS).map(([id, plan]) => ({
        id,
        priceYen: plan.priceYen,
        aiLimit: plan.aiLimit,
        stripeConfigured: Boolean(STRIPE_PRICE_BY_PLAN[id]),
      })),
    },
  });
});

app.post("/api/auth/google", async (request, response) => {
  if (!googleOAuthClient || !process.env.GOOGLE_CLIENT_ID) {
    return response.status(503).json({ error: "Googleログインはサーバー設定が未完了です。" });
  }
  const credential = String(request.body?.credential || request.body?.idToken || "").trim();
  if (!credential) {
    return response.status(400).json({ error: "Googleログイン情報が不足しています。" });
  }
  try {
    const ticket = await googleOAuthClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload?.sub) {
      return response.status(401).json({ error: "Googleログインの確認に失敗しました。" });
    }
    const user = findOrCreateOAuthUser({
      provider: "google",
      oauthId: payload.sub,
      email: payload.email,
    });
    return sendAuthResponse(request, response, user, request.body?.remember !== false);
  } catch (error) {
    return response.status(401).json({ error: error.message || "Googleログインの確認に失敗しました。" });
  }
});

app.post("/api/auth/apple", async (request, response) => {
  if (!process.env.APPLE_CLIENT_ID) {
    return response.status(503).json({ error: "Appleログインはサーバー設定が未完了です。" });
  }
  const idToken = String(request.body?.idToken || request.body?.identityToken || "").trim();
  if (!idToken) {
    return response.status(400).json({ error: "Appleログイン情報が不足しています。" });
  }
  try {
    const payload = await appleSignin.verifyIdToken(idToken, {
      audience: process.env.APPLE_CLIENT_ID,
      ignoreExpiration: false,
    });
    if (!payload?.sub) {
      return response.status(401).json({ error: "Appleログインの確認に失敗しました。" });
    }
    const user = findOrCreateOAuthUser({
      provider: "apple",
      oauthId: payload.sub,
      email: payload.email,
    });
    return sendAuthResponse(request, response, user, request.body?.remember !== false);
  } catch (error) {
    return response.status(401).json({ error: error.message || "Appleログインの確認に失敗しました。" });
  }
});

app.get("/api/auth/me", requireAuth, (request, response) => {
  response.json({ user: publicUser(request.user) });
});

app.get("/api/tools", requireAuth, (request, response) => {
  const tools = store.savedTools
    .filter((tool) => tool.userId === request.user.id)
    .sort((a, b) => b.id - a.id);
  response.json({ tools });
});

app.post("/api/tools", requireAuth, (request, response) => {
  const { title, summary, payload } = request.body || {};
  if (!title || !payload) {
    return response.status(400).json({ error: "保存するツール名と内容が必要です。" });
  }
  const tool = {
    id: nextId("savedTools"),
    userId: request.user.id,
    title: String(title),
    summary: String(summary || ""),
    payload,
    createdAt: new Date().toISOString(),
  };
  store.savedTools.push(tool);
  saveStore();
  response.json({ id: tool.id });
});

app.post("/api/billing/create-checkout-session", requireAuth, async (request, response) => {
  const plan = String(request.body?.plan || "").trim();
  if (!SUBSCRIPTION_PLANS[plan]) {
    return response.status(400).json({ error: "有効な有料プラン（adfree / ai50 / ai100）を選択してください。" });
  }
  const priceId = STRIPE_PRICE_BY_PLAN[plan];
  if (!stripe || !priceId) {
    return response.status(500).json({ error: "Stripeのサーバー設定が未完了です。" });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: request.user.stripeCustomerId || undefined,
      customer_email: request.user.stripeCustomerId ? undefined : request.user.email,
      client_reference_id: String(request.user.id),
      metadata: { plan, userId: String(request.user.id) },
      subscription_data: { metadata: { plan } },
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${publicAppUrl}/index.html?stripe=success`,
      cancel_url: `${publicAppUrl}/index.html?stripe=cancel`,
      allow_promotion_codes: false,
    });

    return response.json({ url: session.url, plan });
  } catch (error) {
    const message = error?.raw?.message || error.message || "Stripe Checkoutの作成に失敗しました。";
    return response.status(502).json({ error: message });
  }
});

app.post("/api/ai/generate", requireAuth, async (request, response) => {
  const { systemPrompt, input, userApiKey, provider, requireSearch } = request.body || {};
  if (!input) {
    return response.status(400).json({ error: "入力本文が必要です。" });
  }

  const user = normalizeAiUsage(request.user);
  const aiLimit = getAiLimitForUser(user);
  const ownKey = String(userApiKey || "").trim();
  const wantSearch = Boolean(requireSearch);

  if (ownKey) {
    try {
      const text = await runExternalAi({
        provider: provider || "openai",
        apiKey: ownKey,
        systemPrompt,
        input,
        requireSearch: wantSearch,
      });
      return response.json({ text, source: "user_api_key" });
    } catch (error) {
      return response.status(400).json({ error: error.message || "APIキーでの生成に失敗しました。" });
    }
  }

  if (aiLimit <= 0) {
    const paidAdOnly = user.subscriptionStatus === "active" && user.subscriptionPlan === "adfree";
    return response.status(403).json({
      error: paidAdOnly
        ? "480円プランは広告カットのみです。AI生成には980円/1250円プランへ加入するか、「設定」でAPIキーを登録してください。"
        : "無料プランでは設計図出力のみです。AI生成には「設定」でAPIキーを登録するか、980円/1250円プランに加入してください。",
      code: paidAdOnly ? "ADFREE_PLAN_NO_SERVER_AI" : "FREE_PLAN_NO_SERVER_AI",
    });
  }

  if (user.aiUsageCount >= aiLimit) {
    return response.status(402).json({
      error: `今月の運営API生成上限（${aiLimit}回）に達しました。自分のAPIキーを設定するか、来月までお待ちください。`,
      code: "QUOTA_EXCEEDED",
      aiUsageCount: user.aiUsageCount,
      aiUsageLimit: aiLimit,
    });
  }

  if (!process.env.OPENAI_API_KEY) {
    return response.status(500).json({ error: "OpenAI APIキーがサーバーに設定されていません。" });
  }

  try {
    const text = await runExternalAi({
      provider: "openai",
      apiKey: process.env.OPENAI_API_KEY,
      systemPrompt,
      input,
    });
    user.aiUsageCount += 1;
    saveStore();
    return response.json({
      text,
      source: "server_api_key",
      aiUsageCount: user.aiUsageCount,
      aiUsageLimit: aiLimit,
      aiUsageRemaining: Math.max(0, aiLimit - user.aiUsageCount),
    });
  } catch (error) {
    return response.status(500).json({ error: error.message || "OpenAI APIの実行に失敗しました。" });
  }
});

app.listen(port, () => {
  console.log(`NENE Studio server running at ${appBaseUrl}`);
  logDatabasePersistenceWarning();
});

function assertProductionSecurity() {
  if (!isProduction) return;
  if (!jwtSecret || jwtSecret === "dev-only-change-me") {
    console.error("FATAL: JWT_SECRET が未設定です。Render Environment にランダムな長い文字列を設定してください。");
    process.exit(1);
  }
  if (requirePersistentDb && isDatabaseOnEphemeralStorage()) {
    console.error(
      "FATAL: REQUIRE_PERSISTENT_DB=true ですが DATABASE_PATH が永続ディスク外です。"
      + " render.yaml の disk と DATABASE_PATH=/var/data/nene-studio-db.json を有効化してください。",
    );
    process.exit(1);
  }
}

function isDatabaseOnEphemeralStorage() {
  const defaultRelativePath = path.resolve(appRoot, "./server/nene-studio-db.json");
  return databasePath === defaultRelativePath || databasePath.startsWith(appRoot + path.sep);
}

function logDatabasePersistenceWarning() {
  if (!isProduction) return;
  if (isDatabaseOnEphemeralStorage()) {
    console.warn(
      "[WARN] DATABASE_PATH がアプリ本体と同じ領域です。"
      + " Render 無料プランでは再デプロイ時にユーザーデータが消える可能性があります。"
      + " Starter 以上 + 永続ディスク（render.yaml 参照）か DATABASE_PATH=/var/data/nene-studio-db.json を検討してください。",
    );
  } else {
    console.log(`[INFO] DATABASE_PATH=${databasePath}（永続ディスク想定）`);
  }
}

function sendAuthResponse(request, response, user, remember) {
  const token = jwt.sign({ sub: user.id }, jwtSecret, { expiresIn: "30d" });
  response.setHeader(
    "Set-Cookie",
    buildAuthCookie(token, remember, { isProduction, cookieDomain }),
  );
  const payload = { user: publicUser(user) };
  if (shouldReturnTokenInBody(request)) {
    payload.token = token;
  }
  return response.json(payload);
}

function shouldReturnTokenInBody(request) {
  const origin = request.headers.origin;
  if (!origin) return false;
  if (!cookieDomain) return true;
  try {
    const hostname = new URL(origin).hostname;
    const normalizedCookieDomain = cookieDomain.replace(/^\./, "");
    return hostname !== normalizedCookieDomain && !hostname.endsWith(`.${normalizedCookieDomain}`);
  } catch {
    return true;
  }
}

function requireAuth(request, response, next) {
  const cookies = parseCookies(request);
  const token = cookies[AUTH_COOKIE_NAME]
    || request.headers.authorization?.replace(/^Bearer\s+/i, "");
  if (!token) {
    return response.status(401).json({ error: "ログインが必要です。" });
  }
  try {
    const payload = jwt.verify(token, jwtSecret);
    const user = store.users.find((item) => item.id === Number(payload.sub));
    if (!user) throw new Error("User not found");
    request.user = user;
    return next();
  } catch (error) {
    return response.status(401).json({ error: "ログイン情報が無効です。" });
  }
}

function createAuthPayload(user) {
  return {
    token: jwt.sign({ sub: user.id }, jwtSecret, { expiresIn: "30d" }),
    user: publicUser(user),
  };
}

function publicUser(user) {
  const normalized = normalizeSubscriptionPlan(normalizeAiUsage(user));
  const isActive = normalized.subscriptionStatus === "active";
  const limit = getAiLimitForUser(normalized);
  const used = normalized.aiUsageCount || 0;
  return {
    id: normalized.id,
    email: normalized.email,
    isPaid: isActive,
    isAdFree: isActive,
    subscriptionStatus: normalized.subscriptionStatus,
    subscriptionPlan: normalized.subscriptionPlan || "free",
    authProvider: normalized.authProvider || "email",
    aiUsageCount: used,
    aiUsageLimit: limit,
    aiUsageRemaining: limit > 0 ? Math.max(0, limit - used) : 0,
    aiUsageMonth: normalized.aiUsageMonth || currentUsageMonth(),
  };
}

function getAiLimitForUser(user) {
  if (user.subscriptionStatus !== "active") return 0;
  const plan = user.subscriptionPlan || "free";
  return SUBSCRIPTION_PLANS[plan]?.aiLimit ?? 0;
}

function normalizeSubscriptionPlan(user) {
  if (!user.subscriptionPlan) {
    user.subscriptionPlan = user.subscriptionStatus === "active" ? "ai50" : "free";
  }
  return user;
}

function resolvePlanFromCheckout(session) {
  const metadataPlan = session.metadata?.plan;
  if (metadataPlan && SUBSCRIPTION_PLANS[metadataPlan]) return metadataPlan;
  const pricePlan = resolvePlanFromPriceId(session.display_items?.[0]?.price?.id)
    || resolvePlanFromPriceId(session?.line_items?.data?.[0]?.price?.id);
  return pricePlan || "";
}

function resolvePlanFromPriceId(priceId) {
  if (!priceId) return "";
  return Object.entries(STRIPE_PRICE_BY_PLAN).find(([, id]) => id === priceId)?.[0] || "";
}

function currentUsageMonth() {
  return new Date().toISOString().slice(0, 7);
}

function normalizeAiUsage(user) {
  const month = currentUsageMonth();
  if (user.aiUsageMonth !== month) {
    user.aiUsageMonth = month;
    user.aiUsageCount = 0;
    saveStore();
  }
  if (typeof user.aiUsageCount !== "number") user.aiUsageCount = 0;
  return user;
}

async function runExternalAi({ provider, apiKey, systemPrompt, input, requireSearch = false }) {
  if (provider === "gemini") {
    const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;
    const body = {
      systemInstruction: { parts: [{ text: systemPrompt || "入力内容を整理してください。" }] },
      contents: [{ role: "user", parts: [{ text: input }] }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 8192 },
    };
    if (requireSearch) {
      body.tools = [{ google_search: {} }];
    }
    const apiResponse = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await apiResponse.json();
    if (!apiResponse.ok) {
      throw new Error(data.error?.message || "Gemini APIの実行に失敗しました。");
    }
    const text = data.candidates?.[0]?.content?.parts?.map((part) => part.text).join("") || "";
    const sources = (data.candidates?.[0]?.groundingMetadata?.groundingChunks || [])
      .map((chunk) => ({ title: chunk.web?.title || "", uri: chunk.web?.uri || "" }))
      .filter((item) => item.title || item.uri);
    if (requireSearch && !sources.length && !/情報源|出典|発表日|http/i.test(text)) {
      throw new Error("最新ニュースを取得できなかったため、選定を中止しました。");
    }
    return text;
  }

  const apiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt || "入力内容を整理してください。" },
        { role: "user", content: input },
      ],
      temperature: 0.7,
    }),
  });
  const data = await apiResponse.json();
  if (!apiResponse.ok) {
    throw new Error(data.error?.message || "OpenAI APIの実行に失敗しました。");
  }
  return data.choices?.[0]?.message?.content || "";
}

function createUserRecord({ email, passwordHash, authProvider, googleId = "", appleId = "" }) {
  return {
    id: nextId("users"),
    email,
    passwordHash: passwordHash || "",
    authProvider: authProvider || "email",
    googleId,
    appleId,
    stripeCustomerId: "",
    stripeSubscriptionId: "",
    subscriptionStatus: "free",
    subscriptionPlan: "free",
    aiUsageMonth: currentUsageMonth(),
    aiUsageCount: 0,
    createdAt: new Date().toISOString(),
  };
}

function findOrCreateOAuthUser({ provider, oauthId, email }) {
  const idField = provider === "google" ? "googleId" : "appleId";
  let user = store.users.find((item) => item[idField] === oauthId);
  const normalizedEmail = String(email || "").toLowerCase();
  if (!user && normalizedEmail && isValidEmail(normalizedEmail)) {
    user = store.users.find((item) => item.email === normalizedEmail);
    if (user) {
      user[idField] = oauthId;
      saveStore();
      return user;
    }
  }
  if (user) return user;

  const fallbackEmail = normalizedEmail && isValidEmail(normalizedEmail)
    ? normalizedEmail
    : `${provider}-${oauthId.slice(0, 12)}@oauth.nenestudio.local`;

  user = createUserRecord({
    email: fallbackEmail,
    passwordHash: bcrypt.hashSync(crypto.randomUUID(), 12),
    authProvider: provider,
    googleId: provider === "google" ? oauthId : "",
    appleId: provider === "apple" ? oauthId : "",
  });
  store.users.push(user);
  saveStore();
  return user;
}

function markUserPaid(userId, customerId, subscriptionId, status, plan = "") {
  const user = store.users.find((item) => item.id === Number(userId));
  if (!user) return;
  if (!SUBSCRIPTION_PLANS[plan]) return;
  user.stripeCustomerId = customerId || user.stripeCustomerId;
  user.stripeSubscriptionId = subscriptionId || user.stripeSubscriptionId;
  user.subscriptionStatus = status;
  user.subscriptionPlan = plan;
  saveStore();
}

function loadStore() {
  if (!fs.existsSync(databasePath)) {
    return {
      users: [],
      savedTools: [],
      publishedTools: [],
      counters: { users: 0, savedTools: 0, publishedTools: 0 },
    };
  }
  const data = JSON.parse(fs.readFileSync(databasePath, "utf8"));
  if (!Array.isArray(data.publishedTools)) data.publishedTools = [];
  if (!data.counters) data.counters = {};
  if (typeof data.counters.publishedTools !== "number") data.counters.publishedTools = data.publishedTools.length;
  return data;
}

function ensurePublishedStore() {
  if (!Array.isArray(store.publishedTools)) store.publishedTools = [];
  if (!store.counters) store.counters = {};
}

function getPublicApiOrigin(request) {
  const fromEnv = process.env.PUBLIC_API_URL || process.env.APP_BASE_URL;
  if (fromEnv) return String(fromEnv).replace(/\/$/, "").replace(/\/api$/, "");
  const host = request.headers["x-forwarded-host"] || request.headers.host;
  const proto = request.headers["x-forwarded-proto"] || request.protocol || "https";
  return `${proto}://${host}`;
}

function getPublicAppOrigin(request) {
  return String(process.env.PUBLIC_APP_URL || publicAppUrl || getPublicApiOrigin(request)).replace(/\/$/, "");
}

function makePublishSlug() {
  // ランダムID（URLを知っている人向け）
  let slug = "";
  do {
    slug = crypto.randomBytes(5).toString("hex"); // 10桁hex
  } while (store.publishedTools.some((item) => item.slug === slug));
  return slug;
}

function getServerProviderKey(provider) {
  if (provider === "openai") return String(process.env.OPENAI_API_KEY || "").trim();
  return String(process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || "").trim();
}

function isPassingTestReport(report) {
  const text = String(report || "");
  if (!text) return false;
  if (/公開前チェック: 成功/.test(text)) return true;
  if (/自動クリックテスト: 成功/.test(text) && !/^NG /m.test(text)) return true;
  return false;
}

function isToolOwner(request, tool) {
  try {
    const cookies = parseCookies(request);
    const token = cookies[AUTH_COOKIE_NAME]
      || request.headers.authorization?.replace(/^Bearer\s+/i, "");
    if (!token) return false;
    const payload = jwt.verify(token, jwtSecret);
    return Number(payload.sub) === Number(tool.userId);
  } catch {
    return false;
  }
}

function signToolUnlock(slug) {
  return jwt.sign({ tool: slug, typ: "tool_unlock" }, jwtSecret, { expiresIn: "7d" });
}

function getToolUnlock(request, slug) {
  try {
    const cookies = parseCookies(request);
    const raw = cookies[`nene_tool_${slug}`];
    if (!raw) return false;
    const payload = jwt.verify(raw, jwtSecret);
    return payload?.typ === "tool_unlock" && payload?.tool === slug;
  } catch {
    return false;
  }
}

function buildToolUnlockCookie(slug, token) {
  const parts = [
    `nene_tool_${slug}=${encodeURIComponent(token)}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    `Max-Age=${7 * 24 * 60 * 60}`,
  ];
  if (isProduction) parts.push("Secure");
  return parts.join("; ");
}

function canAccessPublishedTool(request, tool) {
  const visibility = tool.visibility || "private";
  if (visibility === "public" || visibility === "private") return true;
  if (visibility === "password") {
    return isToolOwner(request, tool) || getToolUnlock(request, tool.slug);
  }
  return false;
}

function buildNoIndexHtml(title, bodyHtml) {
  return `<!doctype html>
<html lang="ja"><head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex,nofollow" />
<title>${escapeHtmlServer(title)}</title>
<style>body{font-family:sans-serif;max-width:640px;margin:40px auto;padding:0 16px;line-height:1.7;color:#152033}</style>
</head><body><h1>${escapeHtmlServer(title)}</h1>${bodyHtml}</body></html>`;
}

function buildToolsPortalHtml() {
  return buildNoIndexHtml(
    "NENE Tools",
    "<p>ここは個別ツールの公開ドメインです。検索には載りません。発行されたURLだけをお使いください。</p>",
  );
}

function buildPasswordGateHtml(slug, title) {
  return `<!doctype html>
<html lang="ja"><head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex,nofollow" />
<title>パスワード保護 - ${escapeHtmlServer(title)}</title>
<style>
body{font-family:sans-serif;max-width:420px;margin:48px auto;padding:0 16px;color:#152033}
input,button{width:100%;box-sizing:border-box;padding:12px;margin-top:8px;font:inherit;border-radius:10px;border:1px solid #c9d4e4}
button{background:#0b6bcb;color:#fff;border:0;font-weight:700;min-height:48px}
.err{color:#b42318;min-height:1.4em}
</style></head><body>
<h1>${escapeHtmlServer(title || "保護されたツール")}</h1>
<p>パスワードを入力してください。</p>
<input id="pw" type="password" autocomplete="current-password" placeholder="パスワード" />
<button type="button" id="go">開く</button>
<p class="err" id="err"></p>
<script>
const slug=${JSON.stringify(slug)};
document.getElementById('go').onclick=async()=>{
  const err=document.getElementById('err');
  err.textContent='';
  try{
    const res=await fetch('/api/public/tools/'+encodeURIComponent(slug)+'/unlock',{
      method:'POST',headers:{'Content-Type':'application/json'},credentials:'include',
      body:JSON.stringify({password:document.getElementById('pw').value})
    });
    const data=await res.json().catch(()=>({}));
    if(!res.ok) throw new Error(data.error||'認証に失敗しました');
    location.reload();
  }catch(e){err.textContent=e.message||e;}
};
</script>
</body></html>`;
}

function escapeHtmlServer(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function encryptSecret(text) {
  const key = crypto.scryptSync(jwtSecret, "nene-publish-key-v1", 32);
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const enc = Buffer.concat([cipher.update(String(text), "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, enc]).toString("base64");
}

function decryptSecret(payload) {
  try {
    const buf = Buffer.from(String(payload || ""), "base64");
    const iv = buf.subarray(0, 12);
    const tag = buf.subarray(12, 28);
    const enc = buf.subarray(28);
    const key = crypto.scryptSync(jwtSecret, "nene-publish-key-v1", 32);
    const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
    decipher.setAuthTag(tag);
    return Buffer.concat([decipher.update(enc), decipher.final()]).toString("utf8");
  } catch {
    return "";
  }
}

function buildDemoResult(toolMode, title) {
  const now = new Date().toLocaleString("ja-JP");
  if (toolMode === "stock_picker" || toolMode === "crypto_picker") {
    const unit = toolMode === "stock_picker" ? "銘柄" : "コイン";
    return [
      `【お試しモード】${title || "デモ"}`,
      "※これはダミーデータです。最新ニュース検索は行っていません。",
      "",
      "1. 今日のテーマ要約",
      "デモ用の注目テーマを表示しています。",
      "",
      `2. 注目${unit}リスト`,
      "【1】サンプル株式会社（9999）",
      "選定理由: お試し表示用のダミーです。",
      "関連ニュース: デモ発表（実在しません）",
      "発表日: 2026-07-01",
      "情報源: デモデータ",
      "注目度: 中",
      "主なリスク: 実データではないため投資判断に使わない",
      "",
      "3. 買う前チェック",
      "- 本番公開後に実データで再確認する",
      "",
      "4. 見送り条件",
      "- お試し結果だけで売買しない",
      "",
      `確認日時: ${now}`,
    ].join("\n");
  }
  return [
    `【お試しモード】${title || "デモ"}`,
    "※ダミー結果です。APIは呼び出していません。",
    "",
    "結論: プレビュー用のサンプル出力",
    "次の行動: 「Webに公開する」で本番URLを発行し、実データで確認してください。",
    `確認日時: ${now}`,
  ].join("\n");
}

function saveStore() {
  fs.mkdirSync(path.dirname(databasePath), { recursive: true });
  fs.writeFileSync(databasePath, JSON.stringify(store, null, 2));
}

function nextId(collection) {
  store.counters[collection] = (store.counters[collection] || 0) + 1;
  return store.counters[collection];
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || ""));
}

function isValidPassword(password) {
  return String(password || "").length >= 8;
}
