'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { X, Target, Flame, ChevronRight, CheckCircle2 } from 'lucide-react';

interface DemoCombo {
  id: string;
  name: string;
  position: '画面中央' | '画面端';
  starter: string;
  damage: number;
  driveCost: number;
  saCost: number;
  classicRecipe: string;
  modernRecipe: string;
  note: string;
}

const DEMO_COMBOS: DemoCombo[] = [
  {
    id: '1',
    name: '小技始動 基本ラッシュコンボ',
    position: '画面中央',
    starter: '弱攻撃始動',
    damage: 2620,
    driveCost: 3,
    saCost: 0,
    classicRecipe: '屈弱K > 屈弱P > ラッシュ屈弱P > 屈中P > 強竜巻旋風脚',
    modernRecipe: '下弱 > 下弱 > ラッシュ下弱 > 下中 > 強竜巻旋風脚',
    note: '相手の暴れ潰しや下段からのノーゲージSA削り切り。',
  },
  {
    id: '2',
    name: '中足ラッシュ SA1リーサル',
    position: '画面中央',
    starter: '中技始動',
    damage: 3480,
    driveCost: 3,
    saCost: 1,
    classicRecipe: '屈中K > OD足刀波 > 強昇竜拳 > SA1（真空波動拳）',
    modernRecipe: '下中 > OD足刀波 > 強昇竜拳 > SA1',
    note: '中距離の差し返しや刺さりから確実に仕留める中火力ルート。',
  },
  {
    id: '3',
    name: '立ち大P確反 OD竜巻 SA2フィニッシュ',
    position: '画面中央',
    starter: '大技・無敵技ガード後',
    damage: 4250,
    driveCost: 2,
    saCost: 2,
    classicRecipe: '強P(パニカン) > 前強P > 弱竜巻旋風脚 > SA2（真・昇竜拳2段止め）',
    modernRecipe: '強(パニカン) > 前強 > 弱竜巻旋風脚 > SA2',
    note: '相手の無敵技ガード後などにDゲージを温存しつつ高火力を奪うルート。',
  },
  {
    id: '4',
    name: '中足ラッシュ SA3最大リーサル',
    position: '画面中央',
    starter: '中技始動',
    damage: 4890,
    driveCost: 3,
    saCost: 3,
    classicRecipe: '屈中K > ラッシュ屈中P > 立ち強P > キャンセルラッシュ屈強P > 強足刀波 > 強昇竜拳 > SA3（真・昇竜拳）',
    modernRecipe: '下中 > ラッシュ下中 > 強 > キャンセルラッシュ下強 > 強足刀波 > 強昇竜拳 > SA3',
    note: '体力半分（約4,800）から一撃で勝負を決める中足始動の絶対的勝ち筋。',
  },
  {
    id: '5',
    name: '画面端インパクト壁ドン SA3フルコース',
    position: '画面端',
    starter: 'インパクト・壁ドン始動',
    damage: 5540,
    driveCost: 3,
    saCost: 3,
    classicRecipe: 'DI壁ドン > 立ち強P > OD波掌撃 > 前強P > 強昇竜拳 > SA3（CA）',
    modernRecipe: 'DI壁ドン > 強 > OD波掌撃 > 前強 > 強昇竜拳 > SA3（CA）',
    note: '画面端に追い詰めた際の最大破壊力。5,500以上の体力を一瞬で消滅させます。',
  },
  {
    id: '6',
    name: '無敵技ガード後 パニカンフルリソース（即死級）',
    position: '画面端',
    starter: '無敵技ガード後',
    damage: 6420,
    driveCost: 6,
    saCost: 3,
    classicRecipe: '強P(PC) > ラッシュ前強P > 屈強P > キャンセルラッシュ強P > 屈強P > OD波掌撃 > 強昇竜拳 > CA',
    modernRecipe: '強(PC) > ラッシュ前強 > 下強 > キャンセルラッシュ強 > 下強 > OD波掌撃 > 強昇竜拳 > CA',
    note: '相手の昇竜やSAガード後の最大確定反撃。6,000以上の体力を奪い切ります。',
  },
];

