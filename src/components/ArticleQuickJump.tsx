'use client';

import { useState } from 'react';
import { BookOpen, Star, X, ChevronRight, ArrowUp, Sparkles } from 'lucide-react';

export interface QuickJumpSection {
  id: string;
  title: string;
  isPaid?: boolean;
}

interface ArticleQuickJumpProps {
  sections: QuickJumpSection[];
  activeSectionId: string;
  activeSubheading?: string | null;
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
  bookmarks,
  onToggleBookmark,
  onJumpToSection,
}: ArticleQuickJumpProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeSection = sections.find((s) => s.id === activeSectionId) || sections[0];
  const isCurrentBookmarked = activeSection ? bookmarks.includes(activeSection.id) : false;

  const handleJump = (id: string) => {
    setIsModalOpen(false);
    onJumpToSection(id);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* 画面追従フローティングバー（スクロール時に上部に固定表示） */}
      <aside aria-label="クイック目次ナビゲーション" className="fixed top-2 left-1/2 -translate-x-1/2 z-40 max-w-2xl w-[94%] sm:w-auto animate-in fade-in slide-in-from-top-3 duration-200">
        <div className="bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border border-neutral-200/90 dark:border-neutral-700/80 rounded-full py-1.5 px-3 shadow-lg flex items-center justify-between gap-2 sm:gap-3 text-xs">
          {/* 現在のセクション表示（小見出しもリアルタイム連動） */}
          <div className="flex items-center gap-1.5 overflow-hidden max-w-[190px] xs:max-w-[240px] sm:max-w-[340px]">
            <span className="w-2 h-2 rounded-full bg-cyan-600 dark:bg-cyan-400 shrink-0 animate-pulse" />
            <span className="text-[10px] text-neutral-400 dark:text-neutral-500 font-medium shrink-0">現在:</span>
            <div className="flex items-center gap-1 min-w-0 text-xs font-bold text-neutral-800 dark:text-neutral-100 overflow-hidden">
              <span className="truncate shrink-0 max-w-[120px] sm:max-w-[170px]">
                {formatSectionTitle(activeSection?.title || '記事本文', Boolean(activeSubheading))}
              </span>
              {activeSubheading && (
                <>
                  <span className="text-neutral-400 dark:text-neutral-500 font-normal shrink-0 text-[11px] select-none">&gt;</span>
                  <span className="text-cyan-600 dark:text-cyan-400 font-bold truncate">
                    {activeSubheading}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* 右側アクションボタングループ */}
          <div className="flex items-center gap-1 shrink-0">
            {/* 現在セクションのお気に入り登録ボタン */}
            {activeSection && (
              <button
                type="button"
                onClick={() => onToggleBookmark(activeSection.id)}
                className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                  isCurrentBookmarked
                    ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/40'
                    : 'text-neutral-400 hover:text-amber-500 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
                title={isCurrentBookmarked ? 'この章のお気に入りを解除' : 'この章をお気に入りに登録'}
              >
                <Star className={`w-3.5 h-3.5 ${isCurrentBookmarked ? 'fill-current' : ''}`} />
              </button>
            )}

            {/* クイック目次ジャンプボタン */}
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-semibold text-[11px] hover:opacity-90 transition-opacity cursor-pointer shadow-2xs"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>目次ジャンプ</span>
            </button>

            {/* トップへ戻る */}
            <button
              type="button"
              onClick={scrollToTop}
              className="p-1.5 rounded-full text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              title="ページ先頭へ"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
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
