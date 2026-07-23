const categories = [
  { name: "株投資ツール", description: "株ニュース、銘柄整理、決算要約など", money: "★★★★★", easy: "★★★★☆", use: "X投稿、note記事、投資メモ", isInvestment: true },
  { name: "FXツール", description: "為替ニュース、相場メモ、シナリオ整理など", money: "★★★★☆", easy: "★★★★☆", use: "相場メモ、配信ネタ、日次レポート", isInvestment: true },
  { name: "ニュース分析ツール", description: "最新ニュースの要約、業界分析など", money: "★★★★★", easy: "★★★★★", use: "ニュースレター、SNS投稿、調査メモ", isInvestment: false },
  { name: "仮想通貨ツール", description: "仮想通貨ニュース、価格変動メモなど", money: "★★★★☆", easy: "★★★☆☆", use: "相場メモ、速報投稿、レポート", isInvestment: true },
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
    purposeOptions: ["ニュースから注目銘柄を探す", "決算情報を要約する", "株価チャートを分析する", "急騰しそうなテーマを探す", "自分だけの条件で銘柄を点数化する"],
    scopeOptions: ["日本株", "米国株", "両方"],
    outputOptions: ["ランキング形式", "点数評価", "要約レポート", "グラフ付き", "通知形式"],
    sourceLabel: "ニュース・銘柄情報",
    itemLabel: "銘柄やテーマ",
    defaultInputs: "ニュース本文、銘柄名、決算PDFの本文、検索キーワード、URLメモ",
    defaultResult: "注目銘柄、理由、注意点、投稿文案",
  },
  "FXツール": {
    purposeTitle: "どんなFXツールを作りますか？",
    scopeTitle: "どの通貨ペアを対象にしますか？",
    purposeOptions: ["為替ニュースを要約する", "通貨ペアのシナリオを整理する", "経済指標の影響を確認する", "売買メモを作る", "日次レポートを作る"],
    scopeOptions: ["ドル円", "ユーロドル", "ポンド円", "主要通貨全体"],
    outputOptions: ["シナリオ形式", "要約レポート", "チェックリスト", "通知形式", "日次メモ"],
    sourceLabel: "為替ニュース・経済指標",
    itemLabel: "通貨ペアや相場材料",
    defaultInputs: "通貨ペア、経済指標、為替ニュース、時間軸",
    defaultResult: "相場シナリオ、注目材料、注意点、日次メモ",
  },
  "ニュース分析ツール": {
    purposeTitle: "どんなニュース分析ツールを作りますか？",
    scopeTitle: "どの分野を対象にしますか？",
    purposeOptions: ["最新ニュースを要約する", "業界の変化を整理する", "重要トピックを抽出する", "ニュースレター案を作る", "調査メモを作る"],
    scopeOptions: ["ビジネス", "テクノロジー", "金融", "国内ニュース", "海外ニュース"],
    outputOptions: ["要約レポート", "トピック一覧", "ニュースレター形式", "SNS投稿案", "調査メモ"],
    sourceLabel: "ニュース記事",
    itemLabel: "ニュースやトピック",
    defaultInputs: "ニュース本文、キーワード、対象業界、期間、URLメモ",
    defaultResult: "要約、重要トピック、背景、投稿文案",
  },
  "仮想通貨ツール": {
    purposeTitle: "どんな仮想通貨ツールを作りますか？",
    scopeTitle: "どの銘柄・領域を対象にしますか？",
    purposeOptions: ["仮想通貨ニュースを要約する", "価格変動メモを作る", "注目銘柄を整理する", "オンチェーン情報をまとめる", "リスク要因を確認する"],
    scopeOptions: ["BTC", "ETH", "主要アルト", "DeFi", "NFT/GameFi"],
    outputOptions: ["要約レポート", "点数評価", "チェックリスト", "通知形式", "日次メモ"],
    sourceLabel: "仮想通貨ニュース・価格情報",
    itemLabel: "銘柄やテーマ",
    defaultInputs: "銘柄名、ニュース本文、価格情報、注目テーマ、URLメモ",
    defaultResult: "要約、価格変動理由、注目点、リスク",
  },
  "SNS運用ツール": {
    purposeTitle: "どんなSNS運用ツールを作りますか？",
    scopeTitle: "どのSNSを対象にしますか？",
    purposeOptions: ["X投稿案を作る", "スレッド構成を作る", "投稿カレンダーを作る", "反応が取れる見出しを作る", "プロフィール文を改善する"],
    scopeOptions: ["X", "Instagram", "TikTok", "YouTube Shorts", "複数SNS"],
    outputOptions: ["投稿案", "スレッド形式", "カレンダー形式", "改善リスト", "テンプレート"],
    sourceLabel: "投稿テーマ・過去投稿",
    itemLabel: "投稿案や企画",
    defaultInputs: "投稿テーマ、ターゲット、商品情報、過去投稿",
    defaultResult: "投稿文、見出し、ハッシュタグ、投稿順",
  },
  "YouTube動画制作ツール": {
    purposeTitle: "どんなYouTube動画制作ツールを作りますか？",
    scopeTitle: "どの動画タイプを対象にしますか？",
    purposeOptions: ["動画企画を作る", "台本を作る", "タイトル案を作る", "サムネイル文言を作る", "構成を改善する"],
    scopeOptions: ["解説動画", "ショート動画", "レビュー動画", "教育動画", "ライブ配信"],
    outputOptions: ["構成案", "台本形式", "タイトル一覧", "サムネ案", "チェックリスト"],
    sourceLabel: "動画テーマ・参考動画",
    itemLabel: "企画や台本",
    defaultInputs: "動画テーマ、視聴者、参考内容の本文、URLメモ、伝えたい内容",
    defaultResult: "構成、台本、タイトル、サムネ文言",
  },
  "営業集客ツール": {
    purposeTitle: "どんな営業集客ツールを作りますか？",
    scopeTitle: "どの相手を対象にしますか？",
    purposeOptions: ["営業メールを作る", "問い合わせ返信を作る", "見込み客を整理する", "提案文を作る", "商談メモをまとめる"],
    scopeOptions: ["新規顧客", "既存顧客", "問い合わせ客", "法人向け", "個人向け"],
    outputOptions: ["メール文", "返信文", "リスト形式", "提案文", "商談メモ"],
    sourceLabel: "顧客情報・商品情報",
    itemLabel: "見込み客や提案内容",
    defaultInputs: "顧客情報、商品情報、問い合わせ内容、目的",
    defaultResult: "営業文、返信文、提案ポイント、次の行動",
  },
  "資料作成ツール": {
    purposeTitle: "どんな資料作成ツールを作りますか？",
    scopeTitle: "どの資料を対象にしますか？",
    purposeOptions: ["提案資料を作る", "企画書を作る", "説明資料を作る", "社内共有メモを作る", "プレゼン構成を作る"],
    scopeOptions: ["営業資料", "社内資料", "企画資料", "研修資料", "報告資料"],
    outputOptions: ["スライド構成", "見出し案", "本文案", "要約", "チェックリスト"],
    sourceLabel: "資料テーマ・元情報",
    itemLabel: "資料項目や構成",
    defaultInputs: "資料テーマ、目的、対象者、元情報",
    defaultResult: "構成、見出し、本文案、話す順番",
  },
  "メニュー表チラシ制作ツール": {
    purposeTitle: "どんな販促物制作ツールを作りますか？",
    scopeTitle: "どの店舗・用途を対象にしますか？",
    purposeOptions: ["メニュー表を作る", "チラシ構成を作る", "キャンペーン文を作る", "商品説明を整える", "店頭POPを作る"],
    scopeOptions: ["飲食店", "美容サロン", "小売店", "イベント", "キャンペーン"],
    outputOptions: ["メニュー構成", "チラシ文面", "キャッチコピー", "POP文", "SNS告知文"],
    sourceLabel: "店舗情報・商品情報",
    itemLabel: "商品や販促内容",
    defaultInputs: "店舗名、商品名、価格、キャンペーン内容",
    defaultResult: "メニュー文、チラシ構成、キャッチコピー、告知文",
  },
  "事務作業自動化ツール": {
    purposeTitle: "どんな事務作業ツールを作りますか？",
    scopeTitle: "どの作業を対象にしますか？",
    purposeOptions: ["議事録を作る", "書類を整理する", "定型文を作る", "タスク一覧を作る", "メール文を整える"],
    scopeOptions: ["会議", "メール", "書類", "タスク管理", "社内連絡"],
    outputOptions: ["議事録形式", "一覧表", "要約", "テンプレート", "チェックリスト"],
    sourceLabel: "会議メモ・書類・メール",
    itemLabel: "事務作業やタスク",
    defaultInputs: "会議メモ、書類内容、メール文、期限",
    defaultResult: "議事録、要約、タスク一覧、定型文",
  },
  "求人採用ツール": {
    purposeTitle: "どんな求人採用ツールを作りますか？",
    scopeTitle: "どの採用業務を対象にしますか？",
    purposeOptions: ["求人票を作る", "スカウト文を作る", "面接質問を作る", "候補者メモを整理する", "採用ペルソナを作る"],
    scopeOptions: ["正社員", "アルバイト", "業務委託", "新卒", "中途"],
    outputOptions: ["求人票", "スカウト文", "質問リスト", "評価表", "候補者メモ"],
    sourceLabel: "求人条件・候補者情報",
    itemLabel: "求人や候補者",
    defaultInputs: "職種、条件、求める人物像、候補者情報",
    defaultResult: "求人票、スカウト文、面接質問、評価軸",
  },
  "ブログ記事作成ツール": {
    purposeTitle: "どんなブログ記事作成ツールを作りますか？",
    scopeTitle: "どの記事タイプを対象にしますか？",
    purposeOptions: ["SEO記事を作る", "note記事を作る", "記事構成を作る", "見出しを作る", "リライト案を作る"],
    scopeOptions: ["SEO記事", "note", "商品レビュー", "ハウツー", "コラム"],
    outputOptions: ["記事構成", "本文下書き", "見出し一覧", "要約", "改善案"],
    sourceLabel: "記事テーマ・キーワード",
    itemLabel: "記事や見出し",
    defaultInputs: "キーワード、記事テーマ、読者、参考本文、URLメモ",
    defaultResult: "記事構成、見出し、本文下書き、SEOメモ",
  },
  "教育学習ツール": {
    purposeTitle: "どんな教育学習ツールを作りますか？",
    scopeTitle: "どの学習対象を扱いますか？",
    purposeOptions: ["学習計画を作る", "教材を作る", "問題を作る", "復習メモを作る", "理解度チェックを作る"],
    scopeOptions: ["学校学習", "資格学習", "語学", "社内研修", "個人学習"],
    outputOptions: ["学習計画", "教材形式", "問題集", "復習カード", "チェックリスト"],
    sourceLabel: "学習内容・教材",
    itemLabel: "教材や問題",
    defaultInputs: "学習テーマ、レベル、教材、目標日",
    defaultResult: "学習計画、問題、解説、復習メモ",
  },
  "店舗運営ツール": {
    purposeTitle: "どんな店舗運営ツールを作りますか？",
    scopeTitle: "どの運営業務を対象にしますか？",
    purposeOptions: ["口コミ返信を作る", "キャンペーン案を作る", "販促メモを作る", "スタッフ共有文を作る", "改善点を整理する"],
    scopeOptions: ["口コミ対応", "販促", "スタッフ共有", "在庫・メニュー", "店舗改善"],
    outputOptions: ["返信文", "キャンペーン案", "共有メモ", "改善リスト", "SNS告知文"],
    sourceLabel: "店舗情報・口コミ・運営メモ",
    itemLabel: "店舗施策や返信内容",
    defaultInputs: "店舗情報、口コミ、商品情報、キャンペーン内容",
    defaultResult: "返信文、販促案、改善点、共有メモ",
  },
  "自由作成": {
    purposeTitle: "どんなツールを作りますか？",
    scopeTitle: "どの用途を対象にしますか？",
    purposeOptions: ["情報を整理する", "文章を作る", "点数化する", "チェックリストを作る", "自分だけの条件で処理する"],
    scopeOptions: ["個人用途", "仕事用", "店舗用", "SNS用", "検証用"],
    outputOptions: ["要約", "一覧表", "レポート", "テンプレート", "通知形式"],
    sourceLabel: "入力情報",
    itemLabel: "対象データ",
    defaultInputs: "扱いたい情報、条件、出力したい内容",
    defaultResult: "整理結果、文章、一覧表、次の行動",
  },
};

