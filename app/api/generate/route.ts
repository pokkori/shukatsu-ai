import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

function getClient() {
  return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
}
const FREE_LIMIT = 3;
const COOKIE_KEY = "shukatsu_use_count";

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
  const isPremium = req.cookies.get("stripe_premium")?.value === "1";
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

  const prompt = `あなたは終活の専門アドバイザーです。以下の情報をもとに、具体的で温かみのある終活アドバイスを提供してください。

年齢: ${age || "未入力"}歳
家族構成: ${family || "未入力"}
主な不安・相談内容: ${concern}
資産状況: ${assets || "未入力"}

以下の構成でアドバイスを作成してください：

## 📋 今すぐやるべきこと（優先度高）
（具体的なアクションを3つ）

## 📝 エンディングノートに書いておくべき項目
（最低限必要な項目をリスト）

## 💰 相続・財産整理のポイント
（状況に応じた具体的なアドバイス）

## 📱 デジタル遺品の整理方法
（SNS・銀行アプリ・写真データなど）

## 🏥 医療・介護の事前準備
（延命治療の意思表示、介護施設の検討など）

## 👨‍👩‍👧 家族への伝え方
（話し合いのタイミングと方法）

温かく、前向きな言葉で伝えてください。`;

  try {
    const message = await getClient().messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
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
