# AWS（Lightsail）での公開手順

現在の本番構成。画面もAPIも**同じ1台のサーバー**が配信します。

| 項目 | 値 |
|------|-----|
| サーバー | AWS Lightsail（東京 ap-northeast-1a） |
| プラン | 1GB RAM / 2vCPU / 40GB SSD / 月 $7 |
| 固定IP | `175.41.199.246` |
| OS | Ubuntu 24.04 LTS |
| アプリ置き場 | `/opt/nenestudio` |
| データ保存先 | `/var/data/nene-studio-db.json` |
| 秘密情報 | `/opt/nenestudio/.env`（権限600・nene ユーザーのみ） |
| Webサーバー | Caddy（HTTPS証明書を自動取得・自動更新） |
| 常駐サービス | `nenestudio.service`（落ちても自動再起動・OS再起動でも自動復帰） |

---

## 1. 更新のしかた（普段はこれだけ）

GitHub の main に反映したあと、サーバーで次の1行を実行します。

```bash
sudo nene-deploy
```

これで「最新取得 → 依存関係更新 → 再起動 → 疎通確認」まで自動で行います。
最後に `active` と `health=200` が出れば成功です。

### サーバーに入る方法

Chrome で下記を開くと、ブラウザ内でターミナルが使えます（SSHソフト不要）。

```text
https://ap-northeast-1.console.aws.amazon.com/lightsail/webapp/ap-northeast-1/instances/nenestudio/connect
```

---

## 2. DNS 設定（Cloudflare）

4つとも **Aレコード**で `175.41.199.246` を指します。

| タイプ | 名前 | 値 | プロキシ |
|--------|------|-----|---------|
| A | `@`（nenestudio.net） | 175.41.199.246 | まず DNS only（灰色） |
| A | `www` | 175.41.199.246 | まず DNS only（灰色） |
| A | `api` | 175.41.199.246 | まず DNS only（灰色） |
| A | `tools` | 175.41.199.246 | まず DNS only（灰色） |

> **なぜ最初は灰色（DNS only）か**
> Caddy が Let's Encrypt から証明書を取るとき、Cloudflare のプロキシ（オレンジ雲）が
> 通信に割り込むと失敗することがあります。証明書が取れたらオレンジに戻して構いません。

DNS を切り替えたら、サーバー側で本番用の設定に戻します。

```bash
sudo cp /etc/caddy/Caddyfile.domains /etc/caddy/Caddyfile
sudo systemctl restart caddy
sleep 20
curl -I https://nenestudio.net
```

---

## 3. 秘密情報（.env）

`/opt/nenestudio/.env` に置きます。**GitHub には絶対に入れません。**

```env
PORT=8787
NODE_ENV=production
APP_BASE_URL=https://api.nenestudio.net
PUBLIC_APP_URL=https://nenestudio.net
CORS_ORIGIN=https://nenestudio.net,https://www.nenestudio.net,https://tools.nenestudio.net
COOKIE_DOMAIN=.nenestudio.net
JWT_SECRET=（32文字以上のランダム文字列）
DATABASE_PATH=/var/data/nene-studio-db.json
TOOLS_PUBLIC_BASE_URL=https://tools.nenestudio.net
PUBLIC_API_URL=https://api.nenestudio.net
GOOGLE_CLIENT_ID=（Google Cloud で発行）
GEMINI_API_KEY=（公開ツールのAI用）
GEMINI_MODEL=gemini-2.5-flash
STRIPE_SECRET_KEY=（本番は sk_live_...）
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ID_ADFREE=price_...
STRIPE_PRICE_ID_AI50=price_...
STRIPE_PRICE_ID_AI100=price_...
```

変更したら `sudo systemctl restart nenestudio` で反映します。

---

## 4. Stripe（決済）

**AWS には自社サイト向けの決済機能はありません。** カード決済には Stripe が必要です。

| 設定項目 | 値 |
|---------|-----|
| Webhook 送信先 | `https://api.nenestudio.net/api/stripe/webhook` |
| 有効にするイベント | `checkout.session.completed` / `customer.subscription.updated` / `customer.subscription.deleted` / `invoice.payment_failed` |

**本番モードに移すとき、テスト用の Price ID は使えません。** 本番モードで3つ作り直します。
Stripe の本人確認・銀行口座登録が終わっていないと本番モードは有効になりません。

---

## 5. Googleログイン

Google Cloud Console → 認証情報 → OAuth クライアント ID の
**承認済みの JavaScript 生成元** に次を登録します。

```text
https://nenestudio.net
https://www.nenestudio.net
http://localhost:8787
```

`https://api.nenestudio.net` は**入れません**（ログイン画面ではないため）。

---

## 6. 困ったときの確認コマンド

```bash
systemctl status nenestudio        # アプリが動いているか
systemctl status caddy             # HTTPSが動いているか
journalctl -u nenestudio -n 50     # アプリのログ50行
journalctl -u caddy -n 50          # 証明書取得の失敗などはここ
curl -s http://127.0.0.1:8787/api/auth/providers   # APIの生存確認
free -m                            # メモリ（swap 2GB 設定済み）
```

---

## 付録：旧構成について

Cloudflare Pages + Render で動かしていた頃の設定ファイル（`render.yaml` / `_headers` /
`_redirects` / `.github/workflows/deploy-cloudflare-pages.yml`）は、**切り戻し用に残してあります**。
AWS で問題が起きたときは、DNS を戻せば旧構成で復旧できます。
