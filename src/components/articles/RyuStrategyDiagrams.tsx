import React from 'react';
import { HelpCircle, Crosshair, ArrowDown, AlertTriangle, ShieldCheck, CheckCircle2, XCircle } from 'lucide-react';

// 図解1: 波動拳の質問と回答のフロー図（反応観察 → 優先候補 → 注意点）
export function HadokenFlowDiagram() {
  return (
    <div className="my-5 px-3.5 py-4 sm:p-6 bg-neutral-900 text-white rounded-2xl shadow-sm border border-neutral-800">
      <div className="flex items-center gap-2 mb-3 pb-2.5 border-b border-neutral-800">
        <HelpCircle className="w-4 h-4 text-cyan-400" />
        <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
          立ち回り判断図解：波動拳に対する反応の観察と次の選択肢
        </span>
      </div>

      {/* トップノード：観察の起点 */}
      <div className="max-w-md mx-auto p-3 rounded-xl bg-neutral-800 border border-neutral-700 text-center mb-2.5 sm:mb-3">
        <div className="text-[11px] text-neutral-400 font-mono">観察の起点</div>
        <div className="text-sm font-bold text-white">波動拳を撃つ</div>
        <div className="text-xs text-cyan-300 mt-0.5">「この距離で相手がどう対応するか」を確認</div>
      </div>

      <div className="flex justify-center my-1 text-neutral-500">
        <ArrowDown className="w-4 h-4" />
      </div>

      {/* 4つの反応と判断候補 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
        {/* 反応1: 前ジャンプ */}
        <div className="p-3 sm:p-3.5 rounded-xl bg-neutral-800/90 border border-neutral-700 flex flex-col justify-between">
          <div>
            <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider mb-0.5">観察した反応 ①</div>
            <div className="text-sm font-black text-white mb-2">前ジャンプが多い</div>
            <div className="pt-2 border-t border-neutral-700/70 text-xs">
              <span className="font-bold text-cyan-400 block mb-1">次に優先する候補：</span>
              <div className="font-semibold text-white bg-neutral-900 px-2 py-1 rounded text-xs">
                撃たずに待つ時間を作り、対空を準備する
              </div>
            </div>
          </div>
          <div className="mt-2.5 pt-2 border-t border-neutral-700/50 flex items-start gap-1.5 text-[11px] text-neutral-400">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
            <span>波動拳の硬直中に飛びが届く距離では、見てから落とせるとは限らない</span>
          </div>
        </div>

        {/* 反応2: ガード */}
        <div className="p-3 sm:p-3.5 rounded-xl bg-neutral-800/90 border border-neutral-700 flex flex-col justify-between">
          <div>
            <div className="text-[10px] font-bold text-blue-400 uppercase tracking-wider mb-0.5">観察した反応 ②</div>
            <div className="text-sm font-black text-white mb-2">ガードして止まる</div>
            <div className="pt-2 border-t border-neutral-700/70 text-xs">
              <span className="font-bold text-cyan-400 block mb-1">次に優先する候補：</span>
              <div className="font-semibold text-white bg-neutral-900 px-2 py-1 rounded text-xs">
                波動拳の継続、または歩いてラインを上げる
              </div>
            </div>
          </div>
          <div className="mt-2.5 pt-2 border-t border-neutral-700/50 flex items-start gap-1.5 text-[11px] text-neutral-400">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
            <span>次もガードする保証はない。飛びや弾抜けへの備えを忘れない</span>
          </div>
        </div>

        {/* 反応3: パリィ */}
        <div className="p-3 sm:p-3.5 rounded-xl bg-neutral-800/90 border border-neutral-700 flex flex-col justify-between">
          <div>
            <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-0.5">観察した反応 ③</div>
            <div className="text-sm font-black text-white mb-2">パリィが多い</div>
            <div className="pt-2 border-t border-neutral-700/70 text-xs">
              <span className="font-bold text-cyan-400 block mb-1">次に優先する候補：</span>
              <div className="font-semibold text-white bg-neutral-900 px-2 py-1 rounded text-xs">
                発射の緩急をつけ、相手が止まる時間を前進に使う
              </div>
            </div>
          </div>
          <div className="mt-2.5 pt-2 border-t border-neutral-700/50 flex items-start gap-1.5 text-[11px] text-neutral-400">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
            <span>投げに行けるかどうかは距離とタイミング次第</span>
          </div>
        </div>

        {/* 反応4: 弾抜け狙い */}
        <div className="p-3 sm:p-3.5 rounded-xl bg-neutral-800/90 border border-neutral-700 flex flex-col justify-between">
          <div>
            <div className="text-[10px] font-bold text-rose-400 uppercase tracking-wider mb-0.5">観察した反応 ④</div>
            <div className="text-sm font-black text-white mb-2">弾抜けを狙っている</div>
            <div className="pt-2 border-t border-neutral-700/70 text-xs">
              <span className="font-bold text-cyan-400 block mb-1">次に優先する候補：</span>
              <div className="font-semibold text-white bg-neutral-900 px-2 py-1 rounded text-xs">
                相手の技・SA・ゲージを確認し、撃たずに待つ選択を増やす
              </div>
            </div>
          </div>
          <div className="mt-2.5 pt-2 border-t border-neutral-700/50 flex items-start gap-1.5 text-[11px] text-neutral-400">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
            <span>対戦相手のキャラクター性能とゲージ状況でリスクが大きく変わる</span>
          </div>
        </div>
      </div>

      {/* 注意書き */}
      <div className="mt-3 p-2.5 sm:p-3 rounded-xl bg-neutral-800/60 border border-neutral-700/60 text-xs text-neutral-300 leading-relaxed">
        <span className="font-bold text-amber-400">※ 判断方針の前提：</span>
        上記は固定の正解表ではなく、実戦で検討する「判断の候補」です。一度の反応だけで相手の癖を断定せず、繰り返し観察し、相手が対応を変えたらこちらも柔軟に優先順位を更新します。
      </div>
    </div>
  );
}

