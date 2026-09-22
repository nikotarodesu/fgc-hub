import { ELENA_CLASSIC_COMPLETE_GUIDE } from './elenaClassicCompleteGuide';
import { ELENA_MODERN_COMPLETE_GUIDE } from './elenaModernCompleteGuide';
import type { Article } from '../articles';

export const ELENA_COMPLETE_GUIDE: Article = {
  id: 'art-elena-complete-guide',
  slug: 'elena-complete-guide',
  title: 'エレナ完全攻略｜クラシック・モダン対応',
  summary:
    'エレナの立ち回り・起き攻め・厳選コンボを徹底解説。リーチの長い牽制技を活かした地上戦、コロ・コロコロを活用したノーゲージ起き攻めと弾抜け、SA2（ヒーリング）の高回転運用からフレーム別の起き攻め、実戦コンボまで体系化して解説。クラシック（C）・モダン（M）両対応で、ワンクリックで操作タイプを切り替えて閲覧できます。',
  game: 'sf6',
  category: 'character',
  character: 'エレナ',
  characterColor: 'from-amber-500 to-orange-600',
  eyecatchImage: '/images/characters/elena/sns.jpg',
  author: ELENA_CLASSIC_COMPLETE_GUIDE.author,
  publishedAt: '2025-06-10',
  updatedAt: '2026-09-19',
  patchDate: '2026-08-03',
  patchVersion: '2026.08.03 Update',
  readTime: '20分',
  isPaid: true,
  price: 500,
  tags: ['スト6', 'エレナ', 'キャラ別攻略', '完全攻略', 'クラシック', 'モダン', 'コンボ', '起き攻め', 'セットプレイ'],
  likesCount: 68,
  controlType: 'both',
  abbreviations: ELENA_CLASSIC_COMPLETE_GUIDE.abbreviations,
  freeContent: ELENA_CLASSIC_COMPLETE_GUIDE.freeContent,
  paidContent: ELENA_CLASSIC_COMPLETE_GUIDE.paidContent,
  variants: {
    classic: {
      label: 'クラシック操作 (Classic)',
      badge: 'クラシック (C)',
      intro: ELENA_CLASSIC_COMPLETE_GUIDE.freeContent.intro,
      sections: ELENA_CLASSIC_COMPLETE_GUIDE.freeContent.sections,
      paidSections: ELENA_CLASSIC_COMPLETE_GUIDE.paidContent.sections,
      abbreviations: ELENA_CLASSIC_COMPLETE_GUIDE.abbreviations,
    },
    modern: {
      label: 'モダン操作 (Modern)',
      badge: 'モダン (M)',
      intro: ELENA_MODERN_COMPLETE_GUIDE.freeContent.intro,
      sections: ELENA_MODERN_COMPLETE_GUIDE.freeContent.sections,
      paidSections: ELENA_MODERN_COMPLETE_GUIDE.paidContent.sections,
      abbreviations: ELENA_MODERN_COMPLETE_GUIDE.abbreviations,
    },
  },
};
