(function initNeneConfig() {
  const hostname = location.hostname;
  const isCustomDomain =
    hostname === "nenestudio.net" || hostname === "www.nenestudio.net";
  const renderApi = "https://nenestudio.onrender.com/api";
  const customApi = "https://api.nenestudio.net/api";

  window.NENE_CONFIG = {
    apiBase: isCustomDomain ? customApi : renderApi,
    apiBaseFallback: renderApi,
  };
})();
