'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Pin, PinOff, PlayCircle } from 'lucide-react';

interface CoachingStickyPlayerProps {
  videoId: string;
  title?: string;
  caption?: string;
}

export default function CoachingStickyPlayer({
  videoId,
  title = 'コーチング解説・対戦リプレイ動画',
  caption = '実戦解説・対戦リプレイ動画（YouTube）',
}: CoachingStickyPlayerProps) {
  // 上部固定（Fixed）追従の有効/無効：true = 追従、false = 通常配置
  const [isSticky, setIsSticky] = useState(true);
  // スクロールして画面上部を通過したかどうか
  const [isFloating, setIsFloating] = useState(false);
  // プレースホルダー用のプレイヤー高さ（レイアウトシフト防止）
  const [placeholderHeight, setPlaceholderHeight] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const playerContentRef = useRef<HTMLDivElement | null>(null);

  // プレイヤーの高さを計測して保持
  useEffect(() => {
    if (playerContentRef.current && !isFloating) {
      const height = playerContentRef.current.offsetHeight;
      if (height > 0) {
        setPlaceholderHeight(height);
      }
    }
  }, [isFloating]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // 元の配置場所の上端が画面上部（0px以下）に来たらフローティング固定化
      if (rect.top <= 0) {
        setIsFloating(true);
      } else {
        setIsFloating(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const shouldFloat = isSticky && isFloating;

  return (
    <div ref={containerRef} className="my-6 relative">
      {/* フローティング中のレイアウト崩れ（カクつき）を防ぐプレースホルダー */}
      {shouldFloat && (
        <div
          style={{ height: placeholderHeight > 0 ? `${placeholderHeight}px` : undefined }}
          className="w-full aspect-video rounded-xl bg-neutral-900/10 dark:bg-neutral-800/20 border border-dashed border-neutral-300 dark:border-neutral-700"
        />
      )}

      {/* プレイヤー本体 */}
      <div
        ref={playerContentRef}
        className={
          shouldFloat
            ? 'fixed top-0 left-0 right-0 z-50 w-full shadow-2xl transition-all duration-200 animate-in fade-in slide-in-from-top-2'
            : 'relative w-full'
        }
      >
        <div
          className={
            shouldFloat
              ? 'max-w-3xl mx-auto px-0 sm:px-4'
              : 'w-full'
          }
        >
          <div className="overflow-hidden rounded-none sm:rounded-xl border-b sm:border border-cyan-500/50 bg-neutral-950/95 backdrop-blur-md shadow-xl transition-all">
            {/* コントロールヘッダーバー */}
            <div className="flex items-center justify-between px-3.5 py-2 sm:px-4 sm:py-2.5 bg-neutral-900 border-b border-neutral-800 text-xs">
              <div className="flex items-center gap-2 min-w-0">
                <span className="flex h-2 w-2 relative shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                <span className="font-bold text-neutral-100 truncate text-[11px] sm:text-xs flex items-center gap-1.5">
                  <PlayCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>{caption}</span>
                </span>
              </div>

              {/* 追従（ピン留め）トグル */}
              <button
                type="button"
                onClick={() => setIsSticky(!isSticky)}
                className={`px-2 py-1 sm:px-2.5 sm:py-1 rounded-lg text-[11px] font-medium transition-colors flex items-center gap-1 cursor-pointer ${
                  isSticky
                    ? 'bg-cyan-950/90 text-cyan-300 border border-cyan-800/80 hover:bg-cyan-900/80'
                    : 'bg-neutral-800 text-neutral-400 hover:text-neutral-200'
                }`}
                title={isSticky ? '追従を解除して元の位置に留める' : 'スクロール追従を有効にする'}
              >
                {isSticky ? (
                  <>
                    <Pin className="w-3.5 h-3.5 text-cyan-400" />
                    <span>追従 ON</span>
                  </>
                ) : (
                  <>
                    <PinOff className="w-3.5 h-3.5 text-neutral-400" />
                    <span>追従 OFF</span>
                  </>
                )}
              </button>
            </div>

            {/* 動画iframeコンテナ（16:9アスペクト比で固定） */}
            <div className="relative w-full aspect-video bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${videoId}?playsinline=1&rel=0`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
