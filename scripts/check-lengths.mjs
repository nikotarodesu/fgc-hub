import fs from 'fs';

const content = fs.readFileSync('src/data/articles/sf6CommonTechniques.ts', 'utf8');
const jsonMatch = content.match(/export const SF6_COMMON_TECHNIQUES_ARTICLES: Article\[\] = (\[[\s\S]*?\]);\s*$/);
if (jsonMatch) {
  // 簡易的にJSONパースできるようにAUTHOR_INFOを置換
  const rawJson = jsonMatch[1].replace(/AUTHOR_INFO/g, '{}');
  const articles = JSON.parse(rawJson);
  console.log(`Total Articles: ${articles.length}`);
  articles.forEach((a, idx) => {
    console.log(`${idx + 1}. [${a.difficultyLabel} STEP ${a.difficultyOrder}] ${a.title} (${a.slug}) - ${a.markdownContent.length}文字 (${a.readTime})`);
  });
}
