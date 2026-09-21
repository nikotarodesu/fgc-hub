import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SF6_COMMON_TECHNIQUES_ARTICLES } from '@/data/articles/sf6CommonTechniques';
import StrategyPortalClient from '@/components/strategy/StrategyPortalClient';
import { GraduationCap, ArrowLeft, BookOpen, Layers, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'SF6共通技術 攻略ガイド一覧【初級・中級・上級 全25記事】 - にこ太郎の格ゲーLAB',
  description:
    'ストリートファイター6の立ち回り、地上戦、防御、ゲージ管理、読み合いを体系的に学べる共通技術全25記事。初級・中級・上級の推奨ステップ順に完全無料公開。',
  alternates: {
    canonical: 'https://nikotaro.com/sf6/strategy',
  },
  openGraph: {
    title: 'SF6共通技術 攻略ガイド一覧【初級・中級・上級 全25記事】 - にこ太郎の格ゲーLAB',
    description:
      'ストリートファイター6の立ち回り、地上戦、防御、ゲージ管理、読み合いを体系的に学べる共通技術全25記事。初級・中級・上級の推奨ステップ順に完全無料公開。',
    url: 'https://nikotaro.com/sf6/strategy',
    siteName: 'にこ太郎の格ゲーLAB',
    locale: 'ja_JP',
    type: 'website',
    images: [
      {
        url: 'https://nikotaro.com/icon.png',
        width: 1200,
        height: 630,
        alt: 'SF6共通技術 攻略ガイド一覧',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SF6共通技術 攻略ガイド一覧【初級・中級・上級 全25記事】 - にこ太郎の格ゲーLAB',
    description: 'ストリートファイター6の立ち回り、地上戦、防御、ゲージ管理、読み合いを体系的に学べる共通技術全25記事。',
    creator: '@nikotarosun',
  },
};

const DIFFICULTY_WEIGHT: Record<string, number> = {
  beginner: 1,
  intermediate: 2,
  advanced: 3,
};

// 学習推奨順（初級1〜9 → 中級1〜10 → 上級1〜6）にソートされた全記事
const ORDERED_ARTICLES = [...SF6_COMMON_TECHNIQUES_ARTICLES].sort((a, b) => {
  const diffA = DIFFICULTY_WEIGHT[a.difficulty || 'beginner'] || 99;
  const diffB = DIFFICULTY_WEIGHT[b.difficulty || 'beginner'] || 99;
  if (diffA !== diffB) return diffA - diffB;
  return (a.difficultyOrder || 0) - (b.difficultyOrder || 0);
});

export default function SF6StrategySeriesPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        headline: 'SF6共通技術 攻略ガイド一覧',
        description: 'ストリートファイター6の共通技術を体系的に学べる全25記事のポータルページ',
        url: 'https://nikotaro.com/sf6/strategy',
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
            item: 'https://nikotaro.com/sf6/strategy',
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors pb-24">
      {/* 構造化データ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ヘッダーセクション */}
      <header className="bg-white dark:bg-neutral-900 border-b border-neutral-200/80 dark:border-neutral-800 pt-6 pb-8 sm:pt-10 sm:pb-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
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
            <span className="text-neutral-800 dark:text-neutral-200 font-bold truncate" aria-current="page">
              共通技術
            </span>
          </nav>

          {/* バッジ */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1 text-xs font-bold text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-200 dark:border-cyan-800">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>全25記事 体系的攻略シリーズ</span>
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>完全無料公開</span>
            </span>
          </div>

          {/* H1タイトル */}
          <h1 className="text-2xl sm:text-4xl font-black text-neutral-900 dark:text-white tracking-tight leading-tight mb-3">
            SF6 共通技術ポータル
          </h1>

          {/* 説明文 */}
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 max-w-3xl leading-relaxed">
            キャラクターの個性に左右されない、ストリートファイター6の立ち回り・地上戦・防御・リソース管理の土台となる技術を全25記事に体系化。
            初級・中級・上級の推奨ステップ順に学習することで、実戦での迷いを無くし、再現性のある勝利を掴みましょう。
          </p>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 sm:pt-10">
        <StrategyPortalClient articles={ORDERED_ARTICLES} />

        {/* トップへ戻るリンク */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 font-bold text-xs sm:text-sm transition-colors border border-neutral-200 dark:border-neutral-700"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>ホーム（トップページ）へ戻る</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
