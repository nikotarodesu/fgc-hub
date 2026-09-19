/**
 * スト6 エレナの立ち回りで振る技（通常技・特殊技）の重要フレームデータ
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

export const ELENA_NEUTRAL_MOVES_FRAME_DATA: Record<string, KeyFrameInfo> = {
  // 中K: 発生6F、ガード+1F、キャンセル可能
  'move_mk': {
    moveKey: 'mk',
    name: '中K',
    items: [
      { label: '発生', value: '6F', variant: 'neutral' },
      { label: 'ガード', value: '+1F', variant: 'positive' },
      { label: '特殊', value: 'キャンセル可能', variant: 'positive' },
    ],
  },
  // 下中P: 発生8F、ガード-4F
  'move_2mp': {
    moveKey: '2mp',
    name: '下中P',
    items: [
      { label: '発生', value: '8F', variant: 'neutral' },
      { label: 'ガード', value: '-4F', variant: 'negative' },
    ],
  },
  // 下中K: 発生9F、ガード-3F（単体）
  'move_2mk': {
    moveKey: '2mk',
    name: '下中K',
    items: [
      { label: '発生', value: '9F', variant: 'neutral' },
      { label: 'ガード', value: '-3F', variant: 'negative' },
    ],
  },
  // 大K: 発生12F、パニカン時は吹き飛びダウン（ガード指定なし）
  'move_hk': {
    moveKey: 'hk',
    name: '大K',
    items: [
      { label: '発生', value: '12F', variant: 'neutral' },
      { label: 'パニカン', value: '吹き飛びダウン', variant: 'accent' },
    ],
  },
  // 大P: 発生12F、パニカン時は吹き飛びダウン（ガード指定なし）
  'move_hp': {
    moveKey: 'hp',
    name: '大P',
    items: [
      { label: '発生', value: '12F', variant: 'neutral' },
      { label: 'パニカン', value: '吹き飛びダウン', variant: 'accent' },
    ],
  },
  // 前大P: 発生16F、ガード-4F（単体）
  'move_6hp': {
    moveKey: '6hp',
    name: '前大P',
    items: [
      { label: '発生', value: '16F', variant: 'neutral' },
      { label: 'ガード', value: '-4F', variant: 'negative' },
    ],
  },
};

/**
 * エレナの「立ち回りで振る技」にのみマッチする高精度マッチャー
 * 指定外の技や推測による補完は一切行わず、指示書の6つの技のみを対象とする
 */
export function findElenaNeutralMoveKeyFrame(cleanText: string): KeyFrameInfo | null {
  const t = cleanText.normalize('NFKC').toLowerCase().replace(/\s+/g, '');

  // 必殺技・SA等は一切マッチさせない
  if (
    t.includes('ライノ') ||
    t.includes('昇竜') ||
    t.includes('昇龍') ||
    t.includes('コロ') ||
    t.includes('スピン') ||
    t.includes('ムーン') ||
    t.includes('sa')
  ) {
    return null;
  }

  // 前大P / 前大PTC（前大P単体の値として16F・-4Fを表示）
  if (t.includes('前大p') || t === '前大ptc') {
    return ELENA_NEUTRAL_MOVES_FRAME_DATA['move_6hp'];
  }

  // 下中P
  if (t.includes('下中p') || t === '2mp') {
    return ELENA_NEUTRAL_MOVES_FRAME_DATA['move_2mp'];
  }

  // 下中K / 下中KTC（下中K単体の値として9F・-3Fを表示）
  if (t.includes('下中k') || t === '2mk') {
    return ELENA_NEUTRAL_MOVES_FRAME_DATA['move_2mk'];
  }

  // 中K
  if (t === '中k' || t === 'mk' || t === '中k(立中k)') {
    return ELENA_NEUTRAL_MOVES_FRAME_DATA['move_mk'];
  }

  // 大K
  if (t === '大k' || t === 'hk' || t === '強k') {
    return ELENA_NEUTRAL_MOVES_FRAME_DATA['move_hk'];
  }

  // 大P
  if (t === '大p' || t === 'hp' || t === '強p') {
    return ELENA_NEUTRAL_MOVES_FRAME_DATA['move_hp'];
  }

  return null;
}
