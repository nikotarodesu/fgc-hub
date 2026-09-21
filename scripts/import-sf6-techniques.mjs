import fs from 'fs';
import path from 'path';

const desktopDir = 'C:/Users/秀喜/Desktop/SF6kyotu';
const outFilePath = path.resolve('src/data/articles/sf6CommonTechniques.ts');

const metaList = [
  { num: 1, pattern: '01-oki-sashi-sashikaeshi', slug: 'oki-sashi-sashikaeshi', title: '置き・差し・差し返し', difficulty: 'beginner', difficultyLabel: '初級', difficultyOrder: 2 },
  { num: 2, pattern: '02-aruki-guard-kara-sasu', slug: 'aruki-guard-kara-sasu', title: '歩きガードから差す', difficulty: 'beginner', difficultyLabel: '初級', difficultyOrder: 3 },
  { num: 3, pattern: '03-sashikaeshi-no-tsukurikata', slug: 'sashikaeshi-no-tsukurikata', title: '差し返しの作り方', difficulty: 'intermediate', difficultyLabel: '中級', difficultyOrder: 1 },
  { num: 4, pattern: '04-sashikaeshi-waza-no-erabikata', slug: 'sashikaeshi-waza-no-erabikata', title: '差し返し技の選び方', difficulty: 'intermediate', difficultyLabel: '中級', difficultyOrder: 2 },
  { num: 5, pattern: '05-waza-aiso-no-mikata', slug: 'waza-aiso-no-mikata', title: '技相性の見方', difficulty: 'intermediate', difficultyLabel: '中級', difficultyOrder: 3 },
  { num: 6, pattern: '06-oki-no-tsukaiwake', slug: 'oki-no-tsukaiwake', title: '置きの使い分け', difficulty: 'intermediate', difficultyLabel: '中級', difficultyOrder: 4 },
  { num: 7, pattern: '07-aite-no-hanno-wo-hikidasu', slug: 'aite-no-hanno-wo-hikidasu', title: '相手の反応を引き出す', difficulty: 'advanced', difficultyLabel: '上級', difficultyOrder: 1 },
  { num: 8, pattern: '08-tobi-no-toshikata', slug: 'tobi-no-toshikata', title: '飛びの通し方', difficulty: 'intermediate', difficultyLabel: '中級', difficultyOrder: 10 },
  { num: 9, pattern: '09-uchikaeshi-no-handan-to-taisaku', slug: 'uchikaeshi-no-handan-to-taisaku', title: '打ち返しの判断と対策', difficulty: 'beginner', difficultyLabel: '初級', difficultyOrder: 4 },
  { num: 10, pattern: '10-sentan-renkei-no-kobo', slug: 'sentan-renkei-no-kobo', title: '先端連係の攻防', difficulty: 'intermediate', difficultyLabel: '中級', difficultyOrder: 5 },
  { num: 11, pattern: '11-biyuri-no-kobo', slug: 'biyuri-no-kobo', title: '微有利の攻防', difficulty: 'beginner', difficultyLabel: '初級', difficultyOrder: 5 },
  { num: 12, pattern: '12-okurase-nage-no-tsukaikata', slug: 'okurase-nage-no-tsukaikata', title: '遅らせ投げの使い方', difficulty: 'beginner', difficultyLabel: '初級', difficultyOrder: 6 },
  { num: 13, pattern: '13-nama-rush-no-toshikata', slug: 'nama-rush-no-toshikata', title: '生ラッシュの通し方', difficulty: 'beginner', difficultyLabel: '初級', difficultyOrder: 7 },
  { num: 14, pattern: '14-rush-dome-taisaku', slug: 'rush-dome-taisaku', title: 'ラッシュ止め対策', difficulty: 'beginner', difficultyLabel: '初級', difficultyOrder: 8 },
  { num: 15, pattern: '15-jokyo-kakunin-to-shikomi', slug: 'jokyo-kakunin-to-shikomi', title: '状況確認と仕込み', difficulty: 'intermediate', difficultyLabel: '中級', difficultyOrder: 7 },
  { num: 16, pattern: '16-bogyo-no-risk-kanri', slug: 'bogyo-no-risk-kanri', title: '防御のリスク管理', difficulty: 'beginner', difficultyLabel: '初級', difficultyOrder: 9 },
  { num: 17, pattern: '17-micchaku-bifuri-no-mamorikata', slug: 'micchaku-bifuri-no-mamorikata', title: '密着微不利の守り方', difficulty: 'intermediate', difficultyLabel: '中級', difficultyOrder: 6 },
  { num: 18, pattern: '18-cancel-kakunin-no-bogyo', slug: 'cancel-kakunin-no-bogyo', title: 'キャンセル確認の防御', difficulty: 'intermediate', difficultyLabel: '中級', difficultyOrder: 8 },
  { num: 19, pattern: '19-just-parry-no-nerai-kata', slug: 'just-parry-no-nerai-kata', title: 'ジャストパリィの狙い方', difficulty: 'intermediate', difficultyLabel: '中級', difficultyOrder: 9 },
  { num: 20, pattern: '20-just-parry-to-rush-shikomi', slug: 'just-parry-to-rush-shikomi', title: 'ジャストパリィとラッシュ仕込み', difficulty: 'advanced', difficultyLabel: '上級', difficultyOrder: 2 },
  { num: 21, pattern: '21-gauge-wo-toushi-shite-kaishu-suru', slug: 'gauge-wo-toushi-shite-kaishu-suru', title: 'ゲージを投資して回収する', difficulty: 'advanced', difficultyLabel: '上級', difficultyOrder: 3 },
  { num: 22, pattern: '22-aite-no-resource-de-yomiai-wo-kaeru', slug: 'aite-no-resource-de-yomiai-wo-kaeru', title: '相手のリソースで読み合いを変える', difficulty: 'advanced', difficultyLabel: '上級', difficultyOrder: 4 },
  { num: 23, pattern: '23-burnout-zeme-no-kumikatekata', slug: 'burnout-zeme-no-kumikatekata', title: 'バーンアウト攻めの組み立て方', difficulty: 'advanced', difficultyLabel: '上級', difficultyOrder: 5 },
  { num: 24, pattern: '24-tama-de-aite-wo-ugokasu', slug: 'tama-de-aite-wo-ugokasu', title: '弾で相手を動かす', difficulty: 'advanced', difficultyLabel: '上級', difficultyOrder: 6 },
  { num: 25, pattern: '25-handan-wo-herasu-renshu', slug: 'handan-wo-herasu-renshu', title: '判断を減らす練習', difficulty: 'beginner', difficultyLabel: '初級', difficultyOrder: 1 },
];

