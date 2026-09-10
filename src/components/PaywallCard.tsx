'use client';

import { useState, useRef } from 'react';
import { Lock, CreditCard, KeyRound, CheckCircle2, Loader2, Trophy, ExternalLink } from 'lucide-react';

interface PaywallCardProps {
  price?: number;
  isUnlocked: boolean;
  isAdminMode?: boolean;
  userEmail?: string | null;
  onToggleUnlock?: () => void;
  onAdminUnlock?: () => void;
  onAdminLock?: () => void;
  onBuyArticle: () => void;
  onJoinMembership: () => void;
  onApplyToken?: (token: string) => Promise<boolean>;
}

export default function PaywallCard({
  price = 500,
  isUnlocked,
  isAdminMode = false,
  userEmail,
  onToggleUnlock,
  onAdminUnlock,
  onAdminLock,
  onBuyArticle,
  onJoinMembership,
  onApplyToken,
}: PaywallCardProps) {
  const [showTokenInput, setShowTokenInput] = useState(false);
  const [inputToken, setInputToken] = useState('');
  const [tokenLoading, setTokenLoading] = useState(false);
  const [tokenError, setTokenError] = useState<string | null>(null);

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

  if (isUnlocked) {
    if (isAdminMode) {
      return (
        <div className="my-6 p-4 rounded-xl bg-neutral-900 text-white dark:bg-neutral-850 border border-cyan-500/50 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md animate-in fade-in duration-200">
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
          【購入認証完了】有料限定の全コンテンツ（クラシック・モダン両対応）を表示中
          {userEmail ? `（購入者: ${userEmail}）` : ''}
        </span>
      </div>
    );
  }

  return (
    <div className="relative mt-8 mb-12">
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

        <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white mb-1.5">
          この続きは有料エリアです
        </h3>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 max-w-md mx-auto mb-5 leading-relaxed font-normal">
          勝率を直結させる「起き攻めフレーム表」「厳選コンボ」「詐欺飛び・確定反撃集」「BO時削り連携」を完全収録しています（クラシック・モダン両対応／一度の購入で両方閲覧可能）。
        </p>

        {/* 執筆者の実績・note大会2連覇の信頼性 */}
        <div className="mb-4 p-3.5 sm:p-4 rounded-xl bg-gradient-to-br from-amber-50/80 via-white to-amber-50/60 dark:from-amber-950/30 dark:via-neutral-900 dark:to-amber-950/20 border border-amber-300/80 dark:border-amber-800/60 text-left shadow-2xs">
          <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-amber-200/60 dark:border-amber-900/40">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 dark:text-amber-300">
              <Trophy className="w-4 h-4 text-amber-600 dark:text-amber-400 fill-current shrink-0" />
              <span>多くの格ゲーマーに選ばれる信頼の攻略本</span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-200/60 dark:bg-amber-800 text-amber-900 dark:text-amber-100 shrink-0">
              著：にこ太郎
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-neutral-800 dark:text-neutral-200 mb-3">
            <div className="bg-white/80 dark:bg-neutral-850 p-2 rounded-lg border border-amber-200/50 dark:border-amber-900/30">
              <div className="text-[10px] text-neutral-400 dark:text-neutral-500 font-medium">大会実績</div>
              <div className="font-extrabold text-amber-700 dark:text-amber-400 text-xs">note大会 2連覇🏆</div>
            </div>
            <div className="bg-white/80 dark:bg-neutral-850 p-2 rounded-lg border border-amber-200/50 dark:border-amber-900/30">
              <div className="text-[10px] text-neutral-400 dark:text-neutral-500 font-medium">スト6実力</div>
              <div className="font-extrabold text-neutral-900 dark:text-white text-xs">全キャラ 1800MR+</div>
            </div>
            <div className="bg-white/80 dark:bg-neutral-850 p-2 rounded-lg border border-amber-200/50 dark:border-amber-900/30">
              <div className="text-[10px] text-neutral-400 dark:text-neutral-500 font-medium">note累計販売</div>
              <div className="font-extrabold text-neutral-900 dark:text-white text-xs">2,000部以上突破</div>
            </div>
            <div className="bg-white/80 dark:bg-neutral-850 p-2 rounded-lg border border-amber-200/50 dark:border-amber-900/30">
              <div className="text-[10px] text-neutral-400 dark:text-neutral-500 font-medium">noteフォロワー</div>
              <div className="font-extrabold text-neutral-900 dark:text-white text-xs">2,500人</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-neutral-600 dark:text-neutral-400 pt-1">
            <span className="text-[10px] text-amber-800 dark:text-amber-300 font-medium">note公式大会 優勝記事：</span>
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

        {/* 有料部分で手に入るもの（5大リターン） */}
        <div className="mb-5 p-3 sm:p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-850 border border-neutral-200/80 dark:border-neutral-800 text-left text-xs space-y-1.5">
          <div className="text-[11px] font-bold text-neutral-800 dark:text-neutral-200 flex items-center gap-1 mb-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>この記事・マガジンで手に入るもの:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] text-neutral-700 dark:text-neutral-300">
            <div className="flex items-start gap-1.5">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold shrink-0">✓</span>
              <span>全フレーム状況別（+3F〜+45F）起き攻め完全網羅</span>
            </div>
            <div className="flex items-start gap-1.5">
              <span className="text-cyan-600 dark:text-cyan-400 font-bold shrink-0">✓</span>
              <span>リーサル逆引きツールが即座に使える</span>
            </div>
            <div className="flex items-start gap-1.5">
              <span className="text-amber-600 dark:text-amber-400 font-bold shrink-0">✓</span>
              <span>中央・端・リーサルの最大火力コンボレシピ</span>
            </div>
            <div className="flex items-start gap-1.5">
              <span className="text-purple-600 dark:text-purple-400 font-bold shrink-0">✓</span>
              <span>実戦GIF動画＆動画解説付きで迷わない</span>
            </div>
            <div className="flex items-start gap-1.5 sm:col-span-2 text-neutral-600 dark:text-neutral-400">
              <span className="text-indigo-600 dark:text-indigo-400 font-bold shrink-0">✓</span>
              <span>今後のバージョンアップ・キャラ調整時も<strong>永久に無料追記</strong></span>
            </div>
          </div>
        </div>

        {/* 料金・購入ボタンカード */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-left mb-5">
          {/* 単体購入 */}
          <div className="p-4.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/70 border border-neutral-200 dark:border-neutral-700/80 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider block mb-1">
                この記事を購入
              </span>
              <div className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                ¥{price.toLocaleString()} <span className="text-xs font-normal text-neutral-500">（買い切り）</span>
              </div>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mb-4 leading-relaxed">
                クラシック・モダン両対応（1回の購入で両方読み放題）。アプデ追記も含め永久閲覧できます。
              </p>
            </div>
            <button
              type="button"
              onClick={onBuyArticle}
              className="w-full py-2.5 px-3 rounded-lg bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-900 font-medium text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>記事を購入する</span>
            </button>
          </div>

          {/* 月額サブスク */}
          <div className="p-4.5 rounded-xl bg-neutral-950 dark:bg-neutral-800 text-white relative flex flex-col justify-between shadow-xs border border-neutral-800 dark:border-neutral-700">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">
                  月額マガジン
                </span>
                <span className="text-[10px] font-semibold bg-white/20 text-white px-2 py-0.5 rounded">
                  おすすめ
                </span>
              </div>
              <div className="text-xl font-bold text-white mb-2">
                ¥980 <span className="text-xs font-normal text-neutral-400">/ 月</span>
              </div>
              <p className="text-[11px] text-neutral-300 dark:text-neutral-400 mb-4 leading-relaxed">
                スト6全キャラ攻略＆立ち回り解説がすべて読み放題。
              </p>
            </div>
            <button
              type="button"
              onClick={onJoinMembership}
              className="w-full py-2.5 px-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>マガジンに入会</span>
            </button>
          </div>
        </div>

        {/* 閲覧用トークン入力アコーディオン */}
        <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 text-xs">
          {!showTokenInput ? (
            <button
              type="button"
              onClick={() => setShowTokenInput(true)}
              className="inline-flex items-center gap-1.5 text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-white transition-colors cursor-pointer"
            >
              <KeyRound className="w-3.5 h-3.5 text-cyan-600" />
              <span>購入メールに届いた閲覧トークンをお持ちの方はこちら</span>
            </button>
          ) : (
            <form onSubmit={handleTokenSubmit} className="space-y-2 max-w-sm mx-auto text-left">
              <label className="block text-[11px] font-medium text-neutral-600 dark:text-neutral-400">
                購入メールまたは完了画面に表示された閲覧トークンを入力：
              </label>
              <div className="flex gap-1.5">
                <input
                  type="text"
                  value={inputToken}
                  onChange={(e) => setInputToken(e.target.value)}
                  placeholder="トークンをペースト..."
                  className="flex-1 px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-cyan-600 font-mono"
                />
                <button
                  type="submit"
                  disabled={tokenLoading || !inputToken.trim()}
                  className="px-3 py-1.5 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-xs font-bold disabled:opacity-50 cursor-pointer flex items-center gap-1"
                >
                  {tokenLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : '認証'}
                </button>
              </div>
              {tokenError && (
                <p className="text-[11px] text-rose-600 dark:text-rose-400 font-medium">
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
