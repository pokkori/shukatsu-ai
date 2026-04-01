"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useTypewriter } from "@/lib/useTypewriter";
import KomojuButton from "@/components/KomojuButton";
import { updateStreak, loadStreak, getStreakMilestoneMessage, type StreakData } from "@/lib/streak";

const FREE_LIMIT = 3;
const KEY = "shukatsu_count";
const HISTORY_KEY = "shukatsu_history";
const MAX_HISTORY = 5;

type Section = { title: string; icon: string; content: string };
type ParsedResult = { sections: Section[]; raw: string };

interface DiagnosisHistory {
  id: string;
  date: string;
  concern: string;
  summary: string;
}

function saveHistory(concern: string, raw: string) {
  try {
    const existing: DiagnosisHistory[] = JSON.parse(localStorage.getItem(HISTORY_KEY) ?? "[]");
    const item: DiagnosisHistory = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString("ja-JP"),
      concern: concern.slice(0, 30),
      summary: raw.slice(0, 80).replace(/\n/g, " "),
    };
    localStorage.setItem(HISTORY_KEY, JSON.stringify([item, ...existing].slice(0, MAX_HISTORY)));
  } catch { /* noop */ }
}

function DiagnosisHistoryPanel() {
  const [history, setHistory] = useState<DiagnosisHistory[]>([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    try { setHistory(JSON.parse(localStorage.getItem(HISTORY_KEY) ?? "[]")); } catch { /* noop */ }
  }, []);
  if (history.length === 0) return null;
  return (
    <div className="border border-white/10 rounded-xl mb-4 overflow-hidden backdrop-blur-sm bg-white/5">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-label="過去の診断履歴を表示"
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/10 transition-colors text-left"
      >
        <span className="text-sm font-bold text-green-300">過去の診断履歴（直近{history.length}件）</span>
        <span className="text-gray-400 text-xs">{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <ul className="border-t border-white/10 divide-y divide-white/5">
          {history.map(h => (
            <li key={h.id} className="px-4 py-2">
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-xs text-gray-400">{h.date}</span>
              </div>
              <p className="text-xs font-medium text-gray-200 truncate">{h.concern || "（相談内容）"}</p>
              <p className="text-xs text-gray-400 truncate mt-0.5">{h.summary}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function parseResult(text: string): ParsedResult {
  const sectionDefs = [
    { key: "今すぐ着手すべきこと", icon: "1." },
    { key: "エンディングノート記載必須項目", icon: "2." },
    { key: "相続・財産対策", icon: "3." },
    { key: "医療・介護の事前準備", icon: "4." },
    { key: "専門家に相談すべきケース", icon: "5." },
    { key: "あなたへのメッセージ", icon: "6." },
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
    sections.push({ title: "アドバイス", icon: "-", content: text });
  }
  return { sections, raw: text };
}

function Paywall({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="rounded-2xl p-6 max-w-sm w-full shadow-xl text-center" style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.2)' }}>
        <div className="mb-3 flex justify-center"><svg viewBox="0 0 40 40" width="40" height="40" aria-hidden="true"><circle cx="20" cy="20" r="18" fill="#6366F1" opacity="0.2"/><path d="M20 10c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10zm1 15h-2v-6h2v6zm0-8h-2v-2h2v2z" fill="#8B5CF6"/></svg></div>
        <h2 className="text-lg font-bold mb-2 text-white">無料相談回数を使い切りました</h2>
        <p className="text-sm text-gray-300 mb-1">詳細な終活アドバイスを受け取る</p>
        <ul className="text-xs text-gray-300 text-left mb-5 space-y-1 mt-3">
          <li>✓ 相続・財産対策の詳細アドバイス</li>
          <li>✓ 医療・介護の事前準備ガイド</li>
          <li>✓ 専門家費用の相場情報（一覧表付き）</li>
          <li>✓ 印刷してご家族と共有</li>
        </ul>
        <div className="space-y-3 mb-4">
          <KomojuButton planId="once" planLabel="¥1,980 で詳細レポートを受け取る（1回限り）"
            className="block w-full bg-green-600 text-white font-bold py-3 rounded-xl hover:bg-green-700" />
          <KomojuButton planId="standard" planLabel="月額プラン ¥980/月（何度でも相談）"
            className="block w-full bg-gray-100 text-gray-700 py-2.5 rounded-xl text-sm hover:bg-gray-200" />
        </div>
        <button onClick={onClose} aria-label="プレミアムプランのモーダルを閉じる" className="text-xs text-gray-400 hover:text-white transition-colors min-h-[44px] min-w-[44px]">閉じる</button>
      </div>
    </div>
  );
}

function CopyButton({ text, label = "コピー" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      aria-label={copied ? "コピーしました" : `${label}をクリップボードにコピーする`}
      className="text-xs px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 font-medium transition-colors">
      {copied ? "コピー済み ✓" : label}
    </button>
  );
}

function SectionContent({ content }: { content: string }) {
  const displayed = useTypewriter(content, 15);
  return <pre className="text-sm text-gray-200 whitespace-pre-wrap font-sans leading-relaxed">{displayed}</pre>;
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
            aria-label={`「${s.title}」セクションを表示する`}
            aria-pressed={activeTab === i}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${activeTab === i ? "bg-green-600 text-white" : "bg-white/10 text-gray-300 hover:bg-white/20"}`}>
            <span aria-hidden="true">{s.icon}</span><span className="hidden sm:inline">{s.title}</span>
          </button>
        ))}
      </div>
      <div className="backdrop-blur-md border border-white/10 rounded-xl p-4 min-h-[360px] border-l-4 border-l-indigo-500" style={{ background: 'rgba(255,255,255,0.05)' }}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-gray-200">{section.icon} {section.title}</span>
          <CopyButton text={section.content} />
        </div>
        <SectionContent content={section.content} />
      </div>
      <div className="flex gap-2 justify-end flex-wrap">
        <CopyButton text={parsed.raw} label="全文コピー" />
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("AI終活サポートでエンディングノートを作成しました！ #終活 #終活AI https://shukatsu-ai.vercel.app/tool")}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="AI終活サポートをXにシェアする"
          className="text-xs px-3 py-1.5 rounded-lg bg-black hover:bg-gray-800 text-white font-medium transition-colors"
        >
          Xでシェア
        </a>
        <a
          href={`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent("https://shukatsu-ai.vercel.app/tool")}&text=${encodeURIComponent("AI終活サポートでエンディングノートを作成しました！家族と共有しましょう #終活 #終活AI")}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="AI終活サポートの結果をLINEで家族に共有する"
          className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-[#06C755] hover:bg-[#05b34c] text-white font-medium transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.477 2 2 6.124 2 11.207c0 2.816 1.394 5.312 3.567 6.949-.157.584-.509 2.125-.584 2.453-.09.397.145.39.305.284.125-.083 1.978-1.301 2.78-1.831.636.09 1.293.138 1.932.138 5.523 0 10-4.124 10-9.207C20 6.124 17.523 2 12 2z"/></svg>
          LINEで家族に共有
        </a>
        <button onClick={handlePrint} aria-label="アドバイス内容を印刷してご家族と共有する" className="text-xs px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 font-medium">
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
  const [streamingText, setStreamingText] = useState("");
  const [streak, setStreak] = useState<StreakData | null>(null);
  const [streakMsg, setStreakMsg] = useState<string | null>(null);

  useEffect(() => {
    setCount(parseInt(localStorage.getItem(KEY) || "0"));
    setStreak(loadStreak("shukatsu"));
  }, []);
  const isLimit = count >= FREE_LIMIT;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLimit) { setShowPaywall(true); return; }
    setLoading(true); setParsed(null); setError(""); setStreamingText("");
    try {
      const res = await fetch("/api/generate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ age, family, concern, assets }) });
      if (res.status === 429) { setShowPaywall(true); setLoading(false); return; }
      if (!res.ok) { const data = await res.json(); setError(data.error || "エラーが発生しました"); setLoading(false); return; }
      if (!res.body) throw new Error("No response body");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        buffer += chunk;
        setStreamingText(buffer);
        const doneIdx = buffer.lastIndexOf("\nDONE:");
        if (doneIdx !== -1) {
          const fullText = buffer.slice(0, doneIdx);
          const jsonStr = buffer.slice(doneIdx + 6);
          try {
            const parsed = JSON.parse(jsonStr);
            const newCount = parsed.count ?? count + 1;
            localStorage.setItem(KEY, String(newCount));
            setCount(newCount);
            if (newCount >= FREE_LIMIT) setTimeout(() => setShowPaywall(true), 1500);
          } catch { /* ignore parse error */ }
          setStreamingText("");
          const parsedResult = parseResult(fullText);
          setParsed(parsedResult);
          saveHistory(concern, fullText);
          const s = updateStreak("shukatsu"); setStreak(s); const msg = getStreakMilestoneMessage(s.count); if (msg) setStreakMsg(msg);
          break;
        }
      }
    } catch { setError("通信エラーが発生しました。インターネット接続を確認してください。"); }
    finally { setLoading(false); }
  };

  return (
    <main className="min-h-screen" style={{ background: 'radial-gradient(ellipse at 20% 50%, rgba(120,119,198,0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(255,119,198,0.1) 0%, transparent 50%), #0F0F1A' }}>
      {showPaywall && <Paywall onClose={() => setShowPaywall(false)} />}
      <nav className="backdrop-blur-sm bg-white/5 border-b border-white/10 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" aria-label="AI終活サポートのトップページへ戻る" className="font-bold text-white flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-green-600" aria-hidden="true">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
            </svg>
            AI終活サポート
          </Link>
          <span className={`text-xs px-3 py-1 rounded-full ${isLimit ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}>
            {isLimit ? "無料枠終了" : `無料あと${FREE_LIMIT - count}回`}
          </span>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="backdrop-blur-sm bg-white/5 border border-white/10 shadow-lg rounded-2xl p-6">
          <DiagnosisHistoryPanel />
        <form onSubmit={handleSubmit} className="space-y-4">
          <h1 className="text-xl font-bold bg-gradient-to-r from-green-300 via-emerald-200 to-teal-300 bg-clip-text text-transparent">あなたの状況を教えてください</h1>
          {streak && streak.count > 0 && <div className="mt-2 inline-flex items-center gap-2 bg-orange-500/20 border border-orange-400/30 rounded-full px-3 py-1 text-sm text-orange-300"><span>{streak.count}日連続利用中</span></div>}
          {streakMsg && <div className="text-orange-600 font-bold text-sm">{streakMsg}</div>}
          <p className="text-sm text-gray-400">入力情報はAIアドバイス生成にのみ使用し、保存・第三者提供は一切行いません。</p>

          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-300 mb-1">年齢</label>
            <input id="age" type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="例: 65"
              aria-label="年齢を入力してください"
              className="w-full border border-white/20 bg-white/5 backdrop-blur-sm text-white placeholder-gray-400 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all" />
          </div>

          <div>
            <label htmlFor="family" className="block text-sm font-medium text-gray-300 mb-1">家族構成</label>
            <input id="family" type="text" value={family} onChange={e => setFamily(e.target.value)} placeholder="例: 配偶者・子供2人・孫1人"
              aria-label="家族構成を入力してください"
              className="w-full border border-white/20 bg-white/5 backdrop-blur-sm text-white placeholder-gray-400 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all" />
          </div>

          <div>
            <label htmlFor="assets" className="block text-sm font-medium text-gray-300 mb-1">資産状況（任意）</label>
            <input id="assets" type="text" value={assets} onChange={e => setAssets(e.target.value)} placeholder="例: 自宅・預貯金2000万・株式など"
              aria-label="資産状況（任意）"
              className="w-full border border-white/20 bg-white/5 backdrop-blur-sm text-white placeholder-gray-400 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all" />
          </div>

          <div>
            <label htmlFor="concern" className="block text-sm font-medium text-gray-300 mb-1">相談内容・不安なこと <span className="text-red-400">*</span></label>
            <textarea id="concern" value={concern} onChange={e => setConcern(e.target.value)} rows={5} required
              placeholder="例: 遺言書を書きたいが何から始めればいいかわからない。相続で子供たちが揉めないようにしたい。認知症になった時の財産管理も心配。"
              aria-label="相談内容・不安なこと（必須）"
              aria-required="true"
              className="w-full border border-white/20 bg-white/5 backdrop-blur-sm text-white placeholder-gray-400 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all resize-none" />
            <p className="text-xs text-gray-400 mt-1">詳しく書くほど的確なアドバイスが得られます（{concern.length}/1000文字）</p>
          </div>

          <div className="backdrop-blur-sm bg-blue-500/10 border border-blue-400/30 rounded-lg p-3 text-xs text-blue-200">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 inline-block mr-1 text-blue-300 shrink-0" aria-hidden="true"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/></svg> <strong>重要</strong>：このアドバイスはAIによる参考情報です。<strong>相続・遺言・税務は弁護士・司法書士・税理士に、医療・介護の判断は医師・ケアマネージャーに</strong>ご相談ください。本サービスは専門家の代替ではありません。
          </div>

          <button type="submit" disabled={loading}
            aria-label={loading ? "アドバイスを作成中です" : isLimit ? "有料プランに申し込む" : "終活アドバイスをもらう（無料）"}
            aria-busy={loading}
            className={`w-full font-medium py-3 rounded-xl text-white transition-all min-h-[44px] ${isLimit ? "bg-orange-500 hover:bg-orange-600" : "disabled:opacity-50"}`}
            style={!isLimit ? { background: 'linear-gradient(135deg, #6366F1, #8B5CF6)', boxShadow: '0 0 20px rgba(99,102,241,0.4)' } : undefined}>
            {loading ? "アドバイスを作成中..." : isLimit ? "有料プランに申し込む" : "終活アドバイスをもらう（無料）"}
          </button>
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}
        </form>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-300 mb-2">アドバイス</label>
          {loading ? (
            <div className="flex-1 backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl min-h-[420px] flex flex-col">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-500" aria-hidden="true" />
                <span className="text-sm font-medium text-green-600" aria-live="polite" aria-atomic="true">AIがアドバイスを作成中...</span>
              </div>
              {streamingText ? (
                <div className="flex-1 p-4 overflow-y-auto">
                  <pre className="text-xs text-gray-300 whitespace-pre-wrap font-sans leading-relaxed">{streamingText.replace(/\nDONE:.*$/, "").slice(-800)}</pre>
                </div>
              ) : (
                <div className="flex-1 p-4 space-y-3">
                  <div className="space-y-3">
                    <div className="skeleton h-4 w-3/4" />
                    <div className="skeleton h-4 w-full" />
                    <div className="skeleton h-4 w-5/6" />
                    <div className="skeleton h-4 w-2/3" />
                    <div className="skeleton h-4 w-full" />
                    <div className="skeleton h-4 w-4/5" />
                  </div>
                  <p className="text-xs text-gray-500 text-center mt-4">通常15〜20秒かかります</p>
                </div>
              )}
            </div>
          ) : parsed ? (
            <ResultTabs parsed={parsed} />
          ) : (
            <div className="flex-1 backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl flex flex-col items-center justify-center min-h-[420px] gap-3">
              <p className="text-sm text-center font-medium text-gray-400">情報を入力して<br />「アドバイスをもらう」を押してください</p>
              <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-lg p-4 text-xs space-y-2 w-full max-w-[260px]">
                <p className="font-semibold text-gray-300">生成される内容：</p>
                <p className="text-gray-400">今すぐ着手すべきこと</p>
                <p className="text-gray-400">エンディングノート記載項目</p>
                <p className="text-gray-400">相続・財産対策</p>
                <p className="text-gray-400">医療・介護の事前準備</p>
                <p className="text-gray-400">専門家費用の相場</p>
                <p className="text-gray-400">あなたへのメッセージ</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className="text-center py-6 text-xs text-gray-400 border-t border-white/10 mt-4 space-x-4">
        <a href="/legal" aria-label="特定商取引法に基づく表記を確認する" className="hover:text-gray-300">特定商取引法に基づく表記</a>
        <a href="/privacy" aria-label="プライバシーポリシーを確認する" className="hover:text-gray-300">プライバシーポリシー</a>
        <p className="mt-2 text-gray-500">本サービスはAI生成情報を提供します。法律・医療・税務判断は必ず専門家にご相談ください。</p>
      </footer>
    </main>
  );
}
