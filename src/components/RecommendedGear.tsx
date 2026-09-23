import React from 'react';
import { getRecommendedProducts, AffiliateProduct } from '@/data/affiliateProducts';
import { ExternalLink, BookOpen, CheckCircle2, ShoppingCart, Sparkles } from 'lucide-react';

interface RecommendedGearProps {
  productIds?: string[];
  title?: string;
  subtitle?: string;
}

export default function RecommendedGear({
  productIds,
  title = '筆者の愛用アイテム',
  subtitle = '数々のレバーレスや周辺機器を試してきた筆者が、実戦で愛用しているメインギアや対戦環境をサポートする推奨アイテムです。',
}: RecommendedGearProps) {
  const products = getRecommendedProducts(productIds);

  if (!products || products.length === 0) return null;

  return (
    <section className="my-10 pt-8 border-t border-neutral-200/80 dark:border-neutral-800">
      {/* ヘッダー */}
      <div className="mb-6">
        <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
              <Sparkles className="w-4 h-4" />
            </span>
            <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
              {title}
            </h3>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700">
            PR・アフィリエイト広告
          </span>
        </div>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* 商品グリッド */}
      <div className={`grid gap-5 ${products.length > 1 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col justify-between p-5 sm:p-6 bg-white dark:bg-neutral-900/90 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-sm hover:border-neutral-300 dark:hover:border-neutral-700 transition-all"
          >
            <div>
              {/* バッジ & カテゴリ */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  {product.categoryLabel}
                </span>
                {product.badge && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/20">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* 商品タイトル */}
              <h4 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white mb-2.5 leading-snug">
                {product.name}
              </h4>

              {/* 商品説明 */}
              <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
                {product.description}
              </p>

              {/* 特徴リスト */}
              {product.features && product.features.length > 0 && (
                <ul className="mb-4 space-y-1.5">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-neutral-600 dark:text-neutral-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              )}

            </div>

            {/* アクションボタン群 */}
            <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800/80 flex flex-col sm:flex-row gap-2.5">
              {/* noteレビューリンク */}
              {product.noteReviewUrl && (
                <a
                  href={product.noteReviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs font-bold transition-colors text-center"
                >
                  <BookOpen className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>noteで詳細レビューを見る</span>
                  <ExternalLink className="w-3 h-3 opacity-60 shrink-0" />
                </a>
              )}

              {/* Amazonアソシエイトリンク */}
              <a
                href={product.amazonUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 dark:bg-amber-500 dark:hover:bg-amber-600 text-neutral-950 text-xs font-bold transition-colors shadow-xs text-center"
              >
                <ShoppingCart className="w-3.5 h-3.5 shrink-0" />
                <span>Amazonで見る</span>
                <ExternalLink className="w-3 h-3 opacity-70 shrink-0" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
