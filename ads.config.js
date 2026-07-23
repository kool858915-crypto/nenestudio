/**
 * NENE Studio 広告設定
 *
 * 現在はムームードメイン（A8）のみ配信。
 * AdSense を再開する場合は adsense.slot に広告ユニットIDを入れ、
 * index.html の AdSense スクリプトのコメントを外す。
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
        linkUrl: "https://px.a8.net/svt/ejp?a8mat=4B7USY+28YZ1U+348+1BU6GH",
        imageUrl: "https://www22.a8.net/svt/bgt?aid=260706994136&wid=001&eno=01&mid=s00000000404008035000&mc=1",
        width: 468,
        height: 60,
        alt: "ムームードメイン",
        text: "ムームードメインでドメインを取得する",
        pixelUrl: "https://www15.a8.net/0.gif?a8mat=4B7USY+28YZ1U+348+1BU6GH",
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
