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
    <section className="bg-bq-black py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-bq-white/70">
              BQ Production
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Последние серии и выпуски
            </h2>
            <p className="mt-3 max-w-2xl text-bq-white/70">
              Вся свежая выдача с YouTube-канала собрана прямо здесь. Клик по
              карточке сразу открывает видео.
            </p>
          </div>

          <Link
            href={BQFILMS_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded bg-bq-accent px-5 py-3 text-sm font-semibold text-bq-black transition-colors hover:bg-amber-400"
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
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-colors hover:bg-white/10"
              >
                <div className="relative aspect-video">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent opacity-90 transition-opacity group-hover:opacity-70" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="rounded-full border border-white/15 bg-black/55 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white">
                      Play
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
