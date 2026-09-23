import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, ChevronRight, Home, ShieldCheck } from 'lucide-react';
import GlossaryClient from '@/components/glossary/GlossaryClient';
import { GLOSSARY_TERMS } from '@/data/glossary';

export const metadata: Metadata = {
  title: '格ゲー用語解説・スト6攻略辞典【初心者〜上級者対応】 - にこ太郎の格ゲーLAB',
  description:
    'ストリートファイター6や格闘ゲーム全般で頻出する専門用語を徹底解説。フレーム、有利・不利、差し返し、遅らせグラップ、シミー、詐欺飛びなど、実戦で差がつく重要用語と上達のコツを体系化。',
  alternates: {
    canonical: 'https://nikotaro.com/glossary',
  },
  openGraph: {
    title: '格ゲー用語解説・スト6攻略辞典【初心者〜上級者対応】 - にこ太郎の格ゲーLAB',
    description:
      'ストリートファイター6や格闘ゲーム全般で頻出する専門用語を徹底解説。フレーム、有利・不利、差し返し、遅らせグラップ、シミー、詐欺飛びなど、実戦で差がつく重要用語と上達のコツを体系化。',
    url: 'https://nikotaro.com/glossary',
    siteName: 'にこ太郎の格ゲーLAB',
    locale: 'ja_JP',
    type: 'website',
    images: [
      {
        url: 'https://nikotaro.com/icon.png',
        width: 1200,
        height: 630,
        alt: '格ゲー用語解説・スト6攻略辞典',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '格ゲー用語解説・スト6攻略辞典【初心者〜上級者対応】 - にこ太郎の格ゲーLAB',
    description:
      'ストリートファイター6や格闘ゲーム全般で頻出する専門用語を徹底解説。フレーム、有利・不利、差し返し、遅らせグラップ、シミー、詐欺飛びなど実戦のコツを網羅。',
    creator: '@nikotarosun',
  },
};

export default function GlossaryPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'DefinedTermSet',
        '@id': 'https://nikotaro.com/glossary#termset',
        name: '格ゲー用語解説・スト6攻略辞典',
        description: '格闘ゲームおよびストリートファイター6の実戦攻略用語集。',
        inDefinedTermSet: 'https://nikotaro.com/glossary',
        hasDefinedTerm: GLOSSARY_TERMS.slice(0, 30).map((t) => ({
          '@type': 'DefinedTerm',
          name: t.term,
          description: t.summary,
          termCode: t.id,
        })),
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
            name: '用語解説',
            item: 'https://nikotaro.com/glossary',
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-[#f8fafc] dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors">
        {/* ヒーローセクション */}
        <section className="bg-white dark:bg-neutral-900 border-b border-neutral-200/80 dark:border-neutral-800 pt-6 pb-6 sm:pt-8 sm:pb-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-4">
            {/* パンくずリスト */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400">
              <Link href="/" className="hover:text-neutral-900 dark:hover:text-white flex items-center gap-1 transition-colors">
                <Home className="w-3.5 h-3.5" />
                <span>TOP</span>
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
              <span className="font-semibold text-neutral-900 dark:text-white">格ゲー用語解説</span>
            </nav>

            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 text-xs font-bold border border-cyan-200 dark:border-cyan-800">
                <BookOpen className="w-3.5 h-3.5" />
                <span>全{GLOSSARY_TERMS.length}語収録・実戦解説付き</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight leading-tight">
                格ゲー用語解説・スト6攻略辞典
              </h1>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                対戦格闘ゲームおよびストリートファイター6で日常的に飛び交う専門用語を体系的にまとめました。初心者がつまずきやすいフレームや判定の基礎から、中級者〜上級者が実戦で駆使する崩し・防御テクニック、格ゲー特有の俗語まで網羅しています。
              </p>
            </div>
          </div>
        </section>

        {/* メインコンテンツ */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <GlossaryClient />
        </main>
      </div>
    </>
  );
}
