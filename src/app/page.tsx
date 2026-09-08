'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ARTICLES_DATA, CHARACTERS_SF6, AUTHOR_INFO } from '@/data/articles';
import { Search, Lock, ArrowRight, Sparkles, Zap } from 'lucide-react';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'character' | 'neutral' | 'coaching'>('all');
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // すべてのタグを収集
  const allTags = useMemo(() => {
    if (ARTICLES_DATA.length === 0) {
      return ['スト6', 'リュウ', '立ち回り', '完全攻略', 'コンボ', '上達論'];
    }
    const tags = new Set<string>();
    ARTICLES_DATA.forEach((a) => a.tags.forEach((t) => tags.add(t)));
    return Array.from(tags);
  }, []);

  // フィルタリング処理
  const filteredArticles = useMemo(() => {
    return ARTICLES_DATA.filter((article) => {
      if (selectedCategory === 'character') {
        const isCharGuide =
          article.category === 'character' ||
          article.tags.includes('完全攻略') ||
          article.tags.includes('キャラ別攻略');
        if (!isCharGuide) return false;
      }
      if (selectedCategory === 'neutral') {
        const isNeutral =
          article.category === 'neutral' ||
          article.tags.includes('立ち回り') ||
          article.tags.includes('立ち回り考察');
        if (!isNeutral) return false;
      }
      if (selectedCategory === 'coaching') {
        const isCoaching =
          article.category === 'coaching' ||
          article.tags.includes('過去のコーチング') ||
          article.tags.includes('コーチング');
        if (!isCoaching) return false;
      }
      if (selectedCharacter && article.character !== selectedCharacter) return false;
      if (selectedTag && !article.tags.includes(selectedTag)) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = article.title.toLowerCase().includes(query);
        const matchSummary = article.summary.toLowerCase().includes(query);
        const matchTags = article.tags.some((t) => t.toLowerCase().includes(query));
        if (!matchTitle && !matchSummary && !matchTags) return false;
      }
      return true;
    });
  }, [selectedCategory, selectedCharacter, selectedTag, searchQuery]);

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors">
      {/* 検索・クイックアクセスセクション */}
      <section className="bg-white dark:bg-neutral-900 border-b border-neutral-200/80 dark:border-neutral-800 py-6 sm:py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* 検索バー */}
          <div className="max-w-xl relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="記事タイトル・キャラクター・技名で検索..."
              className="w-full pl-10 pr-12 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-400 focus:bg-white dark:focus:bg-neutral-800 transition-all shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 font-medium"
              >
                クリア
              </button>
            )}
          </div>

          {/* 機能バナー: スト6攻略データベース (nikotaro.com/sf6/) */}
          <div className="mt-6 p-5 sm:p-6 rounded-xl bg-neutral-900 text-white border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm sm:text-base tracking-tight">スト6攻略データベース（Webツール）</span>
                  <span className="text-[9px] font-semibold px-1.5 py-0.2 rounded bg-white/15 text-neutral-200 uppercase tracking-wide">TOOL</span>
                </div>
                <p className="text-xs text-neutral-400 mt-0.5">
                  状況別コンボ検索、+42F詐欺飛び・シミー起き攻めデータ、リーサル逆引き計算機
                </p>
              </div>
            </div>
            <Link
              href="/sf6"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-white hover:bg-neutral-100 text-neutral-950 transition-colors shrink-0 self-stretch sm:self-auto justify-center"
            >
              <span>ツールを開く</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* メインレイアウト（2カラム） */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* セグメントコントロール（カテゴリ切り替えタブ） */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-3 border-b border-neutral-200/80 dark:border-neutral-800">
          <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800/80 p-1 rounded-lg border border-neutral-200/60 dark:border-neutral-700/60 overflow-x-auto">
            <button
              onClick={() => { setSelectedCategory('all'); setSelectedCharacter(null); setSelectedTag(null); }}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs font-bold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              全記事一覧
            </button>
            <button
              onClick={() => { setSelectedCategory('character'); setSelectedCharacter(null); setSelectedTag(null); }}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === 'character'
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs font-bold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              キャラ別攻略
            </button>
            <button
              onClick={() => { setSelectedCategory('neutral'); setSelectedCharacter(null); setSelectedTag(null); }}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === 'neutral'
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs font-bold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              立ち回り
            </button>
            <button
              onClick={() => { setSelectedCategory('coaching'); setSelectedCharacter(null); setSelectedTag(null); }}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === 'coaching'
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs font-bold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              過去のコーチング
            </button>
          </div>

          <div className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
            全 <span className="text-neutral-900 dark:text-white font-bold">{filteredArticles.length}</span> 件
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* メイン記事カラム（8 / 12） */}
          <div className="lg:col-span-8 space-y-4">
            {/* 絞り込み条件表示 */}
            {(selectedCategory !== 'all' || selectedCharacter || selectedTag || searchQuery) && (
              <div className="p-3 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 flex items-center justify-between text-xs shadow-xs">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-neutral-500 dark:text-neutral-400">絞り込み:</span>
                  {selectedCategory !== 'all' && (
                    <span className="bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-medium px-2 py-0.5 rounded">
                      {selectedCategory === 'character' ? 'カテゴリ: キャラ別攻略' : selectedCategory === 'neutral' ? 'カテゴリ: 立ち回り' : 'カテゴリ: 過去のコーチング'}
                    </span>
                  )}
                  {selectedCharacter && (
                    <span className="bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-medium px-2 py-0.5 rounded">
                      キャラ: {selectedCharacter}
                    </span>
                  )}
                  {selectedTag && (
                    <span className="bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-medium px-2 py-0.5 rounded">
                      #{selectedTag}
                    </span>
                  )}
                  {searchQuery && (
                    <span className="bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-medium px-2 py-0.5 rounded">
                      &quot;{searchQuery}&quot;
                    </span>
                  )}
                </div>
                <button
                  onClick={() => { setSelectedCategory('all'); setSelectedCharacter(null); setSelectedTag(null); setSearchQuery(''); }}
                  className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white underline font-medium cursor-pointer shrink-0"
                >
                  解除
                </button>
              </div>
            )}

            {/* 記事一覧 */}
            {ARTICLES_DATA.length === 0 ? (
              <div className="p-10 sm:p-14 text-center bg-white rounded-xl border border-neutral-200/80 shadow-xs space-y-4">
                <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-neutral-500">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-neutral-900 text-base sm:text-lg">
                    攻略記事を準備中です
                  </h3>
                  <p className="text-xs text-neutral-500 mt-1.5 max-w-md mx-auto leading-relaxed">
                    全キャラ1800MR以上の筆者「にこ太郎」による実戦立ち回り・解説記事を順次公開予定です。まずは上部の「スト6攻略データベース（Webツール）」をご利用ください。
                  </p>
                </div>
                <div className="pt-2">
                  <Link
                    href="/sf6"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-neutral-900 hover:bg-neutral-800 text-white transition-colors"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>スト6攻略データベースを開く</span>
                  </Link>
                </div>
              </div>
            ) : filteredArticles.length === 0 ? (
              <div className="p-10 text-center bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200/80 dark:border-neutral-800 text-neutral-500 text-sm space-y-2 shadow-xs">
                <p className="font-bold text-neutral-800 dark:text-neutral-200">
                  {selectedCategory === 'coaching'
                    ? '過去のコーチング記事は現在準備中です'
                    : '該当する記事が見つかりませんでした'}
                </p>
                <p className="text-xs text-neutral-400">
                  {selectedCategory === 'coaching'
                    ? '全キャラ1800MR達成に向けた実戦添削や指導アーカイブを順次公開予定です。お楽しみに！'
                    : '別の条件やキーワードでお試しください。'}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredArticles.map((article) => (
                  <Link
                    key={article.id}
                    href={`/articles/${article.slug}`}
                    className="group block p-5 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200/80 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 hover:shadow-xs transition-all"
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400">
                          {article.game === 'sf6' ? 'スト6' : '共通理論'}
                        </span>
                        {article.character && (
                          <span className="text-[11px] font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded">
                            {article.character}
                          </span>
                        )}
                        {(article.category === 'neutral' || article.tags.includes('立ち回り')) && (
                          <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/50 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800">
                            立ち回り
                          </span>
                        )}
                        {(article.category === 'character' || article.tags.includes('完全攻略') || article.tags.includes('キャラ別攻略')) && (
                          <span className="text-[10px] font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/50 px-2 py-0.5 rounded border border-indigo-200 dark:border-indigo-800">
                            完全攻略
                          </span>
                        )}
                        {(article.category === 'coaching' || article.tags.includes('過去のコーチング') || article.tags.includes('コーチング')) && (
                          <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                            過去のコーチング
                          </span>
                        )}
                        {article.controlType === 'both' ? (
                          <span className="text-[10px] font-bold text-[#008ba8] dark:text-cyan-300 bg-sky-50 dark:bg-sky-950/40 px-2 py-0.5 rounded border border-sky-200 dark:border-sky-800">
                            C / M 両対応
                          </span>
                        ) : article.controlType ? (
                          <span className="text-[10px] font-medium text-neutral-600 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded">
                            {article.controlType === 'classic' ? 'クラシック' : 'モダン'}
                          </span>
                        ) : null}
                        {article.youtubeVideoId && (
                          <span className="text-[10px] font-medium text-neutral-600 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded flex items-center gap-1">
                            <span>▶ 動画付き</span>
                          </span>
                        )}
                      </div>
                      {article.isPaid ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-neutral-900 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded">
                          <Lock className="w-3 h-3 text-neutral-600 dark:text-neutral-400" />
                          <span>¥{article.price}</span>
                        </span>
                      ) : (
                        <span className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded">
                          無料
                        </span>
                      )}
                    </div>

                    <h2 className="text-base font-bold text-neutral-900 dark:text-white group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors mb-1.5 leading-snug">
                      {article.title}
                    </h2>

                    <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                      {article.summary}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* 右サイドバー（4 / 12） */}
          <aside className="lg:col-span-4 space-y-5">
            {/* 著者プロフィールカード */}
            <div className="p-5 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs text-center">
              <div className="w-14 h-14 rounded-full overflow-hidden ring-1 ring-neutral-200 dark:ring-neutral-800 mx-auto mb-3 bg-neutral-100 dark:bg-neutral-800">
                <Image
                  src="/icon.png"
                  alt="にこ太郎"
                  width={56}
                  height={56}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-sm text-neutral-900 dark:text-white">{AUTHOR_INFO.name}</h3>
              <div className="inline-block text-[11px] font-medium text-neutral-600 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 px-2.5 py-0.5 rounded-full my-1.5">
                {AUTHOR_INFO.mrRating}
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed mt-1 text-left">
                {AUTHOR_INFO.bio}
              </p>
              <div className="mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-800">
                <a
                  href={AUTHOR_INFO.xUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center py-2 px-3 rounded-lg text-xs font-medium bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 transition-colors"
                >
                  <span>公式X ({AUTHOR_INFO.xHandle})</span>
                </a>
              </div>
            </div>

            {/* スト6 キャラクター別クイックアクセス */}
            <div className="p-5 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs">
              <h3 className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider mb-3">
                キャラクター別攻略
              </h3>
              <div className="grid grid-cols-2 gap-1.5">
                {CHARACTERS_SF6.map((char) => (
                  <button
                    key={char.id}
                    onClick={() => {
                      setSelectedCharacter(selectedCharacter === char.name ? null : char.name);
                    }}
                    className={`text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                      selectedCharacter === char.name
                        ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                        : 'bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300'
                    }`}
                  >
                    {char.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* トピックタグ */}
            <div className="p-5 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs">
              <h3 className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider mb-3">
                トピック
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                      selectedTag === tag
                        ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            {/* 月額マガジン案内カード */}
            <div className="p-5 bg-neutral-900 text-white rounded-xl border border-neutral-800 shadow-sm">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400 block mb-1">
                MEMBERSHIP
              </span>
              <h3 className="text-sm font-bold text-white mb-1">
                月額マガジンで読み放題
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                月額¥980でスト6全キャラ攻略＆立ち回り解説がすべて読み放題。最新パッチ追記も含め追加費用なしで閲覧できます。
              </p>
              <Link
                href="/membership"
                className="block w-full py-2 rounded-lg bg-white hover:bg-neutral-100 text-neutral-950 text-xs font-semibold text-center transition-colors"
              >
                マガジン詳細を見る
              </Link>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
