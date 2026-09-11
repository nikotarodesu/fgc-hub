import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SF6_CHARACTERS } from '@/data/sf6/characters';
import { constructMetadata } from '@/lib/seo';
import { ChevronRight, Zap, CheckCircle2, Flame, ShieldCheck, ArrowRight, BookOpen } from 'lucide-react';

interface PageProps {
  params: Promise<{ character: string }>;
}

export async function generateStaticParams() {
  return Object.keys(SF6_CHARACTERS).map((slug) => ({
    character: slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { character } = await params;
  const char = SF6_CHARACTERS[character];
  if (!char) return constructMetadata({ title: 'キャラクターが見つかりません' });

  return constructMetadata({
    title: `${char.name} 徹底攻略ハブ | 立ち回り・強み・コンボ・起き攻め`,
    description: `スト6 ${char.name}の基本性能、強み・立ち回り方針、実戦コンボ・起き攻めデータベース。全キャラ1800MR以上の筆者「にこ太郎」監修。`,
    canonicalUrl: `/sf6/${character}`,
  });
}

export default async function CharacterHubPage({ params }: PageProps) {
  const { character } = await params;
  const char = SF6_CHARACTERS[character];

  if (!char) {
    notFound();
  }

  return (
    <div className="min-h-screen pb-16 bg-[#f0f9fb]">
      {/* ページ上部パンくず */}
      <div className="bg-white border-b border-neutral-200/80 sticky top-0 z-30 shadow-xs">
        <div className="max-w-5xl mx-auto px-4 py-2.5 flex items-center justify-between text-xs">
          <nav className="flex items-center gap-1.5 text-neutral-500 overflow-x-auto py-1">
            <Link href="/" className="hover:text-[#00a3c4] transition-colors shrink-0">
              ホーム
            </Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0 text-neutral-300" />
            <Link href="/sf6" className="hover:text-[#00a3c4] transition-colors shrink-0">
              スト6攻略ハブ
            </Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0 text-neutral-300" />
            <span className="font-bold text-neutral-900 shrink-0">{char.name}</span>
          </nav>
          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            アプデ追従最速
          </span>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 pt-8 space-y-6">
        {/* キャラクターヒーロー */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200/80 shadow-xs relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#00a3c4]/10 text-[#00a3c4] mb-3">
                <Flame className="w-3.5 h-3.5 text-orange-500" />
                <span>ストリートファイター6 キャラクター攻略</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-neutral-900 tracking-tight flex items-baseline gap-3">
                <span>{char.name}</span>
                <span className="text-base sm:text-lg font-normal text-neutral-400 font-mono">
                  {char.nameEn}
                </span>
              </h1>
              <p className="text-xs sm:text-sm font-bold text-[#00a3c4] mt-2">
                タイプ: {char.archetype}
              </p>
              <p className="text-xs sm:text-sm text-neutral-600 mt-3 leading-relaxed max-w-2xl">
                {char.description}
              </p>
            </div>

            {/* コンボツールへの直行CTA */}
            <div className="bg-gradient-to-br from-neutral-900 to-slate-900 text-white p-5 rounded-2xl border border-neutral-800 shrink-0 w-full sm:w-72 shadow-lg">
              <span className="text-[10px] font-black tracking-wider text-cyan-400 block mb-1">
                INTERACTIVE TOOL
              </span>
              <h3 className="font-bold text-base mb-1.5 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-[#00a3c4]" />
                コンボ＆起き攻めDB
              </h3>
              <p className="text-xs text-neutral-400 mb-4 leading-relaxed">
                {char.hasTool
                  ? `全${char.comboCount}件の実戦コンボ・+42F詐欺飛びを搭載！`
                  : '実戦検証データを作成中。先行してキャミィツールが稼働中。'}
              </p>
              <Link
                href={`/sf6/${char.slug}/combos`}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-black bg-[#00a3c4] hover:bg-[#008ba8] text-white transition-all shadow-md hover:scale-[1.02]"
              >
                <span>{char.hasTool ? 'コンボツールを起動' : 'コンボ画面を見る'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* 主な強み・特徴 */}
        <section className="bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-xs space-y-4">
          <h2 className="font-black text-base text-neutral-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#00a3c4]" />
            <span>{char.name}の主な強み・キーポイント</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {char.strengths.map((st, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/70 flex items-start gap-2.5"
              >
                <CheckCircle2 className="w-4 h-4 text-[#00a3c4] shrink-0 mt-0.5" />
                <span className="text-xs font-bold text-neutral-800 leading-relaxed">{st}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 関連ナビゲーション */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href={`/sf6/${char.slug}/combos`}
            className="group p-5 rounded-2xl bg-white border border-neutral-200/80 hover:border-[#00a3c4] transition-all shadow-xs flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 text-[#00a3c4] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-neutral-900 text-sm group-hover:text-[#00a3c4] transition-colors">
                  {char.name} コンボ・起き攻め検索
                </h4>
                <p className="text-xs text-neutral-500">ダメージ・ゲージ消費・有利F</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-[#00a3c4] transition-colors" />
          </Link>

          <Link
            href="/sf6"
            className="group p-5 rounded-2xl bg-white border border-neutral-200/80 hover:border-[#00a3c4] transition-all shadow-xs flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#00a3c4] flex items-center justify-center group-hover:scale-110 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-neutral-900 text-sm group-hover:text-[#00a3c4] transition-colors">
                  スト6攻略ハブトップへ
                </h4>
                <p className="text-xs text-neutral-500">全キャラクター一覧・更新情報・共通理論</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-[#00a3c4] transition-colors" />
          </Link>
        </div>
      </main>
    </div>
  );
}
