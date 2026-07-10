/**
 * NENE Studio 広告設定
 *
 * 現在: ロリポップ！ / ムームードメイン（A8.net）のみ
 * 表示: 2件をランダム表示 → 自社フォールバック
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
        linkUrl: "https://px.a8.net/svt/ejp?a8mat=4B7USY+28YZ1U+348+1BT3VL",
        imageUrl: "https://www24.a8.net/svt/bgt?aid=260706994136&wid=001&eno=01&mid=s00000000404008030000&mc=1",
        width: 468,
        height: 60,
        alt: "ムームードメイン",
      },
      {
        linkUrl: "https://px.a8.net/svt/ejp?a8mat=4B7USY+28DJG2+348+6DC69",
        imageUrl: "https://www22.a8.net/svt/bgt?aid=260706994135&wid=001&eno=01&mid=s00000000404001070000&mc=1",
        width: 234,
        height: 60,
        alt: "ロリポップ！",
        pixelUrl: "https://www15.a8.net/0.gif?a8mat=4B7USY+28DJG2+348+6DC69",
      },
    ],
  },

  fallback: {
    title: "NENE Studio 有料プラン",
    message: "480円/月から、スポンサーなしですぐ出力できます。",
    linkUrl: "https://nenestudio.net/index.html#settings",
  },
};
