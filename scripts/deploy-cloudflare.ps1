# Cloudflare Pages へ手動デプロイ（Wrangler）
# 事前: Cloudflare ダッシュボード → My Profile → API Tokens
# 「Edit Cloudflare Workers」テンプレートでトークン作成
# 環境変数 CLOUDFLARE_API_TOKEN と CLOUDFLARE_ACCOUNT_ID を設定

param(
  [string]$ApiToken = $env:CLOUDFLARE_API_TOKEN,
  [string]$AccountId = $env:CLOUDFLARE_ACCOUNT_ID
)

$ErrorActionPreference = "Stop"
Set-Location (Split-Path $PSScriptRoot -Parent)

if (-not $ApiToken -or -not $AccountId) {
  Write-Host "CLOUDFLARE_API_TOKEN と CLOUDFLARE_ACCOUNT_ID を設定してください。" -ForegroundColor Yellow
  Write-Host "Account ID: Cloudflare ダッシュボード右側のサイドバーに表示"
  exit 1
}

$env:CLOUDFLARE_API_TOKEN = $ApiToken
$env:CLOUDFLARE_ACCOUNT_ID = $AccountId

npx --yes wrangler pages deploy . --project-name=nenestudio --branch=main
Write-Host "完了。Cloudflare Pages → nenestudio → Custom domains で nenestudio.net を追加してください。"
