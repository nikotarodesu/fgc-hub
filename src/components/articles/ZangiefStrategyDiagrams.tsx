import React from 'react';
import { Target, Shuffle, ShieldAlert } from 'lucide-react';

// 図1: 接近を三つの目標に分ける（①届かせる ②触って見る ③択をかける）
export function ZangiefDistanceGoalsDiagram() {
  return (
    <figure
      id="fig-distance"
      className="my-6 rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 shadow-lg"
    >
      <div className="flex items-center gap-2 px-4 py-3 bg-neutral-900 border-b border-neutral-800">
        <Target className="w-4 h-4 text-red-400" />
        <span className="text-xs font-bold text-red-400 uppercase tracking-wider">
          接近の三段階モデル（距離と目的の整理）
        </span>
      </div>

      <div className="p-4 sm:p-6 bg-gradient-to-b from-neutral-900 to-neutral-950">
        <svg
          viewBox="0 0 680 320"
          className="w-full h-auto"
          aria-labelledby="zangief-fig1-title zangief-fig1-desc"
          role="img"
        >
          <title id="zangief-fig1-title">接近を三つの目標に分ける</title>
          <desc id="zangief-fig1-desc">
            遠距離から一気に投げを狙わず、①長い打撃を届かせる、②中P・弱Kで触って相手の返しを見る、③届く間合いで打撃とスクリューの二択をかける、という三段階の接近目標を示す模式図。
          </desc>
          <defs>
            <linearGradient id="zgfRed" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#dc2626" />
              <stop offset="100%" stopColor="#991b1b" />
            </linearGradient>
            <linearGradient id="zoneGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="zoneGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="zoneGrad3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* 背景の距離ゾーン */}
          <rect x="180" y="35" width="460" height="70" rx="8" fill="url(#zoneGrad1)" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3 3" />
          <rect x="180" y="115" width="340" height="70" rx="8" fill="url(#zoneGrad2)" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 3" />
          <rect x="180" y="195" width="200" height="70" rx="8" fill="url(#zoneGrad3)" stroke="#ef4444" strokeWidth="1" strokeDasharray="3 3" />

          {/* 地面ガイド */}
          <line x1="20" y1="285" x2="660" y2="285" stroke="#404040" strokeWidth="2" />
          <text x="340" y="305" fill="#737373" fontSize="11" textAnchor="middle">
            ※各段階は固定の手順ではなく、重なり合いながら間合いと状況に応じて変化します
          </text>

          {/* ザンギエフ（左側） */}
          <g transform="translate(40, 60)">
            <rect x="0" y="0" width="110" height="195" rx="12" fill="url(#zgfRed)" stroke="#f87171" strokeWidth="2" />
            <text x="55" y="45" fill="#ffffff" fontSize="16" fontWeight="bold" textAnchor="middle">ザンギエフ</text>
            <text x="55" y="70" fill="#fca5a5" fontSize="11" textAnchor="middle">歩きガードで前進</text>
            <line x1="15" y1="85" x2="95" y2="85" stroke="#fca5a5" strokeOpacity="0.4" />
            <text x="55" y="110" fill="#ffffff" fontSize="11" textAnchor="middle">飛びを落とす</text>
            <text x="55" y="130" fill="#ffffff" fontSize="11" textAnchor="middle">ダブラリ準備</text>
            <text x="55" y="165" fill="#fecaca" fontSize="10" textAnchor="middle">（左側基準）</text>
          </g>

          {/* ① 届かせるゾーン */}
          <g transform="translate(195, 45)">
            <rect x="0" y="0" width="140" height="22" rx="4" fill="#1e3a8a" />
            <text x="10" y="15" fill="#93c5fd" fontSize="12" fontWeight="bold">① 届かせる（遠め）</text>
            <text x="155" y="16" fill="#bfdbfe" fontSize="12" fontWeight="bold">大P・中K</text>
            <text x="10" y="38" fill="#94a3b8" fontSize="11">・歩きガードで相手の牽制の外で止まる</text>
            <text x="10" y="52" fill="#94a3b8" fontSize="11">・一度触れて、相手が下がるなら位置を取る</text>
          </g>

          {/* ② 触って見るゾーン */}
          <g transform="translate(195, 125)">
            <rect x="0" y="0" width="140" height="22" rx="4" fill="#78350f" />
            <text x="10" y="15" fill="#fde68a" fontSize="12" fontWeight="bold">② 触って見る（中間）</text>
            <text x="155" y="16" fill="#fde047" fontSize="12" fontWeight="bold">中P・弱K</text>
            <text x="10" y="38" fill="#cbd5e1" fontSize="11">・小さく触り、相手の打ち返し・下がり・飛びを観察</text>
            <text x="10" y="52" fill="#cbd5e1" fontSize="11">・「触ったらすぐ投げる」ではなく相手の返しを知る</text>
          </g>

          {/* ③ 択をかけるゾーン */}
          <g transform="translate(195, 205)">
            <rect x="0" y="0" width="140" height="22" rx="4" fill="#7f1d1d" />
            <text x="10" y="15" fill="#fca5a5" fontSize="12" fontWeight="bold">③ 択をかける（近距離）</text>
            <text x="155" y="16" fill="#f87171" fontSize="12" fontWeight="bold">スクリュー vs 打撃</text>
            <text x="10" y="38" fill="#fecaca" fontSize="11">・固まる相手には投げ、跳ぶ・暴れる相手には打撃</text>
            <text x="10" y="52" fill="#fecaca" fontSize="11">・間合いと直前の接触状況から成立条件を見る</text>
          </g>

          {/* 相手（右側） */}
          <g transform="translate(560, 110)">
            <rect x="0" y="0" width="90" height="145" rx="10" fill="#262626" stroke="#525252" strokeWidth="1.5" />
            <text x="45" y="35" fill="#ffffff" fontSize="15" fontWeight="bold" textAnchor="middle">相手</text>
            <text x="45" y="58" fill="#a3a3a3" fontSize="11" textAnchor="middle">対応の観察</text>
            <line x1="12" y1="72" x2="78" y2="72" stroke="#525252" />
            <text x="45" y="92" fill="#d4d4d4" fontSize="10" textAnchor="middle">ガード / 飛び</text>
            <text x="45" y="110" fill="#d4d4d4" fontSize="10" textAnchor="middle">下がり / 暴れ</text>
          </g>
        </svg>
      </div>

      <figcaption className="px-4 py-2.5 bg-neutral-900/90 border-t border-neutral-800 text-xs text-neutral-400">
        ① 届かせる② 触って見る③ 択をかける接近の目標を示した概念図です。各段階は重なり合い、技の強度や相手の姿勢によって届く範囲も変わります。
      </figcaption>
    </figure>
  );
}

