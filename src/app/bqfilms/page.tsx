import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "BQFILMS - Сериалы и серии",
  description:
    "BQFILMS - все серии и проекты BQ с превью и ссылками на YouTube.",
};

export const revalidate = 3600;

const CHANNEL_HANDLE = "bqproductionkz2026";
const CHANNEL_URL =
  "https://www.youtube.com/@bqproductionkz2026?si=nS_51P_ZsGQ_69GJ";

type YoutubeVideo = {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  publishedAt?: string;
};

const fallbackVideos: YoutubeVideo[] = [
  {
    id: "VuPvcSRkrSY",
    title:
      "ДОСТАР СПОРТИКТАРМЕН БІРІКТІ! ДОС ЕМЕС СЕРИАЛ 2026 | 3 СЕРИЯ | ҚАЗАҚША СЕРИАЛ 2026",
    url: "https://www.youtube.com/watch?v=VuPvcSRkrSY",
    thumbnail: "https://i.ytimg.com/vi/VuPvcSRkrSY/hqdefault.jpg",
    publishedAt: "2026-03-14T00:00:00.000Z",
  },
  {
    id: "Cjt3PHRtiLU",
    title:
      "ДОСТАР БАНДИТТЕРГЕ ҰСТАЛАДЫ ! ДОС ЕМЕС СЕРИАЛ 2026 | 4 СЕРИЯ | ҚАЗАҚША СЕРИАЛ 2026",
    url: "https://www.youtube.com/watch?v=Cjt3PHRtiLU",
    thumbnail: "https://i.ytimg.com/vi/Cjt3PHRtiLU/hqdefault.jpg",
    publishedAt: "2026-03-09T00:00:00.000Z",
  },
  {
    id: "KHPKPi1tCp8",
    title:
      "ДОСЫ САТЫП КЕТТІ! ДОС ЕМЕС СЕРИАЛ 2026 | 3 СЕРИЯ | ҚАЗАҚША СЕРИАЛ 2026",
    url: "https://www.youtube.com/watch?v=KHPKPi1tCp8",
    thumbnail: "https://i.ytimg.com/vi/KHPKPi1tCp8/hqdefault.jpg",
    publishedAt: "2026-03-04T00:00:00.000Z",
  },
  {
    id: "sYgDi_50c04",
    title:
      "ЕКІ ДОС ТІРЕСІП ҚАЛДЫ! ДОС ЕМЕС СЕРИАЛ 2026 | 2 СЕРИЯ | ҚАЗАҚША СЕРИАЛ 2026",
    url: "https://www.youtube.com/watch?v=sYgDi_50c04",
    thumbnail: "https://i.ytimg.com/vi/sYgDi_50c04/hqdefault.jpg",
    publishedAt: "2026-02-20T00:00:00.000Z",
  },
  {
    id: "pX-YThpE6Rc",
    title:
      "Доспен дұшпанның арасы- бір қадам | 1 СЕРИЯ | ДОС ЕМЕС СЕРИАЛ | СЕРИАЛ 2026",
    url: "https://www.youtube.com/watch?v=pX-YThpE6Rc",
    thumbnail: "https://i.ytimg.com/vi/pX-YThpE6Rc/hqdefault.jpg",
    publishedAt: "2026-02-08T00:00:00.000Z",
  },
  {
    id: "yN0X2o7YmEw",
    title: "Имаш и Испанец бала - ДРАКА АКТАНА И ИСПАНЕЦ БАЛА",
    url: "https://www.youtube.com/watch?v=yN0X2o7YmEw",
    thumbnail: "https://i.ytimg.com/vi/yN0X2o7YmEw/hqdefault.jpg",
    publishedAt: "2025-06-16T00:00:00.000Z",
  },
];

function buildThumbnailUrl(id: string) {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

function decodeHtmlEntities(value: string) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'");
}

function normalizeVideo(video: YoutubeVideo): YoutubeVideo {
  return {
    ...video,
    title: video.title.trim() || `Видео ${video.id}`,
    url: video.url || `https://www.youtube.com/watch?v=${video.id}`,
    thumbnail: buildThumbnailUrl(video.id),
  };
}

