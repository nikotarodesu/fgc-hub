'use client';

import { useState } from 'react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { ARTICLES_DATA } from '@/data/articles';
import ComboCard from '@/components/ComboCard';
import PaywallCard from '@/components/PaywallCard';
import { Calendar, Clock, Heart, Share2, ArrowLeft, ShieldCheck, Sparkles, BookOpen, AlertCircle } from 'lucide-react';

export default function ArticleDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const article = ARTICLES_DATA.find((a) => a.slug === slug);

  const [isUnlocked, setIsUnlocked] = useState(false);
  const [likes, setLikes] = useState(article ? article.likesCount : 0);
  const [hasLiked, setHasLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!article) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">記事が見つかりませんでした</h1>
        <Link href="/" className="text-orange-400 underline">トップページに戻る</Link>
      </div>
    );
  }

  const handleLike = () => {
    if (!hasLiked) {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
    } else {
      setLikes((prev) => prev - 1);
      setHasLiked(false);
    }
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-orange-500 selection:text-black">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* 戻るリンク */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>記事一覧へ戻る</span>
        </Link>

        {/* 記事ヘッダー */}
        <header className="mb-10 pb-8 border-b border-neutral-800">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-orange-950/80 text-orange-400 border border-orange-800/40 uppercase">
              {article.game === 'sf6' ? 'STREET FIGHTER 6' : article.game === 'sf7' ? 'STREET FIGHTER 7' : '格ゲー共通理論'}
            </span>
            {article.character && (
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-neutral-800 text-neutral-200 border border-neutral-700">
                {article.character}
              </span>
            )}
            {article.isPaid ? (
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-950 text-amber-300 border border-amber-600/40">
                有料記事（¥{article.price}）
              </span>
            ) : (
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-600/40">
                無料公開中
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight mb-6">
            {article.title}
          </h1>

          {/* 著者 & メタ情報 */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-neutral-800/60 text-xs text-neutral-400">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-lg">
                {article.author.avatar}
              </div>
              <div>
                <div className="font-bold text-white text-sm flex items-center gap-1.5">
                  <span>{article.author.name}</span>
                  {article.author.mrRating && (
                    <span className="text-[10px] bg-neutral-800 text-orange-400 px-1.5 py-0.2 rounded font-mono">
                      {article.author.mrRating}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-neutral-400 line-clamp-1">{article.author.bio}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                <span>{article.publishedAt}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-neutral-500" />
                <span>読了 {article.readTime}</span>
              </div>
            </div>
          </div>
        </header>

        {/* 記事本文 */}
        <article className="prose prose-invert max-w-none">
          {/* リード文 */}
          <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 mb-8 text-neutral-300 text-sm sm:text-base leading-relaxed">
            {article.freeContent.intro}
          </div>

          {/* 目次 */}
          <div className="p-5 rounded-xl bg-neutral-900/40 border border-neutral-800/60 mb-10">
            <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-orange-400" />
              <span>本記事の目次</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-neutral-300">
              {article.freeContent.sections.map((sec, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="text-neutral-500 font-mono">0{idx + 1}.</span>
                  <span>{sec.title}</span>
                </li>
              ))}
              {article.paidContent.sections.map((sec, idx) => (
                <li key={idx} className="flex items-center gap-2 text-amber-400 font-medium">
                  <span className="text-amber-500/60 font-mono">0{article.freeContent.sections.length + idx + 1}.</span>
                  <span>{sec.title}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 無料公開セクション */}
          {article.freeContent.sections.map((section, idx) => (
            <div key={idx} className="mb-10">
              <h2 className="text-xl sm:text-2xl font-black text-white mb-4 pb-2 border-b border-neutral-800 flex items-center gap-2">
                <span className="text-orange-500 text-base">▶</span>
                <span>{section.title}</span>
              </h2>
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed mb-4">
                {section.body}
              </p>

              {/* コンボレシピがある場合 */}
              {section.combo && section.combo.map((c, cIdx) => (
                <ComboCard
                  key={cIdx}
                  name={c.name}
                  recipe={c.recipe}
                  damage={c.damage}
                  driveGauge={c.driveGauge}
                  situation={c.situation}
                  note={c.note}
                />
              ))}
            </div>
          ))}

          {/* 有料記事ロック or 有料コンテンツの表示 */}
          {article.isPaid && (
            <>
              <PaywallCard
                price={article.price}
                isUnlocked={isUnlocked}
                onToggleUnlock={() => setIsUnlocked(!isUnlocked)}
                onBuyArticle={() => setIsUnlocked(true)}
                onJoinMembership={() => setIsUnlocked(true)}
              />

              {/* アンロック時の有料限定コンテンツ */}
              {isUnlocked && (
                <div className="mt-8 pt-8 border-t-2 border-dashed border-amber-500/30 animate-fade-in">
                  <div className="mb-6 p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>ここから先は有料会員・購入者限定の完全攻略セクションです。</span>
                  </div>

                  {article.paidContent.sections.map((section, idx) => (
                    <div key={idx} className="mb-10">
                      <h2 className="text-xl sm:text-2xl font-black text-amber-300 mb-4 pb-2 border-b border-amber-500/20">
                        {section.title}
                      </h2>
                      <p className="text-sm sm:text-base text-neutral-200 leading-relaxed mb-6">
                        {section.body}
                      </p>

                      {/* 重要ポイント */}
                      {section.tips && (
                        <div className="my-6 p-5 rounded-xl bg-neutral-900 border border-amber-500/30">
                          <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3">
                            実践の重要ポイント
                          </h4>
                          <ul className="space-y-2 text-xs sm:text-sm text-neutral-300">
                            {section.tips.map((tip, tIdx) => (
                              <li key={tIdx} className="flex items-start gap-2">
                                <span className="text-amber-400 font-bold">・</span>
                                <span>{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* 秘密のセットプレイカード */}
                      {section.secretSetplay && section.secretSetplay.map((sp, spIdx) => (
                        <div key={spIdx} className="my-5 p-5 rounded-2xl bg-neutral-900/90 border border-red-500/40 shadow-lg">
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <span className="font-black text-white text-sm sm:text-base">{sp.name}</span>
                            <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-red-900/60 text-red-300 border border-red-700/50">
                              {sp.frameAdvantage}
                            </span>
                          </div>
                          <div className="p-3 rounded-lg bg-black text-orange-400 font-mono text-xs sm:text-sm mb-3">
                            {sp.input}
                          </div>
                          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                            {sp.explanation}
                          </p>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </article>

        {/* 記事フッター（いいね・シェア） */}
        <div className="mt-16 pt-8 border-t border-neutral-800 flex items-center justify-between">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              hasLiked
                ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                : 'bg-neutral-900 text-neutral-300 hover:text-white hover:bg-neutral-800 border border-neutral-800'
            }`}
          >
            <Heart className={`w-4 h-4 ${hasLiked ? 'fill-current text-white' : 'text-red-400'}`} />
            <span>役に立った ({likes})</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-medium bg-neutral-900 text-neutral-300 hover:text-white hover:bg-neutral-800 border border-neutral-800 transition-colors cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>{copied ? 'リンクをコピーしました！' : '記事をシェア'}</span>
          </button>
        </div>
      </main>
    </div>
  );
}
