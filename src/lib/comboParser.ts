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
  // ターゲットコンボ（TC）1枠表記用フィールド（6-1共通ルール）
  isTC?: boolean;
  tcButtons?: Array<{
    color: ButtonColor;
    iconText: string;
    label: string;
  }>;
  tcText?: string;         // 例: "大P大P", "中K中K", "中P大P"
}

export function parseVisualCombo(
  recipe: string,
  controlType: 'classic' | 'modern' = 'classic',
  character?: string
): VisualStep[] {
  if (!recipe) return [];

  // 全角の「＞」を「>」に正規化
  let cleanRecipe = recipe.replace(/＞/g, '>');

  // 0. 先頭のラベル（例: 【ノーマルヒット】：、脱出パターンA：、ベスト：、次点：、推奨：、基本：、最大：等）を除去
  cleanRecipe = cleanRecipe.replace(/^(?:【.*?】|(?:脱出パターン|パターン|ルート|ステップ|選択肢)[A-Za-z0-9Ａ-Ｚａ-ｚ０-９]*[：:]|(?:ベスト|次点|推奨|基本|最大|中央|画面端|反撃|確定反撃)[：:])\s*/, '').trim();

  // 太字装飾（**）の除去
  cleanRecipe = cleanRecipe.replace(/\*\*/g, '');

  // 文脈修飾語（の安定度、の安定化、の成功率、など、等）の除去
  cleanRecipe = cleanRecipe.replace(/(?:の安定度|の安定化|の成功率|など|等)$/, '').trim();

  // 1. レシピ末尾のダメージ数値（例: （4247）, (4247), （ダメージ3480）, (4247ダメージ), [4247]）を除去
  cleanRecipe = cleanRecipe
    .replace(/[（\(\[]\s*(?:ダメージ|dmg|DMG|d)?\s*\d+(?:\s*(?:ダメージ|dmg|DMG|d))?\s*[）\)\]]\s*$/, '')
    .trim();

  // 2. 末尾の〆や締めを除去
  cleanRecipe = cleanRecipe.replace(/〆|締め?$/, '').trim();

  // 3. 〆の前にダメージがあった場合、または再度末尾にダメージがある場合の除去
  cleanRecipe = cleanRecipe
    .replace(/[（\(\[]\s*(?:ダメージ|dmg|DMG|d)?\s*\d+(?:\s*(?:ダメージ|dmg|DMG|d))?\s*[）\)\]]\s*$/, '')
    .trim();

  // 4. レシピ末尾のフレーム差（例: +26, +37F, +9等）を除去
  cleanRecipe = cleanRecipe.replace(/\+\d+(?:F|f)?\s*$/, '').trim();

  // ">" または "→" で分割
  const rawParts = cleanRecipe.split(/>|→(?!\+|↓|↘|↗|←|↙|↖)/).map((p) => p.trim()).filter(Boolean);

  const isElena =
    character === 'エレナ' ||
    cleanRecipe.includes('ライノ') ||
    cleanRecipe.includes('コロ') ||
    cleanRecipe.includes('スピン') ||
    cleanRecipe.includes('ムーン') ||
    cleanRecipe.includes('エレナ') ||
    cleanRecipe.includes('中KTC') ||
    cleanRecipe.includes('中PTC');

  const steps = rawParts.flatMap((part) => parsePartToSteps(part, controlType, isElena));

  // 構え後のスピバの特別仕様判定
  // （春麗は構えを経由したスピバのみ下溜め免除で「↓↑＋中K（OD時は下上KK）」で出せる仕様）
  let seenKamae = false;
  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    if (step.original.includes('構え') || step.button.label.includes('構え')) {
      seenKamae = true;
    }
    if (
      seenKamae &&
      (step.original.includes('スピバ') ||
        step.original.includes('スピニング') ||
        step.button.label.includes('スピバ'))
    ) {
      step.original = '構え後のスピバ';
      step.chargeArrows = [false, false]; // 下溜め免除
      const isOD =
        step.button.label.includes('OD') ||
        step.original.includes('OD') ||
        step.button.color === 'purple';
      if (!isOD) {
        step.button.label = '中K';
        step.button.color = 'yellow';
        step.button.iconText = controlType === 'modern' ? '中' : 'K';
      }
      step.tip = '構え後のスピバのみ下溜めをしなくても下上中Kで出せるようになる仕様があります';
    }
  }

  return steps;
}

