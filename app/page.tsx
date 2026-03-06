import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI終活サポート｜あなたの終活をAIが丁寧にサポート",
  description: "エンディングノート・相続・デジタル遺品・医療の意思表示。終活に必要なことをAIが個別にアドバイス。無料で相談できます。",
};

export default function ShukatsuLP() {
  return (
    <main className="min-h-screen bg-white">
      <nav className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="font-bold text-gray-900">🌸 AI終活サポート</span>
          <Link href="/tool" className="bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-green-700">無料で相談する</Link>
        </div>
      </nav>

      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="inline-block bg-green-50 text-green-600 text-xs font-medium px-3 py-1 rounded-full mb-6">50代・60代・70代の方へ</div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          終活のことを<br /><span className="text-green-600">AIに相談</span>してみませんか
        </h1>
        <p className="text-lg text-gray-500 mb-8 max-w-xl mx-auto">エンディングノート・相続・デジタル遺品・医療の意思表示。あなたの状況に合わせたアドバイスをAIが丁寧にお伝えします。</p>
        <Link href="/tool" className="inline-block bg-green-600 text-white font-bold text-lg px-8 py-4 rounded-xl hover:bg-green-700 shadow-lg shadow-green-100">無料で相談する →</Link>
        <p className="text-xs text-gray-400 mt-3">クレジットカード不要・3回まで無料</p>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center mb-10">こんなお悩みはありませんか？</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {["何から始めればいいかわからない", "家族に話すタイミングがわからない", "遺産・相続のことが不安", "デジタルデータをどう整理するか"].map(p => (
              <div key={p} className="flex gap-3 bg-white rounded-xl p-4 border border-gray-200">
                <span>🌿</span>
                <p className="text-sm text-gray-700">{p}</p>
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
              { name: "スタンダード", price: "¥980/月", limit: "月30回", url: "https://gumroad.com/l/REPLACE", highlight: true },
              { name: "ビジネス", price: "¥2,980/月", limit: "無制限＋書類テンプレ", url: "https://gumroad.com/l/REPLACE", highlight: false },
            ].map(plan => (
              <div key={plan.name} className={`rounded-2xl border p-6 relative ${plan.highlight ? "border-green-500 shadow-lg" : "border-gray-200"}`}>
                {plan.highlight && <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs bg-green-600 text-white px-3 py-0.5 rounded-full">人気</div>}
                <div className="font-bold mb-1">{plan.name}</div>
                <div className="text-2xl font-bold text-green-600 mb-1">{plan.price}</div>
                <div className="text-xs text-gray-500 mb-4">{plan.limit}</div>
                <Link href={plan.url} className={`block w-full text-center text-sm font-medium py-2.5 rounded-lg ${plan.highlight ? "bg-green-600 text-white hover:bg-green-700" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                  {plan.name === "お試し" ? "無料で試す" : "申し込む"}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-green-600 py-16 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">一人で悩まず、AIに相談してみてください</h2>
        <Link href="/tool" className="inline-block bg-white text-green-600 font-bold px-8 py-4 rounded-xl hover:bg-green-50">無料で相談する →</Link>
      </section>

      <footer className="border-t py-6 text-center text-xs text-gray-400">AI終活サポート © 2026 ※本サービスは情報提供を目的としており、法律・税務・医療の専門的アドバイスではありません。</footer>
    </main>
  );
}
