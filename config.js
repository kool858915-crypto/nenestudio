window.NENE_CONFIG = {
  // ローカル開発: 同じサーバーの /api
  apiBase:
    location.hostname === "localhost" || location.hostname === "127.0.0.1"
      ? "/api"
      : "https://nenestudio.onrender.com/api",
  // カスタムドメイン DNS 設定後に切り替え:
  // apiBase: "https://api.nenestudio.net/api",
  apiBaseFallback: "https://nenestudio.onrender.com/api",
};
