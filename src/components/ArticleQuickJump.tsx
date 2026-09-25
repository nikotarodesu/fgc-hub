'use client';

import { useState, useEffect, useRef } from 'react';
import { BookOpen, Star, X, ChevronRight, ArrowUp, Zap, Sparkles } from 'lucide-react';
import { getShortSubheadingLabel } from './RichContent';

export interface QuickJumpSection {
  id: string;
  title: string;
  isPaid?: boolean;
  isTool?: boolean;
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
  enableBookmarks?: boolean;
  showBars?: boolean;
  isOpenModal?: boolean;
  onOpenModal?: () => void;
  onCloseModal?: () => void;
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
  enableBookmarks = false,
  showBars = true,
  isOpenModal,
  onOpenModal,
  onCloseModal,
}: ArticleQuickJumpProps) {
  const [internalModalOpen, setInternalModalOpen] = useState(false);
  const isModalOpen = isOpenModal !== undefined ? isOpenModal : internalModalOpen;

  const openModal = () => {
    if (onOpenModal) {
      onOpenModal();
    } else {
      setInternalModalOpen(true);
    }
  };

  const closeModal = () => {
    if (onCloseModal) {
      onCloseModal();
    } else {
      setInternalModalOpen(false);
    }
  };

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

  // Escapeキーでモーダル・ポップアップを閉じる
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
        setIsQuickJumpOpen(false);
      }
    };
    if (isModalOpen || isQuickJumpOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, isQuickJumpOpen]);

  const handleJump = (id: string) => {
    closeModal();
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

  // 通常セクションとツール（逆引き等）を明確に分離
  const regularSections = sections.filter((s) => !s.isTool);
  const toolSections = sections.filter((s) => s.isTool);

  return (
    <>
      {/* ========================================================
          1. 画面上部 浮遊ホバーバナー（現在地インジケーター ＆ お気に入り）
         ======================================================== */}
      {showBars && (
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
            {enableBookmarks && activeSection && (
              <button
                type="button"
                onClick={() => onToggleBookmark(activeSection.id)}
                className={`p-1.5 rounded-full transition-colors cursor-pointer shrink-0 min-h-[36px] min-w-[36px] flex items-center justify-center ${
                  isCurrentBookmarked
                    ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/40'
                    : 'text-neutral-400 hover:text-amber-500 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
                title={isCurrentBookmarked ? 'この章のお気に入りを解除' : 'この章をお気に入りに登録'}
                aria-label={isCurrentBookmarked ? 'お気に入り解除' : 'お気に入り登録'}
              >
                <Star className={`w-3.5 h-3.5 ${isCurrentBookmarked ? 'fill-current' : ''}`} />
              </button>
            )}
          </div>
        </aside>
      )}

      {/* ========================================================
          2. 画面下部 追従バー（目次 / この章 / 保存 / 上へ）
          ※指示書に従い、ボタン名称・役割・押しやすさを最適化
         ======================================================== */}
      {showBars && (
        <aside
          aria-label="操作アクションナビゲーション"
          ref={quickJumpRef}
          className="fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom,0px))] sm:bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-[96vw] w-max animate-in fade-in slide-in-from-bottom-4 duration-200 pointer-events-auto"
        >
          {/* 「この章」（小見出し選択）ポップオーバー */}
          {isQuickJumpOpen && currentSubheadings.length > 0 && (
            <div className="absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2 w-[92vw] max-w-sm bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border border-neutral-200/90 dark:border-neutral-700/80 rounded-2xl shadow-2xl p-3 animate-in zoom-in-95 duration-150 overflow-hidden">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-neutral-100 dark:border-neutral-800">
                <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-800 dark:text-neutral-100">
                  <Zap className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  <span>この章の小見出し移動</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsQuickJumpOpen(false)}
                  aria-label="小見出し移動パネルを閉じる"
                  className="p-1.5 rounded-md text-neutral-400 hover:text-neutral-800 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

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
                        className={`text-left px-2.5 py-2 rounded-lg text-xs font-bold transition-all truncate border flex items-center justify-between gap-1 cursor-pointer min-h-[40px] ${
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
            </div>
          )}

          {/* ボトムバー本体 */}
          <div className="bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border border-neutral-200/90 dark:border-neutral-700/80 rounded-full py-1 px-1.5 sm:py-1.5 sm:px-3 shadow-xl flex items-center justify-center gap-1 sm:gap-2 text-xs shrink-0">
            {/* 1. 目次（全章へ移動、お気に入り一覧もここで確認） */}
            <button
              type="button"
              onClick={() => {
                setIsQuickJumpOpen(false);
                openModal();
              }}
              className="flex items-center gap-1 sm:gap-1.5 px-3 py-2 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-bold text-xs hover:opacity-90 active:scale-95 transition-all cursor-pointer shadow-xs whitespace-nowrap shrink-0 min-h-[40px]"
            >
              <BookOpen className="w-3.5 h-3.5 shrink-0" />
              <span>目次</span>
            </button>

            {/* 2. この章（現在の章の小見出しへ移動）※小見出しがある場合のみアクティブ表示 */}
            {currentSubheadings.length > 0 && (
              <button
                type="button"
                onClick={() => setIsQuickJumpOpen((prev) => !prev)}
                className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-2 rounded-full font-bold text-xs active:scale-95 transition-all cursor-pointer shadow-xs whitespace-nowrap border shrink-0 min-h-[40px] ${
                  isQuickJumpOpen
                    ? 'bg-cyan-600 text-white border-cyan-600'
                    : 'bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800 hover:bg-cyan-100 dark:hover:bg-cyan-900/60'
                }`}
              >
                <Zap className={`w-3.5 h-3.5 shrink-0 ${isQuickJumpOpen ? 'fill-current' : 'text-cyan-600 dark:text-cyan-400'}`} />
                <span>この章</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold shrink-0 ${
                  isQuickJumpOpen ? 'bg-white/25 text-white' : 'bg-cyan-200/70 dark:bg-cyan-800 text-cyan-800 dark:text-cyan-200'
                }`}>
                  {currentSubheadings.length}
                </span>
              </button>
            )}

            {/* 3. 保存 / 保存済み（現在の章のお気に入り状態を表示） */}
            {enableBookmarks && activeSection && (
              <button
                type="button"
                onClick={() => onToggleBookmark(activeSection.id)}
                className={`flex items-center gap-1 px-2.5 sm:px-3 py-2 rounded-full transition-colors cursor-pointer shrink-0 min-h-[40px] ${
                  isCurrentBookmarked
                    ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/40 font-bold border border-amber-200/70 dark:border-amber-800/60'
                    : 'text-neutral-500 dark:text-neutral-400 hover:text-amber-500 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
                title={isCurrentBookmarked ? 'この章のお気に入りを解除' : 'この章をお気に入りに登録'}
                aria-label={isCurrentBookmarked ? '保存済み（タップで解除）' : 'この章を保存'}
              >
                <Star className={`w-3.5 h-3.5 shrink-0 ${isCurrentBookmarked ? 'fill-current' : ''}`} />
                <span className="text-[11px] sm:text-xs font-semibold">
                  {isCurrentBookmarked ? '保存済み' : '保存'}
                </span>
              </button>
            )}

            {/* 4. 上へ（記事冒頭へ戻る） */}
            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center justify-center gap-1 px-2.5 sm:px-3 py-2 rounded-full text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 active:scale-95 transition-all cursor-pointer whitespace-nowrap shrink-0 min-h-[40px]"
              title="ページ先頭へ"
              aria-label="ページ先頭へ戻る"
            >
              <ArrowUp className="w-3.5 h-3.5 shrink-0" />
              <span className="text-xs font-medium">上へ</span>
            </button>
          </div>
        </aside>
      )}

      {/* ========================================================
          3. 目次モーダル（全章移動・保存一覧・逆引きツール独立枠）
          ※指示書に従い、章番号の重複（01. 01）および逆引きによるズレを解消
         ======================================================== */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="toc-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={closeModal}
        >
          <div
            className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl max-w-lg w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* モーダルヘッダー */}
            <div className="p-3.5 sm:p-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-neutral-50 dark:bg-neutral-950">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <h3 id="toc-modal-title" className="font-bold text-sm sm:text-base text-neutral-900 dark:text-white">
                  記事目次
                </h3>
              </div>
              <button
                type="button"
                onClick={closeModal}
                aria-label="目次を閉じる"
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200/60 dark:hover:bg-neutral-800 transition-colors cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* モーダル本文 */}
            <div className="p-3.5 sm:p-4 overflow-y-auto space-y-3.5">
              {/* お気に入り登録セクション一覧 */}
              {enableBookmarks && (
                bookmarks.length > 0 ? (
                  <div className="p-3 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40">
                    <div className="text-[11px] font-bold text-amber-900 dark:text-amber-300 mb-2 flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
                      <span>★ 保存した章（お気に入り）</span>
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
                            className="w-full text-left p-2.5 rounded-lg bg-white dark:bg-neutral-800 hover:bg-amber-100/60 dark:hover:bg-neutral-700 text-xs font-bold text-neutral-900 dark:text-white flex items-center justify-between gap-2 border border-amber-200/50 dark:border-amber-900/30 transition-colors cursor-pointer min-h-[40px]"
                          >
                            <span className="truncate">{sec.title}</span>
                            <span className="text-[10px] text-amber-600 dark:text-amber-400 shrink-0 flex items-center gap-0.5">
                              <span>移動</span>
                              <ChevronRight className="w-3 h-3" />
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/60 dark:border-neutral-700/60 flex items-center gap-2 text-[11px] text-neutral-500 dark:text-neutral-400">
                    <Star className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                    <span>各章の★アイコンをタップすると、ここにお気に入りが保存されます</span>
                  </div>
                )
              )}

              {/* 独立したツール枠（逆引きデータベース等：章番号の外へ分離し、本文番号を狂わせない） */}
              {toolSections.length > 0 && (
                <div className="space-y-1.5">
                  <div className="text-[10px] sm:text-[11px] font-bold text-cyan-700 dark:text-cyan-400 uppercase tracking-wider px-1 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>専用ツール</span>
                  </div>
                  {toolSections.map((sec) => (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => handleJump(sec.id)}
                      className="w-full flex items-center justify-between gap-2 p-2.5 sm:p-3 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-50 via-cyan-100/40 to-cyan-50 dark:from-cyan-950/40 dark:via-cyan-900/30 dark:to-cyan-950/40 text-cyan-900 dark:text-cyan-200 border border-cyan-200/80 dark:border-cyan-800/60 hover:border-cyan-400 transition-all cursor-pointer shadow-2xs"
                    >
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                        <span>{sec.title}</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                    </button>
                  ))}
                </div>
              )}

              {/* 全セクション一覧（重複番号を解消し、タイトル内の番号を正確に1回だけ表示） */}
              <div className="space-y-1.5">
                <div className="text-[10px] sm:text-[11px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider px-1">
                  全章一覧（タップで移動）
                </div>
                {regularSections.map((sec) => {
                  const isActive = sec.id === activeSectionId;
                  const isBookmarked = bookmarks.includes(sec.id);

                  // sec.title の先頭にある番号（例: 01, 02...）とタイトル本体をきれいに分離して表示
                  const match = sec.title.match(/^(\d{2})\s*(.*)$/);
                  const numPart = match ? match[1] : null;
                  const textPart = match ? match[2] : sec.title;

                  return (
                    <div
                      key={sec.id}
                      className={`group flex items-center justify-between gap-2 p-2 sm:p-2.5 rounded-xl text-xs transition-all border min-h-[42px] ${
                        isActive
                          ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 border-neutral-900 dark:border-white shadow-xs'
                          : 'bg-neutral-50/80 dark:bg-neutral-800/60 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border-neutral-200/70 dark:border-neutral-700/60'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => handleJump(sec.id)}
                        className="flex items-center gap-2 flex-1 text-left cursor-pointer overflow-hidden py-0.5"
                      >
                        {numPart ? (
                          <span className="font-mono text-[11px] font-bold opacity-70 shrink-0">
                            {numPart}.
                          </span>
                        ) : null}
                        <span className="font-bold truncate text-xs sm:text-[13px]">{textPart}</span>
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
                      {enableBookmarks && (
                        <button
                          type="button"
                          onClick={() => onToggleBookmark(sec.id)}
                          className={`p-1.5 rounded-lg shrink-0 transition-colors cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center ${
                            isBookmarked
                              ? 'text-amber-500'
                              : isActive
                              ? 'text-white/40 hover:text-amber-300'
                              : 'text-neutral-400 hover:text-amber-500'
                          }`}
                          title={isBookmarked ? 'お気に入り解除' : 'お気に入りに追加'}
                          aria-label={isBookmarked ? `${sec.title}のお気に入り解除` : `${sec.title}をお気に入りに追加`}
                        >
                          <Star className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current text-amber-500' : ''}`} />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* モーダルフッター */}
            <div className="p-3 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 flex items-center justify-between text-xs">
              <span className="text-neutral-500 dark:text-neutral-400 text-[11px] flex items-center gap-1">
                <Star className="w-3 h-3 text-amber-500 fill-current" />
                <span>★でトレモ用によく見る章を保存できます</span>
              </span>
              <button
                type="button"
                onClick={closeModal}
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white hover:bg-neutral-200/60 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
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
