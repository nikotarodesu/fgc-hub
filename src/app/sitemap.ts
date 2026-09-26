import type { MetadataRoute } from 'next';
import { ARTICLES_DATA } from '@/data/articles';
import { SF6_CHARACTERS } from '@/data/sf6/characters';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://nikotaro.com';

  // 記事ページのURL（更新日を記事の実質更新日から取得）
  const articleUrls = ARTICLES_DATA.map((article) => ({
    url: article.series === 'sf6-common-techniques'
      ? `${baseUrl}/sf6/strategy/${article.slug}`
      : `${baseUrl}/articles/${article.slug}`,
    lastModified: new Date(article.updatedAt || article.publishedAt),
    changeFrequency: 'weekly' as const,
    priority: article.isPaid ? 0.9 : 0.85,
  }));

  // スト6 キャラクター個別ページのURL (/sf6/[character])
  const characterHubUrls = Object.values(SF6_CHARACTERS).map((char) => ({
    url: `${baseUrl}/sf6/${char.slug}`,
    lastModified: new Date(char.updatedAt || '2026-09-26'),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  // スト6 キャラクター別コンボツールのURL (/sf6/[character]/combos)
  // 実データが登録・稼働しているキャラクターのみサイトマップに掲載（0件の準備中ページは除外）
  const characterComboUrls = Object.values(SF6_CHARACTERS)
    .filter((char) => char.hasTool && char.comboCount > 0)
    .map((char) => ({
      url: `${baseUrl}/sf6/${char.slug}/combos`,
      lastModified: new Date(char.updatedAt || '2026-09-26'),
      changeFrequency: 'daily' as const,
      priority: 0.95,
    }));

  return [
    // 総合トップ
    {
      url: baseUrl,
      lastModified: new Date('2026-09-26'),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    // スト6ハブトップ
    {
      url: `${baseUrl}/sf6`,
      lastModified: new Date('2026-09-26'),
      changeFrequency: 'daily',
      priority: 0.95,
    },
    // SF6共通技術ポータル
    {
      url: `${baseUrl}/sf6/strategy`,
      lastModified: new Date('2026-09-26'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // 著者紹介
    {
      url: `${baseUrl}/author`,
      lastModified: new Date('2026-09-26'),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    // プレミアム会員案内
    {
      url: `${baseUrl}/membership`,
      lastModified: new Date('2026-09-26'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // 格ゲー用語解説・スト6攻略辞典
    {
      url: `${baseUrl}/glossary`,
      lastModified: new Date('2026-09-25'),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    // スト6おすすめデバイス・プレイ環境（ハブ ＆ 個別ガイド）
    {
      url: `${baseUrl}/sf6/devices`,
      lastModified: new Date('2026-09-25'),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/sf6/devices/keyboard`,
      lastModified: new Date('2026-09-25'),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/sf6/devices/leverless`,
      lastModified: new Date('2026-09-25'),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/sf6/devices/gaming-pc`,
      lastModified: new Date('2026-09-25'),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/sf6/devices/monitor`,
      lastModified: new Date('2026-09-25'),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    // キャラクター別ハブ
    ...characterHubUrls,
    // キャラクター別コンボツール（稼働中のみ）
    ...characterComboUrls,
    // 記事詳細
    ...articleUrls,
    // お問い合わせ
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date('2026-09-20'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    // 規約・特商法・プライバシーポリシー（正規URLのみ掲載）
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date('2026-09-20'),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/legal/terms`,
      lastModified: new Date('2026-09-20'),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/legal/tokusho`,
      lastModified: new Date('2026-09-20'),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];
}
