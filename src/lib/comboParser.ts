/**
 * コンボレシピ文字列を初心者にも分かりやすい視覚的なコマンドステップに分解・変換するユーティリティ
 * 矢印表記（↓, ↓↙←, →↓↘等）とカラーボタン（黄色いパンチボタン、赤いパンチボタン等）を生成
 */

export type ButtonColor = 'blue' | 'yellow' | 'red' | 'purple' | 'gold' | 'emerald' | 'orange' | 'neutral';
export type ButtonKind = 'punch' | 'kick' | 'both' | 'parry' | 'special';

export interface VisualStep {
  original: string;
  isCancel?: boolean;      // "キャンセル"（ボタンの前に青文字で表示）
  isRush?: boolean;        // "ラッシュ"（ボタンの前に青文字で表示）
  rushText?: string;       // "ラッシュ" または "生ラッシュ"
  prefix?: string;         // 例: "壁バウンド"
  arrows: string[];        // 例: ["↓"], ["↓", "↙", "←"], ["→", "↓", "↘"]
  arrowStr: string;        // 例: "↓", "↓↙←", "→↓↘"
  chargeArrows?: boolean[]; // 溜めキーフラグ（各矢印に対応、trueなら溜め）
  button: {
    kind: ButtonKind;
    color: ButtonColor;
    label: string;         // 例: "弱P", "中P", "強P", "弱K", "中K", "強K", "PP", "KK"
    description?: string;  // ツールチップ用
    iconText: string;      // "P", "K", "PP", "KK", "SA"
    showLabel?: boolean;   // ボタン横に技名テキストを表示するかどうか（通常技・特殊技は色でわかるためfalse）
  };
  suffix?: string;         // 例: "（カス当たり）", "（最速）" ※ダメージ数値は除外
  tip?: string;
}

export function parseVisualCombo(recipe: string, controlType: 'classic' | 'modern' = 'classic'): VisualStep[] {
  if (!recipe) return [];

  // 全角の「＞」を「>」に正規化
  let cleanRecipe = recipe.replace(/＞/g, '>');

  // 0. 先頭のラベル（例: ベスト：、次点：、推奨：、基本：、最大：等）を除去
  cleanRecipe = cleanRecipe.replace(/^(?:ベスト|次点|推奨|基本|最大|中央|画面端|反撃|確定反撃)[：:]\s*/, '').trim();

  // 太字装飾（**）の除去
  cleanRecipe = cleanRecipe.replace(/\*\*/g, '');

  // 1. レシピ末尾のダメージ数値（例: （4247）, (4247), (4247ダメージ), [4247]）を除去
  cleanRecipe = cleanRecipe
    .replace(/[（\(\[]\s*\d+(?:\s*(?:ダメージ|dmg|DMG|d))?\s*[）\)\]]\s*$/, '')
    .trim();

  // 2. 末尾の〆や締めを除去
  cleanRecipe = cleanRecipe.replace(/〆|締め?$/, '').trim();

  // 3. 〆の前にダメージがあった場合、または再度末尾にダメージがある場合の除去
  cleanRecipe = cleanRecipe
    .replace(/[（\(\[]\s*\d+(?:\s*(?:ダメージ|dmg|DMG|d))?\s*[）\)\]]\s*$/, '')
    .trim();

  // ">" または "→" で分割
  const rawParts = cleanRecipe.split(/>|→(?!\+|↓|↘|↗|←|↙|↖)/).map((p) => p.trim()).filter(Boolean);

  return rawParts.map((part) => parseSinglePart(part, controlType));
}

function parseSinglePart(text: string, controlType: 'classic' | 'modern' = 'classic'): VisualStep {
  const step = parseSinglePartInternal(text, controlType);
  return controlType === 'modern' ? cleanupModernStep(step) : step;
}

