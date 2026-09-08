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
