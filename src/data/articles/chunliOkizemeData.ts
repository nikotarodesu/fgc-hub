// 春麗の⑤起き攻めフレーム連動データ
// セクション「⑤ 起き攻めフレーム」に記載されている画面中央・画面端・フレーム特徴の完全データ

import type { FrameOkizemeData } from './ryuOkizemeData';

export const CHUNLI_OKIZEME_DATA: Record<string, FrameOkizemeData> = {
  '+20': {
    frameKey: '+20',
    displayFrame: '+20F',
    corner: {
      finishingMoves: ['ODスピバ>弱百烈>SA1〆', '強百烈>SA1〆', 'ODスピバ>中百烈>SA1〆'],
      options: [
        '下弱K（F消費）: +5F有利（シミー不可）',
        '中P（F消費）: +2F有利（シミー可能）',
        '弱P（F消費）> 中P（持続）: ヒット時+9F / ガード時+4F（引大Pまで入れ込んで良い）',
      ],
    },
  },

  '+21': {
    frameKey: '+21',
    displayFrame: '+21F',
    center: {
      finishingMoves: ['弱覇山〆'],
      options: [
        '前ステ+2 > 投げ（弱覇山が先端当ての場合、投げが届かない）',
        '前ステ+2 > 中P（弱覇山が先端当ての場合、中P後の下中Pが届かない。中P後は弱Kにするのが安定）',
        'ラッシュ引大P（持続）: ヒット時+12F / ガード時+6F',
        'ラッシュ弱P（F消費）: -3F（相手の無敵技をガードできるが投げ間合い内なので注意）',
      ],
    },
  },

  '+28': {
    frameKey: '+28',
    displayFrame: '+28F',
    center: {
      finishingMoves: ['前大K（Pc）>ラッシュ下大P>構え中K>強スピバ〆', 'SA2>J中P>強スピバ〆'],
      options: [
        '前ステで有利を取りつつラッシュ起き攻め',
        '歩きで間合いを詰めて攻め継続',
      ],
    },
    corner: {
      finishingMoves: ['下大P>構え大K>OD空中百烈>OD天昇〆', '下大P>強百烈>鷹爪脚>OD百烈>OD天昇〆'],
      options: [
        '前ステで有利継続',
        '小技重ねや投げの択',
      ],
    },
  },

  '+29': {
    frameKey: '+29',
    displayFrame: '+29F',
    center: {
      finishingMoves: ['OD百烈>派生〆', '弱P×3>OD百烈>派生〆', 'インパクトパニカン>3大K>弱スピバ〆'],
      options: [
        '前ステ > 下大Pが埋まる',
        'ラッシュ投げ、3大Pが埋まる',
      ],
    },
    corner: {
      finishingMoves: ['OD百烈>派生〆'],
      options: [
        '引大P（F消費）: +2F有利（シミー不可）',
        '前ステ > 引大P（持続）: ヒット時+8F / ガード時+2F',
        '下中P（F消費）> 中P（持続）: ヒット時+8F / ガード時+3F',
        '弱K（F消費）> OD弾（持続）: ヒット時+7F / ガード時+2F',
      ],
    },
  },

  '+30': {
    frameKey: '+30',
    displayFrame: '+30F',
    center: {
      finishingMoves: ['ODスピバ>弱スピバ〆'],
      options: [
        '前ステ > 歩きで起き攻め（投げが埋まる）',
        '前ステ > 引大P（持続当て）: ヒット時+9F / ガード時+3F',
        'ラッシュ下大P（持続当て）: ヒット時+6F / ガード時+2F（ヒット確認が難しいので下中Pまで入れ込む）',
      ],
    },
    corner: {
      finishingMoves: ['ODスピバ>弱スピバ〆', 'OD天昇〆'],
      options: [
        '下中K（F消費）: +2F有利（シミー可能）',
        '下中P（F消費）: +9F/+4F',
        '前ステ > 引大P（持続）: ヒット時+9F / ガード時+3F',
        'ラッシュ3大Pが埋まる',
      ],
    },
  },

  '+33': {
    frameKey: '+33',
    displayFrame: '+33F',
    center: {
      finishingMoves: [
        '弱スピバ〆',
        '強スピバ〆',
        '下弱P×3>弱スピバ〆',
        '中P>下中P>強スピバ〆',
        '下中K（Pc）>強スピバ〆',
        'ラッシュ3大P>中P>下中P>強スピバ〆',
        'J大P（Pc）>大K>構え中K>強スピバ〆',
        '大P（Pc）>構え中K>強スピバ〆',
        '下大P（Pc）>構え中K>強スピバ〆',
        '下中P（Pc）>構え中K>強スピバ〆',
        '大K>構え中K>強スピバ〆',
        'ラッシュ引大P（Pc）>強覇山>下中P>強スピバ〆',
      ],
      options: [
        '前ステ > 歩きで起き攻め（投げが埋まる）',
        'ラッシュ起き攻め',
        'ラッシュ3大P（持続）: ヒット時+8F / ガード時+4F（ガードされても下中Kが潰されない）',
        '強覇山（持続）: ヒット時+8F / ガード時+1F',
        '前ステ > 大P（持続）: ヒット時+4F / ガード時-1F',
      ],
    },
    corner: {
      finishingMoves: [
        '弱スピバ〆',
        '強スピバ〆',
        '中P>下中P>強スピバ〆',
        '大K>構え中K>OD弾>中P>下中P>強スピバ〆',
        'J大P>大K>構え中K>OD弾>中P>下中P>強スピバ〆',
      ],
      options: [
        '強覇山（持続）: ヒット時+8F / ガード時+1F',
        '下中K（F消費）: +5F有利（シミー可能）',
        '下中P（F消費）> 引大P（持続）: ヒット時+8F / ガード時+2F',
        '構え大Pが最速暴れと相打ちで+5以上になり【下弱P×2>弱スピバ】が繋がる',
      ],
    },
  },

  '+34': {
    frameKey: '+34',
    displayFrame: '+34F',
    center: {
      finishingMoves: [
        '中スピバ〆',
        '弱P（Ch）>下中K>中スピバ〆',
        'ラッシュ下中K>構え弱K>中スピバ〆',
        '前中P>キャンセル中P>引大P>構え弱K>中スピバ〆',
        '大P（Ch）>構え弱K>中スピバ〆',
        '下中P（Pc）>下中K>中スピバ〆',
      ],
      options: [
        '前ステ > 歩きで起き攻め（投げが埋まる）',
        'ラッシュ起き攻め',
        '前ステ > ラッシュ下弱K（持続）: ヒット時+5F / ガード時+3F',
        '前ステ > （相手が後ろ受身なら）前ジャンプJ中Kがめくりになる',
      ],
    },
    corner: {
      finishingMoves: [
        '中スピバ〆',
        '下弱K>下弱>弱K>OD弾>下中K>中スピバ〆',
      ],
      options: [
        '下中K（F消費）: +6F有利（シミー可能）',
        '下中P（F消費）> 引大P（持続）: ヒット時+9F / ガード時+3F',
        '弱P（F消費）> 弱弾（持続）: ヒット時+4F / ガード時+0F',
        '構え大Pが埋まる（OD弾まででヒット確認して下弱P>弱スピバに繋げる）',
        '下中P（F消費）> OD弾（持続）: ヒット時+6F / ガード時+1F',
        '前ステ > 弱P（F消費）: +2F有利',
      ],
    },
  },

  '+35': {
    frameKey: '+35',
    displayFrame: '+35F',
    corner: {
      finishingMoves: [
        'ODスピバ>弱百烈>強天昇〆',
        '下大P>強百烈>強天昇〆',
        'ラッシュ下大P>強百烈>ラッシュ下中P>強百烈>強天昇〆',
        'J大P>下大P>強百烈>強天昇〆',
        'SA2>J中P>強百烈>強天昇〆',
      ],
      options: [
        '投げ（F消費）: +5F有利（シミー不可）',
        '引中P（F消費）> 引大P（持続）: ヒット時+9F / ガード時+3F',
        '下中K（F消費）> 中P（持続）: ヒット時+9F / ガード時+4F',
        '前中P（F消費）> OD弾（持続）: ヒット時+6F / ガード時+1F',
        '構え大Pが埋まる',
      ],
    },
  },

  '+37': {
    frameKey: '+37',
    displayFrame: '+37F',
    center: {
      finishingMoves: [
        'ODスピバ>強天昇〆',
        '下弱K>下弱P>強天昇〆',
        '前大K（Pc）>引大P>構え中K>強天昇〆',
        'インパクトパニカン>3大K>ラッシュ下弱P>構え中K>強天昇〆',
      ],
      options: [
        '前ステ > 歩き起き攻め（投げは難しい）',
        'ラッシュ起き攻め',
        '中弾 > ラッシュ攻め',
        '強弾 > ラッシュ投げ（強弾が後ろ受身の相手の前で消えるのでパリィを釣れる）',
        '前ステ > ラッシュ中P（持続）: ヒット時+13F / ガード時+8F',
      ],
    },
    corner: {
      finishingMoves: [
        'ODスピバ>強天昇〆',
        '下弱K>下弱P>強天昇〆',
        '下弱K>弱P>強天昇〆',
        '前大K（Pc）>引大P>強百烈>強天昇〆',
        '引大P>強百烈>強天昇〆',
      ],
      options: [
        '前ステ > 弱P（F消費）: +5F有利（シミー不可）',
        '大足（F消費）: +4F有利（シミー不可）',
        '中K（F消費）> 引大P（持続）: ヒット時+9F / ガード時+3F',
        '投げ（F消費）> 中P（持続）: ヒット時+9F / ガード時+4F',
        '構え大Pが埋まる',
      ],
    },
  },

  '+45': {
    frameKey: '+45',
    displayFrame: '+45F',
    center: {
      finishingMoves: [
        '構え大K>鷹爪脚二段目>鷹嘴連拳〆',
        'ODスピバ>SA2>鷹爪脚二段目>鷹嘴連拳〆',
        'SA2>J中P>鷹爪脚二段目>鷹嘴連拳〆',
      ],
      options: [
        '中弾 > ラッシュ攻め',
        '強弾 > 前ステ×2 > 投げ（強弾が後ろ受身の相手の前で消えるのでパリィを釣れる）',
        '前ステ×2 > 投げ or シミー',
        '前ステ×2 > 引大P（持続）',
      ],
    },
    corner: {
      finishingMoves: [
        '構え大K>鷹爪脚二段目>鷹嘴連拳（高高度ヒット）',
        '強百烈>弱百烈〆',
        '下大P>強百烈>弱百烈〆',
      ],
      options: [
        '詐欺飛び（鷹爪脚を当てて跳ねた後にJ大K）',
        '下弱P > 下中K（F消費）: +4F有利（シミー可能）',
        '前ステ×2 > 中P（持続）: ヒット時+9F / ガード時+4F',
        '前ステ+26 > インパクト',
      ],
    },
  },

  '+46': {
    frameKey: '+46',
    displayFrame: '+46F',
    center: {
      finishingMoves: ['構え大K>鷹爪脚二段目>鷹嘴連拳〆'],
      options: [
        '中弾 > ラッシュ攻め',
        '強弾 > 前ステ×2 > 投げ',
        '前ステ×2 > 投げ or シミー',
        '前ステ×2 > 引大P（持続）',
      ],
    },
    corner: {
      finishingMoves: ['構え大K>鷹爪脚二段目>鷹嘴連拳（中高度ヒット）'],
      options: [
        '詐欺飛び（鷹爪脚が跳ねない）',
        '下弱P > 下中K（F消費）: +5F有利（シミー可能）',
        '大K（F消費）> 引大P（持続）: ヒット時+10F / ガード時+4F',
        '大K（F消費）> OD弾（持続）: ヒット時+6F / ガード時+1F',
        '引中P（F消費）> 中弾（持続）: ヒット時+8F / ガード時+4F',
      ],
    },
  },

  '+47': {
    frameKey: '+47',
    displayFrame: '+47F',
    center: {
      finishingMoves: ['構え大K>鷹爪脚二段目>鷹嘴連拳〆'],
      options: [
        '中弾 > ラッシュ攻め',
        '前ステ×2 > 投げ or シミー',
        '前ステ×2 > 引大P（持続）',
      ],
    },
    corner: {
      finishingMoves: [
        '構え大K>鷹爪脚二段目>鷹嘴連拳（低高度ヒット）',
        'ODスピバ>中百烈〆',
        '中P>下中P>中百烈〆',
      ],
      options: [
        '下弱K > 下中K（F消費）: +3F有利（シミー可能）',
        '前ステ×2 > 引大P（持続）: ヒット時+7F / ガード時+1F',
        '大K（F消費）> OD弾（持続）: ヒット時+8F / ガード時+3F',
        '下中P（F消費）+24 > インパクト',
        '引中P（F消費）> 中弾（持続）: ヒット時+9F / ガード時+5F',
      ],
    },
  },

  '+48': {
    frameKey: '+48',
    displayFrame: '+48F',
    center: {
      finishingMoves: [
        '下大K（Pc）',
        '構え大K>鷹爪脚二段目>鷹嘴連拳（最低空）〆',
      ],
      options: [
        '前ステ×2 > 引大P（持続）: ヒット時+8F / ガード時+2F（ヒット時は構え中Kが繋がる）',
        '前ステ > 下中P（F消費）> 中P（持続）: ヒット時+8F / ガード時+3F',
      ],
    },
  },
};

