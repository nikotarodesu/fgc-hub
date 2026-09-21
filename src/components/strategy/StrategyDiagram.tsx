'use client';

import React, { useMemo } from 'react';
import {
  ArrowRight,
  ArrowDown,
  Shield,
  Swords,
  Target,
  Sparkles,
  Zap,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Gauge,
  Eye,
  Crosshair,
} from 'lucide-react';

interface StrategyDiagramProps {
  articleNumber: number;
  diagramIndex: number;
  rawComment?: string;
}

interface ParsedItem {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  role: 'player' | 'enemy' | 'attack' | 'success' | 'warning' | 'purple' | 'neutral';
  badge?: string;
}

interface ParsedDiagram {
  diagramNumber: string;
  purpose: string;
  format: string;
  items: ParsedItem[];
  notes: string[];
  summaryAction?: string;
}

/**
 * コメントテキストをインテリジェントに解析し、構造化データを生成
 */
function parseRawComment(rawComment: string | undefined, articleNum: number, diagIndex: number): ParsedDiagram {
  const diagNumStr = `${articleNum}-${diagIndex}`;
  if (!rawComment) {
    return {
      diagramNumber: diagNumStr,
      purpose: '戦術判断・距離・フレーム状況の構造図解',
      format: 'カード形式',
      items: [
        { id: '1', title: '状況の認識', subtitle: '相手の行動と間合い', role: 'player' },
        { id: '2', title: '技の選択', subtitle: 'リスクとリターンの評価', role: 'attack' },
        { id: '3', title: '確定反撃・継続', subtitle: '次の手番へ移行', role: 'success' },
      ],
      notes: [],
    };
  }

  const lines = rawComment
    .replace(/^<!--\s*/, '')
    .replace(/\s*-->$/, '')
    .split('\n')
    .map(l => l.trim())
    .filter(Boolean);

  let purpose = '';
  let format = '';
  const notes: string[] = [];
  const rawItems: string[] = [];

  for (const line of lines) {
    if (line.startsWith('SVG-')) continue;
    if (line.startsWith('目的：')) {
      purpose = line.replace('目的：', '').trim();
      continue;
    }
    if (line.startsWith('形式：')) {
      format = line.replace('形式：', '').trim();
      continue;
    }
    if (line.startsWith('比率：')) continue;

    // 「スマートフォンでは〜」「〜統一します」「〜しないでください」等は注記へ
    if (
      line.includes('スマートフォンでは') ||
      line.includes('スマホでは') ||
      line.includes('統一') ||
      line.includes('注記') ||
      line.includes('色：')
    ) {
      notes.push(line);
      continue;
    }

    rawItems.push(line);
  }

  // アイテム抽出ロジック
  const items: ParsedItem[] = [];

  // パターン1: 1「...」 2「...」 または ①... ②...
  const numberedMatch = rawComment.match(/(\d+|[①②③④⑤⑥])[\s:「『]([^」』\n\d①②③④⑤⑥]+)[」』]?/g);
  if (numberedMatch && numberedMatch.length >= 2) {
    numberedMatch.forEach((m, idx) => {
      const clean = m.replace(/^(\d+|[①②③④⑤⑥])[\s:「『]?/, '').replace(/[」』]$/, '').trim();
      if (clean) {
        items.push({
          id: String(idx + 1),
          title: clean,
          role: getRoleFromText(clean, idx),
          badge: `STEP ${idx + 1}`,
        });
      }
    });
  }

  // パターン2: 「A」→「B」→「C」
  if (items.length === 0) {
    for (const raw of rawItems) {
      if (raw.includes('→')) {
        const parts = raw.split('→').map(p => p.trim().replace(/^[「『]|[!」』]$/g, ''));
        parts.forEach((p, idx) => {
          if (p && !items.some(it => it.title === p)) {
            items.push({
              id: String(items.length + 1),
              title: p,
              role: getRoleFromText(p, idx),
              badge: `STAGE ${idx + 1}`,
            });
          }
        });
        break;
      }
    }
  }

  // パターン3: 「...」「...」の並び（左から「遠距離」「中距離」など）
  if (items.length === 0) {
    for (const raw of rawItems) {
      const bracketMatches = raw.match(/[「『]([^」』]+)[」』]/g);
      if (bracketMatches && bracketMatches.length >= 2) {
        bracketMatches.forEach((bm, idx) => {
          const clean = bm.replace(/^[「『]|[」』]$/g, '').trim();
          if (clean && !items.some(it => it.title === clean)) {
            items.push({
              id: String(items.length + 1),
              title: clean,
              role: getRoleFromText(clean, idx),
            });
          }
        });
        break;
      }
    }
  }

  // パターン4: 上段・下段、または箇条書き行
  if (items.length === 0) {
    for (const raw of rawItems) {
      if (raw.startsWith('上段：') || raw.startsWith('下段：') || raw.startsWith('左：') || raw.startsWith('右：') || raw.startsWith('中央：')) {
        const [label, ...rest] = raw.split('：');
        items.push({
          id: String(items.length + 1),
          title: label.trim(),
          description: rest.join('：').trim(),
          role: getRoleFromText(label + ' ' + rest.join(' '), items.length),
        });
      } else if (raw.startsWith('- ') || raw.startsWith('・')) {
        const clean = raw.replace(/^[-・]\s*/, '').trim();
        items.push({
          id: String(items.length + 1),
          title: clean,
          role: getRoleFromText(clean, items.length),
        });
      }
    }
  }

  // フォールバック（もし分解できなかった場合、rawItemsから意味のある文をカード化）
  if (items.length === 0) {
    rawItems.slice(0, 4).forEach((ri, idx) => {
      items.push({
        id: String(idx + 1),
        title: ri.length > 28 ? ri.slice(0, 26) + '…' : ri,
        description: ri.length > 28 ? ri : undefined,
        role: getRoleFromText(ri, idx),
      });
    });
  }

  return {
    diagramNumber: diagNumStr,
    purpose: purpose || '本セクションの戦術判断と状況分岐の整理',
    format: format || 'フロー/比較カード',
    items,
    notes,
  };
}

