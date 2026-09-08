import React from 'react';
import { HelpCircle, Crosshair, ArrowDown, CheckCircle2, XCircle } from 'lucide-react';

// 図解1: 波動拳の質問と回答のフロー図
export function HadokenFlowDiagram() {
  return (
    <div className="my-6 p-5 sm:p-6 bg-neutral-900 text-white rounded-2xl shadow-sm border border-neutral-800">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-neutral-800">
        <HelpCircle className="w-4 h-4 text-cyan-400" />
        <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
          立ち回り図解：波動拳という「質問」の構造
        </span>
      </div>

      {/* トップノード：質問 */}
      <div className="max-w-xs mx-auto p-3 rounded-xl bg-neutral-800 border border-neutral-700 text-center mb-3">
        <div className="text-[11px] text-neutral-400 font-mono">リュウの行動</div>
        <div className="text-sm font-bold text-white">波動拳を撃つ（質問）</div>
        <div className="text-[11px] text-cyan-300 mt-0.5">「この距離でどう動きますか？」</div>
      </div>

      <div className="flex justify-center my-1 text-neutral-500">
        <ArrowDown className="w-4 h-4" />
      </div>

      {/* 3つの分岐 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* 分岐1: ジャンプ */}
        <div className="p-3.5 rounded-xl bg-neutral-800/80 border border-neutral-700/80">
          <div className="text-[11px] font-bold text-amber-400 mb-1">相手の回答 ①</div>
          <div className="text-sm font-black text-white mb-2">ジャンプで飛ぶ</div>
          <div className="pt-2 border-t border-neutral-700/60 text-xs text-neutral-300">
            <span className="font-bold text-cyan-400">リュウの確定行動：</span>
            <div className="mt-1 font-semibold text-white bg-neutral-900 px-2 py-1 rounded">
              対空（昇龍拳）一点待ち
            </div>
            <p className="text-[11px] text-neutral-400 mt-1">次は撃たずに落として大ダメージ</p>
          </div>
        </div>

        {/* 分岐2: ガード */}
        <div className="p-3.5 rounded-xl bg-neutral-800/80 border border-neutral-700/80">
          <div className="text-[11px] font-bold text-blue-400 mb-1">相手の回答 ②</div>
          <div className="text-sm font-black text-white mb-2">立ち/しゃがみガード</div>
          <div className="pt-2 border-t border-neutral-700/60 text-xs text-neutral-300">
            <span className="font-bold text-cyan-400">リュウの確定行動：</span>
            <div className="mt-1 font-semibold text-white bg-neutral-900 px-2 py-1 rounded">
              次の波動拳を継続
            </div>
            <p className="text-[11px] text-neutral-400 mt-1">相手は足が止まっているため安全に通る</p>
          </div>
        </div>

        {/* 分岐3: パリィ */}
        <div className="p-3.5 rounded-xl bg-neutral-800/80 border border-neutral-700/80">
          <div className="text-[11px] font-bold text-emerald-400 mb-1">相手の回答 ③</div>
          <div className="text-sm font-black text-white mb-2">ドライブパリィ</div>
          <div className="pt-2 border-t border-neutral-700/60 text-xs text-neutral-300">
            <span className="font-bold text-cyan-400">リュウの確定行動：</span>
            <div className="mt-1 font-semibold text-white bg-neutral-900 px-2 py-1 rounded">
              前歩き投げ / 波掌撃
            </div>
            <p className="text-[11px] text-neutral-400 mt-1">ゲージ維持を逆手に取って崩す</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// 図解2: 中距離の支配間合いメーター
export function DistanceMeterDiagram() {
  return (
    <div className="my-6 p-5 sm:p-6 bg-white rounded-2xl border border-neutral-200 shadow-xs">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-neutral-100">
        <Crosshair className="w-4 h-4 text-neutral-800" />
        <span className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
          間合い概念図：中距離におけるリュウの支配域
        </span>
      </div>

      {/* スケールバー */}
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold">
          <div className="p-2.5 rounded-lg bg-neutral-100 text-neutral-500 border border-neutral-200/60">
            近距離
            <div className="text-[10px] font-normal text-neutral-400 mt-0.5">小技・投げの読み合い</div>
          </div>
          <div className="p-2.5 rounded-lg bg-cyan-50 text-cyan-950 border-2 border-cyan-500 shadow-xs">
            ★ 中距離（リュウの絶対領域）
            <div className="text-[10px] font-semibold text-cyan-700 mt-0.5">前大P / 波動拳 / 9F大足</div>
          </div>
          <div className="p-2.5 rounded-lg bg-neutral-100 text-neutral-500 border border-neutral-200/60">
            遠距離
            <div className="text-[10px] font-normal text-neutral-400 mt-0.5">電刃溜め / 安全波動</div>
          </div>
        </div>

        <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200/80 text-xs text-neutral-600 leading-relaxed">
          <span className="font-bold text-neutral-900">💡 立ち回りの鉄則：</span>
          中距離では相手は「前に出るのも怖い・技を振るのも空振りが怖い」という心理状態になります。相手が焦って技を空振った瞬間を、発生9Fのしゃがみ強K（大足）や前大Pで狩るのが基本原則です。
        </div>
      </div>
    </div>
  );
}

// 図解3: 3大NG行動 vs 強いリュウの勝ち思考
export function MindsetComparisonTable() {
  return (
    <div className="my-6 rounded-2xl border border-neutral-200 overflow-hidden shadow-xs bg-white">
      <div className="p-4 bg-neutral-900 text-white text-xs font-bold flex items-center justify-between">
        <span>思考比較：伸び悩むリュウ vs 強いリュウ</span>
        <span className="text-[11px] text-neutral-400">判断数を減らす思考法</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-neutral-200 text-xs">
        {/* NG側 */}
        <div className="p-4 bg-rose-50/40">
          <div className="flex items-center gap-1.5 font-bold text-rose-700 mb-3 text-sm">
            <XCircle className="w-4 h-4 text-rose-600" />
            <span>迷いを生む3大NG行動</span>
          </div>
          <ul className="space-y-2.5 text-neutral-700">
            <li className="flex items-start gap-2">
              <span className="text-rose-500 font-bold shrink-0">✕</span>
              <span><strong>目的のない波動拳を乱射する</strong><br /><span className="text-neutral-500 text-[11px]">→ 飛ばれてフルコンをもらう</span></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-500 font-bold shrink-0">✕</span>
              <span><strong>すべての技を差し返そうとする</strong><br /><span className="text-neutral-500 text-[11px]">→ 判断がパンクしてミスが出る</span></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-500 font-bold shrink-0">✕</span>
              <span><strong>相手の動きを見てから反応しようとする</strong><br /><span className="text-neutral-500 text-[11px]">→ 人間の反射神経の限界を超える</span></span>
            </li>
          </ul>
        </div>

        {/* 勝ち側 */}
        <div className="p-4 bg-emerald-50/40">
          <div className="flex items-center gap-1.5 font-bold text-emerald-800 mb-3 text-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>勝率が安定する思考法</span>
          </div>
          <ul className="space-y-2.5 text-neutral-700">
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold shrink-0">◯</span>
              <span><strong>「質問」として1発撃ち、反応を見る</strong><br /><span className="text-neutral-500 text-[11px]">→ 相手の癖を炙り出して行動を固定</span></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold shrink-0">◯</span>
              <span><strong>「この技だけ狩る」と1点に絞る</strong><br /><span className="text-neutral-500 text-[11px]">→ 脳の処理負荷を最小限に</span></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold shrink-0">◯</span>
              <span><strong>事前に相手の選択肢を削って「待つ」</strong><br /><span className="text-neutral-500 text-[11px]">→ 飛ぶしかない状況を作って昇龍拳</span></span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
