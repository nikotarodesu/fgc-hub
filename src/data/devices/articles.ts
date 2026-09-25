import { DeviceArticleMeta } from './types';

export const DEVICE_ARTICLES: DeviceArticleMeta[] = [
  {
    slug: 'keyboard',
    path: '/sf6/devices/keyboard',
    title: 'スト6向けキーボードの選び方とおすすめ',
    h1: 'スト6向けキーボードの選び方とおすすめ',
    description:
      'スト6をキーボードで快適に遊ぶための選び方ガイド。ラピッドトリガーやアクチュエーションポイント、Nキーロールオーバーの基礎から、普段のPC作業との兼用、おすすめ機種の比較まで徹底解説します。',
    category: 'keyboard',
    categoryLabel: '操作機器（キーボード）',
    updatedAt: '2026-09-25',
    publishedAt: '2026-09-25',
    readTime: '8分',
    isFree: true,
    products: ['razer-huntsman-v3-pro-mini', 'steelseries-apex-pro-tkl', 'logicool-g-pro-x-tkl'],
  },
  {
    slug: 'gaming-pc',
    path: '/sf6/devices/gaming-pc',
    title: 'スト6用PCの必要スペックと選び方',
    h1: 'スト6用PCの必要スペックと選び方',
    description:
      'CAPCOM公式の必要・推奨動作環境をもとに、スト6を快適にプレイ・配信するために必要なゲーミングPCのスペックと失敗しない選び方を解説。フルHD標準構成から配信兼用モデルまで紹介します。',
    category: 'gaming-pc',
    categoryLabel: '動作環境（ゲーミングPC）',
    updatedAt: '2026-09-25',
    publishedAt: '2026-09-25',
    readTime: '10分',
    isFree: true,
    products: ['pc-standard-rtx4060', 'pc-high-rtx4070-super', 'pc-entry-budget'],
  },
  {
    slug: 'monitor',
    path: '/sf6/devices/monitor',
    title: 'スト6のモニター選び｜144Hz・240Hzは必要？',
    h1: 'スト6のモニター選び｜144Hz・240Hzは必要？',
    description:
      'ゲーム側60fps固定のスト6において、144Hzや240Hzモニターを導入するメリット・遅延短縮効果・買い替えの判断基準を解説。PS5・PC別の接続注意点とおすすめモニターを比較します。',
    category: 'monitor',
    categoryLabel: '映像環境（モニター）',
    updatedAt: '2026-09-25',
    publishedAt: '2026-09-25',
    readTime: '9分',
    isFree: true,
    products: ['benq-zowie-xl2546k', 'benq-mobiuz-ex2510s', 'asus-tuf-vg259qr'],
  },
];

export function getDeviceArticleBySlug(slug: string): DeviceArticleMeta | undefined {
  return DEVICE_ARTICLES.find((a) => a.slug === slug);
}