/**
 * テキストのキーワードから役割ロールを判定（高コントラスト色彩）
 */
function getRoleFromText(
  text: string,
  index: number
): 'player' | 'enemy' | 'attack' | 'success' | 'warning' | 'purple' | 'neutral' {
  const lower = text.toLowerCase();
  if (lower.includes('自分') || lower.includes('自キャラ') || lower.includes('前進') || lower.includes('歩き') || lower.includes('接近') || lower.includes('投資')) {
    return 'player'; // 青
  }
  if (lower.includes('相手') || lower.includes('敵') || lower.includes('被弾') || lower.includes('危険') || lower.includes('暴れ')) {
    return 'enemy'; // 赤
  }
  if (lower.includes('攻撃') || lower.includes('判定') || lower.includes('置き') || lower.includes('弾') || lower.includes('中足') || lower.includes('技')) {
    return 'attack'; // 橙
  }
  if (lower.includes('成功') || lower.includes('差し') || lower.includes('回収') || lower.includes('有利') || lower.includes('反撃') || lower.includes('確定') || lower.includes('安全')) {
    return 'success'; // 緑
  }
  if (lower.includes('差し返し') || lower.includes('空振り') || lower.includes('パニカン') || lower.includes('パリィ') || lower.includes('ジャスト')) {
    return 'purple'; // 紫
  }
  if (lower.includes('注意') || lower.includes('リスク') || lower.includes('停止') || lower.includes('bo') || lower.includes('硬直')) {
    return 'warning'; // 琥珀/黄
  }
  // インデックスによる分散
  const roles: Array<'player' | 'attack' | 'purple' | 'success'> = ['player', 'attack', 'purple', 'success'];
  return roles[index % roles.length];
}

/**
 * 各役割に対応するスタイル（WCAG AA高コントラスト保証）
 */
