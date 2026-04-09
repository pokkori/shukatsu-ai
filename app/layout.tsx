import OrbBackground from "@/components/OrbBackground";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import Script from "next/script";
import CookieBanner from "@/components/CookieBanner";
import FeedbackButton from "@/components/FeedbackButton";
import { GoogleAdScript } from "@/components/GoogleAdScript";
import "./globals.css";
import { InstallPrompt } from "@/components/InstallPrompt";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const notoSansJP = Noto_Sans_JP({
	subsets: ["latin"],
	weight: ["400", "700"],
	display: "swap",
	variable: "--font-noto-sans-jp",
});

const SITE_URL = "https://shukatsu-ai.vercel.app";
const TITLE =
	"AI終活サポート｜エンディングノート・相続・医療意思をAIが丁寧にアドバイス";
const DESC =
	"年齢・家族構成・不安を入力するだけ。AIが今すぐやること・エンディングノート・相続対策・医療準備・専門家費用の相場まで一括アドバイス。印刷してご家族と共有。¥1,980〜。";

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
		images: [
			{
				url: `${SITE_URL}/opengraph-image`,
				width: 1200,
				height: 630,
				alt: "AI終活サポート",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: TITLE,
		description: DESC,
		images: [`${SITE_URL}/opengraph-image`],
	},
	metadataBase: new URL(SITE_URL),
	manifest: "/manifest.json",
};

const breadcrumbLd = {
	"@context": "https://schema.org",
	"@type": "BreadcrumbList",
	itemListElement: [
		{ "@type": "ListItem", position: 1, name: "ホーム", item: SITE_URL },
		{
			"@type": "ListItem",
			position: 2,
			name: "終活サポートツール",
			item: `${SITE_URL}/tool`,
		},
	],
};

const jsonLd = {
	"@context": "https://schema.org",
	"@type": "FAQPage",
	mainEntity: [
		{
			"@type": "Question",
			name: "AI終活サポートとは何ですか？",
			acceptedAnswer: {
				"@type": "Answer",
				text: "AI終活サポートは、エンディングノートの作成・相続対策・デジタル遺品整理・医療の意思表示など、終活に関するあらゆる悩みをAIが丁寧にサポートするWebサービスです。3回まで無料でご利用いただけます。",
			},
		},
		{
			"@type": "Question",
			name: "エンディングノートはどうやって作ればいいですか？",
			acceptedAnswer: {
				"@type": "Answer",
				text: "AI終活サポートでは、年齢・家族構成・現在の不安を入力するだけで、あなたに合ったエンディングノートの内容をAIが提案します。質問に答えていくだけで、30分程度で基本的な内容が完成します。",
			},
		},
		{
			"@type": "Question",
			name: "相続・遺言の手続きをどこに相談すればいいですか？",
			acceptedAnswer: {
				"@type": "Answer",
				text: "AI終活サポートでは、相続や遺言に関する基本的な知識と、あなたの状況に応じた必要手続きをAIがわかりやすく説明します。専門家（司法書士・税理士）への相談が必要なケースも含めてアドバイスします。",
			},
		},
		{
			"@type": "Question",
			name: "デジタル遺品の整理はどうすればいいですか？",
			acceptedAnswer: {
				"@type": "Answer",
				text: "SNS・メール・クラウドストレージ・ネット銀行など、デジタル上の資産・データを整理するための具体的な手順をAIがリスト形式で提案します。印刷してご家族と共有することもできます。",
			},
		},
		{
			"@type": "Question",
			name: "料金はいくらかかりますか？",
			acceptedAnswer: {
				"@type": "Answer",
				text: "3回まで完全無料でご利用いただけます。それ以上ご利用の場合は、月額980円（月30回）またはビジネスプラン月額2,980円（無制限＋書類テンプレート付き）をご用意しています。",
			},
		},
		{
			"@type": "Question",
			name: "認知症になった場合の財産管理はどうすればいいですか？",
			acceptedAnswer: {
				"@type": "Answer",
				text: "認知症に備えるには、任意後見制度・家族信託・法定後見制度の3つが主な選択肢です。AI終活サポートでは、あなたの家族構成・資産状況に応じて最適な方法をAIが提案します。早めの準備が大切です。",
			},
		},
		{
			"@type": "Question",
			name: "医療・介護の意思表示はどうやって残せばいいですか？",
			acceptedAnswer: {
				"@type": "Answer",
				text: "尊厳死宣言・リビングウィル・ACP（人生会議）として知られる医療意思表示文書の作成をAIがサポートします。延命治療の希望・臓器提供の意思・在宅介護の希望など、ご家族や医療者に伝えたい内容を整理できます。",
			},
		},
		{
			"@type": "Question",
			name: "お葬式・お墓の準備はいつ始めればいいですか？",
			acceptedAnswer: {
				"@type": "Answer",
				text: "葬儀・お墓の準備は元気なうちに始めることを推奨します。希望する葬儀の形式（家族葬・一般葬・直葬）、お墓の種類（一般墓・樹木葬・納骨堂）、費用の目安などをAIが詳しく説明します。",
			},
		},
		{
			"@type": "Question",
			name: "家族に迷惑をかけずに終活を進めるにはどうすればいいですか？",
			acceptedAnswer: {
				"@type": "Answer",
				text: "終活で最も大切なのは家族とのコミュニケーションです。AI終活サポートでは、家族に伝えるべき情報のリスト化・財産目録の作成・エンディングノートの印刷機能を提供しています。ご家族と一緒に確認できるよう設計されています。",
			},
		},
		{
			"@type": "Question",
			name: "スマートフォンでも使えますか？",
			acceptedAnswer: {
				"@type": "Answer",
				text: "はい、スマートフォン・タブレット・パソコンのすべてに対応しています。ブラウザさえあれば、アプリのインストールは不要です。入力した情報は外部サーバーに保存されず、安心してご利用いただけます。",
			},
		},
		{
			"@type": "Question",
			name: "生成されたアドバイスは法的に有効ですか？",
			acceptedAnswer: {
				"@type": "Answer",
				text: "AI終活サポートのアドバイスは参考情報の提供を目的としており、法的効力はありません。遺言書の作成・相続手続き・成年後見などの法的手続きは、必ず弁護士・司法書士・税理士などの専門家にご相談ください。",
			},
		},
		{
			"@type": "Question",
			name: "エンディングノートに「エンディングノート」とわかるようタイトルを付けられますか？",
			acceptedAnswer: {
				"@type": "Answer",
				text: "はい、AIが生成した内容には「エンディングノート」「私の終活ノート」など任意のタイトルを付けて印刷・保存できます。ご家族が見つけたときにすぐ内容がわかるよう、表紙に名前・作成日・保管場所も記載することをAIがアドバイスします。",
			},
		},
		{
			"@type": "Question",
			name: "家族に内緒で終活の準備を進めることはできますか？",
			acceptedAnswer: {
				"@type": "Answer",
				text: "はい、本サービスはご本人だけがアクセスするブラウザ上で動作します。ご家族のアカウントや端末と共有されることはありません。ただし、終活の最終目的は「ご家族への伝達」です。準備が整った段階でご家族に共有されることを推奨しています。",
			},
		},
		{
			"@type": "Question",
			name: "法的効力のある遺言書とエンディングノートの違いは何ですか？",
			acceptedAnswer: {
				"@type": "Answer",
				text: "遺言書は法律に定められた形式（自筆証書・公正証書など）で作成することで法的効力を持ち、相続財産の分配を法的に指定できます。エンディングノートは法的効力はありませんが、財産以外の気持ち・希望・連絡先なども自由に残せます。本サービスはエンディングノートの作成をサポートするものです。法的効力のある遺言書作成は専門家（弁護士・公証役場）にご相談ください。",
			},
		},
		{
			"@type": "Question",
			name: "医療意思表示書（アドバンス・ケア・プランニング）としても使えますか？",
			acceptedAnswer: {
				"@type": "Answer",
				text: "はい、ACP（アドバンス・ケア・プランニング、人生会議）として活用できる医療意思表示の内容をAIがサポートします。延命治療の希望・痛みへの対処・看取りの場所・臓器提供の意思などを整理し、かかりつけ医やご家族と共有できる形で出力します。ただし、法的な効力については医療機関にご確認ください。",
			},
		},
		{
			"@type": "Question",
			name: "ペットのことも終活に含められますか？",
			acceptedAnswer: {
				"@type": "Answer",
				text: "はい、ペットの飼育引き継ぎについても終活の重要な項目として対応しています。ペットの種類・年齢・飼育状況・引き継ぎ先の希望などを入力することで、ペットのためのエンディングノート項目をAIが提案します。",
			},
		},
		{
			"@type": "Question",
			name: "60代・70代・80代でも使いやすいですか？",
			acceptedAnswer: {
				"@type": "Answer",
				text: "はい、文字を大きく表示する設定や、シンプルな入力ステップで高齢の方にも使いやすい設計になっています。スマートフォンのブラウザからも利用でき、アプリのインストールは不要です。お子様やご家族が一緒にサポートしながら使うことも想定して設計されています。",
			},
		},
	],
};