const files = fs.readdirSync(desktopDir).filter(f => f.endsWith('.md'));

const articles = metaList.map(m => {
  const fileName = files.find(f => f.startsWith(m.pattern));
  if (!fileName) {
    throw new Error(`File not found for pattern: ${m.pattern}`);
  }
  const raw = fs.readFileSync(path.join(desktopDir, fileName), 'utf8');

  // H1抽出
  const h1Match = raw.match(/^#\s+(.+)$/m);
  const title = h1Match ? h1Match[1].trim() : m.title;

  // Antigravityメモの分離
  let mainMarkdown = raw;
  let antigravityNotes = '';
  const notesIndex = raw.indexOf('## Antigravity実装メモ');
  if (notesIndex !== -1) {
    mainMarkdown = raw.slice(0, notesIndex).trim();
    antigravityNotes = raw.slice(notesIndex).trim();
  }

  // サマリー抽出（H1以降の最初のテキスト段落）
  const linesAfterH1 = raw.replace(/^#\s+.+$/m, '').trim().split('\n');
  let summaryParas = [];
  for (const line of linesAfterH1) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (summaryParas.length > 0) break;
      continue;
    }
    if (trimmed.startsWith('#') || trimmed.startsWith('|') || trimmed.startsWith('<!--') || trimmed.startsWith('-')) {
      if (summaryParas.length > 0) break;
      continue;
    }
    summaryParas.push(trimmed.replace(/\*\*/g, ''));
  }
  const summary = summaryParas.join(' ') || `${title}の解説。実戦における判断と立ち回りの基本を整理します。`;

  // 読了時間（文字数から算出、約500文字で1分）
  const charCount = raw.length;
  const readMinutes = Math.max(3, Math.round(charCount / 500));
  const readTime = `${readMinutes}分`;

  return {
    id: `sf6-tech-${String(m.num).padStart(2, '0')}`,
    slug: m.slug,
    title,
    summary,
    game: 'sf6',
    category: 'system',
    character: undefined,
    characterColor: undefined,
    author: 'AUTHOR_INFO',
    publishedAt: '2026-09-21',
    updatedAt: '2026-09-21',
    readTime,
    isPaid: false,
    tags: ['スト6', '共通技術', '地上戦', m.difficultyLabel],
    likesCount: 120 + m.num * 5,
    series: 'sf6-common-techniques',
    articleNumber: m.num,
    difficulty: m.difficulty,
    difficultyLabel: m.difficultyLabel,
    difficultyOrder: m.difficultyOrder,
    markdownContent: mainMarkdown,
    antigravityNotes: antigravityNotes || undefined,
    freeContent: {
      intro: summary,
      sections: [],
    },
    paidContent: {
      sections: [],
    },
  };
});

// TypeScriptファイルとして出力
const tsCode = `import { Article, AUTHOR_INFO } from '../articles';

export const SF6_COMMON_TECHNIQUES_ARTICLES: Article[] = ${JSON.stringify(articles, null, 2)
  .replace(/"author": "AUTHOR_INFO"/g, '"author": AUTHOR_INFO')};
`;

fs.writeFileSync(outFilePath, tsCode, 'utf8');
console.log(`Successfully generated ${articles.length} articles to ${outFilePath}`);
