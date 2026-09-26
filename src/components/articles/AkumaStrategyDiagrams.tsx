'use client';

import React from 'react';
import { Compass, Flame, ShieldAlert, ArrowRight, CornerDownRight } from 'lucide-react';

/**
 * 図1：中央から画面端への勝ち筋
 * 上段：中央での位置関係（互いに後退余白あり、迎撃の選択）
 * 下段：端付近での位置関係（相手の後退余白小、追撃と脱出待ち）
 */
export function AkumaWinPlanDiagram() {
  return (
    <figure className="my-6 rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-neutral-900 text-white overflow-hidden shadow-sm">
      <div className="px-4 py-3 border-b border-neutral-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-bold text-amber-300 tracking-wider">
            図1：中央から画面端への勝ち筋（概念図）
          </span>
        </div>
        <span className="text-[11px] text-neutral-400 bg-neutral-800 px-2 py-0.5 rounded">
          位置関係と狙い
        </span>
      </div>

      <div className="p-4 sm:p-6 bg-gradient-to-b from-neutral-900 to-neutral-950">
        <svg
          viewBox="0 0 680 320"
          className="w-full h-auto"
          aria-labelledby="fig1-title fig1-desc"
          role="img"
        >
          <title id="fig1-title">中央から画面端への勝ち筋</title>
          <desc id="fig1-desc">
            中央では後退余白がある中で波動と歩きで迎撃・ダメージを狙い、端付近では後退余白が狭まった相手へ追撃と脱出待ちを使い分ける概念図。
          </desc>
          <defs>
            <linearGradient id="akumaGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#dc2626" />
              <stop offset="100%" stopColor="#991b1b" />
            </linearGradient>
            <linearGradient id="oppGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
          </defs>

          {/* === 上段：中央での位置関係 === */}
          <g transform="translate(10, 20)">
            {/* 上段タイトルラベル */}
            <rect x="0" y="0" width="220" height="24" rx="4" fill="#262626" />
            <text x="10" y="16" fill="#fbbf24" fontSize="13" fontWeight="bold">
              上段：中央（互いにスペースがある）
            </text>

            {/* ステージ床ライン */}
            <line x1="0" y1="105" x2="660" y2="105" stroke="#404040" strokeWidth="2" strokeDasharray="4 4" />

            {/* 豪鬼 */}
            <rect x="60" y="45" width="80" height="60" rx="8" fill="url(#akumaGlow)" stroke="#f87171" strokeWidth="1.5" />
            <text x="100" y="75" fill="#ffffff" fontSize="15" fontWeight="bold" textAnchor="middle">豪鬼</text>
            <text x="100" y="93" fill="#fca5a5" fontSize="11" textAnchor="middle">歩き・波動</text>

            {/* 中央の間合い・様子見ゾーン */}
            <rect x="160" y="55" width="160" height="40" rx="6" fill="#1f2937" stroke="#374151" strokeWidth="1" />
            <text x="240" y="75" fill="#9ca3af" fontSize="12" textAnchor="middle">波動で対応を見る</text>
            <text x="240" y="90" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">迎撃の準備</text>

            {/* 相手 */}
            <rect x="340" y="45" width="80" height="60" rx="8" fill="url(#oppGlow)" stroke="#60a5fa" strokeWidth="1.5" />
            <text x="380" y="75" fill="#ffffff" fontSize="15" fontWeight="bold" textAnchor="middle">相手</text>
            <text x="380" y="93" fill="#93c5fd" fontSize="11" textAnchor="middle">対応を選択</text>

            {/* 相手後方の余白スペース */}
            <rect x="440" y="52" width="210" height="46" rx="6" fill="#172554" fillOpacity="0.4" stroke="#2563eb" strokeDasharray="3 3" strokeWidth="1" />
            <text x="545" y="73" fill="#93c5fd" fontSize="12" textAnchor="middle">広い余白スペース</text>
            <text x="545" y="89" fill="#bfdbfe" fontSize="11" textAnchor="middle">（後ろ歩きで間合いを外せる）</text>
          </g>

          {/* 段落区切り */}
          <line x1="20" y1="160" x2="660" y2="160" stroke="#333333" strokeWidth="1" />

          {/* === 下段：相手が端に近い位置関係 === */}
          <g transform="translate(10, 180)">
            {/* 下段タイトルラベル */}
            <rect x="0" y="0" width="250" height="24" rx="4" fill="#262626" />
            <text x="10" y="16" fill="#fbbf24" fontSize="13" fontWeight="bold">
              下段：相手が端付近（後退余白が狭い）
            </text>

            {/* ステージ床ライン */}
            <line x1="0" y1="105" x2="660" y2="105" stroke="#404040" strokeWidth="2" strokeDasharray="4 4" />

            {/* 画面端（壁） */}
            <rect x="630" y="25" width="28" height="85" fill="#450a0a" stroke="#ef4444" strokeWidth="2" />
            <text x="644" y="60" fill="#fca5a5" fontSize="12" fontWeight="bold" textAnchor="middle" transform="rotate(90, 644, 60)">
              画面端
            </text>

            {/* 豪鬼 */}
            <rect x="230" y="45" width="80" height="60" rx="8" fill="url(#akumaGlow)" stroke="#f87171" strokeWidth="1.5" />
            <text x="270" y="75" fill="#ffffff" fontSize="15" fontWeight="bold" textAnchor="middle">豪鬼</text>
            <text x="270" y="93" fill="#fca5a5" fontSize="11" textAnchor="middle">位置を取る</text>

            {/* 攻め・待ちの選択ゾーン */}
            <rect x="330" y="52" width="130" height="46" rx="6" fill="#1f2937" stroke="#374151" strokeWidth="1" />
            <text x="395" y="71" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">追撃・攻め継続</text>
            <text x="395" y="88" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">脱出を「待つ」</text>

            {/* 相手 */}
            <rect x="480" y="45" width="80" height="60" rx="8" fill="url(#oppGlow)" stroke="#60a5fa" strokeWidth="1.5" />
            <text x="520" y="75" fill="#ffffff" fontSize="15" fontWeight="bold" textAnchor="middle">相手</text>
            <text x="520" y="93" fill="#93c5fd" fontSize="11" textAnchor="middle">後退困難</text>

            {/* 端との狭い余白 */}
            <rect x="575" y="55" width="45" height="40" fill="#7f1d1d" fillOpacity="0.4" stroke="#dc2626" strokeDasharray="2 2" strokeWidth="1" />
            <text x="597" y="79" fill="#fca5a5" fontSize="10" textAnchor="middle">狭小</text>
          </g>
        </svg>
      </div>

      <figcaption className="px-4 py-3 bg-neutral-950 border-t border-neutral-800/80 text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
        <strong className="text-amber-400 font-bold block mb-0.5">【図1の着眼点】</strong>
        相手が後退した分だけ位置を取り、端付近では追撃と攻め継続を狙います。中央でダメージを取る、迎撃して待つ選択も残します。
      </figcaption>
    </figure>
  );
}

