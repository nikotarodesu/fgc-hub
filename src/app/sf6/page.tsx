import React from 'react';
import Link from 'next/link';
import { SF6_CHARACTERS } from '@/data/sf6/characters';
import { constructMetadata } from '@/lib/seo';
import { ChevronRight, ArrowRight, Sparkles, BookOpen, Gamepad2, Flame, ShieldCheck } from 'lucide-react';

export const metadata = constructMetadata({
  title: 'スト6攻略ハブ | キャラ別攻略・共通技術・実戦データベース',
  description:
    'ストリートファイター6のキャラクター別攻略ハブ。全キャラ1800MR以上の筆者「にこ太郎」監修による実戦コンボ・起き攻め・立ち回り徹底解説・共通技術ポータルを提供。',
  canonicalUrl: '/sf6',
});

export default function SF6HubPage() {
  const characterList = Object.values(SF6_CHARACTERS);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    headline: 'スト6攻略ハブ & データベース',
    description: 'ストリートファイター6のキャラクター別攻略、共通技術、コンボ・起き攻めデータの一覧',
    url: 'https://nikotaro.com/sf6',
    publisher: {
      '@type': 'Person',
      name: 'にこ太郎',
      url: 'https://nikotaro.com/author',
    },
  };

  return (
    <div className="min-h-screen pb-16 bg-[#f8fafc] dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ページ上部パンくず */}
      <div className="bg-white dark:bg-neutral-900 border-b border-neutral-200/80 dark:border-neutral-800 sticky top-0 z-30 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between text-xs">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400 overflow-x-auto py-1">
            <Link href="/" className="hover:text-neutral-900 dark:hover:text-white transition-colors shrink-0">
              ホーム
            </Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0 text-neutral-300 dark:text-neutral-600" />
            <span className="font-semibold text-neutral-900 dark:text-white shrink-0">スト6攻略ハブ</span>
          </nav>
          <div className="flex items-center gap-2 shrink-0">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
              パッチ情報随時検証
            </span>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 space-y-8">
        {/* ヒーローセクション */}
        <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 sm:p-8 border border-neutral-200/80 dark:border-neutral-800 shadow-xs">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-cyan-50 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800 mb-3">
              <Flame className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>STREET FIGHTER 6 DATABASE &amp; GUIDES</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-900 dark:text-white tracking-tight leading-tight">
              スト6攻略ハブ &amp; データベース
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 mt-2.5 leading-relaxed">
              全キャラ1800MR以上の筆者「にこ太郎」が監修する、勝率直結のスト6攻略ポータル。<br className="hidden sm:inline" />
              キャラクター別の立ち回り・完全攻略から、共通理論・コンボツールまで体系的にナビゲートします。
            </p>
          </div>
        </div>

        {/* 目的別ナビゲーション（共通技術・デバイス・用語集） */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/sf6/strategy"
            className="group p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 hover:border-cyan-500 transition-all shadow-xs flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-neutral-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                SF6 共通技術ポータル
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                立ち回り・地上戦・差し返し・防御・ゲージ管理の全26記事をステップ順に完全無料公開。
              </p>
            </div>
            <div className="pt-3 mt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs font-bold text-cyan-600 dark:text-cyan-400">
              <span>ステップ順に学ぶ</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>

          <Link
            href="/sf6/devices"
            className="group p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 hover:border-cyan-500 transition-all shadow-xs flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <Gamepad2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-neutral-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                おすすめデバイス・環境
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                キーボード・レバーレス・ゲーミングPC・モニターの選び方を実体験と仕様から比較。
              </p>
            </div>
            <div className="pt-3 mt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs font-bold text-cyan-600 dark:text-cyan-400">
              <span>デバイスガイドを見る</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>

          <Link
            href="/glossary"
            className="group p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 hover:border-cyan-500 transition-all shadow-xs flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-neutral-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                格ゲー用語解説・辞典
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                シミー、ファジー、硬直差など、攻略記事に出てくる必須用語を実戦例とともに解説。
              </p>
            </div>
            <div className="pt-3 mt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs font-bold text-cyan-600 dark:text-cyan-400">
              <span>用語を調べる</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        </section>

        {/* キャラクター一覧グリッド */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
              キャラクター別 総合案内 ＆ コンボツール
            </h2>
            <span className="text-xs text-neutral-400 font-medium">
              順次全キャラクター対応
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {characterList.map((char) => (
              <div
                key={char.slug}
                className="rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 transition-all flex flex-col justify-between hover:border-neutral-400 dark:hover:border-neutral-600 hover:shadow-xs"
              >
                <div>
                  {/* ヘッダー行 */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <h3 className="font-bold text-base text-neutral-900 dark:text-white">
                          {char.name}
                        </h3>
                        <span className="text-xs text-neutral-400 font-mono">
                          {char.nameEn}
                        </span>
                      </div>
                      <span className="inline-block text-[11px] font-medium text-neutral-500 dark:text-neutral-400 mt-0.5">
                        {char.archetype}
                      </span>
                    </div>

                    {char.hasTool ? (
                      <span className="px-2 py-0.5 text-[10px] font-semibold rounded bg-neutral-900 text-white dark:bg-white dark:text-neutral-900">
                        ツール稼働中
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 text-[10px] font-medium rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                        ツール準備中
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-2 mb-4">
                    {char.description}
                  </p>
                </div>

                {/* アクションボタン */}
                <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center gap-2">
                  <Link
                    href={`/sf6/${char.slug}`}
                    className="flex-1 py-2 px-3 text-center text-xs font-medium rounded-lg border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                  >
                    キャラ解説・記事
                  </Link>

                  <Link
                    href={`/sf6/${char.slug}/combos`}
                    className={`flex-1 py-2 px-3 text-center text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1 ${
                      char.hasTool
                        ? 'bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500'
                    }`}
                  >
                    <span>{char.hasTool ? 'コンボツール' : 'コンボ準備中'}</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 共通攻略記事・トップへの導線 */}
        <section className="bg-white dark:bg-neutral-900 rounded-2xl p-5 sm:p-6 border border-neutral-200/80 dark:border-neutral-800 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-neutral-900 dark:text-white text-sm sm:text-base">
              スト6実践攻略 &amp; 格ゲー共通上達論
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5 leading-relaxed">
              全キャラ1800MR以上の視点による立ち回り・状況判断・メンタル構築の解説記事を公開しています。
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 min-h-[44px] rounded-lg text-xs font-semibold bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 transition-colors shrink-0 self-stretch sm:self-auto justify-center"
          >
            <span>全記事一覧へ（ホーム）</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </section>
      </main>
    </div>
  );
}
