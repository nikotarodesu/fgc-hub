import { RYU_CLASSIC_COMPLETE_GUIDE } from './ryuClassicCompleteGuide';
import { RYU_MODERN_COMPLETE_GUIDE } from './ryuModernCompleteGuide';
import type { Article } from '../articles';

export const RYU_COMPLETE_GUIDE: Article = {
  id: 'art-ryu-complete-guide',
  slug: 'ryu-complete-guide',
  title: 'C・Mリュウの完全攻略：立ち回り,起き攻め,厳選コンボなど【2026ver】',
  summary:
    'リュウの全てをまとめました。通勤、通学の隙間時間に「読んで強くなる」をコンセプトに、クラシック（C）・モダン（M）双方の立ち回り、距離別戦術、全フレーム状況別起き攻め、厳選コンボから確定反撃、BO時削り連携まで完全網羅。ワンクリックで操作タイプを切り替えて閲覧できます。',
  game: 'sf6',
  category: 'character',
  character: 'リュウ',
  characterColor: 'from-blue-600 to-indigo-800',
  author: RYU_CLASSIC_COMPLETE_GUIDE.author,
  publishedAt: '2025-06-17',
  updatedAt: '2026-09-08',
  readTime: '20分',
  isPaid: true,
  price: 500,
  tags: ['スト6', 'リュウ', 'キャラ別攻略', '完全攻略', 'クラシック', 'モダン', 'コンボ', '起き攻め'],
  likesCount: 157,
  controlType: 'both',
  freeContent: RYU_CLASSIC_COMPLETE_GUIDE.freeContent,
  paidContent: RYU_CLASSIC_COMPLETE_GUIDE.paidContent,
  variants: {
    classic: {
      label: 'クラシック操作 (Classic)',
      badge: 'クラシック (C)',
      intro: RYU_CLASSIC_COMPLETE_GUIDE.freeContent.intro,
      sections: RYU_CLASSIC_COMPLETE_GUIDE.freeContent.sections,
      paidSections: RYU_CLASSIC_COMPLETE_GUIDE.paidContent.sections,
    },
    modern: {
      label: 'モダン操作 (Modern)',
      badge: 'モダン (M)',
      intro: RYU_MODERN_COMPLETE_GUIDE.freeContent.intro,
      sections: RYU_MODERN_COMPLETE_GUIDE.freeContent.sections,
      paidSections: RYU_MODERN_COMPLETE_GUIDE.paidContent.sections,
    },
  },
};
