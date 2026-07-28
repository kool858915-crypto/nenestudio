const CACHE_NAME = "nene-studio-v44";
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

// アプリ本体は常に最新を取りに行く（古いZIPフローが残らないようにする）
const NETWORK_FIRST_PATHS = [
  "/index.html",
  "/script.js",
  "/styles.css",
  "/sw.js",
  "/config.js",
  "/ads.config.js",
  "/ads.js",
];

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(
      APP_SHELL.map((url) => new Request(url, { cache: "reload" })),
    )).then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)),
    )).then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const requestUrl = new URL(event.request.url);
  if (requestUrl.origin !== self.location.origin) return;
  if (requestUrl.pathname.startsWith("/api/")) return;

  const isNetworkFirst = NETWORK_FIRST_PATHS.some((path) => (
    requestUrl.pathname.endsWith(path) || requestUrl.pathname === "/" || requestUrl.pathname.endsWith("/")
  ));

  if (isNetworkFirst || event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy)).catch(() => {});
          return response;
        })
        .catch(() => caches.match(event.request).then((cached) => (
          cached || (event.request.mode === "navigate" ? caches.match("./index.html") : Response.error())
        ))),
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => (
      cached || fetch(event.request)
    )),
  );
});
