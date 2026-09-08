import { Metadata } from 'next';

export interface SeoProps {
  title?: string;
  description?: string;
  image?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  type?: 'website' | 'article';
}

const SITE_NAME = 'にこ太郎の格ゲーLAB';
const DEFAULT_TITLE = 'にこ太郎の格ゲーLAB | スト6徹底攻略 & 格ゲー共通上達論';
const DEFAULT_DESCRIPTION =
  '全キャラ1800MR以上の筆者「にこ太郎」による格闘ゲーム攻略メディア。スト6実戦コンボ・起き攻めデータ・リーサル計算機・立ち回り徹底解説を提供。アップデート追従最速対応。';
const DEFAULT_IMAGE = '/icon.png';
const BASE_URL = 'https://nikotaro.com';

/**
 * サイト全体のSEO・OGP・Twitter Cardメタデータを一元生成するヘルパー関数
 */
export function constructMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  canonicalUrl,
  noIndex = false,
  type = 'website',
}: SeoProps = {}): Metadata {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
  const url = canonicalUrl ? (canonicalUrl.startsWith('http') ? canonicalUrl : `${BASE_URL}${canonicalUrl}`) : BASE_URL;
  const imageUrl = image.startsWith('http') ? image : `${BASE_URL}${image}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: url,
    },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/icon.png', type: 'image/png' },
      ],
      apple: [
        { url: '/icon.png', sizes: '180x180', type: 'image/png' },
      ],
    },
    verification: {
      google: 'WpGRRdF0HHY0wFdMrd-s_AfzySf7Ge10orooBjtflP8',
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: 'ja_JP',
      type,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl],
      creator: '@nikotarosun',
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
