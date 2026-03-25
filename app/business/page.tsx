import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI終活サポート ビジネスプラン｜介護施設・ケアマネ・FP向け法人プラン ¥9,800/月",
  description: "介護施設・ケアマネージャー・ファイナンシャルプランナー向けの法人プラン。複数スタッフでAI終活サポートを利用。エンディングノート支援・相続対策アドバイスを効率化。",
};

const faqs = [
  {
    q: "ビジネスプランは何人まで利用できますか？",
    a: "¥9,800/月のビジネスプランは5名まで、¥19,800/月の法人プランは20名までご利用いただけます。大規模施設はお問い合わせください。",
  },
  {
    q: "どのような事業者が利用していますか？",
    a: "介護施設・有料老人ホーム・ケアマネージャー事務所・ファイナンシャルプランナー・司法書士・行政書士・地域包括支援センターなどの方々にご利用いただいています。",
  },
  {
    q: "クライアントの情報は安全に管理されますか？",
    a: "入力情報はAIアドバイス生成にのみ使用され、外部に保存・提供されることはありません。プライバシーポリシーに基づき厳重に管理しています。",
  },
  {
    q: "請求書・領収書は発行されますか？",
    a: "はい、法人向けに請求書・領収書を発行いたします。経費処理に対応した書類をご用意します。お問い合わせフォームよりご依頼ください。",
  },
  {
    q: "無料トライアルはありますか？",
    a: "はい、7日間の無料トライアルをご用意しています。クレジットカード登録不要でお試しいただけます。スタッフ全員でご利用ください。",
  },
];

export default function BusinessPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900">
      <nav className="backdrop-blur-sm bg-white/5 border-b border-white/10 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" aria-label="AI終活サポートのトップページへ戻る" className="font-bold text-white flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-green-600" aria-hidden="true">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
            </svg>
            AI終活サポート
          </Link>
          <span className="text-xs text-gray-400">法人・専門家向けプラン</span>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-400/30 rounded-full px-4 py-1.5 text-sm text-green-300 mb-6">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-green-400" aria-hidden="true"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            介護施設・FP・ケアマネ向け法人プラン
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight">
            終活支援の現場をAIで<br className="hidden md:block" />効率化する法人プラン
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            エンディングノート作成支援・相続アドバイス・デジタル遺品整理の説明をAIが代行。スタッフの対応品質を均一化し、利用者満足度を向上させます。
          </p>
        </div>

        {/* 課題セクション */}
        <section className="mb-16" aria-labelledby="problems-heading">
          <h2 id="problems-heading" className="text-xl font-bold text-white mb-8 text-center">こんな課題を抱えていませんか？</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: "⏱",
                title: "終活相談に時間がかかる",
                desc: "エンディングノートの書き方説明・相続の基礎知識説明に1件あたり1〜2時間かかり、スタッフの負担が大きい",
              },
              {
                icon: "📋",
                title: "対応品質にばらつきがある",
                desc: "担当者によって説明内容や深さが異なり、利用者から「前の担当の方の方が詳しかった」という声が出る",
              },
              {
                icon: "📚",
                title: "知識アップデートが追いつかない",
                desc: "相続法改正・成年後見制度の変更など、制度の更新に全スタッフが対応するための教育コストが高い",
              },
            ].map((item) => (
              <div key={item.title} className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-5">
                <div className="text-2xl mb-3" aria-hidden="true">{item.icon}</div>
                <h3 className="font-bold text-white text-sm mb-2">{item.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 料金プラン */}
        <section className="mb-16" aria-labelledby="pricing-heading">
          <h2 id="pricing-heading" className="text-xl font-bold text-white mb-8 text-center">料金プラン</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "個人プラン",
                price: "¥980",
                unit: "/月",
                users: "1名",
                features: ["月30回のAI相談", "全機能アクセス", "印刷機能付き"],
                cta: "個人で始める",
                href: "/tool",
                highlight: false,
              },
              {
                name: "ビジネスプラン",
                price: "¥9,800",
                unit: "/月",
                users: "5名まで",
                features: ["無制限のAI相談", "スタッフ5名まで", "請求書発行対応", "優先サポート"],
                cta: "7日間無料で試す",
                href: "/tool",
                highlight: true,
              },
              {
                name: "法人プラン",
                price: "¥19,800",
                unit: "/月",
                users: "20名まで",
                features: ["無制限のAI相談", "スタッフ20名まで", "請求書発行対応", "専用サポート窓口", "導入研修（オンライン）"],
                cta: "お問い合わせ",
                href: "mailto:support@shukatsu-ai.vercel.app",
                highlight: false,
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-6 flex flex-col ${plan.highlight ? "bg-green-600/20 border-2 border-green-500" : "backdrop-blur-sm bg-white/5 border border-white/10"}`}
              >
                {plan.highlight && (
                  <div className="text-xs font-bold text-green-400 bg-green-400/20 rounded-full px-3 py-1 mb-3 text-center w-fit mx-auto">
                    おすすめ
                  </div>
                )}
                <h3 className="font-bold text-white text-lg mb-1">{plan.name}</h3>
                <div className="mb-1">
                  <span className="text-3xl font-black text-white">{plan.price}</span>
                  <span className="text-sm text-gray-400">{plan.unit}（税込）</span>
                </div>
                <p className="text-xs text-gray-400 mb-4">{plan.users}</p>
                <ul className="space-y-2 mb-6 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-green-400 flex-shrink-0 mt-0.5" aria-hidden="true"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={plan.href}
                  aria-label={`${plan.name}を${plan.cta}`}
                  className={`block text-center font-bold py-3 rounded-xl text-sm transition-colors ${plan.highlight ? "bg-green-600 text-white hover:bg-green-700" : "bg-white/10 text-gray-200 hover:bg-white/20"}`}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-xl font-bold text-white mb-8 text-center">よくある質問</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-5">
                <h3 className="font-bold text-white text-sm mb-2">Q. {faq.q}</h3>
                <p className="text-sm text-gray-300 leading-relaxed">A. {faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="text-center backdrop-blur-sm bg-green-600/10 border border-green-500/30 rounded-2xl p-10">
          <h2 className="text-2xl font-black text-white mb-4">まずは7日間、無料でお試しください</h2>
          <p className="text-gray-300 mb-8">クレジットカード不要。導入のご相談もお気軽にどうぞ。</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tool"
              aria-label="AI終活サポートのビジネスプランを無料で試す"
              className="inline-block bg-green-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-green-700 transition-colors text-sm"
            >
              無料トライアルを始める
            </Link>
            <a
              href="mailto:support@shukatsu-ai.vercel.app"
              aria-label="AI終活サポートの法人プランについてお問い合わせする"
              className="inline-block bg-white/10 text-gray-200 font-bold px-8 py-4 rounded-xl hover:bg-white/20 transition-colors text-sm"
            >
              法人プランについて問い合わせる
            </a>
          </div>
        </div>
      </div>

      <footer className="text-center py-6 text-xs text-gray-400 border-t border-white/10 space-x-4">
        <Link href="/legal" aria-label="特定商取引法に基づく表記を確認する" className="hover:text-gray-300">特定商取引法に基づく表記</Link>
        <Link href="/privacy" aria-label="プライバシーポリシーを確認する" className="hover:text-gray-300">プライバシーポリシー</Link>
        <Link href="/" aria-label="AI終活サポートのトップページへ" className="hover:text-gray-300">トップページ</Link>
      </footer>
    </main>
  );
}
