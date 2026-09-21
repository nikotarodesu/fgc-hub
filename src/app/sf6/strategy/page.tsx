'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { SF6_COMMON_TECHNIQUES_ARTICLES } from '@/data/articles/sf6CommonTechniques';
import {
  BookOpen,
  ArrowUpDown,
  GraduationCap,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Zap,
  Target,
} from 'lucide-react';

const DIFFICULTY_CONFIG = {
  all: {
    label: 'すべて',
    count: 25,
    description: '全25テーマを網羅。基本の地上戦構造から試合全体の操作までを体系化。',
    color: 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900',
    badge: 'bg-neutral-100 text-neutral-800 border-neutral-300 dark:bg-neutral-800 dark:text-neutral-200 dark:border-neutral-700',
    activeTab: 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900',
  },
  beginner: {
    label: '初級',
    count: 9,
    description: '対戦の基本構造を理解する。すぐに一つの判断として実戦へ導入しやすい内容です。',
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800',
    activeTab: 'bg-emerald-600 text-white dark:bg-emerald-500 dark:text-neutral-900',
    icon: ShieldCheck,
  },
  intermediate: {
    label: '中級',
    count: 10,
    description: '距離と相手の行動に合わせる。距離、技相性、相手の行動を見て複数の選択肢を使い分ける内容です。',
    badge: 'bg-amber-50 text-amber-700 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800',
    activeTab: 'bg-amber-600 text-white dark:bg-amber-500 dark:text-neutral-900',
    icon: Zap,
  },
  advanced: {
    label: '上級',
    count: 6,
    description: '相手の選択と試合全体を操作する。相手の反応、リソース、試合展開まで含めて読み合いを設計する内容です。',
    badge: 'bg-purple-50 text-purple-700 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800',
    activeTab: 'bg-purple-600 text-white dark:bg-purple-500 dark:text-neutral-900',
    icon: Target,
  },
} as const;

type DifficultyFilter = 'all' | 'beginner' | 'intermediate' | 'advanced';
type SortOrder = 'number' | 'learning';

function StrategyContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const paramLevel = searchParams?.get('level') as DifficultyFilter | null;
  const [selectedLevel, setSelectedLevel] = useState<DifficultyFilter>(
    paramLevel && ['all', 'beginner', 'intermediate', 'advanced'].includes(paramLevel)
      ? paramLevel
      : 'all'
  );
  const [sortOrder, setSortOrder] = useState<SortOrder>('learning');

  useEffect(() => {
    if (paramLevel && ['all', 'beginner', 'intermediate', 'advanced'].includes(paramLevel)) {
      setSelectedLevel(paramLevel);
    }
  }, [paramLevel]);

  const handleFilterChange = (level: DifficultyFilter) => {
    setSelectedLevel(level);
    const newUrl = level === 'all' ? '/sf6/strategy' : `/sf6/strategy?level=${level}`;
    router.replace(newUrl, { scroll: false });
  };

  // フィルタリングと並び替え
  const displayArticles = useMemo(() => {
    let list = [...SF6_COMMON_TECHNIQUES_ARTICLES];

    if (selectedLevel !== 'all') {
      list = list.filter((a) => a.difficulty === selectedLevel);
    }

    if (sortOrder === 'learning') {
      // 難易度別の学習順（初級→中級→上級、それぞれの難易度内は difficultyOrder 順）
      const diffWeight = { beginner: 1, intermediate: 2, advanced: 3 };
      list.sort((a, b) => {
        const weightA = a.difficulty ? diffWeight[a.difficulty] : 0;
        const weightB = b.difficulty ? diffWeight[b.difficulty] : 0;
        if (weightA !== weightB) return weightA - weightB;
        return (a.difficultyOrder || 0) - (b.difficultyOrder || 0);
      });
    } else {
      // 記事番号順（01〜25）
      list.sort((a, b) => (a.articleNumber || 0) - (b.articleNumber || 0));
    }

    return list;
  }, [selectedLevel, sortOrder]);

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors pb-16">
      {/* ヒーローヘッダー */}
      <section className="bg-white dark:bg-neutral-900 border-b border-neutral-200/80 dark:border-neutral-800 pt-6 pb-6 sm:pt-8 sm:pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* パンくず */}
          <nav aria-label="Breadcrumb" className="mb-3 text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5 flex-wrap">
            <Link href="/" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
              ホーム
            </Link>
            <span>/</span>
            <Link href="/sf6" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
              スト6
            </Link>
            <span>/</span>
            <span className="text-neutral-800 dark:text-neutral-200 font-bold" aria-current="page">
              共通技術
            </span>
          </nav>

          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-cyan-600 text-white font-bold text-xs shadow-xs">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>全25講・完全無料</span>
              </span>
              <span className="text-xs font-bold text-neutral-500 dark:text-neutral-400">
                スト6共通理論シリーズ
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-900 dark:text-white tracking-tight leading-tight">
              スト6 共通技術・地上戦攻略 25選
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 mt-2 leading-relaxed">
              置き・差し・差し返しの基本原則から、歩きガード、先端連係、リソース管理、弾の動かし方まで。
              キャラクターを選ばず勝率に直結する「判断と立ち回りの教科書」を初級・中級・上級の学習順で体系化。
            </p>
          </div>
        </div>
      </section>

      {/* コントロールバー（難易度フィルター ＆ 並び順ソート） */}
      <section className="sticky top-14 z-30 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-b border-neutral-200/80 dark:border-neutral-800 py-3 shadow-2xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* 難易度ボタン一覧 */}
          <div
            role="group"
            aria-label="難易度フィルター"
            className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none"
          >
            {(['all', 'beginner', 'intermediate', 'advanced'] as const).map((lvl) => {
              const cfg = DIFFICULTY_CONFIG[lvl];
              const isSelected = selectedLevel === lvl;

              return (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => handleFilterChange(lvl)}
                  aria-pressed={isSelected}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 shadow-2xs ${
                    isSelected
                      ? lvl === 'all'
                        ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 ring-2 ring-neutral-900 dark:ring-white'
                        : `${cfg.activeTab} ring-2 ring-offset-1 dark:ring-offset-neutral-900`
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                  }`}
                >
                  <span>{cfg.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400 font-mono'}`}>
                    {cfg.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ソート順切り替え */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium flex items-center gap-1">
              <ArrowUpDown className="w-3 h-3" />
              <span>並び順:</span>
            </span>
            <div className="inline-flex bg-neutral-100 dark:bg-neutral-800 p-0.5 rounded-lg border border-neutral-200 dark:border-neutral-700 text-xs">
              <button
                type="button"
                onClick={() => setSortOrder('learning')}
                aria-pressed={sortOrder === 'learning'}
                className={`px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer ${
                  sortOrder === 'learning'
                    ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs'
                    : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
                }`}
              >
                推奨学習順
              </button>
              <button
                type="button"
                onClick={() => setSortOrder('number')}
                aria-pressed={sortOrder === 'number'}
                className={`px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer ${
                  sortOrder === 'number'
                    ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs'
                    : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
                }`}
              >
                記事番号順 (01-25)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 難易度説明バナー */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-5 pb-2">
        <div className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-2xs flex items-start gap-3">
          <div className="p-2 rounded-lg bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 shrink-0">
            <BookOpen className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-neutral-900 dark:text-white">
                {DIFFICULTY_CONFIG[selectedLevel].label} の学習指針
              </span>
              <span className="text-xs text-neutral-400">
                ({displayArticles.length}件表示中)
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
              {DIFFICULTY_CONFIG[selectedLevel].description}
            </p>
          </div>
        </div>
      </section>

      {/* 記事一覧グリッド */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {displayArticles.map((article) => {
            const diffConfig = article.difficulty ? DIFFICULTY_CONFIG[article.difficulty] : null;

            return (
              <Link
                key={article.slug}
                href={`/sf6/strategy/${article.slug}`}
                className="group flex flex-col justify-between bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/90 dark:border-neutral-800 p-4 sm:p-5 hover:border-cyan-500/80 dark:hover:border-cyan-500/80 hover:shadow-md transition-all relative overflow-hidden"
              >
                {/* カード上部 */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    {/* 記事番号 */}
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-xs font-black text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-200/80 dark:border-cyan-800/60">
                        #{String(article.articleNumber).padStart(2, '0')}
                      </span>
                      {sortOrder === 'learning' && (
                        <span className="text-[10px] text-neutral-400 font-mono">
                          (学習順 {article.difficultyOrder})
                        </span>
                      )}
                    </div>

                    {/* 難易度タグ（文字併記必須・ハイコントラスト） */}
                    {diffConfig && (
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md border shadow-2xs ${diffConfig.badge}`}
                      >
                        <span>{diffConfig.label}</span>
                      </span>
                    )}
                  </div>

                  {/* タイトル */}
                  <h2 className="text-base sm:text-lg font-black text-neutral-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors leading-snug mb-2">
                    {article.title}
                  </h2>

                  {/* 要約・抜粋 */}
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed mb-4">
                    {article.summary}
                  </p>
                </div>

                {/* カード下部 */}
                <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400 dark:text-neutral-500">
                  <span>読了目安: {article.readTime}</span>
                  <span className="inline-flex items-center gap-1 font-bold text-cyan-600 dark:text-cyan-400 group-hover:translate-x-0.5 transition-transform">
                    <span>解説を読む</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default function SF6StrategySeriesPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm text-neutral-500">読み込み中...</div>}>
      <StrategyContent />
    </Suspense>
  );
}
