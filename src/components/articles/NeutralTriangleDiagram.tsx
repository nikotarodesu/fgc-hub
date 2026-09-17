'use client';

import React, { useState } from 'react';
import { Shield, Zap, Target, CheckCircle2, AlertTriangle } from 'lucide-react';

type NodeId = 'oki' | 'sashikomi' | 'sashikaeshi';

interface TriangleNode {
  id: NodeId;
  name: string;
  subName: string;
  beats: string;
  losesTo: string;
  color: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  icon: React.ElementType;
  description: string;
  strengths: string[];
  weaknesses: string[];
  sf6Examples: string[];
}

const NODES: Record<NodeId, TriangleNode> = {
  oki: {
    id: 'oki',
    name: '置き技（牽制）',
    subName: '相手の前進・ラッシュを止める',
    beats: '差し込み・踏み込み',
    losesTo: '差し返し（空振り狩り）',
    color: 'text-amber-600 dark:text-amber-400',
    bgColor: 'bg-amber-50 dark:bg-amber-950/40',
    borderColor: 'border-amber-300 dark:border-amber-700',
    textColor: 'text-amber-700 dark:text-amber-300',
    icon: Shield,
    description:
      'あらかじめ判定の強い技を空間に置いておき、前に歩いてくる相手や生ラッシュを自動的に迎撃する戦術。',
    strengths: [
      '相手の前歩きやドライブラッシュの出端を潰せる',
      'リーチの長い中攻撃・強攻撃を振ることで相手の前進を心理的に抑制できる',
    ],
    weaknesses: [
      '相手が技の間合いの外にいた場合、空振りの大きな隙を晒してしまう',
      '差し返しの的になりやすい',
    ],
    sf6Examples: ['リュウの下中P', 'リュウの大P', '中足刀'],
  },
  sashikomi: {
    id: 'sashikomi',
    name: '差し込み（踏み込み）',
    subName: '待つ相手の間合いに踏み込む',
    beats: '差し返し待ち',
    losesTo: '置き技（牽制）',
    color: 'text-cyan-600 dark:text-cyan-400',
    bgColor: 'bg-cyan-50 dark:bg-cyan-950/40',
    borderColor: 'border-cyan-300 dark:border-cyan-700',
    textColor: 'text-cyan-700 dark:text-cyan-300',
    icon: Zap,
    description:
      '一歩踏み込んで相手のガードを崩しに行ったり、ガードさせて有利フレームを作る攻撃。差し返しを狙ってじっと待っている相手に刺さる。',
    strengths: [
      '空振りをじっと見ている相手の懐に入り、ターンを奪える',
      'ドライブラッシュや下段・前進技でガードを強要できる',
    ],
    weaknesses: [
      '相手が事前に攻撃を置いていた場合、前進モーションにカウンターで被弾する',
    ],
    sf6Examples: ['前歩き下中K（中足）', 'キャンセルラッシュ', 'ラッシュ前強P（大ゴス）'],
  },
  sashikaeshi: {
    id: 'sashikaeshi',
    name: '差し返し（空振り狩り）',
    subName: '相手の置き技の隙を殴る',
    beats: '置き技（牽制）',
    losesTo: '差し込み（踏み込み）',
    color: 'text-emerald-600 dark:text-emerald-400',
    bgColor: 'bg-emerald-50 dark:bg-emerald-950/40',
    borderColor: 'border-emerald-300 dark:border-emerald-700',
    textColor: 'text-emerald-700 dark:text-emerald-300',
    icon: Target,
    description:
      '相手の置き技が届かないギリギリの間合いを保ち、相手が空振った腕や足（やられ判定）を見てから殴り返す高等技術。',
    strengths: [
      'パニッシュカウンターを取れるため、大ダメージコンボに繋がる',
      '相手が迂闊に技を振れなくなり、立ち回りの主導権を握れる',
    ],
    weaknesses: [
      '画面を凝視して待つ必要があるため、相手の突然の前歩きやラッシュに対応が遅れやすい',
    ],
    sf6Examples: ['大Pパニカン狙い', '下大K（大足）での空振り狩り', 'しゃがみ中P'],
  },
};

