import type { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: '決済手続き',
  description: 'にこ太郎の格ゲーLAB 決済処理画面です。',
  canonicalUrl: '/checkout',
  noIndex: true,
});

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
