import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

// プランID → 金額・説明の対応表
// KOMOJU審査通過後に各プランのsubscription_idを設定すること
const PLANS: Record<string, { amount: number; description: string }> = {
  monthly: { amount: 980, description: 'AI終活サポート 月額プラン' },
  once: { amount: 1980, description: 'AI終活サポート 1回払い' },
  // 年額プラン（月額×10 = 2ヶ月分無料、月換算¥817/月）
  // プレースホルダー: KOMOJU審査通過後にplanIDを登録してください
  annual: { amount: 9800, description: 'AI終活サポート 年額プラン（月換算¥817/月・2ヶ月分無料）' },
};

export async function POST(req: NextRequest) {
  try {
    const { plan } = await req.json();
    const secretKey = process.env.KOMOJU_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json({ error: "決済設定が未完了です" }, { status: 500 });
    }

    // planが未指定の場合は月額をデフォルトとする
    const selected = PLANS[plan ?? "monthly"];
    if (!selected) {
      return NextResponse.json({ error: "無効なプランIDです" }, { status: 400 });
    }

    const origin = req.headers.get("origin") || "https://shukatsu-ai.vercel.app";

    const body = new URLSearchParams({
      "default_locale": "ja",
      "cancel_url": `${origin}/`,
      "return_url": `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      "currency": "JPY",
    });

    body.append("line_items[][quantity]", "1");
    body.append("line_items[][unit_price]", String(selected.amount));
    body.append("line_items[][currency]", "JPY");
    body.append("line_items[][description]", selected.description);

    const res = await fetch("https://komoju.com/api/v1/sessions", {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(secretKey + ":").toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
    });

    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json({ error: data.error?.message || "決済セッション作成失敗" }, { status: 500 });
    }

    return NextResponse.json({ url: data.session_url });
  } catch {
    return NextResponse.json({ error: "サーバーエラー" }, { status: 500 });
  }
}
