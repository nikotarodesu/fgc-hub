'use client';

import { Lock, CreditCard } from 'lucide-react';

interface PaywallCardProps {
  price?: number;
  isUnlocked: boolean;
  onToggleUnlock: () => void;
  onBuyArticle: () => void;
  onJoinMembership: () => void;
}

export default function PaywallCard({
  price = 500,
  isUnlocked,
  onToggleUnlock,
  onBuyArticle,
  onJoinMembership,
}: PaywallCardProps) {
  if (isUnlocked) {
    return (
      <div className="my-6 p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
          <span className="text-xs font-semibold">【プレミアム閲覧中】有料限定の全コンテンツ（添削・解説・Q&A）を表示しています</span>
        </div>
        <button
          onClick={onToggleUnlock}
          className="text-xs text-neutral-500 hover:text-neutral-900 underline font-medium shrink-0 cursor-pointer"
        >
          （デモ：未購入状態に戻す）
        </button>
      </div>
    );
  }

  return (
    <div className="relative mt-8 mb-12">
      {/* ぼかしグラデーション */}
      <div className="absolute -top-24 left-0 right-0 h-24 bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none" />

      <div className="relative rounded-2xl bg-white border border-neutral-200/90 p-6 sm:p-8 shadow-sm text-center max-w-xl mx-auto">
        <div className="w-10 h-10 rounded-full bg-neutral-100 mx-auto flex items-center justify-center text-neutral-700 mb-3">
          <Lock className="w-5 h-5" />
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-neutral-900 mb-1.5">
          この続きは有料エリアです
        </h3>
        <p className="text-xs text-neutral-600 max-w-md mx-auto mb-6 leading-relaxed font-normal">
          勝率を直結させる「起き攻めフレーム表」「厳選コンボ」「詐欺飛び・確定反撃集」「BO時削り連携」を完全収録しています。
        </p>

        {/* 料金・購入ボタンカード */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-left mb-5">
          {/* 単体購入 */}
          <div className="p-4.5 rounded-xl bg-neutral-50 border border-neutral-200 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider block mb-1">
                この記事を購入
              </span>
              <div className="text-xl font-bold text-neutral-900 mb-2">
                ¥{price.toLocaleString()} <span className="text-xs font-normal text-neutral-500">（買い切り）</span>
              </div>
              <p className="text-[11px] text-neutral-500 mb-4 leading-relaxed">
                追加料金なしでアプデ追記も含め永久閲覧できます。
              </p>
            </div>
            <button
              onClick={onBuyArticle}
              className="w-full py-2.5 px-3 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>記事を購入する</span>
            </button>
          </div>

          {/* 月額サブスク */}
          <div className="p-4.5 rounded-xl bg-neutral-950 text-white relative flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">
                  月額マガジン
                </span>
                <span className="text-[10px] font-semibold bg-white/20 text-white px-2 py-0.2 rounded">
                  おすすめ
                </span>
              </div>
              <div className="text-xl font-bold text-white mb-2">
                ¥980 <span className="text-xs font-normal text-neutral-400">/ 月</span>
              </div>
              <p className="text-[11px] text-neutral-300 mb-4 leading-relaxed">
                スト6全キャラ攻略＆立ち回り解説がすべて読み放題。
              </p>
            </div>
            <button
              onClick={onJoinMembership}
              className="w-full py-2.5 px-3 rounded-lg bg-white hover:bg-neutral-100 text-neutral-950 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>マガジンに入会</span>
            </button>
          </div>
        </div>

        {/* デモ用テストスイッチ */}
        <div className="pt-2.5 border-t border-neutral-100 flex items-center justify-center gap-2 text-xs text-neutral-400">
          <span>（動作確認用）</span>
          <button
            onClick={onToggleUnlock}
            className="text-neutral-700 hover:underline font-medium cursor-pointer"
          >
            【デモ】ワンクリックで購入後表示をテスト
          </button>
        </div>
      </div>
    </div>
  );
}
