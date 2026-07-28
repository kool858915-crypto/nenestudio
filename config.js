(function initNeneConfig() {
  const hostname = location.hostname;
  const isLocal = hostname === "localhost" || hostname === "127.0.0.1";
  const isCustomDomain =
    hostname === "nenestudio.net"
    || hostname === "www.nenestudio.net"
    || hostname.endsWith(".nenestudio.net");
  const renderApi = "https://nenestudio.onrender.com/api";
  const customApi = "https://api.nenestudio.net/api";

  window.NENE_CONFIG = {
    // www でも必ず API ドメインへ向ける（相対 /api は Pages には無い）
    apiBase: isLocal ? "/api" : customApi,
    apiBaseFallback: renderApi,
    appHost: hostname,
  };
})();
