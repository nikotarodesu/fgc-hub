'use client';

import React from 'react';
import { findNeutralMoveKeyFrame } from '@/data/sf6/ryuFrameData';
import InteractiveComboRow from './InteractiveComboRow';
import { Star, Zap, Film, Eye, ChevronDown, ChevronUp } from 'lucide-react';
import { CharacterSecretUnlockConfig } from '@/data/articles/secretUnlockConfig';

interface RichContentProps {
  content: string;
  sectionId?: string;
  sectionTitle?: string;
  isNeutralMovesSection?: boolean;
  controlType?: 'classic' | 'modern';
  activeSubheading?: string | null;
  secretConfig?: CharacterSecretUnlockConfig;
  onSecretUnlock?: () => void;
}

// 小見出し（❶ 弱技始動 等）のクイックチップ用短縮名
export function getShortSubheadingLabel(numChar: string, titleText: string): string {
  const label = titleText
    .replace(/始動$/, '')
    .replace(/(?:技)?ガード後$/, '後')
    .replace(/パニカン$/, '')
    .replace(/入れ替え$/, '入替');
  return numChar ? `${numChar} ${label}` : label;
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
  | 'image'
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
  if (trimmed.startsWith('![') && trimmed.includes('](') && trimmed.endsWith(')')) return 'image';
  if (trimmed.startsWith('>')) return 'quote';
  if (/^[①-⑳❶-❿➊-➓⓫-⓴]/.test(trimmed)) return 'numbered_heading';
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

interface ParsedBlock {
  type: Exclude<LineType, 'empty'>;
  lines: string[];
}

function parseContentToBlocks(content: string): ParsedBlock[] {
  const rawLines = content.split('\n');
  const blocks: ParsedBlock[] = [];
  let currentBlock: ParsedBlock | null = null;

  for (const rawLine of rawLines) {
    const trimmed = rawLine.trim();
    if (!trimmed) continue;

    const lineType = getLineType(trimmed);

    if (!currentBlock || currentBlock.type !== lineType) {
      if (currentBlock) blocks.push(currentBlock);
      currentBlock = { type: lineType as Exclude<LineType, 'empty'>, lines: [trimmed] };
    } else {
      currentBlock.lines.push(trimmed);
    }
  }

  if (currentBlock) {
    blocks.push(currentBlock);
  }

  return blocks;
}

interface StickyGroup {
  type: 'sticky_group';
  headerBlock: ParsedBlock;
  blocks: ParsedBlock[];
}

interface SingleBlockGroup {
  type: 'single';
  block: ParsedBlock;
}

type DisplayGroup = StickyGroup | SingleBlockGroup;

function groupBlocksForSticky(blocks: ParsedBlock[]): DisplayGroup[] {
  const result: DisplayGroup[] = [];
  let currentSticky: StickyGroup | null = null;

  for (const block of blocks) {
    if (block.type === 'star_heading' || block.type === 'lightning_heading') {
      if (currentSticky) {
        result.push(currentSticky);
      }
      currentSticky = {
        type: 'sticky_group',
        headerBlock: block,
        blocks: [],
      };
    } else if (block.type === 'numbered_heading') {
      if (currentSticky) {
        result.push(currentSticky);
        currentSticky = null;
      }
      result.push({
        type: 'single',
        block,
      });
    } else {
      if (currentSticky) {
        currentSticky.blocks.push(block);
      } else {
        result.push({
          type: 'single',
          block,
        });
      }
    }
  }

  if (currentSticky) {
    result.push(currentSticky);
  }

  return result;
}

interface SecretSubheadingButtonProps {
  cleanText: string;
  secretConfig: CharacterSecretUnlockConfig;
  onSecretUnlock?: () => void;
  renderInline: (text: string) => React.ReactNode[];
}

function SecretSubheadingButton({
  cleanText,
  secretConfig,
  onSecretUnlock,
  renderInline,
}: SecretSubheadingButtonProps) {
  const tapCountRef = React.useRef(0);
  const resetTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleTap = () => {
    if (!resetTimerRef.current) {
      resetTimerRef.current = setTimeout(() => {
        tapCountRef.current = 0;
        resetTimerRef.current = null;
      }, secretConfig.timeWindowMs);
    }

    tapCountRef.current += 1;

    if (tapCountRef.current >= secretConfig.requiredTaps) {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
        resetTimerRef.current = null;
      }
      tapCountRef.current = 0;
      if (onSecretUnlock) {
        onSecretUnlock();
      }
    }
  };

  return (
    <button
      type="button"
      onClick={handleTap}
      className="text-xs sm:text-[15px] font-bold text-neutral-900 dark:text-white bg-neutral-100/90 dark:bg-neutral-800/80 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg border border-neutral-200/90 dark:border-neutral-700/80 inline-block max-w-full whitespace-normal break-words cursor-pointer select-none active:scale-95 transition-transform touch-manipulation text-left"
    >
      {renderInline(cleanText)}
    </button>
  );
}