function parsePartToSteps(text: string, controlType: 'classic' | 'modern' = 'classic', isElena: boolean = false): VisualStep[] {
  let remaining = text.trim();

  // 先頭の【...】や脱出パターンA：等のラベルを除去
  remaining = remaining.replace(/^(?:【.*?】|(?:脱出パターン|パターン|ルート|ステップ|選択肢)[A-Za-z0-9Ａ-Ｚａ-ｚ０-９]*[：:]|(?:ベスト|次点|推奨|基本|最大|中央|画面端|反撃|確定反撃)[：:])\s*/, '').trim();

  // 1. 各パーツ内のダメージ数値・フレーム差を除去
  remaining = remaining
    .replace(/[（\(\[]\s*(?:ダメージ|dmg|DMG|d)?\s*\d+(?:\s*(?:ダメージ|dmg|DMG|d))?\s*[）\)\]]/g, '')
    .trim();
  remaining = remaining.replace(/\+\d+(?:F|f)?\s*$/, '').trim();

  // 2. 〆を除去
  remaining = remaining.replace(/〆|締め?$/, '').trim();

  // 3. サフィックス（補足情報: （カス当たり）、（最速）など）の抽出
  let suffix: string | undefined;
  const suffixMatch = remaining.match(/[（\(](.*?)[）\)]$/);
  if (suffixMatch) {
    const inner = suffixMatch[1].trim();
    if (
      !/^\d+$/.test(inner) &&
      !/^(?:ダメージ|dmg|DMG|d)?\s*\d+(?:\s*(?:ダメージ|dmg|DMG|d))?$/i.test(inner)
    ) {
      suffix = `（${inner}）`;
    }
    remaining = remaining.replace(/[（\(](.*?)[）\)]$/, '').trim();
  }

  // 4. キャンセルの抽出
  let isCancel = false;
  if (remaining.includes('キャンセルラッシュ')) {
    isCancel = true;
    remaining = remaining.replace(/キャンセルラッシュ/g, '').trim();
  } else if (remaining.includes('キャンセル')) {
    isCancel = true;
    remaining = remaining.replace(/キャンセル/g, '').trim();
  }

  // 5. ラッシュの抽出
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
    remaining = remaining.replace(/生ラッシュ|パリィラッシュ|ラッシュ/g, '').trim();
  }

  // 6. プレフィックス
  let prefix: string | undefined;
  if (remaining.includes('壁ドン')) {
    prefix = '壁ドン';
    remaining = remaining.replace(/壁ドン/g, '').trim();
  } else if (remaining.includes('壁バウンド')) {
    prefix = '壁バウンド';
    remaining = remaining.replace(/壁バウンド/g, '').trim();
  } else if (remaining.includes('前歩き')) {
    prefix = '前歩き';
    remaining = remaining.replace(/前歩き/g, '').trim();
  } else if (remaining.includes('溜め') || remaining.includes('ホールド') || remaining.includes('タメ')) {
    prefix = '溜め';
    remaining = remaining.replace(/溜め|ホールド|タメ/g, '').trim();
  }

  remaining = remaining.replace(/起き攻め/g, '').trim();
  remaining = remaining.replace(/〆|締め?$/, '').trim();
  const lower = remaining.toLowerCase();

  // 状態表記や起き攻め択等はプレイヤーの単一入力コマンドではないためアコーディオン展開からスキップ
  if (
    lower === 'スタン' ||
    lower === '壁スタン' ||
    lower === '相手スタン' ||
    lower === 'スタン時' ||
    lower === 'ガードクラッシュ' ||
    lower.includes(' or ') ||
    (lower.includes('or') && (lower.includes('投げ') || lower.includes('大') || lower.includes('択'))) ||
    lower.includes('2択') ||
    lower.includes('二択') ||
    lower.includes('択')
  ) {
    return [];
  }

  // エレナ複合パーツ判定（例: 中スピン弱コロ中派生、ODスピン弱コロ中派生、強スピン（Pc）弱コロ弱派生、中スピン弱コロ（ディレイ）中派生等）
  // ユーザー指示 5-2：「中スピン弱コロ中派生」➔ 214中K → 前弱P → 中K の入力順どおりに3ステップへ分解
  const spinElenaMatch = remaining.match(/^(.*?(?:od|弱|中|強)?スピン(?:（.*?）)?)\s*((?:od|弱|中|強)?コロ(?:コロ)?.*)$/i);
  if (spinElenaMatch) {
    const spinPart = spinElenaMatch[1].trim();
    const coloDerivPart = spinElenaMatch[2].trim();

    // 1. スピン部分
    const isSpinOD = /od/i.test(spinPart);
    const isSpinHeavy = /強|大/i.test(spinPart);
    const isSpinLight = /弱/i.test(spinPart);
    const spinStrength = isSpinOD ? 'OD' : isSpinHeavy ? '強' : isSpinLight ? '弱' : '中';
    const spinColor: ButtonColor = isSpinOD ? 'purple' : isSpinHeavy ? 'red' : isSpinLight ? 'blue' : 'yellow';

    const spinStep: VisualStep = {
      original: spinPart,
      isCancel,
      isRush,
      rushText,
      prefix,
      arrows: ['↓', '↙', '←'],
      arrowStr: '↓↙←',
      button: {
        kind: 'kick',
        color: spinColor,
        label: `${spinStrength}スピン`,
        description: `${spinStrength}スピンサイズ（214+${isSpinOD ? 'KK' : 'K'}）`,
        iconText: isSpinOD ? 'KK' : 'K',
        showLabel: false,
      },
      tip: `テンキー214+${isSpinOD ? 'KK' : 'K'}（スピンサイズ）`,
    };

    // 2. コロ + 派生キック の分解
    if (coloDerivPart.includes('派生')) {
      const isColoOD = /od/i.test(coloDerivPart);
      const isColoHeavy = /強コロ/i.test(coloDerivPart);
      const isColoLight = /弱コロ/i.test(coloDerivPart);
      const coloStrength = isColoOD ? 'OD' : isColoHeavy ? '強' : isColoLight ? '弱' : '中';
      const coloColor: ButtonColor = isColoOD ? 'purple' : isColoHeavy ? 'red' : isColoLight ? 'blue' : 'yellow';

      const isDerivHeavy = /強派生|大派生/i.test(coloDerivPart);
      const isDerivLight = /弱派生/i.test(coloDerivPart);
      const derivStrength = isDerivHeavy ? '強' : isDerivLight ? '弱' : '中';
      const derivColor: ButtonColor = isDerivHeavy ? 'red' : isDerivLight ? 'blue' : 'yellow';
      const isDelay = /ディレイ/i.test(coloDerivPart);

      // スピン中に入力するコロは「前P」（レバー前＋パンチ）
      const coloStep: VisualStep = {
        original: `前${coloStrength}P`,
        arrows: ['→'],
        arrowStr: '→',
        button: {
          kind: 'punch',
          color: coloColor,
          label: `前${coloStrength}P`,
          description: `前＋${isColoOD ? 'PP' : 'P'}（スピン中リンクシング派生）`,
          iconText: isColoOD ? 'PP' : 'P',
          showLabel: false,
        },
        tip: `スピン中に前＋${isColoOD ? 'PP' : 'P'}でコロ派生`,
      };

      // コロ後の派生攻撃（キック）
      const derivStep: VisualStep = {
        original: `${derivStrength}派生`,
        prefix: isDelay ? 'ディレイ' : undefined,
        arrows: [],
        arrowStr: '',
        button: {
          kind: 'kick',
          color: derivColor,
          label: `${derivStrength}K`,
          description: `${derivStrength}派生（キック）`,
          iconText: 'K',
          showLabel: false,
        },
        suffix,
        tip: isDelay ? 'ワンテンポ遅らせてキック（ディレイ派生）' : 'コロ中にキックを入力して派生',
      };

      return [spinStep, coloStep, derivStep];
    }

    return [spinStep, ...parsePartToSteps(coloDerivPart, controlType, true)];
  }

  // エレナ／共通TC：中KTC (中K中K) ➔ 1枠内にまとめる（指示書 6-1）
  if (lower.includes('中ktc') || lower.includes('中k・中k') || lower === '中k>中k') {
    return [{
      original: remaining || '中KTC',
      isCancel,
      isRush,
      rushText,
      prefix,
      arrows: [],
      arrowStr: '',
      isTC: true,
      tcText: '中K中K',
      tcButtons: [
        { color: 'yellow', iconText: 'K', label: '中K' },
        { color: 'yellow', iconText: 'K', label: '中K' },
      ],
      button: {
        kind: 'kick',
        color: 'yellow',
        label: '中KTC',
        description: '中Kターゲットコンボ（中K・中K）',
        iconText: 'K',
        showLabel: false,
      },
      suffix,
      tip: '中Kヒット後に続けて中Kを入力（中KTC: 中K中K）',
    }];
  }

  // エレナTC：中PTC (中P大P) ➔ 1枠内にまとめる（指示書 6-1: 技構成に応じた入力）
  if (lower.includes('中ptc') || lower.includes('中p・大p') || lower === '中p>大p' || lower.includes('中p・中p')) {
    return [{
      original: remaining || '中PTC',
      isCancel,
      isRush,
      rushText,
      prefix,
      arrows: [],
      arrowStr: '',
      isTC: true,
      tcText: '中P大P',
      tcButtons: [
        { color: 'yellow', iconText: 'P', label: '中P' },
        { color: 'red', iconText: 'P', label: '大P' },
      ],
      button: {
        kind: 'punch',
        color: 'yellow',
        label: '中PTC',
        description: '中Pターゲットコンボ（中P・大P）',
        iconText: 'P',
        showLabel: false,
      },
      suffix,
      tip: '中Pヒット後に続けて大Pを入力（中PTC: 中P大P）',
    }];
  }

  // エレナTC：前大PTC / 前大TC (前大P大P / 前強・強) ➔ 1枠内にまとめる（指示書 6-1）
  if (lower.includes('前大ptc') || lower.includes('前大tc') || lower.includes('前大p・大p')) {
    const isModern = controlType === 'modern';
    return [{
      original: remaining || (isModern ? '前大TC' : '前大PTC'),
      isCancel,
      isRush,
      rushText,
      prefix,
      arrows: ['→'],
      arrowStr: '→',
      isTC: true,
      tcText: isModern ? '前強・強' : '前大P大P',
      tcButtons: [
        { color: 'red', iconText: isModern ? '強' : 'P', label: isModern ? '前強' : '前大P' },
        { color: 'red', iconText: isModern ? '強' : 'P', label: isModern ? '強' : '大P' },
      ],
      button: {
        kind: 'punch',
        color: 'red',
        label: isModern ? '前大TC' : '前大PTC',
        description: isModern ? '前強ターゲットコンボ' : '前強Pターゲットコンボ（前大P・大P）',
        iconText: isModern ? '強' : 'P',
        showLabel: false,
      },
      suffix,
      tip: isModern ? '前＋強攻撃ヒット後に強攻撃を入力' : '前＋強Pヒット後に強Pを入力（前大PTC: 前大P大P）',
    }];
  }

  // エレナTC：A大TC（アシスト強TC: A大・A大）
  if (isElena && (lower.includes('a大tc') || lower.includes('a強tc') || lower.includes('アシスト大tc') || lower.includes('アシスト強tc'))) {
    return [{
      original: remaining || 'A大TC',
      isCancel,
      isRush,
      rushText,
      prefix,
      arrows: [],
      arrowStr: '',
      isTC: true,
      tcText: 'A大・A大',
      tcButtons: [
        { color: 'red', iconText: 'A大', label: 'A大' },
        { color: 'red', iconText: 'A大', label: 'A大' },
      ],
      button: {
        kind: 'punch',
        color: 'red',
        label: 'A大TC',
        description: 'アシスト強TC（A大・A大）',
        iconText: 'A大',
        showLabel: false,
      },
      suffix,
      tip: 'アシストボタンを押しながら強攻撃を連続入力',
    }];
  }

  // エレナTC：J中TC（ジャンプ中TC: 空対空）
  if (isElena && (lower.includes('j中tc') || lower.includes('空中tc'))) {
    const isModern = controlType === 'modern';
    return [{
      original: remaining || 'J中TC',
      isCancel,
      isRush,
      rushText,
      prefix,
      arrows: ['↗'],
      arrowStr: '↗',
      isTC: true,
      tcText: isModern ? '中・強' : '中K・大P',
      tcButtons: [
        { color: 'yellow', iconText: isModern ? '中' : 'K', label: 'J中' },
        { color: 'red', iconText: isModern ? '強' : 'P', label: 'J大' },
      ],
      button: {
        kind: 'kick',
        color: 'yellow',
        label: 'J中TC',
        description: 'ジャンプ中ターゲットコンボ（空対空）',
        iconText: isModern ? '中' : 'K',
        showLabel: false,
      },
      suffix,
      tip: 'ジャンプ中に中攻撃から強攻撃を入力',
    }];
  }

  // エレナTC：下中TC
  if (isElena && lower.includes('下中tc')) {
    const isModern = controlType === 'modern';
    return [{
      original: remaining || '下中TC',
      isCancel,
      isRush,
      rushText,
      prefix,
      arrows: ['↓'],
      arrowStr: '↓',
      isTC: true,
      tcText: isModern ? '下中・中' : '下中P・中P',
      tcButtons: [
        { color: 'yellow', iconText: isModern ? '中' : 'P', label: '下中' },
        { color: 'yellow', iconText: isModern ? '中' : 'P', label: '中' },
      ],
      button: {
        kind: 'punch',
        color: 'yellow',
        label: '下中TC',
        description: '下中ターゲットコンボ',
        iconText: isModern ? '中' : 'P',
        showLabel: false,
      },
      suffix,
      tip: 'しゃがみ中攻撃ヒット後に中攻撃を入力',
    }];
  }

  // エレナTC：中TC（立ち中TC）
  if (isElena && (lower.includes('中tc') && !lower.includes('下中') && !lower.includes('j中'))) {
    const isModern = controlType === 'modern';
    return [{
      original: remaining || '中TC',
      isCancel,
      isRush,
      rushText,
      prefix,
      arrows: [],
      arrowStr: '',
      isTC: true,
      tcText: isModern ? '中・中' : '中K中K',
      tcButtons: [
        { color: 'yellow', iconText: isModern ? '中' : 'K', label: '中' },
        { color: 'yellow', iconText: isModern ? '中' : 'K', label: '中' },
      ],
      button: {
        kind: 'kick',
        color: 'yellow',
        label: '中TC',
        description: '中攻撃ターゲットコンボ',
        iconText: isModern ? '中' : 'K',
        showLabel: false,
      },
      suffix,
      tip: '中攻撃ヒット後に続けて中攻撃を入力',
    }];
  }

  // エレナTC：A弱コンボ
  if (isElena && (lower.includes('a弱コンボ') || lower.includes('アシスト弱コンボ'))) {
    return [{
      original: remaining || 'A弱コンボ',
      isCancel,
      isRush,
      rushText,
      prefix,
      arrows: [],
      arrowStr: '',
      isTC: true,
      tcText: 'A弱×3',
      tcButtons: [
        { color: 'blue', iconText: 'A弱', label: 'A弱' },
        { color: 'blue', iconText: 'A弱', label: 'A弱' },
        { color: 'blue', iconText: 'A弱', label: 'A弱' },
      ],
      button: {
        kind: 'punch',
        color: 'blue',
        label: 'A弱コンボ',
        description: 'アシスト弱連打（下弱K>下弱P>強昇竜）',
        iconText: 'A弱',
        showLabel: false,
      },
      suffix,
      tip: 'アシストボタンを押しながら弱攻撃を連打（自動ヒット確認）',
    }];
  }

  // エレナTC：大PTC / 大TC (大P大P / 強・強) ➔ 1枠内にまとめる（指示書 6-1）
  if (isElena && (lower.includes('大ptc') || lower.includes('大tc') || lower.includes('大p・大p') || lower.includes('強tc'))) {
    const isModern = controlType === 'modern';
    return [{
      original: remaining || (isModern ? '大TC' : '大PTC'),
      isCancel,
      isRush,
      rushText,
      prefix,
      arrows: [],
      arrowStr: '',
      isTC: true,
      tcText: isModern ? '強・強' : '大P大P',
      tcButtons: [
        { color: 'red', iconText: isModern ? '強' : 'P', label: isModern ? '強' : '大P' },
        { color: 'red', iconText: isModern ? '強' : 'P', label: isModern ? '強' : '大P' },
      ],
      button: {
        kind: 'punch',
        color: 'red',
        label: isModern ? '大TC' : '大PTC',
        description: isModern ? '強攻撃ターゲットコンボ' : '強Pターゲットコンボ（大P・大P）',
        iconText: isModern ? '強' : 'P',
        showLabel: false,
      },
      suffix,
      tip: isModern ? '強攻撃ヒット後にもう一度強攻撃を入力' : '強Pヒット後にもう一度強Pを入力（大PTC: 大P大P）',
    }];
  }

  // エレナ：コロ派生技（例: 弱コロ中派生、ODコロ中派生、コロ中派生、弱コロコロ弱派生、強コロコロ強派生など）
  // ユーザー指示：「弱コロ中派生→236弱P→中K」
  if (lower.includes('コロ') && lower.includes('派生')) {
    const isOD = lower.includes('od');
    const isHeavy = lower.includes('強') || lower.includes('大');
    const isWeak = lower.includes('弱');
    const isMed = lower.includes('中') && !lower.includes('中派生');
    const isCorocoro = lower.includes('コロコロ');

    const strength = isOD ? 'OD' : isHeavy ? '強' : isWeak ? '弱' : isMed ? '中' : '弱';
    const color: ButtonColor = isOD ? 'purple' : isHeavy ? 'red' : isWeak ? 'blue' : isMed ? 'yellow' : 'blue';
    const btnP = isOD ? 'PP' : isHeavy ? '大P' : isWeak ? '弱P' : '中P';

    // 派生キック
    const hasHeavyFollowup = lower.includes('強派生') || lower.includes('大派生');
    const hasWeakFollowup = lower.includes('弱派生');
    const followupStrength = hasHeavyFollowup ? '強' : hasWeakFollowup ? '弱' : '中';
    const followupColor: ButtonColor = hasHeavyFollowup ? 'red' : hasWeakFollowup ? 'blue' : 'yellow';
    const followupBtn = hasHeavyFollowup ? '大K' : hasWeakFollowup ? '弱K' : '中K';

    const step1: VisualStep = {
      original: isCorocoro ? `${strength}コロコロ` : `${strength}コロ`,
      isCancel,
      isRush,
      rushText,
      prefix,
      arrows: ['↓', '↘', '→'],
      arrowStr: '↓↘→',
      button: {
        kind: 'punch',
        color,
        label: isOD ? 'ODコロ' : `${strength}コロ`,
        description: isOD ? 'ODリンクシング（236+PP）' : `${strength}リンクシング（236+${btnP}）`,
        iconText: isOD ? 'PP' : btnP,
        showLabel: false,
      },
      tip: `テンキー236+${btnP}（リンクシング）`,
    };

    const steps: VisualStep[] = [step1];

    if (isCorocoro) {
      steps.push({
        original: '前P',
        arrows: ['→'],
        arrowStr: '→',
        button: {
          kind: 'punch',
          color,
          label: '前P',
          description: `前＋${btnP}（リンクスワール）`,
          iconText: btnP,
          showLabel: false,
        },
        tip: `コロ中に前＋${btnP}でリンクスワールへ派生`,
      });
    }

    steps.push({
      original: `${followupStrength}派生`,
      arrows: [],
      arrowStr: '',
      button: {
        kind: 'kick',
        color: followupColor,
        label: `${followupStrength}派生`,
        description: `${followupStrength}キック派生（${followupBtn}）`,
        iconText: followupBtn,
        showLabel: false,
      },
      suffix,
      tip: `派生技：${followupBtn}（キックボタン）`,
    });

    return steps;
  }

  // エレナ：コロコロ（リンクスワール）
  // ユーザー指示：「コロコロ→236p→前P」
  if (lower.includes('コロコロ')) {
    const isOD = lower.includes('od');
    const isHeavy = lower.includes('強') || lower.includes('大');
    const isWeak = lower.includes('弱');
    const strength = isOD ? 'OD' : isHeavy ? '強' : isWeak ? '弱' : '中';
    const color: ButtonColor = isOD ? 'purple' : isHeavy ? 'red' : isWeak ? 'blue' : 'yellow';
    const btnP = isOD ? 'PP' : isHeavy ? '大P' : isWeak ? '弱P' : '中P';

    const step1: VisualStep = {
      original: `${strength}コロ`,
      isCancel,
      isRush,
      rushText,
      prefix,
      arrows: ['↓', '↘', '→'],
      arrowStr: '↓↘→',
      button: {
        kind: 'punch',
        color,
        label: isOD ? 'ODコロ' : `${strength}コロ`,
        description: `${strength}リンクシング（236+${btnP}）`,
        iconText: isOD ? 'PP' : btnP,
        showLabel: false,
      },
      tip: `テンキー236+${btnP}`,
    };
    const step2: VisualStep = {
      original: '前P',
      arrows: ['→'],
      arrowStr: '→',
      button: {
        kind: 'punch',
        color,
        label: '前P',
        description: `前＋${btnP}（リンクスワール）`,
        iconText: btnP,
        showLabel: false,
      },
      suffix,
      tip: `コロ中に前＋${btnP}`,
    };
    return [step1, step2];
  }

  // 構え（行雲流水）および構え派生技判定（構え弱K、構え中K、構え強K、構え弱P、構え中P、構え強Pなど）
  // 構えは 214P（↓↙← + P）のレバー風表記、派生技は単独ボタンの2ステップに展開
  if (lower.startsWith('構え') || lower.startsWith('行雲流水')) {
    const kamaeStep: VisualStep = {
      original: '構え',
      isCancel,
      isRush,
      rushText,
      prefix,
      arrows: ['↓', '↙', '←'],
      arrowStr: '↓↙←',
      button: {
        kind: 'punch',
        color: 'neutral',
        label: '構え',
        description: 'パンチボタン（Pの強度は問わない）',
        iconText: 'P',
        showLabel: false,
      },
      tip: 'Pの強度は問わない',
    };

    // 派生技があるか判定（例: 構え弱K, 構え中K, 構え強K, 構え弱P, 構え中P, 構え強P, 構え大K, 構え大P）
    const followupPart = lower.replace(/^(?:行雲流水|構え)(?:[\(（].*?[\)）])?[\s・\-_>＞]*/, '').trim();

    if (followupPart) {
      const isKick = followupPart.includes('k') || followupPart.includes('キック');
      const isWeak = followupPart.includes('弱') || followupPart.includes('l');
      const isHeavy = followupPart.includes('強') || followupPart.includes('大') || followupPart.includes('h');

      const strengthName = isHeavy ? (followupPart.includes('大') ? '大' : '強') : isWeak ? '弱' : '中';
      const kind: ButtonKind = isKick ? 'kick' : 'punch';
      const color: ButtonColor = isHeavy ? 'red' : isWeak ? 'blue' : 'yellow';
      const btnChar = isKick ? 'K' : 'P';
      const label = `${strengthName}${btnChar}`;

      const followupStep: VisualStep = {
        original: label,
        arrows: [],
        arrowStr: '',
        button: {
          kind,
          color,
          label,
          description: `${label}ボタン`,
          iconText: controlType === 'modern' ? strengthName : btnChar,
          showLabel: false,
        },
        suffix,
      };

      return [kamaeStep, followupStep];
    }

    // 派生技なし（単に「構え」の場合）
    return [kamaeStep];
  }

  // ザンギエフ空中必殺技：ボルシチダイナマイト（ODボルシチダイナマイト等）
  // ユーザー指示：「ODボルシチダイナマイトはジャンプしてレバー一回転KKなのでこれはうまい具合に作成して」
  // ➔ 前ジャンプ（↗）と空中で一回転＋KKの2ステップに展開
  if (lower.includes('ボルシチ') || lower.includes('borscht')) {
    const isOD = lower.includes('od');
    const isModern = controlType === 'modern';

    const jumpStep: VisualStep = {
      original: '前ジャンプ',
      isCancel: false,
      isRush: false,
      prefix,
      arrows: ['↗'],
      arrowStr: '↗',
      button: {
        kind: 'special',
        color: 'neutral',
        label: '前ジャンプ',
        description: '前ジャンプ（相手の浮きに合わせて空中に跳ぶ）',
        iconText: '前ジャンプ',
        showLabel: false,
      },
      tip: '相手の浮きに合わせて前ジャンプ（または垂直ジャンプ）',
    };

    const borschStep: VisualStep = {
      original: remaining,
      isCancel,
      isRush,
      rushText,
      prefix: '空中で',
      arrows: ['一回転'],
      arrowStr: '一回転',
      button: {
        kind: 'kick',
        color: isOD ? 'purple' : 'red',
        label: isOD ? 'ODボルシチ' : 'ボルシチ',
        description: isOD
          ? isModern
            ? '空中で一回転＋A+SP（または手動一回転KK）'
            : '空中でレバー一回転＋KK（キック2ボタン同時押し）'
          : isModern
          ? '空中で一回転＋SP'
          : '空中でレバー一回転＋K（キックボタン）',
        iconText: isOD ? (isModern ? 'A+SP' : 'KK') : (isModern ? 'SP' : 'K'),
        showLabel: false,
      },
      suffix,
      tip: isOD
        ? isModern
          ? '空中でレバーを一回転回してアシスト+SP（または手動一回転KK）'
          : '空中でレバーを一回転（360°）素早く回してKK同時押し（OD空中コマ投げ）'
        : isModern
        ? '空中でレバーを一回転回してSP（空中コマ投げ）'
        : '空中でレバーを一回転（360°）素早く回してキック（空中コマ投げ）',
    };

    return [jumpStep, borschStep];
  }

  // 大PTC / 二連撃 / 大TC / 大>大 判定（リュウの大PTCは大P>大Kなので2ステップに展開）
  const isTargetCombo =
    lower.includes('大ptc') ||
    lower.includes('大tc') ||
    lower.includes('二連撃') ||
    lower.includes('上段二連撃') ||
    lower === '大>大' ||
    lower === '大＞大' ||
    lower.includes('ターゲットコンボ');

  if (isTargetCombo) {
    const isModern = controlType === 'modern';
    if (isModern) {
      return [{
        original: remaining || '大PTC',
        isCancel,
        isRush,
        rushText,
        prefix,
        arrows: [],
        arrowStr: '',
        isTC: true,
        tcText: '大大',
        tcButtons: [
          { color: 'red', iconText: '大', label: '強' },
          { color: 'red', iconText: '大', label: '強' },
        ],
        button: {
          kind: 'punch',
          color: 'red',
          label: '強TC',
          description: '強攻撃ターゲットコンボ（大・大）',
          iconText: '大',
          showLabel: false,
        },
        suffix,
        tip: '強攻撃ヒット後にもう一度強攻撃を入力（大 ➔ 大）',
      }];
    } else {
      return [{
        original: remaining || '大PTC',
        isCancel,
        isRush,
        rushText,
        prefix,
        arrows: [],
        arrowStr: '',
        isTC: true,
        tcText: '大P大K',
        tcButtons: [
          { color: 'red', iconText: 'P', label: '大P' },
          { color: 'red', iconText: 'K', label: '大K' },
        ],
        button: {
          kind: 'punch',
          color: 'red',
          label: '大PTC',
          description: 'ターゲットコンボ（大P・大K）',
          iconText: 'P',
          showLabel: false,
        },
        suffix,
        tip: '強Pヒット後にすかさず強Kを入力（大PTC: 大P > 大K）',
      }];
    }
  }

  // 通常パーツは1ステップ
  return [parseSinglePart(text, controlType, isElena)];
}

