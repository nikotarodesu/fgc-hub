'use client';

import React from 'react';
import { findNeutralMoveKeyFrame } from '@/data/sf6/ryuFrameData';

interface RichContentProps {
  content: string;
  isNeutralMovesSection?: boolean;
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

type LineType = 'empty' | 'quote' | 'heading' | 'frame' | 'combo' | 'subheading' | 'bullet' | 'numbered' | 'arrow' | 'text';

function getLineType(line: string): LineType {
  const trimmed = line.trim();
  if (!trimmed) return 'empty';
  if (trimmed.startsWith('>')) return 'quote';
  if (trimmed.startsWith('⚡️') || trimmed.startsWith('⭐️') || /^[①-⑳❶-❿]/.test(trimmed)) return 'heading';
  if (trimmed.startsWith('【') && trimmed.includes('】')) return 'frame';
  if ((trimmed.startsWith('●') || trimmed.startsWith('・') || trimmed.startsWith('-')) && trimmed.includes('〆')) return 'combo';
  if (trimmed.startsWith('●') || trimmed.startsWith('■')) return 'subheading';
  if (trimmed.startsWith('・') || trimmed.startsWith('- ') || trimmed.startsWith('* ') || trimmed.startsWith('▶︎') || trimmed.startsWith('▶')) return 'bullet';
  if (/^\d+[\.|\)|）]\s*/.test(trimmed)) return 'numbered';
  if (trimmed.startsWith('→') || trimmed.startsWith('=>')) return 'arrow';
  return 'text';
}

interface BlockGroup {
  type: LineType;
  lines: string[];
}

