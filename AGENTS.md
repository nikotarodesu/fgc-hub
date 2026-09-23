<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# プロジェクトルール (fgc-hub / にこ太郎の格ゲーLAB)

## 表記・用語ガイドライン

### 格闘ゲーム技データ・フレームデータ
- **キャンセル性能の表記**:
  - キャンセルが効かない技のステータス・フレームバッジ・解説において、「効かない」という表現は使用せず、必ず**「不可」**（例: `キャンセル: 不可`、`キャンセル不可`）と統一すること。

### 日本語文章・コピーライティング
- **二重引用符（“” や ""）による単語強調の禁止**:
  - “実戦ノウハウ”のように、日本語の単語やフレーズを二重引用符（`“”` や `""`）で囲む表現はAI特有の不自然な文体となるため全面禁止とする。強調が必要な場合は「」（カギ括弧）を用いるか、囲み記号を使わずにそのまま記述すること。

### 完全攻略記事・実戦コンボ逆引きデータベース共通仕様
- **CAフィニッシュ（+250ダメージ）の表記場所**:
  - 「SA3ではなくCA締めにすると＋250ダメージ」という内容は、**記事本文中には記載せず、実戦コンボ逆引きデータベース側でのみ表示・計算する**こと。
  - 完全攻略記事の本文中には「CAは+250ダメージ」「CAで締めた場合+250ダメージ」などの記述は含めず、逆引きデータベース側の表示・計算に委ねること。
- **起き攻めフレームセクションの記載ルール**:
  - 起き攻めフレームセクションの冒頭に「【フレーム表の読み方について】〜」といったメタ説明テキストは含めず、直接「❶ 画面中央」から開始すること。

