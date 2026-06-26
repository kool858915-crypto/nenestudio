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
  login: ["ログイン", "作る画面へ戻る", "メールアドレスでログインしてください。", "保存や課金状態の同期にはログインが必要です。", "誰が使っているかを判定し、保存済みツールを安全に管理します。"],
  create: ["何を作りますか？", "次へ進む", "カテゴリを選び、必要なときだけ方向性の質問に答えてください。", "最初は「ニュース分析ツール」が作りやすいです。", "入力が少なく、毎日使えて、収益化にもつなげやすいです。"],
  proposal: ["提案を選びます", "次へ進む", "3つの案から使いたいものを選んでください。", "最初はニュース連動型の案がおすすめです。", "必要なデータが少なく、出力の使い道が広いからです。"],
  nodes: ["作業の部品を組みます", "次へ進む", "作業の部品と、その組み合わせ例を確認してください。", "まずは自動で並んだまま進めて大丈夫です。", "ノードは作業の部品です。部品をつなげると、完成までの流れが見えるようになります。"],
  blueprint: ["作成内容を確認します", "次へ進む", "かんたん表示で内容を確認してください。", "慣れている人だけ詳細表示を見れば十分です。", "CodexやClaude Codeに渡す内容は詳細表示に入っています。"],
  export: ["ツールを作成します", "ツールを作成する", "出したい形式を選んでください。", "最初はフォルダ形式がおすすめです。", "READMEや設定ファイルをまとめて確認しやすいからです。"],
  usage: ["作成したツールの使い方", "作る画面へ戻る", "作成結果をどう使うか確認してください。", "最初はフォルダ形式で作成し、ファイル名ごとに分ける方法がおすすめです。", "index.html、style.css、script.js が同じフォルダにあれば、ブラウザで開いて使えます。"],
  saved: ["保存済みツール", "作業の部品を見る", "過去に作ったツールを確認してください。", "複数のツールを組み合わせると、まとまった作業の流れを作れます。", "作業の流れを分けておくと、後から組み替えやすくなります。"],
  agent: ["AIエージェントを作成します", "AIエージェントを作成する", "保存済みツールから、作れるAIエージェント案を確認してください。", "まずは保存済みツールを2つ以上作ると提案が広がります。", "ツールを組み合わせると、調査から出力までを一連の作業にできます。"],
  terms: ["利用規約", "作る画面へ戻る", "利用条件とストア審査用説明を確認してください。", "正式公開前に運営者情報を確定してください。", "課金、生成AI、投資系注意の説明が必要です。"],
  privacy: ["プライバシーポリシー", "作る画面へ戻る", "個人情報やAPIキーの取り扱いを確認してください。", "APIキーは自己責任で管理してください。", "入力する情報には個人情報や機密情報を含めないでください。"],
  contact: ["お問い合わせ", "作る画面へ戻る", "問い合わせ先を確認してください。", "公開前に正式な連絡先へ差し替えてください。", "AdSense審査でも問い合わせ先は重要です。"],
  settings: ["サーバー設定を確認します", "保存する", "ログイン、課金、APIキー保護の設定を確認してください。", "支払いはStripeのみです。", "OpenAI APIキーはブラウザに置かずサーバーで管理します。"],
};

