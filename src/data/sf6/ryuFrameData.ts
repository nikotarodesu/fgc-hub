export interface MoveFrameData {
  id: string;
  name: string;
  command: string;
  startup: number;          // 発生F
  active: string;           // 持続F (例: "3F" または "3-5F")
  recovery: number;         // 硬直F
  onBlock: number;          // ガード硬直差 (例: -1, +1)
  onHit: number | string;   // ヒット硬直差 (例: +4, "ダウン")
  attribute: '上段' | '中段' | '下段' | '投げ' | '空中';
  damage: number;
  cancel: string;           // キャンセル可否 (例: "必殺技/SA/DR", "SA3のみ", "×")
  summary: string;          // 立ち回りでの使い所・強み
}

export const RYU_FRAME_DATA: Record<string, MoveFrameData> = {
  // 小技
  '5lp': {
    id: '5lp',
    name: '立ち弱P',
    command: '5LP / 弱攻撃',
    startup: 4,
    active: '3F',
    recovery: 7,
    onBlock: -1,
    onHit: 4,
    attribute: '上段',
    damage: 300,
    cancel: '連打/必殺技/SA/DR',
    summary: '最速4F小技。暴れ・割り込み・固めの起点。連打キャンセル可能でヒット確認からコンボへ。',
  },
  '2lp': {
    id: '2lp',
    name: 'しゃがみ弱P',
    command: '2LP / 下弱P',
    startup: 4,
    active: '2F',
    recovery: 8,
    onBlock: -1,
    onHit: 5,
    attribute: '上段',
    damage: 300,
    cancel: '連打/必殺技/SA/DR',
    summary: '密着4F暴れの主力。姿勢が低く、ヒット時+5Fで弱昇竜や立ち弱Pに繋がる。',
  },
  '5lk': {
    id: '5lk',
    name: '立ち弱K',
    command: '5LK / 弱K',
    startup: 5,
    active: '3F',
    recovery: 10,
    onBlock: -2,
    onHit: 2,
    attribute: '下段',
    damage: 300,
    cancel: '必殺技/SA/DR',
    summary: '足元を蹴る下段技。OD竜巻やDRを仕込んで牽制や崩しに機能。',
  },
  '2lk': {
    id: '2lk',
    name: 'しゃがみ弱K',
    command: '2LK / 下弱K',
    startup: 4,
    active: '2F',
    recovery: 10,
    onBlock: -2,
    onHit: 3,
    attribute: '下段',
    damage: 200,
    cancel: '連打キャンセルのみ',
    summary: '発生4Fの下段始動。立ちガードを崩し、しゃがみ弱Pへ連打キャンセルで繋ぐ。',
  },

  // 中技
  '5mp': {
    id: '5mp',
    name: '立ち中P',
    command: '5MP / 中P',
    startup: 6,
    active: '3F',
    recovery: 12,
    onBlock: 1,
    onHit: 6,
    attribute: '上段',
    damage: 600,
    cancel: '必殺技/SA/DR',
    summary: 'ガードさせて+1F有利の主力圧技。ヒット時は立ち中Pやしゃがみ中Pが連続ヒット。シミーの起点。',
  },
  '2mp': {
    id: '2mp',
    name: 'しゃがみ中P',
    command: '2MP / 下中P',
    startup: 6,
    active: '3F',
    recovery: 12,
    onBlock: 1,
    onHit: 5,
    attribute: '上段',
    damage: 600,
    cancel: '必殺技/SA/DR',
    summary: 'ガード+1F。リーチと判定に優れ、ラッシュ止めや置き技、コンボパーツとして超優秀。',
  },
  '5mk': {
    id: '5mk',
    name: '立ち中K',
    command: '5MK / 中K',
    startup: 9,
    active: '3F',
    recovery: 17,
    onBlock: -4,
    onHit: 2,
    attribute: '上段',
    damage: 700,
    cancel: 'SA2/SA3のみ',
    summary: '中距離の主力牽制蹴り。リーチが長く相手の牽制の外から刺さる。クラシック専用技。',
  },
  '2mk': {
    id: '2mk',
    name: 'しゃがみ中K (中足)',
    command: '2MK / 下中K',
    startup: 8,
    active: '3F',
    recovery: 17,
    onBlock: -4,
    onHit: 1,
    attribute: '下段',
    damage: 500,
    cancel: '必殺技/SA/DR',
    summary: 'リュウの立ち回りの生命線。波動拳・キャンセルラッシュ・波掌撃を仕込んで中距離を制圧。',
  },

  // 強技
  '5hp': {
    id: '5hp',
    name: '立ち強P (大P)',
    command: '5HP / 大P',
    startup: 9,
    active: '3F',
    recovery: 18,
    onBlock: -1,
    onHit: 3,
    attribute: '上段',
    damage: 800,
    cancel: '必殺技/SA/DR',
    summary: 'ガードで-1Fしか隙がない最強クラスの牽制・置き技。パニカン時はクラッシュカウンターで+7F。',
  },
  '2hp': {
    id: '2hp',
    name: 'しゃがみ強P (下大P)',
    command: '2HP / 下大P',
    startup: 8,
    active: '4F',
    recovery: 22,
    onBlock: -9,
    onHit: 2,
    attribute: '上段',
    damage: 900,
    cancel: '必殺技/SA/DR',
    summary: '真上への対空迎撃、および高火力コンボの繋ぎ技。大ダメージコンボに必須のパーツ。',
  },
  '5hk': {
    id: '5hk',
    name: '立ち強K (大K)',
    command: '5HK / 大K',
    startup: 12,
    active: '3F',
    recovery: 18,
    onBlock: -4,
    onHit: 3,
    attribute: '上段',
    damage: 900,
    cancel: '× (パニカン時コンボ)',
    summary: 'ダメージ900の高威力技。無敵技ガード後の確定反撃始動や、対空からSA1繋ぎに重宝。',
  },
  '2hk': {
    id: '2hk',
    name: 'しゃがみ強K (大足)',
    command: '2HK / 大足',
    startup: 9,
    active: '3F',
    recovery: 25,
    onBlock: -10,
    onHit: 'ダウン(+37F)',
    attribute: '下段',
    damage: 900,
    cancel: '× (パニカン時ダウン+42F)',
    summary: '発生9Fで相手の空振りを差し返す下段。ヒットで+37F、パニカンで+42F詐欺飛びへ移行。',
  },

  // 特殊技
  '6hp': {
    id: '6hp',
    name: '鳩尾砕き (大ゴス / 前大P)',
    command: '6HP / 前大P',
    startup: 20,
    active: '3F',
    recovery: 18,
    onBlock: 1,
    onHit: 6,
    attribute: '上段',
    damage: 900,
    cancel: '× (ヒット時目押し可能)',
    summary: 'ガードさせて+1F有利。ヒット時は立ち中Pやしゃがみ中Pがノーキャンセルで連続ヒットする攻めの要。',
  },
  '6mp': {
    id: '6mp',
    name: '鎖骨割り (前中P / 中段)',
    command: '6MP / 前中P',
    startup: 20,
    active: '2F',
    recovery: 19,
    onBlock: -3,
    onHit: 1,
    attribute: '中段',
    damage: 600,
    cancel: '× (ラッシュ時+5F)',
    summary: 'しゃがみガード不能の中段攻撃。キャンセルラッシュから出すとヒット時+5Fでコンボ可能。',
  },
  '4hp': {
    id: '4hp',
    name: '引き強P (引大 / 肘打ち)',
    command: '4HP / 引大P',
    startup: 8,
    active: '3F',
    recovery: 16,
    onBlock: -2,
    onHit: 3,
    attribute: '上段',
    damage: 800,
    cancel: '必殺技/SA/DR',
    summary: '発生8Fでシミー（投げ抜け狩り）に最適。微後退から叩き込み、画面端の高火力コンボへ直結。',
  },
  '6hk': {
    id: '6hk',
    name: '旋風脚 (前大K)',
    command: '6HK / 前大K',
    startup: 15,
    active: '3F',
    recovery: 18,
    onBlock: -3,
    onHit: 2,
    attribute: '上段',
    damage: 800,
    cancel: '× (パニカン時+6F)',
    summary: '前方に大きく踏み込む蹴り。ガードされても-3Fで反撃を受けず、足払いの上から踏み込める。',
  },

  // 必殺技
  'hadoken': {
    id: 'hadoken',
    name: '波動拳',
    command: '236P / 必殺技',
    startup: 14,
    active: '弾',
    recovery: 33,
    onBlock: -6,
    onHit: 1,
    attribute: '上段',
    damage: 600,
    cancel: 'SA3のみ',
    summary: '全体動作47Fの伝統的な飛び道具。中〜遠距離で相手に飛びやパリィを強制させる「質問」の技。',
  },
  'shoryuken': {
    id: 'shoryuken',
    name: '昇龍拳',
    command: '623P / 前+必殺技',
    startup: 5,
    active: '多段',
    recovery: 38,
    onBlock: -25,
    onHit: 'ダウン(+35F)',
    attribute: '上段',
    damage: 1100,
    cancel: 'SA3のみ',
    summary: '弱は発生5Fで対空無敵(1-10F)、強は発生7Fで対空無敵(1-12F)、ODは発生6Fで完全無敵(1-9F)。',
  },
  'tatsumaki': {
    id: 'tatsumaki',
    name: '竜巻旋風脚',
    command: '214K / 後+必殺技',
    startup: 12,
    active: '多段',
    recovery: 24,
    onBlock: -10,
    onHit: 'ダウン',
    attribute: '上段',
    damage: 800,
    cancel: '×',
    summary: '画面端への運びに長けた回転蹴り。OD版は空中の相手を高く浮かせ、追撃コンボが可能。',
  },
  'hashogeki': {
    id: 'hashogeki',
    name: '波掌撃',
    command: '214P / 下+必殺技',
    startup: 14,
    active: '3F',
    recovery: 19,
    onBlock: -3,
    onHit: 2,
    attribute: '上段',
    damage: 600,
    cancel: 'SA3のみ',
    summary: '弱はガード-3Fで反撃なしの安全連携。強は溜めでガード+4F有利を作れる固めの切り札。',
  },
  'sokuto': {
    id: 'sokuto',
    name: '上段足刀破り',
    command: '236K / 足刀',
    startup: 15,
    active: '3F',
    recovery: 22,
    onBlock: -10,
    onHit: 'ダウン(+37F)',
    attribute: '上段',
    damage: 1000,
    cancel: 'SA3のみ',
    summary: 'ヒット時に相手を画面端へ大きく吹き飛ばす。強ヒット後は+37Fで安全に電刃溜めが可能。',
  },
  'denjin': {
    id: 'denjin',
    name: '電刃錬気',
    command: '22P / 下下+P',
    startup: 0,
    active: '強化',
    recovery: 52,
    onBlock: -52,
    onHit: '強化完了',
    attribute: '上段',
    damage: 0,
    cancel: '×',
    summary: '波動拳と波掌撃を1回だけ電刃版に強化。52Fの大きな隙があるため、強足刀ヒット後など安全な状況で発動。',
  },
};

