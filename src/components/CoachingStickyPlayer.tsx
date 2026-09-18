'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronUp, ChevronDown, Pin, PinOff, PlayCircle, ExternalLink } from 'lucide-react';

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
  // 最小化（スリムバー）状態：false = 展開（通常）、true = 最小化
  const [isMinimized, setIsMinimized] = useState(false);
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
  }, [isMinimized, isFloating]);

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
          className="w-full aspect-video rounded-xl bg-neutral-900/10 dark:bg-neutral-800/20 border border-dashed border-neutral-300 dark:border-neutral-700 flex flex-col items-center justify-center text-xs text-neutral-400 gap-1"
        >
          <PlayCircle className="w-5 h-5 text-neutral-400 animate-pulse" />
          <span>動画は画面上部に追従中</span>
        </div>
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
                {isMinimized && (
                  <span className="text-[10px] bg-cyan-950 text-cyan-300 px-1.5 py-0.5 rounded font-medium border border-cyan-800/60 shrink-0">
                    再生継続中
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
                {/* 追従（ピン留め）トグル */}
                <button
                  type="button"
                  onClick={() => setIsSticky(!isSticky)}
                  className={`p-1.5 rounded-lg text-[11px] font-medium transition-colors flex items-center gap-1 cursor-pointer ${
                    isSticky
                      ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-800/80 hover:bg-cyan-900/80'
                      : 'bg-neutral-800 text-neutral-400 hover:text-neutral-200'
                  }`}
                  title={isSticky ? '追従を解除して元の位置に留める' : 'スクロール追従を有効にする'}
                >
                  {isSticky ? (
                    <>
                      <Pin className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="hidden sm:inline">追従ON</span>
                    </>
                  ) : (
                    <>
                      <PinOff className="w-3.5 h-3.5 text-neutral-400" />
                      <span className="hidden sm:inline">追従OFF</span>
                    </>
                  )}
                </button>

                {/* 最小化 / 展開トグル */}
                <button
                  type="button"
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="px-2.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-[11px] font-bold transition-colors flex items-center gap-1 cursor-pointer"
                  title={isMinimized ? '動画画面を展開する' : '動画画面を最小化して本文を広く読む'}
                >
                  {isMinimized ? (
                    <>
                      <ChevronDown className="w-3.5 h-3.5 text-cyan-400" />
                      <span>動画を開く</span>
                    </>
                  ) : (
                    <>
                      <ChevronUp className="w-3.5 h-3.5 text-neutral-400" />
                      <span className="hidden xs:inline">最小化</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* 動画iframeコンテナ（最小化時は高さを0にして隠すが、DOMは保持して再生を継続） */}
            <div
              className={`transition-all duration-300 ease-in-out ${
                isMinimized
                  ? 'max-h-0 opacity-0 pointer-events-none overflow-hidden'
                  : 'max-h-[600px] opacity-100'
              }`}
            >
              <div className="relative w-full aspect-video bg-black">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${videoId}?playsinline=1&rel=0`}
                  title={title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                />
              </div>

              <div className="px-3 py-1.5 sm:px-4 sm:py-2 bg-neutral-950/90 border-t border-neutral-800 text-[11px] text-neutral-400 flex items-center justify-between">
                <span className="text-[10px] sm:text-[11px] text-neutral-400">
                  💡 スクロールしても画面上部に追従します（最小化で文章を広く読めます）
                </span>
                <a
                  href={`https://www.youtube.com/watch?v=${videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-cyan-300 inline-flex items-center gap-1 transition-colors shrink-0"
                >
                  <span>YouTubeで開く</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
