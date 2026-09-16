/**
 * メディアURL解決ユーティリティ
 * Cloudflare R2 などの外部ストレージURL（NEXT_PUBLIC_MEDIA_URL）が設定されている場合、
 * 相対パス（/images/...）を自動的にR2の公開URLに変換します。
 * 未設定時はローカル（Vercel）の静的ファイルパスをそのまま返します。
 */
export function getMediaUrl(path: string | undefined): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('//')) {
    return path;
  }
  const mediaBaseUrl = process.env.NEXT_PUBLIC_MEDIA_URL;
  if (mediaBaseUrl && path.startsWith('/')) {
    return `${mediaBaseUrl.replace(/\/$/, '')}${path}`;
  }
  return path;
}
