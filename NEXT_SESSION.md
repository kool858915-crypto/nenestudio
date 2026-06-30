# NENE Studio — 作業メモ

> 最終更新: 2026-06-30（Stripe 設定は **明日** に延期）  
> 公開: https://nenestudio.pages.dev  
> API: https://nenestudio.onrender.com/api

---

## 明日やること（メモ）

> **Stripe 設定は今日は行わず、明日にする。**  
> チャット再開時: 「`NEXT_SESSION.md` を読んで、Stripe 設定から続けて」

### Stripe（Render + Stripe ダッシュボード）

1. Stripe で月額 **480円** / **1250円** の Price を作成（980円は設定済みの想定）
2. Render → `nenestudio` → **Environment** に追加:
   - `STRIPE_PRICE_ID_ADFREE` = 480円 Price ID
   - `STRIPE_PRICE_ID_AI100` = 1250円 Price ID
   - `PUBLIC_APP_URL` = `https://nenestudio.pages.dev`
   - `STRIPE_WEBHOOK_SECRET` = Webhook 作成後の secret
3. Stripe → Webhooks → エンドポイント:

```text
https://nenestudio.onrender.com/api/stripe/webhook
```

4. イベント: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_failed`
5. 保存後、Pages で 480 / 980 / 1250 円プランのテスト決済

詳細手順: `DEPLOYMENT.md` セクション 3

---

## 完了済み

| 項目 | 状態 |
|------|------|
| Cloudflare Pages 自動デプロイ | OK |
| Google ログイン（ローカル + Render） | OK |
| CORS（pages.dev + nenestudio.net） | OK |
| 3段階課金 UI（480/980/1250） | OK |
| API → Render 直 URL 接続 | OK |
| UI 表記（Wireframe → NENE Studio） | OK |

---

## 次にやること（優先順）

### 1. Stripe 3プラン完成（Render Environment）— **明日実施**

> ⏸ 2026-06-30: 本人指示により **明日に延期**。上記「明日やること」を参照。

| KEY | 内容 |
|-----|------|
| `STRIPE_PRICE_ID_ADFREE` | Stripe で月額 **480円** Price を作成 → ID を貼る |
| `STRIPE_PRICE_ID_AI50` | 設定済みの想定 |
| `STRIPE_PRICE_ID_AI100` | Stripe で月額 **1250円** Price を作成 → ID を貼る |

**Stripe Webhook（今すぐ）:**

```text
https://nenestudio.onrender.com/api/stripe/webhook
```

イベント: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_failed`

**決済後リダイレクト用:**

```env
PUBLIC_APP_URL=https://nenestudio.pages.dev
```

---

### 2. 独自ドメイン `nenestudio.net`（Cloudflare）

1. Cloudflare → **Add a site** → `nenestudio.net`
2. レジストラのネームサーバーを Cloudflare に変更
3. **Pages** → Custom domains → `nenestudio.net`
4. **Render** → Custom domains → `api.nenestudio.net`
5. DNS に Render / Pages の CNAME を追加
6. 完了後 Render env を更新:

```env
APP_BASE_URL=https://api.nenestudio.net
PUBLIC_APP_URL=https://nenestudio.net
```

7. `config.js` の apiBase を `https://api.nenestudio.net/api` に切替（コメント参照）
8. Stripe Webhook URL を `https://api.nenestudio.net/api/stripe/webhook` に変更

---

### 3. Google OAuth 一般公開（任意）

テストユーザー以外もログインさせる場合 → Google Cloud → OAuth 同意画面を **公開** に。

---

### 4. AdSense 申請前（任意）

- [ ] `nenestudio.net` で公開
- [ ] 利用規約・プライバシーポリシー確認
- [ ] お問い合わせ先 `contact@nenestudio.net`（Email Routing）

---

## 料金（変更禁止）

480円 / 980円 / 1250円 — 詳細は README.md

---

## 参考

| ファイル | 内容 |
|----------|------|
| `DEPLOYMENT.md` | 公開・Stripe・Google 手順 |
| `README.md` | 概要・料金 |
| `.env.example` | 環境変数一覧 |

---

*次の作業（明日）: **Stripe 設定**。その後 **Cloudflare DNS（nenestudio.net）**。*

---

## 今日までに完了（2026-06-30）

- Pages 公開・Google ログイン・CORS・API 接続
- サーバー DB 静的配信ブロック、README / 手順書更新
