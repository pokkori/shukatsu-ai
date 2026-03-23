import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";


const SITE_URL = "https://shukatsu-ai.vercel.app";
const TITLE = "AI終活サポート｜エンディングノート・相続・医療意思をAIが丁寧にアドバイス";
const DESC = "年齢・家族構成・不安を入力するだけ。AIが今すぐやること・エンディングノート・相続対策・医療準備・専門家費用の相場まで一括アドバイス。印刷してご家族と共有。¥1,980〜。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  openGraph: {
    title: TITLE,
    description: DESC,
    url: SITE_URL,
    siteName: "AI終活サポート",
    locale: "ja_JP",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "AI終活サポート" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESC,
    images: ["/og.png"],
  },
  metadataBase: new URL(SITE_URL),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
