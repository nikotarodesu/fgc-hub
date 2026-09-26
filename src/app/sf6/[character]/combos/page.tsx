import React from 'react';
import { notFound } from 'next/navigation';
import { SF6_CHARACTERS } from '@/data/sf6/characters';
import { constructMetadata } from '@/lib/seo';
import CharacterComboToolClient from './CharacterComboToolClient';

interface PageProps {
  params: Promise<{ character: string }>;
}

export async function generateStaticParams() {
  return Object.keys(SF6_CHARACTERS).map((slug) => ({
    character: slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { character } = await params;
  const char = SF6_CHARACTERS[character];
  if (!char) return constructMetadata({ title: 'キャラクターが見つかりません', noIndex: true });

  if (!char.hasTool || char.comboCount === 0) {
    return constructMetadata({
      title: `${char.name} 実戦コンボ・起き攻めデータ（準備中）`,
      description: `スト6 ${char.name}の実戦コンボ・起き攻めデータは現在トレーニングモード検証および準備中です。キャミィの実戦コンボ検索ツールや、${char.name}の立ち回り攻略記事をご活用ください。`,
      canonicalUrl: `/sf6/${character}/combos`,
      noIndex: true,
    });
  }

  return constructMetadata({
    title: `${char.name} 実戦コンボ・起き攻め検索ツール`,
    description: `スト6 ${char.name}の実戦コンボ・起き攻め検索ツール。始動技・ヒット状況・ゲージ消費別の厳選実戦レシピとフレームデータを掲載。全キャラ1800MR以上の筆者監修。`,
    canonicalUrl: `/sf6/${character}/combos`,
  });
}

export default async function CharacterComboPage({ params }: PageProps) {
  const { character } = await params;
  const char = SF6_CHARACTERS[character];

  if (!char) {
    notFound();
  }

  return <CharacterComboToolClient character={char} />;
}