/**
 * テキストから技名を検出し、該当するフレームデータを返すヘルパー
 */
export function findMoveFrame(text: string): MoveFrameData | null {
  const t = text.toLowerCase().replace(/\s+/g, '');
  if (t.includes('5lp') || t.includes('立ち弱p') || t.includes('立弱p')) return RYU_FRAME_DATA['5lp'];
  if (t.includes('2lp') || t.includes('下弱p') || t.includes('しゃがみ弱p')) return RYU_FRAME_DATA['2lp'];
  if (t.includes('5lk') || t.includes('立ち弱k') || t.includes('立弱k')) return RYU_FRAME_DATA['5lk'];
  if (t.includes('2lk') || t.includes('下弱k') || t.includes('しゃがみ弱k')) return RYU_FRAME_DATA['2lk'];
  if (t.includes('5mp') || t.includes('立ち中p') || t.includes('立中p')) return RYU_FRAME_DATA['5mp'];
  if (t.includes('2mp') || t.includes('下中p') || t.includes('しゃがみ中p')) return RYU_FRAME_DATA['2mp'];
  if (t.includes('5mk') || t.includes('立ち中k') || t.includes('立中k')) return RYU_FRAME_DATA['5mk'];
  if (t.includes('2mk') || t.includes('中足') || t.includes('下中k') || t.includes('しゃがみ中k')) return RYU_FRAME_DATA['2mk'];
  if (t.includes('5hp') || t.includes('大p') || t.includes('立ち強p') || t.includes('強p')) return RYU_FRAME_DATA['5hp'];
  if (t.includes('2hp') || t.includes('下大p') || t.includes('しゃがみ強p')) return RYU_FRAME_DATA['2hp'];
  if (t.includes('5hk') || t.includes('大k') || t.includes('立ち強k') || t.includes('強k')) return RYU_FRAME_DATA['5hk'];
  if (t.includes('2hk') || t.includes('大足') || t.includes('下強k') || t.includes('しゃがみ強k')) return RYU_FRAME_DATA['2hk'];
  if (t.includes('大ゴス') || t.includes('前大p') || t.includes('6hp') || t.includes('鳩尾')) return RYU_FRAME_DATA['6hp'];
  if (t.includes('前中p') || t.includes('6mp') || t.includes('鎖骨')) return RYU_FRAME_DATA['6mp'];
  if (t.includes('引大') || t.includes('引き強') || t.includes('4hp')) return RYU_FRAME_DATA['4hp'];
  if (t.includes('前大k') || t.includes('6hk') || t.includes('旋風脚')) return RYU_FRAME_DATA['6hk'];
  if (t.includes('波動') || t.includes('弾')) return RYU_FRAME_DATA['hadoken'];
  if (t.includes('昇竜') || t.includes('昇龍')) return RYU_FRAME_DATA['shoryuken'];
  if (t.includes('竜巻')) return RYU_FRAME_DATA['tatsumaki'];
  if (t.includes('波掌')) return RYU_FRAME_DATA['hashogeki'];
  if (t.includes('足刀')) return RYU_FRAME_DATA['sokuto'];
  if (t.includes('電刃')) return RYU_FRAME_DATA['denjin'];
  return null;
}
