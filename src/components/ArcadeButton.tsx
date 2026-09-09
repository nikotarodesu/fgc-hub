import React from 'react';
import { ButtonColor } from '@/lib/comboParser';

interface ArcadeButtonProps {
  color: ButtonColor;
  iconText: string;
  label?: string;
  size?: 'sm' | 'md';
  controlType?: 'classic' | 'modern';
}

export default function ArcadeButton({
  color,
  iconText,
  label,
  size = 'sm',
  controlType = 'classic',
}: ArcadeButtonProps) {
  let colorClasses = '';
  let ringClasses = '';

  switch (color) {
    case 'yellow':
      // 中攻撃（黄色）
      colorClasses = 'bg-gradient-to-b from-amber-300 via-yellow-400 to-amber-500 text-neutral-950 border-amber-500';
      ringClasses = 'shadow-[0_2px_4px_rgba(0,0,0,0.28),inset_0_1px_2px_rgba(255,255,255,0.8)]';
      break;
    case 'red':
      // 強攻撃（赤色）
      colorClasses = 'bg-gradient-to-b from-rose-500 via-red-600 to-red-700 text-white border-rose-600';
      ringClasses = 'shadow-[0_2px_4px_rgba(0,0,0,0.28),inset_0_1px_2px_rgba(255,255,255,0.5)]';
      break;
    case 'blue':
      // 弱攻撃（水色）
      colorClasses = 'bg-gradient-to-b from-cyan-300 via-sky-400 to-blue-500 text-white border-sky-400';
      ringClasses = 'shadow-[0_2px_4px_rgba(0,0,0,0.28),inset_0_1px_2px_rgba(255,255,255,0.7)]';
      break;
    case 'purple':
      // OD技 / A+SP
      colorClasses = 'bg-gradient-to-b from-purple-500 via-purple-600 to-indigo-700 text-white border-purple-700';
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

  const isModern = controlType === 'modern';
  // モダン操作の通常攻撃（弱・中・強）：PやKなど文字は入らず色のみ！
  const isModernNormalAttack = isModern && (color === 'blue' || color === 'yellow' || color === 'red');

  // アシスト攻撃（A弱、A中、A強など）の判定
  const isAssist = isModernNormalAttack && (iconText.startsWith('A') || (label && label.startsWith('A')));

  const dimension = size === 'sm' ? 'w-6 h-6' : 'w-7 h-7';

  // モダン通常攻撃：ボタンの中に文字は入らず色のみの丸ボタンを表示
  if (isModernNormalAttack) {
    const tooltipText = label || (color === 'blue' ? '弱攻撃（水色）' : color === 'yellow' ? '中攻撃（黄色）' : '強攻撃（赤色）');

    const buttonCircle = (
      <span
        className={`inline-flex items-center justify-center rounded-full border-2 shrink-0 select-none ${dimension} ${colorClasses} ${ringClasses}`}
        title={tooltipText}
      >
        {/* アーケードプッシュボタン特有の中央ドームハイライト（文字なし・色のみ） */}
        <span className="w-2 h-2 rounded-full bg-white/35 shadow-inner pointer-events-none" />
      </span>
    );

    if (isAssist) {
      return (
        <span className="inline-flex items-center gap-1 shrink-0" title={`アシスト＋${tooltipText}`}>
          <span className="bg-neutral-800 dark:bg-neutral-900 text-white text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border border-neutral-700 shadow-2xs">
            A
          </span>
          <span className="text-neutral-400 text-xs font-bold">+</span>
          {buttonCircle}
        </span>
      );
    }

    return buttonCircle;
  }

  // クラシック操作、またはモダン特殊ボタン（SP, SA, A+SP等）
  const isLong = iconText.length >= 3;
  const isMultiChar = iconText.length >= 2;
  const textDimension =
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
      className={`inline-flex items-center justify-center rounded-full font-black font-mono border-2 shrink-0 select-none tracking-tighter ${textDimension} ${colorClasses} ${ringClasses}`}
      title={label || iconText}
    >
      {iconText}
    </span>
  );
}
