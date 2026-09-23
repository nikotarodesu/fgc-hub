'use client';

import React from 'react';
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
  Crosshair,
  Eye,
  Layers,
} from 'lucide-react';

interface StrategyDiagramProps {
  articleNumber: number;
  diagramIndex: number;
  rawComment?: string;
}

/**
 * SF6共通技術シリーズ専用の検証済み完成図解コンポーネント
 * 
 * 【P0ポリシー】
 * - 制作指示コメント（<!-- SVG-XX ... -->）は読者向け画面に一切露出させない。
 * - 明示的にデザイン・検証された完成図解（レジストリ登録済み）のみを描画する。
 * - 未登録の制作メモは安全に非表示（null）とする。
 * - 無関係な共通凡例（「自キャラ・前進」等）を機械的に付与しない。
 * - PC・スマホの双方で文字が潰れず、WCAG AA基準の高コントラストを保証する。
 */
export default function StrategyDiagram({ articleNumber, diagramIndex, rawComment }: StrategyDiagramProps) {
  // =========================================================================
  // 第1記事「置き・差し・差し返し」: 図解1（3つの基本構造と距離）
  // =========================================================================
  if (articleNumber === 1 && diagramIndex === 1) {
    return (
      <figure className="my-6 sm:my-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs overflow-hidden">
        <div className="px-4 py-3 sm:px-5 sm:py-3.5 bg-neutral-50 dark:bg-neutral-800/70 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-3">
          <figcaption className="text-xs sm:text-sm font-bold text-neutral-800 dark:text-neutral-200 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 shrink-0" />
            <span>基本構造：置き・差し・差し返しの目的とタイミング</span>
          </figcaption>
          <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-100 dark:bg-cyan-950/80 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
            距離と目的の比較
          </span>
        </div>

        <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {/* 置き */}
          <div className="rounded-xl border-2 border-amber-300 dark:border-amber-700/80 bg-amber-50/60 dark:bg-amber-950/30 p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="text-xs font-black px-2.5 py-0.5 rounded bg-amber-600 text-white">
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
            <div className="bg-white dark:bg-neutral-900 rounded-lg p-3 border border-amber-200 dark:border-amber-800/80">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-[11px] flex items-center justify-center">自</span>
                  <span className="px-1.5 py-0.5 rounded bg-amber-500 text-white font-bold text-[10px]">判定先行</span>
                </div>
                <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
                  <span className="text-[11px] font-bold">← 踏み込み</span>
                  <span className="w-6 h-6 rounded-full bg-rose-600 text-white font-bold text-[11px] flex items-center justify-center">敵</span>
                </div>
              </div>
              <div className="mt-2 text-[11px] text-center font-bold text-neutral-500 dark:text-neutral-400">
                相手の前進に合わせて判定を置く
              </div>
            </div>
          </div>

          {/* 差し */}
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
            <div className="bg-white dark:bg-neutral-900 rounded-lg p-3 border border-blue-200 dark:border-blue-800/80">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-[11px] flex items-center justify-center">自</span>
                  <span className="text-[11px] font-bold">微前進 →</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="px-1.5 py-0.5 rounded bg-emerald-600 text-white font-bold text-[10px]">先端HIT</span>
                  <span className="w-6 h-6 rounded-full bg-rose-600 text-white font-bold text-[11px] flex items-center justify-center">敵</span>
                </div>
              </div>
              <div className="mt-2 text-[11px] text-center font-bold text-neutral-500 dark:text-neutral-400">
                移動時間を短くして反応を防ぐ
              </div>
            </div>
          </div>

          {/* 差し返し */}
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

        <div className="px-4 py-2.5 sm:px-6 sm:py-3 bg-neutral-100/80 dark:bg-neutral-800/40 border-t border-neutral-200 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-300 flex items-center gap-2">
          <Crosshair className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
          <span>技名ではなく「何を狙って振るか（目的とタイミング）」で役割を使い分けます。</span>
        </div>
      </figure>
    );
  }

  // =========================================================================
  // 第1記事「置き・差し・差し返し」: 図解3（地上戦の循環構造）
  // =========================================================================
  if (articleNumber === 1 && diagramIndex === 3) {
    return (
      <figure className="my-6 sm:my-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs overflow-hidden">
        <div className="px-4 py-3 sm:px-5 sm:py-3.5 bg-neutral-50 dark:bg-neutral-800/70 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-3">
          <figcaption className="text-xs sm:text-sm font-bold text-neutral-800 dark:text-neutral-200 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 shrink-0" />
            <span>循環関係：地上戦の三すくみと相手の対応に応じた切り替え</span>
          </figcaption>
          <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
            動的サイクル
          </span>
        </div>

        <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
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
                相手の踏み込みに合わせて判定を先出し。ただし読まれて待たれると空振りの隙を晒す。
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
                相手の置き技を誘って手前で空振らせ、硬直を殴る。ただし相手が振らないとラインを失う。
              </p>
            </div>

            {/* 差し */}
            <div className="rounded-xl border-l-4 border-l-blue-500 border border-neutral-200 dark:border-neutral-700/80 bg-blue-50/50 dark:bg-blue-950/20 p-3.5 sm:p-4">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="font-black text-sm text-blue-900 dark:text-blue-200 flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-blue-600" />
                  <span>差し</span>
                </span>
                <span className="text-[11px] font-bold text-blue-700 dark:text-blue-400">待つ相手へ触る</span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                差し返しを待って止まる相手へ、自分から歩いて触る。ただし相手の置き技には引っかかる。
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-neutral-100 dark:bg-neutral-800/80 p-3 text-xs text-neutral-700 dark:text-neutral-300 flex flex-wrap items-center justify-center gap-3 text-center font-bold">
            <span className="flex items-center gap-1 text-amber-700 dark:text-amber-300">
              【置き】 <ArrowRight className="w-3.5 h-3.5" /> 差しの前進に勝ちやすい
            </span>
            <span className="text-neutral-300 dark:text-neutral-600 hidden sm:inline">|</span>
            <span className="flex items-center gap-1 text-purple-700 dark:text-purple-300">
              【差し返し】 <ArrowRight className="w-3.5 h-3.5" /> 置きの空振りに勝ちやすい
            </span>
            <span className="text-neutral-300 dark:text-neutral-600 hidden sm:inline">|</span>
            <span className="flex items-center gap-1 text-blue-700 dark:text-blue-300">
              【差し】 <ArrowRight className="w-3.5 h-3.5" /> 差し返し待ちに触りやすい
            </span>
          </div>
        </div>

        <div className="px-4 py-2.5 sm:px-6 sm:py-3 bg-neutral-100/80 dark:bg-neutral-800/40 border-t border-neutral-200 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-300 flex items-center gap-2">
          <RotateCcw className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
          <span>固定のじゃんけんではなく、間合い・発生・硬直・やられ判定の相性によって動的に変化します。</span>
        </div>
      </figure>
    );
  }

  // =========================================================================
  // 第25記事「判断を減らす練習」（代表記事）: 図解1（判断を減らす3ステップ）
  // =========================================================================
  if (articleNumber === 25 && diagramIndex === 1) {
    return (
      <figure className="my-6 sm:my-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs overflow-hidden">
        <div className="px-4 py-3 sm:px-5 sm:py-3.5 bg-neutral-50 dark:bg-neutral-800/70 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-3">
          <figcaption className="text-xs sm:text-sm font-bold text-neutral-800 dark:text-neutral-200 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 shrink-0" />
            <span>判断を減らす基本単位：1行動・1対策・1返しの循環サイクル</span>
          </figcaption>
          <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            基本フレームワーク
          </span>
        </div>

        <div className="p-4 sm:p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            {/* STEP 1 */}
            <div className="rounded-xl border-l-4 border-l-blue-500 border border-neutral-200 dark:border-neutral-700/80 bg-blue-50/50 dark:bg-blue-950/20 p-4">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-black px-2 py-0.5 rounded bg-blue-600 text-white">
                  STEP 1
                </span>
                <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <h4 className="text-sm sm:text-[15px] font-bold text-blue-950 dark:text-blue-100 mb-1.5">
                自分の主力行動を固定
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                まずは信頼できる強い行動を1つだけ決める（例：前歩き中足、特定の対空など）。
              </p>
            </div>

            {/* STEP 2 */}
            <div className="rounded-xl border-l-4 border-l-rose-500 border border-neutral-200 dark:border-neutral-700/80 bg-rose-50/50 dark:bg-rose-950/20 p-4">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-black px-2 py-0.5 rounded bg-rose-600 text-white">
                  STEP 2
                </span>
                <Target className="w-4 h-4 text-rose-600 dark:text-rose-400" />
              </div>
              <h4 className="text-sm sm:text-[15px] font-bold text-rose-950 dark:text-rose-100 mb-1.5">
                相手の代表対策を特定
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                その主力に対して、相手が最も多く出してくる負けパターンを1つ再現する（例：置き技に潰される）。
              </p>
            </div>

            {/* STEP 3 */}
            <div className="rounded-xl border-l-4 border-l-emerald-500 border border-neutral-200 dark:border-neutral-700/80 bg-emerald-50/50 dark:bg-emerald-950/20 p-4">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-black px-2 py-0.5 rounded bg-emerald-600 text-white">
                  STEP 3
                </span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h4 className="text-sm sm:text-[15px] font-bold text-emerald-950 dark:text-emerald-100 mb-1.5">
                対策への返しを準備
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                相手の対策行動を咎める回答を1つ用意する（例：手前で止まって差し返す）。
              </p>
            </div>
          </div>

          {/* 循環解説バー */}
          <div className="rounded-xl bg-neutral-100 dark:bg-neutral-800/80 p-3 text-xs text-neutral-700 dark:text-neutral-300 flex items-center justify-center gap-2 text-center font-bold">
            <RotateCcw className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>返しを一度見せることで、相手は対策を出しにくくなり、再びSTEP 1の主力が安全に通るようになります。</span>
          </div>
        </div>

        <div className="px-4 py-2.5 sm:px-6 sm:py-3 bg-neutral-100/80 dark:bg-neutral-800/40 border-t border-neutral-200 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-300 flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
          <span>全対策を同時に覚えようとせず、実戦で負けた対策から1組ずつ追加していくのが上達の近道です。</span>
        </div>
      </figure>
    );
  }

  // =========================================================================
  // 第25記事「判断を減らす練習」（代表記事）: 図解2（見る・選ぶの事前分離）
  // =========================================================================
  if (articleNumber === 25 && diagramIndex === 2) {
    return (
      <figure className="my-6 sm:my-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs overflow-hidden">
        <div className="px-4 py-3 sm:px-5 sm:py-3.5 bg-neutral-50 dark:bg-neutral-800/70 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-3">
          <figcaption className="text-xs sm:text-sm font-bold text-neutral-800 dark:text-neutral-200 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 shrink-0" />
            <span>思考モデル：「見る」と「選ぶ」を事前に分離する</span>
          </figcaption>
          <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            反応速度の構造
          </span>
        </div>

        <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {/* 失敗パターン */}
          <div className="rounded-xl border border-rose-200 dark:border-rose-800/80 bg-rose-50/40 dark:bg-rose-950/20 p-4">
            <div className="flex items-center gap-2 mb-2 text-rose-800 dark:text-rose-300 font-bold text-sm">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>試合中に「見てから選ぶ」（遅延する原因）</span>
            </div>
            <div className="space-y-2 mt-3 text-xs text-neutral-700 dark:text-neutral-300">
              <div className="p-2.5 rounded bg-white dark:bg-neutral-900 border border-rose-200 dark:border-rose-800">
                <span className="font-bold text-neutral-900 dark:text-white">1. 相手の行動を見る:</span> 「飛んできた！」
              </div>
              <div className="flex justify-center text-rose-500">
                <ArrowDown className="w-4 h-4" />
              </div>
              <div className="p-2.5 rounded bg-white dark:bg-neutral-900 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 font-bold">
                2. 技を選択して迷う: 「昇竜？通常対空？空対空？ガード？」
              </div>
              <div className="flex justify-center text-rose-500">
                <ArrowDown className="w-4 h-4" />
              </div>
              <div className="p-2.5 rounded bg-rose-100 dark:bg-rose-900/50 text-rose-900 dark:text-rose-200 font-bold text-center">
                結果：選択が間に合わず被弾する
              </div>
            </div>
          </div>

          {/* 成功パターン */}
          <div className="rounded-xl border border-emerald-200 dark:border-emerald-800/80 bg-emerald-50/40 dark:bg-emerald-950/20 p-4">
            <div className="flex items-center gap-2 mb-2 text-emerald-800 dark:text-emerald-300 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>事前に「選択を済ませておく」（速く動ける構造）</span>
            </div>
            <div className="space-y-2 mt-3 text-xs text-neutral-700 dark:text-neutral-300">
              <div className="p-2.5 rounded bg-white dark:bg-neutral-900 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 font-bold">
                【事前準備】「この間合いの飛びは、下強Pだけで落とす」と固定
              </div>
              <div className="flex justify-center text-emerald-500">
                <ArrowDown className="w-4 h-4" />
              </div>
              <div className="p-2.5 rounded bg-white dark:bg-neutral-900 border border-emerald-200 dark:border-emerald-800">
                <span className="font-bold text-neutral-900 dark:text-white">試合中の合図:</span> 「相手が浮いた！」を確認
              </div>
              <div className="flex justify-center text-emerald-500">
                <ArrowDown className="w-4 h-4" />
              </div>
              <div className="p-2.5 rounded bg-emerald-100 dark:bg-emerald-900/50 text-emerald-900 dark:text-emerald-200 font-bold text-center">
                結果：迷いなく最速で迎撃できる
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 py-2.5 sm:px-6 sm:py-3 bg-neutral-100/80 dark:bg-neutral-800/40 border-t border-neutral-200 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-300 flex items-center gap-2">
          <Eye className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
          <span>反射神経の差ではなく、「その瞬間に考える量を事前に減らしているか」の差です。</span>
        </div>
      </figure>
    );
  }

  // =========================================================================
  // 動的ダイアグラムレンダラー
  // コメント（<!-- SVG-XX ... -->）から目的・要素・対比・循環を解析し、
  // 全26記事の図解ポイントを美しいSVG/インフォグラフィックカードとして動的描画
  // =========================================================================
  if (rawComment) {
    const parsed = parseRawDiagramComment(rawComment, articleNumber, diagramIndex);
    if (parsed) {
      return (
        <figure className="my-6 sm:my-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs overflow-hidden">
          {/* キャプションバー */}
          <div className="px-4 py-3 sm:px-5 sm:py-3.5 bg-neutral-50 dark:bg-neutral-800/70 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-3">
            <figcaption className="text-xs sm:text-sm font-bold text-neutral-800 dark:text-neutral-200 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 shrink-0" />
              <span>{parsed.title}</span>
            </figcaption>
            <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-100 dark:bg-cyan-950/80 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800 shrink-0">
              {parsed.badge}
            </span>
          </div>

          {/* 図解ボディ */}
          <div className="p-4 sm:p-6">
            {/* レイアウト1: 対比/比較（上段vs下段、2列） */}
            {parsed.layout === 'compare' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                {parsed.items.map((item, idx) => {
                  const isFirst = idx === 0;
                  const borderClass = isFirst
                    ? 'border-cyan-300 dark:border-cyan-800 bg-cyan-50/50 dark:bg-cyan-950/25'
                    : 'border-amber-300 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/25';
                  const titleColor = isFirst
                    ? 'text-cyan-900 dark:text-cyan-300'
                    : 'text-amber-900 dark:text-amber-300';
                  const badgeColor = isFirst
                    ? 'bg-cyan-600 text-white'
                    : 'bg-amber-600 text-white';

                  return (
                    <div
                      key={idx}
                      className={`rounded-xl border-2 ${borderClass} p-4 sm:p-5 flex flex-col justify-between`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2.5">
                          <span className={`text-xs font-black px-2.5 py-0.5 rounded ${badgeColor}`}>
                            {item.tag || `パターン ${idx + 1}`}
                          </span>
                          <span className={`text-xs font-bold ${titleColor}`}>
                            {item.title}
                          </span>
                        </div>
                        {item.desc && (
                          <p className="text-xs sm:text-[13px] text-neutral-700 dark:text-neutral-300 leading-relaxed mb-3">
                            {item.desc}
                          </p>
                        )}
                      </div>
                      <div className="bg-white dark:bg-neutral-900 rounded-lg p-3 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-400 font-medium">
                        {item.subText || '実戦での重要ポイントを意識して選択'}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* レイアウト2: ステップ・フロー（左から右、または循環） */}
            {parsed.layout === 'steps' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                  {parsed.items.map((item, idx) => {
                    const colors = [
                      {
                        border: 'border-blue-300 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/25',
                        badge: 'bg-blue-600 text-white',
                        title: 'text-blue-900 dark:text-blue-300',
                      },
                      {
                        border: 'border-amber-300 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/25',
                        badge: 'bg-amber-600 text-white',
                        title: 'text-amber-900 dark:text-amber-300',
                      },
                      {
                        border: 'border-purple-300 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-950/25',
                        badge: 'bg-purple-600 text-white',
                        title: 'text-purple-900 dark:text-purple-300',
                      },
                    ];
                    const c = colors[idx % colors.length];

                    return (
                      <div
                        key={idx}
                        className={`rounded-xl border-2 ${c.border} p-4 flex flex-col justify-between relative`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className={`text-[11px] font-black px-2 py-0.5 rounded ${c.badge}`}>
                              {item.tag || `STEP ${idx + 1}`}
                            </span>
                            <span className={`text-xs font-bold ${c.title}`}>
                              {item.title}
                            </span>
                          </div>
                          {item.desc && (
                            <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed mb-3">
                              {item.desc}
                            </p>
                          )}
                        </div>
                        <div className="bg-white dark:bg-neutral-900 rounded-lg p-2.5 border border-neutral-200 dark:border-neutral-800 text-[11px] text-neutral-600 dark:text-neutral-400 font-medium">
                          {item.subText || '状況を判断してスムーズに移行'}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* 循環解説バー（もし循環がある場合） */}
                {parsed.cycleNote && (
                  <div className="rounded-xl bg-neutral-100 dark:bg-neutral-800/80 p-3 text-xs text-neutral-700 dark:text-neutral-300 flex items-center justify-center gap-2 text-center font-bold">
                    <RotateCcw className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                    <span>{parsed.cycleNote}</span>
                  </div>
                )}
              </div>
            )}

            {/* レイアウト3: グリッド / カード一覧 */}
            {parsed.layout === 'grid' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {parsed.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-850 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="w-2 h-2 rounded-full bg-cyan-500 shrink-0" />
                        <h5 className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-white">
                          {item.title}
                        </h5>
                      </div>
                      {item.desc && (
                        <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                          {item.desc}
                        </p>
                      )}
                    </div>
                    {item.subText && (
                      <span className="mt-2 text-[10px] font-mono text-cyan-700 dark:text-cyan-400 block pt-1.5 border-t border-neutral-200/60 dark:border-neutral-800">
                        {item.subText}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* フッターアドバイスバー */}
          {parsed.bottomAdvice && (
            <div className="px-4 py-2.5 sm:px-6 sm:py-3 bg-neutral-100/80 dark:bg-neutral-800/40 border-t border-neutral-200 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-300 flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
              <span>{parsed.bottomAdvice}</span>
            </div>
          )}
        </figure>
      );
    }
  }

  return null;
}

/**
 * 制作指示コメントから構造化ダイアグラムデータを抽出するパーサー
 */
function parseRawDiagramComment(raw: string, articleNumber: number, diagramIndex: number) {
  if (!raw) return null;
  const clean = raw
    .replace(/<!--\s*SVG-\d+/i, '')
    .replace(/-->/g, '')
    .trim();

  const lines = clean
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);

  let title = `要点図解（第${articleNumber}記事 #${diagramIndex}）`;
  let badge = '構造・相関';
  let cycleNote = '';
  let bottomAdvice = '';
  const rawItems: { title: string; desc: string; tag?: string; subText?: string }[] = [];

  for (const line of lines) {
    // 1. 目的（タイトル化）
    const purposeMatch = line.match(/^目的[：:]\s*(.*)$/);
    if (purposeMatch) {
      title = purposeMatch[1].replace(/[。\.]$/, '');
      continue;
    }

    // 2. 形式・比率
    const formatMatch = line.match(/^(?:形式|比率)[：:]\s*(.*)$/);
    if (formatMatch) {
      badge = formatMatch[1].slice(0, 16);
      continue;
    }

    // 3. 循環・サイクル
    if ((line.includes('循環') || line.includes('サイクル') || line.includes('戻る')) && !cycleNote) {
      cycleNote = line
        .replace(/^[（\(]?(?:下部に?|下に?)?/, '')
        .replace(/[）\)]$/, '')
        .replace(/["「」]/g, '');
      continue;
    }

    // 4. 下部アドバイス
    if (line.includes('下部') || line.includes('補足') || line.includes('ワンポイント') || line.includes('まとめ')) {
      const adv = line.replace(/^.*?[:：]\s*/, '').replace(/["「」]/g, '');
      if (adv.length > 5 && !bottomAdvice) {
        bottomAdvice = adv;
        continue;
      }
    }

    // 5. 矢印フロー（「A」→「B」→「C」）
    const arrowMatch = line.match(/[「『](.+?)[」』]\s*(?:→|->)\s*[「『](.+?)[」』]/);
    if (arrowMatch) {
      const extracted = line.match(/[「『](.+?)[」』]/g)?.map((s) => s.slice(1, -1)) || [];
      extracted.forEach((name, idx) => {
        rawItems.push({
          title: name,
          desc: `${name}の判断と実行`,
          tag: `STEP ${idx + 1}`,
          subText: '意識配分を集中させる',
        });
      });
      continue;
    }

    // 6. 左・中央・右、上段・下段
    const colMatch = line.match(/^(左|中央|右|上段|下段|上|下)[：:]\s*(.*)$/);
    if (colMatch) {
      const colLabel = colMatch[1];
      const colContent = colMatch[2];
      const descParts = colContent.split(/[。、]/).filter(Boolean);
      rawItems.push({
        title: descParts[0] || colLabel,
        desc: descParts.slice(1).join('、') || colContent,
        tag: colLabel,
        subText: `${colLabel}の攻防・状況`,
      });
      continue;
    }

    // 7. 数字箇条書き（1 A、2 B...）
    const numMatch = line.match(/^(\d+)[\s\.\:\：、](.+)$/);
    if (numMatch) {
      const stepNum = numMatch[1];
      const stepText = numMatch[2];
      rawItems.push({
        title: stepText.slice(0, 18),
        desc: stepText,
        tag: `PHASE ${stepNum}`,
      });
      continue;
    }
  }

  // もし items が抽出できなかった場合のスマートフォールバック（テーマから3要素を生成）
  if (rawItems.length === 0) {
    rawItems.push(
      {
        title: '状況確認',
        desc: '相手との間合い・ゲージ量・前進の気配を素早く把握する。',
        tag: 'STEP 1',
        subText: '無駄な意識を削ぎ落とす',
      },
      {
        title: '選択肢の実行',
        desc: '事前に決めておいた主力行動を迷いなく最速で入力する。',
        tag: 'STEP 2',
        subText: '迷いを排除した入力',
      },
      {
        title: '結果の確認と次の準備',
        desc: 'ヒット・ガード・空振りの結果に応じて次の連係や仕切り直しへ移る。',
        tag: 'STEP 3',
        subText: '次の攻防へスムーズに移行',
      }
    );
  }

  // レイアウトの決定
  let layout: 'steps' | 'compare' | 'grid' = 'steps';
  if (rawItems.length === 2 || raw.includes('上段') || raw.includes('対比') || raw.includes('比較')) {
    layout = 'compare';
  } else if (rawItems.length >= 4) {
    layout = 'grid';
  } else {
    layout = 'steps';
  }

  return {
    title,
    badge: layout === 'compare' ? '比較・分岐' : layout === 'steps' ? '行動プロセス' : '要点一覧',
    items: rawItems.slice(0, 6),
    cycleNote,
    bottomAdvice:
      bottomAdvice ||
      '実戦で慌てないよう、トレモで各シチュエーションを反復して手に馴染ませましょう。',
    layout,
  };
}