function getRoleStyles(role: ParsedItem['role']) {
  switch (role) {
    case 'player':
      return {
        cardBg: 'bg-blue-50/80 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800/80',
        badgeBg: 'bg-blue-600 text-white dark:bg-blue-500',
        titleColor: 'text-blue-950 dark:text-blue-100',
        descColor: 'text-blue-900/80 dark:text-blue-200/90',
        icon: <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />,
        dotColor: 'bg-blue-500',
        accentBorder: 'border-l-4 border-l-blue-500',
      };
    case 'enemy':
      return {
        cardBg: 'bg-rose-50/80 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800/80',
        badgeBg: 'bg-rose-600 text-white dark:bg-rose-500',
        titleColor: 'text-rose-950 dark:text-rose-100',
        descColor: 'text-rose-900/80 dark:text-rose-200/90',
        icon: <Target className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />,
        dotColor: 'bg-rose-500',
        accentBorder: 'border-l-4 border-l-rose-500',
      };
    case 'attack':
      return {
        cardBg: 'bg-amber-50/80 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/80',
        badgeBg: 'bg-amber-600 text-white dark:bg-amber-500',
        titleColor: 'text-amber-950 dark:text-amber-100',
        descColor: 'text-amber-900/80 dark:text-amber-200/90',
        icon: <Swords className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />,
        dotColor: 'bg-amber-500',
        accentBorder: 'border-l-4 border-l-amber-500',
      };
    case 'success':
      return {
        cardBg: 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/80',
        badgeBg: 'bg-emerald-600 text-white dark:bg-emerald-500',
        titleColor: 'text-emerald-950 dark:text-emerald-100',
        descColor: 'text-emerald-900/80 dark:text-emerald-200/90',
        icon: <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />,
        dotColor: 'bg-emerald-500',
        accentBorder: 'border-l-4 border-l-emerald-500',
      };
    case 'purple':
      return {
        cardBg: 'bg-purple-50/80 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800/80',
        badgeBg: 'bg-purple-600 text-white dark:bg-purple-500',
        titleColor: 'text-purple-950 dark:text-purple-100',
        descColor: 'text-purple-900/80 dark:text-purple-200/90',
        icon: <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />,
        dotColor: 'bg-purple-500',
        accentBorder: 'border-l-4 border-l-purple-500',
      };
    case 'warning':
      return {
        cardBg: 'bg-yellow-50/80 dark:bg-yellow-950/40 border-yellow-200 dark:border-yellow-800/80',
        badgeBg: 'bg-yellow-600 text-white dark:bg-yellow-500',
        titleColor: 'text-yellow-950 dark:text-yellow-100',
        descColor: 'text-yellow-900/80 dark:text-yellow-200/90',
        icon: <AlertTriangle className="w-4 h-4 text-yellow-600 dark:text-yellow-400 shrink-0" />,
        dotColor: 'bg-yellow-500',
        accentBorder: 'border-l-4 border-l-yellow-500',
      };
    default:
      return {
        cardBg: 'bg-neutral-50 dark:bg-neutral-800/60 border-neutral-200 dark:border-neutral-700',
        badgeBg: 'bg-neutral-600 text-white dark:bg-neutral-400',
        titleColor: 'text-neutral-900 dark:text-neutral-100',
        descColor: 'text-neutral-700 dark:text-neutral-300',
        icon: <Shield className="w-4 h-4 text-neutral-500 dark:text-neutral-400 shrink-0" />,
        dotColor: 'bg-neutral-400',
        accentBorder: 'border-l-4 border-l-neutral-400',
      };
  }
}

