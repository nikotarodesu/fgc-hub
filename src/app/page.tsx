'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ARTICLES_DATA, getArticleEyecatch, parseArticleTitle } from '@/data/articles';
import {
  Search,
  Lock,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  Flame,
  X,
  RotateCcw,
} from 'lucide-react';

const QUICK_CHARACTERS = [
  { name: 'リュウ', image: '/images/characters/ryu/sns.jpg' },
  { name: 'ケン', image: '/images/characters/ken/sns.jpg' },
  { name: '豪鬼', image: '/images/characters/akuma/sns.jpg' },
  { name: 'ジュリ', image: '/images/characters/juri/sns.jpg' },
  { name: 'エド', image: '/images/characters/ed/sns.jpg' },
  { name: 'ベガ', image: '/images/characters/bison/sns.jpg' },
  { name: '春麗', image: '/images/characters/chunli/sns.jpg' },
  { name: 'キャミィ', image: '/images/characters/cammy/sns.jpg' },
  { name: 'ブランカ', image: '/images/characters/blanka/sns.jpg' },
  { name: 'JP', image: '/images/characters/jp/sns.jpg' },
  { name: 'ザンギエフ', image: '/images/characters/zangief/sns.jpg' },
  { name: 'マリーザ', image: '/images/characters/marisa/sns.jpg' },
  { name: '不知火舞', image: '/images/characters/mai/sns.jpg' },
  { name: 'ガイル', image: '/images/characters/guile/sns.jpg' },
];

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'character' | 'neutral' | 'coaching' | 'system'>('all');
  const [selectedControlType, setSelectedControlType] = useState<'all' | 'classic' | 'modern'>('all');
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // 全キャラクター別記事数の集計
  const allCharCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    ARTICLES_DATA.forEach((article) => {
      if (article.character) {
        counts[article.character] = (counts[article.character] || 0) + 1;
      }
    });
    return counts;
  }, []);

  // フィルタリング処理
  const filteredArticles = useMemo(() => {
    return ARTICLES_DATA.filter((article) => {
      if (selectedCategory === 'character') {
        const isCharGuide =
          article.category === 'character' ||
          article.tags.includes('完全攻略') ||
          article.tags.includes('キャラ別攻略');
        if (!isCharGuide) return false;

        if (selectedControlType === 'classic') {
          if (article.controlType !== 'classic' && article.controlType !== 'both') return false;
        } else if (selectedControlType === 'modern') {
          if (article.controlType !== 'modern' && article.controlType !== 'both') return false;
        }
      }
      if (selectedCategory === 'neutral') {
        const isNeutral =
          article.category === 'neutral' ||
          article.tags.includes('立ち回り') ||
          article.tags.includes('立ち回り考察');
        if (!isNeutral) return false;
      }
      if (selectedCategory === 'coaching') {
        const isCoaching =
          article.category === 'coaching' ||
          article.tags.includes('過去のコーチング') ||
          article.tags.includes('コーチング');
        if (!isCoaching) return false;
      }
      if (selectedCategory === 'system') {
        const isSystem =
          article.category === 'system' ||
          article.category === 'mindset' ||
          article.tags.includes('共通技術') ||
          article.tags.includes('共通理論') ||
          article.tags.includes('システム');
        if (!isSystem) return false;
      }
      if (selectedCharacter && article.character !== selectedCharacter) return false;
      if (selectedTag && !article.tags.includes(selectedTag)) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const inTitle = article.title.toLowerCase().includes(q);
        const inSummary = article.summary.toLowerCase().includes(q);
        const inChar = (article.character || '').toLowerCase().includes(q);
        const inTags = article.tags.some((t) => t.toLowerCase().includes(q));
        if (!inTitle && !inSummary && !inChar && !inTags) return false;
      }

      return true;
    });
  }, [selectedCategory, selectedControlType, selectedCharacter, selectedTag, searchQuery]);

  // ピックアップ枠の表示可否（全記事一覧かつ絞り込みがない、またはリュウ選択時のみ表示）
  const isPickupVisible =
    selectedCategory === 'all' &&
    (!selectedCharacter || selectedCharacter === 'リュウ') &&
    !searchQuery.trim() &&
    !selectedTag;

  const handleResetFilters = () => {
    setSelectedCharacter(null);
    setSelectedCategory('all');
    setSelectedControlType('all');
    setSearchQuery('');
    setSelectedTag(null);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors">
      
      {/* 1. コンパクトなサイト紹介・主見出し（押し下げない構成） */}
      <section className="bg-white dark:bg-neutral-900 border-b border-neutral-200/80 dark:border-neutral-800 pt-5 pb-4 sm:pt-6 sm:pb-5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-3.5">
          <div className="max-w-3xl">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-neutral-900 dark:text-white tracking-tight leading-tight">
              スト6のキャラ攻略・立ち回り・実戦ツール
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1 leading-relaxed">
              全キャラ1800MR以上の視点から、実戦で差がつく立ち回り理論・状況別コンボ・起き攻めデータを体系化。
            </p>
          </div>

          {/* プレミアム会員へのコンパクトな案内バー */}
          <div className="p-3 sm:p-3.5 rounded-xl bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 shadow-2xs">
            <div className="flex items-center gap-2 min-w-0">
              <span className="px-2 py-0.5 rounded-md bg-cyan-400/20 text-cyan-300 text-[10px] font-black border border-cyan-400/30 shrink-0">
                PREMIUM
              </span>
              <span className="text-xs text-neutral-200 truncate">
                公開中の全攻略記事・実戦添削コーチング・逆引きリーサルツールが読み放題（¥980/月）
              </span>
            </div>
            <Link
              href="/membership"
              className="inline-flex items-center gap-1 text-xs font-bold text-cyan-300 hover:text-white transition-colors shrink-0 whitespace-nowrap self-end sm:self-auto"
            >
              <span>特典・会員案内を見る</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. 検索・キャラクター選択・絞り込みブロック（一まとまりとして整理） */}
      <section className="bg-white/60 dark:bg-neutral-900/60 border-b border-neutral-200/80 dark:border-neutral-800 py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-4">
          
          {/* 検索バー */}
          <div className="max-w-xl relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="記事タイトル・キャラクター・技名で検索..."
              className="w-full pl-10 pr-12 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-400 focus:bg-white dark:focus:bg-neutral-800 transition-all shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 font-medium"
              >
                クリア
              </button>
            )}
          </div>

          {/* キャラクター丸アイコン */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-orange-500" />
                <span>キャラクターから探す</span>
              </span>
              {selectedCharacter && (
                <button
                  type="button"
                  onClick={() => setSelectedCharacter(null)}
                  className="text-[11px] text-cyan-600 dark:text-cyan-400 hover:underline font-bold cursor-pointer"
                >
                  キャラ絞り込み解除 ({selectedCharacter})
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none">
              {/* ALLボタン */}
              <button
                type="button"
                onClick={() => setSelectedCharacter(null)}
                className={`flex flex-col items-center gap-1 shrink-0 transition-transform cursor-pointer ${
                  selectedCharacter === null ? 'scale-105' : 'opacity-70 hover:opacity-100'
                }`}
              >
                <div
                  className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-black text-xs transition-all shadow-xs ${
                    selectedCharacter === null
                      ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 ring-2 ring-neutral-900 dark:ring-white ring-offset-2 dark:ring-offset-neutral-900'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700'
                  }`}
                >
                  ALL
                </div>
                <span className={`text-[10px] font-bold ${
                  selectedCharacter === null ? 'text-neutral-900 dark:text-white' : 'text-neutral-500 dark:text-neutral-400'
                }`}>
                  全キャラ
                </span>
              </button>

              {/* 各キャラクター丸アイコン */}
              {QUICK_CHARACTERS.map((char) => {
                const count = allCharCounts[char.name] || 0;
                const isSelected = selectedCharacter === char.name;
                return (
                  <button
                    key={char.name}
                    type="button"
                    onClick={() => setSelectedCharacter(isSelected ? null : char.name)}
                    className={`flex flex-col items-center gap-1 shrink-0 transition-all cursor-pointer ${
                      isSelected ? 'scale-105' : 'opacity-75 hover:opacity-100'
                    }`}
                  >
                    <div
                      className={`relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden transition-all shadow-xs bg-neutral-900 ${
                        isSelected
                          ? 'ring-2 ring-cyan-500 dark:ring-cyan-400 ring-offset-2 dark:ring-offset-neutral-900 shadow-md shadow-cyan-500/20'
                          : 'border border-neutral-200/80 dark:border-neutral-700 hover:border-neutral-400'
                      }`}
                    >
                      <img
                        src={char.image}
                        alt={char.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div className="flex items-center gap-0.5">
                      <span
                        className={`text-[10px] font-bold ${
                          isSelected
                            ? 'text-cyan-600 dark:text-cyan-400 font-black'
                            : 'text-neutral-700 dark:text-neutral-300'
                        }`}
                      >
                        {char.name}
                      </span>
                      {count > 0 && (
                        <span className="text-[9px] font-mono text-neutral-400">
                          ({count})
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 記事種別タブ（全記事 / 攻略記事 / 立ち回り / 共通技術 / コーチング） */}
          <div className="pt-1 flex flex-wrap items-center justify-between gap-2.5">
            <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800/80 p-1 rounded-lg border border-neutral-200/60 dark:border-neutral-700/60 overflow-x-auto">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === 'all'
                    ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs font-bold'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                全記事
              </button>
              <button
                onClick={() => setSelectedCategory('character')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === 'character'
                    ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs font-bold'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                攻略記事
              </button>
              <button
                onClick={() => setSelectedCategory('neutral')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === 'neutral'
                    ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs font-bold'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                立ち回り
              </button>
              <button
                onClick={() => setSelectedCategory('system')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === 'system'
                    ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs font-bold'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                共通技術
              </button>
              <button
                onClick={() => setSelectedCategory('coaching')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === 'coaching'
                    ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs font-bold'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                コーチング
              </button>
            </div>

            {/* 操作タイプ切り替え（攻略記事選択時） */}
            {selectedCategory === 'character' && (
              <div className="inline-flex items-center gap-1 p-1 rounded-lg bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200/60 dark:border-neutral-700/60 text-xs">
                <button
                  type="button"
                  onClick={() => setSelectedControlType('all')}
                  className={`px-2.5 py-1 rounded text-[11px] font-bold ${
                    selectedControlType === 'all'
                      ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs'
                      : 'text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  全タイプ
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedControlType('classic')}
                  className={`px-2.5 py-1 rounded text-[11px] font-bold ${
                    selectedControlType === 'classic'
                      ? 'bg-[#8B5BB7] text-white shadow-xs'
                      : 'text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  クラシック
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedControlType('modern')}
                  className={`px-2.5 py-1 rounded text-[11px] font-bold ${
                    selectedControlType === 'modern'
                      ? 'bg-[#D8843F] text-white shadow-xs'
                      : 'text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  モダン
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. 選択中の条件、該当件数、条件解除バー */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-5 pb-2">
        <div className="flex flex-wrap items-center justify-between gap-2.5 p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-2xs">
          <div className="flex items-center gap-2 flex-wrap text-xs">
            <span className="font-bold text-neutral-500 dark:text-neutral-400">表示中の条件:</span>
            {selectedCharacter ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-bold text-xs">
                {selectedCharacter}
              </span>
            ) : (
              <span className="font-medium text-neutral-800 dark:text-neutral-200">全キャラクター</span>
            )}

            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-bold text-[11px]">
                {selectedCategory === 'character'
                  ? '攻略記事'
                  : selectedCategory === 'neutral'
                  ? '立ち回り'
                  : selectedCategory === 'coaching'
                  ? 'コーチング'
                  : '共通技術'}
              </span>
            )}

            {searchQuery.trim() && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-cyan-50 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300 text-[11px]">
                &quot;{searchQuery}&quot;
              </span>
            )}

            <span className="text-neutral-400 dark:text-neutral-500">|</span>
            <span className="text-neutral-600 dark:text-neutral-300 font-medium">
              該当 <strong className="text-neutral-900 dark:text-white font-black text-sm">{filteredArticles.length}</strong> 件
            </span>
          </div>

          {(selectedCharacter || selectedCategory !== 'all' || searchQuery || selectedTag) && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>条件を解除して全件表示</span>
            </button>
          )}
        </div>
      </section>

      {/* 4. 結果一覧エリア */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-4 space-y-6">
        <div className="max-w-4xl mx-auto space-y-4">
          
          {/* ピックアップ枠（未絞り込み時またはリュウ選択時のみ表示） */}
          {isPickupVisible && (
            <div className="mb-2">
              <div className="flex items-center gap-2 mb-2 sm:mb-2.5">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold text-xs tracking-wide shadow-xs">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>ピックアップ攻略</span>
                </span>
              </div>

              <Link
                href="/articles/ryu-complete-guide"
                className="group relative block rounded-2xl overflow-hidden border-2 border-cyan-500/80 dark:border-cyan-500/60 bg-gradient-to-br from-white via-cyan-50/20 to-white dark:from-neutral-900 dark:via-neutral-900 dark:to-cyan-950/30 shadow-md hover:shadow-xl hover:border-cyan-500 transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center">
                  <div className="relative w-full md:w-80 lg:w-96 aspect-[16/9] shrink-0 bg-neutral-950 overflow-hidden self-center">
                    <img
                      src="/images/characters/ryu/sns.jpg"
                      alt="C・Mリュウの完全攻略"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent md:hidden" />
                    <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 md:hidden">
                      <span className="text-[10px] font-black px-2 py-0.5 rounded bg-cyan-600 text-white">
                        完全攻略
                      </span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-neutral-900/80 backdrop-blur-xs text-white">
                        C/M両対応
                      </span>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 lg:p-6 flex flex-col justify-between flex-1 min-w-0">
                    <div>
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-black px-2.5 py-0.5 rounded-full bg-cyan-600 text-white">
                          ★ 完全攻略
                        </span>
                        <span className="text-[11px] font-bold text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded">
                          リュウ
                        </span>
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold">
                          <span className="px-1.5 py-0.5 rounded text-white text-[9px] font-bold bg-[#8B5BB7]">C</span>
                          <span className="px-1.5 py-0.5 rounded text-white text-[9px] font-bold bg-[#D8843F]">M</span>
                          <span className="text-neutral-600 dark:text-neutral-300">両対応</span>
                        </span>
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-200 dark:border-cyan-800">
                          <Sparkles className="w-3 h-3" />
                          <span>逆引きリーサルツール付属</span>
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg lg:text-xl font-black text-neutral-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors leading-snug mb-1.5">
                        C・Mリュウの完全攻略：立ち回り,起き攻め,厳選コンボなど
                      </h3>

                      <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mb-3 line-clamp-2 sm:line-clamp-3">
                        全シチュエーション別の実戦コンボレシピ、フレーム状況に応じた起き攻めセットプレイ、距離別の立ち回り方針、そして相手残り体力から最適解を逆引きする専用リーサルツールまで収録。
                      </p>
                    </div>

                    <div className="pt-2.5 border-t border-neutral-200/60 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-2.5">
                      <span className="text-[11px] sm:text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>アップデート追記保証</span>
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-neutral-900 dark:text-white">
                          ¥500 / 会員読み放題
                        </span>
                        <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold text-xs group-hover:bg-cyan-600 dark:group-hover:bg-cyan-500 dark:group-hover:text-white transition-colors shadow-xs">
                          <span>攻略を読む</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* 該当記事一覧 */}
          {filteredArticles.length === 0 ? (
            <div className="p-10 text-center bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 text-neutral-500 text-sm space-y-3 shadow-xs">
              <p className="font-bold text-base text-neutral-800 dark:text-neutral-200">
                該当する記事が見つかりませんでした
              </p>
              <p className="text-xs text-neutral-400 max-w-md mx-auto">
                選択中の条件（{selectedCharacter || '全キャラ'} / {selectedCategory === 'all' ? '全記事' : selectedCategory}）に合致する記事が現在ありません。条件を解除して他の記事をご覧ください。
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900 font-bold text-xs transition-colors cursor-pointer shadow-xs"
                >
                  条件を解除してすべての記事を表示
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-3.5">
              {(
                isPickupVisible
                  ? filteredArticles.filter((a) => a.slug !== 'ryu-complete-guide')
                  : filteredArticles
              ).map((article) => {
                const eyecatch = getArticleEyecatch(article);
                const titleInfo = parseArticleTitle(article.title);
                const isCoaching = article.category === 'coaching' || article.tags.includes('コーチング');

                return (
                  <Link
                    key={article.id}
                    href={`/articles/${article.slug}`}
                    className="group flex flex-row items-center bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200/80 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 hover:shadow-md transition-all overflow-hidden p-2.5 sm:p-3.5 gap-3 sm:gap-4"
                  >
                    {/* サムネイル画像 */}
                    <div className="relative w-20 h-20 sm:w-48 md:w-56 aspect-square sm:aspect-[16/9] shrink-0 bg-neutral-950 overflow-hidden rounded-lg self-center">
                      <img
                        src={eyecatch}
                        alt={article.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* コンテンツ */}
                    <div className="p-0 flex flex-col justify-between flex-1 min-w-0">
                      <div>
                        {/* バッジ・メタ行 */}
                        <div className="flex items-center justify-between gap-1.5 mb-1 sm:mb-1.5 flex-wrap">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {article.character && (
                              <span className="text-[10px] sm:text-[11px] font-bold text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 px-1.5 sm:px-2 py-0.5 rounded">
                                {article.character}
                              </span>
                            )}
                            {(article.category === 'neutral' || article.tags.includes('立ち回り')) && (
                              <span className="text-[9px] sm:text-[10px] font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/50 px-1.5 sm:px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800">
                                立ち回り
                              </span>
                            )}
                            {(article.category === 'character' || article.tags.includes('完全攻略')) && (
                              <span className="text-[9px] sm:text-[10px] font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/50 px-1.5 sm:px-2 py-0.5 rounded border border-indigo-200 dark:border-indigo-800">
                                完全攻略
                              </span>
                            )}
                            {isCoaching && (
                              <span className="text-[9px] sm:text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 px-1.5 sm:px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                                コーチング
                              </span>
                            )}
                            {(article.category === 'system' || article.category === 'mindset' || article.tags.includes('共通技術')) && (
                              <span className="text-[9px] sm:text-[10px] font-bold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/50 px-1.5 sm:px-2 py-0.5 rounded border border-purple-200 dark:border-purple-800">
                                共通技術
                              </span>
                            )}
                            {article.controlType === 'both' ? (
                              <span className="inline-flex items-center gap-0.5 text-[9px] sm:text-[10px] font-bold">
                                <span className="px-1 py-0.2 rounded text-white text-[8px] sm:text-[9px] font-bold bg-[#8B5BB7]">C</span>
                                <span className="px-1 py-0.2 rounded text-white text-[8px] sm:text-[9px] font-bold bg-[#D8843F]">M</span>
                              </span>
                            ) : article.controlType ? (
                              <span
                                className="text-[9px] sm:text-[10px] font-bold text-white px-1.5 py-0.2 rounded shrink-0"
                                style={{ backgroundColor: article.controlType === 'classic' ? '#8B5BB7' : '#D8843F' }}
                              >
                                {article.controlType === 'classic' ? 'C' : 'M'}
                              </span>
                            ) : null}

                            {/* コーチング実施年月 */}
                            {article.coachingDate && (
                              <span className="text-[9px] sm:text-[10px] text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded font-mono">
                                {article.coachingDate}実施
                              </span>
                            )}
                          </div>

                          {/* 閲覧条件バッジ */}
                          {article.isPaid ? (
                            article.subscriptionOnly ? (
                              <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800/60 px-1.5 sm:px-2 py-0.5 rounded shrink-0">
                                <Lock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-cyan-600 dark:text-cyan-400" />
                                <span>会員限定</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-neutral-900 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-800 px-1.5 sm:px-2 py-0.5 rounded shrink-0">
                                <Lock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-neutral-600 dark:text-neutral-400" />
                                <span>買い切り ¥{article.price} / 会員</span>
                              </span>
                            )
                          ) : (
                            <span className="text-[10px] sm:text-[11px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 sm:px-2 py-0.5 rounded shrink-0 border border-emerald-200 dark:border-emerald-800/50">
                              無料公開
                            </span>
                          )}
                        </div>

                        {/* タイトル表示（コーチング記事の場合は二段組でサブタイトルを明瞭化） */}
                        {titleInfo.subtitle ? (
                          <div className="mb-1 sm:mb-1.5">
                            <h2 className="text-xs sm:text-sm md:text-base font-black text-neutral-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors leading-snug">
                              {titleInfo.mainTitle}
                            </h2>
                            <p className="text-[11px] sm:text-xs text-neutral-600 dark:text-neutral-300 font-medium leading-snug mt-0.5">
                              {titleInfo.subtitle}
                            </p>
                          </div>
                        ) : (
                          <h2 className="text-xs sm:text-sm md:text-base font-bold text-neutral-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors mb-1 sm:mb-1.5 leading-snug line-clamp-2">
                            {article.title}
                          </h2>
                        )}

                        <p className="hidden sm:block text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed mb-2">
                          {article.summary}
                        </p>
                      </div>

                      {/* 補足フッター情報 */}
                      <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-neutral-400 dark:text-neutral-500 pt-1">
                        <span>読了目安: {article.readTime}</span>
                        {isCoaching && (
                          <span className="text-neutral-400 text-[10px]">※ 当時の対戦環境に基づく記録</span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
