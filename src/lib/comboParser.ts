/**
 * コンボレシピ文字列を初心者にも分かりやすい視覚的なコマンドステップに分解・変換するユーティリティ
 * 矢印表記（↓, ↓↙←, →↓↘等）とカラーボタン（黄色いパンチボタン、赤いパンチボタン等）を生成
 */

export type ButtonColor = 'blue' | 'yellow' | 'red' | 'purple' | 'gold' | 'neutral';
export type ButtonKind = 'punch' | 'kick' | 'both' | 'parry' | 'special';

export interface VisualStep {
  original: string;
  isCancel?: boolean;      // "キャンセル"（ボタンの前に青文字で表示）
  isRush?: boolean;        // "ラッシュ"（ボタンの前に青文字で表示）
  rushText?: string;       // "ラッシュ" または "生ラッシュ"
  prefix?: string;         // 例: "壁バウンド"
  arrows: string[];        // 例: ["↓"], ["↓", "↙", "←"], ["→", "↓", "↘"]
  arrowStr: string;        // 例: "↓", "↓↙←", "→↓↘"
  button: {
    kind: ButtonKind;
    color: ButtonColor;
    label: string;         // 例: "弱P", "中P", "強P", "弱K", "中K", "強K", "PP", "KK"
    description?: string;  // ツールチップ用
    iconText: string;      // "P", "K", "PP", "KK", "SA"
  };
  suffix?: string;         // 例: "（カス当たり）", "（最速）" ※ダメージ数値は除外
  tip?: string;
}

export function parseVisualCombo(recipe: string): VisualStep[] {
  if (!recipe) return [];

  // 1. レシピ末尾のダメージ数値（例: （4247）, (4247), (4247ダメージ), [4247]）を除去
  let cleanRecipe = recipe
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

  return rawParts.map((part) => parseSinglePart(part));
}

