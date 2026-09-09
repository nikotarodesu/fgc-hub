'use client';

import React from 'react';
import { findNeutralMoveKeyFrame } from '@/data/sf6/ryuFrameData';
import InteractiveComboRow from './InteractiveComboRow';
import { Star, Zap } from 'lucide-react';

interface RichContentProps {
  content: string;
  isNeutralMovesSection?: boolean;
  controlType?: 'classic' | 'modern';
}

// インライン装飾（**太字** 等）のスマートなパース
function renderInline(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const inner = part.slice(2, -2);
      return (
        <strong
          key={i}
          className="font-bold text-neutral-900 dark:text-white border-b border-neutral-900/40 dark:border-neutral-100/40 pb-0.5"
        >
          {inner}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

type LineType =
  | 'empty'
  | 'quote'
  | 'numbered_heading'
  | 'star_heading'
  | 'lightning_heading'
  | 'frame'
  | 'combo'
  | 'subheading'
  | 'bullet'
  | 'numbered'
  | 'arrow'
  | 'text';

function getLineType(line: string): LineType {
  const trimmed = line.trim();
  if (!trimmed) return 'empty';
  if (trimmed.startsWith('>')) return 'quote';
  if (/^[①-⑳❶-❿]/.test(trimmed)) return 'numbered_heading';
  if (trimmed.startsWith('⭐️') || trimmed.startsWith('⭐')) return 'star_heading';
  if (trimmed.startsWith('⚡️') || trimmed.startsWith('⚡')) return 'lightning_heading';
  if (trimmed.startsWith('【') && trimmed.includes('】')) return 'frame';
  if (
    (trimmed.startsWith('●') || trimmed.startsWith('・') || trimmed.startsWith('-')) &&
    (trimmed.includes('〆') || trimmed.includes('>') || trimmed.includes('＞') || trimmed.includes('→'))
  ) {
    return 'combo';
  }
  if (trimmed.startsWith('●') || trimmed.startsWith('■')) return 'subheading';
  if (
    trimmed.startsWith('・') ||
    trimmed.startsWith('- ') ||
    trimmed.startsWith('* ') ||
    trimmed.startsWith('▶︎') ||
    trimmed.startsWith('▶')
  ) {
    return 'bullet';
  }
  if (/^\d+[\.|\)|）]\s*/.test(trimmed)) return 'numbered';
  if (trimmed.startsWith('→') || trimmed.startsWith('=>')) return 'arrow';
  return 'text';
}

interface ComboUnit {
  recipe: string;
  notes: string[];
}

interface ParsedBlock {
  type:
    | 'quote'
    | 'numbered_heading'
    | 'star_heading'
    | 'lightning_heading'
    | 'frame'
    | 'combo_group'
    | 'subheading'
    | 'bullet'
    | 'numbered'
    | 'arrow'
    | 'text';
  lines?: string[];
  combos?: ComboUnit[];
  context?: 'oki' | 'general';
}

function parseContentToBlocks(content: string): ParsedBlock[] {
  const rawLines = content.split('\n');
  const blocks: ParsedBlock[] = [];
  let currentBlock: ParsedBlock | null = null;
  let currentCombo: ComboUnit | null = null;
  let lastHeadingContext: 'oki' | 'general' = 'general';

  for (let i = 0; i < rawLines.length; i++) {
    const rawLine = rawLines[i];
    const trimmed = rawLine.trim();

    if (!trimmed) {
      // 空行の処理：直後がbulletならコンボ紐付けを維持し、それ以外ならコンボ紐付けを終了
      if (currentCombo) {
        const nextNonEmpty = rawLines.slice(i + 1).find((l) => l.trim().length > 0);
        if (nextNonEmpty) {
          const nextType = getLineType(nextNonEmpty);
          if (nextType !== 'bullet') {
            currentCombo = null;
          }
        } else {
          currentCombo = null;
        }
      }
      continue;
    }

    const lineType = getLineType(trimmed);

    if (lineType === 'frame') {
      lastHeadingContext = 'oki';
    } else if (
      lineType === 'numbered_heading' ||
      lineType === 'star_heading' ||
      lineType === 'lightning_heading'
    ) {
      lastHeadingContext = 'general';
    }

    // 1. コンボレシピ行
    if (lineType === 'combo') {
      currentCombo = { recipe: trimmed, notes: [] };
      if (!currentBlock || currentBlock.type !== 'combo_group') {
        if (currentBlock) blocks.push(currentBlock);
        currentBlock = {
          type: 'combo_group',
          combos: [currentCombo],
          context: lastHeadingContext,
        };
      } else {
        currentBlock.combos!.push(currentCombo);
      }
      continue;
    }

    // 2. コンボに続く箇条書き行（▶︎ など）は、そのコンボの解説ノートとして紐付け
    if (lineType === 'bullet' && currentCombo) {
      const cleanNote = trimmed.replace(/^[・\-\*▶︎▶]\s*/, '');
      currentCombo.notes.push(cleanNote);
      continue;
    }

    // 3. コンボ以外の行が来たらコンボ紐付けを解除
    currentCombo = null;

    if (!currentBlock || currentBlock.type !== lineType) {
      if (currentBlock) blocks.push(currentBlock);
      currentBlock = { type: lineType as Exclude<LineType, 'empty' | 'combo'>, lines: [trimmed] };
    } else {
      currentBlock.lines!.push(trimmed);
    }
  }

  if (currentBlock) {
    blocks.push(currentBlock);
  }

  return blocks;
}

export default function RichContent({
  content,
  isNeutralMovesSection = false,
  controlType = 'classic',
}: RichContentProps) {
  if (!content) return null;

  const blocks = parseContentToBlocks(content);

  return (
    <div className="space-y-4 text-neutral-700 dark:text-neutral-300 leading-relaxed sm:leading-loose text-[15px] sm:text-base">
      {blocks.map((block, bIdx) => {
        // 1. 引用・コールアウト
        if (block.type === 'quote' && block.lines) {
          const quoteText = block.lines
            .map((l) => l.trim().replace(/^>\s*/, ''))
            .join('\n');
          return (
            <div
              key={bIdx}
              className="my-3 pl-3.5 py-1.5 border-l-2.5 border-neutral-800 dark:border-neutral-200 text-neutral-800 dark:text-neutral-200 font-medium text-sm sm:text-[15px]"
            >
              {renderInline(quoteText)}
            </div>
          );
        }

        // 1.4 数字見出し（❶ 中技始動, ❷ 弱技始動, ① 等）
        if (block.type === 'numbered_heading' && block.lines) {
          return (
            <div
              key={bIdx}
              className="pt-5 pb-1 mt-4 first:mt-0 first:pt-0 border-b border-neutral-200 dark:border-neutral-800"
            >
              {block.lines.map((line, lIdx) => {
                const match = line.trim().match(/^([①-⑳❶-❿])\s*(.*)$/);
                const numChar = match ? match[1] : '';
                const titleText = match ? match[2] : line.trim();
                return (
                  <div key={lIdx} className="flex items-center gap-2.5 pb-2">
                    {numChar && (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-mono font-bold text-xs shrink-0 shadow-2xs">
                        {numChar}
                      </span>
                    )}
                    <h3 className="text-base sm:text-lg font-black text-neutral-900 dark:text-white tracking-tight">
                      {renderInline(titleText)}
                    </h3>
                  </div>
                );
              })}
            </div>
          );
        }

        // 1.5 ⭐️ ルート見出し（⭐️ OD足刀ルート, ⭐️ リーサルコンボ, ⭐️ ノーゲージ 等）
        if (block.type === 'star_heading' && block.lines) {
          return (
            <div key={bIdx} className="pt-2 pb-0.5 space-y-2">
              {block.lines.map((line, lIdx) => {
                const cleanText = line.trim().replace(/^[⭐️⭐]\s*/, '');
                return (
                  <div
                    key={lIdx}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-r-lg border-l-3.5 border-l-sky-500 dark:border-l-sky-400 bg-sky-50/70 dark:bg-sky-950/30 border-y border-r border-sky-200/60 dark:border-sky-900/40 text-neutral-900 dark:text-white font-bold text-sm sm:text-base tracking-tight shadow-2xs"
                  >
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-sky-500/15 dark:bg-sky-400/20 text-sky-600 dark:text-sky-300 text-xs font-bold shrink-0 select-none">
                      <Star className="w-3.5 h-3.5 fill-current" />
                    </span>
                    <h4 className="font-bold text-sm sm:text-[15px] text-sky-950 dark:text-sky-100 tracking-tight">
                      {renderInline(cleanText)}
                    </h4>
                  </div>
                );
              })}
            </div>
          );
        }

        // 1.6 ⚡️ 特殊状態見出し（⚡️ 電刃モード, ⚡️ 電刃リーサルコンボ 等）
        if (block.type === 'lightning_heading' && block.lines) {
          return (
            <div key={bIdx} className="pt-2 pb-0.5 space-y-2">
              {block.lines.map((line, lIdx) => {
                const cleanText = line.trim().replace(/^[⚡️⚡]\s*/, '');
                return (
                  <div
                    key={lIdx}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-r-lg border-l-3.5 border-l-amber-500 dark:border-l-amber-400 bg-amber-50/75 dark:bg-amber-950/30 border-y border-r border-amber-200/60 dark:border-amber-900/40 text-neutral-900 dark:text-white font-bold text-sm sm:text-base tracking-tight shadow-2xs"
                  >
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-amber-500/20 dark:bg-amber-400/20 text-amber-600 dark:text-amber-400 text-xs font-bold shrink-0 select-none">
                      <Zap className="w-3.5 h-3.5 fill-current" />
                    </span>
                    <h4 className="font-bold text-sm sm:text-[15px] text-amber-950 dark:text-amber-100 tracking-tight">
                      {renderInline(cleanText)}
                    </h4>
                  </div>
                );
              })}
            </div>
          );
        }

        // 1.65 起き攻めフレーム状況ヘッダー（【+37】など）
        if (block.type === 'frame' && block.lines) {
          return (
            <div key={bIdx} className="pt-4 pb-0.5">
              {block.lines.map((line, lIdx) => {
                const trimmed = line.trim();
                const match = trimmed.match(/^【(.*?)】(.*)$/);
                const badgeContent = match ? match[1] : trimmed;
                const extraText = match ? match[2].trim() : '';

                return (
                  <div key={lIdx} className="flex items-center gap-2 flex-wrap my-1">
                    <span className="inline-flex items-center bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-mono font-bold text-sm sm:text-[15px] px-3 py-1 rounded-md shadow-sm border border-neutral-800 dark:border-neutral-200">
                      【{badgeContent}】
                    </span>
                    {extraText && (
                      <span className="text-xs sm:text-sm font-bold text-neutral-700 dark:text-neutral-300">
                        {renderInline(extraText)}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          );
        }

        // 1.7 コンボグループ（各コンボと、その直下に紐付く解説箇条書き）
        if (block.type === 'combo_group' && block.combos) {
          const isOki = block.context === 'oki';
          return (
            <div key={bIdx} className="my-2.5 sm:my-3 space-y-3 sm:space-y-3.5">
              {/* グループ全体の小ヘッダー（コンボレシピ または 締め技ルート） */}
              <div className="text-[10px] sm:text-[11px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider flex items-center justify-between gap-1.5 select-none px-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-600 dark:bg-cyan-400" />
                  <span>{isOki ? '締め技・ダウン奪取ルート' : 'コンボレシピ'}</span>
                </div>
                <span className="text-[9px] sm:text-[10px] text-cyan-600 dark:text-cyan-400 font-normal">
                  （タップで直感コマンド展開）
                </span>
              </div>

              {/* 各コンボ行とその解説 */}
              <div className="space-y-2.5 sm:space-y-3">
                {block.combos.map((combo, cIdx) => (
                  <div key={cIdx} className="space-y-1">
                    {/* コンボ行本体 */}
                    <InteractiveComboRow
                      comboLine={combo.recipe}
                      renderInlineText={renderInline}
                      controlType={controlType}
                    />

                    {/* そのコンボに紐付く解説箇条書き */}
                    {combo.notes.length > 0 && (
                      <div className="mt-1 ml-1 sm:ml-2.5 pl-2.5 sm:pl-3.5 border-l-2 border-cyan-500/50 dark:border-cyan-400/40 py-1 space-y-1 bg-neutral-100/50 dark:bg-neutral-850/40 rounded-r-lg">
                        <div className="text-[10px] sm:text-[11px] font-bold text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5 select-none pt-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0" />
                          <span>{isOki ? '起き攻め解説・消費フレーム' : 'コンボ解説・使い所'}</span>
                        </div>
                        <ul className="space-y-1 pr-1.5">
                          {combo.notes.map((note, nIdx) => (
                            <li
                              key={nIdx}
                              className="flex items-start gap-1.5 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed"
                            >
                              <span className="text-cyan-600 dark:text-cyan-400 font-bold text-xs mt-0.5 shrink-0 select-none">
                                ▶
                              </span>
                              <div className="flex-1 min-w-0 break-words [overflow-wrap:anywhere]">
                                {renderInline(note)}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        }

        // 1.8 中見出し・技名（●, ■ 等で〆が付いていないもの）
        if (block.type === 'subheading' && block.lines) {
          return (
            <div key={bIdx} className="pt-2 pb-1">
              {block.lines.map((line, lIdx) => {
                const cleanText = line.trim().replace(/^[●■・\-\*]\s*/, '');
                // ②の立ち回りで振る技セクションかつ通常技・特殊技のみフレームデータを取得（必殺技や他セクションは除外）
                const frameData = isNeutralMovesSection ? findNeutralMoveKeyFrame(cleanText) : null;

                return (
                  <div key={lIdx} className="my-1.5 sm:my-2">
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      <h4 className="text-xs sm:text-[15px] font-bold text-neutral-900 dark:text-white bg-neutral-100/90 dark:bg-neutral-800/80 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg border border-neutral-200/90 dark:border-neutral-700/80 inline-block max-w-full whitespace-normal break-words">
                        {renderInline(cleanText)}
                      </h4>

                      {/* アコーディオン展開せず、重要な部分だけをインラインバッジで常時表示 */}
                      {frameData && (
                        <div className="flex flex-wrap items-center gap-1.5">
                          {frameData.items.map((item, iIdx) => {
                            let badgeClass =
                              'px-2 py-0.5 rounded text-[11px] font-bold border flex items-center gap-1 shadow-2xs ';
                            if (item.variant === 'positive') {
                              badgeClass +=
                                'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
                            } else if (item.variant === 'negative') {
                              badgeClass +=
                                'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800';
                            } else if (item.variant === 'accent') {
                              badgeClass +=
                                'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800';
                            } else {
                              badgeClass +=
                                'bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border-neutral-200/90 dark:border-neutral-700';
                            }

                            return (
                              <span key={iIdx} className={badgeClass}>
                                <span className="opacity-70 font-normal text-[10px]">{item.label}</span>
                                <span>{item.value}</span>
                              </span>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        }

        // 2. 箇条書き・選択肢リスト（コンボに紐付かない独立した箇条書き）
        if (block.type === 'bullet' && block.lines) {
          return (
            <ul key={bIdx} className="my-1.5 sm:my-2 space-y-1 sm:space-y-1.5 pl-0 sm:pl-1">
              {block.lines.map((line, lIdx) => {
                const trimmed = line.trim();
                const isAction = trimmed.startsWith('▶︎') || trimmed.startsWith('▶');
                const itemText = trimmed.replace(/^[・\-\*▶︎▶]\s*/, '');
                return (
                  <li
                    key={lIdx}
                    className="flex items-start gap-2 sm:gap-2.5 text-neutral-800 dark:text-neutral-200 text-xs sm:text-sm leading-relaxed"
                  >
                    {isAction ? (
                      <span className="text-cyan-600 dark:text-cyan-400 font-bold text-xs mt-0.5 shrink-0 select-none">
                        ▶
                      </span>
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 dark:bg-neutral-100 mt-2 shrink-0" />
                    )}
                    <div className="flex-1 min-w-0 break-words [overflow-wrap:anywhere]">
                      {renderInline(itemText)}
                    </div>
                  </li>
                );
              })}
            </ul>
          );
        }

        // 3. 番号付きリスト
        if (block.type === 'numbered' && block.lines) {
          return (
            <ol key={bIdx} className="my-2 sm:my-3 space-y-1.5 sm:space-y-2 pl-0 sm:pl-1">
              {block.lines.map((line, lIdx) => {
                const trimmed = line.trim();
                const match = trimmed.match(/^(\d+)[\.|\)|）]\s*(.*)$/);
                const num = match ? match[1] : `${lIdx + 1}`;
                const itemText = match ? match[2] : trimmed;
                return (
                  <li
                    key={lIdx}
                    className="flex items-start gap-2 sm:gap-2.5 text-neutral-800 dark:text-neutral-200 text-sm sm:text-[15px] leading-relaxed"
                  >
                    <span className="font-bold text-neutral-900 dark:text-white font-mono text-sm shrink-0 mt-0.5">
                      {num}.
                    </span>
                    <div className="flex-1 min-w-0 break-words [overflow-wrap:anywhere]">
                      {renderInline(itemText)}
                    </div>
                  </li>
                );
              })}
            </ol>
          );
        }

        // 4. 矢印行（結論・効果）
        if (block.type === 'arrow' && block.lines) {
          return (
            <div key={bIdx} className="my-2 space-y-1.5 pl-2">
              {block.lines.map((line, lIdx) => {
                const itemText = line.trim().replace(/^(=>|→)\s*/, '');
                return (
                  <div
                    key={lIdx}
                    className="flex items-center gap-2 text-sm sm:text-[15px] text-neutral-900 dark:text-white font-medium"
                  >
                    <span className="text-cyan-600 dark:text-cyan-400 shrink-0 font-bold">➔</span>
                    <span>{renderInline(itemText)}</span>
                  </div>
                );
              })}
            </div>
          );
        }

        // 5. 通常テキスト段落
        return (
          <p key={bIdx} className="leading-relaxed sm:leading-loose">
            {block.lines?.map((line, lIdx) => (
              <React.Fragment key={lIdx}>
                {lIdx > 0 && <br />}
                {renderInline(line)}
              </React.Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}