const screenCopy = {
  login: ["ログイン", "作る画面へ戻る"],
  create: ["何を作りますか？", "次へ進む"],
  proposal: ["提案を選びます", "次へ進む"],
  nodes: ["作業の部品を組みます", "次へ進む"],
  blueprint: ["作成内容を確認します", "次へ進む"],
  export: ["ツールを作成します", "ツールを作成する"],
  usage: ["作成したツールの使い方", "作る画面へ戻る"],
  implement: ["無料で実装する", "作る画面へ戻る"],
  plans: ["プラン一覧", "作る画面へ戻る"],
  apikey: ["APIキー設定", "作る画面へ戻る"],
  saved: ["保存済みツール", "作業の部品を見る"],
  agent: ["AIエージェントを作成します", "AIエージェントを作成する"],
  terms: ["利用規約", "作る画面へ戻る"],
  privacy: ["プライバシーポリシー", "作る画面へ戻る"],
  contact: ["お問い合わせ", "作る画面へ戻る"],
  settings: ["プランとAPI設定", "保存する"],
};

const screenCopyEn = {
  login: ["Login", "Back to Build"],
  create: ["What do you want to build?", "Next"],
  proposal: ["Choose a proposal", "Next"],
  nodes: ["Build the workflow parts", "Next"],
  blueprint: ["Review the tool content", "Next"],
  export: ["Create the tool", "Create Tool"],
  usage: ["How to Use Output Code", "Back to Build"],
  implement: ["Build Free with External AI", "Back to Build"],
  plans: ["Plans", "Back to Build"],
  apikey: ["API Key Setup (BYOK)", "Back to Build"],
  saved: ["Saved Tools", "View Workflow"],
  agent: ["Create AI Agent", "Create AI Agent"],
  terms: ["Terms of Use", "Back to Build"],
  privacy: ["Privacy Policy", "Back to Build"],
  contact: ["Contact", "Back to Build"],
  settings: ["Plan and API Settings", "Save"],
};

