# AI終活サポート

> 終活に必要なことをAIが個別にアドバイス。エンディングノート・相続・デジタル遺品・医療の意思表示をサポートするSaaSサービス

**本番URL**: https://shukatsu-ai.vercel.app

---

## サービス概要

50代・60代・70代の方向けに、終活に関するお悩みをClaude Haiku AIが丁寧にサポート。
「何から始めれば良いかわからない」という方でも、AIとの対話で一歩踏み出せる。

## 料金プラン

| プラン | 価格 | 制限 |
|--------|------|------|
| お試し | 無料 | 3回まで |
| スタンダード | ¥980/月 | 月30回 |
| ビジネス | ¥2,980/月 | 無制限＋書類テンプレ |

## 技術スタック

- **フレームワーク**: Next.js 14 (App Router)
- **言語**: TypeScript
- **スタイル**: Tailwind CSS
- **AI**: Anthropic Claude Haiku (claude-haiku-4-5-20251001)
- **デプロイ**: Vercel
- **決済**: Stripe（サブスクリプション）
- **アナリティクス**: Vercel Analytics

## ディレクトリ構成

```
shukatsu-ai/
├── app/
│   ├── page.tsx          # LP（ランディングページ）
│   ├── layout.tsx        # レイアウト・メタデータ
│   ├── tool/
│   │   └── page.tsx      # 相談画面（フォーム・結果表示・Paywall）
│   ├── success/
│   │   └── page.tsx      # 決済完了ページ
│   └── api/
│       ├── generate/
│       │   └── route.ts  # Claude API呼び出し・レート制限・Cookie管理
│       └── stripe/
│           ├── checkout/
│           │   └── route.ts  # Stripeセッション作成
│           └── verify/
│               └── route.ts  # 決済完了確認・Cookie付与
├── .env.local            # 環境変数（Vercelに設定済み）
└── package.json
```

## セキュリティ・制限

- **使用制限**: Cookieベースでサーバー側管理（3回まで無料）
- **レート制限**: 1分間10リクエストまで/IP
- **エラーハンドリング**: API障害・タイムアウト対応済み

## 環境変数

| 変数名 | 説明 |
|--------|------|
| `ANTHROPIC_API_KEY` | Anthropic APIキー |
| `STRIPE_SECRET_KEY` | Stripe シークレットキー |
| `STRIPE_PRICE_STD` | スタンダードプランの Price ID |
| `STRIPE_PRICE_BIZ` | ビジネス（プレミアム）プランの Price ID |

## ローカル起動

```bash
npm install
echo "ANTHROPIC_API_KEY=your_key" > .env.local
npm run dev
```

## デプロイ

```bash
npx vercel --prod
```
