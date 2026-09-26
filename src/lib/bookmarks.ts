import { createClient } from "@/lib/supabase/client";

/**
 * お気に入り（ブックマーク）のローカル＆Supabaseクラウドハイブリッド同期モジュール
 * - 未ログイン時: localStorage で高速動作
 * - ログイン時: localStorage で即時描画 + Supabase クラウドと双方向同期（PC・スマホ連携）
 */

export function getLocalBookmarks(storageKey: string): string[] {
  if (typeof window === "undefined") return [];
  try {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function saveLocalBookmarks(storageKey: string, bookmarks: string[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(storageKey, JSON.stringify(bookmarks));
  } catch {}
}

/**
 * ブックマークを読み込む（ローカル即時 + Supabaseから最新同期）
 */
export async function loadBookmarksWithSync(
  storageKey: string,
  targetKey: string,
  userId?: string
): Promise<string[]> {
  const localList = getLocalBookmarks(storageKey);

  if (!userId) {
    return localList;
  }

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("user_bookmarks")
      .select("section_id")
      .eq("user_id", userId)
      .eq("target_key", targetKey);

    if (!error && data) {
      const remoteIds = data.map((d) => d.section_id);
      // ローカルとリモートをマージ（重複排除）
      const merged = Array.from(new Set([...localList, ...remoteIds]));
      saveLocalBookmarks(storageKey, merged);
      return merged;
    }
  } catch (err) {
    console.warn("Could not sync bookmarks from Supabase:", err);
  }

  return localList;
}

/**
 * ブックマークの追加/削除（ローカル即時更新 + Supabase非同期同期）
 */
export async function toggleBookmarkWithSync(
  storageKey: string,
  targetKey: string,
  sectionId: string,
  currentBookmarks: string[],
  userId?: string
): Promise<string[]> {
  const isAdding = !currentBookmarks.includes(sectionId);
  const nextList = isAdding
    ? [...currentBookmarks, sectionId]
    : currentBookmarks.filter((id) => id !== sectionId);

  // 1. ローカルストレージを即座に更新（画面の即時反映）
  saveLocalBookmarks(storageKey, nextList);

  // 2. ログイン中の場合はSupabaseに非同期同期
  if (userId) {
    try {
      const supabase = createClient();
      if (isAdding) {
        await supabase.from("user_bookmarks").upsert(
          {
            user_id: userId,
            target_key: targetKey,
            section_id: sectionId,
          },
          { onConflict: "user_id,target_key,section_id" }
        );
      } else {
        await supabase
          .from("user_bookmarks")
          .delete()
          .eq("user_id", userId)
          .eq("target_key", targetKey)
          .eq("section_id", sectionId);
      }
    } catch (err) {
      console.warn("Could not sync bookmark change to Supabase:", err);
    }
  }

  return nextList;
}
