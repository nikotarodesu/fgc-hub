'use client';

import { useState, useEffect, useRef } from 'react';
import { BookOpen, Star, X, ChevronRight, ArrowUp, Zap, Sparkles } from 'lucide-react';
import { getShortSubheadingLabel } from './RichContent';

export interface QuickJumpSection {
  id: string;
  title: string;
  isPaid?: boolean;
}

interface SubheadingItem {
  id: string;
  raw: string;
  shortLabel: string;
}

interface ArticleQuickJumpProps {
  sections: QuickJumpSection[];
  activeSectionId: string;
  activeSubheading?: string | null;
  activeItemHeading?: string | null;
  bookmarks: string[];
  onToggleBookmark: (id: string) => void;
  onJumpToSection: (id: string) => void;
}

// セクションタイトルのフォーマット（小見出し表示時は「⑥ 画面中央」のように適度にスリム化）
function formatSectionTitle(title: string, hasSubheading: boolean): string {
  if (!hasSubheading) return title;
  return title
    .replace(/のコンボ$/, '')
    .replace(/について$/, '')
    .replace(/フレーム$/, '');
}

export default function ArticleQuickJump({
  sections,
  activeSectionId,
  activeSubheading,
  activeItemHeading,
  bookmarks,
  onToggleBookmark,
  onJumpToSection,
}: ArticleQuickJumpProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isQuickJumpOpen, setIsQuickJumpOpen] = useState(false);
  const [currentSubheadings, setCurrentSubheadings] = useState<SubheadingItem[]>([]);
  const quickJumpRef = useRef<HTMLDivElement>(null);

  const activeSection = sections.find((s) => s.id === activeSectionId) || sections[0];
  const isCurrentBookmarked = activeSection ? bookmarks.includes(activeSection.id) : false;

  // 現在のセクション内にある小見出し（data-subheading: ❶〜➓）をDOMからリアルタイム検出
  useEffect(() => {
    const updateSubheadings = () => {
      const activeEl = document.getElementById(activeSectionId);
      if (!activeEl) {
        setCurrentSubheadings([]);
        return;
      }

      const subEls = activeEl.querySelectorAll<HTMLElement>('[data-subheading]');
      const items: SubheadingItem[] = Array.from(subEls).map((el) => {
        const raw = el.getAttribute('data-subheading') || el.innerText || '';
        const match = raw.match(/^([①-⑳❶-❿➊-➓⓫-⓴])\s*(.*)$/);
        const numChar = match ? match[1] : '';
        const titleText = match ? match[2] : raw;
        const shortLabel = getShortSubheadingLabel(numChar, titleText);
        return {
          id: el.id,
          raw,
          shortLabel,
        };
      });

      setCurrentSubheadings(items);
    };

    updateSubheadings();
    const timer = setTimeout(updateSubheadings, 100);
    return () => clearTimeout(timer);
  }, [activeSectionId]);

  // クイックジャンプポップアップの外側クリック検知
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (quickJumpRef.current && !quickJumpRef.current.contains(e.target as Node)) {
        setIsQuickJumpOpen(false);
      }
    };
    if (isQuickJumpOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isQuickJumpOpen]);

  const handleJump = (id: string) => {
    setIsModalOpen(false);
    setIsQuickJumpOpen(false);
    onJumpToSection(id);
  };

  const handleJumpToSubheading = (targetId: string) => {
    setIsQuickJumpOpen(false);
    const el = document.getElementById(targetId);
    if (el) {
      const yOffset = -75; // 上部追従バーの高さオフセット
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* ========================================================
          1. 画面上部 浮遊ホバーバナー（現在地インジケーター ＆ お気に入り）
         ======================================================== */}
      <aside
        aria-label="現在位置ナビゲーション"
        className="fixed top-2 left-1/2 -translate-x-1/2 z-40 max-w-xl w-[94%] sm:w-auto animate-in fade-in slide-in-from-top-3 duration-200 pointer-events-auto"
      >
        <div className="bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border border-neutral-200/90 dark:border-neutral-700/80 rounded-full py-1 px-2.5 sm:px-3 shadow-md flex items-center justify-between gap-2 text-xs">
          {/* 現在のセクション表示（章タイトル ＆ 小見出し） */}
          <div className="flex items-center gap-1.5 overflow-hidden max-w-[280px] xs:max-w-[340px] sm:max-w-[500px]">
            <span className="w-2 h-2 rounded-full bg-cyan-600 dark:bg-cyan-400 shrink-0 animate-pulse" />
            <span className="text-[10px] text-neutral-400 dark:text-neutral-500 font-medium shrink-0">現在:</span>
            <div className="flex items-center gap-1 min-w-0 text-xs font-bold text-neutral-800 dark:text-neutral-100 overflow-hidden flex-nowrap">
              {/* 章タイトル */}
              <span className="truncate shrink-0 max-w-[140px] xs:max-w-[180px] sm:max-w-[240px]">
                {formatSectionTitle(activeSection?.title || '記事本文', Boolean(activeSubheading))}
              </span>

              {/* 丸数字小見出し（❶ 弱技始動など） */}
              {activeSubheading && (
                <>
                  <span className="text-neutral-400 dark:text-neutral-500 font-normal shrink-0 text-[11px] select-none">
                    &gt;
                  </span>
                  <span className="text-cyan-600 dark:text-cyan-400 font-bold truncate shrink-0 max-w-[120px] xs:max-w-[160px] sm:max-w-[220px]">
                    {activeSubheading}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* 現在セクションのお気に入り登録ボタン */}
          {activeSection && (
            <button
              type="button"
              onClick={() => onToggleBookmark(activeSection.id)}
              className={`p-1.5 rounded-full transition-colors cursor-pointer shrink-0 ${
                isCurrentBookmarked
                  ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/40'
                  : 'text-neutral-400 hover:text-amber-500 hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
              title={isCurrentBookmarked ? 'この章のお気に入りを解除' : 'この章をお気に入りに登録'}
            >
              <Star className={`w-3.5 h-3.5 ${isCurrentBookmarked ? 'fill-current' : ''}`} />
            </button>
          )}
        </div>
      </aside>

      {/* ========================================================
          2. 画面下部 追従バー（目次ジャンプ / クイックジャンプ / お気に入り / 上へ）
         ======================================================== */}
      <aside
        aria-label="操作アクションナビゲーション"
        ref={quickJumpRef}
        className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-md w-[94%] sm:w-auto animate-in fade-in slide-in-from-bottom-4 duration-200 pointer-events-auto"
      >
        {/* クイックジャンプ（小見出し選択）ポップオーバー */}
        {isQuickJumpOpen && (
          <div className="absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2 w-[92vw] max-w-sm bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border border-neutral-200/90 dark:border-neutral-700/80 rounded-2xl shadow-2xl p-3 animate-in zoom-in-95 duration-150 overflow-hidden">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-neutral-100 dark:border-neutral-800">
              <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-800 dark:text-neutral-100">
                <Zap className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                <span>章内のクイックジャンプ</span>
              </div>
              <button
                type="button"
                onClick={() => setIsQuickJumpOpen(false)}
                className="p-1 rounded-md text-neutral-400 hover:text-neutral-800 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {currentSubheadings.length > 0 ? (
              <div className="max-h-[50vh] overflow-y-auto space-y-1 py-0.5 [scrollbar-width:thin]">
                <p className="text-[10px] text-neutral-400 dark:text-neutral-500 mb-1.5 px-1">
                  現在の章（{formatSectionTitle(activeSection?.title || '', false)}）の始動・見出し一覧:
                </p>
                <div className="grid grid-cols-2 gap-1.5">
                  {currentSubheadings.map((sub, sIdx) => {
                    const isActive =
                      activeSubheading === sub.raw ||
                      activeSubheading?.startsWith(sub.raw.charAt(0));

                    return (
                      <button
                        key={sIdx}
                        type="button"
                        onClick={() => handleJumpToSubheading(sub.id)}
                        className={`text-left px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all truncate border flex items-center justify-between gap-1 cursor-pointer ${
                          isActive
                            ? 'bg-cyan-600 text-white border-cyan-600 shadow-xs'
                            : 'bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 border-neutral-200/80 dark:border-neutral-700 hover:border-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400'
                        }`}
                        title={sub.raw}
                      >
                        <span className="truncate">{sub.shortLabel}</span>
                        <ChevronRight className={`w-3 h-3 shrink-0 ${isActive ? 'text-white' : 'text-neutral-400'}`} />
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="py-4 px-2 text-center">
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-2.5">
                  この章には個別の小見出しはありません
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsQuickJumpOpen(false);
                    setIsModalOpen(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:opacity-90 transition-opacity cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>全体の目次を見る</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* ボトムバー本体 */}
        <div className="bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border border-neutral-200/90 dark:border-neutral-700/80 rounded-full py-1.5 px-2.5 sm:px-3 shadow-xl flex items-center justify-center gap-1.5 sm:gap-2 text-xs">
          {/* 1. 目次ジャンプ */}
          <button
            type="button"
            onClick={() => {
              setIsQuickJumpOpen(false);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-semibold text-xs hover:opacity-90 active:scale-95 transition-all cursor-pointer shadow-xs whitespace-nowrap"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>目次ジャンプ</span>
          </button>

          {/* 2. クイックジャンプ */}
          <button
            type="button"
            onClick={() => setIsQuickJumpOpen((prev) => !prev)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-semibold text-xs active:scale-95 transition-all cursor-pointer shadow-xs whitespace-nowrap border ${
              isQuickJumpOpen
                ? 'bg-cyan-600 text-white border-cyan-600'
                : 'bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800 hover:bg-cyan-100 dark:hover:bg-cyan-900/60'
            }`}
          >
            <Zap className={`w-3.5 h-3.5 ${isQuickJumpOpen ? 'fill-current' : 'text-cyan-600 dark:text-cyan-400'}`} />
            <span>クイックジャンプ</span>
            {currentSubheadings.length > 0 && (
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                isQuickJumpOpen ? 'bg-white/25 text-white' : 'bg-cyan-200/70 dark:bg-cyan-800 text-cyan-800 dark:text-cyan-200'
              }`}>
                {currentSubheadings.length}
              </span>
            )}
          </button>

          {/* 3. 現在章のお気に入り登録 */}
          {activeSection && (
            <button
              type="button"
              onClick={() => onToggleBookmark(activeSection.id)}
              className={`flex items-center gap-1 px-2 py-1.5 rounded-full transition-colors cursor-pointer shrink-0 ${
                isCurrentBookmarked
                  ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/40 font-bold'
                  : 'text-neutral-400 hover:text-amber-500 hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
              title={isCurrentBookmarked ? 'この章のお気に入りを解除' : 'この章をお気に入りに登録'}
            >
              <Star className={`w-3.5 h-3.5 ${isCurrentBookmarked ? 'fill-current' : ''}`} />
              <span className="hidden sm:inline text-[11px]">{isCurrentBookmarked ? '登録中' : '保存'}</span>
            </button>
          )}

          {/* 4. 上に戻る */}
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
            title="ページ先頭へ"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span className="hidden xs:inline text-xs font-medium">上へ</span>
          </button>
        </div>
      </aside>

      {/* 目次ジャンプ モーダル / ドロワー */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div
            className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl max-w-lg w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* モーダルヘッダー */}
            <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-neutral-50 dark:bg-neutral-950">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <h3 className="font-bold text-sm text-neutral-900 dark:text-white">
                  クイック目次ジャンプ
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200/60 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* モーダル本文 */}
            <div className="p-4 overflow-y-auto space-y-4">
              {/* お気に入り登録セクション一覧 */}
              {bookmarks.length > 0 && (
                <div className="p-3 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40">
                  <div className="text-[11px] font-bold text-amber-900 dark:text-amber-300 mb-2 flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
                    <span>★ お気に入り登録中のセクション（即呼出）</span>
                  </div>
                  <div className="space-y-1">
                    {bookmarks.map((bId) => {
                      const sec = sections.find((s) => s.id === bId);
                      if (!sec) return null;
                      return (
                        <button
                          key={bId}
                          type="button"
                          onClick={() => handleJump(bId)}
                          className="w-full text-left p-2 rounded-lg bg-white dark:bg-neutral-800 hover:bg-amber-100/60 dark:hover:bg-neutral-700 text-xs font-bold text-neutral-900 dark:text-white flex items-center justify-between gap-2 border border-amber-200/50 dark:border-amber-900/30 transition-colors cursor-pointer"
                        >
                          <span className="truncate">{sec.title}</span>
                          <span className="text-[10px] text-amber-600 dark:text-amber-400 shrink-0 flex items-center gap-0.5">
                            <span>ジャンプ</span>
                            <ChevronRight className="w-3 h-3" />
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 全セクション一覧 */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider px-1">
                  全セクション一覧（タップで移動）
                </div>
                {sections.map((sec, idx) => {
                  const isActive = sec.id === activeSectionId;
                  const isBookmarked = bookmarks.includes(sec.id);

                  return (
                    <div
                      key={sec.id}
                      className={`group flex items-center justify-between gap-2 p-2.5 rounded-xl text-xs transition-all border ${
                        isActive
                          ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 border-neutral-900 dark:border-white shadow-xs'
                          : 'bg-neutral-50/80 dark:bg-neutral-800/60 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border-neutral-200/70 dark:border-neutral-700/60'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => handleJump(sec.id)}
                        className="flex items-center gap-2 flex-1 text-left cursor-pointer overflow-hidden"
                      >
                        <span className="font-mono text-[10px] opacity-60 shrink-0">
                          {idx < 9 ? `0${idx + 1}` : idx + 1}.
                        </span>
                        <span className="font-bold truncate">{sec.title}</span>
                        {sec.isPaid && (
                          <span
                            className={`text-[9px] px-1.5 py-0.2 rounded shrink-0 font-normal ${
                              isActive
                                ? 'bg-white/20 text-white dark:bg-neutral-900/20 dark:text-neutral-900'
                                : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300'
                            }`}
                          >
                            有料
                          </span>
                        )}
                      </button>

                      {/* お気に入りトグルボタン */}
                      <button
                        type="button"
                        onClick={() => onToggleBookmark(sec.id)}
                        className={`p-1.5 rounded-lg shrink-0 transition-colors cursor-pointer ${
                          isBookmarked
                            ? 'text-amber-500'
                            : isActive
                            ? 'text-white/40 hover:text-amber-300'
                            : 'text-neutral-400 hover:text-amber-500'
                        }`}
                        title={isBookmarked ? 'お気に入り解除' : 'お気に入りに追加'}
                      >
                        <Star className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* モーダルフッターヒント */}
            <div className="p-3 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 text-[11px] text-neutral-500 dark:text-neutral-400 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>★を押してトレモでよく見る章を登録できます</span>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 hover:underline cursor-pointer"
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
