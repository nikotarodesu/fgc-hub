export interface Article {
  id: string;
  slug: string;
  title: string;
  summary: string;
  game: 'sf6' | 'sf7' | 'general';
  category: 'character' | 'system' | 'mindset' | 'news';
  character?: string;
  characterColor?: string;
  author: {
    name: string;
    avatar: string;
    mrRating?: string;
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
      combo?: {
        name: string;
        recipe: string;
        damage: string;
        driveGauge: string;
        situation: string;
        note: string;
      }[];
    }[];
  };
  paidContent: {
    sections: {
      title: string;
      body: string;
      tips: string[];
      secretSetplay?: {
        name: string;
        input: string;
        frameAdvantage: string;
        explanation: string;
      }[];
    }[];
  };
}

export const CHARACTERS_SF6 = [
  { id: 'gouki', name: '豪鬼 (Akuma)', type: '攻撃特化', color: 'from-red-600 to-amber-700' },
  { id: 'ken', name: 'ケン (Ken)', type: '万能攻勢', color: 'from-orange-500 to-red-600' },
  { id: 'ryu', name: 'リュウ (Ryu)', type: '胴着道', color: 'from-blue-600 to-indigo-800' },
  { id: 'luke', name: 'ルーク (Luke)', type: '制空・中距離', color: 'from-amber-500 to-yellow-600' },
  { id: 'cammy', name: 'キャミィ (Cammy)', type: '高速ラッシュ', color: 'from-emerald-600 to-teal-800' },
  { id: 'chunli', name: '春麗 (Chun-Li)', type: '変幻自在', color: 'from-cyan-500 to-blue-600' },
  { id: 'ed', name: 'エド (Ed)', type: 'アウトボクシング', color: 'from-purple-600 to-indigo-700' },
  { id: 'mai', name: '不知火舞 (Mai)', type: 'DLC第2弾', color: 'from-pink-600 to-rose-700' },
];