export default function RichContent({ content, isNeutralMovesSection = false }: RichContentProps) {
  if (!content) return null;

  const rawLines = content.split('\n');
  const groups: BlockGroup[] = [];
  let currentGroup: BlockGroup | null = null;

  for (const rawLine of rawLines) {
    const lineType = getLineType(rawLine);

    if (lineType === 'empty') {
      if (currentGroup) {
        groups.push(currentGroup);
        currentGroup = null;
      }
      continue;
    }

    if (!currentGroup || currentGroup.type !== lineType) {
      if (currentGroup) {
        groups.push(currentGroup);
      }
      currentGroup = { type: lineType, lines: [rawLine] };
    } else {
      currentGroup.lines.push(rawLine);
    }
  }

  if (currentGroup) {
    groups.push(currentGroup);
  }

  return (
    <div className="space-y-4 text-neutral-700 dark:text-neutral-300 leading-relaxed sm:leading-loose text-[15px] sm:text-base">
      {groups.map((group, gIdx) => {
        // 1. 引用・コールアウト
        if (group.type === 'quote') {
          const quoteText = group.lines
            .map((l) => l.trim().replace(/^>\s*/, ''))
            .join('\n');
          return (
            <div
              key={gIdx}
              className="my-4 pl-4 py-1.5 border-l-2 border-neutral-800 dark:border-neutral-200 text-neutral-800 dark:text-neutral-200 font-medium text-sm sm:text-[15px]"
            >
              {renderInline(quoteText)}
            </div>
          );
        }

        // 1.5 大見出し・カテゴリ（⚡️, ⭐️, ①, ❶ 等）
        if (group.type === 'heading') {
          return (
            <div key={gIdx} className="pt-4 pb-1 border-t border-neutral-100 dark:border-neutral-800 first:border-t-0 first:pt-0">
              {group.lines.map((line, lIdx) => (
                <h3 key={lIdx} className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2 py-1">
                  {renderInline(line)}
                </h3>
              ))}
            </div>
          );
        }

        // 1.6 起き攻めフレーム状況ヘッダー（【+37】など）
        if (group.type === 'frame') {
          return (
            <div key={gIdx} className="pt-4 pb-0.5">
              {group.lines.map((line, lIdx) => {
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

        // 1.7 締め技・コンボルート（〆が付いている行）
        if (group.type === 'combo') {
          return (
            <div key={gIdx} className="my-2.5 space-y-1.5 pl-0.5">
              <div className="text-[11px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-600 dark:bg-cyan-400" />
                <span>締め技・コンボルート</span>
              </div>
              <div className="space-y-1.5">
                {group.lines.map((line, lIdx) => {
                  const cleanText = line.trim().replace(/^[●・\-]\s*/, '');
                  return (
                    <div
                      key={lIdx}
                      className="flex items-center gap-2.5 py-1.5 px-3 bg-neutral-50/90 dark:bg-neutral-800/80 hover:bg-neutral-100/90 dark:hover:bg-neutral-800 border border-neutral-200/90 dark:border-neutral-700/80 rounded-md text-xs sm:text-sm font-mono text-neutral-900 dark:text-neutral-100 transition-colors"
                    >
                      <span className="shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded bg-cyan-600 text-white font-sans tracking-wide">
                        コンボ
                      </span>
                      <span className="font-semibold flex-1 overflow-x-auto">
                        {renderInline(cleanText)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        }

        // 1.8 中見出し・技名（●, ■ 等で〆が付いていないもの）
        if (group.type === 'subheading') {
          return (
            <div key={gIdx} className="pt-2 pb-1">
              {group.lines.map((line, lIdx) => {
                const cleanText = line.trim().replace(/^[●■・\-\*]\s*/, '');
                // ②の立ち回りで振る技セクションかつ通常技・特殊技のみフレームデータを取得（必殺技や他セクションは除外）
                const frameData = isNeutralMovesSection ? findNeutralMoveKeyFrame(cleanText) : null;

                return (
                  <div key={lIdx} className="my-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-sm sm:text-[15px] font-bold text-neutral-900 dark:text-white bg-neutral-100/90 dark:bg-neutral-800/80 px-3 py-1.5 rounded-lg border border-neutral-200/90 dark:border-neutral-700/80 inline-block">
                        {renderInline(cleanText)}
                      </h4>

                      {/* アコーディオン展開せず、重要な部分だけをインラインバッジで常時表示 */}
                      {frameData && (
                        <div className="flex flex-wrap items-center gap-1.5">
                          {frameData.items.map((item, iIdx) => {
                            let badgeClass = 'px-2 py-0.5 rounded text-[11px] font-bold border flex items-center gap-1 shadow-2xs ';
                            if (item.variant === 'positive') {
                              badgeClass += 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
                            } else if (item.variant === 'negative') {
                              badgeClass += 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800';
                            } else if (item.variant === 'accent') {
                              badgeClass += 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800';
                            } else {
                              badgeClass += 'bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border-neutral-200/90 dark:border-neutral-700';
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

        // 2. 箇条書き・選択肢リスト
        if (group.type === 'bullet') {
          return (
            <ul key={gIdx} className="my-2 space-y-1.5 pl-1">
              {group.lines.map((line, lIdx) => {
                const trimmed = line.trim();
                const isAction = trimmed.startsWith('▶︎') || trimmed.startsWith('▶');
                const itemText = trimmed.replace(/^[・\-\*▶︎▶]\s*/, '');
                return (
                  <li
                    key={lIdx}
                    className="flex items-start gap-2.5 text-neutral-800 dark:text-neutral-200 text-xs sm:text-sm leading-relaxed"
                  >
                    {isAction ? (
                      <span className="text-cyan-600 dark:text-cyan-400 font-bold text-xs mt-0.5 shrink-0 select-none">
                        ▶
                      </span>
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 dark:bg-neutral-100 mt-2 shrink-0" />
                    )}
                    <div className="flex-1">
                      {renderInline(itemText)}
                    </div>
                  </li>
                );
              })}
            </ul>
          );
        }

        // 3. 番号付きリスト
        if (group.type === 'numbered') {
          return (
            <ol key={gIdx} className="my-3 space-y-2 pl-1">
              {group.lines.map((line, lIdx) => {
                const trimmed = line.trim();
                const match = trimmed.match(/^(\d+)[\.|\)|）]\s*(.*)$/);
                const num = match ? match[1] : `${lIdx + 1}`;
                const itemText = match ? match[2] : trimmed;
                return (
                  <li
                    key={lIdx}
                    className="flex items-start gap-2.5 text-neutral-800 dark:text-neutral-200 text-sm sm:text-[15px] leading-relaxed"
                  >
                    <span className="font-bold text-neutral-900 dark:text-white font-mono text-sm shrink-0 mt-0.5">
                      {num}.
                    </span>
                    <div className="flex-1">
                      {renderInline(itemText)}
                    </div>
                  </li>
                );
              })}
            </ol>
          );
        }

        // 4. 矢印行（結論・効果）
        if (group.type === 'arrow') {
          return (
            <div key={gIdx} className="my-2 space-y-1.5 pl-2">
              {group.lines.map((line, lIdx) => {
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
          <p key={gIdx} className="leading-relaxed sm:leading-loose">
            {group.lines.map((line, lIdx) => (
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