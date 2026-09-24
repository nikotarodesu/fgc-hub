import { CHUNLI_CLASSIC_COMPLETE_GUIDE } from './chunliClassicCompleteGuide';
import type { Article } from '../articles';

export const CHUNLI_COMPLETE_GUIDE: Article = {
  id: 'art-chunli-complete-guide',
  slug: 'chunli-complete-guide',
  title: '春麗完全攻略｜クラシック対応',
  summary:
    '春麗の立ち回り・起き攻め・厳選コンボを徹底解説。通勤・通学の隙間時間に「読んで強くなる」をコンセプトに、優秀な歩き速度と気功拳、行雲流水による変幻自在な地上戦、主要な有利フレーム別の起き攻め、画面中央・画面端の実戦厳選コンボ、確定反撃、BO時削り連携まで体系化して解説。',
  game: 'sf6',
  category: 'character',
  character: '春麗',
  characterColor: 'from-cyan-500 to-blue-600',
  eyecatchImage: '/images/characters/chunli/sns.jpg',
  author: CHUNLI_CLASSIC_COMPLETE_GUIDE.author,
  publishedAt: '2026-09-24',
  updatedAt: '2026-09-24',
  patchDate: '2026-08-03',
  patchVersion: '2026.08.03 Update',
  readTime: '20分',
  isPaid: true,
  price: 500,
  tags: ['スト6', '春麗', 'キャラ別攻略', '完全攻略', 'クラシック', 'コンボ', '起き攻め', '確定反撃', 'フレーム'],
  likesCount: 52,
  controlType: 'classic',
  abbreviations: CHUNLI_CLASSIC_COMPLETE_GUIDE.abbreviations,
  freeContent: CHUNLI_CLASSIC_COMPLETE_GUIDE.freeContent,
  paidContent: CHUNLI_CLASSIC_COMPLETE_GUIDE.paidContent,
  variants: {
    classic: {
      label: 'クラシック操作 (Classic)',
      badge: 'クラシック (C)',
      intro: CHUNLI_CLASSIC_COMPLETE_GUIDE.freeContent.intro,
      sections: CHUNLI_CLASSIC_COMPLETE_GUIDE.freeContent.sections,
      paidSections: CHUNLI_CLASSIC_COMPLETE_GUIDE.paidContent.sections,
      abbreviations: CHUNLI_CLASSIC_COMPLETE_GUIDE.abbreviations,
    },
    modern: {
      label: 'モダン操作 (Modern)',
      badge: 'モダン (M)',
      intro: '※モダン春麗の完全攻略ガイドは現在準備中です。クラシック操作の解説をご覧ください。',
      sections: [],
      paidSections: [],
    },
  },
};
