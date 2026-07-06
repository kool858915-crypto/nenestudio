const CHECKS = [
  {
    name: "NS → Cloudflare",
    url: "https://1.1.1.1/dns-query?name=nenestudio.net&type=NS",
    verify: (data) => data.Answer?.some((row) => String(row.data).includes("cloudflare.com")),
  },
  {
    name: "nenestudio.net (HTTPS)",
    url: "https://nenestudio.net",
    fetchOpts: { redirect: "follow" },
    verify: (_, response) => response.ok,
  },
  {
    name: "api.nenestudio.net (/api/server/status)",
    url: "https://api.nenestudio.net/api/server/status",
    verify: (_, response) => response.ok,
  },
  {
    name: "pages.dev (fallback)",
    url: "https://nenestudio.pages.dev",
    verify: (_, response) => response.ok,
  },
];

async function queryDns(url) {
  const response = await fetch(url, { headers: { accept: "application/dns-json" } });
  return response.json();
}

async function runCheck(check) {
  try {
    if (check.url.includes("dns-query")) {
      const data = await queryDns(check.url);
      const ok = Boolean(check.verify(data));
      return { ok, detail: ok ? "cleo/tess NS" : JSON.stringify(data.Comment || data) };
    }
    const response = await fetch(check.url, { ...check.fetchOpts, signal: AbortSignal.timeout(90000) });
    const ok = Boolean(check.verify(null, response));
    return { ok, detail: `HTTP ${response.status}` };
  } catch (error) {
    return { ok: false, detail: error.message || "failed" };
  }
}

console.log("NENE Studio DNS / 公開チェック\n");
for (const check of CHECKS) {
  const result = await runCheck(check);
  const mark = result.ok ? "OK" : "NG";
  console.log(`[${mark}] ${check.name} — ${result.detail}`);
}

console.log(`
次の手順（NG の項目）:
  1. Cloudflare → Workers & Pages → nenestudio → Custom domains → nenestudio.net
  2. Render → nenestudio → Settings → Custom Domains → api.nenestudio.net
  3. Cloudflare DNS → CNAME api → Render が指定するホスト名
  4. Render Environment:
     APP_BASE_URL=https://api.nenestudio.net
     PUBLIC_APP_URL=https://nenestudio.net
`);
