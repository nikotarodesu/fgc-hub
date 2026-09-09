'use client';

import React from 'react';
import { Article } from '@/data/articles';
import { Play, Sparkles, BookOpen, Target, GraduationCap } from 'lucide-react';

interface ArticleThumbnailProps {
  article: Article;
  className?: string;
}

// キャラクター別のスタイル定義
interface CharTheme {
  enName: string;
  bgGradient: string;
  accentBorder: string;
  accentText: string;
  glowColor: string;
}

const CHAR_THEMES: Record<string, CharTheme> = {
  '春麗': {
    enName: 'CHUN-LI',
    bgGradient: 'from-cyan-950 via-sky-900 to-blue-950',
    accentBorder: 'border-cyan-500/40',
    accentText: 'text-cyan-300',
    glowColor: 'bg-cyan-500/20',
  },
  'リュウ': {
    enName: 'RYU',
    bgGradient: 'from-slate-950 via-neutral-900 to-red-950',
    accentBorder: 'border-red-500/40',
    accentText: 'text-red-400',
    glowColor: 'bg-red-500/20',
  },
  '豪鬼': {
    enName: 'AKUMA',
    bgGradient: 'from-purple-950 via-neutral-950 to-red-950',
    accentBorder: 'border-amber-500/40',
    accentText: 'text-amber-400',
    glowColor: 'bg-amber-500/20',
  },
  'キャミィ': {
    enName: 'CAMMY',
    bgGradient: 'from-emerald-950 via-teal-900 to-neutral-950',
    accentBorder: 'border-emerald-500/40',
    accentText: 'text-emerald-300',
    glowColor: 'bg-emerald-500/20',
  },
  'ケン': {
    enName: 'KEN',
    bgGradient: 'from-amber-950 via-orange-950 to-neutral-950',
    accentBorder: 'border-orange-500/40',
    accentText: 'text-orange-400',
    glowColor: 'bg-orange-500/20',
  },
  'ルーク': {
    enName: 'LUKE',
    bgGradient: 'from-blue-950 via-sky-950 to-amber-950',
    accentBorder: 'border-amber-400/40',
    accentText: 'text-amber-300',
    glowColor: 'bg-amber-400/20',
  },
  'エド': {
    enName: 'ED',
    bgGradient: 'from-purple-950 via-indigo-950 to-neutral-950',
    accentBorder: 'border-purple-400/40',
    accentText: 'text-purple-300',
    glowColor: 'bg-purple-500/20',
  },
};

const DEFAULT_THEME: CharTheme = {
  enName: 'FGC THEORY',
  bgGradient: 'from-neutral-950 via-slate-900 to-neutral-950',
  accentBorder: 'border-cyan-500/30',
  accentText: 'text-cyan-300',
  glowColor: 'bg-cyan-500/15',
};

