'use client';

import { useState } from 'react';
import { Swords, Gauge, ChevronDown, ChevronUp, Gamepad2 } from 'lucide-react';
import { parseVisualCombo } from '@/lib/comboParser';
import ArcadeButton from './ArcadeButton';

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
  const steps = parseVisualCombo(recipe);

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
        className="group bg-neutral-900 dark:bg-black text-neutral-100 px-3.5 py-2.5 rounded-lg font-mono text-xs sm:text-sm border border-neutral-800 mb-2.5 tracking-wide flex items-start sm:items-center justify-between gap-3 cursor-pointer hover:border-neutral-600 transition-colors"
        title="タップして矢印コマンドを表示"
      >
        <span className="font-semibold text-white whitespace-normal [overflow-wrap:anywhere] break-all leading-relaxed">{recipe}</span>
        <span className="text-[11px] text-cyan-400 group-hover:text-cyan-300 flex items-center gap-1 shrink-0 font-sans font-medium mt-0.5 sm:mt-0">
          <Gamepad2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{showCommands ? 'コマンドを隠す' : 'コマンド展開'}</span>
          {showCommands ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </span>
      </div>

      {/* 初心者向け：矢印コマンドアコーディオン */}
      {showCommands && (
        <div className="mb-3.5 p-2.5 sm:p-3.5 rounded-lg bg-cyan-50/50 dark:bg-cyan-950/20 border border-cyan-200/80 dark:border-cyan-900/60 animate-in fade-in-50 duration-150">
          <div className="text-[11px] font-bold text-cyan-900 dark:text-cyan-300 mb-2 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            <span>🎮 直感コマンド入力手順（矢印とボタンの順に入力）</span>
          </div>

          {/* 視覚的な矢印・ボタンフロー */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 py-1 overflow-x-auto max-w-full">
            {steps.map((step, idx) => (
              <div key={idx} className="flex items-center gap-1.5 sm:gap-2">
                <div className="flex items-center gap-1.5 px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-2xs">
                  {/* キャンセル（黄色） */}
                  {step.isCancel && (
                    <span className="text-xs font-bold text-amber-500 dark:text-amber-400 shrink-0">
                      キャンセル
                    </span>
                  )}

                  {/* ラッシュ（青色） */}
                  {step.isRush && (
                    <span className="text-xs font-bold text-blue-600 dark:text-cyan-400 shrink-0">
                      {step.rushText || 'ラッシュ'}
                    </span>
                  )}

                  {/* その他プレフィックス（壁ドン、壁バウンド等） */}
                  {step.prefix && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-neutral-200 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-200">
                      {step.prefix}
                    </span>
                  )}

                  {/* 方向キーの矢印 */}
                  {step.arrows && step.arrows.length > 0 && (
                    <div className="flex items-center gap-0.5 bg-neutral-900 dark:bg-black text-white px-1.5 py-0.5 rounded text-xs font-mono font-bold tracking-tight shadow-inner">
                      {step.arrowStr}
                    </div>
                  )}

                  {/* プラス記号（矢印とボタンがある場合、移動アクションやインパクトは除く） */}
                  {step.arrows &&
                    step.arrows.length > 0 &&
                    step.button.label &&
                    !step.button.label.includes('前ステ') &&
                    !step.button.label.includes('バクステ') &&
                    !step.button.label.includes('歩き') &&
                    !step.button.label.includes('後退') &&
                    !step.button.label.includes('投げ') && (
                      <span className="text-neutral-400 text-xs font-bold">+</span>
                    )}

                  {/* アクション表示（インパクトは赤文字、前ステ等は通常文字、通常技・必殺技はアーケードボタン） */}
                  {step.button.label === 'インパクト' ? (
                    <span className="text-xs font-black text-rose-600 dark:text-rose-400">
                      インパクト
                    </span>
                  ) : step.button.label.includes('前ステ') ||
                    step.button.label.includes('バクステ') ||
                    step.button.label.includes('歩き') ||
                    step.button.label.includes('後退') ||
                    step.button.label.includes('投げ') ? (
                    <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                      {step.button.label}
                    </span>
                  ) : (
                    <div className="flex items-center gap-1.5">
                      <ArcadeButton
                        color={step.button.color}
                        iconText={step.button.iconText}
                        label={step.button.label}
                        size="sm"
                      />
                      {step.button.showLabel && step.button.label && (
                        <span className="font-bold text-xs text-neutral-900 dark:text-white leading-none">
                          {step.button.label}
                        </span>
                      )}
                    </div>
                  )}

                  {/* サフィックス（カス当たり等 ※ダメージ数値は除外済み） */}
                  {step.suffix && (
                    <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold">
                      {step.suffix}
                    </span>
                  )}
                </div>
                {idx < steps.length - 1 && (
                  <span className="text-neutral-400 dark:text-neutral-500 font-bold text-xs">➔</span>
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
