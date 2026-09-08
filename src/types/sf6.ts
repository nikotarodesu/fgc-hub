/**
 * ストリートファイター6 攻略データベース 型定義
 * リレーショナル構造で技・コンボ・起き攻めデータを管理
 */

// 技属性
export type MoveAttribute = 'low' | 'mid' | 'high' | 'throw';

// 技（Move）データ
export interface Move {
  id: string;
  name: string;
  commandText: string;
  startup: number;           // 発生F
  active?: number;           // 持続F
  recovery?: number;         // 硬直F
  onBlock?: number;          // ガード硬直差F (例: -4)
  onHit?: number;            // ヒット硬直差F (例: +2)
  attribute: MoveAttribute;  // 技属性（下段・中段・上段・投げ）
  damage: number;            // 単体ダメージ
  driveCost?: number;        // OD技の場合の消費Dゲージ
  notes?: string;
}

// 起き攻めタグの種類
export type OkizemeType = 'safe_jump' | 'shimmy' | 'strike_throw' | 'carry' | 'advantage' | 'lethal';

// 起き攻めタグ定義
export interface OkizemeTag {
  id: string;
  name: string;              // 表示名（例: "+42F詐欺飛び", "シミー可能"）
  type: OkizemeType;
  badgeBg: string;           // Tailwind背景色クラス
  badgeText: string;         // Tailwindテキスト色クラス
  badgeBorder: string;       // Tailwind枠線色クラス
  description: string;       // タグの解説・戦術的意義
}

// 始動技カテゴリ
export type StarterCategory = 
  | 'light'            // 小技始動 (2LP, 2LK等)
  | 'medium'           // 中攻撃始動 (2MK, 5MP等)
  | 'heavy'            // 強攻撃始動 (5HP, 5HK等)
  | 'punish_counter'   // パニカン始動 (確反大ダメージ)
  | 'anti_air'         // 対空始動
  | 'drive_impact'     // ドライブインパクト始動
  | 'od_special';      // OD必殺技始動

// 画面位置
export type ScreenPosition = 'any' | 'center' | 'corner' | 'to_corner';

// 操作タイプ
export type ControlType = 'both' | 'classic' | 'modern';

// 難易度
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

// コンボ（Combo）データ
export interface Combo {
  id: string;
  characterId: string;
  title: string;                    // コンボの通称・用途
  starterCategory: StarterCategory; // 始動カテゴリ
  starterMoveName: string;          // 始動技の名称 (例: "しゃがみ中K")
  recipeText: string;               // 表記テキスト (例: "2MK > DR > 4HP > 236HK")
  damage: number;                   // 合計ダメージ
  driveCost: number;                // 消費Dゲージ (0〜6)
  saCost: 0 | 1 | 2 | 3;            // 消費SAゲージ (0〜3)
  position: ScreenPosition;         // 画面位置
  knockdownAdvantageF: number;      // ダウン後の状況 (+F)
  okizemeTagIds: string[];          // 付与された起き攻めタグのID一覧
  okizemeDetail?: string;           // 起き攻めの具体的な入力手順・セットプレイ
  controlType: ControlType;         // 操作タイプ
  difficulty: DifficultyLevel;      // 難易度
  tips?: string;                    // 失敗しやすいポイントや注意点
  videoTimestamp?: string;          // 将来のYouTubeタイムスタンプ連携用
}

// キャラクター定義
export interface Character {
  id: string;
  name: string;
  nameEn: string;
  icon: string;
  defaultHp: number;
}

// フィルター条件
export interface ComboFilterCriteria {
  characterId: string;
  controlType: 'all' | 'classic' | 'modern';
  position: 'all' | 'center' | 'corner';
  starterCategory: 'all' | StarterCategory;
  maxDriveCost: number;             // 許容する最大消費Dゲージ (0〜6)
  maxSaCost: number;                // 許容する最大消費SAゲージ (0〜3)
  difficulty: 'all' | DifficultyLevel;
  selectedTagId?: string;           // 選択された起き攻めタグ
  targetLethalHp?: number;          // リーサル計算用の相手残り体力
}

// キャラクター別JSONデータファイルの型定義 (data/sf6/characters/*.json)
export interface CharacterDataFile {
  slug: string;
  name: string;
  nameEn: string;
  version: string;                  // ゲームバージョン (例: "Ver.1.05 (Season 2)")
  updatedAt: string;                // 最終更新日 (例: "2026-05-20")
  archetype: string;                // キャラクター特性
  description: string;              // 立ち回り概要
  strengths: string[];              // 主な強みリスト
  defaultHp: number;                // 基準体力 (10000 / 豪鬼は9000等)
  hasTool: boolean;
  moves: Move[];                    // 技データリスト
  combos: Combo[];                  // コンボデータリスト
}