const webAppLd = {
	"@context": "https://schema.org",
	"@type": "WebApplication",
	name: "AI終活サポート",
	url: SITE_URL,
	applicationCategory: "LifestyleApplication",
	operatingSystem: "Any",
	browserRequirements: "Requires JavaScript",
	offers: {
		"@type": "Offer",
		price: "0",
		priceCurrency: "JPY",
		description: "3回まで無料。月額¥980でご利用無制限",
	},
	description: DESC,
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="ja" className={`${inter.variable} ${notoSansJP.variable}`}>
			<head>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
				/>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppLd) }}
				/>
			</head>
			<body className="antialiased" style={{ background: "#0B0F1E" }}>
				<OrbBackground theme="life" />
				<div style={{ position: "relative", zIndex: 1 }}>{children}</div>
				<InstallPrompt />
				{/* 関連AIサービス */}
				<section className="mt-8 pt-6 border-t border-white/10 px-4 max-w-2xl mx-auto">
					<h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
						関連サービス
					</h2>
					<div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
						<a
							href="https://konkatsu-ai.vercel.app"
							target="_blank"
							rel="noopener noreferrer"
							className="block p-3 bg-white/5 rounded-lg hover:bg-white/10 transition text-sm"
						>
							<span className="block font-medium text-gray-200">婚活AI</span>
							<span className="block text-xs text-gray-400 mt-0.5">
								婚活プロフィールをAIが作成
							</span>
						</a>
						<a
							href="https://lifecompass-ai.vercel.app"
							target="_blank"
							rel="noopener noreferrer"
							className="block p-3 bg-white/5 rounded-lg hover:bg-white/10 transition text-sm"
						>
							<span className="block font-medium text-gray-200">
								LifeCompassAI
							</span>
							<span className="block text-xs text-gray-400 mt-0.5">
								人生設計をAIがサポート
							</span>
						</a>
					</div>
				</section>
				<FeedbackButton />
				<Analytics />
				<SpeedInsights />
				<GoogleAdScript />
				{process.env.NEXT_PUBLIC_CLARITY_ID &&
					process.env.NODE_ENV === "production" && (
						<Script id="clarity-init" strategy="afterInteractive">
							{`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${process.env.NEXT_PUBLIC_CLARITY_ID}");`}
						</Script>
					)}
				<CookieBanner />
			</body>
		</html>
	);
}
