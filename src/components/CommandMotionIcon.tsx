'use client';

import React from 'react';

interface CommandMotionIconProps {
  command: string; // "↓↘→", "→↓↘", "↓↙←", "↓↘→↓↘→", "↓", "→", etc.
  className?: string;
  isCharge?: boolean;
}

export default function CommandMotionIcon({
  command,
  className = '',
  isCharge = false,
}: CommandMotionIconProps) {
  const cleanCmd = command.trim();

  // 1. 波動拳コマンド (↓↘→ / 236)
  if (cleanCmd === '↓↘→' || cleanCmd === '236') {
    return (
      <span
        className={`inline-flex items-center justify-center shrink-0 select-none ${className}`}
        title="波動拳コマンド（下・斜め前・前へ滑らかに入力）"
      >
        <svg
          viewBox="0 0 32 30"
          className="w-7 h-[26px] drop-shadow-xs"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* レバーボール（赤） */}
          <circle cx="12" cy="11" r="7.5" fill="url(#leverRedGrad)" stroke="#991b1b" strokeWidth="1" />
          <circle cx="9.5" cy="8.5" r="2.5" fill="white" fillOpacity="0.55" />

          {/* 236 回転カーブ矢印 */}
          <path
            d="M 12 18.5 C 12 25.5, 23 25.5, 24 16.5"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
            className="text-neutral-900 dark:text-neutral-100"
          />
          {/* 矢印の先端（右上向き） */}
          <polygon
            points="21,17 25,12 28,18"
            fill="currentColor"
            className="text-neutral-900 dark:text-neutral-100"
          />

          <defs>
            <radialGradient id="leverRedGrad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#f87171" />
              <stop offset="45%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#b91c1c" />
            </radialGradient>
          </defs>
        </svg>
      </span>
    );
  }

  // 2. 昇龍拳コマンド (→↓↘ / 623)
  if (cleanCmd === '→↓↘' || cleanCmd === '623') {
    return (
      <span
        className={`inline-flex items-center justify-center shrink-0 select-none ${className}`}
        title="昇龍拳コマンド（前・下・斜め下へZ字に入力）"
      >
        <svg
          viewBox="0 0 32 30"
          className="w-7 h-[26px] drop-shadow-xs"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* レバーボール（赤） */}
          <circle cx="11" cy="13" r="7.5" fill="url(#leverRedGrad623)" stroke="#991b1b" strokeWidth="1" />
          <circle cx="8.5" cy="10.5" r="2.5" fill="white" fillOpacity="0.55" />

          {/* Z字矢印（太いジグザグ） */}
          <path
            d="M 9 7.5 L 18.5 7.5 L 9 20 L 19.5 20"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-neutral-900 dark:text-neutral-100"
          />
          {/* 矢印の先端（右向き） */}
          <polygon
            points="18,17 24,20 18,23"
            fill="currentColor"
            className="text-neutral-900 dark:text-neutral-100"
          />

          <defs>
            <radialGradient id="leverRedGrad623" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#f87171" />
              <stop offset="45%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#b91c1c" />
            </radialGradient>
          </defs>
        </svg>
      </span>
    );
  }

  // 3. 竜巻旋風脚コマンド (↓↙← / 214)
  if (cleanCmd === '↓↙←' || cleanCmd === '214') {
    return (
      <span
        className={`inline-flex items-center justify-center shrink-0 select-none ${className}`}
        title="竜巻旋風脚コマンド（下・斜め後ろ・後ろへ滑らかに入力）"
      >
        <svg
          viewBox="0 0 32 30"
          className="w-7 h-[26px] drop-shadow-xs"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* レバーボール（赤） */}
          <circle cx="20" cy="11" r="7.5" fill="url(#leverRedGrad214)" stroke="#991b1b" strokeWidth="1" />
          <circle cx="17.5" cy="8.5" r="2.5" fill="white" fillOpacity="0.55" />

          {/* 214 逆回転カーブ矢印 */}
          <path
            d="M 20 18.5 C 20 25.5, 9 25.5, 8 16.5"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
            className="text-neutral-900 dark:text-neutral-100"
          />
          {/* 矢印の先端（左上向き） */}
          <polygon
            points="11,17 7,12 4,18"
            fill="currentColor"
            className="text-neutral-900 dark:text-neutral-100"
          />

          <defs>
            <radialGradient id="leverRedGrad214" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#f87171" />
              <stop offset="45%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#b91c1c" />
            </radialGradient>
          </defs>
        </svg>
      </span>
    );
  }

  // 4. 真空波動拳 / SA3 (↓↘→↓↘→ / 236236)
  if (cleanCmd === '↓↘→↓↘→' || cleanCmd === '236236') {
    return (
      <span
        className={`inline-flex items-center justify-center shrink-0 select-none ${className}`}
        title="真空波動拳コマンド（下・前・下・前へ2回素早く入力）"
      >
        <svg
          viewBox="0 0 54 30"
          className="w-12 h-[26px] drop-shadow-xs"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* 1個目のレバーボール＋矢印 */}
          <circle cx="11" cy="11" r="6.5" fill="url(#leverRedGradSA1)" stroke="#991b1b" strokeWidth="1" />
          <circle cx="9" cy="9" r="2" fill="white" fillOpacity="0.55" />
          <path
            d="M 11 17.5 C 11 24, 20 24, 21 16"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
            className="text-neutral-900 dark:text-neutral-100"
          />
          <polygon
            points="18,17 22,12 24,18"
            fill="currentColor"
            className="text-neutral-900 dark:text-neutral-100"
          />

          {/* 2個目のレバーボール＋矢印 */}
          <circle cx="34" cy="11" r="6.5" fill="url(#leverRedGradSA2)" stroke="#991b1b" strokeWidth="1" />
          <circle cx="32" cy="9" r="2" fill="white" fillOpacity="0.55" />
          <path
            d="M 34 17.5 C 34 24, 43 24, 44 16"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
            className="text-neutral-900 dark:text-neutral-100"
          />
          <polygon
            points="41,17 45,12 47,18"
            fill="currentColor"
            className="text-neutral-900 dark:text-neutral-100"
          />

          <defs>
            <radialGradient id="leverRedGradSA1" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#f87171" />
              <stop offset="45%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#b91c1c" />
            </radialGradient>
            <radialGradient id="leverRedGradSA2" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#f87171" />
              <stop offset="45%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#b91c1c" />
            </radialGradient>
          </defs>
        </svg>
      </span>
    );
  }

  // 5. 真空竜巻旋風脚 (↓↙←↓↙← / 214214)
  if (cleanCmd === '↓↙←↓↙←' || cleanCmd === '214214') {
    return (
      <span
        className={`inline-flex items-center justify-center shrink-0 select-none ${className}`}
        title="真空竜巻コマンド（下・後ろ・下・後ろへ2回素早く入力）"
      >
        <svg
          viewBox="0 0 54 30"
          className="w-12 h-[26px] drop-shadow-xs"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* 1個目 */}
          <circle cx="19" cy="11" r="6.5" fill="url(#leverRedGradSA214A)" stroke="#991b1b" strokeWidth="1" />
          <circle cx="17" cy="9" r="2" fill="white" fillOpacity="0.55" />
          <path
            d="M 19 17.5 C 19 24, 10 24, 9 16"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
            className="text-neutral-900 dark:text-neutral-100"
          />
          <polygon
            points="12,17 8,12 6,18"
            fill="currentColor"
            className="text-neutral-900 dark:text-neutral-100"
          />

          {/* 2個目 */}
          <circle cx="42" cy="11" r="6.5" fill="url(#leverRedGradSA214B)" stroke="#991b1b" strokeWidth="1" />
          <circle cx="40" cy="9" r="2" fill="white" fillOpacity="0.55" />
          <path
            d="M 42 17.5 C 42 24, 33 24, 32 16"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
            className="text-neutral-900 dark:text-neutral-100"
          />
          <polygon
            points="35,17 31,12 29,18"
            fill="currentColor"
            className="text-neutral-900 dark:text-neutral-100"
          />

          <defs>
            <radialGradient id="leverRedGradSA214A" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#f87171" />
              <stop offset="45%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#b91c1c" />
            </radialGradient>
            <radialGradient id="leverRedGradSA214B" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#f87171" />
              <stop offset="45%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#b91c1c" />
            </radialGradient>
          </defs>
        </svg>
      </span>
    );
  }

  // 6. 単独方向キー（↓、→、←、↑、↘、↙、↗、↖）およびその他表記
  // 通常技（前大Kなど）はシンプルに「→ + K」の通り、直感的な文字矢印バッジで表示
  return (
    <span
      className={`inline-flex items-center justify-center bg-neutral-900 dark:bg-black text-white px-1.5 py-0.5 rounded text-[11px] sm:text-xs font-mono font-bold tracking-tight shadow-inner shrink-0 ${className}`}
    >
      {cleanCmd}
    </span>
  );
}
