'use client';

import { useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import {
  Search,
  BookOpen,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Tag,
  Lightbulb,
  ExternalLink,
  HelpCircle,
} from 'lucide-react';
import {
  GLOSSARY_CATEGORIES,
  GLOSSARY_TERMS,
  GlossaryCategory,
  GlossaryTerm,
} from '@/data/glossary';

const CATEGORY_COLORS: Record<GlossaryCategory, { bg: string; text: string; border: string }> = {
  system: {
    bg: 'bg-blue-50 dark:bg-blue-950/40',
    text: 'text-blue-700 dark:text-blue-300',
    border: 'border-blue-200 dark:border-blue-800',
  },
  neutral: {
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    text: 'text-emerald-700 dark:text-emerald-300',
    border: 'border-emerald-200 dark:border-emerald-800',
  },
  offense: {
    bg: 'bg-rose-50 dark:bg-rose-950/40',
    text: 'text-rose-700 dark:text-rose-300',
    border: 'border-rose-200 dark:border-rose-800',
  },
  defense: {
    bg: 'bg-amber-50 dark:bg-amber-950/40',
    text: 'text-amber-700 dark:text-amber-300',
    border: 'border-amber-200 dark:border-amber-800',
  },
  slang: {
    bg: 'bg-purple-50 dark:bg-purple-950/40',
    text: 'text-purple-700 dark:text-purple-300',
    border: 'border-purple-200 dark:border-purple-800',
  },
};

export default function GlossaryClient() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | GlossaryCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const cardRefs = useRef<Record<string, HTMLElement | null>>({});

  // フィルタリング処理
  const filteredTerms = useMemo(() => {
    return GLOSSARY_TERMS.filter((term) => {
      // カテゴリ絞り込み
      if (selectedCategory !== 'all' && term.category !== selectedCategory) {
        return false;
      }

      // 検索ワード絞り込み
      if (searchQuery.trim()) {
        const query = searchQuery.trim().toLowerCase();
        const matchTerm = term.term.toLowerCase().includes(query);
        const matchKana = term.kana.toLowerCase().includes(query);
        const matchAlphabet = term.alphabet?.toLowerCase().includes(query);
        const matchSummary = term.summary.toLowerCase().includes(query);
        const matchDesc = term.description.toLowerCase().includes(query);
        if (!matchTerm && !matchKana && !matchAlphabet && !matchSummary && !matchDesc) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCategory, searchQuery]);

  // 関連用語クリックで該当カードへスクロール
  const handleJumpToTerm = (termId: string) => {
    // もし現在のフィルターで非表示になっている場合は条件をリセット
    setSelectedCategory('all');
    setSearchQuery('');

    setTimeout(() => {
      const el = cardRefs.current[termId];
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.add('ring-2', 'ring-cyan-500', 'transition-all');
        setTimeout(() => {
          el.classList.remove('ring-2', 'ring-cyan-500');
        }, 2000);
      }
    }, 50);
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
  };

  return (
    <div className="space-y-8">
      {/* 検索・絞り込みコントロール */}
      <section className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 rounded-2xl p-4 sm:p-6 shadow-xs space-y-4">
        {/* 検索バー */}
        <div className="relative">
          <Search className="w-5 h-5 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="用語名・読みがな・英語・キーワードで検索（例: フレーム、確反、シミー、パリィ...）"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-10 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-400 focus:bg-white dark:focus:bg-neutral-800 transition-all shadow-xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 rounded-md"
              aria-label="検索をクリア"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* カテゴリタブ */}
        <div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                selectedCategory === 'all'
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-xs'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              すべて ({GLOSSARY_TERMS.length})
            </button>
            {GLOSSARY_CATEGORIES.map((cat) => {
              const count = GLOSSARY_TERMS.filter((t) => t.category === cat.id).length;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    isSelected
                      ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-xs'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* 現在の絞り込み状態表示 */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-neutral-100 dark:border-neutral-800 text-xs">
          <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
            <span>表示件数:</span>
            <span className="font-bold text-neutral-900 dark:text-white text-sm">
              {filteredTerms.length} 件
            </span>
            {selectedCategory !== 'all' && (
              <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-medium">
                {GLOSSARY_CATEGORIES.find((c) => c.id === selectedCategory)?.name}
              </span>
            )}
            {searchQuery && (
              <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-medium">
                検索: 「{searchQuery}」
              </span>
            )}
          </div>

          {(selectedCategory !== 'all' || searchQuery) && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>条件をクリア</span>
            </button>
          )}
        </div>
      </section>

      {/* 用語一覧リスト */}
      {filteredTerms.length === 0 ? (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 rounded-2xl p-10 text-center space-y-4">
          <HelpCircle className="w-10 h-10 text-neutral-400 mx-auto" />
          <div className="space-y-1">
            <h3 className="text-base font-bold text-neutral-900 dark:text-white">
              該当する用語が見つかりませんでした
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              検索キーワードを変更するか、絞り込み条件を解除してお試しください。
            </p>
          </div>
          <button
            type="button"
            onClick={handleResetFilters}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-bold shadow-xs hover:opacity-90 transition-opacity"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>すべての用語を表示</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {filteredTerms.map((item) => {
            const catInfo = GLOSSARY_CATEGORIES.find((c) => c.id === item.category);
            const color = CATEGORY_COLORS[item.category];

            return (
              <article
                key={item.id}
                ref={(el) => {
                  cardRefs.current[item.id] = el;
                }}
                id={`term-${item.id}`}
                className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 rounded-2xl p-5 sm:p-6 shadow-2xs hover:border-neutral-300 dark:hover:border-neutral-700 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* ヘッダー情報（カテゴリ・英語・かな） */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${color.bg} ${color.text} ${color.border}`}
                    >
                      {catInfo?.name}
                    </span>
                    {item.alphabet && (
                      <span className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500">
                        {item.alphabet}
                      </span>
                    )}
                  </div>

                  {/* 用語名 */}
                  <div>
                    <span className="text-[11px] text-neutral-400 dark:text-neutral-500 block leading-tight">
                      {item.kana}
                    </span>
                    <h2 className="text-lg sm:text-xl font-black text-neutral-900 dark:text-white tracking-tight leading-snug">
                      {item.term}
                    </h2>
                  </div>

                  {/* 1行要約 */}
                  <div className="p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-100 dark:border-neutral-800 text-xs font-medium text-neutral-800 dark:text-neutral-200 leading-relaxed">
                    {item.summary}
                  </div>

                  {/* 詳細解説 */}
                  <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {item.description}
                  </p>

                  {/* 実戦アドバイス / 上達のコツ */}
                  {item.tips && (
                    <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 space-y-1">
                      <div className="flex items-center gap-1.5 text-amber-800 dark:text-amber-300 text-[11px] font-bold">
                        <Lightbulb className="w-3.5 h-3.5 shrink-0" />
                        <span>実戦アドバイス・上達のコツ</span>
                      </div>
                      <p className="text-xs text-amber-900/90 dark:text-amber-200/90 leading-relaxed pl-5">
                        {item.tips}
                      </p>
                    </div>
                  )}
                </div>

                {/* 関連用語 */}
                {item.relatedTerms && item.relatedTerms.length > 0 && (
                  <div className="pt-4 mt-4 border-t border-neutral-100 dark:border-neutral-800">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] font-semibold text-neutral-400 dark:text-neutral-500 flex items-center gap-1">
                        <Tag className="w-2.5 h-2.5" />
                        <span>関連用語:</span>
                      </span>
                      {item.relatedTerms.map((relId) => {
                        const relTerm = GLOSSARY_TERMS.find((t) => t.id === relId);
                        if (!relTerm) return null;
                        return (
                          <button
                            key={relId}
                            type="button"
                            onClick={() => handleJumpToTerm(relId)}
                            className="inline-flex items-center gap-0.5 text-[10px] font-medium px-2 py-0.5 rounded-md bg-neutral-100 hover:bg-cyan-50 dark:bg-neutral-800 dark:hover:bg-cyan-950/50 text-neutral-700 hover:text-cyan-700 dark:text-neutral-300 dark:hover:text-cyan-300 transition-colors cursor-pointer"
                          >
                            <span>{relTerm.term.split('（')[0]}</span>
                            <ArrowRight className="w-2.5 h-2.5" />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}

      {/* 下部リンクカード */}
      <section className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white rounded-2xl p-6 sm:p-8 space-y-4 shadow-md">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-400/20 text-cyan-300 text-[11px] font-bold border border-cyan-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>実戦で使える攻略理論</span>
          </div>
          <h3 className="text-lg sm:text-xl font-black">
            用語を理解したら、実戦の立ち回りとコンボを学ぼう
          </h3>
          <p className="text-xs text-neutral-300 leading-relaxed">
            「にこ太郎の格ゲーLAB」では、全キャラ1800MR以上の視点から、スト6の立ち回り理論、有利フレーム別の起き攻めセットプレイ、逆引きリーサルツールを体系的に公開しています。
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link
            href="/sf6/strategy"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-neutral-950 font-bold text-xs transition-colors shadow-xs"
          >
            <span>スト6共通上達論を読む</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors"
          >
            <span>トップページ（攻略記事一覧）へ</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
