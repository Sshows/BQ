import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import { ArrowRight, Instagram, Play } from "lucide-react";
import {
  formatInstagramDate,
  getInstagramVideos,
  INSTAGRAM_FEED_URL,
} from "@/lib/instagram";
import { BQ_PRODUCTION_INSTAGRAM } from "@/lib/site";

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
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-bq-white/70">
              <Instagram size={14} className="text-bq-accent" />
              Instagram
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Reels и backstage из Instagram
            </h2>
            <p className="mt-3 max-w-xl text-bq-white/70">
              На сайте показываем только превью. По клику ролик сразу
              открывается в Instagram, без скачивания и лишних шагов.
            </p>
            <div className="mt-5 flex flex-wrap gap-3 text-sm text-bq-white/65">
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                @{BQ_PRODUCTION_INSTAGRAM.handle}
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                Актуальные reels без дублей
              </span>
            </div>
          </div>

          <Link
            href={INSTAGRAM_FEED_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-bq-accent px-5 py-3 text-sm font-semibold text-bq-black transition-all duration-300 hover:bg-amber-400 hover:shadow-[0_18px_40px_rgba(232,197,71,0.15)]"
          >
            Открыть Instagram
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {videos.map((video) => {
            const publishedLabel = formatInstagramDate(video.publishedAt);

            return (
              <Link
                key={video.code}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Открыть видео "${video.title}" в Instagram`}
                className="group overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.04] transition-all duration-300 hover:-translate-y-1 hover:border-bq-accent/25 hover:bg-white/[0.07]"
              >
                <div className="relative aspect-[9/16] overflow-hidden bg-white/5">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90">
                    <Instagram size={12} className="text-bq-accent" />
                    Reel
                  </div>
                  <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white/90">
                    <Play size={14} className="translate-x-[1px]" />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
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
                    <div className="text-sm text-bq-white/55">{publishedLabel}</div>
                  ) : null}
                  <div className="mt-2 text-lg font-semibold leading-snug">
                    {video.title}
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-3 text-sm">
                    <span className="text-bq-accent">Открыть в Instagram</span>
                    <span className="text-bq-white/45">
                      @{BQ_PRODUCTION_INSTAGRAM.handle}
                    </span>
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
