import { RYU_COMPLETE_GUIDE } from './articles/ryuCompleteGuide';
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
  { id: 'cammy', name: 'キャミィ (Cammy)', type: '高速ラッシュ', color: 'from-emerald-600 to-teal-800' },
  { id: 'ed', name: 'エド (Ed)', type: 'アウトボクシング', color: 'from-purple-600 to-indigo-700' },
  { id: 'mai', name: '不知火舞 (Mai)', type: 'DLC第2弾', color: 'from-pink-600 to-rose-700' },
];

// 攻略記事データ一覧
export const ARTICLES_DATA: Article[] = [
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
  {
    id: 'art-ryu-neutral-strategy',
    slug: 'ryu-neutral-strategy',
    title: 'リュウの立ち回り｜波動拳で反応を見て、判断を絞る',
    summary:
      '波動拳に対する相手の反応を観察し、警戒する行動を絞る立ち回りを解説。前進と待ちの切り替え、対空準備の考え方を整理したリュウ実戦ガイド。',
    game: 'sf6',
    category: 'neutral',
    character: 'リュウ',
    characterColor: 'from-blue-600 to-indigo-800',
    eyecatchImage: '/images/characters/ryu/sns.jpg',
    youtubeVideoId: '_n0stVxs_3s',
    author: AUTHOR_INFO,
    publishedAt: '2026-01-02',
    updatedAt: '2026-09-17',
    readTime: '5分',
    isPaid: false,
    tags: ['スト6', 'リュウ', '立ち回り', '波動拳', '対空', '上達論'],
    likesCount: 562,
    recommendedGearIds: ['razer-huntsman-v3-pro-mini', 'gaming-finger-sleeve'],
    freeContent: {
      intro:
        'リュウは「ベーシックな標準キャラ」「待って差し返すキャラ」「読み合いの教科書」と語られることが多いキャラクターです。これらの基礎的な要素と、実戦で「判断を減らす立ち回り」は決して矛盾せず、両立します。\n\nこの記事では、**「波動拳で相手の反応を観察し、警戒する行動を絞る立ち回り」**を解説します。これはリュウの唯一の正解や全対戦相手に通用する絶対の真理ではありませんが、対戦中に「次は何をすればいいか分からない」と迷ったときの強力な判断基準になります。\n\n【先に覚える3つの要点】\n1. 波動拳を撃つ前に、飛びや弾抜けのリスクを確認する\n2. 相手の反応を観察し、次に警戒する行動の優先度を決める\n3. 前進する時間と、止まって迎撃する時間を使い分ける',
      sections: [
        {
          title: 'はじめに：選択肢が多く、方針がないと迷いやすい',
          body:
            'リュウは初心者向けと言われることが多いキャラクターですが、実戦では「やることが多くて迷いやすい」と感じるプレイヤーも少なくありません。その理由はシンプルです。\n\n**「できることが多い」＝「対戦中に何を優先すべきか判断に迷う」**\n飛び道具、無敵対空、突進技、判定の強い通常技など、リュウは幅広い選択肢を持っています。しかし、方針がないまま対戦に臨むと、相手の動きすべてに対応しようとして判断が追いつかなくなります。\n\n大切なのは、技術を増やすことではなく、**「狙う行動を絞り、対戦中の脳の負荷を減らすこと」**です。まずは観察と判断の優先順位を決めることから始めましょう。',
        },
        {
          title: '1. 波動拳で相手の反応を観察する',
          diagramType: 'hadoken-flow',
          body:
            '波動拳には、直接ダメージを与えるだけでなく、ガード時に相手のドライブゲージを削る、空間を制限して前進を止めるなど、複数の重要な役割があります。\n\nそしてもう一つの大きな役割が、**「この距離で相手がどう動くか」を観察する**ことです。\n\n波動拳を見せたとき、相手の反応傾向は主に以下の4つに分かれます。\n\n・**前ジャンプが多い**：地上戦を嫌って飛び越えようとする傾向\n・**ガードして止まる**：慎重に様子を見ている傾向\n・**パリィが多い**：Dゲージの削りを防ごうとする傾向\n・**弾抜けを狙っている**：SAや弾抜け特殊技で反撃を狙う傾向\n\nここで重要なのは、**「観察できた反応傾向に合わせて、次に優先する行動を決める」**ことです。\n\n相手が飛ぶ傾向があるなら、次は撃たずに待って対空を準備する。ガードして止まるなら、波動拳を継続するか、歩いてラインを押し上げる選択肢が生まれます。\n\n※ただし、一度ガードしたからといって次もガードするとは限りません。一度の反応で相手を決めつけず、相手が対応を変えたらこちらも柔軟に判断を更新しましょう。',
        },
        {
          title: '2. 中距離で使う技と間合いの考え方',
          diagramType: 'distance-meter',
          body:
            '中距離は、リュウが**「波動拳と通常技を使い分ける間合い」**です。ただし、相手キャラクターのリーチや突進技、弾抜け技の有無によって、有効な中距離の位置は変化します。\n\n中距離では、相手も「前に出たいが波動拳が怖い」「技を振りたいが空振りが怖い」という心理になります。この間合いで機能しやすい技を整理しておきましょう。\n\n・**大P**：リーチが長く、相手の前進や牽制を止める置き技として機能。パニッシュカウンター時は大ダメージの起点になる\n・**下中K（中足）**：一歩踏み込んで下段を意識させる差し込み技。キャンセルラッシュを仕込むことでリターンを出せる\n・**中足刀**：相手の踏み込みに合わせて撃って前進を止めたり、ガードさせて相手のドライブゲージを削る技\n・**強波動（OD波動）**：相手の踏み込みに合わせて撃つことで、ジャンプを誘発できる技\n\n【実戦での使い方の注意点】\n中足刀は相手の前進止めやドライブゲージ削りとして有効ですが、空振り時の隙やジャンプ攻撃に噛み合わないよう、間合いを見極めて振ることが大切です。\n\nまた、強波動（OD波動）は相手の踏み込みに合わせて撃つことで「地上で近づけない相手にジャンプを選択させる」強力な布石になります。撃った直後は相手が飛んでくる可能性を意識し、対空で迎撃する準備を怠らないようにしましょう。',
        },
        {
          title: '立ち回りの整理枠組み：三すくみの考え方',
          diagramType: 'neutral-triangle',
          body:
            '格闘ゲームの立ち回りを整理する枠組みとして「置き・差し込み・差し返し」の三すくみがあります。\n\nスト6における代表的な具体例として、以下の関係で整理できます。\n\n・**置き技**：ルークの下中P、ジェイミーの中K、リリーの引大Pなど（前に歩いてくる相手やラッシュの出端を止める）\n・**差し込み**：下中K（中足）、ラッシュ弱P、リュウの前大Pなど（じっと待っている相手の懐に踏み込む）\n・**差し返し**：大P、下大K（大足）、大Kなど（相手が空振った技の隙を殴り返す）\n\nただし、これはあくまで状況を整理するためのフレームワークです。実戦では互いの間合い、技のリーチや硬直、入力のタイミングによって結果が大きく変わるため、固定的なじゃんけんとして過信せず、間合い管理の目安として使いましょう。',
        },
        {
          title: '3. 前に出る場面と止まる場面',
          body:
            '立ち回りでは、「前に歩いてラインを押し上げる時間」と「足を止めて相手を迎撃する時間」の切り替えが勝率を分けます。\n\n状況に応じた行動の目的を整理しておきましょう。\n\n・**相手が後退する** → 前に歩いて使えるスペースを広げる（置き技や突進を警戒しつつ歩きガード）\n・**相手が前進を止める牽制を振る** → 一度止まり、間合いを調整して空振りを狙う\n・**相手の飛びを強く警戒したい** → 自分の技振りを減らし、足を止めて対空を構える\n・**体力不利で時間が少ない** → 待ち続けても状況が好転しないため、リスクを背負って前進・仕掛けを検討する\n・**相手を画面端へ追い込んだ** → 接近しすぎて入れ替え飛びなどを許さないよう、攻める距離と脱出を止める距離を使い分ける\n\n「何もしない（静止する）」という時間は、ただサボっているのではなく、**「何を待つかが決まっているとき」**に初めて有効な戦術になります。目的を持って立ち止まりましょう。\n\nまた、画面端へ追い込むことは強力な方針ですが、画面端でも相手にはガード、パリィ、無敵技、ジャンプなどの選択肢が残ります。体力差や残り時間、相手のゲージ量に応じて、リスク管理を怠らないことが大切です。',
        },
        {
          title: '4. 警戒する対象を絞って対空を準備する',
          body:
            'リュウの昇龍拳による対空は、「超人的な反射神経」だけで落としているわけではありません。実戦では**「飛びへの警戒を強めたい状況」**を意識して対空を準備しています。\n\n例えば、以下のような場面では相手が前ジャンプを選びやすくなります。\n\n・波動拳を何度か見せた直後\n・中距離でこちらの前歩きがピタッと止まった瞬間\n・投げ抜けや技の接触で距離が離れた直後\n\n地上戦のプレッシャーがかかると、相手は「この間合いから抜け出したい」と感じて飛びを選択したくなります。\n\nすべての状況で均等に対空を見るのではなく、「相手が飛びたくなる状況」を把握し、その瞬間だけ対空の意識配分を大きく引き上げる。この**「警戒対象の絞り込み」**こそが、対空が安定する本質です。',
        },
        {
          title: '5. 実戦における判断の流れ（仮想対戦例）',
          diagramType: 'mindset-comparison',
          body:
            '実戦で判断をどのように再現するか、仮想の対戦ラウンドの流れで確認してみましょう。\n\n【ラウンド序盤：観察のフェーズ】\n開幕の中距離で、まずは飛びや弾抜けのリスクを確認しながら波動拳を1〜2発撃ちます。相手が前ジャンプするのか、ガードして止まるのか、パリィするのかを観察します。\n\n【ラウンド中盤：優先度の設定】\n・相手が前ジャンプを選びやすい傾向なら、波動拳を撃つのを止め、足を止めて対空（昇龍拳や下大P）を構えます。\n・相手がガードを固めて止まる傾向なら、歩いてラインを押し上げ、大Pの置きや下中Kの差し込みでプレッシャーをかけます。\n\n【ラウンド終盤：対応の更新】\n相手がこちらの対空待ちを見て飛ばなくなったり、逆に前歩きを見て技を振るようになったら、観察した内容を更新し、再び次の行動を選択します。\n\nこのように、「打つ手を固定する」のではなく、「相手の傾向を見て次の警戒順位を決める」というサイクルを回すことで、迷いのない立ち回りが実現します。',
        },
        {
          title: 'まとめ：次の対戦で試すこと・関連記事',
          body:
            'リュウの立ち回りを整理するポイントは以下の3点です。\n\n1. **波動拳はダメージだけでなく、相手の反応傾向を観察する手段として活用する**\n2. **中距離では技の成立条件を把握し、前進する場面と止まって待つ場面を使い分ける**\n3. **あらゆる行動に同時対応しようとせず、警戒する対象を絞って迎撃の精度を高める**\n\n【次の1戦ですぐ試せるアクション】\nまずは次の対戦で、**「中距離で波動拳を撃ったあと、相手がどう動くかを1回だけ意識して見る」**ことから試してみてください。相手の傾向が見えるだけで、次に構えるべき行動がぐっと明確になります。\n\n立ち回りの基本方針が掴めたら、実戦向けの厳選コンボや有利フレーム別の起き攻めを網羅した完全攻略記事もぜひ参考にしてください。',
        },
      ],
    },
    paidContent: {
      sections: [],
    },
  },
  RYU_COMPLETE_GUIDE,
];
