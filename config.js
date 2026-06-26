window.NENE_CONFIG = {
  // ローカル開発: 同じサーバーの /api
  // 本番 (nenestudio.net): Render API の api.nenestudio.net
  apiBase:
    location.hostname === "localhost" || location.hostname === "127.0.0.1"
      ? "/api"
      : "https://api.nenestudio.net/api",
};
