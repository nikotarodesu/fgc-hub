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
      // 黄色いパンチ/キックボタン（中攻撃）
      colorClasses = 'bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500 text-neutral-900 border-amber-600';
      ringClasses = 'shadow-[0_2px_3px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.7)]';
      break;
    case 'red':
      // 赤いパンチ/キックボタン（強/大攻撃）
      colorClasses = 'bg-gradient-to-b from-rose-500 via-red-600 to-red-700 text-white border-rose-800';
      ringClasses = 'shadow-[0_2px_3px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.4)]';
      break;
    case 'blue':
      // 青いパンチ/キックボタン（弱攻撃）
      colorClasses = 'bg-gradient-to-b from-sky-400 via-sky-500 to-sky-600 text-white border-sky-700';
      ringClasses = 'shadow-[0_2px_3px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.4)]';
      break;
    case 'purple':
      // OD技（2ボタン同時）
      colorClasses = 'bg-gradient-to-b from-purple-500 via-purple-600 to-indigo-700 text-white border-purple-800';
      ringClasses = 'shadow-[0_2px_4px_rgba(147,51,234,0.35),inset_0_1px_1px_rgba(255,255,255,0.4)]';
      break;
    case 'gold':
      // SA (スーパーアーツ)
      colorClasses = 'bg-gradient-to-b from-yellow-300 via-amber-400 to-amber-600 text-neutral-950 border-amber-700 ring-1 ring-amber-400/80';
      ringClasses = 'shadow-[0_2px_5px_rgba(245,158,11,0.4),inset_0_1px_2px_rgba(255,255,255,0.8)]';
      break;
    default:
      colorClasses = 'bg-gradient-to-b from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-800 text-neutral-900 dark:text-white border-neutral-400';
      ringClasses = 'shadow-[0_1px_2px_rgba(0,0,0,0.2)]';
  }

  const dimension = size === 'sm' ? 'w-6 h-6 text-[11px]' : 'w-7 h-7 text-xs';

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full font-black font-mono border-2 shrink-0 select-none ${dimension} ${colorClasses} ${ringClasses}`}
      title={label || iconText}
    >
      {iconText}
    </span>
  );
}
