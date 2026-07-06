/**
 * NENE Studio 広告設定
 *
 * □ フェーズ1（今）     A8.net の banners を入力 → push
 * □ フェーズ2（審査後） Media.net の cid / tagId を追加 → push
 * □ フェーズ3（後日）   AdSense の client / slot を追加 → push
 *
 * 表示優先: AdSense → Media.net → A8（ランダム） → 自社フォールバック
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
        linkUrl: "https://px.a8.net/svt/ejp?a8mat=4B7USX+DG1FLE+50+2HV61T",
        imageUrl: "https://www26.a8.net/svt/bgt?aid=260706993813&wid=001&eno=01&mid=s00000000018015094000&mc=1",
        width: 728,
        height: 90,
        alt: "お名前.com ドメイン",
      },
      {
        linkUrl: "https://px.a8.net/svt/ejp?a8mat=4B7USY+28YZ1U+348+1BT3VL",
        imageUrl: "https://www24.a8.net/svt/bgt?aid=260706994136&wid=001&eno=01&mid=s00000000404008030000&mc=1",
        width: 468,
        height: 60,
        alt: "ムームードメイン",
      },
    ],
  },

  fallback: {
    title: "NENE Studio 有料プラン",
    message: "480円/月から出力前の広告を非表示にできます。",
    linkUrl: "https://nenestudio.net/index.html#settings",
  },
};
