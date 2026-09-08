import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { generateAccessToken } from '@/lib/token';

export async function GET(req: NextRequest) {
  try {
    const sessionId = req.nextUrl.searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json({ error: 'session_id が指定されていません' }, { status: 400 });
    }

    if (!stripe) {
      // モックモード（開発時やAPIキー未設定時）
      const mockSlug = req.nextUrl.searchParams.get('slug') || 'ryu-complete-guide';
      const mockToken = generateAccessToken({
        email: 'buyer@example.com',
        slug: mockSlug,
        planType: 'article',
      });
      return NextResponse.json({
        paid: true,
        slug: mockSlug,
        title: '攻略記事（開発テスト）',
        email: 'buyer@example.com',
        token: mockToken,
        unlockUrl: `/articles/${mockSlug}?token=${mockToken}`,
      });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // 決済が正常完了しているか確認
    const isPaid =
      session.payment_status === 'paid' ||
      session.status === 'complete' ||
      session.mode === 'subscription';

    if (!isPaid) {
      return NextResponse.json(
        { error: '決済がまだ完了していません', status: session.status },
        { status: 400 }
      );
    }

    const email = session.customer_details?.email || session.customer_email || 'customer@nikotaro.com';
    const slug = (session.metadata?.slug as string) || req.nextUrl.searchParams.get('slug') || 'ryu-complete-guide';
    const planType = ((session.metadata?.planType as 'article' | 'membership') ||
      (session.mode === 'subscription' ? 'membership' : 'article'));
    const title = (session.metadata?.title as string) || '有料攻略記事';

    // 暗号署名トークンを発行
    const token = generateAccessToken({
      email,
      slug,
      planType,
    });

    const unlockUrl = planType === 'membership'
      ? `/articles/${slug}?token=${token}`
      : `/articles/${slug}?token=${token}`;

    return NextResponse.json({
      paid: true,
      email,
      slug,
      title,
      planType,
      token,
      unlockUrl,
    });
  } catch (err: any) {
    console.error('Error retrieving checkout session:', err);
    return NextResponse.json(
      { error: err.message || 'セッション情報の取得に失敗しました' },
      { status: 500 }
    );
  }
}
