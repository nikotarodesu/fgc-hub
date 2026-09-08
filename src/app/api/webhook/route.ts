import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { generateAccessToken } from '@/lib/token';
import Stripe from 'stripe';

/**
 * Stripe Webhook ハンドラー
 * 購入完了通知（checkout.session.completed）を受信し、
 * 改ざん防止の閲覧トークンを発行して購入者宛に閲覧リンクを送信します。
 */
export async function POST(req: NextRequest) {
  try {
    const signature = req.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'Stripe 署名ヘッダー（stripe-signature）がありません' },
        { status: 400 }
      );
    }

    if (!stripe) {
      return NextResponse.json(
        { error: 'STRIPE_SECRET_KEY が未設定です' },
        { status: 500 }
      );
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.warn('STRIPE_WEBHOOK_SECRET が未設定です。Vercelの環境変数に設定してください。');
      return NextResponse.json(
        { error: 'STRIPE_WEBHOOK_SECRET がサーバーに設定されていません' },
        { status: 500 }
      );
    }

    // 1. 生のリクエストボディを取得（署名検証には未加工のテキストが必要）
    const rawBody = await req.text();

    // 2. Stripe公式SDKによる電子署名の厳格検証（偽装リクエストの完全排除）
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message);
      return NextResponse.json(
        { error: `Webhook 署名検証に失敗しました: ${err.message}` },
        { status: 400 }
      );
    }

    // 3. 決済完了イベント（checkout.session.completed）のハンドリング
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      const customerEmail =
        session.customer_details?.email ||
        session.customer_email ||
        'buyer@example.com';

      const slug = (session.metadata?.slug as string) || 'ryu-complete-guide';
      const title = (session.metadata?.title as string) || 'にこ太郎の格ゲーLAB 攻略記事';
      const planType = ((session.metadata?.planType as 'article' | 'membership') ||
        (session.mode === 'subscription' ? 'membership' : 'article'));

      // 4. 改ざん不可の暗号署名トークンを発行
      const token = generateAccessToken({
        email: customerEmail,
        slug,
        planType,
      });

      const siteOrigin = process.env.NEXT_PUBLIC_SITE_URL || 'https://nikotaro.com';
      const accessUrl = `${siteOrigin}/articles/${slug}?token=${token}`;

      console.log(`[Stripe Webhook] 決済成功検知:`);
      console.log(`  - 顧客メール: ${customerEmail}`);
      console.log(`  - 記事Slug: ${slug}`);
      console.log(`  - プラン: ${planType}`);
      console.log(`  - 発行トークン: ${token}`);
      console.log(`  - 閲覧用URL: ${accessUrl}`);

      // 5. 購入者宛に閲覧トークン付きメールを送信
      await sendAccessLinkEmail({
        toEmail: customerEmail,
        title,
        accessUrl,
        planType,
      });
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error('Webhook processing error:', err);
    return NextResponse.json(
      { error: err.message || 'Webhook 処理中にエラーが発生しました' },
      { status: 500 }
    );
  }
}

/**
 * 閲覧用リンクを記載した購入完了メールを送信するヘルパー
 * （Resend APIキーが設定されている場合は本番自動送信、未設定時は安全にログ記録）
 */
async function sendAccessLinkEmail({
  toEmail,
  title,
  accessUrl,
  planType,
}: {
  toEmail: string;
  title: string;
  accessUrl: string;
  planType: string;
}) {
  const emailSubject = `【にこ太郎の格ゲーLAB】ご購入ありがとうございます（閲覧用URLのご案内）`;
  const emailHtml = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1e293b; line-height: 1.6;">
      <h2 style="color: #0891b2; border-bottom: 2px solid #0891b2; padding-bottom: 8px;">
        にこ太郎の格ゲーLAB：ご購入完了のお知らせ
      </h2>
      <p>この度は有料コンテンツをご購入いただき、誠にありがとうございます。</p>
      
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin: 20px 0;">
        <p style="margin: 0 0 8px 0; font-weight: bold; font-size: 15px;">■ ご購入内容</p>
        <p style="margin: 0; color: #334155;">${title}（${planType === 'membership' ? '月額マガジン' : '単体買い切り'}）</p>
      </div>

      <p>以下の専用リンクより、すべての有料限定セクションや解説動画をすぐにご覧いただけます：</p>

      <div style="text-align: center; margin: 30px 0;">
        <a href="${accessUrl}" style="background: #0f172a; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 15px;">
          記事の閲覧を開始する（自動アンロック）
        </a>
      </div>

      <p style="font-size: 12px; color: #64748b;">
        ※ボタンが押せない場合は以下のURLをブラウザに貼り付けてアクセスしてください：<br/>
        <a href="${accessUrl}" style="color: #0891b2; word-break: break-all;">${accessUrl}</a>
      </p>

      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;" />
      <p style="font-size: 11px; color: #94a3b8;">
        にこ太郎の格ゲーLAB（nikotaro.com）<br/>
        スト6全キャラ1800MR以上。勝率直結の攻略メソッドと実戦解説をお届けします。
      </p>
    </div>
  `;

  const resendApiKey = process.env.RESEND_API_KEY;

  if (resendApiKey) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM_EMAIL || 'にこ太郎の格ゲーLAB <noreply@nikotaro.com>',
          to: toEmail,
          subject: emailSubject,
          html: emailHtml,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Resend email error:', errorText);
      } else {
        console.log(`[Email] ${toEmail} 宛に購入完了メールを送信しました。`);
      }
    } catch (emailErr) {
      console.error('Failed to dispatch email via Resend:', emailErr);
    }
  } else {
    console.log(`[Email Mock (RESEND_API_KEY未設定のためログ出力)]`);
    console.log(`To: ${toEmail}`);
    console.log(`Subject: ${emailSubject}`);
    console.log(`URL: ${accessUrl}`);
  }
}
