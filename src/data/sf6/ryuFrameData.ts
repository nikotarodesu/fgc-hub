/**
 * スト6 リュウの立ち回りで振る技（通常技・特殊技）の重要フレームデータ
 * ユーザー指定の重要値のみをシンプルに表示するためのデータセット
 */

export interface FrameItem {
  label: string;
  value: string;
  variant?: 'positive' | 'negative' | 'neutral' | 'accent';
}

export interface KeyFrameInfo {
  moveKey: string;
  name: string;
  items: FrameItem[];
}

export const RYU_NEUTRAL_MOVES_FRAME_DATA: Record<string, KeyFrameInfo> = {
  // 弱P: 発生4F、カウンターヒット+6
  'lp': {
    moveKey: 'lp',
    name: '弱P',
    items: [
      { label: '発生', value: '4F', variant: 'neutral' },
      { label: 'カウンターヒット', value: '+6F', variant: 'positive' },
    ],
  },
  // 弱K: 発生5F
  'lk': {
    moveKey: 'lk',
    name: '弱K',
    items: [
      { label: '発生', value: '5F', variant: 'neutral' },
    ],
  },
  // 中P: 発生6F、持続6-9F
  'mp': {
    moveKey: 'mp',
    name: '中P',
    items: [
      { label: '発生', value: '6F', variant: 'neutral' },
      { label: '持続', value: '6-9F', variant: 'neutral' },
    ],
  },
  // 下中P: 発生6F、ガード＋０
  '2mp': {
    moveKey: '2mp',
    name: '下中P',
    items: [
      { label: '発生', value: '6F', variant: 'neutral' },
      { label: 'ガード', value: '+0F', variant: 'positive' },
    ],
  },
  // 中K: 発生9F、ガード-4F、キャンセルが効かない
  'mk': {
    moveKey: 'mk',
    name: '中K',
    items: [
      { label: '発生', value: '9F', variant: 'neutral' },
      { label: 'ガード', value: '-4F', variant: 'negative' },
      { label: 'キャンセル', value: '効かない', variant: 'neutral' },
    ],
  },
  // 下中K: 発生8F、ガード-6F
  '2mk': {
    moveKey: '2mk',
    name: '下中K (中足)',
    items: [
      { label: '発生', value: '8F', variant: 'neutral' },
      { label: 'ガード', value: '-6F', variant: 'negative' },
    ],
  },
  // 大P: 発生10F、ガード-2F
  'hp': {
    moveKey: 'hp',
    name: '大P',
    items: [
      { label: '発生', value: '10F', variant: 'neutral' },
      { label: 'ガード', value: '-2F', variant: 'neutral' },
    ],
  },
  // 前大P（通称大ゴス）: 発生20F、ヒット＋６、カウンター＋８、パニカン＋１０、ガード＋３投げ間合い
  '6hp': {
    moveKey: '6hp',
    name: '前大P (大ゴス)',
    items: [
      { label: '発生', value: '20F', variant: 'neutral' },
      { label: 'ガード', value: '+3F (投げ間合い)', variant: 'positive' },
      { label: 'ヒット', value: '+6F', variant: 'positive' },
      { label: 'カウンター', value: '+8F', variant: 'positive' },
      { label: 'パニカン', value: '+10F', variant: 'accent' },
    ],
  },
  // 大K: 発生12F、パニカンで膝崩れ
  'hk': {
    moveKey: 'hk',
    name: '大K',
    items: [
      { label: '発生', value: '12F', variant: 'neutral' },
      { label: 'パニカン', value: '膝崩れ', variant: 'accent' },
    ],
  },
  // 下大K（通称大足）: 発生9F、ガードでー12F
  '2hk': {
    moveKey: '2hk',
    name: '下大K (大足)',
    items: [
      { label: '発生', value: '9F', variant: 'neutral' },
      { label: 'ガード', value: '-12F', variant: 'negative' },
    ],
  },
  // 前大K: 発生16F、ガードー4F
  '6hk': {
    moveKey: '6hk',
    name: '前大K',
    items: [
      { label: '発生', value: '16F', variant: 'neutral' },
      { label: 'ガード', value: '-4F', variant: 'negative' },
    ],
  },
};

/**
 * ②「立ち回りで振る技」の通常技・特殊技にのみマッチし、必殺技は除外する高精度マッチャー
 */
export function findNeutralMoveKeyFrame(cleanText: string): KeyFrameInfo | null {
  const t = cleanText.toLowerCase().replace(/\s+/g, '');

  // 必殺技（足刀、波動、昇竜、竜巻、波掌など）は一切マッチさせない
  if (
    t.includes('足刀') ||
    t.includes('波動') ||
    t.includes('昇竜') ||
    t.includes('昇龍') ||
    t.includes('竜巻') ||
    t.includes('波掌') ||
    t.includes('電刃')
  ) {
    return null;
  }

  // 1. 前大P / 大ゴス / A大 (モダン) / 6hp
  if (t === '前大p' || t.includes('大ゴス') || t === 'a大' || t === '6hp') {
    return RYU_NEUTRAL_MOVES_FRAME_DATA['6hp'];
  }

  // 2. 前大K / 前大 (モダン) / 6hk
  if (t === '前大k' || t === '前大' || t === '6hk') {
    return RYU_NEUTRAL_MOVES_FRAME_DATA['6hk'];
  }

  // 3. 下大K / 大足 / 2hk (例: 大足（3大）)
  if (t.includes('下大k') || t.includes('大足') || t === '2hk') {
    return RYU_NEUTRAL_MOVES_FRAME_DATA['2hk'];
  }

  // 4. 大K / 5hk
  if (t === '大k' || t === '5hk') {
    return RYU_NEUTRAL_MOVES_FRAME_DATA['hk'];
  }

  // 5. 大P / 大 (モダン) / 5hp
  if (t === '大p' || t === '大' || t === '5hp') {
    return RYU_NEUTRAL_MOVES_FRAME_DATA['hp'];
  }

  // 6. 下中K / 中足 / 2mk (例: 中足（下中）)
  if (t.includes('下中k') || t.includes('中足') || t === '2mk') {
    return RYU_NEUTRAL_MOVES_FRAME_DATA['2mk'];
  }

  // 7. 下中P / A中 (モダン) / 2mp
  if (t.includes('下中p') || t === 'a中' || t === '2mp') {
    return RYU_NEUTRAL_MOVES_FRAME_DATA['2mp'];
  }

  // 8. 中K / 5mk
  if (t === '中k' || t === '5mk') {
    return RYU_NEUTRAL_MOVES_FRAME_DATA['mk'];
  }

  // 9. 中P / 中 (モダン) / 5mp
  if (t === '中p' || t === '中' || t === '5mp') {
    return RYU_NEUTRAL_MOVES_FRAME_DATA['mp'];
  }

  // 10. 弱K / A弱 (モダン) / 5lk
  if (t === '弱k' || t === 'a弱' || t === '5lk') {
    return RYU_NEUTRAL_MOVES_FRAME_DATA['lk'];
  }

  // 11. 弱P / 弱 (モダン) / 5lp
  if (t === '弱p' || t === '弱' || t === '5lp') {
    return RYU_NEUTRAL_MOVES_FRAME_DATA['lp'];
  }

  return null;
}