/**
 * 図2：波動の後、撃ち続けるか待つか
 * 上段「もう一度撃つ」：豪鬼が波動、硬直中に相手のジャンプが弾を越える
 * 下段「撃たずに待つ」：豪鬼は地上で待機、相手の飛びを迎撃する矢印
 */
export function AkumaHadokenDecisionDiagram() {
  return (
    <figure className="my-6 rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-neutral-900 text-white overflow-hidden shadow-sm">
      <div className="px-4 py-3 border-b border-neutral-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold text-cyan-300 tracking-wider">
            図2：波動の後、撃ち続けるか待つか（概念図）
          </span>
        </div>
        <span className="text-[11px] text-neutral-400 bg-neutral-800 px-2 py-0.5 rounded">
          硬直と対空準備の分岐
        </span>
      </div>

      <div className="p-4 sm:p-6 bg-gradient-to-b from-neutral-900 to-neutral-950">
        <svg
          viewBox="0 0 680 340"
          className="w-full h-auto"
          aria-labelledby="fig2-title fig2-desc"
          role="img"
        >
          <title id="fig2-title">波動の後、撃ち続けるか待つか</title>
          <desc id="fig2-desc">
            波動を見せた後にもう一度撃つと硬直中に飛びを合わされやすく、撃たずに待つと動ける状態で対空迎撃できるという判断の分岐図。
          </desc>
          <defs>
            <marker id="arrowRed" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M 0 0 L 8 4 L 0 8 Z" fill="#ef4444" />
            </marker>
            <marker id="arrowGreen" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M 0 0 L 8 4 L 0 8 Z" fill="#10b981" />
            </marker>
          </defs>

          {/* === 上段：もう一度撃つ === */}
          <g transform="translate(10, 20)">
            <rect x="0" y="0" width="180" height="24" rx="4" fill="#7f1d1d" />
            <text x="10" y="16" fill="#fecaca" fontSize="13" fontWeight="bold">
              ✕ もう一度撃つ（連発）
            </text>

            <line x1="0" y1="120" x2="660" y2="120" stroke="#404040" strokeWidth="2" strokeDasharray="4 4" />

            {/* 豪鬼（硬直中） */}
            <rect x="50" y="60" width="90" height="60" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="2" />
            <text x="95" y="87" fill="#ffffff" fontSize="15" fontWeight="bold" textAnchor="middle">豪鬼</text>
            <rect x="65" y="97" width="60" height="18" rx="3" fill="#dc2626" />
            <text x="95" y="110" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">硬直中</text>

            {/* 弾のエフェクト */}
            <circle cx="210" cy="90" r="14" fill="#f97316" stroke="#fbbf24" strokeWidth="2" />
            <text x="210" y="94" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">弾</text>

            {/* 相手のジャンプ軌道（弾を飛び越える） */}
            <path d="M 450 115 Q 320 20 220 70" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="4 3" markerEnd="url(#arrowRed)" />
            <rect x="300" y="22" width="110" height="20" rx="4" fill="#1f2937" stroke="#ef4444" />
            <text x="355" y="36" fill="#fca5a5" fontSize="11" textAnchor="middle">弾を越える飛び</text>

            {/* 相手 */}
            <rect x="440" y="60" width="80" height="60" rx="8" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="480" y="95" fill="#ffffff" fontSize="15" fontWeight="bold" textAnchor="middle">相手</text>

            {/* 状況ラベル */}
            <rect x="540" y="65" width="110" height="45" rx="6" fill="#18181b" stroke="#71717a" />
            <text x="595" y="84" fill="#ef4444" fontSize="12" fontWeight="bold" textAnchor="middle">対空不能</text>
            <text x="595" y="100" fill="#9ca3af" fontSize="10" textAnchor="middle">（硬直で技が出ない）</text>
          </g>

          {/* 段落区切り */}
          <line x1="20" y1="175" x2="660" y2="175" stroke="#333333" strokeWidth="1" />

          {/* === 下段：撃たずに待つ === */}
          <g transform="translate(10, 190)">
            <rect x="0" y="0" width="180" height="24" rx="4" fill="#064e3b" />
            <text x="10" y="16" fill="#a7f3d0" fontSize="13" fontWeight="bold">
              ◯ 撃たずに待つ（対空準備）
            </text>

            <line x1="0" y1="120" x2="660" y2="120" stroke="#404040" strokeWidth="2" strokeDasharray="4 4" />

            {/* 豪鬼（動ける状態） */}
            <rect x="50" y="60" width="90" height="60" rx="8" fill="#065f46" stroke="#10b981" strokeWidth="2" />
            <text x="95" y="87" fill="#ffffff" fontSize="15" fontWeight="bold" textAnchor="middle">豪鬼</text>
            <rect x="65" y="97" width="60" height="18" rx="3" fill="#047857" />
            <text x="95" y="110" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">自由行動可</text>

            {/* 迎撃矢印（豪鬼から上空へ） */}
            <path d="M 120 60 Q 180 30 250 40" fill="none" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrowGreen)" />
            <rect x="150" y="20" width="95" height="20" rx="4" fill="#064e3b" stroke="#10b981" />
            <text x="197" y="34" fill="#a7f3d0" fontSize="11" fontWeight="bold" textAnchor="middle">迎撃（対空）</text>

            {/* 相手のジャンプ軌道 */}
            <path d="M 450 115 Q 350 10 260 45" fill="none" stroke="#60a5fa" strokeWidth="2" strokeDasharray="4 3" />

            {/* 相手 */}
            <rect x="440" y="60" width="80" height="60" rx="8" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="480" y="95" fill="#ffffff" fontSize="15" fontWeight="bold" textAnchor="middle">相手</text>

            {/* 状況ラベル */}
            <rect x="540" y="65" width="110" height="45" rx="6" fill="#18181b" stroke="#10b981" />
            <text x="595" y="84" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">対空成功</text>
            <text x="595" y="100" fill="#9ca3af" fontSize="10" textAnchor="middle">（昇竜などで迎撃）</text>
          </g>
        </svg>
      </div>

      <figcaption className="px-4 py-3 bg-neutral-950 border-t border-neutral-800/80 text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
        <strong className="text-cyan-400 font-bold block mb-0.5">【図2の着眼点】</strong>
        飛びを読んでも、技の硬直中では対空できません。相手が飛びを増やしたら、波動を見せる時間から対空を待つ時間へ切り替えます。
      </figcaption>
    </figure>
  );
}

