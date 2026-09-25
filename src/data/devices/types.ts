export type DeviceCategory = 'keyboard' | 'gaming-pc' | 'monitor' | 'leverless' | 'stick' | 'pad' | 'chair-desk';

export interface DeviceMerchantLink {
  merchantName: string; // 'Amazon' | '公式サイト' | 'ドスパラ' | 'マウスコンピューター' など
  url: string;
  isSponsored: boolean; // 広告リンクなら true (rel="sponsored")
  label?: string; // ボタン表示ラベル（例: "Amazonで見る", "公式サイトで仕様を見る"）
  isActive: boolean; // 有効フラグ。falseなら表示しない
}

export interface DeviceProduct {
  id: string;
  name: string; // 正式名称・型番
  category: DeviceCategory;
  categoryLabel: string;
  compatibility: string[]; // ['PC', 'PS5', 'PS4'] など確認済み環境
  targetUser: string; // どんな人に向いているか
  badge?: string; // 例: '筆者愛用・実戦投入', 'フルHD標準構成', '定番エントリー'
  summary: string; // 簡潔な概要
  pros: string[]; // 良い点
  cons: string[]; // 注意点
  specHighlights: { label: string; value: string }[]; // 主なスペック比較項目
  officialUrl?: string; // メーカー公式サイトURL
  officialVerifiedDate?: string; // 公式情報の確認日（例: '2026-09-25'）
  authorVerified?: boolean; // 著者の実機検証・使用実績があるか
  authorComment?: string; // 著者の確認済み実戦コメント（ある場合のみ）
  merchantLinks: DeviceMerchantLink[]; // 販売店・公式サイトリンク
  noteReviewUrl?: string; // noteの本人執筆レビューがある場合のURL
}

export interface DeviceArticleMeta {
  slug: string;
  path: string;
  title: string;
  h1: string;
  description: string;
  category: DeviceCategory;
  categoryLabel: string;
  updatedAt: string;
  publishedAt: string;
  readTime: string;
  isFree: true;
  products: string[]; // 掲載商品ID一覧
}
