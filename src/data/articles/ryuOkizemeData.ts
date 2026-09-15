// リュウの⑤起き攻めフレーム連動データ
// セクション「⑤ 起き攻めフレーム」に記載されている画面中央・画面端・フレーム特徴の完全データ

export interface OkizemeSituation {
  finishingMoves?: string[];
  options: string[];
}

export interface FrameOkizemeData {
  frameKey: string; // "+37", "+35", "+23" など
  displayFrame: string; // "+37F"
  center?: OkizemeSituation;
  corner?: OkizemeSituation;
  features?: string[]; // そのフレームの消費後特徴など
}

// フレームごとの詳細起き攻め連携データ
export const RYU_OKIZEME_DATA: Record<string, FrameOkizemeData> = {
  '+23': {
    frameKey: '+23',
    displayFrame: '+23F',
    center: {
      finishingMoves: ['中竜巻〆'],
      options: [
        'ラッシュ大P（持続当て）: ヒット時+11F / ガード時+5F',
        '前ステすると+4Fだが投げ間合い外なので基本はラッシュで起き攻め',
        '中足刀（持続当て）: ガード-2Fでインパクト返しが間に合う',
      ],
    },
    corner: {
      finishingMoves: ['中竜巻〆', 'OD竜巻>SA2〆', 'Dリバヒット後〆'],
      options: [
        'インパクト重ね（暴れ・ジャンプ不可の強力な重ね）',
        '弱弾: ヒット時+10F / ガード時+3F（発生7Fの引大Pが最速暴れと相打ち、ガード時OD波掌撃削り）',
        '前大P（持続当て）: ヒット時+8F / ガード時+5F',
        'ラッシュ大P（持続当て）: ヒット時+11F / ガード時+5F',
        '前ステ（フレーム消費）: +4F有利（打撃・投げの択）',
      ],
    },
    features: ['前ステで+4F', '弱弾設置やラッシュ大P持続が極めて強力'],
  },

  '+26': {
    frameKey: '+26',
    displayFrame: '+26F',
    corner: {
      finishingMoves: [
        '強波掌撃>前大K>OD竜巻>強昇竜〆',
        '弱P×n>OD竜巻>中昇竜>SA3（カス当たり）〆',
        '強波掌撃>SA2（最速）〆',
        'OD弾>SA1〆',
      ],
      options: [
        'インパクト重ねがビタで埋まる（ジャンプ・暴れ完全不可）',
        '強波掌撃が最速暴れと相打ち（+20F以上取れるため歩いて中P>引大P>強足刀等で追撃可能）',
      ],
    },
    center: {
      options: [
        '前ステで+6F有利（打撃・投げ・シミーの三択へ）',
        'ラッシュ起き攻めで安全に攻め継続',
      ],
    },
    features: ['インパクトがビタで埋まる黄金フレーム'],
  },

  '+27': {
    frameKey: '+27',
    displayFrame: '+27F',
    corner: {
      finishingMoves: [
        '強波掌撃>前大K>OD竜巻>中昇竜〆',
        '中足>キャンセル大P>強波掌撃>中竜巻〆',
        'SA2最大溜め>OD竜巻>強昇竜〆',
      ],
      options: [
        '前ステ（フレーム消費）: +8F有利（中P持続当てや打撃択が埋まる）',
      ],
    },
    features: ['前ステ1回で+8Fの理想的フレーム消費が可能'],
  },

  '+28': {
    frameKey: '+28',
    displayFrame: '+28F',
    corner: {
      finishingMoves: [
        '強波掌撃>ラッシュ大P>中竜巻〆',
        'SA2最大溜め>OD竜巻>中昇竜〆',
      ],
      options: [
        '中P（フレーム消費）: +8F有利（持続当て・暴れ潰し）',
      ],
    },
    features: ['中P空振り消費で+8F'],
  },

  '+31': {
    frameKey: '+31',
    displayFrame: '+31F',
    corner: {
      finishingMoves: ['強波掌撃>ラッシュ下大P>SA2（最速）〆'],
      options: [
        '弱P>下弱P（フレーム消費）: +8F有利',
        '下弱P>下弱K（フレーム消費）: +5F有利（投げ・打撃択）',
        '強足刀（持続当て）: ガードさせて+2F有利',
      ],
    },
  },

  '+32': {
    frameKey: '+32',
    displayFrame: '+32F',
    corner: {
      finishingMoves: ['強足刀>中昇竜〆', '大PTC>中昇竜〆'],
      options: [
        'ラッシュ前大P（持続当て）: ヒット時+10F / ガード時+7F',
        'ラッシュ中段（持続当て）: ヒット時+8F / ガード時+4F',
        '強足刀（持続当て）: ガードさせて+3F有利',
        'ラッシュ弱P（フレーム消費）: +8F有利',
        '下弱P×2（フレーム消費）: +8F有利',
        '下弱K×2（フレーム消費）: +4F有利',
      ],
    },
  },

  '+34': {
    frameKey: '+34',
    displayFrame: '+34F',
    corner: {
      finishingMoves: ['弱P×2>中昇竜〆', 'OD竜巻>中昇竜〆'],
      options: [
        '弱P（フレーム消費）: +21F有利（インパクトがジャンプ不可）',
        '下弱K>下弱P（フレーム消費）: +8F有利',
        '投げ空振り（フレーム消費）: +4F有利（シミー不可）',
        '強足刀（持続当て）: ガードさせて+5F有利',
      ],
    },
  },

  '+35': {
    frameKey: '+35',
    displayFrame: '+35F',
    center: {
      finishingMoves: ['弱攻撃起き攻め重視〆（弱竜巻）', '中技・各種コンボ弱竜巻〆'],
      options: [
        '前ステ>歩きで起き攻め（投げがピッタリ重なる距離）',
        '前ステ>弱波掌撃（持続当て）: ヒット時+7F / ガード時+2F',
        '前ステ>前大P: 最速暴れと相打ちで+9F以上取れるため引大Pが繋がる',
        '（相手後ろ受身時）ラッシュ微後退でシミー可能',
      ],
    },
    corner: {
      finishingMoves: ['弱竜巻〆', 'SA2最大溜め>OD竜巻>弱昇竜〆'],
      options: [
        '弱P（フレーム消費）: +22F有利（前中P持続や前大P持続が強力）',
        '投げ空振り（フレーム消費）: +5F有利（シミー不可）',
      ],
    },
    features: ['弱竜巻〆からダウン後の距離が近く投げに行きやすい状況重視'],
  },

  '+36': {
    frameKey: '+36',
    displayFrame: '+36F',
    corner: {
      finishingMoves: ['OD弾>弱竜巻〆'],
      options: [
        '中K（フレーム消費）: +8F有利（持続当て・暴れ潰し）',
        '大P（フレーム消費）: +4F有利（シミー不可）',
        '弱P（フレーム消費）: +23F有利',
        '下弱P（フレーム消費）: +22F有利',
      ],
    },
  },

  '+37': {
    frameKey: '+37',
    displayFrame: '+37F',
    center: {
      finishingMoves: ['強昇竜〆（弱・中技・パニカン各種基本〆）'],
      options: [
        '前ステ>歩きで起き攻め（投げの猶予1Fでギリギリ埋まる要練習）',
        '前ステ>前大P: 前ステ+18Fなので発生20Fの前大Pがビタで埋まる',
        '前ステ>中P: 重ねる場合は不破三連撃の弱Kまで仕込むのが安定',
        '（相手その場受身でも）ラッシュからシミー可能',
      ],
    },
    corner: {
      finishingMoves: [
        '強昇竜〆',
        '前大K>OD竜巻>強昇竜〆',
        '強足刀>弱昇竜〆',
        '壁ドン>ラッシュ大PTC>弱昇竜〆',
        'OD竜巻>弱足刀〆',
      ],
      options: [
        '中K（フレーム消費）: +8F有利（中P持続・暴れ潰し）',
        '下弱P（フレーム消費）: +23F有利',
        '下弱K（フレーム消費）: +21F有利（インパクトがジャンプ不可）',
      ],
    },
    features: ['リュウの基本形。前ステで+18Fとなり発生20Fの前大Pが重なる最強状況'],
  },

  '+38': {
    frameKey: '+38',
    displayFrame: '+38F',
    center: {
      finishingMoves: ['前大K>竜巻〆', 'OD足刀運びルート'],
      options: [
        '前ステ>微歩き投げ',
        '前ステ>前大P（暴れ潰し・ヒット確認）',
        '前ステ>OD波掌撃（持続当て）: ヒット時+4F / ガード時+5F',
        '弱P（フレーム消費）>中足刀（持続当て）: ガード+0F（画面端ヒット時は強昇竜追撃可能）',
      ],
    },
    corner: {
      finishingMoves: [
        '強波掌撃>ラッシュ引大P>中竜巻〆',
        '前大K>竜巻〆',
        '強波掌撃>中足刀〆',
        'OD波動拳>強昇竜〆',
      ],
      options: [
        '弱P（フレーム消費）: +25F有利 > インパクト重ね',
        '投げ空振り（フレーム消費）: +8F有利',
        '大K（フレーム消費）: +3F有利（投げ間合い外・シミー可能）',
        'インパクト（フレーム消費）: -24F（通称汚インパクト）',
      ],
    },
  },

  '+39': {
    frameKey: '+39',
    displayFrame: '+39F',
    corner: {
      finishingMoves: ['OD竜巻>強昇竜〆'],
      options: [
        '大K（フレーム消費）: +4F有利（シミー可能・打撃と投げの択）',
        '弱P（フレーム消費）: +26F有利 > インパクト重ね',
      ],
    },
    center: {
      finishingMoves: ['小技OD竜巻中昇竜〆'],
      options: [
        '前ステ歩き起き攻め（+37よりさらに猶予があり安定）',
      ],
    },
  },

  '+40': {
    frameKey: '+40',
    displayFrame: '+40F',
    corner: {
      finishingMoves: [
        '中足刀〆',
        '壁ドン>大P>中足刀〆',
        '強波掌撃>ラッシュ下大P>中足刀〆',
        'OD竜巻>ラッシュ下中P>中足刀〆',
      ],
      options: [
        '大K（フレーム消費）: +5F有利（シミー可能）',
        '大P（フレーム消費）: +8F有利',
        '弱K（フレーム消費）: +22F有利',
        '前ステ（フレーム消費）: +21F有利',
      ],
    },
  },

  '+41': {
    frameKey: '+41',
    displayFrame: '+41F',
    corner: {
      finishingMoves: [
        '強波掌撃>強昇竜〆',
        '強波掌撃>ラッシュ引大P>強昇竜〆',
        '強波掌撃>前大K>竜巻〆',
        '弱P×3>OD波動>弱波掌撃〆',
        'SA2（最大溜め）>前大K>竜巻〆',
      ],
      options: [
        '⭐️ 6F詐欺飛び（無敵技をガードしつつジャンプ攻撃を重ねる）',
        '前ステ（フレーム消費）: +22F有利',
        '中P（フレーム消費）: +21F有利',
      ],
    },
    center: {
      finishingMoves: ['OD足刀>前大K>竜巻〆（最低空当て）'],
      options: [
        '前ステ×2で+3F投げ間合い（シミー可能）から強力な起き攻め',
      ],
    },
    features: ['画面端では6F詐欺飛びが成立する強力フレーム'],
  },

  '+42': {
    frameKey: '+42',
    displayFrame: '+42F',
    corner: {
      finishingMoves: [
        '弱足刀〆',
        '強波掌撃>ラッシュ大P>強足刀〆',
        'OD竜巻>弱波掌撃〆',
        '強波掌撃>ラッシュ引大K（2段目）>弱波掌撃〆',
      ],
      options: [
        '⭐️ 5F詐欺飛び（空中竜巻でジャストパリーのタイミングをずらせてガード+3F）',
        '弱波掌撃 or 大K（フレーム消費）: +7F有利',
        '前ステ（フレーム消費）: +23F有利',
      ],
    },
    center: {
      options: [
        '前ステで+23F有利（インパクト重ねやラッシュ起き攻め）',
      ],
    },
    features: ['画面端で5F詐欺飛びが成立（空中竜巻でタイミングずらし可能）'],
  },

  '+45': {
    frameKey: '+45',
    displayFrame: '+45F',
    corner: {
      finishingMoves: ['強足刀〆', '強波掌撃>弱波掌撃〆'],
      options: [
        '前ステ>弱K（フレーム消費）: +8F有利',
        '前大P（フレーム消費）: +5F有利（シミー不可）',
        '前ジャンプ（フレーム消費）: +2F有利（シミー不可）',
        '前ステ（フレーム消費）: +26F有利 > インパクト重ね',
      ],
    },
    center: {
      finishingMoves: ['OD足刀>前大K>竜巻〆（最速当て・画面端到達時）'],
      options: [
        '前ステ×2で+8F有利から中P（持続当て）+10/+2F',
      ],
    },
  },

  '+47': {
    frameKey: '+47',
    displayFrame: '+47F',
    center: {
      finishingMoves: ['下大K（Pc）〆'],
      options: [
        '前大P（フレーム消費）: +7F有利（シミー可能）',
        '前ステ>中P（フレーム消費）: +8F有利（シミー不可だが中P持続当てが強力）',
        '前ジャンプ: +4F有利（先端ヒット時は前J大Pで表裏が分かりにくくなり+1F）',
      ],
    },
    features: ['下大Kパニカン後は相手その場受け身限定。多彩なフレーム消費が可能'],
  },
};

