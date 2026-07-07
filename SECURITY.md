# セキュリティ運用ガイド

公開前・インシデント時に確認するチェックリストです。

## 1. デプロイ範囲（Cloudflare Pages）

- **必ず** `npm run build:static` → `npm run verify:static` のあと `dist/` のみデプロイする。
- `wrangler pages deploy .`（プロジェクト全体）は **使わない**。
- 手動デプロイ: `scripts/deploy-cloudflare.ps1`（内部で dist のみ公開）。

## 2. ローカル秘密情報（.env / DB）

以下は **git 追跡外** ですが、ZIP 共有・誤デプロイ・誤コミットのリスクがあります。

| ファイル | 内容 |
|---------|------|
| `.env` | JWT、Stripe、Webhook、OpenAI/Google キー |
| `JWT_SECRET.local.txt` | JWT バックアップ |
| `server/nene-studio-db.json` | ユーザーメール、パスワードハッシュ、Stripe ID |

### 外部に漏れた可能性がある場合のローテーション

1. **Stripe**: ダッシュボードで秘密キー・Webhook 署名を再発行 → Render の環境変数を更新。
2. **JWT_SECRET**: 新しい長いランダム文字列に変更 → 全ユーザー再ログイン。
3. **OpenAI / Google**: 各コンソールでキー無効化・再発行。
4. **ローカル DB**: テスト用なら `server/nene-studio-db.json` を削除して再生成可。

## 3. 認証トークン

- 本番（`nenestudio.net` + `api.nenestudio.net`）: **httpOnly Cookie**（`nene_auth`）で保持。
- クロスオリジン（`pages.dev` 等）: レスポンスの token を **メモリのみ**（localStorage 非保存）。
- ログアウト: `POST /api/auth/logout` で Cookie 削除。

## 4. BYOK API キー

- **sessionStorage** のみ（タブを閉じると消える）。localStorage には保存しない。
- XSS 対策として CSP を `_headers` とサーバーで配信。

## 5. Render DB 永続化

`render.yaml` は **Starter + 永続ディスク**（`/var/data`）を前提にしています。

- `DATABASE_PATH=/var/data/nene-studio-db.json`
- `REQUIRE_PERSISTENT_DB=true`（永続ディスク未設定時は起動失敗）

ローカル開発は `.env` で `REQUIRE_PERSISTENT_DB=false` のまま。

## 6. 公開前チェックコマンド

```bash
npm run check
npm run build:static
npm run verify:static
```

## 7. 使い方（手順）

1. 上記コマンドを実行し、エラーがないことを確認する。
2. Cloudflare は `dist/` のみデプロイする（GitHub Actions または `deploy-cloudflare.ps1`）。
3. Render で `render.yaml` の disk 設定が有効か確認する。
4. 秘密情報を共有した覚えがある場合は「ローテーション」節を実施する。

## 8. 使用例

**シーン**: 手動で Cloudflare に上げる前

```powershell
$env:CLOUDFLARE_API_TOKEN = "..."
$env:CLOUDFLARE_ACCOUNT_ID = "..."
.\scripts\deploy-cloudflare.ps1
```

→ `dist/` のみビルド・検証してからデプロイされます。`.env` や DB は含まれません。
