interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
}

export default function YouTubeEmbed({ videoId, title = 'YouTube video player' }: YouTubeEmbedProps) {
  return (
    <div className="my-6 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-900 shadow-sm">
      <div className="relative w-full aspect-video">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      </div>
      <div className="p-2.5 bg-neutral-50 border-t border-neutral-200 text-xs text-neutral-500 flex items-center justify-between">
        <span>添削対象の対戦リプレイ動画</span>
        <span className="text-[11px] text-neutral-400">YouTubeで全画面再生可能</span>
      </div>
    </div>
  );
}
