'use client';

import { useState, useRef, useEffect } from 'react';
import { Lock, CreditCard, KeyRound, CheckCircle2, Loader2, Trophy, ExternalLink, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface PaywallCardProps {
  price?: number;
  isUnlocked: boolean;
  isAdminMode?: boolean;
  userEmail?: string | null;
  isCheckingAuth?: boolean;
  forceShowTokenInput?: boolean;
  onToggleUnlock?: () => void;
  onAdminUnlock?: () => void;
  onAdminLock?: () => void;
  onBuyArticle?: () => void;
  onJoinMembership: () => void;
  onApplyToken?: (token: string) => Promise<boolean>;
  subscriptionOnly?: boolean;
  hideBenefits?: boolean;
  description?: string;
}

export default function PaywallCard({
  price = 500,
  isUnlocked,
  isAdminMode = false,
  userEmail,
  isCheckingAuth = false,
  forceShowTokenInput = false,
  onToggleUnlock,
  onAdminUnlock,
  onAdminLock,
  onBuyArticle,
  onJoinMembership,
  onApplyToken,
  subscriptionOnly = false,
  hideBenefits = false,
  description,
}: PaywallCardProps) {
  const { user } = useAuth();
  const [showTokenInput, setShowTokenInput] = useState(false);
  const [inputToken, setInputToken] = useState('');
  const [tokenLoading, setTokenLoading] = useState(false);
  const [tokenError, setTokenError] = useState<string | null>(null);

  // 外部からの展開トリガー（ページ冒頭の「購入済みの方はこちら」リンククリック時等）
  useEffect(() => {
    if (forceShowTokenInput) {
      setShowTokenInput(true);
    }
  }, [forceShowTokenInput]);

  const handleTokenSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputToken.trim() || !onApplyToken) return;

    setTokenLoading(true);
    setTokenError(null);
    try {
      const ok = await onApplyToken(inputToken.trim());
      if (!ok) {
        setTokenError('無効なトークンまたは別の記事用のトークンです');
      }
    } catch {
      setTokenError('トークンの検証に失敗しました');
    } finally {
      setTokenLoading(false);
    }
  };

  // 南京錠イースターエッグ（3秒以内に素早く10回連続タップ）
  const tapCountRef = useRef(0);
  const resetTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleLockIconClick = () => {
    if (!onAdminUnlock && !onToggleUnlock) return;

    if (!resetTimerRef.current) {
      resetTimerRef.current = setTimeout(() => {
        tapCountRef.current = 0;
        resetTimerRef.current = null;
      }, 3000);
    }

    tapCountRef.current += 1;

    if (tapCountRef.current >= 10) {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
        resetTimerRef.current = null;
      }
      tapCountRef.current = 0;

      if (onAdminUnlock) {
        onAdminUnlock();
      } else if (onToggleUnlock) {
        onToggleUnlock();
      }
    }
  };

  const handleResetLock = () => {
    if (onAdminLock) {
      onAdminLock();
    } else if (onToggleUnlock) {
      onToggleUnlock();
    }
  };

  // 認証検証中のチラつき防止プレースホルダー
  if (isCheckingAuth) {
    return (
      <div className="relative mt-8 mb-12">
        <div className="rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 p-8 text-center max-w-xl mx-auto shadow-sm">
          <div className="flex flex-col items-center justify-center gap-3 py-6">
            <Loader2 className="w-6 h-6 animate-spin text-cyan-600 dark:text-cyan-400" />
            <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
              閲覧権限を確認中...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isUnlocked) {
    if (isAdminMode) {
      return (
        <div className="my-6 p-4 rounded-xl bg-neutral-900 text-white dark:bg-neutral-800 border border-cyan-500/50 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md animate-in fade-in duration-200">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shrink-0" />
            <span className="text-neutral-200">
              <strong className="text-cyan-400">シークレット解放中（note購入者特典 / 管理者モード）:</strong> 有料限定コンテンツを全文表示しています
            </span>
          </div>
          <button
            type="button"
            onClick={handleResetLock}
            className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white text-xs font-semibold border border-neutral-600 transition-colors cursor-pointer shrink-0"
          >
            通常表示（ロック状態）に戻す
          </button>
        </div>
      );
    }

    return (
      <div className="my-6 p-4 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-neutral-900 dark:text-neutral-100 flex items-center gap-2 text-xs font-semibold shadow-xs">
        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
        <span>
          {subscriptionOnly
            ? '【会員認証完了】プレミアム会員限定コンテンツを表示中'
            : '【購入認証完了】有料限定の全コンテンツを表示中'}
          {userEmail ? `（購入者: ${userEmail}）` : ''}
        </span>
      </div>
    );
  }

  return (
    <div id="paywall-card" className="relative mt-8 mb-12">
      {/* ぼかしグラデーション */}
      <div className="absolute -top-24 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-neutral-900 via-white/90 dark:via-neutral-900/90 to-transparent pointer-events-none" />

      <div className="relative rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 p-6 sm:p-8 shadow-sm text-center max-w-xl mx-auto">
        <button
          type="button"
          onClick={handleLockIconClick}
          className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 mx-auto flex items-center justify-center text-neutral-700 dark:text-neutral-300 mb-3 cursor-pointer select-none active:scale-95 transition-transform"
          aria-label="ロックアイコン"
        >
          <Lock className="w-5 h-5" />
        </button>

        <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white mb-2">
          この続きは有料エリアです
        </h3>
        <p className="text-sm text-neutral-700 dark:text-neutral-300 max-w-md mx-auto mb-5 leading-relaxed">
          {description ||
            '勝率に直結する「起き攻めフレーム表」「画面中央・画面端の実戦向け厳選コンボ」「詐欺飛び・確定反撃集」「BO時削り連携」を収録しています（クラシック・モダン両対応／一度の購入で両方閲覧可能）。'}
        </p>

        {/* 執筆者の実績・note大会2連覇の信頼性 */}
        <div className="mb-4 p-3.5 sm:p-4 rounded-xl bg-gradient-to-br from-amber-50/80 via-white to-amber-50/60 dark:from-amber-950/40 dark:via-neutral-900 dark:to-neutral-900 border border-amber-300/80 dark:border-amber-800/60 text-left shadow-2xs">
          <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-amber-200/60 dark:border-amber-900/40">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 dark:text-amber-300">
              <Trophy className="w-4 h-4 text-amber-600 dark:text-amber-400 fill-current shrink-0" />
              <span>多くの格ゲーマーに選ばれる信頼の攻略記事</span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-200/60 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 shrink-0 border border-amber-300/60 dark:border-amber-700/60">
              著：にこ太郎
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-neutral-800 dark:text-neutral-200 mb-3">
            <div className="bg-white/90 dark:bg-neutral-800/90 p-2 rounded-lg border border-amber-200/60 dark:border-neutral-700">
              <div className="text-[10px] text-neutral-500 dark:text-neutral-400 font-medium">大会実績</div>
              <div className="font-extrabold text-amber-700 dark:text-amber-400 text-xs">note大会 2連覇🏆</div>
            </div>
            <div className="bg-white/90 dark:bg-neutral-800/90 p-2 rounded-lg border border-amber-200/60 dark:border-neutral-700">
              <div className="text-[10px] text-neutral-500 dark:text-neutral-400 font-medium">スト6実力</div>
              <div className="font-extrabold text-neutral-900 dark:text-white text-xs">全キャラ 1800MR+</div>
            </div>
            <div className="bg-white/90 dark:bg-neutral-800/90 p-2 rounded-lg border border-amber-200/60 dark:border-neutral-700">
              <div className="text-[10px] text-neutral-500 dark:text-neutral-400 font-medium">note累計販売</div>
              <div className="font-extrabold text-neutral-900 dark:text-white text-xs">2,000部以上突破</div>
            </div>
            <div className="bg-white/90 dark:bg-neutral-800/90 p-2 rounded-lg border border-amber-200/60 dark:border-neutral-700">
              <div className="text-[10px] text-neutral-400 dark:text-neutral-500 font-medium">noteフォロワー</div>
              <div className="font-extrabold text-neutral-900 dark:text-white text-xs">2,500人</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-neutral-600 dark:text-neutral-400 pt-1">
            <span className="text-[10px] text-amber-800 dark:text-amber-300 font-medium">note大会 優勝記事：</span>
            <div className="flex items-center gap-2">
              <a
                href="https://note.com/nikotarosun/n/n081a67f53aa8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] text-amber-900 dark:text-amber-200 hover:text-amber-600 dark:hover:text-white font-semibold underline"
              >
                <span>優勝記事① ↗</span>
              </a>
              <span className="text-neutral-300 dark:text-neutral-600">|</span>
              <a
                href="https://note.com/nikotarosun/n/nbaad82557ae9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] text-amber-900 dark:text-amber-200 hover:text-amber-600 dark:hover:text-white font-semibold underline"
              >
                <span>優勝記事② ↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* 有料部分で手に入るもの（有料移行のメリット） */}
        {!hideBenefits && (
          <div className="mb-5 p-4 rounded-xl bg-neutral-100/80 dark:bg-neutral-800 border border-neutral-200/90 dark:border-neutral-700 text-left text-xs space-y-2">
            <div className="text-xs font-bold text-neutral-900 dark:text-white flex items-center gap-1.5 mb-2 pb-1.5 border-b border-neutral-200/60 dark:border-neutral-700/60">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>有料限定エリアで手に入るメリット:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-[13px] text-neutral-800 dark:text-neutral-100">
              <div className="flex items-start gap-2 bg-white/70 dark:bg-neutral-900/70 p-2.5 rounded-lg border border-neutral-200/50 dark:border-neutral-700/50">
                <span className="text-emerald-600 dark:text-emerald-400 font-black shrink-0">✓</span>
                <span className="leading-snug">主要な有利フレーム別に起き攻めを整理</span>
              </div>
              <div className="flex items-start gap-2 bg-white/70 dark:bg-neutral-900/70 p-2.5 rounded-lg border border-neutral-200/50 dark:border-neutral-700/50">
                <span className="text-amber-600 dark:text-amber-400 font-black shrink-0">✓</span>
                <span className="leading-snug">画面中央・画面端・倒し切りに使える実戦向け厳選コンボ</span>
              </div>
              <div className="flex items-start gap-2 bg-white/70 dark:bg-neutral-900/70 p-2.5 rounded-lg border border-neutral-200/50 dark:border-neutral-700/50">
                <span className="text-cyan-600 dark:text-cyan-400 font-black shrink-0">✓</span>
                <span className="leading-snug">逆引きリーサルツール使用可能＆実戦動画付き</span>
              </div>
              <div className="flex items-start gap-2 bg-white/70 dark:bg-neutral-900/70 p-2.5 rounded-lg border border-neutral-200/50 dark:border-neutral-700/50">
                <span className="text-indigo-600 dark:text-indigo-400 font-black shrink-0">✓</span>
                <span className="leading-snug">今後のバージョンアップ・キャラ調整時も<strong className="text-neutral-900 dark:text-white font-bold">追加料金なしで追記</strong></span>
              </div>
            </div>
          </div>
        )}

        {/* 料金・購入ボタンカード */}
        {subscriptionOnly ? (
          <div className="max-w-md mx-auto mb-5 text-left">
            <div className="p-5 sm:p-6 rounded-2xl bg-neutral-950 dark:bg-neutral-800 text-white relative flex flex-col justify-between shadow-sm border border-neutral-800 dark:border-neutral-700">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                    プレミアム会員限定
                  </span>
                  <span className="text-[11px] font-semibold bg-cyan-500/20 text-cyan-300 px-2.5 py-0.5 rounded-full border border-cyan-500/30">
                    読み放題
                  </span>
                </div>
                <div className="text-2xl font-bold text-white mb-2">
                  ¥980 <span className="text-sm font-normal text-neutral-400">/ 月</span>
                </div>
                <p className="text-sm text-neutral-300 dark:text-neutral-400 mb-5 leading-relaxed">
                  本記事の実戦添削をはじめ、公開中のキャラ攻略・立ち回り解説・コーチング記事がすべて読み放題。
                </p>
              </div>
              <button
                type="button"
                onClick={onJoinMembership}
                className="w-full py-3 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm active:scale-95"
              >
                <span>プレミアム会員に入会して続きを読む</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-left mb-5">
            {/* 単体購入 */}
            <div className="p-5 rounded-xl bg-neutral-50 dark:bg-neutral-800/70 border border-neutral-200 dark:border-neutral-700/80 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider block mb-1">
                  この記事を購入
                </span>
                <div className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                  ¥{price.toLocaleString()}{' '}
                  <span className="text-sm font-bold text-neutral-600 dark:text-neutral-400">（買い切り）</span>
                </div>
                <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-3 leading-relaxed font-normal">
                  クラシック・モダン両対応（1回の購入で両方閲覧可能）。今後のアップデート追記も含め追加料金なしで閲覧できます。
                </p>

                {!user ? (
                  <div className="mb-3.5 p-2.5 rounded-lg bg-cyan-50/80 dark:bg-cyan-950/40 border border-cyan-200/80 dark:border-cyan-800/80 text-[11px] text-cyan-900 dark:text-cyan-200 leading-snug flex items-start gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-cyan-600 dark:text-cyan-400 mt-0.5" />
                    <span>
                      <strong>PC・スマホ端末間同期：</strong>購入ボタンを押すとログイン画面へ進みます。ログインして購入することで、別端末でも追加料金なしでいつでも読めるようになります。
                    </span>
                  </div>
                ) : (
                  <div className="mb-3.5 p-2 rounded-lg bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/80 text-[11px] text-emerald-800 dark:text-emerald-300 leading-snug flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    <span className="truncate">
                      <strong>{user.email}</strong> で購入（端末間同期対応）
                    </span>
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={onBuyArticle}
                className="w-full py-3 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-900 font-bold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <CreditCard className="w-4 h-4" />
                <span>{user ? "記事を購入する" : "ログインして記事を購入"}</span>
              </button>
            </div>

            {/* 月額サブスク */}
            <div className="p-5 rounded-xl bg-neutral-950 dark:bg-neutral-800 text-white relative flex flex-col justify-between shadow-xs border border-neutral-800 dark:border-neutral-700">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                    プレミアム会員
                  </span>
                  <span className="text-[11px] font-semibold bg-white/20 text-white px-2 py-0.5 rounded">
                    おすすめ
                  </span>
                </div>
                <div className="text-2xl font-bold text-white mb-2">
                  ¥980 <span className="text-sm font-normal text-neutral-400">/ 月</span>
                </div>
                <p className="text-sm text-neutral-300 dark:text-neutral-400 mb-4 leading-relaxed">
                  公開中のキャラ攻略・立ち回り解説・コーチング記事がすべて読み放題。
                </p>
              </div>
              <button
                type="button"
                onClick={onJoinMembership}
                className="w-full py-3 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>プレミアム会員に入会</span>
              </button>
            </div>
          </div>
        )}

        {/* 閲覧用トークン入力アコーディオン */}
        <div className="pt-4 border-t border-neutral-200/80 dark:border-neutral-800 text-xs sm:text-sm">
          {!showTokenInput ? (
            <button
              type="button"
              onClick={() => setShowTokenInput(true)}
              className="inline-flex items-center gap-1.5 text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white font-semibold transition-colors cursor-pointer py-1"
            >
              <KeyRound className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
              <span>購入済みの方はこちら</span>
            </button>
          ) : (
            <form onSubmit={handleTokenSubmit} className="space-y-3 max-w-md mx-auto text-left">
              <div className="space-y-1">
                <label className="block text-xs sm:text-sm font-bold text-neutral-800 dark:text-neutral-200">
                  購入メールまたは完了画面に表示された閲覧トークンを入力：
                </label>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  購入完了メールに記載された「閲覧用URL」を開いていただくか、メール内の「閲覧トークン」を下記に入力することで、いつでも閲覧を再開できます。
                  <span className="block mt-0.5 text-[11px] text-neutral-500 dark:text-neutral-400">
                    ※一度認証すると、同じブラウザでは次回以降自動的に閲覧可能になります。
                  </span>
                </p>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputToken}
                  onChange={(e) => setInputToken(e.target.value)}
                  placeholder="トークンをペースト..."
                  className="flex-1 px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs sm:text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-cyan-600 font-mono"
                />
                <button
                  type="submit"
                  disabled={tokenLoading || !inputToken.trim()}
                  className="px-4 py-2 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-xs sm:text-sm font-bold disabled:opacity-50 cursor-pointer flex items-center gap-1.5 shrink-0"
                >
                  {tokenLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : '認証'}
                </button>
              </div>
              {tokenError && (
                <p className="text-xs text-rose-600 dark:text-rose-400 font-medium">
                  {tokenError}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
