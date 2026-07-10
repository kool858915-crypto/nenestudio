/**
 * ブラウザ向けセキュリティヘッダー（Cloudflare _headers と同一方針）。
 */
export const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "script-src 'self' https://accounts.google.com https://appleid.cdn-apple.com https://pagead2.googlesyndication.com https://contextual.media.net",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https: blob: https://*.a8.net",
  "connect-src 'self' https://nenestudio.onrender.com https://api.nenestudio.net https://generativelanguage.googleapis.com",
  "frame-src https://accounts.google.com https://appleid.apple.com",
  "font-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

export const SECURITY_HEADERS = {
  "Content-Security-Policy": CONTENT_SECURITY_POLICY,
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
};

export const AUTH_COOKIE_NAME = "nene_auth";

export function parseCookies(request) {
  const header = request.headers.cookie || "";
  return Object.fromEntries(
    header.split(";")
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => {
        const index = part.indexOf("=");
        if (index === -1) return [part, ""];
        const key = part.slice(0, index);
        const value = part.slice(index + 1);
        try {
          return [key, decodeURIComponent(value)];
        } catch {
          return [key, value];
        }
      }),
  );
}

export function buildAuthCookie(token, remember, { isProduction, cookieDomain }) {
  const parts = [
    `${AUTH_COOKIE_NAME}=${encodeURIComponent(token)}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
  ];
  if (isProduction) parts.push("Secure");
  if (cookieDomain) parts.push(`Domain=${cookieDomain}`);
  if (remember) {
    parts.push(`Max-Age=${30 * 24 * 60 * 60}`);
  }
  return parts.join("; ");
}

export function buildClearAuthCookie({ isProduction, cookieDomain }) {
  const parts = [
    `${AUTH_COOKIE_NAME}=`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    "Max-Age=0",
  ];
  if (isProduction) parts.push("Secure");
  if (cookieDomain) parts.push(`Domain=${cookieDomain}`);
  return parts.join("; ");
}

export const PUBLIC_STATIC_FILES = new Set([
  "/index.html",
  "/styles.css",
  "/script.js",
  "/config.js",
  "/ads.js",
  "/ads.config.js",
  "/manifest.webmanifest",
  "/sw.js",
  "/robots.txt",
]);

export function isPublicStaticPath(requestPath) {
  if (requestPath === "/" || requestPath === "") return true;
  if (PUBLIC_STATIC_FILES.has(requestPath)) return true;
  if (requestPath.startsWith("/assets/")) return true;
  return false;
}
