import type { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'スト6攻略のプレミアム会員・料金案内',
  description:
    '全キャラ1800MR以上の筆者によるスト6徹底攻略ガイド、実戦添削コーチングアーカイブ、逆引きリーサルツールがすべて読み放題。月額980円（いつでも解約可能）。',
  canonicalUrl: '/membership',
});

export default function MembershipLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
