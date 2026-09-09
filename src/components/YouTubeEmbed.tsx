interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
  caption?: string;
}

export default function YouTubeEmbed({
  videoId,
  title = 'YouTube video player',
  caption = '実戦解説・対戦リプレイ動画',
}: YouTubeEmbedProps) {
  return (
    <div className="my-6 overflow-hidden rounded-xl border border-neutral-200/90 bg-neutral-900 shadow-sm">
      <div className="relative w-full aspect-video">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      </div>
      <div className="p-2.5 sm:px-4 bg-neutral-50 dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700 text-xs text-neutral-600 dark:text-neutral-300 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
        <span className="font-medium flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-600 inline-block"></span>
          {caption}
        </span>
        <span className="text-[11px] text-neutral-400">YouTubeで全画面再生可能</span>
      </div>
    </div>
  );
}
