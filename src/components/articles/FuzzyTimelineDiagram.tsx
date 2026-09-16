'use client';

import React, { useState } from 'react';
import { ShieldAlert, CheckCircle2, XCircle, AlertCircle, ArrowRight, Play } from 'lucide-react';

type OpponentAction = 'strike' | 'throw' | 'shimmy';

export default function FuzzyTimelineDiagram() {
  const [inputFrame, setInputFrame] = useState<number>(5); // 投げ抜け入力フレーム (+1F〜+10F)
  const [opponentAction, setOpponentAction] = useState<OpponentAction>('strike');

  // 判定ロジック
  // スト6仕様:
  // - ガード硬直明け: 0F
  // - 最速打撃: 4F目に攻撃判定発生（ガード硬直明け最速なら4F目にヒット判定）
  // - 最速通常投げ: 5F目に投げ判定発生。投げ抜け猶予は投げ発生から約9F以内。
  // - シミー: 相手は下がって投げ抜けの空振りを待つ。
  let outcomeTitle = '';
  let outcomeStatus: 'success' | 'danger' | 'warning' = 'success';
  let outcomeDesc = '';

  if (opponentAction === 'strike') {
    // 相手が暴れ潰し打撃（4F発生）
    if (inputFrame <= 3) {
      outcomeTitle = '打撃を被弾（暴れ・押し負け）';
      outcomeStatus = 'danger';
      outcomeDesc = '投げ抜け入力を焦りすぎたため、ガード硬直が解けた直後に暴れ扱いで打撃にカウンターヒットしてしまいました。';
    } else {
      outcomeTitle = '打撃を完全ガード！（成功）';
      outcomeStatus = 'success';
      outcomeDesc = '4F目の打撃判定時にまだガード入力を維持していたため、相手の暴れ潰しを安全にガード！投げ抜け入力は打撃ガード硬直で不発となり、隙を晒しません。';
    }
  } else if (opponentAction === 'throw') {
    // 相手が通常投げ（5F発生、猶予9F）
    if (inputFrame >= 5 && inputFrame <= 9) {
      outcomeTitle = '投げ抜け（グラップ）成功！（成功）';
      outcomeStatus = 'success';
      outcomeDesc = '相手の投げ（5F発生）の直後にジャストタイミングで投げ抜けを入力できたため、投げを外して五分の仕切り直しに成功！';
    } else if (inputFrame < 5) {
      outcomeTitle = '投げ抜け成功（最速グラップ）';
      outcomeStatus = 'success';
      outcomeDesc = '投げの直前に入力されましたが、投げ抜け有効フレーム内のため抜け成立。ただし相手が打撃だった場合は被弾するハイリスクなタイミングです。';
    } else {
      outcomeTitle = '投げが成立（投げられ被弾）';
      outcomeStatus = 'danger';
      outcomeDesc = '投げ抜けの入力が遅すぎたため、相手の投げ抜け有効フレーム（約9F以内）に間に合わず投げられてしまいました。';
    }
  } else {
    // 相手がシミー（後ろ下がり）
    outcomeTitle = '投げ空振りにパニカン被弾！（危険）';
    outcomeStatus = 'danger';
    outcomeDesc = '相手は技を振らずに後ろへ下がって様子を見ていました。遅らせて入力した通常投げが空振り、その大きな隙にパニッシュカウンターからフルコンボをもらってしまいます。';
  }

  return (
    <div className="my-6 sm:my-8 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm overflow-hidden">
      {/* ヘッダー */}
      <div className="px-3.5 py-3 sm:px-5 sm:py-4 bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800 text-[10px] font-bold uppercase tracking-wider mb-1">
            <span>共通技術シミュレーター</span>
          </div>
          <h3 className="text-sm sm:text-lg font-bold">遅らせグラップ（ファジー防衛）のフレーム可視化</h3>
        </div>
        <span className="text-[11px] sm:text-xs text-neutral-400">スライダーとボタンで両対応の理屈を体験</span>
      </div>

      <div className="px-3 py-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* コントロールエリア */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {/* 相手の行動選択 */}
          <div className="p-3 sm:p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/80 space-y-2 sm:space-y-2.5">
            <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block">
              1. 相手の起き攻め・攻め継続アクション
            </span>
            <div className="grid grid-cols-3 gap-1 sm:gap-1.5">
              <button
                onClick={() => setOpponentAction('strike')}
                className={`py-1.5 sm:py-2 px-1 sm:px-2 rounded-lg text-[11px] sm:text-xs font-bold border transition-all cursor-pointer ${
                  opponentAction === 'strike'
                    ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                    : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700 hover:border-amber-400'
                }`}
              >
                ① 暴れ潰し
              </button>
              <button
                onClick={() => setOpponentAction('throw')}
                className={`py-1.5 sm:py-2 px-1 sm:px-2 rounded-lg text-[11px] sm:text-xs font-bold border transition-all cursor-pointer ${
                  opponentAction === 'throw'
                    ? 'bg-cyan-600 text-white border-cyan-700 shadow-xs'
                    : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700 hover:border-cyan-400'
                }`}
              >
                ② 通常投げ
              </button>
              <button
                onClick={() => setOpponentAction('shimmy')}
                className={`py-1.5 sm:py-2 px-1 sm:px-2 rounded-lg text-[11px] sm:text-xs font-bold border transition-all cursor-pointer ${
                  opponentAction === 'shimmy'
                    ? 'bg-rose-600 text-white border-rose-700 shadow-xs'
                    : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700 hover:border-rose-400'
                }`}
              >
                ③ シミー
              </button>
            </div>
            <p className="text-[10px] sm:text-[11px] text-neutral-500 dark:text-neutral-400 leading-tight">
              {opponentAction === 'strike' && '発生4Fの小技を最速で重ねて暴れを狩る行動'}
              {opponentAction === 'throw' && '発生5Fの通常投げでガードを崩しに来る行動'}
              {opponentAction === 'shimmy' && '少し後ろに下がって投げ抜け空振りに大技を狙う行動'}
            </p>
          </div>

          {/* 自分の投げ抜け入力タイミングスライダー */}
          <div className="p-3 sm:p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/80 space-y-2 sm:space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                2. あなたの投げ抜け入力タイミング
              </span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                +{inputFrame}F 目に入力
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              step="1"
              value={inputFrame}
              onChange={(e) => setInputFrame(parseInt(e.target.value))}
              className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
            <div className="flex justify-between text-[9px] sm:text-[10px] text-neutral-400 font-mono">
              <span>+1F（最速暴れ）</span>
              <span className="text-purple-600 dark:text-purple-400 font-bold">+5F〜+6F（理想の遅らせ）</span>
              <span>+10F（遅すぎ）</span>
            </div>
          </div>
        </div>

        {/* タイムラインビジュアル（SVG） */}
        <div className="px-2.5 py-3 sm:p-4 rounded-xl bg-neutral-900 text-white space-y-2.5 sm:space-y-3">
          <div className="flex items-center justify-between text-[11px] sm:text-xs text-neutral-400 pb-2 border-b border-neutral-800">
            <span>フレーム進行（0F: ガード硬直終了）</span>
            <span className="font-mono text-purple-400 font-bold">現在の入力: +{inputFrame}F</span>
          </div>

          <div className="relative pt-4 sm:pt-6 pb-2">
            {/* タイムラインバー (0F〜10F) */}
            <div className="grid grid-cols-11 gap-0.5 sm:gap-1 text-center font-mono text-xs">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((f) => {
                const isInput = f === inputFrame;
                const isStrikeHit = opponentAction === 'strike' && f === 4;
                const isThrowHit = opponentAction === 'throw' && f === 5;

                return (
                  <div key={f} className="flex flex-col items-center">
                    <span className="text-[9px] sm:text-[10px] text-neutral-500 mb-1">+{f}F</span>
                    <div
                      className={`w-full h-9 sm:h-12 rounded flex items-center justify-center font-bold text-[9px] sm:text-[11px] border transition-all ${
                        isInput
                          ? 'bg-purple-600 border-purple-400 text-white ring-2 ring-purple-400 shadow-md z-10'
                          : isStrikeHit
                          ? 'bg-amber-600/80 border-amber-500 text-white'
                          : isThrowHit
                          ? 'bg-cyan-600/80 border-cyan-500 text-white'
                          : f <= 3
                          ? 'bg-neutral-800 border-neutral-700 text-neutral-400'
                          : 'bg-neutral-850 border-neutral-800 text-neutral-500'
                      }`}
                    >
                      {isInput ? '弱P+K' : isStrikeHit ? '打撃' : isThrowHit ? '投げ' : ''}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ガード継続帯 vs 投げ抜け帯のインジケーター */}
            <div className="grid grid-cols-11 gap-0.5 sm:gap-1 mt-2 text-[8.5px] sm:text-[10px] font-medium text-center">
              <div className="col-span-4 bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 py-1 rounded">
                🛡 ガード維持ゾーン
              </div>
              <div className="col-span-5 bg-cyan-950/60 text-cyan-300 border border-cyan-800/60 py-1 rounded">
                投げ抜け有効ゾーン
              </div>
              <div className="col-span-2 bg-neutral-800 text-neutral-400 py-1 rounded">
                無防備
              </div>
            </div>
          </div>
        </div>

        {/* 判定結果カード */}
        <div
          className={`p-3.5 sm:p-5 rounded-xl border flex items-start gap-3 transition-all ${
            outcomeStatus === 'success'
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800'
              : outcomeStatus === 'danger'
              ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800'
              : 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800'
          }`}
        >
          <div className="shrink-0 mt-0.5">
            {outcomeStatus === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
            )}
          </div>
          <div className="space-y-1">
            <h4
              className={`text-sm sm:text-base font-bold ${
                outcomeStatus === 'success'
                  ? 'text-emerald-900 dark:text-emerald-200'
                  : 'text-rose-900 dark:text-rose-200'
              }`}
            >
              結果：{outcomeTitle}
            </h4>
            <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
              {outcomeDesc}
            </p>
          </div>
        </div>

        {/* 共通技術としての要点まとめ */}
        <div className="p-4 bg-neutral-100 dark:bg-neutral-800/80 rounded-xl space-y-2 text-xs text-neutral-700 dark:text-neutral-300">
          <span className="font-bold text-neutral-900 dark:text-white block">
            💡 格ゲー共通の真理：なぜ「遅らせ」ると両対応できるのか？
          </span>
          <ul className="space-y-1.5 pl-3 list-disc text-neutral-600 dark:text-neutral-300">
            <li>
              <strong>相手が打撃を重ねてきた場合：</strong> 4F目に攻撃を喰らう瞬間はまだガード入力をしているため、自動的にガード成立。投げ抜けボタンは打撃のガード硬直中に押されるため無視され、安全。
            </li>
            <li>
              <strong>相手が投げてきた場合：</strong> 投げが成立した瞬間から約9フレームの間、投げ抜けの猶予が存在するため、5〜7F目の少し遅れた投げ入力でも綺麗に抜けられる。
            </li>
            <li>
              <strong>唯一の弱点は「シミー（後ろ下がり）」：</strong> 相手が何もせず下がると、遅れて押した投げ抜けが空振りモーションとして漏れてしまい、手痛いフルコンボを喰らう。
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
