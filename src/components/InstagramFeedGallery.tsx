import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import { ArrowRight, Instagram } from "lucide-react";
import {
  formatInstagramDate,
  getInstagramVideos,
  INSTAGRAM_FEED_URL,
} from "@/lib/instagram";

type InstagramFeedGalleryProps = {
  limit?: number;
};

export default async function InstagramFeedGallery({
  limit = 6,
}: InstagramFeedGalleryProps) {
  noStore();
  const videos = await getInstagramVideos(limit);

  return (
    <section className="section-pad bg-bq-black">
      <div className="container-bq">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-bq-white/70">
              <Instagram size={14} className="text-bq-accent" />
              Instagram
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Новые видео и backstage
            </h2>
            <p className="mt-3 max-w-2xl text-bq-white/70">
              Свежие reels и клипы BQ подтягиваются прямо с Instagram. Клик по
              карточке сразу открывает ролик в Instagram.
            </p>
          </div>

          <Link
            href={INSTAGRAM_FEED_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded bg-bq-accent px-5 py-3 text-sm font-semibold text-bq-black transition-colors hover:bg-amber-400"
          >
            Открыть Instagram
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => {
            const publishedLabel = formatInstagramDate(video.publishedAt);

            return (
              <Link
                key={video.id}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Открыть видео "${video.title}" в Instagram`}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-colors hover:bg-white/10"
              >
                <div className="relative aspect-[9/16] overflow-hidden bg-white/5">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent opacity-95 transition-opacity group-hover:opacity-75" />
                  <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/85">
                    <Instagram size={12} className="text-bq-accent" />
                    Reel
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-4">
                    <span className="rounded-full border border-white/15 bg-black/50 px-3 py-1 text-xs text-white/80">
                      {video.sourceLabel}
                    </span>
                    <span className="rounded-full border border-white/15 bg-black/50 px-3 py-1 text-xs text-white/80">
                      Смотреть
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  {publishedLabel ? (
                    <div className="text-sm text-bq-white/60">
                      {publishedLabel}
                    </div>
                  ) : null}
                  <div className="mt-2 font-semibold leading-snug">
                    {video.title}
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-3 text-sm">
                    <span className="text-bq-accent">Смотреть в Instagram</span>
                    <span className="text-bq-white/50">{video.sourceLabel}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
