/**
 * 設定例 — 本番は ads.config.js を編集
 *
 * 現在の本番: ムームードメインのみ
 */
window.NENE_ADS = {
  enabled: true,
  waitSeconds: 5,
  adsense: {
    client: "",
    slot: "",
  },
  medianet: {
    cid: "",
    tagId: "",
    size: "300x250",
  },
  a8: {
    banners: [
      {
        linkUrl: "https://px.a8.net/svt/ejp?a8mat=...",
        imageUrl: "https://www24.a8.net/svt/bgt?aid=...",
        width: 468,
        height: 60,
        alt: "ムームードメイン",
      },
    ],
  },
  fallback: {
    title: "NENE Studio 有料プラン",
    message: "480円/月から、スポンサーなしですぐ出力できます。",
    linkUrl: "https://nenestudio.net/index.html#settings",
  },
};