const screenCopyEn = {
  login: ["Login", "Back to Build", "Log in with your email address.", "Login is required to sync saved tools and billing status.", "The app identifies the current user and stores tools securely."],
  create: ["What do you want to build?", "Next", "Choose a category and answer direction questions only when needed.", "News analysis tools are a good first choice.", "They need fewer inputs and are easy to reuse."],
  proposal: ["Choose a proposal", "Next", "Choose one of the suggested ideas.", "The recommended idea is usually the easiest place to start.", "It has fewer required inputs and broad output uses."],
  nodes: ["Build the workflow parts", "Next", "Review the workflow parts and their combination.", "You can start with the automatic order.", "Nodes are workflow parts. Connecting them shows the full tool flow."],
  blueprint: ["Review the tool content", "Next", "Review the simple summary first.", "Advanced users can check the detailed view.", "The detailed view contains content for Codex or Claude Code."],
  export: ["Create the tool", "Create Tool", "Choose the output format.", "ZIP is recommended because the files are already separated.", "You can unzip it and open index.html."],
  usage: ["How to Use Output Code", "Back to Build", "Check how to use the generated code as a tool.", "ZIP output is the easiest option.", "Open index.html after extracting the files."],
  saved: ["Saved Tools", "View Workflow", "Check your saved tools.", "Combining tools can create an AI agent.", "Separate workflows are easier to reuse."],
  agent: ["Create AI Agent", "Create AI Agent", "Review AI agent ideas based on saved tools.", "Save at least two tools to get better suggestions.", "Combining tools can automate a larger workflow."],
  terms: ["Terms of Use", "Back to Build", "Review usage terms and store review notes.", "Finalize operator details before public release.", "Billing, generative AI, and investment disclaimers are required."],
  privacy: ["Privacy Policy", "Back to Build", "Review how personal data and API keys are handled.", "Manage API keys at your own responsibility.", "Do not enter personal or confidential information."],
  contact: ["Contact", "Back to Build", "Check the contact information.", "Replace this with real contact details before launch.", "Contact information is important for AdSense review."],
  settings: ["Server Settings", "Save", "Review login, billing, and API key protection settings.", "Payments are Stripe only.", "The OpenAI API key is kept on the server, not in the browser."],
};

const uiText = {
  ja: {
    nav: { create: "作る", login: "ログイン", usage: "使い方", saved: "保存済み", agent: "AIエージェント作成", terms: "利用規約", privacy: "プライバシーポリシー", contact: "お問い合わせ", settings: "設定" },
    brand: "AIツール作成",
    launch: "起動ボタン",
    exportTitle: "ツール出力内容",
    saveCreated: "作成したツールを保存する",
    save: "保存する",
  },
  en: {
    nav: { create: "Build", login: "Login", usage: "How to Use", saved: "Saved", agent: "AI Agent", terms: "Terms", privacy: "Privacy Policy", contact: "Contact", settings: "Settings" },
    brand: "AI Tool Builder",
    launch: "Launch Button",
    exportTitle: "Tool Output",
    saveCreated: "Save created tool",
    save: "Save",
  },
};

const textTranslations = {
  "MVPワイヤーフレーム": "MVP Wireframe",
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
  "無料プラン：出力前に広告が流れます": "Free plan: ads appear before output",
  "月額780円プラン：広告なしで出力できます": "¥780/month plan: output without ads",
  "広告なしプランはStripe決済完了後に有効になります。": "The ad-free plan becomes active after Stripe payment is completed.",
  "支払い方法": "Payment Method",
  "支払いはStripeのみです。Stripe Checkout + Stripe Billing で月額780円のサブスクを管理します。": "Payments are Stripe only. Stripe Checkout + Stripe Billing manages the ¥780/month subscription.",
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
  "無料プランのため、出力前に広告を表示しています。": "Free plan: an ad is shown before output.",
  "月額780円プランにすると、この広告は表示されません。": "The ¥780/month plan removes this ad.",
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
  "このAIエージェント案は保存済みツールを参考にした試作品用の作成内容です。": "This AI agent draft is prototype output based on saved tools.",
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
  "月額780円プランを選択しました。Stripe決済完了後は広告なしになります。": "Selected the ¥780/month plan. Ads are removed after Stripe payment is completed.",
  "月額780円プランを選択しました。下のStripeボタンからカードまたは携帯払いで支払ってください。": "Selected the ¥780/month plan. Pay by card or mobile payment using the Stripe button below.",
  "Stripeの決済画面を開きました。カードまたは携帯払いで支払ってください。": "Opened Stripe Checkout. Pay by card or mobile payment.",
  "Stripe決済完了を確認しました。広告なしプランを有効にしました。": "Stripe payment completion detected. The ad-free plan is now active.",
  "無料プランに戻しました。出力前に広告が表示されます。": "Returned to the free plan. Ads will appear before output.",
  "無料プランを選択しました。出力前に広告が表示されます。": "Selected the free plan. Ads will appear before output.",
  "月額780円プラン": "¥780/month plan",
  "無料プラン": "Free plan",
  "を保存しました。APIキーは必要になったら入力してください。": " saved. Enter API keys when needed.",
  "を保存しました。この試作品では画面を閉じるまで保持します。": " saved. This prototype keeps it until the screen is closed.",
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
};

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
  <p>The Service may use cookies to improve convenience, understand usage, and prevent misuse. Some functions may not work correctly if cookies are disabled.</p>
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
    plan: "free",
    paymentProvider: "Stripe Checkout + Stripe Billing",
    premiumPriceYen: 780,
    adFreeFlagAfterPayment: true,
    paymentStatus: "unpaid",
  },
  auth: {
    token: "",
    user: null,
  },
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

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));
const API_BASE = window.NENE_CONFIG?.apiBase || "/api";

