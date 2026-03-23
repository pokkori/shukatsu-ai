"use client";

import Link from "next/link";
import { useState } from "react";

const worries = [
  { id: "note", label: "終活ノートを作りたい", desc: "エンディングノートの書き方がわからない" },
  { id: "inherit", label: "相続のことが心配", desc: "遺産・遺言・相続税の手続きが不安" },
  { id: "money", label: "老後のお金が不安", desc: "生活費・介護費・資産管理を整理したい" },
  { id: "digital", label: "デジタル遺品を整理したい", desc: "SNS・ネット口座などのデータを残したくない" },
];

function InteractiveChecker() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section className="py-16 px-6 bg-green-50">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs font-medium text-green-600 text-center mb-2">3秒でわかる</p>
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">今、一番気になっていることは？</h2>
        <p className="text-sm text-gray-500 text-center mb-8">選ぶだけでAIがお手伝いできます</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {worries.map((w) => (
            <button
              key={w.id}
              aria-label={`悩みを選択: ${w.label}`}
              aria-pressed={selected === w.id}
              onClick={() => setSelected(w.id)}
              className={`text-left rounded-2xl border-2 p-5 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 ${
                selected === w.id
                  ? "border-green-500 bg-white shadow-md"
                  : "border-gray-200 bg-white hover:border-green-300"
              }`}
            >
              <p className={`font-bold text-base mb-1 ${selected === w.id ? "text-green-700" : "text-gray-800"}`}>
                {selected === w.id && (
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-green-500 inline-block mr-1" aria-hidden="true">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                )}
                {w.label}
              </p>
              <p className="text-sm text-gray-500">{w.desc}</p>
            </button>
          ))}
        </div>
        {selected && (
          <div className="mt-8 text-center animate-fade-in">
            <p className="text-green-700 font-bold text-base mb-4">
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
  return (
    <main className="min-h-screen bg-white">
      <nav className="border-b border-gray-100 px-6 py-4" aria-label="メインナビゲーション">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="font-bold text-gray-900 flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-green-600" aria-hidden="true">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            AI終活サポート
          </span>
          <Link
            href="/tool"
            aria-label="AI終活サポートに無料で相談する"
            className="bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-green-700"
          >
            無料で相談する
          </Link>
        </div>
      </nav>

      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="inline-block bg-green-50 text-green-600 text-xs font-medium px-3 py-1 rounded-full mb-6">
          50代・60代・70代の方へ
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          終活のことを<br />
          <span className="text-green-600">AIに相談</span>してみませんか
        </h1>
        <p className="text-lg text-gray-500 mb-8 max-w-xl mx-auto">
          エンディングノート・相続・デジタル遺品・医療の意思表示。あなたの状況に合わせたアドバイスをAIが丁寧にお伝えします。
        </p>
        <Link
          href="/tool"
          aria-label="AI終活サポートを無料で試す"
          className="inline-block bg-green-600 text-white font-bold text-lg px-8 py-4 rounded-xl hover:bg-green-700 shadow-lg shadow-green-100"
        >
          無料で相談する →
        </Link>
        <p className="text-xs text-gray-400 mt-3">クレジットカード不要・3回まで無料</p>
      </section>

      {/* インタラクティブチェッカー */}
      <InteractiveChecker />

      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center mb-10">こんなお悩みはありませんか？</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {[
              "何から始めればいいかわからない",
              "家族に話すタイミングがわからない",
              "遺産・相続のことが不安",
              "デジタルデータをどう整理するか",
            ].map((p) => (
              <div key={p} className="flex gap-3 bg-white rounded-xl p-4 border border-gray-200">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-green-500 flex-shrink-0 mt-0.5" aria-hidden="true">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                <p className="text-sm text-gray-700">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 感情フック */}
      <section className="py-12 px-6 max-w-3xl mx-auto">
        <h2 className="text-xl font-bold text-center text-gray-800 mb-6">こんな経験ありませんか？</h2>
        <div className="space-y-4">
          {[
            { icon: "1", text: "終活を始めなきゃと思いつつ、何から手をつければいいかわからず後回しにしてしまう..." },
            { icon: "2", text: "家族への負担を少なくしたいのに、相続や遺言の手続きが複雑すぎて一人では無理..." },
            { icon: "3", text: "専門家に相談するほどでもないかな...と気軽に相談できる場所がない..." },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 bg-green-50 border border-green-200 rounded-xl p-4">
              <span className="w-8 h-8 rounded-full bg-green-600 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                {item.icon}
              </span>
              <p className="text-gray-700 text-sm font-medium">{item.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 bg-green-600 text-white rounded-2xl p-5 text-center">
          <p className="font-bold text-base mb-1">AI終活サポートがその悩みを解決します</p>
          <p className="text-green-100 text-sm">気軽に・無料で・24時間。AIがあなたのペースで丁寧にサポートします。</p>
        </div>
      </section>

      {/* 利用者の声 */}
      <section className="bg-gray-900 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10 text-white">利用者の声</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Yさん（65歳・主婦）", text: "エンディングノートの書き方がわからず後回しにしていました。AIが質問に答えていく形式なので、気づいたら30分で基本的な内容が完成していました。" },
              { name: "Kさん（58歳・会社員）", text: "相続や遺言について専門家に相談するのは敷居が高かった。AIに状況を入力したら分かりやすく説明してくれて、何を準備すればいいか整理できました。" },
              { name: "Mさん（70歳・自営業）", text: "デジタル遺品の整理について子供に伝えたかった。AIが整理したリストを印刷して渡したら、子供たちも安心してくれました。" },
            ].map((t) => (
              <div key={t.name} className="bg-gray-800 rounded-2xl p-6">
                <p className="text-gray-200 text-sm mb-4">「{t.text}」</p>
                <p className="text-teal-400 text-xs font-bold">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold mb-10">料金プラン</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { name: "お試し", price: "無料", limit: "3回まで", url: "/tool", highlight: false },
              { name: "スタンダード", price: "¥980/月", limit: "月30回", url: "/tool", highlight: true },
              { name: "ビジネス", price: "¥2,980/月", limit: "無制限＋書類テンプレ", url: "/tool", highlight: false },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl border p-6 relative ${plan.highlight ? "border-green-500 shadow-lg" : "border-gray-200"}`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs bg-green-600 text-white px-3 py-0.5 rounded-full">
                    人気
                  </div>
                )}
                <div className="font-bold mb-1">{plan.name}</div>
                <div className="text-2xl font-bold text-green-600 mb-1">{plan.price}</div>
                <div className="text-xs text-gray-500 mb-4">{plan.limit}</div>
                <Link
                  href={plan.url}
                  aria-label={`${plan.name}プランで申し込む`}
                  className={`block w-full text-center text-sm font-medium py-2.5 rounded-lg ${
                    plan.highlight
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {plan.name === "お試し" ? "無料で試す" : "申し込む"}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-green-600 py-16 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">一人で悩まず、AIに相談してみてください</h2>
        <Link
          href="/tool"
          aria-label="AI終活サポートに今すぐ無料で相談する"
          className="inline-block bg-white text-green-600 font-bold px-8 py-4 rounded-xl hover:bg-green-50"
        >
          無料で相談する →
        </Link>
      </section>

      {/* X Share */}
      <section className="py-8 px-4 text-center bg-gray-50">
        <a
          href={
            "https://twitter.com/intent/tweet?text=" +
            encodeURIComponent(
              "AI終活サポートで終活の悩みを相談してみた 終活 エンディングノート・相続・デジタル遺品まで丁寧にアドバイスしてくれる → https://shukatsu-ai.vercel.app #終活 #AI終活"
            )
          }
          target="_blank"
          rel="noopener noreferrer"
          aria-label="AI終活サポートをXでシェアする"
          className="inline-flex items-center gap-2 bg-black hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-xl text-sm transition-colors"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          Xでシェアする
        </a>
      </section>

      <footer className="border-t py-6 text-center text-xs text-gray-400 space-y-2">
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
        </p>
      </footer>
    </main>
  );
}
