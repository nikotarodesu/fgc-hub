export interface AffiliateProduct {
  id: string;
  name: string;
  category: 'controller' | 'care' | 'food' | 'accessory' | 'other';
  categoryLabel: string;
  badge?: string;
  description: string;
  authorComment?: string;
  amazonUrl: string;
  noteReviewUrl?: string;
  noteReviewTitle?: string;
  features?: string[];
}

export const AFFILIATE_PRODUCTS: Record<string, AffiliateProduct> = {
  'razer-huntsman-v3-pro-mini': {
    id: 'razer-huntsman-v3-pro-mini',
    name: 'Razer Huntsman V3 Pro Mini (日本語配列)',
    category: 'controller',
    categoryLabel: '筆者愛用コントローラー',
    badge: '筆者愛用・メインデバイス',
    description:
      '数々のレバーレス（One-Off、アケコン道場、FinishMove等）を使い込んできた筆者が、最終的に愛用している現在のメインコントローラーです。',
    authorComment:
      '第2世代アナログオプティカルスイッチ（ラピッドトリガー対応）により、アクチュエーションポイントを0.1mm〜4.0mmまで0.1mm単位で調整可能。キーを離した瞬間にリセットされるため、格闘ゲームにおける歩きガードの反応速度や最速昇龍・真空波動コマンドの入力精度が劇的に向上します。',
    amazonUrl: 'https://www.amazon.co.jp/dp/B0CN952T9S?tag=nikotarosf6-22',
    noteReviewUrl: 'https://note.com/nikotarosun/n/n587884db1c36',
    noteReviewTitle: 'note: MR2000キーボード勢のクラシック操作＆おすすめ設定レビュー',
    features: [
      'ラピッドトリガー搭載（最小0.1mmの超高速入力＆リセット）',
      'デスクを広く使える60%コンパクト日本語配列',
      '激しい打鍵にも耐える高耐久テクスチャードPBTキーキャップ',
    ],
  },
  'gaming-finger-sleeve': {
    id: 'gaming-finger-sleeve',
    name: 'ゲーミング指サック（高感度・手汗＆摩擦防止）',
    category: 'care',
    categoryLabel: '操作性向上・指ケア',
    badge: '操作性アップ',
    description:
      '長時間のランクマッチやトレモでも、指の摩擦熱や手汗による引っかかりを徹底防止。レバーレスやキーボード、パッド操作時のボタン滑りを一定に保ち、コマンド抜けや入力ミスを防ぐ定番アイテムです。',
    authorComment:
      '手汗でボタンに指が引っかかる感覚をゼロにできます。特にスライド入力や高速連打を行う際の指先への負担を軽減します。',
    amazonUrl: 'https://www.amazon.co.jp/s?k=%E6%8C%87%E3%82%B5%E3%83%83%E3%82%AF+%E3%82%B2%E3%83%BC%E3%83%9F%E3%83%B3%E3%82%B0&tag=nikotarosf6-22',
    features: [
      '導電性繊維による滑らかな操作感と高耐久性',
      '手汗によるボタン引っかかり・滑り止め防止',
      '薄型・高通気性で長時間の対戦でも蒸れにくい',
    ],
  },
  'caloriemate-block': {
    id: 'caloriemate-block',
    name: '大塚製薬 カロリーメイト ブロック（集中補食）',
    category: 'food',
    categoryLabel: '集中力維持・補食',
    badge: '集中力サポート',
    description:
      'ランクマッチの連戦やオンライン大会で集中力を切らさないための必須補食。胃腸に負担をかけずに脳のエネルギー源となる糖分とビタミンを素早く補給できます。',
    authorComment:
      '格ゲーは脳の消費エネルギーが激しく、集中が切れると対空や確認がガタ落ちします。対戦の合間に手軽に食べられるブロックタイプは常備しておくと重宝します。',
    amazonUrl: 'https://www.amazon.co.jp/s?k=%E3%82%AB%E3%83%AD%E3%83%AA%E3%83%BC%E3%83%A1%E3%82%A4%E3%83%88+%E3%83%96%E3%83%AD%E3%83%83%E3%82%AF&tag=nikotarosf6-22',
    features: [
      '5大栄養素（タンパク質・脂質・糖質・ビタミン・ミネラル）をバランス良く補給',
      '手を汚さずに片手でサッと食べられる',
      '長時間のトレモ・ランクマ配信のお供に最適',
    ],
  },
  'wrist-rest-cushion': {
    id: 'wrist-rest-cushion',
    name: '低反発ゲーミングリストレスト（手首疲労軽減）',
    category: 'care',
    categoryLabel: '手首ケア・疲労防止',
    badge: '腱鞘炎・疲労対策',
    description:
      'キーボードや薄型レバーレスの操作時に手首が反るのを防ぎ、水平なポジションをキープ。手首への圧迫と疲労を分散し、長時間のプレイでも手首を痛めません。',
    authorComment:
      'キーボードやレバーレス勢には特におすすめ。手首の位置が固定されることで、打鍵時の指の脱力と安定感が劇的に変わります。',
    amazonUrl: 'https://www.amazon.co.jp/s?k=%E3%83%AA%E3%82%B9%E3%83%88%E3%83%AC%E3%82%B9%E3%83%88+%E3%82%B2%E3%83%BC%E3%83%9F%E3%83%B3%E3%82%B0&tag=nikotarosf6-22',
    features: [
      '人間工学に基づいた低反発クッションで手首を優しくサポート',
      '底面滑り止めラバーで激しい操作時もズレない',
      '60%〜フルサイズキーボードや薄型レバーレスにマッチ',
    ],
  },
};

/**
 * 記事で指定された商品IDから商品リストを取得するヘルパー関数
 * 未指定または空配列の場合はデフォルトの愛用キーボードを返す
 */
export function getRecommendedProducts(productIds?: string[]): AffiliateProduct[] {
  if (productIds && productIds.length > 0) {
    const products = productIds
      .map((id) => AFFILIATE_PRODUCTS[id])
      .filter((p): p is AffiliateProduct => Boolean(p));
    if (products.length > 0) {
      return products;
    }
  }
  // デフォルト: 愛用キーボード
  return [AFFILIATE_PRODUCTS['razer-huntsman-v3-pro-mini']];
}
