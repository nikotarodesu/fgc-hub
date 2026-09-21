import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SF6_COMMON_TECHNIQUES_ARTICLES } from '@/data/articles/sf6CommonTechniques';
import StrategyMarkdownRenderer from '@/components/strategy/StrategyMarkdownRenderer';
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  GraduationCap,
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  Bookmark,
} from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SF6_COMMON_TECHNIQUES_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const article = SF6_COMMON_TECHNIQUES_ARTICLES.find((a) => a.slug === resolvedParams.slug);
  if (!article) return {};

  const baseUrl = 'https://nikotaro.com';
  const pageUrl = `${baseUrl}/sf6/strategy/${article.slug}`;
  const fullTitle = `${article.title} | SF6共通技術【${article.difficultyLabel}】 - にこ太郎の格ゲーLAB`;

  return {
    title: fullTitle,
    description: article.summary,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: fullTitle,
      description: article.summary,
      url: pageUrl,
      siteName: 'にこ太郎の格ゲーLAB',
      locale: 'ja_JP',
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      images: [
        {
          url: `${baseUrl}/icon.png`,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: article.summary,
      creator: '@nikotarosun',
    },
  };
}

const DIFFICULTY_BADGE_STYLE = {
  beginner: 'bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800',
  intermediate: 'bg-amber-50 text-amber-700 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800',
  advanced: 'bg-purple-50 text-purple-700 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800',
};

export default async function StrategyArticlePage({ params }: PageProps) {
  const resolvedParams = await params;
  const articleIndex = SF6_COMMON_TECHNIQUES_ARTICLES.findIndex((a) => a.slug === resolvedParams.slug);
  if (articleIndex === -1) {
    notFound();
  }

  const article = SF6_COMMON_TECHNIQUES_ARTICLES[articleIndex];

  // 記事番号順での前後ナビゲーション（最初と最後の記事でも破綻しない）
  const prevArticle = articleIndex > 0 ? SF6_COMMON_TECHNIQUES_ARTICLES[articleIndex - 1] : null;
  const nextArticle = articleIndex < SF6_COMMON_TECHNIQUES_ARTICLES.length - 1 ? SF6_COMMON_TECHNIQUES_ARTICLES[articleIndex + 1] : null;

  // 構造化データ (Article & BreadcrumbList)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: article.title,
        description: article.summary,
        datePublished: article.publishedAt,
        dateModified: article.updatedAt,
        author: {
          '@type': 'Person',
          name: article.author.name,
          url: 'https://nikotaro.com/author',
        },
        publisher: {
          '@type': 'Organization',
          name: 'にこ太郎の格ゲーLAB',
          url: 'https://nikotaro.com',
        },
        mainEntityOfPage: `https://nikotaro.com/sf6/strategy/${article.slug}`,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'ホーム',
            item: 'https://nikotaro.com',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'スト6',
            item: 'https://nikotaro.com/sf6',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: '共通技術',
            item: 'https://nikotaro.com',
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: article.title,
            item: `https://nikotaro.com/sf6/strategy/${article.slug}`,
          },
        ],
      },
    ],
  };

  const badgeStyle = article.difficulty ? DIFFICULTY_BADGE_STYLE[article.difficulty] : '';

  return (
    <article className="min-h-screen bg-[#f8fafc] dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors pb-20">
      {/* 構造化データ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ヘッダーセクション */}
      <header className="bg-white dark:bg-neutral-900 border-b border-neutral-200/80 dark:border-neutral-800 pt-6 pb-6 sm:pt-8 sm:pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* パンくずリスト */}
          <nav aria-label="Breadcrumb" className="mb-4 text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5 flex-wrap">
            <Link href="/" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
              ホーム
            </Link>
            <span>/</span>
            <Link href="/sf6" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
              スト6
            </Link>
            <span>/</span>
            <Link href="/" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
              共通技術
            </Link>
            <span>/</span>
            <span className="text-neutral-800 dark:text-neutral-200 font-bold truncate" aria-current="page">
              {article.title}
            </span>
          </nav>

          {/* シリーズ名と難易度バッジ */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline bg-cyan-50 dark:bg-cyan-950/60 px-2.5 py-0.5 rounded-full border border-cyan-200/80 dark:border-cyan-800/60"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>SF6共通技術</span>
            </Link>

            {/* 難易度タグ */}
            <span
              className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-md border shadow-2xs ${badgeStyle}`}
            >
              <span>難易度: {article.difficultyLabel}</span>
            </span>

            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
              完全無料公開
            </span>
          </div>

          {/* 記事タイトル（H1） */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-900 dark:text-white tracking-tight leading-snug mb-3">
            {article.title}
          </h1>

          {/* 記事メタ情報 */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500 dark:text-neutral-400 pt-1">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-neutral-400" />
              <span>読了目安: 約{article.readTime}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-neutral-400" />
              <span>公開日: {article.publishedAt}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-neutral-700 dark:text-neutral-300">著者: {article.author.name}</span>
            </div>
          </div>
        </div>
      </header>

      {/* 本文エリア */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="bg-white dark:bg-neutral-900/90 rounded-2xl border border-neutral-200/90 dark:border-neutral-800 p-5 sm:p-8 lg:p-10 shadow-xs">
          <StrategyMarkdownRenderer
            content={article.markdownContent || ''}
            articleNumber={article.articleNumber || 0}
          />
        </div>

        {/* 前後の記事ナビゲーション */}
        <section aria-label="前後記事へのリンク" className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevArticle ? (
            <Link
              href={`/sf6/strategy/${prevArticle.slug}`}
              className="group flex flex-col justify-between p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 hover:border-cyan-500/80 transition-all shadow-2xs"
            >
              <div className="flex items-center gap-1 text-xs font-bold text-neutral-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 mb-1">
                <ChevronLeft className="w-4 h-4" />
                <span>前の記事</span>
              </div>
              <span className="text-sm font-bold text-neutral-800 dark:text-neutral-200 group-hover:underline line-clamp-1">
                {prevArticle.title}
              </span>
            </Link>
          ) : (
            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/40 border border-dashed border-neutral-200 dark:border-neutral-800 text-xs text-neutral-400 flex items-center justify-center">
              <span>最初の記事です</span>
            </div>
          )}

          {nextArticle ? (
            <Link
              href={`/sf6/strategy/${nextArticle.slug}`}
              className="group flex flex-col justify-between p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 hover:border-cyan-500/80 transition-all shadow-2xs text-right"
            >
              <div className="flex items-center justify-end gap-1 text-xs font-bold text-neutral-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 mb-1">
                <span>次の記事</span>
                <ChevronRight className="w-4 h-4" />
              </div>
              <span className="text-sm font-bold text-neutral-800 dark:text-neutral-200 group-hover:underline line-clamp-1">
                {nextArticle.title}
              </span>
            </Link>
          ) : (
            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/40 border border-dashed border-neutral-200 dark:border-neutral-800 text-xs text-neutral-400 flex items-center justify-center">
              <span>最後の記事です</span>
            </div>
          )}
        </section>

        {/* トップへ戻るリンク */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-bold text-xs sm:text-sm hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>トップページ（共通技術一覧）へ戻る</span>
          </Link>
        </div>
      </main>
    </article>
  );
}
