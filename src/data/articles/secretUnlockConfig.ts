export interface CharacterSecretUnlockConfig {
  characterSlug: string;
  sectionMatcher: (title: string) => boolean;
  keywordMatcher: (text: string) => boolean;
  requiredTaps: number;
  timeWindowMs: number;
  toastMessage: string;
}

export const CHARACTER_SECRET_UNLOCKS: CharacterSecretUnlockConfig[] = [
  {
    characterSlug: 'ryu',
    // ④ 対空について
    sectionMatcher: (title: string) => title.includes('対空'),
    // クラシック: 「● 昇竜」、モダン: 「● 強昇竜（前＋SP）」のいずれにもマッチ
    keywordMatcher: (text: string) => text.includes('昇竜'),
    requiredTaps: 5,
    timeWindowMs: 3000,
    toastMessage: 'シークレット解放（note購入者特典）: 有料コンテンツを開放しました！',
  },
  // 今後他のキャラクター記事（キャミィ、豪鬼等）が追加された場合もここに条件を追記するだけで反映可能です
];

export function getSecretUnlockConfig(slug: string): CharacterSecretUnlockConfig | undefined {
  if (!slug) return undefined;
  return CHARACTER_SECRET_UNLOCKS.find((cfg) => slug.includes(cfg.characterSlug));
}
