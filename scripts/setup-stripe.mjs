import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Stripe from "stripe";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const envPath = path.join(root, ".env");
const webhookUrl = process.env.STRIPE_WEBHOOK_URL
  || "https://api.nenestudio.net/api/stripe/webhook";

const PLANS = [
  { envKey: "STRIPE_PRICE_ID_ADFREE", name: "NENE Studio 広告カット", amount: 480, plan: "adfree" },
  { envKey: "STRIPE_PRICE_ID_AI50", name: "NENE Studio AI50", amount: 980, plan: "ai50" },
  { envKey: "STRIPE_PRICE_ID_AI100", name: "NENE Studio AI100", amount: 1250, plan: "ai100" },
];

const WEBHOOK_EVENTS = [
  "checkout.session.completed",
  "customer.subscription.updated",
  "customer.subscription.deleted",
  "invoice.payment_failed",
];

function upsertEnvLine(content, key, value) {
  const line = `${key}=${value}`;
  const pattern = new RegExp(`^${key}=.*$`, "m");
  if (pattern.test(content)) return content.replace(pattern, line);
  return `${content.trimEnd()}\n${line}\n`;
}

async function findExistingPrice(stripe, planId, amount) {
  for await (const price of stripe.prices.list({ limit: 100, active: true, expand: ["data.product"] })) {
    const product = price.product;
    const productMeta = typeof product === "object" ? product?.metadata : {};
    if (
      price.currency === "jpy"
      && price.unit_amount === amount
      && price.recurring?.interval === "month"
      && productMeta?.nene_plan === planId
    ) {
      return price.id;
    }
  }
  return "";
}

async function ensurePrice(stripe, { envKey, name, amount, plan }) {
  const existing = await findExistingPrice(stripe, plan, amount);
  if (existing) {
    console.log(`reuse ${plan}: ${existing}`);
    return existing;
  }

  const product = await stripe.products.create({
    name,
    metadata: { nene_plan: plan, app: "nene-studio" },
  });
  const price = await stripe.prices.create({
    product: product.id,
    currency: "jpy",
    unit_amount: amount,
    recurring: { interval: "month" },
    metadata: { nene_plan: plan, app: "nene-studio" },
  });
  console.log(`created ${plan}: ${price.id}`);
  return price.id;
}

async function ensureWebhook(stripe) {
  const endpoints = await stripe.webhookEndpoints.list({ limit: 100 });
  const existing = endpoints.data.find((item) => item.url === webhookUrl);
  if (existing) {
    console.log(`webhook exists: ${existing.id}`);
    console.log("webhook_secret: (既存のため Dashboard で whsec_ を確認してください)");
    return existing.secret || "";
  }

  const endpoint = await stripe.webhookEndpoints.create({
    url: webhookUrl,
    enabled_events: WEBHOOK_EVENTS,
    description: "NENE Studio production API",
  });
  console.log(`webhook created: ${endpoint.id}`);
  return endpoint.secret || "";
}

async function main() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey || secretKey.includes("xxx")) {
    console.error("STRIPE_SECRET_KEY が .env に未設定です。");
    process.exit(1);
  }

  const stripe = new Stripe(secretKey);
  const account = await stripe.accounts.retrieve();
  console.log(`Stripe account: ${account.settings?.dashboard?.display_name || account.id}`);

  const priceIds = {};
  for (const plan of PLANS) {
    priceIds[plan.envKey] = await ensurePrice(stripe, plan);
  }

  const webhookSecret = await ensureWebhook(stripe);

  let envContent = fs.readFileSync(envPath, "utf8");
  envContent = upsertEnvLine(envContent, "STRIPE_PRICE_ID_ADFREE", priceIds.STRIPE_PRICE_ID_ADFREE);
  envContent = upsertEnvLine(envContent, "STRIPE_PRICE_ID_AI50", priceIds.STRIPE_PRICE_ID_AI50);
  envContent = upsertEnvLine(envContent, "STRIPE_PRICE_ID_AI100", priceIds.STRIPE_PRICE_ID_AI100);
  envContent = upsertEnvLine(envContent, "STRIPE_PRICE_ID", priceIds.STRIPE_PRICE_ID_AI50);
  if (webhookSecret) {
    envContent = upsertEnvLine(envContent, "STRIPE_WEBHOOK_SECRET", webhookSecret);
  }
  fs.writeFileSync(envPath, envContent);

  console.log("\n=== Render Environment にコピー ===");
  console.log(`STRIPE_PRICE_ID_ADFREE=${priceIds.STRIPE_PRICE_ID_ADFREE}`);
  console.log(`STRIPE_PRICE_ID_AI50=${priceIds.STRIPE_PRICE_ID_AI50}`);
  console.log(`STRIPE_PRICE_ID_AI100=${priceIds.STRIPE_PRICE_ID_AI100}`);
  if (webhookSecret) {
    console.log(`STRIPE_WEBHOOK_SECRET=${webhookSecret}`);
  } else {
    console.log("STRIPE_WEBHOOK_SECRET=(Dashboard → Webhooks → 署名シークレットをコピー)");
  }
  console.log(`PUBLIC_APP_URL=https://nenestudio.net`);
  console.log("\n.env を更新しました。");
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