// 図解2: 中距離の支配間合いメーター（概念図）
export function DistanceMeterDiagram() {
  return (
    <div className="my-5 px-3.5 py-4 sm:p-6 bg-white dark:bg-[#151c28] rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-xs">
      <div className="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-neutral-100 dark:border-neutral-800">
        <div className="flex items-center gap-2">
          <Crosshair className="w-4 h-4 text-neutral-800 dark:text-cyan-400" />
          <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
            間合い概念図：中距離における技と間合いの考え方
          </span>
        </div>
        <span className="text-[10px] text-neutral-500 dark:text-neutral-400 font-medium">※概念図</span>
      </div>

      {/* スケールバー */}
      <div className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center text-xs font-bold">
          <div className="p-2.5 rounded-lg bg-neutral-100 dark:bg-neutral-800/70 text-neutral-700 dark:text-neutral-300 border border-neutral-200/60 dark:border-neutral-700/60">
            <div>近距離</div>
            <div className="text-[11px] font-normal text-neutral-500 dark:text-neutral-400 mt-1">
              小技・投げ・打撃の読み合い
            </div>
            <div className="text-[10px] text-neutral-400 dark:text-neutral-500 mt-0.5">
              相手の狙う通常技が直接届く距離
            </div>
          </div>
          <div className="p-2.5 rounded-lg bg-cyan-50 dark:bg-cyan-950/40 text-cyan-950 dark:text-cyan-200 border-2 border-cyan-500 shadow-xs">
            <div className="font-extrabold text-cyan-900 dark:text-cyan-200">★ 中距離</div>
            <div className="text-[11px] font-semibold text-cyan-700 dark:text-cyan-300 mt-1">
              波動拳と牽制技を使い分ける間合い
            </div>
            <div className="text-[10px] text-cyan-600 dark:text-cyan-400 mt-0.5">
              相手の技の先端・空振りを意識できる位置
            </div>
          </div>
          <div className="p-2.5 rounded-lg bg-neutral-100 dark:bg-neutral-800/70 text-neutral-700 dark:text-neutral-300 border border-neutral-200/60 dark:border-neutral-700/60">
            <div>遠距離</div>
            <div className="text-[11px] font-normal text-neutral-500 dark:text-neutral-400 mt-1">
              強波動 / 弾撃ち
            </div>
            <div className="text-[10px] text-neutral-400 dark:text-neutral-500 mt-0.5">
              飛びや奇襲が届きにくく安全を確認する距離
            </div>
          </div>
        </div>

        <div className="p-2.5 sm:p-3 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-neutral-200/80 dark:border-neutral-700/70 text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
          <span className="font-bold text-neutral-900 dark:text-neutral-100">💡 間合いの注意点：</span>
          中距離はリュウの主戦場ですが、「絶対的な安全圏」ではありません。相手キャラクターのリーチや突進技、弾抜け技の有無によって、有効な間合いは刻一刻と変化します。「相手の技がギリギリ届かない位置」を基準に間合いを測りましょう。
        </div>
      </div>
    </div>
  );
}

