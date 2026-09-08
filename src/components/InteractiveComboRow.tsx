'use client';

import { useState } from 'react';
import { parseVisualCombo, VisualStep } from '@/lib/comboParser';
import ArcadeButton from './ArcadeButton';
import { ChevronDown, ChevronUp, Gamepad2 } from 'lucide-react';

interface InteractiveComboRowProps {
  comboLine: string;
  renderInlineText: (text: string) => React.ReactNode[];
}

export default function InteractiveComboRow({ comboLine, renderInlineText }: InteractiveComboRowProps) {
  const [isOpen, setIsOpen] = useState(false);
  const cleanText = comboLine.trim().replace(/^[●・\-]\s*/, '');
  const steps: VisualStep[] = parseVisualCombo(cleanText);

  return (
    <div className="my-2 rounded-lg border border-neutral-200/90 dark:border-neutral-700/80 bg-neutral-50/90 dark:bg-neutral-800/80 overflow-hidden transition-all shadow-2xs">
      {/* クリック可能なコンボ本体行 */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-3 py-2 px-3 hover:bg-neutral-100/90 dark:hover:bg-neutral-800 cursor-pointer transition-colors"
        title="タップして矢印コマンドとボタン入力順を表示"
      >
        <div className="flex items-center gap-2.5 overflow-x-auto flex-1 text-xs sm:text-sm font-mono text-neutral-900 dark:text-neutral-100">
          <span className="shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded bg-cyan-600 text-white font-sans tracking-wide">
            コンボ
          </span>
          <span className="font-semibold truncate sm:whitespace-normal">
            {renderInlineText(cleanText)}
          </span>
        </div>

        {/* アコーディオン開閉インジケーター */}
        <div className="flex items-center gap-1 text-[11px] text-cyan-600 dark:text-cyan-400 shrink-0 font-medium select-none">
          <Gamepad2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{isOpen ? 'コマンドを隠す' : 'コマンド展開'}</span>
          {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </div>
      </div>

      {/* 初心者向け：矢印＋カラーボタンのアコーディオン展開エリア */}
      {isOpen && (
        <div className="p-3 sm:p-4 bg-white dark:bg-neutral-900 border-t border-neutral-200/80 dark:border-neutral-700/80 animate-in fade-in-50 duration-150">
          <div className="text-[11px] font-bold text-neutral-700 dark:text-neutral-300 mb-2.5 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            <span>🎮 直感コマンド入力手順（矢印とボタンの順に入力）</span>
          </div>

          {/* 視覚的な入力フロー（矢印 + カラーボタン） */}
          <div className="flex flex-wrap items-center gap-2 py-1 overflow-x-auto">
            {steps.map((step, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-2xs">
                  {/* キャンセル（青い文字） */}
                  {step.isCancel && (
                    <span className="text-xs font-bold text-blue-600 dark:text-cyan-400 shrink-0">
                      キャンセル
                    </span>
                  )}

                  {/* ラッシュ（青い文字） */}
                  {step.isRush && (
                    <span className="text-xs font-bold text-blue-600 dark:text-cyan-400 shrink-0">
                      {step.rushText || 'ラッシュ'}
                    </span>
                  )}

                  {/* その他プレフィックス（壁バウンド等） */}
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

                  {/* プラス記号（矢印とボタンがある場合） */}
                  {step.arrows && step.arrows.length > 0 && step.button.label && (
                    <span className="text-neutral-400 text-xs font-bold">+</span>
                  )}

                  {/* カラフルなアーケードボタン（小さい文章は削除し、ボタン画像とラベルのみ） */}
                  <div className="flex items-center gap-1.5">
                    <ArcadeButton
                      color={step.button.color}
                      iconText={step.button.iconText}
                      label={step.button.label}
                      size="sm"
                    />
                    <span className="font-bold text-xs text-neutral-900 dark:text-white leading-none">
                      {step.button.label}
                    </span>
                  </div>

                  {/* サフィックス（カス当たり等 ※ダメージ数値は除外済み） */}
                  {step.suffix && (
                    <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold">
                      {step.suffix}
                    </span>
                  )}
                </div>

                {/* ステップ間の区切り矢印 */}
                {idx < steps.length - 1 && (
                  <span className="text-neutral-400 dark:text-neutral-500 font-bold text-xs">➔</span>
                )}
              </div>
            ))}
          </div>

          {/* 初心者向けワンポイント入力のコツ */}
          {steps.some((s) => s.tip) && (
            <div className="mt-2.5 pt-2 border-t border-neutral-100 dark:border-neutral-800 space-y-1">
              {steps.filter((s) => s.tip).map((s, sIdx) => (
                <div key={sIdx} className="text-[11px] text-neutral-600 dark:text-neutral-400 flex items-start gap-1.5">
                  <span className="text-cyan-700 dark:text-cyan-400 font-bold shrink-0">・[{s.original}]:</span>
                  <span>{s.tip}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
