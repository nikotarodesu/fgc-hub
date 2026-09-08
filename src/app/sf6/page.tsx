import React from 'react';
import Link from 'next/link';
import { SF6_CHARACTERS } from '@/data/sf6/characters';
import { constructMetadata } from '@/lib/seo';
import { ChevronRight, ArrowRight } from 'lucide-react';

export const metadata = constructMetadata({
  title: 'スト6攻略ハブ | キャラ別コンボ・起き攻め・リーサルデータベース',
  description:
    'ストリートファイター6のキャラクター別攻略ハブ。全キャラ1800MR以上の筆者「にこ太郎」監修による実戦コンボ・起き攻め・詐欺飛びセットプレイ・リーサル逆引きツールを提供。',
  canonicalUrl: '/sf6',
});

export default function SF6HubPage() {
  const characterList = Object.values(SF6_CHARACTERS);

  return (
    <div className="min-h-screen pb-16 bg-[#f8fafc]">
      {/* ページ上部パンくず */}
      <div className="bg-white border-b border-neutral-200/80 sticky top-0 z-30 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between text-xs">
          <nav className="flex items-center gap-1.5 text-neutral-500 overflow-x-auto py-1">
            <Link href="/" className="hover:text-neutral-900 transition-colors shrink-0">
              ホーム
            </Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0 text-neutral-300" />
            <span className="font-semibold text-neutral-900 shrink-0">スト6攻略ハブ</span>
          </nav>
          <div className="flex items-center gap-2 shrink-0">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-neutral-100 text-neutral-600">
              最新バージョン対応
            </span>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
        {/* ヒーローセクション */}
        <div className="bg-white rounded-xl p-6 sm:p-8 border border-neutral-200/80 shadow-xs">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-neutral-100 text-neutral-600 mb-3">
              <span>STREET FIGHTER 6 DATABASE</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
              スト6攻略ハブ &amp; データベース
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 mt-2.5 leading-relaxed">
              全キャラ1800MR以上の筆者「にこ太郎」が監修する、勝率直結のスト6攻略ポータル。<br className="hidden sm:inline" />
              対戦中・トレモ中にスマホで10秒で確認できる「キャラ別コンボ・起き攻め検索ツール」を提供しています。
            </p>
          </div>
        </div>

        {/* キャラクター一覧グリッド */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold text-neutral-900">
              キャラクター別 攻略＆コンボツール
            </h2>
            <span className="text-xs text-neutral-400 font-medium">
              順次全キャラクター対応
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {characterList.map((char) => (
              <div
                key={char.slug}
                className="rounded-xl border border-neutral-200/80 bg-white p-5 transition-all flex flex-col justify-between hover:border-neutral-400 hover:shadow-xs"
              >
                <div>
                  {/* ヘッダー行 */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <h3 className="font-bold text-base text-neutral-900">
                          {char.name}
                        </h3>
                        <span className="text-xs text-neutral-400 font-mono">
                          {char.nameEn}
                        </span>
                      </div>
                      <span className="inline-block text-[11px] font-medium text-neutral-500 mt-0.5">
                        {char.archetype}
                      </span>
                    </div>

                    {char.hasTool ? (
                      <span className="px-2 py-0.5 text-[10px] font-semibold rounded bg-neutral-900 text-white">
                        稼働中
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 text-[10px] font-medium rounded bg-neutral-100 text-neutral-400">
                        準備中
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-neutral-500 leading-relaxed line-clamp-2 mb-4">
                    {char.description}
                  </p>
                </div>

                {/* アクションボタン */}
                <div className="pt-3 border-t border-neutral-100 flex items-center gap-2">
                  <Link
                    href={`/sf6/${char.slug}`}
                    className="flex-1 py-2 px-3 text-center text-xs font-medium rounded-lg border border-neutral-200 text-neutral-700 hover:bg-neutral-50 transition-colors"
                  >
                    キャラ解説
                  </Link>

                  <Link
                    href={`/sf6/${char.slug}/combos`}
                    className={`flex-1 py-2 px-3 text-center text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1 ${
                      char.hasTool
                        ? 'bg-neutral-900 hover:bg-neutral-800 text-white'
                        : 'bg-neutral-100 text-neutral-400 pointer-events-none'
                    }`}
                  >
                    <span>コンボDB</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 共通攻略記事への導線 */}
        <section className="bg-white rounded-xl p-5 sm:p-6 border border-neutral-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-neutral-900 text-sm sm:text-base">
              スト6実践攻略 &amp; 格ゲー共通上達論
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              全キャラ1800MR以上の視点による立ち回り・状況判断・メンタル構築の解説記事を公開しています。
            </p>
          </div>
          <Link
            href="/?game=sf6"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-neutral-900 hover:bg-neutral-800 text-white transition-colors shrink-0 self-stretch sm:self-auto justify-center"
          >
            <span>攻略記事一覧へ</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </section>
      </main>
    </div>
  );
}
