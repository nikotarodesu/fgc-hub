import React from 'react';

interface TechniqueEyecatchProps {
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  difficultyLabel?: string;
  order?: number;
  className?: string;
}

export default function TechniqueEyecatch({
  difficulty = 'beginner',
  difficultyLabel = '初級',
  order = 1,
  className = '',
}: TechniqueEyecatchProps) {
  const formattedOrder = String(order).padStart(2, '0');

  const theme =
    difficulty === 'beginner'
      ? {
          bg: 'from-emerald-950 via-neutral-900 to-teal-950 border-emerald-500/40',
          glow: 'bg-emerald-500/15',
          badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
          number: 'text-emerald-400',
          sub: 'text-emerald-300/80',
        }
      : difficulty === 'intermediate'
      ? {
          bg: 'from-amber-950 via-neutral-900 to-orange-950 border-amber-500/40',
          glow: 'bg-amber-500/15',
          badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
          number: 'text-amber-400',
          sub: 'text-amber-300/80',
        }
      : {
          bg: 'from-purple-950 via-neutral-900 to-indigo-950 border-purple-500/40',
          glow: 'bg-purple-500/15',
          badge: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
          number: 'text-purple-400',
          sub: 'text-purple-300/80',
        };

  return (
    <div
      className={`relative w-20 h-20 sm:w-48 md:w-56 aspect-square sm:aspect-[16/9] shrink-0 overflow-hidden rounded-lg self-center flex flex-col items-center justify-center bg-gradient-to-br ${theme.bg} border shadow-inner select-none ${className}`}
    >
      {/* ネオングロー効果 */}
      <div className={`absolute w-24 h-24 rounded-full ${theme.glow} blur-xl pointer-events-none`} />

      {/* 難易度バッジ */}
      <span
        className={`relative z-10 text-[9px] sm:text-[11px] font-black px-1.5 sm:px-2 py-0.2 sm:py-0.5 rounded border tracking-wider mb-0.5 sm:mb-1 ${theme.badge}`}
      >
        {difficultyLabel}
      </span>

      {/* 推奨される学習順番の大きな数字 */}
      <div className="relative z-10 flex items-baseline justify-center font-mono">
        <span className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tighter drop-shadow-md">
          {formattedOrder}
        </span>
      </div>

      {/* サブテキスト */}
      <span
        className={`relative z-10 text-[8px] sm:text-[10px] font-bold tracking-widest uppercase ${theme.sub}`}
      >
        STEP {order}
      </span>
    </div>
  );
}
