import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  try {
    if (!stripe) {
      return NextResponse.json(
        {
          error:
            'Stripe APIキー（STRIPE_SECRET_KEY）が未設定です。Vercelの環境変数にキーを登録すると、本番決済が即時有効化されます。',
        },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { planType, slug, title, price, userId, userEmail } = body;

    const origin = req.headers.get('origin') || 'https://nikotaro.com';

    if (planType === 'membership') {
      // プレミアム会員定期購読（サブスクリプション）
      const sessionParams: any = {
        payment_method_types: ['card'],
        customer_email: userEmail || undefined,
        line_items: [
          {
            price_data: {
              currency: 'jpy',
              product_data: {
                name: 'にこ太郎の格ゲーLAB プレミアム会員',
                description: '公開中のスト6攻略＆実戦添削がすべて読み放題',
                tax_code: 'txcd_10000000',
              },
              unit_amount: 980,
              recurring: {
                interval: 'month',
              },
            },
            quantity: 1,
          },
        ],
        managed_payments: { enabled: false },
        metadata: {
          planType: 'membership',
          slug: slug || 'ryu-complete-guide',
          title: 'プレミアム会員',
          userId: userId || '',
        },
        mode: 'subscription',
        success_url: `${origin}/account/subscription?session_id={CHECKOUT_SESSION_ID}&upgraded=true&plan=monthly`,
        cancel_url: `${origin}/membership`,
      };
      const session = await stripe.checkout.sessions.create(sessionParams);

      return NextResponse.json({ url: session.url });
    } else if (planType === 'article') {
      // 記事単体購入（買い切り: 500円固定）
      const itemPrice = 500;
      const sessionParams: any = {
        payment_method_types: ['card'],
        customer_email: userEmail || undefined,
        line_items: [
          {
            price_data: {
              currency: 'jpy',
              product_data: {
                name: title ? `記事閲覧権: ${title}` : 'にこ太郎の格ゲーLAB 攻略記事',
                description: '買い切り（追加料金なしでアプデ追記も含め永久閲覧）',
                tax_code: 'txcd_10000000',
              },
              unit_amount: itemPrice,
            },
            quantity: 1,
          },
        ],
        managed_payments: { enabled: false },
        metadata: {
          planType: 'article',
          slug: slug || '',
          title: title || '',
          userId: userId || '',
        },
        mode: 'payment',
        success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}&slug=${encodeURIComponent(slug || '')}&planType=article`,
        cancel_url: `${origin}/articles/${slug || ''}`,
      };
      const session = await stripe.checkout.sessions.create(sessionParams);

      return NextResponse.json({ url: session.url });
    }

    return NextResponse.json({ error: '無効なリクエストです' }, { status: 400 });
  } catch (err: any) {
    console.error('Stripe checkout error:', err);
    return NextResponse.json(
      { error: err.message || '決済セッションの作成に失敗しました' },
      { status: 500 }
    );
  }
}