const uiText = {
  ja: {
    nav: { create: "作る", login: "ログイン", usage: "使い方", implement: "無料で実装", plans: "プラン", apikey: "APIキー設定", saved: "保存済み", agent: "AIエージェント作成", terms: "利用規約", privacy: "プライバシーポリシー", contact: "お問い合わせ", settings: "設定" },
    brand: "AIツール作成",
    launch: "起動ボタン",
    exportTitle: "ツール出力内容",
    saveCreated: "作成したツールを保存する",
    save: "保存する",
  },
  en: {
    nav: { create: "Build", login: "Login", usage: "How to Use", implement: "Build Free", plans: "Plans", apikey: "API Key", saved: "Saved", agent: "AI Agent", terms: "Terms", privacy: "Privacy Policy", contact: "Contact", settings: "Settings" },
    brand: "AI Tool Builder",
    launch: "Launch Button",
    exportTitle: "Tool Output",
    saveCreated: "Save created tool",
    save: "Save",
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
  "ZIP形式なら、解凍して `index.html` を開くだけで使えます。": "With ZIP format, unzip it and open `index.html`.",
  "フォルダ形式でコピーした場合だけ、区切りごとにファイルへ分けてください。": "Only folder-format copies need to be split into files manually.",
  "1. ZIP形式で作成する": "1. Create as ZIP",
  "`ZIP形式` を選んで `ツールを作成する` を押すと、実行用ファイル一式が入ったZIPが出ます。": "Choose `ZIP Format` and press `Create Tool` to download all runnable files.",
  "2. ZIPを解凍する": "2. Unzip",
  "解凍すると `index.html`、`style.css`、`script.js` などが最初から分かれた状態で入っています。": "After unzipping, files like `index.html`, `style.css`, and `script.js` are already separated.",
  "3. 起動する": "3. Launch",
  "解凍したフォルダの `index.html` をブラウザで開きます。この画面の `作成したツールを起動する` でも確認できます。": "Open `index.html` in the extracted folder. You can also preview it with the Launch Button.",
  "4. APIキーと本文を入れて使う": "4. Enter API Key and Text",
  "URLはメモ用です。実際に処理したい本文や元情報を貼り付け、OpenAI APIキーを入れて生成します。": "URLs are memo only. Paste the text/source information and enter your OpenAI API key.",
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
  "有料プラン（480円/月〜）なら、広告なしですぐ出力できます。": "Paid plans (from ¥480/month) let you output instantly without ads.",
  "気になるサービスがあれば、ぜひチェックしてみてください。": "Feel free to check out anything that catches your eye.",
  "スポンサー": "Sponsor",
  "スポンサー（ムームードメイン / ロリポップ！）": "Sponsors (Muuumu Domain / Lolipop)",
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
  exportFormat: "folder",
  createdOutput: null,
  savedBlueprints: [],
  savedAgents: [],
  selectedAgentIndex: 0,
  createdAgent: null,
  status: "",
};

const AUTH_TOKEN_KEY = "neneAuthToken";
const AUTH_REMEMBER_KEY = "neneRememberLogin";
const AUTH_EMAIL_KEY = "neneAuthEmail";
const SELECTED_PLAN_KEY = "neneSelectedPlan";
const USER_API_KEY = "neneUserApiKey";
const USER_API_PROVIDER_KEY = "neneUserApiProvider";

function shouldRememberLogin() {
  const checkbox = $("#auth-remember-me");
  if (checkbox) return checkbox.checked;
  return localStorage.getItem(AUTH_REMEMBER_KEY) !== "false";
}

function migrateLegacyClientSecrets() {
  const legacyToken = localStorage.getItem(AUTH_TOKEN_KEY) || sessionStorage.getItem(AUTH_TOKEN_KEY);
  if (legacyToken) {
    state.auth.token = legacyToken;
  }
  localStorage.removeItem(AUTH_TOKEN_KEY);
  sessionStorage.removeItem(AUTH_TOKEN_KEY);

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
}

function clearAuthToken() {
  state.auth.token = "";
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
  $("#google-login-fallback")?.addEventListener("click", () => {
    if (state.auth.providers.google.enabled && window.google?.accounts?.id) {
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          state.status = "Googleログイン画面を表示できませんでした。ポップアップブロックを解除するか、ページを再読み込みしてください。";
          renderAll();
        }
      });
      return;
    }
    if (state.auth.providers.google.enabled) {
      state.status = "Googleログインボタンの読み込み中です。少し待ってから再度お試しください。";
    } else {
      state.status = "Googleログインは GOOGLE_CLIENT_ID 未設定です。サーバーの .env に Client ID を入れて再起動してください。";
    }
    renderAll();
    activateScreen("login");
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
  $("#copy-export").addEventListener("click", copyExport);
  $("#launch-created-tool").addEventListener("click", launchCreatedTool);
  $("#save-created-tool").addEventListener("click", saveCreatedTool);
  $("#create-agent").addEventListener("click", createAgent);
  $("#save-agent").addEventListener("click", saveAgent);
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
    copyExport();
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
  $("#launch-created-tool").textContent = text.launch;
  $("#save-created-label").textContent = text.saveCreated;
  $("#save-created-tool").textContent = text.save;
  $("#export .folder-panel h2").textContent = text.exportTitle;
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
  const bases = getApiBaseCandidates();
  let lastError = null;

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
        throw new Error(data.error || "サーバー処理に失敗しました。");
      }
      resolvedApiBase = base;
      return data;
    } catch (error) {
      lastError = error;
      if (index < bases.length - 1) continue;
      break;
    }
  }

  throw lastError || new Error("サーバーに接続できません。");
}

