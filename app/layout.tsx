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
  manifest: "/manifest.json",
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "ホーム", "item": SITE_URL },
    { "@type": "ListItem", "position": 2, "name": "就活AIツール", "item": `${SITE_URL}/tool` },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "AI終活サポートとは何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AI終活サポートは、エンディングノートの作成・相続対策・デジタル遺品整理・医療の意思表示など、終活に関するあらゆる悩みをAIが丁寧にサポートするWebサービスです。3回まで無料でご利用いただけます。"
      }
    },
    {
      "@type": "Question",
      "name": "エンディングノートはどうやって作ればいいですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AI終活サポートでは、年齢・家族構成・現在の不安を入力するだけで、あなたに合ったエンディングノートの内容をAIが提案します。質問に答えていくだけで、30分程度で基本的な内容が完成します。"
      }
    },
    {
      "@type": "Question",
      "name": "相続・遺言の手続きをどこに相談すればいいですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AI終活サポートでは、相続や遺言に関する基本的な知識と、あなたの状況に応じた必要手続きをAIがわかりやすく説明します。専門家（司法書士・税理士）への相談が必要なケースも含めてアドバイスします。"
      }
    },
    {
      "@type": "Question",
      "name": "デジタル遺品の整理はどうすればいいですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SNS・メール・クラウドストレージ・ネット銀行など、デジタル上の資産・データを整理するための具体的な手順をAIがリスト形式で提案します。印刷してご家族と共有することもできます。"
      }
    },
    {
      "@type": "Question",
      "name": "料金はいくらかかりますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "3回まで完全無料でご利用いただけます。それ以上ご利用の場合は、月額980円（月30回）またはビジネスプラン月額2,980円（無制限＋書類テンプレート付き）をご用意しています。"
      }
    }
  ]
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
