import React from 'react';

interface RichContentProps {
  content: string;
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
          className="font-bold text-neutral-900 border-b border-neutral-900/40 pb-0.5"
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
    <div className="space-y-4 text-neutral-700 leading-relaxed sm:leading-loose text-[15px] sm:text-base">
      {groups.map((group, gIdx) => {
        // 1. 引用・コールアウト（シンプルで洗練された左バー）
        if (group.type === 'quote') {
          const quoteText = group.lines
            .map((l) => l.trim().replace(/^>\s*/, ''))
            .join('\n');
          return (
            <div
              key={gIdx}
              className="my-4 pl-4 py-1.5 border-l-2 border-neutral-800 text-neutral-800 font-medium text-sm sm:text-[15px]"
            >
              {renderInline(quoteText)}
            </div>
          );
        }

        // 2. 箇条書きリスト（過剰なカード枠を廃止し、すっきりとしたクリーンなリスト）
        if (group.type === 'bullet') {
          return (
            <ul key={gIdx} className="my-3 space-y-2 pl-1">
              {group.lines.map((line, lIdx) => {
                const itemText = line.trim().replace(/^[・\-\*]\s*/, '');
                return (
                  <li
                    key={lIdx}
                    className="flex items-start gap-2.5 text-neutral-800 text-sm sm:text-[15px] leading-relaxed"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 mt-2.5 shrink-0" />
                    <div className="flex-1">
                      {renderInline(itemText)}
                    </div>
                  </li>
                );
              })}
            </ul>
          );
        }

        // 3. 番号付きリスト（すっきりしたナンバリング）
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
                    className="flex items-start gap-2.5 text-neutral-800 text-sm sm:text-[15px] leading-relaxed"
                  >
                    <span className="font-bold text-neutral-900 font-mono text-sm shrink-0 mt-0.5">
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

        // 4. 矢印行（結論・効果）：すっきりインデントされた強調
        if (group.type === 'arrow') {
          return (
            <div key={gIdx} className="my-2 space-y-1.5 pl-2">
              {group.lines.map((line, lIdx) => {
                const itemText = line.trim().replace(/^(=>|→)\s*/, '');
                return (
                  <div
                    key={lIdx}
                    className="flex items-center gap-2 text-sm sm:text-[15px] text-neutral-900 font-medium"
                  >
                    <span className="text-cyan-600 shrink-0 font-bold">➔</span>
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