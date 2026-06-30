# NENE Studio — 明日再開用メモ

> 最終更新: 2026-06-29（再開セッション）  
> リポジトリ: https://github.com/kool858915-crypto/nenestudio  
> ローカル: `e:\開発憲法セット\nene-studio-wireframe\`

---

## 明日の開始の仕方

チャットでこう言えば続きから進められます:

> 「`NEXT_SESSION.md` を読んで、やり残しから続けて」

ローカル起動:

```bash
cd nene-studio-wireframe
npm run dev
# http://localhost:8787
```

---

## 料金プラン（確定・勝手に変更しない）

| プラン | 月額 | 内容 |
|--------|------|------|
| **無料** | 0円 | 設計図のみ・出力前広告あり |
| **BYOK** | 0円 | 自分のAPIキーでAI生成（端末 localStorage） |
| **広告カット** | **480円** | 広告なしのみ（運営APIのAI生成なし） |
| **AI50** | **980円** | 広告なし ＋ 運営API **月50回** |
| **AI100** | **1250円** | 広告なし ＋ 運営API **月100回** |

※ UI に「※ 金額を確認しながらご使用ください。」を表示済み。

**Stripe Price ID（3つ必要）:** `STRIPE_PRICE_ID_ADFREE` / `STRIPE_PRICE_ID_AI50` / `STRIPE_PRICE_ID_AI100`

---

## 本セッションで完了したこと（2026-06-29）

| 項目 | 状態 |
|------|------|
| 3段階有料プラン（480/980/1250） | UI + サーバー実装済み |
| プラン別 AI 上限（0 / 50 / 100） | `/api/ai/generate` でサーバー判定 |
| BYOK（Gemini/OpenAI） | 設定画面 + localStorage |
| 右サイド「AIアシスト」パネル | **削除**（固定文案のみでAIではなかったため） |
| ログイン UI | メール・パスワードを2段表示 |
| Google / Apple ログイン | **コード実装済み**（`.env` 未設定のため本番未稼働） |
| `/api/server/status` | ログイン画面で裏設定の状態表示 |
| Stripe Checkout 失敗時 | サーバーが落ちないよう修正 |
| 780円表記 | 翻訳テーブル等から **480/980/1250 に修正** |

---

## 未完了（明日以降の優先順）

### A. 本番公開（インフラ）

| # | タスク | 状態 |
|---|--------|------|
| 1 | GitHub `CLOUDFLARE_API_TOKEN` 更新 → Actions デプロイ成功 | 未 |
| 2 | Cloudflare **Add a site** → `nenestudio.net` ネームサーバー変更 | 未 |
| 3 | Pages カスタムドメイン `nenestudio.net` → Active | pending |
| 4 | Render に `api.nenestudio.net` + DNS CNAME | 未 |
| 5 | Render 環境変数（本番 URL・Stripe・OpenAI） | 未 |

**Render 本番 env 例:**

```env
APP_BASE_URL=https://api.nenestudio.net
PUBLIC_APP_URL=https://nenestudio.net
CORS_ORIGIN=https://nenestudio.net
JWT_SECRET=（ローカル .env と同じか新規生成）
STRIPE_SECRET_KEY=sk_test_... または sk_live_...
STRIPE_PRICE_ID_ADFREE=price_...
STRIPE_PRICE_ID_AI50=price_...
STRIPE_PRICE_ID_AI100=price_...
STRIPE_WEBHOOK_SECRET=whsec_...
OPENAI_API_KEY=sk-proj-...
GOOGLE_CLIENT_ID=（任意・下記参照）
APPLE_CLIENT_ID=（任意）
```

**Stripe Webhook URL（API 公開後）:**  
`https://api.nenestudio.net/api/stripe/webhook`

---

### B. Google ログイン有効化（任意・運営者1回だけ）

**利用者は Client ID 不要。** 運営がサーバー `.env` / Render に1回設定する。

1. [Google Cloud Console](https://console.cloud.google.com/) → OAuth クライアント ID（Web）
2. **承認済み JavaScript 生成元** に登録:
   - `http://localhost:8787`（ローカル）
   - `https://nenestudio.net`（本番）
   - （任意）`https://nenestudio.pages.dev`
3. **入れない:** `https://api.nenestudio.net`（API用・ログイン画面ではない）
4. `.env` / Render に `GOOGLE_CLIENT_ID=xxxx.apps.googleusercontent.com`
5. サーバー再起動 → ログイン画面で Google ボタンが公式表示になる

Apple は `APPLE_CLIENT_ID` + Apple Developer 設定（本番ドメイン確定後）。

---

### C. Stripe 連携テスト

- 現状ローカル `.env` は `sk_test_xxx` 等の **プレースホルダ**
- テスト手順: ログイン → 設定 → 980円選択 → Stripe → Webhook → 広告なし・AI上限反映
- Webhook 未設定だと決済後すぐプラン反映されない（`?stripe=success` で `/auth/me` 再取得）

---

### D. git push / デプロイ

| 項目 | 状態（2026-06-29 再開時） |
|------|---------------------------|
| ローカル変更 | **未 commit**（480/980/1250・OAuth・ログインUI 等） |
| GitHub Actions | **まだ失敗**（`CLOUDFLARE_API_TOKEN` 要更新） |
| Wrangler 手動デプロイ | **完了** → https://nenestudio.pages.dev に最新反映 |

**次:** 変更を GitHub に commit / push するか、運営者に確認してから実施。

---

## アーキテクチャ（確定）

| 用途 | ホスト | URL |
|------|--------|-----|
| 画面（PWA） | Cloudflare Pages | https://nenestudio.net |
| API | Render | https://api.nenestudio.net |

ローカルは `http://localhost:8787` で画面+API 一体。  
`config.js` は本番で `https://api.nenestudio.net/api` を使用。

---

## ログイン方式まとめ

| 方式 | 保存場所 | 利用者の操作 |
|------|----------|--------------|
| メール+パスワード | サーバー DB（パスワードは bcrypt） | 登録 / ログイン |
| Google | サーバー DB（Google ID + メール） | ボタン1クリック |
| Apple | 同上 | ボタン1クリック |
| BYOK APIキー | 端末 localStorage のみ | 設定画面 |

---

## 公開後チェックリスト

- [ ] https://nenestudio.net が開く
- [ ] ログイン / 新規登録
- [ ] プラン画面が 480 / 980 / 1250 円表示
- [ ] Stripe テスト決済 → プラン反映（Webhook）
- [ ] 480円: 広告なし / AI0回
- [ ] 980円: AI50回 / 1250円: AI100回
- [ ] Google ログイン（Client ID 設定後）
- [ ] PWA インストール

---

## 参考ファイル

| ファイル | 内容 |
|----------|------|
| `DEPLOYMENT.md` | 公開手順詳細 |
| `.env.example` | 環境変数一覧 |
| `CLAUDE.md` | 開発ルール（料金は勝手に変えない） |

---

## GitHub Secrets（参考）

- `CLOUDFLARE_ACCOUNT_ID` = `e575f757a53cf6fa3a19b54691e14e9a`
- `CLOUDFLARE_API_TOKEN` = **要更新**（Delete 後未反映の可能性）

---

*お疲れさまでした。明日は上記 A → B → C の順がおすすめです。*
