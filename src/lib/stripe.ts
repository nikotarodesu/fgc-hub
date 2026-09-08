import Stripe from 'stripe';

// Stripe SDK クライアント（暗号化決済セッション作成用 - 本番環境適用）
export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;