'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ARTICLES_DATA, getArticleEyecatch } from '@/data/articles';
import LethalToolPreviewModal from '@/components/LethalToolPreviewModal';
import { Search, Lock, Sparkles, Swords, Gamepad2, Video, RefreshCw, ChevronRight, CheckCircle2, ChevronDown, ChevronUp, Flame } from 'lucide-react';

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
  const [isBenefitsOpen, setIsBenefitsOpen] = useState(true);
  const [isLethalPreviewOpen, setIsLethalPreviewOpen] = useState(false);

  // リピーター向けに開閉状態を記憶（一度閉じた方は次回以降も折りたたんだ状態を維持）
  useEffect(() => {
    try {
      const saved = localStorage.getItem('fgc_benefits_collapsed');
      if (saved === 'true') {
        setIsBenefitsOpen(false);
      }
    } catch {
      // ignore
    }
  }, []);

  const toggleBenefits = () => {
    setIsBenefitsOpen((prev) => {
      const next = !prev;
      try {
        if (!next) {
          localStorage.setItem('fgc_benefits_collapsed', 'true');
        } else {
          localStorage.removeItem('fgc_benefits_collapsed');
        }
      } catch {
        // ignore
      }
      return next;
    });
  };

  // 「立ち回り」「コーチング」選択時に現在記事が存在するキャラクター一覧を集計
  const { availableCharacters, charArticleCounts, categoryTotalCount } = useMemo(() => {
    if (selectedCategory !== 'neutral' && selectedCategory !== 'coaching') {
      return {
        availableCharacters: [] as string[],
        charArticleCounts: {} as Record<string, number>,
        categoryTotalCount: 0,
      };
    }

    const counts: Record<string, number> = {};
    let total = 0;

    ARTICLES_DATA.forEach((article) => {
      let match = false;
      if (selectedCategory === 'neutral') {
        match =
          article.category === 'neutral' ||
          article.tags.includes('立ち回り') ||
          article.tags.includes('立ち回り考察');
      } else if (selectedCategory === 'coaching') {
        match =
          article.category === 'coaching' ||
          article.tags.includes('過去のコーチング') ||
          article.tags.includes('コーチング');
      }

      if (match) {
        total++;
        if (article.character) {
          counts[article.character] = (counts[article.character] || 0) + 1;
        }
      }
    });

    // 記事数の多い順、同数の場合は五十音順
    const chars = Object.keys(counts).sort((a, b) => {
      if (counts[b] !== counts[a]) {
        return counts[b] - counts[a];
      }
      return a.localeCompare(b, 'ja');
    });

    return { availableCharacters: chars, charArticleCounts: counts, categoryTotalCount: total };
  }, [selectedCategory]);

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
        const query = searchQuery.toLowerCase();
        const matchTitle = article.title.toLowerCase().includes(query);
        const matchSummary = article.summary.toLowerCase().includes(query);
        const matchTags = article.tags.some((t) => t.toLowerCase().includes(query));
        if (!matchTitle && !matchSummary && !matchTags) return false;
      }
      return true;
    });
  }, [selectedCategory, selectedControlType, selectedCharacter, selectedTag, searchQuery]);

  // 全キャラの記事数を集計
  const allCharCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    ARTICLES_DATA.forEach((art) => {
      if (art.character) {
        counts[art.character] = (counts[art.character] || 0) + 1;
      }
    });
    return counts;
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors">
      {/* 検索・キャラクタークイックアクセスセクション */}
      <section className="bg-white dark:bg-neutral-900 border-b border-neutral-200/80 dark:border-neutral-800 py-5 sm:py-6">
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

          {/* キャラクター別丸アイコン・クイックナビ */}
          <div className="pt-1">
            <div className="flex items-center justify-between mb-2.5">
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
                  絞り込み解除 ({selectedCharacter})
                </button>
              )}
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none">
              {/* ALLボタン */}
              <button
                type="button"
                onClick={() => setSelectedCharacter(null)}
                className={`flex flex-col items-center gap-1.5 shrink-0 transition-transform cursor-pointer ${
                  selectedCharacter === null ? 'scale-105' : 'opacity-70 hover:opacity-100'
                }`}
              >
                <div
                  className={`w-12 h-12 sm:w-13 sm:h-13 rounded-full flex items-center justify-center font-black text-xs transition-all shadow-xs ${
                    selectedCharacter === null
                      ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 ring-2 ring-neutral-900 dark:ring-white ring-offset-2 dark:ring-offset-neutral-900'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700'
                  }`}
                >
                  ALL
                </div>
                <span className={`text-[10px] sm:text-[11px] font-bold ${
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
                    className={`flex flex-col items-center gap-1.5 shrink-0 transition-all cursor-pointer ${
                      isSelected ? 'scale-105' : 'opacity-75 hover:opacity-100'
                    }`}
                  >
                    <div
                      className={`relative w-12 h-12 sm:w-13 sm:h-13 rounded-full overflow-hidden transition-all shadow-xs bg-neutral-900 ${
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
                        className={`text-[10px] sm:text-[11px] font-bold ${
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
        </div>
      </section>

      {/* 有料記事・プレミアム会員 特典プロモーションセクション */}
      {/* ========================================================
          有料記事・プレミアム会員で手に入るもの（5大リターン・チェックリスト）
         ======================================================== */}
      <section className={`bg-gradient-to-b from-white via-neutral-50/60 to-white dark:from-neutral-900 dark:via-neutral-900/60 dark:to-neutral-900 border-b border-neutral-200/80 dark:border-neutral-800 transition-all ${isBenefitsOpen ? 'py-6 sm:py-8' : 'py-3.5 sm:py-4'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* 見出しエリア（折りたたみトグル付き） */}
          <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${isBenefitsOpen ? 'mb-6 sm:mb-7' : ''}`}>
            <div className="min-w-0">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-50 dark:bg-cyan-950/50 text-cyan-800 dark:text-cyan-300 border border-cyan-200/80 dark:border-cyan-800/80 text-[11px] font-bold tracking-wide uppercase mb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                <span>会員限定・有料コンテンツ特典</span>
              </div>
              <h2 className="text-lg sm:text-2xl font-black text-neutral-900 dark:text-white tracking-tight">
                有料記事＆プレミアム会員で手に入るもの
              </h2>
              {isBenefitsOpen && (
                <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1 max-w-2xl leading-relaxed">
                  全キャラ1800MR以上の視点から、トレモですぐ使えてランクマの勝率が劇的に変わる攻略データ＆逆引きツールを完全収録。
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
              <Link
                href="/membership"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900 transition-all shadow-xs shrink-0 whitespace-nowrap hover:scale-[1.02] active:scale-95"
              >
                <span>プレミアム会員詳細</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
              <button
                type="button"
                onClick={toggleBenefits}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-neutral-100 hover:bg-neutral-200/80 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 border border-neutral-200/80 dark:border-neutral-700 transition-all cursor-pointer shrink-0 whitespace-nowrap"
                aria-expanded={isBenefitsOpen}
                aria-label={isBenefitsOpen ? '特典セクションを折りたたむ' : '特典セクションを展開する'}
              >
                {isBenefitsOpen ? (
                  <>
                    <span>閉じる</span>
                    <ChevronUp className="w-3.5 h-3.5 text-neutral-500" />
                  </>
                ) : (
                  <>
                    <span>特典を見る</span>
                    <ChevronDown className="w-3.5 h-3.5 text-neutral-500" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 開閉コンテンツ */}
          {isBenefitsOpen && (
            <div className="space-y-4 animate-in fade-in duration-200">
              {/* 4大リターン（スマホでは横スワイプカルーセル、PCでは4カラムグリッド） */}
              <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-4 scrollbar-none">
                {/* 1. 起き攻めセットプレイ完全網羅 */}
                <div className="w-[84vw] max-w-[320px] shrink-0 snap-center sm:w-auto p-4.5 rounded-xl bg-white dark:bg-neutral-900/90 border border-neutral-200/80 dark:border-neutral-800 shadow-2xs hover:border-neutral-400 dark:hover:border-neutral-700 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2.5">
                      <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
                        セットプレイ完全版
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-[15px] font-bold text-neutral-900 dark:text-white mb-1.5 leading-snug">
                      全フレーム状況別の起き攻めセットプレイ完全網羅
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                      その場・後ろ受け身の両対応重ねから、相手の無敵暴れを安全ガードできる「詐欺飛び」まで完全収録。実戦のターン継続率が劇的に上がります。
                    </p>
                  </div>
                </div>

                {/* 2. 最大火力コンボレシピ */}
                <div className="w-[84vw] max-w-[320px] shrink-0 snap-center sm:w-auto p-4.5 rounded-xl bg-white dark:bg-neutral-900/90 border border-neutral-200/80 dark:border-neutral-800 shadow-2xs hover:border-neutral-400 dark:hover:border-neutral-700 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2.5">
                      <div className="w-7 h-7 rounded-lg bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wide">
                        実戦厳選ルート
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-[15px] font-bold text-neutral-900 dark:text-white mb-1.5 leading-snug">
                      画面中央・画面端・リーサルの最大火力コンボレシピ
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                      ノーゲージでのライン運び、バーンアウト時の削り連携、SA3フィニッシュまで、クラシック・モダン両対応で無駄のない最適解を網羅。
                    </p>
                  </div>
                </div>

                {/* 3. 逆引きリーサルツール */}
                <button
                  type="button"
                  onClick={() => setIsLethalPreviewOpen(true)}
                  className="w-[84vw] max-w-[320px] shrink-0 snap-center sm:w-auto p-4.5 rounded-xl bg-white dark:bg-neutral-900/90 border border-cyan-300/80 dark:border-cyan-800/80 shadow-2xs hover:border-cyan-500 dark:hover:border-cyan-500 hover:shadow-md hover:shadow-cyan-500/10 transition-all flex flex-col justify-between text-left cursor-pointer group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-xl pointer-events-none -mr-6 -mt-6" />
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-cyan-50 dark:bg-cyan-950/50 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800/60 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <span className="text-[11px] font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wide">
                          WEB限定ツール
                        </span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-300 border border-cyan-200/80 dark:border-cyan-800/80 shrink-0 group-hover:bg-cyan-500 group-hover:text-white transition-all">
                        タップで体験 🔍
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-[15px] font-bold text-neutral-900 dark:text-white mb-1.5 leading-snug group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                      相手残りHPから倒し切る「逆引きリーサルツール」使用可能
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                      相手の残り体力や手持ちのDゲージ・SA状況を入力するだけで、今出せる最適リーサルコンボを瞬時に逆引き検索。判断ミスやリーサル逃しをゼロにします。
                    </p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-[11px] font-bold text-cyan-600 dark:text-cyan-400">
                    <span>どんなツールか実際に試してみる</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </button>

                {/* 4. ずっと使える安心保障 */}
                <div className="w-[84vw] max-w-[320px] shrink-0 snap-center sm:w-auto p-4.5 rounded-xl bg-white dark:bg-neutral-900/90 border border-neutral-200/80 dark:border-neutral-800 shadow-2xs hover:border-neutral-400 dark:hover:border-neutral-700 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2.5">
                      <div className="w-7 h-7 rounded-lg bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800/60 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wide">
                        ずっと使える安心保障
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-[15px] font-bold text-neutral-900 dark:text-white mb-1.5 leading-snug">
                      今後のバージョンアップ・キャラ調整時も永久に無料追記
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                      Capcomによるバランス調整や新シーズン突入時も記事を随時アップデート。一度購入すれば、追加費用なしで常に最新バージョンの攻略データを閲覧し続けられます。
                    </p>
                  </div>
                </div>
              </div>

              {/* スマホ用 スワイプ案内インジケーター */}
              <div className="flex items-center justify-center gap-1.5 text-[10px] text-neutral-400 dark:text-neutral-500 font-medium sm:hidden">
                <span>← 左右スワイプで4大特典を確認 →</span>
              </div>

              {/* フッター補足バナー */}
              <div className="p-3 sm:p-3.5 rounded-xl bg-neutral-100/80 dark:bg-neutral-800/60 border border-neutral-200/70 dark:border-neutral-700/60 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs text-neutral-600 dark:text-neutral-300">
                <div className="flex items-center gap-2 text-center sm:text-left">
                  <span className="font-bold text-neutral-900 dark:text-white shrink-0">💡 選び方:</span>
                  <span>「特定キャラだけ極めたい方」は記事単体買い切り（¥500 / 永久閲覧）、「全キャラ攻略・立ち回りを学びたい方」はプレミアム会員（¥980/月）がおすすめです。</span>
                </div>
                <div className="flex items-center gap-3 shrink-0 font-medium">
                  <Link href="/membership" className="text-cyan-700 dark:text-cyan-300 font-bold hover:underline flex items-center gap-0.5">
                    <span>プレミアム会員プランを見る</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* メインレイアウト（2カラム） */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* セグメントコントロール（カテゴリ切り替えタブ） */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-3 border-b border-neutral-200/80 dark:border-neutral-800">
          <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800/80 p-1 rounded-lg border border-neutral-200/60 dark:border-neutral-700/60 overflow-x-auto">
            <button
              onClick={() => { setSelectedCategory('all'); setSelectedControlType('all'); setSelectedCharacter(null); setSelectedTag(null); }}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs font-bold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              全記事一覧
            </button>
            <button
              onClick={() => { setSelectedCategory('character'); setSelectedCharacter(null); setSelectedTag(null); }}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === 'character'
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs font-bold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              攻略記事
            </button>
            <button
              onClick={() => { setSelectedCategory('neutral'); setSelectedControlType('all'); setSelectedCharacter(null); setSelectedTag(null); }}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === 'neutral'
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs font-bold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              立ち回り
            </button>
            <button
              onClick={() => { setSelectedCategory('system'); setSelectedControlType('all'); setSelectedCharacter(null); setSelectedTag(null); }}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === 'system'
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs font-bold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              共通技術
            </button>
            <button
              onClick={() => { setSelectedCategory('coaching'); setSelectedControlType('all'); setSelectedCharacter(null); setSelectedTag(null); }}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === 'coaching'
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs font-bold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              コーチング
            </button>
          </div>

          <div className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
            全 <span className="text-neutral-900 dark:text-white font-bold">{filteredArticles.length}</span> 件
          </div>
        </div>

        {/* 攻略記事選択時の操作タイプ切り替え（クラシック / モダン） */}
        {selectedCategory === 'character' && (
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 p-3 sm:p-3.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-2xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-neutral-700 dark:text-neutral-200 shrink-0">
                操作タイプ:
              </span>
              <div className="inline-flex items-center gap-1.5 p-1 rounded-lg bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200/60 dark:border-neutral-700/60">
                <button
                  type="button"
                  onClick={() => setSelectedControlType('all')}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    selectedControlType === 'all'
                      ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  すべて
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedControlType('classic')}
                  className={`px-3.5 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    selectedControlType === 'classic'
                      ? 'bg-[#8B5BB7] text-white shadow-xs'
                      : 'bg-white/80 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300 hover:text-[#8B5BB7] dark:hover:text-[#b38ee0] hover:bg-[#8B5BB7]/10 border border-neutral-200/60 dark:border-neutral-700'
                  }`}
                >
                  クラシック
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedControlType('modern')}
                  className={`px-3.5 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    selectedControlType === 'modern'
                      ? 'bg-[#D8843F] text-white shadow-xs'
                      : 'bg-white/80 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300 hover:text-[#D8843F] dark:hover:text-[#f0a668] hover:bg-[#D8843F]/10 border border-neutral-200/60 dark:border-neutral-700'
                  }`}
                >
                  モダン
                </button>
              </div>
            </div>

            <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
              {selectedControlType === 'classic' && (
                <span>クラシック対応記事（両対応含む）を表示中</span>
              )}
              {selectedControlType === 'modern' && (
                <span>モダン対応記事（両対応含む）を表示中</span>
              )}
              {selectedControlType === 'all' && (
                <span>全操作タイプの攻略記事を表示中</span>
              )}
            </div>
          </div>
        )}

        {/* 立ち回り または コーチング 選択時のキャラクター切り替えボタン */}
        {(selectedCategory === 'neutral' || selectedCategory === 'coaching') && availableCharacters.length > 0 && (
          <div className="flex flex-col gap-2.5 mb-6 p-3 sm:p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-2xs">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                  キャラクター:
                </span>
                <span className="text-[11px] text-neutral-500 dark:text-neutral-400">
                  {availableCharacters.length}キャラの記事を公開中
                </span>
              </div>
              {selectedCharacter && (
                <button
                  type="button"
                  onClick={() => setSelectedCharacter(null)}
                  className="text-[11px] text-neutral-500 hover:text-neutral-900 dark:hover:text-white underline cursor-pointer shrink-0"
                >
                  絞り込み解除（全{categoryTotalCount}件）
                </button>
              )}
            </div>

            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                type="button"
                onClick={() => setSelectedCharacter(null)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  selectedCharacter === null
                    ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-xs'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white border border-neutral-200/60 dark:border-neutral-700/60'
                }`}
              >
                すべて ({categoryTotalCount})
              </button>
              {availableCharacters.map((charName) => {
                const isSelected = selectedCharacter === charName;
                const count = charArticleCounts[charName] || 0;
                return (
                  <button
                    key={charName}
                    type="button"
                    onClick={() => setSelectedCharacter(isSelected ? null : charName)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-cyan-600 dark:bg-cyan-500 text-white shadow-xs'
                        : 'bg-white dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 border border-neutral-200/80 dark:border-neutral-700'
                    }`}
                  >
                    <span>{charName}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        isSelected
                          ? 'bg-cyan-700 dark:bg-cyan-600 text-white'
                          : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ピックアップ記事の表示判定: 全記事一覧表示時のみ表示し、攻略記事等のボタン選択時は非表示 */}
        {(() => {
          const isPickupVisible =
            selectedCategory === 'all' &&
            (!selectedCharacter || selectedCharacter === 'リュウ') &&
            !searchQuery &&
            !selectedTag;

          return (
            <div className="max-w-4xl mx-auto space-y-4">
              {/* 🔥 ピックアップ・完全攻略記事枠（全記事一覧表示時のみ最上部に固定表示） */}
              {isPickupVisible && (
                <div className="mb-2 sm:mb-4">
                  <div className="flex items-center gap-2 mb-2 sm:mb-2.5">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold text-xs tracking-wide shadow-xs">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>ピックアップ記事</span>
                    </span>
                  </div>

                  <Link
                    href="/articles/ryu-complete-guide"
                    className="group relative block rounded-2xl overflow-hidden border-2 border-cyan-500/80 dark:border-cyan-500/60 bg-gradient-to-br from-white via-cyan-50/20 to-white dark:from-neutral-900 dark:via-neutral-900 dark:to-cyan-950/30 shadow-md hover:shadow-xl hover:border-cyan-500 transition-all"
                  >
                    <div className="flex flex-col md:flex-row md:items-center">
                      {/* サムネイル（PCでも16:9比率を崩さず見切れないよう配置） */}
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

                      {/* 本文エリア */}
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
                              <span>逆引きリーサルツール＆実戦動画付き</span>
                            </span>
                          </div>

                          <h3 className="text-base sm:text-lg lg:text-xl font-black text-neutral-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors leading-snug mb-1.5">
                            C・Mリュウの完全攻略：立ち回り,起き攻め,厳選コンボなど
                          </h3>

                          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mb-3 line-clamp-2 sm:line-clamp-3">
                            全シチュエーション別の実戦コンボレシピ、フレーム状況に応じた起き攻めセットプレイ、距離別の立ち回り方針、そして相手残り体力から最適解を逆引きする専用リーサルツールまで完全収録。
                          </p>
                        </div>

                        <div className="pt-2.5 border-t border-neutral-200/60 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-2.5">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] sm:text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>永久無料アップデート保証</span>
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-neutral-900 dark:text-white">
                              ¥500
                            </span>
                            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold text-xs group-hover:bg-cyan-600 dark:group-hover:bg-cyan-500 dark:group-hover:text-white transition-colors shadow-xs">
                              <span>攻略記事を読む</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              )}

              {/* 記事一覧ヘッダー（ピックアップ時） */}
              {isPickupVisible && (
                <div className="pt-2 pb-1 text-xs font-bold text-neutral-500 dark:text-neutral-400">
                  <span>最新の記事一覧</span>
                </div>
              )}

              {/* 記事一覧 */}
              {filteredArticles.length === 0 ? (
                <div className="p-10 text-center bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200/80 dark:border-neutral-800 text-neutral-500 text-sm space-y-2 shadow-xs">
                  <p className="font-bold text-neutral-800 dark:text-neutral-200">
                    {selectedCategory === 'system'
                      ? '共通技術の記事は現在準備中です'
                      : selectedCategory === 'coaching'
                      ? 'コーチング記事は現在準備中です'
                      : '該当する記事が見つかりませんでした'}
                  </p>
                  <p className="text-xs text-neutral-400">
                    {selectedCategory === 'system'
                      ? 'ファジーやヒット確認、ゲージ管理など全キャラに通じる共通技術・理論記事を順次公開予定です。お楽しみに！'
                      : selectedCategory === 'coaching'
                      ? '全キャラ1800MR達成に向けた実戦添削や指導アーカイブを順次公開予定です。お楽しみに！'
                      : '別の条件やキーワードでお試しください。'}
                  </p>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {(
                    // ピックアップ枠が表示されている時は、通常リスト側のリュウ完全攻略を除外して重複を防ぐ
                    isPickupVisible
                      ? filteredArticles.filter((a) => a.slug !== 'ryu-complete-guide')
                      : filteredArticles
                  ).map((article) => {
                    const eyecatch = getArticleEyecatch(article);
                    const isCompleteGuide =
                      article.category === 'character' ||
                      article.tags.includes('完全攻略') ||
                      article.tags.includes('キャラ別攻略') ||
                      article.slug.includes('complete');
                    return (
                      <Link
                        key={article.id}
                        href={`/articles/${article.slug}`}
                        className="group flex flex-row items-center bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200/80 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 hover:shadow-md transition-all overflow-hidden p-2.5 sm:p-3.5 gap-3 sm:gap-4"
                      >
                        {/* サムネイル画像（スマホでもPCでも16:9比率を崩さず見切れを防止） */}
                        <div className="relative w-20 h-20 sm:w-52 md:w-60 aspect-square sm:aspect-[16/9] shrink-0 bg-neutral-950 overflow-hidden rounded-lg self-center">
                          <img
                            src={eyecatch}
                            alt={article.title}
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>

                        {/* コンテンツ */}
                        <div className="p-0 flex flex-col justify-between flex-1 min-w-0">
                        <div>
                          <div className="flex items-center justify-between gap-1.5 mb-1 sm:mb-2">
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
                              {(article.category === 'character' || article.tags.includes('完全攻略') || article.tags.includes('キャラ別攻略')) && (
                                <span className="text-[9px] sm:text-[10px] font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/50 px-1.5 sm:px-2 py-0.5 rounded border border-indigo-200 dark:border-indigo-800">
                                  完全攻略
                                </span>
                              )}
                              {(article.category === 'coaching' || article.tags.includes('過去のコーチング') || article.tags.includes('コーチング')) && (
                                <span className="text-[9px] sm:text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 px-1.5 sm:px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                                  コーチング
                                </span>
                              )}
                              {(article.category === 'system' || article.category === 'mindset' || article.tags.includes('共通技術') || article.tags.includes('共通理論')) && (
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
                              {article.youtubeVideoId && (
                                <span className="hidden sm:inline-flex text-[10px] font-medium text-neutral-600 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded items-center gap-1">
                                  <span>▶ 動画付き</span>
                                </span>
                              )}
                            </div>

                            {article.isPaid ? (
                              article.subscriptionOnly ? (
                                <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800/60 px-1.5 sm:px-2 py-0.5 rounded shrink-0">
                                  <Lock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-cyan-600 dark:text-cyan-400" />
                                  <span>限定</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-neutral-900 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-800 px-1.5 sm:px-2 py-0.5 rounded shrink-0">
                                  <Lock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-neutral-600 dark:text-neutral-400" />
                                  <span>¥{article.price}</span>
                                </span>
                              )
                            ) : (
                              <span className="text-[10px] sm:text-[11px] font-medium text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-1.5 sm:px-2 py-0.5 rounded shrink-0">
                                無料
                              </span>
                            )}
                          </div>

                          <h2 className="text-xs sm:text-base font-bold text-neutral-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors mb-1 sm:mb-1.5 leading-snug line-clamp-2">
                            {article.title}
                          </h2>

                          <p className="hidden sm:block text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed mb-3">
                            {article.summary}
                          </p>
                        </div>

                        {isCompleteGuide && (
                          <div className="pt-1.5 sm:pt-2.5 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-[10px] sm:text-[11px] text-neutral-400 dark:text-neutral-500">
                            <div className="flex items-center gap-1.5">
                              <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 px-1.5 sm:px-2 py-0.5 rounded border border-emerald-200/80 dark:border-emerald-800/60">
                                <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                                <span>{article.patchDate ? `${article.patchDate} パッチ対応` : '最新パッチ対応'}</span>
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        );
      })()}
      </main>

      {/* 逆引きリーサルツール 体験プレビューモーダル */}
      <LethalToolPreviewModal
        isOpen={isLethalPreviewOpen}
        onClose={() => setIsLethalPreviewOpen(false)}
      />
    </div>
  );
}
