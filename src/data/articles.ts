import { RYU_COMPLETE_GUIDE } from './articles/ryuCompleteGuide';
import { ELENA_COMPLETE_GUIDE } from './articles/elenaCompleteGuide';
import { ELENA_CLASSIC_COMPLETE_GUIDE } from './articles/elenaClassicCompleteGuide';
import { ELENA_MODERN_COMPLETE_GUIDE } from './articles/elenaModernCompleteGuide';
import { CHUNLI_COMPLETE_GUIDE } from './articles/chunliCompleteGuide';
import { CHUNLI_CLASSIC_COMPLETE_GUIDE } from './articles/chunliClassicCompleteGuide';
import { COACHING_JURI_1400MR } from './articles/coachingJuri1400mr';
import { COACHING_BLANKA_1500MR } from './articles/coachingBlanka1500mr';
import { COACHING_ED_1300MR_KEN } from './articles/coachingEd1300mrKen';
import { COACHING_ED_1500MR_AKUMA } from './articles/coachingEd1500mrAkuma';
import { COACHING_JP_PLAT1 } from './articles/coachingJpPlat1';
import { COACHING_MAI_DIA3 } from './articles/coachingMaiDia3';
import { COACHING_ZANGIEF_1400MR } from './articles/coachingZangief1400mr';
import { COACHING_BISON_1500MR_RYU } from './articles/coachingBison1500mrRyu';
import { COACHING_BISON_1500MR_CAMMY } from './articles/coachingBison1500mrCammy';
import { COACHING_BISON_DIA5 } from './articles/coachingBisonDia5';
import { COACHING_RYU_DIA4 } from './articles/coachingRyuDia4';
import { COACHING_CHUNLI_1600MR } from './articles/coachingChunli1600mr';
import { COACHING_CHUNLI_PLAT3 } from './articles/coachingChunliPlat3';
import { COACHING_GUILE_DIA5 } from './articles/coachingGuileDia5';
import { COACHING_ED_1500MR } from './articles/coachingEd1500mr';
import { COACHING_BISON_1600MR } from './articles/coachingBison1600mr';
import { COACHING_BISON_1500MR } from './articles/coachingBison1500mr';
import { COACHING_KEN_1700MR } from './articles/coachingKen1700mr';
import { COACHING_KEN_1300MR } from './articles/coachingKen1300mr';
import { COACHING_MARISA_1500MR } from './articles/coachingMarisa1500mr';
import { COACHING_AKUMA_1200MR } from './articles/coachingAkuma1200mr';
import { AKUMA_NEUTRAL_STRATEGY } from './articles/akumaNeutralStrategy';
import { RYU_NEUTRAL_STRATEGY } from './articles/ryuNeutralStrategy';
import { ZANGIEF_NEUTRAL_STRATEGY } from './articles/zangiefNeutralStrategy';
import { SF6_COMMON_TECHNIQUES_ARTICLES } from './articles/sf6CommonTechniques';

export interface ArticleVariant {
  label: string;
  badge: string;
  intro: string;
  sections: Article['freeContent']['sections'];
  paidSections: Article['paidContent']['sections'];
  abbreviations?: Article['abbreviations'];
}

import { AuthorInfo, AUTHOR_INFO } from './author';
export type { AuthorInfo };
export { AUTHOR_INFO };

