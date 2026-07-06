/**
 * NENE Studio 広告設定
 *
 * □ フェーズ1（今）     A8.net の linkUrl / imageUrl を入力 → push
 * □ フェーズ2（審査後） Media.net の cid / tagId を追加 → push
 * □ フェーズ3（後日）   AdSense の client / slot を追加 → push
 *
 * 表示優先: AdSense → Media.net → A8 → 自社フォールバック（空欄はスキップ）
 *
 * A8.net:     https://www.a8.net/
 * Media.net:  https://www.media.net/
 * AdSense:    https://www.google.com/adsense/ （公開後しばらくしてから）
 */
window.NENE_ADS = {
  enabled: true,
  waitSeconds: 5,

  // 公開後しばらく経ってから AdSense 審査・実装（今は空欄のまま）
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
    linkUrl: "https://px.a8.net/svt/ejp?a8mat=4B7USX+DG1FLE+50+2HV61T",
    imageUrl: "https://www26.a8.net/svt/bgt?aid=260706993813&wid=001&eno=01&mid=s00000000018015094000&mc=1",
    alt: "スポンサー広告",
  },

  fallback: {
    title: "NENE Studio 有料プラン",
    message: "480円/月から出力前の広告を非表示にできます。",
    linkUrl: "https://nenestudio.net/index.html#settings",
  },
};
