import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Keyboard,
  ShieldCheck,
  Sparkles,
  Clock,
  Calendar,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import { DEVICE_PRODUCTS } from '@/data/devices/products';
import DeviceProductCard from '@/components/devices/DeviceProductCard';
import DeviceComparisonTable from '@/components/devices/DeviceComparisonTable';
import DeviceEditorialPolicy from '@/components/devices/DeviceEditorialPolicy';

export const metadata: Metadata = {
  title: 'スト6向けキーボードの選び方とおすすめ｜にこ太郎の格ゲーLAB',
  description:
    'スト6をキーボードで快適に遊ぶための選び方ガイド。ラピッドトリガーやアクチュエーションポイント、Nキーロールオーバーの基礎から、普段のPC作業との兼用、おすすめ機種の比較まで徹底解説します。',
  alternates: {
    canonical: 'https://nikotaro.com/sf6/devices/keyboard',
  },
  openGraph: {
    title: 'スト6向けキーボードの選び方とおすすめ｜にこ太郎の格ゲーLAB',
    description:
      'スト6をキーボードで快適に遊ぶための選び方ガイド。ラピッドトリガーやアクチュエーションポイント、Nキーロールオーバーの基礎から、おすすめ機種の比較まで徹底解説。',
    url: 'https://nikotaro.com/sf6/devices/keyboard',
    type: 'article',
  },
};