function parseSinglePartInternal(text: string, controlType: 'classic' | 'modern' = 'classic'): VisualStep {
  let remaining = text.trim();

  // 1. 各パーツ内のダメージ数値を除去（例: SA3〆（4247）など各パーツ内に残っている場合）
  remaining = remaining
    .replace(/[（\(\[]\s*\d+(?:\s*(?:ダメージ|dmg|DMG|d))?\s*[）\)\]]/g, '')
    .trim();

  // 2. 〆を除去
  remaining = remaining.replace(/〆|締め?$/, '').trim();

  // 3. サフィックス（補足情報: （カス当たり）、（最速）など）の抽出（※純粋な数値ダメージは除外）
  let suffix: string | undefined;
  const suffixMatch = remaining.match(/[（\(](.*?)[）\)]$/);
  if (suffixMatch) {
    const inner = suffixMatch[1].trim();
    if (!/^\d+$/.test(inner) && !/^\d+\s*(?:ダメージ|dmg|DMG)$/i.test(inner)) {
      suffix = `（${inner}）`;
    }
    remaining = remaining.replace(/[（\(](.*?)[）\)]$/, '').trim();
  }

  // 4. キャンセルの抽出（「キャンセルラッシュ」と書かれている場合は「キャンセル」のみとして扱う）
  let isCancel = false;
  if (remaining.includes('キャンセルラッシュ')) {
    isCancel = true;
    remaining = remaining.replace(/キャンセルラッシュ/g, '').trim();
  } else if (remaining.includes('キャンセル')) {
    isCancel = true;
    remaining = remaining.replace(/キャンセル/g, '').trim();
  }

  // 5. ラッシュの抽出（キャンセルがない場合のみラッシュ表示を有効にする）
  let isRush = false;
  let rushText: string | undefined;
  if (!isCancel) {
    if (remaining.includes('生ラッシュ')) {
      isRush = true;
      rushText = '生ラッシュ';
      remaining = remaining.replace(/生ラッシュ/g, '').trim();
    } else if (remaining.includes('パリィラッシュ')) {
      isRush = true;
      rushText = 'ラッシュ';
      remaining = remaining.replace(/パリィラッシュ/g, '').trim();
    } else if (remaining.includes('ラッシュ')) {
      isRush = true;
      rushText = 'ラッシュ';
      remaining = remaining.replace(/ラッシュ/g, '').trim();
    }
  } else {
    // キャンセルがある場合は余分な「ラッシュ」文字列を除去
    remaining = remaining.replace(/生ラッシュ|パリィラッシュ|ラッシュ/g, '').trim();
  }

  // 6. その他のプレフィックス（壁ドン、壁バウンドなど）
  let prefix: string | undefined;
  if (remaining.includes('壁ドン')) {
    prefix = '壁ドン';
    remaining = remaining.replace(/壁ドン/g, '').trim();
  } else if (remaining.includes('壁バウンド')) {
    prefix = '壁バウンド';
    remaining = remaining.replace(/壁バウンド/g, '').trim();
  }

  // 再度〆や余分な空白を除去
  remaining = remaining.replace(/〆|締め?$/, '').trim();

  const lower = remaining.toLowerCase();

  // 0. インパクト（赤い字で「インパクト」）
  if (lower.includes('インパクト') || lower.includes('ドライブインパクト') || /\bdi\b/.test(lower) || lower === 'di') {
    return {
      original: remaining,
      isCancel,
      isRush,
      rushText,
      prefix,
      arrows: [],
      arrowStr: '',
      button: {
        kind: 'both',
        color: 'red',
        label: 'インパクト',
        description: 'ドライブインパクト（強P＋強K）',
        iconText: 'インパクト',
      },
      suffix,
      tip: '強P＋強K（ドライブインパクト）',
    };
  }

  // 0.5 前ステップ / バックステップ（※「前ステ」はそのまま表示）
  if (lower.includes('前ステ') || lower.includes('前ダッシュ') || lower.includes('前ステップ')) {
    const isDouble = lower.includes('×2') || lower.includes('x2') || lower.includes('2回');
    const label = isDouble ? '前ステ×2' : '前ステ';
    return {
      original: remaining,
      isCancel,
      isRush,
      rushText,
      prefix,
      arrows: [],
      arrowStr: '',
      button: {
        kind: 'special',
        color: 'neutral',
        label,
        description: isDouble ? '前ステップ2回' : '前ステップ',
        iconText: label,
      },
      suffix,
      tip: isDouble
        ? '前キーを2回素早く入力×2回（前ステップ2回: →→ →→）'
        : '前キーを2回素早く入力（前ステップ: →→）',
    };
  }

  if (lower.includes('バクステ') || lower.includes('バックダッシュ') || lower.includes('バックステップ')) {
    const isDouble = lower.includes('×2') || lower.includes('x2') || lower.includes('2回');
    const label = isDouble ? 'バクステ×2' : 'バクステ';
    return {
      original: remaining,
      isCancel,
      isRush,
      rushText,
      prefix,
      arrows: [],
      arrowStr: '',
      button: {
        kind: 'special',
        color: 'neutral',
        label,
        description: isDouble ? 'バックステップ2回' : 'バックステップ',
        iconText: label,
      },
      suffix,
      tip: isDouble
        ? '後ろキーを2回素早く入力×2回（バックステップ2回: ←← ←←）'
        : '後ろキーを2回素早く入力（バックステップ: ←←）',
    };
  }

  // 0.6 移動（歩き、微歩き、微後退など）
  if (lower.includes('微歩き')) {
    return {
      original: remaining,
      isCancel,
      isRush,
      rushText,
      prefix,
      arrows: ['→'],
      arrowStr: '→',
      button: {
        kind: 'special',
        color: 'neutral',
        label: '微歩き',
        description: '微歩き',
        iconText: '微歩き',
      },
      suffix,
      tip: '前キー（→）を一瞬入力して微歩き（→微歩き）',
    };
  }

  if (lower.includes('前歩き') || lower.includes('前歩') || lower === '歩き') {
    return {
      original: remaining,
      isCancel,
      isRush,
      rushText,
      prefix,
      arrows: ['→'],
      arrowStr: '→',
      button: {
        kind: 'special',
        color: 'neutral',
        label: '前歩き',
        description: '前歩き',
        iconText: '前歩き',
      },
      suffix,
      tip: '前キー（→）を入力して歩く（→歩き）',
    };
  }

  if (lower.includes('微後退') || lower.includes('後退') || lower.includes('後ろ歩き')) {
    return {
      original: remaining,
      isCancel,
      isRush,
      rushText,
      prefix,
      arrows: ['←'],
      arrowStr: '←',
      button: {
        kind: 'special',
        color: 'neutral',
        label: remaining,
        description: remaining,
        iconText: remaining,
      },
      suffix,
      tip: '後ろキーを入力して少し下がって間合いを調整',
    };
  }

  // 0.7 電刃錬気 / 電刃溜め
  if (lower.includes('電刃錬気') || lower.includes('電刃溜め')) {
    const isModern = controlType === 'modern';
    return {
      original: remaining,
      isCancel,
      isRush,
      rushText,
      prefix,
      arrows: ['↓', '↓'],
      arrowStr: '↓↓',
      button: {
        kind: 'punch',
        color: 'yellow',
        label: '電刃錬気',
        description: '電刃錬気',
        iconText: isModern ? '電刃' : 'P',
      },
      suffix,
      tip: isModern
        ? 'テンキー22+攻撃（下・下＋攻撃で電刃錬気ストックチャージ）'
        : 'テンキー22+P（下・下＋パンチで電刃錬気ストックチャージ）',
    };
  }

  // 0.8 投げ（前投げ、後ろ投げ、通常投げ）
  if (lower === '投げ' || lower.includes('前投げ') || lower.includes('後ろ投げ') || lower.includes('通常投げ')) {
    const isModern = controlType === 'modern';
    const isBack = lower.includes('後ろ');
    return {
      original: remaining,
      isCancel,
      isRush,
      rushText,
      prefix,
      arrows: isBack ? ['←'] : [],
      arrowStr: isBack ? '←' : '',
      button: {
        kind: 'both',
        color: 'neutral',
        label: '投げ',
        description: '通常投げ',
        iconText: isModern ? '弱+中' : '弱P+弱K',
      },
      suffix,
      tip: isModern ? '弱＋中（または投げボタン）' : '弱P＋弱K（通常投げ）',
    };
  }

  // 1. SA (スーパーアーツ)
  if (lower.includes('sa3') || lower.includes('真・昇龍') || lower.includes('ca')) {
    const isModern = controlType === 'modern';
    return {
      original: remaining || 'SA3',
      isCancel,
      isRush,
      rushText,
      prefix,
      arrows: isModern ? ['↓'] : ['↓', '↘', '→', '↓', '↘', '→'],
      arrowStr: isModern ? '↓' : '↓↘→↓↘→',
      button: {
        kind: 'punch',
        color: 'gold',
        label: 'SA3',
        description: '金のSAボタン',
        iconText: 'SA3',
        showLabel: false,
      },
      suffix,
      tip: isModern
        ? '↓＋弱＋中 または ↓＋SP＋強（手動テンキー236×2+攻撃でも入力可能）'
        : 'テンキー236を2回素早く入力+パンチ',
    };
  }

  if (lower.includes('sa2') || lower.includes('真・波掌')) {
    const isModern = controlType === 'modern';
    return {
      original: remaining || 'SA2',
      isCancel,
      isRush,
      rushText,
      prefix,
      arrows: isModern ? ['←'] : ['↓', '↙', '←', '↓', '↙', '←'],
      arrowStr: isModern ? '←' : '↓↙←↓↙←',
      button: {
        kind: 'punch',
        color: 'gold',
        label: 'SA2',
        description: '金のSAボタン',
        iconText: 'SA2',
        showLabel: false,
      },
      suffix,
      tip: isModern
        ? '後ろ＋弱＋中 または 後ろ＋SP＋強（手動テンキー214×2+攻撃でも入力可能）'
        : 'テンキー214を2回素早く入力+パンチ',
    };
  }

  if (lower.includes('sa1') || lower.includes('真空波動')) {
    const isModern = controlType === 'modern';
    return {
      original: remaining || 'SA1',
      isCancel,
      isRush,
      rushText,
      prefix,
      arrows: isModern ? [] : ['↓', '↘', '→', '↓', '↘', '→'],
      arrowStr: isModern ? 'N' : '↓↘→↓↘→',
      button: {
        kind: 'punch',
        color: 'gold',
        label: 'SA1',
        description: '金のSAボタン',
        iconText: 'SA1',
        showLabel: false,
      },
      suffix,
      tip: isModern
        ? 'N＋弱＋中 または N＋SP＋強（手動テンキー236×2+攻撃でも入力可能）'
        : 'テンキー236を2回素早く入力+パンチ',
    };
  }

  // 1.5 ジャンプ攻撃（垂直大P, 前J大P, 垂直JA大, 前JA大, ジャンプ大P, ジャンプA大, 前J中等）
  // ※ユーザー指示：ボタンに大Pや横に中Kなどは不要。色は赤/黄/青で理解できる。
  const isJumpAttack =
    lower.includes('ジャンプ') ||
    lower.includes('垂直') ||
    lower.startsWith('j') ||
    lower.includes('前j') ||
    lower.includes('ja') ||
    lower.includes('前ja') ||
    lower.includes('垂直ja');

  if (isJumpAttack) {
    const isHeavy = lower.includes('大') || lower.includes('強') || lower.includes('hp') || lower.includes('hk');
    const isLight = lower.includes('弱') || lower.includes('小') || lower.includes('lp') || lower.includes('lk');
    const isMed = lower.includes('中') || lower.includes('mp') || lower.includes('mk') || (!isHeavy && !isLight);
    const isKick = lower.includes('k') || lower.includes('キック');
    const isModern = controlType === 'modern';

    if (isHeavy) {
      const label = isModern ? 'ジャンプA大' : isKick ? 'ジャンプ強K' : 'ジャンプ強P';
      const iconText = isModern ? 'A大' : isKick ? 'K' : 'P';
      return {
        original: remaining,
        isCancel,
        isRush,
        rushText,
        prefix: prefix || 'ジャンプ',
        arrows: [],
        arrowStr: '',
        button: {
          kind: isKick ? 'kick' : 'punch',
          color: 'red',
          label,
          description: isModern ? 'ジャンプアシスト強' : isKick ? 'ジャンプ強K' : 'ジャンプ強P',
          iconText,
          showLabel: false,
        },
        suffix,
        tip: isModern
          ? 'ジャンプ中にアシストボタンを押しながら強攻撃（ジャンプA大）'
          : `ジャンプ中に${isKick ? '強K' : '強P'}（${label}）`,
      };
    }

    if (isMed) {
      const label = isModern ? 'ジャンプ中' : isKick ? 'ジャンプ中K' : 'ジャンプ中P';
      const iconText = isModern ? '中' : isKick ? 'K' : 'P';
      return {
        original: remaining,
        isCancel,
        isRush,
        rushText,
        prefix: prefix || 'ジャンプ',
        arrows: [],
        arrowStr: '',
        button: {
          kind: isKick ? 'kick' : 'punch',
          color: 'yellow',
          label,
          description: isModern ? 'ジャンプ中攻撃' : isKick ? 'ジャンプ中K' : 'ジャンプ中P',
          iconText,
          showLabel: false,
        },
        suffix,
        tip: isModern
          ? 'ジャンプ中に中攻撃'
          : `ジャンプ中に${isKick ? '中K' : '中P'}（${label}）`,
      };
    }

    // 弱ジャンプ攻撃
    const label = isModern ? 'ジャンプ弱' : isKick ? 'ジャンプ弱K' : 'ジャンプ弱P';
    const iconText = isModern ? '弱' : isKick ? 'K' : 'P';
    return {
      original: remaining,
      isCancel,
      isRush,
      rushText,
      prefix: prefix || 'ジャンプ',
      arrows: [],
      arrowStr: '',
      button: {
        kind: isKick ? 'kick' : 'punch',
        color: 'blue',
        label,
        description: isModern ? 'ジャンプ弱攻撃' : isKick ? 'ジャンプ弱K' : 'ジャンプ弱P',
        iconText,
        showLabel: false,
      },
      suffix,
      tip: isModern
        ? 'ジャンプ中に弱攻撃'
        : `ジャンプ中に${isKick ? '弱K' : '弱P'}（${label}）`,
    };
  }

  if (lower.startsWith('a中') || lower.startsWith('アシスト中') || (controlType === 'modern' && lower === '下中p')) {
    return {
      original: remaining,
      isCancel,
      isRush,
      rushText,
      prefix,
      arrows: [],
      arrowStr: '',
      button: {
        kind: 'punch',
        color: 'yellow',
        label: 'A中',
        description: '黄色いボタン（アシスト中攻撃）',
        iconText: 'A中',
        showLabel: false,
      },
      suffix,
      tip: 'アシストボタンを押しながら中攻撃',
    };
  }

  if (lower.startsWith('a弱') || lower.startsWith('アシスト弱')) {
    return {
      original: remaining,
      isCancel,
      isRush,
      rushText,
      prefix,
      arrows: [],
      arrowStr: '',
      button: {
        kind: 'punch',
        color: 'blue',
        label: 'A弱',
        description: '青いボタン（アシスト弱攻撃）',
        iconText: 'A弱',
        showLabel: false,
      },
      suffix,
      tip: 'アシストボタンを押しながら弱攻撃',
    };
  }

  if (
    lower.startsWith('a大') ||
    lower.startsWith('a強') ||
    lower.startsWith('アシスト大') ||
    lower.startsWith('アシスト強') ||
    (controlType === 'modern' && (lower === '前大p' || lower === '大ゴス'))
  ) {
    return {
      original: remaining,
      isCancel,
      isRush,
      rushText,
      prefix,
      arrows: [],
      arrowStr: '',
      button: {
        kind: 'punch',
        color: 'red',
        label: 'A大',
        description: '赤いボタン（アシスト強攻撃 / 大ゴス）',
        iconText: 'A大',
        showLabel: false,
      },
      suffix,
      tip: 'アシストボタンを押しながら強攻撃（大ゴス）',
    };
  }

  // 2.9 春麗必殺技：スピニングバードキック (↓(溜め)↑ + K)
  if (lower.includes('スピニング') || lower.includes('スピバ') || lower.includes('sbk')) {
    const isOD = lower.includes('od');
    const isHeavy = lower.includes('強') || lower.includes('大');
    const isLight = lower.includes('弱');
    const strength = isOD ? 'OD' : isHeavy ? '強' : isLight ? '弱' : '中';
    const color: ButtonColor = isOD ? 'purple' : isHeavy ? 'red' : isLight ? 'blue' : 'yellow';

    return {
      original: remaining,
      isCancel,
      isRush,
      rushText,
      prefix,
      arrows: ['↓', '↑'],
      arrowStr: '↓↑',
      chargeArrows: [true, false], // ↓が溜め
      button: {
        kind: 'kick',
        color,
        label: isOD ? 'ODスピバ' : `${strength}スピバ`,
        description: isOD ? 'ODスピニングバードキック' : `${strength}スピニングバードキック`,
        iconText: isOD ? 'KK' : 'K',
        showLabel: false,
      },
      suffix,
      tip: `下溜め上＋${isOD ? 'KK（2ボタン同時）' : strength + 'K'}（下キーまたは斜め下を約0.8秒長押ししてから上＋キック）`,
    };
  }

  // 2.91 春麗必殺技：百烈脚 / 百裂脚 (↓↘→ + K)
  if (lower.includes('百烈') || lower.includes('百裂')) {
    const isOD = lower.includes('od');
    const isHeavy = lower.includes('強') || lower.includes('大');
    const isLight = lower.includes('弱');
    const strength = isOD ? 'OD' : isHeavy ? '強' : isLight ? '弱' : '中';
    const color: ButtonColor = isOD ? 'purple' : isHeavy ? 'red' : isLight ? 'blue' : 'yellow';

    return {
      original: remaining,
      isCancel,
      isRush,
      rushText,
      prefix,
      arrows: ['↓', '↘', '→'],
      arrowStr: '↓↘→',
      button: {
        kind: 'kick',
        color,
        label: isOD ? 'OD百烈脚' : `${strength}百烈脚`,
        description: isOD ? 'OD百烈脚' : `${strength}百烈脚`,
        iconText: isOD ? 'KK' : 'K',
        showLabel: false,
      },
      suffix,
      tip: `テンキー236+${isOD ? 'KK（2ボタン同時）' : strength + 'K'}（下・斜め前・前＋キック）`,
    };
  }

  // 2.92 春麗必殺技：気功拳 (←(溜め)→ + P)
  if (lower.includes('気功')) {
    const isOD = lower.includes('od');
    const isHeavy = lower.includes('強') || lower.includes('大');
    const isLight = lower.includes('弱');
    const strength = isOD ? 'OD' : isHeavy ? '強' : isLight ? '弱' : '中';
    const color: ButtonColor = isOD ? 'purple' : isHeavy ? 'red' : isLight ? 'blue' : 'yellow';

    return {
      original: remaining,
      isCancel,
      isRush,
      rushText,
      prefix,
      arrows: ['←', '→'],
      arrowStr: '←→',
      chargeArrows: [true, false], // ←が溜め
      button: {
        kind: 'punch',
        color,
        label: isOD ? 'OD気功拳' : `${strength}気功拳`,
        description: isOD ? 'OD気功拳' : `${strength}気功拳`,
        iconText: isOD ? 'PP' : 'P',
        showLabel: false,
      },
      suffix,
      tip: `後ろ溜め前＋${isOD ? 'PP（2ボタン同時）' : strength + 'P'}（後ろキーを約0.8秒長押ししてから前＋パンチ）`,
    };
  }

  // 2.93 春麗必殺技：覇山蹴 / 覇山 (↓↙← + K)
  if (lower.includes('覇山')) {
    const isOD = lower.includes('od');
    const isHeavy = lower.includes('強') || lower.includes('大');
    const isLight = lower.includes('弱');
    const strength = isOD ? 'OD' : isHeavy ? '強' : isLight ? '弱' : '中';
    const color: ButtonColor = isOD ? 'purple' : isHeavy ? 'red' : isLight ? 'blue' : 'yellow';

    return {
      original: remaining,
      isCancel,
      isRush,
      rushText,
      prefix,
      arrows: ['↓', '↙', '←'],
      arrowStr: '↓↙←',
      button: {
        kind: 'kick',
        color,
        label: isOD ? 'OD覇山' : `${strength}覇山`,
        description: isOD ? 'OD覇山蹴' : `${strength}覇山蹴`,
        iconText: isOD ? 'KK' : 'K',
        showLabel: false,
      },
      suffix,
      tip: `テンキー214+${isOD ? 'KK（2ボタン同時）' : strength + 'K'}（下・斜め後ろ・後ろ＋キック）`,
    };
  }

  // 2.94 春麗特殊技：追突拳 / 追突 (前中P)
  if (lower.includes('追突')) {
    return {
      original: remaining,
      isCancel,
      isRush,
      rushText,
      prefix,
      arrows: ['→'],
      arrowStr: '→',
      button: {
        kind: 'punch',
        color: 'yellow',
        label: '追突',
        description: '前中P（追突拳）',
        iconText: 'P',
        showLabel: false,
      },
      suffix,
      tip: '前＋中P（追突拳）',
    };
  }

  // 3. 必殺技：上段足刀破り
  if (lower.includes('足刀')) {
    const isOD = lower.includes('od');
    const isWeak = lower.includes('弱');
    const isMed = lower.includes('中');
    const isHeavy = lower.includes('強') || lower.includes('大');

    if (controlType === 'modern') {
      if (isOD) {
        return {
          original: remaining,
          isCancel,
          isRush,
          rushText,
          prefix,
          arrows: ['↓'],
          arrowStr: '↓',
          button: {
            kind: 'special',
            color: 'purple',
            label: 'OD足刀',
            description: 'OD足刀ボタン',
            iconText: 'A+SP',
            showLabel: false,
          },
          suffix,
          tip: '↓＋A＋SP（※モダン限定：簡単コマンドでのみ発動可能）',
        };
      }

      if (isWeak) {
        return {
          original: remaining,
          isCancel,
          isRush,
          rushText,
          prefix,
          arrows: ['↙'],
          arrowStr: '↙',
          button: {
            kind: 'special',
            color: 'emerald',
            label: '足刀',
            description: '弱足刀ボタン',
            iconText: 'SP',
            showLabel: false,
          },
          suffix,
          tip: '↙＋SP（※モダン限定：簡単コマンドでのみ発動可能）',
        };
      }

      if (isHeavy) {
        return {
          original: remaining,
          isCancel,
          isRush,
          rushText,
          prefix,
          arrows: ['↘'],
          arrowStr: '↘',
          button: {
            kind: 'special',
            color: 'emerald',
            label: '足刀',
            description: '強足刀ボタン',
            iconText: 'SP',
            showLabel: false,
          },
          suffix,
          tip: '↘＋SP（※モダン限定：簡単コマンドでのみ発動可能）',
        };
      }

      // デフォルト（中足刀 または 足刀）
      return {
        original: remaining,
        isCancel,
        isRush,
        rushText,
        prefix,
        arrows: ['↓'],
        arrowStr: '↓',
        button: {
          kind: 'special',
          color: 'emerald',
          label: '足刀',
          description: '中足刀ボタン',
          iconText: 'SP',
          showLabel: false,
        },
        suffix,
        tip: '↓＋SP（※モダン限定：簡単コマンドでのみ発動可能）',
      };
    }

    // クラシック（236+K: ↓↘→ + K）
    const strength = isOD ? 'OD' : isHeavy ? '強' : isWeak ? '弱' : '中';
    const color: ButtonColor = isOD ? 'purple' : isHeavy ? 'red' : isWeak ? 'blue' : 'yellow';
    return {
      original: remaining,
      isCancel,
      isRush,
      rushText,
      prefix,
      arrows: ['↓', '↘', '→'],
      arrowStr: '↓↘→',
      button: {
        kind: 'kick',
        color,
        label: isOD ? 'OD足刀' : '足刀',
        description: isOD ? 'ODボタン' : `${strength}キックボタン`,
        iconText: isOD ? 'KK' : 'K',
        showLabel: false,
      },
      suffix,
      tip: `テンキー236+${isOD ? 'KK（2ボタン同時）' : strength + 'K'}（下・斜め前・前）`,
    };
  }

  // 4. 必殺技：竜巻旋風脚
  if (lower.includes('竜巻')) {
    const isOD = lower.includes('od');
    const isWeak = lower.includes('弱');
    const isHeavy = lower.includes('強') || lower.includes('大');
    const isMed = lower.includes('中') || (!isWeak && !isHeavy && !isOD);

    if (controlType === 'modern') {
      if (isOD) {
        return {
          original: remaining,
          isCancel,
          isRush,
          rushText,
          prefix,
          arrows: ['←'],
          arrowStr: '←',
          button: {
            kind: 'special',
            color: 'purple',
            label: 'OD竜巻',
            description: 'OD竜巻ボタン',
            iconText: 'A+SP',
            showLabel: false,
          },
          suffix,
          tip: '後ろ＋A＋SP（※モダン限定：簡単コマンドでのみ発動可能）',
        };
      }

      if (isWeak) {
        return {
          original: remaining,
          isCancel,
          isRush,
          rushText,
          prefix,
          arrows: ['↓', '↙', '←'],
          arrowStr: '↓↙←',
          button: {
            kind: 'kick',
            color: 'blue',
            label: '竜巻',
            description: '弱竜巻ボタン',
            iconText: '弱',
            showLabel: false,
          },
          suffix,
          tip: 'テンキー214+弱（またはA弱アシストコンボ派生）',
        };
      }

      // 中竜巻（または単に竜巻）
      return {
        original: remaining,
        isCancel,
        isRush,
        rushText,
        prefix,
        arrows: ['←'],
        arrowStr: '←',
        button: {
          kind: 'special',
          color: 'emerald',
          label: '竜巻',
          description: '中竜巻ボタン',
          iconText: 'SP',
          showLabel: false,
        },
        suffix,
        tip: '後ろ＋SP（※モダン限定：簡単コマンドでのみ発動可能）',
      };
    }

    // クラシック（214+K: ↓↙← + K）
    const strength = isOD ? 'OD' : isHeavy ? '強' : isWeak ? '弱' : '中';
    const color: ButtonColor = isOD ? 'purple' : isHeavy ? 'red' : isWeak ? 'blue' : 'yellow';
    return {
      original: remaining,
      isCancel,
      isRush,
      rushText,
      prefix,
      arrows: ['↓', '↙', '←'],
      arrowStr: '↓↙←',
      button: {
        kind: 'kick',
        color,
        label: isOD ? 'OD竜巻' : '竜巻',
        description: isOD ? 'ODボタン' : `${strength}キックボタン`,
        iconText: isOD ? 'KK' : 'K',
        showLabel: false,
      },
      suffix,
      tip: `テンキー214+${isOD ? 'KK（2ボタン同時）' : strength + 'K'}（下・斜め後ろ・後ろ）`,
    };
  }

  // 5. 必殺技：昇竜拳 / キャノンスパイク
  if (lower.includes('昇竜') || lower.includes('昇龍') || lower.includes('スパイク')) {
    const isKick = lower.includes('スパイク');
    const isOD = lower.includes('od');
    const isHeavy = lower.includes('強') || lower.includes('大') || (!lower.includes('弱') && !lower.includes('中') && !isOD);
    const isLight = lower.includes('弱');
    const isMed = lower.includes('中');

    if (controlType === 'modern') {
      if (isOD) {
        return {
          original: remaining,
          isCancel,
          isRush,
          rushText,
          prefix,
          arrows: ['→'],
          arrowStr: '→',
          button: {
            kind: 'special',
            color: 'purple',
            label: 'OD昇竜',
            description: 'OD昇竜ボタン',
            iconText: 'A+SP',
            showLabel: false,
          },
          suffix,
          tip: '前＋A＋SP（手動テンキー623+PPでも入力可能）',
        };
      }

      if (isHeavy) {
        return {
          original: remaining,
          isCancel,
          isRush,
          rushText,
          prefix,
          arrows: ['→'],
          arrowStr: '→',
          button: {
            kind: isKick ? 'kick' : 'punch',
            color: 'red',
            label: isKick ? 'スパイク' : '昇竜',
            description: '強昇竜ボタン',
            iconText: 'SP',
            showLabel: false,
          },
          suffix,
          tip: '前＋SP（手動テンキー623+強でも入力可能）',
        };
      }

      return {
        original: remaining,
        isCancel,
        isRush,
        rushText,
        prefix,
        arrows: ['→', '↓', '↘'],
        arrowStr: '→↓↘',
        button: {
          kind: isKick ? 'kick' : 'punch',
          color: isLight ? 'blue' : 'yellow',
          label: isKick ? 'スパイク' : '昇竜',
          description: isLight ? '青いボタン' : '黄色いボタン',
          iconText: isLight ? '弱' : '中',
          showLabel: false,
        },
        suffix,
        tip: `テンキー623+${isLight ? '弱' : '中'}（前・下・斜め前）`,
      };
    }

    // クラシック（623+P: →↓↘ + P）
    const strength = isOD ? 'OD' : isHeavy ? '強' : isLight ? '弱' : '中';
    const color: ButtonColor = isOD ? 'purple' : isHeavy ? 'red' : isLight ? 'blue' : 'yellow';
    const kind: ButtonKind = isKick ? 'kick' : 'punch';
    const btnChar = isKick ? 'K' : 'P';
    return {
      original: remaining,
      isCancel,
      isRush,
      rushText,
      prefix,
      arrows: ['→', '↓', '↘'],
      arrowStr: '→↓↘',
      button: {
        kind,
        color,
        label: isOD ? (isKick ? 'ODスパイク' : 'OD昇竜') : (isKick ? 'スパイク' : '昇竜'),
        description: isOD ? 'ODボタン' : `${strength}${isKick ? 'キック' : 'パンチ'}ボタン`,
        iconText: isOD ? (isKick ? 'KK' : 'PP') : btnChar,
        showLabel: false,
      },
      suffix,
      tip: `テンキー623+${isOD ? (btnChar + btnChar + '（2ボタン同時）') : strength + btnChar}（前・下・斜め前）`,
    };
  }

  // 6. 必殺技：波掌撃 / 電刃波掌撃 (214+P: ↓↙← + P)
  if (lower.includes('波掌')) {
    const isOD = lower.includes('od');
    const isDenjin = lower.includes('電刃');
    const isHeavy = lower.includes('強') || lower.includes('大') || (!lower.includes('弱') && !lower.includes('中') && !isOD);
    const isLight = lower.includes('弱');
    const isModern = controlType === 'modern';

    if (isDenjin) {
      return {
        original: remaining,
        isCancel,
        isRush,
        rushText,
        prefix,
        arrows: ['↓', '↙', '←'],
        arrowStr: '↓↙←',
        button: {
          kind: 'punch',
          color: isOD ? 'purple' : 'red',
          label: isOD ? 'OD電刃波掌撃' : '電刃波掌撃',
          description: isOD ? 'OD電刃波掌撃' : isModern ? '強ボタン' : '強パンチボタン',
          iconText: isOD ? 'PP' : isModern ? '強' : 'P',
          showLabel: false,
        },
        suffix,
        tip: isOD
          ? 'テンキー214+PP（※電刃ストック消費のOD電刃波掌撃。高火力追撃・画面端コンボ用）'
          : isModern
          ? 'テンキー214+強（※電刃ストック消費の電刃波掌撃。ガードされても+3F有利）'
          : 'テンキー214+強P（※電刃ストック消費の電刃波掌撃。ガードされても+3F有利）',
      };
    }

    const color: ButtonColor = isOD ? 'purple' : isHeavy ? 'red' : isLight ? 'blue' : 'yellow';
    const strength = isOD ? 'OD' : isHeavy ? '強' : isLight ? '弱' : '中';
    const label = isOD ? 'OD波掌撃' : '波掌撃';
    const tipBtn = isOD ? 'PP（2ボタン同時）' : isModern ? strength : `${strength}P`;
    const iconText = isOD ? 'PP' : isModern ? (isLight ? '弱' : isHeavy ? '強' : '中') : 'P';

    return {
      original: remaining,
      isCancel,
      isRush,
      rushText,
      prefix,
      arrows: ['↓', '↙', '←'],
      arrowStr: '↓↙←',
      button: {
        kind: 'punch',
        color,
        label,
        description: isOD ? 'ODボタン' : `${strength}パンチボタン`,
        iconText,
        showLabel: false,
      },
      suffix,
      tip: `テンキー214+${tipBtn}（下・斜め後ろ・後ろ）`,
    };
  }

  // 7. 必殺技：波動拳 / 弾
  if (lower.includes('波動') || lower.includes('弾') || lower.includes('気功')) {
    const isOD = lower.includes('od');
    const isHeavy = lower.includes('強') || lower.includes('大') || (!lower.includes('弱') && !lower.includes('中') && !isOD);
    const isLight = lower.includes('弱');

    if (controlType === 'modern') {
      if (isOD) {
        return {
          original: remaining,
          isCancel,
          isRush,
          rushText,
          prefix,
          arrows: [],
          arrowStr: 'N',
          button: {
            kind: 'special',
            color: 'purple',
            label: 'OD弾',
            description: 'OD弾ボタン',
            iconText: 'A+SP',
            showLabel: false,
          },
          suffix,
          tip: 'N＋A＋SP（手動テンキー236+PPでも入力可能）',
        };
      }

      if (isHeavy) {
        return {
          original: remaining,
          isCancel,
          isRush,
          rushText,
          prefix,
          arrows: [],
          arrowStr: 'N',
          button: {
            kind: 'special',
            color: 'red',
            label: '波動',
            description: '強波動ボタン',
            iconText: 'SP',
            showLabel: false,
          },
          suffix,
          tip: 'N＋SP（手動テンキー236+強でも入力可能）',
        };
      }

      return {
        original: remaining,
        isCancel,
        isRush,
        rushText,
        prefix,
        arrows: ['↓', '↘', '→'],
        arrowStr: '↓↘→',
        button: {
          kind: 'punch',
          color: isLight ? 'blue' : 'yellow',
          label: '波動',
          description: isLight ? '青いボタン' : '黄色いボタン',
          iconText: isLight ? '弱' : '中',
          showLabel: false,
        },
        suffix,
        tip: `テンキー236+${isLight ? '弱' : '中'}（下・斜め前・前）`,
      };
    }

    // クラシック（236+P: ↓↘→ + P）
    const strength = isOD ? 'OD' : isHeavy ? '強' : isLight ? '弱' : '中';
    const color: ButtonColor = isOD ? 'purple' : isHeavy ? 'red' : isLight ? 'blue' : 'yellow';
    return {
      original: remaining,
      isCancel,
      isRush,
      rushText,
      prefix,
      arrows: ['↓', '↘', '→'],
      arrowStr: '↓↘→',
      button: {
        kind: 'punch',
        color,
        label: isOD ? 'OD弾' : '波動',
        description: isOD ? 'ODボタン' : `${strength}パンチボタン`,
        iconText: isOD ? 'PP' : 'P',
        showLabel: false,
      },
      suffix,
      tip: `テンキー236+${isOD ? 'PP（2ボタン同時）' : strength + 'P'}（下・斜め前・前）`,
    };
  }

  // 8. 二連撃 / ターゲットコンボ（大TC / 大>大）
  if (
    lower.includes('二連撃') ||
    lower.includes('ターゲット') ||
    lower.includes('大tc') ||
    lower.includes('大ptc') ||
    lower.includes('大>大') ||
    lower.includes('大＞大')
  ) {
    const isModern = controlType === 'modern';
    return {
      original: remaining,
      isCancel,
      isRush,
      rushText,
      prefix,
      arrows: [],
      arrowStr: '',
      button: {
        kind: 'punch',
        color: 'red',
        label: isModern ? '大 ➔ 大' : 'P ➔ K',
        description: isModern ? '赤いボタン（大 ➔ 大）' : '赤いボタン（ターゲットコンボ）',
        iconText: isModern ? '大' : 'P',
        showLabel: false,
      },
      suffix,
      tip: isModern ? '強攻撃ヒット後にもう一度強攻撃を入力（大 ➔ 大）' : '強Pヒット後にすかさず強Kを入力',
    };
  }

  // 9. 後ろ入れ特殊技（引大P, 引大, 引き強P, 4HP, 後大K等）
  if (lower.includes('引') || lower.startsWith('4') || lower.includes('後大') || lower.includes('後強')) {
    const isModern = controlType === 'modern';
    const isKick = lower.includes('k') || lower.includes('hk') || lower.includes('キック');
    const kind: ButtonKind = isKick ? 'kick' : 'punch';
    const label = isModern ? '大' : isKick ? 'K' : 'P';

    return {
      original: remaining,
      isCancel,
      isRush,
      rushText,
      prefix,
      arrows: ['←'],
      arrowStr: '←',
      button: {
        kind,
        color: 'red',
        label,
        description: isModern ? '赤いボタン（大）' : isKick ? '赤いボタン（強K）' : '赤いボタン（強P）',
        iconText: label,
        showLabel: false,
      },
      suffix,
    };
  }

  // 10. 前入れ特殊技（前大P, 前大, 前大K, 大ゴス, 6HP, 6HK等）
  if (lower.startsWith('前') || lower.startsWith('6') || lower.includes('大ゴス')) {
    const isModern = controlType === 'modern';
    const isKick = lower.includes('k') || lower.includes('hk') || lower.includes('キック');
    const isHeavy = lower.includes('大') || lower.includes('強') || lower.includes('大ゴス') || lower.includes('hp') || lower.includes('hk');
    const color: ButtonColor = isHeavy ? 'red' : 'yellow';
    const kind: ButtonKind = isKick ? 'kick' : 'punch';
    const label = isModern ? (isHeavy ? '大' : '中') : isKick ? 'K' : 'P';

    return {
      original: remaining,
      isCancel,
      isRush,
      rushText,
      prefix,
      arrows: ['→'],
      arrowStr: '→',
      button: {
        kind,
        color,
        label,
        description: isHeavy
          ? isModern
            ? '赤いボタン（大）'
            : isKick
            ? '赤いボタン（強K）'
            : '赤いボタン（強P）'
          : isModern
          ? '黄色いボタン（中）'
          : isKick
          ? '黄色いボタン（中K）'
          : '黄色いボタン（中P）',
        iconText: label,
        showLabel: false,
      },
      suffix,
    };
  }

  // 11. しゃがみ通常技（下中P, 下中K, 下大P, 下弱P, 下中, 下大, 下弱, 中足, 大足等）
  if (
    lower.startsWith('下') ||
    lower.startsWith('2') ||
    lower.startsWith('しゃがみ') ||
    lower.startsWith('屈') ||
    lower.includes('中足') ||
    lower.includes('大足')
  ) {
    const isModern = controlType === 'modern';
    const isKick = lower.includes('k') || lower.includes('足') || lower.includes('キック') || lower.includes('hk') || lower.includes('mk') || lower.includes('lk');
    const isHeavy = lower.includes('大') || lower.includes('強') || lower.includes('大足') || lower.includes('hp') || lower.includes('hk');
    const isLight = lower.includes('弱') || lower.includes('小') || lower.includes('コパ') || lower.includes('lp') || lower.includes('lk');
    const color: ButtonColor = isHeavy ? 'red' : isLight ? 'blue' : 'yellow';
    const kind: ButtonKind = isKick ? 'kick' : 'punch';
    const label = isModern ? (isLight ? '弱' : isHeavy ? '大' : '中') : isKick ? 'K' : 'P';

    return {
      original: remaining,
      isCancel,
      isRush,
      rushText,
      prefix,
      arrows: ['↓'],
      arrowStr: '↓',
      button: {
        kind,
        color,
        label,
        description: isLight
          ? isModern
            ? '青いボタン（弱）'
            : isKick
            ? '青いボタン（弱K）'
            : '青いボタン（弱P）'
          : isHeavy
          ? isModern
            ? '赤いボタン（大）'
            : isKick
            ? '赤いボタン（強K）'
            : '赤いボタン（強P）'
          : isModern
          ? '黄色いボタン（中）'
          : isKick
          ? '黄色いボタン（中K）'
          : '黄色いボタン（中P）',
        iconText: label,
        showLabel: false,
      },
      suffix,
    };
  }

  // 12. 移動技（微後退、歩き等）
  if (lower.includes('微後退') || lower.includes('後退') || lower.includes('歩き') || lower.includes('歩')) {
    return {
      original: remaining,
      isCancel,
      isRush,
      rushText,
      prefix,
      arrows: ['←'],
      arrowStr: '←',
      button: {
        kind: 'special',
        color: 'neutral',
        label: remaining,
        iconText: '←',
        showLabel: false,
      },
      suffix,
      tip: '少しだけ後ろに下がって間合いを調整',
    };
  }

  // 13. モダン単体攻撃（「中」「弱」「大」）
  if (lower === '中' || lower === '弱' || lower === '大') {
    const color: ButtonColor = lower === '大' ? 'red' : lower === '弱' ? 'blue' : 'yellow';
    return {
      original: remaining,
      isCancel,
      isRush,
      rushText,
      prefix,
      arrows: [],
      arrowStr: '',
      button: {
        kind: 'punch',
        color,
        label: remaining,
        description: color === 'red' ? '赤いボタン' : color === 'blue' ? '青いボタン' : '黄色いボタン',
        iconText: remaining,
        showLabel: false,
      },
      suffix,
    };
  }

  // 14. 立ち通常技（弱P, 弱K, 中P, 中K, 大P, 大K等）
  const isModern = controlType === 'modern';
  const isKick = lower.includes('k') || lower.includes('キック') || lower.includes('hk') || lower.includes('mk') || lower.includes('lk');
  const isHeavy = lower.includes('大') || lower.includes('強') || lower.includes('hp') || lower.includes('hk');
  const isLight = lower.includes('弱') || lower.includes('小') || lower.includes('lp') || lower.includes('lk');
  const color: ButtonColor = isHeavy ? 'red' : isLight ? 'blue' : 'yellow';
  const kind: ButtonKind = isKick ? 'kick' : 'punch';
  const label = isModern
    ? isLight
      ? '弱'
      : isHeavy
      ? '大'
      : '中'
    : isKick
    ? 'K'
    : 'P';
  const iconText = label;

  return {
    original: remaining,
    isCancel,
    isRush,
    rushText,
    prefix,
    arrows: [],
    arrowStr: '',
    button: {
      kind,
      color,
      label,
      description: isLight
        ? isModern
          ? '青いボタン（弱）'
          : isKick
          ? '青いボタン（弱K）'
          : '青いボタン（弱P）'
        : isHeavy
        ? isModern
          ? '赤いボタン（大）'
          : isKick
          ? '赤いボタン（強K）'
          : '赤いボタン（強P）'
        : isModern
        ? '黄色いボタン（中）'
        : isKick
        ? '黄色いボタン（中K）'
        : '黄色いボタン（中P）',
      iconText,
      showLabel: false,
    },
    suffix,
  };
}

