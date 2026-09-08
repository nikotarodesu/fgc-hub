'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { CAMMY_COMBOS, CAMMY_CHARACTER } from '@/data/sf6/cammy';
import { ComboFilterCriteria } from '@/types/sf6';
import ComboCard from '@/components/sf6/ComboCard';
import ComboFilter from '@/components/sf6/ComboFilter';
import LethalCalculator from '@/components/sf6/LethalCalculator';
import {
  Sparkles,
  Zap,
  ChevronRight,
  RotateCcw,
  Smartphone,
  ShieldCheck,
} from 'lucide-react';

export default function SF6DatabasePage() {
  // フィルター初期状態
  const [filter, setFilter] = useState<ComboFilterCriteria>({
    characterId: 'cammy',
    controlType: 'all',
    position: 'all',
    starterCategory: 'all',
    maxDriveCost: 6,
    maxSaCost: 3,
    difficulty: 'all',
    selectedTagId: undefined,
    targetLethalHp: 0,
  });

  // キャラクター切り替えタブ（将来の全キャラ拡張用）
  const [selectedCharacterId, setSelectedCharacterId] = useState<string>('cammy');

  const characters = [
    { id: 'cammy', name: 'キャミィ', active: true, count: CAMMY_COMBOS.length },
    { id: 'ryu', name: 'リュウ', active: false, count: 0 },
    { id: 'akuma', name: '豪鬼', active: false, count: 0 },
    { id: 'chunli', name: '春麗', active: false, count: 0 },
  ];

  // フィルタリング処理
  const filteredCombos = useMemo(() => {
    return CAMMY_COMBOS.filter((combo) => {
      // 始動技
      if (filter.starterCategory !== 'all' && combo.starterCategory !== filter.starterCategory) {
        return false;
      }

      // 画面位置
      if (filter.position !== 'all') {
        if (filter.position === 'center' && combo.position !== 'center' && combo.position !== 'any') {
          return false;
        }
        if (filter.position === 'corner' && combo.position !== 'corner' && combo.position !== 'any' && combo.position !== 'to_corner') {
          return false;
        }
      }

      // 操作タイプ
      if (filter.controlType !== 'all') {
        if (combo.controlType !== 'both' && combo.controlType !== filter.controlType) {
          return false;
        }
      }

      // ドライブゲージ消費上限
      if (combo.driveCost > filter.maxDriveCost) {
        return false;
      }

      // SAゲージ消費上限
      if (combo.saCost > filter.maxSaCost) {
        return false;
      }

      // 起き攻めタグ
      if (filter.selectedTagId && !combo.okizemeTagIds.includes(filter.selectedTagId)) {
        return false;
      }

      // リーサル計算（指定体力以上のみ抽出）
      if (filter.targetLethalHp && filter.targetLethalHp > 0) {
        if (combo.damage < filter.targetLethalHp) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      // リーサルモード時はダメージ降順
      if (filter.targetLethalHp && filter.targetLethalHp > 0) {
        return b.damage - a.damage;
      }
      return 0; // デフォルト順
    });
  }, [filter]);

  const handleResetFilters = () => {
    setFilter({
      characterId: 'cammy',
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
            <span className="font-bold text-neutral-900 shrink-0">
              スト6攻略データベース
            </span>
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
        {/* メインヒーロータイトル */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-neutral-200/80 shadow-xs relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-36 h-36 bg-cyan-100/50 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-[#00a3c4]/10 text-[#00a3c4] mb-2">
                <Zap className="w-3.5 h-3.5" />
                対戦・トレモ特化型Webツール (MVP)
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">
                スト6攻略データベース
              </h1>
              <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-2xl leading-relaxed">
                全キャラ1800MR以上の筆者監修。対戦中の10秒で引ける「状況別コンボ検索」「+42F詐欺飛び・シミー起き攻めデータ」「リーサル逆引き計算機」を完全搭載。
              </p>
            </div>

            {/* キャラクタータブ（第1弾 キャミィ） */}
            <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-xl self-start sm:self-center shrink-0">
              {characters.map((char) => (
                <button
                  key={char.id}
                  type="button"
                  onClick={() => char.active && setSelectedCharacterId(char.id)}
                  disabled={!char.active}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedCharacterId === char.id
                      ? 'bg-white text-neutral-900 shadow-xs'
                      : char.active
                      ? 'text-neutral-600 hover:text-neutral-900'
                      : 'text-neutral-400 cursor-not-allowed opacity-50'
                  }`}
                >
                  {char.name}
                  {char.active ? ` (${char.count})` : ' (準備中)'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 1. リーサル逆引き計算機 */}
        <section>
          <LethalCalculator
            targetHp={filter.targetLethalHp || 0}
            onTargetHpChange={(hp) => setFilter({ ...filter, targetLethalHp: hp })}
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
            onFilterChange={setFilter}
            totalCount={CAMMY_COMBOS.length}
            filteredCount={filteredCombos.length}
          />
        </section>

        {/* 3. コンボ一覧リスト */}
        <section className="space-y-3.5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm sm:text-base font-bold text-neutral-800 flex items-center gap-2">
              <span>{CAMMY_CHARACTER.name} コンボレシピ一覧</span>
              <span className="text-xs font-normal text-neutral-500">
                ({filteredCombos.length} 件)
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
                絞り込みをすべて解除
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
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                DゲージやSAゲージの上限を増やすか、始動技・起き攻めタグの指定を解除してみてください。
              </p>
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

        {/* ツール補足 & 次期アップデート案内 */}
        <div className="p-4 rounded-xl bg-white/70 border border-neutral-200/70 text-xs text-neutral-500 space-y-1">
          <p className="font-bold text-neutral-700">📌 本ツールについて</p>
          <p>
            ※ 「にこ太郎の格ゲーLAB」による独自検証データです。今後のカプコン公式バランス調整やフレームデータ改定に合わせて最速で数値を更新します。
          </p>
          <p>
            ※ 順次「リュウ」「豪鬼」「春麗」の技データ・実戦コンボ・詐欺飛びセットプレイを追加予定です。
          </p>
        </div>
      </main>
    </div>
  );
}
