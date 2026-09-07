'use client';

import { Check, Sparkles, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function MembershipPage() {
  return (
    <div className="min-h-screen bg-[#f0f9fb] text-neutral-900">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-[#008ba8] text-xs font-bold mb-3 border border-sky-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span>にこ太郎の格ゲーLAB プレミアムマガジン</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 mb-3 tracking-tight">
            スト6完全攻略マガジン（読み放題）
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-medium">
            noteで公開していた有料記事（単体500〜1,000円）がすべて読み放題。全キャラ1800MR以上の筆者による実戦添削、最新アップデート時の新レシピ追記もすべて追加料金なしで閲覧できます。
          </p>
        </div>

        {/* プラン比較 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-16">
          {/* 単体購入 */}
          <div className="p-6 rounded-2xl bg-white border-2 border-neutral-200 flex flex-col justify-between shadow-xs">
            <div>
              <h3 className="text-sm font-bold text-neutral-800 mb-1">単体記事の買い切り</h3>
              <p className="text-xs text-neutral-500 mb-4">特定のキャラクターや添削記事だけ読みたい方に</p>
              <div className="text-2xl font-black text-neutral-900 mb-4">
                ¥500〜980 <span className="text-xs font-normal text-neutral-500">/ 1記事</span>
              </div>
              <ul className="space-y-2.5 text-xs text-neutral-600">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-neutral-400" />
                  <span>購入した記事のみ永久閲覧可能</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-neutral-400" />
                  <span>アプデ時の追記も無料で閲覧</span>
                </li>
                <li className="flex items-center gap-2 text-neutral-400">
                  <span>× 他キャラクターの攻略記事は別売り</span>
                </li>
              </ul>
            </div>
            <Link
              href="/"
              className="mt-6 w-full py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold text-xs text-center transition-colors"
            >
              記事一覧から選んで購入
            </Link>
          </div>

          {/* 月額マガジン */}
          <div className="p-6 rounded-2xl bg-white border-3 border-[#00a3c4] relative flex flex-col justify-between shadow-lg shadow-sky-500/10">
            <div className="absolute -top-3 right-6 bg-[#00a3c4] text-white font-black text-[10px] px-3 py-0.5 rounded-full shadow-sm">
              おすすめ
            </div>
            <div>
              <h3 className="text-base font-black text-neutral-900 mb-1">月額プレミアムマガジン</h3>
              <p className="text-xs text-neutral-500 mb-4">スト6全キャラ攻略・実戦添削・共通理論まで全記事アクセス</p>
              <div className="text-3xl font-black text-neutral-900 mb-4">
                ¥980 <span className="text-xs font-normal text-neutral-500">/ 月（税込）</span>
              </div>
              <ul className="space-y-2.5 text-xs text-neutral-700">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#00a3c4]" />
                  <span><strong>過去・現在のすべての有料記事が読み放題</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#00a3c4]" />
                  <span>全キャラ1800MR以上の視点による実戦添削・対策</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#00a3c4]" />
                  <span>動画付きリプレイ添削記事もすべて閲覧可能</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#00a3c4]" />
                  <span>いつでもマイページから1クリックで解約可能</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => alert('Stripe決済設定後に本番決済が有効になります。')}
              className="mt-6 w-full py-3 rounded-xl bg-[#00a3c4] hover:bg-[#008ba8] text-white font-black text-xs text-center transition-all shadow-md shadow-sky-500/20 active:scale-98 cursor-pointer"
            >
              今すぐマガジンに参加する
            </button>
          </div>
        </div>

        {/* よくある質問 */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-base font-black text-neutral-900 text-center mb-6">よくあるご質問</h2>
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-white border border-sky-100 shadow-xs">
              <h4 className="text-xs font-bold text-neutral-900 mb-1">Q. 解約はいつでもできますか？</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                はい、いつでもマイページから1クリックで解約いただけます。違約金等は一切ございません。
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-sky-100 shadow-xs">
              <h4 className="text-xs font-bold text-neutral-900 mb-1">Q. 記事はどのように追加・更新されますか？</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                実戦対戦リプレイの添削、最新バージョンに対応したコンボレシピ、高MR帯でのキャラ別対策が随時追加されます。マガジン会員は追加料金なしですべてお読みいただけます。
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
