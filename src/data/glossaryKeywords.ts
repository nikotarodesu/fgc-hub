export interface GlossaryKeywordEntry {
  keyword: string;
  termId: string;
  exactWord?: boolean; // アルファベット略称など、前後に英数字がない場合のみマッチさせるフラグ
}

// 優先順位が高い順（長い文字列・具体的な用語が先）に定義
export const GLOSSARY_KEYWORDS: GlossaryKeywordEntry[] = [
  // システム・固有アクション
  { keyword: 'キャンセルラッシュ', termId: 'drive-rush' },
  { keyword: 'ドライブラッシュ', termId: 'drive-rush' },
  { keyword: '生ラッシュ', termId: 'drive-rush' },
  { keyword: 'CR', termId: 'drive-rush', exactWord: true },

  { keyword: 'ドライブインパクト', termId: 'drive-impact' },
  { keyword: 'DI', termId: 'drive-impact', exactWord: true },

  { keyword: 'ジャストパリィ', termId: 'drive-parry' },
  { keyword: 'ドライブパリィ', termId: 'drive-parry' },

  { keyword: 'ドライブリバーサル', termId: 'drive-reversal' },
  { keyword: 'Dリバーサル', termId: 'drive-reversal' },

  { keyword: 'バーンアウト', termId: 'burnout' },
  { keyword: 'BO', termId: 'burnout', exactWord: true },

  { keyword: 'クリティカルアーツ', termId: 'super-art' },
  { keyword: 'スーパーアーツ', termId: 'super-art' },
  { keyword: 'CA', termId: 'super-art', exactWord: true },
  { keyword: 'SA', termId: 'super-art', exactWord: true },

  { keyword: 'オーバードライブ', termId: 'od-move' },
  { keyword: 'OD技', termId: 'od-move' },
  { keyword: 'OD', termId: 'od-move', exactWord: true },

  { keyword: 'パニッシュカウンター', termId: 'counter-hit' },
  { keyword: 'パニカン', termId: 'counter-hit' },
  { keyword: 'カウンターヒット', termId: 'counter-hit' },

  { keyword: '確定反撃', termId: 'punish' },
  { keyword: '確反', termId: 'punish' },

  { keyword: 'ヒット確認', termId: 'hit-confirm' },
  { keyword: '先行入力', termId: 'buffer' },
  { keyword: '仕込み', termId: 'buffer' },

  // 地上戦・立ち回り
  { keyword: '飛ばせて落とす', termId: 'zoning' },
  { keyword: '間合い管理', termId: 'spacing' },
  { keyword: '差し合い', termId: 'footsies' },
  { keyword: '差し返し', termId: 'whiff-punish' },
  { keyword: '置き技', termId: 'poking' },
  { keyword: '対空', termId: 'anti-air' },

  { keyword: '中足ラッシュ', termId: 'chuuashi' },
  { keyword: '中足', termId: 'chuuashi' },
  { keyword: '歩きガード', termId: 'walk-guard' },
  { keyword: 'ライン管理', termId: 'line' },
  { keyword: 'ライン戦', termId: 'line' },
  { keyword: 'ライン', termId: 'line' },
  { keyword: '位置入れ替え', termId: 'side-switch' },
  { keyword: '画面端', termId: 'corner' },
  { keyword: '鳥かご', termId: 'birdcage' },

  // 防御・切り返し
  { keyword: '遅らせグラップ', termId: 'delayed-tech' },
  { keyword: '遅らせグラ', termId: 'delayed-tech' },
  { keyword: 'ファジーガード', termId: 'fuzzy-guard' },
  { keyword: 'ファジー小技', termId: 'fuzzy-guard' },
  { keyword: 'ファジーコパン', termId: 'fuzzy-guard' },
  { keyword: 'ファジー', termId: 'fuzzy-guard' },
  { keyword: '無敵技', termId: 'invincible' },
  { keyword: 'めくり対空', termId: 'crossup-anti-air' },
  { keyword: '振り向き対空', termId: 'crossup-anti-air' },
  { keyword: 'リバーサル', termId: 'reversal' },
  { keyword: 'リバサ', termId: 'reversal' },
  { keyword: 'バックステップ', termId: 'backdash' },
  { keyword: 'バクステ', termId: 'backdash' },
  { keyword: '暴れ', termId: 'abare' },

  // 攻め・起き攻め
  { keyword: 'セットプレイ', termId: 'setplay' },
  { keyword: '詐欺飛び', termId: 'safe-jump' },
  { keyword: '安全飛び', termId: 'safe-jump' },
  { keyword: '持続当て', termId: 'meaty' },
  { keyword: '暴れ潰し', termId: 'frame-trap' },
  { keyword: 'シミー', termId: 'shimmy' },
  { keyword: 'コマンド投げ', termId: 'command-grab' },
  { keyword: 'コマ投げ', termId: 'command-grab' },
  { keyword: '起き攻め', termId: 'okizeme' },
  { keyword: 'めくり', termId: 'cross-up' },
  { keyword: '二択', termId: 'mixup' },
  { keyword: '削りダメージ', termId: 'chip-damage' },

  // 基本システム
  { keyword: 'フレーム', termId: 'frame' },
  { keyword: '発生', termId: 'startup' },
  { keyword: '硬直', termId: 'recovery' },
  { keyword: '有利', termId: 'advantage' },
  { keyword: '不利', termId: 'advantage' },

  // 俗語・スラング
  { keyword: '昇竜拳', termId: 'shoryuken' },
  { keyword: '昇竜', termId: 'shoryuken' },
  { keyword: 'ぶっぱ', termId: 'panashi' },
  { keyword: 'パナし', termId: 'panashi' },
  { keyword: 'わからせ', termId: 'wakarasu' },
  { keyword: '柔道', termId: 'judo' },
  { keyword: '目押し', termId: 'link' },
  { keyword: 'リーサル', termId: 'lethal' },
];
