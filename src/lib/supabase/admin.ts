import { createClient } from "@supabase/supabase-js";

/**
 * サーバー専用（Webhook / 内部API用）Supabase Admin クライアント
 * RLS（Row Level Security）をバイパスして、ユーザーの権限や決済データを安全に更新します。
 * クライアント側（ブラウザ）へは絶対に露出させないでください。
 */

export const isSupabaseAdminConfigured = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return Boolean(url && serviceKey && url.startsWith("https://") && !url.includes("placeholder"));
};

export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY または NEXT_PUBLIC_SUPABASE_URL が設定されていません。Vercel / .env.local を確認してください。"
    );
  }

  return createClient(url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
