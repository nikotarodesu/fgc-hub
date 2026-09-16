'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { X, Flame, ChevronRight, Sparkles, CheckCircle2, Gauge, Zap } from 'lucide-react';
import InteractiveComboRow from './InteractiveComboRow';

interface LethalComboItem {
  id: string;
  label: string;
  targetHpThreshold: number;
  damage: number;
  driveCost: number;
  saCost: number;
  recipe: string;
}

// https://nikotaro.com/articles/ryu-complete-guide (ryuClassicCompleteGuide.ts) に実在するクラシックコンボ
const RYU_CLASSIC_LETHAL_COMBOS: LethalComboItem[] = [
  {
    id: 'hp-2500',
    label: '2,500 HP帯',
    targetHpThreshold: 2500,
    damage: 2610,
    driveCost: 2,
    saCost: 0,
    recipe: '● 下中P>OD足刀>引大K>強昇竜〆（2610）+37',
  },
  {
    id: 'hp-3500',
    label: '3,500 HP帯',
    targetHpThreshold: 3500,
    damage: 3650,
    driveCost: 2,
    saCost: 2,
    recipe: '● 下中P>OD足刀>SA2（lv3）〆（3650）+82-90',
  },
  {
    id: 'hp-4200',
    label: '4,200 HP帯',
    targetHpThreshold: 4200,
    damage: 4247,
    driveCost: 3,
    saCost: 3,
    recipe: '● 弱K>キャンセルラッシュ弱P>引大P>キャンセル大K>大P>強昇竜>SA3〆（4247）',
  },
  {
    id: 'hp-5000',
    label: '5,000 HP帯',
    targetHpThreshold: 5000,
    damage: 5772,
    driveCost: 3,
    saCost: 3,
    recipe: '● 大P（Pc）>強波掌撃>ラッシュ引大K>キャンセル引大K>キャンセル引大K>強昇龍>SA3〆（5772）',
  },
];

interface LethalToolPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LethalToolPreviewModal({ isOpen, onClose }: LethalToolPreviewModalProps) {
  const [selectedHp, setSelectedHp] = useState<number>(4200);

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

  // 2,500〜5,000の体力バーに応じて各1つずつのみコンボを抽出
  const currentCombo = useMemo(() => {
    if (selectedHp <= 2800) {
      return RYU_CLASSIC_LETHAL_COMBOS[0]; // 2500帯
    } else if (selectedHp <= 3800) {
      return RYU_CLASSIC_LETHAL_COMBOS[1]; // 3500帯
    } else if (selectedHp <= 4600) {
      return RYU_CLASSIC_LETHAL_COMBOS[2]; // 4200帯
    } else {
      return RYU_CLASSIC_LETHAL_COMBOS[3]; // 5000帯
    }
  }, [selectedHp]);

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
        {/* ヘッダー：リュウのツールであることが一目でわかる */}
        <div className="p-4 sm:p-5 border-b border-neutral-100 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-900/60 flex items-start justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative w-11 h-11 rounded-xl overflow-hidden border-2 border-blue-600 shadow-sm shrink-0 bg-neutral-900">
              <img
                src="/images/characters/ryu/sns.jpg"
                alt="リュウ"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black px-2 py-0.5 rounded bg-blue-600 text-white uppercase tracking-wider">
                  リュウ（C）専用
                </span>
                <span className="text-[11px] text-neutral-500 dark:text-neutral-400 font-mono">
                  体験プレビュー
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white mt-1">
                リュウの「逆引きリーサルツール」体験
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
            対戦相手の残り体力（2,500〜5,000 HP）に合わせて、リュウが倒し切るために必要なリソース（Dゲージ・SA使用量）と最適リーサルコンボを瞬時に逆引きします：
          </p>

