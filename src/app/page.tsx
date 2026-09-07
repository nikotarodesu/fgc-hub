'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ARTICLES_DATA, CHARACTERS_SF6 } from '@/data/articles';
import { Search, Flame, BookOpen, Sparkles, Lock, ArrowRight, TrendingUp, Filter, Tag, CheckCircle2 } from 'lucide-react';

export default function HomePage() {
  const [selectedGame, setSelectedGame] = useState<'all' | 'sf6' | 'general' | 'sf7'>('all');
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // すべてのタグを収集
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    ARTICLES_DATA.forEach((a) => a.tags.forEach((t) => tags.add(t)));
    return Array.from(tags);
  }, []);

  // フィルタリング処理
  const filteredArticles = useMemo(() => {
    return ARTICLES_DATA.filter((article) => {
      if (selectedGame !== 'all' && article.game !== selectedGame) return false;
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
  }, [selectedGame, selectedCharacter, selectedTag, searchQuery]);

  // ピックアップ記事（注目の看板記事）
  const featuredArticle = ARTICLES_DATA[0];

  return (
    <div className="min-h-screen bg-[#fafafa] text-neutral-900">
      {/* ヒーローヘッダー：シンプルでクリーン */}
      <section className="bg-white border-b border-neutral-200 py-10 sm:py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-700 text-xs font-semibold mb-4">
              <span>最高MR2080到達者による実践メソッド</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight leading-tight mb-3">
              勝率を引き上げる、格闘ゲーム攻略メディア
            </h1>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              『ストリートファイター6』の実戦的セットプレイから、タイトルが変わっても一生使える共通上達論、将来の『スト7』へ続く攻略ナレッジを蓄積・発信しています。
            </p>
          </div>

          {/* 検索バー */}
          <div className="mt-8 max-w-xl relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="記事タイトル・キャラクター・技名で検索..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-700"
              >
                クリア
              </button>
            )}
          </div>
        </div>
      </section>

      {/* メインレイアウト（2カラム：記事一覧 ＋ 遊覧サイドバー） */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* ゲーム切り替えタブ */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-3 border-b border-neutral-200">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            <button
              onClick={() => { setSelectedGame('all'); setSelectedCharacter(null); setSelectedTag(null); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                selectedGame === 'all'
                  ? 'bg-neutral-900 text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200'
              }`}
            >
              全記事
            </button>
            <button
              onClick={() => { setSelectedGame('sf6'); setSelectedCharacter(null); setSelectedTag(null); }}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                selectedGame === 'sf6'
                  ? 'bg-neutral-900 text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-orange-500" />
              <span>ストリートファイター6</span>
            </button>
            <button
              onClick={() => { setSelectedGame('general'); setSelectedCharacter(null); setSelectedTag(null); }}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                selectedGame === 'general'
                  ? 'bg-neutral-900 text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-blue-500" />
              <span>共通上達論</span>
            </button>
            <button
              onClick={() => { setSelectedGame('sf7'); setSelectedCharacter(null); setSelectedTag(null); }}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                selectedGame === 'sf7'
                  ? 'bg-neutral-900 text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>スト7展望室</span>
            </button>
          </div>

          <div className="text-xs text-neutral-500">
            {filteredArticles.length} 件の記事
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* メインカラム（8 / 12） */}
          <div className="lg:col-span-8 space-y-6">
            {/* 選択中の絞り込み条件があれば表示 */}
            {(selectedCharacter || selectedTag || searchQuery) && (
              <div className="p-3 rounded-lg bg-white border border-neutral-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-neutral-500">絞り込み中:</span>
                  {selectedCharacter && (
                    <span className="bg-neutral-100 text-neutral-800 font-semibold px-2 py-0.5 rounded">
                      キャラ: {selectedCharacter}
                    </span>
                  )}
                  {selectedTag && (
                    <span className="bg-neutral-100 text-neutral-800 font-semibold px-2 py-0.5 rounded">
                      タグ: #{selectedTag}
                    </span>
                  )}
                  {searchQuery && (
                    <span className="bg-neutral-100 text-neutral-800 font-semibold px-2 py-0.5 rounded">
                      キーワード: &quot;{searchQuery}&quot;
                    </span>
                  )}
                </div>
                <button
                  onClick={() => { setSelectedCharacter(null); setSelectedTag(null); setSearchQuery(''); }}
                  className="text-neutral-500 hover:text-neutral-900 underline cursor-pointer"
                >
                  条件を解除
                </button>
              </div>
            )}

            {/* 記事一覧リスト */}
            {filteredArticles.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-xl border border-neutral-200 text-neutral-500 text-sm">
                該当する記事が見つかりませんでした。別のキーワードでお試しください。
              </div>
            ) : (
              <div className="space-y-4">
                {filteredArticles.map((article) => (
                  <Link
                    key={article.id}
                    href={`/articles/${article.slug}`}
                    className="group block p-5 sm:p-6 bg-white rounded-xl border border-neutral-200/80 hover:border-neutral-400 hover:shadow-sm transition-all duration-200"
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-semibold text-neutral-500 uppercase">
                          {article.game === 'sf6' ? 'スト6' : article.game === 'sf7' ? 'スト7' : '共通理論'}
                        </span>
                        {article.character && (
                          <span className="text-[11px] font-medium text-neutral-700 bg-neutral-100 px-2 py-0.5 rounded">
                            {article.character}
                          </span>
                        )}
                      </div>
                      {article.isPaid ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-neutral-800 bg-neutral-100 px-2 py-0.5 rounded">
                          <Lock className="w-3 h-3 text-neutral-600" />
                          <span>¥{article.price}</span>
                        </span>
                      ) : (
                        <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                          無料公開
                        </span>
                      )}
                    </div>

                    <h2 className="text-base sm:text-lg font-bold text-neutral-900 group-hover:text-neutral-700 transition-colors mb-2 leading-snug">
                      {article.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-neutral-600 line-clamp-2 leading-relaxed mb-4">
                      {article.summary}
                    </p>

                    <div className="flex items-center justify-between text-xs text-neutral-400 pt-3 border-t border-neutral-100">
                      <div className="flex items-center gap-3">
                        <span className="text-neutral-700 font-medium">{article.author.name}</span>
                        <span>・</span>
                        <span>{article.publishedAt}</span>
                        <span>・</span>
                        <span>読了 {article.readTime}</span>
                      </div>
                      <div className="flex items-center gap-1 text-neutral-900 font-semibold group-hover:translate-x-0.5 transition-transform">
                        <span>読む</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* 遊覧サイドバー（4 / 12）：回遊性を劇的に向上 */}
          <aside className="lg:col-span-4 space-y-6">
            {/* キャラクター別クイックナビ */}
            <div className="p-5 bg-white rounded-xl border border-neutral-200">
              <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-neutral-600" />
                <span>スト6 キャラクター別攻略</span>
              </h3>
              <div className="grid grid-cols-2 gap-1.5">
                {CHARACTERS_SF6.map((char) => (
                  <button
                    key={char.id}
                    onClick={() => {
                      setSelectedGame('sf6');
                      setSelectedCharacter(selectedCharacter === char.name ? null : char.name);
                    }}
                    className={`text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                      selectedCharacter === char.name
                        ? 'bg-neutral-900 text-white font-semibold'
                        : 'bg-neutral-50 text-neutral-700 hover:bg-neutral-100'
                    }`}
                  >
                    {char.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* 人気記事ランキング */}
            <div className="p-5 bg-white rounded-xl border border-neutral-200">
              <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-neutral-600" />
                <span>人気記事ランキング</span>
              </h3>
              <div className="space-y-3">
                {ARTICLES_DATA.map((art, idx) => (
                  <Link
                    key={art.id}
                    href={`/articles/${art.slug}`}
                    className="flex items-start gap-2.5 group"
                  >
                    <span className="font-mono font-bold text-xs text-neutral-400 group-hover:text-neutral-900 shrink-0 mt-0.5">
                      0{idx + 1}
                    </span>
                    <div>
                      <h4 className="text-xs font-medium text-neutral-800 group-hover:text-neutral-900 line-clamp-2 leading-snug">
                        {art.title}
                      </h4>
                      <span className="text-[10px] text-neutral-400">
                        {art.isPaid ? `¥${art.price}・有料` : '無料'}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* 人気タグクラウド */}
            <div className="p-5 bg-white rounded-xl border border-neutral-200">
              <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-neutral-600" />
                <span>トピック・タグ</span>
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                    className={`px-2.5 py-1 rounded-md text-xs transition-colors cursor-pointer ${
                      selectedTag === tag
                        ? 'bg-neutral-900 text-white font-semibold'
                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            {/* 月額マガジン案内カード */}
            <div className="p-5 bg-neutral-900 text-white rounded-xl">
              <div className="text-[11px] font-bold text-neutral-300 uppercase tracking-wider mb-1">
                MEMBERSHIP
              </div>
              <h3 className="text-sm font-bold text-white mb-2">
                月額マガジンで全記事読み放題
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                月額¥980でスト6全記事＋今後のスト7最速攻略がすべて読み放題。noteよりお得に最新版を購読できます。
              </p>
              <Link
                href="/membership"
                className="block w-full py-2 rounded-lg bg-white hover:bg-neutral-100 text-neutral-900 text-xs font-bold text-center transition-colors"
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
