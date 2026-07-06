const checks = [
  { name: "nenestudio.net", url: "https://nenestudio.net", expect: (t) => t.includes("NENE Studio") },
  {
    name: "config.js uses api.nenestudio.net",
    url: "https://nenestudio.net/config.js",
    expect: (t) => t.includes("api.nenestudio.net") || t.includes("isCustomDomain"),
  },
  {
    name: "api.nenestudio.net /server/status",
    url: "https://api.nenestudio.net/api/server/status",
    expect: (t) => t.includes('"stripe":true'),
  },
];

for (const check of checks) {
  try {
    const response = await fetch(check.url, { signal: AbortSignal.timeout(90000) });
    const text = await response.text();
    const ok = response.ok && check.expect(text);
    console.log(`[${ok ? "OK" : "NG"}] ${check.name}`);
    if (!ok) console.log(`       HTTP ${response.status}`);
  } catch (error) {
    console.log(`[NG] ${check.name} — ${error.message}`);
  }
}
