'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Camera } from 'lucide-react';
import StrategyDiagram from './StrategyDiagram';
import { generateHeadingId } from './tocUtils';
import { useAuth } from '@/contexts/AuthContext';

interface StrategyMarkdownRendererProps {
  content: string;
  articleNumber: number;
}

// 25記事のタイトルと対応slugの対応マップ（本文内言及を自動リンク化するため）
const TECHNIQUE_LINKS: Record<string, string> = {
  '置き・差し・差し返し': '/sf6/strategy/oki-sashi-sashikaeshi',
  '歩きガードから差す': '/sf6/strategy/aruki-guard-kara-sasu',
  '差し返しの作り方': '/sf6/strategy/sashikaeshi-no-tsukurikata',
  '差し返し技の選び方': '/sf6/strategy/sashikaeshi-waza-no-erabikata',
  '技相性の見方': '/sf6/strategy/waza-aiso-no-mikata',
  '置きの使い分け': '/sf6/strategy/oki-no-tsukaiwake',
  '相手の反応を引き出す': '/sf6/strategy/aite-no-hanno-wo-hikidasu',
  '飛びの通し方': '/sf6/strategy/tobi-no-toshikata',
  '打ち返しの判断と対策': '/sf6/strategy/uchikaeshi-no-handan-to-taisaku',
  '先端連係の攻防': '/sf6/strategy/sentan-renkei-no-kobo',
  '微有利の攻防': '/sf6/strategy/biyuri-no-kobo',
  '遅らせ投げの使い方': '/sf6/strategy/okurase-nage-no-tsukaikata',
  '生ラッシュの通し方': '/sf6/strategy/nama-rush-no-toshikata',
  'ラッシュ止め対策': '/sf6/strategy/rush-dome-taisaku',
  '状況確認と仕込み': '/sf6/strategy/jokyo-kakunin-to-shikomi',
  '防御のリスク管理': '/sf6/strategy/bogyo-no-risk-kanri',
  '密着微不利の守り方': '/sf6/strategy/micchaku-bifuri-no-mamorikata',
  'キャンセル確認の防御': '/sf6/strategy/cancel-kakunin-no-bogyo',
  'ジャストパリィの狙い方': '/sf6/strategy/just-parry-no-nerai-kata',
  'ジャストパリィとラッシュ仕込み': '/sf6/strategy/just-parry-to-rush-shikomi',
  'ゲージを投資して回収する': '/sf6/strategy/gauge-wo-toushi-shite-kaishu-suru',
  '相手のリソースで読み合いを変える': '/sf6/strategy/aite-no-resource-de-yomiai-wo-kaeru',
  'バーンアウト攻めの組み立て方': '/sf6/strategy/burnout-zeme-no-kumikatekata',
  '弾で相手を動かす': '/sf6/strategy/tama-de-aite-wo-ugokasu',
  '判断を減らす練習': '/sf6/strategy/handan-wo-herasu-renshu',
};

// インライン文字装飾（太字、内部/外部リンク、コード、改行タグ）
function renderInlineText(text: string): React.ReactNode[] {
  // **bold** | [link](url) | `code` | <br> / <br/> / <br />
  const parts = text.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\)|`.*?`|<br\s*\/?>)/gi);

  return parts.map((part, idx) => {
    if (/^<br\s*\/?>$/i.test(part)) {
      return <br key={idx} />;
    }
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={idx} className="font-bold text-neutral-900 dark:text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={idx}
          className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-mono text-xs sm:text-sm border border-neutral-200 dark:border-neutral-700"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
      const closeBracket = part.indexOf('](');
      const label = part.slice(1, closeBracket);
      const href = part.slice(closeBracket + 2, -1);
      const isInternal = href.startsWith('/') || href.startsWith('#');

      if (isInternal) {
        return (
          <Link
            key={idx}
            href={href}
            className="text-cyan-600 dark:text-cyan-400 font-bold hover:underline"
          >
            {label}
          </Link>
        );
      }
      return (
        <a
          key={idx}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-600 dark:text-cyan-400 font-bold hover:underline inline-flex items-center gap-0.5"
        >
          {label}
        </a>
      );
    }

    // 他記事タイトルへの自動内部リンク置換
    // リンク外のプレーンテキストから一致するタイトルを探す
    for (const [techTitle, techUrl] of Object.entries(TECHNIQUE_LINKS)) {
      if (part.includes(techTitle)) {
        const subParts = part.split(techTitle);
        return (
          <React.Fragment key={idx}>
            {subParts.map((sp, spIdx) => (
              <React.Fragment key={spIdx}>
                {spIdx > 0 && (
                  <Link
                    href={techUrl}
                    className="text-cyan-600 dark:text-cyan-400 font-bold hover:underline"
                  >
                    {techTitle}
                  </Link>
                )}
                {sp}
              </React.Fragment>
            ))}
          </React.Fragment>
        );
      }
    }

    return <span key={idx}>{part}</span>;
  });
}

