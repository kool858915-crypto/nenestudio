# NENE Studio 公開作業 — 次回持ち越しメモ

> 最終更新: 2026-06-26（再開セッション）  
> リポジトリ: https://github.com/kool858915-crypto/nenestudio

---

## 完了済み

| 項目 | 状態 | URL / 備考 |
|------|------|------------|
| GitHub リポジトリ | 完了 | `kool858915-crypto/nenestudio` |
| Render API サーバー | Live | https://nenestudio.onrender.com |
| JWT_SECRET | 作成済み | ローカル `.env` + `JWT_SECRET.local.txt`（Git 除外） |
| Cloudflare Pages プロジェクト | 作成済み | プロジェクト名 `nenestudio` |
| Pages 手動デプロイ | 完了 | https://nenestudio.pages.dev（Wrangler で最新化済み） |
| Pages カスタムドメイン登録 | pending | `nenestudio.net` — エラー: **CNAME record not set** |
| GitHub Actions 自動デプロイ | **未修復** | `CLOUDFLARE_API_TOKEN` が古いまま（07:55 更新） |
| Cloudflare ゾーン | **未追加** | `nenestudio.net` が Add a site されていない |
| api.nenestudio.net | **未接続** | DNS / Render Custom Domain 未設定 |
| Wrangler ログイン | 完了 | kool858915@gmail.com |
| GitHub Secret `CLOUDFLARE_ACCOUNT_ID` | 設定済み | `e575f757a53cf6fa3a19b54691e14e9a` |
| GitHub Actions ワークフロー | 追加済み | `.github/workflows/deploy-cloudflare-pages.yml` |
| 運営者情報 | 更新済み | contact@nenestudio.net |

---

## やり残し（優先順）

### 1. GitHub 自動デプロイの修復（最優先）

**症状:** GitHub Actions が `Authentication error [code: 10000]` で失敗（2026-06-26 再確認）。

**原因:** 古い Cloudflare API Token を Delete したが、GitHub の `CLOUDFLARE_API_TOKEN` が新トークンに未更新。

**やること:**
1. Cloudflare → API Tokens → **Edit Cloudflare Workers** で新トークン作成
2. GitHub → Settings → Secrets → Actions → **`CLOUDFLARE_API_TOKEN`** → **Update secret**（New ではなく Update）
3. 新トークンをチャットに貼れば AI が `gh secret set` でも更新可能
4. 確認: Actions → **Deploy to Cloudflare Pages** を手動実行 → 成功するか見る

**注意:** `CLOUDFLARE_ACCOUNT_ID` は `e575f757a53cf6fa3a19b54691e14e9a`（変更しない）。

**回避策:** Wrangler ログイン済みならローカルから `npx wrangler pages deploy . --project-name=nenestudio --branch=main` でもデプロイ可能（2026-06-26 実行済み）。

---

### 2. ドメイン `nenestudio.net` を Cloudflare に追加（★今ここ）

**症状:** ゾーン未登録 + Pages 側エラー `CNAME record not set`（2026-06-26 再確認）。

**やること:**
1. Cloudflare ダッシュボード → **Add a site** → `nenestudio.net`
2. ドメイン業者で **ネームサーバー** を Cloudflare 指定のものに変更
3. 反映後、Pages → **nenestudio** → Custom domains → `nenestudio.net` が **Active** になるか確認
4. `www.nenestudio.net` は `_redirects` で本体へリダイレクト済み

---

### 3. API ドメイン `api.nenestudio.net`（Render）

**やること:**
1. Render → **nenestudio** → Settings → **Custom Domains** → `api.nenestudio.net` 追加
2. Cloudflare DNS に CNAME 登録:

| タイプ | 名前 | 内容 |
|--------|------|------|
| CNAME | `api` | Render が指定するホスト名 |

3. Render Environment に本番 URL が入っているか確認:

```env
APP_BASE_URL=https://api.nenestudio.net
PUBLIC_APP_URL=https://nenestudio.net
CORS_ORIGIN=https://nenestudio.net
```

---

### 4. Stripe 設定（Render 環境変数）

| 変数 | 状態 |
|------|------|
| `STRIPE_SECRET_KEY` | 要設定（テスト: `sk_test_...` / 本番: `sk_live_...`） |
| `STRIPE_PRICE_ID` | 要設定（月額 ¥780 の `price_...`） |
| `STRIPE_WEBHOOK_SECRET` | 要設定（`api.nenestudio.net` 公開後） |

**Webhook URL（API 公開後）:**
```
https://api.nenestudio.net/api/stripe/webhook
```

**イベント:**
- `checkout.session.completed`
- `customer.subscription.deleted`
- `invoice.payment_failed`

---

### 5. OpenAI API キー（Render）

```env
OPENAI_API_KEY=sk-proj-...
```

Render → Environment に設定。ブラウザには置かない。

---

### 6. 公開後の確認チェックリスト

- [ ] https://nenestudio.net が開く
- [ ] https://nenestudio.pages.dev が開く（Pages 側）
- [ ] ログイン / 新規登録ができる
- [ ] AI 生成が動く（OpenAI キー設定後）
- [ ] Stripe テスト決済 → 広告なしプラン有効化
- [ ] PWA インストール可能

---

### 7. 任意（公開後）

- **AdSense 申請** — 本番 URL + 利用規約 + プライバシーポリシー公開後
- **Cloudflare Email Routing** — `contact@nenestudio.net` → 受信箱転送
- **API Token のローテーション** — チャットに貼ったトークンは Delete 済み想定。新トークンを GitHub にのみ保管

---

## アーキテクチャ（確定）

| 用途 | ホスト | URL |
|------|--------|-----|
| 画面（PWA） | Cloudflare Pages | https://nenestudio.net |
| API | Render | https://api.nenestudio.net |

`config.js` は本番で自動的に `https://api.nenestudio.net/api` を使用。

**代替ルート:** Render だけで画面+API 両方配信も可能（Custom Domains に2ドメイン追加）。現在は Pages + Render 構成。

---

## ローカル開発

```bash
cd nene-studio-wireframe
npm install
# .env は既存（JWT_SECRET 設定済み）
npm run dev
# http://localhost:8787
```

---

## 次回セッション開始時の一言

「`NEXT_SESSION.md` を読んで、やり残しから続けて」
