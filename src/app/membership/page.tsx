'use client';

import { Check, Sparkles, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function MembershipPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-neutral-900">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 text-neutral-700 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FGC LAB プレミアムプラン</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mb-3 tracking-tight">
            格ゲー完全攻略マガジン（読み放題）
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            noteで公開していた有料記事（単体500〜1,000円）がすべて読み放題。大型アップデート時の新レシピ追記や、将来のスト7最速攻略も追加料金なしで閲覧できます。
          </p>
        </div>

        {/* プラン比較 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-16">
          {/* 単体購入 */}
          <div className="p-6 rounded-2xl bg-white border border-neutral-200 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-neutral-800 mb-1">単体記事の買い切り</h3>
              <p className="text-xs text-neutral-500 mb-4">特定のキャラクターやトピックだけ読みたい方に</p>
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
              className="mt-6 w-full py-2.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-semibold text-xs text-center transition-colors"
            >
              記事一覧から選んで購入
            </Link>
          </div>

          {/* 月額マガジン */}
          <div className="p-6 rounded-2xl bg-white border-2 border-neutral-900 relative flex flex-col justify-between shadow-sm">
            <div className="absolute -top-3 right-6 bg-neutral-900 text-white font-bold text-[10px] px-2.5 py-0.5 rounded-full">
              おすすめ
            </div>
            <div>
              <h3 className="text-sm font-bold text-neutral-900 mb-1">月額プレミアムマガジン</h3>
              <p className="text-xs text-neutral-500 mb-4">スト6全キャラ・共通理論・スト7まで全記事アクセス</p>
              <div className="text-2xl font-black text-neutral-900 mb-4">
                ¥980 <span className="text-xs font-normal text-neutral-500">/ 月（税込）</span>
              </div>
              <ul className="space-y-2.5 text-xs text-neutral-700">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-neutral-900" />
                  <span><strong>過去・現在のすべての有料記事が読み放題</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-neutral-900" />
                  <span>毎月更新されるキャラ別MR2000対策</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-neutral-900" />
                  <span>スト7発売時の開幕最速攻略も追加料金なし</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-neutral-900" />
                  <span>いつでもマイページから1クリックで解約可能</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => alert('Stripe決済設定後に本番決済が有効になります。')}
              className="mt-6 w-full py-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs text-center transition-colors cursor-pointer"
            >
              今すぐマガジンに参加する
            </button>
          </div>
        </div>

        {/* よくある質問 */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-base font-bold text-neutral-900 text-center mb-6">よくあるご質問</h2>
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-white border border-neutral-200">
              <h4 className="text-xs font-bold text-neutral-900 mb-1">Q. 解約はいつでもできますか？</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                はい、いつでもマイページから1クリックで解約いただけます。違約金等は一切ございません。
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-neutral-200">
              <h4 className="text-xs font-bold text-neutral-900 mb-1">Q. 将来スト7が出た時はどうなりますか？</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                本サイトの「スト7」カテゴリにて最速攻略をお届けします。プレミアム会員は追加料金なしでそのまま閲覧可能です。
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