export interface Article {
  id: string;
  slug: string;
  title: string;
  metaTitle?: string;
  subtitle?: string;
  coachingDate?: string;
  summary: string;
  game: 'sf6' | 'general';
  category: 'character' | 'neutral' | 'system' | 'mindset' | 'coaching';
  character?: string;
  characterColor?: string;
  youtubeVideoId?: string;
  author: AuthorInfo;
  publishedAt: string;
  updatedAt: string;
  patchDate?: string;
  patchVersion?: string;
  readTime: string;
  isPaid: boolean;
  price?: number;
  subscriptionOnly?: boolean;
  tags: string[];
  likesCount: number;
  eyecatchImage?: string;
  recommendedGearIds?: string[];
  series?: 'sf6-common-techniques';
  articleNumber?: number;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  difficultyLabel?: '初級' | '中級' | '上級';
  difficultyOrder?: number;
  theme?: 'ground' | 'advantage' | 'defense' | 'resource' | 'training';
  themeLabel?: string;
  targetAudience?: string;
  keyTakeaways?: string[];
  actionStep?: {
    task: string;
    steps: string[];
  };
  nextArticleReason?: string;
  markdownContent?: string;
  antigravityNotes?: string;
  hideRelatedArticles?: boolean;
  abbreviations?: {
    formal: string;
    abbreviation: string;
  }[];
  freeContent: {
    intro: string;
    sections: {
      title: string;
      anchorId?: string;
      body: string;
      image?: {
        src: string;
        alt: string;
        caption?: string;
      };
      diagramType?:
        | 'hadoken-flow'
        | 'distance-meter'
        | 'mindset-comparison'
        | 'neutral-triangle'
        | 'fuzzy-timeline'
        | string;
      combo?: {
        name: string;
        recipe: string;
        damage: string;
        driveGauge: string;
        situation: string;
        note: string;
      }[];
      bulletPoints?: string[];
    }[];
  };
  paidContent: {
    intro?: string;
    sections: {
      title: string;
      body: string;
      image?: {
        src: string;
        alt: string;
        caption?: string;
      };
      diagramType?:
        | 'hadoken-flow'
        | 'distance-meter'
        | 'mindset-comparison'
        | 'neutral-triangle'
        | 'fuzzy-timeline'
        | string;
      combo?: {
        name: string;
        recipe: string;
        damage: string;
        driveGauge: string;
        situation: string;
        note: string;
      }[];
      tips?: string[];
      bulletPoints?: string[];
      qaList?: {
        number: string;
        question: string;
        answer: string;
      }[];
      secretSetplay?: {
        name: string;
        input: string;
        frameAdvantage: string;
        explanation: string;
      }[];
    }[];
  };
  controlType?: 'classic' | 'modern' | 'both';
  relatedGuideSlug?: string;
  variants?: {
    classic: ArticleVariant;
    modern: ArticleVariant;
  };
}

