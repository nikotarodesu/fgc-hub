import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Keyboard,
  Laptop,
  Monitor,
  Gamepad2,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { DEVICE_ARTICLES } from '@/data/devices/articles';
import { DEVICE_PRODUCTS } from '@/data/devices/products';

export const metadata: Metadata = {
  title: 'スト6おすすめデバイス・プレイ環境｜にこ太郎の格ゲーLAB',
  description:
    'スト6（ストリートファイター6）に合うキーボード・レバーレス・モニター・PCを、用途と予算から選べます。全キャラ1800MR以上の視点から、操作機器と動作環境の選び方を徹底解説。',
  alternates: {
    canonical: 'https://nikotaro.com/sf6/devices',
  },
  openGraph: {
    title: 'スト6おすすめデバイス・プレイ環境｜にこ太郎の格ゲーLAB',
    description:
      'スト6に合うキーボード・レバーレス・モニター・PCを、用途と予算から選べます。全キャラ1800MR以上の視点から、操作機器と動作環境の選び方を徹底解説。',
    url: 'https://nikotaro.com/sf6/devices',
    type: 'website',
  },
};

export default function DevicesHubPage() {
  const authorKeyboard = DEVICE_PRODUCTS['razer-huntsman-v3-pro-mini'];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'ホーム',
            item: 'https://nikotaro.com',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'スト6',
            item: 'https://nikotaro.com/sf6',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'デバイス・プレイ環境',
            item: 'https://nikotaro.com/sf6/devices',
          },
        ],
      },
      {
        '@type': 'CollectionPage',
        name: 'スト6おすすめデバイス・プレイ環境',
        description:
          'スト6に合うキーボード・レバーレス・モニター・PCを、用途と予算から選べます。',
        url: 'https://nikotaro.com/sf6/devices',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ヘッダーエリア */}
      <header className="bg-white dark:bg-neutral-900 border-b border-neutral-200/80 dark:border-neutral-800 pt-6 pb-6 sm:pt-8 sm:pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* パンくずリスト */}
          <nav
            aria-label="Breadcrumb"
            className="mb-4 text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5 flex-wrap"
          >
            <Link
              href="/"
              className="hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              ホーム
            </Link>
            <span>/</span>
            <Link
              href="/sf6"
              className="hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              スト6
            </Link>
            <span>/</span>
            <span
              className="text-neutral-800 dark:text-neutral-200 font-bold truncate"
              aria-current="page"
            >
              デバイス・プレイ環境
            </span>
          </nav>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1 text-xs font-bold text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/60 px-2.5 py-0.5 rounded-full border border-cyan-200/80 dark:border-cyan-800/60">
              <Sparkles className="w-3.5 h-3.5" />
              <span>完全無料コーナー</span>
            </span>
            <span className="text-xs text-neutral-500 dark:text-neutral-400">
              更新日: 2026年9月25日
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-900 dark:text-white tracking-tight leading-snug mb-2">
            スト6おすすめデバイス・プレイ環境
          </h1>

          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-3xl mb-4">
            スト6に合うキーボード・レバーレス・モニター・PCを、用途と予算から選べます。対戦での操作性や表示遅延の仕組みを整理し、無駄のない環境選びをサポートします。
          </p>

          {/* PR・広告利用の説明 */}
          <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-700/60 text-[11px] text-neutral-500 dark:text-neutral-400 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>掲載方針・広告表記について：</strong>
              本コーナーの記事では、Amazonアソシエイトなどのアフィリエイト広告リンクを利用しています。商品の推薦や評価は公式仕様・実戦知見・客観的データに基づいており、報酬の多寡によって掲載順位や推薦理由を歪めることはありません。
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-12">
        {/* 4-2. 目的から探す */}
        <section aria-labelledby="heading-purpose">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-cyan-500" />
            <h2 id="heading-purpose" className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white">
              目的から探す
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 1. キーボード */}
            <Link
              href="/sf6/devices/keyboard"
              className="group p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 hover:border-cyan-500/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                  <Keyboard className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    キーボードで遊びたい
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                    対応環境と入力のしやすさから選ぶ。ラピッドトリガーや作業兼用モデルの違いを解説。
                  </p>
                </div>
              </div>
              <div className="pt-4 mt-4 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-xs font-bold text-neutral-800 dark:text-neutral-200 group-hover:text-cyan-600 dark:group-hover:text-cyan-400">
                <span>キーボード記事へ</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </Link>

            {/* 2. レバーレス */}
            <Link
              href="/sf6/devices/leverless"
              className="group p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 hover:border-cyan-500/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                  <Gamepad2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    レバーレスで遊びたい
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                    CPT公式ルール対応とボタン配置から選ぶ。薄型軽量から定番大型モデルまで徹底比較。
                  </p>
                </div>
              </div>
              <div className="pt-4 mt-4 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-xs font-bold text-neutral-800 dark:text-neutral-200 group-hover:text-cyan-600 dark:group-hover:text-cyan-400">
                <span>レバーレス記事へ</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </Link>

            {/* 3. ゲーミングPC */}
            <Link
              href="/sf6/devices/gaming-pc"
              className="group p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 hover:border-cyan-500/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                  <Laptop className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    PCでスト6を始めたい
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                    必要スペックと用途別の選び方。フルHD標準構成から配信兼用構成まで整理。
                  </p>
                </div>
              </div>
              <div className="pt-4 mt-4 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-xs font-bold text-neutral-800 dark:text-neutral-200 group-hover:text-cyan-600 dark:group-hover:text-cyan-400">
                <span>PC記事へ</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </Link>

            {/* 4. モニター */}
            <Link
              href="/sf6/devices/monitor"
              className="group p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 hover:border-cyan-500/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                  <Monitor className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    モニターを選びたい
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                    Hz・表示性能・接続環境を確認する。60fps制限下での高リフレッシュレートの意義。
                  </p>
                </div>
              </div>
              <div className="pt-4 mt-4 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-xs font-bold text-neutral-800 dark:text-neutral-200 group-hover:text-cyan-600 dark:group-hover:text-cyan-400">
                <span>モニター記事へ</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </Link>
          </div>
        </section>

        {/* 4-3. カテゴリから探す */}
        <section aria-labelledby="heading-category" className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <h2 id="heading-category" className="text-sm font-bold text-neutral-900 dark:text-white">
              カテゴリから探す
            </h2>
            <span className="text-[11px] text-neutral-400">※公開中カテゴリのみ表示</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 mr-1">
              操作機器:
            </span>
            <Link
              href="/sf6/devices/keyboard"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-cyan-50 dark:hover:bg-neutral-700 text-xs font-bold text-neutral-700 dark:text-neutral-200 transition-colors"
            >
              <Keyboard className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>キーボード</span>
            </Link>
            <Link
              href="/sf6/devices/leverless"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-cyan-50 dark:hover:bg-neutral-700 text-xs font-bold text-neutral-700 dark:text-neutral-200 transition-colors"
            >
              <Gamepad2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>レバーレス</span>
            </Link>

            <span className="text-neutral-300 dark:text-neutral-700 mx-1">|</span>

            <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 mr-1">
              映像・動作環境:
            </span>
            <Link
              href="/sf6/devices/gaming-pc"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-cyan-50 dark:hover:bg-neutral-700 text-xs font-bold text-neutral-700 dark:text-neutral-200 transition-colors"
            >
              <Laptop className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>ゲーミングPC</span>
            </Link>
            <Link
              href="/sf6/devices/monitor"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-cyan-50 dark:hover:bg-neutral-700 text-xs font-bold text-neutral-700 dark:text-neutral-200 transition-colors"
            >
              <Monitor className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>モニター</span>
            </Link>
          </div>
        </section>

        {/* 4-4. にこ太郎の使用環境（確認済み情報のみ掲載） */}
        {authorKeyboard && authorKeyboard.authorComment && (
          <section aria-labelledby="heading-author-gear" className="p-5 sm:p-6 rounded-2xl bg-neutral-900 text-white border border-neutral-800 shadow-sm">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
              <div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  著者使用機材
                </span>
                <h2 id="heading-author-gear" className="text-base sm:text-lg font-bold text-white mt-1">
                  筆者のメイン使用機材：{authorKeyboard.name}
                </h2>
              </div>
              <Link
                href="/sf6/devices/keyboard"
                className="inline-flex items-center gap-1 text-xs font-bold text-cyan-300 hover:text-white transition-colors"
              >
                <span>キーボード選びの解説を読む</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-4">
              {authorKeyboard.authorComment}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-neutral-800 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-neutral-400">選んだ主な理由:</span>
                <span className="text-neutral-200 font-bold">ラピッドトリガーによるニュートラル復帰の速さ・歩きガードの精度向上</span>
              </div>
              {authorKeyboard.noteReviewUrl && (
                <a
                  href={authorKeyboard.noteReviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-bold"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>noteで詳細レビューを見る</span>
                </a>
              )}
            </div>
          </section>
        )}

        {/* 4-5. 記事一覧 */}
        <section aria-labelledby="heading-articles">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-500" />
              <h2 id="heading-articles" className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white">
                公開中のガイド記事一覧（全{DEVICE_ARTICLES.length}記事）
              </h2>
            </div>
          </div>

          <div className="space-y-4">
            {DEVICE_ARTICLES.map((article) => (
              <Link
                key={article.slug}
                href={article.path}
                className="group block p-5 sm:p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 hover:border-cyan-500/80 shadow-xs hover:shadow-md transition-all"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      完全無料
                    </span>
                    <span className="text-[11px] font-bold text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded">
                      {article.categoryLabel}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-[11px] text-neutral-400 dark:text-neutral-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>読了目安: {article.readTime}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{article.updatedAt} 更新</span>
                    </span>
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors mb-2">
                  {article.title}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
                  {article.description}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-neutral-100 dark:border-neutral-800/80 text-xs font-bold text-cyan-600 dark:text-cyan-400">
                  <span>記事を読む</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
