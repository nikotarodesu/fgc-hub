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

export default function ArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
