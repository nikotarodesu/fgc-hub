'use client';

import React from 'react';
import { findNeutralMoveKeyFrame } from '@/data/sf6/ryuFrameData';
import InteractiveComboRow from './InteractiveComboRow';
import { Star, Zap, Film, Eye, ChevronDown, ChevronUp, Play, Pause } from 'lucide-react';
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

// インライン装飾のパース（大事なところをくっきりとした太線アンダーラインで強調）
function renderInline(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const inner = part.slice(2, -2);
      return (
        <span
          key={i}
          className="font-bold text-neutral-900 dark:text-neutral-100 underline decoration-2 sm:decoration-[3px] decoration-rose-500 dark:decoration-amber-400 underline-offset-[5px] inline"
        >
          {inner}
        </span>
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
    if (!trimmed) {
      if (currentBlock) {
        blocks.push(currentBlock);
        currentBlock = null;
      }
      continue;
    }

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

interface InteractiveMediaProps {
  src: string;
  caption?: string;
}

function InteractiveMedia({ src, caption }: InteractiveMediaProps) {
  const isGif = src.toLowerCase().endsWith('.gif');
  const isMp4 = src.toLowerCase().endsWith('.mp4');
  const isVideo = isGif || isMp4;

  // .gif の場合は同名の最適化済み .mp4 を優先ロード（通信量約85%カット）
  const videoSrc = isGif ? src.replace(/\.gif$/i, '.mp4') : src;
  const posterSrc = isGif ? src.replace(/\.gif$/i, '.jpg') : (isMp4 ? src.replace(/\.mp4$/i, '.jpg') : undefined);

  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // 自動再生ポリシーなどの例外を吸収
        });
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const label = caption || (isVideo ? '実戦コンボ動画' : '参考画像');

  // 通常静止画像（.png, .jpg等）の場合
  if (!isVideo) {
    return (
      <figure className="my-4 rounded-xl border border-neutral-200/90 dark:border-neutral-800 bg-neutral-100/50 dark:bg-neutral-900/50 overflow-hidden shadow-2xs max-w-2xl">
        <img
          src={src}
          alt={label}
          loading="lazy"
          className="w-full h-auto object-cover max-h-[520px] mx-auto block"
        />
        {caption && (
          <figcaption className="p-2 sm:px-3 text-xs text-neutral-500 dark:text-neutral-400 bg-neutral-100/80 dark:bg-neutral-900/80 border-t border-neutral-200/60 dark:border-neutral-800 text-center font-medium">
            {caption}
          </figcaption>
        )}
      </figure>
    );
  }

  // 動画 / GIF の場合（折りたたみ表示を廃止し、常時インライン表示 ＆ タップで再生/停止）
  return (
    <figure className="my-3 sm:my-4 rounded-xl sm:rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-neutral-950 overflow-hidden shadow-sm max-w-2xl transition-all">
      {/* 動画プレイヤー本体（タップで再生・再度タップで一時停止） */}
      <div
        onClick={togglePlay}
        className="relative w-full aspect-[16/9] bg-neutral-950 cursor-pointer select-none group overflow-hidden"
        role="button"
        tabIndex={0}
        aria-label={isPlaying ? '動画を一時停止' : '動画を再生'}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            togglePlay();
          }
        }}
      >
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterSrc}
          loop
          muted
          playsInline
          preload="metadata"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className="w-full h-full object-contain mx-auto block"
        />

        {/* 停止中のオーバーレイ（タップで再生案内） */}
        {!isPlaying && (
          <div className="absolute inset-0 bg-black/45 backdrop-blur-[1px] flex flex-col items-center justify-center gap-2 transition-all">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-cyan-600/95 text-white flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-cyan-500 transition-all border border-white/30">
              <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-current ml-0.5" />
            </div>
            <span className="text-xs sm:text-sm font-bold text-white tracking-wide bg-black/70 px-3 py-1 rounded-full border border-white/20 shadow-xs">
              タップで再生
            </span>
          </div>
        )}

        {/* 再生中のステータスバッジ（タップで停止できることを右下に明示） */}
        {isPlaying && (
          <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-white border border-white/20 text-[11px] font-bold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>再生中（タップで停止）</span>
            <Pause className="w-3 h-3 ml-0.5 fill-current" />
          </div>
        )}

        {/* 左上バッジ */}
        <div className="absolute top-2.5 left-2.5 pointer-events-none">
          <span className="text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-white border border-white/20 shadow-xs flex items-center gap-1">
            <Film className="w-3 h-3 text-cyan-400" />
            <span>実戦映像</span>
          </span>
        </div>
      </div>

      {/* キャプションフッター */}
      <figcaption className="px-3 py-2 sm:px-4 sm:py-2.5 bg-neutral-900 text-white text-xs flex items-center justify-between gap-2 border-t border-neutral-800/80">
        <span className="font-bold text-neutral-200 truncate text-[11px] sm:text-xs">{label}</span>
        <button
          type="button"
          onClick={togglePlay}
          className="text-[11px] font-bold text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 shrink-0 cursor-pointer px-2 py-0.5 rounded hover:bg-white/10"
        >
          {isPlaying ? (
            <>
              <Pause className="w-3 h-3 fill-current" />
              <span>停止</span>
            </>
          ) : (
            <>
              <Play className="w-3 h-3 fill-current" />
              <span>再生</span>
            </>
          )}
        </button>
      </figcaption>
    </figure>
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
            return <InteractiveMedia key={lIdx} src={src} caption={caption} />;
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
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-yellow-500/10 dark:bg-yellow-400/10 text-neutral-900 dark:text-white font-bold text-sm sm:text-base tracking-tight scroll-mt-24"
              >
                <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-yellow-400/25 dark:bg-yellow-400/20 text-yellow-600 dark:text-yellow-400 text-xs font-bold shrink-0 select-none">
                  <Star className="w-3.5 h-3.5 fill-current" />
                </span>
                <h4 className="font-bold text-sm sm:text-[15px] text-yellow-950 dark:text-yellow-100 tracking-tight">
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
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-orange-500/10 dark:bg-orange-400/10 text-neutral-900 dark:text-white font-bold text-sm sm:text-base tracking-tight scroll-mt-24"
              >
                <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-orange-500/20 dark:bg-orange-400/20 text-orange-600 dark:text-orange-400 text-xs font-bold shrink-0 select-none">
                  <Zap className="w-3.5 h-3.5 fill-current" />
                </span>
                <h4 className="font-bold text-sm sm:text-[15px] text-orange-950 dark:text-orange-100 tracking-tight">
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