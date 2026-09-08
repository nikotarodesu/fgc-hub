import React from 'react';
import Link from 'next/link';
import { SF6_CHARACTERS } from '@/data/sf6/characters';
import { constructMetadata } from '@/lib/seo';
import {
  Zap,
  Flame,
  ChevronRight,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Smartphone,
  BookOpen,
} from 'lucide-react';

export const metadata = constructMetadata({
  title: 'スト6攻略ハブ | キャラ別コンボ・起き攻め・リーサルデータベース',
  description:
    'ストリートファイター6のキャラクター別攻略ハブ。全キャラ1800MR以上の筆者「にこ太郎」監修による実戦コンボ・起き攻め・詐欺飛びセットプレイ・リーサル逆引きツールを提供。',
  canonicalUrl: '/sf6',
});

export default function SF6HubPage() {
  const characterList = Object.values(SF6_CHARACTERS);

  return (
    <div className="min-h-screen pb-16 bg-[#f0f9fb]">
      {/* ページ上部パンくず */}
      <div className="bg-white border-b border-neutral-200/80 sticky top-0 z-30 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between text-xs">
          <nav className="flex items-center gap-1.5 text-neutral-500 overflow-x-auto py-1">
            <Link href="/" className="hover:text-[#00a3c4] transition-colors shrink-0">
              ホーム
            </Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0 text-neutral-300" />
            <span className="font-bold text-neutral-900 shrink-0">スト6攻略ハブ</span>
          </nav>
          <div className="flex items-center gap-2 shrink-0">
            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <ShieldCheck className="w-3 h-3" />
              アプデ追従最速
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-cyan-50 text-[#00a3c4] border border-cyan-200">
              <Smartphone className="w-3 h-3" />
              スマホ特化
            </span>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
        {/* ヒーローセクション */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200/80 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-100/40 rounded-full blur-3xl pointer-events-none -z-0" />
          
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#00a3c4]/10 text-[#00a3c4] mb-3">
              <Flame className="w-3.5 h-3.5 text-orange-500" />
              <span>STREET FIGHTER 6 STRATEGY HUB</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-neutral-900 tracking-tight leading-tight">
              スト6攻略ハブ &amp; データベース
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 mt-3 leading-relaxed">
              全キャラ1800MR以上の筆者「にこ太郎」が贈る、勝率直結のスト6総合ポータル。
              対戦中・トレモ中にスマホで10秒で調べられる「キャラ別コンボ・起き攻め検索ツール」や、実戦リプレイ添削をキャラ別に整理して掲載しています。
            </p>
          </div>
        </div>

        {/* キャラクター一覧グリッド */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-black text-neutral-900 flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#00a3c4]" />
              <span>キャラクター別 攻略＆コンボツール</span>
            </h2>
            <span className="text-xs text-neutral-500 font-medium">
              順次全キャラクター対応予定
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {characterList.map((char) => (
              <div
                key={char.slug}
                className={`rounded-2xl border bg-white p-5 transition-all flex flex-col justify-between ${
                  char.hasTool
                    ? 'border-[#00a3c4]/60 shadow-sm hover:shadow-md hover:border-[#00a3c4] ring-1 ring-[#00a3c4]/20'
                    : 'border-neutral-200/80 opacity-85'
                }`}
              >
                <div>
                  {/* ヘッダー行 */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <h3 className="font-black text-lg text-neutral-900">
                          {char.name}
                        </h3>
                        <span className="text-xs text-neutral-400 font-mono">
                          {char.nameEn}
                        </span>
                      </div>
                      <span className="inline-block text-[11px] font-bold text-[#00a3c4] mt-0.5">
                        {char.archetype}
                      </span>
                    </div>

                    {char.hasTool ? (
                      <span className="px-2 py-0.5 text-[10px] font-black rounded-full bg-[#00a3c4] text-white shadow-xs">
                        ツール稼働中
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-neutral-100 text-neutral-500">
                        順次追加予定
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-neutral-600 leading-relaxed line-clamp-3 mb-4">
                    {char.description}
                  </p>
                </div>

                {/* アクションボタン */}
                <div className="pt-3 border-t border-neutral-100 flex items-center gap-2">
                  <Link
                    href={`/sf6/${char.slug}`}
                    className="flex-1 py-2 px-3 text-center text-xs font-bold rounded-xl border border-neutral-200 text-neutral-700 hover:bg-neutral-50 transition-colors"
                  >
                    キャラ解説
                  </Link>

                  <Link
                    href={`/sf6/${char.slug}/combos`}
                    className={`flex-1 py-2 px-3 text-center text-xs font-black rounded-xl transition-all flex items-center justify-center gap-1 ${
                      char.hasTool
                        ? 'bg-[#00a3c4] hover:bg-[#008ba8] text-white shadow-sm hover:scale-[1.02]'
                        : 'bg-neutral-100 text-neutral-400 hover:bg-neutral-200 hover:text-neutral-700'
                    }`}
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>コンボDB</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 共通攻略記事・note添削への導線 */}
        <section className="bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#00a3c4] flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-neutral-900 text-sm sm:text-base">
                スト6実戦添削 &amp; 格ゲー共通上達論
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                春麗リプレイ添削動画や、全キャラ共通の立ち回り・メンタル構築記事を公開しています。
              </p>
            </div>
          </div>
          <Link
            href="/?game=sf6"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-black bg-neutral-900 hover:bg-neutral-800 text-white transition-colors shrink-0 self-stretch sm:self-auto justify-center"
          >
            <span>スト6攻略記事一覧</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </section>
      </main>
    </div>
  );
}
