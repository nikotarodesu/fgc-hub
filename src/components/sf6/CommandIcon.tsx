import React from 'react';

// 方向矢印SVG
export function DirectionIcon({ dir, className = 'w-3.5 h-3.5' }: { dir: string; className?: string }) {
  // テンキー表記対応
  switch (dir) {
    case '1': // ↙
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 5L5 19M5 19H15M5 19V9" />
        </svg>
      );
    case '2': // ↓
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 4v16m0 0l-5-5m5 5l5-5" />
        </svg>
      );
    case '3': // ↘
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 5l14 14m0 0H9m10 0V9" />
        </svg>
      );
    case '4': // ←
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 12H4m0 0l6-6m-6 6l6 6" />
        </svg>
      );
    case '6': // →
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 12h16m0 0l-6-6m6 6l-6 6" />
        </svg>
      );
    case '7': // ↖
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 19L5 5m0 0h10M5 5v10" />
        </svg>
      );
    case '8': // ↑
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20V4m0 0l-5 5m5-5l5 5" />
        </svg>
      );
    case '9': // ↗
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 19L19 5m0 0H9m10 0v10" />
        </svg>
      );
    case '236': // 波動
      return (
        <span className="inline-flex items-center text-[11px] font-bold text-neutral-600 bg-neutral-100 px-1 py-0.5 rounded border border-neutral-300">
          ↓↘→
        </span>
      );
    case '214': // 竜巻
      return (
        <span className="inline-flex items-center text-[11px] font-bold text-neutral-600 bg-neutral-100 px-1 py-0.5 rounded border border-neutral-300">
          ↓↙←
        </span>
      );
    case '623': // 昇龍
      return (
        <span className="inline-flex items-center text-[11px] font-bold text-neutral-600 bg-neutral-100 px-1 py-0.5 rounded border border-neutral-300">
          →↓↘
        </span>
      );
    case '421': // 逆昇龍
      return (
        <span className="inline-flex items-center text-[11px] font-bold text-neutral-600 bg-neutral-100 px-1 py-0.5 rounded border border-neutral-300">
          ←↓↙
        </span>
      );
    case '236236': // 真空
      return (
        <span className="inline-flex items-center text-[10px] font-bold text-neutral-600 bg-neutral-100 px-1 py-0.5 rounded border border-neutral-300">
          ↓↘→↓↘→
        </span>
      );
    case '[4]6': // タメ←→
      return (
        <span className="inline-flex items-center text-[10px] font-bold text-neutral-600 bg-neutral-100 px-1 py-0.5 rounded border border-neutral-300">
          [←]→
        </span>
      );
    case '[2]8': // タメ↓↑
      return (
        <span className="inline-flex items-center text-[10px] font-bold text-neutral-600 bg-neutral-100 px-1 py-0.5 rounded border border-neutral-300">
          [↓]↑
        </span>
      );
    default:
      return null;
  }
}

// ボタンアイコン（パンチ／キック／システムバッジ）
export function ButtonBadge({ btn, text }: { btn: string; text?: string }) {
  const normalized = btn.toUpperCase();

  // パンチ系
  if (normalized === 'LP') {
    return (
      <span className="inline-flex items-center justify-center min-w-[24px] h-[22px] px-1 text-[11px] font-black rounded-full bg-slate-100 text-slate-700 border border-slate-300 shadow-sm" title="弱パンチ">
        弱P
      </span>
    );
  }
  if (normalized === 'MP') {
    return (
      <span className="inline-flex items-center justify-center min-w-[24px] h-[22px] px-1 text-[11px] font-black rounded-full bg-amber-500 text-white shadow-sm border border-amber-600" title="中パンチ">
        中P
      </span>
    );
  }
  if (normalized === 'HP') {
    return (
      <span className="inline-flex items-center justify-center min-w-[24px] h-[22px] px-1 text-[11px] font-black rounded-full bg-rose-600 text-white shadow-sm border border-rose-700" title="強パンチ">
        強P
      </span>
    );
  }
  if (normalized === 'P' || normalized === 'PP') {
    return (
      <span className="inline-flex items-center justify-center min-w-[24px] h-[22px] px-1 text-[11px] font-black rounded-full bg-amber-100 text-amber-800 border border-amber-300 shadow-sm">
        {normalized}
      </span>
    );
  }

  // キック系
  if (normalized === 'LK') {
    return (
      <span className="inline-flex items-center justify-center min-w-[24px] h-[22px] px-1 text-[11px] font-black rounded-full bg-sky-100 text-sky-800 border border-sky-300 shadow-sm" title="弱キック">
        弱K
      </span>
    );
  }
  if (normalized === 'MK') {
    return (
      <span className="inline-flex items-center justify-center min-w-[24px] h-[22px] px-1 text-[11px] font-black rounded-full bg-blue-600 text-white shadow-sm border border-blue-700" title="中キック">
        中K
      </span>
    );
  }
  if (normalized === 'HK') {
    return (
      <span className="inline-flex items-center justify-center min-w-[24px] h-[22px] px-1 text-[11px] font-black rounded-full bg-indigo-700 text-white shadow-sm border border-indigo-800" title="強キック">
        強K
      </span>
    );
  }
  if (normalized === 'K' || normalized === 'KK') {
    return (
      <span className="inline-flex items-center justify-center min-w-[24px] h-[22px] px-1 text-[11px] font-black rounded-full bg-blue-100 text-blue-800 border border-blue-300 shadow-sm">
        {normalized}
      </span>
    );
  }

  // システム系（OD, DR, DI, SA等）
  if (normalized === 'OD') {
    return (
      <span className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-black rounded bg-gradient-to-r from-amber-400 to-yellow-500 text-neutral-900 border border-amber-500 shadow-sm">
        OD
      </span>
    );
  }
  if (normalized === 'DR' || normalized === 'RUSH') {
    return (
      <span className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-black rounded bg-emerald-500 text-white border border-emerald-600 shadow-sm">
        DR
      </span>
    );
  }
  if (normalized === 'DI') {
    return (
      <span className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-black rounded bg-orange-600 text-white border border-orange-700 shadow-sm">
        DI
      </span>
    );
  }
  if (normalized === 'DP' || normalized === 'PARRY') {
    return (
      <span className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-black rounded bg-sky-500 text-white border border-sky-600 shadow-sm">
        PARRY
      </span>
    );
  }
  if (normalized === 'PC') {
    return (
      <span className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-black rounded bg-purple-600 text-white border border-purple-700 shadow-sm">
        パニカン
      </span>
    );
  }
  if (normalized.startsWith('SA') || normalized === 'CA') {
    return (
      <span className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-black rounded bg-gradient-to-r from-purple-600 to-pink-600 text-white border border-purple-700 shadow-sm">
        {normalized}
      </span>
    );
  }

  // モダン操作系
  if (['弱', '中', '強', 'SP', 'AUTO'].includes(normalized)) {
    return (
      <span className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-bold rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
        {normalized}
      </span>
    );
  }

  // フォールバック
  return (
    <span className="text-xs font-semibold text-neutral-700">
      {text || btn}
    </span>
  );
}
