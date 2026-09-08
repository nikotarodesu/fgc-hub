/**
 * コンボレシピ文字列を初心者にも分かりやすい視覚的なコマンドステップに分解・変換するユーティリティ
 * 矢印表記（↓, ↓↙←, →↓↘等）とカラーボタン（黄色いパンチボタン、赤いパンチボタン等）を生成
 */

export type ButtonColor = 'blue' | 'yellow' | 'red' | 'purple' | 'gold' | 'neutral';
export type ButtonKind = 'punch' | 'kick' | 'both' | 'parry' | 'special';

export interface VisualStep {
  original: string;
  prefix?: string;         // 例: "ラッシュ", "生ラッシュ", "壁ドン"
  arrows: string[];        // 例: ["↓"], ["↓", "↙", "←"], ["→", "↓", "↘"]
  arrowStr: string;        // 例: "↓", "↓↙←", "→↓↘"
  button: {
    kind: ButtonKind;
    color: ButtonColor;
    label: string;         // 例: "弱P", "中P", "強P", "弱K", "中K", "強K", "PP", "KK"
    description: string;   // 例: "青いパンチボタン", "黄色いパンチボタン", "赤いパンチボタン"
    iconText: string;      // "P", "K", "PP", "KK", "SA"
  };
  suffix?: string;         // 例: "（カス当たり）", "（最速）"
  tip?: string;
}

export function parseVisualCombo(recipe: string): VisualStep[] {
  if (!recipe) return [];

  // 〆や余分な空白を除去
  const cleanRecipe = recipe.replace(/〆$/, '').trim();

  // ">" または "→" で分割
  const rawParts = cleanRecipe.split(/>|→(?!\+)/).map((p) => p.trim()).filter(Boolean);

  return rawParts.map((part) => parseSinglePart(part));
}

