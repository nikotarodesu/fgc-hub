import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { isSupabaseAdminConfigured, createAdminClient } from "@/lib/supabase/admin";

export async function POST(req: NextRequest) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeKey || !webhookSecret) {
    return NextResponse.json(
      { message: "Stripe webhook is not active (keys not configured)" },
      { status: 200 }
    );
  }

  const stripe = new Stripe(stripeKey);
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing stripe signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    const rawBody = await req.text();
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err: any) {
    console.error("[Stripe Webhook Error]:", err.message);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  if (!isSupabaseAdminConfigured()) {
    console.warn(
      "[Stripe Webhook] Supabase Admin is not configured (SUPABASE_SERVICE_ROLE_KEY missing). Skipping DB sync."
    );
    return NextResponse.json({ received: true, warning: "Supabase Admin not configured" });
  }

  const supabase = createAdminClient();

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const customerId = session.customer as string;
        const userId = session.metadata?.userId;
        const plan = (session.metadata?.plan as "monthly" | "yearly") || "monthly";

        console.log(`[Stripe Webhook] Checkout completed: customer=${customerId}, user=${userId}, plan=${plan}`);

        if (session.subscription) {
          const subscriptionId = typeof session.subscription === "string" 
            ? session.subscription 
            : session.subscription.id;

          const sub = await stripe.subscriptions.retrieve(subscriptionId);
          await syncSubscriptionToDatabase(supabase, sub, userId, customerId, plan);
        }
        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        console.log(`[Stripe Webhook] Subscription sync: id=${subscription.id}, status=${subscription.status}`);
        await syncSubscriptionToDatabase(supabase, subscription);
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        console.log(`[Stripe Webhook] Subscription canceled: id=${subscription.id}`);
        await handleSubscriptionDeleted(supabase, subscription);
        break;
      }

      default:
        console.log(`[Stripe Webhook] Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("[Stripe Webhook DB Sync Error]:", err);
    return NextResponse.json({ error: `Sync Error: ${err.message}` }, { status: 500 });
  }
}

/**
 * StripeのSubscriptionオブジェクトをSupabaseのsubscriptionsおよびprofilesに同期
 */
async function syncSubscriptionToDatabase(
  supabase: ReturnType<typeof createAdminClient>,
  subscription: Stripe.Subscription,
  explicitUserId?: string,
  explicitCustomerId?: string,
  explicitPlan?: "monthly" | "yearly"
) {
  const customerId = explicitCustomerId || (subscription.customer as string);
  const subMetadataUserId = subscription.metadata?.userId;
  let targetUserId = explicitUserId && explicitUserId !== "anonymous" ? explicitUserId : subMetadataUserId;

  // 1. userId が未判明の場合、stripe_customer_id から profiles を逆引き
  if (!targetUserId && customerId) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("id")
      .eq("stripe_customer_id", customerId)
      .single();

    if (profile) {
      targetUserId = profile.id;
    }
  }

  if (!targetUserId) {
    console.warn(`[Stripe Sync] No matching user found for customer: ${customerId}, subscription: ${subscription.id}`);
    return;
  }

  // 2. プラン判定
  const interval = subscription.items.data[0]?.plan?.interval;
  const plan: "monthly" | "yearly" =
    explicitPlan ||
    (subscription.metadata?.plan as "monthly" | "yearly") ||
    (interval === "year" ? "yearly" : "monthly");

  const firstItem = subscription.items?.data?.[0];
  const rawStart = firstItem?.current_period_start || (subscription as any).current_period_start;
  const rawEnd = firstItem?.current_period_end || (subscription as any).current_period_end;

  const priceId = firstItem?.price?.id || null;
  const periodStart = rawStart
    ? new Date(rawStart * 1000).toISOString()
    : new Date().toISOString();
  const periodEnd = rawEnd
    ? new Date(rawEnd * 1000).toISOString()
    : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

  // 3. subscriptions レコードの upsert
  const { error: subError } = await supabase.from("subscriptions").upsert({
    id: subscription.id,
    user_id: targetUserId,
    status: subscription.status,
    plan,
    price_id: priceId,
    current_period_start: periodStart,
    current_period_end: periodEnd,
    cancel_at_period_end: subscription.cancel_at_period_end || false,
    updated_at: new Date().toISOString(),
  });

  if (subError) {
    console.error("[Stripe Sync] Failed to upsert subscription:", subError);
    throw subError;
  }

  // 4. profiles レコードのロールおよび stripe_customer_id 更新
  const isActive = subscription.status === "active" || subscription.status === "trialing";
  const newRole = isActive ? "premium" : "free";

  const { error: profileError } = await supabase
    .from("profiles")
    .update({
      role: newRole,
      stripe_customer_id: customerId,
      updated_at: new Date().toISOString(),
    })
    .eq("id", targetUserId);

  if (profileError) {
    console.error("[Stripe Sync] Failed to update profile role:", profileError);
    throw profileError;
  }

  console.log(`[Stripe Sync] Successfully updated user ${targetUserId} -> role: ${newRole}, sub: ${subscription.id}`);
}

/**
 * サブスクリプション解約時の処理
 */
async function handleSubscriptionDeleted(
  supabase: ReturnType<typeof createAdminClient>,
  subscription: Stripe.Subscription
) {
  // 1. subscriptions テーブルのステータスを canceled に更新
  await supabase
    .from("subscriptions")
    .update({
      status: "canceled",
      updated_at: new Date().toISOString(),
    })
    .eq("id", subscription.id);

  // 2. profiles 側の role を free に戻す
  const customerId = subscription.customer as string;
  let targetUserId = subscription.metadata?.userId;

  if (!targetUserId && customerId) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("id")
      .eq("stripe_customer_id", customerId)
      .single();

    if (profile) {
      targetUserId = profile.id;
    }
  }

  if (targetUserId) {
    await supabase
      .from("profiles")
      .update({
        role: "free",
        updated_at: new Date().toISOString(),
      })
      .eq("id", targetUserId);

    console.log(`[Stripe Sync] Reverted user ${targetUserId} to free role.`);
  }
}
