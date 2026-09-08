export interface Article {
  id: string;
  slug: string;
  title: string;
  summary: string;
  game: 'sf6' | 'general';
  category: 'character' | 'system' | 'mindset' | 'coaching';
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
  bio: 'スト6全キャラ1800MR以上。note有料記事で総計1,000部突破。実戦添削コーチングや勝率直結の攻略メソッドを発信中。',
  xUrl: 'https://x.com/nikotarosun',
  xHandle: '@nikotarosun',
};

// 攻略記事データ一覧（ユーザー様による記事追加用）
export const ARTICLES_DATA: Article[] = [];
