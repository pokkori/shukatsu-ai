"use client";

import Link from "next/link";
import { useState } from "react";
import { ShareButtons } from "@/components/ShareButtons";
import { AdBanner } from "@/components/AdBanner";
import { StreakBanner } from "@/components/StreakBanner";
import { UsageCounter } from "@/components/UsageCounter";
import { CrossSell } from "@/components/CrossSell";
import { TrustBadge } from "@/components/TrustBadge";
import KomojuButton from "@/components/KomojuButton";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { XShareButton } from "@/components/XShareButton";

const worries = [
  { id: "note", label: "終活ノートを作りたい", desc: "エンディングノートの書き方がわからない" },
  { id: "inherit", label: "相続のことが心配", desc: "遺産・遺言・相続税の手続きが不安" },
  { id: "money", label: "老後のお金が不安", desc: "生活費・介護費・資産管理を整理したい" },
  { id: "digital", label: "デジタル遺品を整理したい", desc: "SNS・ネット口座などのデータを残したくない" },
];

function InteractiveChecker() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section className="py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs font-medium text-green-400 text-center mb-2">3秒でわかる</p>
        <h2 className="text-2xl font-bold text-center text-white mb-2">今、一番気になっていることは？</h2>
        <p className="text-sm text-gray-400 text-center mb-8">選ぶだけでAIがお手伝いできます</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {worries.map((w) => (
            <button
              key={w.id}
              aria-label={`悩みを選択: ${w.label}`}
              aria-pressed={selected === w.id}
              onClick={() => setSelected(w.id)}
              className={`text-left rounded-2xl border-2 p-5 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 backdrop-blur-sm ${
                selected === w.id
                  ? "border-green-400 bg-white/15 shadow-md shadow-green-900/30"
                  : "border-white/10 bg-white/5 hover:border-green-400/50 hover:bg-white/10"
              }`}
            >
              <p className={`font-bold text-base mb-1 ${selected === w.id ? "text-green-300" : "text-gray-200"}`}>
                {selected === w.id && (
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-green-500 inline-block mr-1" aria-hidden="true">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                )}
                {w.label}
              </p>
              <p className="text-sm text-gray-400">{w.desc}</p>
            </button>
          ))}
        </div>
        {selected && (
          <div className="mt-8 text-center animate-fade-in backdrop-blur-sm">
            <p className="text-green-300 font-bold text-base mb-4">
              AIがその悩みをお手伝いできます
            </p>
            <Link
              href="/tool"
              aria-label="無料でAIに相談する"
              className="inline-block bg-green-600 text-white font-bold text-base px-8 py-4 rounded-xl hover:bg-green-700 shadow-lg shadow-green-200 transition-transform hover:scale-105"
            >
              無料で試す →
            </Link>
            <p className="text-xs text-gray-400 mt-3">クレジットカード不要・3回まで無料</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default function ShukatsuLP() {
  // 年額/月額トグル（デフォルト: 年額。「2ヶ月無料」のゼロ価格効果でCVR最大化）
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <main className="min-h-screen relative overflow-hidden" style={{ background: 'radial-gradient(ellipse at 20% 50%, rgba(16, 185, 129, 0.12) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(52, 211, 153, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(99, 179, 237, 0.08) 0%, transparent 50%), #0F0F1A' }}>
      {/* Floating particles */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
        {[
          { w: 3, h: 3, l: '10%', t: '20%', dur: '6s', del: '0s', op: 0.3 },
          { w: 2, h: 2, l: '25%', t: '60%', dur: '8s', del: '1s', op: 0.2 },
          { w: 4, h: 4, l: '70%', t: '15%', dur: '7s', del: '2s', op: 0.25 },
          { w: 2, h: 2, l: '85%', t: '70%', dur: '9s', del: '0.5s', op: 0.15 },
          { w: 3, h: 3, l: '50%', t: '40%', dur: '10s', del: '3s', op: 0.2 },
          { w: 2, h: 2, l: '35%', t: '85%', dur: '7s', del: '1.5s', op: 0.25 },
        ].map((p, i) => (
          <div key={i} className="absolute rounded-full animate-pulse" style={{ width: p.w, height: p.h, left: p.l, top: p.t, background: `rgba(52, 211, 153, ${p.op})`, animationDuration: p.dur, animationDelay: p.del, filter: 'blur(1px)' }} />
        ))}
      </div>

      <nav className="border-b border-white/10 px-6 py-4 sticky top-0 z-40" style={{ background: 'rgba(15, 15, 26, 0.8)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,255,255,0.08)' }} aria-label="メインナビゲーション">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="font-bold text-white flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-emerald-500" aria-hidden="true">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            AI終活サポート
          </span>
          <Link
            href="/tool"
            aria-label="AI終活サポートに無料で相談する"
            className="text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.97]"
            style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', boxShadow: '0 0 15px rgba(16, 185, 129, 0.3), 0 4px 10px rgba(0,0,0,0.2)' }}
          >
            無料で相談する
          </Link>
        </div>
      </nav>

      <StreakBanner />

      <section className="max-w-4xl mx-auto px-6 py-20 text-center relative z-10">
        <div className="inline-block text-emerald-300 text-xs font-medium px-4 py-1.5 rounded-full mb-6" style={{ background: 'rgba(16, 185, 129, 0.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(52, 211, 153, 0.25)' }}>
          50代・60代・70代の方へ
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          <span className="text-white">終活のことを</span><br />
          <span style={{ background: 'linear-gradient(135deg, #F1F5F9 0%, #10B981 50%, #059669 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', filter: 'drop-shadow(0 0 20px rgba(16, 185, 129, 0.3))' }}>AIに相談</span>
          <span className="text-white">してみませんか</span>
        </h1>
        <p className="text-lg text-gray-300 mb-8 max-w-xl mx-auto">
          エンディングノート・相続・デジタル遺品・医療の意思表示。あなたの状況に合わせたアドバイスをAIが丁寧にお伝えします。
        </p>
        <div className="max-w-xs mx-auto mb-4"><UsageCounter /></div>
        <TrustBadge />
        <Link
          href="/tool"
          aria-label="AI終活サポートを無料で試す"
          className="inline-block text-white font-bold text-lg px-8 py-4 rounded-2xl transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.97] min-h-[52px]"
          style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', boxShadow: '0 0 25px rgba(16, 185, 129, 0.35), 0 4px 15px rgba(0,0,0,0.3)' }}
        >
          無料でAIに相談する →
        </Link>
        <p className="text-xs opacity-60 mt-2">※登録不要・すぐに結果</p>
        <p className="text-xs text-gray-400 mt-3">クレジットカード不要・3回まで無料</p>
      </section>

      {/* インタラクティブチェッカー */}
      <InteractiveChecker />

      <section className="py-16 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center mb-10 text-white">こんなお悩みはありませんか？</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {[
              "何から始めればいいかわからない",
              "家族に話すタイミングがわからない",
              "遺産・相続のことが不安",
              "デジタルデータをどう整理するか",
            ].map((p) => (
              <div key={p} className="flex gap-3 rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="text-sm text-gray-200">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 感情フック */}
      <section className="py-12 px-6 max-w-3xl mx-auto relative z-10">
        <h2 className="text-xl font-bold text-center text-white mb-6">こんな経験ありませんか？</h2>
        <div className="space-y-4">
          {[
            { icon: "1", text: "終活を始めなきゃと思いつつ、何から手をつければいいかわからず後回しにしてしまう..." },
            { icon: "2", text: "家族への負担を少なくしたいのに、相続や遺言の手続きが複雑すぎて一人では無理..." },
            { icon: "3", text: "専門家に相談するほどでもないかな...と気軽に相談できる場所がない..." },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <span className="w-8 h-8 rounded-full text-white text-sm font-bold flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #10B981, #059669)' }}>
                {item.icon}
              </span>
              <p className="text-gray-200 text-sm font-medium">{item.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 text-white rounded-2xl p-5 text-center" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.8), rgba(5, 150, 105, 0.9))', backdropFilter: 'blur(12px)', border: '1px solid rgba(52, 211, 153, 0.3)', boxShadow: '0 0 30px rgba(16, 185, 129, 0.2)' }}>
          <p className="font-bold text-base mb-1">AI終活サポートがその悩みを解決します</p>
          <p className="text-emerald-100 text-sm">気軽に・無料で・24時間。AIがあなたのペースで丁寧にサポートします。</p>
        </div>
      </section>

      {/* 利用者の声 */}
      <section className="py-16 px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10 text-white">利用者の声</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Yさん（65歳・主婦）", text: "エンディングノートの書き方がわからず後回しにしていました。AIが質問に答えていく形式なので、気づいたら30分で基本的な内容が完成していました。" },
              { name: "Kさん（58歳・会社員）", text: "相続や遺言について専門家に相談するのは敷居が高かった。AIに状況を入力したら分かりやすく説明してくれて、何を準備すればいいか整理できました。" },
              { name: "Mさん（70歳・自営業）", text: "デジタル遺品の整理について子供に伝えたかった。AIが整理したリストを印刷して渡したら、子供たちも安心してくれました。" },
            ].map((t) => (
              <div key={t.name} className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
                <div className="flex gap-0.5 mb-3" role="img" aria-label="星5つ評価">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} viewBox="0 0 24 24" className="w-4 h-4 text-amber-400" fill="currentColor" aria-hidden="true">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-200 text-sm mb-4">「{t.text}」</p>
                <p className="text-emerald-400 text-xs font-bold">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold mb-6 text-white">料金プラン</h2>

          {/* 年額/月額トグルスイッチ（デフォルト: 年額。「2ヶ月無料」のゼロ価格効果でCVR最大化） */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={`text-sm font-medium transition-colors ${!isAnnual ? 'text-white' : 'text-white/40'}`}>月額</span>
            <button
              role="switch"
              aria-checked={isAnnual}
              aria-label="年額プランと月額プランを切り替える"
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative w-14 h-7 rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${isAnnual ? 'bg-emerald-500' : 'bg-white/20'}`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform duration-200 ${isAnnual ? 'translate-x-7' : 'translate-x-0'}`}
              />
            </button>
            <span className={`text-sm font-medium transition-colors ${isAnnual ? 'text-white' : 'text-white/40'}`}>
              年額
              <span className="ml-2 text-xs bg-green-500 text-white px-2 py-0.5 rounded-full font-bold">2ヶ月無料</span>
            </span>
          </div>

          {isAnnual ? (
            /* 年額プラン表示 */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {[
                { name: "お試し", price: "無料", monthly: null, limit: "3回まで", planId: null as null, highlight: false },
                { name: "スタンダード年額", price: "¥9,800/年", monthly: "月換算 ¥817/月", limit: "月30回・2ヶ月分無料", planId: "annual" as const, highlight: true },
                { name: "1回払い", price: "¥1,980/回", monthly: null, limit: "今回のみ利用", planId: "once" as const, highlight: false },
              ].map((plan) => (
                <div
                  key={plan.name}
                  className="rounded-2xl p-6 relative transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: plan.highlight ? 'rgba(16, 185, 129, 0.12)' : 'rgba(255,255,255,0.05)',
                    backdropFilter: 'blur(12px)',
                    border: plan.highlight ? '2px solid rgba(52, 211, 153, 0.4)' : '1px solid rgba(255,255,255,0.08)',
                    boxShadow: plan.highlight ? '0 0 30px rgba(16, 185, 129, 0.15), 0 8px 32px rgba(0,0,0,0.2)' : '0 8px 32px rgba(0,0,0,0.15)',
                  }}
                >
                  {plan.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1">
                      <span className="text-xs text-white px-3 py-0.5 rounded-full font-bold" style={{ background: 'linear-gradient(135deg, #10B981, #059669)' }}>おすすめ</span>
                      <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full font-bold">2ヶ月無料</span>
                    </div>
                  )}
                  <div className="font-bold mb-1 text-white">{plan.name}</div>
                  <div className="text-2xl font-bold text-emerald-400 mb-1">{plan.price}</div>
                  {plan.monthly && <div className="text-xs text-green-400 font-medium mb-1">{plan.monthly}</div>}
                  <div className="text-xs text-gray-400 mb-4">{plan.limit}</div>
                  {plan.planId === null ? (
                    <Link
                      href="/tool"
                      aria-label="お試しプランで無料体験する"
                      className="block w-full text-center text-sm font-bold py-3 rounded-xl min-h-[44px] transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.97] text-gray-200"
                      style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}
                    >
                      無料で試す
                    </Link>
                  ) : (
                    <KomojuButton
                      planId={plan.planId}
                      planLabel={plan.name}
                      className={`block w-full text-center text-sm font-bold py-3 rounded-xl min-h-[44px] transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.97] ${plan.highlight ? 'text-white' : 'text-gray-200'}`}
                    />
                  )}
                </div>
              ))}
            </div>
          ) : (
            /* 月額プラン表示 */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {[
                { name: "お試し", price: "無料", limit: "3回まで", planId: null as null, highlight: false },
                { name: "スタンダード", price: "¥980/月", limit: "月30回", planId: "monthly" as const, highlight: true },
                { name: "1回払い", price: "¥1,980/回", limit: "今回のみ利用", planId: "once" as const, highlight: false },
              ].map((plan) => (
                <div
                  key={plan.name}
                  className="rounded-2xl p-6 relative transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: plan.highlight ? 'rgba(16, 185, 129, 0.12)' : 'rgba(255,255,255,0.05)',
                    backdropFilter: 'blur(12px)',
                    border: plan.highlight ? '2px solid rgba(52, 211, 153, 0.4)' : '1px solid rgba(255,255,255,0.08)',
                    boxShadow: plan.highlight ? '0 0 30px rgba(16, 185, 129, 0.15), 0 8px 32px rgba(0,0,0,0.2)' : '0 8px 32px rgba(0,0,0,0.15)',
                  }}
                >
                  {plan.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs text-white px-3 py-0.5 rounded-full font-bold" style={{ background: 'linear-gradient(135deg, #10B981, #059669)' }}>
                      人気
                    </div>
                  )}
                  <div className="font-bold mb-1 text-white">{plan.name}</div>
                  <div className="text-2xl font-bold text-emerald-400 mb-1">{plan.price}</div>
                  <div className="text-xs text-gray-400 mb-4">{plan.limit}</div>
                  {plan.planId === null ? (
                    <Link
                      href="/tool"
                      aria-label="お試しプランで無料体験する"
                      className="block w-full text-center text-sm font-bold py-3 rounded-xl min-h-[44px] transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.97] text-gray-200"
                      style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}
                    >
                      無料で試す
                    </Link>
                  ) : (
                    <KomojuButton
                      planId={plan.planId}
                      planLabel={plan.name}
                      className={`block w-full text-center text-sm font-bold py-3 rounded-xl min-h-[44px] transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.97] ${plan.highlight ? 'text-white' : 'text-gray-200'}`}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 text-center relative z-10" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.85), rgba(5, 150, 105, 0.9))', backdropFilter: 'blur(12px)', borderTop: '1px solid rgba(52, 211, 153, 0.3)' }}>
        <h2 className="text-2xl font-bold text-white mb-4">一人で悩まず、AIに相談してみてください</h2>
        <Link
          href="/tool"
          aria-label="AI終活サポートに今すぐ無料で相談する"
          className="inline-block bg-white text-emerald-700 font-bold px-8 py-4 rounded-2xl hover:bg-emerald-50 transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.97] min-h-[52px]"
          style={{ boxShadow: '0 4px 15px rgba(0,0,0,0.15)' }}
        >
          無料で相談する →
        </Link>
      </section>

      {/* FAQ */}
      <section className="px-4 py-12 relative z-10" aria-labelledby="faq-heading">
        <div className="max-w-3xl mx-auto">
          <h2 id="faq-heading" className="text-2xl font-bold text-white mb-8 text-center">よくある質問</h2>
          {[
            { q: '無料で使えますか？', a: '基本機能は無料で3回までご利用いただけます。クレジットカードの登録も不要です。' },
            { q: '個人情報は安全ですか？', a: '入力された情報はAI分析のみに使用し、第三者への提供は行いません。SSL暗号化通信で安全に保護されています。' },
            { q: 'AIの回答は法的に有効ですか？', a: '本サービスは情報提供を目的としており、法律・税務・医療の専門的アドバイスではありません。具体的な手続きは必ず専門家にご相談ください。' },
            { q: 'エンディングノートの作成にどのくらい時間がかかりますか？', a: 'AIの質問に答えていくだけで、30分程度で基本的な内容が完成します。ご自身のペースで進めていただけます。' },
          ].map(({ q, a }) => (
            <details key={q} className="mb-4 rounded-lg" style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <summary className="p-4 cursor-pointer text-white font-medium">{q}</summary>
              <p className="px-4 pb-4 text-gray-400 text-sm">{a}</p>
            </details>
          ))}
        </div>
      </section>
      <FaqJsonLd items={[
        { question: '無料で使えますか？', answer: '基本機能は無料で3回までご利用いただけます。クレジットカードの登録も不要です。' },
        { question: '個人情報は安全ですか？', answer: '入力された情報はAI分析のみに使用し、第三者への提供は行いません。SSL暗号化通信で安全に保護されています。' },
        { question: 'AIの回答は法的に有効ですか？', answer: '本サービスは情報提供を目的としており、法律・税務・医療の専門的アドバイスではありません。具体的な手続きは必ず専門家にご相談ください。' },
        { question: 'エンディングノートの作成にどのくらい時間がかかりますか？', answer: 'AIの質問に答えていくだけで、30分程度で基本的な内容が完成します。ご自身のペースで進めていただけます。' },
        { question: 'デジタル遺品の整理は何から始めればいいですか？', answer: 'SNSアカウント・ネット銀行・サブスクリプションサービスのリスト化から始めましょう。AI終活サポートがサービスごとの対処方法（解約・引き継ぎ・削除申請）を案内します。' },
      ]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'AI終活サポート',
            applicationCategory: 'LifestyleApplication',
            operatingSystem: 'Web',
            description: 'エンディングノート作成・相続手続き案内・デジタル遺品整理を24時間AIがサポート。50代・60代・70代向けの終活相談Webサービス。無料3回から利用可能。',
            url: 'https://shukatsu-ai.vercel.app',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'JPY' },
          }).replace(/</g, '\\u003c'),
        }}
      />

      {/* シェアセクション */}
      <section className="py-8 px-4 text-center">
        <ShareButtons url="https://shukatsu-ai.vercel.app" text="AI終活サポートを使ってみた！" hashtags="終活AI" />
        <div className="mt-3 flex justify-center">
          <XShareButton text="AI終活サポートを使ってみた！エンディングノート・相続・デジタル遺品整理をAIがサポート。" url="https://shukatsu-ai.vercel.app" hashtags={['終活AI', '終活']} />
        </div>
      </section>

      <CrossSell currentService="就活AI" />

      <footer className="border-t border-white/10 py-6 text-center text-xs text-gray-400 space-y-2 relative z-10">
        <p>AI終活サポート © 2026 ※本サービスは情報提供を目的としており、法律・税務・医療の専門的アドバイスではありません。</p>
        <p>
          <Link href="/legal" aria-label="特定商取引法に基づく表記を確認する" className="underline hover:text-gray-600">
            特定商取引法に基づく表記
          </Link>
          {" "}・{" "}
          <Link href="/terms" aria-label="利用規約を確認する" className="underline hover:text-gray-600">
            利用規約
          </Link>
          {" "}・{" "}
          <Link href="/privacy" aria-label="プライバシーポリシーを確認する" className="underline hover:text-gray-600">
            プライバシーポリシー
          </Link>
          {" "}・{" "}
          <Link href="/business" aria-label="就活AI法人向けプランを見る" className="underline hover:text-gray-600">
            法人向け
          </Link>
        </p>
        <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-4">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          SSL暗号化通信 | データは安全に保護されています
        </div>
      </footer>
      <AdBanner slot="" />
    </main>
  );
}
