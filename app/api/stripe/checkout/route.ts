import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
}

// one_time: 1回限り支払い（¥1,980） standard/business: 月額サブスク
const PRICES: Record<string, { id: string; mode: "payment" | "subscription" }> = {
  one_time: { id: process.env.STRIPE_PRICE_ONCE!, mode: "payment" },
  standard: { id: process.env.STRIPE_PRICE_STD!, mode: "subscription" },
  business: { id: process.env.STRIPE_PRICE_BIZ!, mode: "subscription" },
};

async function createSession(plan: string, origin: string) {
  const config = PRICES[plan];
  if (!config || !config.id) return null;
  return getStripe().checkout.sessions.create({
    mode: config.mode,
    line_items: [{ price: config.id, quantity: 1 }],
    success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/#pricing`,
    locale: "ja",
  });
}

export async function GET(req: NextRequest) {
  const plan = req.nextUrl.searchParams.get("plan") ?? "";
  const origin = req.headers.get("referer")?.replace(/\/[^/]*$/, "") || "https://shukatsu-ai.vercel.app";
  const session = await createSession(plan, origin);
  if (!session) return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  return NextResponse.redirect(session.url!);
}

export async function POST(req: NextRequest) {
  const { plan } = await req.json();
  const origin = req.headers.get("origin") || "https://shukatsu-ai.vercel.app";
  const session = await createSession(plan, origin);
  if (!session) return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  return NextResponse.json({ url: session.url });
}
