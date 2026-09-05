const categories = [
  { name: "株投資ツール", description: "テーマを選ぶだけで注目株を半自動選定", money: "★★★★★", easy: "★★★★☆", use: "銘柄候補、選定理由、買う前チェック", isInvestment: true },
  { name: "FXツール", description: "自動売買向けのシグナル・ルールを半自動生成", money: "★★★★☆", easy: "★★★★☆", use: "売買シグナル、EA用ルール、リスクリミット", isInvestment: true },
  { name: "ニュース分析ツール", description: "分野を選ぶだけで今の注目ニュースを自動整理", money: "★★★★★", easy: "★★★★★", use: "注目トピック、要点、次の行動", isInvestment: false },
  { name: "仮想通貨ツール", description: "テーマを選ぶだけで注目コインを半自動選定", money: "★★★★☆", easy: "★★★☆☆", use: "コイン候補、選定理由、リスク", isInvestment: true },
  { name: "SNS運用ツール", description: "X投稿、スレッド、投稿案作成など", money: "★★★★★", easy: "★★★★★", use: "X運用、note導線、投稿量産", isInvestment: false },
  { name: "YouTube動画制作ツール", description: "台本、構成、サムネイル文言など", money: "★★★★☆", easy: "★★★★☆", use: "動画企画、台本、タイトル案", isInvestment: false },
  { name: "営業集客ツール", description: "営業メール、問い合わせ返信など", money: "★★★★☆", easy: "★★★★★", use: "営業文、返信文、見込み客整理", isInvestment: false },
  { name: "資料作成ツール", description: "提案資料、企画書、説明資料など", money: "★★★★☆", easy: "★★★★☆", use: "提案書、社内資料、説明文", isInvestment: false },
  { name: "メニュー表チラシ制作ツール", description: "店舗向け販促物の構成作成など", money: "★★★☆☆", easy: "★★★★☆", use: "メニュー、チラシ、キャンペーン", isInvestment: false },
  { name: "事務作業自動化ツール", description: "議事録、書類整理、文章作成など", money: "★★★☆☆", easy: "★★★★★", use: "議事録、要約、定型文", isInvestment: false },
  { name: "求人採用ツール", description: "求人票、スカウト文、面接質問など", money: "★★★☆☆", easy: "★★★★☆", use: "求人票、面接準備、候補者対応", isInvestment: false },
  { name: "ブログ記事作成ツール", description: "SEO記事、note記事、構成案など", money: "★★★★☆", easy: "★★★★★", use: "記事構成、SEO、下書き", isInvestment: false },
  { name: "教育学習ツール", description: "学習計画、教材、問題作成など", money: "★★★☆☆", easy: "★★★★☆", use: "教材、問題、復習計画", isInvestment: false },
  { name: "店舗運営ツール", description: "口コミ返信、キャンペーン案など", money: "★★★☆☆", easy: "★★★★☆", use: "口コミ返信、販促、運営メモ", isInvestment: false },
  { name: "自由作成", description: "ユーザーが自由に内容を決める", money: "★★★☆☆", easy: "★★★☆☆", use: "独自ツール、検証用、個人用途", isInvestment: false },
];

const categoryThemes = {
  "株投資ツール": {
    purposeTitle: "どんな株投資ツールを作りますか？",
    scopeTitle: "どの市場を対象にしますか？",
    purposeOptions: ["テーマを選ぶだけで注目株を半自動選定する", "今日の注目テーマから銘柄候補を出す", "条件なしで初心者向け候補を出す", "高配当テーマから候補を出す", "買う前チェック付きで候補を出す"],
    scopeOptions: ["日本株", "米国株", "両方"],
    outputOptions: ["ランキング形式", "点数評価", "選定理由つきリスト", "買う前チェック付き", "通知形式"],
    sourceLabel: "直近の公開情報・テーマ材料",
    itemLabel: "注目銘柄",
    defaultInputs: "テーマだけ（例：AI・半導体）。ニュースURLや長文の貼り付けは不要",
    defaultResult: "注目株3〜5銘柄、選定理由、リスク、買う前チェック",
  },
  "FXツール": {
    purposeTitle: "どんなFXツールを作りますか？",
    scopeTitle: "どの通貨ペアを対象にしますか？",
    purposeOptions: ["自動売買向けシグナルを半自動で出す", "EA用の売買ルールを作る", "エントリー／損切り条件を自動整理する", "指標発表前後の立ち回りを出す", "今日のトレードチェックリストを出す"],
    scopeOptions: ["ドル円", "ユーロドル", "ポンド円", "ゴールド", "主要通貨全体"],
    outputOptions: ["売買シグナル形式", "EAルール形式", "チェックリスト", "通知形式", "日次メモ"],
    sourceLabel: "直近の相場材料・指標",
    itemLabel: "シグナル／売買ルール",
    defaultInputs: "通貨ペアまたは手法テーマだけ（例：ドル円、スキャル）。ニュースURL貼り付けは不要",
    defaultResult: "売買シグナル、エントリー／決済条件、ロット目安の考え方、注意点（実注文は別途）",
  },
  "ニュース分析ツール": {
    purposeTitle: "どんなニュース分析ツールを作りますか？",
    scopeTitle: "どの分野を対象にしますか？",
    purposeOptions: ["分野を選ぶだけで今日の注目を自動整理する", "読むべきトピックだけ抜き出す", "初心者向けに要点だけ出す", "SNS投稿用に短くまとめる", "次に調べることを自動提示する"],
    scopeOptions: ["ビジネス", "テクノロジー", "金融", "国内ニュース", "海外ニュース"],
    outputOptions: ["要約レポート", "トピック一覧", "ニュースレター形式", "SNS投稿案", "調査メモ"],
    sourceLabel: "直近の公開ニュース動向",
    itemLabel: "注目トピック",
    defaultInputs: "分野・テーマだけ（例：テック）。記事URLのコピペは不要",
    defaultResult: "注目トピック一覧、要点、なぜ今か、次の行動",
  },
  "仮想通貨ツール": {
    purposeTitle: "どんな仮想通貨ツールを作りますか？",
    scopeTitle: "どの銘柄・領域を対象にしますか？",
    purposeOptions: ["テーマを選ぶだけで注目コインを半自動選定する", "初心者向け候補を自動で出す", "リスク付きで候補を並べる", "短期／中期の見方を整理する", "買う前チェック付きで候補を出す"],
    scopeOptions: ["BTC", "ETH", "主要アルト", "DeFi", "AI関連"],
    outputOptions: ["ランキング形式", "点数評価", "選定理由つきリスト", "チェックリスト", "日次メモ"],
    sourceLabel: "直近の公開情報・テーマ材料",
    itemLabel: "注目コイン",
    defaultInputs: "テーマだけ（例：AI関連コイン）。ニュースURLや長文の貼り付けは不要",
    defaultResult: "注目コイン3〜5個、選定理由、リスク、買う前チェック",
  },
  "SNS運用ツール": {
    purposeTitle: "どんなSNS運用ツールを作りますか？",
    scopeTitle: "どのSNSを対象にしますか？",
    purposeOptions: ["テーマを入れるだけで投稿文を自動作成する", "スレッドを半自動で量産する", "投稿カレンダーを自動で埋める", "反応が取れる見出しを自動生成する", "プロフィール文を改善する"],
    scopeOptions: ["X", "Instagram", "TikTok", "YouTube Shorts", "複数SNS"],
    outputOptions: ["投稿案", "スレッド形式", "カレンダー形式", "改善リスト", "テンプレート"],
    sourceLabel: "投稿テーマ",
    itemLabel: "投稿案や企画",
    defaultInputs: "テーマだけ（商品名や業種が分かれば尚可）。長文コピペは不要",
    defaultResult: "投稿文、見出し、ハッシュタグ、投稿順",
  },
  "YouTube動画制作ツール": {
    purposeTitle: "どんなYouTube動画制作ツールを作りますか？",
    scopeTitle: "どの動画タイプを対象にしますか？",
    purposeOptions: ["テーマを入れるだけで台本を半自動作成する", "タイトル案を自動で出す", "サムネ文言を自動で出す", "構成を自動で組む", "ショート向けに短く整える"],
    scopeOptions: ["解説動画", "ショート動画", "レビュー動画", "教育動画", "ライブ配信"],
    outputOptions: ["構成案", "台本形式", "タイトル一覧", "サムネ案", "チェックリスト"],
    sourceLabel: "動画テーマ",
    itemLabel: "企画や台本",
    defaultInputs: "テーマだけ（例：初心者向けNISA解説）。参考URLのコピペは不要",
    defaultResult: "構成、台本、タイトル、サムネ文言",
  },
  "営業集客ツール": {
    purposeTitle: "どんな営業集客ツールを作りますか？",
    scopeTitle: "どの相手を対象にしますか？",
    purposeOptions: ["相手種別を選ぶだけで営業文を自動作成する", "問い合わせ返信を半自動で作る", "提案文を自動で整える", "フォロー文を量産する", "商談メモを自動整理する"],
    scopeOptions: ["新規顧客", "既存顧客", "問い合わせ客", "法人向け", "個人向け"],
    outputOptions: ["メール文", "返信文", "リスト形式", "提案文", "商談メモ"],
    sourceLabel: "相手種別・商品テーマ",
    itemLabel: "営業文や提案",
    defaultInputs: "相手種別と商品テーマだけ。長文コピペは不要",
    defaultResult: "営業文、返信文、提案ポイント、次の行動",
  },
  "資料作成ツール": {
    purposeTitle: "どんな資料作成ツールを作りますか？",
    scopeTitle: "どの資料を対象にしますか？",
    purposeOptions: ["テーマを入れるだけで資料構成を半自動作成する", "見出しと話す順を自動で出す", "説明文を自動で埋める", "社内共有メモを自動作成する", "プレゼン用に短く整える"],
    scopeOptions: ["営業資料", "社内資料", "企画資料", "研修資料", "報告資料"],
    outputOptions: ["スライド構成", "見出し案", "本文案", "要約", "チェックリスト"],
    sourceLabel: "資料テーマ",
    itemLabel: "資料項目や構成",
    defaultInputs: "資料テーマと対象者だけ。元資料の全文コピペは不要",
    defaultResult: "構成、見出し、本文案、話す順番",
  },
  "メニュー表チラシ制作ツール": {
    purposeTitle: "どんな販促物制作ツールを作りますか？",
    scopeTitle: "どの店舗・用途を対象にしますか？",
    purposeOptions: ["業種を選ぶだけでメニュー文を半自動作成する", "チラシ構成を自動で出す", "キャンペーン文を自動作成する", "POP文言を自動で出す", "SNS告知文まで一気に作る"],
    scopeOptions: ["飲食店", "美容サロン", "小売店", "イベント", "キャンペーン"],
    outputOptions: ["メニュー構成", "チラシ文面", "キャッチコピー", "POP文", "SNS告知文"],
    sourceLabel: "店舗業種・キャンペーンテーマ",
    itemLabel: "商品や販促内容",
    defaultInputs: "業種とキャンペーンテーマだけ（店名があれば尚可）",
    defaultResult: "メニュー文、チラシ構成、キャッチコピー、告知文",
  },
  "事務作業自動化ツール": {
    purposeTitle: "どんな事務作業ツールを作りますか？",
    scopeTitle: "どの作業を対象にしますか？",
    purposeOptions: ["用途を選ぶだけで定型文を自動作成する", "議事録テンプレを半自動で埋める", "案内文を自動作成する", "タスク一覧を自動で出す", "メール文を整える"],
    scopeOptions: ["会議", "メール", "書類", "タスク管理", "社内連絡"],
    outputOptions: ["議事録形式", "一覧表", "要約", "テンプレート", "チェックリスト"],
    sourceLabel: "作業テーマ",
    itemLabel: "事務作業やタスク",
    defaultInputs: "用途テーマだけ（例：会議の案内）。長文コピペは任意",
    defaultResult: "議事録、要約、タスク一覧、定型文",
  },
  "求人採用ツール": {
    purposeTitle: "どんな求人採用ツールを作りますか？",
    scopeTitle: "どの採用業務を対象にしますか？",
    purposeOptions: ["職種を入れるだけで求人票を半自動作成する", "スカウト文を自動で作る", "面接質問を自動で出す", "魅力訴求を自動で整える", "採用ペルソナを自動作成する"],
    scopeOptions: ["正社員", "アルバイト", "業務委託", "新卒", "中途"],
    outputOptions: ["求人票", "スカウト文", "質問リスト", "評価表", "候補者メモ"],
    sourceLabel: "職種・採用テーマ",
    itemLabel: "求人や候補者",
    defaultInputs: "職種と雇用形態だけ。長文の就業規則コピペは不要",
    defaultResult: "求人票、スカウト文、面接質問、評価軸",
  },
  "ブログ記事作成ツール": {
    purposeTitle: "どんなブログ記事作成ツールを作りますか？",
    scopeTitle: "どの記事タイプを対象にしますか？",
    purposeOptions: ["テーマを選ぶだけでSEO記事を半自動作成する", "見出し構成を自動で出す", "note向けに読みやすく整える", "比較記事を自動で作る", "リライト案を自動で出す"],
    scopeOptions: ["SEO記事", "note", "商品レビュー", "ハウツー", "コラム"],
    outputOptions: ["記事構成", "本文下書き", "見出し一覧", "要約", "改善案"],
    sourceLabel: "記事テーマ・キーワード",
    itemLabel: "記事や見出し",
    defaultInputs: "テーマかキーワードだけ。参考記事URLのコピペは不要",
    defaultResult: "SEO向けまとめ記事（約3000字）、タイトル、見出し、FAQ",
  },
  "教育学習ツール": {
    purposeTitle: "どんな教育学習ツールを作りますか？",
    scopeTitle: "どの学習対象を扱いますか？",
    purposeOptions: ["テーマを入れるだけで学習計画を半自動作成する", "復習まとめを自動で出す", "問題を自動作成する", "用語解説を自動で作る", "理解度チェックを自動で出す"],
    scopeOptions: ["学校学習", "資格学習", "語学", "社内研修", "個人学習"],
    outputOptions: ["学習計画", "教材形式", "問題集", "復習カード", "チェックリスト"],
    sourceLabel: "学習テーマ",
    itemLabel: "教材や問題",
    defaultInputs: "学習テーマとレベルだけ",
    defaultResult: "学習計画、問題、解説、復習メモ",
  },
  "店舗運営ツール": {
    purposeTitle: "どんな店舗運営ツールを作りますか？",
    scopeTitle: "どの運営業務を対象にしますか？",
    purposeOptions: ["用途を選ぶだけで口コミ返信を自動作成する", "販促案を半自動で出す", "季節キャンペーンを自動提案する", "接客トークを自動で作る", "改善点を自動整理する"],
    scopeOptions: ["口コミ対応", "販促", "スタッフ共有", "在庫・メニュー", "店舗改善"],
    outputOptions: ["返信文", "キャンペーン案", "共有メモ", "改善リスト", "SNS告知文"],
    sourceLabel: "店舗業種・運営テーマ",
    itemLabel: "店舗施策や返信内容",
    defaultInputs: "業種と用途テーマだけ（口コミ本文があれば尚可）",
    defaultResult: "返信文、販促案、改善点、共有メモ",
  },
  "自由作成": {
    purposeTitle: "どんなツールを作りますか？",
    scopeTitle: "どの用途を対象にしますか？",
    purposeOptions: ["テーマを入れるだけで半自動で結果を出す", "面倒な整理を自動化する", "候補を自動で点数化する", "チェックリストを自動作成する", "自分の条件で処理する"],
    scopeOptions: ["個人用途", "仕事用", "店舗用", "SNS用", "検証用"],
    outputOptions: ["要約", "一覧表", "レポート", "テンプレート", "通知形式"],
    sourceLabel: "テーマ",
    itemLabel: "出力結果",
    defaultInputs: "やりたいこと・テーマだけ。長文コピペは不要",
    defaultResult: "半自動で使える結果、理由、次の行動",
  },

};

const screenCopy = {
  login: ["ログイン", "作る画面へ戻る"],
  create: ["何を作りますか？", "次へ進む"],
  proposal: ["提案を選びます", "次へ進む"],
  nodes: ["作業の部品を組みます", "次へ進む"],
  blueprint: ["作成内容を確認します", "次へ進む"],
  export: ["完成：公開URLを発行", "公開URLを発行する"],
  usage: ["使い方ガイド", "作る画面へ進む"],
  implement: ["無料で実装する", "作る画面へ戻る"],
  plans: ["プラン一覧", "作る画面へ戻る"],
  apikey: ["APIキー設定", "作る画面へ戻る"],
  saved: ["保存済みツール", "作業の部品を見る"],
  agent: ["AIエージェントを作成します", "HTMLで書き出す（自走対応）"],
  terms: ["利用規約", "作る画面へ戻る"],
  privacy: ["プライバシーポリシー", "作る画面へ戻る"],
  tokushoho: ["特定商取引法に基づく表記", "作る画面へ戻る"],
  contact: ["お問い合わせ", "作る画面へ戻る"],
  settings: ["プランとAPI設定", "保存する"],
};

const screenCopyEn = {
  login: ["Login", "Back to Build"],
  create: ["What do you want to build?", "Next"],
  proposal: ["Choose a proposal", "Next"],
  nodes: ["Build the workflow parts", "Next"],
  blueprint: ["Review the tool content", "Next"],
  export: ["Done: Issue your URL", "Issue public URL"],
  usage: ["How-to Guide", "Go to Build"],
  implement: ["Build Free with External AI", "Back to Build"],
  plans: ["Plans", "Back to Build"],
  apikey: ["API Key Setup (BYOK)", "Back to Build"],
  saved: ["Saved Tools", "View Workflow"],
  agent: ["Create AI Agent", "Export HTML (self-running)"],
  terms: ["Terms of Use", "Back to Build"],
  privacy: ["Privacy Policy", "Back to Build"],
  tokushoho: ["Legal Notice (Japan)", "Back to Build"],
  contact: ["Contact", "Back to Build"],
  settings: ["Plan and API Settings", "Save"],
};

const uiText = {
  ja: {
    nav: { create: "作る", login: "ログイン", usage: "使い方", implement: "無料で実装", plans: "プラン", apikey: "APIキー設定", saved: "保存済み", agent: "AIエージェント作成", terms: "利用規約", privacy: "プライバシーポリシー", tokushoho: "特定商取引法に基づく表記", contact: "お問い合わせ", settings: "設定" },
    brand: "AIツール作成",
    launch: "プレビューする",
    exportTitle: "完成：公開URLを発行",
    saveCreated: "作成したツールを保存する",
    save: "保存する",
    preview: "先にプレビューする",
    test: "くわしく動作テストする",
    zip: "ZIPをダウンロード",
    publish: "公開URLを発行する",
  },
  en: {
    nav: { create: "Build", login: "Login", usage: "How to Use", implement: "Build Free", plans: "Plans", apikey: "API Key", saved: "Saved", agent: "AI Agent", terms: "Terms", privacy: "Privacy Policy", tokushoho: "Legal Notice (Japan)", contact: "Contact", settings: "Settings" },
    brand: "AI Tool Builder",
    launch: "Preview",
    exportTitle: "Done: Issue your URL",
    saveCreated: "Save created tool",
    save: "Save",
    preview: "Preview first",
    test: "Detailed action test",
    zip: "Download ZIP",
    publish: "Issue public URL",
  },
};

const textTranslations = {
  "NENE Studio": "NENE Studio",
  "内容を決める": "Decide Content",
  "提案を選ぶ": "Choose Proposal",
  "部品を組む": "Build Parts",
  "内容確認": "Review",
  "ツール作成": "Create Tool",
  "作りたいAIツールを段階的に作成します。": "Create an AI tool step by step.",
  "カテゴリは収益化しやすい順に並んでいます。まずは1つ選んでください。": "Categories are ordered by monetization potential. Choose one to start.",
  "選ぶ": "Choose",
  "答える": "Answer",
  "提案から選ぶ": "Choose Proposal",
  "作成する": "Create",
  "方向性ヒアリング": "Direction Questions",
  "作る内容が決まってきたら、方向性を3つだけ確認します。": "After choosing what to build, answer three direction questions.",
  "ヒアリングは、どんなツールにするかを決めるための質問です。「作る」流れの中で必要なときに答えます。": "These questions decide what kind of tool to create. Answer them as part of the build flow.",
  "質問 1 / 3": "Question 1 / 3",
  "質問 2 / 3": "Question 2 / 3",
  "質問 3 / 3": "Question 3 / 3",
  "自由入力": "Free Input",
  "自分の言葉で追加できます。": "Add details in your own words.",
  "ツール名": "Tool Name",
  "使う人": "Target User",
  "入れる情報": "Input Information",
  "出したい結果": "Desired Output",
  "カテゴリを選び直す": "Reset Category",
  "次へ進む": "Next",
  "おすすめ": "Recommended",
  "収益化しやすさ": "Monetization",
  "作りやすさ": "Ease of Build",
  "需要": "Demand",
  "別の案を見る": "Show More Ideas",
  "自分で調整する": "Adjust Manually",
  "追加したい作業の部品を書けます。": "Write an additional workflow part.",
  "部品名": "Part Name",
  "何をするか": "What It Does",
  "AIにきれいに並べてもらう": "Auto Arrange",
  "部品を追加する": "Add Part",
  "不要な部品を消す": "Remove Part",
  "作業の部品": "Workflow Parts",
  "この画面では、ツールが行う作業を小さな部品に分けて確認します。": "Review the tool workflow as smaller parts.",
  "ノードは「作業の部品」という意味です。入力、AIの分析、出力などを1つずつカードにして、どの順番で動くかを見えるようにします。": "A node means a workflow part. Inputs, AI analysis, and outputs are shown as cards in order.",
  "部品を直接編集": "Edit Parts Directly",
  "作業の部品名と内容を変更できます。": "Change each part name and description.",
  "おすすめ度 ★★★★★": "Recommendation ★★★★★",
  "この組み合わせでツールを作成する": "Create Tool with This Combination",
  "ツールを追加する": "Add Tool",
  "別の組み合わせを見る": "Show Another Combination",
  "内容確認を編集": "Edit Review Content",
  "最終確認の文章を直接変更できます。": "Edit the final review text directly.",
  "何をするツールか": "What the Tool Does",
  "誰が使うか": "Who Uses It",
  "何を入れるか": "What to Enter",
  "何が出るか": "What It Outputs",
  "使い方": "How to Use",
  "かんたん表示": "Simple View",
  "詳細表示": "Detailed View",
  "このツールは何をする？": "What does this tool do?",
  "何を入れればいい？": "What should I enter?",
  "何が出てくる？": "What comes out?",
  "どう使う？": "How do I use it?",
  "フォルダ形式": "Folder Format",
  "実行用HTML/JS/CSSまでまとめる": "Includes runnable HTML/JS/CSS",
  "HTML形式（1ファイル）": "HTML (Single File)",
  "開くだけでそのまま操作できる": "Open the file and use it right away",
  "開くだけでそのまま操作できる（スマホ向け）": "Open and use immediately (great on phones)",
  "スマホの方へ：迷ったら一番上の「HTML形式」を選んで「ツールを作成する」を押してください。": "On phones: choose the top HTML format, then press Create Tool.",
  "HTML/JS/CSS + .env / config.js": "HTML/JS/CSS + .env / config.js",
  "単体動作一式（APIキー反映）": "Standalone package (API key included)",
  "ZIP形式": "ZIP Format",
  "実行用ファイル一式をZIP用にまとめる": "Packages runnable files as ZIP",
  "APIキー入力形式": "API Key Format",
  "認証コードを入れるだけで使う": "Use by entering an API key",
  "Codex用ツール作成内容": "Tool Content for Codex",
  "コード作成AIに渡す内容": "Content for coding AI",
  "Claude Code用ツール作成内容": "Tool Content for Claude Code",
  "実装支援AIに渡す内容": "Content for implementation AI",
  "作成したツールを保存する": "Save created tool",
  "保存する": "Save",
  "作成したツールの使い方": "How to Use the Created Tool",
  "使い方ガイド": "How-to Guide",
  "迷ったら、この順番だけでOKです。": "If you're unsure, just follow this order.",
  "プログラミングは不要です。下の「今すぐ作る」を押して、画面の案内どおりに進めてください。": "No coding needed. Tap \"Start creating now\" below and follow the on-screen steps.",
  "初心者向けの最短ルート": "Shortest path for beginners",
  "設定でAPIキーを保存する（最初の1回だけ）": "Save an API key in Settings (first time only)",
  "作るで質問に答えて提案を選ぶ": "Answer questions in Build and pick a proposal",
  "HTML形式で「ツールを作成する」を押す": "Choose HTML format and press Create Tool",
  "ダウンロードしたファイルを開いて使う": "Open the downloaded file and use it",
  "今すぐ作る": "Start creating now",
  "先にAPIキーを設定する": "Set an API key first",
  "準備（最初の1回だけ）：APIキーを設定する": "Setup (first time only): Set your API key",
  "APIキーは、AIを動かすための「利用券」のような認証コードです。Google Geminiなら無料枠があります。": "An API key is an access code that lets the AI run, like a ticket. Google Gemini has a free tier.",
  "左メニュー「APIキー設定」で取得手順を見る": "See how to get one in \"API Key\" in the left menu",
  "取得したキーを「設定」画面に貼り付けて「保存する」": "Paste the key into Settings and press Save",
  "これで作成したツールにキーが自動で入ります": "Then your created tools get the key automatically",
  "APIキーの取得手順を見る": "See how to get an API key",
  "設定画面を開く": "Open Settings",
  "画面ごとの進め方（上から順に）": "Screen-by-screen steps (follow in order)",
  "作る：何を作りたいか答える": "Build: Answer what you want to make",
  "カテゴリを選び、用途や出力形式の質問に答えます。「次へ進む」を押すと提案画面へ進みます。": "Pick a category and answer the purpose/output questions. Press Next to open proposals.",
  "提案：気に入った案を選ぶ": "Proposals: Pick the one you like",
  "表示されたツール案から1つ選びます。ピンとこなければ「別の提案を見る」で差し替えられます。": "Choose one proposal. If none fit, refresh for other options.",
  "作業の部品：流れを確認する": "Parts: Review the workflow",
  "部品は「ツールが行う作業のかたまり」です。並べ替えや追加は任意。まずは流れを見て「この組み合わせでツールを作成する」へ進みます。": "Parts are chunks of work the tool will do. Reordering is optional—review the flow and continue.",
  "内容確認：文章を見て次へ": "Review: Check the text, then continue",
  "何を入れるか・何が出るかを確認します。直したいところだけ直せば十分です。「次へ進む」で作成画面へ。": "Check inputs and outputs. Edit only what you need, then press Next.",
  "作成：形式を選んで出力する": "Create: Choose a format and export",
  "迷ったら「HTML形式（1ファイル）」を選び、「ツールを作成する」を押します。ファイルが1つダウンロードされます。": "If unsure, choose HTML (Single File) and press Create Tool. One file downloads.",
  "この手順で作るを始める": "Start Build with these steps",
  "出力形式の選び方": "How to choose an export format",
  "HTML形式（1ファイル）★おすすめ": "HTML (Single File) ★ Recommended",
  "ダウンロードしたファイルをダブルクリックで開くだけ。初心者とスマホに一番向いています。": "Just double-click the downloaded file. Best for beginners and phones.",
  "ZIP形式": "ZIP Format",
  "ファイル一式をフォルダで管理したい人向け。解凍して中の `index.html` を開きます。": "For managing files as a folder. Unzip and open index.html.",
  "フォルダ形式": "Folder Format",
  "中身を自分で分けて編集したい人向け。画面の区切りごとにファイルを作る必要があります。": "For editing files yourself. Split the preview by section markers.",
  "Codex用 / Claude Code用": "For Codex / Claude Code",
  "コード作成AIに渡して、さらに作り込みたい人向けです。まずはHTML形式で十分です。": "For handing off to coding AI. HTML format is enough for most people.",
  "作ったあとの使い方": "After you create the tool",
  "ダウンロードした `.html` ファイルをダブルクリックで開く（ZIPなら解凍後の `index.html`）": "Double-click the .html file (or unzipped index.html for ZIP)",
  "ジャンルボタンを押すか、短いテーマを入れる（ニュースURLのコピペは不要）": "Tap a genre chip or enter a short topic (no news URL paste needed)",
  "「記事を作成する」を押して、SEO向けのまとめ記事を確認する": "Press Create article and review the SEO summary article",
  "何を入力すればいいか分からない": "Not sure what to enter?",
  "ジャンルボタンを1つ押すか、「ビットコインはいつ買えばよいのか」のように短いテーマを入れるだけでOKです。": "Just tap one genre chip, or type a short topic like \"when should I buy Bitcoin\".",
  "本文・元情報を貼り付ける（URLだけでは動きません。本文をコピーして貼ってください）": "Paste body text/source info (a URL alone is not enough)",
  "「生成する」を押して結果を確認する": "Press Generate and check the result",
  "APIキー入りのファイルは他人に渡さないでください。渡す前にキーを消します。": "Do not share files that contain your API key. Remove the key first.",
  "うまくいかないとき": "If something goes wrong",
  "「生成する」を押しても動かない": "Generate does nothing",
  "APIキー未設定のことが多いです。ツール画面のキー欄に入れるか、「設定」で保存してから作り直してください。": "Usually the API key is missing. Enter it in the tool or save it in Settings, then recreate.",
  "URLを貼ったのに結果が出ない": "I pasted a URL but got no result",
  "URLはメモ扱いです。記事などの本文をコピーして本文欄に貼り付けてください。": "URLs are memo only. Paste the article body into the text field.",
  "ZIPのどれを開けばいい？": "Which ZIP file should I open?",
  "解凍したフォルダの中の `index.html` です。ダブルクリックで開きます。": "Open index.html inside the unzipped folder.",
  "出力前に広告が出た": "An ad appeared before output",
  "無料プランでは出力前に5秒だけスポンサー紹介が表示されます。有料プラン（480円/月〜）で非表示にできます。": "Free plans show a 5-second sponsor intro. Paid plans (from ¥480/month) hide it.",
  "画面が古い・動きがおかしい": "The screen looks outdated or broken",
  "ページを再読み込みしてください。それでも直らないときはタブを閉じて開き直します。": "Reload the page. If that fails, close the tab and open it again.",
  "無料で設計図だけ欲しい": "I only want a free blueprint",
  "左メニュー「無料で実装」を開くと、外部AIに渡す設計図の作り方がわかります。": "Open \"Build Free\" in the menu for blueprint handoff to external AI.",
  "無料で実装の説明を見る": "See the free implementation guide",
  "作る画面へ進む": "Go to Build",
  "保存済みツールを組み合わせて、作れるAIエージェントを提案します。": "Combine saved tools into AI agent proposals.",
  "保存済みツールをつなぎ、ゴールに向かって自走するAIエージェントを作ります。": "Connect saved tools into a self-running AI agent that works toward a goal.",
  "AIエージェントは、複数のツールを順番につなげて、まとまった作業を自動で進める仕組みです。": "An AI agent chains multiple tools in order to complete a larger task automatically.",
  "AIエージェントは、計画→実行→自己チェック→改善を繰り返して、成果物を仕上げる仕組みです。": "An AI agent finishes work by looping through plan → run → self-check → improve.",
  "エージェント設定": "Agent settings",
  "ゴールを入れると、AIが自分で手順を立てて繰り返し改善します。ループ上限でAPIの使いすぎを防ぎます。": "Enter a goal and the AI plans, runs, and improves itself. The loop limit prevents overusing the API.",
  "ゴール（達成したいこと）": "Goal (what to achieve)",
  "例：今日のニュースから注目3銘柄のX投稿案を作る": "Example: Make 3 X post drafts for notable stocks from today's news",
  "材料・元情報（任意）": "Materials / source info (optional)",
  "ニュース本文やメモを貼り付けます。URLだけでは処理できません。": "Paste news text or notes. A URL alone cannot be processed.",
  "ループ上限（何周まで自己改善するか）": "Loop limit (how many self-improve rounds)",
  "3回（おすすめ）": "3 rounds (recommended)",
  "5回": "5 rounds",
  "10回": "10 rounds",
  "実行パネル": "Run panel",
  "設定画面のAPIキー（または有料プランの運営API）で実行します。1回の実行で複数回AIを呼びます。": "Runs with your Settings API key (or paid operator API). One run calls AI multiple times.",
  "エージェントを実行": "Run agent",
  "停止": "Stop",
  "結果をコピー": "Copy result",
  "進行ログ": "Progress log",
  "まだ実行していません。ゴールを入れて「エージェントを実行」を押してください。": "Not started yet. Enter a goal and press Run agent.",
  "最終成果物": "Final deliverable",
  "ここに完成した成果物が表示されます。": "The finished deliverable appears here.",
  "AIエージェント作成内容": "AI agent content",
  "HTMLで書き出す（自走対応）": "Export HTML (self-running)",
  "保存する": "Save",
  "3ステップで、あなた専用のAIツールが完成します。": "Your own AI tool is ready in 3 steps.",
  "プログラミングの知識は不要です。迷ったら、このページの上から順番に進めてください。": "No programming knowledge needed. If unsure, just follow this page from top to bottom.",
  "設定画面でキーを保存する": "Save the key in Settings",
  "質問に答える": "Answer questions",
  "提案を選ぶ": "Pick a proposal",
  "内容を確認": "Review the plan",
  "STEP 1. 作る内容を決める": "STEP 1. Decide what to build",
  "左メニュー「作る」で質問に答えると、ツール案が表示されます。気に入った案を選び、作業の流れと内容を確認して進みます。": "Answer the questions in \"Build\" and tool proposals appear. Pick one, review the workflow, and continue.",
  "HTML形式": "HTML",
  "その他": "Others",
  "STEP 2. 形式を選んで作成する": "STEP 2. Choose a format and create",
  "迷ったら「HTML形式（1ファイル）」を選んでください。「ツールを作成する」を押すと、ファイルが1つダウンロードされます。": "If unsure, choose \"HTML (Single File)\". Press \"Create Tool\" and one file is downloaded.",
  "ダブルクリックで開く": "Open with a double-click",
  "STEP 3. 開いて使う": "STEP 3. Open and use",
  "ダウンロードしたファイルをダブルクリックで開き、ジャンルを押して「記事を作成する」だけです。ニュースURLのコピペは不要です。": "Double-click the downloaded file, tap a genre, and press Create article. No news URL paste needed.",
  "出力形式の選び方（迷ったら一番上）": "Choosing an output format (top one if unsure)",
  "HTML形式（1ファイル）★おすすめ": "HTML (Single File) - Recommended",
  "ファイルを開くだけで使えます。初心者とスマホに一番向いています。": "Just open the file and use it. Best for beginners and smartphones.",
  "ファイル一式をフォルダで管理したい人向け。解凍して中の `index.html` を開きます。": "For managing all files in a folder. Unzip and open `index.html` inside.",
  "中身を自分で編集したい人向け。表示された内容を区切りごとにファイルへ分けて保存します。": "For editing the contents yourself. Split the displayed output into files by section.",
  "Codex用 / Claude Code用": "For Codex / Claude Code",
  "コード作成AIに渡して、さらに高機能に作り込みたい人向けです。": "For handing off to a coding AI to build something more advanced.",
  "よくあるつまずきと解決方法": "Common problems and fixes",
  "「生成する」を押しても動かない": "Nothing happens when I press Generate",
  "APIキーが未設定の可能性が高いです。ツール画面のAPIキー欄に入力するか、「設定」で保存してから作り直してください。": "Most likely the API key is missing. Enter it in the tool screen, or save it in Settings and re-create the tool.",
  "URLを貼ったのに結果が出ない": "I pasted a URL but got no result",
  "このツールはURLコピペ不要です。ジャンルボタンか短いテーマだけで記事を作ります。": "This tool does not need URL paste. Just tap a genre chip or enter a short topic.",
  "ZIPのどのファイルを開けばいい？": "Which file in the ZIP should I open?",
  "解凍したフォルダの中の `index.html` です。ダブルクリックで開きます。": "Open `index.html` inside the unzipped folder with a double-click.",
  "出力前に広告が表示された": "An ad appeared before output",
  "無料プランでは出力前に5秒だけスポンサー紹介が表示されます。有料プラン（480円/月〜）で非表示にできます。": "The free plan shows a 5-second sponsor message before output. Paid plans (from JPY 480/month) remove it.",
  "作ったツールを人に渡したい": "I want to share my tool with someone",
  "APIキー入りのファイル（HTML形式・`.env`・`config.js`）はそのまま渡さないでください。キーを消してから渡します。": "Do not share files containing your API key (HTML format, `.env`, `config.js`) as-is. Remove the key first.",
  "ZIP形式なら、解凍して `index.html` を開くだけで使えます。": "With ZIP format, unzip it and open `index.html`.",
  "フォルダ形式でコピーした場合だけ、区切りごとにファイルへ分けてください。": "Only folder-format copies need to be split into files manually.",
  "1. ZIP形式で作成する": "1. Create as ZIP",
  "`ZIP形式` を選んで `ツールを作成する` を押すと、実行用ファイル一式が入ったZIPが出ます。": "Choose `ZIP Format` and press `Create Tool` to download all runnable files.",
  "2. ZIPを解凍する": "2. Unzip",
  "解凍すると `index.html`、`style.css`、`script.js` などが最初から分かれた状態で入っています。": "After unzipping, files like `index.html`, `style.css`, and `script.js` are already separated.",
  "3. 起動する": "3. Launch",
  "解凍したフォルダの `index.html` をブラウザで開きます。この画面の `作成したツールを起動する` でも確認できます。": "Open `index.html` in the extracted folder. You can also preview it with the Launch Button.",
  "4. ジャンルを選んで記事を作る": "4. Pick a genre and create the article",
  "APIキーが入っていれば、ジャンルボタンを押して「記事を作成する」だけでOKです。ニュースURLのコピペは不要です。": "If the API key is set, tap a genre and press Create article. No news URL paste needed.",
  "フォルダ形式をコピーした場合だけ作るファイル": "Files to Create Only for Folder Copy",
  "画面本体です。出力内の `--- index.html ---` から次の区切りまでを入れます。": "The main screen file. Put the content under `--- index.html ---` here.",
  "見た目のファイルです。`index.html` と同じフォルダに置きます。": "The style file. Put it in the same folder as `index.html`.",
  "生成ボタンやAPI通信の動きです。`index.html` と同じフォルダに置きます。": "The behavior file for generation and API calls. Put it in the same folder.",
  "補助ファイル": "Support Files",
  "`README.md`、`setup.md`、`prompts/main_prompt.md` などは説明・保管用です。実行に最低限必要なのは上の3つです。": "`README.md`, `setup.md`, and `prompts/main_prompt.md` are for documentation/storage. The three files above are the minimum needed to run.",
  "APIキー設定": "API Key Settings",
  "サーバー側APIキー設定": "Server-Side API Key Settings",
  "OpenAI APIキー、Stripe秘密キー、Webhook署名キーはブラウザに入力せず、サーバーの `.env` で管理します。": "OpenAI API keys, Stripe secret keys, and webhook signing secrets are managed in the server `.env`, not entered in the browser.",
  "ブラウザからはログイン情報だけを送り、AI生成や決済確認はサーバーAPIが実行します。": "The browser only sends login data; AI generation and payment verification run through the server API.",
  "OpenAI APIキー": "OpenAI API Key",
  "ニュースAPIキー": "News API Key",
  "APIキーは外部サービスに接続するための認証コードです。": "API keys are authentication codes for external services.",
  "広告表示プラン": "Ad Display Plan",
  "無料プラン：出力前にスポンサーをご紹介": "Free plan: partner picks before output",
  "出力前に、おすすめサービスをご紹介しています。": "Before output, here are recommended services from our partners.",
  "公開URLを出す前に、おすすめサービスをご紹介しています。": "Before we issue your public URL, here are recommended services from our partners.",
  "有料プラン（480円/月〜）なら、広告なしですぐ出力できます。": "Paid plans (from ¥480/month) let you output instantly without ads.",
  "気になるサービスがあれば、ぜひチェックしてみてください。": "Feel free to check out anything that catches your eye.",
  "スポンサー": "Sponsor",
  "スポンサー（ココナラ）": "Sponsored (coconala)",
  "スポンサー（3D Phantom）": "Sponsored (3D Phantom)",
  "スポンサー（CLOUD PHONE）": "Sponsored (CLOUD PHONE)",
  "スポンサー（ホームページDX）": "Sponsored (Homepage DX)",
  "続ける": "continue",
  "480円プラン：広告カットのみ": "¥480/month plan: ad-free output only",
  "980円プラン：広告なし＋運営API月50回": "¥980/month plan: ad-free + 50 operator AI runs/month",
  "1250円プラン：広告なし＋運営API月100回": "¥1250/month plan: ad-free + 100 operator AI runs/month",
  "広告なしプランはStripe決済完了後に有効になります。": "The ad-free plan becomes active after Stripe payment is completed.",
  "支払い方法": "Payment Method",
  "支払いはStripeのみです。480円／980円／1250円の月額サブスクを管理します。": "Payments are Stripe only. Manages ¥480 / ¥980 / ¥1250 monthly subscriptions.",
  "カード決済と、Stripeで有効化した携帯払い（Apple Pay / Google Pay）に対応します。": "Supports card payments and mobile payments enabled in Stripe, such as Apple Pay / Google Pay.",
  "Stripeで支払う": "Pay with Stripe",
  "未決済です。Stripeで支払い後、広告なしプランが有効になります。": "Unpaid. The ad-free plan becomes active after Stripe payment.",
  "Stripe決済済みです。広告なしプランが有効です。": "Stripe payment completed. The ad-free plan is active.",
  "決済完了はStripe Webhookでサーバーが確認します。URLだけでは広告なしになりません。": "The server verifies payment through Stripe Webhook. The URL alone cannot unlock ad-free access.",
  "ログイン": "Login",
  "新規登録": "Sign Up",
  "ログアウト": "Log Out",
  "メールアドレス": "Email Address",
  "パスワード": "Password",
  "メールアドレスでユーザーを判定します。": "Identify users by email address.",
  "保存済みツール、課金状態、広告なしフラグはサーバーのデータベースに保存します。": "Saved tools, billing status, and the ad-free flag are stored in the server database.",
  "ログイン / 新規登録": "Login / Sign Up",
  "ログインしていません。": "Not logged in.",
  "安全管理": "Security",
  "サーバーで保護する情報": "Information Protected on the Server",
  "OpenAI APIキー、Stripeの秘密キー、Webhook署名キーはブラウザに置かず、サーバーの環境変数で管理します。": "OpenAI API keys, Stripe secret keys, and webhook signing secrets are kept in server environment variables, not the browser.",
  "広告なし判定はStripe Webhookで更新された課金状態だけを信用します。": "Ad-free access only trusts billing status updated by Stripe Webhook.",
  "利用規約": "Terms of Use",
  "利用規約とストア審査用説明": "Terms of Use and Store Review Notes",
  "PWAとして配布し、必要に応じてスマホアプリ審査用の説明文に転用できます。": "Distribute as a PWA and reuse these notes for mobile app store review when needed.",
  "禁止事項": "Prohibited Actions",
  "課金と解約": "Billing and Cancellation",
  "ストア審査用説明": "Store Review Notes",
  "お問い合わせ": "Contact",
  "サービス、課金、広告、AI出力に関する問い合わせ先です。公開前に正式な連絡先へ差し替えてください。": "Contact information for service, billing, ads, and AI output. Replace this with official details before launch.",
  "お問い合わせ先": "Contact Information",
  "運営者名": "Operator Name",
  "メールアドレス": "Email Address",
  "受付時間": "Reception Hours",
  "課金に関する問い合わせでは、Stripeの決済メールに記載された情報を確認します。クレジットカード番号やパスワードは送らないでください。": "For billing inquiries, check the details in the Stripe payment email. Do not send credit card numbers or passwords.",
  "AIアシスト": "AI Assist",
  "今やること": "Current Step",
  "おすすめ": "Recommendation",
  "理由": "Reason",
  "操作結果": "Status",
  "広告": "Ad",
  "無料プランのため、出力前に広告を表示しています。": "Before output, here are recommended services from our partners.",
  "月額480円以上の有料プランにすると、この広告は表示されません。": "Paid plans (from ¥480/month) let you output instantly without ads.",
  "株投資ツール": "Stock Investment Tool",
  "FXツール": "FX Tool",
  "ニュース分析ツール": "News Analysis Tool",
  "仮想通貨ツール": "Crypto Tool",
  "SNS運用ツール": "SNS Management Tool",
  "YouTube動画制作ツール": "YouTube Production Tool",
  "営業集客ツール": "Sales and Lead Tool",
  "資料作成ツール": "Document Creation Tool",
  "メニュー表チラシ制作ツール": "Menu and Flyer Tool",
  "事務作業自動化ツール": "Office Automation Tool",
  "求人採用ツール": "Recruiting Tool",
  "ブログ記事作成ツール": "Blog Writing Tool",
  "教育学習ツール": "Education Tool",
  "店舗運営ツール": "Store Operations Tool",
  "自由作成": "Custom Tool",
  "株ニュース、銘柄整理、決算要約など": "Stock news, ticker organization, earnings summaries, and more",
  "為替ニュース、相場メモ、シナリオ整理など": "FX news, market notes, scenario organization, and more",
  "最新ニュースの要約、業界分析など": "Latest news summaries, industry analysis, and more",
  "仮想通貨ニュース、価格変動メモなど": "Crypto news, price movement notes, and more",
  "X投稿、スレッド、投稿案作成など": "X posts, threads, post ideas, and more",
  "台本、構成、サムネイル文言など": "Scripts, structure, thumbnail copy, and more",
  "営業メール、問い合わせ返信など": "Sales emails, inquiry replies, and more",
  "提案資料、企画書、説明資料など": "Proposals, plans, explanation materials, and more",
  "店舗向け販促物の構成作成など": "Promotional materials for stores and more",
  "議事録、書類整理、文章作成など": "Meeting minutes, document organization, writing, and more",
  "求人票、スカウト文、面接質問など": "Job posts, scout messages, interview questions, and more",
  "SEO記事、note記事、構成案など": "SEO articles, note articles, outlines, and more",
  "学習計画、教材、問題作成など": "Study plans, teaching materials, quizzes, and more",
  "口コミ返信、キャンペーン案など": "Review replies, campaign ideas, and more",
  "ユーザーが自由に内容を決める": "Let the user decide freely",
  "どんな株投資ツールを作りますか？": "What kind of stock investment tool do you want to build?",
  "どんなFXツールを作りますか？": "What kind of FX tool do you want to build?",
  "どんなニュース分析ツールを作りますか？": "What kind of news analysis tool do you want to build?",
  "どんな仮想通貨ツールを作りますか？": "What kind of crypto tool do you want to build?",
  "どんなSNS運用ツールを作りますか？": "What kind of SNS management tool do you want to build?",
  "どんなYouTube動画制作ツールを作りますか？": "What kind of YouTube production tool do you want to build?",
  "どんな営業集客ツールを作りますか？": "What kind of sales and lead tool do you want to build?",
  "どんな資料作成ツールを作りますか？": "What kind of document creation tool do you want to build?",
  "どんな販促物制作ツールを作りますか？": "What kind of promotional material tool do you want to build?",
  "どんな事務作業ツールを作りますか？": "What kind of office work tool do you want to build?",
  "どんな求人採用ツールを作りますか？": "What kind of recruiting tool do you want to build?",
  "どんなブログ記事作成ツールを作りますか？": "What kind of blog writing tool do you want to build?",
  "どんな教育学習ツールを作りますか？": "What kind of education tool do you want to build?",
  "どんな店舗運営ツールを作りますか？": "What kind of store operations tool do you want to build?",
  "どんなツールを作りますか？": "What kind of tool do you want to build?",
  "どの市場を対象にしますか？": "Which market should it target?",
  "どの通貨ペアを対象にしますか？": "Which currency pair should it target?",
  "どの分野を対象にしますか？": "Which field should it target?",
  "どの銘柄・領域を対象にしますか？": "Which asset or area should it target?",
  "どのSNSを対象にしますか？": "Which SNS should it target?",
  "どの動画タイプを対象にしますか？": "Which video type should it target?",
  "どの相手を対象にしますか？": "Who should it target?",
  "どの資料を対象にしますか？": "Which document type should it target?",
  "どの店舗・用途を対象にしますか？": "Which store or use case should it target?",
  "どの作業を対象にしますか？": "Which task should it target?",
  "どの採用業務を対象にしますか？": "Which recruiting task should it target?",
  "どの記事タイプを対象にしますか？": "Which article type should it target?",
  "どの学習対象を扱いますか？": "Which learning area should it handle?",
  "どの運営業務を対象にしますか？": "Which operation task should it target?",
  "どの用途を対象にしますか？": "Which use case should it target?",
  "どんな形で出力しますか？": "What output format do you want?",
  "ニュースから注目銘柄を探す": "Find notable stocks from news",
  "決算情報を要約する": "Summarize earnings information",
  "株価チャートを分析する": "Analyze stock charts",
  "急騰しそうなテーマを探す": "Find themes likely to rise",
  "自分だけの条件で銘柄を点数化する": "Score stocks with custom criteria",
  "為替ニュースを要約する": "Summarize FX news",
  "通貨ペアのシナリオを整理する": "Organize currency pair scenarios",
  "経済指標の影響を確認する": "Check economic indicator impact",
  "売買メモを作る": "Create trade notes",
  "日次レポートを作る": "Create a daily report",
  "最新ニュースを要約する": "Summarize latest news",
  "業界の変化を整理する": "Organize industry changes",
  "重要トピックを抽出する": "Extract important topics",
  "ニュースレター案を作る": "Create newsletter ideas",
  "調査メモを作る": "Create research notes",
  "X投稿案を作る": "Create X post ideas",
  "スレッド構成を作る": "Create thread structure",
  "投稿カレンダーを作る": "Create a posting calendar",
  "反応が取れる見出しを作る": "Create engaging headlines",
  "プロフィール文を改善する": "Improve profile text",
  "動画企画を作る": "Create video ideas",
  "台本を作る": "Create scripts",
  "タイトル案を作る": "Create title ideas",
  "サムネイル文言を作る": "Create thumbnail copy",
  "構成を改善する": "Improve structure",
  "営業メールを作る": "Create sales emails",
  "問い合わせ返信を作る": "Create inquiry replies",
  "見込み客を整理する": "Organize leads",
  "提案文を作る": "Create proposal text",
  "商談メモをまとめる": "Summarize meeting notes",
  "ランキング形式": "Ranking format",
  "点数評価": "Score evaluation",
  "要約レポート": "Summary report",
  "グラフ付き": "With charts",
  "通知形式": "Notification format",
  "投稿案": "Post ideas",
  "スレッド形式": "Thread format",
  "カレンダー形式": "Calendar format",
  "改善リスト": "Improvement list",
  "テンプレート": "Template",
  "日本株": "Japanese stocks",
  "米国株": "US stocks",
  "両方": "Both",
  "ビジネス": "Business",
  "テクノロジー": "Technology",
  "金融": "Finance",
  "国内ニュース": "Domestic news",
  "海外ニュース": "International news",
  "ニュース・銘柄情報": "news and stock information",
  "ニュース記事": "news article text",
  "銘柄やテーマ": "stocks and themes",
  "ニュースやトピック": "news and topics",
  "投稿テーマ・過去投稿": "post themes and past posts",
  "投稿案や企画": "post ideas and plans",
  "開始": "Start",
  "作業を始める": "Start the workflow",
  "出力": "Output",
  "ツールとして保存できる形にします": "Prepare it as a usable tool",
  "最終出力にする部品": "Final output part",
  "AIが読み取る部品": "AI reading part",
  "重要な言葉を探す部品": "Keyword extraction part",
  "候補を整理する部品": "Candidate organization part",
  "レポートにする部品": "Report creation part",
  "プライバシーポリシー": "Privacy Policy",
  "第1条　取得する情報": "Article 1. Information Collected",
  "第2条　情報の利用目的": "Article 2. Purpose of Use",
  "第3条　APIキーの取り扱い": "Article 3. Handling of API Keys",
  "第4条　AI入力データの取り扱い": "Article 4. Handling of AI Input Data",
  "第5条　第三者提供": "Article 5. Third-Party Provision",
  "第6条　外部サービスの利用": "Article 6. External Services",
  "第7条　Cookieの利用": "Article 7. Cookies",
  "第8条　安全管理措置": "Article 8. Security Measures",
  "第9条　情報の保存期間": "Article 9. Retention Period",
  "第10条　利用者の権利": "Article 10. User Rights",
  "第11条　未成年者の利用": "Article 11. Use by Minors",
  "第12条　投資・金融系ツールに関する注意": "Article 12. Investment and Financial Tools",
  "第13条　免責事項": "Article 13. Disclaimer",
  "第14条　プライバシーポリシーの変更": "Article 14. Changes to This Policy",
  "第15条　問い合わせ窓口": "Article 15. Contact",
  "AIツールを作成する": "Create AI Tool",
  "おすすめ用途": "Recommended Use",
  "用途": "Use",
  "保存済みツール": "Saved Tools",
  "作業の部品を見る": "View Workflow",
  "保存済み": "Saved",
  "ニュース取得ツール": "News Fetch Tool",
  "株価分析ツール": "Stock Price Analysis Tool",
  "X投稿作成ツール": "X Post Creation Tool",
  "画像生成指示ツール": "Image Prompt Tool",
  "保存済みツールを組み合わせて、作れるAIエージェントを提案します。": "Combine saved tools to suggest AI agents you can create.",
  "AIエージェントは、複数のツールを順番につなげて、まとまった作業を自動で進める仕組みです。": "An AI agent connects multiple tools in order and automates a complete workflow.",
  "AIエージェント作成内容": "AI Agent Output",
  "保存済みツールを追加すると、作成できるAIエージェント案が表示されます。": "Add saved tools to see AI agent ideas you can create.",
  "保存済みツールが必要": "Saved tools required",
  "まずツールを保存してください": "Save a tool first",
  "ツール作成画面で「ツールを作成する」を押し、保存にチェックして保存すると、ここにAIエージェント案が出ます。": "On the Create Tool screen, press Create Tool, check Save, and save it to show AI agent ideas here.",
  "AIエージェントを作成する": "Create AI Agent",
  "AIエージェントを作るには、先にツールを保存してください。": "Save a tool before creating an AI agent.",
  "AIエージェント作成内容を表示・コピー・ダウンロードしました。保存する場合は「保存する」を押してください。": "AI agent output was displayed, copied, and downloaded. Press Save to keep it.",
  "先に「AIエージェントを作成する」を押してください。": "Press Create AI Agent first.",
  "同じ名前のAIエージェントはすでに保存済みです。": "An AI agent with the same name is already saved.",
  "AIエージェントを保存済みに追加しました。": "Added the AI agent to Saved.",
  "提案": "Idea",
  "使うツール": "Tools Used",
  "毎日の自動レポートAIエージェント": "Daily Auto Report AI Agent",
  "保存済みツールを順番に実行し、情報収集からレポート作成までをまとめます。": "Runs saved tools in order and combines information gathering through report creation.",
  "日次レポート、要点、次に見るべき項目": "daily report, key points, and next items to review",
  "SNS投稿準備AIエージェント": "SNS Post Preparation AI Agent",
  "調査した内容を、投稿文・画像指示・確認メモまで展開します。": "Turns research into post copy, image prompts, and review notes.",
  "X投稿案、画像生成指示、投稿前チェック": "X post ideas, image prompts, and pre-post checks",
  "確認付き作業代行AIエージェント": "Review-Based Workflow AI Agent",
  "各ツールの結果を確認しながら進め、最後にまとめて出力します。": "Reviews each tool result as it proceeds, then outputs the final summary.",
  "確認リスト、作業ログ、最終出力": "checklist, work log, and final output",
  "必要な入力を確認する": "Check the required inputs",
  "保存済みツールを順番に実行する": "Run saved tools in order",
  "各ツールの結果をまとめる": "Combine each tool result",
  "として出力する": "as the output",
  "このAIエージェント案は保存済みツールを参考にした作成案です。": "This AI agent draft is based on your saved tools.",
  "作りたいツールを1つ選んでください。": "Choose one tool you want to create.",
  "まだ操作はありません。": "No actions yet.",
  "このツールは投資判断を補助するものです。売買の最終判断は利用者本人が行います。": "This tool supports investment decisions. The user makes the final buy/sell decision.",
  "あと": "Wait",
  "秒": "sec",
  "出力へ進む": "Continue to output",
  "コピー内容": "Copied Content",
  "各ファイル": "Each File",
  "APIキー": "API Key",
  "本文貼り付け": "Paste Body Text",
  "生成する": "Generate",
  "NENE Studio の個人情報、APIキー、AI入力データの取り扱いについて説明します。": "Explains how NENE Studio handles personal information, API keys, and AI input data.",
  "どの対象を扱いますか？": "Which target should it handle?",
  "この案でツールを作成する": "Create tool with this idea",
  "ニュース連動型注目株発見ツール": "News-Based Stock Discovery Tool",
  "ニュース記事を読み取り、関連しそうな業界や銘柄を整理するツールです。": "Reads news articles and organizes related industries and stocks.",
  "決算要約ツール": "Earnings Summary Tool",
  "決算資料やニュースを短くまとめ、良い点と注意点を整理します。": "Summarizes earnings materials and news, then organizes positives and caution points.",
  "株価チャート点数化ツール": "Stock Chart Scoring Tool",
  "条件に合わせてチャートを確認し、見やすい点数に変換します。": "Checks charts against conditions and converts them into readable scores.",
  "必要なデータ": "Required Data",
  "ニュース記事、銘柄リスト": "news articles, stock list",
  "決算資料、企業名": "earnings materials, company name",
  "株価データ、条件設定": "stock price data, condition settings",
  "ニュースを集める部品": "News collection part",
  "ニュース記事を取り込みます": "Imports news articles",
  "記事の中からテーマやキーワードを見つけます": "Finds themes and keywords in articles",
  "会社名を整理する部品": "Company organization part",
  "関係しそうな会社を一覧にします": "Lists potentially related companies",
  "ニュースの意味や注目点を整理します": "Organizes the meaning and key points of the news",
  "点数を付ける部品": "Scoring part",
  "条件に合わせて見やすい評価にします": "Creates readable evaluations based on conditions",
  "結果を読める文章にまとめます": "Summarizes the result into readable text",
  "レポートとして保存する": "Save as a report",
  "部品を組み合わせた例：投資ニュース発信ツール": "Example Combination: Investment News Posting Tool",
  "上の作業部品をつなげると、ニュース取得から投稿案作成までを一連の流れとして確認できます。": "Connect the workflow parts above to review the flow from news collection to post creation.",
  "ニュースを取得": "Fetch news",
  "注目テーマを抽出": "Extract notable themes",
  "関連銘柄を整理": "Organize related stocks",
  "X投稿を作成": "Create X post",
  "画像生成指示を作成": "Create image prompt",
  "投稿案として出力": "Output as post ideas",
  "ニュースから注目テーマと関連銘柄を整理します。": "Organizes notable themes and related stocks from news.",
  "ニュース本文、見たい市場、出力形式、URLメモを入れます。": "Enter news text, target market, output format, and URL memo.",
  "注目テーマ、関連銘柄、理由、投稿用メモが出ます。": "Outputs notable themes, related stocks, reasons, and post notes.",
  "APIキーを設定し、ニュースを指定して実行します。": "Set an API key, specify news, and run it.",
  "入力内容をツール作成内容に反映しました。": "Reflected the input in the tool content.",
  "作業の部品を編集しました。": "Edited the workflow part.",
  "別の組み合わせ例に更新しました。": "Updated to another combination example.",
  "開始と出力だけは残す必要があります。": "Start and Output must remain.",
  "最後の作業部品を1つ削除しました。": "Removed the last workflow part.",
  "APIキー入力形式は、OpenAI APIキーや外部データAPIキーを入れないと実行できません。": "API Key Format requires an OpenAI API key or external data API key to run.",
  "Codex用ツール作成内容は、Codex側で外部APIキーや実行環境を設定しないと実行できない場合があります。": "Tool Content for Codex may not run unless Codex has API keys and a runtime environment configured.",
  "Claude Code用ツール作成内容は、Claude Code側でAPIキーや必要な実行環境を設定しないと実行できない場合があります。": "Tool Content for Claude Code may not run unless Claude Code has API keys and the required runtime configured.",
  "ZIPファイルを作成してダウンロードしました。保存する場合はチェックして保存してください。": "Created and downloaded the ZIP file. Check Save if you want to keep it.",
  "指定形式の作成内容を表示・コピー・ダウンロードしました。保存する場合はチェックして保存してください。": "Displayed, copied, and downloaded the selected output. Check Save if you want to keep it.",
  "先に「ツールを作成する」を押してください。": "Press Create Tool first.",
  "保存する場合は「作成したツールを保存する」にチェックしてください。": "Check Save created tool before saving.",
  "作成したツールを保存済みに追加しました。": "Added the created tool to Saved.",
  "同じ名前のツールはすでに保存済みです。": "A tool with the same name is already saved.",
  "作成したツールを新しいタブで起動しました。": "Launched the created tool in a new tab.",
  "初期サンプルです。ツールを作成して保存すると、ここから読み込めます。": "This is an initial sample. Create and save a tool to load it here.",
  "初期サンプルです。ツールを作成すると自分の内容を保存できます。": "This is an initial sample. Create a tool to save your own content.",
  "カテゴリや入力欄を変更すると、ツール作成内容に反映されます。": "Changing categories or inputs updates the tool content.",
  "表示言語を日本語に変更しました。": "Language changed to Japanese.",
  "設定を保存しました。": "Settings saved.",
  "作業の部品を見やすい順番に並べました。": "Arranged the workflow parts in an easier-to-read order.",
  "月額480円プランを選択しました。Stripe決済完了後は広告なしになります。": "Selected the ¥480/month plan. Ads are removed after Stripe payment.",
  "980円プランを選択しました。下のStripeボタンから支払ってください。": "Selected the ¥980/month plan. Pay using the Stripe button below.",
  "1250円プランを選択しました。下のStripeボタンから支払ってください。": "Selected the ¥1250/month plan. Pay using the Stripe button below.",
  "Stripeの決済画面を開きました。カードまたは携帯払いで支払ってください。": "Opened Stripe Checkout. Pay by card or mobile payment.",
  "Stripe決済完了を確認しました。広告なしプランを有効にしました。": "Stripe payment completion detected. The ad-free plan is now active.",
  "無料プランに戻しました。出力前に広告が表示されます。": "Returned to the free plan. Ads will appear before output.",
  "無料プランを選択しました。出力前に広告が表示されます。": "Selected the free plan. Ads will appear before output.",
  "480円プラン（広告カット）": "¥480/month (ad-free)",
  "980円プラン（AI50回）": "¥980/month (50 AI runs)",
  "1250円プラン（AI100回）": "¥1250/month (100 AI runs)",
  "無料プラン": "Free plan",
  "を保存しました。APIキーは必要になったら入力してください。": " saved. Enter API keys when needed.",
  "を保存しました。この端末のブラウザに保存されます。": " saved. Stored in this browser on your device.",
  "と": " and ",
  "を読み込みました。": " loaded.",
  "を追加しました。": " added.",
  "ツール": "Tool",
  "個のツール": " tools",
  "AIエージェント": "AI Agent",
  "ニュースレター、SNS投稿、調査メモ": "newsletter, SNS posts, research notes",
  "相場メモ、配信ネタ、日次レポート": "market notes, stream topics, daily reports",
  "相場メモ、速報投稿、レポート": "market notes, breaking posts, reports",
  "X運用、note導線、投稿量産": "X management, note funnels, bulk posts",
  "動画企画、台本、タイトル案": "video ideas, scripts, title ideas",
  "営業文、返信文、見込み客整理": "sales copy, replies, lead organization",
  "提案書、社内資料、説明文": "proposals, internal documents, explanations",
  "メニュー、チラシ、キャンペーン": "menus, flyers, campaigns",
  "議事録、要約、定型文": "meeting minutes, summaries, templates",
  "求人票、面接準備、候補者対応": "job posts, interview prep, candidate handling",
  "記事構成、SEO、下書き": "article outlines, SEO, drafts",
  "教材、問題、復習計画": "teaching materials, quizzes, review plans",
  "口コミ返信、販促、運営メモ": "review replies, promotions, operation notes",
  "独自ツール、検証用、個人用途": "custom tools, testing, personal use",
  "X投稿、note記事、投資メモ": "X posts, note articles, investment notes",
  "無料プラン：設計図を作り、Codex 等で実装する": "Free Plan: Create a Blueprint and Build with Codex",
  "※ 金額を確認しながらご使用ください。": "※ Please confirm amounts while using the service.",
  "APIキーは不要です。NENE Studio で設計図を出力し、Cursor（Codex）・Claude Code・ChatGPT などの外部AIに渡して実装します。": "No API key is required. Export a blueprint from NENE Studio and implement it with external AI such as Cursor (Codex), Claude Code, or ChatGPT.",
};

const implementGuideEn = `
            <div class="guide-callout">
              <strong>What the free plan includes</strong>
              <ul>
                <li>Category → proposal → parts → blueprint creation (<strong>no API required</strong>)</li>
                <li>Download <strong>Tool Content for Codex</strong> or <strong>Tool Content for Claude Code</strong></li>
                <li>Implementation happens in <strong>your external AI tool</strong> (no NENE Studio API cost)</li>
                <li>Ads appear before output on the free plan (removed on paid plans from ¥480/month)</li>
              </ul>
            </div>

            <h2>Step A: Create a blueprint in NENE Studio (about 5-10 minutes)</h2>
            <ol class="guide-step-list">
              <li>Click <strong>Build</strong> in the left menu.</li>
              <li>Choose one <strong>category</strong>, then click <strong>Next</strong>.</li>
              <li>Answer <strong>questions 1-3</strong> or keep the defaults. Click <strong>Next</strong> on each screen.</li>
              <li>On <strong>Choose a proposal</strong>, pick one idea and click <strong>Next</strong>.</li>
              <li>Review <strong>Workflow parts</strong>, then click <strong>Next</strong>.</li>
              <li>On <strong>Review the tool content</strong>, open <strong>Detailed View</strong>, then click <strong>Next</strong>.</li>
              <li>On <strong>Create the tool</strong>, choose one:
                <ul>
                  <li><strong>Tool Content for Codex</strong> … for Cursor (Codex)</li>
                  <li><strong>Tool Content for Claude Code</strong> … for Claude Code</li>
                </ul>
              </li>
              <li>Click <strong>Create Tool</strong> (ads appear first on the free plan).</li>
              <li>Save the downloaded file or copied blueprint in a memo app.</li>
            </ol>

            <h2>Step B: Build with Cursor (Codex)</h2>
            <p>Cursor is an AI editor. Paste the blueprint and ask it to create the files.</p>
            <ol class="guide-step-list">
              <li>Open <a href="https://cursor.com/" target="_blank" rel="noopener noreferrer">https://cursor.com/</a> and install Cursor.</li>
              <li>Create a <strong>new folder</strong> on your PC (example: <code>my-tool</code>).</li>
              <li>Open that folder in Cursor.</li>
              <li>Open chat (Codex / Agent) and paste the <strong>full blueprint</strong> from NENE Studio.</li>
              <li>Send the <strong>sample prompt below</strong>.</li>
              <li>Save the generated <code>index.html</code> and related files into the folder.</li>
              <li>Open <code>index.html</code> in your browser and test it.</li>
            </ol>

            <h2>Step C: Build with Claude Code</h2>
            <ol class="guide-step-list">
              <li>Log in at <a href="https://claude.ai/" target="_blank" rel="noopener noreferrer">https://claude.ai/</a> and follow Anthropic's Claude Code setup guide.</li>
              <li>Prepare a working folder.</li>
              <li>Paste NENE Studio's <strong>Tool Content for Claude Code</strong>.</li>
              <li>Send the sample prompt and save the generated files.</li>
              <li>Open <code>index.html</code> in your browser.</li>
            </ol>

            <h2>Step D: Build with ChatGPT</h2>
            <ol class="guide-step-list">
              <li>Open <a href="https://chatgpt.com/" target="_blank" rel="noopener noreferrer">https://chatgpt.com/</a> and log in.</li>
              <li>Start a new chat and paste the NENE Studio blueprint.</li>
              <li>Send the sample prompt and save the returned HTML / CSS / JS as separate files.</li>
              <li>Put <code>index.html</code>, <code>style.css</code>, and <code>script.js</code> in the same folder and open the page.</li>
            </ol>

            <h2>Sample prompt to copy</h2>
            <p>Paste this into your external AI tool.</p>
            <pre class="code-block guide-prompt">This is a tool blueprint created in NENE Studio.
Build a simple web tool based on this design for beginners.

Requirements:
- Use index.html / style.css / script.js
- Japanese UI
- URL field is memo only (do not fetch URL content automatically)
- Process only pasted text entered by the user
- Mobile-friendly layout
- Clear Japanese error messages

Blueprint:
(Paste the full NENE Studio output here)</pre>

            <h2>If something goes wrong</h2>
            <ul>
              <li><strong>Blueprint is too short</strong> … include the Detailed View content.</li>
              <li><strong>Everything comes back in one file</strong> … ask the AI to split it into 3 files.</li>
              <li><strong>It does not run</strong> … check the browser Console (F12) and send the error back to the AI.</li>
              <li><strong>AI generation is required</strong> … the free blueprint alone does not include live AI generation. Use API settings later if needed.</li>
            </ul>

            <p class="guide-footer">With this method, <strong>NENE Studio OpenAI API cost stays ¥0</strong>. External AI costs depend on the service you choose (ChatGPT plan, Cursor, etc.).</p>
`;

const apikeyGuideEn = `
            <div class="guide-callout">
              <strong>BYOK plan (Bring Your Own Key)</strong>
              <ul>
                <li>Create blueprints <strong>plus</strong> AI generation with <strong>your API</strong></li>
                <li>No operator OpenAI API cost</li>
                <li><strong>Google Gemini free tier</strong> is the easiest way to start</li>
              </ul>
            </div>

            <h2>Recommended: Google Gemini API (free tier available)</h2>
            <ol class="guide-step-list">
              <li>Open <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer">https://aistudio.google.com/apikey</a></li>
              <li>Sign in with Google</li>
              <li>Click <strong>Create API key</strong></li>
              <li>Copy the key (starts with <code>AIza...</code>)</li>
              <li>Go to <strong>Settings</strong> → provider <strong>Google Gemini</strong> → paste the key → <strong>Save</strong></li>
            </ol>

            <h2>OpenAI API (pay as you go)</h2>
            <ol class="guide-step-list">
              <li>Open <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer">https://platform.openai.com/api-keys</a></li>
              <li>Create an account and log in (payment method may be required)</li>
              <li>Click <strong>Create new secret key</strong></li>
              <li>Copy the key (starts with <code>sk-...</code>)</li>
              <li>Go to <strong>Settings</strong> → provider <strong>OpenAI</strong> → paste → save</li>
            </ol>

            <h2>If you are on a paid AI plan</h2>
            <ul>
              <li><strong>¥980/month</strong> … up to <strong>50</strong> operator API runs</li>
              <li><strong>¥1250/month</strong> … up to <strong>100</strong> operator API runs</li>
              <li>After the limit … set your own API key above</li>
              <li>Or wait until <strong>next month</strong> (counter resets)</li>
            </ul>

            <h2>Notes</h2>
            <ul>
              <li>Never share your API key with others</li>
              <li>Keys are stored only in <strong>this browser</strong> (sent only when generating)</li>
              <li>Free tiers also have <strong>daily limits</strong></li>
            </ul>
`;

const placeholderTranslations = {
  "例：朝の注目株チェックツール": "Example: Morning Stock Watch Tool",
  "例：投資初心者、店舗オーナー、営業担当": "Example: beginner investor, store owner, sales rep",
  "例：ニュース本文、銘柄名、決算PDFの本文、検索キーワード、URLメモ": "Example: pasted news text, ticker, earnings PDF text, keywords, URL memo",
  "例：ランキング、理由、注意点、投稿文案": "Example: ranking, reasons, notes, post copy",
  "例：注意点をチェックする部品": "Example: part that checks caution points",
  "例：危険な表現や不足情報を確認する": "Example: check risky wording and missing information",
};

const privacyPolicyEn = `
  <h1>Privacy Policy</h1>
  <p>NENE Studio (the "Service") creates AI tool plans, nodes (workflow parts), and AI agent proposals.</p>
  <p>The Service recognizes the importance of personal information and handles it appropriately in compliance with applicable laws and guidelines.</p>
  <h2>Article 1. Information Collected</h2>
  <p>The Service may collect information entered by users, usage information, and information required to create AI tools.</p>
  <ul>
    <li>Name, email address, and inquiry details</li>
    <li>Created AI tools, plans, prompts, and API keys</li>
    <li>Usage date and time, operation history, error logs, device information, browser information, IP address, and cookies</li>
    <li>Tool category, hearing answers, saved tool structure, and node structure</li>
  </ul>
  <h2>Article 2. Purpose of Use</h2>
  <p>Collected information is used to create AI tool plans, propose AI agents, save and display created tools, edit nodes, connect to external services, check operation, fix bugs, respond to inquiries, prevent misuse, improve quality, and comply with laws.</p>
  <h2>Article 3. Handling of API Keys</h2>
  <p>API keys are used only to connect to external services specified by users and provide Service functions. Users are responsible for managing their own API keys.</p>
  <p>If an API key may have leaked, users must disable, delete, regenerate, or suspend it on the relevant external service at their own responsibility.</p>
  <h2>Article 4. Handling of AI Input Data</h2>
  <p>The Service may use entered text, design details, tool structures, and prompts to create AI plans and proposals. Do not enter personal information, confidential information, passwords, private keys, credit card numbers, bank account information, or copyrighted third-party materials.</p>
  <p>The Service does not guarantee the accuracy, completeness, or legality of AI outputs.</p>
  <h2>Article 5. Third-Party Provision</h2>
  <p>The Service will not provide personal information to third parties except with user consent, as required by law, to protect life, body, or property, in response to valid public authority requests, or as necessary to provide the Service.</p>
  <h2>Article 6. External Services</h2>
  <p>The Service may use AI APIs, cloud storage, databases, analytics tools, and error monitoring tools. The operator is not responsible for damages caused by external service changes, outages, price changes, API restrictions, account suspension, or data loss unless attributable to the operator.</p>
  <h2>Article 7. Cookies</h2>
  <p>The Service may use cookies to improve convenience, understand usage, prevent misuse, and deliver ads. Some functions may not work correctly if cookies are disabled.</p>
  <h2>Article 7-2. Advertising (Media.net / A8.net; AdSense planned later)</h2>
  <p>On the free plan, third-party ads may appear before export. We currently use Google AdSense and A8.net. Paid plans (from ¥480/month) do not show pre-export ads.</p>
  <h2>Article 8. Security Measures</h2>
  <p>The Service implements reasonable security measures such as access control, encryption, password management, API key management, log management, unauthorized access prevention, backups, and vendor management.</p>
  <h2>Article 9. Retention Period</h2>
  <p>The Service retains personal information only as necessary for the purposes of use and deletes or anonymizes it within a reasonable period when no longer needed.</p>
  <h2>Article 10. User Rights</h2>
  <p>Users may request disclosure, correction, addition, deletion, suspension of use, and suspension of third-party provision of their personal information.</p>
  <h2>Article 11. Use by Minors</h2>
  <p>Minors must use the Service with consent from a parent or legal representative.</p>
  <h2>Article 12. Investment and Financial Tools</h2>
  <p>Tools related to stocks, FX, crypto, and news analysis are for information organization and analysis support, not investment advice. Investment decisions are the user's own responsibility.</p>
  <h2>Article 13. Disclaimer</h2>
  <p>The Service does not guarantee the accuracy, completeness, usefulness, legality, or fitness for a particular purpose of AI outputs. Users are responsible for managing API keys, passwords, credentials, and confidential information.</p>
  <h2>Article 14. Changes to This Policy</h2>
  <p>The Service may change this Privacy Policy as necessary. Important changes will be announced appropriately.</p>
  <h2>Article 15. Contact</h2>
  <p>Operator: [Enter operator name]<br />Address: [Enter address]<br />Email: [Enter email address]<br />Hours: [Enter reception hours]</p>
  <p>Established: June 26, 2026<br />Last updated: June 26, 2026</p>
`;

const creationScreens = ["create", "proposal", "nodes", "blueprint", "export"];

const PLAN_CATALOG = {
  free: { price: 0, aiLimit: 0, labelJa: "無料プラン", labelEn: "Free plan" },
  adfree: { price: 480, aiLimit: 0, labelJa: "480円プラン（広告カット）", labelEn: "¥480/month (ad-free)" },
  ai50: { price: 980, aiLimit: 50, labelJa: "980円プラン（AI50回）", labelEn: "¥980/month (50 AI runs)" },
  ai100: { price: 1250, aiLimit: 100, labelJa: "1250円プラン（AI100回）", labelEn: "¥1250/month (100 AI runs)" },
};

function getPlanLabel(plan, language = "ja") {
  const entry = PLAN_CATALOG[plan] || PLAN_CATALOG.free;
  return language === "en" ? entry.labelEn : entry.labelJa;
}

function formatAuthProvider(provider) {
  if (provider === "google") return state.language === "en" ? "Google" : "Google";
  if (provider === "apple") return state.language === "en" ? "Apple" : "Apple";
  return state.language === "en" ? "Email" : "メール";
}

const state = {
  currentScreen: "create",
  selectedCategoryIndex: 0,
  answers: {
    purpose: "ニュースから注目銘柄を探す",
    market: "日本株",
    output: "ランキング形式",
  },
  custom: {
    toolName: "",
    targetUser: "",
    inputs: "",
    result: "",
    nodeTitle: "",
    nodeDescription: "",
  },
  settings: {
    openaiKey: "",
    newsKey: "",
    userApiKey: "",
    userApiProvider: "gemini",
    plan: "free",
    paymentProvider: "Stripe Checkout + Stripe Billing",
    adFreeFlagAfterPayment: true,
    paymentStatus: "unpaid",
  },
  auth: {
    token: "",
    user: null,
    providers: { google: { enabled: false, clientId: "" }, apple: { enabled: false, clientId: "" } },
    feedback: { type: "info", message: "" },
    loading: false,
  },
  serverStatus: null,
  language: "ja",
  summaryEdits: {
    purpose: "",
    user: "",
    inputs: "",
    result: "",
    usage: "",
  },
  selectedProposalIndex: 0,
  proposalOffset: 0,
  nodes: [],
  exportFormat: "publish",
  lastTestReport: "",
  lastPublish: null,
  publishError: "",
  createdOutput: null,
  savedBlueprints: [],
  savedAgents: [],
  selectedAgentIndex: 0,
  createdAgent: null,
  agentGoal: "",
  agentMaterial: "",
  agentMaxLoops: 3,
  agentRunning: false,
  agentAbortRequested: false,
  agentLogs: [],
  agentResult: "",
  publishedToolsShelf: [],
  agentSelectedSlugs: [],
  status: "",
};

const AUTH_TOKEN_KEY = "neneAuthToken";
const AUTH_REMEMBER_KEY = "neneRememberLogin";
const AUTH_EMAIL_KEY = "neneAuthEmail";
const SELECTED_PLAN_KEY = "neneSelectedPlan";
const USER_API_KEY = "neneUserApiKey";
const USER_API_PROVIDER_KEY = "neneUserApiProvider";
/** 成果物・Studio・サーバー共通の既定 Gemini モデル（停止済みモデルを避ける）。初期化より前に置くこと */
const DEFAULT_GEMINI_MODEL = "gemini-2.5-flash";

function shouldRememberLogin() {
  const checkbox = $("#auth-remember-me");
  if (checkbox) return checkbox.checked;
  return localStorage.getItem(AUTH_REMEMBER_KEY) !== "false";
}

function migrateLegacyClientSecrets() {
  const storedToken = sessionStorage.getItem(AUTH_TOKEN_KEY) || localStorage.getItem(AUTH_TOKEN_KEY);
  if (storedToken) {
    state.auth.token = storedToken;
    sessionStorage.setItem(AUTH_TOKEN_KEY, storedToken);
  }
  localStorage.removeItem(AUTH_TOKEN_KEY);

  const legacyApiKey = localStorage.getItem(USER_API_KEY);
  const legacyProvider = localStorage.getItem(USER_API_PROVIDER_KEY);
  if (legacyApiKey && !sessionStorage.getItem(USER_API_KEY)) {
    sessionStorage.setItem(USER_API_KEY, legacyApiKey);
  }
  if (legacyProvider && !sessionStorage.getItem(USER_API_PROVIDER_KEY)) {
    sessionStorage.setItem(USER_API_PROVIDER_KEY, legacyProvider);
  }
  localStorage.removeItem(USER_API_KEY);
  localStorage.removeItem(USER_API_PROVIDER_KEY);
}

function readSessionApiKey() {
  return sessionStorage.getItem(USER_API_KEY) || "";
}

function readSessionApiProvider() {
  return sessionStorage.getItem(USER_API_PROVIDER_KEY) || "gemini";
}

function persistAuthToken(token) {
  state.auth.token = token || "";
  // スマホではCookieが届かないことがあるので、同じ画面のあいだは控えを持つ
  if (token) sessionStorage.setItem(AUTH_TOKEN_KEY, token);
  else sessionStorage.removeItem(AUTH_TOKEN_KEY);
}

// Cookieだけでログインが復元された場合（新しいタブ・ブラウザ再起動など）は
// sessionStorage の控え(token)が無い。どちらか一方でも有効ならログイン済みとして扱う。
function hasAuthSession() {
  return Boolean(state.auth.token) || state.auth.authenticated === true;
}

function clearAuthToken() {
  state.auth.token = "";
  sessionStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

function hydrateSavedAuthEmail() {
  const savedEmail = localStorage.getItem(AUTH_EMAIL_KEY);
  const emailInput = $("#auth-email");
  if (savedEmail && emailInput && !emailInput.value) {
    emailInput.value = savedEmail;
  }
  const rememberInput = $("#auth-remember-me");
  if (rememberInput) {
    rememberInput.checked = localStorage.getItem(AUTH_REMEMBER_KEY) !== "false";
  }
}

function setPasswordAutocomplete(mode) {
  const passwordInput = $("#auth-password");
  if (!passwordInput) return;
  passwordInput.autocomplete = mode === "register" ? "new-password" : "current-password";
}

async function offerPasswordSave(email, password) {
  if (!window.PasswordCredential || !shouldRememberLogin()) return;
  try {
    await navigator.credentials.store(new PasswordCredential({
      id: email,
      password,
      name: email,
    }));
  } catch {
    // ブラウザ設定やユーザー操作で拒否される場合がある
  }
}

function togglePasswordVisibility() {
  const passwordInput = $("#auth-password");
  const toggle = $("#auth-password-toggle");
  if (!passwordInput || !toggle) return;
  const show = passwordInput.type === "password";
  passwordInput.type = show ? "text" : "password";
  toggle.textContent = show
    ? (state.language === "en" ? "Hide" : "隠す")
    : (state.language === "en" ? "Show" : "表示");
  toggle.setAttribute("aria-label", show ? "パスワードを隠す" : "パスワードを表示");
}

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));
let resolvedApiBase = window.NENE_CONFIG?.apiBase || "/api";
const apiBaseFallback = window.NENE_CONFIG?.apiBaseFallback || "";

function getApiBaseCandidates() {
  return [resolvedApiBase, apiBaseFallback].filter(
    (base, index, list) => base && list.indexOf(base) === index,
  );
}

const categoryGrid = $("#category-grid");
const investmentNotice = $("#investment-notice");
const simpleBlueprint = $("#simple-blueprint");
const detailBlueprint = $("#detail-blueprint");
const exportPreview = $("#export-preview");
const exportStatus = $("#export-status");
const savedList = $("#saved-list");
const nodeCanvas = $("#node-canvas");
const settingsStatus = $("#settings-status");
const appStatus = $("#app-status");
const agentProposals = $("#agent-proposals");
const agentPreview = $("#agent-preview");
const agentStatus = $("#agent-status");
const nodeEditorList = $("#node-editor-list");
const apiFormatNotice = $("#api-format-notice");
const adOverlay = $("#ad-overlay");
const adContinue = $("#ad-continue");
const authStatus = $("#auth-status");

hydrateAuthState();
loadAuthProviders();
loadServerAuthStatus();
hydrateUserApiKey();
hydrateStripePaymentState();
handleStripeReturn();
handleGoogleReturn();
renderCategories();
syncHearingFromActiveButtons();
prepareNodes();
bindEvents();
renderAll();
registerServiceWorker();
restoreAuthSession().then(renderAll).catch(() => {});

function renderCategories() {
  categoryGrid.innerHTML = "";
  categories.forEach((category, index) => {
    const button = document.createElement("button");
    button.className = `category-card${index === state.selectedCategoryIndex ? " active" : ""}`;
    button.dataset.categoryIndex = String(index);
    button.dataset.investment = String(category.isInvestment);
    const name = state.language === "en" ? translateText(category.name) : category.name;
    const description = state.language === "en" ? translateText(category.description) : category.description;
    const use = state.language === "en" ? translateText(category.use) : category.use;
    const moneyLabel = state.language === "en" ? "Monetization" : "収益化しやすさ";
    const easyLabel = state.language === "en" ? "Ease of Build" : "作りやすさ";
    const useLabel = state.language === "en" ? "Recommended Use" : "おすすめ用途";
    button.innerHTML = `
      <h3>${index + 1}. ${name}</h3>
      <p>${description}</p>
      <div class="card-stats">
        <span>${moneyLabel}: ${category.money}</span>
        <span>${easyLabel}: ${category.easy}</span>
        <span>${useLabel}: ${use}</span>
      </div>
    `;
    categoryGrid.appendChild(button);
  });
}

function bindEvents() {
  categoryGrid.addEventListener("click", (event) => {
    const card = event.target.closest(".category-card");
    if (!card) return;
    state.selectedCategoryIndex = Number(card.dataset.categoryIndex);
    state.selectedProposalIndex = 0;
    state.proposalOffset = 0;
    clearSummaryEdits();
    applyThemeDefaults();
    prepareNodes();
    renderAll();
  });

  $$(".nav-item").forEach((button) => {
    button.addEventListener("click", () => activateScreen(button.dataset.screen));
  });

  $$("[data-goto]").forEach((button) => {
    button.addEventListener("click", () => activateScreen(button.dataset.goto));
  });

  const billingPortalButton = $("#open-billing-portal");
  if (billingPortalButton) {
    billingPortalButton.addEventListener("click", openBillingPortal);
  }

  $$("[data-select-plan]").forEach((button) => {
    button.addEventListener("click", () => {
      const plan = button.dataset.selectPlan;
      if (plan && PLAN_CATALOG[plan]) {
        state.settings.plan = plan;
        state.status = `${getPlanLabel(plan, state.language)}を選択しました。「設定」でStripe決済してください。`;
        activateScreen("settings");
        renderAll();
      }
    });
  });

  $$(".language-button").forEach((button) => {
    button.addEventListener("click", () => {
      state.language = button.dataset.language;
      state.status = state.language === "en" ? "Language changed to English." : "表示言語を日本語に変更しました。";
      renderAll();
      activateScreen(state.currentScreen);
      if (state.currentScreen === "login") {
        renderAuthProviders({ forceLocale: true });
      }
    });
  });

  $$(".step-item").forEach((button) => {
    button.addEventListener("click", () => activateScreen(button.dataset.stepScreen));
  });

  $("#auth-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (state.auth.loading) return;
    const mode = event.submitter?.id === "register-button" ? "register" : "login";
    submitAuth(mode);
  });
  $("#login-button")?.addEventListener("mousedown", () => setPasswordAutocomplete("login"));
  $("#register-button")?.addEventListener("mousedown", () => setPasswordAutocomplete("register"));
  $("#auth-password-toggle")?.addEventListener("click", togglePasswordVisibility);
  $("#auth-remember-me")?.addEventListener("change", (event) => {
    localStorage.setItem(AUTH_REMEMBER_KEY, event.target.checked ? "true" : "false");
  });
  $("#logout-button")?.addEventListener("click", logoutUser);
  $("#auth-go-create")?.addEventListener("click", () => {
    setAuthFeedback("");
    activateScreen("create");
  });
  $("#apple-login-button")?.addEventListener("click", signInWithApple);
  $("#google-login-fallback")?.addEventListener("click", startGoogleRedirectLogin);
  $("#copy-studio-url")?.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText("http://localhost:8787/");
      setAuthFeedback("http://localhost:8787/ をコピーしました。Chrome または Edge の住所欄に貼って開いてください。", "info");
    } catch {
      setAuthFeedback("コピーできませんでした。Chrome または Edge の住所欄に http://localhost:8787 と入力してください。", "error");
    }
    renderAuthUi();
  });
  $("#google-login-cancel")?.addEventListener("click", () => {
    cancelGoogleSignIn();
    setAuthFeedback("Googleログインをやめました。メールとパスワードでも入れます。", "info");
    renderAuthUi();
  });

  $$("#main-action").forEach((button) => {
    button.addEventListener("click", runMainAction);
  });

  $("#create").addEventListener("click", (event) => {
    const button = event.target.closest(".choice, .pill");
    if (!button) return;
    const question = button.dataset.question;
    if (!question) return;
    state.answers[question] = button.dataset.value || button.textContent.trim();
    state.selectedProposalIndex = 0;
    clearSummaryEdits();
    prepareNodes();
    renderAll();
  });

  nodeEditorList.addEventListener("input", (event) => {
    const input = event.target;
    const index = Number(input.dataset.nodeIndex);
    const field = input.dataset.nodeField;
    if (!Number.isInteger(index) || !field || !state.nodes[index]) return;
    state.nodes[index][field === "title" ? 0 : 1] = input.value;
    state.status = "作業の部品を編集しました。";
    renderAll();
  });

  [
    ["#custom-tool-name", "toolName"],
    ["#custom-target-user", "targetUser"],
    ["#custom-inputs", "inputs"],
    ["#custom-result", "result"],
    ["#custom-node-title", "nodeTitle"],
    ["#custom-node-description", "nodeDescription"],
  ].forEach(([selector, key]) => {
    $(selector).addEventListener("input", (event) => {
      state.custom[key] = event.target.value.trim();
      if (key !== "nodeTitle" && key !== "nodeDescription") {
        state.selectedProposalIndex = 0;
        clearSummaryEdits();
        prepareNodes();
      }
      state.status = "入力内容をツール作成内容に反映しました。";
      renderAll();
    });
  });

  [
    ["#edit-summary-purpose", "purpose"],
    ["#edit-summary-user", "user"],
    ["#edit-summary-inputs", "inputs"],
    ["#edit-summary-result", "result"],
    ["#edit-summary-usage", "usage"],
  ].forEach(([selector, key]) => {
    $(selector).addEventListener("input", (event) => {
      state.summaryEdits[key] = event.target.value;
      state.status = "内容確認の文章を編集しました。";
      renderAll();
    });
  });

  $("#openai-key")?.addEventListener("input", (event) => {
    state.settings.openaiKey = event.target.value.trim();
  });

  $("#news-key")?.addEventListener("input", (event) => {
    state.settings.newsKey = event.target.value.trim();
  });

  $("#user-api-provider")?.addEventListener("change", (event) => {
    state.settings.userApiProvider = event.target.value;
  });

  $("#user-api-key")?.addEventListener("input", (event) => {
    state.settings.userApiKey = event.target.value.trim();
  });

  $$(".proposal-card").forEach((card) => {
    card.addEventListener("click", () => selectProposal(Number(card.dataset.proposal)));
  });

  $$("[data-action='choose-proposal']").forEach((button) => {
    button.addEventListener("click", (event) => {
      const card = event.target.closest(".proposal-card");
      selectProposal(Number(card.dataset.proposal));
      prepareNodes();
      activateScreen("nodes");
    });
  });

  $$(".export-card").forEach((button) => {
    button.addEventListener("click", () => {
      // ZIPカードは専用ハンドラでダウンロードするだけ。主フローは公開URL。
      if (button.id === "download-zip-tool") return;
      state.exportFormat = button.dataset.exportFormat;
      state.status = "";
      renderAll();
    });
  });

  $$(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      $$(".tab").forEach((item) => item.classList.remove("active"));
      tab.classList.add("active");
      $("#simple-panel").classList.toggle("active", tab.dataset.tab === "simple");
      $("#detail-panel").classList.toggle("active", tab.dataset.tab === "detail");
    });
  });

  $("#go-proposal").addEventListener("click", () => activateScreen("proposal"));
  $("#reset-category").addEventListener("click", resetCategory);
  $("#back-to-create").addEventListener("click", () => activateScreen("create"));
  $("#shuffle-proposals").addEventListener("click", shuffleProposals);
  $("#arrange-nodes").addEventListener("click", () => {
    arrangeNodes();
    state.status = "作業の部品を見やすい順番に並べました。";
    renderAll();
  });
  $("#add-node").addEventListener("click", addNode);
  $("#remove-node").addEventListener("click", removeNode);
  $("#go-blueprint").addEventListener("click", () => activateScreen("blueprint"));
  $("#agent-add-tool").addEventListener("click", addNode);
  $("#agent-refresh").addEventListener("click", refreshCombination);
  $("#copy-export")?.addEventListener("click", copyExport);
  $("#launch-created-tool")?.addEventListener("click", () => previewCreatedTool());
  $("#preview-tool")?.addEventListener("click", () => previewCreatedTool());
  $("#test-tool")?.addEventListener("click", () => runCreatedToolActionTest());
  $("#download-html-tool")?.addEventListener("click", () => downloadCreatedToolHtml());
  $("#download-zip-tool")?.addEventListener("click", () => downloadCreatedToolZip());
  $("#publish-tool")?.addEventListener("click", () => startPublishFromUi());
  $("#copy-publish-url")?.addEventListener("click", () => copyPublishUrl());
  $("#share-publish-url")?.addEventListener("click", () => sharePublishUrl());
  $$("input[name='publish-visibility']").forEach((input) => {
    input.addEventListener("change", syncPublishVisibilityUi);
  });
  syncPublishVisibilityUi();
  $("#save-created-tool").addEventListener("click", saveCreatedTool);
  $("#create-agent").addEventListener("click", createAgent);
  $("#save-agent").addEventListener("click", saveAgent);
  $("#run-agent")?.addEventListener("click", runAgentLoop);
  $("#stop-agent")?.addEventListener("click", stopAgentLoop);
  $("#copy-agent-result")?.addEventListener("click", copyAgentResult);
  $("#refresh-published-shelf")?.addEventListener("click", () => {
    loadPublishedToolsShelf({ force: true }).then(() => {
      agentStatus.textContent = "公開ツール棚を更新しました。";
      renderAgentBuilder();
    });
  });
  $("#select-all-published")?.addEventListener("click", () => {
    state.agentSelectedSlugs = state.publishedToolsShelf.map((tool) => tool.slug);
    renderAgentBuilder();
  });
  $("#clear-published-selection")?.addEventListener("click", () => {
    state.agentSelectedSlugs = [];
    renderAgentBuilder();
  });
  $("#published-tools-shelf")?.addEventListener("click", handlePublishedShelfClick);
  $("#published-tools-shelf")?.addEventListener("change", handlePublishedShelfChange);
  $("#agent-goal")?.addEventListener("input", (event) => {
    state.agentGoal = event.target.value;
  });
  $("#agent-material")?.addEventListener("input", (event) => {
    state.agentMaterial = event.target.value;
  });
  $("#agent-max-loops")?.addEventListener("change", (event) => {
    state.agentMaxLoops = Number(event.target.value) || 3;
  });
  $$("input[name='plan']").forEach((input) => {
    input.addEventListener("change", () => {
      state.settings.plan = input.value;
      persistSelectedPlan(input.value);
      if (input.value === "free") {
        state.settings.paymentStatus = "unpaid";
        state.status = "無料プランに戻しました。出力前に広告が表示されます。";
      } else {
        state.status = `${getPlanLabel(input.value, state.language)}を選択しました。下のStripeボタンから支払ってください。`;
      }
      renderAll();
    });
  });
  $("#stripe-checkout-button").addEventListener("click", openStripeCheckout);
  $("#save-settings").addEventListener("click", () => {
    saveUserApiKey();
    const planText = state.auth.user?.isAdFree
      ? getPlanLabel(state.auth.user.subscriptionPlan || state.settings.plan, state.language)
      : getPlanLabel("free", state.language);
    const keyNote = state.settings.userApiKey
      ? " 自分のAPIキーをこの端末に保存しました。"
      : "";
    state.status = `${planText}の設定を保存しました。${keyNote}`.trim();
    renderAll();
  });

  savedList.addEventListener("click", (event) => {
    const item = event.target.closest("[data-saved-index]");
    if (!item) return;
    loadSavedItem(item.dataset.savedType, Number(item.dataset.savedIndex));
  });

  agentProposals.addEventListener("click", (event) => {
    const card = event.target.closest("[data-agent-index]");
    if (!card) return;
    state.selectedAgentIndex = Number(card.dataset.agentIndex);
    state.createdAgent = null;
    renderAll();
  });
}

function syncHearingFromActiveButtons() {
  $$(".choice.active, .pill.active").forEach((button) => {
    if (button.dataset.question) {
      state.answers[button.dataset.question] = button.dataset.value || button.textContent.trim();
    }
  });
}

function activateScreen(screenId) {
  state.currentScreen = screenId;
  const activeNavScreen = creationScreens.includes(screenId) ? "create" : screenId;
  $$(".nav-item").forEach((item) => {
    item.classList.toggle("active", item.dataset.screen === activeNavScreen);
  });
  $$(".screen").forEach((screen) => {
    screen.classList.toggle("active", screen.id === screenId);
  });

  const copySource = state.language === "en" ? screenCopyEn : screenCopy;
  const [title, action] = copySource[screenId] || copySource.create;
  $("#screen-title").textContent = title;
  $("#main-action").textContent = action;
  renderAll();
  if (screenId === "login") {
    ensureAuthProvidersUi();
  }
  if (screenId === "agent") {
    loadPublishedToolsShelf().then(() => renderAgentBuilder());
  }
  if (screenId === "export") {
    loadExportSponsor();
    renderApiKeyNotice();
  }
}

function runMainAction() {
  const nextByScreen = {
    create: "proposal",
    proposal: "nodes",
    nodes: "blueprint",
    blueprint: "export",
    usage: "create",
    implement: "create",
    saved: "nodes",
  };

  if (state.currentScreen === "export") {
    startPublishFromUi();
    return;
  }
  if (state.currentScreen === "settings") {
    $("#save-settings").click();
    return;
  }
  if (state.currentScreen === "agent") {
    createAgent();
    return;
  }
  activateScreen(nextByScreen[state.currentScreen] || "create");
}

function renderSubscriptionManagePanel() {
  const panel = $("#manage-subscription-panel");
  if (!panel) return;
  const user = state.auth.user;
  const plan = user?.subscriptionPlan || "free";
  // 有料プランを契約している人にだけ「契約管理」を出す
  panel.hidden = !(user && plan && plan !== "free");
}

async function openBillingPortal() {
  if (!state.auth.user) {
    state.status = "ログインしてからご利用ください。";
    renderAll();
    activateScreen("login");
    return;
  }
  try {
    const data = await apiRequest("/billing/portal", { method: "POST" });
    if (data?.url) {
      window.location.href = data.url;
      state.status = "Stripeの契約管理画面を開きました。";
    } else {
      state.status = "契約管理画面のURLを取得できませんでした。";
    }
  } catch (error) {
    state.status = error.message;
  }
  renderAll();
}

function renderAll() {
  renderCategories();
  renderHearingOptions();
  renderCategorySelection();
  renderInvestmentNotice();
  renderProposals();
  renderNodes();
  renderNodeEditor();
  renderBlueprint();
  renderSummaryEditor();
  renderExport();
  renderSavedList();
  renderAgentBuilder();
  renderPaymentSettings();
  renderStatus();
  renderServerAuthStatus();
  renderCreateProgress();
  renderLanguage();
  renderAuthUi();
  renderSubscriptionManagePanel();
}

function renderLanguage() {
  const text = uiText[state.language];
  renderStaticLanguage();
  renderPrivacyLanguage();
  renderImplementGuideLanguage();
  renderApiKeyGuideLanguage();
  $$(".language-button").forEach((button) => {
    button.classList.toggle("active", button.dataset.language === state.language);
  });
  $(".brand small").textContent = text.brand;
  $$(".nav-item").forEach((item) => {
    item.textContent = text.nav[item.dataset.screen] || item.textContent;
  });
  const launchBtn = $("#launch-created-tool");
  if (launchBtn) launchBtn.textContent = text.launch;
  $("#save-created-label").textContent = text.saveCreated;
  $("#save-created-tool").textContent = text.save;
  const exportHeading = $("#export-heading") || $("#export .folder-panel h2");
  if (exportHeading) exportHeading.textContent = text.exportTitle;
  const previewBtn = $("#preview-tool");
  if (previewBtn) previewBtn.textContent = text.preview || "プレビューする";
  const testBtn = $("#test-tool");
  if (testBtn) testBtn.textContent = text.test || "動作テストする";
  const zipBtn = $("#download-zip-tool");
  if (zipBtn && !zipBtn.classList.contains("export-card")) {
    zipBtn.textContent = text.zip || "ZIPをダウンロード";
  }
  const publishBtn = $("#publish-tool");
  if (publishBtn) publishBtn.textContent = text.publish || "公開URLを発行する";
}

function renderStaticLanguage() {
  document.documentElement.lang = state.language;
  translateTextNodes(document.body);
  $$("[placeholder]").forEach((element) => {
    if (!element.dataset.originalPlaceholder) {
      element.dataset.originalPlaceholder = element.getAttribute("placeholder");
    }
    const original = element.dataset.originalPlaceholder;
    element.setAttribute("placeholder", state.language === "en" ? translateText(original) : original);
  });
}

function setPlaceholder(selector, value) {
  const element = $(selector);
  if (!element) return;
  element.dataset.originalPlaceholder = value;
  element.setAttribute("placeholder", state.language === "en" ? translateText(value) : value);
}

function translateTextNodes(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent || parent.closest("[data-no-translate]") || ["SCRIPT", "STYLE", "TEXTAREA", "INPUT"].includes(parent.tagName)) {
        return NodeFilter.FILTER_REJECT;
      }
      return node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    },
  });

  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach((node) => {
    if (!node.originalText) node.originalText = node.nodeValue;
    if (state.language === "en") {
      const source = /[ぁ-んァ-ン一-龥]/.test(node.nodeValue) ? node.nodeValue : node.originalText;
      node.originalText = source;
      node.nodeValue = translateText(source);
    } else {
      node.nodeValue = node.originalText;
    }
  });
}

function translateText(value) {
  let translated = value;
  const entries = Object.entries(textTranslations).sort((a, b) => b[0].length - a[0].length);
  entries.forEach(([ja, en]) => {
    translated = translated.split(ja).join(en);
  });
  const placeholderEntries = Object.entries(placeholderTranslations).sort((a, b) => b[0].length - a[0].length);
  placeholderEntries.forEach(([ja, en]) => {
    translated = translated.split(ja).join(en);
  });
  return translated;
}

function renderPrivacyLanguage() {
  const panel = document.querySelector("#privacy .policy-panel");
  if (!panel) return;
  if (!panel.dataset.jaHtml) panel.dataset.jaHtml = panel.innerHTML;
  panel.innerHTML = state.language === "en" ? privacyPolicyEn : panel.dataset.jaHtml;
}

function renderImplementGuideLanguage() {
  const panel = document.querySelector(".implement-guide-panel");
  if (!panel) return;
  if (!panel.dataset.jaHtml) panel.dataset.jaHtml = panel.innerHTML;
  panel.innerHTML = state.language === "en" ? implementGuideEn : panel.dataset.jaHtml;
}

function renderApiKeyGuideLanguage() {
  const panel = document.querySelector(".apikey-guide-panel");
  if (!panel) return;
  if (!panel.dataset.jaHtml) panel.dataset.jaHtml = panel.innerHTML;
  panel.innerHTML = state.language === "en" ? apikeyGuideEn : panel.dataset.jaHtml;
}

function hydrateUserApiKey() {
  state.settings.userApiKey = readSessionApiKey();
  state.settings.userApiProvider = readSessionApiProvider();
  const providerSelect = $("#user-api-provider");
  const keyInput = $("#user-api-key");
  if (providerSelect) providerSelect.value = state.settings.userApiProvider;
  if (keyInput && document.activeElement !== keyInput) keyInput.value = state.settings.userApiKey;
}

function saveUserApiKey() {
  const provider = $("#user-api-provider")?.value || state.settings.userApiProvider || "gemini";
  const key = $("#user-api-key")?.value.trim() || state.settings.userApiKey || "";
  state.settings.userApiProvider = provider;
  state.settings.userApiKey = key;
  if (key) {
    sessionStorage.setItem(USER_API_KEY, key);
    sessionStorage.setItem(USER_API_PROVIDER_KEY, provider);
  } else {
    sessionStorage.removeItem(USER_API_KEY);
    sessionStorage.removeItem(USER_API_PROVIDER_KEY);
  }
}

function hydrateStripePaymentState() {
  const savedPlan = localStorage.getItem(SELECTED_PLAN_KEY);
  if (savedPlan && PLAN_CATALOG[savedPlan] && savedPlan !== "free") {
    state.settings.plan = savedPlan;
  }

  const params = new URLSearchParams(window.location.search);
  const stripeResult = params.get("stripe");
  if (stripeResult === "cancel") {
    state.status = state.language === "en"
      ? "Stripe checkout was cancelled."
      : "Stripe決済をキャンセルしました。";
    window.history.replaceState({}, document.title, window.location.pathname);
  }
}

function persistSelectedPlan(plan) {
  if (plan && PLAN_CATALOG[plan] && plan !== "free") {
    localStorage.setItem(SELECTED_PLAN_KEY, plan);
  } else {
    localStorage.removeItem(SELECTED_PLAN_KEY);
  }
}

function handleStripeReturn() {
  const params = new URLSearchParams(window.location.search);
  if (params.get("stripe") === "success" || params.get("payment") === "success") {
    state.status = "Stripe決済後の状態をサーバーに確認しています。";
    refreshCurrentUser().then(() => {
      if (state.auth.user?.subscriptionPlan && state.auth.user.subscriptionPlan !== "free") {
        persistSelectedPlan(state.auth.user.subscriptionPlan);
      }
    });
    window.history.replaceState({}, document.title, window.location.pathname);
  }
}

function hydrateAuthState() {
  migrateLegacyClientSecrets();
  hydrateSavedAuthEmail();
}

async function restoreAuthSession() {
  try {
    const data = await apiRequest("/auth/me");
    applyServerUser(data.user);
    state.auth.authenticated = true;
    await loadSavedToolsFromServer();
  } catch {
    state.auth.authenticated = false;
    if (!state.auth.token) {
      state.auth.user = null;
    }
  }
}

async function apiRequest(path, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };
  if (state.auth.token) {
    headers.Authorization = `Bearer ${state.auth.token}`;
  }
  if (/\.ngrok(-free)?\.(app|io|dev)$/i.test(location.hostname) || /ngrok/i.test(location.hostname)) {
    headers["ngrok-skip-browser-warning"] = "1";
  }
  const bases = getApiBaseCandidates();
  let lastError = null;

  // Renderスリープ対策：先に軽い疎通で起こす
  for (const base of bases) {
    try {
      await fetch(`${base}/server/status`, { method: "GET", credentials: "include" });
      break;
    } catch {
      // 続行して本番リクエストへ
    }
  }

  for (let attempt = 0; attempt < 3; attempt += 1) {
    for (let index = 0; index < bases.length; index += 1) {
      const base = bases[index];
      try {
        const response = await fetch(`${base}${path}`, {
          ...options,
          headers,
          credentials: "include",
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok) {
          const err = new Error(data.error || "サーバー処理に失敗しました。");
          err.code = data.code || `HTTP_${response.status}`;
          throw err;
        }
        resolvedApiBase = base;
        return data;
      } catch (error) {
        lastError = error;
        const message = String(error?.message || error || "");
        const isNetwork = /failed to fetch|networkerror|load failed|ネットワーク/i.test(message);
        if (!isNetwork) {
          // 認証エラー等はすぐ返す
          throw error;
        }
      }
    }
    // ネットワーク失敗時だけ待って再試行
    await new Promise((resolve) => setTimeout(resolve, 700 * (attempt + 1)));
  }

  const hint = "サーバーに接続できませんでした。数秒待って再試行するか、https://nenestudio.net （wwwなし）で開き直してください。";
  throw new Error(hint);
}

const oauthUiState = {
  googleScriptPromise: null,
  appleScriptPromise: null,
  googleClientId: "",
  googleLocale: "",
  googleInitialized: false,
  googleBusy: false,
  appleClientId: "",
  appleInitialized: false,
  ensurePromise: null,
  googleWatchdog: 0,
};

function isAuthorizedGoogleOrigin() {
  const host = String(location.hostname || "").toLowerCase();
  return host === "localhost"
    || host === "127.0.0.1"
    || host === "nenestudio.net"
    || host === "www.nenestudio.net"
    || host === "nenestudio.pages.dev"
    || host.endsWith(".nenestudio.pages.dev");
}

function isPreviewBrowser() {
  const ua = String(navigator.userAgent || "");
  return /Electron|VSCode|VS Code|Cursor/i.test(ua)
    || (window.parent !== window && !window.opener);
}

function googleCallbackHelpText() {
  if (isPreviewBrowser()) {
    return state.language === "en"
      ? "Google sign-in does not work in the Cursor preview. Open http://localhost:8787 in Chrome or Edge."
      : "Cursorのプレビューでは Google ログインできません。Chrome または Edge で http://localhost:8787 を開いてください。";
  }
  return state.language === "en"
    ? "Use the Google button at http://localhost:8787. If the screen freezes, tap Cancel Google sign-in."
    : "パソコンの http://localhost:8787 で、上の Google ボタンを押してください。画面が止まったら「ログインをやめる」を押します。";
}

function startGoogleRedirectLogin() {
  if (!state.auth.providers.google.enabled) {
    setAuthFeedback("Googleログインはサーバー設定が未完了です。", "error");
    renderAuthUi();
    return;
  }
  setAuthFeedback("上の Google ボタンを押してください。", "info");
  renderAuthUi();
  ensureAuthProvidersUi();
}

async function handleGoogleReturn() {
  const params = new URLSearchParams(window.location.search);
  if (params.get("screen") === "login") {
    activateScreen("login");
    window.history.replaceState({}, document.title, window.location.pathname);
    return;
  }
  if (params.get("google") !== "ok") return;
  const code = String(params.get("code") || "").trim();
  window.history.replaceState({}, document.title, window.location.pathname);
  if (!code) return;
  try {
    const data = await apiRequest("/auth/google/finish", {
      method: "POST",
      body: JSON.stringify({ code }),
    });
    await completeOAuthLogin(data, "Google");
  } catch (error) {
    setAuthFeedback(error.message || "Googleログインの続きに失敗しました。", "error");
    renderAll();
    activateScreen("login");
  }
}

function cancelGoogleSignIn() {
  oauthUiState.googleBusy = false;
  if (oauthUiState.googleWatchdog) {
    window.clearTimeout(oauthUiState.googleWatchdog);
    oauthUiState.googleWatchdog = 0;
  }
  try {
    window.google?.accounts?.id?.cancel();
  } catch {
    // 止めるだけなので失敗しても続行
  }
  document.getElementById("credential_picker_container")?.remove();
  document.querySelectorAll("iframe").forEach((frame) => {
    const src = String(frame.getAttribute("src") || frame.src || "");
    if (!src.includes("accounts.google.com")) return;
    if (frame.closest("#google-login-button")) return;
    frame.remove();
  });
}

function loadScriptOnce(id, src) {
  const existing = document.getElementById(id);
  if (existing?.dataset.loaded === "true") {
    return Promise.resolve();
  }
  if (existing) {
    return new Promise((resolve, reject) => {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error(`script load failed: ${src}`)), { once: true });
    });
  }
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.id = id;
    script.src = src;
    script.async = true;
    script.defer = true;
    script.addEventListener("load", () => {
      script.dataset.loaded = "true";
      resolve();
    }, { once: true });
    script.addEventListener("error", () => reject(new Error(`script load failed: ${src}`)), { once: true });
    document.head.appendChild(script);
  });
}

function loadGoogleScriptOnce() {
  if (window.google?.accounts?.id) return Promise.resolve();
  if (!oauthUiState.googleScriptPromise) {
    oauthUiState.googleScriptPromise = loadScriptOnce(
      "nene-google-gsi",
      "https://accounts.google.com/gsi/client",
    );
  }
  return oauthUiState.googleScriptPromise;
}

function loadAppleScriptOnce() {
  if (window.AppleID?.auth) return Promise.resolve();
  if (!oauthUiState.appleScriptPromise) {
    oauthUiState.appleScriptPromise = loadScriptOnce(
      "nene-apple-auth",
      "https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js",
    );
  }
  return oauthUiState.appleScriptPromise;
}

async function ensureAuthProvidersUi() {
  if (oauthUiState.ensurePromise) return oauthUiState.ensurePromise;
  oauthUiState.ensurePromise = (async () => {
    const { google, apple } = state.auth.providers;
    const loaders = [];
    if (google.enabled && !isPreviewBrowser()) loaders.push(loadGoogleScriptOnce());
    if (apple.enabled) loaders.push(loadAppleScriptOnce());
    if (loaders.length > 0) {
      await Promise.allSettled(loaders);
    }
    renderAuthProviders();
  })().finally(() => {
    oauthUiState.ensurePromise = null;
  });
  return oauthUiState.ensurePromise;
}

async function loadAuthProviders() {
  try {
    const data = await apiRequest("/auth/providers");
    state.auth.providers = {
      google: data.google || { enabled: false, clientId: "" },
      apple: data.apple || { enabled: false, clientId: "" },
    };
    if (state.currentScreen === "login") {
      await ensureAuthProvidersUi();
    }
  } catch {
    window.setTimeout(loadAuthProviders, 2000);
  }
}

async function loadServerAuthStatus() {
  try {
    state.serverStatus = await apiRequest("/server/status");
    renderServerAuthStatus();
    renderPhoneAccess();
    renderApiKeyNotice();
  } catch {
    state.serverStatus = null;
    renderServerAuthStatus();
    renderPhoneAccess();
  }
}

function renderPhoneAccess() {
  const box = $("#phone-access");
  const link = $("#phone-access-url");
  if (!box || !link) return;
  const share = String(state.serverStatus?.shareUrl || "").replace(/\/$/, "");
  const onTunnel = /ngrok|trycloudflare|loca\.lt/i.test(location.hostname);
  if (!share || onTunnel) {
    box.hidden = true;
    return;
  }
  box.hidden = false;
  link.href = share;
  link.textContent = share;
}

function renderServerAuthStatus() {
  const list = $("#server-auth-status");
  if (!list) return;
  const status = state.serverStatus;
  if (!status) {
    list.innerHTML = "<li>サーバーに接続できません。npm run dev で起動してください。</li>";
    return;
  }
  const planLines = status.billing.plans.map((plan) => {
    const label = getPlanLabel(plan.id, state.language);
    const stripeOk = plan.stripeConfigured ? "Stripe設定済" : "Stripe未設定";
    return `<li>${label}（${stripeOk}）</li>`;
  }).join("");
  const lines = [
    `<li>メールログイン：${status.auth.email ? "利用可" : "不可"}</li>`,
    `<li>Googleログイン：${status.auth.google ? "設定済" : "未設定（GOOGLE_CLIENT_ID）"}</li>`,
    `<li>Appleログイン：${status.auth.apple ? "設定済" : "未設定（APPLE_CLIENT_ID）"}</li>`,
    `<li>JWT（ログイン証）：${status.auth.jwtConfigured ? "設定済" : "開発用デフォルト"}</li>`,
    `<li>Stripe：${status.billing.stripe ? "接続可" : "未設定"}</li>`,
    planLines,
  ];
  list.innerHTML = lines.join("");
}

function renderAuthProviders(options = {}) {
  const panel = $("#oauth-login-panel");
  const googleMount = $("#google-login-button");
  const googleFallback = $("#google-login-fallback");
  const googleNote = $("#google-login-note");
  const appleButton = $("#apple-login-button");
  if (!panel || !googleMount || !appleButton) return;

  panel.hidden = false;
  const { google, apple } = state.auth.providers;
  appleButton.hidden = !apple.enabled;

  const locale = state.language === "en" ? "en" : "ja";
  const googleAllowed = google.enabled && !isPreviewBrowser();
  const googleReady = googleAllowed && window.google?.accounts?.id;
  const cancelBtn = $("#google-login-cancel");
  if (cancelBtn) cancelBtn.hidden = !googleReady;
  const googleUnchanged = googleReady
    && oauthUiState.googleInitialized
    && oauthUiState.googleClientId === google.clientId
    && oauthUiState.googleLocale === locale
    && googleMount.firstElementChild
    && !options.forceLocale;

  if (oauthUiState.googleBusy && googleMount.firstElementChild) {
    googleMount.hidden = false;
    googleFallback.hidden = true;
  } else if (googleUnchanged) {
    googleMount.hidden = false;
    googleFallback.hidden = true;
  } else if (googleReady) {
    if (!oauthUiState.googleInitialized || oauthUiState.googleClientId !== google.clientId) {
      window.google.accounts.id.initialize({
        client_id: google.clientId,
        callback: handleGoogleCredential,
        auto_select: false,
        cancel_on_tap_outside: true,
        itp_support: true,
        use_fedcm_for_prompt: false,
        ux_mode: "popup",
      });
      oauthUiState.googleInitialized = true;
      oauthUiState.googleClientId = google.clientId;
    }
    googleMount.innerHTML = "";
    window.google.accounts.id.renderButton(googleMount, {
      type: "standard",
      theme: "outline",
      size: "large",
      text: "signin_with",
      locale,
    });
    oauthUiState.googleLocale = locale;
    googleMount.hidden = false;
    googleFallback.hidden = true;
  } else if (google.enabled) {
    googleMount.hidden = true;
    googleFallback.hidden = false;
  } else {
    googleMount.hidden = true;
    googleFallback.hidden = false;
    if (googleNote) {
      googleNote.textContent = state.language === "en"
        ? "Google login requires GOOGLE_CLIENT_ID in the server .env file."
        : "Googleログインにはサーバー .env の GOOGLE_CLIENT_ID 設定が必要です。";
    }
  }

  if (googleNote && google.enabled) {
    googleNote.textContent = googleCallbackHelpText();
  }

  if (apple.enabled && window.AppleID?.auth) {
    if (!oauthUiState.appleInitialized || oauthUiState.appleClientId !== apple.clientId) {
      window.AppleID.auth.init({
        clientId: apple.clientId,
        scope: "name email",
        redirectURI: window.location.origin,
        usePopup: true,
      });
      oauthUiState.appleInitialized = true;
      oauthUiState.appleClientId = apple.clientId;
    }
  }
}

async function handleGoogleCredential(response) {
  oauthUiState.googleBusy = true;
  if (oauthUiState.googleWatchdog) window.clearTimeout(oauthUiState.googleWatchdog);
  oauthUiState.googleWatchdog = window.setTimeout(() => {
    cancelGoogleSignIn();
    setAuthFeedback("Googleログインが応答しませんでした。メールとパスワードで入るか、もう一度お試しください。", "error");
    renderAuthUi();
  }, 20000);
  setAuthFeedback("Googleで確認しています…", "info");
  renderAuthUi();
  try {
    const data = await apiRequest("/auth/google", {
      method: "POST",
      body: JSON.stringify({ credential: response.credential }),
    });
    cancelGoogleSignIn();
    await completeOAuthLogin(data, "Google");
  } catch (error) {
    cancelGoogleSignIn();
    state.status = error.message;
    setAuthFeedback(error.message || "Googleログインに失敗しました。", "error");
    renderAll();
    activateScreen("login");
  }
}

async function signInWithApple() {
  if (!state.auth.providers.apple.enabled || !window.AppleID?.auth) {
    state.status = "Appleログインは現在利用できません。";
    renderAll();
    return;
  }
  try {
    const result = await window.AppleID.auth.signIn();
    const idToken = result?.authorization?.id_token;
    if (!idToken) throw new Error("Appleログイン情報を取得できませんでした。");
    const data = await apiRequest("/auth/apple", {
      method: "POST",
      body: JSON.stringify({ idToken }),
    });
    await completeOAuthLogin(data, "Apple");
  } catch (error) {
    if (error?.error === "popup_closed_by_user") return;
    state.status = error.message || "Appleログインに失敗しました。";
    renderAll();
    activateScreen("login");
  }
}

async function completeOAuthLogin(data, providerLabel) {
  if (data.token) persistAuthToken(data.token);
  state.auth.authenticated = true;
  applyServerUser(data.user);
  const successMessage = `${providerLabel}でログインしました。`;
  state.status = successMessage;
  setAuthFeedback(successMessage, "success");
  await loadSavedToolsFromServer();
  renderAll();
  activateScreen("login");
}

function setAuthFeedback(message, type = "info") {
  state.auth.feedback = message
    ? { type, message }
    : { type: "info", message: "" };
}

function setAuthLoading(loading) {
  state.auth.loading = loading;
}

function renderAuthUi() {
  const loggedInPanel = $("#auth-logged-in-panel");
  const guestPanel = $("#auth-guest-panel");
  const feedback = $("#auth-feedback");
  const user = state.auth.user;
  const isLoggedIn = Boolean(user);

  if (loggedInPanel) loggedInPanel.hidden = !isLoggedIn;
  if (guestPanel) guestPanel.hidden = isLoggedIn;

  const loginTitle = $("#login-screen-title");
  const loginDesc = $("#login-screen-desc");
  const authCardTitle = $("#auth-card-title");
  if (loginTitle) {
    loginTitle.textContent = isLoggedIn
      ? (state.language === "en" ? "You are signed in." : "ログイン済みです。")
      : (state.language === "en" ? "Sign in with your email address." : "メールアドレスでユーザーを判定します。");
  }
  if (loginDesc) {
    loginDesc.textContent = isLoggedIn
      ? (state.language === "en" ? "Your account is active. Continue to Build or sign out below." : "アカウントは有効です。下のボタンから作る画面へ進むか、ログアウトできます。")
      : (state.language === "en" ? "Use email registration, Google, or Apple sign-in." : "メール登録のほか、Google / Apple ログインにも対応します。");
  }
  if (authCardTitle) {
    authCardTitle.textContent = isLoggedIn
      ? (state.language === "en" ? "Account" : "アカウント情報")
      : (state.language === "en" ? "Sign in / Register" : "ログイン / 新規登録");
  }

  if (isLoggedIn) {
    const emailEl = $("#auth-logged-in-email");
    const planEl = $("#auth-logged-in-plan");
    const providerEl = $("#auth-logged-in-provider");
    if (emailEl) emailEl.textContent = user.email;
    if (planEl) planEl.textContent = getPlanLabel(user.subscriptionPlan || "free", state.language);
    if (providerEl) providerEl.textContent = formatAuthProvider(user.authProvider);
  }

  if (feedback) {
    const { type, message } = state.auth.feedback;
    if (message) {
      feedback.hidden = false;
      feedback.className = `auth-feedback auth-feedback-${type}`;
      feedback.textContent = message;
    } else {
      feedback.hidden = true;
      feedback.textContent = "";
    }
  }

  const loginButton = $("#login-button");
  const registerButton = $("#register-button");
  const rememberLabel = $("#auth-remember-label");
  const formHint = $("#auth-form-hint");
  const passwordToggle = $("#auth-password-toggle");
  const loadingLabel = state.language === "en" ? "Processing..." : "処理中…";
  if (rememberLabel) {
    rememberLabel.textContent = state.language === "en"
      ? "Save sign-in info (stay signed in and use browser password save)"
      : "ログイン情報を保存（次回自動ログイン・ブラウザのパスワード保存）";
  }
  if (formHint) {
    formHint.innerHTML = state.language === "en"
      ? "New here? click <strong>Register</strong>. Already registered? click <strong>Sign in</strong>. Your browser can save the password."
      : "初めての方は <strong>新規登録</strong>、登録済みの方は <strong>ログイン</strong> を押してください。パスワードはブラウザ（Chrome / Edge 等）に保存できます。";
  }
  if (passwordToggle && $("#auth-password")?.type === "password") {
    passwordToggle.textContent = state.language === "en" ? "Show" : "表示";
  }
  if (loginButton) {
    loginButton.disabled = state.auth.loading;
    loginButton.textContent = state.auth.loading ? loadingLabel : (state.language === "en" ? "Sign in" : "ログイン");
  }
  if (registerButton) {
    registerButton.disabled = state.auth.loading;
    registerButton.textContent = state.auth.loading ? loadingLabel : (state.language === "en" ? "Register" : "新規登録");
  }

  if (authStatus) {
    if (isLoggedIn) {
      authStatus.textContent = state.language === "en"
        ? "Signed in. Use the green panel above."
        : "ログイン済みです。上の緑色パネルを確認してください。";
    } else if (state.auth.feedback.message) {
      authStatus.textContent = state.auth.feedback.message;
    } else {
      authStatus.textContent = state.language === "en"
        ? "Not signed in. Enter email and password (8+ chars)."
        : "未ログインです。メールとパスワード（8文字以上）を入力してください。";
    }
  }

  const loginNav = document.querySelector('.nav-item[data-screen="login"]');
  if (loginNav) {
    loginNav.textContent = isLoggedIn
      ? (state.language === "en" ? "Account ✓" : "ログイン ✓")
      : (state.language === "en" ? "Login" : "ログイン");
  }
}

async function submitAuth(mode) {
  const email = $("#auth-email").value.trim();
  const password = $("#auth-password").value;
  if (!email || password.length < 8) {
    const message = "メールアドレスと8文字以上のパスワードを入力してください。";
    state.status = message;
    setAuthFeedback(message, "error");
    renderAll();
    activateScreen("login");
    return;
  }

  setAuthLoading(true);
  setAuthFeedback(state.language === "en" ? "Contacting server..." : "サーバーに接続しています…", "info");
  renderAll();

  try {
    setPasswordAutocomplete(mode);
    const data = await apiRequest(`/auth/${mode}`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        remember: shouldRememberLogin(),
      }),
    });
    if (data.token) persistAuthToken(data.token);
    state.auth.authenticated = true;
    applyServerUser(data.user);
    localStorage.setItem(AUTH_REMEMBER_KEY, shouldRememberLogin() ? "true" : "false");
    const emailValue = $("#auth-email")?.value.trim();
    if (shouldRememberLogin() && emailValue) {
      localStorage.setItem(AUTH_EMAIL_KEY, emailValue);
    }
    await offerPasswordSave(email, password);
    const successMessage = mode === "register"
      ? "新規登録が完了しました。ログイン状態です。"
      : "ログインしました。";
    state.status = successMessage;
    setAuthFeedback(successMessage, "success");
    $("#auth-password").value = "";
    await loadSavedToolsFromServer();
    if (state.auth.user) {
      state.status = successMessage;
      setAuthFeedback(successMessage, "success");
    }
  } catch (error) {
    state.status = error.message;
    setAuthFeedback(error.message, "error");
  } finally {
    setAuthLoading(false);
  }
  renderAll();
  activateScreen("login");
}

async function logoutUser() {
  try {
    await apiRequest("/auth/logout", { method: "POST" });
  } catch {
    // オフライン等でもローカル状態はクリアする
  }
  state.auth.token = "";
  state.auth.authenticated = false;
  state.auth.user = null;
  state.settings.paymentStatus = "unpaid";
  state.settings.plan = "free";
  clearAuthToken();
  hydrateSavedAuthEmail();
  const message = "ログアウトしました。";
  state.status = message;
  setAuthFeedback(message, "info");
  renderAll();
  activateScreen("login");
}

async function refreshCurrentUser() {
  try {
    const data = await apiRequest("/auth/me");
    applyServerUser(data.user);
    state.auth.authenticated = true;
    state.status = state.settings.paymentStatus === "paid"
      ? "Stripe Webhookで広告なしプランが確認できました。"
      : "決済完了待ちです。Stripe処理完了後に再度確認してください。";
  } catch (error) {
    state.auth.authenticated = false;
    if (!state.auth.token) {
      state.auth.user = null;
    }
    state.status = error.message;
  }
  renderAll();
}

function applyServerUser(user) {
  state.auth.user = user;
  state.settings.paymentStatus = user?.isAdFree ? "paid" : "unpaid";
  state.settings.plan = user?.subscriptionPlan || "free";
  if (user?.isAdFree && user.subscriptionPlan && user.subscriptionPlan !== "free") {
    persistSelectedPlan(user.subscriptionPlan);
  }
}

function renderPaymentSettings() {
  const paymentStatus = $("#stripe-payment-status");
  const activePlan = state.auth.user?.subscriptionPlan || "free";
  $$("input[name='plan']").forEach((input) => {
    input.checked = state.auth.user?.isAdFree
      ? input.value === activePlan
      : input.value === state.settings.plan;
  });
  if (paymentStatus) {
    if (state.auth.user?.isAdFree) {
      paymentStatus.textContent = state.language === "en"
        ? `Stripe active: ${getPlanLabel(activePlan, "en")}.`
        : `Stripe決済済み：${getPlanLabel(activePlan)}が有効です。`;
    } else {
      paymentStatus.textContent = state.language === "en"
        ? "Unpaid. Choose a plan and pay with Stripe."
        : "未決済です。プランを選び、Stripeで支払うと有効になります。";
    }
  }
  const usageEl = $("#premium-ai-usage");
  if (usageEl) {
    const user = state.auth.user;
    const limit = user?.aiUsageLimit ?? 0;
    if (!user) {
      usageEl.textContent = state.language === "en"
        ? "Operator API usage: log in to view (980¥=50/month, 1250¥=100/month)."
        : "今月の運営API生成：ログイン後に表示（980円＝50回/月、1250円＝100回/月）";
    } else if (limit <= 0) {
      usageEl.textContent = user.isAdFree && user.subscriptionPlan === "adfree"
        ? (state.language === "en"
          ? "¥480 plan: ad-free only. Set your API key or upgrade to ¥980/¥1250 for operator AI."
          : "480円プラン：広告カットのみ。運営APIを使うには980円/1250円プランへ加入するか、自分のAPIキーを設定してください。")
        : (state.language === "en"
          ? "Free plan: blueprint only. Subscribe to ¥980/¥1250 or set your own API key."
          : "無料プラン：設計図のみ。運営APIを使うには980円/1250円プランへ加入するか、自分のAPIキーを設定してください。");
    } else {
      const used = user.aiUsageCount ?? 0;
      const remaining = user.aiUsageRemaining ?? Math.max(0, limit - used);
      usageEl.textContent = state.language === "en"
        ? `Operator API this month: ${used}/${limit} used (${remaining} remaining).`
        : `今月の運営API生成：${used}/${limit} 回使用済み（残り ${remaining} 回）。上限超過後は自分のAPIキーまたは翌月まで。`;
    }
  }
}

async function openStripeCheckout() {
  if (!hasAuthSession()) {
    state.status = "Stripe決済を開始するにはログインしてください。";
    renderAll();
    activateScreen("login");
    return;
  }

  const plan = state.settings.plan;
  if (!PLAN_CATALOG[plan] || plan === "free") {
    state.status = "有料プラン（480円 / 980円 / 1250円）を選んでからStripe決済してください。";
    renderAll();
    activateScreen("settings");
    return;
  }

  try {
    const data = await apiRequest("/billing/create-checkout-session", {
      method: "POST",
      body: JSON.stringify({ plan }),
    });
    persistSelectedPlan(plan);
    window.location.href = data.url;
    state.status = `${getPlanLabel(plan, state.language)}のStripe決済画面を開きました。`;
  } catch (error) {
    state.status = error.message;
  }
  renderAll();
  activateScreen("settings");
}

function renderCategorySelection() {
  $$(".category-card").forEach((card) => {
    card.classList.toggle("active", Number(card.dataset.categoryIndex) === state.selectedCategoryIndex);
  });
}

function renderInvestmentNotice() {
  const selectedCategory = getSelectedCategory();
  const showOnScreen = state.currentScreen === "create" || state.currentScreen === "proposal";
  investmentNotice.hidden = !(showOnScreen && selectedCategory.isInvestment);
}

function renderCreateProgress() {
  $("#create-progress").hidden = !creationScreens.includes(state.currentScreen);
  $$(".step-item").forEach((item) => {
    item.classList.toggle("active", item.dataset.stepScreen === state.currentScreen);
  });
}

function getSelectedCategory() {
  return categories[state.selectedCategoryIndex];
}

function getTheme() {
  return categoryThemes[getSelectedCategory().name] || categoryThemes["自由作成"];
}

function applyThemeDefaults() {
  const theme = getTheme();
  state.answers = {
    purpose: theme.purposeOptions[0],
    market: theme.scopeOptions[0],
    output: theme.outputOptions[0],
  };
  setPlaceholder("#custom-inputs", `例：${theme.defaultInputs}`);
  setPlaceholder("#custom-result", `例：${theme.defaultResult}`);
}

function blankSummaryEdits() {
  return {
    purpose: "",
    user: "",
    inputs: "",
    result: "",
    usage: "",
  };
}

function clearSummaryEdits() {
  state.summaryEdits = { ...blankSummaryEdits() };
}

function renderHearingOptions() {
  const theme = getTheme();
  $("#purpose-question-title").textContent = theme.purposeTitle;
  $("#scope-question-title").textContent = theme.scopeTitle;
  $("#output-question-title").textContent = "どんな形で出力しますか？";
  $("#purpose-options").innerHTML = renderOptionButtons(theme.purposeOptions, "purpose", "choice");
  $("#scope-options").innerHTML = renderOptionButtons(theme.scopeOptions, "market", "pill");
  $("#output-options").innerHTML = renderOptionButtons(theme.outputOptions, "output", "pill");
  setPlaceholder("#custom-inputs", `例：${theme.defaultInputs}`);
  setPlaceholder("#custom-result", `例：${theme.defaultResult}`);
}

function renderOptionButtons(options, question, className) {
  return options
    .map((option) => {
      const active = state.answers[question] === option ? " active" : "";
      const label = state.language === "en" ? translateText(option) : option;
      return `<button class="${className}${active}" data-question="${question}" data-value="${escapeAttribute(option)}">${escapeHtml(label)}</button>`;
    })
    .join("");
}

function getProposals() {
  const category = getSelectedCategory();
  const theme = getTheme();
  const mode = getToolMode();
  const { purpose, market, output } = state.answers;
  const customName = state.custom.toolName;
  const customInputs = state.custom.inputs || theme.defaultInputs;
  const autoHint =
    mode === "stock_picker" ? "テーマ選択だけで注目株を半自動選定"
    : mode === "fx_auto" ? "自動売買向けシグナル・ルールを半自動生成"
    : mode === "crypto_picker" ? "テーマ選択だけで注目コインを半自動選定"
    : mode === "news_digest" ? "分野選択だけで注目ニュースを自動整理"
    : "面倒な下調べや下書きを半自動で進める";
  const base = [
    {
      title: customName || `${purpose.replace(/する$/, "")}ツール`,
      description: `${autoHint}。${market}向けに「${purpose}」し、${output}で見られます。ニュースURLのコピペは不要です。`,
      money: category.money,
      easy: category.easy,
      demand: "★★★★★",
      meta: `必要な操作：${customInputs}`,
    },
    {
      title: `${market}向け${theme.itemLabel}半自動ツール`,
      description: `テーマを選ぶだけで、直近の公開情報から${theme.itemLabel}を候補化し、理由つきで出します。`,
      money: "★★★★☆",
      easy: "★★★★☆",
      demand: "★★★★☆",
      meta: `必要な操作：${customInputs}`,
    },
    {
      title: `考える手間を減らす${category.name}`,
      description: `${purpose}流れを固定し、${output}として毎回同じ形で半自動出力します。`,
      money: "★★★☆☆",
      easy: "★★★☆☆",
      demand: "★★★★☆",
      meta: `必要な操作：${customInputs}`,
    },
  ];

  const offset = state.proposalOffset % base.length;
  return base.slice(offset).concat(base.slice(0, offset));
}

function renderProposals() {
  const proposals = getProposals();
  $$(".proposal-card").forEach((card, index) => {
    const proposal = proposals[index];
    card.classList.toggle("active", index === state.selectedProposalIndex);
    card.classList.toggle("recommended", index === 0);
    card.querySelector(".tag")?.remove();
    if (index === 0) {
      card.insertAdjacentHTML("afterbegin", '<span class="tag">おすすめ</span>');
    }
    card.querySelector("h2").textContent = proposal.title;
    card.querySelector("p").textContent = proposal.description;
    const scores = card.querySelectorAll(".score-list dd");
    scores[0].textContent = proposal.money;
    scores[1].textContent = proposal.easy;
    scores[2].textContent = proposal.demand;
    card.querySelector(".meta").textContent = proposal.meta;
    const button = card.querySelector("[data-action='choose-proposal']");
    button.classList.toggle("primary", index === state.selectedProposalIndex);
    button.classList.toggle("secondary", index !== state.selectedProposalIndex);
  });
}

function selectProposal(index) {
  state.selectedProposalIndex = index;
  clearSummaryEdits();
  prepareNodes();
  renderAll();
}

function shuffleProposals() {
  state.proposalOffset += 1;
  state.selectedProposalIndex = 0;
  clearSummaryEdits();
  prepareNodes();
  renderAll();
  activateScreen("proposal");
}

function refreshCombination() {
  state.proposalOffset += 1;
  state.selectedProposalIndex = 0;
  clearSummaryEdits();
  prepareNodes();
  state.status = "別の組み合わせ例に更新しました。";
  renderAll();
  activateScreen("nodes");
}

function arrangeNodes() {
  const startNode = state.nodes.find(([, , type]) => type === "start");
  const endNode = state.nodes.find(([, , type]) => type === "end");
  const middleNodes = state.nodes.filter(([, , type]) => type !== "start" && type !== "end");
  state.nodes = [startNode, ...middleNodes, endNode].filter(Boolean);
}

function prepareNodes() {
  const theme = getTheme();
  const mode = getToolMode();
  const { purpose, market, output } = state.answers;
  const gather =
    mode === "stock_picker" || mode === "crypto_picker" || mode === "fx_auto" || mode === "news_digest"
      ? [`${market}の直近公開情報を自動参照する部品`, "ユーザーにURL貼り付けを求めず、テーマ材料を集めます", ""]
      : [`${market}の材料を自動で用意する部品`, `${theme.defaultInputs}をもとに不足を補います`, ""];
  const pick =
    mode === "stock_picker" || mode === "crypto_picker"
      ? [`${theme.itemLabel}を半自動選定する部品`, "テーマに合う候補を3〜5件に絞ります", ""]
      : mode === "fx_auto"
        ? ["売買シグナルとルールを半自動作成する部品", "エントリー／決済／リスク条件を整えます", ""]
        : [`${purpose}ための要点を自動抽出する部品`, `${theme.sourceLabel}から必要分だけ抜き出します`, ""];
  state.nodes = [
    ["開始", "テーマを選ぶだけから始める", "start"],
    gather,
    pick,
    [`選定理由・注意点を付ける部品`, "なぜ今か／リスク／買う前チェックを付けます", ""],
    ["AIが読みやすく整える部品", `${getSelectedCategory().name}の目的に沿って意味を整理します`, ""],
    [`${output}に整える部品`, "選んだ出力形式に合わせて見やすくします", ""],
    ["最終出力にする部品", `${state.custom.result || theme.defaultResult}としてまとめます`, ""],
    ["出力", "そのまま判断・利用できる形にします", "end"],
  ];
}

function renderNodes() {
  nodeCanvas.innerHTML = state.nodes
    .map(([title, description, type]) => `<article class="node ${type}">${escapeHtml(title)}<span>${escapeHtml(description)}</span></article>`)
    .join("");

  const flowItems = state.nodes.slice(1, -1).map(([title]) => `<span>${escapeHtml(title.replace("部品", ""))}</span>`).join("");
  $(".agent-flow").innerHTML = flowItems;
}

function renderNodeEditor() {
  if (document.activeElement?.closest("#node-editor-list")) return;
  nodeEditorList.innerHTML = state.nodes
    .map(([title, description], index) => `
      <div class="node-editor-row">
        <input data-node-index="${index}" data-node-field="title" value="${escapeAttribute(title)}" aria-label="部品名 ${index + 1}" />
        <input data-node-index="${index}" data-node-field="description" value="${escapeAttribute(description)}" aria-label="部品内容 ${index + 1}" />
      </div>
    `)
    .join("");
}

function addNode() {
  const title = state.custom.nodeTitle || "確認メモを作る部品";
  const description = state.custom.nodeDescription || "後で見直せる短いメモを追加します";
  state.nodes.splice(-1, 0, [title, description, ""]);
  state.custom.nodeTitle = "";
  state.custom.nodeDescription = "";
  $("#custom-node-title").value = "";
  $("#custom-node-description").value = "";
  state.status = `${title}を追加しました。`;
  renderAll();
  activateScreen("nodes");
}

function removeNode() {
  if (state.nodes.length <= 3) {
    state.status = "開始と出力だけは残す必要があります。";
    renderAll();
    return;
  }
  state.nodes.splice(-2, 1);
  state.status = "最後の作業部品を1つ削除しました。";
  renderAll();
  activateScreen("nodes");
}

function renderBlueprint() {
  const summary = getSummary();
  simpleBlueprint.innerHTML = `
    <article><h3>このツールは何をする？</h3><p>${escapeHtml(summary.purpose)}</p></article>
    <article><h3>誰が使う？</h3><p>${escapeHtml(summary.user)}</p></article>
    <article><h3>何を入れればいい？</h3><p>${escapeHtml(summary.inputs)}</p></article>
    <article><h3>何が出てくる？</h3><p>${escapeHtml(summary.result)}</p></article>
    <article><h3>どう使う？</h3><p>${escapeHtml(summary.usage)}</p></article>
  `;
  detailBlueprint.textContent = buildBlueprintText();
}

function getSummary() {
  const proposal = getSelectedProposal();
  const category = getSelectedCategory();
  const theme = getTheme();
  const { purpose, market, output } = state.answers;
  const targetUser = state.custom.targetUser || "初心者";
  const inputSummary = state.custom.inputs || theme.defaultInputs;
  const resultSummary = state.custom.result || theme.defaultResult;
  return {
    purpose: state.summaryEdits.purpose || `${category.name}のテーマで、${market}を対象に「${purpose}」を行います。`,
    user: state.summaryEdits.user || `${targetUser}が使う想定です。`,
    inputs: state.summaryEdits.inputs || `${inputSummary}（コピペ不要・テーマ選択中心）。`,
    result: state.summaryEdits.result || `${output}で、${resultSummary}を出します。`,
    usage: state.summaryEdits.usage || `提案は「${proposal.title}」。作業の部品を確認してから作成します。`,
  };
}

function renderSummaryEditor() {
  if (document.activeElement?.closest("#blueprint")) return;
  const summary = getSummary();
  $("#edit-summary-purpose").value = summary.purpose;
  $("#edit-summary-user").value = summary.user;
  $("#edit-summary-inputs").value = summary.inputs;
  $("#edit-summary-result").value = summary.result;
  $("#edit-summary-usage").value = summary.usage;
}

function getSelectedProposal() {
  return getProposals()[state.selectedProposalIndex];
}

function buildBlueprintText() {
  const proposal = getSelectedProposal();
  const category = getSelectedCategory();
  const theme = getTheme();
  const summary = getSummary();
  const workflow = state.nodes.map(([title]) => title).join(" -> ");
  return `tool_name: ${proposal.title}
category: ${category.name}
purpose: ${state.answers.purpose}
target_user: ${state.custom.targetUser || "初心者"}
target_scope: ${state.answers.market}
source_type: ${theme.sourceLabel}
target_items: ${theme.itemLabel}
custom_inputs: ${state.custom.inputs || theme.defaultInputs}
custom_result: ${state.custom.result || theme.defaultResult}
output_format: ${state.answers.output}
summary_purpose: ${summary.purpose}
summary_user: ${summary.user}
summary_inputs: ${summary.inputs}
summary_result: ${summary.result}
summary_usage: ${summary.usage}
workflow: ${workflow}
required_data: ${proposal.meta.replace("必要なデータ：", "")}
required_api_keys: Google Gemini API key（推奨）または OpenAI API key
folders: config, prompts, workflow, output
error_handling: 入力不足、APIキー未設定、取得失敗を画面に表示
prompt: テーマ選択だけで半自動結果を出す。投資系は注目候補+理由、FXは自動売買向けシグナル/ルール、その他は面倒な下調べや下書きを自動化する
note: ユーザーにニュースURLや長文コピペを要求しない。Geminiは公開情報を参照し、投資助言・利益保証・実注文執行はしない。正確な価格が不明なら断定しない`;
}

function renderExport() {
  $$(".export-card").forEach((card) => {
    card.classList.toggle("active", card.dataset.exportFormat === state.exportFormat);
  });

  // 上級者向けプレビュー（公開フロー時はZIP文言を出さない）
  if (exportPreview && state.exportFormat !== "publish") {
    try {
      exportPreview.textContent = getExportText(state.exportFormat);
    } catch (error) {
      console.error(error);
      exportPreview.textContent = `プレビュー生成エラー: ${error.message || error}`;
    }
  }
  renderApiFormatNotice();
  if (exportStatus) exportStatus.textContent = state.status;
  renderExportStatusOnly();
}

function renderApiFormatNotice() {
  const apiRequiredFormats = {
    html: "HTML形式は1ファイルで完結し、開くだけで使えます。APIキーはファイルに埋め込まず、起動時に入力（またはStudioからの一時受け渡し）します。",
    api: "APIキー入力形式は、Gemini / OpenAI のAPIキーを出力ツールの画面に入れると単体で実行できます（ファイルには書き込みません）。",
    codex: "Codex用ツール作成内容は、Codex側で外部APIキーや実行環境を設定しないと実行できない場合があります。",
    claude: "Claude Code用ツール作成内容は、Claude Code側でAPIキーや必要な実行環境を設定しないと実行できない場合があります。",
  };
  const message = apiRequiredFormats[state.exportFormat];
  apiFormatNotice.hidden = !message;
  apiFormatNotice.textContent = message || "";
}

function getToolMode() {
  const name = getSelectedCategory()?.name;
  if (name === "株投資ツール") return "stock_picker";
  if (name === "FXツール") return "fx_auto";
  if (name === "仮想通貨ツール") return "crypto_picker";
  if (name === "ニュース分析ツール") return "news_digest";
  if (name === "ブログ記事作成ツール" || name === "SNS運用ツール" || name === "YouTube動画制作ツール") return "content_auto";
  return "task_auto";
}

function requiresNewsGrounding(mode = getToolMode()) {
  return mode === "stock_picker" || mode === "crypto_picker" || mode === "news_digest";
}

function getTopicPresets() {
  const category = getSelectedCategory();
  const theme = getTheme();
  const map = {
    "株投資ツール": ["AI・半導体", "防衛", "電力・再エネ", "高配当", "インバウンド", "バイオ", "銀行・金利", "日経注目"],
    "FXツール": ["ドル円", "ユーロドル", "ゴールド", "スキャル", "スイング", "指標トレード"],
    "ニュース分析ツール": ["テック", "経済", "金融", "国内", "海外"],
    "仮想通貨ツール": ["BTC", "ETH", "AI関連コイン", "Solana生態系", "DeFi", "ミーム"],
    "SNS運用ツール": ["告知投稿", "教育投稿", "共感投稿", "セールス投稿"],
    "YouTube動画制作ツール": ["初心者解説", "ランキング", "比較", "ハウツー"],
    "営業集客ツール": ["新規開拓", "既存フォロー", "問い合わせ返信", "提案"],
    "資料作成ツール": ["提案資料", "社内共有", "企画書", "報告"],
    "メニュー表チラシ制作ツール": ["期間限定", "ランチ", "キャンペーン", "季節"],
    "事務作業自動化ツール": ["案内文", "議事録", "依頼メール", "チェックリスト"],
    "求人採用ツール": ["求人票", "スカウト", "面接質問", "魅力訴求"],
    "ブログ記事作成ツール": ["SEOまとめ", "ハウツー", "比較", "初心者向け"],
    "教育学習ツール": ["学習計画", "復習", "問題作成", "用語解説"],
    "店舗運営ツール": ["口コミ返信", "販促", "季節キャンペーン", "接客"],
    "自由作成": ["候補出し", "自動整理", "チェックリスト", "下書き"],
  };
  return (map[category?.name] || theme.scopeOptions || ["人気テーマ", "初心者向け", "最新動向"]).slice(0, 8);
}

/** テーマチップを、ツールがすぐ動く指定へ広げる */
function expandTopicFromChip(chip) {
  const mode = getToolMode();
  const key = String(chip || "").trim();
  if (!key) return "";
  if (mode === "stock_picker") return `${key}テーマの注目株を半自動選定`;
  if (mode === "fx_auto") return `${key}の自動売買向けシグナル・ルール`;
  if (mode === "crypto_picker") return `${key}テーマの注目コインを半自動選定`;
  if (mode === "news_digest") return `${key}分野の今日の注目を自動整理`;
  if (mode === "content_auto") return `${key}のコンテンツを半自動作成`;
  return `${key}を半自動で進める`;
}

function escapeInlineScript(code) {
  return String(code || "").replace(/<\/(script)/gi, "<\\/$1");
}



function getModeToolLabelOverrides(mode, isEnglish) {
  if (isEnglish) {
    if (mode === "stock_picker" || mode === "crypto_picker") {
      const unit = mode === "stock_picker" ? "stocks" : "coins";
      return {
        paste: `Tap a theme chip, then press Find ${unit}. No news URL paste.`,
        generate: `Find ${unit}`,
        result: `Review the ${unit} shortlist and reasons.`,
        inputTitle: "1. Pick a theme",
        genre: "Theme",
        topic: "Theme (auto-filled)",
        topicPlaceholder: mode === "stock_picker" ? "Example: AI / semiconductors" : "Example: AI coins",
        moreOptions: "Optional tweaks",
        angle: "Risk preference (optional)",
        anglePlaceholder: "Example: beginner / avoid high risk",
        length: "How many candidates",
        length1500: "About 3",
        length3000: "About 5 (recommended)",
        length5000: "About 8",
        outputTitle: mode === "stock_picker" ? "Stock shortlist" : "Coin shortlist",
        statusNoKey: "Live mode needs a published URL. Try demo mode first.",
        needKeyTitle: "Publish required",
        needKeyButton: "Retry in demo",
        needKeyHelp: "Demo works locally. For live AI, publish a URL in NENE Studio.",
        accepted: "Request accepted.",
        analyzing: "AI is analyzing…",
        slowHint: "Taking longer than usual.",
        generating: "AI is analyzing…",
        generatingButton: "Working...",
        waitHint: "AI is analyzing…",
        complete: "Shortlist ready.",
        note: "Theme → shortlist. Recent public info is used when available. No URL paste.",
        disclaimer: "Not investment advice. Verify latest prices before buying. This tool does not place orders.",
        demoMode: "Demo (dummy)",
        liveMode: "Live (published URL)",
        demoBadge: "[DEMO]",
      };
    }
    if (mode === "fx_auto") {
      return {
        paste: "Tap a pair/style chip, then press Make signals. No news URL paste.",
        generate: "Make signals / rules",
        result: "Review auto-trading style signals and rules.",
        inputTitle: "1. Pick pair / style",
        genre: "Pair / style",
        topic: "Focus (auto-filled)",
        topicPlaceholder: "Example: USDJPY swing",
        moreOptions: "Optional tweaks",
        angle: "Style (optional)",
        anglePlaceholder: "Example: scalping / swing / news",
        length: "Detail level",
        length1500: "Short",
        length3000: "Standard (recommended)",
        length5000: "Detailed",
        outputTitle: "Auto-trading signals / rules",
        statusNoInput: "Tap a chip first.",
        statusNoKey: "Live mode needs a published URL. Try demo mode first.",
        needKeyTitle: "Publish required",
        needKeyButton: "Retry in demo",
        needKeyHelp: "Demo works locally. For live AI, publish a URL in NENE Studio.",
        accepted: "Request accepted.",
        analyzing: "AI is analyzing…",
        slowHint: "Taking longer than usual.",
        generating: "AI is analyzing…",
        generatingButton: "Working...",
        waitHint: "AI is analyzing…",
        complete: "Signals ready.",
        note: "Pair/style → auto-trading oriented rules. This tool does not place live orders.",
        disclaimer: "Not investment advice. No live broker orders from this file. Use rules at your own risk.",
        demoMode: "Demo (dummy)",
        liveMode: "Live (published URL)",
        demoBadge: "[DEMO]",
      };
    }
    if (mode === "news_digest") {
      return {
        paste: "Tap a field chip, then press Auto-summarize.",
        generate: "Auto-summarize",
        result: "Review today's must-know topics.",
        inputTitle: "1. Pick a field",
        outputTitle: "Today's digest",
        accepted: "Request accepted.",
        analyzing: "AI is analyzing…",
        slowHint: "Taking longer than usual.",
        generating: "AI is analyzing…",
        generatingButton: "Working...",
        waitHint: "AI is analyzing…",
        complete: "Digest ready.",
        note: "Field → automatic digest. No article URL paste.",
        demoMode: "Demo (dummy)",
        liveMode: "Live (published URL)",
        demoBadge: "[DEMO]",
      };
    }
    return {
      paste: "Tap a theme, then press Run. No long paste required.",
      generate: "Run semi-auto",
      result: "Review the ready-to-use result.",
      note: "Theme → semi-automatic result. Minimize manual research.",
      outputTitle: "Result",
      accepted: "Request accepted.",
      analyzing: "AI is analyzing…",
      slowHint: "Taking longer than usual.",
      generating: "AI is analyzing…",
      generatingButton: "Working...",
      waitHint: "AI is analyzing…",
      complete: "Done.",
      demoMode: "Demo (dummy)",
      liveMode: "Live (published URL)",
      demoBadge: "[DEMO]",
    };
  }

  if (mode === "stock_picker" || mode === "crypto_picker") {
    const unit = mode === "stock_picker" ? "銘柄" : "コイン";
    return {
      paste: `テーマを1つ押して「${unit}を選定する」。ニュースURLのコピペは不要です。`,
      generate: `${unit}を選定する`,
      result: `注目${unit}と選定理由が表示されます。`,
      inputTitle: "1. テーマを選ぶ",
      genre: "テーマ",
      topic: "テーマ（ボタンで自動入力）",
      topicPlaceholder: mode === "stock_picker" ? "例：AI・半導体" : "例：AI関連コイン",
      moreOptions: "任意設定",
      angle: "リスクの好み（任意）",
      anglePlaceholder: "例：初心者向け、高リスク回避",
      length: "候補の数",
      length1500: "約3件",
      length3000: "約5件（おすすめ）",
      length5000: "約8件",
      outputTitle: mode === "stock_picker" ? "注目株リスト" : "注目コインリスト",
      statusNoInput: "先にテーマボタンを押してください。",
      statusNoKey: "本番実行には公開URLが必要です。まずはお試しモードで操作を確認してください。",
      needKeyTitle: "公開が必要です",
      needKeyButton: "お試しで再実行",
      needKeyHelp: "お試し（ダミー）のみローカルで動きます。本番はNENE Studioで公開URLを発行してください。",
      accepted: "処理を受け付けました。",
      analyzing: "AIが分析しています…",
      slowHint: "通常より時間が掛かっています。",
      generating: "AIが分析しています…",
      generatingButton: "処理中...",
      waitHint: "AIが分析しています…",
      complete: "選定できました。",
      note: "テーマを押す → 選定するだけ。直近の公開情報を参照します。URLコピペ不要。",
      disclaimer: "投資助言ではありません。買う前に最新価格を確認してください。このツールは注文しません。",
      demoMode: "お試し（ダミー）",
      liveMode: "本番（公開URL）",
      demoBadge: "【お試しモード】",
    };
  }
  if (mode === "fx_auto") {
    return {
      paste: "通貨ペア／手法を押して「シグナルを作る」。ニュースURLのコピペは不要です。",
      generate: "シグナル／ルールを作る",
      result: "自動売買向けのシグナルとルールが表示されます。",
      inputTitle: "1. ペア／手法を選ぶ",
      genre: "ペア／手法",
      topic: "対象（ボタンで自動入力）",
      topicPlaceholder: "例：ドル円スイング",
      moreOptions: "任意設定",
      angle: "スタイル（任意）",
      anglePlaceholder: "例：スキャル、スイング、指標",
      length: "詳細さ",
      length1500: "短め",
      length3000: "標準（おすすめ）",
      length5000: "詳しく",
      outputTitle: "自動売買シグナル／ルール",
      statusNoInput: "先にボタンを押してください。",
      statusNoKey: "本番実行には公開URLが必要です。まずはお試しモードで操作を確認してください。",
      needKeyTitle: "公開が必要です",
      needKeyButton: "お試しで再実行",
      needKeyHelp: "お試し（ダミー）のみローカルで動きます。本番はNENE Studioで公開URLを発行してください。",
      accepted: "処理を受け付けました。",
      analyzing: "AIが分析しています…",
      slowHint: "通常より時間が掛かっています。",
      generating: "AIが分析しています…",
      generatingButton: "処理中...",
      waitHint: "AIが分析しています…",
      complete: "作成できました。",
      note: "ペア／手法 → 自動売買向けルール。このツール自体は実注文しません。",
      disclaimer: "投資助言ではありません。ブローカーへの自動発注は別途設定が必要です。自己責任で使ってください。",
      demoMode: "お試し（ダミー）",
      liveMode: "本番（公開URL）",
      demoBadge: "【お試しモード】",
    };
  }
  if (mode === "news_digest") {
    return {
      paste: "分野を押して「自動で整理する」。記事URLのコピペは不要です。",
      generate: "自動で整理する",
      result: "今日の注目トピックが表示されます。",
      inputTitle: "1. 分野を選ぶ",
      outputTitle: "今日の注目まとめ",
      accepted: "処理を受け付けました。",
      analyzing: "AIが分析しています…",
      slowHint: "通常より時間が掛かっています。",
      generating: "AIが分析しています…",
      generatingButton: "処理中...",
      waitHint: "AIが分析しています…",
      complete: "整理できました。",
      note: "分野を選ぶだけで自動整理。記事URLのコピペは不要です。",
      demoMode: "お試し（ダミー）",
      liveMode: "本番（公開URL）",
      demoBadge: "【お試しモード】",
    };
  }
  return {
    paste: "テーマを押して「半自動で実行」。長いコピペは不要です。",
    generate: "半自動で実行",
    result: "すぐ使える結果が表示されます。",
    note: "テーマ選択 → 半自動実行。面倒な下調べや下書きを減らします。",
    outputTitle: "実行結果",
    accepted: "処理を受け付けました。",
    analyzing: "AIが分析しています…",
    slowHint: "通常より時間が掛かっています。",
    generating: "AIが分析しています…",
    generatingButton: "処理中...",
    waitHint: "AIが分析しています…",
    complete: "完了しました。",
    demoMode: "お試し（ダミー）",
    liveMode: "本番（公開URL）",
    demoBadge: "【お試しモード】",
  };
}

function getStudioApiBase() {
  return String(window.NENE_CONFIG?.apiBase || "/api").replace(/\/$/, "");
}

function isPhoneViewport() {
  return window.matchMedia("(max-width: 720px)").matches
    || /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent || "");
}

function isLoopbackHostName(host) {
  const name = String(host || "").toLowerCase();
  return name === "localhost" || name === "127.0.0.1" || name === "[::1]";
}

function isPrivateLanHostName(host) {
  const name = String(host || "").toLowerCase();
  if (name.endsWith(".local")) return true;
  const parts = name.split(".");
  if (parts.length !== 4 || parts.some((part) => !/^\d{1,3}$/.test(part))) return false;
  const a = Number(parts[0]);
  const b = Number(parts[1]);
  if (a === 10 || a === 127) return true;
  if (a === 192 && b === 168) return true;
  if (a === 172 && b >= 16 && b <= 31) return true;
  return false;
}

/** localhost / LAN の公開URLはスマホでは開けないことが多いので、今開いている住所に直す */
function toPhoneReachableUrl(url) {
  if (!url) return "";
  try {
    const parsed = new URL(url, location.href);
    const host = parsed.hostname.toLowerCase();
    const pageHost = String(location.hostname || "").toLowerCase();
    const urlIsLocal = isLoopbackHostName(host) || isPrivateLanHostName(host);
    const pageIsPublic = pageHost && !isLoopbackHostName(pageHost) && !isPrivateLanHostName(pageHost);
    if (urlIsLocal && (pageIsPublic || isPrivateLanHostName(pageHost))) {
      parsed.protocol = location.protocol;
      parsed.hostname = location.hostname;
      parsed.port = location.port;
    }
    return parsed.toString();
  } catch {
    return url;
  }
}

function openPublishedTool(url) {
  const reachable = toPhoneReachableUrl(url);
  if (!reachable) return false;
  if (isPhoneViewport()) {
    window.location.assign(reachable);
    return true;
  }
  const opened = window.open(reachable, "_blank", "noopener");
  if (!opened) window.location.assign(reachable);
  return true;
}

/* =========================================================================
 * ツールレシピ
 * 1ツール種 = 1定義。新しい種類を増やすときは TOOL_RECIPES に1件足すだけ。
 * 画面・CSS・実行時の処理は全ツール共通のものを使うため、コードは触らない。
 * ======================================================================= */

const TOOL_RECIPES = [
  {
    id: "stock_picker",
    categories: ["株投資ツール"],
    runLabel: "この内容で選定する",
    rerunLabel: "もう一度、この内容で選定する",
    busyLabel: "選定中…",
    resultTitle: "選定結果",
    leadText: "選んで押すだけ。直近の公開情報から候補と理由をまとめます。",
    requireSearch: true,
    progress: [
      "直近ニュースを確認しています…",
      "候補をしぼり込んでいます…",
      "選定理由をまとめています…",
    ],
    fields: ["選定理由", "関連ニュース", "発表日", "情報源", "リスク"],
    checklistTitle: "買う前チェック",
    disclaimer: "投資助言ではありません。売買の判断はご自身で行ってください。このツールは注文を出しません。",
    rules: [
      "Google検索で直近ニュースを確認してから選ぶ。検索で根拠が取れない候補は出さない。",
      "情報源の優先順位は 1)適時開示・決算 2)官公庁 3)企業公式 4)取引所 5)大手報道。掲示板・SNSだけを根拠にしない。",
      "正確な株価・時価総額が不明なら断定しない。",
      "候補が無ければ items を空配列にして、summary に「本日の条件では有力候補なし」と書く。",
      "投資助言・利益保証・実際の注文はしない。最終判断はユーザーに委ねる。",
    ],
    axes: [
      {
        id: "theme",
        label: "どのテーマ？",
        promptLabel: "テーマ",
        free: true,
        freePlaceholder: "例：宇宙・衛星ビジネス",
        options: ["AI・半導体", "防衛", "電力・再エネ", "高配当", "インバウンド", "円安メリット", "医療・バイオ", "銀行・金利"],
      },
      {
        id: "stance",
        label: "どう持ちたい？",
        promptLabel: "保有スタンス",
        free: true,
        freePlaceholder: "例：NISA枠で長期、値動きの小さいもの",
        defaultIndex: 1,
        options: ["数日〜数週間", "数か月", "1年以上", "配当をもらう"],
      },
      {
        id: "risk",
        label: "リスクはどこまで？",
        promptLabel: "リスク許容度",
        options: ["安定重視", "バランス", "値動き歓迎"],
      },
      {
        id: "count",
        label: "何件ほしい？",
        promptLabel: "件数",
        defaultIndex: 1,
        options: ["3件", "5件", "8件"],
        optionLabels: ["3件（速い）", "5件", "8件（詳しい）"],
      },
    ],
  },

  {
    id: "crypto_picker",
    categories: ["仮想通貨ツール"],
    runLabel: "この内容で選定する",
    rerunLabel: "もう一度、この内容で選定する",
    busyLabel: "選定中…",
    resultTitle: "選定結果",
    leadText: "選んで押すだけ。直近の公開情報から候補と理由をまとめます。",
    requireSearch: true,
    progress: ["直近ニュースを確認しています…", "候補をしぼり込んでいます…", "選定理由をまとめています…"],
    fields: ["選定理由", "関連ニュース", "発表日", "情報源", "リスク"],
    checklistTitle: "買う前チェック",
    disclaimer: "投資助言ではありません。価格変動が大きい資産です。判断はご自身で行ってください。",
    rules: [
      "Google検索で直近ニュースを確認してから選ぶ。根拠が取れない候補は出さない。",
      "情報源は公式発表・取引所・大手報道を優先する。SNSの噂だけを根拠にしない。",
      "正確な価格・時価総額が不明なら断定しない。",
      "候補が無ければ items を空配列にして、summary に「本日の条件では有力候補なし」と書く。",
    ],
    axes: [
      { id: "theme", label: "どのテーマ？", promptLabel: "テーマ", free: true, freePlaceholder: "例：分散型ストレージ", options: ["BTC", "ETH", "AI関連", "Solana圏", "DeFi", "ステーブル関連", "ゲーム系", "ミーム"] },
      { id: "stance", label: "どう持ちたい？", promptLabel: "保有スタンス", defaultIndex: 1, options: ["数日〜数週間", "数か月", "1年以上"] },
      { id: "risk", label: "リスクはどこまで？", promptLabel: "リスク許容度", options: ["安定重視", "バランス", "値動き歓迎"] },
      { id: "count", label: "何件ほしい？", promptLabel: "件数", defaultIndex: 1, options: ["3件", "5件", "8件"] },
    ],
  },

  {
    id: "fx_auto",
    categories: ["FXツール"],
    runLabel: "この内容でルールを作る",
    rerunLabel: "もう一度、この内容で作る",
    busyLabel: "作成中…",
    resultTitle: "売買ルール",
    leadText: "選んで押すだけ。エントリーから損切りまでの条件を整理します。",
    requireSearch: false,
    progress: ["相場の前提を整理しています…", "条件を組み立てています…", "リスク管理を付けています…"],
    fields: ["エントリー条件", "損切り", "利確", "見送り条件", "この条件の根拠"],
    checklistTitle: "取引前チェック",
    disclaimer: "投資助言ではありません。このツールは注文を出しません。必ずご自身で検証してください。",
    rules: [
      "証券会社・取引所への接続や実際の注文は行わない。ルールの提示だけにとどめる。",
      "エントリー・損切り・利確・見送りの4点を必ずそろえる。片方だけにしない。",
      "「必ず勝てる」等の断定表現は使わない。想定が外れる条件も書く。",
      "検証していない数値を断定しない。目安であることを明記する。",
    ],
    axes: [
      { id: "pair", label: "どの通貨ペア？", promptLabel: "通貨ペア", free: true, freePlaceholder: "例：豪ドル円", options: ["ドル円", "ユーロドル", "ユーロ円", "ポンド円", "ゴールド", "主要通貨全体"] },
      { id: "style", label: "どんな取引スタイル？", promptLabel: "取引スタイル", defaultIndex: 1, options: ["スキャルピング", "デイトレード", "スイング", "自動売買（EA）向け"] },
      { id: "risk", label: "リスクはどこまで？", promptLabel: "リスク許容度", options: ["低め", "ふつう", "高め"] },
    ],
  },

  {
    id: "news_digest",
    categories: ["ニュース分析ツール"],
    runLabel: "この内容でまとめる",
    rerunLabel: "もう一度、この内容でまとめる",
    busyLabel: "整理中…",
    resultTitle: "今日の注目",
    leadText: "選んで押すだけ。今おさえるべき話題を理由つきで整理します。",
    requireSearch: true,
    progress: ["最新のニュースを集めています…", "重要度で並べ替えています…", "要点をまとめています…"],
    fields: ["要点", "なぜ重要か", "発表日", "情報源", "次にすること"],
    checklistTitle: "読むときの注意",
    disclaimer: "内容は自動生成です。重要な判断の前は必ず一次情報を確認してください。",
    rules: [
      "Google検索で直近の公開情報を確認してからまとめる。裏付けのない話題は出さない。",
      "情報源は一次情報（公式発表・官公庁）を優先し、媒体名を必ず書く。",
      "推測と事実を混ぜない。分からないことは「不明」と書く。",
    ],
    axes: [
      { id: "field", label: "どの分野？", promptLabel: "分野", free: true, freePlaceholder: "例：物流・運送業界", options: ["テック", "経済", "金融", "国内", "海外", "AI", "エネルギー", "医療"] },
      { id: "want", label: "何が知りたい？", promptLabel: "知りたいこと", options: ["今日の要点", "背景と経緯", "自分への影響", "次に来そうなこと"] },
      { id: "count", label: "何件ほしい？", promptLabel: "件数", defaultIndex: 1, options: ["3件", "5件", "8件"] },
    ],
  },

  {
    id: "sns_post",
    categories: ["SNS運用ツール"],
    runLabel: "この内容で投稿文を作る",
    rerunLabel: "もう一度、この内容で作る",
    busyLabel: "作成中…",
    resultTitle: "投稿案",
    leadText: "選んで押すだけ。そのまま貼れる投稿文ができます。",
    requireSearch: false,
    progress: ["切り口を考えています…", "投稿文を書いています…", "読みやすさを整えています…"],
    fields: ["投稿文", "この投稿の狙い", "ハッシュタグ", "投稿するタイミング"],
    checklistTitle: "投稿前チェック",
    disclaimer: "内容は自動生成です。投稿前に事実と表現を必ず確認してください。",
    rules: [
      "投稿文はコピーしてそのまま貼れる完成形で書く。書き方の説明で終えない。",
      "SNSごとの文字数・作法に合わせる（Xは短く、Instagramは改行を多めに）。",
      "誇大表現・断定的な効果保証は使わない。",
    ],
    axes: [
      { id: "sns", label: "どのSNS？", promptLabel: "SNS", options: ["X（旧Twitter）", "Instagram", "TikTok", "YouTube Shorts", "Facebook"] },
      { id: "purpose", label: "何のための投稿？", promptLabel: "投稿の目的", free: true, freePlaceholder: "例：新商品の予約開始を知らせる", options: ["告知", "教育・お役立ち", "共感・体験談", "セールス", "日常・裏側"] },
      { id: "tone", label: "どんな雰囲気で？", promptLabel: "トーン", defaultIndex: 1, options: ["ていねい", "フレンドリー", "プロっぽく", "おもしろく"] },
      { id: "count", label: "何本ほしい？", promptLabel: "本数", defaultIndex: 1, options: ["3本", "5本", "10本"] },
    ],
  },

  {
    id: "youtube_plan",
    categories: ["YouTube動画制作ツール"],
    runLabel: "この内容で構成を作る",
    rerunLabel: "もう一度、この内容で作る",
    busyLabel: "作成中…",
    resultTitle: "動画の構成案",
    leadText: "選んで押すだけ。タイトルから台本の流れまで出します。",
    requireSearch: false,
    progress: ["切り口を考えています…", "構成を組み立てています…", "見出しを整えています…"],
    fields: ["タイトル案", "最初の10秒", "本編の流れ", "サムネイル文言", "注意点"],
    checklistTitle: "撮る前チェック",
    disclaimer: "内容は自動生成です。事実確認と権利関係の確認は必ず行ってください。",
    rules: [
      "最初の10秒は視聴者が離脱しない具体的なフックにする。あいさつだけにしない。",
      "本編の流れは、そのまま話せる順番と内容で書く。",
      "サムネイル文言は13文字以内を目安にする。",
    ],
    axes: [
      { id: "theme", label: "どのテーマ？", promptLabel: "テーマ", free: true, freePlaceholder: "例：はじめての家庭菜園", options: ["初心者解説", "ランキング", "比較・検証", "ハウツー", "体験談", "ニュース解説"] },
      { id: "length", label: "どれくらいの長さ？", promptLabel: "動画の長さ", defaultIndex: 1, options: ["ショート（60秒）", "5分前後", "10分以上"] },
      { id: "tone", label: "どんな雰囲気で？", promptLabel: "トーン", defaultIndex: 1, options: ["落ち着いて", "テンポよく", "ゆるく親しみやすく"] },
    ],
  },

  {
    id: "sales_outreach",
    categories: ["営業集客ツール"],
    runLabel: "この内容で文章を作る",
    rerunLabel: "もう一度、この内容で作る",
    busyLabel: "作成中…",
    resultTitle: "営業文の案",
    leadText: "選んで押すだけ。そのまま送れる文面ができます。",
    requireSearch: false,
    progress: ["相手の状況を想定しています…", "文面を書いています…", "言い回しを整えています…"],
    fields: ["件名", "本文", "この文の狙い", "返信が来たら次にすること"],
    checklistTitle: "送る前チェック",
    disclaimer: "内容は自動生成です。会社名・数値・条件は送る前に必ず確認してください。",
    rules: [
      "本文はコピーしてそのまま送れる完成形で書く。差し替える箇所は【 】で示す。",
      "誇大表現や根拠のない実績は書かない。",
      "長すぎない分量にする（メールは400字前後、DMは200字前後を目安）。",
    ],
    axes: [
      { id: "scene", label: "どんな場面？", promptLabel: "場面", free: true, freePlaceholder: "例：展示会で名刺交換した相手へのお礼", options: ["新規開拓", "追客・フォロー", "問い合わせ返信", "提案", "断られた後の再アプローチ"] },
      { id: "channel", label: "どの手段で送る？", promptLabel: "送る手段", options: ["メール", "SNSのDM", "電話の台本", "問い合わせフォーム"] },
      { id: "target", label: "相手はどんな人？", promptLabel: "相手", free: true, freePlaceholder: "例：地方の小規模な工務店の社長", options: ["法人の担当者", "法人の決裁者", "個人のお客様", "既存のお客様"] },
      { id: "tone", label: "どんな雰囲気で？", promptLabel: "トーン", options: ["ていねい", "簡潔に", "親しみやすく"] },
    ],
  },

  {
    id: "doc_builder",
    categories: ["資料作成ツール"],
    runLabel: "この内容で資料の骨組みを作る",
    rerunLabel: "もう一度、この内容で作る",
    busyLabel: "作成中…",
    resultTitle: "資料の構成案",
    leadText: "選んで押すだけ。ページごとの見出しと話す内容が出ます。",
    requireSearch: false,
    progress: ["伝える順番を考えています…", "各ページの中身を作っています…", "整えています…"],
    fields: ["ページの見出し", "話す内容", "入れると良い図表", "注意点"],
    checklistTitle: "出す前チェック",
    disclaimer: "内容は自動生成です。数値・固有名詞は必ず原典と照合してください。",
    rules: [
      "1ページ1メッセージで構成する。",
      "「話す内容」は、そのまま読めば説明できる具体的な文で書く。",
      "数値は勝手に作らない。入れるべき箇所は【要確認】と書く。",
    ],
    axes: [
      { id: "kind", label: "どんな資料？", promptLabel: "資料の種類", free: true, freePlaceholder: "例：補助金申請用の事業計画", options: ["提案書", "企画書", "報告書", "社内共有", "説明資料"] },
      { id: "audience", label: "誰に見せる？", promptLabel: "相手", options: ["社内メンバー", "取引先", "経営層", "その分野に詳しくない人"] },
      { id: "pages", label: "何ページくらい？", promptLabel: "分量", defaultIndex: 1, options: ["5ページ", "10ページ", "20ページ"] },
    ],
  },

  {
    id: "flyer_menu",
    categories: ["メニュー表チラシ制作ツール"],
    runLabel: "この内容で文面を作る",
    rerunLabel: "もう一度、この内容で作る",
    busyLabel: "作成中…",
    resultTitle: "チラシ・メニューの文面",
    leadText: "選んで押すだけ。そのまま使えるキャッチと説明文が出ます。",
    requireSearch: false,
    progress: ["訴求点を考えています…", "文面を書いています…", "見せ方を整えています…"],
    fields: ["キャッチコピー", "説明文", "価格の見せ方", "配置の提案"],
    checklistTitle: "印刷前チェック",
    disclaimer: "内容は自動生成です。価格・期間・法令表示は必ず確認してください。",
    rules: [
      "キャッチコピーは20文字以内を目安に、具体的な利点を入れる。",
      "説明文はそのまま印刷できる完成形で書く。",
      "価格や期間は勝手に作らず、【要記入】と書く。",
      "景品表示法に触れる断定的な表現（日本一・完全無欠など）は使わない。",
    ],
    axes: [
      { id: "business", label: "どんなお店？", promptLabel: "業種", free: true, freePlaceholder: "例：住宅街の小さなパン屋", options: ["飲食店", "美容室・サロン", "小売店", "教室・スクール", "整体・治療院"] },
      { id: "purpose", label: "何を伝えたい？", promptLabel: "目的", options: ["新メニュー", "期間限定", "割引・特典", "季節のおすすめ", "リニューアル"] },
      { id: "mood", label: "どんな雰囲気で？", promptLabel: "雰囲気", defaultIndex: 1, options: ["高級感", "親しみやすい", "にぎやか", "シンプル"] },
    ],
  },

  {
    id: "office_auto",
    categories: ["事務作業自動化ツール"],
    runLabel: "この内容で文章を作る",
    rerunLabel: "もう一度、この内容で作る",
    busyLabel: "作成中…",
    resultTitle: "作成した文章",
    leadText: "選んで押すだけ。そのまま使える文面ができます。",
    requireSearch: false,
    progress: ["必要な項目を整理しています…", "文章を書いています…", "体裁を整えています…"],
    fields: ["そのまま使える文", "使いどころ", "差し替える箇所", "注意点"],
    checklistTitle: "使う前チェック",
    disclaimer: "内容は自動生成です。日付・宛名・金額は必ず確認してください。",
    rules: [
      "文章はコピーしてそのまま使える完成形で書く。差し替える箇所は【 】で示す。",
      "日付・金額・固有名詞を勝手に作らない。",
      "社外向けは敬語、社内向けは簡潔に、と使い分ける。",
    ],
    axes: [
      { id: "kind", label: "何を作る？", promptLabel: "作るもの", free: true, freePlaceholder: "例：取引先への値上げのお願い", options: ["案内文", "議事録の型", "依頼メール", "チェックリスト", "報告書", "お詫び文"] },
      { id: "audience", label: "誰に出す？", promptLabel: "相手", options: ["社内", "取引先", "お客様", "行政・公的機関"] },
      { id: "tone", label: "どんな雰囲気で？", promptLabel: "トーン", options: ["ていねい", "簡潔に", "かたく正式に"] },
    ],
  },

  {
    id: "recruit",
    categories: ["求人採用ツール"],
    runLabel: "この内容で文章を作る",
    rerunLabel: "もう一度、この内容で作る",
    busyLabel: "作成中…",
    resultTitle: "採用文の案",
    leadText: "選んで押すだけ。そのまま使える採用文ができます。",
    requireSearch: false,
    progress: ["求める人物像を整理しています…", "文章を書いています…", "表現を整えています…"],
    fields: ["そのまま使える文", "訴求ポイント", "差し替える箇所", "注意点"],
    checklistTitle: "掲載前チェック",
    disclaimer: "内容は自動生成です。労働条件の表示は法令に沿っているか必ず確認してください。",
    rules: [
      "性別・年齢・国籍などで差別的にならない表現にする（法令順守）。",
      "給与・勤務時間・休日を勝手に作らない。【要記入】と書く。",
      "「アットホームな職場」など中身のない決まり文句だけで終わらせない。",
    ],
    axes: [
      { id: "kind", label: "何を作る？", promptLabel: "作るもの", options: ["求人票", "スカウト文", "面接の質問", "募集要項", "内定通知"] },
      { id: "job", label: "どんな職種？", promptLabel: "職種", free: true, freePlaceholder: "例：現場管理の施工管理技士", options: ["事務", "営業", "技術・エンジニア", "販売・接客", "製造・現場", "管理職"] },
      { id: "level", label: "どんな経験の人？", promptLabel: "求める経験", options: ["未経験歓迎", "経験者", "管理職クラス"] },
    ],
  },

  {
    id: "blog_article",
    categories: ["ブログ記事作成ツール"],
    runLabel: "この内容で記事の骨組みを作る",
    rerunLabel: "もう一度、この内容で作る",
    busyLabel: "作成中…",
    resultTitle: "記事の構成案",
    leadText: "選んで押すだけ。見出しと書く内容がそろいます。",
    requireSearch: false,
    progress: ["読者の知りたいことを整理しています…", "見出しを組み立てています…", "整えています…"],
    fields: ["見出し", "書く内容", "読者が知りたいこと", "注意点"],
    checklistTitle: "公開前チェック",
    disclaimer: "内容は自動生成です。事実確認と一次情報の確認を必ず行ってください。",
    rules: [
      "見出しは検索する人の言葉で書く。社内用語を使わない。",
      "「書く内容」は、そのまま書き出せる具体的な要点で書く。",
      "根拠のない数値や順位を作らない。",
    ],
    axes: [
      { id: "theme", label: "どのテーマ？", promptLabel: "テーマ", free: true, freePlaceholder: "例：中古マンションの内見で見るところ", options: ["ハウツー", "比較", "まとめ", "体験談", "初心者向け", "用語解説"] },
      { id: "reader", label: "誰に読ませる？", promptLabel: "読者", options: ["まったくの初心者", "少し知っている人", "詳しい人"] },
      { id: "length", label: "どれくらいの長さ？", promptLabel: "文字数の目安", defaultIndex: 1, options: ["1500字", "3000字", "5000字"] },
    ],
  },

  {
    id: "education",
    categories: ["教育学習ツール"],
    runLabel: "この内容で作る",
    rerunLabel: "もう一度、この内容で作る",
    busyLabel: "作成中…",
    resultTitle: "学習の内容",
    leadText: "選んで押すだけ。すぐ使える教材や計画ができます。",
    requireSearch: false,
    progress: ["理解の順番を整理しています…", "内容を作っています…", "整えています…"],
    fields: ["内容", "ねらい", "つまずきやすい点", "次にやること"],
    checklistTitle: "使う前チェック",
    disclaimer: "内容は自動生成です。教科書や公式資料と照らし合わせて使ってください。",
    rules: [
      "対象レベルに合わせ、知らない用語には必ず説明を添える。",
      "問題を作る場合は、答えと解説も必ず付ける。",
      "事実が不確かな内容は出さない。",
    ],
    axes: [
      { id: "kind", label: "何を作る？", promptLabel: "作るもの", options: ["学習計画", "練習問題", "用語解説", "復習リスト"] },
      { id: "subject", label: "どの分野？", promptLabel: "分野", free: true, freePlaceholder: "例：第二種電気工事士の筆記", options: ["算数・数学", "英語", "国語", "理科", "社会", "資格試験", "プログラミング"] },
      { id: "level", label: "どのレベル？", promptLabel: "レベル", defaultIndex: 1, options: ["入門", "基礎", "応用"] },
    ],
  },

  {
    id: "shop_ops",
    categories: ["店舗運営ツール"],
    runLabel: "この内容で文章を作る",
    rerunLabel: "もう一度、この内容で作る",
    busyLabel: "作成中…",
    resultTitle: "作成した文章",
    leadText: "選んで押すだけ。そのまま使える文面ができます。",
    requireSearch: false,
    progress: ["状況を整理しています…", "文章を書いています…", "表現を整えています…"],
    fields: ["そのまま使える文", "この文の狙い", "差し替える箇所", "注意点"],
    checklistTitle: "使う前チェック",
    disclaimer: "内容は自動生成です。お客様に出す前に必ず内容を確認してください。",
    rules: [
      "文章はコピーしてそのまま使える完成形で書く。差し替える箇所は【 】で示す。",
      "クレーム対応では、まず受け止める姿勢を示し、事実確認前に非を認めきらない。",
      "根拠のない効果や割引条件を勝手に作らない。",
    ],
    axes: [
      { id: "scene", label: "どんな場面？", promptLabel: "場面", free: true, freePlaceholder: "例：予約の無断キャンセルへの案内", options: ["口コミ返信", "販促の告知", "季節キャンペーン", "接客マニュアル", "クレーム対応"] },
      { id: "business", label: "どんなお店？", promptLabel: "業種", free: true, freePlaceholder: "例：郊外のカフェ", options: ["飲食店", "美容室・サロン", "小売店", "宿泊", "整体・治療院"] },
      { id: "tone", label: "どんな雰囲気で？", promptLabel: "トーン", defaultIndex: 1, options: ["ていねい", "親しみやすく", "かたく正式に"] },
    ],
  },
];

/** カテゴリに専用レシピが無いときの汎用レシピ（使う人が自由に作った場合もここに来る） */
function buildGenericRecipe(category, theme, presets) {
  const itemLabel = theme?.itemLabel || "項目";
  return {
    id: "generic",
    categories: [],
    runLabel: "この内容で作成する",
    rerunLabel: "もう一度、この内容で作成する",
    busyLabel: "作成中…",
    resultTitle: "作成結果",
    leadText: "選んで押すだけ。必要な調べものはツール側で行います。",
    requireSearch: requiresNewsGrounding(getToolMode()),
    progress: ["内容を組み立てています…", "情報を整理しています…", "仕上げています…"],
    fields: ["ポイント", "そのまま使える文", "注意点"],
    checklistTitle: "使う前チェック",
    disclaimer: "内容は自動生成です。公開・提出の前に必ず内容を確認してください。",
    rules: [
      "ユーザーにURLや長文のコピペを要求しない。選択内容だけで完結させる。",
      "そのまま使える具体的な文面・手順を出す。一般論だけで終えない。",
      "事実が確認できない部分は断定せず、確認が必要な点として書く。",
    ],
    axes: [
      {
        id: "theme",
        label: "どのテーマ？",
        promptLabel: "テーマ",
        free: true,
        freePlaceholder: `例：${presets[0] || itemLabel}`,
        options: presets,
      },
      {
        id: "tone",
        label: "どんな雰囲気で？",
        promptLabel: "トーン",
        free: true,
        freePlaceholder: "例：親しみやすく、専門用語なしで",
        options: ["ていねい", "カジュアル", "かたい", "短く強く"],
      },
      {
        id: "amount",
        label: "どれくらいの量？",
        promptLabel: "分量",
        defaultIndex: 1,
        options: ["短め", "ふつう", "しっかり"],
      },
    ],
  };
}

/** 現在の状態に対応するレシピを返す。専用が無ければ汎用を自動生成する。 */
function resolveToolRecipe() {
  const category = getSelectedCategory();
  const found = TOOL_RECIPES.find((recipe) => recipe.categories.includes(category?.name));
  const recipe = found || buildGenericRecipe(category, getTheme(), getTopicPresets());
  return normalizeRecipe(recipe);
}

/** 定義の書き忘れがあっても画面が壊れないように既定値で埋める */
function normalizeRecipe(recipe) {
  const axes = (recipe.axes || [])
    .map((axis) => ({
      id: String(axis.id || ""),
      label: axis.label || "選んでください",
      promptLabel: axis.promptLabel || axis.label || "指定",
      free: Boolean(axis.free),
      freePlaceholder: axis.freePlaceholder || "自由に入力できます",
      options: (axis.options || []).filter(Boolean).slice(0, 10),
      optionLabels: axis.optionLabels || null,
      defaultIndex: Number.isInteger(axis.defaultIndex) ? axis.defaultIndex : 0,
    }))
    .filter((axis) => axis.id && axis.options.length);
  return {
    id: recipe.id || "generic",
    runLabel: recipe.runLabel || "この内容で作成する",
    rerunLabel: recipe.rerunLabel || "もう一度、この内容で作成する",
    busyLabel: recipe.busyLabel || "作成中…",
    resultTitle: recipe.resultTitle || "結果",
    leadText: recipe.leadText || "選んで押すだけで結果が出ます。",
    requireSearch: Boolean(recipe.requireSearch),
    progress: recipe.progress && recipe.progress.length ? recipe.progress : ["処理しています…"],
    fields: recipe.fields && recipe.fields.length ? recipe.fields : ["ポイント", "注意点"],
    checklistTitle: recipe.checklistTitle || "使う前チェック",
    disclaimer: recipe.disclaimer || "内容は自動生成です。使う前に確認してください。",
    rules: recipe.rules || [],
    axes,
  };
}

/** レシピからAIへの指示文を組み立てる。出力は必ずJSONに固定する。 */
function buildRecipeSystemPrompt(recipe, ctx) {
  const shape = {
    summary: "全体の要約を1〜2文で",
    items: [
      {
        title: "項目の見出し",
        level: "高 / 中 / 低 のいずれか",
        fields: Object.fromEntries(recipe.fields.map((field) => [field, "内容"])),
      },
    ],
    checklist: ["使う前に確認することを3〜5個"],
    note: "補足があれば。無ければ空文字",
  };
  return [
    `あなたは「${ctx.title}」専用のアシスタントです。`,
    `目的: ${ctx.purpose}`,
    ctx.market ? `対象: ${ctx.market}` : "",
    `想定ユーザー: ${ctx.targetUser}。自分で調べるのが苦手で、選ぶだけで結果がほしい人。`,
    "",
    "【守ること】",
    "ユーザーにURLや長文のコピペを絶対に要求しない。渡された選択内容だけで完結させる。",
    ...recipe.rules,
    "",
    "【出力形式】",
    "次のJSONだけを返す。前後に説明文やコードブロック記号（```）を付けない。",
    JSON.stringify(shape, null, 2),
    "",
    `items の各要素の fields には、必ず ${recipe.fields.map((f) => `「${f}」`).join("・")} をすべて入れる。`,
    "分からない項目は推測で埋めず「不明」と書く。",
    "日本語で書く。",
  ]
    .filter(Boolean)
    .join("\n");
}

/** 成果物HTMLの本文（選択エリア＋実行バー＋結果）を組み立てる */
function buildToolBodyHtml(recipe, ctx) {
  const rows = recipe.axes
    .map((axis, index) => {
      const chips = axis.options
        .map((option, optionIndex) => {
          const label = (axis.optionLabels && axis.optionLabels[optionIndex]) || option;
          const pressed = optionIndex === axis.defaultIndex ? "true" : "false";
          return `        <button type="button" class="chip" aria-pressed="${pressed}" data-topic="${escapeAttribute(option)}" data-value="${escapeAttribute(option)}">${escapeHtml(label)}</button>`;
        })
        .join("\n");
      const free = axis.free
        ? [
            '      <div class="free" hidden>',
            `        <input type="text" data-free="${escapeAttribute(axis.id)}" placeholder="${escapeAttribute(axis.freePlaceholder)}" />`,
            "        <p>ここに書いた内容が、上の選択より優先されます。</p>",
            "      </div>",
          ].join("\n")
        : "";
      const pencil = axis.free
        ? '        <button type="button" class="pencil">✎ 自分で書く</button>'
        : "";
      return [
        `    <div class="row" data-axis="${escapeAttribute(axis.id)}">`,
        '      <div class="row-head">',
        `        <span class="n">${index + 1}</span><h2>${escapeHtml(axis.label)}</h2>`,
        pencil,
        "      </div>",
        `      <div class="chips" role="group" aria-label="${escapeAttribute(axis.label)}">`,
        chips,
        "      </div>",
        free,
        "    </div>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  // 既定の選択内容は、JSが動く前から実行バーに表示しておく（起動を速く見せる）
  const initialPicked = recipe.axes
    .map((axis) => `<span>${escapeHtml(axis.options[axis.defaultIndex] || axis.options[0] || "")}</span>`)
    .join("");

  return [
    '  <div class="wrap">',
    '    <header class="hero">',
    `      <h1>${escapeHtml(ctx.title)}</h1>`,
    `      <p>${escapeHtml(recipe.leadText)}</p>`,
    "    </header>",
    "    <noscript><div class=\"ns\">このツールを動かすには JavaScript が必要です。Chrome や Safari で開き直してください。</div></noscript>",
    '    <div class="picker">',
    rows,
    "    </div>",
    '    <div class="runbar">',
    `      <p class="picked" id="picked">${initialPicked}</p>`,
      `      <button type="button" class="btn" id="generate-button">${escapeHtml(recipe.runLabel)}</button>`,
    '      <p class="sub" id="sub">押すと約10〜40秒で結果が出ます</p>',
    "    </div>",
    '    <section class="result">',
    '      <div class="result-head">',
    `        <h2>${escapeHtml(recipe.resultTitle)}</h2>`,
    '        <div class="views" id="views" role="group" aria-label="結果の見せ方">',
    '          <button type="button" class="vw" data-view="card" aria-pressed="true">カード</button>',
    '          <button type="button" class="vw" data-view="table" aria-pressed="false">表</button>',
    '          <button type="button" class="vw" data-view="fold" aria-pressed="false">折りたたみ</button>',
    "        </div>",
    "      </div>",
    '      <div class="result-actions" id="actions" hidden>',
    '        <button type="button" class="btn ghost" data-do="copy">コピー</button>',
    '        <button type="button" class="btn ghost" data-do="txt">テキスト保存</button>',
    '        <button type="button" class="btn ghost" data-do="html">HTML保存</button>',
    '        <button type="button" class="btn ghost" data-do="zip">ZIP保存</button>',
    '        <button type="button" class="btn ghost" data-do="print">印刷</button>',
    "      </div>",
    '      <p class="status" id="status" hidden><span class="spin" aria-hidden="true"></span><span id="status-text"></span></p>',
    '      <div class="empty" id="empty"><span aria-hidden="true">📋</span>まだ結果はありません。上のボタンを押すと、ここに出ます。</div>',
    '      <div class="skeleton" id="skeleton" hidden aria-hidden="true">',
    '        <div class="sk t"></div><div class="sk w90"></div>',
    '        <div class="sk-card"><div class="sk t"></div><div class="sk w90"></div><div class="sk w70"></div></div>',
    '        <div class="sk-card"><div class="sk t"></div><div class="sk w90"></div><div class="sk w70"></div></div>',
    "      </div>",
    '      <div class="out" id="result" hidden></div>',
    "    </section>",
    `    <p class="foot">${escapeHtml(recipe.disclaimer)}</p>`,
    "  </div>",
  ].join("\n");
}

/** 成果物HTML共通のCSS（配色A：ネイビー×シアン） */
const NENE_TOOL_CSS = `:root{
  --bg:#eef3f9; --tint:rgba(16,69,126,.07); --tint2:rgba(14,143,158,.08);
  --surface:#fff; --surface-2:#f3f7fb; --surface-3:#e9eff7;
  --ink:#0b1c33; --ink-2:#43586f; --ink-3:#6b7f96;
  --line:#d6e0eb; --line-2:#e8eef5;
  --brand:#10457e; --brand-soft:rgba(16,69,126,.1);
  --accent:#0e8f9e; --accent-soft:rgba(14,143,158,.12);
  --warn:#a86a10; --warn-soft:rgba(168,106,16,.12);
  --danger:#a52a1e; --danger-soft:#fdf3f2;
  --shadow:0 1px 2px rgba(11,28,51,.05),0 10px 26px rgba(11,28,51,.07);
}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{margin:0;font-family:'Hiragino Sans','Hiragino Kaku Gothic ProN','Noto Sans JP','Yu Gothic UI','Segoe UI',system-ui,sans-serif;
  background:var(--bg);
  background-image:radial-gradient(900px 300px at 6% -6%,var(--tint),transparent 62%),radial-gradient(700px 260px at 100% 0%,var(--tint2),transparent 58%);
  background-repeat:no-repeat;color:var(--ink);line-height:1.7;-webkit-font-smoothing:antialiased}
.wrap{max-width:760px;margin:0 auto;padding:16px 14px 120px}
@media(min-width:860px){.wrap{padding:26px 18px 60px}}
.hero{margin:0 0 14px}
.hero h1{margin:0 0 4px;font-size:clamp(1.25rem,4vw,1.6rem);line-height:1.35;font-weight:800;letter-spacing:-.02em}
.hero p{margin:0;color:var(--ink-2);font-size:.9rem}
.ns{margin:0 0 14px;padding:12px;border:1px solid #f0b429;background:#fff8e6;color:#5c4800;border-radius:12px;font-size:.88rem}
.picker{background:var(--surface);border:1px solid var(--line);border-radius:16px;box-shadow:var(--shadow);overflow:hidden}
.row{padding:12px 14px;border-top:1px solid var(--line-2)}
.row:first-child{border-top:0}
.row-head{display:flex;align-items:center;gap:8px;margin-bottom:9px}
.n{display:grid;place-items:center;flex:0 0 auto;width:20px;height:20px;border-radius:6px;background:var(--brand);color:#fff;font-size:.7rem;font-weight:800}
.row-head h2{margin:0;font-size:.92rem;font-weight:800;letter-spacing:-.01em}
.pencil{margin-left:auto;min-height:30px;padding:0 10px;border-radius:8px;border:1.5px dashed var(--line);background:transparent;color:var(--brand);font:inherit;font-size:.78rem;font-weight:800;cursor:pointer;white-space:nowrap}
.pencil:hover{background:var(--brand-soft);border-color:var(--brand)}
.chips{display:flex;flex-wrap:wrap;gap:7px}
.chip{min-height:40px;padding:0 13px;border-radius:10px;border:1.5px solid var(--line);background:var(--surface-2);color:var(--ink);font:inherit;font-size:.88rem;font-weight:700;cursor:pointer;transition:background .12s,border-color .12s,transform .07s;touch-action:manipulation;-webkit-tap-highlight-color:rgba(16,69,126,.18)}
.chip:hover{border-color:var(--brand);background:var(--brand-soft)}
.chip:active{transform:scale(.97)}
.chip[aria-pressed="true"]{background:var(--brand);border-color:var(--brand);color:#fff}
.free{margin-top:9px}
.free[hidden]{display:none}
.free input{width:100%;min-height:44px;padding:8px 12px;border-radius:10px;border:1.5px solid var(--brand);background:var(--surface);color:var(--ink);font:inherit;font-size:.9rem}
.free p{margin:5px 0 0;font-size:.76rem;color:var(--ink-3)}
:focus-visible{outline:3px solid var(--brand);outline-offset:2px}
.runbar{position:sticky;bottom:0;z-index:40;margin-top:12px;padding:11px 13px calc(11px + env(safe-area-inset-bottom));border-radius:16px;background:var(--surface);border:1px solid var(--line);box-shadow:0 -5px 24px rgba(11,28,51,.1)}
.picked{display:flex;flex-wrap:wrap;gap:5px;margin:0 0 9px;font-size:.78rem}
.picked span{padding:2px 9px;border-radius:999px;background:var(--surface-3);color:var(--ink-2);font-weight:700}
.btn{width:100%;min-height:50px;border:0;border-radius:12px;background:linear-gradient(135deg,var(--brand),var(--accent));color:#fff;font:inherit;font-size:1rem;font-weight:800;cursor:pointer;box-shadow:0 6px 16px var(--brand-soft);transition:filter .12s,transform .07s;touch-action:manipulation}
.btn:hover{filter:brightness(1.08)}
.btn:active{transform:scale(.99)}
.btn[disabled]{opacity:.6;cursor:progress;filter:none}
.btn.ghost{width:auto;min-height:34px;padding:0 12px;font-size:.8rem;border:1.5px solid var(--line);background:var(--surface-2);color:var(--ink);box-shadow:none}
.btn.ghost:hover{border-color:var(--brand);color:var(--brand);background:var(--brand-soft);filter:none}
.runbar .sub{margin:7px 0 0;text-align:center;font-size:.74rem;color:var(--ink-3)}
.result{margin-top:12px;padding:14px;border-radius:16px;background:var(--surface);border:1px solid var(--line);box-shadow:var(--shadow)}
.result-head{display:flex;align-items:center;gap:8px;flex-wrap:wrap;padding-bottom:11px;border-bottom:1px solid var(--line-2)}
.result-head h2{margin:0;font-size:.98rem;font-weight:800}
.views{display:flex;gap:4px;margin-left:auto}
.vw{min-height:30px;padding:0 10px;border-radius:8px;border:1.5px solid var(--line);background:var(--surface-2);color:var(--ink-2);font:inherit;font-size:.76rem;font-weight:800;cursor:pointer}
.vw[aria-pressed="true"]{background:var(--brand);border-color:var(--brand);color:#fff}
.result-actions{display:flex;gap:6px;flex-wrap:wrap;padding:11px 0 0}
.result-actions[hidden]{display:none}
.status{display:flex;align-items:center;gap:8px;margin:11px 0 0;font-size:.85rem;font-weight:700;color:var(--brand)}
.status[hidden]{display:none}
.status.is-error{color:var(--danger)}
.spin{width:15px;height:15px;flex:0 0 auto;border-radius:50%;border:2.5px solid var(--brand-soft);border-top-color:var(--brand);animation:spin .7s linear infinite}
.status.is-error .spin{border-color:var(--danger-soft);border-top-color:var(--danger);animation:none}
@keyframes spin{to{transform:rotate(360deg)}}
.empty{margin-top:12px;padding:26px 16px;text-align:center;color:var(--ink-3);border:1.5px dashed var(--line);border-radius:12px;background:var(--surface-2);font-size:.88rem}
.empty[hidden]{display:none}
.empty span{display:block;font-size:1.5rem;margin-bottom:6px}
.skeleton{display:grid;gap:9px;margin-top:12px}
.skeleton[hidden]{display:none}
.sk{height:12px;border-radius:6px;background:linear-gradient(90deg,var(--surface-2) 25%,var(--surface-3) 37%,var(--surface-2) 63%);background-size:400% 100%;animation:shine 1.3s ease-in-out infinite}
.sk.t{height:17px;width:50%}.sk.w90{width:90%}.sk.w70{width:70%}
.sk-card{padding:13px;border:1px solid var(--line-2);border-radius:11px;display:grid;gap:8px}
@keyframes shine{to{background-position:-135% 0}}
@media(prefers-reduced-motion:reduce){.sk,.spin{animation:none}}
.out{display:grid;gap:11px;margin-top:12px}
.out[hidden]{display:none}
.summary{padding:11px 13px;border-radius:11px;background:var(--brand-soft);border:1px solid var(--brand);font-weight:700;font-size:.9rem;line-height:1.65}
.item{padding:13px;border-radius:11px;border:1px solid var(--line);background:var(--surface-2)}
.item-head{display:flex;align-items:baseline;gap:8px;margin-bottom:8px;flex-wrap:wrap}
.no{display:grid;place-items:center;min-width:22px;height:22px;padding:0 6px;border-radius:7px;background:var(--brand);color:#fff;font-size:.74rem;font-weight:800;flex:0 0 auto}
.item-head h3{margin:0;font-size:.96rem;font-weight:800}
.tag{margin-left:auto;padding:2px 9px;border-radius:999px;font-size:.72rem;font-weight:800;background:var(--accent-soft);color:var(--accent)}
.tag.mid{background:var(--warn-soft);color:var(--warn)}
.tag.low{background:var(--surface-3);color:var(--ink-3)}
.kv{display:grid;gap:5px;margin:0;font-size:.87rem}
.kv>div{display:grid;grid-template-columns:92px 1fr;gap:9px}
.kv dt{color:var(--ink-3);font-weight:700}
.kv dd{margin:0}
@media(max-width:520px){.kv>div{grid-template-columns:1fr;gap:1px}.kv dt{font-size:.78rem}}
.tablebox{overflow-x:auto;-webkit-overflow-scrolling:touch;border:1px solid var(--line);border-radius:11px}
table{border-collapse:collapse;width:100%;min-width:600px;font-size:.86rem}
th,td{padding:9px 11px;text-align:left;border-bottom:1px solid var(--line-2);vertical-align:top}
thead th{background:var(--surface-3);font-weight:800;font-size:.8rem;color:var(--ink-2);white-space:nowrap}
tbody tr:last-child td{border-bottom:0}
td.name{font-weight:800}
.hint{margin:6px 0 0;font-size:.74rem;color:var(--ink-3);text-align:right}
details.fold{border:1px solid var(--line);border-radius:11px;background:var(--surface-2);overflow:hidden}
details.fold+details.fold{margin-top:7px}
details.fold>summary{list-style:none;cursor:pointer;padding:11px 13px;display:flex;align-items:center;gap:8px;font-weight:800;font-size:.92rem}
details.fold>summary::-webkit-details-marker{display:none}
details.fold>summary::after{content:"＋";margin-left:auto;color:var(--brand);font-weight:800}
details.fold[open]>summary::after{content:"−"}
details.fold[open]>summary{border-bottom:1px solid var(--line-2)}
.fold-body{padding:11px 13px}
.check{margin:0;padding:0;list-style:none;display:grid;gap:6px;font-size:.88rem}
.check li{display:flex;gap:8px}
.check li::before{content:"✓";color:var(--accent);font-weight:800;flex:0 0 auto}
.sources{font-size:.78rem;color:var(--ink-3);margin:0}
.sources a{color:var(--brand)}
.raw{white-space:pre-wrap;font-size:.88rem;margin:0;padding:13px;border:1px solid var(--line);border-radius:11px;background:var(--surface-2);line-height:1.75}
.errbox{padding:12px 14px;border-radius:11px;background:var(--danger-soft);border:1px solid var(--danger);color:var(--danger);font-size:.88rem;font-weight:700}
.foot{margin:16px 0 0;text-align:center;font-size:.76rem;color:var(--ink-3);line-height:1.6}
@media print{.runbar,.views,.result-actions,.picker,.foot,.empty,.skeleton{display:none!important}body{background:#fff}.result{box-shadow:none;border-color:#ccc}}`;

/**
 * 成果物ツール共通のランタイム。
 * この関数のソースをそのまま成果物HTMLへ埋め込むため、
 * 外側の変数を参照してはいけない（設定は window.TOOL_CONFIG から受け取る）。
 */
function neneToolRuntime() {
  var CFG = window.TOOL_CONFIG || {};
  var RECIPE = CFG.recipe || { axes: [], fields: [], progress: ["処理しています…"] };
  var AXES = RECIPE.axes || [];
  var FIELDS = RECIPE.fields || [];
  var ORIGINAL_HTML = "<!doctype html>\n" + document.documentElement.outerHTML;

  var selection = {};
  var freeText = {};
  var view = "card";
  var lastData = null;
  var progressTimer = null;
  var busy = false;

  function qs(sel) { return document.querySelector(sel); }
  function qsa(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function stamp() {
    try { return new Date().toLocaleString("ja-JP"); } catch (e) { return new Date().toISOString(); }
  }
  function currentValue(axisId) {
    return (freeText[axisId] || selection[axisId] || "").trim();
  }

  /* ---------- 選択エリア ---------- */

  function refreshPicked() {
    var box = qs("#picked");
    if (!box) return;
    box.innerHTML = "";
    AXES.forEach(function (axis) {
      var value = currentValue(axis.id);
      if (!value) return;
      var chip = document.createElement("span");
      chip.textContent = value;
      box.appendChild(chip);
    });
  }

  function wirePicker() {
    qsa(".row[data-axis]").forEach(function (row) {
      var axisId = row.getAttribute("data-axis");
      var active = row.querySelector('.chip[aria-pressed="true"]');
      selection[axisId] = active ? active.getAttribute("data-value") : "";

      var chips = row.querySelector(".chips");
      if (chips) {
        chips.addEventListener("click", function (event) {
          var chip = event.target.closest(".chip");
          if (!chip) return;
          event.preventDefault();
          qsa(".chip", row).forEach(function (other) {
            other.setAttribute("aria-pressed", String(other === chip));
          });
          selection[axisId] = chip.getAttribute("data-value") || "";
          refreshPicked();
        });
      }

      var pencil = row.querySelector(".pencil");
      var free = row.querySelector(".free");
      if (pencil && free) {
        pencil.addEventListener("click", function (event) {
          event.preventDefault();
          free.hidden = !free.hidden;
          pencil.textContent = free.hidden ? "✎ 自分で書く" : "✕ 選択に戻す";
          if (free.hidden) {
            freeText[axisId] = "";
            var input = free.querySelector("input");
            if (input) input.value = "";
          } else {
            var focusTarget = free.querySelector("input");
            if (focusTarget) focusTarget.focus();
          }
          refreshPicked();
        });
      }
      var input = row.querySelector(".free input");
      if (input) {
        input.addEventListener("input", function () {
          freeText[axisId] = input.value.trim();
          refreshPicked();
        });
      }
    });
    refreshPicked();
  }

  /* ---------- 結果の描画 ---------- */

  function levelClass(level) {
    var text = String(level || "");
    if (text.indexOf("高") >= 0) return "";
    if (text.indexOf("低") >= 0) return " low";
    return " mid";
  }

  function renderCard(data) {
    return (data.items || []).map(function (item, index) {
      var rows = FIELDS.map(function (field) {
        var value = (item.fields || {})[field];
        if (!value) return "";
        return "<div><dt>" + esc(field) + "</dt><dd>" + esc(value) + "</dd></div>";
      }).join("");
      return '<article class="item"><div class="item-head"><span class="no">' + (index + 1) + "</span>"
        + "<h3>" + esc(item.title) + "</h3>"
        + (item.level ? '<span class="tag' + levelClass(item.level) + '">' + esc(item.level) + "</span>" : "")
        + '</div><dl class="kv">' + rows + "</dl></article>";
    }).join("");
  }

  function renderTable(data) {
    var head = "<tr><th>項目</th>" + FIELDS.map(function (field) {
      return "<th>" + esc(field) + "</th>";
    }).join("") + "</tr>";
    var body = (data.items || []).map(function (item) {
      var cells = FIELDS.map(function (field) {
        return "<td>" + esc((item.fields || {})[field] || "-") + "</td>";
      }).join("");
      var name = esc(item.title) + (item.level ? "<br><small>" + esc(item.level) + "</small>" : "");
      return '<tr><td class="name">' + name + "</td>" + cells + "</tr>";
    }).join("");
    return '<div class="tablebox"><table><thead>' + head + "</thead><tbody>" + body + "</tbody></table></div>"
      + '<p class="hint">← 横にスクロールできます →</p>';
  }

  function renderFold(data) {
    return (data.items || []).map(function (item, index) {
      var rows = FIELDS.map(function (field) {
        var value = (item.fields || {})[field];
        if (!value) return "";
        return "<div><dt>" + esc(field) + "</dt><dd>" + esc(value) + "</dd></div>";
      }).join("");
      return '<details class="fold"' + (index === 0 ? " open" : "") + "><summary>"
        + '<span class="no">' + (index + 1) + "</span>" + esc(item.title)
        + (item.level ? '<span class="tag' + levelClass(item.level) + '">' + esc(item.level) + "</span>" : "")
        + '</summary><div class="fold-body"><dl class="kv">' + rows + "</dl></div></details>";
    }).join("");
  }

  function render() {
    var box = qs("#result");
    if (!box) return;
    var empty = qs("#empty");
    if (empty) empty.hidden = Boolean(lastData);
    if (!lastData) { box.hidden = true; return; }

    if (lastData.raw) {
      box.innerHTML = '<pre class="raw">' + esc(lastData.raw) + "</pre>";
      box.hidden = false;
      return;
    }

    var parts = [];
    if (lastData.summary) parts.push('<p class="summary">' + esc(lastData.summary) + "</p>");

    if (!(lastData.items || []).length) {
      parts.push('<div class="empty" style="margin:0">該当する候補は見つかりませんでした。条件を変えてもう一度お試しください。</div>');
    } else if (view === "table") {
      parts.push(renderTable(lastData));
    } else if (view === "fold") {
      parts.push(renderFold(lastData));
    } else {
      parts.push(renderCard(lastData));
    }

    if ((lastData.checklist || []).length) {
      parts.push('<article class="item"><div class="item-head"><span class="no">✓</span><h3>'
        + esc(RECIPE.checklistTitle) + '</h3></div><ul class="check">'
        + lastData.checklist.map(function (line) { return "<li>" + esc(line) + "</li>"; }).join("")
        + "</ul></article>");
    }
    if (lastData.note) parts.push('<p class="sources">' + esc(lastData.note) + "</p>");
    if ((lastData.sources || []).length) {
      parts.push('<p class="sources">情報源：' + lastData.sources.map(function (source, index) {
        var label = esc(source.title || source.uri || "");
        return (index + 1) + ". " + (source.uri ? '<a href="' + esc(source.uri) + '" target="_blank" rel="noopener">' + label + "</a>" : label);
      }).join(" ／ ") + "　（確認 " + esc(lastData.checkedAt || stamp()) + "）</p>");
    }

    box.innerHTML = parts.join("");
    box.hidden = false;
  }

  /* ---------- AIの応答を読み取る ---------- */

  function parseResult(text) {
    var body = String(text || "").trim();
    var fence = body.match(/```(?:json)?\s*([\s\S]*?)```/i);
    if (fence) body = fence[1].trim();
    var start = body.indexOf("{");
    var end = body.lastIndexOf("}");
    if (start >= 0 && end > start) {
      try {
        var parsed = JSON.parse(body.slice(start, end + 1));
        if (parsed && (parsed.summary || parsed.items)) {
          return {
            summary: parsed.summary || "",
            items: Array.isArray(parsed.items) ? parsed.items : [],
            checklist: Array.isArray(parsed.checklist) ? parsed.checklist : [],
            note: parsed.note || "",
            sources: [],
            checkedAt: stamp(),
          };
        }
      } catch (error) { /* JSONで読めなければ下の生テキスト表示へ */ }
    }
    return { raw: String(text || "").trim(), items: [], checkedAt: stamp() };
  }

  /* ---------- 実行 ---------- */

  function setStatus(message, isError) {
    var box = qs("#status");
    var text = qs("#status-text");
    if (!box || !text) return;
    if (!message) { box.hidden = true; return; }
    text.textContent = message;
    box.hidden = false;
    box.classList.toggle("is-error", Boolean(isError));
  }

  function startProgress() {
    var messages = RECIPE.progress || ["処理しています…"];
    var index = 0;
    var startedAt = Date.now();
    setStatus(messages[0], false);
    progressTimer = setInterval(function () {
      index = (index + 1) % messages.length;
      var seconds = Math.floor((Date.now() - startedAt) / 1000);
      setStatus(messages[index] + "（" + seconds + "秒）", false);
    }, 1500);
  }

  function stopProgress() {
    if (progressTimer) { clearInterval(progressTimer); progressTimer = null; }
  }

  function buildUserInput() {
    var lines = AXES.map(function (axis) {
      var value = currentValue(axis.id);
      return value ? axis.promptLabel + ": " + value : "";
    }).filter(Boolean);
    lines.push("実行日時: " + stamp());
    lines.push("出力はJSONのみ。説明文やコードブロック記号は付けない。");
    return lines.join("\n");
  }

  function buildDemoData() {
    var theme = currentValue(AXES[0] ? AXES[0].id : "") || "サンプル";
    var items = [1, 2, 3].map(function (index) {
      var fields = {};
      FIELDS.forEach(function (field) {
        fields[field] = "（お試し表示）" + theme + "に関する" + field + "がここに入ります。";
      });
      return { title: "サンプル項目" + index, level: index === 1 ? "高" : "中", fields: fields };
    });
    return {
      summary: "【お試しモード】" + theme + "の結果サンプルです。公開URLで実行すると本物の結果が出ます。",
      items: items,
      checklist: ["これはお試し表示です", "公開URLを発行すると本番のAIが動きます", "内容は必ずご自身で確認してください"],
      note: "",
      sources: [],
      checkedAt: stamp(),
    };
  }

  function isDemoMode() {
    var slug = String(CFG.publishSlug || "");
    return Boolean(CFG.demoMode) || !slug || slug.indexOf("__NENE_") === 0;
  }

  async function runViaPublishedProxy(userInput) {
    var slug = String(CFG.publishSlug || "").trim();
    var apiBase = String(CFG.apiBase || "").replace(/\/$/, "");
    if (!slug || slug.indexOf("__NENE_") === 0 || !apiBase || apiBase.indexOf("__NENE_") === 0) {
      throw new Error("本番実行には公開URLが必要です。NENE Studio で公開URLを発行してください。");
    }
    // パソコンに保存したファイルから開いた場合、Cookieは送れないので付けない
    var isLocalFile = window.location.protocol === "file:";
    var response;
    try {
      response = await fetch(apiBase + "/public/tools/" + encodeURIComponent(slug) + "/run", {
        method: "POST",
        headers: (function () {
          var headers = { "Content-Type": "application/json" };
          if (/ngrok/i.test(String(window.location.hostname || ""))) {
            headers["ngrok-skip-browser-warning"] = "1";
          }
          return headers;
        }()),
        credentials: isLocalFile ? "omit" : "include",
        body: JSON.stringify({ systemPrompt: CFG.systemPrompt || "", input: userInput, demo: false }),
      });
    } catch (error) {
      throw new Error(isLocalFile
        ? "サーバーにつながりませんでした。インターネット接続を確認するか、公開URLから開いてください。"
        : "通信に失敗しました。ネットワークを確認して、もう一度お試しください。");
    }
    var data = await response.json().catch(function () { return {}; });
    if (response.status === 403 && isLocalFile) {
      throw new Error("このツールはパスワード保護されているため、保存したファイルからは実行できません。公開URLから開いてください。");
    }
    if (!response.ok) {
      throw new Error(data.error || "実行に失敗しました。しばらくしてから、もう一度お試しください。");
    }
    return data;
  }

  async function run() {
    if (busy) return;
    var button = qs("#generate-button");
    busy = true;
    if (button) { button.disabled = true; button.textContent = RECIPE.busyLabel; }
    var empty = qs("#empty");
    var skeleton = qs("#skeleton");
    var actions = qs("#actions");
    var box = qs("#result");
    if (empty) empty.hidden = true;
    if (box) box.hidden = true;
    if (actions) actions.hidden = true;
    if (skeleton) skeleton.hidden = false;
    startProgress();

    try {
      var demo = isDemoMode();
      // お試しは即答なので、本番と同じ見え方になるよう待機表示だけ挟む。
      // 本番（公開URL）には遅延を入れない。
      if (demo) await new Promise(function (resolve) { setTimeout(resolve, 300); });
      var payload = demo ? null : await runViaPublishedProxy(buildUserInput());
      lastData = demo ? buildDemoData() : parseResult(String(payload.text || ""));
      if (payload && payload.notice && lastData) lastData.summary = payload.notice;
      render();
      if (actions) actions.hidden = false;
      setStatus(payload && payload.notice ? payload.notice : "", Boolean(payload && payload.demo));
      var sub = qs("#sub");
      if (sub) {
        sub.textContent = (demo || (payload && payload.demo))
          ? "見本を表示しています（" + stamp() + "）"
          : "できました（" + stamp() + "）";
      }
    } catch (error) {
      lastData = null;
      if (box) {
        box.innerHTML = '<div class="errbox">' + esc(error && error.message ? error.message : String(error)) + "</div>";
        box.hidden = false;
      }
      setStatus("うまくいきませんでした", true);
    } finally {
      stopProgress();
      if (skeleton) skeleton.hidden = true;
      busy = false;
      if (button) { button.disabled = false; button.textContent = RECIPE.rerunLabel; }
    }
  }

  /* ---------- 書き出し ---------- */

  function toPlainText() {
    if (!lastData) return "";
    if (lastData.raw) return lastData.raw;
    var lines = [CFG.title || "", "", lastData.summary || "", ""];
    (lastData.items || []).forEach(function (item, index) {
      lines.push("【" + (index + 1) + "】" + (item.title || "") + (item.level ? "（" + item.level + "）" : ""));
      FIELDS.forEach(function (field) {
        var value = (item.fields || {})[field];
        if (value) lines.push("  " + field + ": " + value);
      });
      lines.push("");
    });
    if ((lastData.checklist || []).length) {
      lines.push(RECIPE.checklistTitle);
      lastData.checklist.forEach(function (line) { lines.push("  ・" + line); });
      lines.push("");
    }
    if (lastData.note) lines.push(lastData.note, "");
    lines.push(RECIPE.disclaimer);
    lines.push("作成日時: " + (lastData.checkedAt || stamp()));
    return lines.join("\n");
  }

  function toResultHtml() {
    var box = qs("#result");
    var inner = box ? box.innerHTML : "";
    return "<!doctype html>\n<html lang=\"ja\"><head><meta charset=\"utf-8\" />"
      + '<meta name="viewport" content="width=device-width, initial-scale=1" />'
      + "<title>" + esc(CFG.title || "結果") + "</title><style>"
      + "body{margin:0;padding:24px;font-family:'Hiragino Sans','Noto Sans JP','Segoe UI',system-ui,sans-serif;line-height:1.75;color:#0b1c33;background:#f7fafd}"
      + "main{max-width:760px;margin:0 auto;background:#fff;padding:24px;border-radius:16px;border:1px solid #d6e0eb}"
      + "h1{font-size:1.3rem;margin:0 0 16px}.summary{padding:12px;border-radius:10px;background:rgba(16,69,126,.08);font-weight:700}"
      + ".item{margin-top:12px;padding:13px;border:1px solid #d6e0eb;border-radius:11px;background:#f3f7fb}"
      + ".item-head{display:flex;gap:8px;align-items:baseline;margin-bottom:8px}.item-head h3{margin:0;font-size:1rem}"
      + ".no{background:#10457e;color:#fff;border-radius:7px;padding:1px 7px;font-size:.78rem;font-weight:800}"
      + ".tag{margin-left:auto;background:rgba(14,143,158,.14);color:#0e8f9e;border-radius:999px;padding:2px 9px;font-size:.75rem;font-weight:800}"
      + ".kv>div{display:grid;grid-template-columns:96px 1fr;gap:8px;font-size:.9rem}.kv dt{color:#6b7f96;font-weight:700}.kv dd{margin:0}"
      + "table{border-collapse:collapse;width:100%;font-size:.88rem}th,td{border:1px solid #d6e0eb;padding:8px;text-align:left}"
      + ".check{padding-left:1.1em}.raw{white-space:pre-wrap}.hint{display:none}"
      + "</style></head><body><main><h1>" + esc(CFG.title || "結果") + "</h1>" + inner
      + '<p style="margin-top:20px;font-size:.8rem;color:#6b7f96">' + esc(RECIPE.disclaimer) + "</p></main></body></html>";
  }

  function download(filename, blob) {
    var url = URL.createObjectURL(blob);
    var link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
  }

  var crcTable = null;
  function crc32(bytes) {
    if (!crcTable) {
      crcTable = new Int32Array(256);
      for (var i = 0; i < 256; i++) {
        var value = i;
        for (var bit = 0; bit < 8; bit++) value = value & 1 ? (value >>> 1) ^ 0xedb88320 : value >>> 1;
        crcTable[i] = value;
      }
    }
    var crc = -1;
    for (var index = 0; index < bytes.length; index++) {
      crc = (crc >>> 8) ^ crcTable[(crc ^ bytes[index]) & 0xff];
    }
    return (crc ^ -1) >>> 0;
  }

  /** 無圧縮(store)ZIPを作る。日本語ファイル名のためUTF-8フラグを立てる。 */
  function makeZip(files) {
    var encoder = new TextEncoder();
    var chunks = [];
    var central = [];
    var offset = 0;

    function u16(value) { return [value & 0xff, (value >>> 8) & 0xff]; }
    function u32(value) { return [value & 0xff, (value >>> 8) & 0xff, (value >>> 16) & 0xff, (value >>> 24) & 0xff]; }

    files.forEach(function (file) {
      var nameBytes = encoder.encode(file.name);
      var dataBytes = encoder.encode(file.text);
      var crc = crc32(dataBytes);
      var local = [].concat(
        u32(0x04034b50), u16(20), u16(0x0800), u16(0), u16(0), u16(0),
        u32(crc), u32(dataBytes.length), u32(dataBytes.length),
        u16(nameBytes.length), u16(0)
      );
      chunks.push(new Uint8Array(local), nameBytes, dataBytes);
      central.push({ nameBytes: nameBytes, crc: crc, size: dataBytes.length, offset: offset });
      offset += local.length + nameBytes.length + dataBytes.length;
    });

    var centralStart = offset;
    var centralSize = 0;
    central.forEach(function (entry) {
      var header = [].concat(
        u32(0x02014b50), u16(20), u16(20), u16(0x0800), u16(0), u16(0), u16(0),
        u32(entry.crc), u32(entry.size), u32(entry.size),
        u16(entry.nameBytes.length), u16(0), u16(0), u16(0), u16(0), u32(0), u32(entry.offset)
      );
      chunks.push(new Uint8Array(header), entry.nameBytes);
      centralSize += header.length + entry.nameBytes.length;
    });

    chunks.push(new Uint8Array([].concat(
      u32(0x06054b50), u16(0), u16(0), u16(central.length), u16(central.length),
      u32(centralSize), u32(centralStart), u16(0)
    )));
    return new Blob(chunks, { type: "application/zip" });
  }

  function safeName() {
    return String(CFG.title || "結果").replace(/[\\/:*?"<>|]/g, "_").slice(0, 40);
  }

  async function handleAction(action) {
    var sub = qs("#sub");
    function say(message) { if (sub) sub.textContent = message; }
    if (action === "print") { window.print(); return; }
    if (!lastData) { say("先に実行してください"); return; }

    if (action === "copy") {
      try {
        await navigator.clipboard.writeText(toPlainText());
        say("結果をコピーしました");
      } catch (error) {
        say("コピーできませんでした。長押しで選択してコピーしてください");
      }
      return;
    }
    if (action === "txt") {
      download(safeName() + ".txt", new Blob([toPlainText()], { type: "text/plain;charset=utf-8" }));
      say("テキストで保存しました");
      return;
    }
    if (action === "html") {
      download(safeName() + ".html", new Blob([toResultHtml()], { type: "text/html;charset=utf-8" }));
      say("HTMLで保存しました");
      return;
    }
    if (action === "zip") {
      download(safeName() + ".zip", makeZip([
        { name: "結果.txt", text: toPlainText() },
        { name: "結果.html", text: toResultHtml() },
        { name: "ツール.html", text: ORIGINAL_HTML },
        { name: "README.txt", text: [CFG.title || "", "", "結果.html … 結果を見る", "ツール.html … このツール本体（ダブルクリックで開けます）", "", "作成日時: " + stamp()].join("\n") },
      ]));
      say("ZIPで保存しました（結果＋ツール本体）");
      return;
    }
  }

  /* ---------- 起動 ---------- */

  function init() {
    wirePicker();

    var views = qs("#views");
    if (views) {
      views.addEventListener("click", function (event) {
        var button = event.target.closest(".vw");
        if (!button) return;
        view = button.getAttribute("data-view") || "card";
        qsa(".vw", views).forEach(function (other) {
          other.setAttribute("aria-pressed", String(other === button));
        });
        render();
      });
    }

    var runButton = qs("#generate-button");
    if (runButton) {
      runButton.addEventListener("click", function (event) {
        event.preventDefault();
        run();
      });
    }

    var actions = qs("#actions");
    if (actions) {
      actions.addEventListener("click", function (event) {
        var button = event.target.closest("[data-do]");
        if (!button) return;
        event.preventDefault();
        handleAction(button.getAttribute("data-do"));
      });
    }

    window.__neneGenerate = run;
    window.__neneSelectTopic = function (button) {
      if (button && button.click) button.click();
    };
    // NENE Studio の自動テストから中身を確認するための入口
    window.__neneTool = {
      run: run,
      parse: parseResult,
      showText: function (text) { lastData = parseResult(text); render(); },
      getData: function () { return lastData; },
    };
  }

  init();
}

function buildRunnableToolFiles(options = {}) {
  const forPublish = Boolean(options.forPublish);
  const forceDemo = options.forceDemo !== false; // 既定はお試し（ダミー）で安全に動かす
  const proposal = getSelectedProposal();
  const summary = getSummary();
  const category = getSelectedCategory();
  const isEnglish = state.language === "en";
  const provider = state.settings.userApiProvider || "gemini";
  // セキュリティ: 成果物ファイルに APIキーを絶対に埋め込まない
  const hasApiKey = false;
  const geminiModel = DEFAULT_GEMINI_MODEL;
  const providerLabel = provider === "openai" ? "OpenAI" : "Google Gemini";
  const topicPresets = getTopicPresets();
  const defaultGenre = topicPresets[0] || (isEnglish ? "Popular topic" : "投資");
  const toolMode = getToolMode();
  // 目的文を初期テーマに入れない（テーマボタンが上書きできない原因だった）
  const defaultTopic = expandTopicFromChip(defaultGenre)
    || (isEnglish ? "When should I buy Bitcoin?" : "ビットコインはいつ買えばよいのか");
  const toolLabels = isEnglish
    ? {
        usage: "How to use",
        open: "Open the published URL on phone or PC (no HTML download).",
        api: "Live AI runs only as browser → NENE Studio API → Gemini. Keys stay in server env vars only.",
        paste: "Tap one genre chip, then press Create article. No news URL paste.",
        generate: "Create article",
        copy: "Copy result",
        copied: "Copied.",
        result: "Review the SEO article that appears.",
        requirements: "Requirements",
        apiKey: "Run mode",
        apiTitle: "Run mode",
        apiReadyTitle: "Run mode",
        inputTitle: "1. Pick a genre",
        workflowTitle: "What this tool does",
        genre: "Genre / what kind of topic",
        topic: "Selected theme",
        topicPlaceholder: "Tap a theme chip to fill this",
        moreOptions: "Optional: angle / length",
        angle: "Keywords / angle",
        anglePlaceholder: "Example: beginner-friendly, SEO, summary style",
        length: "Target length",
        length1500: "About 1500 chars",
        length3000: "About 3000 chars (recommended)",
        length5000: "About 5000 chars",
        outputTitle: "SEO article",
        statusNoKey: "Live mode needs a published URL. Try demo mode first.",
        statusNoInput: "Tap a genre chip first.",
        needKeyTitle: "Publish required",
        needKeyButton: "Retry in demo",
        needKeyHelp: "Demo works locally. For live AI, publish a URL in NENE Studio.",
        accepted: "Request accepted.",
        analyzing: "AI is analyzing…",
        slowHint: "Taking longer than usual.",
        generating: "AI is analyzing…",
        generatingButton: "Working...",
        waitHint: "AI is analyzing…",
        complete: "Article ready.",
        empty: "The result was empty.",
        error: "Error: ",
        errNetwork: "Network error: connection failed. Check your connection and retry.",
        errApiKey: "API key error: server key configuration is missing or invalid.",
        errAi: "AI error: the model failed to respond.",
        errEmpty: "Empty response: the AI returned no content.",
        errGeneric: "Request failed. Please try again later.",
        note: "Tap a genre → run. Live mode uses published URL only. No browser-direct Gemini/OpenAI.",
        provider: "Provider",
        saveKey: "Remember key (disabled)",
        warning: "API keys are never written into files. Server env vars only.",
        keyReady: "Publish settings loaded.",
        probe: "Connection test",
        probeOk: "Route: OK",
        probeSearchOk: "Search: available on published URL",
        probeSearchNg: "Search: unused in demo",
        probeFail: "Connection test failed",
        searchFailed: "Could not fetch latest news. Stock selection stopped. Try again later.",
        openaiNoSearch: "News-grounded tools require Gemini. OpenAI is not supported here.",
        sourcesTitle: "Sources",
        selectedTheme: "Selected theme: ",
        demoMode: "Demo (dummy)",
        liveMode: "Live (published URL)",
        demoBadge: "[DEMO]",
        promptGenre: "Genre/theme:",
        promptTopic: "Topic:",
        promptAngle: "Angle/keywords:",
        promptLength: "Target length:",
        disclaimer: "This is information structuring, not investment advice. Verify the latest numbers before publishing.",
      }
    : {
        usage: "使い方",
        open: "発行された公開URLをスマホやPCのブラウザで開きます（HTMLダウンロード不要）。",
        api: "本番AIはブラウザ→NENE Studio API→Geminiのみ。キーはサーバー環境変数で管理し、画面にもファイルにも出しません。",
        paste: "ジャンルボタンを1つ押して実行。ニュースURLのコピペは不要です。",
        generate: "記事を作成する",
        copy: "結果をコピー",
        copied: "コピーしました。",
        result: "SEO向けの記事が表示されます。",
        requirements: "必要なもの",
        apiKey: "実行モード",
        apiTitle: "実行モード",
        apiReadyTitle: "実行モード",
        inputTitle: "1. 何系かを選ぶ",
        workflowTitle: "このツールができること",
        genre: "ジャンル / 何系",
        topic: "選択中のテーマ",
        topicPlaceholder: "テーマボタンを押すとここに入ります",
        moreOptions: "切り口・文字数（任意）",
        angle: "キーワード・切り口",
        anglePlaceholder: "例：初心者向け、SEO、まとめ記事、注意点多め",
        length: "文字数目安",
        length1500: "約1500字",
        length3000: "約3000字（おすすめ）",
        length5000: "約5000字",
        outputTitle: "SEO記事",
        statusNoKey: "本番実行には公開URLが必要です。まずはお試しモードで操作を確認してください。",
        statusNoInput: "先にジャンルボタンを押してください。",
        needKeyTitle: "公開が必要です",
        needKeyButton: "お試しで再実行",
        needKeyHelp: "お試し（ダミー）のみローカルで動きます。本番はNENE Studioで公開URLを発行してください。",
        accepted: "処理を受け付けました。",
        analyzing: "AIが分析しています…",
        slowHint: "通常より時間が掛かっています。",
        generating: "AIが分析しています…",
        generatingButton: "処理中...",
        waitHint: "AIが分析しています…",
        complete: "記事ができました。",
        empty: "結果が空でした。",
        error: "エラー: ",
        errNetwork: "ネットワークエラー：通信に失敗しました。接続を確認して再試行してください。",
        errApiKey: "APIキーエラー：サーバー側のキー設定を確認してください。",
        errAi: "AIエラー：モデルからの応答に失敗しました。",
        errEmpty: "空レスポンス：AIから内容が返りませんでした。",
        errGeneric: "通信失敗：しばらくしてから再試行してください。",
        note: "テーマを押す → 実行。本番は公開URLのみ。ブラウザからGemini/OpenAIへ直接はつなぎません。",
        provider: "プロバイダー",
        saveKey: "無効",
        warning: "APIキーはHTMLに書き込みません。サーバー環境変数のみで管理します。",
        keyReady: "公開設定を読み込みました。",
        probe: "接続テスト",
        probeOk: "実行経路：正常",
        probeSearchOk: "検索機能：公開URLで利用",
        probeSearchNg: "検索機能：お試しでは未使用",
        probeFail: "接続テスト失敗",
        searchFailed: "最新ニュースを取得できなかったため、銘柄選定を中止しました。時間を置いて再実行してください。",
        openaiNoSearch: "ニュース根拠が必要なツールでは OpenAI は使えません。Gemini を選んでください。",
        sourcesTitle: "参照した情報源",
        selectedTheme: "選択テーマ：",
        demoMode: "お試し（ダミー）",
        liveMode: "本番（公開URL）",
        demoBadge: "【お試しモード】",
        promptGenre: "ジャンル/何系:",
        promptTopic: "テーマ:",
        promptAngle: "切り口/キーワード:",
        promptLength: "文字数目安:",
        disclaimer: "投資助言ではありません。最新の価格・制度は公開前に必ず確認してください。",
      };
  Object.assign(toolLabels, getModeToolLabelOverrides(getToolMode(), isEnglish));
  const docLabels = isEnglish
    ? {
        sampleTitle: `# ${proposal.title} Sample Output`,
        sampleResult: "## Output example",
        sampleInputs: "## Input example",
        sampleUsage: "## How to use",
        sampleFlow: "## Workflow",
        pressGenerate: `4. Press \`${toolLabels.generate}\``,
        filesTitle: "## Files",
        fileEnv: "- `.env` ... API key (already filled in if set at build time)",
        fileConfig: "- `config.js` ... browser config (same key as .env)",
        fileRun: "- `index.html` / `script.js` / `style.css` ... runtime files",
        cautionTitle: "## Caution",
        noLogin: "No NENE Studio login required. This folder works on its own.",
        setupSteps: [
          "1. Open the published URL in a browser.",
          "2. Tap a theme chip.",
          "3. Press the run button.",
          "4. Review the result (no HTML download needed).",
        ],
        setupRecommend: "Recommended: use the published URL",
        setupOpenAiNote: "API keys stay on the server only. End users never see them.",
      }
    : {
        sampleTitle: `# ${proposal.title} サンプル出力`,
        sampleResult: "## 出力例",
        sampleInputs: "## 入力例",
        sampleUsage: "## 使い方",
        sampleFlow: "## 処理の流れ",
        pressGenerate: `4. \`${toolLabels.generate}\` を押す`,
        filesTitle: "## ファイル",
        fileEnv: "- `.env` … APIキー（作成時に設定済みなら反映済み）",
        fileConfig: "- `config.js` … ブラウザ用の設定（.env と同じキー）",
        fileRun: "- `index.html` / `script.js` / `style.css` … 実行ファイル",
        cautionTitle: "## 注意",
        noLogin: "NENE Studio へのログインは不要です。このフォルダだけで使えます。",
        setupSteps: [
          "1. 発行された公開URLをブラウザで開きます。",
          "2. テーマボタンを押します。",
          "3. 画面の実行ボタンを押します。",
          "4. 結果を確認します（HTMLダウンロードは不要）。",
        ],
        setupRecommend: "おすすめ: 公開URLで利用",
        setupOpenAiNote: "APIキーはサーバー側のみ。利用者には見せません。",
      };

  const mode = getToolMode();
  const workflowLines = (
    mode === "stock_picker" || mode === "crypto_picker"
      ? (isEnglish
        ? ["1. Receive theme only", "2. Scan recent public info", "3. Shortlist 3-5 candidates", "4. Add reasons, risks, buy-before checks"]
        : ["1. テーマだけ受け取る", "2. 直近の公開情報を参照する", "3. 候補を3〜5件に絞る", "4. 理由・リスク・買う前チェックを付ける"])
      : mode === "fx_auto"
        ? (isEnglish
          ? ["1. Receive pair/style", "2. Build bias and entry rules", "3. Add stop/take-profit and risk", "4. Summarize EA-style if-then rules"]
          : ["1. ペア／手法を受け取る", "2. 方針とエントリー条件を作る", "3. 損切り・利確・リスクを付ける", "4. EA向け if-then に要約する"])
        : mode === "news_digest"
          ? (isEnglish
            ? ["1. Receive field", "2. Collect today's highlights", "3. Rank must-know topics", "4. Suggest next actions"]
            : ["1. 分野を受け取る", "2. 今日の注目を集める", "3. 必読トピックに絞る", "4. 次の行動を出す"])
          : (isEnglish
            ? ["1. Receive theme", "2. Auto-fill missing research", "3. Produce ready-to-use output", "4. Add caveats and next steps"]
            : ["1. テーマを受け取る", "2. 足りない調べものを自動補完する", "3. すぐ使える結果を出す", "4. 注意点と次の行動を付ける"])
  ).join("\n");
  const sampleTitle =
    mode === "stock_picker" ? (isEnglish ? "AI theme stock shortlist (semi-auto)" : "AI・半導体テーマの注目株（半自動選定）")
    : mode === "fx_auto" ? (isEnglish ? "USDJPY auto-trading style rules" : "ドル円の自動売買向けシグナル／ルール")
    : mode === "crypto_picker" ? (isEnglish ? "AI coin shortlist (semi-auto)" : "AI関連コインの注目リスト（半自動選定）")
    : mode === "news_digest" ? (isEnglish ? "Today's tech digest" : "今日のテック注目まとめ")
    : (isEnglish ? "Semi-auto ready output" : "半自動で使える実行結果");
  const sampleOutput = [
    docLabels.sampleTitle,
    "",
    docLabels.sampleResult,
    sampleTitle,
    "",
    isEnglish
      ? "Theme-only input. Shortlist with selection reasons, risks, and buy-before checks."
      : "テーマ選択だけ。注目リストには各銘柄の選定理由・リスク・買う前チェック付き。",
    "",
    docLabels.sampleInputs,
    isEnglish ? `Theme: ${defaultTopic}` : `テーマ: ${defaultTopic}`,
    "",
    docLabels.sampleUsage,
    toolLabels.paste,
    "",
    docLabels.sampleFlow,
    workflowLines,
  ].join("\n");

  const readme = [
    `# ${proposal.title}`,
    "",
    summary.purpose,
    "",
    `## ${toolLabels.usage}`,
    `1. ${toolLabels.open}`,
    `2. ${toolLabels.api}`,
    `3. ${toolLabels.paste}`,
    docLabels.pressGenerate,
    `5. ${toolLabels.result}`,
    "",
    `## ${toolLabels.requirements}`,
    `- ${toolLabels.apiKey}`,
    `- ${toolLabels.note}`,
    "",
    docLabels.filesTitle,
    docLabels.fileEnv,
    docLabels.fileConfig,
    docLabels.fileRun,
    "",
    docLabels.cautionTitle,
    toolLabels.warning,
    toolLabels.disclaimer,
    docLabels.noLogin,
  ].join("\n");

  const setup = [
    "# setup",
    "",
    ...docLabels.setupSteps,
    "",
    docLabels.setupRecommend,
    docLabels.setupOpenAiNote,
    "",
    toolLabels.warning,
  ].join("\n");

  const envContent = [
    `# ${proposal.title} - APIキー設定（プレースホルダのみ。実キーは書き込みません）`,
    `# プロバイダー: gemini または openai`,
    `AI_PROVIDER=${provider}`,
    "GEMINI_API_KEY=",
    "OPENAI_API_KEY=",
    "API_KEY=",
    `GEMINI_MODEL=${geminiModel}`,
  ].join("\n");

  const envExample = [
    "AI_PROVIDER=gemini",
    "GEMINI_API_KEY=",
    "OPENAI_API_KEY=",
    "API_KEY=",
    `GEMINI_MODEL=${geminiModel}`,
  ].join("\n");

  const apiKeysExample = [
    "# 旧ファイル名互換。実キーはここに書かず、実行時に画面入力してください。",
    "AI_PROVIDER=gemini",
    "GEMINI_API_KEY=",
    "OPENAI_API_KEY=",
  ].join("\n");

  const recipe = resolveToolRecipe();
  const promptCtx = {
    title: proposal.title,
    purpose: summary.purpose,
    market: state.answers.market || "",
    targetUser: state.custom.targetUser || "初心者",
  };
  const recipePrompt = buildRecipeSystemPrompt(recipe, promptCtx);

  const configJs = [
    "// ブラウザ用設定。セキュリティのため apiKey は常に空。本番はサーバー代理のみ。",
    "window.TOOL_CONFIG = {",
    `  provider: ${JSON.stringify(provider)},`,
    '  apiKey: "",',
    `  geminiModel: ${JSON.stringify(geminiModel)},`,
    `  requireNewsSearch: ${JSON.stringify(recipe.requireSearch)},`,
    "  requireProxy: true,",
    `  demoMode: ${JSON.stringify(forPublish ? false : forceDemo)},`,
    `  publishSlug: ${JSON.stringify(forPublish ? "__NENE_SLUG__" : "")},`,
    `  apiBase: ${JSON.stringify(forPublish ? "__NENE_API_BASE__" : getStudioApiBase())},`,
    `  title: ${JSON.stringify(proposal.title)},`,
    `  category: ${JSON.stringify(category.name)},`,
    `  purpose: ${JSON.stringify(state.answers.purpose || "")},`,
    `  market: ${JSON.stringify(state.answers.market || "")},`,
    `  toolMode: ${JSON.stringify(toolMode)},`,
    `  isInvestment: ${JSON.stringify(Boolean(category.isInvestment))},`,
    `  systemPrompt: ${JSON.stringify(recipePrompt)},`,
    `  recipe: ${JSON.stringify(recipe)},`,
    "};",
  ].join("\n");

  // 見た目はJSが動く前に完成させる（起動を待たせないため）
  const indexHtml = [
    "<!doctype html>",
    `<html lang="${isEnglish ? "en" : "ja"}">`,
    "<head>",
    '  <meta charset="utf-8" />',
    '  <meta name="viewport" content="width=device-width, initial-scale=1" />',
    '  <meta name="robots" content="noindex,nofollow" />',
    `  <title>${escapeHtml(proposal.title)}</title>`,
    '  <link rel="stylesheet" href="./style.css" />',
    "</head>",
    "<body>",
    buildToolBodyHtml(recipe, promptCtx),
    '  <script src="./config.js"></script>',
    '  <script src="./script.js"></script>',
    "</body>",
    "</html>",
  ].join("\n");

  const styleCss = NENE_TOOL_CSS;

  // 共通ランタイムをそのまま埋め込む（ツールごとの差はレシピ＝データ側だけ）
  const scriptJs = `(${neneToolRuntime.toString()})();`;

  // ZIP/HTMLとも index.html だけでJSが動くよう自己完結版にする（外部script依存をなくす）
  const packedIndexHtml = buildLaunchHtml({
    indexHtml,
    styleCss,
    scriptJs,
    configJs,
  });

  return {
    readme,
    setup,
    apiKeys: apiKeysExample,
    envContent,
    envExample,
    configJs,
    mainPrompt: recipePrompt,
    nodes: workflowLines,
    sampleOutput,
    indexHtml: packedIndexHtml,
    styleCss,
    scriptJs,
    hasApiKey,
  };
}

function getExportText(format) {
  const blueprintText = buildBlueprintText();
  const files = buildRunnableToolFiles();
  const keyNote = "※ セキュリティのため APIキーは成果物ファイルに書き込みません。起動画面で入力するか、NENE Studioの「作成したツールを起動する」で一時受け渡ししてください。";
  const exportTextByFormat = {
    html: files.indexHtml,
    folder: `NENE_Tool/
  README.md
  index.html
  style.css
  script.js
  config.js
  .env
  .env.example
  setup.md
  config/
    api_keys.example
  prompts/
    main_prompt.md
  workflow/
    nodes.md
  output/
    sample_output.md
  tool_design.md

${keyNote}

--- README.md ---
${files.readme}

--- .env ---
${files.envContent}

--- config.js ---
${files.configJs}

--- index.html ---
${files.indexHtml}

--- style.css ---
${files.styleCss}

--- script.js ---
${files.scriptJs}

--- setup.md ---
${files.setup}

--- config/api_keys.example ---
${files.apiKeys}

--- prompts/main_prompt.md ---
${files.mainPrompt}

--- workflow/nodes.md ---
${files.nodes}

--- output/sample_output.md ---
${files.sampleOutput}

--- tool_design.md ---
${blueprintText}`,
    zip: `ZIPに入れる内容:
- README.md
- index.html
- style.css
- script.js
- config.js
- .env
- .env.example
- setup.md
- config/api_keys.example
- prompts/main_prompt.md
- workflow/nodes.md
- output/sample_output.md
- tool_design.md

${keyNote}
解凍して index.html を開くと、NENE Studio なしで単体動作します。

--- README.md ---
${files.readme}

--- .env ---
${files.envContent}

--- config.js ---
${files.configJs}

--- index.html ---
${files.indexHtml}

--- style.css ---
${files.styleCss}

--- script.js ---
${files.scriptJs}

--- setup.md ---
${files.setup}

--- config/api_keys.example ---
${files.apiKeys}

--- prompts/main_prompt.md ---
${files.mainPrompt}

--- workflow/nodes.md ---
${files.nodes}

--- output/sample_output.md ---
${files.sampleOutput}

--- tool_design.md ---
${blueprintText}`,
    api: `APIキー入力形式:
設定画面の BYOK（自分のAPIキー）が .env / config.js に入り、単体で動くツールになります。
${keyNote}

1. index.html をブラウザで開く
2. APIキーが未入力なら画面で入れる（設定済みなら自動入力）
3. テーマボタンを1つ押す（ニュースURLのコピペは不要）
4. 実行ボタンを押す（選定／シグナル／半自動実行）

--- .env ---
${files.envContent}

--- config.js ---
${files.configJs}

--- index.html ---
${files.indexHtml}

--- script.js ---
${files.scriptJs}

--- prompts/main_prompt.md ---
${files.mainPrompt}

${blueprintText}`,
    codex: `Codexに渡す指示:
以下のファイル一式を作成してください。index.html をブラウザで開くと、config.js / .env の APIキー（または画面入力）でそのまま使えるスタンドアロンツールにしてください。
Gemini または OpenAI にブラウザから直接接続し、NENE Studio サーバーには依存しないでください。

--- README.md ---
${files.readme}

--- .env ---
${files.envContent}

--- config.js ---
${files.configJs}

--- index.html ---
${files.indexHtml}

--- style.css ---
${files.styleCss}

--- script.js ---
${files.scriptJs}

--- prompts/main_prompt.md ---
${files.mainPrompt}

--- workflow/nodes.md ---
${files.nodes}

--- tool_design.md ---
${blueprintText}`,
    claude: `Claude Codeに渡す指示:
以下のファイル一式を作成してください。README、setup、.env、config.js、実行画面、Gemini/OpenAI 直接呼び出し、エラー表示、サンプル出力を含めてください。NENE Studio API には依存しないスタンドアロン構成にしてください。

--- README.md ---
${files.readme}

--- .env ---
${files.envContent}

--- config.js ---
${files.configJs}

--- index.html ---
${files.indexHtml}

--- style.css ---
${files.styleCss}

--- script.js ---
${files.scriptJs}

--- setup.md ---
${files.setup}

--- config/api_keys.example ---
${files.apiKeys}

--- prompts/main_prompt.md ---
${files.mainPrompt}

--- workflow/nodes.md ---
${files.nodes}

--- output/sample_output.md ---
${files.sampleOutput}

--- tool_design.md ---
${blueprintText}`,
  };

  return exportTextByFormat[format] || exportTextByFormat.html;
}

function adsCurrentlyEnabled() {
  return window.NENE_ADS?.enabled !== false && !state.auth.user?.isAdFree;
}

function fillSponsorLabel(labelEl) {
  if (!labelEl) return;
  const name = window.NeneAds?.getLastBannerName?.() || "";
  const base = state.language === "en" ? "Sponsored" : "スポンサー";
  labelEl.textContent = name ? `${base}（${name}）` : base;
}

function loadExportSponsor() {
  // 広告は「公開URLを発行する」を押したあとの全画面にだけ出す
  const wrap = $("#export-sponsor");
  if (wrap) wrap.hidden = true;
}

function startPublishFromUi() {
  if (!state.auth.authenticated && !state.auth.token) {
    state.status = "公開にはログインが必要です。ログイン後にもう一度「公開URLを発行する」を押してください。";
    state.publishError = "公開にはログインが必要です。";
    renderExportStatusOnly();
    activateScreen("login");
    return;
  }
  const visibility = getSelectedPublishVisibility();
  const password = String($("#publish-password")?.value || "");
  if (visibility === "password" && password.length < 4) {
    state.status = "パスワード保護には4文字以上のパスワードが必要です。";
    state.publishError = state.status;
    renderExportStatusOnly();
    return;
  }
  if (!adsCurrentlyEnabled()) {
    publishCreatedTool({ openAfter: true, autoTest: true });
    return;
  }
  // 広告を見ているあいだに公開URLを発行し、ボタンでツールを開く（ポップアップ止めを防ぐ）
  const publishPromise = publishCreatedTool({ openAfter: false, autoTest: true });
  showAdThenLaunch(publishPromise);
}

function renderApiKeyNotice() {
  const notice = $("#api-key-notice");
  if (!notice) return;
  const ai = state.serverStatus?.ai;
  const ready = Boolean(ai?.gemini || ai?.openai);
  notice.hidden = false;
  notice.classList.toggle("is-warning", !ready);
  notice.textContent = ready
    ? ".env のキーは、ログインした作成者が公開URLを開いたときだけ使います。他人が開いても運営のキーは使わず、見本が出ます。"
    : "自分の確認用に動かすには、.env に GEMINI_API_KEY を入れてサーバーを再起動してください。他人が公開URLを開いても、運営のキーは使いません。";
}

async function copyExport() {
  if (adsCurrentlyEnabled() && !state.auth.user?.isAdFree) {
    showAdBeforeOutput(runOutput);
    return;
  }
  runOutput();
}

async function runOutput() {
  // 主成果物は公開URL。ZIPは完全廃止。
  if (!state.exportFormat || state.exportFormat === "publish" || state.exportFormat === "zip" || state.exportFormat === "html") {
    state.exportFormat = "publish";
    await publishCreatedTool({ openAfter: true, autoTest: true });
    return;
  }
  saveUserApiKey();
  const files = buildRunnableToolFiles();
  const text = getExportText(state.exportFormat);
  const proposal = getSelectedProposal();
  const keyStatus = "APIキーは成果物ファイルに書き込みません。本番は公開URLを使ってください。";
  state.createdOutput = {
    title: proposal.title,
    format: state.exportFormat,
    text,
  };
  try {
    if (state.exportFormat === "zip") {
      const zipBlob = createZipBlob(getRunnableFileMap(files));
      downloadBlob(zipBlob, `${sanitizeFileName(proposal.title)}.zip`);
    } else if (state.exportFormat === "html") {
      const htmlBlob = new Blob([files.indexHtml], { type: "text/html;charset=utf-8" });
      downloadBlob(htmlBlob, `${sanitizeFileName(proposal.title)}.html`);
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      downloadGeneratedFile(text, state.exportFormat, proposal.title);
    } else {
      fallbackCopy(text);
      downloadGeneratedFile(text, state.exportFormat, proposal.title);
    }
    state.status = state.exportFormat === "zip"
      ? `バックアップZIPを保存しました。${keyStatus}`
      : state.exportFormat === "html"
        ? `HTMLを保存しました。通常は公開URLを使ってください。${keyStatus}`
        : `作成内容を出力しました。${keyStatus}`;
  } catch (error) {
    state.status = `出力失敗: ${error.message || error}`;
  }
  activateScreen("export");
  renderAll();
}

function openAdOverlay() {
  if (adOverlay && !adOverlay.hidden) return false;
  const waitSeconds = window.NeneAds?.getWaitSeconds?.() ?? 5;
  const countdown = $("#ad-countdown");
  const countdownNumber = $("#ad-countdown-number");
  adOverlay.hidden = false;
  if (adContinue) {
    adContinue.hidden = true;
    adContinue.disabled = true;
    adContinue.textContent = state.language === "en" ? "continue" : "続ける";
  }
  const launchBtn = $("#ad-launch");
  if (launchBtn) launchBtn.hidden = true;
  if (countdown) countdown.hidden = false;
  if (countdownNumber) countdownNumber.textContent = String(Math.max(0, waitSeconds));
  fillSponsorLabel($("#ad-label"));
  const adSlot = $("#ad-slot");
  if (adSlot && window.NeneAds?.loadSlot) {
    window.NeneAds.loadSlot(adSlot).then(() => fillSponsorLabel($("#ad-label"))).catch(() => {});
  }
  return waitSeconds;
}

function showAdBeforeOutput(callback) {
  if (!adsCurrentlyEnabled()) {
    callback();
    return;
  }
  const waitSeconds = openAdOverlay();
  if (waitSeconds === false) return;
  let seconds = waitSeconds;
  const countdown = $("#ad-countdown");
  const countdownNumber = $("#ad-countdown-number");
  const timer = window.setInterval(() => {
    seconds -= 1;
    if (countdownNumber) countdownNumber.textContent = String(Math.max(0, seconds));
    if (seconds <= 0) {
      window.clearInterval(timer);
      if (countdown) countdown.hidden = true;
      adContinue.hidden = false;
      adContinue.disabled = false;
    }
  }, 1000);
  adContinue.onclick = () => {
    adOverlay.hidden = true;
    adContinue.onclick = null;
    window.clearInterval(timer);
    callback();
  };
}

function showAdThenLaunch(publishPromise) {
  const waitSeconds = openAdOverlay();
  if (waitSeconds === false) return;
  let seconds = waitSeconds;
  let readyUrl = "";
  let failed = "";
  const countdown = $("#ad-countdown");
  const countdownNumber = $("#ad-countdown-number");
  const launchBtn = $("#ad-launch");

  const bindLaunchLink = () => {
    if (!launchBtn || !readyUrl) return;
    launchBtn.href = readyUrl;
    launchBtn.removeAttribute("aria-disabled");
    if (isPhoneViewport()) launchBtn.removeAttribute("target");
    else {
      launchBtn.target = "_blank";
      launchBtn.rel = "noopener";
    }
  };

  const refreshLaunch = () => {
    if (seconds > 0) return;
    if (countdown) countdown.hidden = true;
    if (adContinue) adContinue.hidden = true;
    if (!launchBtn) return;
    if (failed) {
      launchBtn.hidden = false;
      launchBtn.removeAttribute("aria-disabled");
      launchBtn.removeAttribute("href");
      launchBtn.textContent = state.language === "en" ? "Close" : "閉じる";
      return;
    }
    if (readyUrl) {
      launchBtn.hidden = false;
      launchBtn.textContent = state.language === "en" ? "Open the live URL" : "本番URLを開く";
      bindLaunchLink();
      return;
    }
    launchBtn.hidden = false;
    launchBtn.setAttribute("aria-disabled", "true");
    launchBtn.removeAttribute("href");
    launchBtn.textContent = state.language === "en" ? "Preparing…" : "発行しています…";
  };

  Promise.resolve(publishPromise).then(() => {
    readyUrl = toPhoneReachableUrl(state.lastPublish?.url || "");
    failed = state.publishError || (readyUrl ? "" : "公開URLを発行できませんでした。");
    refreshLaunch();
  }).catch((error) => {
    failed = error?.message || "公開に失敗しました。";
    refreshLaunch();
  });

  const timer = window.setInterval(() => {
    seconds -= 1;
    if (countdownNumber) countdownNumber.textContent = String(Math.max(0, seconds));
    if (seconds <= 0) {
      window.clearInterval(timer);
      refreshLaunch();
    }
  }, 1000);

  if (launchBtn) {
    launchBtn.onclick = (event) => {
      window.clearInterval(timer);
      if (!readyUrl) {
        event.preventDefault();
        adOverlay.hidden = true;
        launchBtn.onclick = null;
        return;
      }
      // スマホは <a href> のまま同じ画面で開く（別タブは止まりやすい）
      if (isPhoneViewport()) return;
      adOverlay.hidden = true;
    };
  }
}

async function saveCreatedTool() {
  if (!state.createdOutput) {
    state.status = "先に「ツールを作成する」を押してください。";
    renderAll();
    return;
  }
  if (!$("#save-created-choice").checked) {
    state.status = "保存する場合は「作成したツールを保存する」にチェックしてください。";
    renderAll();
    return;
  }
  const saved = saveCurrentBlueprint();
  if (saved && state.auth.token) {
    await saveLatestToolToServer();
  }
  state.status = saved ? "作成したツールを保存済みに追加しました。" : "同じ名前のツールはすでに保存済みです。";
  $("#save-created-choice").checked = false;
  renderAll();
  activateScreen("saved");
}

function launchCreatedTool() {
  previewCreatedTool();
}

function previewCreatedTool() {
  saveUserApiKey();
  const files = buildRunnableToolFiles({ forceDemo: true, forPublish: false });
  const dialog = $("#tool-preview-dialog");
  const frame = $("#tool-preview-frame");
  if (dialog && frame && typeof dialog.showModal === "function") {
    frame.srcdoc = files.indexHtml;
    dialog.showModal();
    state.status = "プレビューを開きました（お試し＝ダミーデータ。APIキー不要）。";
  } else {
    const blob = new Blob([files.indexHtml], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    state.status = "プレビューを別タブで開きました（お試しモード）。";
  }
  renderExportStatusOnly();
}

function renderExportStatusOnly() {
  const exportStatus = $("#export-status");
  if (exportStatus) exportStatus.textContent = state.status;
  const report = $("#export-test-report");
  if (report && state.lastTestReport) report.textContent = state.lastTestReport;
  const publishUrl = $("#publish-url");
  const publishQr = $("#publish-qr");
  const publishMeta = $("#publish-meta");
  const shareActions = $("#publish-share-actions");
  if (state.lastPublish?.url) {
    const mainUrl = toPhoneReachableUrl(state.lastPublish.url);
    if (publishUrl) {
      publishUrl.innerHTML = [
        `<a href="${escapeAttribute(mainUrl)}">${escapeHtml(mainUrl)}</a>`,
        `<br><small>同じWi-Fiのスマホでも、このアドレスを開けます。</small>`,
      ].filter(Boolean).join("");
    }
    if (publishQr) {
      publishQr.hidden = false;
      publishQr.src = state.lastPublish.qrUrl || `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(mainUrl)}`;
    }
    if (shareActions) shareActions.hidden = false;
    const openLink = $("#open-publish-url");
    if (openLink) {
      openLink.hidden = false;
      openLink.href = mainUrl;
      openLink.textContent = state.language === "en" ? "Open the live URL" : "本番URLを開く";
      if (isPhoneViewport()) openLink.removeAttribute("target");
      else {
        openLink.target = "_blank";
        openLink.rel = "noopener";
      }
    }
    const downloadActions = $("#publish-download-actions");
    if (downloadActions) downloadActions.hidden = false;
    const downloadNote = $("#download-note");
    if (downloadNote) {
      downloadNote.textContent = state.lastPublish.visibility === "password"
        ? "このツールはパスワード保護のため、保存したファイルからは実行できません。公開URLから開いてください。"
        : "保存したHTMLは、ダブルクリックで開けばそのまま使えます（インターネット接続が必要です）。";
    }
    if (publishMeta) {
      const visLabel = {
        private: "リンクを知っている人だけ",
        password: "パスワード付き",
        public: "一般公開",
      }[state.lastPublish.visibility] || "リンクを知っている人だけ";
      publishMeta.textContent = `公開範囲: ${visLabel}。このURLを開けばすぐ使えます。`;
    }
  } else if (state.publishError && publishUrl) {
    publishUrl.textContent = state.publishError;
    if (shareActions) shareActions.hidden = true;
    const downloadActions = $("#publish-download-actions");
    if (downloadActions) downloadActions.hidden = true;
    if (publishQr) publishQr.hidden = true;
    const openLink = $("#open-publish-url");
    if (openLink) openLink.hidden = true;
    if (publishMeta) publishMeta.textContent = "";
  }
}

function syncPublishVisibilityUi() {
  const selected = document.querySelector("input[name='publish-visibility']:checked");
  const row = document.querySelector(".publish-password-row");
  if (row) row.hidden = selected?.value !== "password";
}

function getSelectedPublishVisibility() {
  return document.querySelector("input[name='publish-visibility']:checked")?.value || "private";
}

function isActionTestPassed(report = state.lastTestReport) {
  const text = String(report || "");
  if (!text) return false;
  // 公開前の安全チェック、または詳細テスト成功のどちらかでOK
  if (/公開前チェック: 成功/.test(text)) return true;
  if (/自動クリックテスト: 成功/.test(text) && !/^NG /m.test(text)) return true;
  return false;
}

/** 公開に必要な最低限の安全チェック（iframeの揺れで止まらない） */
function runPublishSafetyCheck() {
  const files = buildRunnableToolFiles({ forceDemo: true, forPublish: false });
  const lines = [];
  const push = (ok, msg) => lines.push(`${ok ? "OK" : "NG"} ${msg}`);
  push(!!files.indexHtml, "ページを生成できる");
  push(/generate-button/.test(files.indexHtml || ""), "実行ボタンがある");
  push(/apiKey:\s*""/.test(files.configJs || ""), "APIキーを埋め込んでいない");
  push(!/generativelanguage\.googleapis\.com/.test(files.scriptJs || ""), "Geminiへ直接つながない");
  push(!/api\.openai\.com/.test(files.scriptJs || ""), "OpenAIへ直接つながない");
  push(/runViaPublishedProxy/.test(files.scriptJs || ""), "サーバー経由で動く");
  push(/demoMode/.test(files.configJs || ""), "お試し動作がある");
  const failed = lines.some((line) => line.startsWith("NG"));
  const summary = [
    `公開前チェック: ${failed ? "失敗" : "成功"}`,
    `確認日時: ${new Date().toLocaleString("ja-JP")}`,
    "",
    ...lines,
  ].join("\n");
  state.lastTestReport = summary;
  return !failed;
}

async function copyPublishUrl() {
  const url = toPhoneReachableUrl(state.lastPublish?.url);
  if (!url) {
    state.status = "まだ公開URLがありません。";
    renderExportStatusOnly();
    return;
  }
  try {
    await navigator.clipboard.writeText(url);
    state.status = "公開URLをコピーしました。";
  } catch {
    state.status = "コピーに失敗しました。URLを長押ししてコピーしてください。";
  }
  renderExportStatusOnly();
}

async function sharePublishUrl() {
  const url = toPhoneReachableUrl(state.lastPublish?.url);
  const title = state.lastPublish?.title || getSelectedProposal()?.title || "NENE Tool";
  if (!url) {
    state.status = "まだ公開URLがありません。";
    renderExportStatusOnly();
    return;
  }
  if (navigator.share) {
    try {
      await navigator.share({ title, text: state.lastPublish.shareText || title, url });
      state.status = "共有しました。";
    } catch {
      state.status = "共有をキャンセルしました。";
    }
  } else {
    await copyPublishUrl();
    state.status = "共有機能が使えないため、URLをコピーしました。";
  }
  renderExportStatusOnly();
}

async function runCreatedToolActionTest() {
  saveUserApiKey();
  const reportEl = $("#export-test-report");
  const lines = [];
  const push = (ok, msg) => lines.push(`${ok ? "OK" : "NG"} ${msg}`);
  try {
    if (reportEl) reportEl.textContent = "自動クリックテスト中...";
    const files = buildRunnableToolFiles({ forceDemo: true, forPublish: false });
    push(!!files.indexHtml, "ページHTMLを生成");
    push(/generate-button/.test(files.indexHtml), "実行ボタンがある");
    push(/__neneGenerate/.test(files.indexHtml), "ボタン用JavaScriptがある");
    push(/demoMode/.test(files.configJs), "お試しモード設定がある");
    push(/apiKey:\s*""/.test(files.configJs), "HTMLにAPIキーを埋め込んでいない");
    push(/noindex,nofollow/.test(files.indexHtml), "検索除外メタがある");
    push(/recipe:/.test(files.configJs), "レシピが埋め込まれている");
    push(/data-axis=/.test(files.indexHtml), "選択エリアがある");
    push(/data-do="zip"/.test(files.indexHtml), "保存ボタンがある");
    push(/data-view="table"/.test(files.indexHtml), "結果の見せ方を切り替えられる");
    push(!/読み込み中/.test(files.indexHtml), "起動時に「読み込み中」を出さない");
    push(/通信に失敗しました/.test(files.scriptJs), "通信エラー表示がある");
    push(/本番実行には公開URLが必要/.test(files.scriptJs), "未公開時の案内がある");
    push(/viewport/.test(files.indexHtml), "レスポンシブ用viewportがある");

    const iframe = document.createElement("iframe");
    iframe.setAttribute("sandbox", "allow-scripts allow-same-origin");
    iframe.style.cssText = "position:fixed;left:-9999px;width:390px;height:844px;opacity:0;pointer-events:none;";
    document.body.appendChild(iframe);
    await new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error("プレビュー読み込みタイムアウト")), 8000);
      iframe.onload = () => {
        clearTimeout(timer);
        resolve();
      };
      iframe.srcdoc = files.indexHtml;
    });
    await new Promise((r) => setTimeout(r, 350));
    const win = iframe.contentWindow;
    const doc = iframe.contentDocument;
    if (!win || !doc) throw new Error("プレビューDOMを取得できません");
    push(true, "ページが開く（スマホ幅390px）");

    // JSが動く前から画面が完成しているか（起動を待たせないため）
    push(doc.querySelectorAll(".chip").length > 0, "最初からボタンが並んでいる");
    push((doc.querySelector("#picked")?.textContent || "").trim().length > 0, "選択内容が最初から出ている");

    const chips = Array.from(doc.querySelectorAll('.row[data-axis] .chip'));
    const target = chips.find((item) => item.getAttribute("aria-pressed") !== "true") || chips[0];
    push(!!target, "選択ボタンがある");
    if (target) {
      target.click();
      await new Promise((r) => setTimeout(r, 80));
      const picked = doc.querySelector("#picked")?.textContent || "";
      push(picked.includes(target.getAttribute("data-value") || ""), "ボタンを押すと選択が変わる");
    }

    const pencil = doc.querySelector(".row[data-axis] .pencil");
    push(!!pencil, "「自分で書く」がある");
    if (pencil) {
      pencil.click();
      await new Promise((r) => setTimeout(r, 60));
      const freeInput = doc.querySelector(".row[data-axis] .free input");
      if (freeInput) {
        freeInput.value = "テスト入力";
        freeInput.dispatchEvent(new win.Event("input", { bubbles: true }));
        await new Promise((r) => setTimeout(r, 60));
        const picked = doc.querySelector("#picked")?.textContent || "";
        push(picked.includes("テスト入力"), "自由入力が選択より優先される");
      } else {
        push(false, "自由入力欄が開く");
      }
    }

    const generate = doc.querySelector("#generate-button");
    push(!!generate, "ボタンを押せる（実行ボタンあり）");
    if (generate) {
      let sawLoading = false;
      const loadingObserver = new MutationObserver(() => {
        const skeleton = doc.querySelector("#skeleton");
        const status = doc.querySelector("#status");
        if ((skeleton && !skeleton.hidden) || (status && !status.hidden)) sawLoading = true;
      });
      loadingObserver.observe(doc.body, { subtree: true, childList: true, attributes: true, characterData: true });

      if (typeof win.__neneGenerate === "function") {
        win.__neneGenerate();
      } else {
        generate.click();
      }

      await new Promise((r) => setTimeout(r, 120));
      const skeletonNow = doc.querySelector("#skeleton");
      if (skeletonNow && !skeletonNow.hidden) sawLoading = true;

      let resultText = "";
      let itemCount = 0;
      for (let i = 0; i < 30; i += 1) {
        await new Promise((r) => setTimeout(r, 100));
        const box = doc.querySelector("#result");
        itemCount = doc.querySelectorAll("#result .item").length;
        resultText = box && !box.hidden ? box.textContent || "" : "";
        if (itemCount > 0 && resultText.length > 40) break;
      }
      loadingObserver.disconnect();

      push(sawLoading, "待っている間の表示が出る");
      push(itemCount > 0, "結果が項目ごとに表示される");
      push(resultText.length > 40, "結果テキストが空でない");
      push(!doc.querySelector("#actions")?.hidden, "保存・コピーのボタンが出る");

      const tableButton = doc.querySelector('.vw[data-view="table"]');
      if (tableButton) {
        tableButton.click();
        await new Promise((r) => setTimeout(r, 80));
        push(doc.querySelectorAll("#result table tbody tr").length > 0, "表に切り替えられる");
        doc.querySelector('.vw[data-view="card"]')?.click();
      }
    }

    // PC幅でも崩れない簡易チェック
    iframe.style.width = "1280px";
    iframe.style.height = "800px";
    await new Promise((r) => setTimeout(r, 80));
    const shell = doc.querySelector(".wrap");
    const shellWidth = shell?.getBoundingClientRect?.().width || 0;
    push(shellWidth > 200, "PC幅でもレイアウトが存在する");
    push(!!doc.querySelector("h1"), "見出しが表示される");

    push(!/generativelanguage\.googleapis\.com/.test(files.scriptJs), "ブラウザからGemini直結していない");
    push(!/api\.openai\.com/.test(files.scriptJs), "ブラウザからOpenAI直結していない");
    push(/runViaPublishedProxy/.test(files.scriptJs), "公開URL用のサーバー代理がある");

    iframe.remove();
    const failed = lines.some((line) => line.startsWith("NG"));
    const summary = [
      `自動クリックテスト: ${failed ? "失敗" : "成功"}`,
      `確認日時: ${new Date().toLocaleString("ja-JP")}`,
      "",
      ...lines,
    ].join("\n");
    state.lastTestReport = summary;
    state.status = failed
      ? "動作テストでNGがあります。合格するまで公開できません。"
      : "動作テスト成功。公開オプションを選んで「公開URLを発行する」へ進んでください。";
  } catch (error) {
    state.lastTestReport = `自動クリックテスト: 失敗\n${error.message || error}`;
    state.status = `動作テスト失敗: ${error.message || error}`;
  }
  renderExportStatusOnly();
  renderAll();
}

/**
 * 保存用のHTMLを作る。
 * ダブルクリックで開いても動くよう、公開先のURLを絶対パスで埋め込む。
 */
function buildDownloadableToolHtml() {
  const publish = state.lastPublish;
  if (!publish?.slug) return null;
  const files = buildRunnableToolFiles({ forceDemo: false, forPublish: true });
  const apiOrigin = new URL(publish.url, window.location.href).origin;
  return files.indexHtml
    .replaceAll("__NENE_SLUG__", publish.slug)
    .replaceAll("__NENE_API_BASE__", `${apiOrigin}/api`)
    .replaceAll("__NENE_DEMO_MODE__", "false");
}

function toSafeFileName(value) {
  return String(value || "作成ツール").replace(/[\\/:*?"<>|]/g, "_").slice(0, 40);
}

function requirePublishedTool() {
  if (state.lastPublish?.slug) return true;
  state.status = "先に「公開URLを発行する」を押してください。発行前のファイルは本物のAIにつながりません。";
  renderExportStatusOnly();
  return false;
}

function downloadCreatedToolHtml() {
  if (!requirePublishedTool()) return;
  const html = buildDownloadableToolHtml();
  if (!html) return;
  const name = toSafeFileName(state.lastPublish.title);
  downloadBlob(new Blob([html], { type: "text/html;charset=utf-8" }), `${name}.html`);
  state.status = `${name}.html を保存しました。ダブルクリックで開けます。`;
  renderExportStatusOnly();
}

function downloadCreatedToolZip() {
  if (!requirePublishedTool()) return;
  const html = buildDownloadableToolHtml();
  if (!html) return;
  const name = toSafeFileName(state.lastPublish.title);
  const readme = [
    name,
    "",
    "【使い方】",
    "1. tool.html をダブルクリックして開きます。",
    "2. ボタンを選んで、実行ボタンを押します。",
    "3. 結果が出たら、コピー・保存・印刷ができます。",
    "",
    "【公開URL】",
    state.lastPublish.url,
    "スマホで使うときは、こちらのURLを開いてください。",
    "",
    "【注意】",
    "・インターネット接続が必要です。",
    "・本番AIは、作成者がログインした状態で公開URLを開いたときだけ動きます。",
    "・このファイルをダブルクリックした場合や、他人が開いた場合は見本が出ます（運営のキーは使いません）。",
    "・APIキーはこのファイルに含まれていません。",
    `・保存日時: ${new Date().toLocaleString("ja-JP")}`,
  ].join("\n");
  downloadBlob(createZipBlob({
    "tool.html": html,
    "README.txt": readme,
  }), `${name}.zip`);
  state.status = `${name}.zip を保存しました（ツール本体と使い方）。`;
  renderExportStatusOnly();
}

async function publishCreatedTool(options = {}) {
  const openAfter = options.openAfter !== false;
  const autoTest = options.autoTest !== false;
  saveUserApiKey();
  state.publishError = "";
  if (!state.auth.authenticated && !state.auth.token) {
    state.status = "公開にはログインが必要です。ログイン後にもう一度「公開URLを発行する」を押してください。";
    state.publishError = "公開にはログインが必要です。";
    renderExportStatusOnly();
    activateScreen("login");
    return;
  }

  if (!isActionTestPassed()) {
    state.status = "公開前の確認をしています…";
    renderExportStatusOnly();
    const ok = runPublishSafetyCheck();
    if (!ok) {
      state.status = "公開できませんでした。ツールの生成内容に問題があります。";
      state.publishError = state.status;
      renderExportStatusOnly();
      return;
    }
  }

  const visibility = getSelectedPublishVisibility();
  const password = String($("#publish-password")?.value || "");
  if (visibility === "password" && password.length < 4) {
    state.status = "パスワード保護には4文字以上のパスワードが必要です。";
    state.publishError = state.status;
    renderExportStatusOnly();
    return;
  }

  const proposal = getSelectedProposal();
  if (!proposal?.title) {
    state.status = "公開するツール案が見つかりません。提案画面から選び直してください。";
    state.publishError = state.status;
    renderExportStatusOnly();
    return;
  }
  const files = buildRunnableToolFiles({ forceDemo: false, forPublish: true });
  if (!files?.indexHtml) {
    state.status = "公開用HTMLの生成に失敗しました。";
    state.publishError = state.status;
    renderExportStatusOnly();
    return;
  }

  state.status = "公開URLを発行しています…";
  state.publishError = "";
  renderExportStatusOnly();
  const publishBtn = $("#publish-tool");
  const mainAction = $("#main-action");
  if (publishBtn) publishBtn.disabled = true;
  if (mainAction) mainAction.disabled = true;
  try {
    const data = await apiRequest("/publish", {
      method: "POST",
      body: JSON.stringify({
        title: proposal.title,
        html: files.indexHtml,
        systemPrompt: files.mainPrompt,
        toolMode: getToolMode(),
        provider: state.settings.userApiProvider || "gemini",
        requireSearch: requiresNewsGrounding(),
        testReport: state.lastTestReport || "",
        testPassed: true,
        visibility,
        password: visibility === "password" ? password : "",
      }),
    });
    if (!data?.url) {
      throw new Error("サーバーから公開URLが返りませんでした。");
    }
    const liveUrl = toPhoneReachableUrl(data.url);
    state.lastPublish = {
      ...data,
      title: proposal.title,
      url: liveUrl,
      toolsUrl: data.toolsUrl || liveUrl,
      qrUrl: data.qrUrl || `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(liveUrl)}`,
      shareText: `${proposal.title}\n${liveUrl}`,
    };
    state.publishError = "";
    state.status = `公開しました。すぐ使えます: ${liveUrl}`;
    state.createdOutput = {
      title: proposal.title,
      format: "publish",
      text: liveUrl,
    };
    if (data.slug && !state.agentSelectedSlugs.includes(data.slug)) {
      state.agentSelectedSlugs = [data.slug, ...state.agentSelectedSlugs];
    }
    loadPublishedToolsShelf({ force: true }).catch(() => {});
    renderExportStatusOnly();
    renderAll();
    if (openAfter && liveUrl) {
      openPublishedTool(liveUrl);
    }
  } catch (error) {
    const message = error.message || String(error);
    state.status = `公開失敗: ${message}`;
    state.publishError = `公開失敗: ${message}`;
    renderExportStatusOnly();
    renderAll();
  } finally {
    if (publishBtn) publishBtn.disabled = false;
    if (mainAction) mainAction.disabled = false;
  }
}

function buildLaunchHtml(files) {
  // すでに自己完結HTMLならそのまま返す（二重インラインを防ぐ）
  if (/window\.TOOL_CONFIG/.test(files.indexHtml || "") && /<script>/i.test(files.indexHtml || "") && !/<script\s+src=/i.test(files.indexHtml || "")) {
    return files.indexHtml;
  }
  const bodyMatch = files.indexHtml.match(/<body>([\s\S]*?)<\/body>/i);
  const titleMatch = files.indexHtml.match(/<title>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1] : "作成ツール";
  let bodyContent = bodyMatch ? bodyMatch[1] : "";
  bodyContent = bodyContent
    .replace(/<script src="\.\/config\.js"><\/script>\s*/i, "")
    .replace(/<script src="\.\/script\.js"><\/script>/i, "")
    .replace(/<link rel="stylesheet" href="\.\/style\.css"\s*\/>\s*/i, "");
  // インラインscript内の </script> でHTMLが途中終了するのを防ぐ
  const configJs = escapeInlineScript(files.configJs);
  const scriptJs = escapeInlineScript(files.scriptJs);
  const styleCss = String(files.styleCss || "").replace(/<\/(style)/gi, "<\\/$1");
  return `<!doctype html>
<html lang="${state.language === "en" ? "en" : "ja"}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex,nofollow" />
  <meta name="theme-color" content="#10457e" />
  <title>${title}</title>
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' rx='14' fill='%2310457e'/><path d='M18 42l9-18 9 12 5-8 5 14z' fill='%23fff'/></svg>" />
  <style>${styleCss}</style>
</head>
<body>
${bodyContent}
<script>${configJs}<\/script>
<script>${scriptJs}<\/script>
</body>
</html>`;
}

function getRunnableFileMap(files) {
  return {
    "README.md": files.readme,
    "index.html": files.indexHtml,
    "style.css": files.styleCss,
    "script.js": files.scriptJs,
    "config.js": files.configJs,
    ".env": files.envContent,
    ".env.example": files.envExample,
    "setup.md": files.setup,
    "config/api_keys.example": files.apiKeys,
    "prompts/main_prompt.md": files.mainPrompt,
    "workflow/nodes.md": files.nodes,
    "output/sample_output.md": files.sampleOutput,
    "tool_design.md": buildBlueprintText(),
  };
}

function downloadGeneratedFile(text, format, title) {
  const extensionByFormat = {
    folder: "txt",
    zip: "zip.txt",
    html: "html",
    api: "txt",
    codex: "txt",
    claude: "txt",
    agent: "txt",
  };
  const safeTitle = sanitizeFileName(title);
  const fileName = `${safeTitle}_${format}.${extensionByFormat[format] || "txt"}`;
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  downloadBlob(blob, fileName);
}

function downloadBlob(blob, fileName) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function sanitizeFileName(title) {
  return title.replace(/[\\/:*?"<>|]/g, "_");
}

function createZipBlob(fileMap) {
  const encoder = new TextEncoder();
  const localParts = [];
  const centralParts = [];
  let offset = 0;
  const dosDateTime = zipDosDateTime(new Date());
  // Windows Explorer fails (0x80004005) without explicit directory entries.
  // Keep ASCII path names and omit UTF-8 flag for maximum Explorer compatibility.
  const entries = buildZipEntries(fileMap);

  entries.forEach((entry) => {
    const nameBytes = encoder.encode(entry.name);
    const dataBytes = entry.isDirectory ? new Uint8Array(0) : encoder.encode(String(entry.content ?? ""));
    const crc = entry.isDirectory ? 0 : crc32(dataBytes);
    const externalAttrs = entry.isDirectory ? 0x00000010 : 0;
    const localHeader = makeZipHeader(0x04034b50, [
      10, 0, 0, dosDateTime.time, dosDateTime.date,
      crc, dataBytes.length, dataBytes.length, nameBytes.length, 0,
    ]);
    localParts.push(localHeader, nameBytes);
    if (dataBytes.length > 0) localParts.push(dataBytes);

    const centralHeader = makeZipHeader(0x02014b50, [
      20, 10, 0, 0, dosDateTime.time, dosDateTime.date,
      crc, dataBytes.length, dataBytes.length, nameBytes.length, 0, 0, 0, 0, externalAttrs, offset,
    ]);
    centralParts.push(centralHeader, nameBytes);
    offset += localHeader.length + nameBytes.length + dataBytes.length;
  });

  const centralSize = centralParts.reduce((sum, part) => sum + part.length, 0);
  const centralOffset = offset;
  const fileCount = entries.length;
  const endHeader = makeZipHeader(0x06054b50, [
    0, 0, fileCount, fileCount, centralSize, centralOffset, 0,
  ]);

  return new Blob([...localParts, ...centralParts, endHeader], { type: "application/zip" });
}

function buildZipEntries(fileMap) {
  const directories = new Set();
  const files = [];

  Object.entries(fileMap).forEach(([rawPath, content]) => {
    // Windows Explorer expects backslash separators in ZIP entry names.
    const normalized = String(rawPath || "").replace(/\\/g, "/").replace(/^\/+/, "");
    if (!normalized || normalized.endsWith("/")) return;
    const parts = normalized.split("/");
    for (let index = 1; index < parts.length; index += 1) {
      directories.add(`${parts.slice(0, index).join("\\")}\\`);
    }
    files.push({
      name: parts.join("\\"),
      content,
      isDirectory: false,
    });
  });

  return [
    ...[...directories].sort().map((name) => ({ name, content: "", isDirectory: true })),
    ...files,
  ];
}

function zipDosDateTime(date) {
  const year = Math.max(1980, date.getFullYear());
  const dosTime = (date.getHours() << 11) | (date.getMinutes() << 5) | Math.floor(date.getSeconds() / 2);
  const dosDate = ((year - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate();
  return { time: dosTime & 0xffff, date: dosDate & 0xffff };
}

function makeZipHeader(signature, values) {
  const fieldSizes = {
    0x04034b50: [2, 2, 2, 2, 2, 4, 4, 4, 2, 2],
    0x02014b50: [2, 2, 2, 2, 2, 2, 4, 4, 4, 2, 2, 2, 2, 2, 4, 4],
    0x06054b50: [2, 2, 2, 2, 4, 4, 2],
  }[signature];
  if (!fieldSizes) {
    throw new Error(`Unsupported ZIP signature: 0x${signature.toString(16)}`);
  }
  if (values.length !== fieldSizes.length) {
    throw new Error(`ZIP header field count mismatch for 0x${signature.toString(16)}`);
  }
  const size = 4 + fieldSizes.reduce((sum, bytes) => sum + bytes, 0);
  const buffer = new ArrayBuffer(size);
  const view = new DataView(buffer);
  let pointer = 0;
  view.setUint32(pointer, signature, true);
  pointer += 4;
  values.forEach((value, index) => {
    const bytes = fieldSizes[index];
    if (bytes === 2) {
      view.setUint16(pointer, value & 0xffff, true);
    } else {
      view.setUint32(pointer, value >>> 0, true);
    }
    pointer += bytes;
  });
  return new Uint8Array(buffer);
}

function crc32(bytes) {
  let crc = -1;
  for (let index = 0; index < bytes.length; index += 1) {
    crc = (crc >>> 8) ^ crcTable[(crc ^ bytes[index]) & 0xff];
  }
  return (crc ^ -1) >>> 0;
}

const crcTable = Array.from({ length: 256 }, (_, index) => {
  let c = index;
  for (let k = 0; k < 8; k += 1) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  return c >>> 0;
});

function fallbackCopy(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

function redactApiKey(text) {
  const key = String(state.settings.userApiKey || readSessionApiKey() || "").trim();
  if (!key || !text) return text;
  return String(text).split(key).join("[APIキーは保存時に削除されます]");
}

function saveCurrentBlueprint() {
  const proposal = getSelectedProposal();
  const alreadySaved = state.savedBlueprints.some((item) => item.title === proposal.title);
  if (!alreadySaved) {
    state.savedBlueprints.unshift({
      title: proposal.title,
      summary: `${state.answers.market} / ${state.answers.output}`,
      categoryIndex: state.selectedCategoryIndex,
      answers: { ...state.answers },
      custom: { ...state.custom },
      summaryEdits: { ...state.summaryEdits },
      exportFormat: state.exportFormat,
      // APIキーが保存物やサーバーDBへ残らないように必ず除去する
      createdOutput: state.createdOutput
        ? { ...state.createdOutput, text: redactApiKey(state.createdOutput.text) }
        : null,
    });
    return true;
  }
  return false;
}

async function saveLatestToolToServer() {
  const latest = state.savedBlueprints[0];
  if (!latest) return;
  try {
    await apiRequest("/tools", {
      method: "POST",
      body: JSON.stringify({
        title: latest.title,
        summary: latest.summary,
        payload: latest,
      }),
    });
  } catch (error) {
    state.status = `ローカル保存しましたが、サーバー保存に失敗しました：${error.message}`;
  }
}

async function loadSavedToolsFromServer() {
  if (!hasAuthSession()) return;
  try {
    const data = await apiRequest("/tools");
    const serverTools = data.tools.map((tool) => tool.payload);
    state.savedBlueprints = serverTools.concat(
      state.savedBlueprints.filter((localTool) => !serverTools.some((serverTool) => serverTool.title === localTool.title)),
    );
  } catch (error) {
    state.status = `保存済みツールの取得に失敗しました：${error.message}`;
  }
}

function renderSavedList() {
  const defaults = [
    ["ニュース取得ツール", "保存済み"],
    ["株価分析ツール", "保存済み"],
    ["X投稿作成ツール", "保存済み"],
    ["画像生成指示ツール", "保存済み"],
  ];
  const savedTools = state.savedBlueprints.map((item, index) => ({
    title: item.title,
    summary: `ツール / ${item.summary}`,
    type: "tool",
    index,
  }));
  const savedAgents = state.savedAgents.map((item, index) => ({
    title: item.title,
    summary: `AIエージェント / ${item.tools.length}個のツール`,
    type: "agent",
    index,
  }));
  const sampleTools = defaults.map(([title, summary], index) => ({
    title,
    summary,
    type: "sample",
    index,
  }));
  const savedItems = savedTools.concat(savedAgents, sampleTools);
  savedList.innerHTML = savedItems
    .map((item) => `<article data-saved-type="${item.type}" data-saved-index="${item.index}"><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.summary)}</span></article>`)
    .join("");
}

function loadSavedItem(type, index) {
  if (type === "agent") {
    const saved = state.savedAgents[index];
    state.createdAgent = saved;
    state.agentGoal = saved.goal || "";
    state.agentMaterial = saved.material || "";
    state.agentMaxLoops = saved.maxLoops || 3;
    state.agentResult = "";
    state.agentLogs = [];
    state.status = `${saved.title}を読み込みました。`;
    renderAll();
    activateScreen("agent");
    return;
  }
  if (type === "sample") {
    state.status = "初期サンプルです。ツールを作成して保存すると、ここから読み込めます。";
    renderAll();
    return;
  }
  loadSavedBlueprint(index);
}

function loadSavedBlueprint(index) {
  const saved = state.savedBlueprints[index];
  if (!saved) {
    state.status = "初期サンプルです。ツールを作成すると自分の内容を保存できます。";
    renderAll();
    return;
  }
  state.selectedCategoryIndex = saved.categoryIndex;
  state.answers = { ...saved.answers };
  state.custom = { ...saved.custom, nodeTitle: "", nodeDescription: "" };
  state.summaryEdits = saved.summaryEdits ? { ...saved.summaryEdits } : { ...blankSummaryEdits() };
  state.exportFormat = "publish";
  state.selectedProposalIndex = 0;
  state.proposalOffset = 0;
  syncInputsFromState();
  syncChoiceButtonsFromState();
  prepareNodes();
  state.status = `${saved.title}を読み込みました。`;
  renderAll();
  activateScreen("blueprint");
}

async function loadPublishedToolsShelf(options = {}) {
  if (!state.auth.token && !state.auth.authenticated) {
    state.publishedToolsShelf = [];
    return [];
  }
  try {
    const data = await apiRequest("/published", { method: "GET" });
    const tools = Array.isArray(data.tools) ? data.tools : [];
    state.publishedToolsShelf = tools;
    const valid = new Set(tools.map((tool) => tool.slug));
    state.agentSelectedSlugs = state.agentSelectedSlugs.filter((slug) => valid.has(slug));
    if (options.force || (state.agentSelectedSlugs.length === 0 && tools.length > 0)) {
      // 初回はすべて選択（発行順＝新しいもの優先の棚から、実行は選択順）
      if (state.agentSelectedSlugs.length === 0) {
        state.agentSelectedSlugs = tools.map((tool) => tool.slug);
      }
    }
    return tools;
  } catch (error) {
    if (options.force) {
      agentStatus.textContent = `棚の取得に失敗: ${error.message || error}`;
    }
    return state.publishedToolsShelf || [];
  }
}

function getSelectedPublishedTools() {
  const bySlug = new Map((state.publishedToolsShelf || []).map((tool) => [tool.slug, tool]));
  return state.agentSelectedSlugs
    .map((slug) => bySlug.get(slug))
    .filter(Boolean);
}

function handlePublishedShelfChange(event) {
  const input = event.target.closest('input[type="checkbox"][data-published-slug]');
  if (!input) return;
  const slug = input.getAttribute("data-published-slug");
  if (!slug) return;
  if (input.checked) {
    if (!state.agentSelectedSlugs.includes(slug)) state.agentSelectedSlugs.push(slug);
  } else {
    state.agentSelectedSlugs = state.agentSelectedSlugs.filter((item) => item !== slug);
  }
  renderAgentBuilder();
}

function handlePublishedShelfClick(event) {
  const button = event.target.closest("[data-shelf-move]");
  if (!button) return;
  const slug = button.getAttribute("data-slug");
  const dir = button.getAttribute("data-shelf-move");
  if (!slug || !dir) return;
  const list = [...state.agentSelectedSlugs];
  const index = list.indexOf(slug);
  if (index < 0) return;
  const swapWith = dir === "up" ? index - 1 : index + 1;
  if (swapWith < 0 || swapWith >= list.length) return;
  [list[index], list[swapWith]] = [list[swapWith], list[index]];
  state.agentSelectedSlugs = list;
  renderAgentBuilder();
}

function renderPublishedToolsShelf() {
  const shelf = $("#published-tools-shelf");
  if (!shelf) return;
  if (!state.auth.token && !state.auth.authenticated) {
    shelf.innerHTML = `<div class="published-shelf-empty">公開ツール棚を見るにはログインが必要です。</div>`;
    return;
  }
  const tools = state.publishedToolsShelf || [];
  if (tools.length === 0) {
    shelf.innerHTML = `<div class="published-shelf-empty">まだ公開ツールがありません。<br>「ツール作成」で公開URLを発行すると、ここに部品として並びます。</div>`;
    return;
  }
  const selectedSet = new Set(state.agentSelectedSlugs);
  shelf.innerHTML = tools.map((tool) => {
    const selected = selectedSet.has(tool.slug);
    const order = selected ? state.agentSelectedSlugs.indexOf(tool.slug) + 1 : "-";
    const openUrl = tool.apiUrl || tool.url || `#`;
    return `
      <article class="published-tool-row${selected ? " is-selected" : ""}">
        <label>
          <input type="checkbox" data-published-slug="${escapeAttribute(tool.slug)}" ${selected ? "checked" : ""} />
        </label>
        <div class="published-tool-main">
          <strong>${selected ? `${order}. ` : ""}${escapeHtml(tool.title)}</strong>
          <small>利用 ${tool.runCount || 0} 回 / ${escapeHtml(tool.visibility || "private")}</small>
          <a href="${escapeAttribute(openUrl)}" target="_blank" rel="noopener">${escapeHtml(openUrl)}</a>
        </div>
        <div class="published-tool-order">
          <button type="button" class="secondary" data-shelf-move="up" data-slug="${escapeAttribute(tool.slug)}" ${selected ? "" : "disabled"} aria-label="上へ">↑</button>
          <button type="button" class="secondary" data-shelf-move="down" data-slug="${escapeAttribute(tool.slug)}" ${selected ? "" : "disabled"} aria-label="下へ">↓</button>
        </div>
      </article>
    `;
  }).join("");
}

function getAgentIdeas() {
  const published = getSelectedPublishedTools();
  const savedNames = state.savedBlueprints.map((tool) => tool.title);
  if (published.length === 0 && savedNames.length === 0) {
    return [];
  }

  if (published.length > 0) {
    const toolNames = published.map((tool) => tool.title);
    const chain = published.map((tool) => ({
      slug: tool.slug,
      title: tool.title,
      url: tool.apiUrl || tool.url,
      toolMode: tool.toolMode,
    }));
    return [
      {
        title: "公開ツール連結エージェント",
        description: "選んだ公開URLツールを上から順に実行し、結果をつないでゴールへ進めます。",
        tools: toolNames,
        chain,
        output: "連結実行の最終成果物、各ツールの出力ログ",
        source: "published",
      },
      {
        title: "公開ツール＋自己改善エージェント",
        description: "公開ツール連鎖のあと、自己チェックと改善を繰り返します。",
        tools: toolNames,
        chain,
        output: "改善済みの最終成果物",
        source: "published",
      },
    ];
  }

  return [
    {
      title: "毎日の自動レポートAIエージェント",
      description: "保存済みツールを順番に実行し、情報収集からレポート作成までを自走でまとめます。",
      tools: savedNames,
      chain: [],
      output: "日次レポート、要点、次に見るべき項目",
      source: "saved",
    },
    {
      title: "SNS投稿準備AIエージェント",
      description: "調査した内容を、投稿文・画像指示・確認メモまで自走で展開します。",
      tools: savedNames.slice(0, Math.max(1, Math.min(savedNames.length, 3))),
      chain: [],
      output: "X投稿案、画像生成指示、投稿前チェック",
      source: "saved",
    },
  ];
}

function syncAgentFormFromState() {
  const goal = $("#agent-goal");
  const material = $("#agent-material");
  const maxLoops = $("#agent-max-loops");
  const logEl = $("#agent-run-log");
  const resultEl = $("#agent-result");
  const runBtn = $("#run-agent");
  const stopBtn = $("#stop-agent");
  if (goal && document.activeElement !== goal) goal.value = state.agentGoal || "";
  if (material && document.activeElement !== material) material.value = state.agentMaterial || "";
  if (maxLoops) maxLoops.value = String(state.agentMaxLoops || 3);
  if (logEl) {
    logEl.textContent = state.agentLogs.length
      ? state.agentLogs.join("\n")
      : "まだ実行していません。公開ツールを選び、ゴールを入れて実行してください。";
  }
  if (resultEl) {
    resultEl.textContent = state.agentResult || "ここに完成した成果物が表示されます。";
  }
  if (runBtn) runBtn.disabled = state.agentRunning;
  if (stopBtn) stopBtn.disabled = !state.agentRunning;
}

function appendAgentLog(message) {
  const stamp = new Date().toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  state.agentLogs.push(`[${stamp}] ${message}`);
  const logEl = $("#agent-run-log");
  if (logEl) {
    logEl.textContent = state.agentLogs.join("\n");
    logEl.scrollTop = logEl.scrollHeight;
  }
}

function renderAgentBuilder() {
  renderPublishedToolsShelf();
  const ideas = getAgentIdeas();
  if (ideas.length === 0) {
    agentProposals.innerHTML = `
      <article class="agent-proposal-card">
        <span class="tag">部品が必要</span>
        <h2>まず公開ツールを用意してください</h2>
        <p>「ツール作成」で公開URLを発行すると、上の棚に部品が並びます。または保存済みツールでも案を出せます。</p>
      </article>
    `;
    agentPreview.textContent = "公開ツールを選ぶと、つなぎ方がここに表示されます。";
    syncAgentFormFromState();
    return;
  }

  if (state.selectedAgentIndex >= ideas.length) state.selectedAgentIndex = 0;
  const selectedIdea = ideas[state.selectedAgentIndex] || ideas[0];
  agentProposals.innerHTML = ideas
    .map((idea, index) => `
      <article class="agent-proposal-card${index === state.selectedAgentIndex ? " active" : ""}" data-agent-index="${index}">
        <span class="tag">${idea.source === "published" ? "公開ツール連携" : "保存済み"} ${index + 1}</span>
        <h2>${escapeHtml(idea.title)}</h2>
        <p>${escapeHtml(idea.description)}</p>
        <p class="meta">使う部品：${escapeHtml(idea.tools.join(" → "))}</p>
      </article>
    `)
    .join("");

  agentPreview.textContent = state.createdAgent?.content || buildAgentText(selectedIdea);
  syncAgentFormFromState();
}

function buildAgentText(idea) {
  const goal = state.agentGoal.trim() || "（実行時にゴールを入力）";
  const maxLoops = state.agentMaxLoops || 3;
  const chainLines = (idea.chain || [])
    .map((tool, index) => `  ${index + 1}. ${tool.title} (${tool.slug}) ${tool.url || ""}`)
    .join("\n");
  return `agent_name: ${idea.title}
purpose: ${idea.description}
goal: ${goal}
published_tools_chain:
${chainLines || "  （未選択：保存済みツール名のみ）"}
tools:
${idea.tools.map((tool, index) => `  ${index + 1}. ${tool}`).join("\n")}
self_running_loop:
  1. 計画：ゴールから手順を立てる
  2. 実行：公開ツールを順番にAPI呼び出し
  3. 自己チェック：ゴール達成度を判定
  4. 改善：不合格なら上限 ${maxLoops} 回まで再実行
output: ${idea.output}
note: 公開URLツールを部品として連結するエージェントです。`;
}

async function runPublishedToolInAgent(tool, context = {}) {
  const data = await apiRequest(`/public/tools/${encodeURIComponent(tool.slug)}/run`, {
    method: "POST",
    body: JSON.stringify({
      systemPrompt: `あなたは公開ツール「${tool.title}」です。エージェントのゴール達成に役立つ結果だけを日本語で出してください。`,
      input: [
        `ゴール: ${context.goal || ""}`,
        context.step ? `今回の依頼: ${context.step}` : "ゴールに役立つ結果を出してください。",
        context.material ? `材料:\n${context.material}` : "",
        context.draft ? `これまでの結果:\n${String(context.draft).slice(0, 6000)}` : "",
      ].filter(Boolean).join("\n\n"),
      demo: false,
    }),
  });
  return String(data.text || "").trim();
}

async function callStudioAi(systemPrompt, userInput) {
  saveUserApiKey();
  const apiKey = String(state.settings.userApiKey || readSessionApiKey() || "").trim();
  const provider = state.settings.userApiProvider || readSessionApiProvider() || "gemini";

  if (apiKey) {
    return provider === "openai"
      ? callOpenAiDirect(apiKey, systemPrompt, userInput)
      : callGeminiDirect(apiKey, systemPrompt, userInput);
  }

  if (!hasAuthSession()) {
    throw new Error("APIキーが未設定です。「設定」でキーを保存するか、ログインして有料プランの運営APIを使ってください。");
  }

  const data = await apiRequest("/ai/generate", {
    method: "POST",
    body: JSON.stringify({
      systemPrompt,
      input: userInput,
      provider,
    }),
  });
  return data.text || "";
}

async function callGeminiDirect(apiKey, systemPrompt, input) {
  const model = DEFAULT_GEMINI_MODEL;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: `${systemPrompt}\n\n${input}` }] }],
    }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error?.message || "Gemini APIの実行に失敗しました。");
  }
  return (data.candidates?.[0]?.content?.parts || []).map((part) => part.text || "").join("");
}

async function callOpenAiDirect(apiKey, systemPrompt, input) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: input },
      ],
      temperature: 0.7,
    }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error?.message || "OpenAI APIの実行に失敗しました。ブラウザ制限の場合は Gemini を試してください。");
  }
  return data.choices?.[0]?.message?.content || "";
}

function parseAgentPlan(text) {
  const lines = String(text || "")
    .split(/\r?\n/)
    .map((line) => line.replace(/^\s*[-*・\d]+[.)、:\s]*/, "").trim())
    .filter(Boolean)
    .slice(0, 6);
  return lines.length ? lines : ["材料を整理する", "要点を抽出する", "成果物にまとめる"];
}

function parseAgentReview(text) {
  const raw = String(text || "");
  const pass = /^\s*PASS\b/im.test(raw) || /判定\s*[:：]\s*合格/.test(raw);
  const fail = /^\s*FAIL\b/im.test(raw) || /判定\s*[:：]\s*不合格/.test(raw);
  return {
    passed: pass && !fail ? true : fail ? false : /合格/.test(raw) && !/不合格/.test(raw),
    feedback: raw.trim(),
  };
}

function stopAgentLoop() {
  if (!state.agentRunning) return;
  state.agentAbortRequested = true;
  appendAgentLog("⏹ 停止を要求しました。現在の処理が終わり次第止めます。");
  agentStatus.textContent = "停止中…";
}

async function copyAgentResult() {
  const text = state.agentResult || $("#agent-result")?.textContent || "";
  if (!text || text === "ここに完成した成果物が表示されます。") {
    agentStatus.textContent = "コピーする結果がまだありません。";
    return;
  }
  try {
    if (navigator.clipboard) await navigator.clipboard.writeText(text);
    else fallbackCopy(text);
    agentStatus.textContent = "成果物をコピーしました。";
  } catch (error) {
    fallbackCopy(text);
    agentStatus.textContent = "成果物をコピーしました。";
  }
}

async function runAgentLoop() {
  if (state.agentRunning) return;
  await loadPublishedToolsShelf();
  const ideas = getAgentIdeas();
  if (ideas.length === 0) {
    agentStatus.textContent = "先に公開ツールを選ぶか、ツールを保存してください。";
    renderAgentBuilder();
    return;
  }

  state.agentGoal = $("#agent-goal")?.value.trim() || state.agentGoal.trim();
  state.agentMaterial = $("#agent-material")?.value || state.agentMaterial;
  state.agentMaxLoops = Number($("#agent-max-loops")?.value || state.agentMaxLoops || 3);

  if (!state.agentGoal) {
    agentStatus.textContent = "ゴールを入力してください。";
    return;
  }

  const idea = ideas[state.selectedAgentIndex] || ideas[0];
  const chain = Array.isArray(idea.chain) && idea.chain.length
    ? idea.chain
    : getSelectedPublishedTools().map((tool) => ({
      slug: tool.slug,
      title: tool.title,
      url: tool.apiUrl || tool.url,
      toolMode: tool.toolMode,
    }));

  state.agentRunning = true;
  state.agentAbortRequested = false;
  state.agentLogs = [];
  state.agentResult = "";
  syncAgentFormFromState();
  agentStatus.textContent = "エージェントを実行中です…";
  appendAgentLog(`▶ 「${idea.title}」を開始（上限 ${state.agentMaxLoops} 周）`);
  appendAgentLog(`ゴール: ${state.agentGoal}`);
  if (chain.length) {
    appendAgentLog(`公開ツール連鎖: ${chain.map((tool) => tool.title).join(" → ")}`);
  } else {
    appendAgentLog("公開ツール未選択のため、AIのみで進めます。");
  }

  let draft = "";
  let feedback = "";
  let passed = false;

  try {
    for (let round = 1; round <= state.agentMaxLoops; round += 1) {
      if (state.agentAbortRequested) {
        appendAgentLog("⏹ ユーザー操作で停止しました。");
        break;
      }

      appendAgentLog(`— ${round}周目：計画 —`);
      const planText = await callStudioAi(
        "あなたは実務AIエージェントの計画担当です。ゴール達成のための短い実行手順を、番号付きで3〜6個だけ日本語で出力してください。前置きは不要です。",
        [
          `エージェント名: ${idea.title}`,
          `使える公開ツール: ${chain.map((tool) => tool.title).join("、") || idea.tools.join("、")}`,
          `ゴール: ${state.agentGoal}`,
          state.agentMaterial.trim() ? `材料:\n${state.agentMaterial.trim()}` : "",
          feedback ? `前回の改善点:\n${feedback}` : "",
          draft ? `これまでの下書き:\n${draft.slice(0, 4000)}` : "",
        ].filter(Boolean).join("\n\n"),
      );
      if (state.agentAbortRequested) break;
      const steps = parseAgentPlan(planText);
      steps.forEach((step, index) => appendAgentLog(`計画 ${index + 1}. ${step}`));

      if (chain.length) {
        appendAgentLog(`— ${round}周目：公開ツールを順番に実行 —`);
        const parts = [];
        for (let i = 0; i < chain.length; i += 1) {
          if (state.agentAbortRequested) break;
          const tool = chain[i];
          appendAgentLog(`部品 ${i + 1}/${chain.length}: ${tool.title} を実行中…`);
          try {
            const toolOut = await runPublishedToolInAgent(tool, {
              goal: state.agentGoal,
              material: state.agentMaterial,
              draft,
              step: steps[Math.min(i, steps.length - 1)] || "ゴールに役立つ結果を出してください",
            });
            parts.push(`【${tool.title}】\n${toolOut || "（空の応答）"}`);
            appendAgentLog(`✔ ${tool.title}: ${String(toolOut || "").slice(0, 120).replace(/\s+/g, " ")}…`);
          } catch (toolError) {
            const msg = toolError.message || String(toolError);
            parts.push(`【${tool.title}】\nエラー: ${msg}`);
            appendAgentLog(`✖ ${tool.title}: ${msg}`);
          }
        }
        if (parts.length) {
          draft = [
            `ゴール: ${state.agentGoal}`,
            "",
            "公開ツール連結結果:",
            parts.join("\n\n---\n\n"),
            draft ? `\n\n（参考：前回下書き）\n${draft.slice(0, 2000)}` : "",
          ].join("\n");
        }
      } else {
        for (let stepIndex = 0; stepIndex < steps.length; stepIndex += 1) {
          if (state.agentAbortRequested) break;
          const step = steps[stepIndex];
          appendAgentLog(`実行 ${stepIndex + 1}/${steps.length}: ${step}`);
          draft = await callStudioAi(
            `あなたは「${idea.title}」の実行担当です。指定ステップだけを進め、これまでの下書きを更新した完成途中の成果物全文を日本語で出力してください。前置きは不要です。`,
            [
              `ゴール: ${state.agentGoal}`,
              `使えるツールの役割: ${idea.tools.join("、")}`,
              `今回のステップ: ${step}`,
              `期待する最終出力: ${idea.output}`,
              state.agentMaterial.trim() ? `材料:\n${state.agentMaterial.trim()}` : "",
              draft ? `これまでの下書き:\n${draft}` : "これまでの下書き: （なし）",
              feedback ? `改善してほしい点:\n${feedback}` : "",
            ].filter(Boolean).join("\n\n"),
          );
        }
      }
      if (state.agentAbortRequested) break;

      // 公開ツール結果をゴール向けに要約・整形
      if (chain.length && draft) {
        appendAgentLog(`— ${round}周目：結果の統合 —`);
        draft = await callStudioAi(
          `あなたは「${idea.title}」の統合担当です。各公開ツールの出力を、ゴール達成の最終成果物として読みやすく日本語でまとめ直してください。前置きは不要です。`,
          [
            `ゴール: ${state.agentGoal}`,
            `期待する最終出力: ${idea.output}`,
            feedback ? `改善してほしい点:\n${feedback}` : "",
            `材料・各ツール出力:\n${draft}`,
          ].filter(Boolean).join("\n\n"),
        );
      }

      appendAgentLog(`— ${round}周目：自己チェック —`);
      const reviewText = await callStudioAi(
        "あなたは厳しい品質チェッカーです。最初の行は必ず「PASS」または「FAIL」だけにしてください。続けて理由と、FAILの場合は具体的な改善点を日本語で書いてください。",
        [
          `ゴール: ${state.agentGoal}`,
          `期待する最終出力: ${idea.output}`,
          `成果物:\n${draft || "（空）"}`,
        ].join("\n\n"),
      );
      const review = parseAgentReview(reviewText);
      feedback = review.feedback;
      appendAgentLog(review.passed ? "✔ 自己チェック：合格" : "✖ 自己チェック：不合格 → 改善して次の周へ");
      if (!review.passed) appendAgentLog(review.feedback.slice(0, 500));

      if (review.passed) {
        passed = true;
        break;
      }
    }

    state.agentResult = draft || "成果物を生成できませんでした。";
    const resultEl = $("#agent-result");
    if (resultEl) resultEl.textContent = state.agentResult;
    appendAgentLog(passed ? "完了：ゴールを満たす成果物が得られました。" : "完了：上限周まで実行しました。成果物を確認してください。");
    agentStatus.textContent = passed
      ? "エージェント実行が完了しました（合格）。"
      : state.agentAbortRequested
        ? "エージェントを停止しました。"
        : "エージェント実行が完了しました（上限到達）。";
  } catch (error) {
    appendAgentLog(`エラー: ${error.message || error}`);
    agentStatus.textContent = `実行に失敗しました：${error.message || error}`;
    if (draft) {
      state.agentResult = draft;
      const resultEl = $("#agent-result");
      if (resultEl) resultEl.textContent = draft;
    }
  } finally {
    state.agentRunning = false;
    state.agentAbortRequested = false;
    syncAgentFormFromState();
  }
}

function buildStandaloneAgentHtml(idea) {
  const apiKey = String(state.settings.userApiKey || readSessionApiKey() || "").trim();
  const provider = state.settings.userApiProvider || readSessionApiProvider() || "gemini";
  const config = {
    title: idea.title,
    description: idea.description,
    tools: idea.tools,
    output: idea.output,
    goal: state.agentGoal.trim(),
    material: state.agentMaterial,
    maxLoops: state.agentMaxLoops || 3,
    provider,
    apiKey,
  };
  const configJson = JSON.stringify(config).replace(/</g, "\\u003c");
  return `<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(idea.title)}</title>
  <style>
    :root { --bg:#f4f7fb; --ink:#152033; --muted:#5b6b80; --line:#d7e0ec; --accent:#0b6bcb; --accent2:#128a6a; }
    body{margin:0;font-family:'Hiragino Sans','Noto Sans JP','Segoe UI',sans-serif;background:linear-gradient(180deg,#eef4fb,var(--bg));color:var(--ink);}
    main{max-width:880px;margin:0 auto;padding:28px 16px 48px;}
    h1{margin:0 0 8px;font-size:clamp(1.5rem,3vw,2rem);}
    .lead,.note,.status{color:var(--muted);line-height:1.7;}
    .panel{margin-top:14px;padding:16px;border:1px solid var(--line);border-radius:14px;background:#fff;box-shadow:0 10px 24px rgba(21,32,51,.06);}
    label{display:grid;gap:8px;margin-top:12px;}
    input,textarea,select,button{font:inherit;}
    input,textarea,select{width:100%;box-sizing:border-box;border:1px solid var(--line);border-radius:10px;padding:12px;background:#fff;color:var(--ink);}
    .actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:14px;}
    button{min-height:46px;border:0;border-radius:10px;padding:0 18px;background:linear-gradient(135deg,var(--accent),var(--accent2));color:#fff;font-weight:700;cursor:pointer;}
    button.secondary{background:#fff;color:var(--ink);border:1px solid var(--line);}
    button:disabled{opacity:.6;cursor:wait;}
    pre{white-space:pre-wrap;background:#f7fafc;border:1px solid var(--line);border-radius:10px;padding:12px;min-height:120px;line-height:1.65;max-height:360px;overflow:auto;}
    .warn{color:#b45309;}
  </style>
</head>
<body>
  <main>
    <h1>${escapeHtml(idea.title)}</h1>
    <p class="lead">${escapeHtml(idea.description)}</p>
    <p class="note">このファイルは単体で動く自走AIエージェントです。計画→実行→自己チェック→改善を繰り返します。</p>
    <section class="panel">
      <h2>設定</h2>
      <label>プロバイダー
        <select id="provider">
          <option value="gemini">Google Gemini</option>
          <option value="openai">OpenAI</option>
        </select>
      </label>
      <label>APIキー<input id="api-key" type="password" autocomplete="off" /></label>
      <label>ゴール<textarea id="goal" rows="3"></textarea></label>
      <label>材料・元情報<textarea id="material" rows="6"></textarea></label>
      <label>ループ上限
        <select id="max-loops">
          <option value="3">3回</option>
          <option value="5">5回</option>
          <option value="10">10回</option>
        </select>
      </label>
      <p class="warn">APIキー入りのファイルは他人に渡さないでください。</p>
    </section>
    <section class="panel">
      <div class="actions">
        <button id="run" type="button">エージェントを実行</button>
        <button id="stop" class="secondary" type="button" disabled>停止</button>
        <button id="copy" class="secondary" type="button">結果をコピー</button>
      </div>
      <p id="status" class="status" aria-live="polite"></p>
      <h3>進行ログ</h3>
      <pre id="log">まだ実行していません。</pre>
      <h3>最終成果物</h3>
      <pre id="result">ここに完成した成果物が表示されます。</pre>
    </section>
  </main>
  <script>
  const CONFIG = ${configJson};
  const providerEl = document.querySelector('#provider');
  const keyEl = document.querySelector('#api-key');
  const goalEl = document.querySelector('#goal');
  const materialEl = document.querySelector('#material');
  const maxLoopsEl = document.querySelector('#max-loops');
  const runBtn = document.querySelector('#run');
  const stopBtn = document.querySelector('#stop');
  const copyBtn = document.querySelector('#copy');
  const statusEl = document.querySelector('#status');
  const logEl = document.querySelector('#log');
  const resultEl = document.querySelector('#result');
  let running = false;
  let abortRequested = false;
  const logs = [];

  providerEl.value = CONFIG.provider || 'gemini';
  keyEl.value = CONFIG.apiKey || '';
  goalEl.value = CONFIG.goal || '';
  materialEl.value = CONFIG.material || '';
  maxLoopsEl.value = String(CONFIG.maxLoops || 3);

  function log(msg) {
    const stamp = new Date().toLocaleTimeString('ja-JP', { hour:'2-digit', minute:'2-digit', second:'2-digit' });
    logs.push('[' + stamp + '] ' + msg);
    logEl.textContent = logs.join('\\n');
    logEl.scrollTop = logEl.scrollHeight;
  }

  async function callGemini(apiKey, systemPrompt, input) {
    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + encodeURIComponent(apiKey);
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: systemPrompt + '\\n\\n' + input }] }] }),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error?.message || 'Gemini APIの実行に失敗しました。');
    return (data.candidates?.[0]?.content?.parts || []).map((p) => p.text || '').join('');
  }

  async function callOpenAI(apiKey, systemPrompt, input) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + apiKey },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'system', content: systemPrompt }, { role: 'user', content: input }],
        temperature: 0.7,
      }),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error?.message || 'OpenAI APIの実行に失敗しました。');
    return data.choices?.[0]?.message?.content || '';
  }

  async function callAi(systemPrompt, input) {
    const apiKey = keyEl.value.trim();
    if (!apiKey) throw new Error('APIキーを入力してください。');
    return providerEl.value === 'openai'
      ? callOpenAI(apiKey, systemPrompt, input)
      : callGemini(apiKey, systemPrompt, input);
  }

  function parsePlan(text) {
    const lines = String(text || '').split(/\\r?\\n/).map((l) => l.replace(/^\\s*[-*・\\d]+[.)、:\\s]*/, '').trim()).filter(Boolean).slice(0, 6);
    return lines.length ? lines : ['材料を整理する', '要点を抽出する', '成果物にまとめる'];
  }

  function parseReview(text) {
    const raw = String(text || '');
    const pass = /^\\s*PASS\\b/im.test(raw) || /判定\\s*[:：]\\s*合格/.test(raw);
    const fail = /^\\s*FAIL\\b/im.test(raw) || /判定\\s*[:：]\\s*不合格/.test(raw);
    return { passed: pass && !fail ? true : fail ? false : /合格/.test(raw) && !/不合格/.test(raw), feedback: raw.trim() };
  }

  stopBtn.addEventListener('click', () => {
    if (!running) return;
    abortRequested = true;
    log('⏹ 停止を要求しました。');
    statusEl.textContent = '停止中…';
  });

  copyBtn.addEventListener('click', async () => {
    const text = resultEl.textContent || '';
    if (!text || text === 'ここに完成した成果物が表示されます。') return;
    try { await navigator.clipboard.writeText(text); statusEl.textContent = 'コピーしました。'; }
    catch { statusEl.textContent = 'コピーに失敗しました。'; }
  });

  runBtn.addEventListener('click', async () => {
    if (running) return;
    const goal = goalEl.value.trim();
    if (!goal) { statusEl.textContent = 'ゴールを入力してください。'; return; }
    running = true;
    abortRequested = false;
    logs.length = 0;
    runBtn.disabled = true;
    stopBtn.disabled = false;
    statusEl.textContent = '実行中…';
    resultEl.textContent = '';
    const maxLoops = Number(maxLoopsEl.value) || 3;
    let draft = '';
    let feedback = '';
    let passed = false;
    try {
      log('▶ 開始（上限 ' + maxLoops + ' 周）');
      for (let round = 1; round <= maxLoops; round += 1) {
        if (abortRequested) { log('⏹ 停止しました。'); break; }
        log('— ' + round + '周目：計画 —');
        const planText = await callAi(
          'あなたは実務AIエージェントの計画担当です。ゴール達成のための短い実行手順を、番号付きで3〜6個だけ日本語で出力してください。前置きは不要です。',
          ['エージェント名: ' + CONFIG.title, '使えるツール: ' + (CONFIG.tools || []).join('、'), 'ゴール: ' + goal, materialEl.value.trim() ? ('材料:\\n' + materialEl.value.trim()) : '', feedback ? ('前回の改善点:\\n' + feedback) : '', draft ? ('これまでの下書き:\\n' + draft.slice(0, 4000)) : ''].filter(Boolean).join('\\n\\n')
        );
        if (abortRequested) break;
        const steps = parsePlan(planText);
        steps.forEach((step, i) => log('計画 ' + (i + 1) + '. ' + step));
        for (let i = 0; i < steps.length; i += 1) {
          if (abortRequested) break;
          log('実行 ' + (i + 1) + '/' + steps.length + ': ' + steps[i]);
          draft = await callAi(
            'あなたは「' + CONFIG.title + '」の実行担当です。指定ステップだけを進め、これまでの下書きを更新した完成途中の成果物全文を日本語で出力してください。前置きは不要です。',
            ['ゴール: ' + goal, '使えるツールの役割: ' + (CONFIG.tools || []).join('、'), '今回のステップ: ' + steps[i], '期待する最終出力: ' + CONFIG.output, materialEl.value.trim() ? ('材料:\\n' + materialEl.value.trim()) : '', draft ? ('これまでの下書き:\\n' + draft) : 'これまでの下書き: （なし）', feedback ? ('改善してほしい点:\\n' + feedback) : ''].filter(Boolean).join('\\n\\n')
          );
        }
        if (abortRequested) break;
        log('— ' + round + '周目：自己チェック —');
        const reviewText = await callAi(
          'あなたは厳しい品質チェッカーです。最初の行は必ず「PASS」または「FAIL」だけにしてください。続けて理由と、FAILの場合は具体的な改善点を日本語で書いてください。',
          ['ゴール: ' + goal, '期待する最終出力: ' + CONFIG.output, '成果物:\\n' + (draft || '（空）')].join('\\n\\n')
        );
        const review = parseReview(reviewText);
        feedback = review.feedback;
        log(review.passed ? '✔ 自己チェック：合格' : '✖ 自己チェック：不合格 → 改善して次の周へ');
        if (!review.passed) log(review.feedback.slice(0, 500));
        if (review.passed) { passed = true; break; }
      }
      resultEl.textContent = draft || '成果物を生成できませんでした。';
      log(passed ? '完了：合格' : abortRequested ? '完了：停止' : '完了：上限到達');
      statusEl.textContent = passed ? '完了（合格）' : abortRequested ? '停止しました' : '完了（上限到達）';
    } catch (error) {
      log('エラー: ' + (error.message || error));
      statusEl.textContent = '失敗: ' + (error.message || error);
      if (draft) resultEl.textContent = draft;
    } finally {
      running = false;
      abortRequested = false;
      runBtn.disabled = false;
      stopBtn.disabled = true;
    }
  });
  </script>
</body>
</html>`;
}

async function createAgent() {
  await loadPublishedToolsShelf();
  const ideas = getAgentIdeas();
  if (ideas.length === 0) {
    state.status = "AIエージェントを作るには、公開ツールを選ぶか、ツールを保存してください。";
    agentStatus.textContent = state.status;
    renderAll();
    return;
  }
  saveUserApiKey();
  state.agentGoal = $("#agent-goal")?.value.trim() || state.agentGoal.trim();
  state.agentMaterial = $("#agent-material")?.value || state.agentMaterial;
  state.agentMaxLoops = Number($("#agent-max-loops")?.value || state.agentMaxLoops || 3);

  const idea = ideas[state.selectedAgentIndex] || ideas[0];
  const content = buildAgentText(idea);
  state.createdAgent = {
    title: idea.title,
    tools: [...idea.tools],
    chain: idea.chain || getSelectedPublishedTools(),
    content,
    goal: state.agentGoal,
    material: state.agentMaterial,
    maxLoops: state.agentMaxLoops,
  };
  agentPreview.textContent = content;
  agentStatus.textContent = "エージェント設定を確定しました。「エージェントを実行」で公開ツールをつないで動かせます。";
  state.status = agentStatus.textContent;
  renderAll();
}

function saveAgent() {
  if (!state.createdAgent) {
    state.status = "先に「設定を確定する」を押してください。";
    renderAll();
    return;
  }
  const alreadySaved = state.savedAgents.some((agent) => agent.title === state.createdAgent.title);
  if (alreadySaved) {
    state.status = "同じ名前のAIエージェントはすでに保存済みです。";
    renderAll();
    return;
  }
  state.savedAgents.unshift({
    ...state.createdAgent,
    content: redactApiKey(state.createdAgent.content || ""),
  });
  state.status = "AIエージェントを保存済みに追加しました。";
  renderAll();
  activateScreen("saved");
}

function resetCategory() {
  state.selectedCategoryIndex = 0;
  state.selectedProposalIndex = 0;
  state.proposalOffset = 0;
  applyThemeDefaults();
  state.custom = {
    toolName: "",
    targetUser: "",
    inputs: "",
    result: "",
    nodeTitle: "",
    nodeDescription: "",
  };
  state.summaryEdits = { ...blankSummaryEdits() };
  syncInputsFromState();
  prepareNodes();
  renderAll();
  activateScreen("create");
}

function syncInputsFromState() {
  $("#custom-tool-name").value = state.custom.toolName;
  $("#custom-target-user").value = state.custom.targetUser;
  $("#custom-inputs").value = state.custom.inputs;
  $("#custom-result").value = state.custom.result;
  $("#custom-node-title").value = state.custom.nodeTitle;
  $("#custom-node-description").value = state.custom.nodeDescription;
}

function syncChoiceButtonsFromState() {
  $$(".choice, .pill").forEach((button) => {
    const question = button.dataset.question;
    if (!question) return;
    button.classList.toggle("active", (button.dataset.value || button.textContent.trim()) === state.answers[question]);
  });
}

function renderStatus() {
  if (appStatus) {
    const message = state.status || "";
    appStatus.textContent = message;
    appStatus.hidden = !message;
  }
  settingsStatus.textContent = state.currentScreen === "settings" ? state.status : "";
  agentStatus.textContent = state.currentScreen === "agent" ? state.status : "";
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replace(/`/g, "&#096;");
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator) || window.location.protocol === "file:") return;
  let hasReloadedForUpdate = false;
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (hasReloadedForUpdate || !navigator.serviceWorker.controller) return;
    hasReloadedForUpdate = true;
    window.location.reload();
  });
  navigator.serviceWorker.register("./sw.js?v=84").then((registration) => {
    registration.update().catch(() => {});
    if (registration.waiting) {
      registration.waiting.postMessage({ type: "SKIP_WAITING" });
    }
  }).catch(() => {});
}
