"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const FREE_LIMIT = 3;
const KEY = "shukatsu_count";

type Section = { title: string; icon: string; content: string };
type ParsedResult = { sections: Section[]; raw: string };

function parseResult(text: string): ParsedResult {
  const sectionDefs = [
    { key: "今すぐ着手すべきこと", icon: "🚨" },
    { key: "エンディングノート記載必須項目", icon: "📝" },
    { key: "相続・財産対策", icon: "💰" },
    { key: "医療・介護の事前準備", icon: "🏥" },
    { key: "専門家に相談すべきケース", icon: "📋" },
    { key: "あなたへのメッセージ", icon: "💌" },
  ];
  const sections: Section[] = [];
  const parts = text.split(/^---$/m);
  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    const matched = sectionDefs.find(s => trimmed.includes(s.key));
    if (matched) {
      const content = trimmed.replace(/^##\s.*$/m, "").trim();
      sections.push({ title: matched.key, icon: matched.icon, content });
    }
  }
  if (sections.length === 0) {
    sections.push({ title: "アドバイス", icon: "📄", content: text });
  }
  return { sections, raw: text };
}

async function startCheckout(plan: string) {
  const res = await fetch("/api/stripe/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ plan }) });
  const { url } = await res.json();
  if (url) window.location.href = url;
}

function Paywall({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl text-center">
        <div className="text-3xl mb-3">🌸</div>
        <h2 className="text-lg font-bold mb-2">無料相談回数を使い切りました</h2>
        <p className="text-sm text-gray-500 mb-1">終活・相続・エンディングのアドバイスを継続して受けられます</p>
        <ul className="text-xs text-gray-400 text-left mb-5 space-y-1 mt-3">
          <li>✓ 相続・財産対策の詳細アドバイス</li>
          <li>✓ 医療・介護の事前準備ガイド</li>
          <li>✓ 専門家費用の相場情報</li>
          <li>✓ 印刷してご家族と共有</li>
        </ul>
        <div className="space-y-3 mb-4">
          <button onClick={() => startCheckout("standard")} className="block w-full bg-green-600 text-white font-bold py-3 rounded-xl hover:bg-green-700">スタンダード ¥980/月</button>
          <button onClick={() => startCheckout("business")} className="block w-full bg-gray-100 text-gray-700 py-3 rounded-xl text-sm hover:bg-gray-200">プレミアム ¥2,980/月</button>
        </div>
        <button onClick={onClose} className="text-xs text-gray-400">閉じる</button>
      </div>
    </div>
  );
}

function CopyButton({ text, label = "コピー" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className="text-xs px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 font-medium transition-colors">
      {copied ? "コピー済み ✓" : label}
    </button>
  );
}

function ResultTabs({ parsed }: { parsed: ParsedResult }) {
  const [activeTab, setActiveTab] = useState(0);
  const section = parsed.sections[activeTab];

  const handlePrint = () => {
    const html = `<html><head><title>終活アドバイス</title><style>body{font-family:sans-serif;padding:32px;line-height:1.8;white-space:pre-wrap;}</style></head><body>${parsed.raw.replace(/</g, "&lt;")}</body></html>`;
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const w = window.open(url, "_blank");
    w?.addEventListener("load", () => { w.print(); URL.revokeObjectURL(url); });
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-1 flex-wrap">
        {parsed.sections.map((s, i) => (
          <button key={i} onClick={() => setActiveTab(i)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${activeTab === i ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
            <span>{s.icon}</span><span className="hidden sm:inline">{s.title}</span>
          </button>
        ))}
      </div>
      <div className="bg-white border border-gray-200 rounded-xl p-4 min-h-[360px]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-gray-700">{section.icon} {section.title}</span>
          <CopyButton text={section.content} />
        </div>
        <pre className="text-sm text-gray-800 whitespace-pre-wrap font-sans leading-relaxed">{section.content}</pre>
      </div>
      <div className="flex gap-2 justify-end">
        <CopyButton text={parsed.raw} label="全文コピー" />
        <button onClick={handlePrint} className="text-xs px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 font-medium">
          印刷してご家族と共有
        </button>
      </div>
    </div>
  );
}

export default function ShukatsuTool() {
  const [age, setAge] = useState("");
  const [family, setFamily] = useState("");
  const [concern, setConcern] = useState("");
  const [assets, setAssets] = useState("");
  const [parsed, setParsed] = useState<ParsedResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [showPaywall, setShowPaywall] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => { setCount(parseInt(localStorage.getItem(KEY) || "0")); }, []);
  const isLimit = count >= FREE_LIMIT;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLimit) { setShowPaywall(true); return; }
    setLoading(true); setParsed(null); setError("");
    try {
      const res = await fetch("/api/generate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ age, family, concern, assets }) });
      if (res.status === 429) { setShowPaywall(true); setLoading(false); return; }
      const data = await res.json();
      if (!res.ok) { setError(data.error || "エラーが発生しました"); setLoading(false); return; }
      const newCount = data.count ?? count + 1;
      localStorage.setItem(KEY, String(newCount));
      setCount(newCount);
      setParsed(parseResult(data.result || ""));
      if (newCount >= FREE_LIMIT) setTimeout(() => setShowPaywall(true), 1500);
    } catch { setError("通信エラーが発生しました。インターネット接続を確認してください。"); }
    finally { setLoading(false); }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {showPaywall && <Paywall onClose={() => setShowPaywall(false)} />}
      <nav className="bg-white border-b px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-bold text-gray-900">🌸 AI終活サポート</Link>
          <span className={`text-xs px-3 py-1 rounded-full ${isLimit ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}>
            {isLimit ? "無料枠終了" : `無料あと${FREE_LIMIT - count}回`}
          </span>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h1 className="text-xl font-bold text-gray-900">あなたの状況を教えてください</h1>
          <p className="text-sm text-gray-500">入力情報はAIアドバイス生成にのみ使用し、保存・第三者提供は一切行いません。</p>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">年齢</label>
            <input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="例: 65"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">家族構成</label>
            <input type="text" value={family} onChange={e => setFamily(e.target.value)} placeholder="例: 配偶者・子供2人・孫1人"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">資産状況（任意）</label>
            <input type="text" value={assets} onChange={e => setAssets(e.target.value)} placeholder="例: 自宅・預貯金2000万・株式など"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">相談内容・不安なこと <span className="text-red-500">*</span></label>
            <textarea value={concern} onChange={e => setConcern(e.target.value)} rows={5} required
              placeholder="例: 遺言書を書きたいが何から始めればいいかわからない。相続で子供たちが揉めないようにしたい。認知症になった時の財産管理も心配。"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none" />
            <p className="text-xs text-gray-400 mt-1">詳しく書くほど的確なアドバイスが得られます（{concern.length}/1000文字）</p>
          </div>

          <button type="submit" disabled={loading}
            className={`w-full font-medium py-3 rounded-lg text-white transition-colors ${isLimit ? "bg-orange-500 hover:bg-orange-600" : "bg-green-600 hover:bg-green-700 disabled:bg-green-300"}`}>
            {loading ? "アドバイスを作成中..." : isLimit ? "有料プランに申し込む" : "終活アドバイスをもらう（無料）"}
          </button>
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}
        </form>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-2">アドバイス</label>
          {loading ? (
            <div className="flex-1 bg-white border border-gray-200 rounded-xl flex items-center justify-center min-h-[420px]">
              <div className="text-center">
                <div className="text-4xl mb-3">🌸</div>
                <p className="text-sm text-gray-500 font-medium">AIがアドバイスを作成中...</p>
                <p className="text-xs text-gray-400 mt-2">🚨 優先事項 → 📝 エンディングノート → 💰 相続対策</p>
                <p className="text-xs text-gray-300 mt-1">通常15〜20秒かかります</p>
              </div>
            </div>
          ) : parsed ? (
            <ResultTabs parsed={parsed} />
          ) : (
            <div className="flex-1 bg-white border border-gray-200 rounded-xl flex flex-col items-center justify-center min-h-[420px] gap-3">
              <div className="text-4xl">🌸</div>
              <p className="text-sm text-center font-medium text-gray-500">情報を入力して<br />「アドバイスをもらう」を押してください</p>
              <div className="bg-gray-50 rounded-lg p-4 text-xs space-y-2 w-full max-w-[260px]">
                <p className="font-semibold text-gray-600">生成される内容：</p>
                <p className="text-gray-500">🚨 今すぐ着手すべきこと</p>
                <p className="text-gray-500">📝 エンディングノート記載項目</p>
                <p className="text-gray-500">💰 相続・財産対策</p>
                <p className="text-gray-500">🏥 医療・介護の事前準備</p>
                <p className="text-gray-500">📋 専門家費用の相場</p>
                <p className="text-gray-500">💌 あなたへのメッセージ</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className="text-center py-6 text-xs text-gray-400 border-t mt-4 space-x-4">
        <a href="/legal" className="hover:text-gray-600">特定商取引法に基づく表記</a>
        <a href="/privacy" className="hover:text-gray-600">プライバシーポリシー</a>
      </footer>
    </main>
  );
}
