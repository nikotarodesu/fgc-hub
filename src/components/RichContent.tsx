import React from 'react';

interface RichContentProps {
  content: string;
}

// インライン装飾（**太字**、`コード` 等）のパース
function renderInline(text: string): React.ReactNode[] {
  // **太字** を分割して抽出
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const inner = part.slice(2, -2);
      return (
        <strong
          key={i}
          className="font-bold text-neutral-900 bg-amber-100/90 px-1.5 py-0.5 rounded mx-0.5 border-b-2 border-amber-400 shadow-2xs inline-block"
        >
          {inner}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

type LineType = 'empty' | 'quote' | 'bullet' | 'numbered' | 'arrow' | 'text';

function getLineType(line: string): LineType {
  const trimmed = line.trim();
  if (!trimmed) return 'empty';
  if (trimmed.startsWith('>')) return 'quote';
  if (trimmed.startsWith('・') || trimmed.startsWith('- ') || trimmed.startsWith('* ')) return 'bullet';
  if (/^\d+[\.|\)|）]\s*/.test(trimmed)) return 'numbered';
  if (trimmed.startsWith('→') || trimmed.startsWith('=>')) return 'arrow';
  return 'text';
}

interface BlockGroup {
  type: LineType;
  lines: string[];
}

export default function RichContent({ content }: RichContentProps) {
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
    <div className="space-y-4 text-neutral-800 leading-relaxed sm:leading-loose text-[15px] sm:text-base">
      {groups.map((group, gIdx) => {
        // 1. 引用・コールアウト
        if (group.type === 'quote') {
          const quoteText = group.lines
            .map((l) => l.trim().replace(/^>\s*/, ''))
            .join('\n');
          return (
            <div
              key={gIdx}
              className="my-4 p-4 sm:p-5 rounded-xl bg-neutral-50 border-l-4 border-neutral-900 shadow-2xs"
            >
              <div className="text-neutral-900 font-medium leading-relaxed">
                {renderInline(quoteText)}
              </div>
            </div>
          );
        }

        // 2. 箇条書きリスト（「・」「- 」「* 」）→ 個別の見やすい縦並びカード
        if (group.type === 'bullet') {
          return (
            <ul key={gIdx} className="my-3 space-y-2">
              {group.lines.map((line, lIdx) => {
                const itemText = line.trim().replace(/^[・\-\*]\s*/, '');
                return (
                  <li
                    key={lIdx}
                    className="flex items-start gap-3 p-3 rounded-xl bg-neutral-50/90 hover:bg-neutral-100/60 border border-neutral-200/80 text-neutral-800 transition-colors shadow-2xs"
                  >
                    <span className="w-2 h-2 rounded-full bg-neutral-900 mt-2 shrink-0" />
                    <div className="flex-1 leading-relaxed text-sm sm:text-[15px]">
                      {renderInline(itemText)}
                    </div>
                  </li>
                );
              })}
            </ul>
          );
        }

        // 3. 番号付きリスト（「1. 」「2. 」等）→ ナンバリングバッジ付きカード
        if (group.type === 'numbered') {
          return (
            <ol key={gIdx} className="my-3 space-y-2">
              {group.lines.map((line, lIdx) => {
                const trimmed = line.trim();
                const match = trimmed.match(/^(\d+)[\.|\)|）]\s*(.*)$/);
                const num = match ? match[1] : `${lIdx + 1}`;
                const itemText = match ? match[2] : trimmed;
                return (
                  <li
                    key={lIdx}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-neutral-200 shadow-2xs text-neutral-800"
                  >
                    <span className="w-6 h-6 rounded-full bg-neutral-900 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      {num}
                    </span>
                    <div className="flex-1 leading-relaxed text-sm sm:text-[15px]">
                      {renderInline(itemText)}
                    </div>
                  </li>
                );
              })}
            </ol>
          );
        }

        // 4. 矢印行（「→ 」）→ 結論・結果の強調バー
        if (group.type === 'arrow') {
          return (
            <div key={gIdx} className="my-3 space-y-1.5">
              {group.lines.map((line, lIdx) => {
                const itemText = line.trim().replace(/^(=>|→)\s*/, '');
                return (
                  <div
                    key={lIdx}
                    className="flex items-center gap-2 p-3 rounded-lg bg-sky-50/80 border border-sky-200 text-sky-950 text-sm font-medium"
                  >
                    <span className="font-bold text-sky-600 shrink-0">➔</span>
                    <span className="flex-1">{renderInline(itemText)}</span>
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