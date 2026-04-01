import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'AI終活サポート｜エンディングノート・相続・医療意思をAIが丁寧にアドバイス';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1a2744 50%, #0f172a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
          <div
            style={{
              width: 64,
              height: 64,
              background: '#0ea5e9',
              borderRadius: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="white">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>
          <span style={{ color: '#7dd3fc', fontSize: 26, fontWeight: 700 }}>AI終活サポート</span>
        </div>
        <div
          style={{
            color: 'white',
            fontSize: 52,
            fontWeight: 900,
            textAlign: 'center',
            lineHeight: 1.25,
            maxWidth: 900,
            marginBottom: 24,
          }}
        >
          エンディングノート・相続・医療意思を
          <br />
          AIが丁寧にアドバイス
        </div>
        <div style={{ display: 'flex', gap: 16, marginBottom: 32 }}>
          {['エンディングノート', '相続対策', '医療の意思表示'].map((label) => (
            <div
              key={label}
              style={{
                padding: '8px 20px',
                background: 'rgba(14,165,233,0.15)',
                border: '1px solid rgba(14,165,233,0.4)',
                borderRadius: 24,
                fontSize: 18,
                color: '#7dd3fc',
              }}
            >
              {label}
            </div>
          ))}
        </div>
        <div
          style={{
            padding: '12px 40px',
            background: '#0284c7',
            borderRadius: 40,
            fontSize: 22,
            color: '#fff',
            fontWeight: 700,
          }}
        >
          3回まで無料 → shukatsu-ai.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}
