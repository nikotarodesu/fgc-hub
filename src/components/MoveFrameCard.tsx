'use client';

import { useState } from 'react';
import { MoveFrameData } from '@/data/sf6/ryuFrameData';
import { ChevronDown, ChevronUp, Zap } from 'lucide-react';

interface MoveFrameCardProps {
  data: MoveFrameData;
  initiallyOpen?: boolean;
}

export default function MoveFrameCard({ data, initiallyOpen = false }: MoveFrameCardProps) {
  const [isOpen, setIsOpen] = useState(initiallyOpen);

  const blockColor =
    data.onBlock > 0
      ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
      : data.onBlock >= -3
      ? 'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200 border-neutral-200 dark:border-neutral-700'
      : 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300 border-rose-200 dark:border-rose-800';

  const blockText = data.onBlock > 0 ? `+${data.onBlock}F` : `${data.onBlock}F`;
  const hitText = typeof data.onHit === 'number' ? (data.onHit > 0 ? `+${data.onHit}F` : `${data.onHit}F`) : data.onHit;

  return (
    <div className="my-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/60 overflow-hidden transition-all text-xs">
      {/* クリックできるヘッダー */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3.5 py-2.5 flex items-center justify-between gap-2 text-left hover:bg-neutral-100/80 dark:hover:bg-neutral-800/60 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1 font-bold text-neutral-900 dark:text-white">
            <Zap className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>{data.name}</span>
          </span>
          <span className="font-mono text-[11px] text-neutral-400 dark:text-neutral-500">
            [{data.command}]
          </span>
          <span className="text-[10px] px-1.5 py-0.2 rounded bg-neutral-200/80 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
            発生 {data.startup}F
          </span>
          <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded border ${blockColor}`}>
            ガード {blockText}
          </span>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-neutral-500 shrink-0">
          <span>{isOpen ? '閉じる' : 'フレーム詳細'}</span>
          {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </div>
      </button>

      {/* 展開される詳細パネル */}
      {isOpen && (
        <div className="p-3.5 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-2.5">
          {/* グリッド値 */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <div className="p-2 rounded-lg bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/60 dark:border-neutral-700/60">
              <span className="block text-[10px] text-neutral-400 dark:text-neutral-500">発生</span>
              <span className="font-bold text-neutral-900 dark:text-white font-mono">{data.startup}F</span>
            </div>
            <div className="p-2 rounded-lg bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/60 dark:border-neutral-700/60">
              <span className="block text-[10px] text-neutral-400 dark:text-neutral-500">持続 / 硬直</span>
              <span className="font-bold text-neutral-900 dark:text-white font-mono">{data.active} / {data.recovery}F</span>
            </div>
            <div className={`p-2 rounded-lg border ${blockColor}`}>
              <span className="block text-[10px] opacity-80">ガード時硬直差</span>
              <span className="font-bold font-mono text-sm">{blockText}</span>
            </div>
            <div className="p-2 rounded-lg bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/60 dark:border-neutral-700/60">
              <span className="block text-[10px] text-neutral-400 dark:text-neutral-500">ヒット時硬直差</span>
              <span className="font-bold text-neutral-900 dark:text-white font-mono">{hitText}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] pt-1">
            <div>
              <span className="text-neutral-400 dark:text-neutral-500">属性 / ダメージ: </span>
              <span className="font-medium text-neutral-800 dark:text-neutral-200">{data.attribute} ({data.damage})</span>
            </div>
            <div className="sm:col-span-2">
              <span className="text-neutral-400 dark:text-neutral-500">キャンセル属性: </span>
              <span className="font-medium text-cyan-700 dark:text-cyan-300 font-mono">{data.cancel}</span>
            </div>
          </div>

          <div className="p-2 rounded-lg bg-neutral-50 dark:bg-neutral-800/40 text-[11px] text-neutral-600 dark:text-neutral-300 leading-relaxed border border-neutral-200/50 dark:border-neutral-700/50">
            <span className="font-bold text-neutral-800 dark:text-neutral-200">実戦のポイント: </span>
            {data.summary}
          </div>
        </div>
      )}
    </div>
  );
}
