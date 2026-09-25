'use client';

import React from 'react';
import Image from 'next/image';
import { DeviceProduct } from '@/data/devices/types';
import { CheckCircle2, AlertCircle, ExternalLink, BookOpen, ShieldCheck, Check } from 'lucide-react';
import { trackDeviceMerchantClick } from '@/lib/analytics';

interface DeviceProductCardProps {
  product: DeviceProduct;
  articleSlug: string;
}

export default function DeviceProductCard({ product, articleSlug }: DeviceProductCardProps) {
  const handleLinkClick = (merchantName: string, linkType: 'sponsored' | 'official' | 'note') => {
    trackDeviceMerchantClick({
      articleSlug,
      productId: product.id,
      merchant: merchantName,
      linkType,
    });
  };

  return (
    <div
      id={product.id}
      className="p-5 sm:p-7 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 shadow-xs transition-all scroll-mt-20 space-y-5"
    >
      {/* 上部バッジ & カテゴリ */}
      <div className="flex items-center justify-between gap-2 flex-wrap border-b border-neutral-100 dark:border-neutral-800/80 pb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] font-bold text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded">
            {product.categoryLabel}
          </span>
          {product.badge && (
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/20">
              {product.badge}
            </span>
          )}
        </div>

        {product.officialVerifiedDate && (
          <span className="text-[10px] text-neutral-400 dark:text-neutral-500 font-mono">
            公式情報確認日: {product.officialVerifiedDate}
          </span>
        )}
      </div>

      {/* 商品画像（登録されている場合のみ表示） */}
      {product.imageUrl && (
        <div className="relative w-full max-w-sm mx-auto aspect-[16/10] bg-neutral-50 dark:bg-neutral-800/40 rounded-xl overflow-hidden border border-neutral-200/60 dark:border-neutral-700/60 flex items-center justify-center p-3">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-contain"
            sizes="(max-width: 640px) 100vw, 384px"
          />
        </div>
      )}

      {/* 商品名 */}
      <div>
        <h3 className="text-lg sm:text-xl font-black text-neutral-900 dark:text-white leading-snug mb-1.5">
          {product.name}
        </h3>
        <p className="text-xs sm:text-sm font-medium text-cyan-700 dark:text-cyan-400">
          おすすめ用途: {product.targetUser}
        </p>
      </div>

      {/* 概要 */}
      <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
        {product.summary}
      </p>

      {/* 筆者の実戦コメント（ある場合のみ表示） */}
      {product.authorComment && (
        <div className="p-3.5 sm:p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/70 dark:border-neutral-700/60 text-xs sm:text-sm">
          <div className="flex items-center gap-1.5 font-bold text-neutral-900 dark:text-white mb-1.5">
            <span className="text-cyan-600 dark:text-cyan-400">★</span>
            <span>筆者（にこ太郎）の実戦使用感</span>
          </div>
          <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
            {product.authorComment}
          </p>
          {product.noteReviewUrl && (
            <div className="mt-2.5 pt-2 border-t border-neutral-200/60 dark:border-neutral-700/50">
              <a
                href={product.noteReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleLinkClick('note', 'note')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>noteで詳細な使用感・キー設定レビューを読む</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>
            </div>
          )}
        </div>
      )}

      {/* 主なスペック表 */}
      {product.specHighlights.length > 0 && (
        <div className="bg-neutral-50/70 dark:bg-neutral-950/40 rounded-xl p-3.5 border border-neutral-200/60 dark:border-neutral-800/80">
          <div className="text-[11px] font-bold text-neutral-500 dark:text-neutral-400 mb-2 uppercase tracking-wide">
            主要スペック
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {product.specHighlights.map((spec, idx) => (
              <div key={idx} className="flex items-baseline justify-between gap-2 py-0.5 border-b border-neutral-200/40 dark:border-neutral-800/50 last:border-0 sm:last:border-b-0">
                <span className="text-neutral-500 dark:text-neutral-400 shrink-0">{spec.label}</span>
                <span className="font-bold text-neutral-800 dark:text-neutral-200 text-right truncate">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 長所と注意点 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 良い点 */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400">
            <Check className="w-3.5 h-3.5" />
            <span>向いている点・メリット</span>
          </div>
          <ul className="space-y-1.5 text-xs text-neutral-600 dark:text-neutral-300">
            {product.pros.map((pro, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="leading-snug">{pro}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 注意点 */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-400">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>注意点・購入前の確認</span>
          </div>
          <ul className="space-y-1.5 text-xs text-neutral-600 dark:text-neutral-300">
            {product.cons.map((con, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-amber-500 shrink-0 mt-0.5">•</span>
                <span className="leading-snug">{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 購入先・仕様確認リンク */}
      <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1 text-[11px] text-neutral-400 dark:text-neutral-500">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>確認済みリンク</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {product.merchantLinks
            .filter((link) => link.isActive && link.url)
            .map((link, idx) => {
              const isAmazon = link.merchantName.toLowerCase().includes('amazon');
              return (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel={link.isSponsored ? 'noopener noreferrer sponsored' : 'noopener noreferrer'}
                  onClick={() =>
                    handleLinkClick(link.merchantName, link.isSponsored ? 'sponsored' : 'official')
                  }
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs ${
                    link.isSponsored
                      ? 'bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100'
                      : 'bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200'
                  }`}
                >
                  <span>{link.label || `${link.merchantName}で見る`}</span>
                  <ExternalLink className="w-3 h-3 opacity-70 shrink-0" />
                </a>
              );
            })}
        </div>
      </div>
    </div>
  );
}
