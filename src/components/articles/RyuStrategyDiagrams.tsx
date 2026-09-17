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
              電刃錬気 / 弾撃ち
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
