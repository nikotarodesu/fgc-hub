"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  Crown, 
  User as UserIcon, 
  Calendar, 
  CreditCard, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Sparkles, 
  BookOpen, 
  RefreshCw, 
  ExternalLink,
  ShieldCheck,
  Flame,
  Swords,
  Calculator,
  LogOut
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { SUBSCRIPTION_CONFIG } from "@/config/subscription";

function SubscriptionContent() {
  const { 
    user, 
    isPremium, 
    cancelSubscription, 
    resumeSubscription, 
    upgradeToPremium, 
    setDemoRole,
    logout 
  } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsAdmin(localStorage.getItem("fgc_admin_mode") === "true" || user?.role === "admin");
    }
  }, [user]);

  // URLパラメータのチェック（Stripe Checkout後のリダイレクト等）
  useEffect(() => {
    if (searchParams.get("upgraded") === "true" || searchParams.get("demo_upgraded") === "true") {
      setActionMessage("プレミアム会員へのご登録が完了いたしました！すべての限定コンテンツをお楽しみください。");
    }
  }, [searchParams]);

  // 解約処理（解約予約）
  const handleCancel = async () => {
    if (!window.confirm("プレミアム会員の次回更新を停止（解約予約）しますか？\n期間満了日までは引き続き全機能をご利用いただけます。")) {
      return;
    }
    setIsProcessing(true);
    try {
      await cancelSubscription();
      setActionMessage("解約予約を受け付けました。現在の契約期間終了日まで引き続きご利用いただけます。");
    } catch (e: any) {
      alert("処理に失敗しました: " + e.message);
    } finally {
      setIsProcessing(false);
    }
  };

  // 解約キャンセル（契約再開）
  const handleResume = async () => {
    setIsProcessing(true);
    try {
      await resumeSubscription();
      setActionMessage("定期更新を再開いたしました。ありがとうございます！");
    } catch (e: any) {
      alert("処理に失敗しました: " + e.message);
    } finally {
      setIsProcessing(false);
    }
  };

  // Stripe カスタマーポータルを開く
  const handleOpenPortal = async () => {
    setIsProcessing(true);
    try {
      const res = await fetch("/api/stripe/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerId: user?.subscription?.stripeCustomerId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.message || "ポータルの起動に失敗しました");
      }
    } catch (e: any) {
      alert("エラーが発生しました: " + e.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const plan = user?.subscription?.plan || "monthly";
  const planInfo = SUBSCRIPTION_CONFIG.pricing[plan];
  const isCanceled = user?.subscription?.status === "canceled";
  const periodEndFormatted = user?.subscription?.currentPeriodEnd
    ? new Date(user.subscription.currentPeriodEnd).toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "なし";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8 sm:space-y-12">
      {/* ページ見出し */}
      <div className="space-y-2 border-b border-neutral-200 dark:border-neutral-800 pb-6">
        <nav className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
          <Link href="/" className="hover:text-neutral-900 dark:hover:text-white">ホーム</Link>
          <span>/</span>
          <span className="text-neutral-900 dark:text-white font-semibold">マイページ・契約管理</span>
        </nav>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-900 dark:text-white">
          マイページ・契約プラン管理
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
          ご登録の会員情報、現在のサブスクリプション状況の確認、解約・変更手続きを行えます。
        </p>
      </div>

      {/* 通知メッセージ */}
      {actionMessage && (
        <div className="p-4 rounded-2xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800 text-cyan-800 dark:text-cyan-300 text-xs sm:text-sm font-semibold flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 shrink-0 text-cyan-600 dark:text-cyan-400" />
            <span>{actionMessage}</span>
          </div>
          <button 
            onClick={() => setActionMessage(null)}
            className="text-xs opacity-70 hover:opacity-100 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* ユーザーアカウント情報 */}
      <div className="bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200/80 dark:border-neutral-800 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative w-14 h-14 rounded-full overflow-hidden bg-neutral-100 dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 flex items-center justify-center shrink-0">
              {user?.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={user.avatarUrl} alt="" className="w-full h-full object-cover" />
              ) : (
                <UserIcon className="w-7 h-7 text-neutral-500" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
                  {user ? user.name : "ゲストユーザー"}
                </h2>
                {user?.role === "admin" ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-2xs">
                    <Crown className="w-3 h-3 fill-current text-amber-300" />
                    <span>管理者（全機能開放中）</span>
                  </span>
                ) : isPremium ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-2xs">
                    <Crown className="w-3 h-3 fill-current" />
                    <span>PREMIUM</span>
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                    無料会員
                  </span>
                )}
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono mt-0.5">
                {user?.email || "ログインしていません"}
              </p>
              {user?.authProvider && (
                <span className="text-[10px] text-neutral-400 dark:text-neutral-500 block mt-1">
                  ログイン方式: {user.authProvider === "google" ? "Googleアカウント" : user.authProvider === "demo" ? "デモアカウント" : "メール認証"}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {user ? (
              <button
                type="button"
                onClick={handleLogout}
                className="w-full sm:w-auto px-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>ログアウト</span>
              </button>
            ) : (
              <Link
                href="/auth/login"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900 text-xs font-bold text-center transition-colors shadow-xs"
              >
                ログイン・会員登録
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* サブスクリプション契約状況 */}
      <div className="bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200/80 dark:border-neutral-800 p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-4">
          <div className="flex items-center gap-2.5">
            <CreditCard className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
            <h2 className="text-lg font-bold text-neutral-900 dark:text-white">
              サブスクリプション状況
            </h2>
          </div>
          {isPremium && (
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
              isCanceled 
                ? "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800"
                : "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800"
            }`}>
              {isCanceled ? "解約予約中" : "契約中（自動更新）"}
            </span>
          )}
        </div>

        {isPremium ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-800 space-y-1">
                <span className="text-[11px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider block">
                  ご契約プラン
                </span>
                <span className="text-base font-bold text-neutral-900 dark:text-white block">
                  プレミアム会員（月額980円）
                </span>
                <span className="text-xs text-neutral-500">
                  全記事・実戦添削・リーサルツール使い放題
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-800 space-y-1">
                <span className="text-[11px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider block">
                  ご利用金額
                </span>
                <span className="text-base font-bold text-neutral-900 dark:text-white block">
                  {planInfo.displayPrice} / {planInfo.periodLabel}
                </span>
                <span className="text-xs text-neutral-500">
                  税込・定期自動請求
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-800 space-y-1">
                <span className="text-[11px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider block">
                  {isCanceled ? "利用可能期限" : "次回更新日"}
                </span>
                <span className="text-base font-bold text-neutral-900 dark:text-white block">
                  {periodEndFormatted}
                </span>
                <span className="text-xs text-neutral-500">
                  {isCanceled ? "この日以降は無料会員へ移行します" : "自動更新予定日"}
                </span>
              </div>
            </div>

            {/* 解約予約中のアラート */}
            {isCanceled && (
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-amber-800 dark:text-amber-300 text-xs sm:text-sm space-y-2">
                <div className="flex items-center gap-2 font-bold">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>解約予約が完了しています</span>
                </div>
                <p className="leading-relaxed">
                  {periodEndFormatted} まではプレミアム全機能をそのままご利用いただけます。期間終了後に自動更新が停止し、無料会員へ移行します。
                </p>
                <button
                  type="button"
                  onClick={handleResume}
                  disabled={isProcessing}
                  className="mt-2 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  定期更新を再開する
                </button>
              </div>
            )}

            {/* 契約変更・解約アクションボタン群 */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              {/* Stripe公式カスタマーポータル */}
              <button
                type="button"
                onClick={handleOpenPortal}
                disabled={isProcessing}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-xs cursor-pointer"
              >
                <span>カード情報・請求履歴の確認（Stripe）</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              {/* 解約予約ボタン（解約予約中でない場合のみ表示） */}
              {!isCanceled && (
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={isProcessing}
                  className="w-full sm:w-auto px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                >
                  次回更新の停止（解約予約）
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-6 sm:py-8 space-y-4">
            <div className="w-12 h-12 rounded-full bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mx-auto">
              <Crown className="w-6 h-6" />
            </div>
            <div className="space-y-1 max-w-md mx-auto">
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                現在は無料会員としてログインしています
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                プレミアム会員に登録すると、全キャラ1800MR攻略記事、実戦添削アーカイブ、逆引きリーサル計算ツールがすべて読み放題になります。
              </p>
            </div>
            <div className="pt-2">
              <Link
                href="/membership"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900 text-xs sm:text-sm font-bold transition-all shadow-xs"
              >
                <Sparkles className="w-4 h-4 text-cyan-500" />
                <span>プレミアム会員プランを見る（¥980/月）</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* プレミアム特典へのクイックアクセス */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          <span>プレミアム会員 限定コンテンツ一覧</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/"
            className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all shadow-xs group"
          >
            <div className="w-9 h-9 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <BookOpen className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-neutral-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
              全キャラ徹底攻略記事
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
              リュウをはじめとする各キャラの立ち回り・コンボ・確定反撃ガイド
            </p>
          </Link>

          <Link
            href="/?type=coaching"
            className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all shadow-xs group"
          >
            <div className="w-9 h-9 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Swords className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-neutral-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
              実戦添削コーチング
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
              伸び悩みの課題をピンポイントで解消するMR帯別リプレイ添削録
            </p>
          </Link>

          <Link
            href="/sf6/ryu/combos"
            className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all shadow-xs group"
          >
            <div className="w-9 h-9 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Calculator className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-neutral-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
              逆引きリーサル計算ツール
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
              残り体力・ドライブゲージ・SAゲージに応じた最適ルートを即座に計算
            </p>
          </Link>
        </div>
      </div>

      {/* 管理者限定: 動作確認用切り替えツール（一般ユーザーには一切非表示） */}
      {isAdmin && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 dark:border-amber-400/20 text-xs space-y-2">
          <div className="flex items-center justify-between text-amber-800 dark:text-amber-300">
            <span className="font-bold flex items-center gap-1.5">
              <span>🔒 管理者専用ツール（一般ユーザーには非表示）</span>
            </span>
            <span className="text-[10px] text-amber-600 dark:text-amber-400">フッターⒸタップ有効時のみ表示</span>
          </div>
          <p className="text-[11px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
            ※このパネルは管理者モード（フッターの©を10回タップした端末）にのみ表示されます。一般の無料会員・プレミアム会員には一切表示されません。
          </p>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => setDemoRole("free")}
              className="px-3 py-1.5 rounded-lg bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 font-semibold cursor-pointer hover:bg-neutral-50 shadow-2xs"
            >
              無料会員画面をテスト
            </button>
            <button
              type="button"
              onClick={() => setDemoRole("premium", "monthly")}
              className="px-3 py-1.5 rounded-lg bg-cyan-600 text-white font-bold cursor-pointer hover:bg-cyan-700 shadow-2xs"
            >
              プレミアム会員画面をテスト
            </button>
            <button
              type="button"
              onClick={() => {
                try {
                  localStorage.removeItem("fgc_admin_mode");
                  localStorage.removeItem("fgc_membership_token");
                  window.dispatchEvent(new CustomEvent("fgc_admin_mode_changed", { detail: { enabled: false } }));
                } catch {}
                logout();
              }}
              className="px-3 py-1.5 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-semibold cursor-pointer hover:opacity-90 shadow-2xs"
            >
              管理者モードを終了（一般画面へ）
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SubscriptionManagementPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center">
          <span className="text-xs text-neutral-400">読み込み中...</span>
        </div>
      }
    >
      <SubscriptionContent />
    </Suspense>
  );
}
