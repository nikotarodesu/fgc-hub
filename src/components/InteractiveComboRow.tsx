'use client';

import { useState, useId } from 'react';
import { parseVisualCombo, VisualStep } from '@/lib/comboParser';
import ArcadeButton from './ArcadeButton';
import CommandMotionIcon from './CommandMotionIcon';
import { ChevronDown, ChevronUp, Gamepad2, Zap } from 'lucide-react';
import { getOkizemeDataByCharacter } from '@/data/articles/okizemeRegistry';

interface InteractiveComboRowProps {
  comboLine: string;
  renderInlineText?: (text: string) => React.ReactNode[];
  controlType?: 'classic' | 'modern';
  character?: string;
}

// コンボ行内の有利フレーム表記（例: 「+37」や「（+37）」）を検出し、
// キャラクター固有の起き攻めフレームデータに存在する場合のみタップ可能にするヘルパー
function renderComboLineWithOkizeme(
  text: string,
  renderInlineText: (t: string) => React.ReactNode[],
  character?: string
): React.ReactNode {
  const frameRegex = /([（\(]\s*(?:約)?\s*\+\d+(?:-\d+)?\s*[）\)]|\+\d+(?:-\d+)?(?:F|フレーム)?)/g;

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = frameRegex.exec(text)) !== null) {
    const matchStart = match.index;
    const matchEnd = frameRegex.lastIndex;
    const matchedStr = match[0];

    const okiData = getOkizemeDataByCharacter(character, matchedStr);

    if (matchStart > lastIndex) {
      parts.push(renderInlineText(text.slice(lastIndex, matchStart)));
    }

    if (okiData) {
      parts.push(
        <button
          key={matchStart}
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (typeof window !== 'undefined') {
              window.dispatchEvent(
                new CustomEvent('open_okizeme_modal', {
                  detail: { frame: okiData.frameKey, character: character },
                })
              );
            }
          }}
          className="inline-flex items-center gap-0.5 mx-1 px-1.5 py-0.5 rounded font-mono font-bold text-[11px] sm:text-xs bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-950/80 dark:hover:bg-emerald-900 text-emerald-800 dark:text-emerald-300 border border-emerald-300/80 dark:border-emerald-700 shadow-2xs transition-all hover:scale-105 active:scale-95 cursor-pointer align-baseline select-none group/oki"
          title={`タップして「${okiData.displayFrame}」の⑤起き攻め連携を確認`}
        >
          <span>{matchedStr}</span>
          <span className="text-[9px] sm:text-[10px] font-sans font-bold text-emerald-600 dark:text-emerald-400 underline decoration-emerald-500/40 group-hover/oki:decoration-emerald-500">
            起き攻め
          </span>
        </button>
      );
    } else {
      parts.push(renderInlineText(matchedStr));
    }

    lastIndex = matchEnd;
  }

  if (parts.length === 0) {
    return renderInlineText(text);
  }

  if (lastIndex < text.length) {
    parts.push(renderInlineText(text.slice(lastIndex)));
  }

  return <>{parts}</>;
}

// コンボレシピを技単位と区切り記号に分解し、
// 単語途中で不自然に分断（「強昇」で改行など）されず、技と技の区切りで優先的に折り返せるようにするヘルパー
function renderTokenizedComboRecipe(
  cleanText: string,
  renderInlineText: (t: string) => React.ReactNode[],
  character?: string
): React.ReactNode {
  // 区切り記号 (> , → , ＞ , ⇒) をキャプチャして分割
  const regex = /(\s*(?:>|→|＞|⇒)\s*)/g;
  const parts: { text: string; isSep: boolean }[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(cleanText)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ text: cleanText.slice(lastIndex, match.index), isSep: false });
    }
    parts.push({ text: match[0].trim(), isSep: true });
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < cleanText.length) {
    parts.push({ text: cleanText.slice(lastIndex), isSep: false });
  }

  // 区切り記号が存在しない単発技などの場合
  if (parts.length <= 1) {
    return (
      <span className="inline whitespace-normal break-words">
        {renderComboLineWithOkizeme(cleanText, renderInlineText, character)}
      </span>
    );
  }

  return (
    <>
      {parts.map((part, idx) => {
        if (part.isSep) {
          return (
            <span
              key={idx}
              className="text-cyan-600 dark:text-cyan-400 font-bold select-none text-sm sm:text-base mx-0.5 sm:mx-1 inline-block"
              aria-hidden="true"
            >
              {part.text}
            </span>
          );
        }
        return (
          <span
            key={idx}
            className="inline-block whitespace-normal break-words font-semibold text-neutral-900 dark:text-neutral-100"
          >
            {renderComboLineWithOkizeme(part.text, renderInlineText, character)}
          </span>
        );
      })}
    </>
  );
}