const oauthUiState = {
  googleScriptPromise: null,
  appleScriptPromise: null,
  googleClientId: "",
  googleLocale: "",
  googleInitialized: false,
  appleClientId: "",
  appleInitialized: false,
  ensurePromise: null,
};

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
    if (google.enabled) loaders.push(loadGoogleScriptOnce());
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
  } catch {
    state.serverStatus = null;
    renderServerAuthStatus();
  }
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
  const googleReady = google.enabled && window.google?.accounts?.id;
  const googleUnchanged = googleReady
    && oauthUiState.googleInitialized
    && oauthUiState.googleClientId === google.clientId
    && oauthUiState.googleLocale === locale
    && googleMount.firstElementChild
    && !options.forceLocale;

  if (googleUnchanged) {
    googleMount.hidden = false;
    googleFallback.hidden = true;
  } else if (googleReady) {
    if (!oauthUiState.googleInitialized || oauthUiState.googleClientId !== google.clientId) {
      window.google.accounts.id.initialize({
        client_id: google.clientId,
        callback: handleGoogleCredential,
        auto_select: false,
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
    googleNote.textContent = state.language === "en"
      ? "Sign in with Google. Your Google password is not stored on NENE Studio."
      : "Google の画面で認証します。Google のパスワードは NENE Studio には保存されません。";
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
  try {
    const data = await apiRequest("/auth/google", {
      method: "POST",
      body: JSON.stringify({ credential: response.credential }),
    });
    await completeOAuthLogin(data, "Google");
  } catch (error) {
    state.status = error.message;
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
  if (!state.auth.token) {
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
  const { purpose, market, output } = state.answers;
  const customName = state.custom.toolName;
  const customInputs = state.custom.inputs || theme.defaultInputs;
  const base = [
    {
      title: customName || `${purpose}AIツール`,
      description: `${category.name}として、${market}を対象に「${purpose}」を行い、${output}で見られるようにします。`,
      money: category.money,
      easy: category.easy,
      demand: "★★★★★",
      meta: `必要なデータ：${customInputs}`,
    },
    {
      title: `${market}向け${theme.itemLabel}整理ツール`,
      description: `${theme.sourceLabel}を集め、${theme.itemLabel}を用途に合わせて整理します。`,
      money: "★★★★☆",
      easy: "★★★★☆",
      demand: "★★★★☆",
      meta: `必要なデータ：${customInputs}`,
    },
    {
      title: `${output}で見る${category.name}`,
      description: `${purpose}ための流れを、${output}として毎回同じ形で出せるようにします。`,
      money: "★★★☆☆",
      easy: "★★★☆☆",
      demand: "★★★★☆",
      meta: `必要なデータ：${customInputs}`,
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
  const { purpose, market, output } = state.answers;
  state.nodes = [
    ["開始", "作業を始める", "start"],
    [`${market}の${theme.sourceLabel}を集める部品`, `${theme.defaultInputs}などを取り込みます`, ""],
    [`${purpose}ための要点を探す部品`, `${theme.sourceLabel}から必要な情報を見つけます`, ""],
    [`${theme.itemLabel}を整理する部品`, `${market}に関係する${theme.itemLabel}を一覧にします`, ""],
    ["AIが読み取る部品", `${getSelectedCategory().name}の目的に沿って意味や注目点を整理します`, ""],
    [`${output}に整える部品`, "選んだ出力形式に合わせて見やすくします", ""],
    ["最終出力にする部品", `${state.custom.result || theme.defaultResult}としてまとめます`, ""],
    ["出力", "ツールとして保存できる形にします", "end"],
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
    inputs: state.summaryEdits.inputs || `${inputSummary}を入れます。`,
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
required_api_keys: OpenAI API key, 正式な外部データAPIを使う場合のみ追加API key
folders: config, prompts, workflow, output
error_handling: 入力不足、APIキー未設定、取得失敗を画面に表示
prompt: 取得した情報を読み、初心者にも分かる整理情報としてまとめる
note: URL本文の自動読み取りは禁止。URLはメモ扱いにし、本文貼り付けまたは正式なAPI連携だけを処理対象にする`;
}

function renderExport() {
  $$(".export-card").forEach((card) => {
    card.classList.toggle("active", card.dataset.exportFormat === state.exportFormat);
  });

  // プレビュー画面には生のAPIキーを表示しない（ダウンロード物には実キーが入る）
  const previewText = getExportText(state.exportFormat);
  const key = String(state.settings.userApiKey || readSessionApiKey() || "").trim();
  exportPreview.textContent = key
    ? previewText.split(key).join("********（実際の出力にはAPIキーが入ります）")
    : previewText;
  renderApiFormatNotice();
  exportStatus.textContent = state.status;
}

function renderApiFormatNotice() {
  const apiRequiredFormats = {
    html: "HTML形式は1ファイルで完結し、開くだけで使えます。APIキーが埋め込まれるため、ファイルを他人に渡さないでください。",
    api: "APIキー入力形式は、Gemini / OpenAI のAPIキーを設定画面か出力ツールの画面に入れると単体で実行できます。",
    codex: "Codex用ツール作成内容は、Codex側で外部APIキーや実行環境を設定しないと実行できない場合があります。",
    claude: "Claude Code用ツール作成内容は、Claude Code側でAPIキーや必要な実行環境を設定しないと実行できない場合があります。",
  };
  const message = apiRequiredFormats[state.exportFormat];
  apiFormatNotice.hidden = !message;
  apiFormatNotice.textContent = message || "";
}

function buildRunnableToolFiles() {
  const proposal = getSelectedProposal();
  const summary = getSummary();
  const prompt = buildRunnablePrompt();
  const isEnglish = state.language === "en";
  const provider = state.settings.userApiProvider || "gemini";
  const apiKey = String(state.settings.userApiKey || readSessionApiKey() || "").trim();
  const hasApiKey = Boolean(apiKey);
  const providerLabel = provider === "openai" ? "OpenAI" : "Google Gemini";
  const toolLabels = isEnglish
    ? {
        usage: "How to use",
        open: "Open index.html in your browser (double-click is fine).",
        api: hasApiKey
          ? `Your ${providerLabel} API key is already written to .env and config.js.`
          : `Enter your ${providerLabel} API key in the tool screen (or put it in .env / config.js).`,
        paste: "Paste the body text or source information. URLs are memo only.",
        generate: "Generate",
        copy: "Copy result",
        copied: "Copied.",
        result: "Check the generated result.",
        requirements: "Requirements",
        apiKey: `${providerLabel} API key`,
        apiTitle: "API key",
        inputTitle: "Input",
        workflowTitle: "Workflow",
        urlMemo: "URL memo (optional, body text is not fetched)",
        sourceText: "Body text / source information",
        extra: "Extra conditions / desired output style",
        outputTitle: "Output",
        statusNoKey: "Please enter an API key.",
        statusNoInput: "Please paste the body text or source information. URL alone cannot be processed.",
        generating: "Generating...",
        complete: "Generation complete.",
        empty: "The result was empty.",
        error: "Error: ",
        note: hasApiKey
          ? "This tool runs standalone. It calls the AI provider directly with your API key."
          : "This tool runs standalone. Add your API key to use AI generation.",
        provider: "Provider",
        saveKey: "Remember key in this browser",
        warning: "Do not share .env / config.js. They may contain your API key.",
        keyReady: "API key loaded from config.",
        promptUrl: "URL memo (not used to fetch content):",
        promptBody: "Body text / source information:",
        promptExtra: "Extra conditions:",
      }
    : {
        usage: "使い方",
        open: "`index.html` をブラウザで開きます（ダブルクリックでOK）。",
        api: hasApiKey
          ? `設定済みの ${providerLabel} APIキーを .env と config.js に書き込み済みです。`
          : `${providerLabel} の APIキーを画面に入力するか、.env / config.js に入れてください。`,
        paste: "URLはメモ欄に入れ、処理したい本文や元情報は本文欄に貼り付けます。",
        generate: "生成する",
        copy: "結果をコピー",
        copied: "コピーしました。",
        result: "結果欄に出た内容を確認します。",
        requirements: "必要なもの",
        apiKey: `${providerLabel} APIキー`,
        apiTitle: "APIキー",
        inputTitle: "入力",
        workflowTitle: "処理の流れ",
        urlMemo: "URLメモ（任意・本文は読み取りません）",
        sourceText: "本文・元情報",
        extra: "補足条件・出力の好み",
        outputTitle: "出力結果",
        statusNoKey: "APIキーを入力してください。",
        statusNoInput: "本文・元情報を貼り付けてください。URLだけでは生成できません。",
        generating: "生成中です...",
        complete: "生成が完了しました。",
        empty: "結果が空でした。",
        error: "エラー: ",
        note: hasApiKey
          ? "このツールは単体で動きます。あなたの APIキーで AI に直接接続します。"
          : "このツールは単体で動きます。APIキーを入れると AI 生成が使えます。",
        provider: "プロバイダー",
        saveKey: "このブラウザにキーを覚える",
        warning: ".env と config.js には APIキーが入ることがあります。他人に共有しないでください。",
        keyReady: "config から APIキーを読み込みました。",
        promptUrl: "URLメモ（本文取得には使わない）:",
        promptBody: "本文・元情報:",
        promptExtra: "補足条件:",
      };
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
          "1. Put this folder anywhere you like.",
          "2. If no API key is set, add one to `.env` and `config.js`.",
          "3. Open `index.html` in your browser.",
          "4. Paste the body text / source information and press `Generate`.",
        ],
        setupRecommend: "Recommended: Google Gemini (easy to call directly from the browser)",
        setupOpenAiNote: "OpenAI may fail due to browser restrictions. Use Gemini in that case.",
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
          "1. このフォルダを任意の場所に置きます。",
          "2. APIキー未設定の場合は `.env` と `config.js` にキーを入れます。",
          "3. `index.html` をブラウザで開きます。",
          "4. 本文・元情報を貼り付けて `生成する` を押します。",
        ],
        setupRecommend: "おすすめ: Google Gemini（ブラウザから直接呼びやすい）",
        setupOpenAiNote: "OpenAI はブラウザ制限で失敗する場合があります。そのときは Gemini を使ってください。",
      };

  const workflowLines = state.nodes.map(([title, description], index) => `${index + 1}. ${title}: ${description}`).join("\n");
  const sampleOutput = [
    docLabels.sampleTitle,
    "",
    docLabels.sampleResult,
    summary.result,
    "",
    docLabels.sampleInputs,
    summary.inputs,
    "",
    docLabels.sampleUsage,
    summary.usage,
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
    `# ${proposal.title} - APIキー設定`,
    `# プロバイダー: gemini または openai`,
    `AI_PROVIDER=${provider}`,
    `GEMINI_API_KEY=${provider === "gemini" && hasApiKey ? apiKey : ""}`,
    `OPENAI_API_KEY=${provider === "openai" && hasApiKey ? apiKey : ""}`,
    "# どちらの名前でも読めます",
    `API_KEY=${hasApiKey ? apiKey : ""}`,
  ].join("\n");

  const envExample = [
    "AI_PROVIDER=gemini",
    "GEMINI_API_KEY=",
    "OPENAI_API_KEY=",
    "API_KEY=",
  ].join("\n");

  const apiKeysExample = [
    "# 旧ファイル名互換。本番のキーは .env と config.js を使ってください。",
    "AI_PROVIDER=gemini",
    "GEMINI_API_KEY=",
    "OPENAI_API_KEY=",
  ].join("\n");

  const configJs = [
    "// ブラウザ用設定。.env と同じ内容です。共有ZIPには含めないでください。",
    "window.TOOL_CONFIG = {",
    `  provider: ${JSON.stringify(provider)},`,
    `  apiKey: ${JSON.stringify(apiKey)},`,
    `  title: ${JSON.stringify(proposal.title)},`,
    "};",
  ].join("\n");

  const indexHtml = [
    "<!doctype html>",
    `<html lang="${isEnglish ? "en" : "ja"}">`,
    "<head>",
    '  <meta charset="utf-8" />',
    '  <meta name="viewport" content="width=device-width, initial-scale=1" />',
    `  <title>${escapeHtml(proposal.title)}</title>`,
    '  <link rel="stylesheet" href="./style.css" />',
    "</head>",
    "<body>",
    '  <main class="tool-shell">',
    `    <h1>${escapeHtml(proposal.title)}</h1>`,
    `    <p class="lead">${escapeHtml(summary.purpose)}</p>`,
    `    <p class="note">${escapeHtml(toolLabels.note)}</p>`,
    workflowLines
      ? `    <section class="panel soft"><h2>${toolLabels.workflowTitle}</h2><pre class="workflow">${escapeHtml(workflowLines)}</pre></section>`
      : "",
    '    <section class="panel">',
    `      <h2>${toolLabels.apiTitle}</h2>`,
    `      <label>${toolLabels.provider}`,
    '        <select id="provider">',
    `          <option value="gemini"${provider === "gemini" ? " selected" : ""}>Google Gemini</option>`,
    `          <option value="openai"${provider === "openai" ? " selected" : ""}>OpenAI</option>`,
    "        </select>",
    "      </label>",
    `      <label>${toolLabels.apiKey}<input id="api-key" type="password" autocomplete="off" placeholder="APIキー" /></label>`,
    `      <label class="check"><input id="remember-key" type="checkbox" checked /> ${toolLabels.saveKey}</label>`,
    hasApiKey ? `      <p class="status" id="key-status">${toolLabels.keyReady}</p>` : "",
    "    </section>",
    '    <section class="panel">',
    `      <h2>${toolLabels.inputTitle}</h2>`,
    `      <label>${toolLabels.urlMemo}<input id="source-url" type="text" placeholder="https://example.com/article" /></label>`,
    `      <label>${toolLabels.sourceText}<textarea id="tool-input" rows="10" placeholder="${escapeAttribute(String(summary.inputs).replace(/\s+/g, " "))}"></textarea></label>`,
    `      <label>${toolLabels.extra}<textarea id="tool-extra" rows="4" placeholder="${escapeAttribute(String(summary.result).replace(/\s+/g, " "))}"></textarea></label>`,
    '      <div class="actions">',
    `        <button id="generate-button" type="button">${toolLabels.generate}</button>`,
    `        <button id="copy-button" type="button" class="secondary">${toolLabels.copy}</button>`,
    "      </div>",
    '      <p id="status" class="status" aria-live="polite"></p>',
    "    </section>",
    '    <section class="panel">',
    `      <h2>${toolLabels.outputTitle}</h2>`,
    '      <pre id="result"></pre>',
    "    </section>",
    "  </main>",
    '  <script src="./config.js"></script>',
    '  <script src="./script.js"></script>',
    "</body>",
    "</html>",
  ].join("\n");

  const styleCss = [
    ":root {",
    "  --bg: #f4f7fb;",
    "  --ink: #152033;",
    "  --muted: #5b6b80;",
    "  --line: #d7e0ec;",
    "  --panel: rgba(255,255,255,.92);",
    "  --accent: #0b6bcb;",
    "  --accent-2: #128a6a;",
    "}",
    "body {",
    "  margin: 0;",
    "  font-family: 'Hiragino Sans', 'Noto Sans JP', 'Segoe UI', sans-serif;",
    "  background:",
    "    radial-gradient(circle at 12% 8%, rgba(18,138,106,.14), transparent 28%),",
    "    radial-gradient(circle at 88% 0%, rgba(11,107,203,.16), transparent 32%),",
    "    linear-gradient(180deg, #eef4fb, var(--bg) 45%, #e8eef6);",
    "  color: var(--ink);",
    "  min-height: 100vh;",
    "}",
    ".tool-shell {",
    "  max-width: 880px;",
    "  margin: 0 auto;",
    "  padding: 32px 16px 48px;",
    "}",
    "h1 { margin: 0 0 8px; font-size: clamp(1.6rem, 3vw, 2.1rem); letter-spacing: -.02em; }",
    ".lead, .note, .status { color: var(--muted); line-height: 1.7; }",
    ".panel {",
    "  margin-top: 16px;",
    "  padding: 18px;",
    "  border: 1px solid var(--line);",
    "  border-radius: 16px;",
    "  background: var(--panel);",
    "  box-shadow: 0 12px 28px rgba(21,32,51,.06);",
    "}",
    ".panel.soft { background: rgba(255,255,255,.72); }",
    "h2 { margin: 0 0 8px; font-size: 1.05rem; }",
    "label { display: grid; gap: 8px; margin-top: 12px; color: var(--ink); }",
    "label.check { grid-template-columns: auto 1fr; align-items: center; gap: 10px; }",
    "input, textarea, select {",
    "  width: 100%;",
    "  box-sizing: border-box;",
    "  border: 1px solid var(--line);",
    "  border-radius: 10px;",
    "  background: #fff;",
    "  color: var(--ink);",
    "  padding: 12px;",
    "  font: inherit;",
    "}",
    ".actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 16px; }",
    "button {",
    "  min-height: 48px;",
    "  border: 0;",
    "  border-radius: 10px;",
    "  background: linear-gradient(135deg, var(--accent), var(--accent-2));",
    "  color: white;",
    "  font-weight: 700;",
    "  padding: 0 20px;",
    "  cursor: pointer;",
    "}",
    "button.secondary {",
    "  background: #fff;",
    "  color: var(--ink);",
    "  border: 1px solid var(--line);",
    "}",
    "button:disabled { opacity: .6; cursor: wait; }",
    "pre {",
    "  white-space: pre-wrap;",
    "  background: #f7fafc;",
    "  border: 1px solid var(--line);",
    "  border-radius: 10px;",
    "  padding: 14px;",
    "  min-height: 180px;",
    "  line-height: 1.65;",
    "}",
    "pre.workflow { min-height: 0; margin: 0; background: transparent; border: 0; padding: 0; color: var(--muted); }",
  ].join("\n");

  const scriptJs = [
    `const SYSTEM_PROMPT = ${JSON.stringify(prompt)};`,
    `const LABELS = ${JSON.stringify(toolLabels)};`,
    "const STORAGE_KEY = 'neneStandaloneToolKey';",
    "const STORAGE_PROVIDER = 'neneStandaloneToolProvider';",
    "",
    "const config = window.TOOL_CONFIG || {};",
    "// file:// で開いたときに localStorage が使えないブラウザでも止まらないようにする",
    "const storage = {",
    "  get(key) { try { return localStorage.getItem(key); } catch { return null; } },",
    "  set(key, value) { try { localStorage.setItem(key, value); } catch {} },",
    "  remove(key) { try { localStorage.removeItem(key); } catch {} },",
    "};",
    'const providerSelect = document.querySelector("#provider");',
    'const apiKeyInput = document.querySelector("#api-key");',
    'const rememberKey = document.querySelector("#remember-key");',
    'const sourceUrlInput = document.querySelector("#source-url");',
    'const toolInput = document.querySelector("#tool-input");',
    'const toolExtra = document.querySelector("#tool-extra");',
    'const generateButton = document.querySelector("#generate-button");',
    'const statusText = document.querySelector("#status");',
    'const resultBox = document.querySelector("#result");',
    "",
    "hydrateConfig();",
    'generateButton.addEventListener("click", generateResult);',
    'document.querySelector("#copy-button")?.addEventListener("click", copyResult);',
    "",
    "function hydrateConfig() {",
    "  const savedProvider = storage.get(STORAGE_PROVIDER) || config.provider || 'gemini';",
    "  const savedKey = storage.get(STORAGE_KEY) || config.apiKey || '';",
    "  if (providerSelect) providerSelect.value = savedProvider;",
    "  if (apiKeyInput && !apiKeyInput.value) apiKeyInput.value = savedKey;",
    "}",
    "",
    "function currentProvider() {",
    "  return providerSelect?.value || config.provider || 'gemini';",
    "}",
    "",
    "function currentApiKey() {",
    "  return (apiKeyInput?.value || config.apiKey || '').trim();",
    "}",
    "",
    "function persistKeyIfNeeded() {",
    "  if (!rememberKey?.checked) {",
    "    storage.remove(STORAGE_KEY);",
    "    storage.remove(STORAGE_PROVIDER);",
    "    return;",
    "  }",
    "  storage.set(STORAGE_KEY, currentApiKey());",
    "  storage.set(STORAGE_PROVIDER, currentProvider());",
    "}",
    "",
    "async function copyResult() {",
    "  const text = resultBox.textContent || '';",
    "  if (!text) return;",
    "  try {",
    "    await navigator.clipboard.writeText(text);",
    "    statusText.textContent = LABELS.copied;",
    "  } catch (error) {",
    "    statusText.textContent = LABELS.error + (error.message || error);",
    "  }",
    "}",
    "",
    "async function generateResult() {",
    "  const sourceUrl = sourceUrlInput.value.trim();",
    "  const input = toolInput.value.trim();",
    "  const extra = toolExtra.value.trim();",
    "  const apiKey = currentApiKey();",
    "  const provider = currentProvider();",
    "  if (!apiKey) {",
    "    statusText.textContent = LABELS.statusNoKey;",
    "    return;",
    "  }",
    "  if (!input) {",
    "    statusText.textContent = LABELS.statusNoInput;",
    "    return;",
    "  }",
    "  persistKeyIfNeeded();",
    "  generateButton.disabled = true;",
    "  statusText.textContent = LABELS.generating;",
    '  resultBox.textContent = "";',
    "  const userInput = [",
    "    sourceUrl ? (LABELS.promptUrl + '\\n' + sourceUrl) : '',",
    "    LABELS.promptBody + '\\n' + input,",
    "    extra ? (LABELS.promptExtra + '\\n' + extra) : '',",
    "  ].filter(Boolean).join('\\n\\n');",
    "  try {",
    "    const text = provider === 'openai'",
    "      ? await callOpenAI(apiKey, SYSTEM_PROMPT, userInput)",
    "      : await callGemini(apiKey, SYSTEM_PROMPT, userInput);",
    "    resultBox.textContent = text || LABELS.empty;",
    "    statusText.textContent = LABELS.complete;",
    "  } catch (error) {",
    "    statusText.textContent = LABELS.error + (error.message || error);",
    "  } finally {",
    "    generateButton.disabled = false;",
    "  }",
    "}",
    "",
    "async function callGemini(apiKey, systemPrompt, input) {",
    "  const model = 'gemini-2.0-flash';",
    "  const url = 'https://generativelanguage.googleapis.com/v1beta/models/' + model + ':generateContent?key=' + encodeURIComponent(apiKey);",
    "  const response = await fetch(url, {",
    "    method: 'POST',",
    "    headers: { 'Content-Type': 'application/json' },",
    "    body: JSON.stringify({",
    "      contents: [{ parts: [{ text: systemPrompt + '\\n\\n' + input }] }],",
    "    }),",
    "  });",
    "  const data = await response.json().catch(() => ({}));",
    "  if (!response.ok) {",
    "    throw new Error(data.error?.message || 'Gemini APIの実行に失敗しました。');",
    "  }",
    "  return (data.candidates?.[0]?.content?.parts || []).map((part) => part.text || '').join('');",
    "}",
    "",
    "async function callOpenAI(apiKey, systemPrompt, input) {",
    "  const response = await fetch('https://api.openai.com/v1/chat/completions', {",
    "    method: 'POST',",
    "    headers: {",
    "      'Content-Type': 'application/json',",
    "      Authorization: 'Bearer ' + apiKey,",
    "    },",
    "    body: JSON.stringify({",
    "      model: 'gpt-4o-mini',",
    "      messages: [",
    "        { role: 'system', content: systemPrompt },",
    "        { role: 'user', content: input },",
    "      ],",
    "      temperature: 0.7,",
    "    }),",
    "  });",
    "  const data = await response.json().catch(() => ({}));",
    "  if (!response.ok) {",
    "    throw new Error(data.error?.message || 'OpenAI APIの実行に失敗しました。ブラウザ制限の場合は Gemini を試してください。');",
    "  }",
    "  return data.choices?.[0]?.message?.content || '';",
    "}",
  ].join("\n");

  return {
    readme,
    setup,
    apiKeys: apiKeysExample,
    envContent,
    envExample,
    configJs,
    mainPrompt: prompt,
    nodes: workflowLines,
    sampleOutput,
    indexHtml,
    styleCss,
    scriptJs,
    hasApiKey,
  };
}

function buildRunnablePrompt() {
  const proposal = getSelectedProposal();
  const summary = getSummary();
  const isEnglish = state.language === "en";
  const workflow = state.nodes
    .map(([title, description], index) => `${index + 1}. ${title}: ${description}`)
    .join("\n");
  if (isEnglish) {
    return [
      `You are the dedicated assistant for "${proposal.title}".`,
      `Purpose: ${summary.purpose}`,
      `Target user: ${summary.user}`,
      `Expected input: ${summary.inputs}`,
      `Expected output: ${summary.result}`,
      `Usage context: ${summary.usage}`,
      "",
      "Follow this workflow in order:",
      workflow || "1. Organize the input\n2. Extract key points\n3. Summarize clearly",
      "",
      "Output rules:",
      "- Use clear headings and short paragraphs",
      "- Lead with the conclusion",
      "- Separate evidence, caveats, and next actions",
      "- If input is incomplete, ask for missing items first as bullets",
      "- Do not fetch URL contents; treat URLs as source memos only",
      "- Do not invent facts; mark unknowns as unknown",
      "- No filler openings like \"Sure\" or \"Understood\"",
    ].join("\n");
  }
  return [
    `あなたは「${proposal.title}」専用の実務アシスタントです。`,
    `目的: ${summary.purpose}`,
    `想定ユーザー: ${summary.user}`,
    `受け取る入力: ${summary.inputs}`,
    `出すべき結果: ${summary.result}`,
    `使い方の前提: ${summary.usage}`,
    "",
    "処理手順（必ずこの順番で考える）:",
    workflow || "1. 入力を整理する\n2. 要点を抽出する\n3. わかりやすくまとめる",
    "",
    "出力フォーマット（この見出し構成を優先）:",
    "## 結論",
    "## ポイント",
    "## 詳細",
    "## 注意点",
    "## 次のアクション",
    "",
    "出力ルール:",
    "- 日本語で、見出し付きの読みやすい文章にする",
    "- 重要な結論を最初に書く",
    "- 箇条書きを活用し、1項目は1〜2行に収める",
    "- 入力が足りないときは、不足情報を箇条書きで先に尋ねる",
    "- URLが入力されていても本文を取得しに行かない。URLは出典メモとして扱う",
    "- 推測で事実を埋めない。不明な点は不明と書く",
    "- 余計な前置きや「了解しました」は書かない",
    "- ツールの目的から外れた一般論だけで埋めない",
  ].join("\n");
}

function getExportText(format) {
  const blueprintText = buildBlueprintText();
  const files = buildRunnableToolFiles();
  const keyNote = files.hasApiKey
    ? "※ 設定画面の APIキーは .env と config.js に反映済みです（共有しないでください）。"
    : "※ APIキー未設定です。ZIP解凍後に画面入力するか、.env / config.js に入れてください。";
  const exportTextByFormat = {
    html: buildLaunchHtml(files),
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
3. 本文・元情報を貼る
4. 生成する を押す

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

  return exportTextByFormat[format] || exportTextByFormat.folder;
}

function adsCurrentlyEnabled() {
  return window.NENE_ADS?.enabled !== false;
}

async function copyExport() {
  if (adsCurrentlyEnabled() && !state.auth.user?.isAdFree) {
    showAdBeforeOutput(runOutput);
    return;
  }
  runOutput();
}

async function runOutput() {
  saveUserApiKey();
  const files = buildRunnableToolFiles();
  const text = getExportText(state.exportFormat);
  const proposal = getSelectedProposal();
  const keyStatus = files.hasApiKey
    ? "APIキーを .env と config.js に反映しました。"
    : "APIキー未設定のため、プレースホルダのままです（設定画面でキーを保存してから再作成してください）。";
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
      const htmlBlob = new Blob([buildLaunchHtml(files)], { type: "text/html;charset=utf-8" });
      downloadBlob(htmlBlob, `${sanitizeFileName(proposal.title)}.html`);
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      downloadGeneratedFile(text, state.exportFormat, proposal.title);
    } else {
      fallbackCopy(text);
      downloadGeneratedFile(text, state.exportFormat, proposal.title);
    }
    state.status = state.exportFormat === "zip"
      ? `ZIPをダウンロードしました。${keyStatus} 共有しないでください。`
      : state.exportFormat === "html"
        ? `HTMLファイルをダウンロードしました。ダブルクリックで開くとそのまま使えます。${keyStatus} 共有しないでください。`
        : `作成内容を出力しました。${keyStatus}`;
  } catch (error) {
    fallbackCopy(text);
    downloadGeneratedFile(text, state.exportFormat, proposal.title);
    state.status = `作成内容を出力しました。${keyStatus}`;
  }
  renderAll();
  activateScreen("export");
}

function showAdBeforeOutput(callback) {
  if (!adsCurrentlyEnabled()) {
    callback();
    return;
  }
  const waitSeconds = window.NeneAds?.getWaitSeconds?.() ?? 5;
  let seconds = waitSeconds;
  const countdown = $("#ad-countdown");
  const countdownNumber = $("#ad-countdown-number");
  adOverlay.hidden = false;
  adContinue.disabled = true;
  adContinue.hidden = true;
  adContinue.textContent = state.language === "en" ? "continue" : "続ける";
  if (countdown) countdown.hidden = false;
  if (countdownNumber) countdownNumber.textContent = String(Math.max(0, seconds));

  const adSlot = $("#ad-slot");
  if (adSlot && window.NeneAds?.loadSlot) {
    window.NeneAds.loadSlot(adSlot).catch(() => {});
  }

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
  saveUserApiKey();
  const files = buildRunnableToolFiles();
  const html = buildLaunchHtml(files);
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  window.open(url, "_blank", "noopener,noreferrer");
  state.status = files.hasApiKey
    ? "ツールを起動しました。APIキーは config に入っているので、そのまま生成できます。"
    : "ツールを起動しました。APIキー未設定のため、画面でキーを入れてから生成してください。";
  renderAll();
}

function buildLaunchHtml(files) {
  const bodyMatch = files.indexHtml.match(/<body>([\s\S]*?)<\/body>/i);
  const titleMatch = files.indexHtml.match(/<title>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1] : "作成ツール";
  let bodyContent = bodyMatch ? bodyMatch[1] : "";
  bodyContent = bodyContent
    .replace(/<script src="\.\/config\.js"><\/script>\s*/i, "")
    .replace(/<script src="\.\/script\.js"><\/script>/i, "");
  return `<!doctype html>
<html lang="${state.language === "en" ? "en" : "ja"}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title}</title>
  <style>${files.styleCss}</style>
</head>
<body>
${bodyContent}
<script>${files.configJs}<\/script>
<script>${files.scriptJs}<\/script>
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
  if (!state.auth.token) return;
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
  state.exportFormat = saved.exportFormat;
  state.selectedProposalIndex = 0;
  state.proposalOffset = 0;
  syncInputsFromState();
  syncChoiceButtonsFromState();
  prepareNodes();
  state.status = `${saved.title}を読み込みました。`;
  renderAll();
  activateScreen("blueprint");
}

function getAgentIdeas() {
  const tools = state.savedBlueprints;
  if (tools.length === 0) {
    return [];
  }
  const toolNames = tools.map((tool) => tool.title);
  return [
    {
      title: "毎日の自動レポートAIエージェント",
      description: "保存済みツールを順番に実行し、情報収集からレポート作成までをまとめます。",
      tools: toolNames,
      output: "日次レポート、要点、次に見るべき項目",
    },
    {
      title: "SNS投稿準備AIエージェント",
      description: "調査した内容を、投稿文・画像指示・確認メモまで展開します。",
      tools: toolNames.slice(0, Math.max(1, Math.min(toolNames.length, 3))),
      output: "X投稿案、画像生成指示、投稿前チェック",
    },
    {
      title: "確認付き作業代行AIエージェント",
      description: "各ツールの結果を確認しながら進め、最後にまとめて出力します。",
      tools: toolNames,
      output: "確認リスト、作業ログ、最終出力",
    },
  ];
}

function renderAgentBuilder() {
  const ideas = getAgentIdeas();
  if (ideas.length === 0) {
    agentProposals.innerHTML = `
      <article class="agent-proposal-card">
        <span class="tag">保存済みツールが必要</span>
        <h2>まずツールを保存してください</h2>
        <p>ツール作成画面で「ツールを作成する」を押し、保存にチェックして保存すると、ここにAIエージェント案が出ます。</p>
      </article>
    `;
    agentPreview.textContent = "保存済みツールを追加すると、作成できるAIエージェント案が表示されます。";
    return;
  }

  const selectedIdea = ideas[state.selectedAgentIndex] || ideas[0];
  agentProposals.innerHTML = ideas
    .map((idea, index) => `
      <article class="agent-proposal-card${index === state.selectedAgentIndex ? " active" : ""}" data-agent-index="${index}">
        <span class="tag">提案 ${index + 1}</span>
        <h2>${escapeHtml(idea.title)}</h2>
        <p>${escapeHtml(idea.description)}</p>
        <p class="meta">使うツール：${escapeHtml(idea.tools.join("、"))}</p>
      </article>
    `)
    .join("");

  agentPreview.textContent = state.createdAgent?.content || buildAgentText(selectedIdea);
}

function buildAgentText(idea) {
  return `agent_name: ${idea.title}
purpose: ${idea.description}
tools:
${idea.tools.map((tool, index) => `  ${index + 1}. ${tool}`).join("\n")}
workflow:
  1. 必要な入力を確認する
  2. 保存済みツールを順番に実行する
  3. 各ツールの結果をまとめる
  4. ${idea.output}として出力する
output: ${idea.output}
note: このAIエージェント案は保存済みツールを参考にした作成案です。`;
}

async function createAgent() {
  const ideas = getAgentIdeas();
  if (ideas.length === 0) {
    state.status = "AIエージェントを作るには、先にツールを保存してください。";
    renderAll();
    return;
  }
  const idea = ideas[state.selectedAgentIndex] || ideas[0];
  const content = buildAgentText(idea);
  state.createdAgent = {
    title: idea.title,
    tools: [...idea.tools],
    content,
  };
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(content);
    } else {
      fallbackCopy(content);
    }
  } catch (error) {
    fallbackCopy(content);
  }
  downloadGeneratedFile(content, "agent", idea.title);
  state.status = "AIエージェント作成内容を表示・コピー・ダウンロードしました。保存する場合は「保存する」を押してください。";
  renderAll();
}

function saveAgent() {
  if (!state.createdAgent) {
    state.status = "先に「AIエージェントを作成する」を押してください。";
    renderAll();
    return;
  }
  const alreadySaved = state.savedAgents.some((agent) => agent.title === state.createdAgent.title);
  if (alreadySaved) {
    state.status = "同じ名前のAIエージェントはすでに保存済みです。";
    renderAll();
    return;
  }
  state.savedAgents.unshift({ ...state.createdAgent });
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
  // 新バージョンのSWが有効になったら1回だけ自動リロードして、古いキャッシュのまま使い続けないようにする
  let hasReloadedForUpdate = false;
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (hasReloadedForUpdate || !navigator.serviceWorker.controller) return;
    hasReloadedForUpdate = true;
    window.location.reload();
  });
  navigator.serviceWorker.register("./sw.js").catch(() => {
    state.status = "PWAのオフライン登録に失敗しました。サーバー起動後に再読み込みしてください。";
    renderAll();
  });
}
