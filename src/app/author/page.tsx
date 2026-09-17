import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { AUTHOR_INFO } from '@/data/author';
import { constructMetadata } from '@/lib/seo';
import { Trophy, ExternalLink, ChevronRight, CheckCircle2, ShieldCheck, Mail, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: '著者紹介（にこ太郎）',
  description:
    '「にこ太郎の格ゲーLAB」著者・にこ太郎のプロフィール、スト6におけるプレイヤー実績、攻略記事の執筆方針・検証方法、更新・訂正方針について掲載しています。',
  canonicalUrl: '/author',
});

export default function AuthorPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors">
      {/* パンくずナビゲーション */}
      <div className="border-b border-neutral-200/80 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xs">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-11 flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
          <Link href="/" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
            ホーム
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-300 dark:text-neutral-600" />
          <span className="font-bold text-neutral-900 dark:text-white">著者紹介</span>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
        {/* メインプロフィールカード */}
        <section className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden ring-4 ring-amber-500/20 dark:ring-amber-400/20 bg-neutral-100 dark:bg-neutral-800 shrink-0 shadow-md">
              <Image
                src={AUTHOR_INFO.avatar || '/icon.png'}
                alt={AUTHOR_INFO.name}
                width={112}
                height={112}
                className="w-full h-full object-cover"
                priority
              />
            </div>

            <div className="space-y-3 flex-1 min-w-0">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-50 dark:bg-cyan-950/50 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800 text-[11px] font-bold">
                <span>サイト運営者 / 攻略ライター</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
                {AUTHOR_INFO.name}
              </h1>

              {/* 実績バッジ */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                <span className="inline-flex items-center gap-1 text-xs font-bold text-neutral-800 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-800 px-3 py-1 rounded-full border border-neutral-200 dark:border-neutral-700">
                  <span>🥋</span>
                  <span>{AUTHOR_INFO.mrRating}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 dark:text-amber-200 bg-amber-50 dark:bg-amber-950/60 px-3 py-1 rounded-full border border-amber-300 dark:border-amber-700/80 shadow-2xs">
                  <Trophy className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 fill-current" />
                  <span>{AUTHOR_INFO.award}</span>
                </span>
              </div>

              <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed pt-1">
                {AUTHOR_INFO.bio}
              </p>

              {/* SNS・外部リンク */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 pt-2">
                {AUTHOR_INFO.xUrl && (
                  <a
                    href={AUTHOR_INFO.xUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 transition-colors shadow-2xs"
                  >
                    <span>𝕏</span>
                    <span>公式X ({AUTHOR_INFO.xHandle})</span>
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>
                )}
                {AUTHOR_INFO.noteUrl && (
                  <a
                    href={AUTHOR_INFO.noteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 transition-colors"
                  >
                    <span>note</span>
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>
                )}
                {AUTHOR_INFO.youtubeUrl && (
                  <a
                    href={AUTHOR_INFO.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 transition-colors"
                  >
                    <span>YouTube</span>
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* プレイヤー実績と活動記録 */}
        <section className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-neutral-100 dark:border-neutral-800 pb-3">
            <Trophy className="w-5 h-5 text-amber-500" />
            <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
              プレイヤー実績・活動記録
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/70 dark:border-neutral-700/60 space-y-1.5">
              <span className="text-xs font-bold text-neutral-500 dark:text-neutral-400">ストリートファイター6 実績</span>
              <p className="text-sm font-bold text-neutral-900 dark:text-white">全キャラクター 1800MR以上到達</p>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                全キャラクターをマスターランクおよび1800MR以上まで実際にプレイし、各キャラクターの強み・弱点・立ち回り構造を実戦を通じて網羅的に把握しています。
              </p>
            </div>
            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/70 dark:border-neutral-700/60 space-y-1.5">
              <span className="text-xs font-bold text-neutral-500 dark:text-neutral-400">執筆実績</span>
              <p className="text-sm font-bold text-neutral-900 dark:text-white">note大会 2連覇達成 🏆</p>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                note上での格闘ゲーム攻略記事コンテストにて2連覇を達成。有料攻略記事は累計2,000部以上の購読実績があります。
              </p>
            </div>
          </div>

          {/* 大会優勝記事リンク */}
          {AUTHOR_INFO.championshipArticles && AUTHOR_INFO.championshipArticles.length > 0 && (
            <div className="pt-2">
              <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-2">
                🏆 note大会 優勝記事の確認先：
              </span>
              <div className="flex flex-wrap gap-2.5">
                {AUTHOR_INFO.championshipArticles.map((art, idx) => (
                  <a
                    key={idx}
                    href={art.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 hover:border-amber-400 transition-colors"
                  >
                    <span>{art.title}</span>
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* 攻略記事の執筆方針と検証方法 */}
        <section className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-neutral-100 dark:border-neutral-800 pb-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
              攻略方針と検証方法
            </h2>
          </div>
          <div className="space-y-4 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
            <div>
              <h3 className="font-bold text-neutral-900 dark:text-white mb-1">1. 実戦で迷わない「判断の簡略化」を重視</h3>
              <p>
                知識や技の数をむやみに増やすのではなく、実戦の対戦中に「次は何を狙えばいいか」を迷わず選択できるように、状況別の優先順位や思考フレームワーク（三すくみ・間合い管理・警戒対象の絞り込み）を整理して解説しています。
              </p>
            </div>
            <div>
              <h3 className="font-bold text-neutral-900 dark:text-white mb-1">2. ゲーム内トレーニングモードでのデータ検証</h3>
              <p>
                掲載しているコンボレシピ・起き攻めセットプレイ・確定反撃は、ゲーム内のトレーニングモードおよび実戦リプレイにて、フレーム状況・当たり判定・受け身両対応の持続確認を行っています。
              </p>
            </div>
            <div>
              <h3 className="font-bold text-neutral-900 dark:text-white mb-1">3. コーチング事例アーカイブの位置づけ</h3>
              <p>
                サイト内に掲載しているコーチング添削記事は、各受講生の実戦リプレイを対象に実施した当時の記録です。受講カルテに記載の「実施年月（例: 2024年10月）」時点のゲーム仕様に基づいているため、最新バージョンでは一部の技性能やフレームが異なる場合があります。当時の思考プロセスや立ち回り改善の事例としてご活用ください。
              </p>
            </div>
          </div>
        </section>

        {/* 更新・訂正方針とお問い合わせ */}
        <section className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-neutral-100 dark:border-neutral-800 pb-3">
            <ShieldCheck className="w-5 h-5 text-cyan-600" />
            <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
              更新・訂正方針とお問い合わせ
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
            掲載しているデータ・記述には万全を期しておりますが、ゲームの大型アップデートやバランス調整、あるいは表記の誤りを発見された場合は、随時確認のうえ訂正・追記を行っております。
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900 transition-colors shadow-xs"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>お問い合わせフォーム</span>
            </Link>
            {AUTHOR_INFO.xUrl && (
              <a
                href={AUTHOR_INFO.xUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 transition-colors"
              >
                <span>公式Xでのご報告・お問い合わせ</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            )}
          </div>
        </section>

        {/* トップへ戻る */}
        <div className="text-center pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>攻略トップページへ戻る</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
