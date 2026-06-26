import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Stripe from "stripe";

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
const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;
const databasePath = path.resolve(appRoot, process.env.DATABASE_PATH || "./server/nene-studio-db.json");

const store = loadStore();

app.use((request, response, next) => {
  const origin = request.headers.origin;
  if (origin && (corsOrigins.includes(origin) || corsOrigins.includes("*"))) {
    response.setHeader("Access-Control-Allow-Origin", origin);
    response.setHeader("Vary", "Origin");
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
    markUserPaid(session.client_reference_id, session.customer, session.subscription, "active");
  }

  if (event.type === "customer.subscription.deleted") {
    const subscription = event.data.object;
    const user = store.users.find((item) => item.stripeSubscriptionId === subscription.id);
    if (user) {
      user.subscriptionStatus = "free";
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

app.use(express.json({ limit: "1mb" }));
app.use(express.static(appRoot));

app.post("/api/auth/register", (request, response) => {
  const { email, password } = request.body || {};
  if (!isValidEmail(email) || !isValidPassword(password)) {
    return response.status(400).json({ error: "メールアドレスと8文字以上のパスワードを入力してください。" });
  }

  const normalizedEmail = email.toLowerCase();
  if (store.users.some((user) => user.email === normalizedEmail)) {
    return response.status(409).json({ error: "このメールアドレスはすでに登録されています。" });
  }

  const user = {
    id: nextId("users"),
    email: normalizedEmail,
    passwordHash: bcrypt.hashSync(password, 12),
    stripeCustomerId: "",
    stripeSubscriptionId: "",
    subscriptionStatus: "free",
    createdAt: new Date().toISOString(),
  };
  store.users.push(user);
  saveStore();
  return response.json(createAuthPayload(user));
});

app.post("/api/auth/login", (request, response) => {
  const { email, password } = request.body || {};
  const user = store.users.find((item) => item.email === String(email || "").toLowerCase());
  if (!user || !bcrypt.compareSync(String(password || ""), user.passwordHash)) {
    return response.status(401).json({ error: "メールアドレスまたはパスワードが違います。" });
  }
  return response.json(createAuthPayload(user));
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
  if (!stripe || !process.env.STRIPE_PRICE_ID) {
    return response.status(500).json({ error: "Stripeのサーバー設定が未完了です。" });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: request.user.stripeCustomerId || undefined,
    customer_email: request.user.stripeCustomerId ? undefined : request.user.email,
    client_reference_id: String(request.user.id),
    line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
    success_url: `${publicAppUrl}/index.html?stripe=success`,
    cancel_url: `${publicAppUrl}/index.html?stripe=cancel`,
    allow_promotion_codes: false,
  });

  response.json({ url: session.url });
});

app.post("/api/ai/generate", requireAuth, async (request, response) => {
  if (!process.env.OPENAI_API_KEY) {
    return response.status(500).json({ error: "OpenAI APIキーがサーバーに設定されていません。" });
  }
  const { systemPrompt, input } = request.body || {};
  if (!input) {
    return response.status(400).json({ error: "入力本文が必要です。" });
  }

  const apiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt || "入力内容を整理してください。" },
        { role: "user", content: input },
      ],
      temperature: 0.7,
    }),
  });

  const data = await apiResponse.json();
  if (!apiResponse.ok) {
    return response.status(apiResponse.status).json({ error: data.error?.message || "OpenAI APIの実行に失敗しました。" });
  }
  response.json({ text: data.choices?.[0]?.message?.content || "" });
});

app.listen(port, () => {
  console.log(`NENE Studio server running at ${appBaseUrl}`);
});

function requireAuth(request, response, next) {
  const token = request.headers.authorization?.replace(/^Bearer\s+/i, "");
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
  return {
    id: user.id,
    email: user.email,
    isPaid: user.subscriptionStatus === "active",
    subscriptionStatus: user.subscriptionStatus,
  };
}

function markUserPaid(userId, customerId, subscriptionId, status) {
  const user = store.users.find((item) => item.id === Number(userId));
  if (!user) return;
  user.stripeCustomerId = customerId || user.stripeCustomerId;
  user.stripeSubscriptionId = subscriptionId || user.stripeSubscriptionId;
  user.subscriptionStatus = status;
  saveStore();
}

function loadStore() {
  if (!fs.existsSync(databasePath)) {
    return { users: [], savedTools: [], counters: { users: 0, savedTools: 0 } };
  }
  return JSON.parse(fs.readFileSync(databasePath, "utf8"));
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