/**
 * 図3：画面端の接近と迎撃
 * 2パネル比較
 * パネルA「接近して崩す」：至近距離で打撃・投げ
 * パネルB「距離を残して迎撃」：豪鬼が少し離れて脱出ジャンプを迎撃
 */
export function AkumaCornerSpacingDiagram() {
  return (
    <figure className="my-6 rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-neutral-900 text-white overflow-hidden shadow-sm">
      <div className="px-4 py-3 border-b border-neutral-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Flame className="w-4 h-4 text-rose-400" />
          <span className="text-xs font-bold text-rose-300 tracking-wider">
            図3：画面端の接近と迎撃（概念図）
          </span>
        </div>
        <span className="text-[11px] text-neutral-400 bg-neutral-800 px-2 py-0.5 rounded">
          崩す時間と逃がさない時間
        </span>
      </div>

      <div className="p-4 sm:p-6 bg-gradient-to-b from-neutral-900 to-neutral-950">
        <svg
          viewBox="0 0 680 320"
          className="w-full h-auto"
          aria-labelledby="fig3-title fig3-desc"
          role="img"
        >
          <title id="fig3-title">画面端の接近と迎撃</title>
          <desc id="fig3-desc">
            画面端での二つの戦術。密着して打撃や投げで崩す選択と、少し距離を残して相手の入れ替えジャンプ脱出を迎撃する選択の2パネル比較。
          </desc>
          <defs>
            <marker id="arrowCyan" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M 0 0 L 8 4 L 0 8 Z" fill="#06b6d4" />
            </marker>
          </defs>

          {/* === 左パネル：接近して崩す === */}
          <g transform="translate(10, 15)">
            <rect x="0" y="0" width="315" height="280" rx="10" fill="#18181b" stroke="#3f3f46" />
            <rect x="10" y="10" width="130" height="22" rx="4" fill="#b91c1c" />
            <text x="75" y="25" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
              パネルA：接近して崩す
            </text>

            {/* 床 */}
            <line x1="15" y1="230" x2="300" y2="230" stroke="#52525b" strokeWidth="2" />

            {/* 画面端（右側） */}
            <rect x="280" y="50" width="20" height="180" fill="#450a0a" stroke="#ef4444" strokeWidth="2" />
            <text x="290" y="140" fill="#fca5a5" fontSize="11" fontWeight="bold" textAnchor="middle" transform="rotate(90, 290, 140)">
              画面端
            </text>

            {/* 豪鬼（近接） */}
            <rect x="110" y="170" width="70" height="60" rx="6" fill="#991b1b" stroke="#f87171" strokeWidth="1.5" />
            <text x="145" y="200" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">豪鬼</text>
            <text x="145" y="217" fill="#fca5a5" fontSize="10" textAnchor="middle">密着〜近距離</text>

            {/* 相手（端背負い） */}
            <rect x="195" y="170" width="70" height="60" rx="6" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="1.5" />
            <text x="230" y="200" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">相手</text>
            <text x="230" y="217" fill="#93c5fd" fontSize="10" textAnchor="middle">端密着</text>

            {/* 狙いラベル */}
            <rect x="30" y="60" width="220" height="50" rx="6" fill="#27272a" stroke="#52525b" />
            <text x="140" y="80" fill="#f87171" fontSize="12" fontWeight="bold" textAnchor="middle">打撃・投げ・シミーで崩す</text>
            <text x="140" y="98" fill="#d4d4d8" fontSize="10.5" textAnchor="middle">（相手の固まり・暴れ・投げ抜けを狙う）</text>
          </g>

          {/* === 右パネル：距離を残して迎撃 === */}
          <g transform="translate(355, 15)">
            <rect x="0" y="0" width="315" height="280" rx="10" fill="#18181b" stroke="#3f3f46" />
            <rect x="10" y="10" width="150" height="22" rx="4" fill="#047857" />
            <text x="85" y="25" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
              パネルB：距離を残して迎撃
            </text>

            {/* 床 */}
            <line x1="15" y1="230" x2="300" y2="230" stroke="#52525b" strokeWidth="2" />

            {/* 画面端（右側） */}
            <rect x="280" y="50" width="20" height="180" fill="#450a0a" stroke="#ef4444" strokeWidth="2" />
            <text x="290" y="140" fill="#fca5a5" fontSize="11" fontWeight="bold" textAnchor="middle" transform="rotate(90, 290, 140)">
              画面端
            </text>

            {/* 豪鬼（少し離れて待機） */}
            <rect x="30" y="170" width="70" height="60" rx="6" fill="#065f46" stroke="#34d399" strokeWidth="1.5" />
            <text x="65" y="200" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">豪鬼</text>
            <text x="65" y="217" fill="#6ee7b7" fontSize="10" textAnchor="middle">少し離れて待つ</text>

            {/* 相手（端背負い） */}
            <rect x="195" y="170" width="70" height="60" rx="6" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="1.5" />
            <text x="230" y="200" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">相手</text>
            <text x="230" y="217" fill="#93c5fd" fontSize="10" textAnchor="middle">脱出を試みる</text>

            {/* 相手の脱出ジャンプ概念軌道 */}
            <path d="M 215 170 Q 170 80 110 110" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 3" />
            <text x="175" y="90" fill="#fbbf24" fontSize="10.5" textAnchor="middle">前飛び脱出</text>

            {/* 豪鬼の迎撃矢印 */}
            <path d="M 75 170 L 115 115" fill="none" stroke="#06b6d4" strokeWidth="2.5" markerEnd="url(#arrowCyan)" />
            <text x="75" y="140" fill="#22d3ee" fontSize="10.5" fontWeight="bold">迎撃</text>

            {/* 狙いラベル */}
            <rect x="30" y="45" width="220" height="36" rx="6" fill="#27272a" stroke="#52525b" />
            <text x="140" y="62" fill="#34d399" fontSize="11.5" fontWeight="bold" textAnchor="middle">入れ替え・ジャンプ脱出を止める</text>
            <text x="140" y="75" fill="#d4d4d8" fontSize="10" textAnchor="middle">（画面端を維持してプレッシャー継続）</text>
          </g>
        </svg>
      </div>

      <figcaption className="px-4 py-3 bg-neutral-950 border-t border-neutral-800/80 text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
        <strong className="text-rose-400 font-bold block mb-0.5">【図3の着眼点】</strong>
        打撃・投げを狙う位置と、脱出を待つ位置を使い分けます。図の間隔は投げ間合いや追撃成立距離の実測値ではありません。
      </figcaption>
    </figure>
  );
}
