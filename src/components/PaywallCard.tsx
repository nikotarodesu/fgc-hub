'use client';

import { Lock, Sparkles, CheckCircle2, CreditCard } from 'lucide-react';

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
      <div className="my-6 p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-emerald-950 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2.5">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="text-xs font-bold">【プレミアム閲覧中】有料限定の全コンテンツ（動画・添削・Q&A）を表示しています</span>
        </div>
        <button
          onClick={onToggleUnlock}
          className="text-xs text-neutral-500 hover:text-neutral-900 underline font-semibold shrink-0 cursor-pointer"
        >
          （デモ：未購入状態に戻す）
        </button>
      </div>
    );
  }

  return (
    <div className="relative mt-8 mb-12">
      {/* ぼかしグラデーション */}
      <div className="absolute -top-28 left-0 right-0 h-28 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />

      <div className="relative rounded-3xl bg-white border-2 border-sky-100 p-6 sm:p-8 shadow-lg shadow-sky-500/5 text-center max-w-xl mx-auto">
        <div className="w-12 h-12 rounded-full bg-sky-50 border-2 border-sky-200 mx-auto flex items-center justify-center text-[#00a3c4] mb-3 shadow-xs">
          <Lock className="w-6 h-6" />
        </div>

        <h3 className="text-lg sm:text-xl font-black text-neutral-900 mb-1.5">
          この続きは有料エリアです
        </h3>
        <p className="text-xs text-neutral-600 max-w-md mx-auto mb-6 leading-relaxed font-medium">
          実戦添削動画、勝率を直結させる「セットプレイ手順」「有利フレームの技選択」「お悩み相談Q&A」を解説しています。
        </p>

        {/* 料金・購入ボタンカード */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-left mb-5">
          {/* 単体購入 */}
          <div className="p-4.5 rounded-2xl bg-neutral-50 border border-neutral-200 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mb-1">
                この記事を購入
              </span>
              <div className="text-xl font-black text-neutral-900 mb-2">
                ¥{price.toLocaleString()} <span className="text-xs font-normal text-neutral-500">（買い切り）</span>
              </div>
              <p className="text-[11px] text-neutral-500 mb-4 leading-relaxed">
                追加料金なしでアプデ追記も含め永久閲覧できます。
              </p>
            </div>
            <button
              onClick={onBuyArticle}
              className="w-full py-2.5 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>記事を購入する</span>
            </button>
          </div>

          {/* 月額サブスク */}
          <div className="p-4.5 rounded-2xl bg-sky-50/50 border-2 border-[#00a3c4] relative flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-[#008ba8] uppercase tracking-wider">
                  月額マガジン
                </span>
                <span className="text-[10px] font-black bg-[#00a3c4] text-white px-2 py-0.2 rounded-full">
                  おすすめ
                </span>
              </div>
              <div className="text-xl font-black text-neutral-900 mb-2">
                ¥980 <span className="text-xs font-normal text-neutral-500">/ 月</span>
              </div>
              <p className="text-[11px] text-neutral-600 mb-4 leading-relaxed">
                スト6全キャラ攻略＆実戦添削がすべて読み放題。
              </p>
            </div>
            <button
              onClick={onJoinMembership}
              className="w-full py-2.5 px-3 rounded-xl bg-[#00a3c4] hover:bg-[#008ba8] text-white font-black text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm shadow-sky-500/20 active:scale-98 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>マガジンに入会</span>
            </button>
          </div>
        </div>

        {/* デモ用テストスイッチ */}
        <div className="pt-2.5 border-t border-neutral-100 flex items-center justify-center gap-2 text-xs text-neutral-400">
          <span>（動作確認用）</span>
          <button
            onClick={onToggleUnlock}
            className="text-[#008ba8] hover:underline font-bold cursor-pointer"
          >
            【デモ】ワンクリックで購入後表示（動画・添削）をテスト
          </button>
        </div>
      </div>
    </div>
  );
}
