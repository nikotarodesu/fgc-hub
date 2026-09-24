'use client';

import React, { useState, useEffect } from 'react';
import {
  AffiliateProduct,
  STRATEGY_AFFILIATE_PRODUCTS,
} from '@/data/affiliateProducts';
import {
  Coffee,
  Utensils,
  Monitor,
  Sparkles,
  ExternalLink,
  RotateCw,
  ShoppingBag,
} from 'lucide-react';

interface StrategyAffiliateBannerProps {
  initialProduct: AffiliateProduct;
}

export default function StrategyAffiliateBanner({
  initialProduct,
}: StrategyAffiliateBannerProps) {
  const [product, setProduct] = useState<AffiliateProduct>(initialProduct);
  const [isRotating, setIsRotating] = useState(false);

  // マウント時にランダム抽選して、訪問・リロードごとに毎回異なる商品が表示されるようにする
  useEffect(() => {
    if (STRATEGY_AFFILIATE_PRODUCTS.length > 1) {
      const randomIndex = Math.floor(Math.random() * STRATEGY_AFFILIATE_PRODUCTS.length);
      setProduct(STRATEGY_AFFILIATE_PRODUCTS[randomIndex]);
    }
  }, []);

  // 手動で別の商品に切り替えるハンドラー
  const handleShuffle = () => {
    setIsRotating(true);
    setTimeout(() => setIsRotating(false), 500);

    const otherProducts = STRATEGY_AFFILIATE_PRODUCTS.filter((p) => p.id !== product.id);
    if (otherProducts.length > 0) {
      const next = otherProducts[Math.floor(Math.random() * otherProducts.length)];
      setProduct(next);
    }
  };

  // カテゴリ別のアイコンとセクション見出し
  const getCategoryMeta = () => {
    switch (product.category) {
      case 'drink':
        return {
          icon: <Coffee className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />,
          title: 'トレモ・長時間の連戦を支える水分補給・飲料',
          badgeColor: 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/50 dark:text-sky-300 dark:border-sky-800',
        };
      case 'food':
        return {
          icon: <Utensils className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />,
          title: 'ランクマッチの脳疲労を防ぐ定番補食・軽食',
          badgeColor: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800',
        };
      case 'desk':
        return {
          icon: <Monitor className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />,
          title: '対戦環境を整えるおすすめゲームデスク周辺アイテム',
          badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/50 dark:text-indigo-300 dark:border-indigo-800',
        };
      case 'care':
        return {
          icon: <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />,
          title: '操作性を維持するメンテナンス・指先ケア',
          badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/50 dark:text-cyan-300 dark:border-cyan-800',
        };
      default:
        return {
          icon: <ShoppingBag className="w-3.5 h-3.5 text-neutral-600 dark:text-neutral-400" />,
          title: 'トレモ・対戦を快適にする筆者おすすめギア',
          badgeColor: 'bg-neutral-100 text-neutral-700 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-700',
        };
    }
  };

  const meta = getCategoryMeta();

  return (
    <div className="mt-6 p-4 rounded-xl bg-neutral-50/90 dark:bg-neutral-900/60 border border-neutral-200/70 dark:border-neutral-800 text-xs transition-all">
      {/* 上部ヘッダー（アイコン・見出し・PR表記・再抽選ボタン） */}
      <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
        <div className="flex items-center gap-1.5 min-w-0">
          {meta.icon}
          <span className="font-bold text-neutral-800 dark:text-neutral-200 truncate">
            {meta.title}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[10px] text-neutral-400 dark:text-neutral-500 font-medium">
            PR・Amazonアソシエイト
          </span>
          <button
            type="button"
            onClick={handleShuffle}
            className="inline-flex items-center gap-1 text-[11px] font-bold text-neutral-500 hover:text-cyan-600 dark:text-neutral-400 dark:hover:text-cyan-400 bg-white dark:bg-neutral-800 px-2 py-0.5 rounded border border-neutral-200 dark:border-neutral-700 hover:border-cyan-500 transition-colors cursor-pointer shadow-2xs"
            title="他のアイテムを表示"
          >
            <RotateCw className={`w-3 h-3 ${isRotating ? 'animate-spin' : ''}`} />
            <span>別のアイテム</span>
          </button>
        </div>
      </div>

      {/* バッジと商品名 */}
      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
        {product.badge && (
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${meta.badgeColor}`}>
            {product.badge}
          </span>
        )}
        <span className="text-[10px] text-neutral-500 dark:text-neutral-400 font-medium">
          {product.categoryLabel}
        </span>
      </div>

      {/* 説明文 */}
      <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-2.5 text-[11px] sm:text-xs">
        {product.description}
      </p>

      {/* 下部リンクエリア */}
      <div className="flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-neutral-200/50 dark:border-neutral-800/60">
        <span className="font-bold text-neutral-900 dark:text-white truncate max-w-sm sm:max-w-md">
          {product.name}
        </span>
        <a
          href={product.amazonUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="inline-flex items-center gap-1 font-bold text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300 hover:underline text-xs shrink-0 ml-auto"
        >
          <span>Amazonで見る</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
