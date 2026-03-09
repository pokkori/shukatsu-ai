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

  const prompt = `あなたは終活・相続・エンディングの専門アドバイザーです。ファイナンシャルプランナーと行政書士の資格を持ち、3,000件以上の終活相談を担当してきた経験から、以下の方への具体的で実践的なアドバイスを提供してください。

【相談者プロフィール】
年齢: ${age || "65"}歳
家族構成: ${family || "未入力"}
主な不安・相談内容: ${concern}
資産状況: ${assets || "未入力"}
${inheritanceCaution}

以下の構成で出力してください。各セクションの区切りは必ず「---」（ハイフン3つのみの行）を使ってください：

---
## 🚨 今すぐ着手すべきこと

（相談内容を踏まえた具体的なアクション3つ。「〇〇する」と断言形式で。それぞれ「なぜ今やる必要があるか」の理由も添えて。）

---
## 📝 エンディングノート記載必須項目

**① 自分のこと（医療・介護の意思）**
- 延命治療についての意思（尊厳死宣言書・ACP）
- （その他この方の状況で重要な項目）

**② 財産・資産（${assets ? "資産状況を踏まえて" : "一般的な項目"}）**
- （具体的な記載すべき項目を3〜5点）

**③ デジタル遺品の整理**
- SNS・ネット銀行・スマートフォン・写真データの具体的な整理手順

**④ 葬儀・お墓の希望**
- （記載しておくべき具体的な項目）

---
## 💰 相続・財産対策

（家族構成「${family || "家族"}」の場合の法定相続分、相続税の概算、遺言書作成の必要性、具体的な節税・対策を説明。専門家への相談が必要な場合はその旨も。）

---
## 🏥 医療・介護の事前準備

**今から決めておくこと:**
- 延命治療についての意思（尊厳死宣言書 or ACP）
- 認知症になった場合の財産管理（任意後見制度の活用）
- 介護が必要になった際の希望（在宅 or 施設）

**${family ? family + "との" : "家族との"}話し合いの進め方:**
（具体的な話の切り出し方、場の設定方法）

---
## 📋 専門家に相談すべきケース

| 専門家 | 相談すべき内容 | 相場費用 |
|--------|--------------|--------|
| 行政書士 | | |
| 司法書士 | | |
| 税理士 | | |
| ファイナンシャルプランナー | | |

---
## 💌 あなたへのメッセージ

（相談内容に寄り添った、温かく前向きな言葉。100文字程度。「終活は人生の締めくくりではなく、今をより豊かに生きるための準備です」という観点で。）

---
※ このアドバイスは一般的な情報提供を目的としており、個別の法的・税務アドバイスではありません。重要な決定は専門家にご相談ください。`;

  try {
    const message = await getClient().messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 3000,
      messages: [{ role: "user", content: prompt }],
    });
    const text = message.content[0].type === "text" ? message.content[0].text : "";
    const newCount = cookieCount + 1;
    const res = NextResponse.json({ result: text, count: newCount });
    res.cookies.set(COOKIE_KEY, String(newCount), { maxAge: 60 * 60 * 24 * 30, sameSite: "lax", httpOnly: true, secure: true });
    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "AI生成中にエラーが発生しました。しばらく待ってから再試行してください。" }, { status: 500 });
  }
}
