'use client';

import { Check, Sparkles, Zap, ShieldCheck, HelpCircle } from 'lucide-react';
import Link from 'next/link';

export default function MembershipPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FGC LAB プレミアムマガジン</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white mb-6 tracking-tight leading-tight">
            格ゲーの勝率を最短で引き上げる、<br />
            <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              完全攻略マガジン読み放題
            </span>
          </h1>
          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
            noteで好評いただいた有料記事（単体500〜1,000円）がすべて読み放題。大型バランス調整時の新レシピ追記や、将来のスト7発売時の最速攻略もすべて追加料金なしで利用できます。
          </p>
        </div>

        {/* プラン比較 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20">
          {/* 単体購入（比較用） */}
          <div className="p-8 rounded-3xl bg-neutral-900/60 border border-neutral-800 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-neutral-300 mb-2">単体記事の買い切り</h3>
              <p className="text-xs text-neutral-400 mb-6">特定のキャラクターやトピックだけを読みたい方に</p>
              <div className="text-3xl font-black text-white mb-6">
                ¥500〜980 <span className="text-xs font-normal text-neutral-400">/ 1記事</span>
              </div>
              <ul className="space-y-3 text-xs text-neutral-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-neutral-400" />
                  <span>購入した記事のみ永久閲覧可能</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-neutral-400" />
                  <span>該当記事のアプデ追記の閲覧</span>
                </li>
                <li className="flex items-center gap-2 text-neutral-500">
                  <span>× 他キャラクターの攻略記事は別売り</span>
                </li>
              </ul>
            </div>
            <Link
              href="/"
              className="mt-8 w-full py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs text-center transition-colors"
            >
              記事一覧から選んで購入
            </Link>
          </div>

          {/* 月額マガジン（おすすめ） */}
          <div className="p-8 rounded-3xl bg-gradient-to-b from-amber-950/40 via-neutral-900 to-neutral-950 border-2 border-amber-500/60 relative flex flex-col justify-between shadow-2xl shadow-orange-500/10">
            <div className="absolute -top-3.5 right-6 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-extrabold text-xs px-3 py-1 rounded-full shadow-md">
              一番お得・人気プラン
            </div>
            <div>
              <h3 className="text-lg font-bold text-amber-300 mb-2 flex items-center gap-2">
                <span>月額プレミアムマガジン</span>
                <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
              </h3>
              <p className="text-xs text-neutral-400 mb-6">スト6全キャラ・共通理論・スト7まで全記事アクセス</p>
              <div className="text-3xl font-black text-white mb-6">
                ¥980 <span className="text-xs font-normal text-neutral-400">/ 月（税込）</span>
              </div>
              <ul className="space-y-3 text-xs text-neutral-200">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400" />
                  <span><strong>過去・現在のすべての有料記事が読み放題</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400" />
                  <span>毎月更新されるキャラ別MR2000対策記事</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400" />
                  <span>スト7発売時の開幕スタートダッシュ攻略も追加料金なし</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400" />
                  <span>いつでもマイページから1クリックで解約可能</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => alert('Stripe決済との連携設定後に本番決済が有効になります。')}
              className="mt-8 w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-400 hover:to-orange-400 text-black font-black text-sm text-center shadow-lg shadow-orange-500/20 transition-transform active:scale-98 cursor-pointer"
            >
              今すぐプレミアムマガジンに参加する
            </button>
          </div>
        </div>

        {/* よくある質問 FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-white text-center mb-8">よくあるご質問</h2>
          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800">
              <h4 className="text-sm font-bold text-white mb-2">Q. 解約はいつでもできますか？</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                はい、いつでもマイページから1クリックで解約いただけます。違約金等は一切ございません。解約後も次回更新日まではすべての記事をお読みいただけます。
              </p>
            </div>
            <div className="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800">
              <h4 className="text-sm font-bold text-white mb-2">Q. noteで購入した記事はどうなりますか？</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                noteで購入された記事はnote上で引き続き閲覧いただけます。当サイトでは、最新アプデへの即時追従や、コンボ表・フレーム表などのリッチな専用機能を追加した完全版として展開しています。
              </p>
            </div>
            <div className="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800">
              <h4 className="text-sm font-bold text-white mb-2">Q. 将来スト7が出た時はどうなりますか？</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                本メディアは「FGC LAB」として長期運用を前提にしており、スト7発売時にも別サイトを立ち上げる必要なく、本サイトの「スト7」カテゴリにて最速攻略をお届けします。プレミアム会員は追加料金なしでそのまま閲覧可能です。
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
