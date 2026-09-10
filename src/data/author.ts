export interface AuthorInfo {
  name: string;
  avatar: string;
  mrRating: string;
  award?: string;
  noteFollowers?: string;
  noteSales?: string;
  xFollowers?: string;
  youtubeSubscribers?: string;
  bio: string;
  xUrl?: string;
  xHandle?: string;
  youtubeUrl?: string;
  noteUrl?: string;
  championshipArticles?: { title: string; url: string }[];
}

export const AUTHOR_INFO: AuthorInfo = {
  name: 'にこ太郎',
  avatar: '/icon.png',
  mrRating: '全キャラ1800MR以上',
  award: 'note大会 2連覇達成 🏆',
  noteFollowers: '2,500人',
  noteSales: '累計2,000部突破',
  xFollowers: '2,100人',
  youtubeSubscribers: '1,000人',
  bio: 'スト6全キャラ1800MR以上。note大会で2連覇を達成🏆。note有料記事は累計2,000部突破・フォロワー2,500人。勝率に直結する立ち回り理論やコンボ・起き攻めを発信中。',
  xUrl: 'https://x.com/nikotarosun',
  xHandle: '@nikotarosun',
  youtubeUrl: 'https://www.youtube.com/@nikotarosun',
  noteUrl: 'https://note.com/nikotarosun',
  championshipArticles: [
    {
      title: 'note大会 優勝記事①',
      url: 'https://note.com/nikotarosun/n/n081a67f53aa8',
    },
    {
      title: 'note大会 優勝記事②',
      url: 'https://note.com/nikotarosun/n/nbaad82557ae9',
    },
  ],
};