export default function KeyboardDevicePage() {
  const keyboardProducts = [
    DEVICE_PRODUCTS['razer-huntsman-v3-pro-mini'],
    DEVICE_PRODUCTS['steelseries-apex-pro-tkl'],
    DEVICE_PRODUCTS['logicool-g-pro-x-tkl'],
  ].filter(Boolean);

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
          {
            '@type': 'ListItem',
            position: 4,
            name: 'スト6向けキーボードの選び方とおすすめ',
            item: 'https://nikotaro.com/sf6/devices/keyboard',
          },
        ],
      },
      {
        '@type': 'Article',
        headline: 'スト6向けキーボードの選び方とおすすめ',
        description:
          'スト6をキーボードで快適に遊ぶための選び方ガイド。ラピッドトリガーやアクチュエーションポイント、Nキーロールオーバーの基礎から、おすすめ機種の比較まで徹底解説。',
        url: 'https://nikotaro.com/sf6/devices/keyboard',
        datePublished: '2026-09-25',
        dateModified: '2026-09-25',
        author: {
          '@type': 'Person',
          name: 'にこ太郎',
          url: 'https://nikotaro.com/author',
        },
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
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
            <Link
              href="/sf6/devices"
              className="hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              デバイス・プレイ環境
            </Link>
            <span>/</span>
            <span
              className="text-neutral-800 dark:text-neutral-200 font-bold truncate"
              aria-current="page"
            >
              キーボード
            </span>
          </nav>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1 text-xs font-bold text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/60 px-2.5 py-0.5 rounded-full border border-cyan-200/80 dark:border-cyan-800/60">
              <Sparkles className="w-3.5 h-3.5" />
              <span>完全無料ガイド</span>
            </span>
            <span className="text-[10px] font-bold text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded border border-neutral-200/80 dark:border-neutral-700">
              PR・広告を含む
            </span>
            <span className="text-xs text-neutral-500 dark:text-neutral-400">
              操作機器（キーボード）
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-900 dark:text-white tracking-tight leading-snug mb-3">
            スト6向けキーボードの選び方とおすすめ
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500 dark:text-neutral-400 pt-2 border-t border-neutral-100 dark:border-neutral-800">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-neutral-400" />
              <span>読了目安: 約8分</span>
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-neutral-400" />
              <span>公開日: 2026年9月25日</span>
            </span>
            <span>著者: にこ太郎（全キャラ1800MR+）</span>
          </div>
        </div>
      </header>

      {/* 記事メインコンテンツ */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-10 text-neutral-800 dark:text-neutral-200 leading-relaxed text-sm sm:text-base">
        {/* 1. 結論 */}
        <section className="p-4 sm:p-6 rounded-2xl bg-cyan-50/50 dark:bg-cyan-950/20 border border-cyan-200/80 dark:border-cyan-800/60 space-y-3 sm:space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-cyan-600 text-white font-bold text-xs shrink-0">
              結論
            </span>
            <h2 className="text-base sm:text-lg font-black text-neutral-900 dark:text-white">
              どんな人にどのキーボードが合うか
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
            PC版（Steam）でスト6をプレイする場合、キーボードはレバーレスコントローラーと同等以上の高い入力精度を持つ非常に有力な選択肢です。
          </p>
          <ul className="space-y-3.5 sm:space-y-4 text-xs sm:text-sm">
            <li className="flex flex-col gap-1 min-w-0">
              <span className="font-bold text-cyan-800 dark:text-cyan-300 break-words">
                ・最速の反応と対戦特化を求める方：
              </span>
              <span className="text-neutral-700 dark:text-neutral-300 leading-relaxed break-words pl-2.5 sm:pl-3 border-l-2 border-cyan-400/50 dark:border-cyan-600/50">
                ラピッドトリガー（キーをわずかに戻した瞬間にニュートラル復帰する機能）搭載の磁気/オプティカル式（例: Razer Huntsman V3 Pro Mini）が最適です。
              </span>
            </li>
            <li className="flex flex-col gap-1 min-w-0">
              <span className="font-bold text-cyan-800 dark:text-cyan-300 break-words">
                ・日常のPC作業や仕事と両立したい方：
              </span>
              <span className="text-neutral-700 dark:text-neutral-300 leading-relaxed break-words pl-2.5 sm:pl-3 border-l-2 border-cyan-400/50 dark:border-cyan-600/50">
                矢印キーやファンクションキーが独立したテンキーレス（TKL）モデル（例: SteelSeries Apex Pro TKL）が快適です。
              </span>
            </li>
            <li className="flex flex-col gap-1 min-w-0">
              <span className="font-bold text-cyan-800 dark:text-cyan-300 break-words">
                ・手持ちのキーボードで始めたい方：
              </span>
              <span className="text-neutral-700 dark:text-neutral-300 leading-relaxed break-words pl-2.5 sm:pl-3 border-l-2 border-cyan-400/50 dark:border-cyan-600/50">
                同時押し（Nキーロールオーバー）に対応していれば、まずは手持ちのキーボードで十分に対戦を始められます。
              </span>
            </li>
          </ul>
        </section>

        {/* 2. 買い替えが必要か */}
        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-neutral-800 pb-2">
            いま持っているキーボードからの買い替えは必要？
          </h2>
          <p>
            スト6をキーボードで始めるにあたって、最初から高級なゲーミングキーボードを買い直す必要はありません。まず確認すべき基準は「同時押しに対応しているかどうか」の1点です。
          </p>
          <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 space-y-2 text-xs sm:text-sm">
            <div className="font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>手持ちのキーボードで確認できるチェック項目</span>
            </div>
            <ul className="space-y-1.5 text-neutral-600 dark:text-neutral-400">
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">1.</span>
                <span><strong>同時押しの判定（ロールオーバー）：</strong> 一般的な事務用メンブレンキーボードでは、3〜4キーを同時に押すと一部のキーが反応しない「ゴースト」が発生することがあります。方向キーと攻撃ボタンを同時に押したときに抜けが生じる場合は、ゲーミング仕様のキーボードへの移行が強く推奨されます。</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">2.</span>
                <span><strong>対応プラットフォームの確認：</strong> キーボード操作は主に「PC版（Steam）」を対象としています。PlayStation 5などの家庭用ゲーム機では、ゲーム側の仕様によりキーボード単体での対戦操作には対応していないためご注意ください。</span>
              </li>
            </ul>
          </div>
        </section>

        {/* 3. 選ぶ基準 */}
        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-neutral-800 pb-2">
            購入前に確認すべき3つの判断基準
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 space-y-2">
              <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-[10px] font-bold text-neutral-600 dark:text-neutral-400">
                基準 1
              </span>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                ラピッドトリガーの有無
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                キーをわずかに上へ浮かせた瞬間にスイッチがOFFになる機能です。歩きガード時の「前入れから後ろガードへの切り替え」や、コンボ入力後の素早いニュートラル復帰において圧倒的なアドバンテージがあります。
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 space-y-2">
              <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-[10px] font-bold text-neutral-600 dark:text-neutral-400">
                基準 2
              </span>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                配列とサイズ（60% vs TKL）
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                60%小型サイズは机を広く使え、キーボードを斜めに配置する格ゲー特有のプレイスタイルに最適です。一方、日常的に文章入力やショートカットキーを多用する方は、テンキーレス（TKL）が快適です。
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 space-y-2">
              <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-[10px] font-bold text-neutral-600 dark:text-neutral-400">
                基準 3
              </span>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                AP（作動点）の調整機能
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                アクチュエーションポイント（キーが反応する深さ）を0.1mmなどの浅い設定にすることで、ボタンを押した瞬間に最速で技が発生します。暴発が気になるキーは個別に深めに設定できる機種が理想です。
              </p>
            </div>
          </div>
        </section>

        {/* 4. 候補の比較表 */}
        <section>
          <DeviceComparisonTable products={keyboardProducts} />
        </section>

        {/* 5. 各候補の詳細説明 */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-cyan-500" />
            <h2 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white">
              おすすめ製品の個別解説と特徴
            </h2>
          </div>

          <div className="space-y-6">
            {keyboardProducts.map((product) => (
              <DeviceProductCard
                key={product.id}
                product={product}
                articleSlug="keyboard"
              />
            ))}
          </div>
        </section>

        {/* 6. 大会ルール・同時入力（SOCD）に関する注意点 */}
        <section className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 space-y-3">
          <div className="flex items-center gap-2 text-neutral-900 dark:text-white font-bold text-sm sm:text-base">
            <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
            <span>競技利用・同時入力（SOCD）の公式仕様について</span>
          </div>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            スト6のゲーム内処理では、左右の方向キーを同時に押した場合は「ニュートラル」、上下を同時に押した場合は「ニュートラル」として処理されるルールが公式に適用されています（CAPCOM Pro Tour規定準拠）。キーボード入力の際もゲーム内の入力仕様に準拠して動作するため、安心してプレイできます。
          </p>
        </section>

        {/* 7. 関連情報・ハブへのリンク */}
        <section className="pt-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/sf6/devices"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline"
          >
            <span>← デバイス・プレイ環境ハブへ戻る</span>
          </Link>

          <div className="flex items-center gap-4 text-xs font-bold">
            <Link
              href="/sf6/devices/gaming-pc"
              className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            >
              PCスペック選びを見る →
            </Link>
            <Link
              href="/sf6/devices/monitor"
              className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            >
              モニター選びを見る →
            </Link>
          </div>
        </section>

        {/* 掲載方針・広告表記について（フッター直上） */}
        <DeviceEditorialPolicy />
      </main>
    </div>
  );
}
