'use client';

// ===================================================================
// AffiliateSectionコンポーネント — A8.netアフィリエイトCTA（転職特化）
// 環境変数: NEXT_PUBLIC_A8_MEIKO_URL（明光キャリアパートナーズ）
//           NEXT_PUBLIC_A8_DODA_URL（doda）
// A8.netプログラムID取得後に .env.local / Vercel環境変数に設定してください。
// ===================================================================

interface AffiliateItem {
  title: string;
  description: string;
  cta: string;
  /** A8.netアフィリリンク（環境変数 or プレースホルダー） */
  href: string;
  badge: string;
  accentColor: string;
  badgeBg: string;
  borderColor: string;
}

const ITEMS: AffiliateItem[] = [
  {
    title: 'プロのキャリアアドバイザーに無料相談',
    description: '転職でキャリアアップしたい方へ。明光キャリアパートナーズのアドバイザーが求人提案から面接対策まで完全無料でサポート。',
    cta: '無料キャリア相談する',
    // A8.net: 明光キャリアパートナーズ（単価¥78,000）— 取得後に差し替え
    href: process.env.NEXT_PUBLIC_A8_MEIKO_URL ?? 'https://px.a8.net/svt/ejp?a8mat=【A8netプログラムID_明光キャリアパートナーズ_取得後に差し替え】',
    badge: '単価¥78,000',
    accentColor: '#6366F1',
    badgeBg: 'bg-indigo-50',
    borderColor: 'border-indigo-100',
  },
  {
    title: 'doda — 転職求人数No.1クラス',
    description: '就活・転職に強いdodaで非公開求人も含めた求人検索。キャリアカウンセリング無料。業界最大級の求人数から理想の職場を探せます。',
    cta: '無料で求人を探す',
    // A8.net: doda（単価¥10,000〜20,000）— 取得後に差し替え
    href: process.env.NEXT_PUBLIC_A8_DODA_URL ?? 'https://px.a8.net/svt/ejp?a8mat=【A8netプログラムID_doda_取得後に差し替え】',
    badge: '単価¥10,000〜',
    accentColor: '#8B5CF6',
    badgeBg: 'bg-violet-50',
    borderColor: 'border-violet-100',
  },
];

export function AffiliateSection() {
  return (
    <section
      className="mt-8 rounded-2xl border border-indigo-100 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, rgba(238,242,255,0.97) 0%, rgba(237,233,254,0.97) 100%)' }}
      aria-labelledby="affiliate-heading-shukatsu"
    >
      {/* ヘッダー */}
      <div className="flex items-center justify-between px-5 pt-4 pb-2">
        <h2 id="affiliate-heading-shukatsu" className="text-sm font-bold text-gray-700">
          転職でキャリアアップしたい方へ
        </h2>
        {/* 景表法対応: PR表記 */}
        <span className="text-xs font-bold text-gray-400 border border-gray-300 rounded px-1.5 py-0.5">PR</span>
      </div>

      {/* カードリスト */}
      <ul className="px-4 pb-4 space-y-3" role="list">
        {ITEMS.map((item) => (
          <li key={item.title} className={`bg-white rounded-xl border ${item.borderColor} shadow-sm`}>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="flex items-center justify-between gap-3 px-4 py-3 group"
              aria-label={`${item.title} — 外部サービスへのリンク（PR）`}
              style={{ minHeight: '44px' }}
            >
              <div className="flex-1 min-w-0">
                {/* SVGアイコン: 転職・キャリア */}
                <div className="flex items-center gap-2 mb-1">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect x="2" y="7" width="20" height="14" rx="2" stroke={item.accentColor} strokeWidth="2"/>
                    <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" stroke={item.accentColor} strokeWidth="2"/>
                    <path d="M12 12v4M10 14h4" stroke={item.accentColor} strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <p className="text-sm font-bold text-gray-800 truncate">{item.title}</p>
                </div>
                <p className="text-xs text-gray-500 leading-snug">{item.description}</p>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${item.badgeBg}`} style={{ color: item.accentColor }}>
                  {item.cta}
                </span>
                {/* 矢印アイコン */}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M9 18l6-6-6-6" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </a>
          </li>
        ))}
      </ul>

      {/* 景表法対応: 広告表記フッター */}
      <p className="text-xs text-gray-400 text-center pb-3">
        ※ 外部サービスへのリンクです（アフィリエイト広告）。各社公式サイトに遷移します。
      </p>
    </section>
  );
}
