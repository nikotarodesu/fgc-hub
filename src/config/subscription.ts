/**
 * にこ太郎の格ゲーLAB プレミアム会員・サブスクリプション設定モジュール
 * 運営側が価格や公開制御を一元管理・変更できるように集約しています。
 */

export const SUBSCRIPTION_CONFIG = {
  // 料金設定（税込）
  pricing: {
    monthly: {
      amount: 980,
      currency: "jpy",
      taxIncluded: true,
      displayPrice: "¥980",
      periodLabel: "月",
      billingInterval: "month",
      stripePriceId: process.env.STRIPE_PRICE_ID_MONTHLY || "price_nikotaro_monthly_980",
      description: "手軽に始められる月額プラン。いつでもマイページから解約可能。",
    },
    yearly: {
      amount: 9800,
      currency: "jpy",
      taxIncluded: true,
      displayPrice: "¥9,800",
      periodLabel: "年",
      billingInterval: "year",
      stripePriceId: process.env.STRIPE_PRICE_ID_YEARLY || "price_nikotaro_yearly_9800",
      description: "2ヶ月分お得な年額プラン（実質月額約817円）。継続して上達したいプレイヤーに最適。",
      savingLabel: "2ヶ月分お得",
      discountPercentage: 17,
    },
  },

  // 本番販売有効化フラグ
  enableSubscriptionSales: process.env.NEXT_PUBLIC_ENABLE_SUBSCRIPTION_SALES === "true",

  // Stripe公開鍵
  stripePublishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",

  // プレミアム会員の提供機能一覧
  features: [
    {
      id: "all_guides",
      title: "全キャラ徹底攻略ガイド 読み放題",
      description: "全キャラ1800MR以上の知見を凝縮した立ち回り・対空・確定反撃・セットプレイ解説がすべて読み放題。",
      free: "無料記事のみ閲覧可能",
      premium: "有料・限定記事を含む全記事が無制限",
    },
    {
      id: "coaching_archive",
      title: "実戦添削コーチングアーカイブ 全閲覧",
      description: "MR帯・相手キャラ別のリプレイ添削、伸び悩みの具体的な原因と改善ドリルを網羅。",
      free: "一部サンプルのみ",
      premium: "全コーチング事例が無制限",
    },
    {
      id: "lethal_calc",
      title: "逆引きリーサル計算ツール 完全版",
      description: "残り体力・ゲージ状況から最善のリーサルコンボや状況重視ルートを即座に逆引き。",
      free: "体験版（基本ルートのみ）",
      premium: "全状況・全キャラ・補正切りルート完全解放",
    },
    {
      id: "updates",
      title: "大型アップデート追従・永続更新",
      description: "キャラ調整や新シーズンパッチの変更点を最速検証し、既存記事・コンボデータを即座に更新。",
      free: "更新情報のみ",
      premium: "最新パッチ対応データを常時反映",
    },
  ],
};
