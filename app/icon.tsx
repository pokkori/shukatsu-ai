import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        background: "#1A1A2E",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "6px",
      }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="7" r="4" stroke="#A78BFA" strokeWidth="2" />
        <path d="M4 21v-1a8 8 0 0116 0v1" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>,
    { ...size }
  );
}
