import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { isActiveSubscription } from "@/lib/supabase";

function getClient() {
  return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
}
const FREE_LIMIT = 3;
const COOKIE_KEY = "shukatsu_use_count";
const APP_ID = "shukatsu";

const rateLimit = new Map<string, { count: number; resetAt: number }>();
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.resetAt) { rateLimit.set(ip, { count: 1, resetAt: now + 60000 }); return true; }
  if (entry.count >= 10) return false;
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "リクエストが多すぎます。しばらく待ってから再試行してください。" }, { status: 429 });
  }
  const email = req.cookies.get("user_email")?.value;
  let isPremium = false;
  if (email) {
    isPremium = await isActiveSubscription(email, APP_ID);
  } else {
    isPremium = req.cookies.get("stripe_premium")?.value === "1";
  }
  const cookieCount = parseInt(req.cookies.get(COOKIE_KEY)?.value || "0");
  if (!isPremium && cookieCount >= FREE_LIMIT) {
    return NextResponse.json({ error: "LIMIT_REACHED" }, { status: 429 });
  }
  let body: Record<string, unknown>;
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: "リクエストの形式が正しくありません" }, { status: 400 }); }

  const { age, family, concern, assets } = body as Record<string, string>;
  if (!concern) return NextResponse.json({ error: "相談内容は必須です" }, { status: 400 });
  if (concern.length > 1000) return NextResponse.json({ error: "相談内容は1000文字以内で入力してください" }, { status: 400 });

  const ageNum = parseInt(age) || 65;
  const inheritanceCaution = ageNum >= 60 ? `相続税の基礎控除（3,000万円＋法定相続人×600万円）を念頭に置いた具体的な節税アドバイスを含めること。` : "";

  const SYSTEM_PROMPT = `あなたは終活・相続・エンディング分野の最上位専門アドバイザーです。ファイナンシャルプランナー（CFP）・行政書士・終活カウンセラーの3資格を保有し、3,000件以上の終活相談を担当してきた実績を持ちます。

【専門性の根拠】
- 相続税申告：基礎控除（3,000万円＋法定相続人×600万円）の計算から節税対策まで精通
- 遺言書：自筆証書遺言・公正証書遺言それぞれの費用・手続き・注意点を熟知
- 任意後見制度・成年後見制度の実務経験多数
- デジタル遺品（SNS・電子マネー・仮想通貨）の整理実務対応
- ACP（アドバンス・ケア・プランニング）・尊厳死宣言書の解説実績

【アドバイスの姿勢】
- 相談者の年齢・家族構成・資産状況に完全に即した個別アドバイスを提供する
- 法律・税務の一般的な情報を分かりやすく伝えるが、個別判断は専門家へ誘導する
- 温かみのある言葉で、不安を安心に変えるコミュニケーションをとる
- 具体的な行動手順・費用相場・タイムラインを必ず含める

【出力の品質基準（必須）】
1. **各セクションの文字数を厳守する**
   - 各セクションは指定された分量を満たすこと。短縮は品質低下とみなす
   - 箇条書きの項目数を省略しない（「3点」と指定されたら必ず3点書く）

2. **具体的な数値・費用相場・手続き期間を必ず記載する**
   - 「費用がかかります」ではなく「行政書士への遺言書作成依頼：5〜15万円程度」のように明示する
   - 「時間がかかります」ではなく「相続手続き完了まで通常3〜6ヶ月」のように記載する
   - 手続きの流れは「ステップ1→ステップ2→ステップ3」の順序を明確にする

3. **相談者の属性に応じたカスタマイズを行う**
   - 年齢・家族構成・資産状況・相談内容を必ずアドバイスに反映させる
   - 一般論だけのアドバイスは不可。「あなたのケースでは」という個別化を徹底する
   - 家族構成によって相続分・法定相続人の人数が変わるため、必ず具体的に算出する

4. **専門家への適切な誘導を含める**
   - 全ての専門家誘導には「何をどの専門家に相談するか」を明示する
   - 行政書士・司法書士・税理士・FP・弁護士それぞれの担当領域を正確に説明する
   - 「法テラス（0570-078374）」「行政書士会の無料相談」等の具体的な窓口を案内する

5. **感情に寄り添う表現を使う**
   - 終活は多くの人が「死」に向き合うことへの不安を抱えている
   - 「終活は終わりではなく、今をより豊かに生きるための準備」という前向きな視点を持つ
   - 家族との関係・想い出・感謝の気持ちを自然に盛り込む

【出力フォーマット制約】
- 各セクションの区切りは「---」（ハイフン3つのみの行）を使用する
- 見出しは「##」（Markdown h2）形式で統一する
- テーブルはMarkdownテーブル記法を使用する
- 箇条書きは「-」で始める（番号付きリストは「1.」形式）

【法令・制度の基準日】
- 2026年4月時点の法令・制度に基づいて回答する
- 相続税・贈与税の基礎控除・税率は現行制度を適用する
- 改正があった制度（例：暦年贈与・相続時精算課税）は最新制度を説明する

【免責事項】
- 回答は一般的な情報提供を目的としており、個別の法的・税務アドバイスではない
- 重要な決定の前には必ず行政書士・税理士・弁護士等の専門家に相談するよう案内する
- 「本アドバイスは参考情報です。個別の状況については専門家にご相談ください。」を適切な箇所に記載する`;

  const prompt = `以下の相談者への終活アドバイスを生成してください。

【相談者プロフィール】
年齢: ${age || "65"}歳
家族構成: ${family || "未入力"}
主な不安・相談内容: ${concern}
資産状況: ${assets || "未入力"}
${inheritanceCaution}

以下の構成で出力してください。各セクションの区切りは必ず「---」（ハイフン3つのみの行）を使ってください：

---
## 今すぐ着手すべきこと

（相談内容を踏まえた具体的なアクション3つ。「〇〇する」と断言形式で。それぞれ「なぜ今やる必要があるか」の理由・期限の目安も添えて。）

---
## エンディングノート記載必須項目

**[1] 自分のこと（医療・介護の意思）**
- 延命治療についての意思（尊厳死宣言書・ACP）
- （その他この方の状況で重要な項目）

**[2] 財産・資産（${assets ? "資産状況を踏まえて" : "一般的な項目"}）**
- （具体的な記載すべき項目を3〜5点）

**[3] デジタル遺品の整理**
- SNS・ネット銀行・スマートフォン・写真データの具体的な整理手順

**[4] 葬儀・お墓の希望**
- （記載しておくべき具体的な項目）

---
## 相続・財産対策

（家族構成「${family || "家族"}」の場合の法定相続分、相続税の概算、遺言書作成の必要性、具体的な節税・対策を説明。費用相場も含める。専門家への相談が必要な場合はその旨も。）

---
## 医療・介護の事前準備

**今から決めておくこと:**
- 延命治療についての意思（尊厳死宣言書 or ACP）
- 認知症になった場合の財産管理（任意後見制度の活用・費用目安）
- 介護が必要になった際の希望（在宅 or 施設）

**${family ? family + "との" : "家族との"}話し合いの進め方:**
（具体的な話の切り出し方、場の設定方法、話し合いで決めておくべき事項リスト）

---
## 専門家に相談すべきケース

| 専門家 | 相談すべき内容 | 費用相場 |
|--------|--------------|--------|
| 行政書士 | | |
| 司法書士 | | |
| 税理士 | | |
| ファイナンシャルプランナー | | |

---
## あなたへのメッセージ

（相談内容に寄り添った、温かく前向きな言葉。100文字程度。「終活は人生の締めくくりではなく、今をより豊かに生きるための準備です」という観点で。）

---
※ このアドバイスは一般的な情報提供を目的としており、個別の法的・税務アドバイスではありません。重要な決定は専門家にご相談ください。`;

  try {
    const newCount = cookieCount + 1;
    const encoder = new TextEncoder();
    const stream = getClient().messages.stream({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 3000,
      system: [
        {
          type: "text",
          text: SYSTEM_PROMPT,
          cache_control: { type: "ephemeral" },
        },
      ],
      messages: [{ role: "user", content: prompt }],
    });

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            if (chunk.type === "content_block_delta" && chunk.delta.type === "text_delta") {
              controller.enqueue(encoder.encode(chunk.delta.text));
            }
          }
          controller.enqueue(encoder.encode(`\nDONE:${JSON.stringify({ count: newCount })}`));
          controller.close();
        } catch (err) { console.error(err); controller.error(err); }
      },
    });

    const headers: Record<string, string> = {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache",
      "Set-Cookie": `${COOKIE_KEY}=${newCount}; Max-Age=${60 * 60 * 24 * 30}; SameSite=Lax; HttpOnly; Secure; Path=/`,
    };
    return new Response(readable, { headers });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "AI生成中にエラーが発生しました。しばらく待ってから再試行してください。" }, { status: 500 });
  }
}
