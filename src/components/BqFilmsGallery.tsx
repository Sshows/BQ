import Image from "next/image";
import Link from "next/link";
import {
  BQFILMS_CHANNEL_URL,
  formatPublishedDate,
  getBqFilmsVideos,
} from "@/lib/bqfilms";

type BqFilmsGalleryProps = {
  limit?: number;
};

export default async function BqFilmsGallery({
  limit = 6,
}: BqFilmsGalleryProps) {
  const videos = (await getBqFilmsVideos()).slice(0, limit);

  return (
    <section className="section-pad bg-bq-black">
      <div className="container-bq">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-bq-white/70">
              YouTube
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Свежие серии и выпуски
            </h2>
            <p className="mt-3 max-w-xl text-bq-white/70">
              Превью подтягиваются из YouTube-канала BQ Production. Клик по
              карточке сразу открывает нужное видео.
            </p>
          </div>

          <Link
            href={BQFILMS_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-bq-accent px-5 py-3 text-sm font-semibold text-bq-black transition-all duration-300 hover:bg-amber-400 hover:shadow-[0_18px_40px_rgba(232,197,71,0.15)]"
          >
            Открыть канал на YouTube
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => {
            const publishedLabel = formatPublishedDate(video.publishedAt);

            return (
              <Link
                key={video.id}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Открыть видео "${video.title}" на YouTube`}
                className="group overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.04] transition-all duration-300 hover:-translate-y-1 hover:border-bq-accent/20 hover:bg-white/[0.07]"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="rounded-full border border-white/15 bg-black/55 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white">
                      Play
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
                  <div className="mt-3 text-sm text-bq-accent">
                    Смотреть на YouTube
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
