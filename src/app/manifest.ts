import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'にこ太郎の格ゲーLAB',
    short_name: '格ゲーLAB',
    description: '全キャラ1800MR以上のスト6攻略・コンボ＆起き攻めデータベース',
    start_url: '/',
    display: 'standalone',
    background_color: '#f0f9fb',
    theme_color: '#00a3c4',
    icons: [
      {
        src: '/icon.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/icon.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  };
}