// 図2: ダウンを取る距離と残量を見る（攻め継続と立ち回りへの復帰）
export function ZangiefResourceDecisionDiagram() {
  return (
    <figure
      id="fig-oki"
      className="my-6 rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 shadow-lg"
    >
      <div className="flex items-center gap-2 px-4 py-3 bg-neutral-900 border-b border-neutral-800">
        <Shuffle className="w-4 h-4 text-amber-400" />
        <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
          状況別の選択肢：ダウン後の判断分岐（距離とゲージ残量）
        </span>
      </div>

      <div className="p-4 sm:p-6 bg-gradient-to-b from-neutral-900 to-neutral-950">
        <svg
          viewBox="0 0 680 300"
          className="w-full h-auto"
          aria-labelledby="zangief-fig2-title zangief-fig2-desc"
          role="img"
        >
          <title id="zangief-fig2-title">ダウン後の時間の使い道</title>
          <desc id="zangief-fig2-desc">
            ダウンを取った後、ゲージに余裕があり起き攻めが重なる状況ではラッシュで前進し、距離が離れている場合やゲージ温存時は間合いを再建して迎撃へ回る二大分岐を示す図。
          </desc>
          <defs>
            <linearGradient id="zgfRed2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#dc2626" />
              <stop offset="100%" stopColor="#991b1b" />
            </linearGradient>
            <linearGradient id="barGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#059669" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>

          {/* === 上段パネル：攻め継続（ラッシュ・起き攻め） === */}
          <g transform="translate(10, 15)">
            <rect x="0" y="0" width="240" height="24" rx="4" fill="#064e3b" />
            <text x="10" y="16" fill="#34d399" fontSize="13" fontWeight="bold">
              分岐A：攻め継続（生ラッシュ等）
            </text>

            <line x1="0" y1="95" x2="660" y2="95" stroke="#404040" strokeWidth="2" strokeDasharray="4 4" />

            {/* ザンギエフ */}
            <rect x="30" y="38" width="105" height="54" rx="8" fill="url(#zgfRed2)" stroke="#f87171" strokeWidth="1.5" />
            <text x="82" y="64" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">ザンギエフ</text>
            <text x="82" y="81" fill="#fca5a5" fontSize="10" textAnchor="middle">生ラッシュ前進</text>

            {/* 進行条件 & アクション */}
            <g transform="translate(145, 42)">
              <rect x="0" y="0" width="280" height="46" rx="6" fill="#047857" fillOpacity="0.25" stroke="#10b981" strokeWidth="1.2" />
              <text x="140" y="18" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">
                条件：端が近い / ゲージ余裕 / 重なる距離
              </text>
              <text x="140" y="36" fill="#a7f3d0" fontSize="11" textAnchor="middle">
                起き上がりに打撃（暴れ・跳び潰し） or 投げ
              </text>
            </g>

            {/* ダウン中の相手 */}
            <rect x="445" y="44" width="120" height="44" rx="6" fill="#262626" stroke="#525252" strokeWidth="1.5" />
            <text x="505" y="64" fill="#e5e5e5" fontSize="12" fontWeight="bold" textAnchor="middle">相手（ダウン）</text>
            <text x="505" y="80" fill="#9ca3af" fontSize="10" textAnchor="middle">防御・跳び・暴れを選択</text>
          </g>

          {/* 区切り線 */}
          <line x1="20" y1="150" x2="660" y2="150" stroke="#333333" strokeWidth="1" />

          {/* === 下段パネル：間合い再建・立ち回り復帰 === */}
          <g transform="translate(10, 165)">
            <rect x="0" y="0" width="240" height="24" rx="4" fill="#78350f" />
            <text x="10" y="16" fill="#fde68a" fontSize="13" fontWeight="bold">
              分岐B：間合い再建・立ち回り復帰
            </text>

            <line x1="0" y1="95" x2="660" y2="95" stroke="#404040" strokeWidth="2" strokeDasharray="4 4" />

            {/* ザンギエフ */}
            <rect x="30" y="38" width="105" height="54" rx="8" fill="url(#zgfRed2)" stroke="#f87171" strokeWidth="1.5" />
            <text x="82" y="64" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">ザンギエフ</text>
            <text x="82" y="81" fill="#fde68a" fontSize="10" textAnchor="middle">足止めて迎撃待機</text>

            {/* 進行条件 & アクション */}
            <g transform="translate(145, 42)">
              <rect x="0" y="0" width="280" height="46" rx="6" fill="#78350f" fillOpacity="0.25" stroke="#f59e0b" strokeWidth="1.2" />
              <text x="140" y="18" fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle">
                条件：距離が離れた（スクリュー後）/ ゲージ節約
              </text>
              <text x="140" y="36" fill="#fde68a" fontSize="11" textAnchor="middle">
                大P・中Pの間合いを作り、飛びをダブラリで迎撃
              </text>
            </g>

            {/* 復帰する相手 */}
            <rect x="445" y="44" width="120" height="44" rx="6" fill="#262626" stroke="#525252" strokeWidth="1.5" />
            <text x="505" y="64" fill="#e5e5e5" fontSize="12" fontWeight="bold" textAnchor="middle">相手（復帰）</text>
            <text x="505" y="80" fill="#9ca3af" fontSize="10" textAnchor="middle">地上戦・前進への対応</text>
          </g>
        </svg>
      </div>

      <figcaption className="px-4 py-2.5 bg-neutral-900/90 border-t border-neutral-800 text-xs text-neutral-400">
        ダウンを取る距離と残量を見る次の読み合い間合いを再建攻め継続と立ち回りへの復帰を分ける判断図です。投げが通った後も、次の攻めには相手の防御が入ります。
      </figcaption>
    </figure>
  );
}

