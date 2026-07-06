import "dotenv/config";
import Stripe from "stripe";

const API = process.env.API_BASE || "https://api.nenestudio.net/api";
const PLAN = process.env.TEST_PLAN || "adfree";
const PRICE_BY_PLAN = {
  adfree: process.env.STRIPE_PRICE_ID_ADFREE,
  ai50: process.env.STRIPE_PRICE_ID_AI50,
  ai100: process.env.STRIPE_PRICE_ID_AI100,
};
const email = process.env.TEST_EMAIL || `stripe-test-${Date.now()}@test.nenestudio.local`;
const password = process.env.TEST_PASSWORD || "TestPass1234";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function api(path, options = {}) {
  const response = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    signal: AbortSignal.timeout(120000),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || `${path} failed (${response.status})`);
  return data;
}

async function registerOrLogin() {
  try {
    return await api("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  } catch {
    return api("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }
}

async function sendCheckoutWebhook({ userId, customerId, subscriptionId, plan }) {
  const payload = {
    id: `evt_test_${Date.now()}`,
    object: "event",
    type: "checkout.session.completed",
    data: {
      object: {
        id: `cs_test_${Date.now()}`,
        object: "checkout.session",
        mode: "subscription",
        client_reference_id: String(userId),
        customer: customerId,
        subscription: subscriptionId,
        metadata: { plan, userId: String(userId) },
      },
    },
  };
  const body = JSON.stringify(payload);
  const signature = stripe.webhooks.generateTestHeaderString({
    payload: body,
    secret: process.env.STRIPE_WEBHOOK_SECRET,
  });
  const response = await fetch(`${API.replace(/\/api$/, "")}/api/stripe/webhook`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Stripe-Signature": signature,
    },
    body,
    signal: AbortSignal.timeout(120000),
  });
  const text = await response.text();
  if (!response.ok) {
    throw new Error(`Webhook failed (${response.status}): ${text}`);
  }
  return text;
}

async function waitForPaid(token) {
  for (let attempt = 0; attempt < 12; attempt += 1) {
    const data = await api("/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (data.user?.isPaid && data.user?.subscriptionPlan === PLAN) {
      return data.user;
    }
    await new Promise((resolve) => setTimeout(resolve, 3000));
  }
  throw new Error(`有料プラン(${PLAN})が反映されません。Render の STRIPE_WEBHOOK_SECRET を .env と同じ値に更新してください。`);
}

async function main() {
  const priceId = PRICE_BY_PLAN[PLAN];
  if (!process.env.STRIPE_SECRET_KEY?.startsWith("sk_test_")) {
    throw new Error("STRIPE_SECRET_KEY（テストモード）が .env に必要です。");
  }
  if (!process.env.STRIPE_WEBHOOK_SECRET?.startsWith("whsec_")) {
    throw new Error("STRIPE_WEBHOOK_SECRET が .env に必要です。");
  }
  if (!priceId) {
    throw new Error(`Price ID 未設定: ${PLAN}`);
  }

  console.log(`API: ${API}`);
  console.log(`Plan: ${PLAN}`);
  console.log(`Email: ${email}`);

  const auth = await registerOrLogin();
  console.log(`User id: ${auth.user.id}`);

  const checkout = await api("/billing/create-checkout-session", {
    method: "POST",
    headers: { Authorization: `Bearer ${auth.token}` },
    body: JSON.stringify({ plan: PLAN }),
  });
  console.log("Checkout Session 作成: OK");

  const customer = await stripe.customers.create({
    email,
    metadata: { userId: String(auth.user.id), plan: PLAN },
  });
  const attachedPaymentMethod = await stripe.paymentMethods.attach("pm_card_visa", { customer: customer.id });
  await stripe.customers.update(customer.id, {
    invoice_settings: { default_payment_method: attachedPaymentMethod.id },
  });
  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [{ price: priceId }],
    default_payment_method: attachedPaymentMethod.id,
    metadata: { plan: PLAN, userId: String(auth.user.id) },
  });
  console.log(`Stripe テスト課金: OK (subscription ${subscription.id})`);

  await sendCheckoutWebhook({
    userId: auth.user.id,
    customerId: customer.id,
    subscriptionId: subscription.id,
    plan: PLAN,
  });
  console.log("Webhook 送信: OK");

  const user = await waitForPaid(auth.token);
  console.log("\n=== テスト決済成功 ===");
  console.log(JSON.stringify({
    email,
    plan: user.subscriptionPlan,
    isPaid: user.isPaid,
    isAdFree: user.isAdFree,
    subscriptionStatus: user.subscriptionStatus,
    aiUsageLimit: user.aiUsageLimit,
    checkoutUrlSample: checkout.url.slice(0, 60) + "...",
  }, null, 2));
}

main().catch((error) => {
  console.error("\nテスト決済失敗:", error.message || error);
  process.exit(1);
});
