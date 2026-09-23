'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { X, ExternalLink, Lightbulb, BookOpen } from 'lucide-react';
import { GlossaryTerm, GLOSSARY_CATEGORIES } from '@/data/glossary';

interface GlossaryTooltipProps {
  term: GlossaryTerm;
  children: React.ReactNode;
}

export default function GlossaryTooltip({ term, children }: GlossaryTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  // 外側クリックまたはESCキーで閉じる
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('pointerdown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const catInfo = GLOSSARY_CATEGORIES.find((c) => c.id === term.category);

  return (
    <span ref={containerRef} className="relative inline-block">
      {/* 初心者向け用語タップ可能トリガー */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline cursor-pointer text-cyan-800 dark:text-cyan-300 font-semibold underline decoration-dashed decoration-cyan-500/80 underline-offset-4 hover:text-cyan-600 dark:hover:text-cyan-200 hover:decoration-solid transition-all p-0 bg-transparent border-0 text-inherit leading-inherit align-baseline text-left"
        aria-label={`${term.term}の用語解説を表示`}
        aria-expanded={isOpen}
      >
        {children}
        <span className="inline-block text-[9px] text-cyan-600 dark:text-cyan-400 font-mono font-normal ml-0.5 select-none align-super">
          ?
        </span>
      </button>

      {/* ポップアップ（ツールチップ・カード） */}
      {isOpen && (
        <div
          ref={popoverRef}
          role="dialog"
          aria-modal="true"
          className="fixed sm:absolute bottom-4 left-4 right-4 sm:bottom-auto sm:left-1/2 sm:-translate-x-1/2 sm:top-full sm:mt-2 z-50 sm:w-84 max-w-[calc(100vw-2rem)] bg-white dark:bg-neutral-900 border border-cyan-400/80 dark:border-cyan-600/80 rounded-2xl p-4 shadow-2xl backdrop-blur-md text-neutral-900 dark:text-neutral-100 text-left animate-in fade-in zoom-in-95 duration-150"
        >
          {/* ヘッダー */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-cyan-100 dark:bg-cyan-950/80 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
                  {catInfo?.name || '格ゲー用語'}
                </span>
                {term.alphabet && (
                  <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500">
                    {term.alphabet}
                  </span>
                )}
              </div>
              <h4 className="text-sm font-black text-neutral-900 dark:text-white mt-1">
                {term.term}
              </h4>
            </div>

            {/* 閉じるボタン */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 text-neutral-400 hover:text-neutral-700 dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors shrink-0"
              aria-label="閉じる"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* 1行要約（サマリー） */}
          <p className="text-xs text-neutral-700 dark:text-neutral-200 leading-relaxed mb-2.5 font-medium bg-neutral-50 dark:bg-neutral-800/60 p-2.5 rounded-xl border border-neutral-100 dark:border-neutral-800">
            {term.summary}
          </p>

          {/* 実戦Tips（あれば表示） */}
          {term.tips && (
            <div className="flex items-start gap-1.5 text-[11px] text-amber-800 dark:text-amber-300 bg-amber-50/70 dark:bg-amber-950/30 p-2 rounded-lg border border-amber-200/50 dark:border-amber-900/30 mb-2.5 leading-snug">
              <Lightbulb className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <span>{term.tips}</span>
            </div>
          )}

          {/* フッターリンク（用語解説ページへの案内） */}
          <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between gap-2">
            <span className="text-[10px] text-neutral-400">※記事内で最初の出現のみタップ可能</span>
            <Link
              href={`/glossary#term-${term.id}`}
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-cyan-600 dark:text-cyan-400 hover:underline shrink-0"
            >
              <span>用語集で詳しく</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      )}
    </span>
  );
}
