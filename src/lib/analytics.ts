'use client';

/**
 * Google Analytics 4 (GA4) カスタムイベント計測ユーティリティ
 * SSR環境やブラウザ拡張機能（AdBlock等）によるエラーを防止する安全設計
 */

declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'js',
      targetId: string,
      config?: Record<string, any>
    ) => void;
  }
}

/**
 * 任意のGA4イベントを安全に送信
 */
export function trackEvent(eventName: string, params: Record<string, any> = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    try {
      window.gtag('event', eventName, params);
    } catch (e) {
      console.warn('GA4 event tracking failed:', e);
    }
  }
}

/**
 * コンボ検索・絞り込み実行イベント
 */
export function trackComboFilter({
  character,
  starter,
  position,
  tag,
}: {
  character: string;
  starter?: string;
  position?: string;
  tag?: string;
}) {
  trackEvent('combo_filter', {
    character,
    starter_category: starter || 'all',
    screen_position: position || 'all',
    okizeme_tag: tag || 'none',
  });
}

/**
 * リーサル計算機（逆引き）実行イベント
 */
export function trackLethalCalc({
  character,
  targetHp,
  matchingCount,
}: {
  character: string;
  targetHp: number;
  matchingCount: number;
}) {
  trackEvent('lethal_calc', {
    character,
    target_hp: targetHp,
    matching_combos_count: matchingCount,
  });
}

/**
 * コンボレシピコピーイベント
 */
export function trackRecipeCopy({
  character,
  comboId,
  title,
}: {
  character: string;
  comboId: string;
  title: string;
}) {
  trackEvent('recipe_copy', {
    character,
    combo_id: comboId,
    combo_title: title,
  });
}

/**
 * キャラクター選択・遷移イベント
 */
export function trackCharacterSelect({
  character,
  from,
}: {
  character: string;
  from?: string;
}) {
  trackEvent('character_select', {
    character_id: character,
    referrer_section: from || 'hub',
  });
}

/**
 * 外部リンク（note, Twitter等）クリック計測
 */
export function trackOutboundClick(url: string, label: string) {
  trackEvent('outbound_click', {
    destination_url: url,
    link_label: label,
  });
}

/**
 * デバイスコーナー導線表示イベント
 */
export function trackDeviceEntryView({
  location,
  sourcePage,
  destination,
}: {
  location: 'header' | 'mobile_menu' | 'home' | 'article_end' | 'sidebar' | 'contextual' | 'hub' | 'footer';
  sourcePage: string;
  destination: string;
}) {
  trackEvent('device_entry_view', {
    entry_location: location,
    source_page: sourcePage,
    destination_url: destination,
  });
}

/**
 * デバイスコーナー導線クリックイベント
 */
export function trackDeviceEntryClick({
  location,
  sourcePage,
  destination,
  category,
}: {
  location: 'header' | 'mobile_menu' | 'home' | 'article_end' | 'sidebar' | 'contextual' | 'hub' | 'footer';
  sourcePage: string;
  destination: string;
  category?: string;
}) {
  trackEvent('device_entry_click', {
    entry_location: location,
    source_page: sourcePage,
    destination_url: destination,
    device_category: category || 'all',
  });
}

/**
 * デバイス販売店・公式サイトリンククリック計測
 */
export function trackDeviceMerchantClick({
  articleSlug,
  productId,
  merchant,
  linkType,
}: {
  articleSlug: string;
  productId: string;
  merchant: string;
  linkType: 'sponsored' | 'official' | 'note';
}) {
  trackEvent('device_merchant_click', {
    article_slug: articleSlug,
    product_id: productId,
    merchant_name: merchant,
    link_type: linkType,
  });
}

/**
 * 関連記事・内部リンククリック計測
 */
export function trackRelatedArticleClick({
  fromArticle,
  toArticle,
  location,
}: {
  fromArticle: string;
  toArticle: string;
  location: 'footer' | 'inline' | 'sidebar' | 'card';
}) {
  trackEvent('related_article_click', {
    source_article_id: fromArticle,
    destination_article_id: toArticle,
    link_location: location,
  });
}

/**
 * メンバーシップ・有料プランCTAクリック計測（個人情報は一切含めない安全設計）
 */
export function trackMembershipCtaClick({
  sourcePage,
  planId,
  ctaLocation,
}: {
  sourcePage: string;
  planId?: string;
  ctaLocation: 'header' | 'article_gate' | 'membership_page' | 'footer';
}) {
  trackEvent('membership_cta_click', {
    source_page: sourcePage,
    plan_id: planId || 'standard',
    cta_location: ctaLocation,
  });
}

/**
 * 公式サイト・外部リソースリンククリック計測
 */
export function trackOutboundOfficialClick({
  sourcePage,
  destinationDomain,
  linkType,
}: {
  sourcePage: string;
  destinationDomain: string;
  linkType: 'capcom_official' | 'note' | 'x' | 'youtube' | 'device';
}) {
  trackEvent('outbound_official_click', {
    source_page: sourcePage,
    destination_domain: destinationDomain,
    link_type: linkType,
  });
}

