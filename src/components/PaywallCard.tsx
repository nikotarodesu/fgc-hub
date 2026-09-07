'use client';

import { Lock, Sparkles, CheckCircle2, CreditCard, ShieldAlert } from 'lucide-react';

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
      <div className="mb-6 p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-sm font-semibold">【購入済み / プレミアムアクセス中】すべての有料セクションが閲覧可能です</span>
        </div>
        <button
          onClick={onToggleUnlock}
          className="text-xs text-neutral-400 hover:text-white underline underline-offset-2 shrink-0 cursor-pointer"
        >
          （デモ：未購入状態に戻す）
        </button>
      </div>
    );
  }

  return (
    <div className="relative mt-8 mb-12">
      {/* ぼかしグラデーション */}
      <div className="absolute -top-32 left-0 right-0 h-32 bg-gradient-to-t from-neutral-950 via-neutral-950/90 to-transparent pointer-events-none" />

      <div className="relative rounded-2xl bg-gradient-to-b from-neutral-900 via-neutral-900/95 to-neutral-950 border border-amber-500/30 p-6 sm:p-8 shadow-2xl shadow-amber-500/10 text-center max-w-2xl mx-auto">
        {/* アイコン */}
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-red-600 mx-auto flex items-center justify-center text-white shadow-lg shadow-orange-500/30 mb-4">
          <Lock className="w-7 h-7" />
        </div>

        <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2">
          ここから先は有料エリアです
        </h3>
        <p className="text-sm text-neutral-400 max-w-md mx-auto mb-6 leading-relaxed">
          実戦で劇的に勝率を上げる「完全詐欺飛びセットプレイ」「確定反撃レシピ」「対プロ戦ファジー潰し」の核心部分を解説しています。
        </p>

        {/* 料金・購入ボタンカード */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left mb-6">
          {/* 単体購入 */}
          <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 flex flex-col justify-between hover:border-neutral-700 transition-colors">
            <div>
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                この記事だけ読む
              </span>
              <div className="text-2xl font-black text-white mb-2">
                ¥{price.toLocaleString()} <span className="text-xs font-normal text-neutral-400">（買い切り）</span>
              </div>
              <ul className="text-xs text-neutral-400 space-y-1.5 mb-4">
                <li className="flex items-center gap-1.5">
                  <span className="text-amber-400">✓</span> 追加料金なしで永久閲覧
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-amber-400">✓</span> アプデ時の追記も無料で閲覧可能
                </li>
              </ul>
            </div>
            <button
              onClick={onBuyArticle}
              className="w-full py-2.5 px-4 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>この記事を購入する</span>
            </button>
          </div>

          {/* 月額サブスク */}
          <div className="p-4 rounded-xl bg-gradient-to-b from-amber-950/30 to-neutral-950/80 border border-amber-500/40 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-2 right-2 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-extrabold text-[10px] px-2 py-0.5 rounded-full">
              おすすめ
            </div>
            <div>
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
                月額マガジン
              </span>
              <div className="text-2xl font-black text-amber-300 mb-2">
                ¥980 <span className="text-xs font-normal text-neutral-400">/ 月</span>
              </div>
              <ul className="text-xs text-neutral-300 space-y-1.5 mb-4">
                <li className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>スト6全キャラ攻略が読み放題</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>将来のスト7最速攻略も対象</span>
                </li>
              </ul>
            </div>
            <button
              onClick={onJoinMembership}
              className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black font-black text-xs flex items-center justify-center gap-1.5 shadow-md shadow-orange-500/20 transition-transform active:scale-98 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>月額マガジンに入会</span>
            </button>
          </div>
        </div>

        {/* デモ用テストスイッチ */}
        <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-center gap-3 text-xs text-neutral-500">
          <span>（動作確認用）</span>
          <button
            onClick={onToggleUnlock}
            className="text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-4 cursor-pointer"
          >
            【デモ】ワンクリックで購入後表示をテストする
          </button>
        </div>
      </div>
    </div>
  );
}
