'use client';

import React from 'react';
import { ComboFilterCriteria, StarterCategory } from '@/types/sf6';
import { OKIZEME_TAGS } from '@/data/sf6/okizemeTags';
import { Filter, Layers, MapPin, SlidersHorizontal } from 'lucide-react';

interface ComboFilterProps {
  filter: ComboFilterCriteria;
  onFilterChange: (newFilter: ComboFilterCriteria) => void;
  totalCount: number;
  filteredCount: number;
}

export default function ComboFilter({
  filter,
  onFilterChange,
  totalCount,
  filteredCount,
}: ComboFilterProps) {
  const starterOptions: { label: string; value: 'all' | StarterCategory }[] = [
    { label: 'すべて', value: 'all' },
    { label: '小技 (2LP等)', value: 'light' },
    { label: '中足 (2MK)', value: 'medium' },
    { label: 'パニカン確反', value: 'punish_counter' },
    { label: 'インパクト', value: 'drive_impact' },
    { label: 'OD技', value: 'od_special' },
  ];

  const positionOptions = [
    { label: '全位置', value: 'all' },
    { label: '画面中央', value: 'center' },
    { label: '画面端', value: 'corner' },
  ];

  const controlOptions = [
    { label: '両方 (C/M)', value: 'all' },
    { label: 'クラシック', value: 'classic' },
    { label: 'モダン', value: 'modern' },
  ];

  return (
    <div className="bg-white rounded-xl border border-neutral-200/80 p-3 sm:p-4 shadow-xs space-y-3.5">
      {/* 上部ヘッダー & 件数カウンター */}
      <div className="flex items-center justify-between gap-2 border-b border-neutral-100 pb-2.5">
        <div className="flex items-center gap-1.5 text-neutral-800 font-bold text-xs sm:text-sm">
          <Filter className="w-3.5 h-3.5 text-[#00a3c4]" />
          <span>条件絞り込み</span>
        </div>
        <div className="text-xs text-neutral-500 font-mono">
          該当 <strong className="text-[#00a3c4] font-black text-sm">{filteredCount}</strong> / {totalCount} 件
        </div>
      </div>

      {/* 始動技クイックチップ（1タップ切替） */}
      <div>
        <span className="text-[11px] font-bold text-neutral-500 block mb-1.5 flex items-center gap-1">
          <Layers className="w-3 h-3 text-neutral-400" />
          始動技
        </span>
        <div className="flex flex-wrap gap-1.5">
          {starterOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onFilterChange({ ...filter, starterCategory: opt.value })}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                filter.starterCategory === opt.value
                  ? 'bg-[#00a3c4] text-white shadow-xs'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200/70'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* 画面位置 & 操作タイプ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        {/* 画面位置 */}
        <div>
          <span className="text-[11px] font-bold text-neutral-500 block mb-1.5 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-neutral-400" />
            画面位置
          </span>
          <div className="flex gap-1.5">
            {positionOptions.map((pos) => (
              <button
                key={pos.value}
                type="button"
                onClick={() => onFilterChange({ ...filter, position: pos.value as 'all' | 'center' | 'corner' })}
                className={`flex-1 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer text-center ${
                  filter.position === pos.value
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200/70'
                }`}
              >
                {pos.label}
              </button>
            ))}
          </div>
        </div>

        {/* 操作タイプ */}
        <div>
          <span className="text-[11px] font-bold text-neutral-500 block mb-1.5 flex items-center gap-1">
            <SlidersHorizontal className="w-3 h-3 text-neutral-400" />
            操作タイプ
          </span>
          <div className="flex gap-1.5">
            {controlOptions.map((ctrl) => (
              <button
                key={ctrl.value}
                type="button"
                onClick={() => onFilterChange({ ...filter, controlType: ctrl.value as 'all' | 'classic' | 'modern' })}
                className={`flex-1 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer text-center ${
                  filter.controlType === ctrl.value
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200/70'
                }`}
              >
                {ctrl.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 起き攻めタグ絞り込み */}
      <div className="pt-1">
        <span className="text-[11px] font-bold text-neutral-500 block mb-1.5">
          起き攻め・状況タグで絞り込み:
        </span>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => onFilterChange({ ...filter, selectedTagId: undefined })}
            className={`px-2 py-0.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
              !filter.selectedTagId
                ? 'bg-cyan-50 text-[#00a3c4] border-cyan-300 font-bold'
                : 'bg-white text-neutral-500 border-neutral-200 hover:bg-neutral-50'
            }`}
          >
            タグ指定なし
          </button>
          {Object.values(OKIZEME_TAGS).map((tag) => (
            <button
              key={tag.id}
              type="button"
              onClick={() =>
                onFilterChange({
                  ...filter,
                  selectedTagId: filter.selectedTagId === tag.id ? undefined : tag.id,
                })
              }
              className={`px-2 py-0.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                filter.selectedTagId === tag.id
                  ? `${tag.badgeBg} ${tag.badgeText} ${tag.badgeBorder} ring-2 ring-cyan-400 font-bold`
                  : 'bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50'
              }`}
            >
              {tag.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
