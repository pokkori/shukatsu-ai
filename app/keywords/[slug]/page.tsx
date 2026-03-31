import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CrossSell } from "@/components/CrossSell";

interface KeywordData {
  title: string;
  h1: string;
  description: string;
  features: { icon: string; title: string; text: string }[];
  faqs: { q: string; a: string }[];
  lastUpdated: string;
}

export const KEYWORDS: Record<string, KeywordData> = {
  "jikopr-kakikata-es": {
    title: "自己PR 書き方 ES｜就活でAIが30秒で例文を自動生成",
    h1: "自己PR 書き方 ES",
    description: "エントリーシートの自己PRをAIが30秒で自動生成。強み・エピソード・企業への貢献を盛り込んだ例文を即作成。登録不要・無料3回。",
    features: [
      { icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z", title: "ES特化の文体", text: "人事担当者が評価するES特有の文体・構成で自己PRを自動生成。抽象的な強みを具体的なエピソードと結びつけます。" },
      { icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5h4v5m-4 0h4", title: "業界別にカスタマイズ", text: "IT・金融・商社・メーカーなど業界ごとに求められる資質を反映した自己PRを生成します。" },
      { icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", title: "字数自動調整", text: "200字・400字・600字など指定字数にぴったり収まる自己PRを生成。ESの字数制限に即対応。" },
    ],
    faqs: [
      { q: "自己PRで必ず書くべき要素は何ですか？", a: "「強み・スキル」「それを証明するエピソード（STAR法）」「企業への貢献イメージ」の3要素が必須です。就活AIが自動的にこの3要素を組み込んだ自己PRを生成します。" },
      { q: "自己PRとガクチカの違いは何ですか？", a: "自己PRは強み・スキル全般をアピールし、ガクチカは学生時代に力を入れた経験に特化しています。就活AIでは両方の例文を別々に生成できます。" },
      { q: "無料で何回使えますか？", a: "登録不要・クレジットカード不要で3回まで無料でご利用いただけます。それ以降はプレミアムプランをご利用ください。" },
    ],
    lastUpdated: "2026-03-31",
  },
  "gakuchika-episode-nai": {
    title: "ガクチカ エピソード ない｜アルバイト・日常からAIが魅力的な例文を生成",
    h1: "ガクチカ エピソード ない",
    description: "「ガクチカのエピソードがない」悩みをAIが解決。アルバイト・趣味・日常の行動からガクチカ例文を30秒で自動生成。登録不要。",
    features: [
      { icon: "M13 10V3L4 14h7v7l9-11h-7z", title: "平凡な経験を言語化", text: "アルバイト・サークル・趣味など、誰でもある経験からガクチカを構築。平凡に見える行動を魅力的なエピソードに変換します。" },
      { icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2", title: "STAR法で構成", text: "状況(Situation)・課題(Task)・行動(Action)・結果(Result)のSTAR法に基づいた論理的なガクチカ構成を自動生成。" },
      { icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z", title: "数値・実績を補完", text: "具体的な数値がない場合でも、行動の質・プロセスを強調する表現でガクチカを説得力あるものに仕上げます。" },
    ],
    faqs: [
      { q: "ガクチカに使える経験が何もない場合はどうすればいいですか？", a: "アルバイト・授業・趣味・日常の習慣なども立派なガクチカになります。就活AIに「経験の種類」と「学んだこと」を入力するだけで、人事が評価するガクチカ例文を生成します。" },
      { q: "ガクチカで短期アルバイトしかない場合は？", a: "短期・単発アルバイトでも問題ありません。業務への取り組み姿勢・工夫・改善点を具体的に書くことで十分なガクチカになります。AIが最適な表現を提案します。" },
      { q: "ガクチカの適切な字数は？", a: "ES・面接ともに200〜400字が一般的です。就活AIでは字数を指定して例文を生成できます。" },
    ],
    lastUpdated: "2026-03-31",
  },
  "es-shibou-riyu-kakikata": {
    title: "ES 志望動機 書き方｜業界・企業別にAIが30秒で自動生成",
    h1: "ES 志望動機 書き方",
    description: "エントリーシートの志望動機をAIが業界・企業別に30秒で自動生成。「なぜこの企業か」を説得力ある文章で即作成。登録不要・無料3回。",
    features: [
      { icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", title: "企業研究を反映", text: "企業名・業界・事業内容を入力するだけで、その企業に特化した志望動機を自動生成。「なぜこの企業か」が明確な文章になります。" },
      { icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z", title: "自己分析と接続", text: "自身の強み・経験・価値観と企業の求める人物像を結びつけた志望動機を構築します。" },
      { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", title: "使い回し防止", text: "複数企業に使いまわせない「本気度が伝わる」志望動機例文を生成。選考通過率を高めます。" },
    ],
    faqs: [
      { q: "志望動機で「御社の成長性に魅力を感じ」は使ってもいいですか？", a: "この表現は多くの就活生が使うため差別化できません。就活AIでは企業の具体的な事業・文化・社会課題への貢献を盛り込んだオリジナルの志望動機を生成します。" },
      { q: "志望動機に自己PRを入れるべきですか？", a: "志望動機は「なぜこの企業か」に焦点を当て、自己PRは別の設問で書くのが原則です。就活AIが両者を適切に分けた例文を生成します。" },
      { q: "業界を絞っていない場合はどうすればいいですか？", a: "業界・企業名を入力するだけでその企業向けの志望動機を生成します。複数業界の志望動機を比較検討するのにも活用できます。" },
    ],
    lastUpdated: "2026-03-31",
  },
  "mensetsu-gyaku-shitsumon-rei": {
    title: "面接 逆質問 例｜印象に残る質問をAIが業界別に自動生成",
    h1: "面接 逆質問 例",
    description: "面接の逆質問をAIが業界・企業別に自動生成。「特にありません」はNG。印象に残る質問例を30秒で作成。登録不要・無料3回。",
    features: [
      { icon: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z", title: "業界別に最適化", text: "IT・金融・メーカー・コンサルなど業界特性に合わせた逆質問を生成。企業研究の深さをアピールできます。" },
      { icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01", title: "NGワードを排除", text: "「給与・福利厚生は？」「残業はどのくらい？」などの印象を下げる逆質問を排除し、前向きな質問を提案。" },
      { icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z", title: "面接官のタイプ別", text: "人事担当者・現場社員・役員など面接官のタイプに合わせた逆質問を生成します。" },
    ],
    faqs: [
      { q: "逆質問で「特にありません」と答えても大丈夫ですか？", a: "逆質問は企業への関心度・積極性を示す重要な機会です。「特にありません」はマイナス評価につながることがあります。就活AIで必ず2〜3個の逆質問を準備しましょう。" },
      { q: "逆質問は何個準備すればいいですか？", a: "2〜3個が理想です。面接の流れで1つは聞けない可能性もあるため、3個程度準備しておくと安心です。就活AIで複数の逆質問を一度に生成できます。" },
      { q: "選考を通じて同じ逆質問をしてもいいですか？", a: "最終面接に近づくにつれ、より深い・具体的な逆質問が求められます。就活AIで面接段階（一次・二次・最終）に合わせた逆質問を生成できます。" },
    ],
    lastUpdated: "2026-03-31",
  },
  "shukatsu-jikoshoukai-30byo": {
    title: "就活 自己紹介 30秒｜面接で使えるテンプレートをAIが自動生成",
    h1: "就活 自己紹介 30秒",
    description: "面接冒頭の30秒自己紹介をAIが自動生成。大学名・専攻・強みを盛り込んだテンプレートを30秒で作成。登録不要・無料3回。",
    features: [
      { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", title: "30秒・60秒に対応", text: "「30秒で自己紹介してください」「1分間自己紹介を」両方に対応した原稿を生成。字数・時間を選択するだけ。" },
      { icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z", title: "面接の第一印象を左右", text: "人事担当者が最初に聞く自己紹介は第一印象を決めます。AIが「聞きやすく・覚えてもらえる」自己紹介を作成。" },
      { icon: "M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2", title: "業界別フレーズ", text: "IT・金融・メーカーなど志望業界に合わせた適切なフレーズ・表現を自動選択します。" },
    ],
    faqs: [
      { q: "就活の自己紹介で必ず言うべきことは何ですか？", a: "「大学名・学部・氏名」「専攻・研究内容」「強みや特技（1つ）」「本日よろしくお願いします」が基本構成です。就活AIが自然な流れで組み合わせた30秒原稿を生成します。" },
      { q: "自己紹介で強みを言うのはやりすぎですか？", a: "1つだけ簡潔に触れるのは適切です。自己PRとの差別化のため、詳細は自己PRの設問で話しましょう。就活AIが適切な情報量の自己紹介を生成します。" },
      { q: "オンライン面接と対面で自己紹介の内容は変えるべきですか？", a: "内容は同じで問題ありませんが、オンラインは声の抑揚・話すペースを意識することが重要です。就活AIで基本原稿を作成し、練習に活用してください。" },
    ],
    lastUpdated: "2026-03-31",
  },
  "es-tokugi-shumi-kakikata": {
    title: "ES 特技 趣味 書き方｜AIが志望企業に合わせて自動生成",
    h1: "ES 特技 趣味 書き方",
    description: "ESの特技・趣味欄をAIが志望企業に合わせて自動生成。「読書・映画鑑賞」でもアピールになる書き方を30秒で作成。登録不要。",
    features: [
      { icon: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z", title: "平凡な趣味も差別化", text: "「読書・映画・料理」などありきたりな趣味でも、具体性・継続性・学びを加えることで差別化。AIが最適な表現を提案します。" },
      { icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253", title: "企業の社風に合わせる", text: "「体育会系か文化系か」「チームワーク重視か個人力か」など企業の社風に合った趣味・特技の表現を選びます。" },
      { icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", title: "継続年数・実績を強調", text: "「3年継続」「大会入賞」など実績・継続性を盛り込み、粘り強さ・本気度を伝えます。" },
    ],
    faqs: [
      { q: "ESの趣味欄に「読書」と書くのはNG？", a: "読書自体はNGではありませんが「読書（年間50冊）」「ビジネス書中心に月4〜5冊読書」のように具体性を加えることが重要です。就活AIが具体的な表現に変換します。" },
      { q: "特技欄に書けることが何もない場合はどうすればいいですか？", a: "「英検2級」「TOEIC 700点」「簿記3級」などの資格も特技として書けます。また、「早起き（3年間6時起き継続）」など習慣も特技になります。就活AIで最適な表現を生成します。" },
      { q: "特技と趣味は別々に書いた方がいいですか？", a: "ESの設問により異なりますが、特技は「他の人より得意なこと」、趣味は「余暇に楽しんでいること」と分けると説得力が増します。就活AIで両方の例文を生成できます。" },
    ],
    lastUpdated: "2026-03-31",
  },
  "shukatsu-tsuyomi-yowami": {
    title: "就活 強み 弱み 例文｜AIが業界別・職種別に自動生成",
    h1: "就活 強み 弱み 例文",
    description: "就活で必出の「強みと弱み」例文をAIが業界・職種別に30秒で自動生成。弱みを成長意欲に転換する表現も提案。登録不要・無料3回。",
    features: [
      { icon: "M13 10V3L4 14h7v7l9-11h-7z", title: "弱みを強みに変換", text: "「心配性・完璧主義・慎重すぎる」などの弱みを「丁寧さ・品質重視・リスク管理力」にポジティブ変換する表現を生成。" },
      { icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z", title: "職種別に最適化", text: "営業・エンジニア・企画・事務など職種別に求められる強みを反映した例文を生成します。" },
      { icon: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z", title: "NGパターンを排除", text: "「強みは協調性です」「弱みはありません」などのNG例を排除し、具体性・説得力のある例文を生成します。" },
    ],
    faqs: [
      { q: "弱みで「飽きやすい・継続力がない」と言ってもいいですか？", a: "採用の観点でリスクに見える弱みは避けた方が無難です。「改善に取り組んでいる」エピソードを加えることが重要です。就活AIで適切な弱みの表現を提案します。" },
      { q: "強みと自己PRは内容が同じでもいいですか？", a: "同じ強みを軸にしても問題ありませんが、「強み」は端的に・「自己PR」は具体的エピソードで、と表現の深さを変えましょう。就活AIで両方に対応した例文を生成できます。" },
      { q: "強みを複数挙げてもいいですか？", a: "1〜2つに絞って深く書く方が説得力があります。強みが多すぎると焦点がぼけます。就活AIが1つの強みを軸に構成した例文を生成します。" },
    ],
    lastUpdated: "2026-03-31",
  },
  "mensetsu-stress-taisei": {
    title: "面接 ストレス耐性 答え方｜AIが30秒で例文を自動生成",
    h1: "面接 ストレス耐性 答え方",
    description: "「ストレス耐性はありますか？」という面接質問の答え方をAIが30秒で自動生成。具体的なエピソード付きの回答例を即作成。登録不要。",
    features: [
      { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", title: "エピソード付きで回答", text: "「はい、あります」だけではNG。プレッシャーを乗り越えた具体的なエピソードを含む回答例を自動生成します。" },
      { icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z", title: "ストレス解消法も提案", text: "ストレスへの対処法（運動・気分転換・相談等）を具体的に説明することで「自己管理能力」をアピール。" },
      { icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5h4v5m-4 0h4", title: "職種・業界別に最適化", text: "プレッシャーが高い金融・コンサル・営業職向けに特化した「ストレス耐性あり」回答例を生成します。" },
    ],
    faqs: [
      { q: "ストレス耐性がないと思っている場合はどう答えればいいですか？", a: "弱みと同様、「以前はストレスを感じやすかったが、○○の取り組みで改善した」と成長エピソードを加えると好印象です。就活AIが適切な表現を提案します。" },
      { q: "ストレス耐性の質問はどんな業界で多く聞かれますか？", a: "金融・コンサルティング・営業・医療・介護など、プレッシャーが高い業界で頻出です。就活AIで業界別の回答例を生成できます。" },
      { q: "ストレス耐性をアピールするエピソードがない場合は？", a: "アルバイトの繁忙期・締め切りに追われた経験・チーム内の対立解決なども有効です。就活AIに状況を入力すれば最適なエピソード構成を提案します。" },
    ],
    lastUpdated: "2026-03-31",
  },
  "shukatsu-leadership-jikopr": {
    title: "リーダーシップ 自己PR 例文｜就活でAIが自動生成",
    h1: "リーダーシップ 自己PR 例文",
    description: "就活で使えるリーダーシップ自己PRをAIが30秒で自動生成。部活・サークル・アルバイトのエピソードからリーダーシップをアピール。登録不要。",
    features: [
      { icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z", title: "役職なしでもOK", text: "部長・リーダー経験がなくても、「率先して動く姿勢」「場の雰囲気を整える力」などを軸にリーダーシップをアピール。" },
      { icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", title: "具体的数値で説得力UP", text: "「部員20名のチームを○○へ導いた」「売上を30%改善した」など数値を盛り込んだ例文で説得力を強化。" },
      { icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z", title: "企業求める人物像に合わせる", text: "「チームを牽引するリーダー」か「サポート型のリーダー」か、企業の求める人物像に合わせた表現を選択。" },
    ],
    faqs: [
      { q: "リーダーシップ自己PRで使えるエピソードはどんなものですか？", a: "部活・サークルの役員経験、アルバイトリーダー・店長補佐、ゼミ・研究室での主体的な活動、学園祭実行委員なども有効です。就活AIに経験を入力するだけで最適な構成を提案します。" },
      { q: "リーダーシップと協調性をどちらもアピールしたい場合は？", a: "「リーダーとしてメンバーの意見を引き出し合意形成する」という表現で両立できます。就活AIで両方の要素を盛り込んだ自己PRを生成します。" },
      { q: "リーダーシップをアピールしすぎると協調性がないと思われますか？", a: "「一方的に引っ張るリーダー」でなく「チームの力を最大化するリーダー」という表現で回避できます。就活AIが適切なバランスの例文を生成します。" },
    ],
    lastUpdated: "2026-03-31",
  },
  "obousha-nai-gakuchika": {
    title: "成果なし ガクチカ 書き方｜アルバイトや日常からAIが自動生成",
    h1: "成果なし ガクチカ 書き方",
    description: "「ガクチカで書けることがない・成果がない」悩みをAIが解決。日常・アルバイト・趣味から魅力的なガクチカを30秒で生成。登録不要。",
    features: [
      { icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z", title: "結果よりプロセス重視", text: "大会優勝・数値実績がなくても「取り組み方・工夫・学び」を掘り下げることで、採用担当者に刺さるガクチカを生成。" },
      { icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z", title: "アルバイトを深掘り", text: "飲食・コンビニ・塾講師など多くの学生が経験するアルバイトから、仕事への取り組み方・改善提案・顧客対応を軸にガクチカを構築。" },
      { icon: "M13 10V3L4 14h7v7l9-11h-7z", title: "あっという間に完成", text: "「経験の種類」と「そこから学んだこと」を入力するだけ。AIが30秒でガクチカを自動生成します。" },
    ],
    faqs: [
      { q: "ガクチカが本当に何もない場合、嘘をついていいですか？", a: "嘘のガクチカはNGです。面接で深掘りされるとバレます。アルバイト・授業・習慣・趣味など、必ず使えるエピソードはあります。就活AIに相談してみてください。" },
      { q: "ガクチカで「勉強頑張りました」は使えますか？", a: "「TOEIC800点取得のために毎日2時間学習し、6ヶ月で200点上げた」のように具体性があれば十分使えます。就活AIで勉強エピソードを魅力的なガクチカに変換します。" },
      { q: "複数のガクチカを使い分けてもいいですか？", a: "はい。企業・職種に合わせてガクチカを使い分けることは戦略的です。就活AIで複数のパターンを生成して比較検討できます。" },
    ],
    lastUpdated: "2026-03-31",
  },
};

const ALL_SLUGS = Object.keys(KEYWORDS);

export function generateStaticParams() {
  return ALL_SLUGS.map((slug) => ({ slug }));
}

const SITE_URL = "https://shukatsu-ai.vercel.app";

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const kw = KEYWORDS[params.slug];
  if (!kw) return {};
  return {
    title: kw.title,
    description: kw.description,
    other: { "article:modified_time": kw.lastUpdated },
    openGraph: {
      title: kw.title,
      description: kw.description,
      url: `${SITE_URL}/keywords/${params.slug}`,
      siteName: "就活AI｜自己PR・ガクチカ・志望動機をAIが自動生成",
      locale: "ja_JP",
      type: "website",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: kw.h1 }],
    },
    twitter: {
      card: "summary_large_image",
      title: kw.title,
      description: kw.description,
      images: ["/og.png"],
    },
    alternates: { canonical: `${SITE_URL}/keywords/${params.slug}` },
  };
}

function FeatureIcon({ d }: { d: string }) {
  return (
    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-blue-500/10 border border-blue-500/20 shrink-0">
      <svg className="w-6 h-6 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d={d} />
      </svg>
    </div>
  );
}

export default function KeywordPage({ params }: { params: { slug: string } }) {
  const kw = KEYWORDS[params.slug];
  if (!kw) notFound();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "dateModified": kw.lastUpdated,
    mainEntity: kw.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <main className="min-h-screen text-white" style={{ background: "radial-gradient(ellipse at 20% 50%, rgba(59,130,246,0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(99,102,241,0.12) 0%, transparent 50%), #0B0F1E" }}>
        <section className="max-w-3xl mx-auto px-4 pt-16 pb-12 text-center">
          <p className="text-blue-400 text-sm font-medium tracking-wider mb-4">就活AI｜自己PR・ガクチカ・志望動機 自動生成</p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-6 bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #BFDBFE, #FFFFFF, #C7D2FE)" }}>{kw.h1}</h1>
          <p className="text-base sm:text-lg leading-relaxed mb-8" style={{ color: "rgba(147,197,253,0.8)" }}>{kw.description}</p>
          <Link href="/tool" className="inline-flex items-center gap-2 text-white font-bold text-lg px-8 py-4 rounded-2xl hover:scale-105 transition-all duration-200" style={{ background: "linear-gradient(135deg, #3B82F6, #818CF8)", boxShadow: "0 0 30px rgba(59,130,246,0.4)" }}>
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            無料でES・自己PRを生成する
          </Link>
          <p className="text-xs mt-3" style={{ color: "rgba(147,197,253,0.5)" }}>登録不要・クレジットカード不要・無料3回</p>
        </section>

        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-xl font-bold text-center mb-8 text-white/90">特長</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {kw.features.map((f, i) => (
              <div key={i} className="rounded-2xl p-6 border border-white/10 backdrop-blur-sm" style={{ background: "rgba(255,255,255,0.03)" }}>
                <FeatureIcon d={f.icon} />
                <h3 className="font-bold mt-4 mb-2 text-white/90">{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(147,197,253,0.7)" }}>{f.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-xl font-bold text-center mb-8 text-white/90">よくある質問</h2>
          <div className="space-y-4">
            {kw.faqs.map((f, i) => (
              <details key={i} className="rounded-2xl border border-white/10 backdrop-blur-sm group" style={{ background: "rgba(255,255,255,0.03)" }}>
                <summary className="cursor-pointer px-6 py-4 font-medium text-white/90 flex items-center justify-between list-none">
                  {f.q}
                  <svg className="w-5 h-5 text-blue-400 transition-transform group-open:rotate-180 shrink-0 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <p className="px-6 pb-4 text-sm leading-relaxed" style={{ color: "rgba(147,197,253,0.7)" }}>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16 text-center">
          <div className="rounded-2xl p-8 border border-blue-500/20" style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.1), rgba(129,140,248,0.05))" }}>
            <h2 className="text-xl font-bold mb-3 text-white/90">今すぐES・自己PRを生成</h2>
            <p className="text-sm mb-6" style={{ color: "rgba(147,197,253,0.7)" }}>就活の悩みをAIが解決。自己PR・ガクチカ・志望動機を30秒で自動生成します。</p>
            <Link href="/tool" className="inline-flex items-center gap-2 text-white font-bold px-8 py-4 rounded-2xl hover:scale-105 transition-all duration-200" style={{ background: "linear-gradient(135deg, #3B82F6, #818CF8)", boxShadow: "0 0 30px rgba(59,130,246,0.4)" }}>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              無料で就活AIを使う
            </Link>
          </div>
        </section>

        <p className="text-center text-xs text-white/40 mt-8 pb-8">最終更新: 2026年3月31日</p>

        <section className="max-w-4xl mx-auto px-4 pb-16">
          <CrossSell currentService="就活AI" />
        </section>
      </main>
    </>
  );
}