function parseSinglePart(text: string, controlType: 'classic' | 'modern' = 'classic', isElena: boolean = false): VisualStep {
  const step = parseSinglePartInternal(text, controlType, isElena);
  return controlType === 'modern' ? cleanupModernStep(step) : step;
}

function parseSinglePartInternal(text: string, controlType: 'classic' | 'modern' = 'classic', isElena: boolean = false): VisualStep {
  let remaining = text.trim();

  // 先頭の【...】や脱出パターンA：等のラベルを除去
  remaining = remaining.replace(/^(?:【.*?】|(?:脱出パターン|パターン|ルート|ステップ|選択肢)[A-Za-z0-9Ａ-Ｚａ-ｚ０-９]*[：:]|(?:ベスト|次点|推奨|基本|最大|中央|画面端|反撃|確定反撃)[：:])\s*/, '').trim();

  // 1. 各パーツ内のダメージ数値を除去（例: SA3〆（4247）など各パーツ内に残っている場合）
  remaining = remaining
    .replace(/[（\(\[]\s*(?:ダメージ|dmg|DMG|d)?\s*\d+(?:\s*(?:ダメージ|dmg|DMG|d))?\s*[）\)\]]/g, '')
    .trim();

  // 2. 〆を除去
  remaining = remaining.replace(/〆|締め?$/, '').trim();

  // 3. サフィックス（補足情報: （カス当たり）、（最速）など）の抽出（※純粋な数値ダメージは除外）
  let suffix: string | undefined;
  const suffixMatch = remaining.match(/[（\(](.*?)[）\)]$/);
  if (suffixMatch) {
    const inner = suffixMatch[1].trim();
    if (
      !/^\d+$/.test(inner) &&
      !/^(?:ダメージ|dmg|DMG|d)?\s*\d+(?:\s*(?:ダメージ|dmg|DMG|d))?$/i.test(inner)
    ) {
      suffix = `（${inner}）`;
    }
    remaining = remaining.replace(/[（\(](.*?)[）\)]$/, '').trim();
  }

  // 3.4 プレフィックス（壁ドン、壁バウンド、溜めなど）
  let prefix: string | undefined;
  if (remaining.includes('壁ドン')) {
    prefix = '壁ドン';
    remaining = remaining.replace(/壁ドン/g, '').trim();
  } else if (remaining.includes('壁バウンド')) {
    prefix = '壁バウンド';
    remaining = remaining.replace(/壁バウンド/g, '').trim();
  } else if (remaining.includes('溜め') || remaining.includes('ホールド') || remaining.includes('タメ')) {
    prefix = '溜め';
    remaining = remaining.replace(/溜め|ホールド|タメ/g, '').trim();
  }

  // 3.5 単独のラッシュ（例: 「ラッシュ」「ドライブラッシュ」「生ラッシュ」「パリィラッシュ」など技ボタンを伴わないパーツ）
  const cleanRushCheck = remaining.replace(/起き攻め/g, '').trim();
  if (
    cleanRushCheck === 'ラッシュ' ||
    cleanRushCheck === '生ラッシュ' ||
    cleanRushCheck === 'パリィラッシュ' ||
    cleanRushCheck === 'ドライブラッシュ' ||
    cleanRushCheck === 'dラッシュ' ||
    cleanRushCheck === 'ドライブ' ||
    cleanRushCheck.toLowerCase() === 'dr' ||
    cleanRushCheck === 'キャンセルラッシュ'
  ) {
    return {
      original: 'ラッシュ',
      isCancel: false,
      isRush: false,
      rushText: undefined,
      prefix,
      arrows: [],
      arrowStr: '',
      button: {
        kind: 'special',
        color: 'neutral',
        label: 'ラッシュ',
        description: 'ドライブラッシュ',
        iconText: 'ラッシュ',
      },
      suffix,
    };
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
    } else if (remaining.includes('ドライブラッシュ')) {
      isRush = true;
      rushText = 'ラッシュ';
      remaining = remaining.replace(/ドライブラッシュ/g, '').trim();
    } else if (remaining.includes('ラッシュ')) {
      isRush = true;
      rushText = 'ラッシュ';
      remaining = remaining.replace(/ラッシュ/g, '').trim();
    }
  } else {
    // キャンセルがある場合は余分な「ラッシュ」文字列を除去
    remaining = remaining.replace(/生ラッシュ|パリィラッシュ|ドライブラッシュ|ラッシュ/g, '').trim();
  }

  remaining = remaining.replace(/起き攻め/g, '').trim();
  // 再度〆や余分な空白を除去
  remaining = remaining.replace(/〆|締め?$/, '').trim();

  const lower = remaining.toLowerCase();

  // ラッシュやキャンセルを引いた後に技名がなく「ドライブ」だけ残った場合、または空文字の場合
  if (!remaining || lower === 'ドライブ' || lower === 'dr' || lower === 'd') {
    return {
      original: 'ラッシュ',
      isCancel: false,
      isRush: false,
      rushText: undefined,
      prefix,
      arrows: [],
      arrowStr: '',
      button: {
        kind: 'special',
        color: 'neutral',
        label: 'ラッシュ',
        description: 'ドライブラッシュ',
        iconText: 'ラッシュ',
      },
      suffix,
    };
  }

  // -------------------------------------------------------------
  // エレナ専用技およびエレナコマンド（指示書 5-1 / 5-2）
  // -------------------------------------------------------------
  // 1. ライノ（ライノホーン: 236K）
  // ユーザー指示：ライノ→236K
  if (lower.includes('ライノ')) {
    const isOD = lower.includes('od');
    const isHeavy = lower.includes('強') || lower.includes('大');
    const isLight = lower.includes('弱');
    const strength = isOD ? 'OD' : isHeavy ? '強' : isLight ? '弱' : '中';
    const color: ButtonColor = isOD ? 'purple' : isHeavy ? 'red' : isLight ? 'blue' : 'yellow';
    const btnK = isOD ? 'KK' : isHeavy ? '大K' : isLight ? '弱K' : '中K';

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
        label: isOD ? 'ODライノ' : `${strength}ライノ`,
        description: isOD ? 'ODライノホーン（236+KK）' : `${strength}ライノホーン（236+${btnK}）`,
        iconText: isOD ? 'KK' : 'K',
        showLabel: false,
      },
      suffix,
      tip: `テンキー236+${btnK}（下・斜め前・前＋キック: ライノホーン）`,
    };
  }

  // 2. スピン（スピンサイズ: 214K）
  // ユーザー指示：スピン→214K
  if (lower.includes('スピン') && !lower.includes('スピバ') && !lower.includes('スピニング')) {
    const isOD = lower.includes('od');
    const isHeavy = lower.includes('強') || lower.includes('大');
    const isLight = lower.includes('弱');
    const strength = isOD ? 'OD' : isHeavy ? '強' : isLight ? '弱' : '中';
    const color: ButtonColor = isOD ? 'purple' : isHeavy ? 'red' : isLight ? 'blue' : 'yellow';
    const btnK = isOD ? 'KK' : isHeavy ? '大K' : isLight ? '弱K' : '中K';

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
        label: isOD ? 'ODスピン' : `${strength}スピン`,
        description: isOD ? 'ODスピンサイズ（214+KK）' : `${strength}スピンサイズ（214+${btnK}）`,
        iconText: isOD ? 'KK' : 'K',
        showLabel: false,
      },
      suffix,
      tip: `テンキー214+${btnK}（下・斜め後ろ・後ろ＋キック: スピンサイズ）`,
    };
  }

  // 3. コロ（リンクシング: 236P）
  // ユーザー指示：コロ→236P
  if (lower.includes('コロ') && !lower.includes('コロコロ')) {
    const isOD = lower.includes('od');
    const isHeavy = lower.includes('強') || lower.includes('大');
    const isLight = lower.includes('弱');
    const strength = isOD ? 'OD' : isHeavy ? '強' : isLight ? '弱' : '中';
    const color: ButtonColor = isOD ? 'purple' : isHeavy ? 'red' : isLight ? 'blue' : 'yellow';
    const btnP = isOD ? 'PP' : isHeavy ? '大P' : isLight ? '弱P' : '中P';

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
        label: isOD ? 'ODコロ' : `${strength}コロ`,
        description: isOD ? 'ODリンクシング（236+PP）' : `${strength}リンクシング（236+${btnP}）`,
        iconText: isOD ? 'PP' : 'P',
        showLabel: false,
      },
      suffix,
      tip: `テンキー236+${btnP}（下・斜め前・前＋パンチ: リンクシング）`,
    };
  }

  // 4. ムーン（ムーングライド: 214P）
  // ユーザー指示：ムーン→214P
  if (lower.includes('ムーン')) {
    const isOD = lower.includes('od');
    const isHeavy = lower.includes('強') || lower.includes('大');
    const isLight = lower.includes('弱');
    const strength = isOD ? 'OD' : isHeavy ? '強' : isLight ? '弱' : '中';
    const color: ButtonColor = isOD ? 'purple' : isHeavy ? 'red' : isLight ? 'blue' : 'yellow';
    const btnP = isOD ? 'PP' : isHeavy ? '大P' : isLight ? '弱P' : '中P';

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
        label: isOD ? 'ODムーン' : `${strength}ムーン`,
        description: isOD ? 'ODムーングライド（214+PP）' : `${strength}ムーングライド（214+${btnP}）`,
        iconText: isOD ? 'PP' : 'P',
        showLabel: false,
      },
      suffix,
      tip: `テンキー214+${btnP}（下・斜め後ろ・後ろ＋パンチ: ムーングライド）`,
    };
  }

  // 5. エレナの昇竜（スクラッチホイール: 623K または ワンボタンSP）
  // ユーザー指示：昇竜→623K（モダン対空ではワンボタン昇竜）
  if (isElena && (lower.includes('昇竜') || lower.includes('昇龍') || lower.includes('スクラッチ') || lower.includes('ホイール'))) {
    const isOneButton = lower.includes('ワンボタン');
    const isOD = lower.includes('od');
    const isHeavy = lower.includes('強') || lower.includes('大') || (!lower.includes('弱') && !lower.includes('中') && !isOD);
    const isLight = lower.includes('弱');
    const strength = isOD ? 'OD' : isHeavy ? '強' : isLight ? '弱' : '中';
    const color: ButtonColor = isOD ? 'purple' : isHeavy ? 'red' : isLight ? 'blue' : 'yellow';
    const btnK = isOD ? 'KK' : isHeavy ? '大K' : isLight ? '弱K' : '中K';

    if (isOneButton || (controlType === 'modern' && !lower.includes('623') && !lower.includes('中昇竜') && !lower.includes('強昇竜') && !lower.includes('弱昇竜') && !isOD)) {
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
          color: 'yellow',
          label: '昇竜',
          description: '前＋SPボタン（ワンボタン昇竜）',
          iconText: 'SP',
          showLabel: false,
        },
        suffix,
        tip: '前＋必殺技ボタン（→＋SP）で即座に対空',
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
        kind: 'kick',
        color,
        label: isOD ? 'OD昇竜' : `${strength}昇竜`,
        description: isOD ? 'ODスクラッチホイール（623+KK）' : `${strength}スクラッチホイール（623+${btnK}）`,
        iconText: isOD ? 'KK' : 'K',
        showLabel: false,
      },
      suffix,
      tip: `テンキー623+${btnK}（前・下・斜め前＋キック: スクラッチホイール）`,
    };
  }

  // 6. エレナのSA1（236236K / ワンボタンSA1）
  // ユーザー指示 5-2：SA1→236236K（キック）、ボタン内文字は「K」
  if (isElena && lower.includes('sa1')) {
    const isOneButton = lower.includes('ワンボタン');
    const isModern = controlType === 'modern';
    if (isOneButton || (isModern && !lower.includes('236'))) {
      return {
        original: remaining || 'SA1',
        isCancel,
        isRush,
        rushText,
        prefix: prefix || 'SA1',
        arrows: [],
        arrowStr: 'N',
        button: {
          kind: 'special',
          color: 'gold',
          label: 'SA1',
          description: 'ワンボタンSA1（強＋SP または SAボタン）',
          iconText: 'SA1',
          showLabel: false,
        },
        suffix,
        tip: 'ワンボタンSA1（対空無敵あり）',
      };
    }
    return {
      original: remaining || 'SA1',
      isCancel,
      isRush,
      rushText,
      prefix: prefix || 'SA1',
      arrows: ['↓', '↘', '→', '↓', '↘', '→'],
      arrowStr: '↓↘→↓↘→',
      button: {
        kind: 'kick',
        color: 'gold',
        label: 'SA1',
        description: '金のSA1ボタン（236236+K）',
        iconText: 'K',
        showLabel: false,
      },
      suffix,
      tip: 'テンキー236を2回素早く入力+キック（スピニングビート）',
    };
  }

  // 7. エレナのSA2（236236P / ワンボタンSA2）
  // ユーザー指示 5-2：SA2→236236P（パンチ）、ボタン内文字は「P」
  if (isElena && lower.includes('sa2')) {
    const isOneButton = lower.includes('ワンボタン');
    const isModern = controlType === 'modern';
    if (isOneButton || (isModern && !lower.includes('236'))) {
      return {
        original: remaining || 'SA2',
        isCancel,
        isRush,
        rushText,
        prefix: prefix || 'SA2',
        arrows: ['←'],
        arrowStr: '←',
        button: {
          kind: 'special',
          color: 'gold',
          label: 'SA2',
          description: 'ワンボタンSA2（後ろ＋SP または 中＋SP）',
          iconText: 'SA2',
          showLabel: false,
        },
        suffix,
        tip: '後ろ＋必殺技ボタンで即発動（弾抜け・回復派生）',
      };
    }
    return {
      original: remaining || 'SA2',
      isCancel,
      isRush,
      rushText,
      prefix: prefix || 'SA2',
      arrows: ['↓', '↘', '→', '↓', '↘', '→'],
      arrowStr: '↓↘→↓↘→',
      button: {
        kind: 'punch',
        color: 'gold',
        label: 'SA2',
        description: '金のSA2ボタン（236236+P）',
        iconText: 'P',
        showLabel: false,
      },
      suffix,
      tip: 'テンキー236を2回素早く入力+パンチ（スピニングダンス / ヒーリング）',
    };
  }

  // 8. エレナのSA3 / CA（214214K または ワンボタン↓+SP）
  // ユーザー指示 5-2：SA3/CA→214214K（キック）、ボタン内文字は「K」
  if (isElena && (lower.includes('sa3') || lower.includes('ca'))) {
    const isCa = lower.includes('ca');
    const isOneButton = lower.includes('ワンボタン');
    const isModern = controlType === 'modern';
    if (isOneButton || (isModern && !lower.includes('214'))) {
      return {
        original: remaining || (isCa ? 'CA' : 'SA3'),
        isCancel,
        isRush,
        rushText,
        prefix: prefix || (isCa ? 'CA' : 'SA3'),
        arrows: ['↓'],
        arrowStr: '↓',
        button: {
          kind: 'special',
          color: 'gold',
          label: isCa ? 'CA' : 'SA3',
          description: isCa ? '金のCA（下＋SP または 弱＋SP）' : '金のSA3（下＋SP または 弱＋SP）',
          iconText: isCa ? 'CA' : 'SA3',
          showLabel: false,
        },
        suffix,
        tip: isCa ? '体力25%以下で発動：下＋必殺技ボタン（CA）' : '下＋必殺技ボタンで即発動（SA3）',
      };
    }
    return {
      original: remaining || (isCa ? 'CA' : 'SA3'),
      isCancel,
      isRush,
      rushText,
      prefix: prefix || (isCa ? 'CA' : 'SA3'),
      arrows: ['↓', '↙', '←', '↓', '↙', '←'],
      arrowStr: '↓↙←↓↙←',
      button: {
        kind: 'kick',
        color: 'gold',
        label: isCa ? 'CA' : 'SA3',
        description: isCa ? '金のCAボタン（214214+K）' : '金のSA3ボタン（214214+K）',
        iconText: 'K',
        showLabel: false,
      },
      suffix,
      tip: isCa
        ? '体力25%以下で発動：テンキー214を2回素早く入力+キック（+250ダメージ）'
        : 'テンキー214を2回素早く入力+キック（ライジングチャリオット）',
    };
  }

  // 構え（行雲流水）
  if (lower.startsWith('構え') || lower.startsWith('行雲流水')) {
    return {
      original: '構え',
      isCancel,
      isRush,
      rushText,
      prefix,
      arrows: ['↓', '↙', '←'],
      arrowStr: '↓↙←',
      button: {
        kind: 'punch',
        color: 'neutral',
        label: '構え',
        description: 'パンチボタン（Pの強度は問わない）',
        iconText: 'P',
        showLabel: false,
      },
      suffix,
      tip: 'Pの強度は問わない',
    };
  }

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
      original: label,
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

  // 0.52 詐欺飛び
  if (lower.includes('詐欺飛び') || lower.includes('詐欺とび')) {
    return {
      original: '詐欺飛び',
      isCancel,
      isRush,
      rushText,
      prefix,
      arrows: ['↗'],
      arrowStr: '↗',
      button: {
        kind: 'special',
        color: 'neutral',
        label: '詐欺飛び',
        description: '詐欺飛び（安全飛び）',
        iconText: '詐欺飛び',
      },
      suffix,
      tip: '起き攻めでジャンプ攻撃をしても対空で落とされない攻め',
    };
  }

  // 0.53 前飛び / 前ジャンプ（フレーム消費）
  if (lower.includes('前飛び') || lower.includes('前ジャンプ') || lower === 'ジャンプ') {
    return {
      original: '前ジャンプ',
      isCancel,
      isRush,
      rushText,
      prefix,
      arrows: ['↗'],
      arrowStr: '↗',
      button: {
        kind: 'special',
        color: 'neutral',
        label: '前ジャンプ',
        description: '前ジャンプ（フレーム消費）',
        iconText: '前ジャンプ',
      },
      suffix,
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

  // 1. SA (スーパーアーツ) / CA (クリティカルアーツ)
  if (lower.includes('sa3') || lower.includes('真・昇龍') || lower.includes('ca')) {
    const isModern = controlType === 'modern';
    const isCa = lower.includes('ca');
    const saLabel = isCa ? 'CA' : 'SA3';
    return {
      original: remaining || saLabel,
      isCancel,
      isRush,
      rushText,
      prefix: prefix || saLabel,
      arrows: isModern ? ['↓'] : ['↓', '↘', '→', '↓', '↘', '→'],
      arrowStr: isModern ? '↓' : '↓↘→↓↘→',
      button: {
        kind: 'punch',
        color: 'gold',
        label: saLabel,
        description: isCa ? '金のCAボタン（クリティカルアーツ）' : '金のSAボタン',
        iconText: isModern ? saLabel : 'P',
        showLabel: false,
      },
      suffix,
      tip: isModern
        ? (isCa ? '体力25%以下で発動：↓＋弱＋中 または ↓＋SP＋強（+250ダメージ）' : '↓＋弱＋中 または ↓＋SP＋強（手動テンキー236×2+攻撃でも入力可能）')
        : (isCa ? '体力25%以下で発動：テンキー236を2回素早く入力+パンチ（+250ダメージ）' : 'テンキー236を2回素早く入力+パンチ'),
    };
  }

  if (lower.includes('sa2') || lower.includes('真・波掌')) {
    const isModern = controlType === 'modern';
    return {
      original: remaining || 'SA2',
      isCancel,
      isRush,
      rushText,
      prefix: prefix || 'SA2',
      arrows: isModern ? ['←'] : ['↓', '↙', '←', '↓', '↙', '←'],
      arrowStr: isModern ? '←' : '↓↙←↓↙←',
      button: {
        kind: 'punch',
        color: 'gold',
        label: 'SA2',
        description: '金のSAボタン',
        iconText: isModern ? 'SA2' : 'P',
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
      prefix: prefix || 'SA1',
      arrows: isModern ? [] : ['↓', '↘', '→', '↓', '↘', '→'],
      arrowStr: isModern ? 'N' : '↓↘→↓↘→',
      button: {
        kind: 'punch',
        color: 'gold',
        label: 'SA1',
        description: '金のSAボタン',
        iconText: isModern ? 'SA1' : 'P',
        showLabel: false,
      },
      suffix,
      tip: isModern
        ? 'N＋弱＋中 または N＋SP＋強（手動テンキー236×2+攻撃でも入力可能）'
        : 'テンキー236を2回素早く入力+パンチ',
    };
  }

  // 1.5 ジャンプ攻撃（垂直大P, 前J大P, 垂直JA大, 前JA大, ジャンプ大P, ジャンプA大, 前J中等）
  // ユーザー指示 5-2：「J大P」などの略記は避け、アコーディオン内では「ジャンプ大P」と表記する
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
      const label = isModern ? 'ジャンプA大' : isKick ? 'ジャンプ大K' : 'ジャンプ大P';
      const iconText = isModern ? 'A大' : isKick ? 'K' : 'P';
      return {
        original: label,
        isCancel,
        isRush,
        rushText,
        prefix,
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
          : `ジャンプ中に${isKick ? '大K' : '大P'}（${label}）`,
      };
    }

    if (isMed) {
      const label = isModern ? 'ジャンプ中' : isKick ? 'ジャンプ中K' : 'ジャンプ中P';
      const iconText = isModern ? '中' : isKick ? 'K' : 'P';
      return {
        original: label,
        isCancel,
        isRush,
        rushText,
        prefix,
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
      original: label,
      isCancel,
      isRush,
      rushText,
      prefix,
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
    const isRyu = !isElena && lower.includes('大ゴス');
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
        description: isRyu ? '赤いボタン（アシスト強攻撃 / 大ゴス）' : '赤いボタン（アシスト強攻撃）',
        iconText: 'A大',
        showLabel: false,
      },
      suffix,
      tip: isRyu ? 'アシストボタンを押しながら強攻撃（大ゴス）' : 'アシストボタンを押しながら強攻撃',
    };
  }

  // 2.83 エド必殺技：サイコフリッカー（フリッカー / 紐）
  // ユーザー指示：アコーディオン内の表記は OD紐 ➔ 236PP、強紐 ➔ 236大K
  if (
    lower.includes('フリッカー') ||
    lower.includes('紐') ||
    lower.includes('ひも')
  ) {
    const isOD = lower.includes('od');
    const isHeavy = lower.includes('強') || lower.includes('大');
    const isLight = lower.includes('弱');
    const strength = isOD ? 'OD' : isHeavy ? '強' : isLight ? '弱' : '中';
    const color: ButtonColor = isOD ? 'purple' : isHeavy ? 'red' : isLight ? 'blue' : 'yellow';

    if (isOD) {
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
          color: 'purple',
          label: 'OD紐',
          description: 'ODサイコフリッカー（236+PP）',
          iconText: 'PP',
          showLabel: false,
        },
        suffix,
        tip: 'テンキー236+PP（下・斜め前・前＋パンチ2ボタン同時押し）',
      };
    }

    const btnText = isHeavy ? '大K' : isLight ? '弱K' : '中K';

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
        label: `${strength}紐`,
        description: `${strength}サイコフリッカー（236+${btnText}）`,
        iconText: btnText,
        showLabel: false,
      },
      suffix,
      tip: `テンキー236+${btnText}（下・斜め前・前＋${btnText}）`,
    };
  }

  // 2.84 エド必殺技：サイコブリッツ（ブリッツ）
  // ユーザー指示：アコーディオン内の表記は 強ブリッツ ➔ 214大P、中ブリッツ ➔ 214中P
  if (lower.includes('ブリッツ')) {
    const isOD = lower.includes('od');
    const isHeavy = lower.includes('強') || lower.includes('大');
    const isLight = lower.includes('弱');
    const strength = isOD ? 'OD' : isHeavy ? '強' : isLight ? '弱' : '中';
    const color: ButtonColor = isOD ? 'purple' : isHeavy ? 'red' : isLight ? 'blue' : 'yellow';

    if (isOD) {
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
          color: 'purple',
          label: 'ODブリッツ',
          description: 'ODサイコブリッツ（214+PP）',
          iconText: 'PP',
          showLabel: false,
        },
        suffix,
        tip: 'テンキー214+PP（下・斜め後ろ・後ろ＋パンチ2ボタン同時押し）',
      };
    }

    const btnText = isHeavy ? '大P' : isLight ? '弱P' : '中P';

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
        label: `${strength}ブリッツ`,
        description: `${strength}サイコブリッツ（214+${btnText}）`,
        iconText: btnText,
        showLabel: false,
      },
      suffix,
      tip: `テンキー214+${btnText}（下・斜め後ろ・後ろ＋${btnText}）`,
    };
  }

  // 2.85 ザンギエフ必殺技：ダブルラリアット / ODラリアット
  // ユーザー指示：
  // ・ダブルラリアット ➔ PP（色は黄色のままでいい）
  // ・ODラリアット ➔ PPP（色は紫）
  if (
    lower.includes('ラリアット') ||
    lower.includes('ダブラリ') ||
    lower.includes('ダブルラリアット') ||
    lower === 'odラリ' ||
    lower.includes('odラリ')
  ) {
    const isOD = lower.includes('od');
    const isModern = controlType === 'modern';

    if (isOD) {
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
          color: 'purple',
          label: 'ODラリアット',
          description: isModern ? 'ODラリアット（A+SP または PPP）' : 'ODダブルラリアット（PPPボタン / パンチ3つ同時）',
          iconText: isModern ? 'A+SP' : 'PPP',
          showLabel: false,
        },
        suffix,
        tip: isModern
          ? 'アシスト＋SPボタン（またはPPPボタン）でODダブルラリアット'
          : 'パンチ3ボタン同時押し（またはPPPボタン）でODダブルラリアット',
      };
    }

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
        label: 'ダブルラリアット',
        description: isModern ? 'SPボタン（ダブルラリアット）' : 'パンチ2つ同時押し（PP / ダブルラリアット）',
        iconText: isModern ? 'SP' : 'PP',
        showLabel: false,
      },
      suffix,
      tip: isModern
        ? 'SPボタン単体でダブルラリアット'
        : 'パンチ2ボタン同時押し（PP）でダブルラリアット',
    };
  }

  // 2.86 ザンギエフ必殺技：スクリューパイルドライバー (一回転 + P)
  if (lower.includes('スクリュー') || lower.includes('パイルドライバー')) {
    const isOD = lower.includes('od');
    const isHeavy = lower.includes('強') || lower.includes('大') || (!lower.includes('弱') && !lower.includes('中') && !isOD);
    const isLight = lower.includes('弱');
    const strength = isOD ? 'OD' : isHeavy ? '強' : isLight ? '弱' : '中';
    const color: ButtonColor = isOD ? 'purple' : isHeavy ? 'red' : isLight ? 'blue' : 'yellow';
    const isModern = controlType === 'modern';

    return {
      original: remaining,
      isCancel,
      isRush,
      rushText,
      prefix,
      arrows: ['一回転'],
      arrowStr: '一回転',
      button: {
        kind: 'punch',
        color,
        label: isOD ? 'ODスクリュー' : `${strength}スクリュー`,
        description: isOD ? 'ODスクリューパイルドライバー' : `${strength}スクリューパイルドライバー`,
        iconText: isOD ? (isModern ? 'A+SP' : 'PP') : (isModern ? 'SP' : 'P'),
        showLabel: false,
      },
      suffix,
      tip: isOD
        ? 'レバーを一回転（360°）回してパンチ2つ同時押し（ODコマ投げ）'
        : `レバーを一回転（360°）回して${strength}パンチ（コマ投げ）`,
    };
  }

  // 2.87 ザンギエフ特殊技：ヘルスタブ (3中P / ↘ + 中P)
  // ユーザー指示：「アコーディオン内の表記は 前大K→3中P（レバー表記にして）→PP（色は黄色のままでいい）」
  if (lower.includes('ヘルスタブ') || lower.includes('ヘルスタ') || lower === '3中p' || lower === '3中') {
    const isModern = controlType === 'modern';
    return {
      original: remaining,
      isCancel,
      isRush,
      rushText,
      prefix,
      arrows: ['↘'],
      arrowStr: '↘',
      button: {
        kind: 'punch',
        color: 'yellow',
        label: isModern ? '3中' : '3中P',
        description: isModern ? '斜め前下＋中攻撃（ヘルスタブ）' : '斜め前下＋中P（ヘルスタブ: 3中P）',
        iconText: isModern ? '中' : 'P',
        showLabel: false,
      },
      suffix,
      tip: isModern ? 'テンキー3+中（斜め前下＋中攻撃: ヘルスタブ）' : 'テンキー3+中P（斜め前下＋中パンチ: 3中P / ヘルスタブ）',
    };
  }

  // 2.88 テンキー3 / ↘ 方向の特殊技（3中P、3大Kなど）
  if (lower.startsWith('3') || lower.startsWith('↘')) {
    const isModern = controlType === 'modern';
    const isKick = lower.includes('k') || lower.includes('キック');
    const isHeavy = lower.includes('大') || lower.includes('強');
    const isLight = lower.includes('弱');
    const color: ButtonColor = isHeavy ? 'red' : isLight ? 'blue' : 'yellow';
    const kind: ButtonKind = isKick ? 'kick' : 'punch';
    const strengthChar = isHeavy ? '大' : isLight ? '弱' : '中';
    const btnChar = isKick ? 'K' : 'P';
    const label = isModern ? strengthChar : btnChar;

    return {
      original: remaining,
      isCancel,
      isRush,
      rushText,
      prefix,
      arrows: ['↘'],
      arrowStr: '↘',
      button: {
        kind,
        color,
        label: isModern ? `3${strengthChar}` : `3${strengthChar}${btnChar}`,
        description: isModern ? `斜め前下＋${strengthChar}攻撃` : `斜め前下＋${strengthChar}${btnChar}`,
        iconText: label,
        showLabel: false,
      },
      suffix,
      tip: `斜め前下（↘）＋${isModern ? strengthChar + '攻撃' : strengthChar + btnChar}`,
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

    const isModern = controlType === 'modern';
    const iconText = isOD
      ? (isModern ? 'A+SP' : 'KK')
      : isModern
      ? (isLight ? '弱' : isHeavy ? '強' : '中')
      : 'K';

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
        iconText,
        showLabel: false,
      },
      suffix,
      tip: isModern
        ? `テンキー236+${isOD ? 'A+SP' : strength}（下・斜め前・前＋攻撃）`
        : `テンキー236+${isOD ? 'KK（2ボタン同時）' : strength + 'K'}（下・斜め前・前＋キック）`,
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

  // 2.95 ベガ必殺技：シャドウライズ (↓(溜め)↑ + K)
  if (lower.includes('シャドウライズ') || lower.includes('シャドーライズ') || lower === 'ライズ') {
    const isOD = lower.includes('od');
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
        color: isOD ? 'purple' : 'yellow',
        label: isOD ? 'ODライズ' : 'K',
        description: isOD ? 'ODシャドウライズ' : 'キックボタン（下溜め上K）',
        iconText: isOD ? 'KK' : 'K',
        showLabel: false,
      },
      suffix,
      tip: '下キーを約0.8秒溜めてから上＋K（下溜め上K）',
    };
  }

  // 2.96 ベガシャドウライズ派生：ヘッドプレス（K派生）
  if (lower.includes('ヘッドプレス') || lower === 'k派生' || lower === 'キック派生') {
    return {
      original: 'ヘッドプレス',
      isCancel,
      isRush,
      rushText,
      prefix,
      arrows: [],
      arrowStr: '',
      button: {
        kind: 'kick',
        color: 'yellow',
        label: 'K派生',
        description: 'K派生（ヘッドプレス）',
        iconText: 'K派生',
        showLabel: false,
      },
      suffix,
      tip: 'シャドウライズ中にKボタン（ヘッドプレスに派生）',
    };
  }

  // 2.97 ベガシャドウライズ派生：サマーソルトスカルダイバー / デビリバ（P派生）
  if (
    lower.includes('デビリバ') ||
    lower.includes('スカルダイバー') ||
    lower.includes('サマーソルト') ||
    lower === 'p派生' ||
    lower === 'パンチ派生'
  ) {
    return {
      original: 'デビリバ',
      isCancel,
      isRush,
      rushText,
      prefix,
      arrows: [],
      arrowStr: '',
      button: {
        kind: 'punch',
        color: 'blue',
        label: 'P派生',
        description: 'P派生（デビリバ）',
        iconText: 'P派生',
        showLabel: false,
      },
      suffix,
      tip: 'シャドウライズ中にPボタン（デビリバに派生）',
    };
  }

  // 2.98 ベガ必殺技：ダブルニープレス / ニー (↓↘→ + K)
  if (
    lower.includes('ダブルニー') ||
    lower.includes('ダブニー') ||
    lower.includes('ニープレス') ||
    lower.endsWith('ニー') ||
    lower === 'ニー'
  ) {
    const isOD = lower.includes('od');
    const isHeavy = lower.includes('強') || lower.includes('大');
    const isLight = lower.includes('弱');
    const strength = isOD ? 'OD' : isHeavy ? '強' : isLight ? '弱' : '中';
    const color: ButtonColor = isOD ? 'purple' : isHeavy ? 'red' : isLight ? 'blue' : 'yellow';

    const isModern = controlType === 'modern';
    const label = isOD
      ? 'ODニー'
      : isModern
      ? (isLight ? '弱' : isHeavy ? '大' : '中')
      : `${strength}K`;
    const iconText = isOD
      ? (isModern ? 'A+SP' : 'KK')
      : isModern
      ? (isLight ? '弱' : isHeavy ? '大' : '中')
      : 'K';

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
        description: isOD ? 'ODダブルニープレス' : `${strength}ダブルニープレス`,
        iconText,
        showLabel: false,
      },
      suffix,
      tip: isModern
        ? `テンキー236+${isOD ? 'A+SP' : strength}（下・斜め前・前＋攻撃）`
        : `テンキー236+${isOD ? 'KK（2ボタン同時）' : strength + 'K'}（下・斜め前・前＋キック）`,
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

  // 4.5 マリーザ必殺技：ディマカイルス (↓↙← + P)
  if (lower.includes('ディマカイルス') || lower.includes('ディマ')) {
    const isOD = lower.includes('od');
    const isHeavy = lower.includes('強') || lower.includes('大');
    const isLight = lower.includes('弱');
    const strength = isOD ? 'OD' : isHeavy ? '強' : isLight ? '弱' : '中';
    const color: ButtonColor = isOD ? 'purple' : isHeavy ? 'red' : isLight ? 'blue' : 'yellow';

    const iconText = isOD
      ? 'PP'
      : controlType === 'modern'
      ? (isHeavy ? '大' : strength)
      : `${strength}P`;

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
        label: isOD ? 'ODディマ' : `${strength}ディマ`,
        description: isOD ? 'ODディマカイルス' : `${strength}ディマカイルス`,
        iconText,
        showLabel: false,
      },
      suffix,
      tip: isOD
        ? 'テンキー214+PP（下・斜め後ろ・後ろ＋パンチ2つ同時）'
        : `テンキー214+${strength}（下・斜め後ろ・後ろ＋${strength}攻撃）`,
    };
  }

  // 4.6 マリーザ必殺技：ファランクス (→↓↘ + P)
  if (lower.includes('ファランクス') || lower.includes('ファラ')) {
    const isOD = lower.includes('od');
    const isHeavy = lower.includes('強') || lower.includes('大') || (!lower.includes('弱') && !lower.includes('中') && !isOD);
    const isLight = lower.includes('弱');
    const strength = isOD ? 'OD' : isHeavy ? '大' : isLight ? '弱' : '中';
    const color: ButtonColor = isOD ? 'purple' : isHeavy ? 'red' : isLight ? 'blue' : 'yellow';

    return {
      original: remaining,
      isCancel,
      isRush,
      rushText,
      prefix,
      arrows: ['→', '↓', '↘'],
      arrowStr: '→↓↘',
      button: {
        kind: 'punch',
        color,
        label: isOD ? 'ODファランクス' : '強ファランクス',
        description: isOD ? 'ODファランクス' : '強ファランクス',
        iconText: isOD ? 'PP' : '大P',
        showLabel: false,
      },
      suffix,
      tip: isOD
        ? 'テンキー623+PP（前・下・斜め前＋パンチ2つ同時）'
        : 'テンキー623+大P（前・下・斜め前＋強パンチ）',
    };
  }

  // 4.7 マリーザ必殺技：グラディウス (↓↘→ + P)
  if (lower.includes('グラディウス')) {
    const isOD = lower.includes('od');
    const isHeavy = lower.includes('強') || lower.includes('大');
    const isLight = lower.includes('弱');
    const strength = isOD ? 'OD' : isHeavy ? '強' : isLight ? '弱' : '中';
    const color: ButtonColor = isOD ? 'purple' : isHeavy ? 'red' : isLight ? 'blue' : 'yellow';

    const iconText = isOD
      ? 'PP'
      : controlType === 'modern'
      ? (isHeavy ? '大' : strength)
      : `${strength}P`;

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
        label: isOD ? 'ODグラディウス' : `${strength}グラディウス`,
        description: isOD ? 'ODグラディウス' : `${strength}グラディウス`,
        iconText,
        showLabel: false,
      },
      suffix,
      tip: `テンキー236+${isOD ? 'PP' : strength + 'P'}（下・斜め前・前＋パンチ）`,
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
            kind: 'special',
            color: 'emerald',
            label: isKick ? 'スパイク' : '昇竜',
            description: '強昇竜ボタン（前+SP）',
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
            color: 'emerald',
            label: '波動',
            description: '強波動ボタン（N+SP）',
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

  // 8. 二連撃 / ターゲットコンボ（大PTC / 大TC / 大>大）
  if (
    lower.includes('二連撃') ||
    lower.includes('ターゲット') ||
    lower.includes('大tc') ||
    lower.includes('大ptc') ||
    lower.includes('大>大') ||
    lower.includes('大＞大')
  ) {
    const isModern = controlType === 'modern';
    const isElenaTC = isElena || lower.includes('エレナ');
    const tcText = isModern ? '大大' : isElenaTC ? '大P大P' : '大P大K';
    const tcButtons = isModern
      ? [
          { color: 'red' as ButtonColor, iconText: '大', label: '強' },
          { color: 'red' as ButtonColor, iconText: '大', label: '強' },
        ]
      : [
          { color: 'red' as ButtonColor, iconText: 'P', label: '大P' },
          { color: 'red' as ButtonColor, iconText: isElenaTC ? 'P' : 'K', label: isElenaTC ? '大P' : '大K' },
        ];

    return {
      original: remaining,
      isCancel,
      isRush,
      rushText,
      prefix,
      arrows: [],
      arrowStr: '',
      isTC: true,
      tcText,
      tcButtons,
      button: {
        kind: 'punch',
        color: 'red',
        label: isModern ? '大大' : tcText,
        description: isModern ? '赤いボタン（大 ➔ 大）' : `赤いボタン（${tcText}）`,
        iconText: isModern ? '大' : 'P',
        showLabel: false,
      },
      suffix,
      tip: isModern
        ? '強攻撃ヒット後にもう一度強攻撃を入力（大 ➔ 大）'
        : `強Pヒット後にすかさず入力（ターゲットコンボ: ${tcText}）`,
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

  // 10.8 コパ / 小パン（弱P）
  if (
    lower === 'コパ' ||
    lower === '小パン' ||
    lower === '立ちコパ' ||
    lower === '立コパ' ||
    lower.startsWith('コパ') ||
    lower.startsWith('小パン')
  ) {
    const isModern = controlType === 'modern';
    const label = isModern ? '弱' : '弱P';
    const iconText = isModern ? '弱' : 'P';
    return {
      original: label,
      isCancel,
      isRush,
      rushText,
      prefix,
      arrows: [],
      arrowStr: '',
      button: {
        kind: 'punch',
        color: 'blue',
        label,
        description: isModern ? '青いボタン（弱）' : '青いボタン（弱P）',
        iconText,
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
      original: lower.includes('コパ') ? (isModern ? '下弱' : '下弱P') : remaining,
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
  const isLight = lower.includes('弱') || lower.includes('小') || lower.includes('コパ') || lower.includes('小パン') || lower.includes('lp') || lower.includes('lk');
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
  // OD必殺技（PPやKKを含む、またはA+SP、または技名がODで始まるもの）は維持
  const isOD =
    step.button.iconText === 'PP' ||
    step.button.iconText === 'PPP' ||
    step.button.iconText === 'KK' ||
    step.button.iconText === 'KKK' ||
    step.button.iconText === 'A+SP' ||
    (step.button.label && step.button.label.startsWith('OD'));

  // 必殺技手動コマンド（矢印がある技で、大K, 中P, 大Pなどの指定があるもの）はモダンでも維持
  const isManualCommand = step.arrows && step.arrows.length > 0 && /^[弱中強大][PK]$/.test(step.button.iconText);
  if (isManualCommand) {
    return step;
  }

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
