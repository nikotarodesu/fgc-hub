import cammyJson from './characters/cammy.json';
import { CharacterDataFile } from '@/types/sf6';

export interface CharacterDetail {
  slug: string;
  name: string;
  nameEn: string;
  archetype: string;
  description: string;
  strengths: string[];
  defaultHp: number;
  hasTool: boolean;
  comboCount: number;
  version?: string;
  updatedAt?: string;
}

// キャラクター別JSONデータ（完全分離されたデータストア）
export const SF6_CHARACTER_DATA: Record<string, CharacterDataFile> = {
  cammy: cammyJson as unknown as CharacterDataFile,
};

export const SF6_CHARACTERS: Record<string, CharacterDetail> = {
  cammy: {
    slug: 'cammy',
    name: cammyJson.name,
    nameEn: cammyJson.nameEn,
    archetype: cammyJson.archetype,
    description: cammyJson.description,
    strengths: cammyJson.strengths,
    defaultHp: cammyJson.defaultHp,
    hasTool: cammyJson.hasTool,
    comboCount: cammyJson.combos.length,
    version: cammyJson.version,
    updatedAt: cammyJson.updatedAt,
  },
  ryu: {
    slug: 'ryu',
    name: 'リュウ',
    nameEn: 'Ryu',
    archetype: '王道スタンダード・高火力波掌撃・電刃練気',
    description: '波動拳と昇龍拳の伝統的2大看板に加え、波掌撃による強固な連携とSA3を絡めた爆発的リーサル火力を誇る。',
    strengths: ['信頼の対空強昇龍拳', '電刃波掌撃による強力な固め', '中央・端を問わない高い単発火力'],
    defaultHp: 10000,
    hasTool: false,
    comboCount: 0,
    version: 'Ver.1.05',
    updatedAt: '2026-05-20',
  },
  akuma: {
    slug: 'akuma',
    name: '豪鬼',
    nameEn: 'Akuma',
    archetype: '超攻撃型グラップラー・斬空波動・瞬獄殺',
    description: '体力9000の代償に、空中斬空波動拳・百鬼襲・驚異的な崩し性能とコンボ火力を併せ持つ拳を極めし者。',
    strengths: ['斬空波動による飛び道具制圧', '多彩な百鬼襲派生', '一発逆転の瞬獄殺リーサル'],
    defaultHp: 9000,
    hasTool: false,
    comboCount: 0,
    version: 'Ver.1.05',
    updatedAt: '2026-05-20',
  },
  chunli: {
    slug: 'chunli',
    name: '春麗',
    nameEn: 'Chun-Li',
    archetype: 'リーチ制圧・行雲流水構え・万能オールラウンダー',
    description: '長い牽制技と気功拳、行雲流水による超多彩なコンボルートを持つ。当サイトにて実戦立ち回り解説も公開中。',
    strengths: ['追突拳・立ち強Pの圧倒的リーチ', '気功拳盾の前進', '画面端での空中百裂脚セットプレイ'],
    defaultHp: 10000,
    hasTool: false,
    comboCount: 0,
    version: 'Ver.1.05',
    updatedAt: '2026-05-20',
  },
  ken: {
    slug: 'ken',
    name: 'ケン',
    nameEn: 'Ken',
    archetype: '猛攻アグレッシブ・迅雷脚・龍尾脚・端運搬',
    description: '奮迅脚からのコンボ運搬力と迅雷脚による下段/中段の鋭い崩しで、一瞬で相手を画面端へ追いやる。',
    strengths: ['奮迅脚コンボによる凄まじい端到達率', '迅雷脚の派生崩し', 'ガードさせて有利な龍尾脚'],
    defaultHp: 10000,
    hasTool: false,
    comboCount: 0,
    version: 'Ver.1.05',
    updatedAt: '2026-05-20',
  },
  luke: {
    slug: 'luke',
    name: 'ルーク',
    nameEn: 'Luke',
    archetype: '超高弾速サンドブラスト・強力ジャストフラッシュ',
    description: '隙の少ない通常技とフラッシュナックルによる高い火力・運び性能を兼ね備える新世代の主人公。',
    strengths: ['最速級の弾速を誇るサンドブラスト', 'ジャスト入力による火力アップ', '強力なしゃがみ中Pと立ち強P'],
    defaultHp: 10000,
    hasTool: false,
    comboCount: 0,
    version: 'Ver.1.05',
    updatedAt: '2026-05-20',
  },
};
