import crypto from 'crypto';

export interface TokenPayload {
  email: string;
  slug: string;
  planType: 'article' | 'membership';
  createdAt: number;
  // 有効期限（秒）。買い切りの場合は無期限（省略可）
  exp?: number;
}

const TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET ||
  process.env.STRIPE_SECRET_KEY ||
  'nikotaro-fgc-hub-secure-access-token-secret-salt-2026';

/**
 * URL-safe Base64 エンコード
 */
function base64UrlEncode(str: string): string {
  return Buffer.from(str)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/**
 * URL-safe Base64 デコード
 */
function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  return Buffer.from(base64, 'base64').toString('utf8');
}

/**
 * HMAC-SHA256署名を作成
 */
function signPayload(encodedPayload: string): string {
  return crypto
    .createHmac('sha256', TOKEN_SECRET)
    .update(encodedPayload)
    .digest('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/**
 * 閲覧用暗号署名トークンを発行
 */
export function generateAccessToken(payload: Omit<TokenPayload, 'createdAt'>): string {
  const fullPayload: TokenPayload = {
    ...payload,
    createdAt: Date.now(),
  };

  const encodedPayload = base64UrlEncode(JSON.stringify(fullPayload));
  const signature = signPayload(encodedPayload);

  return `${encodedPayload}.${signature}`;
}

export interface VerificationResult {
  valid: boolean;
  payload?: TokenPayload;
  reason?: string;
}

/**
 * 閲覧用トークンの改ざん検証＆有効性チェック
 */
export function verifyAccessToken(token: string, currentSlug?: string): VerificationResult {
  if (!token || typeof token !== 'string') {
    return { valid: false, reason: 'トークンが指定されていません' };
  }

  const parts = token.split('.');
  if (parts.length !== 2) {
    return { valid: false, reason: '不正なトークン形式です' };
  }

  const [encodedPayload, providedSignature] = parts;

  // 1. 署名の一致検証（タイミング攻撃対策のため timingSafeEqual を使用）
  const expectedSignature = signPayload(encodedPayload);
  const providedBuffer = Buffer.from(providedSignature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (
    providedBuffer.length !== expectedBuffer.length ||
    !crypto.timingSafeEqual(providedBuffer, expectedBuffer)
  ) {
    return { valid: false, reason: 'トークンの署名が無効または改ざんされています' };
  }

  // 2. ペイロードのデコード
  try {
    const jsonStr = base64UrlDecode(encodedPayload);
    const payload: TokenPayload = JSON.parse(jsonStr);

    // 3. 有効期限のチェック（設定されている場合）
    if (payload.exp && Date.now() > payload.exp * 1000) {
      return { valid: false, reason: 'トークンの有効期限が切れています' };
    }

    // 4. 記事の一致チェック（サブスクリプションなら全記事閲覧可）
    if (currentSlug && payload.planType === 'article') {
      // 共通リュウ記事のエイリアス対応
      const isRyuAlias =
        currentSlug.includes('ryu') && payload.slug.includes('ryu');

      if (payload.slug !== currentSlug && !isRyuAlias) {
        return {
          valid: false,
          reason: 'このトークンは別の記事用です',
        };
      }
    }

    return { valid: true, payload };
  } catch {
    return { valid: false, reason: 'ペイロードの解析に失敗しました' };
  }
}
