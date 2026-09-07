'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ARTICLES_DATA } from '@/data/articles';
import ComboCard from '@/components/ComboCard';
import PaywallCard from '@/components/PaywallCard';
import { Calendar, Clock, Heart, Share2, ArrowLeft, ArrowRight, BookOpen, Sparkles, ChevronRight, Check } from 'lucide-react';

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
      <div className="min-h-screen bg-[#fafafa] flex flex-col items-center justify-center p-4">
        <h1 className="text-xl font-bold mb-3 text-neutral-900">記事が見つかりませんでした</h1>
        <Link href="/" className="text-neutral-600 hover:text-neutral-900 text-sm underline">
          トップページへ戻る
        </Link>
      </div>
    );
  }

  // 関連記事（同じゲームまたは他のおすすめ記事）
  const relatedArticles = ARTICLES_DATA.filter((a) => a.slug !== article.slug).slice(0, 2);

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
    <div className="min-h-screen bg-[#fafafa] text-neutral-900">
      {/* パンくずリスト */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center gap-1.5 text-xs text-neutral-500 overflow-x-auto">
            <Link href="/" className="hover:text-neutral-900 shrink-0">ホーム</Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <Link href={`/?game=${article.game}`} className="hover:text-neutral-900 shrink-0">
              {article.game === 'sf6' ? 'スト6攻略' : article.game === 'sf7' ? 'スト7展望' : '共通上達論'}
            </Link>
            {article.character && (
              <>
                <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                <span className="text-neutral-700 shrink-0">{article.character}</span>
              </>
            )}
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <span className="text-neutral-400 truncate max-w-[200px]">{article.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* メイン記事本文（8 / 12） */}
          <main className="lg:col-span-8 bg-white p-6 sm:p-10 rounded-2xl border border-neutral-200 shadow-sm">
            {/* 記事ヘッダー */}
            <header className="mb-8 pb-6 border-b border-neutral-100">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-neutral-100 text-neutral-700">
                  {article.game === 'sf6' ? 'スト6' : article.game === 'sf7' ? 'スト7' : '共通理論'}
                </span>
                {article.character && (
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-neutral-100 text-neutral-800">
                    {article.character}
                  </span>
                )}
                {article.isPaid ? (
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-neutral-900 text-white">
                    有料記事（¥{article.price}）
                  </span>
                ) : (
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">
                    無料公開
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 leading-tight mb-4">
                {article.title}
              </h1>

              <div className="flex items-center justify-between text-xs text-neutral-400 pt-3 border-t border-neutral-100">
                <div className="flex items-center gap-2 text-neutral-600">
                  <span className="font-semibold text-neutral-800">{article.author.name}</span>
                  {article.author.mrRating && (
                    <span className="text-[10px] bg-neutral-100 px-1.5 py-0.5 rounded font-mono text-neutral-700">
                      {article.author.mrRating}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{article.publishedAt}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-neutral-400" />
                    <span>読了 {article.readTime}</span>
                  </div>
                </div>
              </div>
            </header>

            {/* 本文 */}
            <article className="text-neutral-800 leading-relaxed text-sm sm:text-base space-y-6">
              {/* リード文 */}
              <div className="p-4 sm:p-5 rounded-xl bg-neutral-50 border border-neutral-100 text-neutral-700 leading-relaxed text-sm">
                {article.freeContent.intro}
              </div>

              {/* 目次 */}
              <div className="p-5 rounded-xl bg-neutral-50 border border-neutral-200/80 my-6">
                <div className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-neutral-600" />
                  <span>目次</span>
                </div>
                <ul className="space-y-1.5 text-xs sm:text-sm text-neutral-600">
                  {article.freeContent.sections.map((sec, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="text-neutral-400 font-mono text-xs">0{idx + 1}.</span>
                      <span className="hover:text-neutral-900">{sec.title}</span>
                    </li>
                  ))}
                  {article.paidContent.sections.map((sec, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-neutral-800 font-medium">
                      <span className="text-neutral-400 font-mono text-xs">0{article.freeContent.sections.length + idx + 1}.</span>
                      <span>{sec.title}</span>
                      <span className="text-[10px] bg-neutral-200 text-neutral-700 px-1 py-0.2 rounded font-normal">有料</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 無料公開セクション */}
              {article.freeContent.sections.map((section, idx) => (
                <div key={idx} className="pt-4">
                  <h2 className="text-lg sm:text-xl font-bold text-neutral-900 mb-3 pb-2 border-b border-neutral-100">
                    {section.title}
                  </h2>
                  <p className="text-neutral-700 leading-relaxed mb-4">
                    {section.body}
                  </p>

                  {/* コンボレシピ */}
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

              {/* 有料記事ロック & アンロック後コンテンツ */}
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
                    <div className="pt-6 border-t border-neutral-200 space-y-6">
                      <div className="p-3.5 rounded-lg bg-neutral-100 text-neutral-800 text-xs flex items-center gap-2 font-medium">
                        <Sparkles className="w-4 h-4 text-neutral-600 shrink-0" />
                        <span>ここから先は有料会員・購入者限定の攻略セクションです。</span>
                      </div>

                      {article.paidContent.sections.map((section, idx) => (
                        <div key={idx} className="pt-4">
                          <h2 className="text-lg sm:text-xl font-bold text-neutral-900 mb-3 pb-2 border-b border-neutral-200">
                            {section.title}
                          </h2>
                          <p className="text-neutral-700 leading-relaxed mb-4">
                            {section.body}
                          </p>

                          {section.tips && (
                            <div className="my-4 p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                              <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2.5">
                                実戦のポイント
                              </h4>
                              <ul className="space-y-2 text-xs sm:text-sm text-neutral-700">
                                {section.tips.map((tip, tIdx) => (
                                  <li key={tIdx} className="flex items-start gap-2">
                                    <span className="text-neutral-400 font-bold">•</span>
                                    <span>{tip}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {section.secretSetplay && section.secretSetplay.map((sp, spIdx) => (
                            <div key={spIdx} className="my-4 p-4 rounded-xl bg-neutral-50 border border-neutral-300">
                              <div className="flex items-center justify-between gap-2 mb-2">
                                <span className="font-bold text-sm text-neutral-900">{sp.name}</span>
                                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-neutral-200 text-neutral-800">
                                  {sp.frameAdvantage}
                                </span>
                              </div>
                              <div className="p-2.5 rounded-lg bg-neutral-900 text-white font-mono text-xs sm:text-sm mb-2">
                                {sp.input}
                              </div>
                              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
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

            {/* いいね・シェア */}
            <div className="mt-12 pt-6 border-t border-neutral-100 flex items-center justify-between">
              <button
                onClick={handleLike}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                  hasLiked
                    ? 'bg-neutral-900 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${hasLiked ? 'fill-current text-white' : 'text-neutral-500'}`} />
                <span>役に立った ({likes})</span>
              </button>

              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copied ? 'コピー完了！' : 'シェア'}</span>
              </button>
            </div>
          </main>

          {/* 右サイドバー（4 / 12）：遊覧性・回遊性の高い導線 */}
          <aside className="lg:col-span-4 space-y-6">
            {/* 著者プロフィール */}
            <div className="p-5 bg-white rounded-xl border border-neutral-200">
              <div className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-3">
                執筆者について
              </div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center text-base">
                  {article.author.avatar}
                </div>
                <div>
                  <div className="font-bold text-sm text-neutral-900">{article.author.name}</div>
                  <div className="text-xs text-neutral-500 font-mono">{article.author.mrRating}</div>
                </div>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed mb-3">
                {article.author.bio}
              </p>
              <div className="text-[11px] text-neutral-400">
                note有料記事累計1,000部突破。スト6〜スト7の攻略を継続発信。
              </div>
            </div>

            {/* この記事を読んだ人におすすめ（関連記事） */}
            <div className="p-5 bg-white rounded-xl border border-neutral-200">
              <div className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-3">
                あわせて読みたい記事
              </div>
              <div className="space-y-4">
                {relatedArticles.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/articles/${rel.slug}`}
                    className="block group"
                  >
                    <span className="text-[10px] text-neutral-400 block mb-1">
                      {rel.game === 'sf6' ? 'スト6' : rel.game === 'sf7' ? 'スト7' : '共通理論'}
                    </span>
                    <h4 className="text-xs font-semibold text-neutral-800 group-hover:text-neutral-900 line-clamp-2 leading-snug mb-1">
                      {rel.title}
                    </h4>
                    <p className="text-[11px] text-neutral-500 line-clamp-2 leading-relaxed">
                      {rel.summary}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            {/* 月額マガジンCTA */}
            <div className="p-5 bg-neutral-900 text-white rounded-xl">
              <h3 className="text-sm font-bold text-white mb-2">
                月額マガジン案内
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                月額¥980で全有料記事が読み放題。最新の攻略情報が随時追加されます。
              </p>
              <Link
                href="/membership"
                className="block w-full py-2 rounded-lg bg-white hover:bg-neutral-100 text-neutral-900 text-xs font-bold text-center transition-colors"
              >
                マガジンに参加する
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