/**
 * モダン表記からPやKの概念を完全に除去するポストプロセッサ（※OD技のPP/KKは除く）
 */
function cleanupModernStep(step: VisualStep): VisualStep {
  // スピニングバードキックはモダンでも「↓↑K」表記指定があるためそのまま維持
  const isSbk =
    (step.button.label && (step.button.label.includes('スピバ') || step.button.label.includes('スピニング'))) ||
    step.arrowStr === '↓↑';
  if (isSbk) {
    return step;
  }

  // OD必殺技（PPやKKを含む、またはA+SP、または技名がODで始まるもの）は維持
  const isOD =
    step.button.iconText === 'PP' ||
    step.button.iconText === 'KK' ||
    step.button.iconText === 'A+SP' ||
    (step.button.label && step.button.label.startsWith('OD'));

  // 1. ラベルからP/Kを除去（OD必殺技のPP/KKは除く）
  if (!isOD) {
    step.button.label = step.button.label
      .replace(/^[前引下後]/, '')
      .replace(/大[PK]/g, '大')
      .replace(/強[PK]/g, '強')
      .replace(/中[PK]/g, '中')
      .replace(/弱[PK]/g, '弱')
      .replace(/ジャンプ大P/g, 'ジャンプA大')
      .replace(/ジャンプ大K/g, 'ジャンプA大')
      .replace(/ジャンプ中[PK]/g, 'ジャンプ中')
      .replace(/ジャンプ弱[PK]/g, 'ジャンプ弱')
      .replace(/(?<![POK])([PK])$/i, '');
  }

  // 2. ボタンiconTextから単独P/Kを除去
  if (step.button.iconText === 'P' || step.button.iconText === 'K') {
    step.button.iconText =
      step.button.color === 'red'
        ? '大'
        : step.button.color === 'blue'
        ? '弱'
        : step.button.color === 'yellow'
        ? '中'
        : '攻撃';
  } else if (!isOD && step.button.iconText !== 'SP' && step.button.iconText !== 'A+SP') {
    step.button.iconText = step.button.iconText
      .replace(/^[前引下後]/, '')
      .replace(/大[PK]/g, '大')
      .replace(/強[PK]/g, '強')
      .replace(/中[PK]/g, '中')
      .replace(/弱[PK]/g, '弱')
      .replace(/(?<![POK])([PK])$/i, '');
  }

  // 3. tipのクリーンアップ（OD技の236+PP等は維持）
  if (step.tip) {
    step.tip = step.tip
      .replace(/\+強[PK]/g, '+強')
      .replace(/\+中[PK]/g, '+中')
      .replace(/\+弱[PK]/g, '+弱')
      .replace(/\+大[PK]/g, '+大')
      .replace(/強P/g, '強')
      .replace(/中P/g, '中')
      .replace(/弱P/g, '弱')
      .replace(/強K/g, '強')
      .replace(/中K/g, '中')
      .replace(/弱K/g, '弱')
      .replace(/パンチ/g, '攻撃')
      .replace(/キック/g, '攻撃');

    // 単独の +P や +K を +攻撃 に置換（ただし +PP, +KK は維持）
    step.tip = step.tip.replace(/\+(?<!P)[PK](?!P|K)/g, '+攻撃');
  }

  return step;
}
