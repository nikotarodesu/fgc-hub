import { NextRequest, NextResponse } from 'next/server';
import { verifyAccessToken } from '@/lib/token';

export async function POST(req: NextRequest) {
  try {
    const { token, slug } = await req.json();

    if (!token) {
      return NextResponse.json({ valid: false, reason: 'トークンが未指定です' }, { status: 400 });
    }

    const result = verifyAccessToken(token, slug);

    if (!result.valid) {
      return NextResponse.json(
        { valid: false, reason: result.reason || '無効なトークンです' },
        { status: 403 }
      );
    }

    return NextResponse.json({
      valid: true,
      email: result.payload?.email,
      planType: result.payload?.planType,
    });
  } catch {
    return NextResponse.json({ valid: false, reason: 'トークン検証中にエラーが発生しました' }, { status: 500 });
  }
}
