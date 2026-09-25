import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  Sparkles,
  Clock,
  Calendar,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Gamepad2,
  Zap,
} from 'lucide-react';
import { DEVICE_PRODUCTS } from '@/data/devices/products';
import DeviceProductCard from '@/components/devices/DeviceProductCard';
import DeviceComparisonTable from '@/components/devices/DeviceComparisonTable';
import DeviceEditorialPolicy from '@/components/devices/DeviceEditorialPolicy';

export const metadata: Metadata = {
  title: 'スト6向けレバーレスの選び方とおすすめ｜にこ太郎の格ゲーLAB',
  description:
    'スト6（ストリートファイター6）におけるレバーレスコントローラーの選び方とおすすめ機種を徹底解説。入力速度・歩きガードのメリット、PS5/PCの対応状況、薄型とフルサイズの違いまで比較します。',
  alternates: {
    canonical: 'https://nikotaro.com/sf6/devices/leverless',
  },
  openGraph: {
    title: 'スト6向けレバーレスの選び方とおすすめ｜にこ太郎の格ゲーLAB',
    description:
      'スト6におけるレバーレスコントローラーの選び方とおすすめ機種を徹底解説。入力速度・歩きガードのメリット、PS5/PCの対応状況、薄型とフルサイズの違いまで比較。',
    url: 'https://nikotaro.com/sf6/devices/leverless',
    type: 'article',
  },
};

