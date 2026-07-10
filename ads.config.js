/**
 * NENE Studio 広告設定
 *
 * AdSense（サイト全体）+ A8（ムームー / ロリポップ）
 * 広告ユニット（slot）を作ったら adsense.slot に ID を入れる
 */
window.NENE_ADS = {
  enabled: true,
  waitSeconds: 5,

  adsense: {
    client: "ca-pub-9344128846274010",
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
        text: "ムームードメインでドメインを取得する",
      },
      {
        linkUrl: "https://px.a8.net/svt/ejp?a8mat=4B7USY+28DJG2+348+6DC69",
        imageUrl: "https://www22.a8.net/svt/bgt?aid=260706994135&wid=001&eno=01&mid=s00000000404001070000&mc=1",
        width: 234,
        height: 60,
        alt: "ロリポップ！",
        text: "ロリポップ！でサーバーを契約する",
        pixelUrl: "https://www15.a8.net/0.gif?a8mat=4B7USY+28DJG2+348+6DC69",
      },
    ],
  },

  // A8 が設定されているときは使わない（誤って自社案内が出ないようにする）
  fallback: {
    title: "",
    message: "",
    linkUrl: "",
  },
};
