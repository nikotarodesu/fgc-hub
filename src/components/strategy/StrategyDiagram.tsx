'use client';

import React from 'react';

interface StrategyDiagramProps {
  articleNumber: number;
  diagramIndex: number;
  rawComment?: string;
}

/**
 * SF6共通技術シリーズ専用のレスポンシブSVG図解コンポーネント
 * 統一パレット:
 * 攻撃側（自キャラ）: 青 (#3b82f6 / #60a5fa)
 * 相手（防衛側）: 赤 (#ef4444 / #f87171)
 * 攻撃判定: 半透明の橙 (rgba(249, 115, 22, 0.4) / #f97316)
 * やられ判定: 半透明の緑または青
 * 移動矢印: 黄 (#eab308 / #facc15)
 */
export default function StrategyDiagram({ articleNumber, diagramIndex }: StrategyDiagramProps) {
  // 記事番号と図番号に応じた専用SVGレンダリング
  // 01: 置き・差し・差し返し
  if (articleNumber === 1 && diagramIndex === 1) {
    return (
      <figure className="my-6 rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 sm:p-6 shadow-xs overflow-hidden">
        <figcaption className="text-xs sm:text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-500" />
          <span>図解 1-1: 置き・差し・差し返しの基本距離と目的</span>
        </figcaption>
        <div className="w-full overflow-x-auto">
          <svg
            viewBox="0 0 840 220"
            className="w-full min-w-[640px] h-auto select-none"
            role="img"
            aria-label="置き・差し・差し返しの距離と目的の比較図"
          >
            {/* 背景グリッド/境界 */}
            <rect x="10" y="10" width="260" height="200" rx="12" fill="currentColor" className="text-neutral-50 dark:text-neutral-800/50" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
            <rect x="290" y="10" width="260" height="200" rx="12" fill="currentColor" className="text-neutral-50 dark:text-neutral-800/50" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
            <rect x="570" y="10" width="260" height="200" rx="12" fill="currentColor" className="text-neutral-50 dark:text-neutral-800/50" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />

            {/* 左: 置き */}
            <g transform="translate(20, 20)">
              <text x="120" y="24" textAnchor="middle" className="fill-neutral-900 dark:fill-white font-bold text-sm">【置き】</text>
              <text x="120" y="44" textAnchor="middle" className="fill-neutral-500 dark:fill-neutral-400 text-xs">前進を止める</text>

              {/* 自分（青） */}
              <circle cx="50" cy="110" r="22" fill="#3b82f6" />
              <text x="50" y="115" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">自</text>

              {/* 置いた攻撃判定（橙） */}
              <rect x="75" y="98" width="55" height="24" rx="4" fill="#f97316" fillOpacity="0.75" stroke="#ea580c" strokeWidth="1.5" />
              <text x="102" y="114" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">攻撃判定</text>

              {/* 相手（赤）＋前進矢印（黄） */}
              <path d="M 180 110 L 150 110" stroke="#eab308" strokeWidth="4" markerEnd="url(#arrowYellow)" />
              <circle cx="195" cy="110" r="22" fill="#ef4444" />
              <text x="195" y="115" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">敵</text>
              <text x="120" y="165" textAnchor="middle" className="fill-neutral-700 dark:fill-neutral-300 text-[11px]">入ってくる進路へ先出し</text>
            </g>

            {/* 中央: 差し */}
            <g transform="translate(300, 20)">
              <text x="120" y="24" textAnchor="middle" className="fill-neutral-900 dark:fill-white font-bold text-sm">【差し】</text>
              <text x="120" y="44" textAnchor="middle" className="fill-neutral-500 dark:fill-neutral-400 text-xs">自分から触る</text>

              {/* 自分＋踏み込み矢印（黄） */}
              <path d="M 50 110 L 80 110" stroke="#eab308" strokeWidth="4" />
              <circle cx="45" cy="110" r="22" fill="#3b82f6" />
              <text x="45" y="115" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">自</text>

              {/* 伸ばした技（橙） */}
              <rect x="90" y="98" width="60" height="24" rx="4" fill="#f97316" fillOpacity="0.75" stroke="#ea580c" strokeWidth="1.5" />
              <text x="120" y="114" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">先端ヒット</text>

              {/* 相手（赤: 停止/ガード中） */}
              <circle cx="195" cy="110" r="22" fill="#ef4444" />
              <text x="195" y="115" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">敵</text>
              <text x="120" y="165" textAnchor="middle" className="fill-neutral-700 dark:fill-neutral-300 text-[11px]">届く距離へ歩いて当てる</text>
            </g>

            {/* 右: 差し返し */}
            <g transform="translate(580, 20)">
              <text x="120" y="24" textAnchor="middle" className="fill-neutral-900 dark:fill-white font-bold text-sm">【差し返し】</text>
              <text x="120" y="44" textAnchor="middle" className="fill-neutral-500 dark:fill-neutral-400 text-xs">空振りを取る</text>

              {/* 相手が技を空振り（赤＋点線判定） */}
              <rect x="90" y="98" width="50" height="24" rx="4" fill="#ef4444" fillOpacity="0.3" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 3" />
              <text x="115" y="114" textAnchor="middle" fill="#ef4444" fontSize="9" fontWeight="bold">空振り硬直</text>
              <circle cx="195" cy="110" r="22" fill="#ef4444" />
              <text x="195" y="115" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">敵</text>

              {/* 自分（手前で寸止め）から反撃（青） */}
              <circle cx="45" cy="110" r="22" fill="#3b82f6" />
              <text x="45" y="115" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">自</text>
              <path d="M 70 110 L 88 110" stroke="#3b82f6" strokeWidth="3" />

              <text x="120" y="165" textAnchor="middle" className="fill-neutral-700 dark:fill-neutral-300 text-[11px]">手前で避けて残った硬直を叩く</text>
            </g>

            {/* 共通矢印マーカー */}
            <defs>
              <marker id="arrowYellow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M 0 0 L 6 3 L 0 6 z" fill="#eab308" />
              </marker>
            </defs>
          </svg>
        </div>
      </figure>
    );
  }

  // 01: SVG-03 (三つの循環関係)
  if (articleNumber === 1 && diagramIndex === 3) {
    return (
      <figure className="my-6 rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 sm:p-6 shadow-xs overflow-hidden">
        <figcaption className="text-xs sm:text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-500" />
          <span>図解 1-3: 地上戦の循環構造（置き・差し・差し返し）</span>
        </figcaption>
        <div className="w-full overflow-x-auto">
          <svg
            viewBox="0 0 600 280"
            className="w-full max-w-xl mx-auto h-auto select-none"
            role="img"
            aria-label="置き・差し・差し返しの循環関係図"
          >
            {/* 上: 置き */}
            <g transform="translate(300, 50)">
              <rect x="-65" y="-22" width="130" height="44" rx="10" fill="#3b82f6" fillOpacity="0.15" stroke="#3b82f6" strokeWidth="2" />
              <text x="0" y="6" textAnchor="middle" className="fill-neutral-900 dark:fill-white font-bold text-sm">置き</text>
            </g>

            {/* 右下: 差し返し */}
            <g transform="translate(450, 210)">
              <rect x="-65" y="-22" width="130" height="44" rx="10" fill="#8b5cf6" fillOpacity="0.15" stroke="#8b5cf6" strokeWidth="2" />
              <text x="0" y="6" textAnchor="middle" className="fill-neutral-900 dark:fill-white font-bold text-sm">差し返し</text>
            </g>

            {/* 左下: 差し */}
            <g transform="translate(150, 210)">
              <rect x="-65" y="-22" width="130" height="44" rx="10" fill="#f59e0b" fillOpacity="0.15" stroke="#f59e0b" strokeWidth="2" />
              <text x="0" y="6" textAnchor="middle" className="fill-neutral-900 dark:fill-white font-bold text-sm">差し</text>
            </g>

            {/* 矢印: 置き → 差しを止める */}
            <path d="M 245 60 Q 150 100 150 180" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#arrowBlue)" />
            <text x="140" y="110" textAnchor="middle" className="fill-neutral-500 text-[10px]">前進を止める</text>

            {/* 矢印: 差し返し → 置きを取る */}
            <path d="M 450 180 Q 450 100 355 60" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#arrowPurple)" />
            <text x="460" y="110" textAnchor="middle" className="fill-neutral-500 text-[10px]">空振りを叩く</text>

            {/* 矢印: 差し → 差し返し待ちへ触る */}
            <path d="M 220 210 L 380 210" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#arrowAmber)" />
            <text x="300" y="232" textAnchor="middle" className="fill-neutral-500 text-[10px]">止まる相手へ触る</text>

            {/* 中央テキスト */}
            <rect x="220" y="115" width="160" height="40" rx="8" fill="currentColor" className="text-neutral-100 dark:text-neutral-800" />
            <text x="300" y="132" textAnchor="middle" className="fill-neutral-600 dark:text-neutral-300 text-[11px]">結果は距離・発生・</text>
            <text x="300" y="147" textAnchor="middle" className="fill-neutral-600 dark:text-neutral-300 text-[11px]">判定・硬直で変化</text>

            <defs>
              <marker id="arrowBlue" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M 0 0 L 6 3 L 0 6 z" fill="#3b82f6" />
              </marker>
              <marker id="arrowPurple" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M 0 0 L 6 3 L 0 6 z" fill="#8b5cf6" />
              </marker>
              <marker id="arrowAmber" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M 0 0 L 6 3 L 0 6 z" fill="#f59e0b" />
              </marker>
            </defs>
          </svg>
        </div>
      </figure>
    );
  }

  // 汎用・その他のSVG仕様（横長比率・スタイリッシュな図解プレースホルダー）
  return (
    <figure className="my-6 rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 sm:p-5 shadow-2xs overflow-hidden">
      <figcaption className="text-xs sm:text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-2 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-cyan-500" />
        <span>図解 {articleNumber}-{diagramIndex}</span>
      </figcaption>
      <div className="w-full bg-neutral-50 dark:bg-neutral-800/40 rounded-xl p-4 sm:p-6 border border-dashed border-neutral-200 dark:border-neutral-700/80 flex flex-col items-center justify-center text-center">
        <div className="flex items-center gap-4 text-xs font-semibold text-neutral-500 dark:text-neutral-400 mb-2">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> 自キャラ</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> 相手</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-orange-400" /> 攻撃判定</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-yellow-400" /> 移動・判断</span>
        </div>
        <p className="text-xs text-neutral-600 dark:text-neutral-300 max-w-lg leading-relaxed">
          ※ 本セクションの戦術関係（距離・タイミング・状況判断）のレスポンシブ図解
        </p>
      </div>
    </figure>
  );
}
