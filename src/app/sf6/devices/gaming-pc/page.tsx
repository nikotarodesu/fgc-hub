import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Laptop,
  ShieldCheck,
  Sparkles,
  Clock,
  Calendar,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Cpu,
  MonitorCheck,
} from 'lucide-react';
import { DEVICE_PRODUCTS } from '@/data/devices/products';
import DeviceProductCard from '@/components/devices/DeviceProductCard';
import DeviceComparisonTable from '@/components/devices/DeviceComparisonTable';
import DeviceEditorialPolicy from '@/components/devices/DeviceEditorialPolicy';

export const metadata: Metadata = {
  title: 'スト6用PCの必要スペックと選び方｜にこ太郎の格ゲーLAB',
  description:
    'CAPCOM公式の動作環境をもとに、スト6（ストリートファイター6）を快適にプレイ・配信するために必要なゲーミングPCのスペックと失敗しない選び方を徹底解説。フルHD標準構成から配信兼用構成まで紹介します。',
  alternates: {
    canonical: 'https://nikotaro.com/sf6/devices/gaming-pc',
  },
  openGraph: {
    title: 'スト6用PCの必要スペックと選び方｜にこ太郎の格ゲーLAB',
    description:
      'CAPCOM公式の動作環境をもとに、スト6を快適にプレイ・配信するために必要なゲーミングPCのスペックと失敗しない選び方を徹底解説。',
    url: 'https://nikotaro.com/sf6/devices/gaming-pc',
    type: 'article',
  },
};

