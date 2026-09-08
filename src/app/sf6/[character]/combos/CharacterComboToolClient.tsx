'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { CharacterDetail, SF6_CHARACTERS, SF6_CHARACTER_DATA } from '@/data/sf6/characters';
import { Combo, ComboFilterCriteria } from '@/types/sf6';
import ComboCard from '@/components/sf6/ComboCard';
import ComboFilter from '@/components/sf6/ComboFilter';
import LethalCalculator from '@/components/sf6/LethalCalculator';
import { trackComboFilter, trackLethalCalc, trackRecipeCopy } from '@/lib/analytics';
import {
  ChevronRight,
  RotateCcw,
  Zap,
  Smartphone,
  ShieldCheck,
  Sparkles,
  ArrowLeft,
  Info,
} from 'lucide-react';

interface ClientProps {
  character: CharacterDetail;
}

export default function CharacterComboToolClient({ character }: ClientProps) {
  // キャラクター別JSONデータから動的取得（データとコードの完全分離）
  const charData = SF6_CHARACTER_DATA[character.slug];
  const allCombos: Combo[] = useMemo(() => {
    return charData ? charData.combos : [];
  }, [charData]);

  // フィルター状態
  const [filter, setFilter] = useState<ComboFilterCriteria>({
    characterId: character.slug,
    controlType: 'all',
    position: 'all',
    starterCategory: 'all',
    maxDriveCost: 6,
    maxSaCost: 3,
    difficulty: 'all',
    selectedTagId: undefined,
    targetLethalHp: 0,
  });

  // フィルター変更時のハンドラ（GA4計測付き）
  const handleFilterChange = (newFilter: ComboFilterCriteria) => {
    setFilter(newFilter);
    trackComboFilter({
      character: character.slug,
      starter: newFilter.starterCategory,
      position: newFilter.position,
      tag: newFilter.selectedTagId,
    });
  };

  // リーサルHP変更時のハンドラ（GA4計測付き）
  const handleLethalHpChange = (hp: number) => {
    setFilter((prev) => ({ ...prev, targetLethalHp: hp }));
    if (hp > 0) {
      const matchCount = allCombos.filter((c) => c.damage >= hp).length;
      trackLethalCalc({
        character: character.slug,
        targetHp: hp,
        matchingCount: matchCount,
      });
    }
  };

  // フィルタリング処理
  const filteredCombos = useMemo(() => {
    return allCombos
      .filter((combo) => {
        if (filter.starterCategory !== 'all' && combo.starterCategory !== filter.starterCategory) {
          return false;
        }
        if (filter.position !== 'all') {
          if (filter.position === 'center' && combo.position !== 'center' && combo.position !== 'any') return false;
          if (filter.position === 'corner' && combo.position !== 'corner' && combo.position !== 'any' && combo.position !== 'to_corner') return false;
        }
        if (filter.controlType !== 'all') {
          if (combo.controlType !== 'both' && combo.controlType !== filter.controlType) return false;
        }
        if (combo.driveCost > filter.maxDriveCost) return false;
        if (combo.saCost > filter.maxSaCost) return false;
        if (filter.selectedTagId && !combo.okizemeTagIds.includes(filter.selectedTagId)) return false;
        if (filter.targetLethalHp && filter.targetLethalHp > 0) {
          if (combo.damage < filter.targetLethalHp) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (filter.targetLethalHp && filter.targetLethalHp > 0) {
          return b.damage - a.damage;
        }
        return 0;
      });
  }, [allCombos, filter]);

  const handleResetFilters = () => {
    setFilter({
      characterId: character.slug,
      controlType: 'all',
      position: 'all',
      starterCategory: 'all',
      maxDriveCost: 6,
      maxSaCost: 3,
      difficulty: 'all',
      selectedTagId: undefined,
      targetLethalHp: 0,
    });
  };

  return (
    <div className="min-h-screen pb-16 bg-[#f0f9fb]">
      {/* ページ上部パンくず & ヘッダー */}
      <div className="bg-white border-b border-neutral-200/80 sticky top-0 z-30 shadow-xs">
        <div className="max-w-5xl mx-auto px-4 py-2.5 flex items-center justify-between gap-2 text-xs">
          <nav className="flex items-center gap-1.5 text-neutral-500 overflow-x-auto py-1">
            <Link href="/" className="hover:text-[#00a3c4] transition-colors shrink-0">
              ホーム
            </Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0 text-neutral-300" />
            <Link href="/sf6" className="hover:text-[#00a3c4] transition-colors shrink-0">
              スト6攻略ハブ
            </Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0 text-neutral-300" />
            <Link href={`/sf6/${character.slug}`} className="hover:text-[#00a3c4] transition-colors shrink-0">
              {character.name}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0 text-neutral-300" />
            <span className="font-bold text-neutral-900 shrink-0">コンボ・起き攻めツール</span>
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <ShieldCheck className="w-3 h-3" />
              アプデ追従最速
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-cyan-50 text-[#00a3c4] border border-cyan-200">
              <Smartphone className="w-3 h-3" />
              スマホ特化
            </span>
          </div>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 pt-6 space-y-6">
        {/* キャラクターツールヘッダー */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-neutral-200/80 shadow-xs relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Link
                  href={`/sf6/${character.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-neutral-500 hover:text-[#00a3c4] transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>{character.name}個別ページへ</span>
                </Link>
                <span className="text-neutral-300">|</span>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-[#00a3c4]">
                  <Zap className="w-3.5 h-3.5" />
                  実戦コンボ＆起き攻めDB
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight flex flex-wrap items-center gap-2">
                <span>{character.name}</span>
                <span className="text-sm font-normal text-neutral-500">({character.nameEn})</span>
                <span className="text-xs font-black px-2 py-0.5 rounded-full bg-[#00a3c4] text-white">
                  {allCombos.length}レシピ
                </span>
                {charData?.version && (
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-neutral-900 text-white flex items-center gap-1">
                    <span>⚡ {charData.version}</span>
                    {charData.updatedAt && (
                      <span className="text-neutral-400 font-normal">({charData.updatedAt}更新)</span>
                    )}
                  </span>
                )}
              </h1>
              <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-2xl leading-relaxed">
                {character.description}
              </p>
            </div>

            {/* 他キャラクター切り替え */}
            <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-xl self-start sm:self-center shrink-0">
              {Object.values(SF6_CHARACTERS).slice(0, 4).map((c) => (
                <Link
                  key={c.slug}
                  href={`/sf6/${c.slug}/combos`}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    c.slug === character.slug
                      ? 'bg-white text-neutral-900 shadow-xs'
                      : c.hasTool
                      ? 'text-neutral-600 hover:text-neutral-900'
                      : 'text-neutral-400 opacity-60'
                  }`}
                >
                  {c.name}
                  {!c.hasTool && <span className="text-[9px] block text-neutral-400">予定</span>}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {allCombos.length > 0 ? (
          <>
            {/* 1. リーサル逆引き計算機 */}
            <section>
              <LethalCalculator
                targetHp={filter.targetLethalHp || 0}
                onTargetHpChange={handleLethalHpChange}
                maxDrive={filter.maxDriveCost}
                onMaxDriveChange={(d) => setFilter({ ...filter, maxDriveCost: d })}
                maxSa={filter.maxSaCost}
                onMaxSaChange={(sa) => setFilter({ ...filter, maxSaCost: sa as 0 | 1 | 2 | 3 })}
                matchingCount={filteredCombos.length}
                onReset={handleResetFilters}
              />
            </section>

            {/* 2. 3タップ絞り込みフィルター */}
            <section>
              <ComboFilter
                filter={filter}
                onFilterChange={handleFilterChange}
                totalCount={allCombos.length}
                filteredCount={filteredCombos.length}
              />
            </section>

            {/* 3. コンボ一覧 */}
            <section className="space-y-3.5">
              <div className="flex items-center justify-between">
                <h2 className="text-sm sm:text-base font-bold text-neutral-800 flex items-center gap-2">
                  <span>コンボレシピ一覧</span>
                  <span className="text-xs font-normal text-neutral-500">
                    ({filteredCombos.length} / {allCombos.length} 件)
                  </span>
                </h2>

                {(filter.starterCategory !== 'all' ||
                  filter.position !== 'all' ||
                  filter.controlType !== 'all' ||
                  filter.selectedTagId ||
                  filter.targetLethalHp !== 0 ||
                  filter.maxDriveCost < 6 ||
                  filter.maxSaCost < 3) && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="text-xs text-[#00a3c4] hover:underline flex items-center gap-1 cursor-pointer font-medium"
                  >
                    <RotateCcw className="w-3 h-3" />
                    絞り込み解除
                  </button>
                )}
              </div>

              {filteredCombos.length > 0 ? (
                <div className="space-y-3">
                  {filteredCombos.map((combo) => (
                    <ComboCard
                      key={combo.id}
                      combo={combo}
                      isLethal={Boolean(filter.targetLethalHp && filter.targetLethalHp > 0 && combo.damage >= filter.targetLethalHp)}
                      onTagClick={(tagId) => setFilter({ ...filter, selectedTagId: tagId })}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-neutral-200 p-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-neutral-400">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-neutral-800 text-sm">
                    条件に一致するコンボが見つかりませんでした
                  </h3>
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="px-4 py-2 text-xs font-bold text-white bg-[#00a3c4] rounded-lg shadow-xs hover:bg-[#008ba8] transition-colors cursor-pointer"
                  >
                    条件をリセットする
                  </button>
                </div>
              )}
            </section>
          </>
        ) : (
          /* データ準備中のキャラクター用プレースホルダー */
          <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-cyan-50 flex items-center justify-center mx-auto text-[#00a3c4]">
              <Info className="w-7 h-7" />
            </div>
            <h3 className="font-black text-neutral-900 text-lg">
              {character.name} のコンボデータベースは近日公開予定です
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-md mx-auto leading-relaxed">
              全キャラ1800MR以上の筆者による実戦検証・+42F詐欺飛びセットプレイのデータ化を進めております。現在は「キャミィ」のコンボツールをご利用いただけます。
            </p>
            <div className="pt-2">
              <Link
                href="/sf6/cammy/combos"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#00a3c4] text-white hover:bg-[#008ba8] transition-colors shadow-sm"
              >
                <span>キャミィのコンボツールを見る</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
