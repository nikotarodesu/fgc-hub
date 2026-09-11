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
  if (!char) return constructMetadata({ title: 'キャラクターが見つかりません' });

  return constructMetadata({
    title: `${char.name} 実戦コンボ・起き攻め検索ツール`,
    description: `${char.name}の状況別コンボ検索、+42F詐欺飛び・シミー起き攻めデータ。全キャラ1800MR以上の筆者監修。`,
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
