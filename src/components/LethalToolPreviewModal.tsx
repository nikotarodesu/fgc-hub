'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { X, Target, Flame, ChevronRight, Sparkles } from 'lucide-react';
import InteractiveComboRow from './InteractiveComboRow';

interface LethalComboData {
  id: string;
  damage: number;
  driveCost: number;
  classicLine: string;
  modernLine: string;
}

// 完全攻略記事で実際に掲載されているリーサルコンボ
const LETHAL_DEMO_COMBOS: LethalComboData[] = [
  {
    id: 'light-rush',
    damage: 2620,
    driveCost: 3,
    classicLine: '▶︎ 屈弱K>屈弱P>ラッシュ屈弱P>屈中P>強竜巻旋風脚（2620）',
    modernLine: '▶︎ 下弱>下弱>ラッシュ下弱>下中>強竜巻旋風脚（2620）',
  },
  {
    id: 'medium-sa1',
    damage: 3480,
    driveCost: 3,
    classicLine: '▶︎ 屈中K>OD足刀波>強昇竜拳>SA1（3480）+24',
    modernLine: '▶︎ 下中>OD足刀波>強昇竜拳>SA1（3480）+24',
  },
  {
    id: 'heavy-sa2',
    damage: 4250,
    driveCost: 2,
    classicLine: '▶︎ 強P(パニカン)>前強P>弱竜巻旋風脚>SA2（4250）',
    modernLine: '▶︎ 強(パニカン)>前強>弱竜巻旋風脚>SA2（4250）',
  },
  {
    id: 'medium-sa3',
    damage: 4890,
    driveCost: 3,
    classicLine: '▶︎ 屈中K>ラッシュ屈中P>立ち強P>キャンセルラッシュ屈強P>強足刀波>強昇竜拳>SA3（4890）',
    modernLine: '▶︎ 下中>ラッシュ下中>強>キャンセルラッシュ下強>強足刀波>強昇竜拳>SA3（4890）',
  },
  {
    id: 'heavy-corner-sa3',
    damage: 5726,
    driveCost: 3,
    classicLine: '▶︎ ラッシュ下大P>キャンセル下大P>強足刀>強昇竜>SA3〆（5726）',
    modernLine: '▶︎ ラッシュ下大>キャンセル下大>強足刀>強昇竜>SA3〆（5622）',
  },
  {
    id: 'punish-max-ca',
    damage: 6420,
    driveCost: 6,
    classicLine: '▶︎ 強P(PC)>ラッシュ前強P>屈強P>キャンセルラッシュ強P>屈強P>OD波掌撃>強昇竜拳>CA（6420）',
    modernLine: '▶︎ 強(PC)>ラッシュ前強>下強>キャンセルラッシュ強>下強>OD波掌撃>強昇竜拳>CA（6420）',
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

  // 1件のみヒットさせる（倒し切れる最小ダメージの最適コンボを1件抽出）
  const targetCombo = useMemo(() => {
    const validCombos = LETHAL_DEMO_COMBOS.filter((c) => {
      if (c.damage < selectedHp) return false;
      if (c.driveCost > maxDrive) return false;
      return true;
    }).sort((a, b) => a.damage - b.damage);

    return validCombos[0] || null;
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
                <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">無料体験プレビュー</span>
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

          {/* 検索結果（1件のみ表示） */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-neutral-800 dark:text-neutral-200 text-xs">
                算出されたリーサルコンボ（おすすめ1件）
              </span>
              <span className="text-[10px] text-neutral-400 font-mono">
                {selectedHp.toLocaleString()} HP 以上
              </span>
            </div>

            {targetCombo ? (
              <div className="space-y-3">
                {/* リュウ完全攻略記事と同一仕様のコンボ行 */}
                <InteractiveComboRow
                  comboLine={controlType === 'classic' ? targetCombo.classicLine : targetCombo.modernLine}
                  controlType={controlType}
                />

                {/* 記事購入後は全コンボ検索可能の案内バナー */}
                <div className="p-3.5 sm:p-4 rounded-xl bg-gradient-to-br from-neutral-50 to-cyan-50/40 dark:from-neutral-900/90 dark:to-cyan-950/20 border border-cyan-200/80 dark:border-cyan-800/80 text-xs space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 font-bold text-neutral-900 dark:text-white text-xs sm:text-[13px]">
                      <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                      <span>体験プレビュー（1件のみ表示中）</span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 border border-cyan-300/60 dark:border-cyan-800">
                      全コンボは記事限定
                    </span>
                  </div>

                  <p className="text-[11px] sm:text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    ※本プレビューでは体験版として代表的な1件のみを表示しています。<strong>リュウ完全攻略記事（単体購入またはプレミアム会員）</strong>では、小技始動・中足始動・強Pパニカン・画面端壁ドン・電刃錬気など、<strong>すべての状況に対応した全コンボを無制限に逆引き検索・閲覧</strong>いただけます。
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-neutral-200/60 dark:border-neutral-800/80 pt-2.5">
                    <span className="text-[11px] text-neutral-500 dark:text-neutral-400">
                      永久アップデート保証付き（¥500）
                    </span>
                    <Link
                      href="/articles/sf6-ryu"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs transition-colors shadow-xs"
                    >
                      <span>完全攻略記事ですべてのコンボを見る</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-center text-neutral-500 space-y-1">
                <p className="font-bold text-neutral-700 dark:text-neutral-300 text-xs">
                  条件に一致するコンボがありません
                </p>
                <p className="text-[11px] text-neutral-400">
                  Dゲージ上限を増やすか、相手の残りHPを変更してお試しください。
                </p>
              </div>
            )}
          </div>
        </div>

        {/* フッター */}
        <div className="p-4 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-900/60 flex items-center justify-between gap-3 shrink-0">
          <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-tight">
            全キャラ1800MR以上視点の実戦コンボ・起き攻めデータ完全網羅
          </p>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-semibold text-neutral-700 dark:text-neutral-300 transition-colors cursor-pointer shrink-0"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
}
