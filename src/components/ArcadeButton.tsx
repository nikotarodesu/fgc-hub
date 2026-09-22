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
  const dimension = size === 'sm' ? 'w-6 h-6' : 'w-7 h-7';

  // モダン操作時の判定
  if (isModern) {
    // 1. OD技（PP, KK等）は例外として文字を表示
    const isOD =
      iconText === 'PP' ||
      iconText === 'PPP' ||
      iconText === 'KK' ||
      iconText === 'KKK' ||
      iconText.includes('PP') ||
      iconText.includes('KK') ||
      iconText.includes('pp') ||
      iconText.includes('kk');

    // 2. 必殺技ボタン（SP, A+SP）やシステムボタン（DI, DP, PARRY, 派生）は文字を表示
    const isSpecialButton =
      iconText === 'SP' ||
      iconText === 'A+SP' ||
      iconText === 'DI' ||
      iconText === 'DP' ||
      iconText === 'PARRY' ||
      iconText.includes('派生');

    if (isOD || isSpecialButton) {
      let displayIcon = iconText;
      if (isOD) {
        displayIcon = iconText.toUpperCase().includes('K') ? 'KK' : 'PP';
      }
      const isLong = displayIcon.length >= 3;
      const isMultiChar = displayIcon.length >= 2;
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
          title={label || displayIcon}
        >
          {displayIcon}
        </span>
      );
    }

    // 3. SA（スーパーアーツ）：文字（SA/SA1/SA2/SA3等）は入れず、金色の丸ボタンのみ
    const isSA =
      color === 'gold' ||
      iconText === 'SA' ||
      iconText.startsWith('SA') ||
      iconText === 'CA';

    if (isSA) {
      const saClasses =
        'bg-gradient-to-b from-yellow-300 via-amber-400 to-amber-600 text-neutral-950 border-amber-700 ring-1 ring-amber-400/80 shadow-[0_2px_5px_rgba(245,158,11,0.4),inset_0_1px_2px_rgba(255,255,255,0.8)]';

      return (
        <span
          className={`inline-flex items-center justify-center rounded-full border-2 shrink-0 select-none ${dimension} ${saClasses}`}
          title={label || 'スーパーアーツ（金色）'}
        >
          <span className="w-2 h-2 rounded-full bg-white/40 shadow-inner pointer-events-none" />
        </span>
      );
    }

    // 4. 通常技（弱・中・強）：文字（弱・中・強・P・K等）は入れず色のみ！
    // ただしアシスト（A弱、A中、A強）の場合は「A」を表示
    const isAssist =
      iconText.startsWith('A') || (label && label.startsWith('A'));

    const tooltipText =
      label ||
      (color === 'blue'
        ? '弱攻撃（水色）'
        : color === 'yellow'
        ? '中攻撃（黄色）'
        : '強攻撃（赤色）');

    if (isAssist) {
      return (
        <span
          className={`inline-flex items-center justify-center rounded-full font-black font-mono border-2 shrink-0 select-none tracking-tighter ${dimension} ${
            size === 'sm' ? 'text-[11px]' : 'text-xs'
          } ${colorClasses} ${ringClasses}`}
          title={`アシスト＋${tooltipText}`}
        >
          A
        </span>
      );
    }

    // 文字なし・色のみの丸ボタン＋中央ドームハイライト
    return (
      <span
        className={`inline-flex items-center justify-center rounded-full border-2 shrink-0 select-none ${dimension} ${colorClasses} ${ringClasses}`}
        title={tooltipText}
      >
        <span className="w-2 h-2 rounded-full bg-white/35 shadow-inner pointer-events-none" />
      </span>
    );
  }

  // クラシック操作
  // 5-1準拠: クラシック操作のボタン内文字は原則として「P」「K」「PP」「KK」のみとし、漢字や技分類を入れない
  let renderedIconText = iconText;
  if (!isModern) {
    if (iconText === 'PP' || iconText === 'PPP') {
      renderedIconText = 'PP';
    } else if (iconText === 'KK' || iconText === 'KKK') {
      renderedIconText = 'KK';
    } else if (iconText.includes('KK') || iconText.includes('kk')) {
      renderedIconText = 'KK';
    } else if (iconText.includes('PP') || iconText.includes('pp')) {
      renderedIconText = 'PP';
    } else if (iconText.includes('K') || iconText.includes('k') || (label && (label.includes('K') || label.includes('キック') || label.includes('脚')))) {
      renderedIconText = 'K';
    } else if (iconText.includes('P') || iconText.includes('p') || (label && (label.includes('P') || label.includes('パンチ') || label.includes('拳')))) {
      renderedIconText = 'P';
    } else if (color === 'gold') {
      renderedIconText = (label && (label.includes('K') || label.includes('キック'))) ? 'K' : 'P';
    } else {
      const stripped = iconText.replace(/[弱中強大小前後下上SA123CA]/g, '').trim();
      renderedIconText = stripped || 'P';
    }
  }

  const isLong = renderedIconText.length >= 3;
  const isMultiChar = renderedIconText.length >= 2;
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
      title={label || renderedIconText}
    >
      {renderedIconText}
    </span>
  );
}
