'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, ArrowRight, BookOpen, Sparkles, Mail, Loader2 } from 'lucide-react';

interface SessionData {
  paid: boolean;
  email: string;
  slug: string;
  title: string;
  planType: 'article' | 'membership';
  token: string;
  unlockUrl: string;
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const slugParam = searchParams.get('slug') || 'ryu-complete-guide';

  const [loading, setLoading] = useState(true);
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSession() {
      try {
        if (!sessionId) {
          setLoading(false);
          return;
        }

        const res = await fetch(`/api/checkout/session?session_id=${sessionId}&slug=${encodeURIComponent(slugParam)}`);
        const data = await res.json();

        if (res.ok && data.paid) {
          setSessionData(data);
          // ローカルストレージにトークンを保存し、次回アクセス時も自動アンロック（クラシック・モダン相互連動）
          if (data.token) {
            const relatedSlugs = data.slug.includes('ryu')
              ? ['ryu-complete-guide', 'ryu-classic-complete-guide', 'ryu-modern-complete-guide']
              : [data.slug];
            relatedSlugs.forEach((s) => {
              localStorage.setItem(`fgc_unlocked_${s}`, data.token);
            });
            if (data.planType === 'membership') {
              localStorage.setItem('fgc_membership_token', data.token);
            }
          }
          if (data.email) {
            localStorage.setItem('fgc_user_email', data.email);
          }
        } else {
          setError(data.error || 'セッション情報の確認に失敗しました');
        }
      } catch {
        setError('決済情報の同期中にエラーが発生しました');
      } finally {
        setLoading(false);
      }
    }

    fetchSession();
  }, [sessionId, slugParam]);

  const targetUrl = sessionData?.unlockUrl || `/articles/${slugParam}`;

  return (
    <div className="max-w-lg w-full bg-white dark:bg-neutral-900 p-8 sm:p-10 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-sm text-center">
      <div className="w-14 h-14 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4">
        <CheckCircle2 className="w-8 h-8" />
      </div>

      <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white mb-2">
        ご購入ありがとうございます！
      </h1>

      <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
        決済が正常に完了しました。購入されたコンテンツの閲覧権限がこのブラウザに即時付与されています。
      </p>

      {loading ? (
        <div className="py-8 flex flex-col items-center justify-center gap-3 text-neutral-500">
          <Loader2 className="w-6 h-6 animate-spin text-cyan-600" />
          <span className="text-xs">閲覧トークンを発行中...</span>
        </div>
      ) : (
        <div className="space-y-4 mb-6 text-left">
          {sessionData && (
            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-700/80 space-y-2 text-xs text-neutral-700 dark:text-neutral-300">
              <div className="flex items-center justify-between font-semibold text-neutral-900 dark:text-white pb-2 border-b border-neutral-200/60 dark:border-neutral-700/60">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-cyan-600" />
                  <span>{sessionData.title}</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 font-bold">
                  閲覧可能
                </span>
              </div>

              {sessionData.email && (
                <div className="flex items-start gap-2 pt-1">
                  <Mail className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="text-neutral-500 dark:text-neutral-400 text-[11px]">送信先メールアドレス:</span>
                    <p className="font-mono text-neutral-900 dark:text-white font-medium">{sessionData.email}</p>
                  </div>
                </div>
              )}

              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 pt-1 leading-relaxed">
                ※専用の閲覧トークンURLを記載した購入完了メールもお送りしています。別の端末（スマホやタブレット）でもメール内のURLからご覧いただけます。
              </p>
            </div>
          )}

          {error && (
            <div className="p-3 rounded-lg bg-rose-50 text-rose-700 text-xs font-medium">
              {error}
            </div>
          )}

          {/* 今すぐ読むプライマリCTAボタン */}
          <Link
            href={targetUrl}
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl text-sm font-bold bg-cyan-600 hover:bg-cyan-700 text-white shadow-sm transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>記事を今すぐ読む（自動アンロック）</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex flex-col gap-2 text-center">
        <Link
          href="/"
          className="text-xs text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
        >
          トップページへ戻る
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 bg-[#f8fafc] dark:bg-neutral-950 transition-colors">
      <Suspense fallback={
        <div className="max-w-md w-full bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-neutral-200 text-center">
          <Loader2 className="w-6 h-6 animate-spin mx-auto text-cyan-600" />
        </div>
      }>
        <SuccessContent />
      </Suspense>
    </div>
  );
}