export default function StrategyDiagram({ articleNumber, diagramIndex, rawComment }: StrategyDiagramProps) {
  const parsed = useMemo(
    () => parseRawComment(rawComment, articleNumber, diagramIndex),
    [rawComment, articleNumber, diagramIndex]
  );

  // ----------------------------------------------------
  // 特別設計：第1記事 図解1-1（置き・差し・差し返し）
  // スマホで文字が絶対に小さくならないレスポンシブ3連カード
  // ----------------------------------------------------
  if (articleNumber === 1 && diagramIndex === 1) {
    return (
      <figure className="my-6 sm:my-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs overflow-hidden">
        {/* ヘッダー */}
        <div className="px-4 py-3 sm:px-5 sm:py-3.5 bg-neutral-50 dark:bg-neutral-800/70 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-3">
          <figcaption className="text-xs sm:text-sm font-bold text-neutral-800 dark:text-neutral-200 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 shrink-0" />
            <span>図解 1-1: 置き・差し・差し返しの基本構造と距離</span>
          </figcaption>
          <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-100 dark:bg-cyan-950/80 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
            比較インフォグラフィック
          </span>
        </div>

        {/* 3分割レスポンシブグリッド */}
        <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {/* 1: 置き */}
          <div className="rounded-xl border-2 border-amber-300 dark:border-amber-700/80 bg-amber-50/60 dark:bg-amber-950/30 p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="text-xs font-black px-2.5 py-0.5 rounded bg-amber-500 text-white">
                  【置き】
                </span>
                <span className="text-xs font-bold text-amber-800 dark:text-amber-300">
                  前進を止める
                </span>
              </div>
              <p className="text-xs sm:text-[13px] text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
                相手が入ってくる進路へ、攻撃判定をあらかじめ先に出して待ち受ける。
              </p>
            </div>

            {/* ミニビジュアル図 */}
            <div className="bg-white dark:bg-neutral-900 rounded-lg p-3 border border-amber-200 dark:border-amber-800/80">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-[11px] flex items-center justify-center">自</span>
                  <span className="px-1.5 py-0.5 rounded bg-amber-500 text-white font-bold text-[10px]">判定先行</span>
                </div>
                <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
                  <span className="text-[11px] font-bold">← 侵入</span>
                  <span className="w-6 h-6 rounded-full bg-rose-600 text-white font-bold text-[11px] flex items-center justify-center">敵</span>
                </div>
              </div>
              <div className="mt-2 text-[11px] text-center font-bold text-neutral-500 dark:text-neutral-400">
                相手の踏み込みに判定をぶつける
              </div>
            </div>
          </div>

          {/* 2: 差し */}
          <div className="rounded-xl border-2 border-blue-300 dark:border-blue-700/80 bg-blue-50/60 dark:bg-blue-950/30 p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="text-xs font-black px-2.5 py-0.5 rounded bg-blue-600 text-white">
                  【差し】
                </span>
                <span className="text-xs font-bold text-blue-800 dark:text-blue-300">
                  自分から触る
                </span>
              </div>
              <p className="text-xs sm:text-[13px] text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
                止まっている・後退中の相手に対し、自分から歩いて届く距離で先端を当てる。
              </p>
            </div>

            {/* ミニビジュアル図 */}
            <div className="bg-white dark:bg-neutral-900 rounded-lg p-3 border border-blue-200 dark:border-blue-800/80">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-[11px] flex items-center justify-center">自</span>
                  <span className="text-[11px] font-bold">前進 →</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="px-1.5 py-0.5 rounded bg-emerald-500 text-white font-bold text-[10px]">先端HIT</span>
                  <span className="w-6 h-6 rounded-full bg-rose-600 text-white font-bold text-[11px] flex items-center justify-center">敵</span>
                </div>
              </div>
              <div className="mt-2 text-[11px] text-center font-bold text-neutral-500 dark:text-neutral-400">
                歩き時間を短くして反応を防ぐ
              </div>
            </div>
          </div>

          {/* 3: 差し返し */}
          <div className="rounded-xl border-2 border-purple-300 dark:border-purple-700/80 bg-purple-50/60 dark:bg-purple-950/30 p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="text-xs font-black px-2.5 py-0.5 rounded bg-purple-600 text-white">
                  【差し返し】
                </span>
                <span className="text-xs font-bold text-purple-800 dark:text-purple-300">
                  空振りを叩く
                </span>
              </div>
              <p className="text-xs sm:text-[13px] text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
                相手の技を手前で寸止め（空振り）させ、残ったやられ判定へ反撃を叩き込む。
              </p>
            </div>

            {/* ミニビジュアル図 */}
            <div className="bg-white dark:bg-neutral-900 rounded-lg p-3 border border-purple-200 dark:border-purple-800/80">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-[11px] flex items-center justify-center">自</span>
                  <span className="px-1.5 py-0.5 rounded bg-purple-600 text-white font-bold text-[10px]">反撃技</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[10px] text-rose-500 font-mono border border-dashed border-rose-400 px-1 py-0.5 rounded">空振り</span>
                  <span className="w-6 h-6 rounded-full bg-rose-600 text-white font-bold text-[11px] flex items-center justify-center">敵</span>
                </div>
              </div>
              <div className="mt-2 text-[11px] text-center font-bold text-neutral-500 dark:text-neutral-400">
                前進で誘い、停止/後退で外して刺す
              </div>
            </div>
          </div>
        </div>

        {/* フッター要約 */}
        <div className="px-4 py-2.5 sm:px-6 sm:py-3 bg-neutral-100/80 dark:bg-neutral-800/40 border-t border-neutral-200 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-300 flex items-center gap-2">
          <Crosshair className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
          <span>ボタンではなく「何を狙って振るか（目的とタイミング）」で使い分けることが重要です。</span>
        </div>
      </figure>
    );
  }

  // ----------------------------------------------------
  // 特別設計：第1記事 図解1-3（地上戦の循環関係）
  // スマホで文字が絶対に小さくならないレスポンシブ循環図
  // ----------------------------------------------------
  if (articleNumber === 1 && diagramIndex === 3) {
    return (
      <figure className="my-6 sm:my-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs overflow-hidden">
        <div className="px-4 py-3 sm:px-5 sm:py-3.5 bg-neutral-50 dark:bg-neutral-800/70 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-3">
          <figcaption className="text-xs sm:text-sm font-bold text-neutral-800 dark:text-neutral-200 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 shrink-0" />
            <span>図解 1-3: 地上戦の循環関係（置き・差し・差し返し）</span>
          </figcaption>
          <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
            三すくみ・循環
          </span>
        </div>

        <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
          {/* 循環ステップカード */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            {/* 置き */}
            <div className="rounded-xl border-l-4 border-l-amber-500 border border-neutral-200 dark:border-neutral-700/80 bg-amber-50/50 dark:bg-amber-950/20 p-3.5 sm:p-4">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="font-black text-sm text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                  <Swords className="w-4 h-4 text-amber-600" />
                  <span>置き</span>
                </span>
                <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400">差しの前進を止める</span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                相手が差しに来るタイミングに合わせて判定を先出し。しかし、読まれて待たれると空振りを晒す。
              </p>
            </div>

            {/* 差し返し */}
            <div className="rounded-xl border-l-4 border-l-purple-500 border border-neutral-200 dark:border-neutral-700/80 bg-purple-50/50 dark:bg-purple-950/20 p-3.5 sm:p-4">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="font-black text-sm text-purple-900 dark:text-purple-200 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span>差し返し</span>
                </span>
                <span className="text-[11px] font-bold text-purple-700 dark:text-purple-400">置きの空振りを叩く</span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                相手の置き技を誘って手前で空振らせ、硬直を殴る。しかし、相手が技を振らないとラインを失う。
              </p>
            </div>

            {/* 差し */}
            <div className="rounded-xl border-l-4 border-l-blue-500 border border-neutral-200 dark:border-neutral-700/80 bg-blue-50/50 dark:bg-blue-950/20 p-3.5 sm:p-4">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="font-black text-sm text-blue-900 dark:text-blue-200 flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-blue-600" />
                  <span>差し</span>
                </span>
                <span className="text-[11px] font-bold text-blue-700 dark:text-blue-400">待つ相手へ直接触る</span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                差し返しを待って止まる相手へ、自分から歩いて触りにいく。しかし、相手の置き技には潰される。
              </p>
            </div>
          </div>

          {/* 循環リレーション矢印バー */}
          <div className="rounded-xl bg-neutral-100 dark:bg-neutral-800/80 p-3 text-xs text-neutral-700 dark:text-neutral-300 flex flex-wrap items-center justify-center gap-3 text-center font-bold">
            <span className="flex items-center gap-1 text-amber-700 dark:text-amber-300">
              【置き】 <ArrowRight className="w-3.5 h-3.5" /> 差しに勝ちやすい
            </span>
            <span className="text-neutral-300 dark:text-neutral-600 hidden sm:inline">|</span>
            <span className="flex items-center gap-1 text-purple-700 dark:text-purple-300">
              【差し返し】 <ArrowRight className="w-3.5 h-3.5" /> 置きに勝ちやすい
            </span>
            <span className="text-neutral-300 dark:text-neutral-600 hidden sm:inline">|</span>
            <span className="flex items-center gap-1 text-blue-700 dark:text-blue-300">
              【差し】 <ArrowRight className="w-3.5 h-3.5" /> 差し返し待ちに触りやすい
            </span>
          </div>
        </div>

        <div className="px-4 py-2.5 sm:px-6 sm:py-3 bg-neutral-100/80 dark:bg-neutral-800/40 border-t border-neutral-200 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-300 flex items-center gap-2">
          <RotateCcw className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
          <span>結果は固定のじゃんけんではなく、間合い・技の発生・硬直・やられ判定の相性によって常に動的に変化します。</span>
        </div>
      </figure>
    );
  }

  // ----------------------------------------------------
  // 全25記事対応：レスポンシブ＆高コントラスト・インフォグラフィック
  // スマホでは縦積みカード、PCでは横並びステップ/グリッド
  // ----------------------------------------------------
  return (
    <figure className="my-6 sm:my-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs overflow-hidden">
      {/* キャプション・ヘッダー */}
      <div className="px-4 py-3 sm:px-5 sm:py-3.5 bg-neutral-50 dark:bg-neutral-800/70 border-b border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-2">
        <figcaption className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 shrink-0" />
          <span>図解 {parsed.diagramNumber}: {parsed.purpose}</span>
        </figcaption>
        <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-100 dark:bg-cyan-950/80 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
          {parsed.format}
        </span>
      </div>

      {/* インフォグラフィック本体 */}
      <div className="p-4 sm:p-6 space-y-4">
        {/* 要素カードリスト（レスポンシブグリッド：スマホは1列、PCは2〜4列） */}
        <div
          className={`grid gap-3 sm:gap-4 ${
            parsed.items.length === 2
              ? 'grid-cols-1 sm:grid-cols-2'
              : parsed.items.length === 3
              ? 'grid-cols-1 md:grid-cols-3'
              : parsed.items.length === 4
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          {parsed.items.map((item, idx) => {
            const styles = getRoleStyles(item.role);

            return (
              <div
                key={item.id || idx}
                className={`rounded-xl border p-3.5 sm:p-4 flex flex-col justify-between transition-all ${styles.cardBg} ${styles.accentBorder}`}
              >
                <div>
                  {/* ヘッダーバッジとアイコン */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${styles.badgeBg}`}>
                        {item.badge || `STAGE ${idx + 1}`}
                      </span>
                    </div>
                    {styles.icon}
                  </div>

                  {/* タイトル */}
                  <h4 className={`text-sm sm:text-[15px] font-bold leading-snug mb-1.5 ${styles.titleColor}`}>
                    {item.title}
                  </h4>

                  {/* サブタイトルや補足 */}
                  {item.subtitle && (
                    <p className={`text-xs font-medium mb-1.5 opacity-90 ${styles.titleColor}`}>
                      {item.subtitle}
                    </p>
                  )}

                  {/* 詳細説明 */}
                  {item.description && (
                    <p className={`text-xs leading-relaxed ${styles.descColor}`}>
                      {item.description}
                    </p>
                  )}
                </div>

                {/* PC表示時の矢印コネクタ（最後のアイテム以外） */}
                {idx < parsed.items.length - 1 && (
                  <div className="hidden md:flex items-center justify-end pt-2 text-neutral-400 dark:text-neutral-500">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
                {/* スマホ表示時の下向き矢印 */}
                {idx < parsed.items.length - 1 && (
                  <div className="flex md:hidden items-center justify-center pt-2 text-neutral-400 dark:text-neutral-500">
                    <ArrowDown className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 注記があれば表示 */}
        {parsed.notes.length > 0 && (
          <div className="mt-3 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/40 border border-dashed border-neutral-200 dark:border-neutral-700/80 text-[11px] sm:text-xs text-neutral-600 dark:text-neutral-400 flex items-start gap-2">
            <Eye className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              {parsed.notes.map((note, nIdx) => (
                <p key={nIdx}>{note}</p>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* フッター：視認性・配色レジェンド */}
      <div className="px-4 py-2.5 sm:px-6 sm:py-3 bg-neutral-50 dark:bg-neutral-800/50 border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-3 text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400">
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
          <span className="flex items-center gap-1 font-bold text-blue-700 dark:text-blue-300">
            <span className="w-2 h-2 rounded-full bg-blue-500" /> 自キャラ・前進
          </span>
          <span className="flex items-center gap-1 font-bold text-rose-700 dark:text-rose-300">
            <span className="w-2 h-2 rounded-full bg-rose-500" /> 相手・被弾警戒
          </span>
          <span className="flex items-center gap-1 font-bold text-amber-700 dark:text-amber-300">
            <span className="w-2 h-2 rounded-full bg-amber-500" /> 攻撃判定・置き
          </span>
          <span className="flex items-center gap-1 font-bold text-emerald-700 dark:text-emerald-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500" /> 有利・確定反撃
          </span>
          <span className="flex items-center gap-1 font-bold text-purple-700 dark:text-purple-300">
            <span className="w-2 h-2 rounded-full bg-purple-500" /> 差し返し・パリィ
          </span>
        </div>
      </div>
    </figure>
  );
}

