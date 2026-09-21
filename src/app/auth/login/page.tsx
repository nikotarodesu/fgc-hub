"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Crown, Mail, Lock, ArrowRight, CheckCircle2, ShieldCheck, User as UserIcon, AlertCircle, Sparkles } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

// Google ロゴSVG
function GoogleIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98Z"
      />
    </svg>
  );
}

function LoginContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const { login, loginWithGoogle, setDemoRole } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsAdmin(localStorage.getItem("fgc_admin_mode") === "true");
    }
  }, []);

  // URLパラメータ（OAuthエラー等の検知）
  useEffect(() => {
    if (searchParams.get("error") === "oauth_failed") {
      setError("Google認証に失敗したか、キャンセルされました。もう一度お試しください。");
    }
  }, [searchParams]);

  const nextParam = searchParams.get("next") || "/account/subscription";
  const actionParam = searchParams.get("action");

  // Google ログイン
  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    setError(null);
    try {
      const result = await loginWithGoogle(nextParam);
      if (!result.success) {
        setError(result.error || "Googleログインの開始に失敗しました");
        setIsGoogleLoading(false);
      }
    } catch (err: any) {
      setError(err.message || "予期しないエラーが発生しました");
      setIsGoogleLoading(false);
    }
  };

  // メールログイン
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("メールアドレスを入力してください");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const result = await login(email, password);
      if (result.success) {
        router.push(nextParam);
      } else {
        setError(result.error || "ログインに失敗しました");
      }
    } catch (err: any) {
      setError(err.message || "ログイン処理中にエラーが発生しました");
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDemo = (role: "free" | "premium") => {
    setDemoRole(role, "monthly");
    router.push("/account/subscription");
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 sm:py-20 space-y-8">
      {/* 見出し */}
      <div className="text-center space-y-2">
        <Link href="/" className="inline-block font-black text-xl sm:text-2xl text-neutral-900 dark:text-white tracking-tight">
          にこ太郎の格ゲーLAB
        </Link>
        <h1 className="text-lg sm:text-xl font-bold text-neutral-700 dark:text-neutral-300">
          会員ログイン
        </h1>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          プレミアム会員マイページへのアクセスと限定コンテンツをご利用いただけます。
        </p>
      </div>

      {/* ログインカード */}
      <div className="bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200/80 dark:border-neutral-800 p-6 sm:p-8 space-y-6 shadow-sm">
        {error && (
          <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-300 text-xs font-semibold flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <div className="flex-1">{error}</div>
          </div>
        )}

        {/* 購入前・会員登録前の安全なログイン案内 */}
        {actionParam && (
          <div className="p-4 rounded-2xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800 text-cyan-900 dark:text-cyan-200 text-xs space-y-1.5 shadow-2xs">
            <div className="font-bold flex items-center gap-1.5 text-cyan-700 dark:text-cyan-300">
              <ShieldCheck className="w-4 h-4 shrink-0 text-cyan-600 dark:text-cyan-400" />
              <span>
                {actionParam === "subscribe" ? "プレミアム会員登録の前にログイン" : "有料記事ご購入の前にログイン"}
              </span>
            </div>
            <p className="text-[11px] leading-relaxed text-neutral-600 dark:text-neutral-300">
              安全な決済および購入権限の保護のため、Googleアカウントまたはメールアドレスでログインしてください。購入した記事や会員資格があなたのアカウントに安全に紐づけられ、端末が変わっても追加料金なしでいつでも読めるようになります。
            </p>
          </div>
        )}

        {/* 1. Googleでログイン（最優先） */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isGoogleLoading}
            className="w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-xl bg-white dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-100 font-bold text-sm hover:bg-neutral-50 dark:hover:bg-neutral-750 transition-all shadow-xs disabled:opacity-50 cursor-pointer"
          >
            <GoogleIcon className="w-5 h-5 shrink-0" />
            <span>{isGoogleLoading ? "Google認証中..." : "Googleアカウントでログイン"}</span>
          </button>

        </div>

        {/* 区切り線 */}
        <div className="relative flex items-center justify-center">
          <div className="border-t border-neutral-200 dark:border-neutral-800 w-full" />
          <span className="bg-white dark:bg-neutral-900 px-3 text-[11px] font-medium text-neutral-400">または</span>
        </div>

        {/* 2. メールアドレスでログイン */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-neutral-400" />
              <span>メールアドレス</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="player@example.com"
              className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-sm focus:outline-hidden focus:border-cyan-500 dark:focus:border-cyan-400"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-neutral-400" />
              <span>パスワード（任意・簡易ログイン用）</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-sm focus:outline-hidden focus:border-cyan-500 dark:focus:border-cyan-400"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900 font-bold text-xs sm:text-sm transition-colors shadow-xs disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? "処理中..." : "メールアドレスでログイン"}
          </button>

          {/* 同意事項・プライバシー表記 */}
          <div className="pt-2 text-center text-[11px] text-neutral-400 dark:text-neutral-500 leading-relaxed">
            ログインまたはアカウント作成により、当サイトの{" "}
            <Link href="/privacy" className="text-cyan-600 dark:text-cyan-400 font-semibold underline underline-offset-2 hover:text-cyan-500">
              プライバシーポリシー
            </Link>
            {" "}および{" "}
            <Link href="/legal/tokusho" className="text-neutral-500 dark:text-neutral-400 underline underline-offset-2 hover:text-neutral-700 dark:hover:text-neutral-200">
              特定商取引法に基づく表記
            </Link>
            {" "}に同意したものとみなされます。
          </div>
        </form>

        {/* セキュリティ・安心の明記 */}
        <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] text-neutral-400 dark:text-neutral-500">
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span>SSL/TLS暗号化通信</span>
          </div>
          <div className="flex items-center gap-1">
            <Lock className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
            <span>カード情報非保持（Stripe直接決済）</span>
          </div>
        </div>

        {/* 3. 開発・テスト用クイックデモ切り替え（管理者モードの端末にのみ表示） */}
        {isAdmin && (
          <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 space-y-2.5">
            <div className="flex items-center justify-between text-[11px] font-bold text-amber-600 dark:text-amber-400">
              <span>🔒 管理者用クイックログイン（一般ユーザーには非表示）</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo("free")}
                className="px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 text-xs font-semibold transition-colors text-center cursor-pointer"
              >
                無料会員で入る
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo("premium")}
                className="px-3 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1 shadow-2xs cursor-pointer"
              >
                <Crown className="w-3.5 h-3.5 text-amber-300" />
                <span>プレミアム会員で入る</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* フッターリンク */}
      <div className="text-center text-xs text-neutral-500 dark:text-neutral-400 space-y-2">
        <p>
          まだプレミアム会員になっていませんか？{" "}
          <Link href="/membership" className="text-cyan-600 dark:text-cyan-400 font-bold hover:underline">
            プラン詳細を見る
          </Link>
        </p>
        <Link href="/" className="inline-block text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200">
          ← トップページへ戻る
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center">
          <span className="text-xs text-neutral-400">読み込み中...</span>
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
