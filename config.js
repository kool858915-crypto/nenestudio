(function initNeneConfig() {
  const hostname = String(location.hostname || "").toLowerCase();
  const isLoopback = hostname === "localhost" || hostname === "127.0.0.1" || hostname === "[::1]";
  const isLan = isPrivateLanHost(hostname);
  const isTunnel = isTunnelHost(hostname);
  // スマホからパソコンの番号／トンネルで開いたときは、同じサーバーを使う（本番APIへ飛ばさない）
  const isLocal = isLoopback || isLan || isTunnel || location.protocol === "file:";
  const renderApi = "https://nenestudio.onrender.com/api";
  const customApi = "https://api.nenestudio.net/api";

  window.NENE_CONFIG = {
    apiBase: isLocal ? "/api" : customApi,
    apiBaseFallback: isLocal ? "/api" : renderApi,
    appHost: hostname,
    isLocal,
  };

  function isTunnelHost(host) {
    const name = String(host || "").toLowerCase();
    return name.endsWith(".ngrok-free.app")
      || name.endsWith(".ngrok.app")
      || name.endsWith(".ngrok.io")
      || name.endsWith(".ngrok-free.dev")
      || name.endsWith(".trycloudflare.com")
      || name.endsWith(".loca.lt");
  }

  function isPrivateLanHost(host) {
    if (!host) return false;
    if (host.endsWith(".local")) return true;
    const parts = host.split(".");
    if (parts.length !== 4 || parts.some((part) => !/^\d{1,3}$/.test(part))) return false;
    const a = Number(parts[0]);
    const b = Number(parts[1]);
    if (a === 10 || a === 127) return true;
    if (a === 192 && b === 168) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
    return false;
  }
})();
