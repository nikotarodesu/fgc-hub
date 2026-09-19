import type { Metadata } from 'next';
import { ARTICLES_DATA, getArticleEyecatch } from '@/data/articles';
import { constructMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const canonicalSlug =
    slug === 'ryu-classic-complete-guide' || slug === 'ryu-modern-complete-guide'
      ? 'ryu-complete-guide'
      : slug === 'elena-classic-complete-guide' || slug === 'elena-modern-complete-guide'
      ? 'elena-complete-guide'
      : slug;

  const article = ARTICLES_DATA.find((a) => a.slug === canonicalSlug);
  if (!article) {
    return constructMetadata({
      title: '記事が見つかりません',
      noIndex: true,
    });
  }

  const eyecatch = getArticleEyecatch(article);

  return constructMetadata({
    title: article.title,
    description: article.summary,
    image: eyecatch,
    canonicalUrl: `/articles/${canonicalSlug}`,
    type: 'article',
  });
}

export default async function ArticleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const canonicalSlug =
    slug === 'ryu-classic-complete-guide' || slug === 'ryu-modern-complete-guide'
      ? 'ryu-complete-guide'
      : slug === 'elena-classic-complete-guide' || slug === 'elena-modern-complete-guide'
      ? 'elena-complete-guide'
      : slug;

  const article = ARTICLES_DATA.find((a) => a.slug === canonicalSlug);

  let jsonLdList: object[] = [];

  if (article) {
    const eyecatch = getArticleEyecatch(article);
    const articleUrl = `https://nikotaro.com/articles/${canonicalSlug}`;
    const imageUrl = eyecatch.startsWith('http') ? eyecatch : `https://nikotaro.com${eyecatch}`;

    // Article 構造化データ
    const articleJsonLd: Record<string, any> = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.summary,
      image: [imageUrl],
      datePublished: article.publishedAt,
      dateModified: article.updatedAt || article.publishedAt,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': articleUrl,
      },
      author: {
        '@type': 'Person',
        name: article.author?.name || 'にこ太郎',
        url: 'https://nikotaro.com/author',
      },
      publisher: {
        '@type': 'Organization',
        name: 'にこ太郎の格ゲーLAB',
        logo: {
          '@type': 'ImageObject',
          url: 'https://nikotaro.com/icon.png',
        },
      },
      isAccessibleForFree: !article.isPaid,
    };

    // 有料コンテンツの場合の paywalled specification
    if (article.isPaid) {
      articleJsonLd.hasPart = {
        '@type': 'WebPageElement',
        isAccessibleForFree: false,
        cssSelector: '#paywall-card',
      };
    }

    // パンくずリスト構造化データ
    const breadcrumbJsonLd = {
      '@context': 'https://schema.org',
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
          name: '攻略記事一覧',
          item: 'https://nikotaro.com',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: article.title,
          item: articleUrl,
        },
      ],
    };

    jsonLdList = [articleJsonLd, breadcrumbJsonLd];
  }

  return (
    <>
      {jsonLdList.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdList) }}
        />
      )}
      {children}
    </>
  );
}
