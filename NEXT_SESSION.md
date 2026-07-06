# NENE Studio — 作業メモ

> 最終更新: 2026-07-06  
> 公開: https://nenestudio.net  
> API: https://api.nenestudio.net/api

---

## 今すぐ Render に貼る（Environment）

```env
APP_BASE_URL=https://api.nenestudio.net
PUBLIC_APP_URL=https://nenestudio.net
CORS_ORIGIN=https://nenestudio.net,https://nenestudio.pages.dev
STRIPE_WEBHOOK_SECRET=（.env の whsec_... をコピー・2026-07-06 更新）
```

> Stripe Webhook URL: `https://api.nenestudio.net/api/stripe/webhook`  
> `npm run setup:stripe` で再作成済み（ローカル `.env` 参照）

---

## Google OAuth（本人作業）

[Google Cloud Console](https://console.cloud.google.com/) → OAuth クライアント → **承認済み JavaScript 生成元** に追加:

```text
https://nenestudio.net
https://nenestudio.pages.dev
```

---

## 完了済み

| 項目 | 状態 |
|------|------|
| `nenestudio.net`（Pages） | ✅ Active |
| `api.nenestudio.net`（Render） | ✅ DNS + API 200 |
| NS（Xserver → Cloudflare） | ✅ |
| Stripe 3プラン | ✅ |
| Stripe Webhook（api ドメイン） | ✅ ローカル設定済み → Render に secret 貼付要 |
| `config.js` ドメイン自動切替 | ✅ コード済み → **Git push 後に本番反映** |

---

## 確認コマンド

```bash
npm run verify:dns
npm run verify:production
```

---

## 任意（後回し OK）

- Render DB 永続化（Starter + disk）
- Google OAuth 一般公開
- AdSense（Email Routing: contact@nenestudio.net）

---

## 料金（変更禁止）

480円 / 980円 / 1250円
