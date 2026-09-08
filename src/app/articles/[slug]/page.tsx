'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ARTICLES_DATA } from '@/data/articles';
import Image from 'next/image';
import ComboCard from '@/components/ComboCard';
import PaywallCard from '@/components/PaywallCard';
import YouTubeEmbed from '@/components/YouTubeEmbed';
import RichContent from '@/components/RichContent';
import ArticleQuickJump, { QuickJumpSection } from '@/components/ArticleQuickJump';
import { HadokenFlowDiagram, DistanceMeterDiagram, MindsetComparisonTable } from '@/components/articles/RyuStrategyDiagrams';
import {
  Calendar,
  Clock,
  Heart,
  Share2,
  BookOpen,
  Sparkles,
  ChevronRight,
  Star,
} from 'lucide-react';

export default function ArticleDetailPage() {
  const params = useParams();
  const rawSlug = params?.slug as string;
  const isModernAlias = rawSlug === 'ryu-modern-complete-guide';
  const slug = (rawSlug === 'ryu-classic-complete-guide' || isModernAlias)
    ? 'ryu-complete-guide'
    : rawSlug;

  const article = ARTICLES_DATA.find((a) => a.slug === slug);

  const [activeControlType, setActiveControlType] = useState<'classic' | 'modern'>(
    isModernAlias ? 'modern' : 'classic'
  );

  const [isUnlocked, setIsUnlocked] = useState(false);
  const [likes, setLikes] = useState(article ? article.likesCount : 0);
  const [hasLiked, setHasLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  // お気に入り（ブックマーク）と現在セクションID
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [activeSectionId, setActiveSectionId] = useState<string>('sec-free-0');
  const [showQuickJump, setShowQuickJump] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    if (!article) return;
    try {
      const saved = localStorage.getItem(`fgc_bookmarks_${article.id}`);
      if (saved) {
        setBookmarks(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, [article]);

  // 有料記事トークンの自動検証とアンロック
  useEffect(() => {
    if (!article || !article.isPaid) return;

    const targetSlug = article.slug;

    async function checkTokenAccess() {
      try {
        let tokenToVerify: string | null = null;

        // 1. URLパラメータから ?token= を取得
        if (typeof window !== 'undefined') {
          const params = new URLSearchParams(window.location.search);
          const urlToken = params.get('token');
          if (urlToken) {
            tokenToVerify = urlToken;
          }
        }

        // 2. なければLocalStorageから取得
        if (!tokenToVerify && typeof window !== 'undefined') {
          tokenToVerify =
            localStorage.getItem(`fgc_unlocked_${targetSlug}`) ||
            localStorage.getItem('fgc_membership_token');
        }

        if (!tokenToVerify) return;

        // 3. サーバーへ検証リクエスト
        const res = await fetch('/api/verify-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: tokenToVerify, slug: targetSlug }),
        });

        const data = await res.json();
        if (res.ok && data.valid) {
          setIsUnlocked(true);
          if (data.email) {
            setUserEmail(data.email);
            localStorage.setItem('fgc_user_email', data.email);
          }
          localStorage.setItem(`fgc_unlocked_${targetSlug}`, tokenToVerify);
        }
      } catch (e) {
        console.error('Failed to verify access token:', e);
      }
    }

    checkTokenAccess();
  }, [article]);

  const handleApplyToken = async (manualToken: string): Promise<boolean> => {
    if (!article) return false;
    try {
      const res = await fetch('/api/verify-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: manualToken, slug: article.slug }),
      });
      const data = await res.json();
      if (res.ok && data.valid) {
        setIsUnlocked(true);
        if (data.email) {
          setUserEmail(data.email);
          localStorage.setItem('fgc_user_email', data.email);
        }
        localStorage.setItem(`fgc_unlocked_${article.slug}`, manualToken);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const currentVariant = article?.variants ? article.variants[activeControlType] : null;
  const introText = currentVariant ? currentVariant.intro : article?.freeContent.intro || '';
  const freeSections = currentVariant ? currentVariant.sections : article?.freeContent.sections || [];
  const paidSections = currentVariant ? currentVariant.paidSections : article?.paidContent.sections || [];

  // 全セクション一覧（クイックジャンプ用）
  const allSectionsList: QuickJumpSection[] = [
    ...freeSections.map((sec, idx) => ({
      id: `sec-free-${idx}`,
      title: sec.title,
      isPaid: false,
    })),
    ...paidSections.map((sec, idx) => ({
      id: `sec-paid-${idx}`,
      title: sec.title,
      isPaid: true,
    })),
  ];

  // スクロール位置の検知（現在セクション追従 & フローティングバー表示）
  useEffect(() => {
    const handleScroll = () => {
      setShowQuickJump(window.scrollY > 280);

      const allIds = [
        ...freeSections.map((_, i) => `sec-free-${i}`),
        ...paidSections.map((_, i) => `sec-paid-${i}`),
      ];

      for (let i = allIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(allIds[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 180) {
            setActiveSectionId(allIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [freeSections, paidSections]);

  const handleToggleBookmark = (id: string) => {
    if (!article) return;
    setBookmarks((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem(`fgc_bookmarks_${article.id}`, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const handleJumpToSection = (id: string) => {
    setActiveSectionId(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -70;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  if (!article) {
    return (
      <div className="min-h-screen bg-[#f8fafc] dark:bg-neutral-950 flex flex-col items-center justify-center p-4">
        <h1 className="text-xl font-bold mb-3 text-neutral-900 dark:text-white">記事が見つかりませんでした</h1>
        <Link href="/" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white text-sm underline">
          トップページへ戻る
        </Link>
      </div>
    );
  }

  // 関連記事
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

  const handleBuyArticle = async () => {
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planType: 'article',
          slug: article.slug,
          title: article.title,
          price: article.price || 500,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || 'Stripe APIキーの設定後に本番決済が有効化されます。');
      }
    } catch {
      alert('決済処理の呼び出しに失敗しました。');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors">
      {/* 画面追従セクションバー ＆ クイック目次ジャンプ */}
      {showQuickJump && (
        <ArticleQuickJump
          sections={allSectionsList}
          activeSectionId={activeSectionId}
          bookmarks={bookmarks}
          onToggleBookmark={handleToggleBookmark}
          onJumpToSection={handleJumpToSection}
        />
      )}

      {/* パンくずリスト */}
      <div className="bg-white dark:bg-neutral-900 border-b border-neutral-200/80 dark:border-neutral-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5">
          <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 overflow-x-auto">
            <Link href="/" className="hover:text-neutral-900 dark:hover:text-white shrink-0">ホーム</Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0 text-neutral-300 dark:text-neutral-600" />
            <Link href={`/?game=${article.game}`} className="hover:text-neutral-900 dark:hover:text-white shrink-0">
              {article.game === 'sf6' ? 'スト6攻略' : '共通上達論'}
            </Link>
            {article.character && (
              <>
                <ChevronRight className="w-3.5 h-3.5 shrink-0 text-neutral-300 dark:text-neutral-600" />
                <span className="text-neutral-700 dark:text-neutral-300 shrink-0">{article.character}</span>
              </>
            )}
            <ChevronRight className="w-3.5 h-3.5 shrink-0 text-neutral-300 dark:text-neutral-600" />
            <span className="text-neutral-400 dark:text-neutral-500 truncate max-w-[200px]">{article.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* メイン記事本文（8 / 12） */}
          <main className="lg:col-span-8 bg-white dark:bg-neutral-900 p-6 sm:p-10 rounded-xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs">
            {/* 記事ヘッダー */}
            <header className="mb-8 pb-6 border-b border-neutral-100 dark:border-neutral-800">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                  {article.game === 'sf6' ? 'スト6' : '共通理論'}
                </span>
                {article.character && (
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
                    {article.character}
                  </span>
                )}
                {article.controlType === 'both' ? (
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-sky-50 dark:bg-sky-950/40 text-[#008ba8] dark:text-cyan-300 border border-sky-200 dark:border-sky-800">
                    {activeControlType === 'classic' ? '🥋 クラシック (C) モード' : '⚡️ モダン (M) モード'}
                  </span>
                ) : article.controlType ? (
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-cyan-900 text-cyan-100 border border-cyan-800">
                    {article.controlType === 'classic' ? 'クラシック (C)' : 'モダン (M)'}
                  </span>
                ) : null}
                {article.isPaid ? (
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-200">
                    有料記事（¥{article.price}）
                  </span>
                ) : (
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-500">
                    無料公開
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white leading-tight mb-4">
                {article.title}
              </h1>

              <div className="flex items-center justify-between text-xs text-neutral-400 dark:text-neutral-500 pt-3 border-t border-neutral-100 dark:border-neutral-800">
                <div className="flex items-center gap-2.5 text-neutral-600 dark:text-neutral-300">
                  <div className="w-7 h-7 rounded-full overflow-hidden border border-neutral-900 dark:border-neutral-700 bg-[#00a3c4] inline-block shrink-0">
                    <Image src="/icon.png" alt="にこ太郎" width={28} height={28} className="w-full h-full object-cover" />
                  </div>
                  <span className="font-bold text-neutral-900 dark:text-white">{article.author.name}</span>
                  <span className="text-[10px] bg-sky-50 dark:bg-sky-950/50 text-[#008ba8] dark:text-cyan-300 border border-sky-200 dark:border-sky-800 px-2 py-0.5 rounded-full font-bold">
                    {article.author.mrRating}
                  </span>
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
            <article className="text-neutral-800 dark:text-neutral-200 leading-relaxed text-sm sm:text-base space-y-6">
              {/* クラシック / モダン切り替えスイッチ */}
              {article.variants && (
                <div className="p-2.5 bg-gradient-to-r from-neutral-100 via-neutral-50 to-neutral-100 dark:from-neutral-800/80 dark:via-neutral-900/60 dark:to-neutral-800/80 rounded-2xl border border-neutral-200/90 dark:border-neutral-700/80 shadow-2xs">
                  <div className="text-[11px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider px-2 pt-1 pb-1.5 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 font-sans text-neutral-700 dark:text-neutral-300 font-bold">
                      <span className="w-2 h-2 rounded-full bg-cyan-600 dark:bg-cyan-400 animate-pulse" />
                      操作タイプ切り替え（クラシック / モダン）
                    </span>
                    <span className="text-[10px] text-neutral-500 dark:text-neutral-400 bg-white dark:bg-neutral-800 px-2 py-0.5 rounded-md border border-neutral-200/80 dark:border-neutral-700 font-medium">
                      ワンクリックで即座に切り替え
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <button
                      type="button"
                      onClick={() => setActiveControlType('classic')}
                      className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        activeControlType === 'classic'
                          ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-sm ring-1 ring-neutral-900 dark:ring-white'
                          : 'bg-white/80 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-white dark:hover:bg-neutral-700 border border-neutral-200/60 dark:border-neutral-700'
                      }`}
                    >
                      <span className="text-base">🥋</span>
                      <span>クラシック (Classic)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveControlType('modern')}
                      className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        activeControlType === 'modern'
                          ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-sm ring-1 ring-neutral-900 dark:ring-white'
                          : 'bg-white/80 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-white dark:hover:bg-neutral-700 border border-neutral-200/60 dark:border-neutral-700'
                      }`}
                    >
                      <span className="text-base">⚡️</span>
                      <span>モダン (Modern)</span>
                    </button>
                  </div>
                </div>
              )}

              {/* 無料記事：YouTube動画プレイヤー（記事冒頭に配置） */}
              {!article.isPaid && article.youtubeVideoId && (
                <div className="mb-6">
                  <YouTubeEmbed
                    videoId={article.youtubeVideoId}
                    title={article.title}
                    caption="実戦解説・対戦リプレイ動画（YouTube）"
                  />
                </div>
              )}

              {/* リード文 */}
              <div className="p-5 rounded-xl bg-neutral-50/90 dark:bg-neutral-800/40 border border-neutral-200/80 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 shadow-2xs">
                <RichContent content={introText} />
              </div>

              {/* 目次 */}
              <div className="p-5 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/80 dark:border-neutral-800 my-6">
                <div className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider mb-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                    <span>目次</span>
                  </div>
                  {currentVariant && (
                    <span className="text-[11px] font-bold text-[#008ba8] dark:text-cyan-300 bg-sky-50 dark:bg-sky-950/40 px-2 py-0.5 rounded border border-sky-200 dark:border-sky-800">
                      {activeControlType === 'classic' ? '🥋 クラシック編' : '⚡️ モダン編'}
                    </span>
                  )}
                </div>

                {/* ★ お気に入り登録済みセクションのクイックトレイ */}
                {bookmarks.length > 0 && (
                  <div className="mb-3 p-3 rounded-lg bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-900/40">
                    <div className="text-[11px] font-bold text-amber-900 dark:text-amber-300 mb-1.5 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
                      <span>お気に入り章（トレモ用即呼出）:</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {bookmarks.map((bId) => {
                        const sec = allSectionsList.find((s) => s.id === bId);
                        if (!sec) return null;
                        return (
                          <button
                            key={bId}
                            type="button"
                            onClick={() => handleJumpToSection(bId)}
                            className="px-2.5 py-1 rounded-md bg-white dark:bg-neutral-800 text-[11px] font-bold text-neutral-800 dark:text-neutral-200 border border-amber-200/80 dark:border-amber-900/50 hover:bg-amber-100 dark:hover:bg-neutral-700 transition-colors cursor-pointer shadow-2xs"
                          >
                            {sec.title}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                <ul className="space-y-1.5 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300">
                  {freeSections.map((sec, idx) => (
                    <li key={idx} className="flex items-center justify-between gap-2 group">
                      <button
                        type="button"
                        onClick={() => handleJumpToSection(`sec-free-${idx}`)}
                        className="flex items-center gap-2 hover:text-neutral-900 dark:hover:text-white text-left cursor-pointer flex-1"
                      >
                        <span className="text-neutral-400 dark:text-neutral-500 font-mono text-xs">0{idx + 1}.</span>
                        <span className="group-hover:underline">{sec.title}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleToggleBookmark(`sec-free-${idx}`)}
                        className={`p-1 rounded transition-colors cursor-pointer ${
                          bookmarks.includes(`sec-free-${idx}`)
                            ? 'text-amber-500'
                            : 'text-neutral-300 dark:text-neutral-600 hover:text-amber-500'
                        }`}
                        title="お気に入り登録"
                      >
                        <Star className={`w-3.5 h-3.5 ${bookmarks.includes(`sec-free-${idx}`) ? 'fill-current' : ''}`} />
                      </button>
                    </li>
                  ))}
                  {paidSections.map((sec, idx) => (
                    <li key={idx} className="flex items-center justify-between gap-2 group text-neutral-800 dark:text-neutral-200 font-medium">
                      <button
                        type="button"
                        onClick={() => handleJumpToSection(`sec-paid-${idx}`)}
                        className="flex items-center gap-2 hover:text-neutral-900 dark:hover:text-white text-left cursor-pointer flex-1"
                      >
                        <span className="text-neutral-400 dark:text-neutral-500 font-mono text-xs">0{freeSections.length + idx + 1}.</span>
                        <span className="group-hover:underline">{sec.title}</span>
                        <span className="text-[10px] bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 px-1 py-0.2 rounded font-normal shrink-0">有料</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleToggleBookmark(`sec-paid-${idx}`)}
                        className={`p-1 rounded transition-colors cursor-pointer ${
                          bookmarks.includes(`sec-paid-${idx}`)
                            ? 'text-amber-500'
                            : 'text-neutral-300 dark:text-neutral-600 hover:text-amber-500'
                        }`}
                        title="お気に入り登録"
                      >
                        <Star className={`w-3.5 h-3.5 ${bookmarks.includes(`sec-paid-${idx}`) ? 'fill-current' : ''}`} />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 無料公開セクション */}
              {freeSections.map((section, idx) => (
                <div key={idx} id={`sec-free-${idx}`} className="pt-6 scroll-mt-16">
                  <div className="flex items-center justify-between gap-2 mb-4 pb-2 border-b border-neutral-200/80 dark:border-neutral-800">
                    <h2 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white">
                      {section.title}
                    </h2>
                    <button
                      type="button"
                      onClick={() => handleToggleBookmark(`sec-free-${idx}`)}
                      className={`p-1.5 rounded-lg flex items-center gap-1 text-xs transition-colors cursor-pointer ${
                        bookmarks.includes(`sec-free-${idx}`)
                          ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/40 font-bold'
                          : 'text-neutral-400 hover:text-amber-500 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                      }`}
                      title={bookmarks.includes(`sec-free-${idx}`) ? 'お気に入りを解除' : 'この章をお気に入りに登録'}
                    >
                      <Star className={`w-4 h-4 ${bookmarks.includes(`sec-free-${idx}`) ? 'fill-current' : ''}`} />
                      <span className="hidden sm:inline text-[11px]">
                        {bookmarks.includes(`sec-free-${idx}`) ? '登録済み' : 'お気に入り'}
                      </span>
                    </button>
                  </div>

                  <div className="mb-4">
                    <RichContent
                      content={section.body}
                      isNeutralMovesSection={section.title.includes('立ち回りで振る技')}
                    />
                  </div>

                  {/* 図解ダイアグラム */}
                  {section.diagramType === 'hadoken-flow' && <HadokenFlowDiagram />}
                  {section.diagramType === 'distance-meter' && <DistanceMeterDiagram />}
                  {section.diagramType === 'mindset-comparison' && <MindsetComparisonTable />}

                  {/* スクショ画像 */}
                  {section.image && (
                    <div className="my-5 overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-900 shadow-sm">
                      <Image
                        src={section.image.src}
                        alt={section.image.alt}
                        width={1200}
                        height={675}
                        className="w-full h-auto object-cover"
                      />
                      {section.image.caption && (
                        <div className="p-2.5 bg-neutral-50 dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700 text-xs text-neutral-600 dark:text-neutral-300 text-center font-medium">
                          {section.image.caption}
                        </div>
                      )}
                    </div>
                  )}

                  {/* 箇条書きポイント */}
                  {section.bulletPoints && (
                    <ul className="my-4 space-y-2 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 bg-neutral-50 dark:bg-neutral-800/40 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800">
                      {section.bulletPoints.map((bp, bpIdx) => (
                        <li key={bpIdx} className="flex items-start gap-2">
                          <span className="text-neutral-900 dark:text-white font-bold shrink-0 mt-0.5">▶</span>
                          <span className="leading-relaxed">{bp}</span>
                        </li>
                      ))}
                    </ul>
                  )}

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
                    userEmail={userEmail}
                    onToggleUnlock={() => setIsUnlocked(!isUnlocked)}
                    onBuyArticle={handleBuyArticle}
                    onJoinMembership={() => { window.location.href = '/membership'; }}
                    onApplyToken={handleApplyToken}
                  />

                  {/* アンロック時の有料限定コンテンツ */}
                  {isUnlocked && (
                    <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 space-y-6">
                      <div className="p-3.5 rounded-lg bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 text-xs flex flex-wrap items-center justify-between gap-2 font-medium border border-emerald-200 dark:border-emerald-800">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <span>ここから先は有料会員・購入者限定の攻略セクションです。</span>
                        </div>
                        {userEmail && (
                          <span className="text-[11px] opacity-80 font-mono">
                            購入認証: {userEmail}
                          </span>
                        )}
                      </div>

                      {/* 有料限定：YouTube動画プレイヤー */}
                      {article.youtubeVideoId && (
                        <div className="my-6">
                          <h3 className="text-sm font-bold text-neutral-900 dark:text-white mb-2">
                            ▶ 実戦解説動画（フルHD）
                          </h3>
                          <YouTubeEmbed videoId={article.youtubeVideoId} title={article.title} />
                        </div>
                      )}

                      {/* 有料セクション */}
                      {paidSections.map((section, idx) => (
                        <div key={idx} id={`sec-paid-${idx}`} className="pt-6 scroll-mt-16">
                          <div className="flex items-center justify-between gap-2 mb-4 pb-2 border-b border-neutral-200/80 dark:border-neutral-800">
                            <h2 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white">
                              {section.title}
                            </h2>
                            <button
                              type="button"
                              onClick={() => handleToggleBookmark(`sec-paid-${idx}`)}
                              className={`p-1.5 rounded-lg flex items-center gap-1 text-xs transition-colors cursor-pointer ${
                                bookmarks.includes(`sec-paid-${idx}`)
                                  ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/40 font-bold'
                                  : 'text-neutral-400 hover:text-amber-500 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                              }`}
                              title={bookmarks.includes(`sec-paid-${idx}`) ? 'お気に入りを解除' : 'この章をお気に入りに登録'}
                            >
                              <Star className={`w-4 h-4 ${bookmarks.includes(`sec-paid-${idx}`) ? 'fill-current' : ''}`} />
                              <span className="hidden sm:inline text-[11px]">
                                {bookmarks.includes(`sec-paid-${idx}`) ? '登録済み' : 'お気に入り'}
                              </span>
                            </button>
                          </div>

                          <div className="mb-4">
                            <RichContent
                              content={section.body}
                              isNeutralMovesSection={section.title.includes('立ち回りで振る技')}
                            />
                          </div>

                          {/* 図解ダイアグラム */}
                          {section.diagramType === 'hadoken-flow' && <HadokenFlowDiagram />}
                          {section.diagramType === 'distance-meter' && <DistanceMeterDiagram />}
                          {section.diagramType === 'mindset-comparison' && <MindsetComparisonTable />}

                          {/* スクショ画像 */}
                          {section.image && (
                            <div className="my-5 overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-900 shadow-sm">
                              <Image
                                src={section.image.src}
                                alt={section.image.alt}
                                width={1200}
                                height={675}
                                className="w-full h-auto object-cover"
                              />
                              {section.image.caption && (
                                <div className="p-2.5 bg-neutral-50 dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700 text-xs text-neutral-600 dark:text-neutral-300 text-center font-medium">
                                  {section.image.caption}
                                </div>
                              )}
                            </div>
                          )}

                          {/* 箇条書き */}
                          {section.bulletPoints && (
                            <ul className="my-4 space-y-2.5 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 bg-neutral-50 dark:bg-neutral-800/40 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800">
                              {section.bulletPoints.map((bp, bpIdx) => (
                                <li key={bpIdx} className="flex items-start gap-2">
                                  <span className="text-neutral-900 dark:text-white font-bold shrink-0 mt-0.5">▶</span>
                                  <span className="leading-relaxed">{bp}</span>
                                </li>
                              ))}
                            </ul>
                          )}

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

                          {/* Q&A相談リスト */}
                          {section.qaList && (
                            <div className="my-6 space-y-4">
                              {section.qaList.map((qa, qaIdx) => (
                                <div key={qaIdx} className="p-5 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800 shadow-xs">
                                  <div className="flex items-start gap-2.5 mb-3">
                                    <span className="px-2 py-0.5 rounded bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-bold text-xs shrink-0">
                                      Q{qa.number}
                                    </span>
                                    <h4 className="font-bold text-sm sm:text-base text-neutral-900 dark:text-white leading-snug">
                                      {qa.question}
                                    </h4>
                                  </div>
                                  <div className="pt-3 border-t border-neutral-200/80 dark:border-neutral-700/80 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 whitespace-pre-line leading-relaxed">
                                    {qa.answer}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {section.tips && (
                            <div className="my-4 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-800">
                              <h4 className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider mb-2.5">
                                実戦のポイント
                              </h4>
                              <ul className="space-y-2 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
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
                            <div key={spIdx} className="my-4 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-300 dark:border-neutral-700">
                              <div className="flex items-center justify-between gap-2 mb-2">
                                <span className="font-bold text-sm text-neutral-900 dark:text-white">{sp.name}</span>
                                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200">
                                  {sp.frameAdvantage}
                                </span>
                              </div>
                              <div className="p-2.5 rounded-lg bg-neutral-900 dark:bg-black text-white font-mono text-xs sm:text-sm mb-2 border border-neutral-800">
                                {sp.input}
                              </div>
                              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
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
            <div className="mt-12 pt-6 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
              <button
                type="button"
                onClick={handleLike}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                  hasLiked
                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${hasLiked ? 'fill-current text-white dark:text-neutral-900' : 'text-neutral-500'}`} />
                <span>役に立った ({likes})</span>
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copied ? 'コピー完了！' : 'シェア'}</span>
              </button>
            </div>
          </main>

          {/* 右サイドバー（4 / 12） */}
          <aside className="lg:col-span-4 space-y-5">
            {/* 著者プロフィール */}
            <div className="p-5 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs text-center">
              <div className="w-14 h-14 rounded-full overflow-hidden ring-1 ring-neutral-200 dark:ring-neutral-800 mx-auto mb-3 bg-neutral-100 dark:bg-neutral-800">
                <Image
                  src="/icon.png"
                  alt="にこ太郎"
                  width={56}
                  height={56}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-sm text-neutral-900 dark:text-white">{article.author.name}</h3>
              <div className="inline-block text-[11px] font-medium text-neutral-600 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 px-2.5 py-0.5 rounded-full my-1.5">
                {article.author.mrRating}
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed mt-1 text-left">
                {article.author.bio}
              </p>
            </div>

            {/* 操作タイプ切り替えウィジェット */}
            {article.variants && (
              <div className="p-4 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs">
                <div className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider mb-2.5 flex items-center justify-between">
                  <span>操作タイプ切り替え</span>
                  <span className="text-[10px] font-bold text-cyan-800 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-200/60 dark:border-cyan-800">
                    {activeControlType === 'classic' ? 'クラシック表示中' : 'モダン表示中'}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveControlType('classic');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`py-2 px-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeControlType === 'classic'
                        ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-xs'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-700'
                    }`}
                  >
                    🥋 クラシック
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveControlType('modern');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`py-2 px-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeControlType === 'modern'
                        ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-xs'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-700'
                    }`}
                  >
                    ⚡️ モダン
                  </button>
                </div>
              </div>
            )}

            {/* この記事を読んだ人におすすめ（関連記事） */}
            <div className="p-5 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs">
              <div className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider mb-3">
                あわせて読みたい記事
              </div>
              <div className="space-y-4">
                {relatedArticles.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/articles/${rel.slug}`}
                    className="block group"
                  >
                    <span className="text-[10px] text-neutral-400 dark:text-neutral-500 block mb-1">
                      {rel.game === 'sf6' ? 'スト6' : '共通理論'}
                    </span>
                    <h4 className="text-xs font-bold text-neutral-800 dark:text-neutral-200 group-hover:text-neutral-600 dark:group-hover:text-neutral-400 line-clamp-2 leading-snug mb-1">
                      {rel.title}
                    </h4>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                      {rel.summary}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            {/* 月額マガジン案内カード */}
            <div className="p-5 bg-neutral-900 dark:bg-neutral-950 text-white rounded-xl border border-neutral-800 dark:border-neutral-800 shadow-sm">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400 block mb-1">
                MEMBERSHIP
              </span>
              <h3 className="text-sm font-bold text-white mb-1">
                月額マガジンで読み放題
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                月額¥980でスト6全キャラ攻略＆立ち回り解説がすべて読み放題。最新パッチ追記も含め追加費用なしで閲覧できます。
              </p>
              <Link
                href="/membership"
                className="block w-full py-2 rounded-lg bg-white hover:bg-neutral-100 text-neutral-950 text-xs font-semibold text-center transition-colors"
              >
                マガジン詳細を見る
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