interface LethalToolPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LethalToolPreviewModal({ isOpen, onClose }: LethalToolPreviewModalProps) {
  const [selectedHp, setSelectedHp] = useState<number>(4500);
  const [controlType, setControlType] = useState<'classic' | 'modern'>('classic');
  const [maxDrive, setMaxDrive] = useState<number>(6);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const matchingCombos = useMemo(() => {
    return DEMO_COMBOS.filter((c) => {
      if (c.damage < selectedHp) return false;
      if (c.driveCost > maxDrive) return false;
      return true;
    }).sort((a, b) => a.damage - b.damage);
  }, [selectedHp, maxDrive]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-modal-backdrop"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl max-h-[92vh] bg-white dark:bg-[#121721] rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-2xl flex flex-col overflow-hidden text-neutral-900 dark:text-neutral-100 animate-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ヘッダー */}
        <div className="p-4 sm:p-5 border-b border-neutral-100 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-900/60 flex items-start justify-between gap-3 shrink-0">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 flex items-center justify-center shrink-0 mt-0.5">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-cyan-500 text-white dark:text-neutral-950 uppercase tracking-wider">
                  WEB限定機能
                </span>
                <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">体験プレビュー</span>
              </div>
              <h2 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white mt-1">
                相手残りHPから倒し切る「逆引きリーサルツール」
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="閉じる"
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-200/50 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* コンテンツ本文 */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-xs">
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-[11px] sm:text-xs">
            相手の残りHPや手持ちリソースを選択するだけで、倒し切れる最適コンボを瞬時に算出します。以下をタップしてお試しいただけます：
          </p>

          {/* コントロールパネル */}
          <div className="p-3 sm:p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-900/70 border border-neutral-200/80 dark:border-neutral-800/80 space-y-3">
            {/* ① 相手残りHP */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-rose-500" />
                  相手の残りHP（削りたい体力）
                </span>
                <span className="font-mono font-black text-rose-600 dark:text-rose-400 text-sm">
                  {selectedHp.toLocaleString()} HP
                </span>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {[2500, 3500, 4500, 6000].map((hp) => (
                  <button
                    key={hp}
                    type="button"
                    onClick={() => setSelectedHp(hp)}
                    className={`py-1.5 rounded-lg font-bold text-[11px] transition-all cursor-pointer text-center ${
                      selectedHp === hp
                        ? 'bg-rose-500 text-white shadow-xs font-black'
                        : 'bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                    }`}
                  >
                    {hp.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            {/* ② 操作タイプ & Dゲージ */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-neutral-200/60 dark:border-neutral-800">
              <div>
                <span className="text-[10px] font-semibold text-neutral-500 dark:text-neutral-400 block mb-1">
                  操作タイプ
                </span>
                <div className="flex rounded-lg bg-neutral-200 dark:bg-neutral-800 p-0.5 text-[11px] font-bold">
                  <button
                    type="button"
                    onClick={() => setControlType('classic')}
                    className={`flex-1 py-1 rounded-md transition-all cursor-pointer ${
                      controlType === 'classic'
                        ? 'bg-purple-600 text-white shadow-xs'
                        : 'text-neutral-600 dark:text-neutral-400'
                    }`}
                  >
                    クラシック
                  </button>
                  <button
                    type="button"
                    onClick={() => setControlType('modern')}
                    className={`flex-1 py-1 rounded-md transition-all cursor-pointer ${
                      controlType === 'modern'
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'text-neutral-600 dark:text-neutral-400'
                    }`}
                  >
                    モダン
                  </button>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-[10px] font-semibold text-neutral-500 dark:text-neutral-400 mb-1">
                  <span>使えるDゲージ</span>
                  <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400">{maxDrive}本まで</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  {[2, 3, 6].map((drive) => (
                    <button
                      key={drive}
                      type="button"
                      onClick={() => setMaxDrive(drive)}
                      className={`py-1 rounded-md font-bold text-[10px] transition-all cursor-pointer text-center ${
                        maxDrive === drive
                          ? 'bg-cyan-500 text-white font-black'
                          : 'bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400'
                      }`}
                    >
                      {drive === 6 ? '最大6本' : `${drive}本`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 検索結果（おすすめリーサルコンボ） */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                倒し切れるリーサルコンボ（{matchingCombos.length}件ヒット）
              </span>
              <span className="text-[10px] text-neutral-400 font-mono">
                {selectedHp.toLocaleString()} HP 以上
              </span>
            </div>

            {matchingCombos.length === 0 ? (
              <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-center text-neutral-500">
                条件に合うコンボがありません。Dゲージ上限を増やしてみてください。
              </div>
            ) : (
              <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1">
                {matchingCombos.map((combo) => {
                  const overkill = combo.damage - selectedHp;
                  return (
                    <div
                      key={combo.id}
                      className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 shadow-2xs hover:border-cyan-400/80 dark:hover:border-cyan-600/80 transition-all space-y-2"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-bold text-neutral-900 dark:text-white text-xs">
                            {combo.name}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 font-medium">
                            {combo.position}
                          </span>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="font-mono font-black text-xs text-emerald-600 dark:text-emerald-400">
                            {combo.damage.toLocaleString()} DMG
                          </div>
                          {overkill >= 0 && (
                            <div className="text-[9px] font-bold text-cyan-600 dark:text-cyan-400">
                              +{overkill.toLocaleString()} 余裕
                            </div>
                          )}
                        </div>
                      </div>

                      {/* レシピ */}
                      <div className="p-2 rounded-lg bg-neutral-50 dark:bg-neutral-800/60 font-mono text-[11px] text-neutral-800 dark:text-neutral-200 leading-snug break-words border border-neutral-100 dark:border-neutral-700/60">
                        {controlType === 'classic' ? combo.classicRecipe : combo.modernRecipe}
                      </div>

                      {/* コストと解説 */}
                      <div className="flex items-center justify-between text-[10px] text-neutral-500 dark:text-neutral-400 pt-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-cyan-600 dark:text-cyan-400 font-semibold">
                            Dゲージ: {combo.driveCost}本
                          </span>
                          <span>•</span>
                          <span className="text-purple-600 dark:text-purple-400 font-semibold">
                            SAゲージ: {combo.saCost}本
                          </span>
                        </div>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold">
                          リーサル確定 🎯
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* フッター */}
        <div className="p-4 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-900/60 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <p className="text-[11px] text-neutral-500 dark:text-neutral-400 text-center sm:text-left leading-tight">
            実際の攻略記事内では、全キャラ・全始動技・詐欺飛び起き攻めまで完全網羅されています。
          </p>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-semibold text-neutral-700 dark:text-neutral-300 transition-colors cursor-pointer"
            >
              閉じる
            </button>
            <Link
              href="/articles/sf6-ryu"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1 px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold transition-colors shadow-xs"
            >
              <span>リュウ完全攻略で使う</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
