/**
 * 設定例 — 本番は ads.config.js を編集
 */
window.NENE_ADS = {
  enabled: true,
  waitSeconds: [5, 15, 30],
  adsense: { client: "ca-pub-XXXXXXXXXXXXXXXX", slot: "" },
  medianet: { cid: "", tagId: "", size: "300x250" },
  a8: {
    banners: [
      {
        linkUrl: "https://px.a8.net/svt/ejp?a8mat=...",
        imageUrl: "https://www24.a8.net/svt/bgt?aid=...",
        width: 468,
        height: 60,
        alt: "スポンサー名",
        text: "スポンサーの説明",
      },
      {
        linkUrl: "https://px.a8.net/svt/ejp?a8mat=...",
        imageUrl: "https://www22.a8.net/svt/bgt?aid=...",
        width: 300,
        height: 250,
        alt: "スポンサー名",
        text: "スポンサーの説明",
      },
    ],
  },
  fallback: {
    title: "",
    message: "",
    linkUrl: "",
  },
};
