import { RYU_COMPLETE_GUIDE } from './articles/ryuCompleteGuide';
import { COACHING_CHUNLI_1600MR } from './articles/coachingChunli1600mr';
import { COACHING_CHUNLI_PLAT3 } from './articles/coachingChunliPlat3';
import { COACHING_GUILE_DIA5 } from './articles/coachingGuileDia5';
import { COACHING_ED_1500MR } from './articles/coachingEd1500mr';
import { COACHING_AKUMA_1200MR } from './articles/coachingAkuma1200mr';

export interface ArticleVariant {
  label: string;
  badge: string;
  intro: string;
  sections: Article['freeContent']['sections'];
  paidSections: Article['paidContent']['sections'];
}

import { AuthorInfo, AUTHOR_INFO } from './author';
export type { AuthorInfo };
export { AUTHOR_INFO };

export interface Article {
  id: string;
  slug: string;
  title: string;
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
  freeContent: {
    intro: string;
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

// キャラクター名またはスラッグからスト6公式アイキャッチ画像を取得するヘルパー関数
export function getArticleEyecatch(article: Article): string {
  if (article.eyecatchImage) {
    return article.eyecatchImage;
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
  return '/images/characters/ryu/sns.jpg';
}

export const CHARACTERS_SF6 = [
  { id: 'chunli', name: '春麗 (Chun-Li)', type: '変幻自在', color: 'from-cyan-500 to-blue-600' },
  { id: 'guile', name: 'ガイル (Guile)', type: '鉄壁要塞', color: 'from-emerald-600 to-green-700' },
  { id: 'gouki', name: '豪鬼 (Akuma)', type: '攻撃特化', color: 'from-red-600 to-amber-700' },
  { id: 'ken', name: 'ケン (Ken)', type: '万能攻勢', color: 'from-orange-500 to-red-600' },
  { id: 'ryu', name: 'リュウ (Ryu)', type: '胴着道', color: 'from-blue-600 to-indigo-800' },
  { id: 'luke', name: 'ルーク (Luke)', type: '制空・中距離', color: 'from-amber-500 to-yellow-600' },
  { id: 'cammy', name: 'キャミィ (Cammy)', type: '高速ラッシュ', color: 'from-emerald-600 to-teal-800' },
  { id: 'ed', name: 'エド (Ed)', type: 'アウトボクシング', color: 'from-purple-600 to-indigo-700' },
  { id: 'mai', name: '不知火舞 (Mai)', type: 'DLC第2弾', color: 'from-pink-600 to-rose-700' },
];

// 攻略記事データ一覧
export const ARTICLES_DATA: Article[] = [
  COACHING_ED_1500MR,
  COACHING_GUILE_DIA5,
  COACHING_CHUNLI_PLAT3,
  COACHING_AKUMA_1200MR,
  COACHING_CHUNLI_1600MR,
  {
    id: 'art-ryu-neutral-strategy',
    slug: 'ryu-neutral-strategy',
    title: 'リュウの立ち回り考察',
    summary:
      '「何でもできる」から迷うのではなく、「判断を減らす設計」として捉えることで勝率が劇的に安定する。波動拳の真の役割、中距離戦の制し方、対空が自然と落ちる仕組みを徹底解説します。',
    game: 'sf6',
    category: 'neutral',
    character: 'リュウ',
    characterColor: 'from-blue-600 to-indigo-800',
    eyecatchImage: '/images/characters/ryu/sns.jpg',
    youtubeVideoId: '_n0stVxs_3s',
    author: AUTHOR_INFO,
    publishedAt: '2026-01-02',
    updatedAt: '2026-09-08',
    readTime: '5分',
    isPaid: false,
    tags: ['スト6', 'リュウ', '立ち回り', '立ち回り考察', '波動拳', '対空', '上達論'],
    likesCount: 562,
    recommendedGearIds: ['razer-huntsman-v3-pro-mini', 'gaming-finger-sleeve'],
    freeContent: {
      intro:
        '多くのプレイヤーが、リュウを「ベーシックな標準キャラ」「待って差し返すキャラ」「読み合いの教科書」と誤解しています。しかし、実戦における本質は全く違います。\n\nリュウは、**「自分の判断を減らすための設計完成度が極めて高いキャラ」**なのです。\n\n「何でもできる」から迷うのではなく、「やるべきことを極限まで絞り込む」。この一点を軸に据えるだけで、立ち回りのすべてのピースが驚くほどクリアに噛み合い始めます。',
      sections: [
        {
          title: 'はじめに：なぜリュウは「中級者が最も迷いやすいキャラ」なのか？',
          body:
            'リュウは初心者向けと言われることが多いキャラクターですが、実際には**中級者が最も迷いやすいキャラ**でもあります。その理由は極めてシンプルです。\n\n**「何でもできる」＝「対戦中に何をすればいいか分からない」**\n飛び道具があり、無敵対空があり、前進技があり、判定の強い通常技もある。一見すると万能ですが、選択肢の多さは実戦での強さには直結しません。\n\nむしろ**「あれもこれもやろうとして判断を増やしてしまうこと」**こそが、リュウの勝率を落としてしまう最大の原因なのです。\n\nリュウを強く動かす秘訣は、技術を増やすことではなく、**「やることを極限まで削ること」**にあります。',
        },
        {
          title: '1. リュウの立ち回りのゴールとは何か？',
          diagramType: 'neutral-triangle',
          body:
            'リュウの立ち回りにおける第一のゴールは、大ダメージを取ることでも、派手なコンボを決めることでもありません。\n\nそれは、**「相手の選択肢が事前にほぼ読める状態」**を作ることです。\n\n無理に読み合いをして勝つのではなく、「相手を動かし、行動を限定させ、その結果として殴る」。この流れが成立したとき、ダメージは狙って取るものではなく**自然と発生するもの**へと変わります。\n\nそして、この状態が最も分かりやすく完成する空間こそが**「画面端」**です。\n\n相手を画面端へ追い詰めることで、以下の圧倒的な状況変化が強制されます。\n\n・相手の後退という選択肢が消え、間合いの調整ができなくなる\n・相手の打開策が「前ジャンプ」「前進（歩き/ラッシュ）」「苦し紛れの暴れ」の3つに収束する\n\n画面端とは、こちらが無理な読み合いをしなくても、**「相手の選択肢削減が自動で発生する理想郷」**なのです。立ち回りのあらゆる行動は、すべてこの画面端へ相手を追い込むために存在します。',
        },
        {
          title: '2. 波動拳は攻撃ではなく「質問」である',
          diagramType: 'hadoken-flow',
          body:
            '波動拳を「ダメージを取る攻撃」や「ただの削り」として撃っている限り、リュウの立ち回りは決して安定しません。\n\n波動拳の真の本質は、**「この距離で、あなたは何をしますか？」**という質問を相手に投げかける行為にあります。\n\n質問を投げかけられた相手のリアクションは、ほぼ以下の3つに集約されます。\n\n・**ジャンプで飛び越えようとする**（攻め気が強いプレイヤー）\n・**ガードを固めて歩みを止める**（守りが堅い慎重なプレイヤー）\n・**ドライブパリィで受け止める**（ゲージを節約したい中・上級者）\n\nそして何より重要なのは、**「相手の回答を確認したうえで、こちらの次の行動を固定する」**ことです。\n\n一度相手のリアクションの癖が分かれば、立ち回りは複雑な読み合いではなく、単純な「確認作業」へと変わります。相手が飛ぶなら次は昇龍拳を待つだけ。相手が固まるなら歩いて間合いを詰めるだけです。',
        },
        {
          title: '3. 中距離でリュウが強い「本当の理由」',
          diagramType: 'distance-meter',
          body:
            'リュウの中距離戦は、技単体のリーチや判定が他キャラより飛び抜けて優れているわけではありません。\n\nリュウが中距離で圧倒的に強い本当の理由は、**「相手が波動拳を警戒せざるを得ない間合いだから」**です。\n\n波動拳があるおかげで、相手は「前に出る」「技を振る」の両方に強いブレーキがかかります。その結果、相手は間合いの外で焦って技を空振りしやすくなるのです。\n\nこの心理状態を作ったうえで、以下の3つの選択肢を淡々と通していきます。\n\n・一歩踏み込んで**立ち強P（前大P）**で壁を作り、相手の前進を制圧する\n・相手が焦って空振った技を、**中足刀**で差し返す\n・相手が怖がって下がったら、安全に**「電刃錬気」**を溜めてプレッシャーを倍増させる\n\n差し返しは天性の反射神経でやるものではなく、**「相手が技を振らざるを得ない状況」**を立ち回りで先に作っておくことで、自然と成立します。',
        },
        {
          title: '4. リュウの対空が安定する理由',
          body:
            '上級者リュウの昇龍拳による対空は、「驚異的な反射神経」で落としていると思われがちですが、実態は少し違います。\n\n相手が飛んでくる瞬間には、必ず明確な「前兆」が存在します。\n\n・波動拳を見せた直後\n・中距離でこちらの歩きをピタッと止めた瞬間\n・投げ抜けに成功して距離が離れた直後\n\nこのような瞬間、相手が抱く感情は「この地上戦に付き合いたくない」「早くこの状況を打開したい」という焦りです。そしてその苦し紛れの打開策は、**ほぼ「前ジャンプ」または「生ラッシュ」の1点に収束**します。\n\nつまり昇龍拳とは、相手が飛んだのを見てから慌てて落としているのではなく、**事前に相手の選択肢を削り落とした結果の「一点待ち」**なのです。\n\n対空が神がかって見えるプレイヤーほど、実際には**「すでに対空しか見る必要がない状況」**を立ち回りの中で計算して仕組んでいます。',
        },
        {
          title: '5. 伸び悩むリュウがやってしまいがちな3大NG行動',
          diagramType: 'mindset-comparison',
          body:
            '勝率が伸び悩んでいるリュウ使いの多くは、対戦中に「自分で処理する判断」を無駄に増やしてしまっています。\n\nリュウというキャラクターの強みは、**「判断を極限まで減らした時の盤石さ」**にあります。\n\nまずは自分が無意識にやってしまっている以下のNG行動を見直し、強いリュウの勝ち思考へと切り替えていきましょう。',
        },
        {
          title: '6. 強いリュウは「何もしない」を選んでいる',
          body:
            '強いリュウ使いのリプレイをじっくり観察すると、驚くほど「何もしない時間」が長く存在することに気づきます。\n\n・じりじりと前後に歩く\n・間合いの外でピタッと静止する\n・無理に技を振らず、最低限の波動拳牽制に留める\n\nしかし、これは決して消極的な受け身のプレイではありません。\n\n**「もう相手の選択肢はすべて削り落とした」**という確信のもと、罠を張って相手の自滅を静かに待っている状態なのです。\n\n中距離で静止された相手は、静寂とプレッシャーに耐えきれなくなり、自分から苦し紛れの飛びや大技の空振りを晒します。\n\n強いリュウは、相手を無理に殴り倒しているのではなく、**「相手が勝手に崩れてくるのを拾っている」**のです。',
        },
        {
          title: 'まとめ',
          body:
            'リュウの立ち回りの極意をまとめると、以下の3原則に集約されます。\n\n1. **勝負を決める主戦場は「中距離」。波動拳のプレッシャーで相手の足を止める**\n2. **波動拳は当てる技ではなく、相手の癖を炙り出す「質問」として使う**\n3. **対戦中に自分の判断を増やす無駄な行動はすべて捨て、事前に選択肢を絞り込む**\n\nリュウは、目まぐるしい指先の操作スピードや複雑な読み合いのセンスで勝つキャラではありません。\n\n相手の行動を制限し、自分の処理をシンプルにする**「選択肢の管理（マネジメント）」**で勝つキャラクターです。\n\n・自分の判断をシンプルに減らしたい方\n・目的を1つに絞って戦いたい方\n・詰将棋のように盤面を作って確実に白星を掴みたい方\n\nこのようなプレイヤーにとって、リュウはこれ以上ない最高の相棒になります。だからこそスト6においても、リュウは常に全キャラの**「強さの基準」**であり続けるのです。',
        },
      ],
    },
    paidContent: {
      sections: [],
    },
  },
  RYU_COMPLETE_GUIDE,
];
