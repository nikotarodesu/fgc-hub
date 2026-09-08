/**
 * コンボレシピ文字列を初心者にも分かりやすい視覚的なコマンドステップに分解・変換するユーティリティ
 */

export interface ParsedComboStep {
  original: string;         // 元の技名（例: "強波掌撃", "2LP"）
  arrows?: string[];        // 方向矢印のシーケンス（例: ["↓", "↙", "←"]）
  buttonText: string;       // ボタン名（例: "強P", "KK", "パリィラッシュ"）
  isSpecial?: boolean;      // 必殺技・超必殺技フラグ
  isDrive?: boolean;        // OD技・ラッシュフラグ
  tip?: string;             // 初心者向けの入力のコツ
}

export function parseComboRecipe(recipe: string): ParsedComboStep[] {
  // 区切り文字（">"、"➔"、"→"（技間の区切りとして使われている場合））で分割
  const rawParts = recipe.split(/>|→(?!\+)/).map((p) => p.trim().replace(/〆$/, '')).filter(Boolean);

  return rawParts.map((part) => {
    return parseSingleMove(part);
  });
}

function parseSingleMove(text: string): ParsedComboStep {
  const clean = text.trim();
  const lower = clean.toLowerCase();

  // ラッシュ関連
  if (lower.includes('ラッシュ') || lower.includes('dr') || lower.includes('パリィ')) {
    if (lower.includes('大p') || lower.includes('強p')) {
      return {
        original: clean,
        arrows: ['→', '→'],
        buttonText: '中P+中K ➔ 強P',
        isDrive: true,
        tip: 'ダッシュ中に強Pを押すか、パリィを押しながら前前',
      };
    }
    return {
      original: clean,
      arrows: ['→', '→'],
      buttonText: '中P+中K (パリィ)',
      isDrive: true,
      tip: '通常技ヒット直後に前前（またはパリィボタン）',
    };
  }

  // 波動拳
  if (lower.includes('波動') || lower.includes('236p') || lower.includes('弾')) {
    const isOD = lower.includes('od');
    const strength = lower.includes('強') ? '強P' : lower.includes('中') ? '中P' : lower.includes('弱') ? '弱P' : 'P';
    return {
      original: clean,
      arrows: ['↓', '↘', '→'],
      buttonText: isOD ? 'PP (OD)' : strength,
      isSpecial: true,
      isDrive: isOD,
      tip: 'テンキー236+P。下から前へ滑らかに入力',
    };
  }

  // 昇龍拳
  if (lower.includes('昇竜') || lower.includes('昇龍') || lower.includes('623p')) {
    const isOD = lower.includes('od');
    const strength = lower.includes('強') ? '強P' : lower.includes('中') ? '中P' : lower.includes('弱') ? '弱P' : 'P';
    return {
      original: clean,
      arrows: ['→', '↓', '↘'],
      buttonText: isOD ? 'PP (OD)' : strength,
      isSpecial: true,
      isDrive: isOD,
      tip: 'テンキー623+P。「前・下・斜め前」と入力',
    };
  }

  // 竜巻旋風脚
  if (lower.includes('竜巻') || lower.includes('214k')) {
    const isOD = lower.includes('od');
    const strength = lower.includes('強') ? '強K' : lower.includes('中') ? '中K' : lower.includes('弱') ? '弱K' : 'K';
    return {
      original: clean,
      arrows: ['↓', '↙', '←'],
      buttonText: isOD ? 'KK (OD)' : strength,
      isSpecial: true,
      isDrive: isOD,
      tip: 'テンキー214+K。下から後ろへ回転',
    };
  }

  // 波掌撃
  if (lower.includes('波掌') || lower.includes('214p')) {
    const isOD = lower.includes('od');
    const strength = lower.includes('強') ? '強P' : lower.includes('中') ? '中P' : lower.includes('弱') ? '弱P' : 'P';
    return {
      original: clean,
      arrows: ['↓', '↙', '←'],
      buttonText: isOD ? 'PP (OD)' : strength,
      isSpecial: true,
      isDrive: isOD,
      tip: 'テンキー214+P。下から後ろへ回転',
    };
  }

  // 上段足刀破り
  if (lower.includes('足刀') || lower.includes('236k')) {
    const isOD = lower.includes('od');
    const strength = lower.includes('強') ? '強K' : lower.includes('中') ? '中K' : lower.includes('弱') ? '弱K' : 'K';
    return {
      original: clean,
      arrows: ['↓', '↘', '→'],
      buttonText: isOD ? 'KK (OD)' : strength,
      isSpecial: true,
      isDrive: isOD,
      tip: 'テンキー236+K。波動拳と同じコマンドのキック版',
    };
  }

  // SA1 (真空波動拳)
  if (lower.includes('sa1') || lower.includes('真空波動')) {
    return {
      original: clean,
      arrows: ['↓', '↘', '→', '↓', '↘', '→'],
      buttonText: 'P (SA1)',
      isSpecial: true,
      tip: '236を素早く2回入力してP',
    };
  }

  // SA2 (真・波掌撃)
  if (lower.includes('sa2') || lower.includes('真・波掌撃')) {
    return {
      original: clean,
      arrows: ['↓', '↙', '←', '↓', '↙', '←'],
      buttonText: 'P (SA2)',
      isSpecial: true,
      tip: '214を素早く2回入力してP',
    };
  }

  // SA3 (真・昇龍拳)
  if (lower.includes('sa3') || lower.includes('真・昇龍拳') || lower.includes('ca')) {
    return {
      original: clean,
      arrows: ['↓', '↘', '→', '↓', '↘', '→'],
      buttonText: 'P (SA3)',
      isSpecial: true,
      tip: '236を素早く2回入力してP（またはモダンワンボタン）',
    };
  }

  // 前大P / 大ゴス / 6HP
  if (lower.includes('前大p') || lower.includes('大ゴス') || lower.includes('6hp')) {
    return {
      original: clean,
      arrows: ['→'],
      buttonText: '強P (大ゴス)',
      tip: '前を押しながら強P。ガード+1F',
    };
  }

  // 前大K / 6HK
  if (lower.includes('前大k') || lower.includes('6hk')) {
    return {
      original: clean,
      arrows: ['→'],
      buttonText: '強K (前大K)',
      tip: '前を押しながら強K',
    };
  }

  // 引大P / 4HP
  if (lower.includes('引大') || lower.includes('引き強') || lower.includes('4hp')) {
    return {
      original: clean,
      arrows: ['←'],
      buttonText: '強P (引大P)',
      tip: '後ろを押しながら強P。シミーの主力技',
    };
  }

  // しゃがみ技 (下/しゃがみ/2)
  if (lower.startsWith('下') || lower.startsWith('しゃがみ') || lower.startsWith('2')) {
    const btn = clean.replace(/^(下|しゃがみ|2)/, '').trim();
    return {
      original: clean,
      arrows: ['↓'],
      buttonText: btn || 'P/K',
      tip: 'しゃがみ入力しながらボタン',
    };
  }

  // ジャンプ技 (前ジャンプ/垂直ジャンプ)
  if (lower.includes('ジャンプ') || lower.startsWith('j')) {
    return {
      original: clean,
      arrows: ['↗'],
      buttonText: clean.replace(/^(ジャンプ|j)/, '') || '強攻撃',
      tip: '前ジャンプ中に攻撃ボタン',
    };
  }

  // デフォルト（立ち技など）
  return {
    original: clean,
    buttonText: clean,
  };
}