function parseSinglePart(text: string): VisualStep {
  const original = text.trim();
  let remaining = original;

  // 1. サフィックス（補足情報: （カス当たり）など）の抽出
  let suffix: string | undefined;
  const suffixMatch = remaining.match(/[（\(](.*?)[）\)]$/);
  if (suffixMatch) {
    suffix = `（${suffixMatch[1]}）`;
    remaining = remaining.replace(/[（\(](.*?)[）\)]$/, '').trim();
  }

  // 2. プレフィックス（ラッシュ、壁ドン、生ラッシュなど）の抽出
  let prefix: string | undefined;
  if (remaining.includes('生ラッシュ')) {
    prefix = '生ラッシュ';
    remaining = remaining.replace('生ラッシュ', '').trim();
  } else if (remaining.includes('ラッシュ')) {
    prefix = 'ラッシュ';
    remaining = remaining.replace('ラッシュ', '').trim();
  } else if (remaining.includes('壁ドン')) {
    prefix = '壁バウンド';
    remaining = remaining.replace('壁ドン', '').trim();
  }

  const lower = remaining.toLowerCase();

  // 3. SA (スーパーアーツ)
  if (lower.includes('sa3') || lower.includes('真・昇龍') || lower.includes('ca')) {
    return {
      original,
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
      tip: '236を2回素早く回してパンチ（またはモダンワンボタン）',
    };
  }

  if (lower.includes('sa2') || lower.includes('真・波掌')) {
    return {
      original,
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
      tip: '214を2回素早く後ろへ回してパンチ',
    };
  }

  if (lower.includes('sa1') || lower.includes('真空波動')) {
    return {
      original,
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
      tip: '236を2回素早く回してパンチ',
    };
  }

  // 4. 必殺技：波掌撃 (214+P: ↓↙← + P)
  if (lower.includes('波掌')) {
    const isOD = lower.includes('od');
    const isHeavy = lower.includes('強') || lower.includes('大');
    const isLight = lower.includes('弱');
    const color: ButtonColor = isOD ? 'purple' : isHeavy ? 'red' : isLight ? 'blue' : 'yellow';
    const label = isOD ? 'OD波掌' : isHeavy ? '強P' : isLight ? '弱P' : '中P';
    const desc = isOD ? 'ODボタン（パンチ2つ同時）' : isHeavy ? '赤いパンチボタン' : isLight ? '青いパンチボタン' : '黄色いパンチボタン';

    return {
      original,
      prefix,
      arrows: ['↓', '↙', '←'],
      arrowStr: '↓↙←',
      button: {
        kind: 'punch',
        color,
        label,
        description: desc,
        iconText: isOD ? 'PP' : 'P',
      },
      suffix,
      tip: 'テンキー214+P（下・斜め後ろ・後ろ）',
    };
  }

  // 5. 必殺技：竜巻旋風脚 (214+K: ↓↙← + K)
  if (lower.includes('竜巻')) {
    const isOD = lower.includes('od');
    const isHeavy = lower.includes('強') || lower.includes('大');
    const isLight = lower.includes('弱');
    const color: ButtonColor = isOD ? 'purple' : isHeavy ? 'red' : isLight ? 'blue' : 'yellow';
    const label = isOD ? 'OD竜巻' : isHeavy ? '強K' : isLight ? '弱K' : '中K';
    const desc = isOD ? 'ODボタン（キック2つ同時）' : isHeavy ? '赤いキックボタン' : isLight ? '青いキックボタン' : '黄色いキックボタン';

    return {
      original,
      prefix,
      arrows: ['↓', '↙', '←'],
      arrowStr: '↓↙←',
      button: {
        kind: 'kick',
        color,
        label,
        description: desc,
        iconText: isOD ? 'KK' : 'K',
      },
      suffix,
      tip: 'テンキー214+K（下・斜め後ろ・後ろ）',
    };
  }

  // 6. 必殺技：昇竜拳 (623+P: →↓↘ + P)
  if (lower.includes('昇竜') || lower.includes('昇龍')) {
    const isOD = lower.includes('od');
    const isHeavy = lower.includes('強') || lower.includes('大');
    const isLight = lower.includes('弱');
    const color: ButtonColor = isOD ? 'purple' : isHeavy ? 'red' : isLight ? 'blue' : 'yellow';
    const label = isOD ? 'OD昇竜' : isHeavy ? '強P' : isLight ? '弱P' : '中P';
    const desc = isOD ? 'ODボタン（パンチ2つ同時）' : isHeavy ? '赤いパンチボタン' : isLight ? '青いパンチボタン' : '黄色いパンチボタン';

    return {
      original,
      prefix,
      arrows: ['→', '↓', '↘'],
      arrowStr: '→↓↘',
      button: {
        kind: 'punch',
        color,
        label,
        description: desc,
        iconText: isOD ? 'PP' : 'P',
      },
      suffix,
      tip: 'テンキー623+P（前・下・斜め前）',
    };
  }

  // 7. 必殺技：上段足刀破り (236+K: ↓↘→ + K)
  if (lower.includes('足刀')) {
    const isOD = lower.includes('od');
    const isHeavy = lower.includes('強') || lower.includes('大');
    const isLight = lower.includes('弱');
    const color: ButtonColor = isOD ? 'purple' : isHeavy ? 'red' : isLight ? 'blue' : 'yellow';
    const label = isOD ? 'OD足刀' : isHeavy ? '強K' : isLight ? '弱K' : '中K';
    const desc = isOD ? 'ODボタン（キック2つ同時）' : isHeavy ? '赤いキックボタン' : isLight ? '青いキックボタン' : '黄色いキックボタン';

    return {
      original,
      prefix,
      arrows: ['↓', '↘', '→'],
      arrowStr: '↓↘→',
      button: {
        kind: 'kick',
        color,
        label,
        description: desc,
        iconText: isOD ? 'KK' : 'K',
      },
      suffix,
      tip: 'テンキー236+K（下・斜め前・前）',
    };
  }

  // 8. 必殺技：波動拳 / 弾 (236+P: ↓↘→ + P)
  if (lower.includes('波動') || lower.includes('弾')) {
    const isOD = lower.includes('od');
    const isHeavy = lower.includes('強') || lower.includes('大');
    const isLight = lower.includes('弱');
    const color: ButtonColor = isOD ? 'purple' : isHeavy ? 'red' : isLight ? 'blue' : 'yellow';
    const label = isOD ? 'OD弾' : isHeavy ? '強P' : isLight ? '弱P' : '中P';
    const desc = isOD ? 'ODボタン（パンチ2つ同時）' : isHeavy ? '赤いパンチボタン' : isLight ? '青いパンチボタン' : '黄色いパンチボタン';

    return {
      original,
      prefix,
      arrows: ['↓', '↘', '→'],
      arrowStr: '↓↘→',
      button: {
        kind: 'punch',
        color,
        label,
        description: desc,
        iconText: isOD ? 'PP' : 'P',
      },
      suffix,
      tip: 'テンキー236+P（下・斜め前・前）',
    };
  }

  // 9. 二連撃 / ターゲットコンボ
  if (lower.includes('二連撃') || lower.includes('ターゲット')) {
    return {
      original,
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

  // 10. しゃがみ通常技（下中P, 下中K, 下大P, 下弱P等）
  if (lower.startsWith('下') || lower.startsWith('2') || lower.startsWith('しゃがみ')) {
    const isKick = lower.includes('k') || lower.includes('足');
    const isHeavy = lower.includes('大') || lower.includes('強');
    const isLight = lower.includes('弱');
    const color: ButtonColor = isHeavy ? 'red' : isLight ? 'blue' : 'yellow';
    const kind: ButtonKind = isKick ? 'kick' : 'punch';
    const iconText = isKick ? 'K' : 'P';
    const label = isLight ? (isKick ? '下弱K' : '下弱P') : isHeavy ? (isKick ? '下大K' : '下大P') : (isKick ? '下中K' : '下中P');
    const desc = isLight
      ? (isKick ? '青いキックボタン' : '青いパンチボタン')
      : isHeavy
      ? (isKick ? '赤いキックボタン' : '赤いパンチボタン')
      : (isKick ? '黄色いキックボタン' : '黄色いパンチボタン');

    return {
      original,
      prefix,
      arrows: ['↓'],
      arrowStr: '↓',
      button: {
        kind,
        color,
        label,
        description: desc,
        iconText,
      },
      suffix,
      tip: '下キー（しゃがみ）を入力しながらボタン',
    };
  }

  // 11. 前通常技（前大P, 前大K, 6HP, 6HK等）
  if (lower.startsWith('前') || lower.startsWith('6')) {
    const isKick = lower.includes('k');
    const isHeavy = lower.includes('大') || lower.includes('強');
    const color: ButtonColor = isHeavy ? 'red' : 'yellow';
    const kind: ButtonKind = isKick ? 'kick' : 'punch';
    const iconText = isKick ? 'K' : 'P';
    const label = isKick ? '前大K' : '前大P';
    const desc = isKick ? '赤いキックボタン' : '赤いパンチボタン';

    return {
      original,
      prefix,
      arrows: ['→'],
      arrowStr: '→',
      button: {
        kind,
        color,
        label,
        description: desc,
        iconText,
      },
      suffix,
      tip: '前キーを押しながらボタン',
    };
  }

  // 12. 立ち通常技（弱P, 弱K, 中P, 中K, 大P, 大K等）
  const isKick = lower.includes('k');
  const isHeavy = lower.includes('大') || lower.includes('強');
  const isLight = lower.includes('弱');
  const color: ButtonColor = isHeavy ? 'red' : isLight ? 'blue' : 'yellow';
  const kind: ButtonKind = isKick ? 'kick' : 'punch';
  const iconText = isKick ? 'K' : 'P';
  const label = isLight
    ? (isKick ? '弱K' : '弱P')
    : isHeavy
    ? (isKick ? '大K' : '大P')
    : (isKick ? '中K' : '中P');
  const desc = isLight
    ? (isKick ? '青いキックボタン' : '青いパンチボタン')
    : isHeavy
    ? (isKick ? '赤いキックボタン' : '赤いパンチボタン')
    : (isKick ? '黄色いキックボタン' : '黄色いパンチボタン');

  return {
    original,
    prefix,
    arrows: [],
    arrowStr: '',
    button: {
      kind,
      color,
      label,
      description: desc,
      iconText,
    },
    suffix,
  };
}