export default function InteractiveComboRow({
  comboLine,
  renderInlineText = (text) => [text],
  controlType = 'classic',
  character,
}: InteractiveComboRowProps) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();
  const buttonId = useId();

  const cleanText = comboLine.trim().replace(/^[●・\-▶︎▶■]\s*/, '');

  // 派生・始動ルート、分岐択（orを含むもの）やセットプレイ（【...〆】など）はコマンド展開を表示しない
  const isNoExpand =
    /^[〜～~]/.test(cleanText) ||
    /[〜～~]\s*$/.test(cleanText) ||
    cleanText.includes(' or ') ||
    /^【.*?〆】/.test(cleanText);

  // 4-1 標準形：非展開コンボ（派生・始動ルート等）
  if (isNoExpand) {
    return (
      <div
        data-combo-card="true"
        className="my-1.5 sm:my-2 rounded-xl border border-neutral-200/90 dark:border-neutral-700/80 border-l-4 border-l-cyan-500 bg-white dark:bg-neutral-900/90 py-2 sm:py-2.5 px-2.5 sm:px-3.5 shadow-2xs w-full max-w-full min-w-0 transition-all"
      >
        <div className="text-[16px] sm:text-[17px] font-mono leading-relaxed select-text min-w-0">
          {/* コンボ識別アイコン（「コンボ」文字を廃止し、コンボだと一発でわかるZapアイコンバッジに集約） */}
          <span
            className="inline-flex items-center justify-center w-5 h-5 rounded-md bg-cyan-600 text-white shrink-0 select-none mr-1.5 sm:mr-2 align-middle -translate-y-0.5 shadow-2xs"
            title="コンボ"
            aria-label="コンボ"
          >
            <Zap className="w-3 h-3 fill-current text-white" aria-hidden="true" />
          </span>

          {/* コンボレシピ */}
          {renderTokenizedComboRecipe(cleanText, renderInlineText, character)}
        </div>
      </div>
    );
  }

  const steps: VisualStep[] = parseVisualCombo(cleanText, controlType, character);

  return (
    <div
      data-combo-card="true"
      className="my-1.5 sm:my-2 rounded-xl border border-neutral-200/90 dark:border-neutral-700/80 border-l-4 border-l-cyan-500 bg-white dark:bg-neutral-900/90 overflow-hidden shadow-2xs w-full max-w-full min-w-0 transition-all"
    >
      {/* メイン行：左側にコンボバッジ＋レシピ、右側にスリムな展開ボタンを1行に統合 */}
      <div className="flex items-center justify-between gap-1.5 sm:gap-2 py-1.5 sm:py-2 px-2 sm:px-3.5 min-h-[42px] sm:min-h-[44px]">
        {/* レシピ部分（バッジとレシピが完全同一行で流れるインラインブロック） */}
        <div className="text-[16px] sm:text-[17px] font-mono leading-relaxed select-text min-w-0 flex-1 py-0.5">
          {/* コンボ識別アイコン（「コンボ」文字を廃止し、コンボだと一発でわかるZapアイコンバッジに集約） */}
          <span
            className="inline-flex items-center justify-center w-5 h-5 rounded-md bg-cyan-600 text-white shrink-0 select-none mr-1.5 sm:mr-2 align-middle -translate-y-0.5 shadow-2xs"
            title="コンボ"
            aria-label="コンボ"
          >
            <Zap className="w-3 h-3 fill-current text-white" aria-hidden="true" />
          </span>

          {/* コンボレシピ（技区切りで自然に折り返し） */}
          {renderTokenizedComboRecipe(cleanText, renderInlineText, character)}
        </div>

        {/* 展開ボタン（スマホでは「入力を見る」文章を削り、アコーディオン開閉ボタンに特化） */}
        <button
          type="button"
          id={buttonId}
          data-combo-toggle="true"
          aria-expanded={isOpen}
          aria-controls={panelId}
          aria-label={isOpen ? `${cleanText} の入力を閉じる` : `${cleanText} の入力を見る`}
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center justify-center min-w-[34px] min-h-[34px] sm:min-h-[36px] px-1.5 sm:px-2.5 py-1 text-xs font-bold text-cyan-700 dark:text-cyan-300 hover:text-cyan-800 dark:hover:text-cyan-200 hover:bg-cyan-100/60 dark:hover:bg-cyan-900/40 active:scale-95 transition-all cursor-pointer rounded-lg shrink-0 select-none border border-cyan-200/70 dark:border-cyan-800/70 bg-cyan-50/50 dark:bg-cyan-950/30"
          title={isOpen ? '入力を閉じる' : '入力を見る'}
        >
          <Gamepad2 className="w-3.5 h-3.5 shrink-0 text-cyan-600 dark:text-cyan-400 hidden sm:inline-block" aria-hidden="true" />
          <span className="hidden sm:inline whitespace-nowrap ml-1">{isOpen ? '閉じる' : '入力を見る'}</span>
          {isOpen ? (
            <ChevronUp className="w-4 h-4 shrink-0 text-cyan-600 dark:text-cyan-400" aria-hidden="true" />
          ) : (
            <ChevronDown className="w-4 h-4 shrink-0 text-cyan-600 dark:text-cyan-400" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* アコーディオン展開エリア（入力手順） */}
      {isOpen && (
        <div
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          className="p-3 sm:p-4 bg-neutral-50 dark:bg-neutral-950 border-t border-neutral-200/80 dark:border-neutral-800 animate-in fade-in-50 duration-150 w-full max-w-full min-w-0"
        >
          {/* 見出し（指示書に従いスリム化） */}
          <div className="text-[11px] sm:text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-2 flex flex-wrap items-center justify-between gap-1.5">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
              <span>入力手順（矢印・ボタン順）</span>
            </div>
            <span className="text-[10px] text-neutral-400 dark:text-neutral-500 font-normal">
              ※横スクロールで全手順確認
            </span>
          </div>

          {/* 視覚的な入力フロー（矢印 + カラーボタン）※縦スクロールを阻害しないよう touch-pan-y を指定 */}
          <div className="flex sm:flex-wrap items-center gap-1 sm:gap-2 py-1.5 overflow-x-auto max-w-full pb-2 touch-pan-y [scrollbar-width:thin] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-neutral-300 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-700">
            {steps.map((step, idx) => (
              <div key={idx} className="flex items-center gap-1 sm:gap-2 shrink-0">
                <div className="flex items-center gap-1 sm:gap-1.5 px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-2xs shrink-0">
                  {/* キャンセル */}
                  {step.isCancel && (
                    <span className="text-[11px] sm:text-xs font-bold text-amber-500 dark:text-amber-400 shrink-0">
                      キャンセル
                    </span>
                  )}

                  {/* ラッシュ */}
                  {step.isRush && (
                    <span className="text-[11px] sm:text-xs font-bold text-blue-600 dark:text-cyan-400 shrink-0">
                      {step.rushText || 'ラッシュ'}
                    </span>
                  )}

                  {/* プレフィックス（溜め、壁バウンド等） */}
                  {step.prefix && (
                    <span
                      className={`text-[9px] sm:text-[10px] font-bold px-1 sm:px-1.5 py-0.5 rounded shrink-0 ${
                        step.prefix === '溜め'
                          ? 'border border-neutral-400 dark:border-neutral-500 text-neutral-800 dark:text-neutral-200 bg-transparent font-sans'
                          : 'bg-neutral-200 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-200'
                      }`}
                    >
                      {step.prefix}
                    </span>
                  )}

                  {/* 方向キーの矢印 */}
                  {step.arrows && step.arrows.length > 0 && (
                    step.chargeArrows && step.chargeArrows.some(Boolean) ? (
                      <div className="flex items-center gap-1 shrink-0">
                        {step.arrows.map((arr, aIdx) => {
                          const isCharge = step.chargeArrows ? step.chargeArrows[aIdx] : false;
                          if (isCharge) {
                            return (
                              <div
                                key={aIdx}
                                className="flex items-center gap-1 bg-neutral-900 dark:bg-black text-amber-300 px-1.5 py-0.5 rounded text-[11px] sm:text-xs font-mono font-bold tracking-tight border-2 border-amber-400 ring-1 ring-amber-400/50 shadow-[0_0_8px_rgba(251,191,36,0.4)] shrink-0"
                                title="溜めコマンド（キーを約0.8秒長押し）"
                              >
                                <span className="text-[9px] font-sans font-black px-0.5 rounded bg-amber-400 text-neutral-950 leading-tight">溜</span>
                                <CommandMotionIcon command={arr} isCharge={true} />
                              </div>
                            );
                          }
                          return (
                            <CommandMotionIcon key={aIdx} command={arr} />
                          );
                        })}
                      </div>
                    ) : step.arrows.length > 1 && !['↓↘→', '→↓↘', '↓↙←', '↓↘→↓↘→', '↓↙←↓↙←'].includes(step.arrowStr) ? (
                      <div className="flex items-center gap-1 shrink-0">
                        {step.arrows.map((arr, aIdx) => (
                          <CommandMotionIcon key={aIdx} command={arr} />
                        ))}
                      </div>
                    ) : (
                      <CommandMotionIcon command={step.arrowStr} />
                    )
                  )}

                  {/* プラス記号 */}
                  {step.arrows &&
                    step.arrows.length > 0 &&
                    step.button.label &&
                    !step.button.label.includes('前ステ') &&
                    !step.button.label.includes('バクステ') &&
                    !step.button.label.includes('歩き') &&
                    !step.button.label.includes('後退') &&
                    !step.button.label.includes('投げ') && (
                      <span className="text-neutral-400 text-xs font-bold shrink-0">+</span>
                    )}

                  {/* アクション表示 */}
                  {step.isTC ? (
                    <div className="flex items-center gap-0.5 shrink-0" title={step.button.description || step.tcText}>
                      {step.tcButtons && step.tcButtons.length > 0 ? (
                        <div className="flex items-center gap-0.5 shrink-0">
                          {step.tcButtons.map((btn, bIdx) => (
                            <span key={bIdx} className="flex items-center">
                              <ArcadeButton
                                color={btn.color}
                                iconText={btn.iconText}
                                label={btn.label}
                                size="sm"
                                controlType={controlType}
                              />
                              {bIdx < step.tcButtons!.length - 1 && (
                                <span className="text-[10px] text-neutral-400 dark:text-neutral-500 font-bold mx-0.5 select-none">
                                  {step.buttonSeparator || '・'}
                                </span>
                              )}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <ArcadeButton
                          color={step.button.color}
                          iconText={step.button.iconText}
                          label={step.button.label}
                          size="sm"
                          controlType={controlType}
                        />
                      )}
                    </div>
                  ) : step.button.label === 'インパクト' ? (
                    <span className="text-xs font-black text-rose-600 dark:text-rose-400 shrink-0">
                      インパクト
                    </span>
                  ) : step.button.label === 'ラッシュ' ? (
                    <span className="text-xs font-bold text-blue-600 dark:text-cyan-400 shrink-0">
                      ラッシュ
                    </span>
                  ) : step.button.label.includes('前ステ') ||
                    step.button.label.includes('バクステ') ||
                    step.button.label.includes('歩き') ||
                    step.button.label.includes('後退') ||
                    step.button.label.includes('投げ') ||
                    step.button.label.includes('飛び') ||
                    step.button.label.includes('ジャンプ') ? (
                    <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200 shrink-0">
                      {step.button.label}
                    </span>
                  ) : (
                    <ArcadeButton
                      color={step.button.color}
                      iconText={step.button.iconText}
                      label={step.button.label}
                      size="sm"
                      controlType={controlType}
                    />
                  )}

                  {/* サフィックス */}
                  {step.suffix && (
                    <span
                      className={`text-[9px] sm:text-[10px] font-bold shrink-0 ${
                        /pc|パニカン|パニッシュ/i.test(step.suffix)
                          ? 'text-rose-600 dark:text-rose-400'
                          : 'text-amber-600 dark:text-amber-400'
                      }`}
                    >
                      {step.suffix}
                    </span>
                  )}
                </div>

                {/* ステップ間の区切り矢印 */}
                {idx < steps.length - 1 && (
                  <span className="text-neutral-400 dark:text-neutral-500 font-bold text-xs shrink-0 select-none">➔</span>
                )}
              </div>
            ))}
          </div>

          {/* 初心者向けワンポイント入力のコツ */}
          {steps.some((s) => s.tip) && (
            <div className="mt-2 pt-1.5 sm:mt-2.5 sm:pt-2 border-t border-neutral-200/60 dark:border-neutral-800 space-y-1">
              {steps.filter((s) => s.tip).map((s, sIdx) => (
                <div key={sIdx} className="text-[10px] sm:text-[11px] text-neutral-600 dark:text-neutral-400 flex items-start gap-1 sm:gap-1.5">
                  <span className="text-cyan-700 dark:text-cyan-400 font-bold shrink-0">［{s.original}］</span>
                  <span className="break-all">{s.tip}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