type Block =
  | { type: 'h2'; text: string; id: string }
  | { type: 'h3'; text: string; id: string }
  | { type: 'h4'; text: string; id: string }
  | { type: 'table'; header: string[]; rows: string[][] }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'quote'; lines: string[] }
  | { type: 'diagram'; index: number; raw: string }
  | { type: 'admin-image'; note: string }
  | { type: 'p'; lines: string[] };

export type { TocItem } from './tocUtils';
export { extractTocFromMarkdown } from './tocUtils';

export default function StrategyMarkdownRenderer({
  content,
  articleNumber,
}: StrategyMarkdownRendererProps) {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const adminMode =
      typeof window !== 'undefined' && localStorage.getItem('fgc_admin_mode') === 'true';
    setIsAdmin(user?.role === 'admin' || adminMode);
  }, [user]);

  // 1. Antigravity実装メモは読者向け本文から除外（もし存在する場合）
  let cleanContent = content;
  const notesIdx = cleanContent.indexOf('## Antigravity実装メモ');
  if (notesIdx !== -1) {
    cleanContent = cleanContent.slice(0, notesIdx).trim();
  }

  // 2. ブロック単位へパース
  const lines = cleanContent.split('\n');
  const blocks: Block[] = [];
  let currentParagraph: string[] = [];
  let currentList: { type: 'ul' | 'ol'; items: string[] } | null = null;
  let currentQuote: string[] = [];
  let diagramCount = 0;
  const idCounts = new Map<string, number>();

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      blocks.push({ type: 'p', lines: [...currentParagraph] });
      currentParagraph = [];
    }
  };

  const flushList = () => {
    if (currentList && currentList.items.length > 0) {
      blocks.push(currentList);
      currentList = null;
    }
  };

  const flushQuote = () => {
    if (currentQuote.length > 0) {
      blocks.push({ type: 'quote', lines: [...currentQuote] });
      currentQuote = [];
    }
  };

  let inSvgComment = false;
  let svgCommentBuffer: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    // 管理者専用画像プレースホルダー（<!-- ADMIN-IMAGE: ... --> または <!-- IMAGE: ... -->）
    if (trimmed.startsWith('<!-- ADMIN-IMAGE:') || trimmed.startsWith('<!-- IMAGE:')) {
      flushParagraph();
      flushList();
      flushQuote();
      const note = trimmed
        .replace(/^<!--\s*(?:ADMIN-IMAGE|IMAGE):\s*/i, '')
        .replace(/\s*-->$/, '')
        .trim();
      blocks.push({
        type: 'admin-image',
        note,
      });
      continue;
    }

    // SVG仕様コメントブロックの検出
    if (trimmed.startsWith('<!-- SVG-') || (inSvgComment && !trimmed.endsWith('-->'))) {
      flushParagraph();
      flushList();
      flushQuote();
      inSvgComment = true;
      svgCommentBuffer.push(rawLine);
      if (trimmed.endsWith('-->')) {
        inSvgComment = false;
        diagramCount++;
        blocks.push({
          type: 'diagram',
          index: diagramCount,
          raw: svgCommentBuffer.join('\n'),
        });
        svgCommentBuffer = [];
      }
      continue;
    }
    if (inSvgComment && trimmed.endsWith('-->')) {
      inSvgComment = false;
      svgCommentBuffer.push(rawLine);
      diagramCount++;
      blocks.push({
        type: 'diagram',
        index: diagramCount,
        raw: svgCommentBuffer.join('\n'),
      });
      svgCommentBuffer = [];
      continue;
    }

    // 空行
    if (!trimmed) {
      flushParagraph();
      flushList();
      flushQuote();
      continue;
    }

    // 冒頭の # H1 タイトルはヘッダー側でレンダリングするためスキップ
    if (trimmed.startsWith('# ')) {
      continue;
    }

    // ## H2 見出し
    if (trimmed.startsWith('## ')) {
      flushParagraph();
      flushList();
      flushQuote();
      const rawText = trimmed.slice(3).trim();
      const { id, cleanText } = generateHeadingId(rawText, idCounts);
      blocks.push({ type: 'h2', text: cleanText, id });
      continue;
    }

    // ### H3 見出し
    if (trimmed.startsWith('### ')) {
      flushParagraph();
      flushList();
      flushQuote();
      const rawText = trimmed.slice(4).trim();
      const { id, cleanText } = generateHeadingId(rawText, idCounts);
      blocks.push({ type: 'h3', text: cleanText, id });
      continue;
    }

    // #### H4 見出し
    if (trimmed.startsWith('#### ')) {
      flushParagraph();
      flushList();
      flushQuote();
      const text = trimmed.slice(5).trim();
      const id = `heading-${blocks.length}`;
      blocks.push({ type: 'h4', text, id });
      continue;
    }

    // Markdown Table 検出
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      flushParagraph();
      flushList();
      flushQuote();

      // テーブル行をまとめて取得
      const tableLines: string[] = [trimmed];
      while (i + 1 < lines.length && lines[i + 1].trim().startsWith('|') && lines[i + 1].trim().endsWith('|')) {
        i++;
        tableLines.push(lines[i].trim());
      }

      // テーブルパース
      if (tableLines.length >= 2) {
        const headerCells = tableLines[0]
          .split('|')
          .slice(1, -1)
          .map((c) => c.trim());
        const dataRowLines = tableLines.slice(2); // 区切り行 ( |---|---| ) をスキップ
        const rows = dataRowLines.map((rowStr) =>
          rowStr
            .split('|')
            .slice(1, -1)
            .map((c) => c.trim())
        );
        blocks.push({
          type: 'table',
          header: headerCells,
          rows,
        });
      }
      continue;
    }

    // 引用
    if (trimmed.startsWith('> ')) {
      flushParagraph();
      flushList();
      currentQuote.push(trimmed.slice(2).trim());
      continue;
    }

    // 箇条書きリスト (- または *)
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      flushParagraph();
      flushQuote();
      const itemText = trimmed.slice(2).trim();
      if (!currentList || currentList.type !== 'ul') {
        flushList();
        currentList = { type: 'ul', items: [itemText] };
      } else {
        currentList.items.push(itemText);
      }
      continue;
    }

    // 番号付きリスト (1. 2. 等)
    const olMatch = trimmed.match(/^(\d+)\.\s+(.+)$/);
    if (olMatch) {
      flushParagraph();
      flushQuote();
      const itemText = olMatch[2].trim();
      if (!currentList || currentList.type !== 'ol') {
        flushList();
        currentList = { type: 'ol', items: [itemText] };
      } else {
        currentList.items.push(itemText);
      }
      continue;
    }

    // 通常テキスト行
    currentParagraph.push(trimmed);
  }

  flushParagraph();
  flushList();
  flushQuote();

  return (
    <div className="space-y-4 text-neutral-800 dark:text-neutral-200 leading-[1.85] sm:leading-[1.95] text-[16.5px] sm:text-[18px]">
      {blocks.map((block, idx) => {
        if (block.type === 'h2') {
          return (
            <div key={idx} id={block.id} className="pt-8 sm:pt-11 scroll-mt-24">
              <div className="flex items-center gap-2.5 sm:gap-3 px-3.5 py-2.5 sm:px-4 sm:py-3.5 rounded-xl sm:rounded-2xl bg-neutral-100/90 dark:bg-neutral-800/70 border border-neutral-200/90 dark:border-neutral-700/80 shadow-2xs">
                <span className="w-1.5 h-5 sm:h-6 rounded-full bg-cyan-600 dark:bg-cyan-400 shrink-0" />
                <h2 className="text-[19px] sm:text-[22px] font-black text-neutral-900 dark:text-white tracking-tight leading-snug">
                  {block.text}
                </h2>
              </div>
            </div>
          );
        }

        if (block.type === 'h3') {
          return (
            <div key={idx} id={block.id} className="pt-5 sm:pt-6 scroll-mt-24">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-emerald-500 shrink-0" />
                <h3 className="text-[17px] sm:text-[19px] font-bold text-neutral-900 dark:text-neutral-100 tracking-tight leading-snug">
                  {block.text}
                </h3>
              </div>
            </div>
          );
        }

        if (block.type === 'h4') {
          return (
            <h4
              key={idx}
              className="text-[15.5px] sm:text-[17px] font-bold text-neutral-800 dark:text-neutral-200 pt-2.5"
            >
              {block.text}
            </h4>
          );
        }

        if (block.type === 'table') {
          return (
            <div
              key={idx}
              className="my-6 rounded-xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-2xs overflow-hidden"
            >
              {/* スマホ用横スクロール案内 */}
              <div className="sm:hidden px-3 py-1.5 bg-neutral-50 dark:bg-neutral-800/60 border-b border-neutral-200 dark:border-neutral-800 text-[11px] text-neutral-500 dark:text-neutral-400 text-center font-medium">
                ← 左右にスクロールして全体を表示 →
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[500px]">
                  <thead>
                    <tr className="bg-neutral-100 dark:bg-neutral-800/90 border-b border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white">
                      {block.header.map((head, hIdx) => (
                        <th key={hIdx} className="py-2.5 px-3.5 font-bold tracking-wide">
                          {renderInlineText(head)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200/60 dark:divide-neutral-800">
                    {block.rows.map((row, rIdx) => (
                      <tr
                        key={rIdx}
                        className="hover:bg-neutral-50 dark:hover:bg-neutral-800/40 transition-colors"
                      >
                        {row.map((cell, cIdx) => (
                          <td
                            key={cIdx}
                            className="py-2.5 px-3.5 text-neutral-700 dark:text-neutral-300 font-normal leading-relaxed"
                          >
                            {renderInlineText(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        }

        if (block.type === 'ul') {
          return (
            <ul key={idx} className="my-3 space-y-2 pl-1">
              {block.items.map((item, itemIdx) => (
                <li
                  key={itemIdx}
                  className="flex items-start gap-2.5 text-[16.5px] sm:text-[18px] leading-relaxed"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-3 shrink-0" />
                  <div className="flex-1 min-w-0 break-words">{renderInlineText(item)}</div>
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === 'ol') {
          return (
            <ol key={idx} className="my-3 space-y-2 pl-1">
              {block.items.map((item, itemIdx) => (
                <li
                  key={itemIdx}
                  className="flex items-start gap-2.5 text-[15.5px] sm:text-[16.5px] leading-relaxed"
                >
                  <span className="font-bold text-neutral-900 dark:text-white font-mono text-xs sm:text-sm shrink-0 mt-0.5 w-4">
                    {itemIdx + 1}.
                  </span>
                  <div className="flex-1 min-w-0 break-words">{renderInlineText(item)}</div>
                </li>
              ))}
            </ol>
          );
        }

        if (block.type === 'quote') {
          return (
            <blockquote
              key={idx}
              className="my-4 border-l-4 border-cyan-500 bg-cyan-50/50 dark:bg-cyan-950/20 p-3.5 sm:p-4 rounded-r-xl text-neutral-800 dark:text-neutral-200 text-sm sm:text-base italic leading-relaxed"
            >
              {block.lines.map((qLine, qIdx) => (
                <p key={qIdx} className={qIdx > 0 ? 'mt-1' : ''}>
                  {renderInlineText(qLine)}
                </p>
              ))}
            </blockquote>
          );
        }

        if (block.type === 'diagram') {
          return (
            <StrategyDiagram
              key={idx}
              articleNumber={articleNumber}
              diagramIndex={block.index}
              rawComment={block.raw}
            />
          );
        }

        if (block.type === 'admin-image') {
          if (!isAdmin) return null;
          return (
            <aside
              key={idx}
              className="my-5 p-4 rounded-xl border-2 border-dashed border-amber-400/90 dark:border-amber-600/80 bg-amber-50/80 dark:bg-amber-950/25 text-neutral-900 dark:text-neutral-100 shadow-2xs animate-in fade-in duration-200"
              aria-label="管理者用画像配置メモ"
            >
              <div className="flex items-center gap-2 text-xs font-black text-amber-700 dark:text-amber-400 mb-1.5 uppercase tracking-wider">
                <Camera className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                <span>【管理者専用メモ】ここにはこんな画像を入れる</span>
              </div>
              <p className="text-xs sm:text-sm font-medium text-neutral-800 dark:text-neutral-200 leading-relaxed pl-6">
                📸 {block.note}
              </p>
            </aside>
          );
        }

        // p
        return (
          <p
            key={idx}
            className="my-3 text-neutral-800 dark:text-neutral-200 leading-[1.8] sm:leading-[1.9]"
          >
            {block.lines.map((l, lIdx) => (
              <React.Fragment key={lIdx}>
                {lIdx > 0 && <br />}
                {renderInlineText(l)}
              </React.Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}
