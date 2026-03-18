import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #f0fdf4, #dcfce7)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 72, marginBottom: 24 }}>🌸</div>
        <div style={{ fontSize: 52, fontWeight: 900, color: "#166534", marginBottom: 16, textAlign: "center" }}>
          AI終活サポート
        </div>
        <div style={{ fontSize: 26, color: "#166534", marginBottom: 32, textAlign: "center" }}>
          エンディングノート・相続・デジタル遺品<br />終活のすべてをAIがサポート
        </div>
        <div style={{ background: "#16a34a", color: "#fff", fontSize: 22, fontWeight: 700, padding: "12px 36px", borderRadius: 999 }}>
          無料で相談する →
        </div>
      </div>
    ),
    { ...size }
  );
}
