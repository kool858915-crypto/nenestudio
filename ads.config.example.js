/**
 * 設定例 — 本番は ads.config.js を編集
 *
 * フェーズ1: a8 のみ入力（他は空欄）
 * フェーズ2: medianet を追加
 * フェーズ3: adsense を追加
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
    linkUrl: "https://px.a8.net/svt/ejp?a8mat=...",
    imageUrl: "https://www28.a8.net/svt/bgt?aid=...",
    alt: "スポンサー広告",
  },
  fallback: {
    title: "NENE Studio 有料プラン",
    message: "480円/月から出力前の広告を非表示にできます。",
    linkUrl: "https://nenestudio.net/index.html#settings",
  },
};
