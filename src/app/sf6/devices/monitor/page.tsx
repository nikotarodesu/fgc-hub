import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Monitor,
  ShieldCheck,
  Sparkles,
  Clock,
  Calendar,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Tv,
  Eye,
} from 'lucide-react';
import { DEVICE_PRODUCTS } from '@/data/devices/products';
import DeviceProductCard from '@/components/devices/DeviceProductCard';
import DeviceComparisonTable from '@/components/devices/DeviceComparisonTable';
import DeviceEditorialPolicy from '@/components/devices/DeviceEditorialPolicy';

export const metadata: Metadata = {
  title: 'スト6のモニター選び｜144Hz・240Hzは必要？おすすめ機種と比較｜にこ太郎の格ゲーLAB',
  description:
    'ゲーム側60fps固定のスト6において、144Hzや240Hzゲーミングモニターを導入するメリット・表示遅延の仕組み・買い替えの判断基準を解説。PS5・PC別の接続設定とおすすめモニターを比較します。',
  alternates: {
    canonical: 'https://nikotaro.com/sf6/devices/monitor',
  },
  openGraph: {
    title: 'スト6のモニター選び｜144Hz・240Hzは必要？おすすめ機種と比較｜にこ太郎の格ゲーLAB',
    description:
      'ゲーム側60fps固定のスト6において、144Hzや240Hzゲーミングモニターを導入するメリット・表示遅延の仕組み・買い替えの判断基準を解説。',
    url: 'https://nikotaro.com/sf6/devices/monitor',
    type: 'article',
  },
};

