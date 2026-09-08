export interface GameInfo {
  id: string;
  name: string;
  shortName: string;
  slug: string;
  color: string;
  isActive: boolean;
  description: string;
}

export const SUPPORTED_GAMES: GameInfo[] = [
  {
    id: 'sf6',
    name: 'STREET FIGHTER 6',
    shortName: 'スト6',
    slug: 'sf6',
    color: '#00a3c4',
    isActive: true,
    description: 'カプコン公認MRシステム対応。全キャラ1800MR達成者による徹底攻略・コンボDB。',
  },
  {
    id: 'tekken8',
    name: 'TEKKEN 8',
    shortName: '鉄拳8',
    slug: 'tekken8',
    color: '#e11d48',
    isActive: false,
    description: '3D格闘の最高峰。ヒートシステム・確定反撃・壁攻め攻略（近日公開予定）。',
  },
  {
    id: '2xko',
    name: '2XKO (Project L)',
    shortName: '2XKO',
    slug: '2xko',
    color: '#8b5cf6',
    isActive: false,
    description: 'Riot Games発のタッグ格闘ゲーム。アシスト連携・フューズ戦略（リリース後最速対応予定）。',
  },
];
