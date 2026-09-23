import type { MetadataRoute } from 'next';
import { ARTICLES_DATA } from '@/data/articles';
import { SF6_CHARACTERS } from '@/data/sf6/characters';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://nikotaro.com';
  const now = new Date();

  // 記事ページのURL
  const articleUrls = ARTICLES_DATA.map((article) => ({
    url: article.series === 'sf6-common-techniques'
      ? `${baseUrl}/sf6/strategy/${article.slug}`
      : `${baseUrl}/articles/${article.slug}`,
    lastModified: new Date(article.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: article.isPaid ? 0.9 : 0.85,
  }));

  // スト6 キャラクター個別ページのURL (/sf6/[character])
  const characterHubUrls = Object.keys(SF6_CHARACTERS).map((slug) => ({
    url: `${baseUrl}/sf6/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  // スト6 キャラクター別コンボツールのURL (/sf6/[character]/combos)
  const characterComboUrls = Object.keys(SF6_CHARACTERS).map((slug) => ({
    url: `${baseUrl}/sf6/${slug}/combos`,
    lastModified: now,
    changeFrequency: 'daily' as const,
    priority: SF6_CHARACTERS[slug].hasTool ? 0.95 : 0.7,
  }));

  return [
    // 総合トップ
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    // スト6ハブトップ
    {
      url: `${baseUrl}/sf6`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    // プレミアム会員案内
    {
      url: `${baseUrl}/membership`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // 格ゲー用語解説・スト6攻略辞典
    {
      url: `${baseUrl}/glossary`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    // キャラクター別ハブ
    ...characterHubUrls,
    // キャラクター別コンボツール
    ...characterComboUrls,
    // 記事詳細
    ...articleUrls,
    // お問い合わせ
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    // 規約・特商法・プライバシーポリシー
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/legal/tokusho`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/legal/privacy`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];
}
