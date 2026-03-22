export const BQFILMS_CHANNEL_HANDLE = "bqproductionkz2026";
export const BQFILMS_CHANNEL_URL =
  "https://www.youtube.com/@bqproductionkz2026?si=nS_51P_ZsGQ_69GJ";

export type YoutubeVideo = {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  publishedAt?: string;
};

const fallbackVideos: YoutubeVideo[] = [
  {
    id: "VuPvcSRkrSY",
    title: "Дос емес - 5 серия",
    url: "https://www.youtube.com/watch?v=VuPvcSRkrSY",
    thumbnail: "https://i.ytimg.com/vi/VuPvcSRkrSY/hqdefault.jpg",
    publishedAt: "2026-03-14T00:00:00.000Z",
  },
  {
    id: "Cjt3PHRtiLU",
    title: "Дос емес - 4 серия",
    url: "https://www.youtube.com/watch?v=Cjt3PHRtiLU",
    thumbnail: "https://i.ytimg.com/vi/Cjt3PHRtiLU/hqdefault.jpg",
    publishedAt: "2026-03-09T00:00:00.000Z",
  },
  {
    id: "KHPKPi1tCp8",
    title: "Дос емес - 3 серия",
    url: "https://www.youtube.com/watch?v=KHPKPi1tCp8",
    thumbnail: "https://i.ytimg.com/vi/KHPKPi1tCp8/hqdefault.jpg",
    publishedAt: "2026-03-04T00:00:00.000Z",
  },
  {
    id: "sYgDi_50c04",
    title: "Дос емес - 2 серия",
    url: "https://www.youtube.com/watch?v=sYgDi_50c04",
    thumbnail: "https://i.ytimg.com/vi/sYgDi_50c04/hqdefault.jpg",
    publishedAt: "2026-02-20T00:00:00.000Z",
  },
  {
    id: "pX-YThpE6Rc",
    title: "Дос емес - 1 серия",
    url: "https://www.youtube.com/watch?v=pX-YThpE6Rc",
    thumbnail: "https://i.ytimg.com/vi/pX-YThpE6Rc/hqdefault.jpg",
    publishedAt: "2026-02-08T00:00:00.000Z",
  },
  {
    id: "yN0X2o7YmEw",
    title: "Имаш и Испанец бала",
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

async function fetchTextWithFallback(url: string): Promise<string | null> {
  const headers = { "user-agent": "BQFILMS/1.0 (+nextjs)" };

  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 },
      headers,
    });
    if (response.ok) return await response.text();
  } catch {
    // ignore
  }

  try {
    const jinaUrl = `https://r.jina.ai/${url}`;
    const response = await fetch(jinaUrl, {
      next: { revalidate: 3600 },
      headers,
    });
    if (response.ok) return await response.text();
  } catch {
    // ignore
  }

  return null;
}

async function fetchLiveVideos(): Promise<YoutubeVideo[] | null> {
  const envChannelId = process.env.NEXT_PUBLIC_BQFILMS_CHANNEL_ID?.trim();

  const channelId =
    envChannelId ??
    (await (async () => {
      const html = await fetchTextWithFallback(
        `https://www.youtube.com/@${BQFILMS_CHANNEL_HANDLE}`
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

export async function getBqFilmsVideos() {
  return mergeVideos(await fetchLiveVideos(), fallbackVideos);
}

export function formatPublishedDate(value?: string) {
  if (!value) return null;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  return date.toLocaleDateString("ru-RU");
}
