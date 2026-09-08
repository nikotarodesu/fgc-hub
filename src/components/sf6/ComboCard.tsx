'use client';

import React, { useState } from 'react';
import { Combo } from '@/types/sf6';
import { OKIZEME_TAGS } from '@/data/sf6/okizemeTags';
import CommandRenderer from './CommandRenderer';
import { Copy, Check, ChevronDown, ChevronUp, Flame, ShieldAlert, Zap } from 'lucide-react';

import { trackRecipeCopy } from '@/lib/analytics';

interface ComboCardProps {
  combo: Combo;
  isLethal?: boolean;
  onTagClick?: (tagId: string) => void;
}

export default function ComboCard({ combo, isLethal = false, onTagClick }: ComboCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(combo.recipeText);
    setIsCopied(true);
    trackRecipeCopy({
      character: combo.characterId,
      comboId: combo.id,
      title: combo.title,
    });
    setTimeout(() => setIsCopied(false), 2000);
  };

  const difficultyColors = {
    beginner: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    intermediate: 'bg-blue-50 text-blue-700 border-blue-200',
    advanced: 'bg-purple-50 text-purple-700 border-purple-200',
  };

  const difficultyLabels = {
    beginner: '初級',
    intermediate: '中級',
    advanced: '上級',
  };

  const positionLabels = {
    any: 'どこでも',
    center: '画面中央',
    corner: '画面端',
    to_corner: '端運び',
  };

  return (
    <div
      className={`rounded-xl border transition-all duration-200 bg-white shadow-xs overflow-hidden ${
        isLethal
          ? 'border-rose-400 ring-2 ring-rose-300/40 bg-gradient-to-b from-rose-50/20 to-white'
          : 'border-neutral-200/80 hover:border-cyan-300 hover:shadow-md'
      }`}
    >
      {/* カードヘッダー */}
      <div className="p-3.5 sm:p-4 border-b border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-2 flex-wrap">
          {isLethal && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-black bg-rose-600 text-white animate-pulse shadow-xs">
              <Flame className="w-3 h-3" />
              LETHAL 撃破可能
            </span>
          )}
          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-neutral-100 text-neutral-700">
            {combo.starterMoveName}
          </span>
          <h3 className="font-bold text-neutral-900 text-sm sm:text-base">
            {combo.title}
          </h3>
        </div>

        {/* ダメージ & リソース消費バッジ */}
        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
          {/* ダメージ */}
          <div className="text-right">
            <span className="text-[10px] text-neutral-400 block -mb-1 font-medium">DMG</span>
            <span className={`text-lg sm:text-xl font-black font-mono ${
              combo.damage >= 4500 ? 'text-rose-600' : combo.damage >= 3000 ? 'text-amber-600' : 'text-neutral-900'
            }`}>
              {combo.damage.toLocaleString()}
            </span>
          </div>

          {/* Dゲージ・SAゲージ */}
          <div className="flex flex-col gap-1 items-end pl-2 border-l border-neutral-200">
            {/* Dゲージ */}
            <div className="flex items-center gap-1 text-[11px] font-bold text-neutral-600" title={`消費ドライブゲージ: ${combo.driveCost}本`}>
              <span className="text-[10px] text-neutral-400">D</span>
              <div className="flex gap-0.5">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-1.5 h-3 rounded-[1px] ${
                      i < combo.driveCost ? 'bg-emerald-500' : 'bg-neutral-200'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* SAゲージ */}
            {combo.saCost > 0 ? (
              <span className="text-[10px] font-black px-1.5 py-0.2 rounded bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xs">
                SA{combo.saCost}
              </span>
            ) : (
              <span className="text-[10px] font-bold text-neutral-400">SAなし</span>
            )}
          </div>
        </div>
      </div>

      {/* レシピ表示部 */}
      <div className="p-3.5 sm:p-4 bg-[#fbfdfe] overflow-x-auto">
        <CommandRenderer recipe={combo.recipeText} />
      </div>

      {/* メタ情報 & 起き攻めタグ */}
      <div className="px-3.5 sm:px-4 py-3 bg-white border-t border-neutral-100 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex flex-wrap items-center gap-1.5">
          {/* ダウン有利F */}
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded font-mono font-bold bg-cyan-50 text-[#00a3c4] border border-cyan-200">
            <Zap className="w-3 h-3" />
            ダウン +{combo.knockdownAdvantageF}F
          </span>

          {/* 画面位置 */}
          <span className="px-2 py-0.5 rounded font-medium bg-neutral-100 text-neutral-600">
            {positionLabels[combo.position]}
          </span>

          {/* 難易度 */}
          <span className={`px-2 py-0.5 rounded font-medium border ${difficultyColors[combo.difficulty]}`}>
            {difficultyLabels[combo.difficulty]}
          </span>

          {/* 起き攻めタグ */}
          {combo.okizemeTagIds.map((tagId) => {
            const tag = OKIZEME_TAGS[tagId];
            if (!tag) return null;
            return (
              <button
                key={tagId}
                type="button"
                onClick={() => onTagClick && onTagClick(tagId)}
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-bold border transition-colors cursor-pointer text-[11px] ${tag.badgeBg} ${tag.badgeText} ${tag.badgeBorder} hover:opacity-80`}
                title={tag.description}
              >
                {tag.name}
              </button>
            );
          })}
        </div>

        {/* コピー＆詳細トグル */}
        <div className="flex items-center gap-1.5 ml-auto">
          <button
            type="button"
            onClick={handleCopy}
            className="p-1.5 rounded-lg border border-neutral-200 text-neutral-600 hover:text-[#00a3c4] hover:bg-neutral-50 transition-colors flex items-center gap-1 text-[11px] font-medium"
            title="レシピをコピー"
          >
            {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{isCopied ? 'コピー済' : 'コピー'}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-lg border border-neutral-200 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 transition-colors flex items-center gap-1 text-[11px] font-medium"
          >
            <span>{isExpanded ? '閉じる' : '起き攻め詳細'}</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* アコーディオン展開詳細（起き攻めレシピ & コツ） */}
      {isExpanded && (
        <div className="p-3.5 sm:p-4 bg-neutral-50/70 border-t border-neutral-100 text-xs text-neutral-700 space-y-2.5 animate-fadeIn">
          {combo.okizemeDetail && (
            <div className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-neutral-200">
              <ShieldAlert className="w-4 h-4 text-[#00a3c4] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-neutral-900 block mb-0.5">起き攻めのセットプレイ・手順:</span>
                <p className="leading-relaxed">{combo.okizemeDetail}</p>
              </div>
            </div>
          )}

          {combo.tips && (
            <div className="bg-white p-2.5 rounded-lg border border-neutral-200">
              <span className="font-bold text-neutral-900 block mb-0.5">💡 成功のコツ & 実戦メモ:</span>
              <p className="leading-relaxed text-neutral-600">{combo.tips}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