function sortVideos(videos: YoutubeVideo[]) {
  return [...videos].sort((a, b) => {
    const aTime = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
    const bTime = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
    return bTime - aTime;
  });
}

function parseYoutubeRss(xml: string): YoutubeVideo[] {
  const entries = xml.split("<entry>").slice(1);
  const unique = new Map<string, YoutubeVideo>();

  for (const entry of entries) {
    const id = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1]?.trim();
    if (!id) continue;

    const rawTitle =
      entry.match(/<title>([\s\S]*?)<\/title>/)?.[1]?.trim() ?? `Видео ${id}`;
    const publishedAt = entry
      .match(/<published>([^<]+)<\/published>/)?.[1]
      ?.trim();

    unique.set(
      id,
      normalizeVideo({
        id,
        title: decodeHtmlEntities(rawTitle),
        url: `https://www.youtube.com/watch?v=${id}`,
        thumbnail: buildThumbnailUrl(id),
        publishedAt,
      })
    );
  }

  return sortVideos(Array.from(unique.values()));
}

function mergeVideos(primary: YoutubeVideo[] | null, fallback: YoutubeVideo[]) {
  const unique = new Map<string, YoutubeVideo>();

  for (const video of fallback) {
    unique.set(video.id, normalizeVideo(video));
  }

  for (const video of primary ?? []) {
    unique.set(video.id, normalizeVideo(video));
  }

  return sortVideos(Array.from(unique.values()));
}

function formatPublishedDate(value?: string) {
  if (!value) return null;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  return date.toLocaleDateString("ru-RU");
}

async function fetchTextWithFallback(url: string): Promise<string | null> {
  const headers = { "user-agent": "BQFILMS/1.0 (+nextjs)" };

  try {
    const res = await fetch(url, { next: { revalidate }, headers });
    if (res.ok) return await res.text();
  } catch {
    // ignore
  }

  try {
    const jinaUrl = `https://r.jina.ai/${url}`;
    const res = await fetch(jinaUrl, { next: { revalidate }, headers });
    if (res.ok) return await res.text();
  } catch {
    // ignore
  }

  return null;
}

async function getChannelVideos(): Promise<YoutubeVideo[] | null> {
  const envChannelId = process.env.NEXT_PUBLIC_BQFILMS_CHANNEL_ID?.trim();

  const channelId =
    envChannelId ??
    (await (async () => {
      const html = await fetchTextWithFallback(
        `https://www.youtube.com/@${CHANNEL_HANDLE}`
      );
      if (!html) return null;

      const fromJson = html.match(/"channelId":"(UC[^"]+)"/)?.[1]?.trim();
      if (fromJson) return fromJson;

      const fromUrl = html
        .match(/https:\/\/www\.youtube\.com\/channel\/(UC[\w-]+)/)?.[1]
        ?.trim();
      return fromUrl ?? null;
    })());

  if (!channelId) return null;

  const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${encodeURIComponent(
    channelId
  )}`;

  const xml = await fetchTextWithFallback(rssUrl);
  if (!xml) return null;

  return parseYoutubeRss(xml);
}

export default async function BqFilmsPage() {
  const videos = mergeVideos(await getChannelVideos(), fallbackVideos);

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-bq-white/70">
                BQFILMS
              </div>
              <h1 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight">
                Все серии - с превью
              </h1>
              <p className="mt-3 max-w-2xl text-bq-white/70">
                Здесь собраны выпуски с YouTube-канала. Нажимай на карточку или
                превью, и откроется нужное видео.
              </p>
            </div>

            <Link
              href={CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded bg-bq-accent px-5 py-3 text-sm font-semibold text-bq-black transition-colors hover:bg-amber-400"
            >
              Открыть канал на YouTube
            </Link>
          </div>

          {videos.length === 0 ? (
            <div className="mt-10 rounded-xl border border-white/10 bg-white/5 p-6 text-bq-white/70">
              Пока не удалось загрузить видео. Кнопка перехода на YouTube
              доступна выше.
            </div>
          ) : (
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
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
