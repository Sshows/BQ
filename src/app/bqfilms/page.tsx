import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "BQFILMS — Сериалы и серии | BQ",
  description:
    "BQFILMS — все серии и проекты BQ с превью и ссылками на YouTube.",
};

export const revalidate = 3600;

type YoutubeVideo = {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  publishedAt?: string;
};

function parseYoutubeRss(xml: string): YoutubeVideo[] {
  const entries = xml.split("<entry>").slice(1);
  const videos: YoutubeVideo[] = [];

  for (const entry of entries) {
    const id = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1]?.trim();
    if (!id) continue;

    const title =
      entry.match(/<title>([\s\S]*?)<\/title>/)?.[1]?.trim() ?? `Видео ${id}`;
    const publishedAt = entry
      .match(/<published>([^<]+)<\/published>/)?.[1]
      ?.trim();

    const thumbnail =
      entry.match(/<media:thumbnail[^>]*url="([^"]+)"/)?.[1]?.trim() ??
      `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

    videos.push({
      id,
      title,
      url: `https://www.youtube.com/watch?v=${id}`,
      thumbnail,
      publishedAt,
    });
  }

  const unique = new Map<string, YoutubeVideo>();
  for (const v of videos) unique.set(v.id, v);
  return Array.from(unique.values());
}

async function getChannelVideos(): Promise<YoutubeVideo[] | null> {
  const envChannelId = process.env.NEXT_PUBLIC_BQFILMS_CHANNEL_ID?.trim();
  const handle = "bqproductionkz2026";

  const channelId =
    envChannelId ??
    (await (async () => {
      try {
        const res = await fetch(`https://www.youtube.com/@${handle}`, {
          next: { revalidate: 3600 },
          headers: { "user-agent": "BQFILMS/1.0 (+nextjs)" },
        });
        if (!res.ok) return null;
        const html = await res.text();

        const fromJson = html.match(/"channelId":"(UC[^"]+)"/)?.[1]?.trim();
        if (fromJson) return fromJson;

        const fromUrl = html.match(/https:\/\/www\.youtube\.com\/channel\/(UC[\w-]+)/)?.[1]?.trim();
        return fromUrl ?? null;
      } catch {
        return null;
      }
    })());

  if (!channelId) return null;

  const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${encodeURIComponent(
    channelId
  )}`;

  const res = await fetch(rssUrl, {
    next: { revalidate: 3600 },
    headers: { "user-agent": "BQFILMS/1.0 (+nextjs)" },
  });

  if (!res.ok) return null;
  const xml = await res.text();
  return parseYoutubeRss(xml);
}

export default async function BqFilmsPage() {
  const channelUrl =
    "https://youtube.com/@bqproductionkz2026?si=OgK3pCbrXIN5ZDlu";
  const videos = await getChannelVideos();

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
                Все серии — с превью
              </h1>
              <p className="mt-3 text-bq-white/70 max-w-2xl">
                Здесь собраны выпуски с YouTube-канала. Нажимай на карточку —
                откроется видео.
              </p>
            </div>

            <Link
              href={channelUrl}
              target="_blank"
              className="inline-flex items-center justify-center rounded bg-bq-accent px-5 py-3 text-sm font-semibold text-bq-black hover:bg-amber-400 transition-colors"
            >
              Открыть канал на YouTube
            </Link>
          </div>

          {!videos ? (
            <div className="mt-10 rounded-xl border border-white/10 bg-white/5 p-6 text-bq-white/70">
              <p className="text-base">
                Не удалось загрузить список видео с YouTube (временная ошибка
                или блокировка запроса). Кнопка на канал доступна выше.
              </p>
              <p className="mt-2 text-sm text-bq-white/60">
                Если нужно, можно явно задать{" "}
                <span className="font-mono text-bq-white">
                  NEXT_PUBLIC_BQFILMS_CHANNEL_ID
                </span>{" "}
                (формат <span className="font-mono text-bq-white">UC…</span>) в
                переменных окружения Vercel.
              </p>
            </div>
          ) : (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {videos.map((video) => (
                <Link
                  key={video.id}
                  href={video.url}
                  target="_blank"
                  className="group rounded-2xl overflow-hidden border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="relative aspect-video">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                  </div>
                  <div className="p-5">
                    <div className="text-sm text-bq-white/60">
                      {video.publishedAt
                        ? new Date(video.publishedAt).toLocaleDateString("ru-RU")
                        : ""}
                    </div>
                    <div className="mt-2 font-semibold leading-snug">
                      {video.title}
                    </div>
                    <div className="mt-3 text-sm text-bq-accent">
                      Смотреть на YouTube
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