export const ARTICLES_DATA: Article[] = [
  {
    id: 'sf6-gouki-master-guide',
    slug: 'sf6-gouki-mr2000-guide',
    title: '【スト6】豪鬼でMR2000到達するための実践的立ち回りと「百鬼・朧」の暴れ潰し完全マニュアル',
    summary: 'noteで大反響だった豪鬼徹底攻略の決定版。体力9000の脆さを圧倒的制圧力でカバーする立ち回り理論と、相手の防御を完全崩壊させるセットプレイを網羅。',
    game: 'sf6',
    category: 'character',
    character: '豪鬼 (Akuma)',
    characterColor: 'from-red-600 to-amber-700',
    author: {
      name: 'nikotaro',
      avatar: '🥋',
      mrRating: 'MR 2080 (豪鬼/ケン)',
      bio: 'スト6最高MR2080。note有料記事で総計1000部突破。スト7以降も格闘ゲーム攻略を追求し続ける攻略執筆者。',
    },
    publishedAt: '2026-08-15',
    updatedAt: '2026-09-01',
    readTime: '12分',
    isPaid: true,
    price: 680,
    tags: ['スト6', '豪鬼', 'MR2000', '確定反撃', 'セットプレイ'],
    likesCount: 342,
    freeContent: {
      intro: 'こんにちは、nikotaroです。スト6において豪鬼は体力9000というリスクを背負いながらも、全キャラ最高峰の攻撃力・弾速・弾道変化を持っています。しかし、MR1600〜1800帯で「火力を出そうとして突っ込んで逆転負けする」プレイヤーが非常に多いのが実情です。本記事では、無駄な被弾をゼロにし、相手に地獄の読み合いを押し付ける理論を解説します。',
      sections: [
        {
          title: '第1章：豪鬼の基本哲学「歩きと豪波動拳の制圧ライン」',
          body: '豪鬼で最も重要なのは「前ジャンプや百鬼襲に頼らない地上の制圧」です。相手が動けない間合い（中足の外側）で弱豪波動拳を撒き、ジャンプしてきた相手には昇龍拳、パリィしてきた相手には歩きラッシュを通す。この3すくみを徹底するだけで勝率は跳ね上がります。',
          combo: [
            {
              name: '基本中央ノーゲージコンボ',
              recipe: '屈中P > 立中P > 弱竜巻斬空脚 > 強昇龍拳',
              damage: '2420',
              driveGauge: '0ゲージ消費',
              situation: '立ち回りでの差し返し・ヒット確認',
              note: 'ヒット確認が極めて容易で起き攻め状況も良好。まずは手癖にすべき生命線。',
            },
            {
              name: '画面端インパクト返し最大コンボ',
              recipe: '強P(パニカン) > 前大P > 中斬空波動拳 > 屈中P > 強竜巻 > 強昇龍拳',
              damage: '3850',
              driveGauge: '0ゲージ消費',
              situation: '端でドライブインパクトを返した時',
              note: 'SAを使わずに約4割を削り取る豪鬼屈指の高効率ルート。',
            },
          ],
        },
        {
          title: '第2章：相手のドライブゲージを削り殺す「灼火の削り圧力」',
          body: 'スト6の現行環境では、相手をバーンアウトさせた時点で勝率は85%を超えます。豪鬼の強灼火はどうガードされても隙が少なく、ドライブラッシュ止めとしても機能します。中距離での牽制に強灼火を混ぜることで、相手のDゲージは瞬く間に枯渇します。',
        },
      ],
    },
    paidContent: {
      sections: [
        {
          title: '【有料限定】第3章：相手の防御を完全破壊する「朧・打撃の二択詐欺飛びセットプレイ」',
          body: 'ここからが本note・独自サイト限定の核心です。画面端でのコンボ終了後、最速前ステップから特定の弱攻撃空振りを挟むことで、**相手の無敵OD昇龍をガードしつつ、パリィ・コパ暴れにはコマ投げ「朧」または下段が確定するフレーム完璧なセットプレイ**が存在します。',
          tips: [
            '端・強昇龍拳締め後は「前ステップ > 立弱K空振り」でジャスト+42F消費。',
            '42F消費からの前ジャンプ攻撃は相手のOD無敵技（1F〜発生技）を完全詐欺（ガード可能）。',
            '相手がガードを固めた瞬間にコマンド投げ「朧」が100%回避不能で炸裂する。',
          ],
          secretSetplay: [
            {
              name: '完全詐欺飛び 朧セットアップ',
              input: '端 強昇龍 > 前ステ > 立弱K空振り > 前J大P > (着地) 弱朧',
              frameAdvantage: '+42F 詐欺飛び成立',
              explanation: 'リバーサルOD昇龍は着地ガードが間に合いパニカンフルコン。パリィ入力に対しては朧がパニカンで3600ダメージ。相手は完全に詰みます。',
            },
            {
              name: 'ドライブリバーサル狩り自動仕込み',
              input: '屈中K > OD豪波動 > パリィボタン一瞬押し',
              frameAdvantage: 'ガード時 -3F (反撃なし)',
              explanation: '相手が画面端で嫌がって撃ってくるDリバを自動でガード・反撃できる超高等テクニック。',
            },
          ],
        },
        {
          title: '【有料限定】第4章：トッププロ対策（対ケン・ルーク・キャミィ戦のMR別勝率改善法）',
          body: 'MR1900以上のプロ・猛者プレイヤーとの対戦において、キャラ別の微細な間合い管理とファジーコパ潰しのタイミングを徹底解説します。',
          tips: [
            '対ケン：迅雷脚の初段ガード後の最速OD昇龍ファジー潰し',
            '対キャミィ：フーリガンの軌道変化に対する斬空波動拳の迎撃高度',
            '対ルーク：中足ラッシュに対する置き技のフレーム有利差計算',
          ],
        },
      ],
    },
  },
  {
    id: 'fighting-game-mental-mindset',
    slug: 'fgc-mental-and-growth-mindset',
    title: '【格ゲー共通上達論】スト6でもスト7でも一生使える「ランクマ連敗の泥沼から脱出する思考法」',
    summary: 'ゲームタイトルが変わっても色褪せない、対戦格闘ゲームで勝ち続けるためのメンタルコントロールと客観的リプレイ分析のフレームワーク。',
    game: 'general',
    category: 'mindset',
    author: {
      name: 'nikotaro',
      avatar: '🥋',
      mrRating: 'MR 2080',
      bio: 'スト6最高MR2080。note有料記事で総計1000部突破。',
    },
    publishedAt: '2026-08-28',
    updatedAt: '2026-08-28',
    readTime: '8分',
    isPaid: false,
    tags: ['格ゲー上達論', 'メンタル', 'ランクマ', '初心者向け', 'スト6'],
    likesCount: 512,
    freeContent: {
      intro: '格闘ゲームで最も辛いのは「練習しているのに勝てない」「ランクマでLP/MRが急降下してコントローラーを投げたくなる」瞬間です。これはあなたの才能の問題ではなく、「対戦中の認知負荷」と「課題設定の方法」に原因があります。本作スト6はもちろん、今後出るストリートファイター7や他タイトルでも共通するメンタル上達理論をお伝えします。',
      sections: [
        {
          title: '1. 「勝敗」ではなく「決めた行動ができたか」を評価指標にする',
          body: '試合の勝敗は相手のキャラ相性や運、噛み合いにも左右されます。「勝った＝正解」「負けた＝間違い」と考えると脳は疲弊します。「今日は対空昇龍を3回出す」「中足ラッシュの確認を意識する」など、自分がコントロールできる行動だけを目標に設定しましょう。',
        },
        {
          title: '2. 3連敗したら必ず席を立つ「ティルト防止ルール」',
          body: '感情が高ぶった状態（ティルト）では、前ジャンプやインパクトのボタンを無意識に連打するようになります。3連敗した時点で一旦トレモに行くか、水分補給をするルーティンを徹底しましょう。',
        },
      ],
    },
    paidContent: {
      sections: [],
    },
  },
  {
    id: 'sf7-future-prediction-prep',
    slug: 'sf7-evolution-and-drive-system-future',
    title: '【スト7展望・考察】次回作で生きるスト6のプレイスキルと、ドメイン＆コミュニティの未来',
    summary: 'ストリートファイター7を見据えた長期的な格ゲープレイヤーの立ち位置。システムが変わっても通用する「間合い」「差し返し」「ファジー」の普遍的スキルを整理。',
    game: 'sf7',
    category: 'news',
    author: {
      name: 'nikotaro',
      avatar: '🥋',
      mrRating: 'MR 2080',
      bio: 'スト6最高MR2080。note有料記事で総計1000部突破。',
    },
    publishedAt: '2026-09-05',
    updatedAt: '2026-09-05',
    readTime: '6分',
    isPaid: false,
    tags: ['スト7', '考察', '格ゲーの未来', 'システム論'],
    likesCount: 189,
    freeContent: {
      intro: 'ストリートファイターシリーズは4、5、6と進化を遂げてきました。システムやゲージ構造は変化しますが、トッププレイヤーが常に勝ち続けられる理由は「不変のファンダメンタルズ（基礎技術）」を磨いているからです。本サイトでは、スト6の現役攻略はもちろん、将来のスト7発売時にも最速でトップティアの攻略情報をお届けできるよう設計しています。',
      sections: [
        {
          title: 'スト4・スト5からスト6へ引き継がれたもの、スト7へ残るもの',
          body: 'ヒット確認、差し返し、起き攻めのフレーム計算、相手の癖のプロファイリング。これらはゲームタイトルが変わっても100%転用できます。当メディアでは、単なるコンボ暗記ではなく「なぜその選択肢が強いのか」の原理原則を発信し続けます。',
        },
      ],
    },
    paidContent: {
      sections: [],
    },
  },
];
