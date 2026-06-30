window.NENE_CONFIG = {
  // ローカル開発: 同じサーバーの /api
  apiBase:
    location.hostname === "localhost" || location.hostname === "127.0.0.1"
      ? "/api"
      : "https://api.nenestudio.net/api",
  // api.nenestudio.net の DNS 未設定時のフォールバック（Render 直 URL）
  // Render の CORS_ORIGIN に https://nenestudio.pages.dev を含めてください
  apiBaseFallback: "https://nenestudio.onrender.com/api",
};
