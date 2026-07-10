/**
 * 設定例 — 本番は ads.config.js を編集
 */
window.NENE_ADS = {
  enabled: true,
  waitSeconds: 5,
  adsense: { client: "", slot: "" },
  medianet: { cid: "", tagId: "", size: "300x250" },
  a8: {
    banners: [
      {
        linkUrl: "https://px.a8.net/svt/ejp?a8mat=...",
        imageUrl: "https://www24.a8.net/svt/bgt?aid=...",
        width: 468,
        height: 60,
        alt: "ムームードメイン",
        text: "ムームードメインでドメインを取得する",
      },
      {
        linkUrl: "https://px.a8.net/svt/ejp?a8mat=...",
        imageUrl: "https://www22.a8.net/svt/bgt?aid=...",
        width: 234,
        height: 60,
        alt: "ロリポップ！",
        text: "ロリポップ！でサーバーを契約する",
      },
    ],
  },
  fallback: {
    title: "",
    message: "",
    linkUrl: "",
  },
};
