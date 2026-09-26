export interface CharacterSecretUnlockConfig {
  characterSlug: string;
  sectionMatcher: (title: string) => boolean;
  keywordMatcher: (text: string) => boolean;
  requiredTaps: number;
  timeWindowMs: number;
  toastMessage: string;
}

// イースターエッグ（対空技5回タップによるシークレット解放システム）は廃止されました
export const CHARACTER_SECRET_UNLOCKS: CharacterSecretUnlockConfig[] = [];

export function getSecretUnlockConfig(slug: string): CharacterSecretUnlockConfig | undefined {
  if (!slug) return undefined;
  return CHARACTER_SECRET_UNLOCKS.find((cfg) => slug.includes(cfg.characterSlug));
}