const categoryGrid = $("#category-grid");
const investmentNotice = $("#investment-notice");
const simpleBlueprint = $("#simple-blueprint");
const detailBlueprint = $("#detail-blueprint");
const exportPreview = $("#export-preview");
const exportStatus = $("#export-status");
const savedList = $("#saved-list");
const nodeCanvas = $("#node-canvas");
const settingsStatus = $("#settings-status");
const assistStatus = $("#assist-status");
const agentProposals = $("#agent-proposals");
const agentPreview = $("#agent-preview");
const agentStatus = $("#agent-status");
const nodeEditorList = $("#node-editor-list");
const apiFormatNotice = $("#api-format-notice");
const adOverlay = $("#ad-overlay");
const adContinue = $("#ad-continue");
const authStatus = $("#auth-status");

hydrateAuthState();
hydrateStripePaymentState();
handleStripeReturn();
renderCategories();
syncHearingFromActiveButtons();
prepareNodes();
bindEvents();
renderAll();
registerServiceWorker();
if (state.auth.token) {
  refreshCurrentUser().then(loadSavedToolsFromServer).then(renderAll).catch(() => {});
}

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

  $$(".language-button").forEach((button) => {
    button.addEventListener("click", () => {
      state.language = button.dataset.language;
      state.status = state.language === "en" ? "Language changed to English." : "表示言語を日本語に変更しました。";
      renderAll();
      activateScreen(state.currentScreen);
    });
  });

  $$(".step-item").forEach((button) => {
    button.addEventListener("click", () => activateScreen(button.dataset.stepScreen));
  });

  $("#login-button").addEventListener("click", () => submitAuth("login"));
  $("#register-button").addEventListener("click", () => submitAuth("register"));
  $("#logout-button").addEventListener("click", logoutUser);

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
      if (input.value === "premium") {
        state.status = "月額780円プランを選択しました。下のStripeボタンからカードまたは携帯払いで支払ってください。";
      } else {
        state.settings.paymentStatus = "unpaid";
        state.status = "無料プランに戻しました。出力前に広告が表示されます。";
      }
      renderAll();
    });
  });
  $("#stripe-checkout-button").addEventListener("click", openStripeCheckout);
  $("#save-settings").addEventListener("click", () => {
    const planText = state.settings.paymentStatus === "paid" ? "月額780円プラン" : "無料プラン";
    state.status = `${planText}を保存しました。APIキーはサーバー側の環境変数で管理します。`;
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
  const [title, action, now, recommend, reason] = copySource[screenId];
  $("#screen-title").textContent = title;
  $("#main-action").textContent = action;
  $("#assist-now").textContent = now;
  $("#assist-recommend").textContent = recommend;
  $("#assist-reason").textContent = reason;
  renderAll();
}

function runMainAction() {
  const nextByScreen = {
    create: "proposal",
    proposal: "nodes",
    nodes: "blueprint",
    blueprint: "export",
    usage: "create",
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
  renderCreateProgress();
  renderLanguage();
}

function renderLanguage() {
  const text = uiText[state.language];
  renderStaticLanguage();
  renderPrivacyLanguage();
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
      if (!parent || ["SCRIPT", "STYLE", "TEXTAREA", "INPUT"].includes(parent.tagName)) {
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
  const panel = document.querySelector(".policy-panel");
  if (!panel) return;
  if (!panel.dataset.jaHtml) panel.dataset.jaHtml = panel.innerHTML;
  panel.innerHTML = state.language === "en" ? privacyPolicyEn : panel.dataset.jaHtml;
}

function hydrateStripePaymentState() {
}

function handleStripeReturn() {
  const params = new URLSearchParams(window.location.search);
  if (params.get("stripe") === "success" || params.get("payment") === "success") {
    state.status = "Stripe決済後の状態をサーバーに確認しています。";
    refreshCurrentUser();
    window.history.replaceState({}, document.title, window.location.pathname);
  }
}

function hydrateAuthState() {
  state.auth.token = localStorage.getItem("neneAuthToken") || "";
}

async function apiRequest(path, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };
  if (state.auth.token) {
    headers.Authorization = `Bearer ${state.auth.token}`;
  }
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || "サーバー処理に失敗しました。");
  }
  return data;
}

