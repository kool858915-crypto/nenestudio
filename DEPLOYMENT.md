# 独自ドメイン公開手順（nenestudio.net）

安価な構成として、画面は **Cloudflare Pages**、サーバーAPIは **Render** を使います。

GitHub リポジトリ（このフォルダ単体）:

```text
https://github.com/kool858915-crypto/nenestudio
```

Cloudflare Pages / Render では **Root directory は空欄（リポジトリ直下）** にしてください。

| 用途 | URL |
|------|-----|
| アプリ（PWA） | `https://nenestudio.net` |
| APIサーバー | `https://api.nenestudio.net` |

`config.js` は、ローカルでは `/api`、本番ドメインでは自動的に `https://api.nenestudio.net/api` を使います。

---

## 1. Cloudflareでドメインを管理

1. [Cloudflare](https://dash.cloudflare.com/) にログインします。
2. **Add a site** で `nenestudio.net` を追加します（すでにCloudflare管理ならスキップ）。
3. ネームサーバーがCloudflare向きになっていることを確認します。

---

## 2. RenderでAPIサーバーを公開

1. GitHub リポジトリ `kool858915-crypto/nenestudio` を使います（すでにプッシュ済み）。
2. [Render](https://render.com/) で **New → Blueprint** または **Web Service** を作成します。
3. リポジトリ `nenestudio` を選び、**Root Directory** は空欄のままにします。
   - Blueprint を使う場合: リポジトリ直下の `render.yaml` が読み込まれます。
4. **Build Command**: `npm install` / **Start Command**: `npm start`
5. 環境変数を設定します。

```env
APP_BASE_URL=https://api.nenestudio.net
PUBLIC_APP_URL=https://nenestudio.net
CORS_ORIGIN=https://nenestudio.net
JWT_SECRET=長いランダム文字列（32文字以上推奨）
DATABASE_PATH=./server/nene-studio-db.json
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ID_ADFREE=price_...（月額480円・広告カット）
STRIPE_PRICE_ID_AI50=price_...（月額980円・AI50回）
STRIPE_PRICE_ID_AI100=price_...（月額1250円・AI100回）
# 互換用（未設定時 ai50 のフォールバック）
STRIPE_PRICE_ID=price_...
OPENAI_API_KEY=sk-proj-...
```

6. Renderの **Settings → Custom Domains** で `api.nenestudio.net` を追加します。
7. Renderが表示する **CNAME** をCloudflare DNSに追加します。

| タイプ | 名前 | 内容 |
|--------|------|------|
| CNAME | `api` | Renderが指定するホスト名 |

---

## 3. Stripe設定

1. Stripeダッシュボードで **月額480円 / 980円 / 1250円** のサブスク用 **Price** を3つ作成します。
2. Renderの `STRIPE_PRICE_ID_ADFREE` / `STRIPE_PRICE_ID_AI50` / `STRIPE_PRICE_ID_AI100` に各 Price ID を入れます。
3. **Developers → Webhooks → Add endpoint** で以下を登録します。

```text
https://api.nenestudio.net/api/stripe/webhook
```

4. 有効にするイベント:

- `checkout.session.completed`
- `customer.subscription.deleted`
- `invoice.payment_failed`

5. 表示された **Signing secret** を Render の `STRIPE_WEBHOOK_SECRET` に入れます。

6. Stripe **Checkout** の成功URLはサーバー側で `https://nenestudio.net/index.html?stripe=success` に設定済みです。

---

## 4. 画面を公開（2つの方法）

### 方法A：Render だけで公開（おすすめ・設定が少ない）

Render の `nenestudio` サービスは **画面（HTML）と API の両方** を配信しています。  
Cloudflare Pages は **不要** です。

1. Render → **nenestudio** → **Settings** → **Custom Domains**
2. 次の2つを追加：
   - `nenestudio.net`
   - `api.nenestudio.net`
3. Render が表示する CNAME を **Cloudflare DNS** に登録：

| タイプ | 名前 | 内容 |
|--------|------|------|
| CNAME | `@` または `nenestudio.net` | Render が指定するホスト名 |
| CNAME | `api` | 同上（同じ Render サービス） |

4. Cloudflare の **Proxy status** は一旦 **DNS only（灰色の雲）** にすると証明書が通りやすいです。

### 方法B：Cloudflare Pages で画面を公開

1. Cloudflare **Workers & Pages → Create application → Pages → Connect to Git**
2. リポジトリ `kool858915-crypto/nenestudio` を接続
3. **Build command**: 空欄 / **Build output directory**: `.`
4. **Custom domains** で `nenestudio.net` を追加

または GitHub Actions（`.github/workflows/deploy-cloudflare-pages.yml`）を使う場合：

1. Cloudflare → **My Profile → API Tokens** → 「Edit Cloudflare Workers」でトークン作成
2. GitHub リポジトリ → **Settings → Secrets** に追加：
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`（ダッシュボード右サイドバーに表示）
3. `main` へ push すると自動デプロイ

ローカルから手動デプロイ：

```powershell
$env:CLOUDFLARE_API_TOKEN="..."
$env:CLOUDFLARE_ACCOUNT_ID="..."
.\scripts\deploy-cloudflare.ps1
```

---

## 5. 動作確認

1. `https://nenestudio.net` が開く
2. ログイン / 新規登録ができる
3. `https://api.nenestudio.net/api/auth/me` がログイン後に応答する（ブラウザからは直接叩かない）
4. Stripeテスト決済 → Webhook → 広告なしプランが有効になる
5. PWAとして「インストール」できる

---

## 6. AdSense申請前チェック

- [ ] `https://nenestudio.net` で公開されている
- [ ] 利用規約ページがある
- [ ] プライバシーポリシーがある
- [ ] お問い合わせ先（メール等）が正式な内容になっている
- [x] 運営者情報を `contact@nenestudio.net` に設定した（Cloudflare Email Routing で転送設定推奨）
- [ ] 未完成・テスト用の文言が目立たない

---

## 7. ローカル開発

```bash
cd nene-studio-wireframe
npm install
cp .env.example .env
npm run dev
```

ブラウザ: `http://localhost:8787`
