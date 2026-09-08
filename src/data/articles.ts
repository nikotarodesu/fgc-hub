import { RYU_COMPLETE_GUIDE } from './articles/ryuCompleteGuide';

export interface ArticleVariant {
  label: string;
  badge: string;
  intro: string;
  sections: Article['freeContent']['sections'];
  paidSections: Article['paidContent']['sections'];
}

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
  author: {
    name: string;
    avatar: string;
    mrRating: string;
    bio: string;
  };
  publishedAt: string;
  updatedAt: string;
  readTime: string;
  isPaid: boolean;
  price?: number;
  tags: string[];
  likesCount: number;
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
      diagramType?: 'hadoken-flow' | 'distance-meter' | 'mindset-comparison';
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
    sections: {
      title: string;
      body: string;
      image?: {
        src: string;
        alt: string;
        caption?: string;
      };
      diagramType?: 'hadoken-flow' | 'distance-meter' | 'mindset-comparison';
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

export const CHARACTERS_SF6 = [
  { id: 'chunli', name: '春麗 (Chun-Li)', type: '変幻自在', color: 'from-cyan-500 to-blue-600' },
  { id: 'gouki', name: '豪鬼 (Akuma)', type: '攻撃特化', color: 'from-red-600 to-amber-700' },
  { id: 'ken', name: 'ケン (Ken)', type: '万能攻勢', color: 'from-orange-500 to-red-600' },
  { id: 'ryu', name: 'リュウ (Ryu)', type: '胴着道', color: 'from-blue-600 to-indigo-800' },
  { id: 'luke', name: 'ルーク (Luke)', type: '制空・中距離', color: 'from-amber-500 to-yellow-600' },
  { id: 'cammy', name: 'キャミィ (Cammy)', type: '高速ラッシュ', color: 'from-emerald-600 to-teal-800' },
  { id: 'ed', name: 'エド (Ed)', type: 'アウトボクシング', color: 'from-purple-600 to-indigo-700' },
  { id: 'mai', name: '不知火舞 (Mai)', type: 'DLC第2弾', color: 'from-pink-600 to-rose-700' },
];

export const AUTHOR_INFO = {
  name: 'にこ太郎',
  avatar: '/icon.png',
  mrRating: '全キャラ1800MR以上',
  bio: 'スト6全キャラ1800MR以上。note有料記事で総計1,000部突破。勝率直結の攻略メソッドや立ち回り理論を発信中。',
  xUrl: 'https://x.com/nikotarosun',
  xHandle: '@nikotarosun',
};

// 攻略記事データ一覧
export const ARTICLES_DATA: Article[] = [
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
    youtubeVideoId: '_n0stVxs_3s',
    author: AUTHOR_INFO,
    publishedAt: '2026-01-02',
    updatedAt: '2026-09-08',
    readTime: '5分',
    isPaid: false,
    tags: ['スト6', 'リュウ', '立ち回り', '立ち回り考察', '波動拳', '対空', '上達論'],
    likesCount: 562,
    freeContent: {
      intro:
        '多くのプレイヤーが、リュウを「ベーシックな標準キャラ」「待って差し返すキャラ」「読み合いの教科書」と誤解しています。しかし、実戦における本質は全く違います。\n\nリュウは、**「自分の判断を減らすための設計完成度が極めて高いキャラ」**なのです。\n\nこの一点を軸に据えるだけで、立ち回りのすべてが驚くほどクリアに整理されます。',
      sections: [
        {
          title: 'はじめに：なぜリュウは「中級者が最も迷いやすいキャラ」なのか？',
          body:
            'リュウは初心者向けと言われることが多いキャラクターですが、実際には**中級者が最も迷いやすいキャラ**でもあります。\n\n理由は極めてシンプルです。\n\n**「何でもできる」＝「何をすればいいか分からない」**\n\n選択肢の多さは、実戦での強さには直結しません。むしろ対戦中に迷って判断を増やしてしまうことこそが、リュウの勝率を落としてしまう最大の原因なのです。\n\nリュウを強く動かす秘訣は、**「やることを極限まで削ること」**にあります。',
        },
        {
          title: '1. リュウの立ち回りのゴールとは何か？',
          body:
            'リュウの立ち回りにおける第一のゴールは、大ダメージを取ることでも、画面端へ一気に運ぶことでもありません。\n\nそれは、**「相手の選択肢が事前にほぼ読める状態」**を作ることです。\n\n相手を動かし、行動を限定させ、その結果として殴る。この流れが成立したとき、無理に読み合いをしなくてもダメージは**自然と発生**します。\n\nそして、この状態が最も分かりやすく完成する空間こそが**「画面端」**です。相手を画面端へ追い詰めることで、以下の状況が強制されます。\n\n・後退という選択肢が消え、距離調整ができなくなる\n・相手の行動が「前ジャンプ」「前進」「暴れ」の3つに収束する\n\n画面端とは、無理に読み合わなくても**「相手の選択肢削減が自動で発生する理想郷」**なのです。',
        },
        {
          title: '2. 波動拳は攻撃ではなく「質問」である',
          diagramType: 'hadoken-flow',
          body:
            '波動拳を「削り」や「ヒット狙い」として撃っている限り、立ち回りは決して安定しません。\n\n波動拳の本質は、**「この状況で、あなたは何をしますか？」**という質問を相手に投げかける行為にあります。\n\n質問に対する相手のリアクションは、ほぼ以下の3つに集約されます。\n\n・ジャンプする\n・ガードする\n・パリィする\n\nそして何より重要なのは、**「相手の回答を確認したうえで、こちらの次の行動を固定する」**ことです。相手の癖が判明すれば、立ち回りは複雑な読み合いからシンプルな「確認作業」へと変わります。',
        },
        {
          title: '3. 中距離でリュウが強い「本当の理由」',
          diagramType: 'distance-meter',
          body:
            'リュウの中距離戦は、技単体の判定が飛び抜けて強いわけではありません。\n**「相手が波動拳を警戒せざるを得ない距離だからこそ強い」**のです。\n\n相手は「前に出る」「技を振る」の両方にブレーキがかかり、間合いの外で技を空振りしやすくなります。\n\n・一歩踏み込んで**立ち強P（前大P）**で威圧\n・発生9Fの**しゃがみ強K（大足）**で空振りを差し返す\n・相手が下がれば安全に**「電刃錬気」**を溜める\n\n差し返しは反射神経ではなく、**「相手が技を振らざるを得ない状況」**を立ち回りで作ることで自然と成立します。',
        },
        {
          title: '4. リュウの対空が安定する理由：反応ではなく「事前の削り込み」',
          body:
            '昇龍拳による対空は、「天性の反射神経」で出していると思われがちですが、実際は全く異なります。\n\n・波動拳を見せた直後\n・中距離で歩きをピタッと止めた瞬間\n・投げ抜けに成功した直後\n\nこのような状況では、相手の苦し紛れの打開策は**ほぼ「前ジャンプ（またはラッシュ）」に1点収束**します。\n\nつまり昇龍拳は、見てから反応しているのではなく、**事前に相手の選択肢を削り落とした結果の「一点待ち」**なのです。\n\n対空が神がかって見える上級者も、実際には**「すでに対空しか見る必要がない状況」**を立ち回りの中で事前に仕組んでいます。',
        },
        {
          title: '5. 伸び悩むリュウがやってしまいがちな3大NG行動',
          diagramType: 'mindset-comparison',
          body:
            '勝率が伸び悩むリュウ使いの多くは、対戦中に「自分で処理する判断」を無駄に増やしてしまっています。\n\nリュウというキャラクターの真髄は**「判断を極限まで減らすこと」**にあります。まずは以下のNG行動を捨て、強いリュウの勝ち思考へと切り替えましょう。',
        },
        {
          title: '6. 強いリュウは「何もしない」を選んでいる',
          body:
            '強いリュウ使いの対戦リプレイを見ると、以下のような時間が非常に長く存在します。\n\n・じりじりと歩く\n・ピタッと止まる\n・あえて何もしない\n・最低限の波動拳牽制に留める\n\nしかし、これは決して消極的な受け身のプレイではありません。\n\n**「もう相手の選択肢は削り終えた」**という絶対の確信のもと、罠を張って静かに待っている状態なのです。\n\nその静寂とプレッシャーに耐えきれず、相手は自分から無理な飛びや大技を放ち、**自滅するように崩れていきます。**',
        },
        {
          title: 'おわりに：リュウは「選択肢の管理」で勝つキャラクターです',
          body:
            'まとめると、リュウの立ち回りの極意は以下の3点に集約されます。\n\n1. **勝負を決める主戦場は「中距離」**\n2. **波動拳を撃つタイミングと意図を徹底的に精査する**\n3. **自分の判断を増やす無駄な行動はすべて捨てる**\n\nリュウは、目まぐるしい反射神経や複雑な読み合いで勝つキャラではなく、**「選択肢の管理（マネジメント）」**で勝つキャラです。\n\n・自分の判断をシンプルに減らせる方\n・目的を一つに絞り込める方\n・「この状況ではこれを捨てる」と明確に割り切れる方\n\n詰将棋のように、美しい型を作ってから確実に白星を取りに行くのが好きな方にこそ、リュウは最高の相棒になります。だからこそスト6においても、リュウは常に**「強さの基準」**であり続けるのです。',
        },
      ],
    },
    paidContent: {
      sections: [],
    },
  },
  RYU_COMPLETE_GUIDE,
];