// 表記揺れ・範囲表記の正規化マップ
const FRAME_ALIAS_MAP: Record<string, string> = {
  '+45-47': '+45',
  '+45-48': '+45',
  '+46-47': '+46',
  '+40-47': '+47',
  '+42-43': '+47',
  '+40-44': '+45',
  '+35-36': '+35',
  '+27-28': '+28',
  '+24': '+20',
};

export function findChunliOkizemeData(rawStr: string): FrameOkizemeData | null {
  if (!rawStr) return null;
  // +37, （+37）, +45-47 等から "+XX" を抽出
  const cleaned = rawStr.replace(/[（\(\)）\sFフレーム約]/g, '').trim();

  if (CHUNLI_OKIZEME_DATA[cleaned]) {
    return CHUNLI_OKIZEME_DATA[cleaned];
  }

  // エイリアス・範囲表記の解決
  if (FRAME_ALIAS_MAP[cleaned] && CHUNLI_OKIZEME_DATA[FRAME_ALIAS_MAP[cleaned]]) {
    return CHUNLI_OKIZEME_DATA[FRAME_ALIAS_MAP[cleaned]];
  }

  // "+45-47" のような範囲の先頭数値で検索
  const matchRange = cleaned.match(/^(\+\d+)/);
  if (matchRange && CHUNLI_OKIZEME_DATA[matchRange[1]]) {
    return CHUNLI_OKIZEME_DATA[matchRange[1]];
  }

  return null;
}