export default function LeverlessDevicePage() {
  const leverlessProducts = [
    DEVICE_PRODUCTS['punk-workshop-mini-hitbox'],
    DEVICE_PRODUCTS['haute42-t16'],
    DEVICE_PRODUCTS['hitbox-original'],
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
            name: 'スト6向けレバーレスの選び方とおすすめ',
            item: 'https://nikotaro.com/sf6/devices/leverless',
          },
        ],
      },
      {
        '@type': 'Article',
        headline: 'スト6向けレバーレスの選び方とおすすめ',
        description:
          'スト6におけるレバーレスコントローラーの選び方とおすすめ機種を徹底解説。入力速度・歩きガードのメリット、PS5/PCの対応状況、薄型とフルサイズの違いまで比較。',
        url: 'https://nikotaro.com/sf6/devices/leverless',
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
              レバーレス
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
              操作機器（レバーレス）
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-900 dark:text-white tracking-tight leading-snug mb-3">
            スト6向けレバーレスの選び方とおすすめ
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500 dark:text-neutral-400 pt-2 border-t border-neutral-100 dark:border-neutral-800">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-neutral-400" />
              <span>読了目安: 約9分</span>
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
        <section className="p-6 rounded-2xl bg-cyan-50/50 dark:bg-cyan-950/20 border border-cyan-200/80 dark:border-cyan-800/60 space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-cyan-600 text-white font-bold text-xs">
              結論
            </span>
            <h2 className="text-base sm:text-lg font-black text-neutral-900 dark:text-white">
              用途別・レバーレス選びの最適解
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
            レバーレスコントローラーは、方向入力をレバーではなくボタンで行うコントローラーです。スト6において「歩きガードの切り替え速度」「前ステップの最速入力」「対空昇龍拳の安定化」に絶大な威力を発揮します。
          </p>
          <ul className="space-y-1.5 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
            <li className="flex items-start gap-2">
              <span className="font-bold text-cyan-700 dark:text-cyan-400 shrink-0">・競技志向で最速反応・薄型を求める方：</span>
              <span>キーストロークが浅く反応速度に特化した「PUNK WORKSHOP Mini HitBox」が現代のプロ・ハイエンド標準です。</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-cyan-700 dark:text-cyan-400 shrink-0">・低予算（1万円台）で多ボタンを試したい方：</span>
              <span>16ボタンで超低遅延基板を備えた「Haute42 T16」がコストパフォーマンス圧倒的No.1です。</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-cyan-700 dark:text-cyan-400 shrink-0">・膝置きでどっしり安定してプレイしたい方：</span>
              <span>金属製重厚ボディと三和電子ボタンを採用した元祖「Hit Box」が長時間の対戦でも抜群の安定感を誇ります。</span>
            </li>
          </ul>
        </section>

        {/* 2. 導入が必要か・パッドやアケコンとの違い */}
        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-neutral-800 pb-2">
            パッドやアケコンからレバーレスへ乗り換えるべき？
          </h2>
          <p>
            スト6はドライブインパクトやドライブパリィなど、とっさのボタン操作が勝敗を分けるゲームです。レバーレスには以下の明確なメリットがあります。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-emerald-700 dark:text-emerald-400">
                <Zap className="w-4 h-4" />
                <span>レバーレスの最大のメリット</span>
              </div>
              <ul className="space-y-1.5 text-neutral-600 dark:text-neutral-400">
                <li>・<strong>歩きガードの圧倒的速さ：</strong> レバーを倒し直すストローク時間がゼロになり、前歩きから指を離して後ろボタンを押すだけで即ガードできます。</li>
                <li>・<strong>最速前ステップ・ラッシュ：</strong> 前ボタンをトントンと2回叩くだけで最速フレームのステップ・生ラッシュが出せます。</li>
                <li>・<strong>コマンドの指別分担：</strong> 波動・昇龍・真空波動コマンドを複数の指でピアノ打ちできるため、入力ブレが少なくなります。</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-amber-700 dark:text-amber-400">
                <AlertCircle className="w-4 h-4" />
                <span>導入前の注意点と慣れが必要な点</span>
              </div>
              <ul className="space-y-1.5 text-neutral-600 dark:text-neutral-400">
                <li>・<strong>上ボタン（ジャンプ）の位置：</strong> 親指で押す最下段のボタンが「上（ジャンプ）」になるため、初めの1〜2週間は頭の直感とのズレに練習が必要です。</li>
                <li>・<strong>回転コマンドの習熟：</strong> ザンギエフ等の1回転・2回転コマンドは、レバーのように回せないため特殊なスライド入力技術が求められます。</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 3. 購入前に確認すべき4つの判断基準 */}
        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-neutral-800 pb-2">
            レバーレスを選ぶ際の4大チェック基準
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 space-y-2">
              <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-[10px] font-bold text-neutral-600 dark:text-neutral-400">
                基準 1
              </span>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                対応プラットフォーム（PC専用かPS5対応か）
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                PC（Steam）版のみで遊ぶ場合はほぼすべてのレバーレスが即座に動作します。しかしPS5でプレイする場合、PS5専用認証チップ（Brook Fusion等）が搭載されていない格安機は「約8分で切断される」制限があります。PS5で使う場合は対応可否またはコンバーター（Wingman FGC等）の併用を確認してください。
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 space-y-2">
              <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-[10px] font-bold text-neutral-600 dark:text-neutral-400">
                基準 2
              </span>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                筐体のタイプ（薄型軽量 vs フルサイズ重量級）
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                机の上に置いてプレイする方やオフライン対戦・遠征が多い方は「薄型タイプ」が圧倒的に便利です。一方、ソファや椅子に座って太ももの上に乗せる「膝置きスタイル」の方は、ある程度の重さ（1.5〜2kg）があるフルサイズの方が安定します。
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 space-y-2">
              <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-[10px] font-bold text-neutral-600 dark:text-neutral-400">
                基準 3
              </span>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                ボタンの増設数（12ボタン vs 16ボタン）
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                従来の基本配置（方向4＋攻撃8）に加え、スト6では「ドライブパリィ」「ドライブインパクト」を単独で割り振れる追加ボタン（左手上部や親指横のボタン）があると、咄嗟の反応速度が格段に向上します。
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 space-y-2">
              <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-[10px] font-bold text-neutral-600 dark:text-neutral-400">
                基準 4
              </span>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                スイッチの交換性（ホットスワップ対応）
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                頻繁に連打するボタンの故障や打鍵感の好みに合わせて、ハンダ付けなしでキースイッチを交換できる「ホットスワップ対応」のモデルを選ぶと、メンテナンスの手間が大幅に減り長年使い続けられます。
              </p>
            </div>
          </div>
        </section>

        {/* 4. 候補の比較表 */}
        <section>
          <DeviceComparisonTable products={leverlessProducts} />
        </section>

        {/* 5. 各候補の詳細説明 */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-cyan-500" />
            <h2 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white">
              おすすめレバーレスの個別解説と特徴
            </h2>
          </div>

          <div className="space-y-6">
            {leverlessProducts.map((product) => (
              <DeviceProductCard
                key={product.id}
                product={product}
                articleSlug="leverless"
              />
            ))}
          </div>
        </section>

        {/* 6. 大会公式ルール（SOCD仕様） */}
        <section className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 space-y-3">
          <div className="flex items-center gap-2 text-neutral-900 dark:text-white font-bold text-sm sm:text-base">
            <AlertCircle className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
            <span>CAPCOM Pro Tour（CPT）公認のSOCDルールについて</span>
          </div>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            現在スト6の公式大会ルールでは、反対方向の同時入力（SOCD）に関して<strong>「左右同時押し＝ニュートラル」「上下同時押し＝ニュートラル」</strong>の処理が義務付けられています。今回紹介した3製品はすべてこのCPT最新ルールに適合したファームウェア設定に対応しているため、公式大会や対戦会でもそのまま安心してご使用いただけます。
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
              href="/sf6/devices/keyboard"
              className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            >
              キーボード選びを見る →
            </Link>
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
