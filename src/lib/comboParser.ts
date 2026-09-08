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

export function parseVisualCombo(recipe: string, controlType: 'classic' | 'modern' = 'classic'): VisualStep[] {
  if (!recipe) return [];

  // 全角の「＞」を「>」に正規化
  let cleanRecipe = recipe.replace(/＞/g, '>');

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

  // 0.6 移動（歩き、微後退など）
  if (lower.includes('前歩き') || lower.includes('前歩') || lower === '歩き') {
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
        label: remaining,
        description: '前歩き',
        iconText: remaining,
      },
      suffix,
      tip: '前キーを少し長めに入力して間合いを詰める',
    };
  }

  if (lower.includes('微後退') || lower.includes('後退') || lower.includes('後ろ歩き')) {
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
        iconText: 'P',
      },
      suffix,
      tip: 'テンキー22+P（下・下＋パンチで電刃錬気ストックチャージ）',
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
      },
      suffix,
      tip: isModern
        ? '↓＋弱＋中 または ↓＋SP＋強P（手動テンキー236×2+Pでも入力可能）'
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
      },
      suffix,
      tip: isModern
        ? '後ろ＋弱＋中 または 後ろ＋SP＋強P（手動テンキー214×2+Pでも入力可能）'
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
      },
      suffix,
      tip: isModern
        ? 'N＋弱＋中 または N＋SP＋強P（手動テンキー236×2+Pでも入力可能）'
        : 'テンキー236を2回素早く入力+パンチ',
    };
  }

  // 2. モダン：アシスト攻撃（A中, A弱, A大 / A強）およびジャンプアシスト攻撃
  // ジャンプアシスト攻撃（ジャンプA大, 前JA大, 垂直JA大, 前J大, JA大等）
  if (
    lower.includes('ja大') ||
    lower.includes('ジャンプa大') ||
    lower.includes('前ja大') ||
    lower.includes('垂直ja大') ||
    lower.includes('前j大') ||
    lower.includes('垂直j大')
  ) {
    const isForward = lower.includes('前') || lower.includes('6');
    const isVertical = lower.includes('垂直') || lower.includes('8');
    const jumpArrow = isForward ? '↗' : isVertical ? '↑' : '';
    const label = isForward ? '前JA大' : isVertical ? '垂直JA大' : 'ジャンプA大';
    return {
      original: remaining,
      isCancel,
      isRush,
      rushText,
      prefix,
      arrows: jumpArrow ? [jumpArrow] : [],
      arrowStr: jumpArrow,
      button: {
        kind: 'punch',
        color: 'red',
        label,
        description: '赤いボタン（ジャンプアシスト強）',
        iconText: 'A大',
      },
      suffix,
      tip: 'ジャンプ中にアシストボタンを押しながら強攻撃',
    };
  }

  if (lower.startsWith('a中') || lower.startsWith('アシスト中') || lower === '下中p') {
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
    lower === '前大p' ||
    lower === '大ゴス'
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
      },
      suffix,
      tip: 'アシストボタンを押しながら強攻撃（大ゴス）',
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
            label: '弱足刀',
            description: '弱足刀ボタン',
            iconText: 'SP',
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
            label: '強足刀',
            description: '強足刀ボタン',
            iconText: 'SP',
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
          label: isMed ? '中足刀' : '足刀',
          description: '中足刀ボタン',
          iconText: 'SP',
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
        label: isOD ? 'OD足刀' : `${strength}足刀`,
        description: isOD ? 'ODボタン' : `${strength}キックボタン`,
        iconText: isOD ? 'KK' : 'K',
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
            label: '弱竜巻',
            description: '弱竜巻ボタン',
            iconText: 'K',
          },
          suffix,
          tip: 'テンキー214+弱K（またはA弱アシストコンボ派生）',
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
          label: '中竜巻',
          description: '中竜巻ボタン',
          iconText: 'SP',
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
        label: isOD ? 'OD竜巻' : `${strength}竜巻`,
        description: isOD ? 'ODボタン' : `${strength}キックボタン`,
        iconText: isOD ? 'KK' : 'K',
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
          arrowStr: '前',
          button: {
            kind: 'special',
            color: 'purple',
            label: 'OD昇竜',
            description: 'OD昇竜ボタン',
            iconText: 'A+SP',
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
          arrowStr: '前',
          button: {
            kind: isKick ? 'kick' : 'punch',
            color: 'red',
            label: isKick ? '強スパイク' : '強昇竜',
            description: '強昇竜ボタン',
            iconText: 'SP',
          },
          suffix,
          tip: '前＋SP（手動テンキー623+強Pでも入力可能）',
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
          label: isLight ? '弱昇竜' : '中昇竜',
          description: isLight ? '青いボタン' : '黄色いボタン',
          iconText: isKick ? 'K' : 'P',
        },
        suffix,
        tip: `テンキー623+${isLight ? '弱P' : '中P'}（前・下・斜め前）`,
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
        label: isOD ? (isKick ? 'ODスパイク' : 'OD昇竜') : `${strength}${isKick ? 'スパイク' : '昇竜'}`,
        description: isOD ? 'ODボタン' : `${strength}${isKick ? 'キック' : 'パンチ'}ボタン`,
        iconText: isOD ? (isKick ? 'KK' : 'PP') : btnChar,
      },
      suffix,
      tip: `テンキー623+${isOD ? (btnChar + btnChar + '（2ボタン同時）') : strength + btnChar}（前・下・斜め前）`,
    };
  }

  // 6. 必殺技：波掌撃 / 電刃波掌撃 (214+P: ↓↙← + P)
  if (lower.includes('波掌')) {
    const isOD = lower.includes('od');
    const isDenjin = lower.includes('電刃');
    const isHeavy = lower.includes('強') || lower.includes('大');
    const isLight = lower.includes('弱');

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
          color: isOD ? 'purple' : 'gold',
          label: isOD ? 'OD電刃波掌撃' : '電刃波掌撃',
          description: isOD ? 'OD電刃波掌撃' : '電刃波掌撃',
          iconText: isOD ? 'PP' : 'P',
        },
        suffix,
        tip: isOD
          ? 'テンキー214+PP（※電刃ストック消費のOD電刃波掌撃。高火力追撃・画面端コンボ用）'
          : 'テンキー214+P（※電刃ストック消費の電刃波掌撃。ガードされても+3F有利）',
      };
    }

    const color: ButtonColor = isOD ? 'purple' : isHeavy ? 'red' : isLight ? 'blue' : 'yellow';
    const strength = isOD ? 'OD' : isHeavy ? '強' : isLight ? '弱' : '中';
    const label = isOD ? 'OD波掌撃' : `${strength}波掌撃`;
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
            label: '強波動',
            description: '強波動ボタン',
            iconText: 'SP',
          },
          suffix,
          tip: 'N＋SP（手動テンキー236+強Pでも入力可能）',
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
          label: isLight ? '弱弾' : '中弾',
          description: isLight ? '青いボタン' : '黄色いボタン',
          iconText: 'P',
        },
        suffix,
        tip: `テンキー236+${isLight ? '弱P' : '中P'}（下・斜め前・前）`,
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
        label: isOD ? 'OD弾' : `${strength}弾`,
        description: isOD ? 'ODボタン' : `${strength}パンチボタン`,
        iconText: isOD ? 'PP' : 'P',
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
        label: isModern ? '大 ➔ 大' : '強P ➔ 強K',
        description: isModern ? '赤いボタン（大 ➔ 大）' : '赤いボタン（ターゲットコンボ）',
        iconText: isModern ? '大' : 'P',
      },
      suffix,
      tip: isModern ? '強攻撃ヒット後にもう一度強攻撃を入力（大 ➔ 大）' : '強Pヒット後にすかさず強Kを入力',
    };
  }

  // 9. 後ろ入れ特殊技（引大P, 引大, 引き強P, 4HP, 後大K等）
  if (lower.includes('引') || lower.startsWith('4') || lower.includes('後大') || lower.includes('後強')) {
    const isKick = lower.includes('k');
    const kind: ButtonKind = isKick ? 'kick' : 'punch';
    const label = lower.includes('引大p') ? '引大P' : '引大';

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
        iconText: label,
      },
      suffix,
      tip: '後ろキー（ガード方向）を入力しながら強攻撃',
    };
  }

  // 10. 前入れ特殊技（前大P, 前大, 前大K, 大ゴス, 6HP, 6HK等）
  if (lower.startsWith('前') || lower.startsWith('6') || lower.includes('大ゴス')) {
    const isKick = lower.includes('k');
    const isHeavy = lower.includes('大') || lower.includes('強') || lower.includes('大ゴス');
    const color: ButtonColor = isHeavy ? 'red' : 'yellow';
    const kind: ButtonKind = isKick ? 'kick' : 'punch';
    const label = lower.includes('大ゴス') ? '前大P' : lower.includes('前大p') ? '前大P' : lower.includes('前大k') ? '前大K' : '前大';

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
        iconText: label,
      },
      suffix,
      tip: '前キーを押しながらボタン',
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
    const isKick = lower.includes('k') || lower.includes('足') || lower.includes('キック');
    const isHeavy = lower.includes('大') || lower.includes('強') || lower.includes('大足');
    const isLight = lower.includes('弱') || lower.includes('小') || lower.includes('コパ');
    const color: ButtonColor = isHeavy ? 'red' : isLight ? 'blue' : 'yellow';
    const kind: ButtonKind = isKick ? 'kick' : 'punch';

    let label = isLight
      ? (isKick ? '下弱K' : '下弱P')
      : isHeavy
      ? (isKick ? '下大K' : '下大P')
      : (isKick ? '下中K' : '下中P');

    if (lower === '下中' || lower === '下弱' || lower === '下大') {
      label = remaining;
    }

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
        iconText: label,
      },
      suffix,
      tip: '下キー（しゃがみ）を入力しながらボタン',
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
      },
      suffix,
    };
  }

  // 14. 立ち通常技（弱P, 弱K, 中P, 中K, 大P, 大K等）
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