export default function ArticleThumbnail({ article, className = '' }: ArticleThumbnailProps) {
  const theme = (article.character && CHAR_THEMES[article.character]) || DEFAULT_THEME;

  // カテゴリバッジ用のアイコンとテキスト
  const getCategoryInfo = () => {
    if (article.category === 'coaching' || article.tags.includes('コーチング')) {
      return { icon: GraduationCap, label: 'コーチング添削', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' };
    }
    if (article.category === 'character' || article.tags.includes('完全攻略')) {
      return { icon: Sparkles, label: 'キャラ完全攻略', color: 'bg-indigo-500/20 text-indigo-200 border-indigo-500/40' };
    }
    if (article.category === 'neutral' || article.tags.includes('立ち回り')) {
      return { icon: Target, label: '立ち回り理論', color: 'bg-amber-500/20 text-amber-300 border-amber-500/40' };
    }
    return { icon: BookOpen, label: '格闘ゲーム攻略', color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' };
  };

  const catInfo = getCategoryInfo();
  const CategoryIcon = catInfo.icon;

  // タイトルからメインキーワード・サブキーワードを抽出
  let mainTitle = article.title;
  let subSubtitle = '';

  if (article.slug.includes('chunli-1600mr')) {
    mainTitle = 'M春麗 1600MR';
    subSubtitle = 'vs豪鬼 実戦添削アーカイブ';
  } else if (article.slug.includes('ryu-neutral')) {
    mainTitle = 'リュウ立ち回り考察';
    subSubtitle = '判断を減らす勝率安定メソッド';
  } else if (article.slug.includes('ryu-complete')) {
    mainTitle = 'リュウ完全攻略';
    subSubtitle = 'クラシック & モダン両対応';
  }

  return (
    <div
      className={`relative w-full aspect-[16/9] sm:aspect-[16/10] rounded-lg overflow-hidden border ${theme.accentBorder} bg-gradient-to-br ${theme.bgGradient} shadow-md select-none group-hover:scale-[1.02] transition-transform duration-300 flex flex-col justify-between p-3 sm:p-3.5 text-white ${className}`}
    >
      {/* 背景の幾何学グリッドメッシュ（サイバー感） */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '16px 16px',
        }}
      />

      {/* 背景の光彩エフェクト */}
      <div className={`absolute -right-6 -top-6 w-28 h-28 rounded-full blur-2xl pointer-events-none ${theme.glowColor}`} />

      {/* 背景の大きな英字レタリング（ウォーターマーク） */}
      <div className="absolute right-2 bottom-0.5 text-right pointer-events-none opacity-[0.07] font-black font-mono text-3xl sm:text-4xl tracking-tighter leading-none whitespace-nowrap overflow-hidden select-none">
        {theme.enName}
      </div>

      {/* 上部ヘッダー（カテゴリバッジ ＆ 操作系） */}
      <div className="relative z-10 flex items-center justify-between gap-1.5 w-full">
        <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border backdrop-blur-xs ${catInfo.color}`}>
          <CategoryIcon className="w-3 h-3" />
          <span>{catInfo.label}</span>
        </div>

        {article.controlType && (
          <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-black/50 text-neutral-300 border border-white/10 backdrop-blur-xs">
            {article.controlType === 'both' ? 'C / M' : article.controlType === 'modern' ? 'MODERN' : 'CLASSIC'}
          </span>
        )}
      </div>

      {/* 中央メインタイポグラフィ */}
      <div className="relative z-10 my-auto py-1">
        {article.character && (
          <div className={`text-[10px] font-mono font-black tracking-widest uppercase mb-0.5 ${theme.accentText}`}>
            {article.character}
          </div>
        )}
        <h3 className="text-sm sm:text-base font-black tracking-tight leading-snug text-white drop-shadow-sm line-clamp-1">
          {mainTitle}
        </h3>
        {subSubtitle && (
          <p className="text-[10px] text-neutral-300/80 font-medium tracking-wide mt-0.5 line-clamp-1">
            {subSubtitle}
          </p>
        )}
      </div>

      {/* 下部フッター（動画付きバッジ ＆ 会員バッジ） */}
      <div className="relative z-10 flex items-center justify-between gap-2 pt-1 border-t border-white/10 text-[9px]">
        {article.youtubeVideoId ? (
          <span className="inline-flex items-center gap-1 font-bold text-rose-300 bg-rose-950/60 px-1.5 py-0.5 rounded border border-rose-500/30">
            <Play className="w-2.5 h-2.5 fill-rose-300" />
            <span>動画付き</span>
          </span>
        ) : (
          <span className="text-neutral-400 font-mono font-medium">
            {article.readTime}
          </span>
        )}

        {article.isPaid ? (
          <span className="font-bold text-amber-300 bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-500/40">
            ¥{article.price}
          </span>
        ) : (
          <span className="font-bold text-cyan-300 bg-cyan-950/50 px-1.5 py-0.5 rounded border border-cyan-500/30">
            無料公開
          </span>
        )}
      </div>
    </div>
  );
}
