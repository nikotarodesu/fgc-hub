import React from 'react';
import { ButtonColor } from '@/lib/comboParser';

interface ArcadeButtonProps {
  color: ButtonColor;
  iconText: string;
  label?: string;
  size?: 'sm' | 'md';
}

export default function ArcadeButton({ color, iconText, label, size = 'sm' }: ArcadeButtonProps) {
  let colorClasses = '';
  let ringClasses = '';

  switch (color) {
    case 'yellow':
      // 黄色いパンチ/キック/A中ボタン（中攻撃・アシスト中）
      colorClasses = 'bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500 text-neutral-900 border-amber-600';
      ringClasses = 'shadow-[0_2px_3px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.7)]';
      break;
    case 'red':
      // 赤いパンチ/キック/A強ボタン（強/大攻撃・アシスト強）
      colorClasses = 'bg-gradient-to-b from-rose-500 via-red-600 to-red-700 text-white border-rose-800';
      ringClasses = 'shadow-[0_2px_3px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.4)]';
      break;
    case 'blue':
      // 青いパンチ/キック/A弱ボタン（弱攻撃・アシスト弱）
      colorClasses = 'bg-gradient-to-b from-sky-400 via-sky-500 to-sky-600 text-white border-sky-700';
      ringClasses = 'shadow-[0_2px_3px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.4)]';
      break;
    case 'purple':
      // OD技 / A+SP
      colorClasses = 'bg-gradient-to-b from-purple-500 via-purple-600 to-indigo-700 text-white border-purple-800';
      ringClasses = 'shadow-[0_2px_4px_rgba(147,51,234,0.35),inset_0_1px_1px_rgba(255,255,255,0.4)]';
      break;
    case 'gold':
      // SA (スーパーアーツ)
      colorClasses = 'bg-gradient-to-b from-yellow-300 via-amber-400 to-amber-600 text-neutral-950 border-amber-700 ring-1 ring-amber-400/80';
      ringClasses = 'shadow-[0_2px_5px_rgba(245,158,11,0.4),inset_0_1px_2px_rgba(255,255,255,0.8)]';
      break;
    case 'emerald':
      // SP (必殺技ボタン)
      colorClasses = 'bg-gradient-to-b from-emerald-400 via-emerald-500 to-teal-600 text-white border-emerald-700';
      ringClasses = 'shadow-[0_2px_3px_rgba(16,185,129,0.35),inset_0_1px_1px_rgba(255,255,255,0.6)]';
      break;
    case 'orange':
      // オレンジSPボタン
      colorClasses = 'bg-gradient-to-b from-orange-400 via-amber-500 to-amber-600 text-white border-orange-700';
      ringClasses = 'shadow-[0_2px_3px_rgba(249,115,22,0.35),inset_0_1px_1px_rgba(255,255,255,0.6)]';
      break;
    default:
      colorClasses = 'bg-gradient-to-b from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-800 text-neutral-900 dark:text-white border-neutral-400';
      ringClasses = 'shadow-[0_1px_2px_rgba(0,0,0,0.2)]';
  }

  const isLong = iconText.length >= 3;
  const isMultiChar = iconText.length >= 2;
  const dimension =
    size === 'sm'
      ? isLong
        ? 'min-w-7 h-6 px-1 text-[9px]'
        : isMultiChar
        ? 'min-w-6.5 h-6 px-0.5 text-[10px]'
        : 'w-6 h-6 text-[11px]'
      : isLong
      ? 'min-w-8 h-7 px-1.5 text-[10px]'
      : isMultiChar
      ? 'min-w-7.5 h-7 px-1 text-xs'
      : 'w-7 h-7 text-xs';

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full font-black font-mono border-2 shrink-0 select-none tracking-tighter ${dimension} ${colorClasses} ${ringClasses}`}
      title={label || iconText}
    >
      {iconText}
    </span>
  );
}
