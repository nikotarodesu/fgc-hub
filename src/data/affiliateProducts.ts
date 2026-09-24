export interface AffiliateProduct {
  id: string;
  name: string;
  category: 'controller' | 'care' | 'food' | 'drink' | 'desk' | 'accessory' | 'other';
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
  'morinaga-ramune': {
    id: 'morinaga-ramune',
    name: '森永製菓 大粒ラムネ（ぶどう糖90%・即効チャージ）',
    category: 'food',
    categoryLabel: '脳のエネルギー補給・集中回復',
    badge: '格ゲーマー定番補食',
    description:
      '脳の主要なエネルギー源であるブドウ糖を90%配合。ボトル型容器で片手で開けられ、指がベタつかないためコントローラーを汚さずに素早く集中力を回復できます。',
    authorComment:
      '長時間のトレモやランクマで対空反応や確認が鈍ってきた時の特効薬。デスクに1本常備しておくと重宝します。',
    amazonUrl: 'https://www.amazon.co.jp/s?k=%E6%A3%AE%E6%B0%B8+%E5%A4%A7%E7%B2%92%E3%83%A9%E3%83%A0%E3%83%8D&tag=nikotarosf6-22',
    features: [
      'ぶどう糖90%配合で素早く脳にエネルギーチャージ',
      '指がベタつかずコントローラーが汚れない',
      '片手でつまめる手軽なボトルタイプ',
    ],
  },
  'in-jelly-energy': {
    id: 'in-jelly-energy',
    name: '森永製菓 inゼリー エネルギー / ブドウ糖（素早い補給）',
    category: 'food',
    categoryLabel: '疲労回復・エネルギーゼリー',
    badge: '10秒チャージ',
    description:
      '対戦のインターバルやロード時間に片手で素早くエネルギー補給できる定番ゼリー飲料。固形物と違って胃もたれせず、試合中の眠気を防ぎます。',
    authorComment:
      '大事な大会や連戦の合間に素早くエネルギーを補給したい時の定番。手や机を汚すリスクが極めて低いのも安心です。',
    amazonUrl: 'https://www.amazon.co.jp/s?k=in%E3%82%BC%E3%83%AA%E3%83%BC+%E3%82%A8%E3%83%8D%E3%83%AB%E3%82%AE%E3%83%BC&tag=nikotarosf6-22',
    features: [
      'おにぎり1個分のエネルギーを手早くチャージ',
      '胃腸に負担をかけず集中状態をキープ',
      'キャップ付きでこぼれにくい安心設計',
    ],
  },
  'sports-yokan': {
    id: 'sports-yokan',
    name: '井村屋 スポーツようかん（ワンハンド補食・持続エネルギー）',
    category: 'food',
    categoryLabel: '持続エネルギー・ワンハンド補食',
    badge: '片手でワンプッシュ',
    description:
      'ハサミ不要で中央をギュッと押すだけで手軽に食べられるアスリート向け羊羹。低GIで持続的なエネルギー供給を行い、長時間の集中力を支えます。',
    authorComment:
      '個包装を押すだけでツルッと食べられるため、一切手が汚れません。甘さ控えめで長時間のランクマ連戦でも食べ飽きないのが魅力です。',
    amazonUrl: 'https://www.amazon.co.jp/s?k=%E3%82%B9%E3%83%9D%E3%83%BC%E3%83%84%E3%82%88%E3%81%86%E3%81%8B%E3%82%93&tag=nikotarosf6-22',
    features: [
      '片手でワンプッシュで押し出せる独自構造',
      '塩分・糖分を同時に補給できるバランス配合',
      '賞味期限が長く非常食・ストックにも最適',
    ],
  },
  'monster-energy': {
    id: 'monster-energy',
    name: 'モンスターエナジー（集中チャージ・定番エナジードリンク）',
    category: 'drink',
    categoryLabel: '集中力覚醒・エナジードリンク',
    badge: '集中力覚醒',
    description:
      '極限の集中力と反射速度が求められるランクマッチや大会の定番エナジードリンク。カフェイン、アルギニン、ビタミンB群で脳をブーストします。',
    authorComment:
      'ここ一番の勝負所や深夜のランクマで集中力を高めたい時の強い味方。糖類ゼロのウルトラ（白）など好みに合わせて選べます。',
    amazonUrl: 'https://www.amazon.co.jp/s?k=%E3%83%A2%E3%83%8B%E3%82%B9%E3%82%BF%E3%83%BC%E3%82%A8%E3%83%8A%E3%82%B8%E3%83%BC&tag=nikotarosf6-22',
    features: [
      'カフェイン＆アルギニンで高い覚醒度をキープ',
      '長時間のランクマ・大会配信に最適',
      'ゼロカロリー系など多彩なフレーバー展開',
    ],
  },
  'wilkinson-tansan': {
    id: 'wilkinson-tansan',
    name: 'アサヒ ウィルキンソン タンサン（強炭酸・リフレッシュ）',
    category: 'drink',
    categoryLabel: '頭脳リフレッシュ・強炭酸水',
    badge: '糖分ゼロ・爽快リフレッシュ',
    description:
      'キレ味抜群の強炭酸で、連戦で熱くなった頭を瞬時にシャキッとリフレッシュ。無糖・ゼロカロリーなので健康的にいくらでも水分補給できます。',
    authorComment:
      'カフェインの摂りすぎを抑えつつ、炭酸の強い刺激で眠気や集中切れをリセットできるため、日々のトレモ用ドリンクとして最適です。',
    amazonUrl: 'https://www.amazon.co.jp/s?k=%E3%82%A6%E3%82%A3%E3%83%AB%E3%82%AD%E3%83%B3%E3%82%BD%E3%83%B3+%E3%82%BF%E3%83%B3%E3%82%B5%E3%83%B3&tag=nikotarosf6-22',
    features: [
      '刺激の強い本格強炭酸で気分爽快',
      '無糖・ノンカロリーで健康的に水分補給',
      'ラベルレスボトルならゴミ捨ても楽々',
    ],
  },
  'green-dakara': {
    id: 'green-dakara',
    name: 'サントリー GREEN DA・KA・RA / やさしい麦茶（水分補給）',
    category: 'drink',
    categoryLabel: 'ノンカフェイン水分補給',
    badge: '夜間ランクマにも安心',
    description:
      'カフェインゼロ・すっきりとした飲み口で、夜遅い時間のランクマッチでも睡眠に影響せずゴクゴク飲める定番水分補給ドリンク。',
    authorComment:
      '格ゲーは集中すると水分補給を忘れがち。利尿作用や覚醒作用のない水分を手元に置いておくことが、毎日の安定したパフォーマンスにつながります。',
    amazonUrl: 'https://www.amazon.co.jp/s?k=%E3%82%B0%E3%83%AA%E3%83%BC%E3%83%B3%E3%83%80%E3%82%AB%E3%83%A9&tag=nikotarosf6-22',
    features: [
      'ノンカフェインで就寝前のプレイでも安心',
      'ミネラル・水分をすっきりスムーズに補給',
      '常温でも美味しく飲めるやさしい味わい',
    ],
  },
  'wrist-rest-cushion': {
    id: 'wrist-rest-cushion',
    name: '低反発ゲーミングリストレスト（手首疲労軽減）',
    category: 'desk',
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
  'desk-cup-holder': {
    id: 'desk-cup-holder',
    name: 'クランプ式デスク用ドリンクホルダー（飲みこぼし防止）',
    category: 'desk',
    categoryLabel: 'デスク環境・デバイス水没防止',
    badge: 'デスク水没事故を防止',
    description:
      'アケコンや高級キーボードのすぐ横で飲み物をこぼす大事故を根本から防止。デスク天板の外側にカップを逃がすクランプ式ホルダーです。',
    authorComment:
      '激しいボタン連打やレバー操作で机が揺れても倒れず、高価なコントローラーやPCの水没事故を確実に防げます。',
    amazonUrl: 'https://www.amazon.co.jp/s?k=%E3%83%87%E3%82%B9%E3%82%AF+%E3%83%89%E3%83%AA%E3%83%B3%E3%82%AF%E3%83%9B%E3%83%AB%E3%83%80%E3%83%BC&tag=nikotarosf6-22',
    features: [
      'デスク天板を挟むだけで工具不要の簡単取り付け',
      '机の上が広く使えてコントローラー操作を邪魔しない',
      'ヘッドホンハンガー付きモデルも多数',
    ],
  },
  'large-gaming-desk-mat': {
    id: 'large-gaming-desk-mat',
    name: '超大型ゲーミングデスクマット（防振・防音・滑り止め）',
    category: 'desk',
    categoryLabel: 'デスク環境・防振＆打鍵安定',
    badge: '打鍵音・振動を吸収',
    description:
      'キーボードやレバーレス、アケコンの下に敷くことで、激しい操作時のズレを防止し、机に響く打鍵音や振動を大幅に低減する大型マット。',
    authorComment:
      'コントローラーのグリップ力が増して操作が安定するだけでなく、深夜の練習でも階下や隣室への打鍵振動音を抑えてくれます。',
    amazonUrl: 'https://www.amazon.co.jp/s?k=%E3%82%B2%E3%83%BC%E3%83%9F%E3%83%B3%E3%82%B0%E3%83%87%E3%82%B9%E3%82%AF%E3%83%9E%E3%83%83%E3%83%88+%E5%A4%A7%E5%9E%8B&tag=nikotarosf6-22',
    features: [
      '900×400mm前後の広々サイズでデスク全体を保護',
      'クッション性のある厚手ラバーが打鍵振動を吸収',
      '撥水加工・ステッチ加工で耐久性抜群',
    ],
  },
  'monitor-light-bar': {
    id: 'monitor-light-bar',
    name: 'スクリーンバー / モニター掛け式ライト（目の疲れ軽減）',
    category: 'desk',
    categoryLabel: 'アイケア・デスク照明',
    badge: '反射なしで手元を照らす',
    description:
      'モニター上部に掛けるだけで、画面への光の映り込みを一切生じさせずに、キーボードやコントローラーの手元だけを最適に照らすライト。',
    authorComment:
      '部屋の明かりを落として対戦すると画面の明暗差で目が疲れやすくなります。画面反射ゼロで手元だけ明るくできるため目の疲労度が段違いです。',
    amazonUrl: 'https://www.amazon.co.jp/s?k=%E3%83%A2%E3%83%8B%E3%82%BF%E3%83%BC%E3%83%A9%E3%82%A4%E3%83%88&tag=nikotarosf6-22',
    features: [
      '非対称光学設計で画面への反射・映り込みゼロ',
      'デスクスペースを占有しないモニター上部設置',
      '調光・色温度調整で集中できる環境を演出',
    ],
  },
  'microfiber-cleaning-cloth': {
    id: 'microfiber-cleaning-cloth',
    name: 'マイクロファイバークリーニングクロス（手汗・皮脂拭き取り）',
    category: 'care',
    categoryLabel: 'デバイスケア・メンテナンス',
    badge: 'サラサラ操作感を維持',
    description:
      'アケコンやレバーレスの天板、ボタン表面に付着した手汗や皮脂を素早く拭き取り、常に新品同様のサラサラとした打鍵感を保つ超極細繊維クロス。',
    authorComment:
      'ボタンに皮脂や手汗がたまると滑りが悪くなり、弾き入力やスライドの精度に影響します。プレイ前後にサッと拭くだけで操作性が全く変わります。',
    amazonUrl: 'https://www.amazon.co.jp/s?k=%E3%83%9E%E3%82%A4%E3%82%AF%E3%83%AD%E3%83%95%E3%82%A1%E3%82%A4%E3%83%90%E3%83%BC%E3%82%AF%E3%83%AD%E3%82%B9&tag=nikotarosf6-22',
    features: [
      '超極細繊維が洗剤なしで手汗・皮脂油分をしっかり除去',
      '傷をつけにくい超ソフトな質感',
      '洗濯して何度も繰り返し使用可能',
    ],
  },
  'cable-holder-clips': {
    id: 'cable-holder-clips',
    name: 'ゲーミングケーブルホルダー / クリップ（配線固定・引っかかり防止）',
    category: 'desk',
    categoryLabel: '配線整理・コード管理',
    badge: '有線コードの突っ張りを解消',
    description:
      '有線コントローラーやヘッドセットのケーブルをデスクサイドに固定し、対戦中のコード引っかかりや自重による引っ張りを防止するアイテム。',
    authorComment:
      '有線接続コントローラーで最もストレスになる「コードの引っかかり」や「端子の負荷」を解消。デスク上が整い対戦に没頭できます。',
    amazonUrl: 'https://www.amazon.co.jp/s?k=%E3%82%B1%E3%83%BC%E3%83%96%E3%83%AB%E3%83%9B%E3%83%AB%E3%83%80%E3%83%BC+%E3%83%87%E3%82%B9%E3%82%AF&tag=nikotarosf6-22',
    features: [
      'マグネットまたはクランプでケーブルをしっかりホールド',
      '対戦時のコードの突っ張り・机の角での擦れを防止',
      '複数の有線デバイスをすっきり整理',
    ],
  },
};

/**
 * 共通技術記事の下部に表示する、飲料・軽食・デスク環境アイテムのリスト
 */
export const STRATEGY_AFFILIATE_PRODUCTS: AffiliateProduct[] = [
  AFFILIATE_PRODUCTS['gaming-finger-sleeve'],
  AFFILIATE_PRODUCTS['morinaga-ramune'],
  AFFILIATE_PRODUCTS['monster-energy'],
  AFFILIATE_PRODUCTS['desk-cup-holder'],
  AFFILIATE_PRODUCTS['in-jelly-energy'],
  AFFILIATE_PRODUCTS['wrist-rest-cushion'],
  AFFILIATE_PRODUCTS['wilkinson-tansan'],
  AFFILIATE_PRODUCTS['large-gaming-desk-mat'],
  AFFILIATE_PRODUCTS['sports-yokan'],
  AFFILIATE_PRODUCTS['monitor-light-bar'],
  AFFILIATE_PRODUCTS['green-dakara'],
  AFFILIATE_PRODUCTS['microfiber-cleaning-cloth'],
  AFFILIATE_PRODUCTS['caloriemate-block'],
  AFFILIATE_PRODUCTS['cable-holder-clips'],
];

/**
 * スラグに基づき、サーバーレンダリング（初期表示）時の商品を決定論的に選択するヘルパー
 */
export function getStrategyInitialProduct(slug?: string): AffiliateProduct {
  if (!slug) {
    return STRATEGY_AFFILIATE_PRODUCTS[0];
  }
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash << 5) - hash + slug.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % STRATEGY_AFFILIATE_PRODUCTS.length;
  return STRATEGY_AFFILIATE_PRODUCTS[index];
}

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