export default function NeutralTriangleDiagram() {
  const [selectedNode, setSelectedNode] = useState<NodeId>('oki');
  const active = NODES[selectedNode];

  return (
    <div className="my-6 sm:my-8 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm overflow-hidden">
      {/* ヘッダー */}
      <div className="px-3.5 py-3 sm:px-5 sm:py-4 bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2">
        <div>
          <h3 className="text-sm sm:text-lg font-bold">格ゲー立ち回りの三すくみ（じゃんけん構造）</h3>
        </div>
        <span className="text-[11px] sm:text-xs text-neutral-400">タップして各戦術の強み・弱みを確認</span>
      </div>

      <div className="px-3 py-4 sm:p-6 space-y-5 sm:space-y-6">
        {/* SVG三すくみサークル */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-8">
          <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-square mx-auto shrink-0 my-1 sm:my-2">
            <svg viewBox="0 0 300 300" className="w-full h-full">
              {/* 循環矢印の円・パス */}
              <defs>
                <marker
                  id="triangle-arrow"
                  viewBox="0 0 10 10"
                  refX="5"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#00a3c4" />
                </marker>
              </defs>

              {/* 三角形の接続線（循環） */}
              <path
                d="M 170 65 L 235 205"
                fill="none"
                stroke="#00a3c4"
                strokeWidth="2.5"
                strokeDasharray="5,5"
                markerEnd="url(#triangle-arrow)"
                className="opacity-60"
              />
              <path
                d="M 220 240 L 80 240"
                fill="none"
                stroke="#00a3c4"
                strokeWidth="2.5"
                strokeDasharray="5,5"
                markerEnd="url(#triangle-arrow)"
                className="opacity-60"
              />
              <path
                d="M 65 205 L 130 65"
                fill="none"
                stroke="#00a3c4"
                strokeWidth="2.5"
                strokeDasharray="5,5"
                markerEnd="url(#triangle-arrow)"
                className="opacity-60"
              />

              {/* 中央ラベル */}
              <circle cx="150" cy="155" r="32" fill="#171717" />
              <text x="150" y="152" textAnchor="middle" fill="#a3a3a3" fontSize="10" fontWeight="bold">
                立ち回りの
              </text>
              <text x="150" y="167" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">
                三すくみ
              </text>
            </svg>

            {/* ノードボタン 1: 置き技 (Top) */}
            <button
              onClick={() => setSelectedNode('oki')}
              className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-0.5 w-[96px] xs:w-[104px] sm:w-32 p-2 sm:p-2.5 rounded-xl border-2 text-center transition-all cursor-pointer shadow-md ${
                selectedNode === 'oki'
                  ? 'bg-amber-400 text-neutral-950 border-amber-500 scale-105 ring-4 ring-amber-400/30'
                  : 'bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 hover:border-amber-400'
              }`}
            >
              <Shield className={`w-3.5 h-3.5 sm:w-4 sm:h-4 mx-auto mb-0.5 sm:mb-1 ${selectedNode === 'oki' ? 'text-neutral-950' : 'text-amber-500'}`} />
              <div className="font-black text-[11px] sm:text-xs">① 置き技</div>
              <div className={`text-[8.5px] sm:text-[9px] font-semibold ${selectedNode === 'oki' ? 'text-neutral-900' : 'text-neutral-400'}`}>牽制・壁張り</div>
            </button>

            {/* ノードボタン 2: 差し込み (Bottom Right) */}
            <button
              onClick={() => setSelectedNode('sashikomi')}
              className={`absolute bottom-0 right-0 w-[96px] xs:w-[104px] sm:w-32 p-2 sm:p-2.5 rounded-xl border-2 text-center transition-all cursor-pointer shadow-md ${
                selectedNode === 'sashikomi'
                  ? 'bg-cyan-400 text-neutral-950 border-cyan-500 scale-105 ring-4 ring-cyan-400/30'
                  : 'bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 hover:border-cyan-400'
              }`}
            >
              <Zap className={`w-3.5 h-3.5 sm:w-4 sm:h-4 mx-auto mb-0.5 sm:mb-1 ${selectedNode === 'sashikomi' ? 'text-neutral-950' : 'text-cyan-500'}`} />
              <div className="font-black text-[11px] sm:text-xs">② 差し込み</div>
              <div className={`text-[8.5px] sm:text-[9px] font-semibold ${selectedNode === 'sashikomi' ? 'text-neutral-900' : 'text-neutral-400'}`}>前歩き・ラッシュ</div>
            </button>

            {/* ノードボタン 3: 差し返し (Bottom Left) */}
            <button
              onClick={() => setSelectedNode('sashikaeshi')}
              className={`absolute bottom-0 left-0 w-[96px] xs:w-[104px] sm:w-32 p-2 sm:p-2.5 rounded-xl border-2 text-center transition-all cursor-pointer shadow-md ${
                selectedNode === 'sashikaeshi'
                  ? 'bg-emerald-400 text-neutral-950 border-emerald-500 scale-105 ring-4 ring-emerald-400/30'
                  : 'bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 hover:border-emerald-400'
              }`}
            >
              <Target className={`w-3.5 h-3.5 sm:w-4 sm:h-4 mx-auto mb-0.5 sm:mb-1 ${selectedNode === 'sashikaeshi' ? 'text-neutral-950' : 'text-emerald-500'}`} />
              <div className="font-black text-[11px] sm:text-xs">③ 差し返し</div>
              <div className={`text-[8.5px] sm:text-[9px] font-semibold ${selectedNode === 'sashikaeshi' ? 'text-neutral-900' : 'text-neutral-400'}`}>空振りを見て殴る</div>
            </button>
          </div>

          {/* 選択ノードの詳細解説カード */}
          <div className="flex-1 w-full min-w-0 bg-neutral-50 dark:bg-neutral-800/60 p-3.5 sm:p-5 rounded-xl border border-neutral-200 dark:border-neutral-700/80 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-700">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-lg ${active.bgColor} ${active.color} border ${active.borderColor}`}>
                  <active.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-neutral-900 dark:text-white">{active.name}</h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">{active.subName}</p>
                </div>
              </div>
            </div>

            {/* 相性サマリー */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 sm:p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                <div className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>有利（勝てる相手）</span>
                </div>
                <div className="font-bold text-neutral-900 dark:text-white mt-0.5">{active.beats}</div>
              </div>
              <div className="p-2 sm:p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800">
                <div className="text-[10px] font-bold text-rose-700 dark:text-rose-300 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  <span>不利（負けやすい相手）</span>
                </div>
                <div className="font-bold text-neutral-900 dark:text-white mt-0.5">{active.losesTo}</div>
              </div>
            </div>

            <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
              {active.description}
            </p>

            {/* 強みと弱み */}
            <div className="space-y-2 text-xs">
              <div>
                <span className="font-bold text-emerald-700 dark:text-emerald-400 text-[11px] block mb-1">
                  💡 なぜ勝てるのか（強み）
                </span>
                <ul className="space-y-1 text-neutral-600 dark:text-neutral-300">
                  {active.strengths.map((str, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-500 font-bold">•</span>
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* スト6実戦例 */}
            <div className="pt-3 border-t border-neutral-200 dark:border-neutral-700">
              <span className="text-[11px] font-bold text-neutral-500 dark:text-neutral-400 block mb-1.5">
                スト6における代表的な具体例
              </span>
              <div className="flex flex-wrap gap-1.5">
                {active.sf6Examples.map((ex, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-medium bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 px-2 py-0.5 rounded text-neutral-800 dark:text-neutral-200 shadow-2xs"
                  >
                    {ex}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 結論サマリー */}
        <div className="p-2.5 sm:p-3 bg-neutral-100 dark:bg-neutral-800/80 rounded-xl text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed flex items-start gap-2">
          <span className="font-bold text-neutral-900 dark:text-white shrink-0 mt-0.5">🧠 立ち回りの整理枠組み:</span>
          <span>
            「置き・差し込み・差し返し」は立ち回りの状況を整理するためのフレームワークです。実戦では互いの間合い・技のリーチ・硬直・タイミングによって結果が変わります。相手の動きの傾向を観察しながら、間合いを調整する基準として活用しましょう。
          </span>
        </div>
      </div>
    </div>
  );
}
