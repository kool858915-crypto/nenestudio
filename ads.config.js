/**
 * NENE Studio 広告設定
 *
 * 現在は A8 のみ配信。banners に入れた中から毎回1件をランダムで表示する。
 * waitSeconds は配列なら、その秒数から毎回1つをランダムに選ぶ。
 * AdSense を再開する場合は adsense.slot に広告ユニットIDを入れ、
 * index.html の AdSense スクリプトのコメントを外す。
 *
 * 追加するときは A8 の管理画面が出すタグから、以下をそのまま写す。
 *   linkUrl  = <a href="..."> の中身
 *   imageUrl = <img src="..."> の中身
 *   pixelUrl = 1x1 の計測用画像（0.gif）の src
 *   width / height = <img> の width / height
 */
window.NENE_ADS = {
  enabled: true,
  waitSeconds: [5, 15, 30],

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
        linkUrl: "https://px.a8.net/svt/ejp?a8mat=4BABTB+2Z61O2+2PEO+1HZSUP",
        imageUrl: "https://www25.a8.net/svt/bgt?aid=260822351180&wid=001&eno=01&mid=s00000012624009069000&mc=1",
        width: 468,
        height: 60,
        alt: "ココナラ",
        text: "ココナラで発注・相談する（無料会員登録）",
        pixelUrl: "https://www13.a8.net/0.gif?a8mat=4BABTB+2Z61O2+2PEO+1HZSUP",
      },
      {
        linkUrl: "https://px.a8.net/svt/ejp?a8mat=4BABTB+30CWVM+3SPO+99G129",
        imageUrl: "https://www21.a8.net/svt/bgt?aid=260822351182&wid=001&eno=01&mid=s00000017718056006000&mc=1",
        width: 320,
        height: 50,
        alt: "3D Phantom",
        text: "3D Phantom でホログラム演出を見る",
        pixelUrl: "https://www13.a8.net/0.gif?a8mat=4BABTB+30CWVM+3SPO+99G129",
      },
      {
        linkUrl: "https://px.a8.net/svt/ejp?a8mat=4BABTB+3HMHF6+3SPO+9RBW2P",
        imageUrl: "https://www21.a8.net/svt/bgt?aid=260822351211&wid=001&eno=01&mid=s00000017718059010000&mc=1",
        width: 300,
        height: 250,
        alt: "CLOUD PHONE",
        text: "CLOUD PHONE でクラウド電話を検討する",
        pixelUrl: "https://www19.a8.net/0.gif?a8mat=4BABTB+3HMHF6+3SPO+9RBW2P",
      },
      {
        linkUrl: "https://px.a8.net/svt/ejp?a8mat=4BABTB+31JS36+3SPO+89QNWX",
        imageUrl: "https://www27.a8.net/svt/bgt?aid=260822351184&wid=001&eno=01&mid=s00000017718050009000&mc=1",
        width: 300,
        height: 250,
        alt: "ホームページDX",
        text: "ホームページDX（IT導入補助金の対象ツール）",
        pixelUrl: "https://www19.a8.net/0.gif?a8mat=4BABTB+31JS36+3SPO+89QNWX",
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
