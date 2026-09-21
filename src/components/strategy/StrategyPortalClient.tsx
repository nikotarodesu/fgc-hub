'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Article } from '@/data/articles';
import {
  Search,
  X,
  GraduationCap,
  Sparkles,
  ChevronRight,
  Clock,
  BookOpen,
  Filter,
  Layers,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

interface StrategyPortalClientProps {
  articles: Article[];
}

type DifficultyFilter = 'all' | 'beginner' | 'intermediate' | 'advanced';
type ThemeFilter = 'all' | 'ground' | 'advantage' | 'defense' | 'resource' | 'training';

const THEME_OPTIONS: Array<{ id: ThemeFilter; label: string }> = [
  { id: 'all', label: 'すべてのテーマ' },
  { id: 'ground', label: '地上戦・間合い' },
  { id: 'advantage', label: '有利・不利の攻防' },
  { id: 'defense', label: '防御・リスク管理' },
  { id: 'resource', label: 'ゲージ・リソース' },
  { id: 'training', label: '判断・練習設計' },
];

const DIFFICULTY_OPTIONS: Array<{ id: DifficultyFilter; label: string; countSuffix: string }> = [
  { id: 'all', label: 'すべて (25)', countSuffix: '全25記事' },
  { id: 'beginner', label: '初級 (9)', countSuffix: 'STEP 1〜9' },
  { id: 'intermediate', label: '中級 (10)', countSuffix: 'STEP 1〜10' },
  { id: 'advanced', label: '上級 (6)', countSuffix: 'STEP 1〜6' },
];

const DIFFICULTY_STYLE = {
  beginner: 'bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800',
  intermediate: 'bg-amber-50 text-amber-700 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800',
  advanced: 'bg-purple-50 text-purple-700 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800',
};

const DIFFICULTY_STEP_BG = {
  beginner: 'bg-emerald-600 text-white',
  intermediate: 'bg-amber-600 text-white',
  advanced: 'bg-purple-600 text-white',
};

export default function StrategyPortalClient({ articles }: StrategyPortalClientProps) {
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyFilter>('all');
  const [selectedTheme, setSelectedTheme] = useState<ThemeFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // フィルタリング処理
  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      // 難易度一致
      if (selectedDifficulty !== 'all' && article.difficulty !== selectedDifficulty) {
        return false;
      }
      // テーマ一致
      if (selectedTheme !== 'all' && article.theme !== selectedTheme) {
        return false;
      }
      // 検索キーワード一致
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const inTitle = article.title.toLowerCase().includes(query);
        const inSummary = article.summary.toLowerCase().includes(query);
        const inTheme = (article.themeLabel || '').toLowerCase().includes(query);
        const inTakeaways = (article.keyTakeaways || []).some((k) => k.toLowerCase().includes(query));
        const inTarget = (article.targetAudience || '').toLowerCase().includes(query);
        if (!inTitle && !inSummary && !inTheme && !inTakeaways && !inTarget) {
          return false;
        }
      }
      return true;
    });
  }, [articles, selectedDifficulty, selectedTheme, searchQuery]);

  const handleResetFilters = () => {
    setSelectedDifficulty('all');
    setSelectedTheme('all');
    setSearchQuery('');
  };

  return (
    <div className="space-y-8">
      {/* 初心者向けスタートガイドバナー */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-600 text-white p-6 sm:p-8 shadow-md">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            おすすめの学習ルート
          </span>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight mb-2">
            どこから読めばいいか迷ったら？
          </h2>
          <p className="text-sm sm:text-base text-cyan-50 leading-relaxed mb-4">
            まずは初級STEP 1の「判断を減らす練習」からスタートしましょう。
            技の選択肢をあらかじめ絞る思考法を身につけることで、その後の地上戦・差し返し・防御の吸収スピードが劇的に上がります。
          </p>
          <Link
            href="/sf6/strategy/handan-wo-herasu-renshu"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-cyan-800 font-bold text-sm hover:bg-cyan-50 transition-all shadow-sm group"
          >
            <span>初級 STEP 1「判断を減らす練習」から始める</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="absolute right-[-20px] bottom-[-20px] opacity-15 pointer-events-none">
          <GraduationCap className="w-64 h-64 text-white" />
        </div>
      </div>

      {/* コントロールパネル（検索 ＆ タブフィルター） */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/90 dark:border-neutral-800 p-5 sm:p-6 shadow-xs space-y-5">
        {/* インクリメンタル検索バー */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="記事名、キーワード、テーマ（例: 差し返し、遅らせ投げ、対空、バーンアウト）で検索..."
            className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50/70 dark:bg-neutral-800/60 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
              aria-label="検索キーワードをクリア"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* 難易度フィルタータブ */}
        <div>
          <label className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-2 block">
            難易度で絞り込む
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {DIFFICULTY_OPTIONS.map((diff) => {
              const isSelected = selectedDifficulty === diff.id;
              return (
                <button
                  key={diff.id}
                  type="button"
                  onClick={() => setSelectedDifficulty(diff.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all text-center ${
                    isSelected
                      ? 'bg-cyan-600 text-white border-cyan-600 shadow-xs'
                      : 'bg-neutral-50 dark:bg-neutral-800/60 border-neutral-200 dark:border-neutral-700/80 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                  }`}
                >
                  <div>{diff.label}</div>
                  <div className={`text-[11px] font-normal ${isSelected ? 'text-cyan-100' : 'text-neutral-400'}`}>
                    {diff.countSuffix}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* テーマ5分類フィルタータブ */}
        <div>
          <label className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-neutral-400" />
            <span>テーマ別で絞り込む</span>
          </label>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {THEME_OPTIONS.map((theme) => {
              const isSelected = selectedTheme === theme.id;
              return (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => setSelectedTheme(theme.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                    isSelected
                      ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 border-neutral-900 dark:border-white shadow-2xs'
                      : 'bg-neutral-100/80 dark:bg-neutral-800/80 border-transparent text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                  }`}
                >
                  {theme.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 件数表示 & リセット */}
        <div className="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-neutral-800 text-xs text-neutral-500 dark:text-neutral-400">
          <div>
            表示中: <span className="font-bold text-neutral-900 dark:text-white text-sm">{filteredArticles.length}</span> 件 / 全25件
          </div>
          {(selectedDifficulty !== 'all' || selectedTheme !== 'all' || searchQuery) && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-cyan-600 dark:text-cyan-400 hover:underline font-medium flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              <span>フィルターを初期化</span>
            </button>
          )}
        </div>
      </div>

      {/* 記事一覧グリッド（推奨学習順） */}
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {filteredArticles.map((article) => {
            const diffKey = article.difficulty || 'beginner';
            const badgeClass = DIFFICULTY_STYLE[diffKey];
            const stepBgClass = DIFFICULTY_STEP_BG[diffKey];

            return (
              <Link
                key={article.slug}
                href={`/sf6/strategy/${article.slug}`}
                className="group flex flex-col justify-between rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 p-5 sm:p-6 hover:border-cyan-500/90 dark:hover:border-cyan-500/80 hover:shadow-md transition-all relative overflow-hidden"
              >
                <div>
                  {/* ヘッダーバッジ列 */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-black px-2.5 py-0.5 rounded-md ${stepBgClass}`}
                    >
                      <span>{article.difficultyLabel}</span>
                      <span className="font-mono">STEP {article.difficultyOrder}</span>
                    </span>

                    {article.themeLabel && (
                      <span className="text-[11px] font-medium text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded border border-neutral-200/60 dark:border-neutral-700">
                        {article.themeLabel}
                      </span>
                    )}

                    <span className="ml-auto text-[11px] text-neutral-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{article.readTime}</span>
                    </span>
                  </div>

                  {/* 記事タイトル */}
                  <h3 className="text-lg sm:text-xl font-black text-neutral-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors leading-snug mb-2">
                    {article.title}
                  </h3>

                  {/* 要約テキスト */}
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed line-clamp-2 mb-3">
                    {article.summary}
                  </p>

                  {/* 要点プレビュー（1点） */}
                  {article.keyTakeaways && article.keyTakeaways[0] && (
                    <div className="bg-neutral-50 dark:bg-neutral-800/50 p-2.5 rounded-xl border border-neutral-100 dark:border-neutral-800 text-xs text-neutral-700 dark:text-neutral-300 flex items-start gap-2 mb-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{article.keyTakeaways[0]}</span>
                    </div>
                  )}
                </div>

                {/* カードフッター */}
                <div className="pt-3 mt-3 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-xs">
                  <span className="text-neutral-400 text-[11px]">完全無料公開</span>
                  <span className="inline-flex items-center gap-1 font-bold text-cyan-600 dark:text-cyan-400 group-hover:translate-x-0.5 transition-transform">
                    <span>記事を読む</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        /* 0件時の親切な案内 */
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-8 sm:p-12 text-center">
          <div className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-400 flex items-center justify-center mx-auto mb-3">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white mb-2">
            一致する共通技術記事が見つかりませんでした
          </h3>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-md mx-auto mb-5">
            検索キーワードを変更するか、難易度・テーマの絞り込み条件をリセットしてお試しください。
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-xs font-bold hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            <span>フィルターをすべて解除</span>
          </button>
        </div>
      )}
    </div>
  );
}
