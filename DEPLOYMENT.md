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
CORS_ORIGIN=https://nenestudio.net,https://nenestudio.pages.dev
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
GOOGLE_CLIENT_ID=xxxx.apps.googleusercontent.com
APPLE_CLIENT_ID=（Apple ログインを使う場合のみ）
```

> **Google ログイン**を使う場合は `GOOGLE_CLIENT_ID` が必須です。詳細は下記 **「Google ログイン設定」** を参照。

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

## 3.5 Google ログイン設定

**利用者は Client ID 不要です。** 運営者が Google Cloud とサーバー `.env` / Render に **1回だけ** 設定します。  
アプリ側のコード（Google ボタン → ID トークン → `/api/auth/google` で検証）は **実装済み** です。

### あなた（運営者）が Google Cloud で行う作業

1. [Google Cloud Console](https://console.cloud.google.com/) に **Google アカウントでログイン**
2. プロジェクトを選択（なければ **新規プロジェクト** 作成。例: `NENE Studio`）
3. **API とサービス → OAuth 同意画面**
   - ユーザーの種類: **外部**（一般公開向け）
   - アプリ名: `NENE Studio`
   - ユーザーサポートメール / デベロッパーの連絡先: 自分のメール
   - スコープ: 追加不要（Google ログインボタンが `email` / `profile` / `openid` を使う）
   - **テスト** のままの場合 → **テストユーザー** に自分の Gmail を追加（未追加だとログイン不可）
   - 一般公開する場合 → **公開** に変更（Google の審査が必要な場合あり）
4. **API とサービス → 認証情報 → 認証情報を作成 → OAuth クライアント ID**
   - アプリケーションの種類: **ウェブアプリケーション**
   - 名前: `NENE Studio Web`
   - **承認済みの JavaScript 生成元**（ここが重要・リダイレクト URI ではない）:

     ```text
     http://localhost:8787
     https://nenestudio.net
     https://nenestudio.pages.dev
     ```

   - **承認済みのリダイレクト URI**: 空で OK（本アプリは Google Identity Services のボタン方式）
   - **入れない**: `https://api.nenestudio.net`（API 用・ログイン画面ではない）
5. 作成後、表示される **クライアント ID**（`....apps.googleusercontent.com`）をコピー

### あなた（運営者）がサーバーで行う作業

**ローカル（まずここで試す）**

1. `nene-studio-wireframe/.env` を開く
2. 次の1行を追加または更新:

   ```env
   GOOGLE_CLIENT_ID=ここにクライアントIDを貼る
   ```

3. サーバー再起動:

   ```bash
   npm run dev
   ```

4. ブラウザで `http://localhost:8787` → ログイン画面  
   - 右側「ログイン・課金の裏設定」に **Googleログイン：設定済** と出れば OK  
   - **Google でログイン** ボタン（公式ボタン）が表示され、クリックでログインできる

**本番（Render）**

1. Render → サービス → **Environment** → `GOOGLE_CLIENT_ID` を同じ Client ID で追加
2. `CORS_ORIGIN` にフロントの URL が含まれていることを確認:

   ```env
   CORS_ORIGIN=https://nenestudio.net,https://nenestudio.pages.dev
   ```

3. サービスを **再デプロイ**（Manual Deploy または env 保存で自動）

### Pages（pages.dev）から API を使うまでの暫定設定

`api.nenestudio.net` の DNS が未設定でも、`config.js` は Render 直 URL にフォールバックします。  
そのため Render の **Environment** に次を必ず入れてください:

```env
CORS_ORIGIN=https://nenestudio.net,https://nenestudio.pages.dev
```

保存後、Render が再デプロイされれば https://nenestudio.pages.dev からログイン・課金 API が使えます。

---

```powershell
curl http://localhost:8787/api/auth/providers
# google.enabled が true、clientId が設定値ならサーバー側 OK
```

### よくあるエラー

| 症状 | 原因 | 対処 |
|------|------|------|
| `origin_mismatch` / 403 | JavaScript 生成元に現在の URL がない | Cloud Console で `http://localhost:8787` 等を追加 |
| `Googleログインはサーバー設定が未完了` | `.env` 未設定 or 再起動忘れ | `GOOGLE_CLIENT_ID` 設定 → `npm run dev` 再起動 |
| `access_denied` / テストユーザー | 同意画面が「テスト」で自分が未登録 | テストユーザーに Gmail 追加、または公開申請 |
| 本番 Pages だけ失敗 | API が `api.nenestudio.net` 未公開 or CORS | Render ドメイン・`CORS_ORIGIN` を確認 |

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
3. **Google ログイン**（`GOOGLE_CLIENT_ID` 設定後）ができる
4. `https://api.nenestudio.net/api/auth/me` がログイン後に応答する（ブラウザからは直接叩かない）
5. Stripeテスト決済 → Webhook → 広告なしプランが有効になる
6. PWAとして「インストール」できる

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