          {/* 2,500〜5,000 体力バースライダー ＆ プリセット */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/70 border border-neutral-200/80 dark:border-neutral-800/80 space-y-3.5">
            {/* 体力バー表示ヘッダー */}
            <div className="flex items-center justify-between">
              <span className="font-bold text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5 text-xs">
                <Flame className="w-4 h-4 text-rose-500" />
                相手の残り体力バー（削りたいHP目安）
              </span>
              <span className="font-mono font-black text-rose-600 dark:text-rose-400 text-base">
                {selectedHp.toLocaleString()} HP
              </span>
            </div>

            {/* スライダー */}
            <div className="space-y-1">
              <input
                type="range"
                min={2500}
                max={5000}
                step={100}
                value={selectedHp}
                onChange={(e) => setSelectedHp(Number(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer h-2 bg-neutral-200 dark:bg-neutral-800 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-neutral-400 font-mono">
                <span>2,500 HP</span>
                <span>3,500 HP</span>
                <span>4,200 HP</span>
                <span>5,000 HP</span>
              </div>
            </div>

            {/* 各体力帯のクイック選択ボタン */}
            <div className="grid grid-cols-4 gap-1.5 pt-1">
              {[
                { label: '2,500 HP', val: 2500 },
                { label: '3,500 HP', val: 3500 },
                { label: '4,200 HP', val: 4200 },
                { label: '5,000 HP', val: 5000 },
              ].map((item) => {
                const isActive =
                  (item.val === 2500 && selectedHp <= 2800) ||
                  (item.val === 3500 && selectedHp > 2800 && selectedHp <= 3800) ||
                  (item.val === 4200 && selectedHp > 3800 && selectedHp <= 4600) ||
                  (item.val === 5000 && selectedHp > 4600);

                return (
                  <button
                    key={item.val}
                    type="button"
                    onClick={() => setSelectedHp(item.val)}
                    className={`py-1.5 px-1 rounded-lg text-center text-[11px] font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-rose-500 text-white shadow-xs font-black'
                        : 'bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 抽出されたリーサルコンボ（各体力帯につき厳選1件のみ） */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-neutral-800 dark:text-neutral-200 text-xs flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                {currentCombo.label}のリーサルコンボ
              </span>
              <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                {currentCombo.damage.toLocaleString()} DMG
              </span>
            </div>

            {/* Dゲージ使用量 ＆ SA使用量 バッジ */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-[11px] font-bold">
                <Gauge className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Dゲージ使用量: {currentCombo.driveCost}本</span>
              </div>

              <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800 text-[11px] font-bold">
                <Zap className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                <span>SA使用量: {currentCombo.saCost === 0 ? '0本（未使用）' : `SA${currentCombo.saCost}（${currentCombo.saCost}本）`}</span>
              </div>
            </div>

            {/* 完全攻略記事と100%同一のコンボコンポーネント（InteractiveComboRow） */}
            <InteractiveComboRow
              comboLine={currentCombo.recipe}
              controlType="classic"
            />

            {/* 記事購入後はDゲージ・SAゲージ使用量からも逆引き検索できる案内バナー */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-gradient-to-br from-neutral-50 to-cyan-50/40 dark:from-neutral-900/90 dark:to-cyan-950/20 border border-cyan-200/80 dark:border-cyan-800/80 text-xs space-y-2.5 mt-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 font-bold text-neutral-900 dark:text-white text-xs sm:text-[13px]">
                  <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                  <span>体験プレビュー（各体力帯1件のみ公開中）</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 border border-cyan-300/60 dark:border-cyan-800">
                  D/SAゲージ逆引きは記事限定
                </span>
              </div>

              <p className="text-[11px] sm:text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                ※本プレビューでは無料体験として代表的な1件ずつのみを表示しています。<strong>記事のご購入後（またはプレミアム会員にご登録後）は、相手の残りHPだけでなく「使えるDゲージ本数」や「SAゲージ本数」の条件を指定した逆引き検索が可能になり、</strong>小技始動・中足始動・強Pパニカン・画面端壁ドン・電刃錬気など、あらゆる状況に応じた全リーサルコンボを自由に検索・閲覧いただけます。
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-neutral-200/60 dark:border-neutral-800/80 pt-2.5">
                <span className="text-[11px] text-neutral-500 dark:text-neutral-400">
                  永久アップデート保証付き（¥500）
                </span>
                <Link
                  href="/articles/ryu-complete-guide"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs transition-colors shadow-xs"
                >
                  <span>完全攻略記事ですべてのコンボを見る</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* フッター */}
        <div className="p-4 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-900/60 flex items-center justify-between gap-3 shrink-0">
          <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-tight">
            リュウ完全攻略：全シチュエーション別コンボ・起き攻めデータ網羅
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-semibold text-neutral-700 dark:text-neutral-300 transition-colors cursor-pointer shrink-0"
            >
              閉じる
            </button>
            <Link
              href="/articles/ryu-complete-guide"
              className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold text-xs hover:opacity-90 transition-opacity shadow-xs shrink-0"
            >
              <span>記事を見る</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
