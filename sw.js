const CACHE_NAME = "nene-studio-v31";
const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css",
  "./script.js",
  "./config.js",
  "./ads.config.js",
  "./ads.js",
  "./manifest.webmanifest",
  "./assets/icon.svg",
];

const NETWORK_FIRST_PATHS = ["/ads.config.js", "/ads.js", "/config.js"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(
      // 繝悶Λ繧ｦ繧ｶ縺ｮHTTP繧ｭ繝｣繝・す繝･繧剃ｻ九＆縺壹∝ｿ・★繧ｵ繝ｼ繝舌・縺九ｉ譛譁ｰ繧貞叙繧顔峩縺・      APP_SHELL.map((url) => new Request(url, { cache: "reload" })),
    )),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)),
    )),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const requestUrl = new URL(event.request.url);
  // 螟夜Κ繝峨Γ繧､繝ｳ・亥ｺ・相逕ｻ蜒上・螟夜ΚAPI縺ｪ縺ｩ・峨・SW繧帝壹＆縺壹ヶ繝ｩ繧ｦ繧ｶ縺ｫ逶ｴ謗･莉ｻ縺帙ｋ縲・  // SW邨檎罰縺ｮfetch縺ｯCSP縺ｮconnect-src縺ｧ邵帙ｉ繧後∝ｺ・相逕ｻ蜒上′繝悶Ο繝・け縺輔ｌ繧九◆繧√・  if (requestUrl.origin !== self.location.origin) return;
  if (requestUrl.pathname.startsWith("/api/")) return;

  const isNetworkFirst = NETWORK_FIRST_PATHS.some((path) => (
    requestUrl.pathname.endsWith(path)
  ));

  if (isNetworkFirst) {
    event.respondWith(
      fetch(event.request)
        .then((response) => response)
        .catch(() => caches.match(event.request)),
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => (
      cached || fetch(event.request).catch(() => (
        // 逕ｻ髱｢驕ｷ遘ｻ縺縺訴ndex.html縺ｸ繝輔か繝ｼ繝ｫ繝舌ャ繧ｯ縺吶ｋ縲ら判蜒上ｄJS縺ｫHTML繧定ｿ斐＆縺ｪ縺・        event.request.mode === "navigate" ? caches.match("./index.html") : Response.error()
      ))
    )),
  );
});
