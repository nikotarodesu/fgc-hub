export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

/**
 * Markdown本文から目次（H2, H3）を抽出するヘルパー関数（サーバー・クライアント両用）
 */
export function extractTocFromMarkdown(content: string): TocItem[] {
  let cleanContent = content;
  const notesIdx = cleanContent.indexOf('## Antigravity実装メモ');
  if (notesIdx !== -1) {
    cleanContent = cleanContent.slice(0, notesIdx).trim();
  }

  const lines = cleanContent.split('\n');
  const items: TocItem[] = [];
  const idCounts = new Map<string, number>();

  for (const line of lines) {
    const trimmed = line.trim();
    let level: 2 | 3 | null = null;
    let text = '';

    if (trimmed.startsWith('## ') && !trimmed.startsWith('### ')) {
      level = 2;
      text = trimmed.slice(3).trim();
    } else if (trimmed.startsWith('### ')) {
      level = 3;
      text = trimmed.slice(4).trim();
    }

    if (level !== null && text) {
      // 見出しのクレンジング
      const cleanText = text
        .replace(/\*\*/g, '')
        .replace(/`.*?`/g, '')
        .replace(/\[(.*?)\]\(.*?\)/g, '$1')
        .trim();

      if (cleanText && cleanText !== '目次' && cleanText !== '参考資料' && cleanText !== '関連記事') {
        const baseId = `sec-${cleanText.toLowerCase().replace(/[\s\t\n]+/g, '-').replace(/[^\w\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff-]/g, '')}`;
        const count = idCounts.get(baseId) || 0;
        idCounts.set(baseId, count + 1);
        const uniqueId = count === 0 ? baseId : `${baseId}-${count}`;

        items.push({
          id: uniqueId,
          text: cleanText,
          level,
        });
      }
    }
  }

  return items;
}
