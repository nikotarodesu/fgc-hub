'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { X, ExternalLink, Lightbulb } from 'lucide-react';
import { GlossaryTerm, GLOSSARY_CATEGORIES } from '@/data/glossary';

interface GlossaryTooltipProps {
  term: GlossaryTerm;
  children: React.ReactNode;
}

export default function GlossaryTooltip({ term, children }: GlossaryTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [coords, setCoords] = useState<{
    top?: number;
    bottom?: number;
    left: number;
    width: number;
  } | null>(null);

  const calculatePosition = () => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // ポップアップの幅（画面幅に応じて最大340px、両端の最小余白32pxを確保）
    const popoverWidth = Math.min(340, vw - 32);

    // 左右位置：トリガー中心を基準にしつつ、画面端から16px以上確保してクランプ
    const triggerCenter = rect.left + rect.width / 2;
    let left = triggerCenter - popoverWidth / 2;
    if (left < 16) left = 16;
    if (left + popoverWidth > vw - 16) left = vw - popoverWidth - 16;

    // 上下位置：トリガーの下と上のスペースを比較して画面内に収まるように配置
    const spaceBelow = vh - rect.bottom;
    const estimatedHeight = 220;

    if (spaceBelow >= estimatedHeight || spaceBelow >= rect.top) {
      // 下側に十分なスペースがある、または下側のほうが広い場合は下部に配置
      const top = Math.min(rect.bottom + 8, vh - estimatedHeight - 16);
      setCoords({
        top: Math.max(16, top),
        left,
        width: popoverWidth,
      });
    } else {
      // 下側が狭い場合はトリガーの上側に配置
      const bottom = Math.min(vh - rect.top + 8, vh - 16);
      setCoords({
        bottom: Math.max(16, bottom),
        left,
        width: popoverWidth,
      });
    }
  };

  const handleToggle = () => {
    if (!isOpen) {
      calculatePosition();
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  // リサイズ・スクロール時の位置追従、およびESCキーでの終了
  useEffect(() => {
    if (!isOpen) return;

    const handleUpdate = () => {
      calculatePosition();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('resize', handleUpdate);
    window.addEventListener('scroll', handleUpdate, { passive: true });
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('resize', handleUpdate);
      window.removeEventListener('scroll', handleUpdate);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const catInfo = GLOSSARY_CATEGORIES.find((c) => c.id === term.category);

  return (
    <>
      {/* 初心者向け用語タップ可能トリガー（文字色は通常の文章と同じ、下の青色破線のみ） */}
      <button
        ref={triggerRef}
        type="button"
        onClick={handleToggle}
        className="inline cursor-pointer text-inherit font-inherit underline decoration-dashed decoration-cyan-500 underline-offset-4 decoration-[1.5px] hover:decoration-solid hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors p-0 bg-transparent border-0 leading-inherit align-baseline text-left select-text"
        aria-label={`${term.term}の用語解説を表示`}
        aria-expanded={isOpen}
      >
        {children}
      </button>

      {/* ポップアップ（画面外にはみ出さないようスマート配置） */}
      {isOpen && coords && (
        <>
          {/* 外側タップ検出用オーバーレイ */}
          <div
            className="fixed inset-0 z-40 bg-black/10 dark:bg-black/30 backdrop-blur-[0.5px]"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* ポップアップカード本体 */}
          <div
            role="dialog"
            aria-modal="true"
            style={{
              position: 'fixed',
              left: `${coords.left}px`,
              top: coords.top !== undefined ? `${coords.top}px` : undefined,
              bottom: coords.bottom !== undefined ? `${coords.bottom}px` : undefined,
              width: `${coords.width}px`,
            }}
            className="z-50 bg-white dark:bg-neutral-900 border border-cyan-500/80 dark:border-cyan-500/70 rounded-2xl p-4 shadow-2xl text-neutral-900 dark:text-neutral-100 text-left animate-in fade-in zoom-in-95 duration-150 max-h-[85vh] overflow-y-auto"
          >
            {/* ヘッダー */}
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-cyan-50 dark:bg-cyan-950/80 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
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
        </>
      )}
    </>
  );
}
