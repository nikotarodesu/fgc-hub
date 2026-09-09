'use client';

import React, { useState, useMemo } from 'react';
import {
  ArticleComboItem,
  POSITION_OPTIONS,
  STARTER_CATEGORY_OPTIONS,
  LETHAL_DAMAGE_PRESETS,
  RYU_ARTICLE_COMBOS,
} from '@/data/articles/ryuCombosData';
import InteractiveComboRow from '@/components/InteractiveComboRow';
import {
  Search,
  Filter,
  Flame,
  Zap,
  ArrowDown,
  RotateCcw,
  Sparkles,
  Lock,
  ChevronDown,
  ChevronUp,
  Layers,
  Gauge,
  SlidersHorizontal,
  MapPin,
} from 'lucide-react';

interface ArticleComboReverseLookupProps {
  controlType: 'classic' | 'modern';
  isUnlocked: boolean;
  onScrollToPaywall?: () => void;
}

export default function ArticleComboReverseLookup({
  controlType,
  isUnlocked,
  onScrollToPaywall,
}: ArticleComboReverseLookupProps) {
  const [selectedPosition, setSelectedPosition] = useState<string>('all');
  const [selectedStarter, setSelectedStarter] = useState<string>('all');
  const [targetDamage, setTargetDamage] = useState<number>(0);
  const [maxDriveCost, setMaxDriveCost] = useState<number>(6);
  const [maxSaCost, setMaxSaCost] = useState<number>(3);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [expandedCombos, setExpandedCombos] = useState<Record<string, boolean>>({});

  // フィルタリング処理
  const filteredCombos = useMemo(() => {
    return RYU_ARTICLE_COMBOS.filter((c) => {
      // ステージ状況・位置（画面中央 / 画面端 / スタン）
      if (selectedPosition !== 'all') {
        if (selectedPosition === 'stun') {
          if (c.position !== 'stun' && c.starterCategory !== 'stun') return false;
        } else if (c.position !== selectedPosition && c.position !== 'any') {
          return false;
        }
      }
      // 始動技
      if (selectedStarter !== 'all' && c.starterCategory !== selectedStarter) {
        return false;
      }
      // 必要ダメージ（リーサル逆引き）
      if (targetDamage > 0 && c.damage < targetDamage) {
        return false;
      }
      // Dゲージ消費上限
      if (c.driveCost > maxDriveCost) {
        return false;
      }
      // SAゲージ消費上限
      if (c.saCost > maxSaCost) {
        return false;
      }
      // キーワード検索
      if (searchKeyword.trim()) {
        const kw = searchKeyword.trim().toLowerCase();
        const matchClassic = c.classicRecipe.toLowerCase().includes(kw);
        const matchModern = c.modernRecipe.toLowerCase().includes(kw);
        const matchName = c.name.toLowerCase().includes(kw);
        const matchNote = c.note.toLowerCase().includes(kw);
        if (!matchClassic && !matchModern && !matchName && !matchNote) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      // リーサル指定時はダメージ降順
      if (targetDamage > 0) {
        return b.damage - a.damage;
      }
      return 0;
    });
  }, [selectedPosition, selectedStarter, targetDamage, maxDriveCost, maxSaCost, searchKeyword]);

  const isFilterActive =
    selectedPosition !== 'all' ||
    selectedStarter !== 'all' ||
    targetDamage > 0 ||
    maxDriveCost < 6 ||
    maxSaCost < 3 ||
    searchKeyword.length > 0;

  const handleReset = () => {
    setSelectedPosition('all');
    setSelectedStarter('all');
    setTargetDamage(0);
    setMaxDriveCost(6);
    setMaxSaCost(3);
    setSearchKeyword('');
  };

  const toggleExpand = (id: string) => {
    setExpandedCombos((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // 記事本文の該当箇所へスムーズスクロール
  const handleJumpToArticleText = (targetText: string) => {
    const allElements = Array.from(document.querySelectorAll('div, h4, li, p'));
    const targetEl = allElements.find(
      (el) => el.textContent && el.textContent.includes(targetText) && el.children.length <= 2
    );
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // 一時的なハイライトアニメーション
      targetEl.classList.add('ring-2', 'ring-cyan-500', 'bg-cyan-50/50', 'dark:bg-cyan-950/40', 'transition-all');
      setTimeout(() => {
        targetEl.classList.remove('ring-2', 'ring-cyan-500', 'bg-cyan-50/50', 'dark:bg-cyan-950/40');
      }, 2500);
    }
  };

  // 未購入時のプレビュー表示
  if (!isUnlocked) {
    return (
      <div className="my-6 rounded-2xl border border-amber-300 dark:border-amber-800/80 bg-gradient-to-br from-amber-50/90 via-amber-100/40 to-neutral-50 dark:from-amber-950/30 dark:via-neutral-900/60 dark:to-neutral-900 p-4 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0 mt-0.5">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-500 text-white uppercase tracking-wider">
                  購入者限定機能
                </span>
                <span className="font-bold text-sm sm:text-base text-neutral-900 dark:text-white">
                  実戦コンボ逆引きデータベース
                </span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 leading-relaxed">
                始動状況（弱・中・大・シミー・インパクト等）や相手の残りHP・手持ちゲージに応じた<strong>リーサル逆引き検索</strong>が利用可能です。記事購入後に全機能がアンロックされます。
              </p>
            </div>
          </div>
          {onScrollToPaywall && (
            <button
              type="button"
              onClick={onScrollToPaywall}
              className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900 text-xs font-bold transition-all shadow-xs shrink-0 self-stretch sm:self-auto cursor-pointer"
            >
              記事を購入してアンロック
            </button>
          )}
        </div>

        {/* プレビュー風のダミーチップ群 */}
        <div className="mt-4 pt-3 border-t border-amber-200/60 dark:border-amber-900/40 flex flex-wrap gap-1.5 opacity-70 pointer-events-none select-none">
          <span className="text-[11px] px-2.5 py-1 rounded-lg bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-bold">
            画面中央コンボ
          </span>
          <span className="text-[11px] px-2.5 py-1 rounded-lg bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-bold">
            画面端限定コンボ
          </span>
          <span className="text-[11px] px-2.5 py-1 rounded-lg bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-bold">
            スタン最大リーサル
          </span>
          <span className="text-[11px] px-2.5 py-1 rounded-lg bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-bold">
            7,171 最大ダメージ逆引き
          </span>
        </div>
      </div>
    );
  }

  // 購入者向けフル機能ウィジェット
  return (
    <section aria-label="実戦コンボ逆引きデータベース" className="my-6 rounded-2xl border-2 border-cyan-500/30 dark:border-cyan-500/40 bg-white dark:bg-neutral-900 shadow-md overflow-hidden">
      {/* ツールヘッダー */}
      <div className="bg-gradient-to-r from-neutral-900 via-neutral-850 to-neutral-900 text-white p-3.5 sm:p-4 border-b border-neutral-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base tracking-tight text-white flex items-center gap-1.5">
                  実戦コンボ逆引きデータベース
                </h3>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-cyan-500 text-neutral-950 uppercase tracking-wider">
                  PREMIUM
                </span>
                <span className="text-[10px] text-cyan-300 font-mono hidden sm:inline">
                  {controlType === 'classic' ? '🥋 クラシック対応' : '⚡️ モダン対応'}
                </span>
              </div>
              <p className="text-[11px] text-neutral-300 mt-0.5">
                始動状況・相手残りHP（リーサル）・使用ゲージから今必要なコンボを即時抽出
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0">
            <span className="text-xs text-neutral-300 font-mono bg-white/10 px-2.5 py-1 rounded-lg">
              該当 <strong className="text-cyan-400 font-black text-sm">{filteredCombos.length}</strong> / {RYU_ARTICLE_COMBOS.length} 件
            </span>
            {isFilterActive && (
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/15 hover:bg-white/25 text-[11px] font-semibold text-white transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>リセット</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* フィルターコントロール群 */}
      <div className="p-3 sm:p-4 space-y-3.5 bg-neutral-50/70 dark:bg-neutral-900/90 border-b border-neutral-200/80 dark:border-neutral-800">
        {/* 0. ステージ状況・位置タブ（画面中央 / 画面端 / スタン） */}
        <div className="pb-3 border-b border-neutral-200/80 dark:border-neutral-800">
          <div className="flex items-center gap-1.5 mb-2 text-xs font-bold text-neutral-700 dark:text-neutral-300">
            <MapPin className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>ステージ状況・位置で表示切替:</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {POSITION_OPTIONS.map((pos) => {
              const active = selectedPosition === pos.id;
              const count =
                pos.id === 'all'
                  ? RYU_ARTICLE_COMBOS.length
                  : pos.id === 'stun'
                  ? RYU_ARTICLE_COMBOS.filter((c) => c.position === 'stun' || c.starterCategory === 'stun').length
                  : RYU_ARTICLE_COMBOS.filter((c) => c.position === pos.id || c.position === 'any').length;

              return (
                <button
                  key={pos.id}
                  type="button"
                  onClick={() => setSelectedPosition(pos.id)}
                  className={`flex items-center justify-between sm:justify-center gap-1.5 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    active
                      ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-md ring-2 ring-cyan-500'
                      : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 hover:border-cyan-500/50 hover:bg-cyan-50/30 dark:hover:bg-cyan-950/20'
                  }`}
                >
                  <span>{pos.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold ${
                      active
                        ? 'bg-white/20 dark:bg-neutral-900/20 text-white dark:text-neutral-900'
                        : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 1. 始動状況チップ（横スクロール可能） */}
        <div>
          <div className="flex items-center gap-1.5 mb-1.5 text-xs font-bold text-neutral-700 dark:text-neutral-300">
            <Layers className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>始動技・状況で絞り込み:</span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 pt-0.5 scrollbar-thin">
            {STARTER_CATEGORY_OPTIONS.map((opt) => {
              const active = selectedStarter === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelectedStarter(opt.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer whitespace-nowrap ${
                    active
                      ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-xs ring-2 ring-cyan-500/50'
                      : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-500'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. リーサル必要ダメージ（クイックプリセット） */}
        <div>
          <div className="flex items-center gap-1.5 mb-1.5 text-xs font-bold text-neutral-700 dark:text-neutral-300">
            <Flame className="w-3.5 h-3.5 text-rose-500" />
            <span>リーサル逆引き（倒し切りに必要なダメージ）:</span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 pt-0.5">
            {LETHAL_DAMAGE_PRESETS.map((preset) => {
              const active = targetDamage === preset.value;
              return (
                <button
                  key={preset.value}
                  type="button"
                  onClick={() => setTargetDamage(preset.value)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer whitespace-nowrap ${
                    active
                      ? 'bg-rose-600 text-white shadow-xs ring-2 ring-rose-400'
                      : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 hover:border-rose-400'
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. ゲージ上限スライダー & キーワード検索 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 border-t border-neutral-200/60 dark:border-neutral-800">
          {/* Dゲージ上限 */}
          <div>
            <div className="flex items-center justify-between text-[11px] font-bold text-neutral-600 dark:text-neutral-400 mb-1">
              <span>Dゲージ消費上限:</span>
              <span className="font-mono text-cyan-600 dark:text-cyan-400 font-black">{maxDriveCost}本まで</span>
            </div>
            <input
              type="range"
              min="0"
              max="6"
              step="1"
              value={maxDriveCost}
              onChange={(e) => setMaxDriveCost(Number(e.target.value))}
              className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-cyan-600"
            />
          </div>

          {/* SAゲージ上限 */}
          <div>
            <div className="flex items-center justify-between text-[11px] font-bold text-neutral-600 dark:text-neutral-400 mb-1">
              <span>SAゲージ消費上限:</span>
              <span className="font-mono text-amber-600 dark:text-amber-400 font-black">Lv.{maxSaCost}まで</span>
            </div>
            <input
              type="range"
              min="0"
              max="3"
              step="1"
              value={maxSaCost}
              onChange={(e) => setMaxSaCost(Number(e.target.value))}
              className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>

          {/* キーワード即時検索 */}
          <div>
            <div className="flex items-center justify-between text-[11px] font-bold text-neutral-600 dark:text-neutral-400 mb-1">
              <span>技名・レシピキーワード:</span>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="足刀, 電刃, 昇竜, 〆..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="w-full px-2.5 py-1 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-cyan-500"
              />
              {searchKeyword && (
                <button
                  type="button"
                  onClick={() => setSearchKeyword('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-neutral-400 hover:text-neutral-700"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 絞り込み結果リスト */}
      <div className="p-3 sm:p-4 space-y-3 max-h-[620px] overflow-y-auto scrollbar-thin">
        {filteredCombos.length === 0 ? (
          <div className="py-8 text-center text-neutral-400 text-xs">
            <p className="font-bold">該当するコンボが見つかりませんでした。</p>
            <p className="mt-1">フィルター条件やダメージ指定を緩和してお試しください。</p>
            <button
              type="button"
              onClick={handleReset}
              className="mt-3 px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-bold text-xs hover:bg-neutral-200 cursor-pointer"
            >
              条件をすべてリセット
            </button>
          </div>
        ) : (
          filteredCombos.map((combo) => {
            const recipe = controlType === 'classic' ? combo.classicRecipe : combo.modernRecipe;
            const isExpanded = !!expandedCombos[combo.id];

            return (
              <div
                key={combo.id}
                className="rounded-xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-850 p-3 sm:p-3.5 shadow-2xs hover:border-cyan-500/50 transition-colors"
              >
                {/* カード上部：始動・ダメージ・ゲージ情報バッジ */}
                <div className="flex flex-wrap items-center justify-between gap-1.5 pb-2 mb-2 border-b border-neutral-100 dark:border-neutral-800 text-xs">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0 ${
                        combo.position === 'corner'
                          ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300/80 dark:border-amber-800'
                          : combo.position === 'stun'
                          ? 'bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 border border-purple-300/80 dark:border-purple-800'
                          : 'bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-cyan-300 border border-sky-300/80 dark:border-sky-800'
                      }`}
                    >
                      {combo.positionLabel}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-bold text-[11px]">
                      {combo.starterLabel}
                    </span>
                    {combo.hasDenjin && (
                      <span className="px-1.5 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 font-bold text-[10px] flex items-center gap-0.5">
                        <Zap className="w-2.5 h-2.5" />
                        電刃
                      </span>
                    )}
                    {combo.isLethal && (
                      <span className="px-1.5 py-0.5 rounded-md bg-rose-100 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 font-bold text-[10px] flex items-center gap-0.5">
                        <Flame className="w-2.5 h-2.5" />
                        リーサル
                      </span>
                    )}
                    <span className="text-[11px] text-neutral-500 dark:text-neutral-400 font-medium">
                      {combo.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 font-mono text-[11px] shrink-0">
                    <span className="font-black text-xs text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">
                      {combo.damage} dmg
                    </span>
                    <span className="text-neutral-500 dark:text-neutral-400">
                      D:{combo.driveCost}本
                    </span>
                    {combo.saCost > 0 && (
                      <span className="text-amber-600 dark:text-amber-400 font-bold">
                        SA{combo.saCost}
                      </span>
                    )}
                  </div>
                </div>

                {/* コンボレシピ行（タップで直感コマンド展開可能） */}
                <div className="mb-2">
                  <InteractiveComboRow
                    comboLine={recipe}
                    controlType={controlType}
                  />
                </div>

                {/* 解説メモ ＆ アクションフッター */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-neutral-100 dark:border-neutral-800/80 text-[11px]">
                  <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed min-w-0">
                    {combo.advantageFrames && (
                      <span className="font-bold text-emerald-600 dark:text-emerald-400 mr-1.5">
                        [{combo.advantageFrames}]
                      </span>
                    )}
                    {combo.note}
                  </p>

                  <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-auto">
                    <button
                      type="button"
                      onClick={() => handleJumpToArticleText(combo.jumpTargetText)}
                      className="px-2.5 py-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 font-bold text-[10px] flex items-center gap-1 transition-colors cursor-pointer"
                      title="記事本文の詳しい解説箇所へスクロール"
                    >
                      <span>記事解説へ</span>
                      <ArrowDown className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
