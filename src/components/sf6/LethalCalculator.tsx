'use client';

import React from 'react';
import { Flame, RefreshCw, Sparkles } from 'lucide-react';

interface LethalCalculatorProps {
  targetHp: number;
  onTargetHpChange: (hp: number) => void;
  maxDrive: number;
  onMaxDriveChange: (d: number) => void;
  maxSa: number;
  onMaxSaChange: (sa: number) => void;
  matchingCount: number;
  onReset: () => void;
}

export default function LethalCalculator({
  targetHp,
  onTargetHpChange,
  maxDrive,
  onMaxDriveChange,
  maxSa,
  onMaxSaChange,
  matchingCount,
  onReset,
}: LethalCalculatorProps) {
  const presets = [
    { label: '2,000 (瀕死・ドット)', value: 2000 },
    { label: '3,000 (1コンボ圏内)', value: 3000 },
    { label: '4,500 (体力半分)', value: 4500 },
    { label: '5,000+ (大逆転SA3)', value: 5000 },
  ];

  const isFiltered = targetHp > 0 || maxDrive < 6 || maxSa < 3;

  return (
    <div className="bg-gradient-to-r from-neutral-900 to-slate-900 text-white rounded-2xl p-4 sm:p-5 shadow-lg border border-neutral-800">
      {/* タイトル行 */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400">
            <Flame className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold flex items-center gap-1.5">
              リーサル逆引き計算機
              <span className="text-[10px] font-normal px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                相手HPから即座に抽出
              </span>
            </h2>
            <p className="text-[11px] text-neutral-400">
              対戦相手の残り体力を入力すると、今の手持ちリソースで倒し切れるコンボを逆引きします
            </p>
          </div>
        </div>

        {isFiltered && (
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1 text-[11px] text-neutral-400 hover:text-white bg-neutral-800 hover:bg-neutral-700 px-2.5 py-1 rounded-lg border border-neutral-700 transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            リセット
          </button>
        )}
      </div>

      {/* HP入力 & プリセットボタン */}
      <div className="space-y-3 bg-neutral-800/60 p-3 rounded-xl border border-neutral-700/60">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <label className="text-xs font-bold text-neutral-300 flex items-center gap-1.5">
            <span>🎯 相手の残り体力:</span>
            <span className="font-mono text-base font-black text-rose-400">
              {targetHp > 0 ? `${targetHp.toLocaleString()} DMG` : '全コンボ表示中'}
            </span>
          </label>

          <div className="flex items-center gap-2">
            <input
              type="range"
              min="0"
              max="6000"
              step="100"
              value={targetHp}
              onChange={(e) => onTargetHpChange(Number(e.target.value))}
              className="w-36 sm:w-48 accent-rose-500 cursor-pointer"
            />
            <input
              type="number"
              min="0"
              max="10000"
              step="100"
              placeholder="直接入力"
              value={targetHp === 0 ? '' : targetHp}
              onChange={(e) => onTargetHpChange(Number(e.target.value) || 0)}
              className="w-20 px-2 py-1 text-xs font-mono bg-neutral-900 border border-neutral-700 rounded text-white text-right focus:outline-none focus:border-rose-500"
            />
          </div>
        </div>

        {/* プリセットチップ */}
        <div className="flex flex-wrap gap-1.5">
          {presets.map((p) => (
            <button
              key={p.value}
              type="button"
              onClick={() => onTargetHpChange(p.value)}
              className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
                targetHp === p.value
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700 border border-neutral-700'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* 手持ちリソースフィルター（Dゲージ上限 & SAゲージ上限） */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3 text-xs">
        {/* Dゲージ上限 */}
        <div className="bg-neutral-800/40 p-2.5 rounded-xl border border-neutral-700/50 flex items-center justify-between">
          <span className="text-neutral-400 font-medium">使用可能 Dゲージ:</span>
          <div className="flex items-center gap-1">
            {[0, 1, 2, 3, 4, 5, 6].map((bars) => (
              <button
                key={bars}
                type="button"
                onClick={() => onMaxDriveChange(bars)}
                className={`w-6 h-6 rounded text-[11px] font-bold flex items-center justify-center transition-colors cursor-pointer ${
                  maxDrive === bars
                    ? 'bg-emerald-500 text-white font-black'
                    : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
                }`}
              >
                {bars}
              </button>
            ))}
          </div>
        </div>

        {/* SAゲージ上限 */}
        <div className="bg-neutral-800/40 p-2.5 rounded-xl border border-neutral-700/50 flex items-center justify-between">
          <span className="text-neutral-400 font-medium">使用可能 SAゲージ:</span>
          <div className="flex items-center gap-1">
            {[0, 1, 2, 3].map((sa) => (
              <button
                key={sa}
                type="button"
                onClick={() => onMaxSaChange(sa)}
                className={`px-2 h-6 rounded text-[11px] font-bold flex items-center justify-center transition-colors cursor-pointer ${
                  maxSa === sa
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black'
                    : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
                }`}
              >
                {sa === 0 ? 'なし' : `SA${sa}`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 逆引きヒット結果バー */}
      <div className="mt-3 pt-2.5 border-t border-neutral-800 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-neutral-300">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>
            倒し切り可能レシピ:{' '}
            <strong className="text-white text-sm font-mono">{matchingCount}</strong> 件
          </span>
        </div>
        {targetHp > 0 && (
          <span className="text-[11px] text-rose-300">
            ※ {targetHp.toLocaleString()} 以上のダメージコンボをハイライト中
          </span>
        )}
      </div>
    </div>
  );
}
