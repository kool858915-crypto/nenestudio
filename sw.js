const CACHE_NAME = "nene-studio-v30";
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
      // ブラウザのHTTPキャッシュを介さず、必ずサーバーから最新を取り直す
      APP_SHELL.map((url) => new Request(url, { cache: "reload" })),
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
  // 外部ドメイン（広告画像・外部APIなど）はSWを通さずブラウザに直接任せる。
  // SW経由のfetchはCSPのconnect-srcで縛られ、広告画像がブロックされるため。
  if (requestUrl.origin !== self.location.origin) return;
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
        // 画面遷移だけindex.htmlへフォールバックする。画像やJSにHTMLを返さない
        event.request.mode === "navigate" ? caches.match("./index.html") : Response.error()
      ))
    )),
  );
});
