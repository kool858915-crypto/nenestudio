(function initNeneConfig() {
  const hostname = String(location.hostname || "").toLowerCase();
  const isLoopback = hostname === "localhost" || hostname === "127.0.0.1" || hostname === "[::1]";
  const isLan = isPrivateLanHost(hostname);
  const isTunnel = isTunnelHost(hostname);
  const isFile = location.protocol === "file:";
  // AWS 1台構成：画面もAPIも同じサーバーが配信するので、常に同一オリジンの /api を使う。
  // 同一オリジンなら CORS も Cookie も設定ミスで壊れない（過去の公開トラブルの原因を根絶）。
  const isLocal = isLoopback || isLan || isTunnel || isFile;
  // file:// で開いたときだけ、呼び先が無いので本番APIへ逃がす。
  const fallbackApi = "https://api.nenestudio.net/api";

  window.NENE_CONFIG = {
    apiBase: isFile ? fallbackApi : "/api",
    apiBaseFallback: isFile ? fallbackApi : "/api",
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