// 図3: 画面端で逃がさず、倒し切る（近づいて崩す vs 離れて落とす）
export function ZangiefCornerSpacingDiagram() {
  return (
    <figure
      id="fig-corner"
      className="my-6 rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 shadow-lg"
    >
      <div className="flex items-center gap-2 px-4 py-3 bg-neutral-900 border-b border-neutral-800">
        <ShieldAlert className="w-4 h-4 text-rose-400" />
        <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
          画面端の攻防：近づいて崩す時間と、離れて落とす時間
        </span>
      </div>

      <div className="p-4 sm:p-6 bg-gradient-to-b from-neutral-900 to-neutral-950">
        <svg
          viewBox="0 0 680 300"
          className="w-full h-auto"
          aria-labelledby="zangief-fig3-title zangief-fig3-desc"
          role="img"
        >
          <title id="zangief-fig3-title">画面端の位置関係と攻防</title>
          <desc id="zangief-fig3-desc">
            画面端において、近づいて崩す（打撃・投げ）時間と、入れ替え前ジャンプをダブラリで落とすために一歩離れて待つ時間を切り替える概念図。右端の赤線が画面端。
          </desc>
          <defs>
            <linearGradient id="zgfRed3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#dc2626" />
              <stop offset="100%" stopColor="#991b1b" />
            </linearGradient>
          </defs>

          {/* 右端：画面端の境界線 */}
          <line x1="620" y1="20" x2="620" y2="280" stroke="#ef4444" strokeWidth="5" strokeLinecap="round" />
          <text x="635" y="155" fill="#f87171" fontSize="13" fontWeight="black" writingMode="vertical-rl">
            画面端
          </text>

          {/* === レーン1：近づいて崩す時間 === */}
          <g transform="translate(15, 20)">
            <rect x="0" y="0" width="220" height="22" rx="4" fill="#7f1d1d" />
            <text x="10" y="15" fill="#fca5a5" fontSize="12" fontWeight="bold">
              ① 近づいて崩す時間
            </text>

            <line x1="0" y1="95" x2="590" y2="95" stroke="#404040" strokeWidth="2" strokeDasharray="4 4" />

            {/* ザンギエフ（接近位置） */}
            <rect x="240" y="38" width="105" height="50" rx="8" fill="url(#zgfRed3)" stroke="#f87171" strokeWidth="1.5" />
            <text x="292" y="60" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">ザンギエフ</text>
            <text x="292" y="76" fill="#fecaca" fontSize="10" textAnchor="middle">密着〜近距離</text>

            {/* プレッシャー */}
            <path d="M 355 63 L 475 63 M 465 57 L 475 63 L 465 69" stroke="#ef4444" strokeWidth="2.5" fill="none" />
            <text x="415" y="55" fill="#f87171" fontSize="10" fontWeight="bold" textAnchor="middle">打撃 / 投げの二択</text>

            {/* 追い詰められた相手 */}
            <rect x="490" y="38" width="95" height="50" rx="8" fill="#262626" stroke="#dc2626" strokeWidth="1.5" />
            <text x="537" y="60" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">相手（端）</text>
            <text x="537" y="76" fill="#fca5a5" fontSize="9" textAnchor="middle">後退不可・窮屈</text>
          </g>

          {/* 区切り線 */}
          <line x1="20" y1="150" x2="600" y2="150" stroke="#333333" strokeWidth="1" />

          {/* === レーン2：離れて落とす時間（脱出阻止） === */}
          <g transform="translate(15, 165)">
            <rect x="0" y="0" width="220" height="22" rx="4" fill="#1e3a8a" />
            <text x="10" y="15" fill="#93c5fd" fontSize="12" fontWeight="bold">
              ② 離れて落とす時間
            </text>

            <line x1="0" y1="95" x2="590" y2="95" stroke="#404040" strokeWidth="2" strokeDasharray="4 4" />

            {/* ザンギエフ（一歩引いた位置） */}
            <rect x="140" y="38" width="105" height="50" rx="8" fill="url(#zgfRed3)" stroke="#60a5fa" strokeWidth="1.5" />
            <text x="192" y="60" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">ザンギエフ</text>
            <text x="192" y="76" fill="#93c5fd" fontSize="10" textAnchor="middle">間合いを空けて待つ</text>

            {/* 入れ替え飛びの軌道 & 迎撃 */}
            <path d="M 495 45 Q 360 -20 280 40" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 3" fill="none" />
            <text x="380" y="20" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">前ジャンプで脱出したい</text>

            <g transform="translate(255, 45)">
              <rect x="0" y="0" width="140" height="30" rx="5" fill="#1e3a8a" fillOpacity="0.4" stroke="#3b82f6" strokeWidth="1.2" />
              <text x="70" y="20" fill="#60a5fa" fontSize="11" fontWeight="bold" textAnchor="middle">ダブラリで落とす</text>
            </g>

            {/* 画面端の相手 */}
            <rect x="490" y="38" width="95" height="50" rx="8" fill="#262626" stroke="#525252" strokeWidth="1.5" />
            <text x="537" y="60" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">相手（端）</text>
            <text x="537" y="76" fill="#9ca3af" fontSize="9" textAnchor="middle">逃げ場を探す</text>
          </g>
        </svg>
      </div>

      <figcaption className="px-4 py-2.5 bg-neutral-900/90 border-t border-neutral-800 text-xs text-neutral-400">
        近づいて崩す離れて落とす画面端の位置関係を示す概念図です。投げたいから近づく場面と、入れ替えを防ぐために待つ場面を分けます。
      </figcaption>
    </figure>
  );
}