// 図解3: 迷いを減らす立ち回り vs 負担が増える立ち回り
export function MindsetComparisonTable() {
  return (
    <div className="my-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-xs bg-white dark:bg-[#151c28]">
      <div className="px-3.5 py-2.5 sm:p-4 bg-neutral-900 dark:bg-[#10141d] text-white text-xs font-bold flex items-center justify-between border-b border-neutral-800">
        <span className="text-neutral-100">思考比較：迷いを減らす立ち回り vs 負担が増える立ち回り</span>
        <span className="text-[11px] text-neutral-400">実戦での処理をシンプルにする工夫</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-neutral-200 dark:divide-neutral-800 text-xs">
        {/* NG側 */}
        <div className="p-3.5 sm:p-4 bg-rose-50/40 dark:bg-rose-950/20">
          <div className="flex items-center gap-1.5 font-bold text-rose-700 dark:text-rose-400 mb-2 sm:mb-3 text-sm">
            <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
            <span>迷いやミスを生みやすい行動</span>
          </div>
          <ul className="space-y-2.5 text-neutral-700 dark:text-neutral-300">
            <li className="flex items-start gap-2">
              <span className="text-rose-500 dark:text-rose-400 font-bold shrink-0">✕</span>
              <span><strong className="text-neutral-900 dark:text-neutral-100">リスクを確認せず波動拳を連射する</strong><br /><span className="text-neutral-500 dark:text-neutral-400 text-[11px]">→ 飛びや弾抜けに噛み合って痛い被弾を受ける</span></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-500 dark:text-rose-400 font-bold shrink-0">✕</span>
              <span><strong className="text-neutral-900 dark:text-neutral-100">相手のあらゆる技を同時に差し返そうとする</strong><br /><span className="text-neutral-500 dark:text-neutral-400 text-[11px]">→ 意識が散らばり、どの技にも反応できなくなる</span></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-500 dark:text-rose-400 font-bold shrink-0">✕</span>
              <span><strong className="text-neutral-900 dark:text-neutral-100">対空・ラッシュ・牽制すべてに同時対応しようとする</strong><br /><span className="text-neutral-500 dark:text-neutral-400 text-[11px]">→ 人間の反応速度の限界を超えて手詰まりになる</span></span>
            </li>
          </ul>
        </div>

        {/* 勝ち側 */}
        <div className="p-3.5 sm:p-4 bg-emerald-50/40 dark:bg-emerald-950/20">
          <div className="flex items-center gap-1.5 font-bold text-emerald-800 dark:text-emerald-400 mb-2 sm:mb-3 text-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>判断を絞り安定させる立ち回り</span>
          </div>
          <ul className="space-y-2.5 text-neutral-700 dark:text-neutral-300">
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold shrink-0">◯</span>
              <span><strong className="text-neutral-900 dark:text-neutral-100">波動拳で相手の反応傾向を観察する</strong><br /><span className="text-neutral-500 dark:text-neutral-400 text-[11px]">→ 次に優先して警戒する行動（飛び、前進など）を絞る</span></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold shrink-0">◯</span>
              <span><strong className="text-neutral-900 dark:text-neutral-100">「この技の空振りを狙う」と狙いを1点に限定する</strong><br /><span className="text-neutral-500 dark:text-neutral-400 text-[11px]">→ 意識を絞ることで無理のない差し返しを成立させる</span></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold shrink-0">◯</span>
              <span><strong className="text-neutral-900 dark:text-neutral-100">飛びを警戒したい状況を作って対空を待つ</strong><br /><span className="text-neutral-500 dark:text-neutral-400 text-[11px]">→ 相手が飛びを選びやすい状況を意識し、昇龍拳を準備する</span></span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

/**
 * 図1：中距離での「止まる」と「踏み込む」
 * 上段：リュウが相手の通常技の先端外で止まる（止まる・空振り待ち）
 * 下段：リュウが一歩入り、自分の通常技を当てる（踏み込む・接触）
 */
export function RyuSpacingStepinDiagram() {
  return (
    <figure className="my-6 rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-neutral-900 text-white overflow-hidden shadow-sm">
      <div className="px-4 py-3 border-b border-neutral-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Crosshair className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold text-cyan-300 tracking-wider">
            図1：中距離での「止まる」と「踏み込む」（位置関係の例）
          </span>
        </div>
        <span className="text-[11px] text-neutral-400 bg-neutral-800 px-2 py-0.5 rounded">
          間合いの概念図
        </span>
      </div>

      <div className="p-4 sm:p-6 bg-gradient-to-b from-neutral-900 to-neutral-950">
        <svg
          viewBox="0 0 680 320"
          className="w-full h-auto"
          aria-labelledby="ryu-fig1-title ryu-fig1-desc"
          role="img"
        >
          <title id="ryu-fig1-title">中距離での「止まる」と「踏み込む」</title>
          <desc id="ryu-fig1-desc">
            上段では相手の牽制の先端外で止まり空振りを待ち、下段では一歩踏み込んで大Pや下中Kで接触する位置関係の概念図。
          </desc>
          <defs>
            <linearGradient id="ryuBlue" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
            <linearGradient id="oppGray" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4b5563" />
              <stop offset="100%" stopColor="#374151" />
            </linearGradient>
          </defs>

          {/* === 上段：先端外で止まる（空振り待ち） === */}
          <g transform="translate(10, 20)">
            <rect x="0" y="0" width="220" height="24" rx="4" fill="#1e293b" />
            <text x="10" y="16" fill="#38bdf8" fontSize="13" fontWeight="bold">
              上段：先端の外で待つ（止まる）
            </text>

            <line x1="0" y1="105" x2="660" y2="105" stroke="#404040" strokeWidth="2" strokeDasharray="4 4" />

            {/* リュウ */}
            <rect x="60" y="45" width="80" height="60" rx="8" fill="url(#ryuBlue)" stroke="#60a5fa" strokeWidth="1.5" />
            <text x="100" y="73" fill="#ffffff" fontSize="15" fontWeight="bold" textAnchor="middle">リュウ</text>
            <text x="100" y="91" fill="#bfdbfe" fontSize="11" textAnchor="middle">止まる</text>

            {/* 空振り待ちラベル */}
            <rect x="155" y="55" width="105" height="36" rx="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
            <text x="207" y="77" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">空振り待ち</text>

            {/* 相手の牽制範囲（淡い帯：位置関係の例） */}
            <rect x="275" y="52" width="195" height="48" rx="6" fill="#f59e0b" fillOpacity="0.12" stroke="#f59e0b" strokeDasharray="3 3" strokeWidth="1" />
            <text x="372" y="73" fill="#fbbf24" fontSize="12" textAnchor="middle">相手の牽制範囲</text>
            <text x="372" y="89" fill="#fde68a" fontSize="10" textAnchor="middle">（位置関係の例・先端が届かない）</text>

            {/* 相手 */}
            <rect x="480" y="45" width="80" height="60" rx="8" fill="url(#oppGray)" stroke="#9ca3af" strokeWidth="1.5" />
            <text x="520" y="73" fill="#ffffff" fontSize="15" fontWeight="bold" textAnchor="middle">相手</text>
            <text x="520" y="91" fill="#d1d5db" fontSize="11" textAnchor="middle">牽制技を振る</text>
          </g>

          {/* 区切り線 */}
          <line x1="20" y1="160" x2="660" y2="160" stroke="#333333" strokeWidth="1" />

          {/* === 下段：一歩入って当てる（踏み込む・接触） === */}
          <g transform="translate(10, 180)">
            <rect x="0" y="0" width="220" height="24" rx="4" fill="#064e3b" />
            <text x="10" y="16" fill="#34d399" fontSize="13" fontWeight="bold">
              下段：一歩入って当てる（踏み込む）
            </text>

            <line x1="0" y1="105" x2="660" y2="105" stroke="#404040" strokeWidth="2" strokeDasharray="4 4" />

            {/* リュウ（踏み込んで前進） */}
            <rect x="180" y="45" width="80" height="60" rx="8" fill="url(#ryuBlue)" stroke="#60a5fa" strokeWidth="1.5" />
            <text x="220" y="73" fill="#ffffff" fontSize="15" fontWeight="bold" textAnchor="middle">リュウ</text>
            <text x="220" y="91" fill="#a7f3d0" fontSize="11" fontWeight="bold" textAnchor="middle">踏み込む</text>

            {/* 前進の矢印 */}
            <path d="M 120 75 L 165 75 M 155 68 L 165 75 L 155 82" stroke="#34d399" strokeWidth="2.5" fill="none" />
            <text x="140" y="64" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">歩き</text>

            {/* 接触ゾーン（大P・下中Kが届く） */}
            <rect x="275" y="52" width="195" height="48" rx="6" fill="#10b981" fillOpacity="0.18" stroke="#10b981" strokeWidth="1.5" />
            <text x="372" y="73" fill="#34d399" fontSize="13" fontWeight="bold" textAnchor="middle">大P・下中Kで接触！</text>
            <text x="372" y="90" fill="#a7f3d0" fontSize="10" textAnchor="middle">（ヒット確認・Dゲージ削りへ）</text>

            {/* 相手（上段と同位置） */}
            <rect x="480" y="45" width="80" height="60" rx="8" fill="url(#oppGray)" stroke="#9ca3af" strokeWidth="1.5" />
            <text x="520" y="73" fill="#ffffff" fontSize="15" fontWeight="bold" textAnchor="middle">相手</text>
            <text x="520" y="91" fill="#d1d5db" fontSize="11" textAnchor="middle">ガード・被弾</text>
          </g>
        </svg>
      </div>

      <figcaption className="px-4 py-3 bg-neutral-950 border-t border-neutral-800 text-xs text-neutral-400 leading-relaxed">
        相手の牽制の外で待つ時間と、自分の技を届かせる時間を分けます。相手と使う技によって境界は変わります。
      </figcaption>
    </figure>
  );
}

/**
 * 図2：ダウン後の時間の使い道
 * 上段：前進・起き攻め（距離を詰める矢印）
 * 下段：電刃の取得（電刃状態を示す簡潔な記号）
 */
export function RyuDenjinOrOkiDiagram() {
  return (
    <figure className="my-6 rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-neutral-900 text-white overflow-hidden shadow-sm">
      <div className="px-4 py-3 border-b border-neutral-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Crosshair className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-bold text-amber-300 tracking-wider">
            図2：ダウン後の時間の使い道（概念図）
          </span>
        </div>
        <span className="text-[11px] text-neutral-400 bg-neutral-800 px-2 py-0.5 rounded">
          状況別の選択肢
        </span>
      </div>

      <div className="p-4 sm:p-6 bg-gradient-to-b from-neutral-900 to-neutral-950">
        <svg
          viewBox="0 0 680 300"
          className="w-full h-auto"
          aria-labelledby="ryu-fig2-title ryu-fig2-desc"
          role="img"
        >
          <title id="ryu-fig2-title">ダウン後の時間の使い道</title>
          <desc id="ryu-fig2-desc">
            足刀ヒット等のダウン後、上段では前進して起き攻めを継続し、下段では電刃錬気を取得して次の接触を強化する二大選択肢の比較概念図。
          </desc>
          <defs>
            <linearGradient id="ryuBlue2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
            <linearGradient id="ryuDenjinGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
          </defs>

          {/* === 上段パネル：前進・起き攻め === */}
          <g transform="translate(10, 15)">
            <rect x="0" y="0" width="230" height="24" rx="4" fill="#064e3b" />
            <text x="10" y="16" fill="#34d399" fontSize="13" fontWeight="bold">
              選択肢A：前進・起き攻めの継続
            </text>

            <line x1="0" y1="95" x2="660" y2="95" stroke="#404040" strokeWidth="2" strokeDasharray="4 4" />

            {/* リュウ */}
            <rect x="50" y="38" width="90" height="54" rx="8" fill="url(#ryuBlue2)" stroke="#60a5fa" strokeWidth="1.5" />
            <text x="95" y="64" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">リュウ</text>
            <text x="95" y="81" fill="#bfdbfe" fontSize="11" textAnchor="middle">前ステップ・歩き</text>

            {/* 距離を詰める前進矢印 */}
            <g transform="translate(155, 45)">
              <rect x="0" y="0" width="260" height="40" rx="6" fill="#047857" fillOpacity="0.2" stroke="#10b981" strokeWidth="1.2" />
              <path d="M 20 20 L 230 20 M 215 12 L 230 20 L 215 28" stroke="#34d399" strokeWidth="2.5" fill="none" />
              <text x="125" y="15" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">距離を詰めて密着有利へ</text>
            </g>

            {/* ダウン中の相手 */}
            <rect x="450" y="50" width="100" height="42" rx="6" fill="#374151" stroke="#6b7280" strokeWidth="1.5" />
            <text x="500" y="70" fill="#9ca3af" fontSize="12" fontWeight="bold" textAnchor="middle">相手（ダウン）</text>
            <text x="500" y="84" fill="#d1d5db" fontSize="10" textAnchor="middle">打撃・投げの二択へ</text>
          </g>

          {/* 区切り線 */}
          <line x1="20" y1="150" x2="660" y2="150" stroke="#333333" strokeWidth="1" />

          {/* === 下段パネル：電刃の取得 === */}
          <g transform="translate(10, 165)">
            <rect x="0" y="0" width="230" height="24" rx="4" fill="#78350f" />
            <text x="10" y="16" fill="#fde68a" fontSize="13" fontWeight="bold">
              選択肢B：電刃錬気の取得
            </text>

            <line x1="0" y1="95" x2="660" y2="95" stroke="#404040" strokeWidth="2" strokeDasharray="4 4" />

            {/* リュウ（電刃取得・雷オーラ） */}
            <rect x="50" y="38" width="90" height="54" rx="8" fill="url(#ryuDenjinGlow)" stroke="#fbbf24" strokeWidth="2" />
            <text x="95" y="62" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">リュウ</text>
            <text x="95" y="80" fill="#fef08a" fontSize="11" fontWeight="bold" textAnchor="middle">⚡️ 電刃取得</text>

            {/* 電刃強化の説明 */}
            <g transform="translate(155, 45)">
              <rect x="0" y="0" width="260" height="40" rx="6" fill="#78350f" fillOpacity="0.25" stroke="#f59e0b" strokeWidth="1.2" />
              <text x="130" y="17" fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle">次の波動・波掌撃を強化</text>
              <text x="130" y="32" fill="#fde68a" fontSize="10" textAnchor="middle">（弾速アップ・ガード有利の布石）</text>
            </g>

            {/* ダウン中の相手（距離は離れたまま復帰） */}
            <rect x="450" y="50" width="100" height="42" rx="6" fill="#374151" stroke="#6b7280" strokeWidth="1.5" />
            <text x="500" y="70" fill="#9ca3af" fontSize="12" fontWeight="bold" textAnchor="middle">相手（ダウン）</text>
            <text x="500" y="84" fill="#9ca3af" fontSize="10" textAnchor="middle">間合いを保ち復帰</text>
          </g>
        </svg>
      </div>

      <figcaption className="px-4 py-3 bg-neutral-950 border-t border-neutral-800 text-xs text-neutral-400 leading-relaxed">
        今の位置と攻めを取るか、次の接触を強くする準備を取るかを選びます。すべてのダウンで両方が安全に成立する図ではありません。
      </figcaption>
    </figure>
  );
}

/**
 * 図3：画面端で当てる時間と逃がさない時間
 * 端の位置を統一した上下2パネル
 * 上段：地上打撃を当てる位置（前大K・大Pで触る）
 * 下段：技を出さず飛びを見る位置（相手の前ジャンプ軌道と昇竜迎撃方向）
 */
export function RyuCornerEscapeCheckDiagram() {
  return (
    <figure className="my-6 rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-neutral-900 text-white overflow-hidden shadow-sm">
      <div className="px-4 py-3 border-b border-neutral-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Crosshair className="w-4 h-4 text-rose-400" />
          <span className="text-xs font-bold text-rose-300 tracking-wider">
            図3：画面端で当てる時間と逃がさない時間（概念図）
          </span>
        </div>
        <span className="text-[11px] text-neutral-400 bg-neutral-800 px-2 py-0.5 rounded">
          画面端の攻防
        </span>
      </div>

      <div className="p-4 sm:p-6 bg-gradient-to-b from-neutral-900 to-neutral-950">
        <svg
          viewBox="0 0 680 320"
          className="w-full h-auto"
          aria-labelledby="ryu-fig3-title ryu-fig3-desc"
          role="img"
        >
          <title id="ryu-fig3-title">画面端で当てる時間と逃がさない時間</title>
          <desc id="ryu-fig3-desc">
            画面端では、上段のように後退できない相手へ地上打撃でプレッシャーをかける時間と、下段のように技を出さず入れ替え飛びを昇竜拳で落とす時間の使い分けを示す概念図。
          </desc>
          <defs>
            <linearGradient id="ryuBlue3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
            <linearGradient id="oppCorner" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4b5563" />
              <stop offset="100%" stopColor="#374151" />
            </linearGradient>
          </defs>

          {/* === 上段：地上打撃を当てる時間 === */}
          <g transform="translate(10, 20)">
            <rect x="0" y="0" width="220" height="24" rx="4" fill="#1e293b" />
            <text x="10" y="16" fill="#38bdf8" fontSize="13" fontWeight="bold">
              上段：地上打撃で触る（後退不可）
            </text>

            <line x1="0" y1="105" x2="660" y2="105" stroke="#404040" strokeWidth="2" strokeDasharray="4 4" />

            {/* 画面端の壁（赤） */}
            <rect x="625" y="25" width="25" height="85" fill="#450a0a" stroke="#ef4444" strokeWidth="2" />
            <text x="638" y="60" fill="#fca5a5" fontSize="12" fontWeight="bold" textAnchor="middle" transform="rotate(90, 638, 60)">
              画面端
            </text>

            {/* リュウ（打撃で接触） */}
            <rect x="250" y="45" width="85" height="60" rx="8" fill="url(#ryuBlue3)" stroke="#60a5fa" strokeWidth="1.5" />
            <text x="292" y="73" fill="#ffffff" fontSize="15" fontWeight="bold" textAnchor="middle">リュウ</text>
            <text x="292" y="91" fill="#bfdbfe" fontSize="11" textAnchor="middle">前大K・大P</text>

            {/* 打撃判定（リーチゾーン） */}
            <rect x="345" y="55" width="165" height="40" rx="6" fill="#0284c7" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="1.2" />
            <text x="427" y="75" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">後退で外されない打撃！</text>
            <text x="427" y="90" fill="#bae6fd" fontSize="10" textAnchor="middle">（ガード削り・ヒット確認）</text>

            {/* 相手（壁際で防戦） */}
            <rect x="520" y="45" width="85" height="60" rx="8" fill="url(#oppCorner)" stroke="#9ca3af" strokeWidth="1.5" />
            <text x="562" y="73" fill="#ffffff" fontSize="15" fontWeight="bold" textAnchor="middle">相手</text>
            <text x="562" y="91" fill="#fca5a5" fontSize="11" textAnchor="middle">後退スペース無</text>
          </g>

          {/* 区切り線 */}
          <line x1="20" y1="160" x2="660" y2="160" stroke="#333333" strokeWidth="1" />

          {/* === 下段：技を出さず飛びを見る時間 === */}
          <g transform="translate(10, 180)">
            <rect x="0" y="0" width="220" height="24" rx="4" fill="#4c0519" />
            <text x="10" y="16" fill="#f43f5e" fontSize="13" fontWeight="bold">
              下段：技を出さず脱出を迎撃
            </text>

            <line x1="0" y1="105" x2="660" y2="105" stroke="#404040" strokeWidth="2" strokeDasharray="4 4" />

            {/* 画面端の壁（赤・共通位置） */}
            <rect x="625" y="25" width="25" height="85" fill="#450a0a" stroke="#ef4444" strokeWidth="2" />
            <text x="638" y="60" fill="#fca5a5" fontSize="12" fontWeight="bold" textAnchor="middle" transform="rotate(90, 638, 60)">
              画面端
            </text>

            {/* リュウ（技を出さず足を止める） */}
            <rect x="250" y="45" width="85" height="60" rx="8" fill="url(#ryuBlue3)" stroke="#60a5fa" strokeWidth="1.5" />
            <text x="292" y="73" fill="#ffffff" fontSize="15" fontWeight="bold" textAnchor="middle">リュウ</text>
            <text x="292" y="91" fill="#fde047" fontSize="11" fontWeight="bold" textAnchor="middle">対空待ち！</text>

            {/* 昇竜迎撃矢印（斜め上） */}
            <path d="M 335 48 L 415 10 M 398 10 L 415 10 L 415 27" stroke="#fbbf24" strokeWidth="2.5" fill="none" />
            <text x="350" y="20" fill="#fbbf24" fontSize="12" fontWeight="bold">昇竜拳で迎撃！</text>

            {/* 相手（前ジャンプで位置入れ替えを試みる軌道） */}
            <path d="M 540 45 Q 450 -15 320 35" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 3" fill="none" />
            <polygon points="320,35 328,25 334,35" fill="#f43f5e" />
            <text x="470" y="8" fill="#fda4af" fontSize="11" fontWeight="bold">前ジャンプ脱出軌道</text>

            {/* 相手 */}
            <rect x="520" y="45" width="85" height="60" rx="8" fill="url(#oppCorner)" stroke="#f43f5e" strokeWidth="1.5" />
            <text x="562" y="73" fill="#ffffff" fontSize="15" fontWeight="bold" textAnchor="middle">相手</text>
            <text x="562" y="91" fill="#fda4af" fontSize="11" textAnchor="middle">焦って前飛び</text>
          </g>
        </svg>
      </div>

      <figcaption className="px-4 py-3 bg-neutral-950 border-t border-neutral-800 text-xs text-neutral-400 leading-relaxed">
        後退で技を外されにくい位置を活かし、ガード後は入れ替えの飛びにも備えます。常に次の打撃を出す必要はありません。
      </figcaption>
    </figure>
  );
}
