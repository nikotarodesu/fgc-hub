import type { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'マイページ・契約管理',
  description: 'にこ太郎の格ゲーLAB 会員マイページ・サブスクリプション契約管理です。',
  canonicalUrl: '/account/subscription',
  noIndex: true,
});

export default function SubscriptionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