async function submitAuth(mode) {
  const email = $("#auth-email").value.trim();
  const password = $("#auth-password").value;
  if (!email || password.length < 8) {
    state.status = "メールアドレスと8文字以上のパスワードを入力してください。";
    renderAll();
    activateScreen("login");
    return;
  }

  try {
    const data = await apiRequest(`/auth/${mode}`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    state.auth.token = data.token;
    localStorage.setItem("neneAuthToken", data.token);
    applyServerUser(data.user);
    state.status = mode === "register" ? "新規登録してログインしました。" : "ログインしました。";
    await loadSavedToolsFromServer();
  } catch (error) {
    state.status = error.message;
  }
  renderAll();
  activateScreen("login");
}

function logoutUser() {
  state.auth.token = "";
  state.auth.user = null;
  state.settings.paymentStatus = "unpaid";
  state.settings.plan = "free";
  localStorage.removeItem("neneAuthToken");
  state.status = "ログアウトしました。";
  renderAll();
  activateScreen("login");
}

async function refreshCurrentUser() {
  if (!state.auth.token) {
    state.status = "決済状態を確認するにはログインしてください。";
    renderAll();
    activateScreen("login");
    return;
  }
  try {
    const data = await apiRequest("/auth/me");
    applyServerUser(data.user);
    state.status = state.settings.paymentStatus === "paid"
      ? "Stripe Webhookで広告なしプランが確認できました。"
      : "決済完了待ちです。Stripe処理完了後に再度確認してください。";
  } catch (error) {
    state.status = error.message;
  }
  renderAll();
}

function applyServerUser(user) {
  state.auth.user = user;
  state.settings.paymentStatus = user?.isPaid ? "paid" : "unpaid";
  state.settings.plan = user?.isPaid ? "premium" : "free";
}

function renderPaymentSettings() {
  const paymentStatus = $("#stripe-payment-status");
  $$("input[name='plan']").forEach((input) => {
    input.checked = input.value === state.settings.plan;
  });
  if (paymentStatus) {
    paymentStatus.textContent = state.settings.paymentStatus === "paid"
      ? "Stripe決済済みです。広告なしプランが有効です。"
      : "未決済です。Stripeで支払い後、広告なしプランが有効になります。";
  }
}

async function openStripeCheckout() {
  if (!state.auth.token) {
    state.status = "Stripe決済を開始するにはログインしてください。";
    renderAll();
    activateScreen("login");
    return;
  }

  try {
    const data = await apiRequest("/billing/create-checkout-session", {
      method: "POST",
      body: JSON.stringify({ plan: "premium" }),
    });
    window.location.href = data.url;
    state.status = "Stripeの決済画面を開きました。カードまたは携帯払いで支払ってください。";
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

  exportPreview.textContent = getExportText(state.exportFormat);
  renderApiFormatNotice();
  exportStatus.textContent = state.status;
}

function renderApiFormatNotice() {
  const apiRequiredFormats = {
    api: "APIキー入力形式は、OpenAI APIキーや外部データAPIキーを入れないと実行できません。",
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
  const toolLabels = isEnglish
    ? {
        usage: "How to use",
        open: "Open index.html in your browser.",
        api: "Log in to NENE Studio. The OpenAI API key is kept on the server.",
        paste: "Paste the body text or source information. URLs are memo only.",
        generate: "Generate",
        result: "Check the generated result.",
        requirements: "Requirements",
        apiKey: "Server-side OpenAI API key",
        apiTitle: "Secure Server API",
        inputTitle: "Input",
        urlMemo: "URL memo (optional, body text is not fetched)",
        sourceText: "Body text / source information",
        extra: "Extra conditions",
        outputTitle: "Output",
        statusNoKey: "Please log in before generating.",
        statusNoInput: "Please paste the body text or source information. URL alone cannot be processed.",
        generating: "Generating...",
        complete: "Generation complete.",
        empty: "The result was empty.",
        error: "Error: ",
        note: "The OpenAI API key is never entered in the browser. The server runs AI generation.",
      }
    : {
        usage: "使い方",
        open: "`index.html` をブラウザで開きます。",
        api: "NENE Studioにログインします。OpenAI APIキーはサーバーで管理します。",
        paste: "URLはメモ欄に入れ、処理したい本文や元情報は本文欄に貼り付けます。",
        generate: "生成する",
        result: "結果欄に出た内容を確認します。",
        requirements: "必要なもの",
        apiKey: "サーバー側OpenAI APIキー",
        apiTitle: "安全なサーバーAPI",
        inputTitle: "入力",
        urlMemo: "URLメモ（任意・本文は読み取りません）",
        sourceText: "本文・元情報",
        extra: "補足条件",
        outputTitle: "出力結果",
        statusNoKey: "生成する前にログインしてください。",
        statusNoInput: "本文・元情報を貼り付けてください。URLだけでは生成できません。",
        generating: "生成中です...",
        complete: "生成が完了しました。",
        empty: "結果が空でした。",
        error: "エラー: ",
        note: "OpenAI APIキーはブラウザに入力しません。サーバーAPIがAI生成を実行します。",
      };
  const workflowLines = state.nodes.map(([title, description], index) => `${index + 1}. ${title}: ${description}`).join("\n");
  const sampleOutput = [
    `# ${proposal.title} サンプル出力`,
    "",
    "## 出力例",
    summary.result,
    "",
    "## 入力例",
    summary.inputs,
    "",
    "## 使い方",
    summary.usage,
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
    `4. \`${toolLabels.generate}\``,
    `5. ${toolLabels.result}`,
    "",
    `## ${toolLabels.requirements}`,
    `- ${toolLabels.apiKey}`,
    `- ${toolLabels.note}`,
  ].join("\n");

  const setup = [
    "# setup",
    "",
    "1. このフォルダを任意の場所に置きます。",
    "2. `index.html` をブラウザで開きます。",
    "3. NENE Studioにログインします。",
    "4. URLはメモ欄に入れ、処理する本文や元情報は本文欄に貼り付けます。",
    "5. 入力欄を埋めて `生成する` を押します。",
    "",
    "OpenAI APIキーはサーバー側の `.env` に設定します。ブラウザには入力しません。",
    "URLを入れても本文は自動取得しません。本文貼り付け、または正式なAPI連携を使ってください。",
  ].join("\n");

  const apiKeys = [
    "# サーバー側の .env にだけ設定します",
    "OPENAI_API_KEY=sk-proj-...",
    "# 外部データAPIを正式に使う場合のみサーバーに追加",
    "EXTERNAL_DATA_API_KEY=",
  ].join("\n");

  const indexHtml = [
    "<!doctype html>",
    '<html lang="ja">',
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
    '    <section class="panel">',
    `      <h2>${toolLabels.apiTitle}</h2>`,
    `      <p class="note">${toolLabels.note}</p>`,
    "    </section>",
    '    <section class="panel">',
    `      <h2>${toolLabels.inputTitle}</h2>`,
    `      <label>${toolLabels.urlMemo}<input id="source-url" type="text" placeholder="https://example.com/article" /></label>`,
    `      <label>${toolLabels.sourceText}<textarea id="tool-input" rows="8" placeholder="${escapeAttribute(summary.inputs)}"></textarea></label>`,
    `      <label>${toolLabels.extra}<textarea id="tool-extra" rows="4" placeholder="${escapeAttribute(summary.result)}"></textarea></label>`,
    `      <button id="generate-button">${toolLabels.generate}</button>`,
    '      <p id="status" class="status"></p>',
    "    </section>",
    '    <section class="panel">',
    `      <h2>${toolLabels.outputTitle}</h2>`,
    '      <pre id="result"></pre>',
    "    </section>",
    "  </main>",
    '  <script src="./script.js"></script>',
    "</body>",
    "</html>",
  ].join("\n");

  const styleCss = [
    "body {",
    "  margin: 0;",
    "  font-family: system-ui, sans-serif;",
    "  background: #0f172a;",
    "  color: #f8fafc;",
    "}",
    ".tool-shell {",
    "  max-width: 880px;",
    "  margin: 0 auto;",
    "  padding: 32px 16px;",
    "}",
    ".lead, .note, .status { color: #cbd5e1; line-height: 1.7; }",
    ".panel {",
    "  margin-top: 16px;",
    "  padding: 18px;",
    "  border: 1px solid rgba(255,255,255,.16);",
    "  border-radius: 12px;",
    "  background: rgba(15,23,42,.82);",
    "}",
    "label { display: grid; gap: 8px; margin-top: 12px; }",
    "input, textarea {",
    "  width: 100%;",
    "  box-sizing: border-box;",
    "  border: 1px solid rgba(255,255,255,.2);",
    "  border-radius: 8px;",
    "  background: #020617;",
    "  color: #f8fafc;",
    "  padding: 12px;",
    "}",
    "button {",
    "  margin-top: 14px;",
    "  min-height: 44px;",
    "  border: 0;",
    "  border-radius: 8px;",
    "  background: #2563eb;",
    "  color: white;",
    "  font-weight: 700;",
    "  padding: 0 18px;",
    "}",
    "pre {",
    "  white-space: pre-wrap;",
    "  background: #020617;",
    "  border-radius: 8px;",
    "  padding: 14px;",
    "  min-height: 160px;",
    "}",
  ].join("\n");

  const scriptJs = [
    `const SYSTEM_PROMPT = ${JSON.stringify(prompt)};`,
    "",
    'const sourceUrlInput = document.querySelector("#source-url");',
    'const toolInput = document.querySelector("#tool-input");',
    'const toolExtra = document.querySelector("#tool-extra");',
    'const generateButton = document.querySelector("#generate-button");',
    'const statusText = document.querySelector("#status");',
    'const resultBox = document.querySelector("#result");',
    "",
    'generateButton.addEventListener("click", generateResult);',
    "",
    "async function generateResult() {",
    "  const token = localStorage.getItem('neneAuthToken') || '';",
    "  const sourceUrl = sourceUrlInput.value.trim();",
    "  const input = toolInput.value.trim();",
    "  const extra = toolExtra.value.trim();",
    "  if (!token) {",
    `    statusText.textContent = ${JSON.stringify(toolLabels.statusNoKey)};`,
    "    return;",
    "  }",
    "  if (!input) {",
    `    statusText.textContent = ${JSON.stringify(toolLabels.statusNoInput)};`,
    "    return;",
    "  }",
    `  statusText.textContent = ${JSON.stringify(toolLabels.generating)};`,
    '  resultBox.textContent = "";',
    "  try {",
    "    const response = await fetch('/api/ai/generate', {",
    "      method: 'POST',",
    "      headers: {",
    "        'Content-Type': 'application/json',",
    "        Authorization: 'Bearer ' + token,",
    "      },",
    "      body: JSON.stringify({",
    "        systemPrompt: SYSTEM_PROMPT,",
    "        input: 'URLメモ（本文取得には使わない）:\\n' + sourceUrl + '\\n\\n本文・元情報:\\n' + input + '\\n\\n補足条件:\\n' + extra,",
    "      }),",
    "    });",
    "    if (!response.ok) {",
    "      const errorData = await response.json().catch(() => ({}));",
    "      throw new Error(errorData.error || 'API通信に失敗しました。');",
    "    }",
    "    const data = await response.json();",
    `    resultBox.textContent = data.text || ${JSON.stringify(toolLabels.empty)};`,
    `    statusText.textContent = ${JSON.stringify(toolLabels.complete)};`,
    "  } catch (error) {",
    `    statusText.textContent = ${JSON.stringify(toolLabels.error)} + error.message;`,
    "  }",
    "}",
  ].join("\n");

  return {
    readme,
    setup,
    apiKeys,
    mainPrompt: prompt,
    nodes: workflowLines,
    sampleOutput,
    indexHtml,
    styleCss,
    scriptJs,
  };
}

function buildRunnablePrompt() {
  const proposal = getSelectedProposal();
  const summary = getSummary();
  return [
    `あなたは「${proposal.title}」として動作します。`,
    summary.purpose,
    `想定ユーザー: ${summary.user}`,
    `入力: ${summary.inputs}`,
    `出力: ${summary.result}`,
    "必ず初心者にも分かる日本語で、見出しを付けて整理してください。",
    "入力が不足している場合は、足りない情報を先に示してください。",
    "URLが入力されていても、そのURL本文を読みに行ってはいけません。",
    "URLは出典メモとして扱い、処理対象は貼り付けられた本文・元情報だけにしてください。",
    "外部データが必要な場合は、正式なAPIキー連携がある場合のみ利用してください。",
  ].join("\n");
}

function getExportText(format) {
  const blueprintText = buildBlueprintText();
  const files = buildRunnableToolFiles();
  const exportTextByFormat = {
    folder: `NENE_Tool/
  README.md
  index.html
  style.css
  script.js
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

--- README.md ---
${files.readme}

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
- setup.md
- config/api_keys.example
- prompts/main_prompt.md
- workflow/nodes.md
- output/sample_output.md
- tool_design.md

以下のファイル内容をZIPに入れると、ブラウザで開いて使えるツールになります。

--- README.md ---
${files.readme}

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
この形式はサーバー側のOPENAI_API_KEYが設定されていないと実行できません。
外部データを使う場合は、URL読み取りではなくサーバー側の正式な外部APIキー連携が必要です。

1. index.html をブラウザで開く
2. NENE Studioにログインする
3. 入力情報を入れる
4. 実行ボタンで投稿案・レポートなどを生成する

--- index.html ---
${files.indexHtml}

--- script.js ---
${files.scriptJs}

--- prompts/main_prompt.md ---
${files.mainPrompt}

${blueprintText}`,
    codex: `Codexに渡す指示:
以下のファイル一式を作成してください。index.html をブラウザで開くと、OpenAI APIキー入力後にそのまま使えるツールにしてください。

--- README.md ---
${files.readme}

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
以下のファイル一式を作成してください。README、セットアップ手順、APIキー例、実行画面、OpenAI API呼び出し、エラー表示、サンプル出力を含めてください。

--- README.md ---
${files.readme}

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

async function copyExport() {
  if (state.settings.paymentStatus !== "paid") {
    showAdBeforeOutput(runOutput);
    return;
  }
  runOutput();
}

async function runOutput() {
  const text = getExportText(state.exportFormat);
  const proposal = getSelectedProposal();
  state.createdOutput = {
    title: proposal.title,
    format: state.exportFormat,
    text,
  };
  try {
    if (state.exportFormat === "zip") {
      const files = buildRunnableToolFiles();
      const zipBlob = createZipBlob(getRunnableFileMap(files));
      downloadBlob(zipBlob, `${sanitizeFileName(proposal.title)}.zip`);
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      downloadGeneratedFile(text, state.exportFormat, proposal.title);
    } else {
      fallbackCopy(text);
      downloadGeneratedFile(text, state.exportFormat, proposal.title);
    }
    state.status = state.exportFormat === "zip"
      ? "ZIPファイルを作成してダウンロードしました。保存する場合はチェックして保存してください。"
      : "指定形式の作成内容を表示・コピー・ダウンロードしました。保存する場合はチェックして保存してください。";
  } catch (error) {
    fallbackCopy(text);
    downloadGeneratedFile(text, state.exportFormat, proposal.title);
    state.status = "指定形式の作成内容を表示・コピー・ダウンロードしました。保存する場合はチェックして保存してください。";
  }
  renderAll();
  activateScreen("export");
}

function showAdBeforeOutput(callback) {
  let seconds = 5;
  adOverlay.hidden = false;
  adContinue.disabled = true;
  adContinue.textContent = `あと ${seconds} 秒`;
  const timer = setInterval(() => {
    seconds -= 1;
    adContinue.textContent = seconds > 0 ? `あと ${seconds} 秒` : "出力へ進む";
    if (seconds <= 0) {
      clearInterval(timer);
      adContinue.disabled = false;
    }
  }, 1000);

  adContinue.onclick = () => {
    adOverlay.hidden = true;
    adContinue.onclick = null;
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
  const files = buildRunnableToolFiles();
  const html = buildLaunchHtml(files);
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  window.open(url, "_blank", "noopener,noreferrer");
  state.status = "作成したツールを新しいタブで起動しました。";
  renderAll();
}

function buildLaunchHtml(files) {
  const bodyMatch = files.indexHtml.match(/<body>([\s\S]*?)<\/body>/i);
  const bodyContent = bodyMatch ? bodyMatch[1].replace(/<script src="\.\/script\.js"><\/script>/, "") : "";
  return `<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>ツールプレビュー</title>
  <style>${files.styleCss}</style>
</head>
<body>
${bodyContent}
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

  Object.entries(fileMap).forEach(([path, content]) => {
    const nameBytes = encoder.encode(path);
    const dataBytes = encoder.encode(content);
    const crc = crc32(dataBytes);
    const localHeader = makeZipHeader(0x04034b50, [
      20, 0, 0, 0, 0, 0, crc, dataBytes.length, dataBytes.length, nameBytes.length, 0,
    ]);
    localParts.push(localHeader, nameBytes, dataBytes);

    const centralHeader = makeZipHeader(0x02014b50, [
      20, 20, 0, 0, 0, 0, crc, dataBytes.length, dataBytes.length, nameBytes.length, 0, 0, 0, 0, 0, offset,
    ]);
    centralParts.push(centralHeader, nameBytes);
    offset += localHeader.length + nameBytes.length + dataBytes.length;
  });

  const centralSize = centralParts.reduce((sum, part) => sum + part.length, 0);
  const centralOffset = offset;
  const fileCount = Object.keys(fileMap).length;
  const endHeader = makeZipHeader(0x06054b50, [
    0, 0, fileCount, fileCount, centralSize, centralOffset, 0,
  ]);

  return new Blob([...localParts, ...centralParts, endHeader], { type: "application/zip" });
}

function makeZipHeader(signature, values) {
  const localFieldCounts = {
    0x04034b50: [2, 2, 2, 2, 2, 2, 4, 4, 4, 2, 2],
    0x02014b50: [2, 2, 2, 2, 2, 2, 4, 4, 4, 2, 2, 2, 2, 2, 4, 4],
    0x06054b50: [2, 2, 2, 2, 4, 4, 2],
  }[signature];
  const size = 4 + localFieldCounts.reduce((sum, bytes) => sum + bytes, 0);
  const buffer = new ArrayBuffer(size);
  const view = new DataView(buffer);
  let pointer = 0;
  view.setUint32(pointer, signature, true);
  pointer += 4;
  values.forEach((value, index) => {
    const bytes = localFieldCounts[index];
    if (bytes === 2) {
      view.setUint16(pointer, value, true);
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
      createdOutput: state.createdOutput ? { ...state.createdOutput } : null,
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
note: このAIエージェント案は保存済みツールを参考にした試作品用の作成内容です。`;
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
  assistStatus.textContent = state.status || "カテゴリや入力欄を変更すると、ツール作成内容に反映されます。";
  settingsStatus.textContent = state.currentScreen === "settings" ? state.status : "";
  agentStatus.textContent = state.currentScreen === "agent" ? state.status : "";
  if (authStatus) {
    authStatus.textContent = state.auth.user
      ? `ログイン中：${state.auth.user.email} / 課金状態：${state.settings.paymentStatus === "paid" ? "広告なし" : "無料"}`
      : "ログインしていません。";
  }
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
  navigator.serviceWorker.register("./sw.js").catch(() => {
    state.status = "PWAのオフライン登録に失敗しました。サーバー起動後に再読み込みしてください。";
    renderAll();
  });
}
