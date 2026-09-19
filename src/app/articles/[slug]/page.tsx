'use client';

import React, { useState, useEffect, useRef, Fragment } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ARTICLES_DATA, getArticleEyecatch, parseArticleTitle } from '@/data/articles';
import Image from 'next/image';
import ComboCard from '@/components/ComboCard';
import PaywallCard from '@/components/PaywallCard';
import YouTubeEmbed from '@/components/YouTubeEmbed';
import CoachingStickyPlayer from '@/components/CoachingStickyPlayer';
import RichContent from '@/components/RichContent';
import AuthorCard from '@/components/AuthorCard';
import ArticleQuickJump, { QuickJumpSection } from '@/components/ArticleQuickJump';
import DiagramDispatcher from '@/components/articles/DiagramDispatcher';
import ArticleComboReverseLookup from '@/components/articles/ArticleComboReverseLookup';
import OkizemeQuickModal from '@/components/articles/OkizemeQuickModal';
import RecommendedGear from '@/components/RecommendedGear';
import { getSecretUnlockConfig } from '@/data/articles/secretUnlockConfig';
import { useAuth } from '@/contexts/AuthContext';
import {
  Heart,
  Share2,
  BookOpen,
  Sparkles,
  ChevronRight,
  Star,
  X,
  CheckCircle2,
  RefreshCw,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export default function ArticleDetailPage() {
  const params = useParams();
  const rawSlug = params?.slug as string;
  const isModernAlias = rawSlug === 'ryu-modern-complete-guide';
  const slug = (rawSlug === 'ryu-classic-complete-guide' || isModernAlias)
    ? 'ryu-complete-guide'
    : rawSlug;

  const article = ARTICLES_DATA.find((a) => a.slug === slug);
  const isCompleteGuide = Boolean(
    article && (
      article.category === 'character' ||
      article.tags.includes('完全攻略') ||
      article.tags.includes('キャラ別攻略') ||
      slug.includes('complete')
    )
  );
  const isCoaching = Boolean(
    article && (
      article.category === 'coaching' ||
      article.tags.includes('過去のコーチング') ||
      article.tags.includes('コーチング') ||
      Boolean(article.coachingDate)
    )
  );
  // 全てのコーチング記事に追従プレイヤーを適用
  const isCoachingStickyTarget = isCoaching;
  const secretConfig = getSecretUnlockConfig(slug);
  const { user, isPremium } = useAuth();

  const [activeControlType, setActiveControlType] = useState<'classic' | 'modern'>(
    isModernAlias ? 'modern' : (article?.controlType === 'modern' ? 'modern' : 'classic')
  );

  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  // プレミアム会員の場合は自動アンロック
  useEffect(() => {
    if (isPremium) {
      setIsUnlocked(true);
      setAuthChecked(true);
    }
  }, [isPremium]);
  const [forceShowTokenInput, setForceShowTokenInput] = useState(false);
  const [lastReadSectionId, setLastReadSectionId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimerRef = useRef<NodeJS.Timeout | null>(null);

  const [hasLiked, setHasLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  // 記事リアクションの復元
  useEffect(() => {
    if (!article) return;
    try {
      if (localStorage.getItem(`fgc_liked_${article.slug}`) === 'true') {
        setHasLiked(true);
      }
    } catch {}
  }, [article]);

  // お気に入り（ブックマーク）と現在セクションID
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [activeSectionId, setActiveSectionId] = useState<string>('sec-free-0');
  const [activeSubheading, setActiveSubheading] = useState<string | null>(null);
  const [activeItemHeading, setActiveItemHeading] = useState<string | null>(null);
  const [showQuickJump, setShowQuickJump] = useState(false);
  const [isTocModalOpen, setIsTocModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // セクションタイトルの二重番号（例:「01. ① 基本の立ち回り」）を解消し、「01 基本の立ち回り」形式に統一
  const formatSectionTitle = (title: string, index: number): string => {
    const cleanTitle = title.replace(/^[①-⑳❶-❿➊-➓\d\.\s]+/, '').trim();
    const numStr = String(index + 1).padStart(2, '0');
    return `${numStr} ${cleanTitle}`;
  };

  // 記事タイトルをブラウザタブおよびメタ情報に同期
  useEffect(() => {
    if (article) {
      document.title = `${article.title} | にこ太郎の格ゲーLAB`;
    }
  }, [article]);

  // 管理者モード・キャラ別シークレット解放の自動復元（localStorage & カスタムイベント）
  useEffect(() => {
    const checkUnlockStatus = () => {
      try {
        if (typeof window !== 'undefined') {
          const isGlobalAdmin = localStorage.getItem('fgc_admin_mode') === 'true';
          const isSecretUnlocked =
            localStorage.getItem(`fgc_secret_unlocked_${slug}`) === 'true' ||
            (slug.includes('ryu') &&
              (localStorage.getItem('fgc_secret_unlocked_ryu') === 'true' ||
                localStorage.getItem('fgc_secret_unlocked_ryu-complete-guide') === 'true' ||
                localStorage.getItem('fgc_secret_unlocked_ryu-classic-complete-guide') === 'true' ||
                localStorage.getItem('fgc_secret_unlocked_ryu-modern-complete-guide') === 'true'));

          if (isGlobalAdmin || isSecretUnlocked) {
            setIsUnlocked(true);
            setIsAdminMode(true);
            setAuthChecked(true);
          }
        }
      } catch {
        // ignore
      }
    };

    checkUnlockStatus();

    // フッターのⒸ等からの管理者モード切り替えイベントをリアルタイムにリッスン
    const handleAdminEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ enabled: boolean }>;
      const isEnabled = customEvent.detail ? customEvent.detail.enabled : localStorage.getItem('fgc_admin_mode') === 'true';
      setIsUnlocked(isEnabled);
      setIsAdminMode(isEnabled);
      setAuthChecked(true);
    };

    window.addEventListener('fgc_admin_mode_changed', handleAdminEvent);
    return () => {
      window.removeEventListener('fgc_admin_mode_changed', handleAdminEvent);
    };
  }, [slug]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = setTimeout(() => {
      setToastMessage(null);
      toastTimerRef.current = null;
    }, 4500);
  };

  const handleSecretUnlock = (characterKey?: string) => {
    setIsUnlocked(true);
    setIsAdminMode(true);
    try {
      const char = characterKey || 'ryu';
      localStorage.setItem(`fgc_secret_unlocked_${char}`, 'true');
      localStorage.setItem(`fgc_secret_unlocked_${slug}`, 'true');
      if (char === 'ryu' || slug.includes('ryu')) {
        localStorage.setItem('fgc_secret_unlocked_ryu', 'true');
        localStorage.setItem('fgc_secret_unlocked_ryu-complete-guide', 'true');
        localStorage.setItem('fgc_secret_unlocked_ryu-classic-complete-guide', 'true');
        localStorage.setItem('fgc_secret_unlocked_ryu-modern-complete-guide', 'true');
      }
    } catch {}
    const msg = secretConfig?.toastMessage || 'シークレット解放（note購入者特典）: 有料コンテンツを開放しました！';
    showToast(msg);
  };

  const handleAdminUnlock = () => {
    setIsUnlocked(true);
    setIsAdminMode(true);
    try {
      localStorage.setItem('fgc_admin_mode', 'true');
    } catch {}
    showToast('管理者モード: 有料コンテンツを表示しました');
  };

  const handleAdminLock = () => {
    setIsUnlocked(false);
    setIsAdminMode(false);
    try {
      localStorage.removeItem('fgc_admin_mode');
      localStorage.removeItem(`fgc_secret_unlocked_${slug}`);
      if (slug.includes('ryu')) {
        localStorage.removeItem('fgc_secret_unlocked_ryu');
        localStorage.removeItem('fgc_secret_unlocked_ryu-complete-guide');
        localStorage.removeItem('fgc_secret_unlocked_ryu-classic-complete-guide');
        localStorage.removeItem('fgc_secret_unlocked_ryu-modern-complete-guide');
      }
    } catch {}
    showToast('通常表示（ロック状態）に戻しました');
  };

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
    const candidateSlugs = targetSlug.includes('ryu')
      ? ['ryu-complete-guide', 'ryu-classic-complete-guide', 'ryu-modern-complete-guide']
      : [targetSlug];

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

        // 2. なければLocalStorageから取得（クラシック・モダン相互連動）
        if (!tokenToVerify && typeof window !== 'undefined') {
          for (const s of candidateSlugs) {
            const saved = localStorage.getItem(`fgc_unlocked_${s}`);
            if (saved) {
              tokenToVerify = saved;
              break;
            }
          }
          if (!tokenToVerify) {
            tokenToVerify = localStorage.getItem('fgc_membership_token');
          }
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
          // クラシック・モダンの全エイリアスにトークンを保存（相互買い切り閲覧保証）
          candidateSlugs.forEach((s) => {
            localStorage.setItem(`fgc_unlocked_${s}`, tokenToVerify!);
          });
        }
      } catch (e) {
        console.error('Failed to verify access token:', e);
      } finally {
        setAuthChecked(true);
      }
    }

    checkTokenAccess();
  }, [article]);

  // 前回の閲覧位置（記事・操作タイプ別）の自動保存（スクロール位置連動）
  useEffect(() => {
    if (!article || !activeSectionId) return;
    try {
      localStorage.setItem(`fgc_last_pos_${article.slug}_${activeControlType}`, activeSectionId);
    } catch {}
  }, [article, activeSectionId, activeControlType]);

  // 前回の閲覧位置の復元チェック
  useEffect(() => {
    if (!article) return;
    try {
      const saved = localStorage.getItem(`fgc_last_pos_${article.slug}_${activeControlType}`);
      if (saved) {
        setLastReadSectionId(saved);
      } else {
        setLastReadSectionId(null);
      }
    } catch {}
  }, [article, activeControlType]);

  const handleApplyToken = async (manualToken: string): Promise<boolean> => {
    if (!article) return false;
    const candidateSlugs = article.slug.includes('ryu')
      ? ['ryu-complete-guide', 'ryu-classic-complete-guide', 'ryu-modern-complete-guide']
      : [article.slug];

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
        // クラシック・モダン全エイリアスに保存
        candidateSlugs.forEach((s) => {
          localStorage.setItem(`fgc_unlocked_${s}`, manualToken);
        });
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

  // 完全攻略記事用：大見出しごとの折りたたみ状態（キー: `sec-free-0`, `sec-paid-1` 等、true=収納中）
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});

  // コントロールタイプ変更や記事変更時に折りたたみ状態をリセット
  useEffect(() => {
    setCollapsedSections({});
  }, [activeControlType, slug]);

  const toggleSectionCollapse = (secId: string) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [secId]: !prev[secId],
    }));
  };

  const allSectionIds = [
    ...freeSections.map((_, idx) => `sec-free-${idx}`),
    ...(isUnlocked ? paidSections.map((_, idx) => `sec-paid-${idx}`) : []),
  ];
  const isAllCollapsed = allSectionIds.length > 0 && allSectionIds.every((id) => collapsedSections[id]);

  const handleToggleAllCollapse = () => {
    if (isAllCollapsed) {
      setCollapsedSections({});
    } else {
      const next: Record<string, boolean> = {};
      allSectionIds.forEach((id) => {
        next[id] = true;
      });
      setCollapsedSections(next);
    }
  };

  // 全セクション一覧（クイックジャンプ用、二重番号を解消）
  const allSectionsList: QuickJumpSection[] = [];
  freeSections.forEach((sec, idx) => {
    allSectionsList.push({
      id: `sec-free-${idx}`,
      title: formatSectionTitle(sec.title, idx),
      isPaid: false,
    });
  });
  paidSections.forEach((sec, idx) => {
    if (isCompleteGuide && (slug.includes('ryu') || article?.character === 'リュウ') && sec.title.includes('画面中央のコンボ')) {
      allSectionsList.push({
        id: 'combo-reverse-lookup',
        title: '⚡ 実戦コンボ逆引きデータベース',
        isPaid: true,
      });
    }
    allSectionsList.push({
      id: `sec-paid-${idx}`,
      title: formatSectionTitle(sec.title, freeSections.length + idx),
      isPaid: true,
    });
  });

  // スクロール位置の検知（現在セクション追従 & フローティングバー表示 & 小見出しリアルタイム検知）
  useEffect(() => {
    const handleScroll = () => {
      setShowQuickJump(window.scrollY > 280);

      const allIds = allSectionsList.map((s) => s.id);

      let currentActiveSecId: string | null = null;
      for (let i = allIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(allIds[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 180) {
            currentActiveSecId = allIds[i];
            setActiveSectionId(allIds[i]);
            break;
          }
        }
      }

      // 小見出し（❶〜➓）および項目見出し（⭐️、⚡️）のリアルタイム検知
      if (currentActiveSecId) {
        const activeSecEl = document.getElementById(currentActiveSecId);
        if (activeSecEl) {
          const headings = activeSecEl.querySelectorAll<HTMLElement>('[data-subheading], [data-item-heading]');
          let currentSub: string | null = null;
          let currentItem: string | null = null;

          for (let j = 0; j < headings.length; j++) {
            const hEl = headings[j];
            const rect = hEl.getBoundingClientRect();
            // 上部追従バー（高さ約40px）+ 余白を考慮し、rect.top <= 140 で判定
            if (rect.top <= 140) {
              if (hEl.hasAttribute('data-subheading')) {
                currentSub = hEl.getAttribute('data-subheading');
                currentItem = null; // 新しい小見出しに入ったので直前の⭐️/⚡️は一旦リセット
              } else if (hEl.hasAttribute('data-item-heading')) {
                currentItem = hEl.getAttribute('data-item-heading');
              }
            } else {
              break;
            }
          }
          setActiveSubheading(currentSub);
          setActiveItemHeading(currentItem);
        } else {
          setActiveSubheading(null);
          setActiveItemHeading(null);
        }
      } else {
        setActiveSubheading(null);
        setActiveItemHeading(null);
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
    if (isCompleteGuide) {
      if (collapsedSections[id]) {
        setCollapsedSections((prev) => ({ ...prev, [id]: false }));
      }
      const matchedSecId = allSectionIds.find((secId) => id.startsWith(secId));
      if (matchedSecId && collapsedSections[matchedSecId]) {
        setCollapsedSections((prev) => ({ ...prev, [matchedSecId]: false }));
      }
    }
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        // 固定ヘッダー（h-14）および上部追従バー（ArticleQuickJump）を考慮したオフセット
        const yOffset = -100;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 50);
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

  // 関連記事：同一キャラクター（リュウ等）や完全攻略記事を優先的に選出
  const relatedArticles = ARTICLES_DATA
    .filter((a) => a.slug !== article.slug)
    .sort((a, b) => {
      const aSameChar = a.character && a.character === article.character ? 2 : 0;
      const bSameChar = b.character && b.character === article.character ? 2 : 0;
      const aComplete = a.slug.includes('complete') ? 1 : 0;
      const bComplete = b.slug.includes('complete') ? 1 : 0;
      return (bSameChar + bComplete) - (aSameChar + aComplete);
    })
    .slice(0, 3);

  const handleLike = () => {
    if (!article) return;
    setHasLiked((prev) => {
      const next = !prev;
      try {
        if (next) {
          localStorage.setItem(`fgc_liked_${article.slug}`, 'true');
        } else {
          localStorage.removeItem(`fgc_liked_${article.slug}`);
        }
      } catch {}
      return next;
    });
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleBuyArticle = async () => {
    if (!user) {
      // 未ログインの場合は購入前に安全なログインへ案内
      const returnUrl = `/articles/${article.slug}`;
      window.location.href = `/auth/login?next=${encodeURIComponent(returnUrl)}&action=buy`;
      return;
    }

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planType: 'article',
          slug: article.slug,
          title: article.title,
          price: article.price || 500,
          userId: user.id,
          userEmail: user.email,
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
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0f141c] text-neutral-900 dark:text-neutral-200 transition-colors">
      {/* ⑤起き攻めフレーム連動クイックモーダル */}
      <OkizemeQuickModal character={article?.character} />

      {/* 画面追従セクションバー ＆ クイック目次ジャンプ */}
      <ArticleQuickJump
        sections={allSectionsList}
        activeSectionId={activeSectionId}
        activeSubheading={activeSubheading}
        activeItemHeading={activeItemHeading}
        bookmarks={bookmarks}
        onToggleBookmark={handleToggleBookmark}
        onJumpToSection={handleJumpToSection}
        enableBookmarks={isCompleteGuide}
        showBars={showQuickJump}
        isOpenModal={isTocModalOpen}
        onOpenModal={() => setIsTocModalOpen(true)}
        onCloseModal={() => setIsTocModalOpen(false)}
      />

      {/* パンくずリスト */}
      <div className="bg-white dark:bg-[#141a24] border-b border-neutral-200/80 dark:border-neutral-800/80 w-full">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-2 sm:py-2.5">
          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden min-w-0">
            <Link href="/" className="hover:text-neutral-900 dark:hover:text-white shrink-0">ホーム</Link>
            <ChevronRight className="w-3 h-3 shrink-0 text-neutral-300 dark:text-neutral-600" />
            <Link href={`/?game=${article.game}`} className="hover:text-neutral-900 dark:hover:text-white shrink-0">
              {article.game === 'sf6' ? 'スト6攻略' : '共通上達論'}
            </Link>
            {article.character && (
              <>
                <ChevronRight className="w-3 h-3 shrink-0 text-neutral-300 dark:text-neutral-600" />
                <span className="text-neutral-700 dark:text-neutral-300 shrink-0">{article.character}</span>
              </>
            )}
            <ChevronRight className="w-3 h-3 shrink-0 text-neutral-300 dark:text-neutral-600 hidden sm:inline" />
            <span className="text-neutral-400 dark:text-neutral-500 truncate max-w-[240px] hidden sm:inline">{article.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-0 sm:px-6 py-0 sm:py-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 w-full min-w-0">
          {/* メイン記事本文（8 / 12） */}
          <main className="lg:col-span-8 bg-white dark:bg-[#151c28] px-5 sm:px-8 md:p-10 py-5 sm:py-8 rounded-none sm:rounded-xl border-x-0 sm:border border-b sm:border-t border-neutral-200/80 dark:border-neutral-800/80 shadow-xs min-w-0 max-w-full">
            {/* 記事ヘッダー（冒頭情報の整理・重複排除） */}
            <header className="mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-neutral-200/80 dark:border-neutral-800/80 min-w-0">
              {/* カテゴリ・ゲームバッジ */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2 sm:mb-2.5">
                <span className="text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 shrink-0">
                  {article.game === 'sf6' ? 'スト6' : '共通理論'}
                </span>
                {(article.category === 'character' || article.tags.includes('完全攻略') || article.tags.includes('キャラ別攻略') || article.slug.includes('complete')) ? (
                  <span className="text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 shrink-0">
                    完全攻略
                  </span>
                ) : (article.category === 'neutral' || article.slug.includes('neutral')) ? (
                  <span className="text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 shrink-0">
                    立ち回り
                  </span>
                ) : (article.category === 'coaching' || article.tags.includes('過去のコーチング') || article.tags.includes('コーチング')) ? (
                  <span className="text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shrink-0">
                    コーチング
                  </span>
                ) : null}

                {article.isPaid ? (
                  article.subscriptionOnly ? (
                    <span className="text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-200 border border-cyan-800 shrink-0">
                      プレミアム限定
                    </span>
                  ) : (
                    <span className="text-[10px] sm:text-[11px] font-medium px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-200 shrink-0">
                      有料記事（¥{article.price}）
                    </span>
                  )
                ) : (
                  <span className="text-[10px] sm:text-[11px] font-medium px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-500 shrink-0">
                    無料公開
                  </span>
                )}
              </div>

              {/* 1. タイトル（前半とサブタイトルを美しく二段構成にしつつ主見出しとして統一） */}
              {(() => {
                const titleInfo = parseArticleTitle(article.title);
                return (
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-neutral-900 dark:text-neutral-100 leading-snug sm:leading-tight tracking-tight break-words [overflow-wrap:anywhere]">
                    <span>{titleInfo.mainTitle}</span>
                    {titleInfo.subtitle && (
                      <span className="block text-base sm:text-lg md:text-xl font-bold text-neutral-600 dark:text-neutral-300 mt-1 sm:mt-1.5">
                        {titleInfo.subtitle}
                      </span>
                    )}
                  </h1>
                );
              })()}

              {/* 2. 対応パッチ・実施年月・最終確認日 */}
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex flex-wrap items-center gap-2">
                  {article.coachingDate && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800/60 font-semibold">
                      <span>実施年月: {article.coachingDate}</span>
                    </div>
                  )}
                  {!isCoaching && (article.patchVersion || article.patchDate) && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800/60 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>対応パッチ: {article.patchVersion || `${article.patchDate} Update`}</span>
                      {isCompleteGuide && (
                        <span className="text-[11px] text-emerald-700 dark:text-emerald-300 font-normal">（主要技・コンボ検証済み）</span>
                      )}
                    </div>
                  )}
                  {article.updatedAt && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 font-medium">
                      <span>最終更新日: {article.updatedAt}</span>
                    </div>
                  )}
                </div>

                {/* 冒頭の控えめな「購入済みの方はこちら」入口 */}
                {!isUnlocked && authChecked && (
                  <button
                    type="button"
                    onClick={() => {
                      setForceShowTokenInput(true);
                      handleJumpToSection('paywall-card-box');
                    }}
                    className="inline-flex items-center gap-1 text-xs text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white underline transition-colors cursor-pointer py-1"
                  >
                    <span>購入済みの方はこちら</span>
                  </button>
                )}
              </div>

              {/* コーチング記事のアーカイブ注記（スマホ画面を圧迫しないスリムなアコーディオン仕様） */}
              {isCoaching && (
                <details className="group mt-2.5 rounded-lg bg-neutral-50/80 dark:bg-neutral-800/40 border border-neutral-200/60 dark:border-neutral-700/50 text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 transition-all">
                  <summary className="px-3 py-2 cursor-pointer select-none flex items-center justify-between gap-2 font-medium hover:text-neutral-800 dark:hover:text-neutral-200 list-none [&::-webkit-details-marker]:hidden">
                    <span className="flex items-center gap-1.5 truncate">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-neutral-200/80 dark:bg-neutral-700/80 text-neutral-700 dark:text-neutral-300 shrink-0">
                        注記
                      </span>
                      <span className="truncate">当時のバージョン仕様・指導記録に関するご案内</span>
                    </span>
                    <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-normal shrink-0 group-open:hidden">
                      詳細を表示 ▼
                    </span>
                    <span className="text-[10px] text-neutral-400 font-normal shrink-0 hidden group-open:inline">
                      閉じる ▲
                    </span>
                  </summary>
                  <div className="px-3 pb-2.5 pt-1.5 text-[11px] text-neutral-600 dark:text-neutral-400 border-t border-neutral-200/40 dark:border-neutral-700/40 leading-relaxed">
                    本記事は{article.coachingDate ? `${article.coachingDate}時点の` : ''}実戦リプレイに基づく指導記録です。当時のバージョン仕様に基づいているため、最新パッチとは技性能やフレーム状況が一部異なる場合があります。普遍的な立ち回り方針や判断プロセスの事例としてご活用ください。
                  </div>
                </details>
              )}

              {/* アイキャッチビジュアル（16:9比率を保ち見切れを防止） */}
              <div className="mt-4 sm:mt-5 overflow-hidden rounded-xl sm:rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-950 shadow-sm relative">
                <div className="aspect-[16/9] w-full relative overflow-hidden flex items-center justify-center bg-neutral-950">
                  <img
                    src={getArticleEyecatch(article)}
                    alt={`${article.character || 'ストリートファイター6'} 公式アイキャッチ`}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
            </header>

            {/* 本文コンテナ */}
            <article className="text-neutral-800 dark:text-neutral-200 leading-relaxed text-sm sm:text-base space-y-6 min-w-0 max-w-full">
              {/* 3. クラシック / モダン切り替えスイッチ */}
              {article.variants && (
                <div className="p-2.5 sm:p-3 bg-gradient-to-r from-neutral-100 via-neutral-50 to-neutral-100 dark:from-neutral-800/80 dark:via-neutral-900/60 dark:to-neutral-800/80 rounded-xl sm:rounded-2xl border border-neutral-200/90 dark:border-neutral-700/80 shadow-2xs">
                  <div className="text-[11px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider px-1.5 sm:px-2 pt-1 pb-1.5 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 font-sans text-neutral-700 dark:text-neutral-300 font-bold">
                      <span className="w-2 h-2 rounded-full bg-cyan-600 dark:bg-cyan-400 animate-pulse" />
                      操作タイプ切り替え（クラシック / モダン）
                    </span>
                    <span className="hidden sm:inline-block text-[10px] text-neutral-500 dark:text-neutral-400 bg-white dark:bg-neutral-800 px-2 py-0.5 rounded-md border border-neutral-200/80 dark:border-neutral-700 font-medium">
                      ワンクリックで即座に切り替え
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 sm:gap-2 mt-1">
                    <button
                      type="button"
                      onClick={() => setActiveControlType('classic')}
                      className={`py-2 sm:py-2.5 px-2.5 sm:px-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1 sm:gap-2 transition-all cursor-pointer min-w-0 ${
                        activeControlType === 'classic'
                          ? 'bg-[#8B5BB7] text-white shadow-sm ring-1 ring-[#8B5BB7]'
                          : 'bg-white/80 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-300 hover:text-[#8B5BB7] dark:hover:text-[#b38ee0] hover:bg-[#8B5BB7]/10 border border-neutral-200/60 dark:border-neutral-700'
                      }`}
                    >
                      <span className="truncate sm:inline">クラシック<span className="hidden sm:inline"> (Classic)</span></span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveControlType('modern')}
                      className={`py-2 sm:py-2.5 px-2.5 sm:px-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1 sm:gap-2 transition-all cursor-pointer min-w-0 ${
                        activeControlType === 'modern'
                          ? 'bg-[#D8843F] text-white shadow-sm ring-1 ring-[#D8843F]'
                          : 'bg-white/80 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-300 hover:text-[#D8843F] dark:hover:text-[#f0a668] hover:bg-[#D8843F]/10 border border-neutral-200/60 dark:border-neutral-700'
                      }`}
                    >
                      <span className="truncate sm:inline">モダン<span className="hidden sm:inline"> (Modern)</span></span>
                    </button>
                  </div>
                </div>
              )}

              {/* 4. 完全攻略記事限定：購入済みクイックナビゲーション（冒頭表示） */}
              {isCompleteGuide && isUnlocked && (
                <div className="my-3 sm:my-4 p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-neutral-50 via-emerald-50/20 to-neutral-50 dark:from-neutral-900 dark:via-emerald-950/20 dark:to-neutral-900 border border-emerald-200/80 dark:border-emerald-800/60 shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-emerald-200/60 dark:border-emerald-800/40">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span className="text-xs sm:text-sm font-bold text-emerald-950 dark:text-emerald-200">
                        購入認証完了：有料限定の全コンテンツを閲覧中
                      </span>
                    </div>
                    {userEmail && (
                      <span className="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                        購入者: {userEmail}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5">
                    {/* 1. 逆引きを使う */}
                    <button
                      type="button"
                      onClick={() => handleJumpToSection('combo-reverse-lookup')}
                      className="p-3 rounded-xl bg-white dark:bg-neutral-800/90 border border-neutral-200/80 dark:border-neutral-700 hover:border-cyan-500 dark:hover:border-cyan-400 hover:shadow-xs text-left transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 mb-1">
                        <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                        <span>逆引きを使う</span>
                      </div>
                      <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-snug">
                        実戦コンボ逆引きDBへ即移動
                      </p>
                    </button>

                    {/* 2. 保存した攻略を見る */}
                    <button
                      type="button"
                      onClick={() => setIsTocModalOpen(true)}
                      className="p-3 rounded-xl bg-white dark:bg-neutral-800/90 border border-neutral-200/80 dark:border-neutral-700 hover:border-amber-500 dark:hover:border-amber-400 hover:shadow-xs text-left transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 mb-1">
                        <Star className="w-4 h-4 text-amber-500 fill-current" />
                        <span>保存した攻略を見る</span>
                        {bookmarks.length > 0 && (
                          <span className="text-[10px] bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 px-1.5 py-0.2 rounded-full font-bold">
                            {bookmarks.length}件
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-snug">
                        {bookmarks.length > 0
                          ? '目次を開いて保存章へジャンプ'
                          : '各章の★でお気に入り登録可能'}
                      </p>
                    </button>

                    {/* 3. 前回の続きから読む */}
                    {lastReadSectionId && (
                      <button
                        type="button"
                        onClick={() => {
                          handleJumpToSection(lastReadSectionId);
                          showToast('前回の続きの位置へ移動しました');
                        }}
                        className="p-3 rounded-xl bg-white dark:bg-neutral-800/90 border border-neutral-200/80 dark:border-neutral-700 hover:border-emerald-500 dark:hover:border-emerald-400 hover:shadow-xs text-left transition-all cursor-pointer group"
                      >
                        <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 mb-1">
                          <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          <span>前回の続きから読む</span>
                        </div>
                        <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-snug">
                          直前の閲覧位置へ復帰
                        </p>
                      </button>
                    )}
                  </div>
                  <div className="mt-2.5 text-[10px] sm:text-[11px] text-neutral-400 dark:text-neutral-500 text-right">
                    ※お気に入り・閲覧履歴はお使いのブラウザ（端末）内に保存されます
                  </div>
                </div>
              )}

              {/* 5. 完全攻略記事限定：未購入時の「攻略を読む」「逆引きを使う」導線ボタン */}
              {isCompleteGuide && !isUnlocked && (
                <div className="my-3 sm:my-4 grid grid-cols-2 gap-2 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => handleJumpToSection('sec-free-0')}
                    className="py-3 px-3 sm:px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 sm:gap-2 shadow-xs transition-all cursor-pointer active:scale-95"
                  >
                    <BookOpen className="w-4 h-4 shrink-0" />
                    <span>攻略を読む</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      handleJumpToSection('paywall-card-box');
                      showToast('逆引きツールのご利用には、記事のご購入またはプレミアム会員登録が必要です');
                    }}
                    className="py-3 px-3 sm:px-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 sm:gap-2 shadow-xs transition-all cursor-pointer active:scale-95"
                  >
                    <Sparkles className="w-4 h-4 shrink-0" />
                    <span>逆引きを使う</span>
                    <span className="text-[10px] bg-cyan-900/80 px-1.5 py-0.5 rounded text-cyan-200 font-normal">
                      要購入
                    </span>
                  </button>
                </div>
              )}

              {/* リード文（空の場合は表示しない） */}
              {introText && introText.trim() ? (
                <div className="px-3.5 py-3.5 sm:p-5 rounded-lg sm:rounded-xl bg-neutral-50/90 dark:bg-[#1a2332]/50 border border-neutral-200/80 dark:border-[#253247] text-neutral-800 dark:text-neutral-200 shadow-2xs">
                  <RichContent content={introText} controlType={activeControlType} isCoaching={isCoaching} character={article?.character} />
                </div>
              ) : null}

              {/* 無料記事：YouTube動画プレイヤー（リード文・要点の直下に配置） */}
              {!article.isPaid && article.youtubeVideoId && (
                <div className="my-5 sm:my-6">
                  <YouTubeEmbed
                    videoId={article.youtubeVideoId}
                    title={article.title}
                    caption="実戦解説・対戦リプレイ動画（YouTube）"
                  />
                </div>
              )}

              {/* 目次 */}
              <div className="px-3.5 py-3.5 sm:p-5 rounded-lg sm:rounded-xl bg-neutral-50 dark:bg-[#1a2332]/50 border border-neutral-200/80 dark:border-[#253247] my-4 sm:my-6">
                <div className="text-xs font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider mb-2.5 flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                    <span>目次</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {isCompleteGuide && (
                      <button
                        type="button"
                        onClick={handleToggleAllCollapse}
                        className="text-[11px] font-normal text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 hover:bg-cyan-100/60 dark:hover:bg-cyan-950/60 cursor-pointer flex items-center gap-1 bg-cyan-50/90 dark:bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-200/80 dark:border-cyan-800/60 transition-colors"
                        title={isAllCollapsed ? 'すべての章を展開します' : 'すべての章を折りたたみます'}
                      >
                        {isAllCollapsed ? (
                          <>
                            <ChevronDown className="w-3.5 h-3.5" />
                            <span>すべて展開</span>
                          </>
                        ) : (
                          <>
                            <ChevronUp className="w-3.5 h-3.5" />
                            <span>すべて折りたたむ</span>
                          </>
                        )}
                      </button>
                    )}
                    {currentVariant && (
                      <span
                        className="text-[11px] font-bold text-white px-2 py-0.5 rounded shrink-0"
                        style={{ backgroundColor: activeControlType === 'classic' ? '#8B5BB7' : '#D8843F' }}
                      >
                        {activeControlType === 'classic' ? 'クラシック編' : 'モダン編'}
                      </span>
                    )}
                  </div>
                </div>

                {/* ★ お気に入り登録済みセクションのクイックトレイ */}
                {isCompleteGuide && bookmarks.length > 0 && (
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
                  {freeSections.map((sec, idx) => {
                    const secId = `sec-free-${idx}`;
                    const isSecCollapsed = Boolean(isCompleteGuide && collapsedSections[secId]);
                    return (
                      <li key={idx} className="flex items-center justify-between gap-2 group">
                        <button
                          type="button"
                          onClick={() => handleJumpToSection(secId)}
                          className="flex items-center gap-2 hover:text-neutral-900 dark:hover:text-white text-left cursor-pointer flex-1 min-w-0"
                        >
                          <span className="group-hover:underline font-medium truncate">{formatSectionTitle(sec.title, idx)}</span>
                          {isSecCollapsed && (
                            <span className="text-[10px] bg-neutral-200/70 dark:bg-neutral-700/70 text-neutral-500 dark:text-neutral-400 px-1.5 py-0.5 rounded font-normal shrink-0">
                              収納中
                            </span>
                          )}
                        </button>
                        {isCompleteGuide && (
                          <button
                            type="button"
                            onClick={() => handleToggleBookmark(secId)}
                            className={`p-1 rounded transition-colors cursor-pointer shrink-0 ${
                              bookmarks.includes(secId)
                                ? 'text-amber-500'
                                : 'text-neutral-300 dark:text-neutral-600 hover:text-amber-500'
                            }`}
                            title="お気に入り登録"
                          >
                            <Star className={`w-3.5 h-3.5 ${bookmarks.includes(secId) ? 'fill-current' : ''}`} />
                          </button>
                        )}
                      </li>
                    );
                  })}
                  {paidSections.map((sec, idx) => {
                    const secId = `sec-paid-${idx}`;
                    const isSecCollapsed = Boolean(isCompleteGuide && collapsedSections[secId]);
                    return (
                      <li key={idx} className="flex items-center justify-between gap-2 group text-neutral-800 dark:text-neutral-200 font-medium">
                        <button
                          type="button"
                          onClick={() => handleJumpToSection(secId)}
                          className="flex items-center gap-2 hover:text-neutral-900 dark:hover:text-white text-left cursor-pointer flex-1 min-w-0"
                        >
                          <span className="group-hover:underline truncate">{formatSectionTitle(sec.title, freeSections.length + idx)}</span>
                          {isSecCollapsed && (
                            <span className="text-[10px] bg-neutral-200/70 dark:bg-neutral-700/70 text-neutral-500 dark:text-neutral-400 px-1.5 py-0.5 rounded font-normal shrink-0">
                              収納中
                            </span>
                          )}
                          <span className="text-[10px] bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 px-1.5 py-0.5 rounded font-normal shrink-0">
                            {article.subscriptionOnly ? '会員限定' : '有料'}
                          </span>
                        </button>
                        {isCompleteGuide && (
                          <button
                            type="button"
                            onClick={() => handleToggleBookmark(secId)}
                            className={`p-1 rounded transition-colors cursor-pointer shrink-0 ${
                              bookmarks.includes(secId)
                                ? 'text-amber-500'
                                : 'text-neutral-300 dark:text-neutral-600 hover:text-amber-500'
                            }`}
                            title="お気に入り登録"
                          >
                            <Star className={`w-3.5 h-3.5 ${bookmarks.includes(secId) ? 'fill-current' : ''}`} />
                          </button>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* この記事で使用する略称一覧テーブル（指示書 4: 目次直下に配置） */}
              {article.abbreviations && article.abbreviations.length > 0 && (
                <div className="my-4 sm:my-6 p-4 sm:p-5 rounded-lg sm:rounded-xl bg-gradient-to-br from-neutral-50 to-neutral-100/70 dark:from-[#1a2332]/60 dark:to-[#1a2332]/30 border border-neutral-200/90 dark:border-[#253247] shadow-2xs">
                  <div className="flex items-center gap-2 mb-3 text-xs font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
                    <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                    <span>この記事で使用する略称一覧</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs sm:text-sm border-collapse">
                      <thead>
                        <tr className="border-b border-neutral-200 dark:border-neutral-700/80 text-left text-neutral-500 dark:text-neutral-400">
                          <th className="py-2 px-3 font-semibold">正式名称</th>
                          <th className="py-2 px-2 text-center w-8 text-neutral-400">➔</th>
                          <th className="py-2 px-3 font-semibold text-cyan-600 dark:text-cyan-400">記事内の略称</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-200/60 dark:divide-neutral-700/50">
                        {article.abbreviations.map((item, aIdx) => (
                          <tr key={aIdx} className="hover:bg-neutral-100/50 dark:hover:bg-neutral-800/40 transition-colors">
                            <td className="py-2 px-3 font-medium text-neutral-800 dark:text-neutral-200 font-sans">{item.formal}</td>
                            <td className="py-2 px-2 text-center text-neutral-400 text-xs">➔</td>
                            <td className="py-2 px-3 font-bold text-cyan-700 dark:text-cyan-300 font-mono">{item.abbreviation}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-2.5 text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    ※ 本文およびコンボ解説では、初心者の方でも直感的に理解できるよう上記の略称を使用しています。
                  </p>
                </div>
              )}

              {/* 無料公開セクション */}
              {freeSections.map((section, idx) => {
                const secId = `sec-free-${idx}`;
                const isCollapsed = Boolean(isCompleteGuide && collapsedSections[secId]);

                return (
                  <div key={idx} id={secId} className="pt-8 sm:pt-10 scroll-mt-24 sm:scroll-mt-28">
                    <div
                      onClick={isCompleteGuide ? () => toggleSectionCollapse(secId) : undefined}
                      className={`flex items-center justify-between gap-2 sm:gap-3 mb-4 sm:mb-5 px-3.5 py-2.5 sm:px-4 sm:py-3.5 rounded-xl sm:rounded-2xl bg-neutral-50/90 dark:bg-neutral-800/60 border border-neutral-200/90 dark:border-neutral-700/80 shadow-2xs transition-all ${
                        isCompleteGuide
                          ? 'cursor-pointer hover:bg-neutral-100/90 dark:hover:bg-neutral-800/90 hover:border-neutral-300 dark:hover:border-neutral-600 select-none'
                          : ''
                      }`}
                    >
                      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                        <span className="w-1.5 h-5 sm:h-6 rounded-full bg-cyan-600 dark:bg-cyan-400 shrink-0" />
                        <h2 className="text-[20px] sm:text-[22px] font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight leading-snug break-words [overflow-wrap:anywhere]">
                          {formatSectionTitle(section.title, idx)}
                        </h2>
                      </div>
                      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                        {isCompleteGuide && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleBookmark(secId);
                            }}
                            className={`p-1.5 rounded-lg flex items-center gap-1 text-xs transition-colors cursor-pointer shrink-0 ${
                              bookmarks.includes(secId)
                                ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/40 font-bold'
                                : 'text-neutral-400 hover:text-amber-500 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                            }`}
                            title={bookmarks.includes(secId) ? 'お気に入りを解除' : 'この章をお気に入りに登録'}
                          >
                            <Star className={`w-4 h-4 ${bookmarks.includes(secId) ? 'fill-current' : ''}`} />
                            <span className="hidden sm:inline text-[11px]">
                              {bookmarks.includes(secId) ? '登録済み' : 'お気に入り'}
                            </span>
                          </button>
                        )}
                        {isCompleteGuide && (
                          <div
                            className="p-1.5 rounded-lg flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200"
                            title={isCollapsed ? 'タップして展開' : 'タップして折りたたむ'}
                          >
                            <span className="text-[11px] font-medium hidden sm:inline text-neutral-500 dark:text-neutral-400">
                              {isCollapsed ? '開く' : '閉じる'}
                            </span>
                            {isCollapsed ? (
                              <ChevronDown className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                            ) : (
                              <ChevronUp className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {!isCollapsed ? (
                      <>
                        <div className="mb-6 sm:mb-8">
                          <RichContent
                            content={section.body}
                            sectionId={secId}
                            sectionTitle={section.title}
                            activeSubheading={activeSubheading}
                            isNeutralMovesSection={section.title.includes('立ち回りで振る技')}
                            controlType={activeControlType}
                            secretConfig={secretConfig}
                            onSecretUnlock={() => handleSecretUnlock(secretConfig?.characterSlug)}
                            isCoaching={isCoaching}
                            character={article?.character}
                          />
                        </div>

                        {/* 図解ダイアグラム */}
                        {section.diagramType && <DiagramDispatcher diagramType={section.diagramType} />}

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
                          <ul className="my-4 space-y-2 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 bg-neutral-50 dark:bg-neutral-800/40 p-3.5 sm:p-4 rounded-lg sm:rounded-xl border border-neutral-200 dark:border-neutral-800">
                            {section.bulletPoints.map((bp, bpIdx) => (
                              <li key={bpIdx} className="flex items-start gap-2">
                                <span className="text-neutral-900 dark:text-white font-bold shrink-0 mt-0.5">▶</span>
                                <span className="leading-relaxed min-w-0 break-words [overflow-wrap:anywhere]">{bp}</span>
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
                            controlType={activeControlType}
                          />
                        ))}
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => toggleSectionCollapse(secId)}
                        className="w-full py-2.5 px-4 mb-4 rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700 hover:border-cyan-500 dark:hover:border-cyan-500 bg-neutral-50/50 dark:bg-neutral-900/30 hover:bg-cyan-50/30 dark:hover:bg-cyan-950/20 text-xs text-neutral-500 dark:text-neutral-400 hover:text-cyan-700 dark:hover:text-cyan-300 flex items-center justify-center gap-2 transition-all cursor-pointer"
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                        <span>この章を展開して読む</span>
                      </button>
                    )}
                  </div>
                );
              })}

              {/* 有料記事ロック & アンロック後コンテンツ */}
              {article.isPaid && (
                <>
                  <div id="paywall-card-box">
                    {/* 一旦非表示: 実戦コンボ逆引きデータベース
                    {isCompleteGuide && !isUnlocked && (
                      <ArticleComboReverseLookup
                        controlType={activeControlType}
                        isUnlocked={false}
                        onScrollToPaywall={() => {
                          const el = document.getElementById('paywall-card-box');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                      />
                    )}
                    */}
                    <PaywallCard
                      price={article.price}
                      isUnlocked={isUnlocked}
                      isAdminMode={isAdminMode}
                      userEmail={userEmail}
                      isCheckingAuth={!authChecked}
                      forceShowTokenInput={forceShowTokenInput}
                      onAdminUnlock={!secretConfig ? handleAdminUnlock : undefined}
                      onAdminLock={handleAdminLock}
                      onBuyArticle={article.subscriptionOnly ? undefined : handleBuyArticle}
                      onJoinMembership={() => {
                        if (!user) {
                          window.location.href = '/auth/login?next=/membership&action=subscribe';
                        } else {
                          window.location.href = '/membership';
                        }
                      }}
                      onApplyToken={handleApplyToken}
                      subscriptionOnly={article.subscriptionOnly}
                      hideBenefits={article.subscriptionOnly || !isCompleteGuide}
                      description={
                        article.subscriptionOnly
                          ? '実戦リプレイの解説動画（YouTube）および各ラウンドごとの詳細な改善ポイント、立ち回り強化論、受講生のお悩み相談を収録しています（プレミアム会員限定）。'
                          : undefined
                      }
                    />
                  </div>

                  {/* アンロック時の有料限定コンテンツ */}
                  {isUnlocked && (
                    <div className="pt-2 sm:pt-4 space-y-6">
                      {/* 有料限定イントロ（動画前メッセージ） */}
                      {article.paidContent.intro && (
                        <div className="p-4 sm:p-5 rounded-xl bg-neutral-50/90 dark:bg-neutral-800/50 border border-neutral-200/80 dark:border-neutral-700/80 text-neutral-800 dark:text-neutral-200 shadow-2xs">
                          <RichContent content={article.paidContent.intro} controlType={activeControlType} isCoaching={isCoaching} character={article?.character} />
                        </div>
                      )}

                      {/* 有料限定：YouTube動画プレイヤー（春麗コーチングは追従プレイヤー） */}
                      {article.youtubeVideoId && (
                        isCoachingStickyTarget ? (
                          <CoachingStickyPlayer
                            videoId={article.youtubeVideoId}
                            title={article.title}
                            caption="実戦解説・対戦リプレイ動画（YouTube）"
                          />
                        ) : (
                          <div className="my-6">
                            <YouTubeEmbed videoId={article.youtubeVideoId} title={article.title} />
                          </div>
                        )
                      )}

                      {/* 有料セクション */}
                      {paidSections.map((section, idx) => {
                        const isCenterComboSec = section.title.includes('画面中央のコンボ');
                        const secId = `sec-paid-${idx}`;
                        const isCollapsed = Boolean(isCompleteGuide && collapsedSections[secId]);

                        return (
                          <React.Fragment key={idx}>
                            {/* 実戦コンボ逆引きデータベース */}
                            {isCompleteGuide && (slug.includes('ryu') || article?.character === 'リュウ') && isCenterComboSec && (
                              <div id="combo-reverse-lookup" className="pt-2 mb-8 scroll-mt-24 sm:scroll-mt-28">
                                <ArticleComboReverseLookup
                                  controlType={activeControlType}
                                  isUnlocked={true}
                                />
                              </div>
                            )}

                            <div id={secId} className="pt-8 sm:pt-10 scroll-mt-24 sm:scroll-mt-28">
                              <div
                                onClick={isCompleteGuide ? () => toggleSectionCollapse(secId) : undefined}
                                className={`flex items-center justify-between gap-2 sm:gap-3 mb-4 sm:mb-5 px-3.5 py-2.5 sm:px-4 sm:py-3.5 rounded-xl sm:rounded-2xl bg-neutral-50/90 dark:bg-neutral-800/60 border border-neutral-200/90 dark:border-neutral-700/80 shadow-2xs transition-all ${
                                  isCompleteGuide
                                    ? 'cursor-pointer hover:bg-neutral-100/90 dark:hover:bg-neutral-800/90 hover:border-neutral-300 dark:hover:border-neutral-600 select-none'
                                    : ''
                                }`}
                              >
                                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                                  <span className="w-1.5 h-5 sm:h-6 rounded-full bg-cyan-600 dark:bg-cyan-400 shrink-0" />
                                  <h2 className="text-[20px] sm:text-[22px] font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight leading-snug break-words [overflow-wrap:anywhere]">
                                    {formatSectionTitle(section.title, freeSections.length + idx)}
                                  </h2>
                                </div>
                                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                                  {isCompleteGuide && (
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleToggleBookmark(secId);
                                      }}
                                      className={`p-1.5 rounded-lg flex items-center gap-1 text-xs transition-colors cursor-pointer shrink-0 ${
                                        bookmarks.includes(secId)
                                          ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/40 font-bold'
                                          : 'text-neutral-400 hover:text-amber-500 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                                      }`}
                                      title={bookmarks.includes(secId) ? 'お気に入りを解除' : 'この章をお気に入りに登録'}
                                    >
                                      <Star className={`w-4 h-4 ${bookmarks.includes(secId) ? 'fill-current' : ''}`} />
                                      <span className="hidden sm:inline text-[11px]">
                                        {bookmarks.includes(secId) ? '登録済み' : 'お気に入り'}
                                      </span>
                                    </button>
                                  )}
                                  {isCompleteGuide && (
                                    <div
                                      className="p-1.5 rounded-lg flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200"
                                      title={isCollapsed ? 'タップして展開' : 'タップして折りたたむ'}
                                    >
                                      <span className="text-[11px] font-medium hidden sm:inline text-neutral-500 dark:text-neutral-400">
                                        {isCollapsed ? '開く' : '閉じる'}
                                      </span>
                                      {isCollapsed ? (
                                        <ChevronDown className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                                      ) : (
                                        <ChevronUp className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>

                              {!isCollapsed ? (
                                <>
                                  <div className="mb-6 sm:mb-8">
                                    <RichContent
                                      content={section.body}
                                      sectionId={secId}
                                      activeSubheading={activeSubheading}
                                      isNeutralMovesSection={section.title.includes('立ち回りで振る技')}
                                      controlType={activeControlType}
                                      isCoaching={isCoaching}
                                      character={article?.character}
                                    />
                                  </div>

                                  {/* 図解ダイアグラム */}
                                  {section.diagramType && <DiagramDispatcher diagramType={section.diagramType} />}

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
                                    <ul className="my-4 space-y-2.5 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 bg-neutral-50 dark:bg-neutral-800/40 p-3.5 sm:p-4 rounded-lg sm:rounded-xl border border-neutral-200 dark:border-neutral-800">
                                      {section.bulletPoints.map((bp, bpIdx) => (
                                        <li key={bpIdx} className="flex items-start gap-2">
                                          <span className="text-neutral-900 dark:text-white font-bold shrink-0 mt-0.5">▶</span>
                                          <span className="leading-relaxed min-w-0 break-words [overflow-wrap:anywhere]">{bp}</span>
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
                                      controlType={activeControlType}
                                    />
                                  ))}

                                  {/* Q&A相談リスト */}
                                  {section.qaList && (
                                    <div className="my-6 space-y-4">
                                      {section.qaList.map((qa, qaIdx) => (
                                        <div key={qaIdx} className="p-3.5 sm:p-5 rounded-lg sm:rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800 shadow-xs">
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
                                </>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => toggleSectionCollapse(secId)}
                                  className="w-full py-2.5 px-4 mb-4 rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700 hover:border-cyan-500 dark:hover:border-cyan-500 bg-neutral-50/50 dark:bg-neutral-900/30 hover:bg-cyan-50/30 dark:hover:bg-cyan-950/20 text-xs text-neutral-500 dark:text-neutral-400 hover:text-cyan-700 dark:hover:text-cyan-300 flex items-center justify-center gap-2 transition-all cursor-pointer"
                                >
                                  <ChevronDown className="w-3.5 h-3.5" />
                                  <span>この章を展開して読む</span>
                                </button>
                              )}
                            </div>
                          </React.Fragment>
                        );
                      })}
                    </div>
                  )}
                </>
              )}
            </article>

            {/* リュウ立ち回り記事からの次のおすすめ：リュウ完全攻略 */}
            {article.character === 'リュウ' && !isCompleteGuide && (
              <div className="mt-8 mb-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-indigo-50/80 via-white to-indigo-50/40 dark:from-indigo-950/30 dark:via-neutral-900 dark:to-neutral-900 border border-indigo-200/80 dark:border-indigo-800/60 shadow-xs">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-800 dark:text-indigo-200">
                      次のステップにおすすめ
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white mt-1.5">
                      リュウ完全攻略｜クラシック・モダン対応
                    </h3>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 leading-relaxed">
                      立ち回りの基本方針を掴んだら、実戦厳選コンボ・主要フレーム別起き攻め・逆引きツールで勝率をさらに盤石に。
                    </p>
                  </div>
                  <Link
                    href="/articles/ryu-complete-guide"
                    className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm transition-all shadow-xs shrink-0 inline-flex items-center gap-1.5"
                  >
                    <span>完全攻略を読む</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}

            {/* 筆者の愛用アイテム＆アソシエイト（無料記事のみ表示） */}
            {!article.isPaid && (
              <RecommendedGear productIds={article.recommendedGearIds} />
            )}

            {/* 読後リアクション・シェア */}
            <div className="mt-12 pt-6 border-t border-neutral-100 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-3">
              {/* 参考になったボタン（架空数値を廃止し誠実なリアクションへ） */}
              <button
                type="button"
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  hasLiked
                    ? 'bg-rose-500 text-white shadow-xs scale-[1.02]'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40 dark:hover:text-rose-400 border border-neutral-200/60 dark:border-neutral-700/60'
                }`}
              >
                <Heart className={`w-4 h-4 transition-transform ${hasLiked ? 'fill-current scale-110' : 'text-neutral-500'}`} />
                <span>{hasLiked ? '参考になりました！' : '参考になった'}</span>
              </button>

              {/* シェアアクション */}
              <div className="flex items-center gap-2">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`${article.title} | にこ太郎の格ゲーLAB`)}&url=${encodeURIComponent(`https://nikotaro.com/articles/${article.slug}`)}&hashtags=${encodeURIComponent('スト6,格ゲーLAB')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 hover:opacity-90 transition-opacity cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  <span>𝕏 で共有</span>
                </a>

                <button
                  type="button"
                  onClick={handleShare}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-neutral-200/60 dark:border-neutral-700/60 transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">コピー完了！</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" />
                      <span>URLをコピー</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </main>

          {/* 右サイドバー（4 / 12） */}
          <aside className="lg:col-span-4 space-y-5 px-4 sm:px-0">
            {/* 著者プロフィール */}
            <AuthorCard author={article.author} />

            {/* 操作タイプ切り替えウィジェット */}
            {article.variants && (
              <div className="p-4 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs">
                <div className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider mb-2.5 flex items-center justify-between">
                  <span>操作タイプ切り替え</span>
                  <span
                    className="text-[10px] font-bold text-white px-2 py-0.5 rounded"
                    style={{ backgroundColor: activeControlType === 'classic' ? '#8B5BB7' : '#D8843F' }}
                  >
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
                        ? 'bg-[#8B5BB7] text-white shadow-xs'
                        : 'bg-white/80 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-300 hover:text-[#8B5BB7] dark:hover:text-[#b38ee0] hover:bg-[#8B5BB7]/10 border border-neutral-200/60 dark:border-neutral-700'
                    }`}
                  >
                    クラシック
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveControlType('modern');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`py-2 px-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeControlType === 'modern'
                        ? 'bg-[#D8843F] text-white shadow-xs'
                        : 'bg-white/80 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-300 hover:text-[#D8843F] dark:hover:text-[#f0a668] hover:bg-[#D8843F]/10 border border-neutral-200/60 dark:border-neutral-700'
                    }`}
                  >
                    モダン
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

            {/* プレミアム会員案内カード */}
            <div className="p-5 bg-neutral-900 dark:bg-neutral-950 text-white rounded-xl border border-neutral-800 dark:border-neutral-800 shadow-sm">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400 block mb-1">
                MEMBERSHIP
              </span>
              <h3 className="text-sm font-bold text-white mb-1">
                プレミアム会員で読み放題
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                月額¥980で公開中の攻略・立ち回り解説・コーチング添削がすべて読み放題。最新パッチ追記も含め追加費用なしで閲覧できます。
              </p>
              <Link
                href="/membership"
                className="block w-full py-2 rounded-lg bg-white hover:bg-neutral-100 text-neutral-950 text-xs font-semibold text-center transition-colors"
              >
                プレミアム会員詳細を見る
              </Link>
            </div>
          </aside>
        </div>
      </div>

      {/* 管理者モード用トースト通知 */}
      {toastMessage && (
        <aside
          aria-label="管理者通知"
          className="fixed bottom-5 right-5 z-50 max-w-sm w-[92%] sm:w-auto bg-neutral-900/95 dark:bg-neutral-900/95 text-white py-3 px-4 rounded-xl shadow-2xl border border-cyan-500/40 backdrop-blur-md animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          <div className="flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shrink-0" />
              <span className="font-semibold text-neutral-100">{toastMessage}</span>
            </div>
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              className="text-neutral-400 hover:text-white transition-colors cursor-pointer p-0.5 rounded"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </aside>
      )}
    </div>
  );
}
