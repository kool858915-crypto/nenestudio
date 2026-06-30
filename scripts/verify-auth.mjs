const base = process.env.APP_BASE_URL || "http://localhost:8787";

async function main() {
  const providersUrl = `${base.replace(/\/$/, "")}/api/auth/providers`;
  const statusUrl = `${base.replace(/\/$/, "")}/api/server/status`;

  let providers;
  let status;
  try {
    [providers, status] = await Promise.all([
      fetch(providersUrl).then((r) => r.json()),
      fetch(statusUrl).then((r) => r.json()),
    ]);
  } catch {
    console.error("サーバーに接続できません。先に npm run dev を起動してください。");
    process.exit(1);
  }

  console.log("=== Auth providers ===");
  console.log(JSON.stringify(providers, null, 2));
  console.log("\n=== Server status (auth) ===");
  console.log(JSON.stringify(status.auth, null, 2));

  if (providers.google?.enabled) {
    console.log("\nOK: Google ログインはサーバー側で有効です。");
    console.log("次: ブラウザでログイン画面を開き、Google ボタンで試してください。");
  } else {
    console.log("\n未設定: GOOGLE_CLIENT_ID を .env に入れてサーバーを再起動してください。");
    console.log("手順: DEPLOYMENT.md の「3.5 Google ログイン設定」");
    process.exitCode = 1;
  }
}

main();
