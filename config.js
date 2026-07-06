(function initNeneConfig() {
  const hostname = location.hostname;
  const isLocal = hostname === "localhost" || hostname === "127.0.0.1";
  const isCustomDomain =
    hostname === "nenestudio.net" || hostname === "www.nenestudio.net";
  const renderApi = "https://nenestudio.onrender.com/api";
  const customApi = "https://api.nenestudio.net/api";

  window.NENE_CONFIG = {
    apiBase: isLocal ? "/api" : isCustomDomain ? customApi : renderApi,
    apiBaseFallback: renderApi,
  };
})();