// 共通フレーム消費後の特徴解説
export const FRAME_FEATURES_INFO: Record<string, string[]> = {
  '+3': [
    '投げがピッタリ埋まる',
    '発生7Fの引大Pが最速4F暴れと相打ちになる',
  ],
  '+5': [
    '弱P持続当て: ヒット時+6F / ガード時+1F',
    '発生9Fの下大Pが最速4F暴れと相打ちになる',
    '投げがピッタリ埋まる',
  ],
  '+7': [
    '中P持続当て: ヒット時+9F / ガード時+1F',
    '発生10Fの大P・引大Kで暴れ潰し可能',
    '垂直J大Pで最速投げ抜け狩り（原人狩り）',
  ],
  '+8': [
    '中P持続当て: ヒット時+10F / ガード時+2F（ガードされても投げ間合い内）',
    '弱波掌撃が最速暴れと相打ち',
  ],
  '+21': [
    'インパクトが相手の前ジャンプで避けられない',
    '前中P持続当て: ヒット時+4F / ガード時±0F',
    'OD波掌撃持続当て: ヒット時+7F / ガード時+7F',
    '弱波動拳持続当て: ヒット時+7F / ガード時+1F',
  ],
  '+22': [
    '前中P持続当て: ヒット時+5F / ガード時+1F',
    'インパクトが相手の前ジャンプで避けられない',
    '前ステ消費で+3F有利',
    '前大P持続当て: ヒット時+7F / ガード時+4F',
    '弱波動拳持続当て: ヒット時+8F / ガード時+2F',
  ],
};

// 入力文字列（例: "+37", "+37F", "（+37）", "+26" 等）から合致する起き攻めデータを検索
// 注意: プラス記号のない単なる数字（ダメージ値等）は除外
export function findOkizemeData(rawText: string): FrameOkizemeData | null {
  if (!rawText) return null;

  const clean = rawText.trim().replace(/^[（(【\[]/, '').replace(/[）)\]】]$/, '');

  // 起き攻めフレームは必ず '+' を含む（+37, +35 等）。'+' がない単なる数字（ダメージ等）は除外
  if (!clean.includes('+')) {
    return null;
  }

  if (RYU_OKIZEME_DATA[clean]) {
    return RYU_OKIZEME_DATA[clean];
  }

  const numMatch = clean.match(/\+(\d+)/);
  if (!numMatch) return null;

  const num = numMatch[1];
  const key = `+${num}`;

  if (RYU_OKIZEME_DATA[key]) {
    return RYU_OKIZEME_DATA[key];
  }

  if (clean.includes('41') || clean.includes('45')) {
    return RYU_OKIZEME_DATA['+41'] || null;
  }

  return null;
}
