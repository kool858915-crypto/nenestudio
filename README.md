# NENE Studio

AIツール作成 PWA。Cloudflare Pages（画面）+ Render（API）構成。

## 公開 URL

| 環境 | URL |
|------|-----|
| 本番（画面） | https://nenestudio.pages.dev |
| 本番（API） | https://nenestudio.onrender.com/api |
| ローカル | http://localhost:8787 |

独自ドメイン **`nenestudio.net`** の手順は `DEPLOYMENT.md` を参照。

## ローカル起動

```bash
npm install
cp .env.example .env
npm run dev
```

ブラウザで `http://localhost:8787` を開く。PWA は「アプリをインストール」から追加。

## 料金プラン（確定）

| プラン | 月額 | 内容 |
|--------|------|------|
| 無料 | 0円 | 設計図のみ・出力前広告あり |
| BYOK | 0円 | 自分の API キーで AI 生成 |
| 広告カット | **480円** | 広告なし（運営 API の AI なし） |
| AI50 | **980円** | 広告なし + 運営 API 月50回 |
| AI100 | **1250円** | 広告なし + 運営 API 月100回 |

## 支払い設定（Stripe）

- 3つの Price ID が必要: `STRIPE_PRICE_ID_ADFREE` / `STRIPE_PRICE_ID_AI50` / `STRIPE_PRICE_ID_AI100`
- Webhook: `https://nenestudio.onrender.com/api/stripe/webhook`（DNS 後は `api.nenestudio.net`）
- イベント: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_failed`
- 決済完了は Webhook で DB 更新。URL パラメータだけでは広告なしになりません。

## サーバー側で保護するもの

- `OPENAI_API_KEY`、Stripe 秘密キー、Webhook 署名、Google Client ID → Render / `.env`
- ユーザー・課金状態 → サーバー DB（`server/nene-studio-db.json`、静的配信ブロック済み）

## 確認コマンド

```bash
npm run check
npm run verify:auth
```

## 主な機能

- AI ツール作成フロー（カテゴリ → 提案 → 部品 → 設計図 → 出力）
- ZIP / フォルダ形式エクスポート
- メール・Google ログイン
- Stripe サブスク（480 / 980 / 1250 円）
- BYOK（Gemini / OpenAI）
- 日本語 / English 切替
- PWA（manifest + service worker）

詳細な残タスクは `NEXT_SESSION.md` を参照。
