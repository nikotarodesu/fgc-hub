'use client';

import { useState } from 'react';
import { Swords, Gauge, ChevronDown, ChevronUp, Gamepad2 } from 'lucide-react';
import { parseComboRecipe } from '@/lib/comboParser';

interface ComboProps {
  name: string;
  recipe: string;
  damage: string;
  driveGauge: string;
  situation: string;
  note: string;
}

export default function ComboCard({ name, recipe, damage, driveGauge, situation, note }: ComboProps) {
  const [showCommands, setShowCommands] = useState(false);
  const steps = parseComboRecipe(recipe);

  return (
    <div className="my-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-4 shadow-xs transition-colors">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pb-2 border-b border-neutral-100 dark:border-neutral-800">
        <div className="flex items-center gap-2">
          <Swords className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
          <span className="font-bold text-sm text-neutral-900 dark:text-white">{name}</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-mono font-semibold">
            DMG: {damage}
          </span>
          <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-mono font-medium flex items-center gap-1">
            <Gauge className="w-3 h-3 text-neutral-500" />
            {driveGauge}
          </span>
        </div>
      </div>

      {/* コンボレシピ（タップ可能でコマンド開閉） */}
      <div
        onClick={() => setShowCommands(!showCommands)}
        className="group bg-neutral-900 dark:bg-black text-neutral-100 px-3.5 py-2.5 rounded-lg font-mono text-xs sm:text-sm border border-neutral-800 mb-2.5 overflow-x-auto tracking-wide flex items-center justify-between gap-3 cursor-pointer hover:border-neutral-600 transition-colors"
        title="タップして矢印コマンドを表示"
      >
        <span className="font-semibold text-white">{recipe}</span>
        <span className="text-[11px] text-cyan-400 group-hover:text-cyan-300 flex items-center gap-1 shrink-0 font-sans font-medium">
          <Gamepad2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{showCommands ? 'コマンドを隠す' : 'コマンド展開'}</span>
          {showCommands ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </span>
      </div>

      {/* 初心者向け：矢印コマンドアコーディオン */}
      {showCommands && (
        <div className="mb-3.5 p-3.5 rounded-lg bg-cyan-50/50 dark:bg-cyan-950/20 border border-cyan-200/80 dark:border-cyan-900/60 animate-in fade-in-50 duration-150">
          <div className="text-[11px] font-bold text-cyan-900 dark:text-cyan-300 mb-2 flex items-center gap-1.5">
            <span>🎮 直感コマンド入力シーケンス</span>
            <span className="text-[10px] text-neutral-500 dark:text-neutral-400 font-normal">
              （矢印とボタンの順に入力）
            </span>
          </div>

          {/* 視覚的な矢印・ボタンフロー */}
          <div className="flex flex-wrap items-center gap-2 py-1 overflow-x-auto">
            {steps.map((step, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-white dark:bg-neutral-800 border border-neutral-300/80 dark:border-neutral-700 shadow-2xs">
                  {step.arrows && step.arrows.length > 0 && (
                    <div className="flex items-center gap-0.5">
                      {step.arrows.map((arr, aIdx) => (
                        <span
                          key={aIdx}
                          className="w-5 h-5 rounded bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-bold text-xs flex items-center justify-center font-mono shadow-2xs"
                        >
                          {arr}
                        </span>
                      ))}
                      <span className="text-neutral-400 text-xs px-0.5">+</span>
                    </div>
                  )}
                  <span className="font-bold text-xs text-neutral-900 dark:text-white">
                    {step.buttonText}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <span className="text-neutral-400 font-bold text-xs">➔</span>
                )}
              </div>
            ))}
          </div>

          {/* 各ステップの入力ポイント */}
          <div className="mt-2.5 pt-2 border-t border-cyan-200/60 dark:border-cyan-900/40 space-y-1">
            {steps.filter((s) => s.tip).map((s, sIdx) => (
              <div key={sIdx} className="text-[11px] text-neutral-600 dark:text-neutral-300 flex items-start gap-1.5">
                <span className="text-cyan-700 dark:text-cyan-400 font-bold shrink-0">・[{s.original}]:</span>
                <span>{s.tip}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 状況 & 解説 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
        <div>
          <span className="text-neutral-400 dark:text-neutral-500 font-medium block text-[10px] uppercase">発動状況</span>
          <span className="text-neutral-700 dark:text-neutral-300">{situation}</span>
        </div>
        <div className="sm:col-span-2">
          <span className="text-neutral-400 dark:text-neutral-500 font-medium block text-[10px] uppercase">解説 & コツ</span>
          <span className="text-neutral-700 dark:text-neutral-300">{note}</span>
        </div>
      </div>
    </div>
  );
}
