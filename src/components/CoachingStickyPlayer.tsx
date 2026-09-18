'use client';

import React, { useState } from 'react';
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
  // 上部固定（Sticky）追従の有効/無効：true = 追従、false = 通常配置
  const [isSticky, setIsSticky] = useState(true);

  return (
    <div
      className={`my-4 transition-all duration-300 ${
        isSticky
          ? 'sticky top-0 z-40 -mx-5 px-5 sm:mx-0 sm:px-0'
          : 'relative'
      }`}
    >
      <div className="overflow-hidden rounded-none sm:rounded-xl border-y sm:border border-cyan-500/40 bg-neutral-900/95 backdrop-blur-md shadow-lg transition-all">
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
              <span className="text-[10px] bg-cyan-950 text-cyan-300 px-1.5 py-0.5 rounded font-medium border border-cyan-800/60 shrink-0 hidden xs:inline-block">
                音声再生中
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
              title={isSticky ? '追従を解除して通常配置にする' : '画面上部に追従固定する'}
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
  );
}