export default function GamingPcDevicePage() {
  const pcProducts = [
    DEVICE_PRODUCTS['pc-standard-rtx4060'],
    DEVICE_PRODUCTS['pc-high-rtx4070-super'],
    DEVICE_PRODUCTS['pc-entry-budget'],
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
            name: 'スト6用PCの必要スペックと選び方',
            item: 'https://nikotaro.com/sf6/devices/gaming-pc',
          },
        ],
      },
      {
        '@type': 'Article',
        headline: 'スト6用PCの必要スペックと選び方',
        description:
          'CAPCOM公式の動作環境をもとに、スト6を快適にプレイ・配信するために必要なゲーミングPCのスペックと失敗しない選び方を徹底解説。',
        url: 'https://nikotaro.com/sf6/devices/gaming-pc',
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
              ゲーミングPC
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
              動作環境（ゲーミングPC）
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-900 dark:text-white tracking-tight leading-snug mb-3">
            スト6用PCの必要スペックと選び方
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500 dark:text-neutral-400 pt-2 border-t border-neutral-100 dark:border-neutral-800">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-neutral-400" />
              <span>読了目安: 約10分</span>
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
              用途別・最適なゲーミングPC構成の結論
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
            スト6の対戦バトル（Fighting Ground）は、競技性の観点から<strong>「最大60fps固定」</strong>で動作する設計になっています。そのため、無駄に高額な最上位グラフィックボードを揃える必要はありません。
          </p>
          <ul className="space-y-1.5 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
            <li className="flex items-start gap-2">
              <span className="font-bold text-cyan-700 dark:text-cyan-400 shrink-0">・フルHDで快適に対戦したい方（一番人気）：</span>
              <span>「Core i5 / Ryzen 5 + GeForce RTX 4060 + メモリ16GB」構成（約15〜18万円）で最高画質でも60fps張り付きでプレイできます。</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-cyan-700 dark:text-cyan-400 shrink-0">・OBS配信・録画・動画編集も同時に行いたい方：</span>
              <span>「Core i7 / Ryzen 7 + GeForce RTX 4070 SUPER + メモリ32GB」構成（約23〜28万円）が安心です。</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-cyan-700 dark:text-cyan-400 shrink-0">・予算重視で始めたい方：</span>
              <span>画質設定を「標準〜中」に落とすことで、RTX 3050等のエントリー構成（約10万〜12万円）でも対戦に必要な60fpsを安定確保できます。</span>
            </li>
          </ul>
        </section>

        {/* 2. CAPCOM公式スペックの確認 */}
        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-neutral-800 pb-2">
            CAPCOM公式のシステム要件（2026年確認）
          </h2>
          <p>
            カプコンが公開している『ストリートファイター6』PC版（Steam）の動作環境は以下の通りです。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            {/* 必要動作環境 */}
            <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 space-y-2">
              <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 font-bold text-neutral-600 dark:text-neutral-400">
                必要動作環境（設定：低 / 1080p 30〜60fps想定）
              </span>
              <ul className="space-y-1 text-neutral-600 dark:text-neutral-400 pt-1">
                <li>・<strong>OS:</strong> Windows 10 (64-BIT必須)</li>
                <li>・<strong>CPU:</strong> Intel Core i5-7500 / AMD Ryzen 3 1200</li>
                <li>・<strong>メモリ:</strong> 8 GB RAM</li>
                <li>・<strong>GPU:</strong> GTX 1060 / Radeon RX 580 (VRAM 4GB以上)</li>
                <li>・<strong>DirectX:</strong> Version 12</li>
                <li>・<strong>ストレージ:</strong> 60 GB以上の空き容量</li>
              </ul>
              <p className="text-[11px] text-amber-600 dark:text-amber-400 pt-1">
                ※必要環境は起動して動作する最低基準であり、オンライン対戦での常時60fps維持には推奨環境以上が推奨されます。
              </p>
            </div>

            {/* 推奨動作環境 */}
            <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 space-y-2">
              <span className="px-2 py-0.5 rounded bg-cyan-50 dark:bg-cyan-950/60 font-bold text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
                推奨動作環境（設定：中〜高 / 1080p 60fps安定）
              </span>
              <ul className="space-y-1 text-neutral-600 dark:text-neutral-400 pt-1">
                <li>・<strong>OS:</strong> Windows 10 / 11 (64-BIT)</li>
                <li>・<strong>CPU:</strong> Intel Core i7-8700 / AMD Ryzen 5 3600</li>
                <li>・<strong>メモリ:</strong> 16 GB RAM</li>
                <li>・<strong>GPU:</strong> RTX 2070 / Radeon RX 5700 XT (VRAM 6GB以上)</li>
                <li>・<strong>DirectX:</strong> Version 12</li>
                <li>・<strong>ストレージ:</strong> 60 GB以上の空き容量</li>
              </ul>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 pt-1">
                ※現在の現行モデル（RTX 4060等）であれば、この推奨環境を大幅に上回るため、対戦中の処理落ちはほぼ回避できます。
              </p>
            </div>
          </div>
        </section>

        {/* 3. 買い替え判断・手持ちPCでの確認法 */}
        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-neutral-800 pb-2">
            手持ちPCで確認できることと買い替えの判断基準
          </h2>
          <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 space-y-3 text-xs sm:text-sm">
            <div className="font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>公式ベンチマークツールの活用方法</span>
            </div>
            <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
              Steam上でCAPCOM公式が無料配布している<strong>「Street Fighter 6 Benchmark Tool」</strong>を実行することで、お使いのPCでバトルシーンが安定して60fpsを出せるかスコア形式で確認できます。
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-xs">
              <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                <span className="font-bold text-emerald-700 dark:text-emerald-300 block">スコア 90〜100点</span>
                <span className="text-neutral-600 dark:text-neutral-400">問題なく快適にプレイ可能。買い替えは不要です。</span>
              </div>
              <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
                <span className="font-bold text-amber-700 dark:text-amber-300 block">スコア 70〜89点</span>
                <span className="text-neutral-600 dark:text-neutral-400">グラフィック設定を「標準〜低」に下げれば対戦可能です。</span>
              </div>
              <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800">
                <span className="font-bold text-rose-700 dark:text-rose-300 block">スコア 69点以下</span>
                <span className="text-neutral-600 dark:text-neutral-400">バトル中に処理落ち（水中戦）が発生するため買い替え推奨です。</span>
              </div>
            </div>
          </div>
        </section>

        {/* 4. 選ぶ基準 */}
        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-neutral-800 pb-2">
            購入前に確認すべき4つのパーツ基準
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 space-y-2">
              <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-[10px] font-bold text-neutral-600 dark:text-neutral-400">
                GPU（グラフィックボード）
              </span>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                RTX 4060が現代のスト6黄金基準
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                対戦時のフルHD最高設定で60fpsを完全に固定できます。過剰に高額なRTX 4080や4090等は、スト6目的のみであれば予算の無駄になりやすいため無理に選ぶ必要はありません。
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 space-y-2">
              <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-[10px] font-bold text-neutral-600 dark:text-neutral-400">
                メモリ（RAM）
              </span>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                対戦単体なら16GB・配信するなら32GB
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                ゲーム単体の起動であれば16GBで不足ありません。ただし、Discordで通話しながらOBS配信を行ったり、ブラウザでフレーム表を開きながらプレイする場合は32GBへのカスタマイズが安心です。
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 space-y-2">
              <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-[10px] font-bold text-neutral-600 dark:text-neutral-400">
                ストレージ（SSD）
              </span>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                NVMe M.2 SSD 1TB以上を推奨
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                スト6本体で約60GBを消費し、キャラクター追加や大型アップデートで容量が増加します。HDDではなく高速なNVMe SSDを選ぶことで、ステージロード時間を最小化できます。
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 space-y-2">
              <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-[10px] font-bold text-neutral-600 dark:text-neutral-400">
                有線LANポート（必須）
              </span>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                Wi-Fiではなく必ず有線LAN接続
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                格闘ゲームのオンライン対戦ではパケットロスと回線の揺らぎが命取りになります。PC本体背面の有線LANポートからルーターへLANケーブル（CAT6以上）を直結できる環境を整えてください。
              </p>
            </div>
          </div>
        </section>

        {/* 5. 候補の比較表 */}
        <section>
          <DeviceComparisonTable products={pcProducts} />
        </section>

        {/* 6. 各候補の詳細説明 */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-cyan-500" />
            <h2 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white">
              用途別おすすめ構成の解説
            </h2>
          </div>

          <div className="space-y-6">
            {pcProducts.map((product) => (
              <DeviceProductCard
                key={product.id}
                product={product}
                articleSlug="gaming-pc"
              />
            ))}
          </div>
        </section>

        {/* 7. 本体価格以外に確認すべき周辺要件 */}
        <section className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 space-y-3">
          <div className="flex items-center gap-2 text-neutral-900 dark:text-white font-bold text-sm sm:text-base">
            <AlertCircle className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
            <span>本体購入時・購入後に必要な周辺環境の確認</span>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
            <li className="flex items-start gap-2">
              <span className="text-neutral-400">•</span>
              <span><strong>モニター接続端子：</strong> ゲーミングPCは通常DisplayPortまたはHDMIで出力します。高リフレッシュレート（144Hz以上）を出す場合は付属のDisplayPortケーブルでの接続を推奨します。</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-neutral-400">•</span>
              <span><strong>USBポート数：</strong> アケコンやレバーレス、マウス、キーボード、ヘッドセットなどを同時に繋ぐため、背面に4ポート以上のUSB-A端子があるか確認しておくとハブ要らずで配線が安定します。</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-neutral-400">•</span>
              <span><strong>BTOメーカーの保証：</strong> 初期不良対応や1〜3年の無償修理保証がついている大手の国内BTOメーカー（ドスパラ、マウスコンピューター等）を選ぶと、万が一の故障時もサポートを受けやすくなります。</span>
            </li>
          </ul>
        </section>

        {/* 8. 関連情報・ハブへのリンク */}
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