function parseSinglePart(text: string): VisualStep {
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

  // 4. キャンセルの抽出
  let isCancel = false;
  if (remaining.includes('キャンセル')) {
    isCancel = true;
    remaining = remaining.replace(/キャンセル/g, '').trim();
  }

  // 5. ラッシュの抽出
  let isRush = false;
  let rushText: string | undefined;
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

  // 6. その他のプレフィックス（壁バウンドなど）
  let prefix: string | undefined;
  if (remaining.includes('壁ドン') || remaining.includes('壁バウンド')) {
    prefix = '壁バウンド';
    remaining = remaining.replace(/壁ドン|壁バウンド/g, '').trim();
  }

  // 再度〆や余分な空白を除去
  remaining = remaining.replace(/〆|締め?$/, '').trim();

  const lower = remaining.toLowerCase();

  // 1. SA (スーパーアーツ)
  if (lower.includes('sa3') || lower.includes('真・昇龍') || lower.includes('ca')) {
    return {
      original: remaining || 'SA3',
      isCancel,
      isRush,
      rushText,
      prefix,
      arrows: ['↓', '↘', '→', '↓', '↘', '→'],
      arrowStr: '↓↘→↓↘→',
      button: {
        kind: 'punch',
        color: 'gold',
        label: 'SA3',
        description: '金のSAボタン（パンチ）',
        iconText: 'SA3',
      },
      suffix,
      tip: 'テンキー236を2回素早く入力+パンチ（またはモダン：ワンボタンSA）',
    };
  }

  if (lower.includes('sa2') || lower.includes('真・波掌')) {
    return {
      original: remaining || 'SA2',
      isCancel,
      isRush,
      rushText,
      prefix,
      arrows: ['↓', '↙', '←', '↓', '↙', '←'],
      arrowStr: '↓↙←↓↙←',
      button: {
        kind: 'punch',
        color: 'gold',
        label: 'SA2',
        description: '金のSAボタン（パンチ）',
        iconText: 'SA2',
      },
      suffix,
      tip: 'テンキー214を2回素早く入力+パンチ',
    };
  }

  if (lower.includes('sa1') || lower.includes('真空波動')) {
    return {
      original: remaining || 'SA1',
      isCancel,
      isRush,
      rushText,
      prefix,
      arrows: ['↓', '↘', '→', '↓', '↘', '→'],
      arrowStr: '↓↘→↓↘→',
      button: {
        kind: 'punch',
        color: 'gold',
        label: 'SA1',
        description: '金のSAボタン（パンチ）',
        iconText: 'SA1',
      },
      suffix,
      tip: 'テンキー236を2回素早く入力+パンチ',
    };
  }

  // 2. 必殺技：波掌撃 (214+P: ↓↙← + P)
  if (lower.includes('波掌')) {
    const isOD = lower.includes('od');
    const isHeavy = lower.includes('強') || lower.includes('大');
    const isLight = lower.includes('弱');
    const color: ButtonColor = isOD ? 'purple' : isHeavy ? 'red' : isLight ? 'blue' : 'yellow';
    const strength = isOD ? 'OD' : isHeavy ? '強' : isLight ? '弱' : '中';
    const label = isOD ? 'OD波掌' : `${strength}P`;
    const tipBtn = isOD ? 'PP（2ボタン同時）' : `${strength}P`;

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
        iconText: isOD ? 'PP' : 'P',
      },
      suffix,
      tip: `テンキー214+${tipBtn}（下・斜め後ろ・後ろ）`,
    };
  }

  // 3. 必殺技：竜巻旋風脚 (214+K: ↓↙← + K)
  if (lower.includes('竜巻')) {
    const isOD = lower.includes('od');
    const isHeavy = lower.includes('強') || lower.includes('大');
    const isLight = lower.includes('弱');
    const color: ButtonColor = isOD ? 'purple' : isHeavy ? 'red' : isLight ? 'blue' : 'yellow';
    const strength = isOD ? 'OD' : isHeavy ? '強' : isLight ? '弱' : '中';
    const label = isOD ? 'OD竜巻' : `${strength}K`;
    const tipBtn = isOD ? 'KK（2ボタン同時）' : `${strength}K`;

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
        label,
        description: isOD ? 'ODボタン' : `${strength}キックボタン`,
        iconText: isOD ? 'KK' : 'K',
      },
      suffix,
      tip: `テンキー214+${tipBtn}（下・斜め後ろ・後ろ）`,
    };
  }

  // 4. 必殺技：昇竜拳 / キャノンスパイク (623+P/K: →↓↘ + P/K)
  if (lower.includes('昇竜') || lower.includes('昇龍') || lower.includes('スパイク')) {
    const isKick = lower.includes('スパイク');
    const isOD = lower.includes('od');
    const isHeavy = lower.includes('強') || lower.includes('大');
    const isLight = lower.includes('弱');
    const color: ButtonColor = isOD ? 'purple' : isHeavy ? 'red' : isLight ? 'blue' : 'yellow';
    const strength = isOD ? 'OD' : isHeavy ? '強' : isLight ? '弱' : '中';
    const btnType = isKick ? 'K' : 'P';
    const label = isOD ? (isKick ? 'ODスパイク' : 'OD昇竜') : `${strength}${btnType}`;
    const tipBtn = isOD ? (isKick ? 'KK（2ボタン同時）' : 'PP（2ボタン同時）') : `${strength}${btnType}`;

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
        color,
        label,
        description: isOD ? 'ODボタン' : `${strength}ボタン`,
        iconText: isOD ? (isKick ? 'KK' : 'PP') : btnType,
      },
      suffix,
      tip: `テンキー623+${tipBtn}（前・下・斜め前）`,
    };
  }

  // 5. 必殺技：上段足刀破り / スパイラルアロー (236+K: ↓↘→ + K)
  if (lower.includes('足刀') || lower.includes('アロー') || lower.includes('百裂')) {
    const isOD = lower.includes('od');
    const isHeavy = lower.includes('強') || lower.includes('大');
    const isLight = lower.includes('弱');
    const color: ButtonColor = isOD ? 'purple' : isHeavy ? 'red' : isLight ? 'blue' : 'yellow';
    const strength = isOD ? 'OD' : isHeavy ? '強' : isLight ? '弱' : '中';
    const label = isOD ? 'OD技' : `${strength}K`;
    const tipBtn = isOD ? 'KK（2ボタン同時）' : `${strength}K`;

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
        label,
        description: isOD ? 'ODボタン' : `${strength}キックボタン`,
        iconText: isOD ? 'KK' : 'K',
      },
      suffix,
      tip: `テンキー236+${tipBtn}（下・斜め前・前）`,
    };
  }

  // 6. 必殺技：波動拳 / 弾 / 気功拳 (236+P: ↓↘→ + P)
  if (lower.includes('波動') || lower.includes('弾') || lower.includes('気功')) {
    const isOD = lower.includes('od');
    const isHeavy = lower.includes('強') || lower.includes('大');
    const isLight = lower.includes('弱');
    const color: ButtonColor = isOD ? 'purple' : isHeavy ? 'red' : isLight ? 'blue' : 'yellow';
    const strength = isOD ? 'OD' : isHeavy ? '強' : isLight ? '弱' : '中';
    const label = isOD ? 'OD弾' : `${strength}P`;
    const tipBtn = isOD ? 'PP（2ボタン同時）' : `${strength}P`;

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
        label,
        description: isOD ? 'ODボタン' : `${strength}パンチボタン`,
        iconText: isOD ? 'PP' : 'P',
      },
      suffix,
      tip: `テンキー236+${tipBtn}（下・斜め前・前）`,
    };
  }

  // 7. 二連撃 / ターゲットコンボ
  if (lower.includes('二連撃') || lower.includes('ターゲット')) {
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
        label: '強P ➔ 強K',
        description: '赤いボタン（ターゲットコンボ）',
        iconText: 'P',
      },
      suffix,
      tip: '強Pヒット後にすかさず強Kを入力',
    };
  }

  // 8. 後ろ入れ特殊技（引大P, 引き強P, 4HP, 後大K等）
  if (lower.includes('引') || lower.startsWith('4') || lower.includes('後大') || lower.includes('後強')) {
    const isKick = lower.includes('k');
    const kind: ButtonKind = isKick ? 'kick' : 'punch';
    const iconText = isKick ? 'K' : 'P';
    const label = isKick ? '引大K' : '引大P';

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
        description: '赤いボタン',
        iconText,
      },
      suffix,
      tip: '後ろキー（ガード方向）を入力しながら強P',
    };
  }

  // 9. 前入れ特殊技（前大P, 前大K, 大ゴス, 6HP, 6HK等）
  if (lower.startsWith('前') || lower.startsWith('6') || lower.includes('大ゴス')) {
    const isKick = lower.includes('k');
    const isHeavy = lower.includes('大') || lower.includes('強') || lower.includes('大ゴス');
    const color: ButtonColor = isHeavy ? 'red' : 'yellow';
    const kind: ButtonKind = isKick ? 'kick' : 'punch';
    const iconText = isKick ? 'K' : 'P';
    const label = lower.includes('大ゴス') ? '前大P' : isKick ? '前大K' : '前大P';

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
        description: isHeavy ? '赤いボタン' : '黄色いボタン',
        iconText,
      },
      suffix,
      tip: '前キーを押しながらボタン',
    };
  }

  // 10. しゃがみ通常技（下中P, 下中K, 下大P, 下弱P, 中足, 大足等）
  if (
    lower.startsWith('下') ||
    lower.startsWith('2') ||
    lower.startsWith('しゃがみ') ||
    lower.startsWith('屈') ||
    lower.includes('中足') ||
    lower.includes('大足')
  ) {
    const isKick = lower.includes('k') || lower.includes('足') || lower.includes('キック');
    const isHeavy = lower.includes('大') || lower.includes('強') || lower.includes('大足');
    const isLight = lower.includes('弱') || lower.includes('小') || lower.includes('コパ');
    const color: ButtonColor = isHeavy ? 'red' : isLight ? 'blue' : 'yellow';
    const kind: ButtonKind = isKick ? 'kick' : 'punch';
    const iconText = isKick ? 'K' : 'P';
    const label = isLight
      ? (isKick ? '下弱K' : '下弱P')
      : isHeavy
      ? (isKick ? '下大K' : '下大P')
      : (isKick ? '下中K' : '下中P');

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
        description: isLight ? '青いボタン' : isHeavy ? '赤いボタン' : '黄色いボタン',
        iconText,
      },
      suffix,
      tip: '下キー（しゃがみ）を入力しながらボタン',
    };
  }

  // 11. 移動技（微後退、歩き等）
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
      },
      suffix,
      tip: '少しだけ後ろに下がって間合いを調整',
    };
  }

  // 12. 立ち通常技（弱P, 弱K, 中P, 中K, 大P, 大K等）
  const isKick = lower.includes('k') || lower.includes('キック');
  const isHeavy = lower.includes('大') || lower.includes('強');
  const isLight = lower.includes('弱') || lower.includes('小');
  const color: ButtonColor = isHeavy ? 'red' : isLight ? 'blue' : 'yellow';
  const kind: ButtonKind = isKick ? 'kick' : 'punch';
  const iconText = isKick ? 'K' : 'P';
  const label = isLight
    ? (isKick ? '弱K' : '弱P')
    : isHeavy
    ? (isKick ? '大K' : '大P')
    : (isKick ? '中K' : '中P');

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
      description: isLight ? '青いボタン' : isHeavy ? '赤いボタン' : '黄色いボタン',
      iconText,
    },
    suffix,
  };
}
