"use client";

import Link from "next/link";
import { useState } from "react";

const PURPOSES = [
  "学生への就活サポートに活用したい",
  "面接練習・ES添削の効率化",
  "キャリアカウンセリングの補助",
  "複数学生への一括サポート",
  "その他",
];

function DemoForm() {
  const [form, setForm] = useState({ company: "", name: "", email: "", phone: "", purpose: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent("就活AI 法人プラン お問い合わせ");
    const body = encodeURIComponent(
      `会社名/機関名: ${form.company}\n担当者名: ${form.name}\nメール: ${form.email}\n電話番号: ${form.phone}\nご利用目的: ${form.purpose}`
    );
    window.open(`mailto:support@pokkorilab.com?subject=${subject}&body=${body}`, "_blank");
    setSubmitted(true);
  }

  return (
    <section className="py-16 bg-[#0B1120]">
      <div className="max-w-2xl mx-auto px-6">
        <div className="text-center mb-8">
          <div className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3 bg-blue-500/20 text-blue-300 border border-blue-400/30">
            法人・機関限定
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">無料デモ・お問い合わせ</h2>
          <p className="text-sm text-gray-400">3営業日以内にご連絡いたします</p>
        </div>
        {submitted ? (
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center">
            <svg viewBox="0 0 24 24" className="w-12 h-12 fill-green-400 mx-auto mb-3" aria-hidden="true"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
            <p className="font-bold text-white mb-2">メールアプリが開きました</p>
            <p className="text-sm text-gray-400">送信後、3営業日以内にご連絡いたします。<br />メールが開かない場合は <span className="font-medium text-gray-300">support@pokkorilab.com</span> まで直接ご連絡ください。</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">会社名・機関名 <span className="text-red-400">*</span></label>
                <input required value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} placeholder="株式会社○○ / ○○大学" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-400" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">担当者名 <span className="text-red-400">*</span></label>
                <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="山田 太郎" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-400" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">メールアドレス <span className="text-red-400">*</span></label>
                <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="info@example.com" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-400" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">電話番号</label>
                <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="03-0000-0000" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-400" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">ご利用目的</label>
              <select value={form.purpose} onChange={e => setForm(f => ({ ...f, purpose: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-400">
                <option value="" className="bg-gray-900">選択してください</option>
                {PURPOSES.map(p => <option key={p} value={p} className="bg-gray-900">{p}</option>)}
              </select>
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-sm transition-colors min-h-[44px]">
              無料デモを申し込む →
            </button>
            <p className="text-xs text-gray-500 text-center">送信するとメールアプリが開きます。3営業日以内にご連絡します。</p>
          </form>
        )}
      </div>
    </section>
  );
}

const PROBLEMS = [
  { title: "就活相談・ES添削に担当者の時間が取られすぎる", desc: "学生1人あたりのES添削に30〜60分かかる作業をAIが代行。担当者は重要な面談に集中できます。" },
  { title: "学生数に対してキャリアアドバイザーが不足している", desc: "AIが24時間365日対応。面接練習・企業研究・ES添削を学生が自分のペースで進められます。" },
  { title: "学生によって就活サポートの質がバラバラ", desc: "AIが均一品質でサポート。担当者の経験・知識に依存せず、全学生に高品質な就活支援を提供します。" },
  { title: "業界研究・企業研究の情報収集に時間がかかる", desc: "AIが企業分析・業界動向を即座に提供。学生が自分で深く調べられる力を育成します。" },
];

const USECASES = [
  {
    title: "人材紹介会社・就職支援機関",
    problem: "求職者へのES添削・面接対策に1件あたり多大な時間を要していた。",
    solution: "AIが初稿ES添削・模擬面接練習を担当。アドバイザーは最終チェックと精神的サポートに専念。",
    result: "1人あたりサポート時間を60%削減",
  },
  {
    title: "大学キャリアセンター",
    problem: "就職活動シーズンに相談が集中し、学生の待ち時間が長くなっていた。",
    solution: "AIが24時間いつでもES添削・面接練習に対応。繁忙期のキャリアセンタースタッフの負担を軽減。",
    result: "相談待ち時間を3日から即日対応に短縮",
  },
  {
    title: "専門学校・高等教育機関",
    problem: "就職指導の経験が浅い教員が多く、業界別の面接対策に限界があった。",
    solution: "AIが業種・職種別の面接対策を提供。教員は学生のモチベーション管理とフォローアップに注力。",
    result: "内定率が前年比15%向上",
  },
];

const PLANS = [
  {
    name: "スタンダード",
    price: "¥9,800",
    per: "/月",
    target: "人材紹介会社・就職支援機関（50名まで）",
    features: [
      "学生50名まで利用可能",
      "ES添削・面接練習（無制限）",
      "企業研究・業界分析AI",
      "進捗管理ダッシュボード",
      "請求書払い対応",
    ],
    cta: "お問い合わせ",
    highlight: false,
  },
  {
    name: "ビジネス",
    price: "¥29,800",
    per: "/月",
    target: "大学・大規模機関（200名まで）",
    features: [
      "学生200名まで利用可能",
      "ES添削・面接練習（無制限）",
      "企業研究・業界分析AI",
      "管理者ダッシュボード",
      "CSVデータエクスポート",
      "専任サポート担当",
      "請求書払い対応",
    ],
    cta: "お問い合わせ",
    highlight: true,
  },
  {
    name: "エンタープライズ",
    price: "要相談",
    per: "",
    target: "大学法人・大手機関（200名超）",
    features: [
      "利用人数無制限",
      "カスタム機能開発対応",
      "SSO・LMS連携",
      "専任サポート＆研修",
      "SLA保証",
      "請求書払い対応",
    ],
    cta: "お問い合わせ",
    highlight: false,
  },
];

const FAQ_ITEMS = [
  {
    q: "学生が使いやすい設計になっていますか？",
    a: "はい。スマートフォンからも利用でき、登録不要でAI就活サポートを始められます。UI/UXは学生目線で設計されており、初めて使う方でも直感的に操作できます。",
  },
  {
    q: "ES添削の品質はどの程度ですか？",
    a: "大手企業の採用担当者視点で改善点を指摘し、業界・職種別の訴求ポイントを提案します。「なぜこの会社か」「あなたの強みは何か」といった本質的な設問への回答改善に強みがあります。",
  },
  {
    q: "面接練習はどのような形式ですか？",
    a: "テキスト形式で模擬面接を行います。一般的な質問から業界特化の深掘り質問まで対応。回答後にAIがフィードバックを返し、改善点と模範回答例を提示します。",
  },
  {
    q: "学生の個人情報は安全に管理されますか？",
    a: "入力情報はAI回答生成にのみ使用します。個人情報を外部に提供・販売することは一切ありません。プライバシーポリシーに基づき厳格に管理しています。",
  },
  {
    q: "請求書・領収書は発行されますか？",
    a: "はい。法人向けに請求書・領収書を発行します。経費処理に対応した書類をご用意します。お問い合わせフォームよりご依頼ください。",
  },
  {
    q: "解約はいつでもできますか？",
    a: "はい、いつでも解約可能です。解約後は次回更新日まで引き続きご利用いただけます。違約金・解約手数料は一切かかりません。",
  },
];

export default function BusinessPage() {
  return (
    <main className="min-h-screen bg-[#0B1120]">
      <nav className="border-b border-white/10 px-6 py-4 sticky top-0 bg-[#0B1120]/95 backdrop-blur z-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="font-bold text-white">
            就活AI <span className="text-blue-400 text-sm font-medium ml-2">法人・機関向け</span>
          </span>
          <div className="flex gap-3">
            <Link href="/" className="text-sm text-gray-400 hover:text-gray-200">個人向けはこちら</Link>
            <Link href="/tool" className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 min-h-[44px] flex items-center">
              無料で試す
            </Link>
          </div>
        </div>
      </nav>

      {/* ヒーロー */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="inline-block bg-blue-500/20 text-blue-300 text-xs font-semibold px-3 py-1 rounded-full mb-6 border border-blue-400/30">
          人材紹介会社・就職支援機関・大学キャリアセンター向け法人プラン
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
          就活サポートの現場を<br /><span className="text-blue-400">AIで10倍効率化する</span>
        </h1>
        <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
          ES添削・面接練習・企業研究をAIが代行。<br />キャリアアドバイザーは本当に必要な対話に集中できます。
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="mailto:support@pokkorilab.com?subject=就活AI法人プランについて"
            className="inline-block bg-blue-600 text-white font-bold text-lg px-8 py-4 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-900/50 min-h-[56px] flex items-center justify-center"
          >
            法人プランを問い合わせる →
          </a>
          <Link
            href="/tool"
            className="inline-block bg-white/10 text-gray-200 font-bold text-lg px-8 py-4 rounded-xl hover:bg-white/20 border border-white/10 min-h-[56px] flex items-center justify-center"
          >
            まず無料で試す
          </Link>
        </div>
        <p className="text-xs text-gray-500 mt-4">解約はいつでも可能 | 請求書払い対応</p>
      </section>

      {/* スタッツ */}
      <section className="bg-blue-600/10 border-y border-blue-500/20 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {[
              { num: "60%", label: "サポート時間の削減", sub: "ES添削・面接対策の工数削減" },
              { num: "24時間", label: "AIが対応できる時間", sub: "夜間・土日も学生をサポート" },
              { num: "3分", label: "ES添削の所要時間", sub: "従来30〜60分の作業をAIが代行" },
            ].map(stat => (
              <div key={stat.num} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
                <div className="text-4xl font-bold text-blue-400 mb-1">{stat.num}</div>
                <div className="text-sm font-medium text-white">{stat.label}</div>
                <div className="text-xs text-gray-400 mt-1">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 課題 */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center text-white mb-10">こんな課題を解決します</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {PROBLEMS.map(p => (
              <div key={p.title} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-5">
                <p className="font-semibold text-white mb-2 flex items-start gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="shrink-0 mt-0.5 text-red-400" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>{p.title}
                </p>
                <p className="text-sm text-gray-400 flex items-start gap-2">
                  <span className="text-green-400 shrink-0 mt-0.5">→</span>{p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ユースケース */}
      <section className="py-16 bg-white/5">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center text-white mb-10">導入事例</h2>
          <div className="space-y-5">
            {USECASES.map(u => (
              <div key={u.title} className="bg-[#0B1120] rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-bold text-white mb-4">{u.title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs font-semibold text-red-400 mb-1">課題</p>
                    <p className="text-sm text-gray-400">{u.problem}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-blue-400 mb-1">解決策</p>
                    <p className="text-sm text-gray-400">{u.solution}</p>
                  </div>
                  <div className="bg-green-500/10 rounded-lg p-3 border border-green-500/20">
                    <p className="text-xs font-semibold text-green-400 mb-1">導入効果</p>
                    <p className="text-sm font-bold text-green-400">{u.result}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 料金 */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center text-white mb-3">法人向け料金プラン</h2>
          <p className="text-center text-gray-400 text-sm mb-10">すべてのプランで請求書払い対応。初期費用ゼロ。</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PLANS.map(plan => (
              <div
                key={plan.name}
                className={`rounded-2xl p-6 flex flex-col relative ${plan.highlight ? "bg-blue-600/20 border-2 border-blue-500" : "bg-white/5 backdrop-blur-xl border border-white/10"}`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs bg-blue-600 text-white px-3 py-0.5 rounded-full whitespace-nowrap">
                    最も人気
                  </div>
                )}
                <p className="text-xs text-gray-400 mb-1">{plan.target}</p>
                <p className="font-bold text-white text-lg mb-1">{plan.name}</p>
                <p className="text-3xl font-bold text-blue-400 mb-5">
                  {plan.price}<span className="text-sm font-normal text-gray-400">{plan.per}</span>
                </p>
                <ul className="space-y-2 mb-6 flex-1">
                  {plan.features.map(f => (
                    <li key={f} className="text-sm text-gray-300 flex items-start gap-2">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-blue-400 flex-shrink-0 mt-0.5" aria-hidden="true"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="mailto:support@pokkorilab.com?subject=就活AI法人プランについて"
                  className={`block w-full text-center text-sm font-bold py-3 rounded-xl min-h-[44px] ${plan.highlight ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-white/10 text-gray-200 hover:bg-white/20"}`}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-500 mt-4">解約はいつでも可能 | 年間契約割引あり（20%OFF）</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-6">
        <div className="max-w-2xl mx-auto bg-blue-600/20 border border-blue-500/30 rounded-2xl p-8 text-center">
          <p className="text-sm font-semibold text-blue-300 mb-2">まずは実際の品質を体感してください</p>
          <h2 className="text-2xl font-bold text-white mb-4">就活AIの法人導入で<br />キャリアサポートを次のレベルへ</h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="mailto:support@pokkorilab.com?subject=就活AI法人プランについて"
              className="inline-block bg-blue-600 text-white font-bold text-lg px-8 py-4 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-900/50 min-h-[56px] flex items-center justify-center"
            >
              法人プランを問い合わせる →
            </a>
            <Link
              href="/tool"
              className="inline-block bg-white/10 text-gray-200 font-bold text-lg px-8 py-4 rounded-xl hover:bg-white/20 border border-white/10 min-h-[56px] flex items-center justify-center"
            >
              まず無料で試す
            </Link>
          </div>
          <p className="text-gray-400 text-xs mt-3">初期費用ゼロ | 解約はいつでも可能</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white/5">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center text-white mb-10">よくある質問</h2>
          <div className="space-y-4">
            {FAQ_ITEMS.map((faq, i) => (
              <div key={i} className="bg-[#0B1120] rounded-xl p-5 border border-white/10">
                <p className="font-semibold text-white mb-2 text-sm">Q. {faq.q}</p>
                <p className="text-sm text-gray-400">A. {faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* デモ申込フォーム */}
      <DemoForm />

      {/* 最終CTA */}
      <section className="bg-blue-600 py-16 text-center px-6">
        <h2 className="text-2xl font-bold text-white mb-3">就活サポートのコストと工数を、今月から削減する</h2>
        <p className="text-blue-100 text-sm mb-8">初期費用ゼロ。解約はいつでも可能。リスクなくお試しいただけます。</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="mailto:support@pokkorilab.com?subject=就活AI法人プランについて"
            className="inline-block bg-white text-blue-600 font-bold text-lg px-8 py-4 rounded-xl hover:bg-blue-50 shadow-lg min-h-[56px] flex items-center justify-center"
          >
            法人プランを問い合わせる →
          </a>
          <Link
            href="/tool"
            className="inline-block bg-blue-500 text-white font-bold text-lg px-8 py-4 rounded-xl hover:bg-blue-400 min-h-[56px] flex items-center justify-center"
          >
            まず無料で試す
          </Link>
        </div>
      </section>

      <footer className="border-t border-white/10 py-6 text-center text-xs text-gray-500 space-x-4">
        <Link href="/legal" className="hover:text-gray-300">特定商取引法に基づく表記</Link>
        <Link href="/privacy" className="hover:text-gray-300">プライバシーポリシー</Link>
        <Link href="/" className="hover:text-gray-300">トップページ</Link>
      </footer>
    </main>
  );
}