interface CollapsibleMediaProps {
  src: string;
  caption?: string;
}

function CollapsibleMedia({ src, caption }: CollapsibleMediaProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const isGif = src.toLowerCase().endsWith('.gif');
  const label = caption || (isGif ? '実戦GIF動画' : '参考画像');

  return (
    <div className="my-3 rounded-xl border border-neutral-200/90 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-900/80 overflow-hidden shadow-2xs max-w-2xl transition-all">
      {/* 開閉トグルヘッダー */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-2.5 p-2.5 sm:py-2.5 sm:px-3.5 text-left hover:bg-neutral-100/90 dark:hover:bg-neutral-800/90 transition-colors cursor-pointer select-none"
        title={isOpen ? 'アニメーションを収納する' : 'タップしてアニメーションを表示'}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="w-7 h-7 rounded-lg bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
            {isGif ? <Film className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </span>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white truncate">
                {label}
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300">
                {isGif ? 'GIF動画' : '画像'}
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] text-neutral-500 dark:text-neutral-400 block mt-0.5">
              {isOpen ? '▲ タップして収納（テキストを読みやすくする）' : '▼ タップして実戦映像を再生'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-semibold text-cyan-700 dark:text-cyan-300 shrink-0 shadow-2xs">
          <span>{isOpen ? '収納する' : '映像を見る'}</span>
          {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </div>
      </button>

      {/* 展開されたGIF / 画像 */}
      {isOpen && (
        <div className="border-t border-neutral-200/80 dark:border-neutral-800 bg-neutral-950 animate-in fade-in duration-200">
          <img
            src={src}
            alt={caption || '攻略アニメーション'}
            className="w-full h-auto object-cover max-h-[520px] mx-auto block"
            loading="lazy"
          />
          <div className="p-2 sm:p-2.5 bg-neutral-900 text-neutral-300 text-xs flex items-center justify-between gap-2 border-t border-neutral-800">
            <span className="text-[11px] opacity-80 truncate">{label}</span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-[11px] text-neutral-400 hover:text-white transition-colors cursor-pointer shrink-0 font-medium"
            >
              ▲ 収納する
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function RichContent({
  content,
  sectionId,
  sectionTitle,
  isNeutralMovesSection = false,
  controlType = 'classic',
  activeSubheading,
  secretConfig,
  onSecretUnlock,
}: RichContentProps) {
  if (!content) return null;

  const blocks = parseContentToBlocks(content);
  const displayGroups = groupBlocksForSticky(blocks);

  const renderBlock = (block: ParsedBlock, blockKey: string | number) => {
    // 0.5 インライン画像・GIF（![キャプション](URL)）
    if (block.type === 'image') {
      return (
        <div key={blockKey} className="my-2 sm:my-3 space-y-2">
          {block.lines.map((line, lIdx) => {
            const match = line.trim().match(/^!\[(.*?)\]\((.*?)\)$/);
            if (!match) return null;
            const caption = match[1];
            const src = match[2];
            return <CollapsibleMedia key={lIdx} src={src} caption={caption} />;
          })}
        </div>
      );
    }

    // 1. 引用・コールアウト
    if (block.type === 'quote' && block.lines) {
      const quoteText = block.lines
        .map((l) => l.trim().replace(/^>\s*/, ''))
        .join('\n');
      return (
        <div
          key={blockKey}
          className="my-3 pl-3.5 py-1.5 border-l-2.5 border-neutral-800 dark:border-neutral-200 text-neutral-800 dark:text-neutral-200 font-medium text-sm sm:text-[15px]"
        >
          {renderInline(quoteText)}
        </div>
      );
    }

    // 1.4 数字見出し（❶ 中技始動, ❷ 弱技始動, ① 等）
    if (block.type === 'numbered_heading') {
      return (
        <div
          key={blockKey}
          className="pt-5 pb-1 mt-4 first:mt-0 first:pt-0 border-b border-neutral-200 dark:border-neutral-800"
        >
          {block.lines.map((line, lIdx) => {
            const match = line.trim().match(/^([①-⑳❶-❿➊-➓⓫-⓴])\s*(.*)$/);
            const numChar = match ? match[1] : '';
            const titleText = match ? match[2] : line.trim();
            const fullName = `${numChar} ${titleText}`.trim();
            const subId = sectionId ? `${sectionId}-sub-${numChar}` : undefined;

            return (
              <div
                key={lIdx}
                id={subId}
                data-subheading={fullName}
                className="flex items-center gap-2.5 pb-2 scroll-mt-20 sm:scroll-mt-24"
              >
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
        <div key={blockKey} className="space-y-1.5">
          {block.lines.map((line, lIdx) => {
            const cleanText = line.trim().replace(/^[⭐️⭐]\s*/, '');
            const itemId = `${sectionId}-star-${blockKey}-${lIdx}`;
            return (
              <div
                key={lIdx}
                id={itemId}
                data-item-heading={`⭐️ ${cleanText}`}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-sky-200/90 dark:border-sky-800/80 bg-sky-50/90 dark:bg-sky-950/60 text-neutral-900 dark:text-white font-bold text-sm sm:text-base tracking-tight shadow-2xs scroll-mt-24"
              >
                <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-sky-500/20 dark:bg-sky-400/25 text-sky-600 dark:text-sky-300 text-xs font-bold shrink-0 select-none">
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
        <div key={blockKey} className="space-y-1.5">
          {block.lines.map((line, lIdx) => {
            const cleanText = line.trim().replace(/^[⚡️⚡]\s*/, '');
            const itemId = `${sectionId}-zap-${blockKey}-${lIdx}`;
            return (
              <div
                key={lIdx}
                id={itemId}
                data-item-heading={`⚡️ ${cleanText}`}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-amber-200/90 dark:border-amber-800/80 bg-amber-50/90 dark:bg-amber-950/60 text-neutral-900 dark:text-white font-bold text-sm sm:text-base tracking-tight shadow-2xs scroll-mt-24"
              >
                <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-amber-500/20 dark:bg-amber-400/25 text-amber-600 dark:text-amber-300 text-xs font-bold shrink-0 select-none">
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
        <div key={blockKey} className="pt-4 pb-0.5">
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

    // 1.7 コンボ行（〆が付いている行）
    if (block.type === 'combo') {
      return (
        <div key={blockKey} className="my-2 sm:my-2.5 space-y-1 sm:space-y-1.5 pl-0">
          {block.lines.map((line, lIdx) => (
            <InteractiveComboRow
              key={lIdx}
              comboLine={line}
              renderInlineText={renderInline}
              controlType={controlType}
            />
          ))}
        </div>
      );
    }

    // 1.8 中見出し・技名（●, ■ 等で〆が付いていないもの）
    if (block.type === 'subheading' && block.lines) {
      return (
        <div key={blockKey} className="pt-2 pb-1">
          {block.lines.map((line, lIdx) => {
            const cleanText = line.trim().replace(/^[●■・\-\*]\s*/, '');
            // ②の立ち回りで振る技セクションかつ通常技・特殊技のみフレームデータを取得（必殺技や他セクションは除外）
            const frameData = isNeutralMovesSection ? findNeutralMoveKeyFrame(cleanText) : null;

            const isSecretTarget = Boolean(
              secretConfig &&
              onSecretUnlock &&
              sectionTitle &&
              secretConfig.sectionMatcher(sectionTitle) &&
              secretConfig.keywordMatcher(cleanText)
            );

            return (
              <div key={lIdx} className="my-1.5 sm:my-2">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  {isSecretTarget ? (
                    <SecretSubheadingButton
                      cleanText={cleanText}
                      secretConfig={secretConfig!}
                      onSecretUnlock={onSecretUnlock}
                      renderInline={renderInline}
                    />
                  ) : (
                    <h4 className="text-xs sm:text-[15px] font-bold text-neutral-900 dark:text-white bg-neutral-100/90 dark:bg-neutral-800/80 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg border border-neutral-200/90 dark:border-neutral-700/80 inline-block max-w-full whitespace-normal break-words">
                      {renderInline(cleanText)}
                    </h4>
                  )}

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
        <ul key={blockKey} className="my-1.5 sm:my-2 space-y-1 sm:space-y-1.5 pl-0 sm:pl-1">
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
        <ol key={blockKey} className="my-2 sm:my-3 space-y-1.5 sm:space-y-2 pl-0 sm:pl-1">
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
        <div key={blockKey} className="my-2 space-y-1.5 pl-2">
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
      <p key={blockKey} className="leading-relaxed sm:leading-loose">
        {block.lines?.map((line, lIdx) => (
          <React.Fragment key={lIdx}>
            {lIdx > 0 && <br />}
            {renderInline(line)}
          </React.Fragment>
        ))}
      </p>
    );
  };

  return (
    <div className="space-y-4 text-neutral-700 dark:text-neutral-300 leading-relaxed sm:leading-loose text-[15px] sm:text-base">
      {displayGroups.map((group, gIdx) => {
        if (group.type === 'sticky_group') {
          return (
            <section key={`sticky-group-${gIdx}`} className="relative my-3 sm:my-4 first:mt-0">
              {/* 画面上端にピタッとくっつく吸着ヘッダー */}
              <div className="sticky top-0 z-20 py-2 -mx-2 sm:-mx-3 px-2 sm:px-3 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-b border-neutral-200/60 dark:border-neutral-800/80 shadow-2xs">
                {renderBlock(group.headerBlock, `sticky-header-${gIdx}`)}
              </div>

              {/* グループ配下のコンテンツ（コンボ行、解説、GIF等） */}
              <div className="space-y-3.5 pt-2">
                {group.blocks.map((b, bIdx) => renderBlock(b, `sticky-body-${gIdx}-${bIdx}`))}
              </div>
            </section>
          );
        }

        return renderBlock(group.block, `single-${gIdx}`);
      })}
    </div>
  );
}