export default function MonitorDevicePage() {
  const monitorProducts = [
    DEVICE_PRODUCTS['benq-zowie-xl2546k'],
    DEVICE_PRODUCTS['benq-mobiuz-ex2510s'],
    DEVICE_PRODUCTS['asus-tuf-vg259qr'],
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
            name: 'スト6のモニター選び｜144Hz・240Hzは必要？',
            item: 'https://nikotaro.com/sf6/devices/monitor',
          },
        ],
      },
      {
        '@type': 'Article',
        headline: 'スト6のモニター選び｜144Hz・240Hzは必要？',
        description:
          'ゲーム側60fps固定のスト6において、144Hzや240Hzゲーミングモニターを導入するメリット・表示遅延の仕組み・買い替えの判断基準を解説。',
        url: 'https://nikotaro.com/sf6/devices/monitor',
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
              モニター
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
              映像環境（モニター）
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-900 dark:text-white tracking-tight leading-snug mb-3">
            スト6のモニター選び｜144Hz・240Hzは必要？
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
              60fps固定のスト6で高リフレッシュレートは必要か？
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
            結論として、<strong>「144Hz〜165Hz以上のゲーミングモニターの導入は強く推奨」</strong>されます。スト6のゲーム内挙動は60fps固定ですが、モニター側が高周波数で描画更新を行うことで、<strong>「画面表示の遅延（内部バッファ待ち時間）を確実に短縮できる」</strong>ためです。
          </p>
          <ul className="space-y-1.5 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
            <li className="flex items-start gap-2">
              <span className="font-bold text-cyan-700 dark:text-cyan-400 shrink-0">・最もおすすめなコスパ標準帯：</span>
              <span>144Hz〜165Hz・IPSパネル・応答速度1msクラス（約2万〜3万円）。対戦時の遅延軽減と美しい画質を完璧に両立できます。</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-cyan-700 dark:text-cyan-400 shrink-0">・大会シーンや残像ゼロを追求する競技勢：</span>
              <span>240Hz・DyAc+搭載モデル（例: BenQ ZOWIE XL2546K）。ラッシュ初動の視認性やヒット確認の明瞭さを極限まで高めたい方向けです。</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-cyan-700 dark:text-cyan-400 shrink-0">・一般的な60Hzテレビや事務用モニターで遊んでいる方：</span>
              <span>テレビ特有の映像処理による大きな表示遅延（数十ms）を解消するため、ゲーミングモニターへの買い替え効果が最も体感できます。</span>
            </li>
          </ul>
        </section>

        {/* 2. 技術解説：ゲーム60fpsとモニターHzの関係 */}
        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-neutral-800 pb-2">
            60fpsのゲームで144Hz/240Hzモニターを使う技術的メリット
          </h2>
          <p>
            「スト6は秒間60フレーム（60fps）で動いているのだから、60Hzのモニターで十分ではないか？」という疑問を抱く方は少なくありません。しかし、ここには<strong>「走査ラインの更新間隔（リフレッシュレート）」</strong>と<strong>「表示遅延」</strong>の密接な関係があります。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 space-y-1.5">
              <div className="font-bold text-neutral-900 dark:text-white">60Hzモニターの場合</div>
              <div className="text-xs text-neutral-500 font-mono">1フレーム表示間隔: 約16.67ms</div>
              <p className="text-neutral-600 dark:text-neutral-400 pt-1 leading-relaxed">
                画面が次のコマに描き変わるまでに約16.6msかかります。GPUが生成した新しいフレームが、モニターの次の描画タイミングまで待たされる時間が長くなります。
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-cyan-200 dark:border-cyan-800 bg-cyan-50/20 dark:bg-cyan-950/20 space-y-1.5">
              <div className="font-bold text-cyan-700 dark:text-cyan-300">144Hzモニターの場合</div>
              <div className="text-xs text-cyan-600 font-mono">1フレーム表示間隔: 約6.94ms</div>
              <p className="text-neutral-600 dark:text-neutral-400 pt-1 leading-relaxed">
                画面の更新間隔が約7msに短縮されます。最新のゲーム入力情報が画面に反映されるまでの平均待機時間が約9ms以上短縮され、操作の手応えが格段にダイレクトになります。
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 space-y-1.5">
              <div className="font-bold text-neutral-900 dark:text-white">240Hzモニターの場合</div>
              <div className="text-xs text-neutral-500 font-mono">1フレーム表示間隔: 約4.17ms</div>
              <p className="text-neutral-600 dark:text-neutral-400 pt-1 leading-relaxed">
                更新間隔は約4ms。表示遅延の短縮に加え、高速応答液晶と黒挿入（DyAc+等）を組み合わせることで、激しく動く相手の挙動ブレ（残像）をほぼ完全に排除できます。
              </p>
            </div>
          </div>

          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            ※注意：モニターを替えるだけでプレイヤースキルそのものが向上したり、対空が100%出るようになるわけではありません。あくまで「操作と視認における機材側の足かせをゼロにする」ための投資です。
          </p>
        </section>

        {/* 3. 買い替え判断と現在の設定確認 */}
        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-neutral-800 pb-2">
            手持ちのモニターで確認できることと買い替えの判断基準
          </h2>
          <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 space-y-3 text-xs sm:text-sm">
            <div className="font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>「せっかく高リフレッシュレートモニターを買ったのに60Hzのままだった」を防ぐ設定確認</span>
            </div>
            <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
              <li className="flex items-start gap-2">
                <span className="font-bold text-cyan-600 shrink-0">PC（Windows）の設定：</span>
                <span>デスクトップ右クリック →「ディスプレイ設定」→「ディスプレイの詳細設定」を開き、リフレッシュレートが「144Hz」や「240Hz」などの最大値に設定されているか必ず確認してください（初期値が60Hzになっているケースが非常に多いです）。</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-cyan-600 shrink-0">PS5の設定：</span>
                <span>設定 →「スクリーンとビデオ」→「映像出力」で、「120Hz出力を有効にする」を「自動」に設定し、スト6ゲーム内オプションの「アンチインプットラグ」をONに設定します。これによりPS5環境でも120Hz出力による低遅延モードが動作します。</span>
              </li>
            </ul>
          </div>
        </section>

        {/* 4. モニターを選ぶ際の基準 */}
        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-neutral-800 pb-2">
            格ゲー用モニターを選ぶ際の4大チェック項目
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 space-y-2">
              <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-[10px] font-bold text-neutral-600 dark:text-neutral-400">
                サイズ
              </span>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                24〜24.5インチが格闘ゲームの黄金サイズ
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                32インチなどの大型モニターは迫力がありますが、画面の端にある「相手の体力ゲージ」「SAゲージ」「ドライブゲージ」を確認する際に視線移動が大きくなり判断が遅れます。視界全体が一目で収まる24〜24.5インチが最適です。
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 space-y-2">
              <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-[10px] font-bold text-neutral-600 dark:text-neutral-400">
                パネル方式
              </span>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                IPS（万能・高画質） vs TN（超高速・対戦特化）
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                発色が美しく普段使いや動画視聴にも適しているのは「Fast IPSパネル」。大会と同じ最速の応答速度と残像低減に特化するなら「TNパネル」を選びます。
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 space-y-2">
              <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-[10px] font-bold text-neutral-600 dark:text-neutral-400">
                応答速度
              </span>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                GtG 1ms以下が必須基準
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                画素が中間色から別の中間色へ切り替わる速度（GtG）が1ms以下のものを選びます。応答速度が遅い事務用モニター（5ms以上）では、キャラクターの動きに残像が尾を引いてしまいます。
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 space-y-2">
              <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-[10px] font-bold text-neutral-600 dark:text-neutral-400">
                スタンド調整機能
              </span>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                高さ・チルト調整ができるか
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                長時間対戦を続ける格ゲーでは、目線の高さと首の疲労が集中力に直結します。上下の高さ昇降ができるスタンド付きモデル、またはVESA規格対応（モニターアーム装着可能）の製品を選びましょう。
              </p>
            </div>
          </div>
        </section>

        {/* 5. 候補の比較表 */}
        <section>
          <DeviceComparisonTable products={monitorProducts} />
        </section>

        {/* 6. 各候補の詳細説明 */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-cyan-500" />
            <h2 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white">
              おすすめモニターの個別解説と特徴
            </h2>
          </div>

          <div className="space-y-6">
            {monitorProducts.map((product) => (
              <DeviceProductCard
                key={product.id}
                product={product}
                articleSlug="monitor"
              />
            ))}
          </div>
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
          </div>
        </section>

        {/* 掲載方針・広告表記について（フッター直上） */}
        <DeviceEditorialPolicy />
      </main>
    </div>
  );
}
