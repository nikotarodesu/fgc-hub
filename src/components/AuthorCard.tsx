'use client';

import Image from 'next/image';
import { AUTHOR_INFO, AuthorInfo } from '@/data/author';
import { Trophy, ExternalLink, Award } from 'lucide-react';

interface AuthorCardProps {
  author?: AuthorInfo;
  className?: string;
}

export default function AuthorCard({ author = AUTHOR_INFO, className = '' }: AuthorCardProps) {
  return (
    <div className={`p-5 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs text-center ${className}`}>
      {/* アバター画像 */}
      <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-amber-500/30 dark:ring-amber-400/30 mx-auto mb-3 bg-neutral-100 dark:bg-neutral-800 shadow-sm">
        <Image
          src={author.avatar || '/icon.png'}
          alt={author.name}
          width={64}
          height={64}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 著者名 */}
      <h3 className="font-bold text-base text-neutral-900 dark:text-white flex items-center justify-center gap-1.5">
        <span>{author.name}</span>
      </h3>

      {/* 実績バッジ（MR ＆ 大会二連覇） */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 my-2">
        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-neutral-800 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-800 px-2.5 py-0.5 rounded-full border border-neutral-200/80 dark:border-neutral-700">
          <span>🥋</span>
          <span>{author.mrRating}</span>
        </span>
        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-900 dark:text-amber-200 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-300 dark:border-amber-700/80 shadow-2xs">
          <Trophy className="w-3 h-3 text-amber-600 dark:text-amber-400 fill-current" />
          <span>note大会 2連覇</span>
        </span>
      </div>

      {/* 実績カウンター（4マス数値グリッド） */}
      <div className="grid grid-cols-2 gap-1.5 my-3 p-2 rounded-lg bg-neutral-50 dark:bg-neutral-850 border border-neutral-100 dark:border-neutral-800 text-left text-xs">
        <div className="p-1.5">
          <div className="text-[10px] text-neutral-400 dark:text-neutral-500 font-medium">noteフォロワー</div>
          <div className="text-xs sm:text-[13px] font-extrabold text-neutral-900 dark:text-white font-mono">
            {author.noteFollowers || '2,500人'}
          </div>
        </div>
        <div className="p-1.5">
          <div className="text-[10px] text-neutral-400 dark:text-neutral-500 font-medium">有料記事販売</div>
          <div className="text-xs sm:text-[13px] font-extrabold text-neutral-900 dark:text-white font-mono">
            {author.noteSales || '2,000部+'}
          </div>
        </div>
        <div className="p-1.5 border-t border-neutral-200/60 dark:border-neutral-700/60">
          <div className="text-[10px] text-neutral-400 dark:text-neutral-500 font-medium">公式X</div>
          <div className="text-xs sm:text-[13px] font-extrabold text-neutral-900 dark:text-white font-mono">
            {author.xFollowers || '2,100人'}
          </div>
        </div>
        <div className="p-1.5 border-t border-neutral-200/60 dark:border-neutral-700/60">
          <div className="text-[10px] text-neutral-400 dark:text-neutral-500 font-medium">YouTube登録</div>
          <div className="text-xs sm:text-[13px] font-extrabold text-neutral-900 dark:text-white font-mono">
            {author.youtubeSubscribers || '1,000人'}
          </div>
        </div>
      </div>

      {/* 自己紹介文 */}
      <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed text-left mb-3">
        {author.bio}
      </p>

      {/* 🏆 note大会 優勝記事リンク */}
      {author.championshipArticles && author.championshipArticles.length > 0 && (
        <div className="mb-3 p-2.5 rounded-lg bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-900/40 text-left">
          <div className="text-[11px] font-bold text-amber-900 dark:text-amber-300 mb-1.5 flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>note主催大会 2連覇優勝記事:</span>
          </div>
          <div className="space-y-1">
            {author.championshipArticles.map((art, aIdx) => (
              <a
                key={aIdx}
                href={art.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-1.5 text-[11px] font-medium text-amber-950 dark:text-amber-200 hover:text-amber-700 dark:hover:text-white bg-white/80 dark:bg-neutral-800/80 px-2 py-1 rounded border border-amber-200/50 dark:border-amber-800/50 transition-colors group"
              >
                <span className="truncate">{art.title}</span>
                <ExternalLink className="w-3 h-3 shrink-0 text-amber-600 dark:text-amber-400 group-hover:translate-x-0.5 transition-transform" />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* SNS & 外部リンクボタングリッド */}
      <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 space-y-1.5">
        {author.xUrl && (
          <a
            href={author.xUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-1.5 px-3 rounded-lg text-xs font-semibold bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
          >
            <span>𝕏</span>
            <span>公式X（{author.xFollowers || '2,100人'}）</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>
        )}

        <div className="grid grid-cols-2 gap-1.5">
          {author.noteUrl && (
            <a
              href={author.noteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-1.5 px-2 rounded-lg text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 flex items-center justify-center gap-1 transition-colors"
            >
              <span>note（{author.noteFollowers || '2,500人'}）</span>
              <ExternalLink className="w-2.5 h-2.5 opacity-60" />
            </a>
          )}

          {author.youtubeUrl && (
            <a
              href={author.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-1.5 px-2 rounded-lg text-[11px] font-semibold bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200 border border-rose-200 dark:border-rose-800/60 hover:bg-rose-100 dark:hover:bg-rose-900/60 flex items-center justify-center gap-1 transition-colors"
            >
              <span>YouTube（{author.youtubeSubscribers || '1,000人'}）</span>
              <ExternalLink className="w-2.5 h-2.5 opacity-60" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
