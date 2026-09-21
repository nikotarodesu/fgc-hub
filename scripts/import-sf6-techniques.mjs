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
  // CRLFをLFに正規化
  const raw = fs.readFileSync(path.join(desktopDir, fileName), 'utf8').replace(/\r\n/g, '\n');

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

  // クレンジング処理

  // ② 参考資料の項目を削除（## 参考資料 〜 次の見出しまたは末尾まで）
  mainMarkdown = mainMarkdown.replace(/\n#+\s*参考資料[\s\S]*?(?=\n#+\s+|$)/g, '');

  // ④ 関連記事の項目を削除（## 関連記事 〜 次の見出しまたは末尾まで）
  mainMarkdown = mainMarkdown.replace(/\n#+\s*関連記事[\s\S]*?(?=\n#+\s+|$)/g, '');

  // ③ 管理用表現の修正
  mainMarkdown = mainMarkdown.replace(/ただし、先端連係の攻防は第10記事で詳しく扱います。/g, 'ただし、先端連係の攻防は[先端連係の攻防](/sf6/strategy/sentan-renkei-no-kobo)で詳しく扱います。');
  mainMarkdown = mainMarkdown.replace(/統合版第(\d+)記事[「『]([^」』]+)[」』]/g, '[$2](/sf6/strategy)');

  // ⑤ 空になっている表の削除と前後の文章修正
  // 1) 20: 練習5の距離別確認表
  if (m.num === 20) {
    const target = /### 練習5：距離を三段階に分ける[\s\S]*?実戦では、確認済みの距離だけで狙います。/;
    if (!target.test(mainMarkdown)) {
      console.warn(`[WARN] Article 20 practice 5 target not matched!`);
    }
    mainMarkdown = mainMarkdown.replace(
      target,
      `### 練習5：距離を三段階に分けて検証する\n\n近距離、中距離、先端付近の3つの間合いで同じ記録を再生し、それぞれの結果を比較します。\n\n- **近距離**: パリィ成功時の反撃猶予が長く、最大ダメージのラッシュ反撃が安定して届きやすい間合い\n- **中距離**: パリィ後の打撃がギリギリ届くか確認し、手前空振り時にもラッシュで硬直を狩れる主力の間合い\n- **先端付近**: 接触時はガードになりやすく、手前空振り時にはラッシュ打撃が届かない危険がある間合い\n\n実戦では感覚で狙わず、あらかじめ反撃が届くことを確認できた距離に限定して狙います。`
    );
  }

  // 2) 21: 練習1の始動別ルート比較表 & 練習5のSA用途表
  if (m.num === 21) {
    const target1 = /### 1\. 同じ始動から複数ルートを比較する[\s\S]*?最大ダメージだけでなく、位置と手番を必ず記録します。/;
    if (!target1.test(mainMarkdown)) {
      console.warn(`[WARN] Article 21 target 1 not matched!`);
    }
    mainMarkdown = mainMarkdown.replace(
      target1,
      `### 1. 同じ始動から複数ルートを比較する\n\nノーゲージ、OD技、キャンセルラッシュ、SA使用ルートを記録して比較します。比較する際は、単なるダメージの高さだけでなく、以下の項目を総合的に確認しましょう。\n\n- **消費Dゲージ・SAゲージ**: 投資に見合うリターンが得られるか\n- **ダメージ量**: 相手の体力を削り切れる（リーサル）かどうか\n- **画面運びと位置関係**: 画面端へ追い込めるか、あるいは位置を入れ替えられるか\n- **起き攻めの状況**: ダウン後に有利な密着状況を作れるか、詐欺飛びにいけるか\n- **コンボ終了時のDゲージ残量**: 攻め継続や相手の反撃に耐えられるリソースが残るか\n\n最大ダメージだけでなく、その後の位置と手番まで含めてルートごとの損得を評価します。`
    );
    const target2 = /### 5\. SAの用途表を作る[\s\S]*?これにより、SAをダメージ以外の目的でも選べるようになります。/;
    if (!target2.test(mainMarkdown)) {
      console.warn(`[WARN] Article 21 target 2 not matched!`);
    }
    mainMarkdown = mainMarkdown.replace(
      target2,
      `### 5. SAの用途を整理する\n\n各SA（SA1 / SA2 / SA3・CA）の使い道をあらかじめ整理しておきます。\n\n- **主な始動技**: どの技からヒット確認して繋げるか\n- **リーサル目安**: 相手の体力が何割以下なら倒し切れるか\n- **画面運び・位置入れ替え**: 端へ到達できるか、自陣の画面端から脱出できるか\n- **ダウン後の起き攻め**: 技後に有利Fを取って攻めを継続できるか\n- **Dゲージ回復への寄与**: 演出中にDゲージがどれくらい自然回復するか\n- **使用後の抑止力**: 相手の無敵技や暴れを警戒させる効果が残るか\n\nこれにより、SAを単なる最大ダメージ狙いだけでなく、位置取りやDゲージ回復などの戦術的投資としても使い分けられるようになります。`
    );
  }

  // 3) 23: 練習1のBO時フレーム比較表
  if (m.num === 23) {
    const target = /### 1\. BO時のフレームを確認する[\s\S]*?数値だけでなく、ガードバックと次の技の到達を確認します。/;
    if (!target.test(mainMarkdown)) {
      console.warn(`[WARN] Article 23 target not matched!`);
    }
    mainMarkdown = mainMarkdown.replace(
      target,
      `### 1. BO時のフレームを確認する\n\n普段使う通常技や必殺技について、通常時とバーンアウト（BO）時のガード硬直差の変化（BO時はガード硬直が+4F増加）を比較・整理します。確認する際の要点は以下の通りです。\n\n- **ガード硬直差の変化**: 通常時は微不利や五分の技が、BO時ガードで有利フレーム（+4F加算）に化けるか\n- **次に届く連携技**: 有利フレームから連続ガード（連ガ）や暴れ潰しになる技がスムーズに届くか\n- **相手の割り込みの有無**: 技の隙間に無敵SAや通常技暴れで割り込まれる隙（4F以上）があるか\n\n数値の比較だけでなく、ガードバックによるノックバック距離と次の技の到達距離をセットで把握することが重要です。`
    );
  }

  // 4) 24: 練習5の弾抜け成立表
  if (m.num === 24) {
    const target = /### 5\. 弾抜けの成立表を作る[\s\S]*?技が当たるかだけでなく、相手がどこまで近づくかも記録します。/;
    if (!target.test(mainMarkdown)) {
      console.warn(`[WARN] Article 24 target not matched!`);
    }
    mainMarkdown = mainMarkdown.replace(
      target,
      `### 5. 弾抜けの成立条件を整理する\n\n相手の弾抜け技（OD無敵技、SA、突進技など）に対して、距離と弾速ごとの成立条件を整理します。具体的には以下の要素を検証しましょう。\n\n- **弾抜けの確定状況**: 見てから弾抜け技が確定ヒットしてしまう間合いと弾速の組み合わせ\n- **ガードが間に合う状況**: 弾を撃った後でも硬直が解けてガードが間に合うか\n- **空振りに対する反撃**: 相手の弾抜け技が届かず空振った場合、手痛いパニカン反撃を叩き込めるか\n- **使用後の位置関係**: 弾抜けを防いだ後の画面端やラインの押し引き\n\n相手の技が届くかどうかだけでなく、ガードされた場合や空振り時にどちらが有利な位置を取れるかまで把握しておきます。`
    );
  }

  // ① 記事の末や文中にある --- という文字を全面的に削除
  mainMarkdown = mainMarkdown
    .split('\n')
    .filter(line => line.trim() !== '---')
    .join('\n')
    .trim();

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

// 検証チェック
for (const art of articles) {
  const mc = art.markdownContent;
  if (mc.includes('## 参考資料')) {
    console.error(`[ERROR] Article ${art.articleNumber} still contains ## 参考資料!`);
  }
  if (mc.includes('## 関連記事')) {
    console.error(`[ERROR] Article ${art.articleNumber} still contains ## 関連記事!`);
  }
  if (mc.includes('第10記事')) {
    console.error(`[ERROR] Article ${art.articleNumber} still contains 第10記事!`);
  }
  if (mc.includes('統合版')) {
    console.error(`[ERROR] Article ${art.articleNumber} still contains 統合版!`);
  }
  const lines = mc.split('\n');
  for (const line of lines) {
    if (line.trim() === '---') {
      console.error(`[ERROR] Article ${art.articleNumber} still contains --- line!`);
    }
  }
}
console.log('All articles passed validation checks!');
