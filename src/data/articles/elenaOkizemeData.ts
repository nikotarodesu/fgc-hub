// エレナの起き攻めフレーム連動データ
// セクション「⑥ 起き攻めフレーム」に記載されている画面中央・画面端・フレーム特徴の完全データ
// ※他キャラクターのデータや推測による補完は一切行わない

import type { FrameOkizemeData } from './ryuOkizemeData';

export const ELENA_OKIZEME_DATA: Record<string, FrameOkizemeData> = {
  '+22': {
    frameKey: '+22',
    displayFrame: '+22F',
    corner: {
      finishingMoves: ['強スピン>弱ライノ>強昇竜〆'],
      options: [
        '弱K（F消費）: +4F有利（シミー可能）',
        '下弱P（F消費）> 中K（持続）: ヒット時+8F / ガード時+4F',
      ],
    },
  },

  '+24': {
    frameKey: '+24',
    displayFrame: '+24F',
    center: {
      finishingMoves: ['SA3〆'],
      options: [
        '強コロ弱派生が埋まる',
        'ラッシュ大K（持続）: ヒット時+8F / ガード時+2F',
      ],
    },
  },

  '+25': {
    frameKey: '+25',
    displayFrame: '+25F',
    corner: {
      finishingMoves: [
        '強スピン>弱ライノ>中昇竜〆',
        '大PTC（Pc）>ラッシュ下中P>中スピン弱コロ中派生>弱ライノ>中昇竜〆',
      ],
      options: [
        'インパクトが埋まる',
        '前ステ: +5F有利',
        '弱K（F消費）> 中K（持続）: ヒット時+7F / ガード時+3F',
        '下弱K（F消費）> 下中K（持続）: ヒット時+6F / ガード時-1F',
      ],
    },
  },

  '+29': {
    frameKey: '+29',
    displayFrame: '+29F',
    center: {
      finishingMoves: ['CA〆'],
      options: [
        '強コロディレイ弱派生が埋まる',
        'ラッシュ中Pが埋まる',
      ],
    },
  },

  '+34': {
    frameKey: '+34',
    displayFrame: '+34F',
    center: {
      finishingMoves: ['弱スピン〆'],
      options: [
        '基本的にラッシュで起き攻めする',
      ],
    },
    corner: {
      finishingMoves: ['弱スピン〆'],
      options: [
        '中K（F消費）> 下中K（持続）: ヒット時+6F / ガード時-1F',
        '中P（F消費）> 中K（持続）: ヒット時+7F / ガード時+3F',
        '下中P（F消費）: +4F有利（シミー可能）',
      ],
    },
  },

  '+36': {
    frameKey: '+36',
    displayFrame: '+36F',
    center: {
      finishingMoves: [
        '大PTC（Pc）>ラッシュ下中P>中スピン弱コロ中派生>中ライノ〆',
        '中KTC>ODスピン弱コロ中派生>中ライノ〆',
      ],
      options: [
        '前ステ > ラッシュ下中K: 最速暴れと相打ち+12Fからコンボ可能',
        '弱コロ強派生が埋まる（カウンターヒット時+4Fでコンボ可能）',
      ],
    },
    corner: {
      finishingMoves: [
        '強スピン>弱ライノ>弱昇竜〆',
        '大PTC（Pc）>ラッシュ下中P>中スピン弱コロ中派生>中ライノ〆',
        '大PTC（Pc）>ラッシュ下中P>中スピン弱コロ中派生>弱ライノ>弱昇竜〆',
      ],
      options: [
        '下弱K（F消費）> 中段（持続）: ヒット時+4F / ガード時+0F',
        '下弱K > 下弱P（F消費）> 下中K（持続）: ヒット時+6F / ガード時-1F',
        '下弱K > 弱P（F消費）: +5F有利',
        '弱コロ > 中K（持続）: ヒット時+8F / ガード時+4F',
      ],
    },
  },

  '+37': {
    frameKey: '+37',
    displayFrame: '+37F',
    center: {
      finishingMoves: [
        '強スピン>中ライノ〆',
        '大PTC>下大K',
        '大K（Pc）>下大K',
      ],
      options: [
        '前ステ > ラッシュ下中Kが埋まる',
        '弱コロ中コロ弱派生: 最速暴れと相打ち+8Fからコンボ可能',
      ],
    },
  },

  '+38': {
    frameKey: '+38',
    displayFrame: '+38F',
    center: {
      finishingMoves: ['強スピン>弱ライノ〆'],
      options: [
        '弱コロ中コロ弱派生が埋まる',
        '前ステ > ラッシュ下中Kが埋まる',
      ],
    },
  },

  '+39': {
    frameKey: '+39',
    displayFrame: '+39F',
    center: {
      finishingMoves: [
        '弱・中ライノ〆',
        '大PTC（Pc）>ラッシュ下中P>中スピン弱コロ中派生>弱ライノ',
        'ムーン派生後（OD以外）',
      ],
      options: [
        '基本的にラッシュで起き攻めする',
        '強コロ: +1F有利',
        '中コロ: +3F有利',
        '弱コロ強派生（持続）: ヒット時+4F / ガード時-1F',
      ],
    },
    corner: {
      finishingMoves: [
        '弱・中ライノ〆',
        '大PTC（Pc）>ラッシュ下中P>中スピン弱コロ中派生>弱ライノ〆',
        'ムーン派生後（OD以外）',
      ],
      options: [
        '弱コロ強派生（持続）: ヒット時+4F / ガード時-1F',
        '下中K（F消費）> 下中K（持続）: ヒット時+6F / ガード時-1F',
        '弱K（F消費）> 中段（持続）: ヒット時+4F / ガード時+0F',
        '大K（F消費）: +5F有利',
      ],
    },
  },

  '+40': {
    frameKey: '+40',
    displayFrame: '+40F',
    center: {
      finishingMoves: ['前大PTC〆', '強ライノ〆'],
      options: [
        '前ステ > ラッシュ下中K（持続）: ヒット時+9F / ガード時+2F',
        '強コロ強派生が埋まる（ヒット時+2F / ガード時-3F）',
        '弱コロコロ弱派生が埋まる',
      ],
    },
    corner: {
      finishingMoves: [
        '前大PTC〆',
        '強ライノ〆',
        '強スピン>弱ライノ〆',
        'インパクトパニカン>大PTC>ラッシュ下大P>中スピン弱コロ中派生>弱ライノ〆',
      ],
      options: [
        '大P（F消費）: +5F有利',
        '下弱P（F消費）: +26F有利からインパクトが埋まる',
        '大K（F消費）> 中K（持続）: ヒット時+6F / ガード時+2F',
      ],
    },
  },

  '+42': {
    frameKey: '+42',
    displayFrame: '+42F',
    center: {
      finishingMoves: ['ODムーン派生後', '大PTC>ODライノ〆'],
      options: [
        '（ODムーン派生後のみ）詐欺飛び',
        '（ODムーン派生後のみ）強コロ（F消費）+4F有利（シミー可能）',
        '強コロ強派生（持続）: ヒット時+4F / ガード時-1F',
        '強コロコロ弱派生が埋まる',
        '（画面端付近）中コロ > 中K（持続）: ヒット時+6F / ガード時+2F',
        '（画面端付近）前ステ×2: +2F有利',
      ],
    },
    corner: {
      finishingMoves: ['中スピン〆', 'ODムーン派生後'],
      options: [
        '大K（F消費）+8F > 中K（持続）: ヒット時+8F / ガード時+4F',
        '弱P（F消費）: +26F有利（インパクトが埋まる）',
        '強コロ強派生（持続）: ヒット時+4F / ガード時-1F',
        '強コロ（F消費）: +4F有利',
      ],
    },
  },

  '+43': {
    frameKey: '+43',
    displayFrame: '+43F',
    center: {
      finishingMoves: ['中KTC>中スピン〆'],
      options: [
        '前ステ×2: +3F有利',
        '弱コロコロ弱派生が埋まる（インパクト返しが間に合う）',
      ],
    },
  },
};

/**
 * エレナのフレーム文字列から起き攻めデータを取得
 */
export function findElenaOkizemeData(rawStr: string): FrameOkizemeData | null {
  const match = rawStr.match(/\+(\d+)/);
  if (!match) return null;
  const key = `+${match[1]}`;
  return ELENA_OKIZEME_DATA[key] || null;
}