function getCommonTechniqueSvgDataUrl(difficulty?: string, difficultyLabel?: string, order?: number): string {
  const num = String(order || 1).padStart(2, '0');
  const label = difficultyLabel || '共通技術';
  const isBeginner = difficulty === 'beginner';
  const isIntermediate = difficulty === 'intermediate';
  const bg1 = isBeginner ? '#022c22' : isIntermediate ? '#451a03' : '#2e1065';
  const bg2 = isBeginner ? '#064e3b' : isIntermediate ? '#78350f' : '#4c1d95';
  const accent = isBeginner ? '#34d399' : isIntermediate ? '#fbbf24' : '#c084fc';

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225" width="400" height="225">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${bg1}" />
        <stop offset="50%" stop-color="#171717" />
        <stop offset="100%" stop-color="${bg2}" />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#bg)" />
    <rect x="140" y="24" width="120" height="28" rx="6" fill="${accent}" fill-opacity="0.2" stroke="${accent}" stroke-width="1.5" />
    <text x="200" y="43" font-family="system-ui, sans-serif" font-weight="900" font-size="14" fill="${accent}" text-anchor="middle">${label}</text>
    <text x="200" y="145" font-family="monospace, system-ui" font-weight="900" font-size="80" fill="#ffffff" text-anchor="middle">${num}</text>
    <text x="200" y="185" font-family="system-ui, sans-serif" font-weight="700" font-size="14" fill="${accent}" letter-spacing="3" text-anchor="middle">STEP ${order || 1}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// キャラクター名またはスラッグからスト6公式アイキャッチ画像を取得するヘルパー関数
export function getArticleEyecatch(article: Article): string {
  if (article.eyecatchImage) {
    return article.eyecatchImage;
  }
  if (article.series === 'sf6-common-techniques') {
    return getCommonTechniqueSvgDataUrl(article.difficulty, article.difficultyLabel, article.difficultyOrder);
  }
  const charLower = (article.character || '').toLowerCase();
  if (charLower.includes('リュウ') || charLower.includes('ryu')) {
    return '/images/characters/ryu/sns.jpg';
  }
  if (charLower.includes('春麗') || charLower.includes('chunli') || charLower.includes('chun-li')) {
    return '/images/characters/chunli/sns.jpg';
  }
  if (charLower.includes('キャミィ') || charLower.includes('cammy')) {
    return '/images/characters/cammy/sns.jpg';
  }
  if (charLower.includes('ケン') || charLower.includes('ken')) {
    return '/images/characters/ken/sns.jpg';
  }
  if (charLower.includes('ルーク') || charLower.includes('luke')) {
    return '/images/characters/luke/sns.jpg';
  }
  if (charLower.includes('豪鬼') || charLower.includes('akuma') || charLower.includes('gouki')) {
    return '/images/characters/akuma/sns.jpg';
  }
  if (charLower.includes('ガイル') || charLower.includes('guile')) {
    return '/images/characters/guile/sns.jpg';
  }
  if (charLower.includes('エド') || charLower.includes('ed')) {
    return '/images/characters/ed/sns.jpg';
  }
  if (charLower.includes('ベガ') || charLower.includes('bison') || charLower.includes('vega')) {
    return '/images/characters/bison/sns.jpg';
  }
  if (charLower.includes('マリーザ') || charLower.includes('marisa')) {
    return '/images/characters/marisa/sns.jpg';
  }
  if (charLower.includes('ザンギ') || charLower.includes('zangief')) {
    return '/images/characters/zangief/sns.jpg';
  }
  if (charLower.includes('舞') || charLower.includes('mai')) {
    return '/images/characters/mai/sns.jpg';
  }
  if (charLower.includes('jp') || charLower.includes('ジェイピー')) {
    return '/images/characters/jp/sns.jpg';
  }
  if (charLower.includes('ブランカ') || charLower.includes('blanka')) {
    return '/images/characters/blanka/sns.jpg';
  }
  if (charLower.includes('ジュリ') || charLower.includes('juri')) {
    return '/images/characters/juri/sns.jpg';
  }
  if (charLower.includes('テリー') || charLower.includes('terry')) {
    return '/images/characters/terry/sns.jpg';
  }
  if (charLower.includes('ラシード') || charLower.includes('rashid')) {
    return '/images/characters/rashid/sns.jpg';
  }
  if (charLower.includes('aki') || charLower.includes('アキ')) {
    return '/images/characters/aki/sns.jpg';
  }
  if (charLower.includes('ジェイミー') || charLower.includes('jamie')) {
    return '/images/characters/jamie/sns.jpg';
  }
  if (charLower.includes('ディージェイ') || charLower.includes('deejay') || charLower.includes('dee jay')) {
    return '/images/characters/deejay/sns.jpg';
  }
  if (charLower.includes('マノン') || charLower.includes('manon')) {
    return '/images/characters/manon/sns.jpg';
  }
  if (charLower.includes('本田') || charLower.includes('honda')) {
    return '/images/characters/ehonda/sns.jpg';
  }
  if (charLower.includes('ダルシム') || charLower.includes('dhalsim')) {
    return '/images/characters/dhalsim/sns.jpg';
  }
  if (charLower.includes('リリー') || charLower.includes('lily')) {
    return '/images/characters/lily/sns.jpg';
  }
  if (charLower.includes('キンバリー') || charLower.includes('kimberly')) {
    return '/images/characters/kimberly/sns.jpg';
  }
  if (charLower.includes('エレナ') || charLower.includes('elena')) {
    return '/images/characters/elena/sns.jpg';
  }
  return '/images/characters/ryu/sns.jpg';
}

export const CHARACTERS_SF6 = [
  { id: 'chunli', name: '春麗 (Chun-Li)', type: '変幻自在', color: 'from-cyan-500 to-blue-600' },
  { id: 'bison', name: 'ベガ (Bison)', type: '圧殺突進', color: 'from-purple-700 to-rose-900' },
  { id: 'marisa', name: 'マリーザ (Marisa)', type: '超重量級パワー', color: 'from-amber-600 to-red-700' },
  { id: 'zangief', name: 'ザンギエフ (Zangief)', type: '投げキャラの頂点', color: 'from-red-700 to-rose-900' },
  { id: 'jp', name: 'JP (JP)', type: '空間掌握・設置', color: 'from-purple-800 to-slate-900' },
  { id: 'blanka', name: 'ブランカ (Blanka)', type: '野生トリッキー', color: 'from-emerald-500 to-amber-600' },
  { id: 'juri', name: 'ジュリ (Juri)', type: '急襲・スピード', color: 'from-fuchsia-600 to-pink-700' },
  { id: 'guile', name: 'ガイル (Guile)', type: '鉄壁要塞', color: 'from-emerald-600 to-green-700' },
  { id: 'gouki', name: '豪鬼 (Akuma)', type: '攻撃特化', color: 'from-red-600 to-amber-700' },
  { id: 'ken', name: 'ケン (Ken)', type: '万能攻勢', color: 'from-orange-500 to-red-600' },
  { id: 'ryu', name: 'リュウ (Ryu)', type: '胴着道', color: 'from-blue-600 to-indigo-800' },
  { id: 'luke', name: 'ルーク (Luke)', type: '制空・中距離', color: 'from-amber-500 to-yellow-600' },
  { id: 'bison', name: 'ベガ (Bison)', type: 'サイコパワー・制圧', color: 'from-purple-900 to-rose-950' },
  { id: 'ed', name: 'エド (Ed)', type: 'アウトボクシング', color: 'from-purple-600 to-indigo-700' },
  { id: 'mai', name: '不知火舞 (Mai)', type: 'DLC第2弾', color: 'from-pink-600 to-rose-700' },
  { id: 'elena', name: 'エレナ (Elena)', type: 'リーチ・ヒーリング', color: 'from-amber-500 to-orange-600' },
];

// 攻略記事データ一覧
export const ARTICLES_DATA: Article[] = [
  AKUMA_NEUTRAL_STRATEGY,
  ELENA_COMPLETE_GUIDE,
  COACHING_JURI_1400MR,
  COACHING_BLANKA_1500MR,
  COACHING_ED_1300MR_KEN,
  COACHING_ED_1500MR_AKUMA,
  COACHING_JP_PLAT1,
  COACHING_MAI_DIA3,
  COACHING_ZANGIEF_1400MR,
  COACHING_BISON_1500MR_RYU,
  COACHING_BISON_1500MR_CAMMY,
  COACHING_BISON_DIA5,
  COACHING_RYU_DIA4,
  COACHING_MARISA_1500MR,
  COACHING_KEN_1300MR,
  COACHING_KEN_1700MR,
  COACHING_BISON_1500MR,
  COACHING_BISON_1600MR,
  COACHING_ED_1500MR,
  COACHING_GUILE_DIA5,
  COACHING_CHUNLI_PLAT3,
  COACHING_AKUMA_1200MR,
  COACHING_CHUNLI_1600MR,
  RYU_NEUTRAL_STRATEGY,
  ZANGIEF_NEUTRAL_STRATEGY,
  CHUNLI_COMPLETE_GUIDE,
  RYU_COMPLETE_GUIDE,
  ...SF6_COMMON_TECHNIQUES_ARTICLES,
];

export function parseArticleTitle(title: string): { mainTitle: string; subtitle?: string } {
  const parts = title.split('｜');
  if (parts.length > 1) {
    return { mainTitle: parts[0].trim(), subtitle: parts.slice(1).join('｜').trim() };
  }
  return { mainTitle: title };
}

export {
  AKUMA_NEUTRAL_STRATEGY,
  RYU_NEUTRAL_STRATEGY,
  ZANGIEF_NEUTRAL_STRATEGY,
  ELENA_COMPLETE_GUIDE,
  ELENA_CLASSIC_COMPLETE_GUIDE,
  ELENA_MODERN_COMPLETE_GUIDE,
  CHUNLI_COMPLETE_GUIDE,
  CHUNLI_CLASSIC_COMPLETE_GUIDE,
};


