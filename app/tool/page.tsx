"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const FREE_LIMIT = 3;
const KEY = "shukatsu_count";

async function startCheckout(plan: string) {
  const res = await fetch("/api/stripe/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ plan }),
  });
  const { url } = await res.json();
  if (url) window.location.href = url;
}

function Paywall({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl text-center">
        <div className="text-3xl mb-3">🌸</div>
        <h2 className="text-lg font-bold mb-2">無料相談回数を使い切りました</h2>
        <p className="text-sm text-gray-500 mb-5">引き続きご利用いただくには有料プランをご選択ください</p>
        <div className="space-y-3 mb-4">
          <button onClick={() => startCheckout("standard")} className="block w-full bg-green-600 text-white font-bold py-3 rounded-xl hover:bg-green-700">スタンダード ¥980/月</button>
          <button onClick={() => startCheckout("business")} className="block w-full bg-gray-100 text-gray-700 py-3 rounded-xl text-sm hover:bg-gray-200">プレミアム ¥2,980/月</button>
        </div>
        <button onClick={onClose} className="text-xs text-gray-400">閉じる</button>
      </div>
    </div>
  );
}

export default function ShukatsuTool() {
  const [age, setAge] = useState("");
  const [family, setFamily] = useState("");
  const [concern, setConcern] = useState("");
  const [assets, setAssets] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [showPaywall, setShowPaywall] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => { setCount(parseInt(localStorage.getItem(KEY) || "0")); }, []);
  const isLimit = count >= FREE_LIMIT;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLimit) { setShowPaywall(true); return; }
    setLoading(true); setResult("");
    try {
      const res = await fetch("/api/generate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ age, family, concern, assets }) });
      if (res.status === 429) { setShowPaywall(true); setLoading(false); return; }
      const data = await res.json();
      if (!res.ok) { setResult(data.error || "エラーが発生しました"); setLoading(false); return; }
      const newCount = data.count ?? count + 1;
      localStorage.setItem(KEY, String(newCount));
      setCount(newCount);
      setResult(data.result || "生成に失敗しました");
      if (newCount >= FREE_LIMIT) setTimeout(() => setShowPaywall(true), 1500);
    } catch { setResult("通信エラーが発生しました。インターネット接続を確認してください。"); }
    finally { setLoading(false); }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {showPaywall && <Paywall onClose={() => setShowPaywall(false)} />}
      <nav className="bg-white border-b px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-bold text-gray-900">🌸 AI終活サポート</Link>
          <span className={`text-xs px-3 py-1 rounded-full ${isLimit ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}>
            {isLimit ? "無料枠終了" : `無料あと${FREE_LIMIT - count}回`}
          </span>
        </div>
      </nav>
      <div className="max-w-4xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h1 className="text-xl font-bold text-gray-900">あなたの状況を教えてください</h1>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">年齢</label>
            <input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="例: 65" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">家族構成</label>
            <input type="text" value={family} onChange={e => setFamily(e.target.value)} placeholder="例: 配偶者・子供2人・孫1人" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">資産状況（任意）</label>
            <input type="text" value={assets} onChange={e => setAssets(e.target.value)} placeholder="例: 自宅・預貯金・株式など" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">相談内容・不安なこと <span className="text-red-500">*</span></label>
            <textarea value={concern} onChange={e => setConcern(e.target.value)} rows={6} placeholder="例: 遺言書を書きたいが何から始めればいいかわからない。子供たちに迷惑をかけたくない。" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none" required />
          </div>
          <button type="submit" disabled={loading} className={`w-full font-medium py-3 rounded-lg text-white transition-colors ${isLimit ? "bg-orange-500 hover:bg-orange-600" : "bg-green-600 hover:bg-green-700 disabled:bg-green-300"}`}>
            {loading ? "アドバイスを作成中..." : isLimit ? "有料プランに申し込む" : "アドバイスをもらう"}
          </button>
        </form>

        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700">アドバイス</label>
            {result && <button onClick={() => { navigator.clipboard.writeText(result); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="text-xs text-green-600 font-medium">{copied ? "コピーしました!" : "コピー"}</button>}
          </div>
          <div className="flex-1 bg-white border border-gray-200 rounded-lg p-4 min-h-[400px]">
            {loading ? (
              <div className="flex items-center justify-center h-full"><div className="text-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-3" /><p className="text-sm text-gray-400">AIがアドバイスを作成しています...</p></div></div>
            ) : result ? (
              <pre className="text-sm text-gray-800 whitespace-pre-wrap font-sans leading-relaxed">{result}</pre>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400"><p className="text-sm text-center">情報を入力して<br />「アドバイスをもらう」を押してください</p></div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
