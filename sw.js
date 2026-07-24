const CACHE_NAME = "nene-studio-v34";
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
      // ?????HTTP???E?E??E????????E?E??E?????E?????????E      APP_SHELL.map((url) => new Request(url, { cache: "reload" })),
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
  // ???????E?E?E??E?E??E????E??API???E?E?E??E?ESW???????????????E  // SW???fetch?CSP?connect-src??????E?E??E???????E?E??E???????E  if (requestUrl.origin !== self.location.origin) return;
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
        // ??????index.html??????????????JS?HTML?????E        event.request.mode === "navigate" ? caches.match("./index.html") : Response.error()
      ))
    )),
  );
});
