import {
  BQ_PRODUCTION_INSTAGRAM,
  type InstagramProfile,
} from "@/lib/site";

const INSTAGRAM_APP_ID = "936619743392459";
const INSTAGRAM_REVALIDATE_SECONDS = 1800;
const INSTAGRAM_HEADERS = {
  "user-agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
  "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
} as const;

const FEED_PROFILES = [BQ_PRODUCTION_INSTAGRAM];

type InstagramCaption = {
  text?: string;
};

type InstagramImageVersions = {
  candidates?: Array<{
    url?: string;
  }>;
};

type InstagramTimelineItem = {
  id?: string;
  code?: string;
  media_type?: number;
  product_type?: string;
  caption?: InstagramCaption | null;
  taken_at?: number;
  image_versions2?: InstagramImageVersions;
  carousel_media?: Array<{
    media_type?: number;
    image_versions2?: InstagramImageVersions;
    video_versions?: unknown[];
  }>;
  video_versions?: unknown[];
};

type InstagramTimelineResponse = {
  items?: InstagramTimelineItem[];
};

export type InstagramVideo = {
  id: string;
  code: string;
  title: string;
  url: string;
  thumbnail: string;
  publishedAt?: string;
  sourceLabel: string;
  sourceUrl: string;
};

const fallbackVideos: InstagramVideo[] = [
  {
    id: "fallback-production-1",
    code: "DI8Z3L5MNKz",
    title: "Backstage коммерческой съемки",
    url: "https://www.instagram.com/reel/DI8Z3L5MNKz/",
    thumbnail: "/images/instagram/bq-production-1.jpg",
    publishedAt: "2025-04-27T08:46:56.000Z",
    sourceLabel: BQ_PRODUCTION_INSTAGRAM.label,
    sourceUrl: BQ_PRODUCTION_INSTAGRAM.href,
  },
  {
    id: "fallback-production-2",
    code: "DIOlYOAMzZp",
    title: "Little Brazil",
    url: "https://www.instagram.com/reel/DIOlYOAMzZp/",
    thumbnail: "/images/instagram/bq-production-2.jpg",
    publishedAt: "2025-04-09T13:42:37.000Z",
    sourceLabel: BQ_PRODUCTION_INSTAGRAM.label,
    sourceUrl: BQ_PRODUCTION_INSTAGRAM.href,
  },
  {
    id: "fallback-production-3",
    code: "DILy6aRsDNT",
    title: "Commercial video Hyundai",
    url: "https://www.instagram.com/reel/DILy6aRsDNT/",
    thumbnail: "/images/instagram/bq-production-3.jpg",
    publishedAt: "2025-04-08T11:43:44.000Z",
    sourceLabel: BQ_PRODUCTION_INSTAGRAM.label,
    sourceUrl: BQ_PRODUCTION_INSTAGRAM.href,
  },
  {
    id: "fallback-production-4",
    code: "DRoXennCLjO",
    title: "BQ Studio: пакеты и форматы",
    url: "https://www.instagram.com/reel/DRoXennCLjO/",
    thumbnail: "/images/instagram/bq-production-4.jpg",
    publishedAt: "2025-11-29T06:45:28.000Z",
    sourceLabel: BQ_PRODUCTION_INSTAGRAM.label,
    sourceUrl: BQ_PRODUCTION_INSTAGRAM.href,
  },
  {
    id: "fallback-production-5",
    code: "DMPeo-XCRjJ",
    title: "Commercial for YaYa",
    url: "https://www.instagram.com/reel/DMPeo-XCRjJ/",
    thumbnail: "/images/instagram/bq-production-5.jpg",
    publishedAt: "2025-07-18T08:15:32.000Z",
    sourceLabel: BQ_PRODUCTION_INSTAGRAM.label,
    sourceUrl: BQ_PRODUCTION_INSTAGRAM.href,
  },
  {
    id: "fallback-production-6",
    code: "DJePcGtM8Hk",
    title: "Taycan cinematic drive",
    url: "https://www.instagram.com/reel/DJePcGtM8Hk/",
    thumbnail: "/images/instagram/bq-production-6.jpg",
    publishedAt: "2025-05-10T12:16:45.000Z",
    sourceLabel: BQ_PRODUCTION_INSTAGRAM.label,
    sourceUrl: BQ_PRODUCTION_INSTAGRAM.href,
  },
];

function extractInstagramCode(value?: string | null) {
  if (!value) return null;

  const trimmed = value.trim();
  const fromUrl = trimmed.match(/\/(?:reel|p)\/([^/?#]+)/)?.[1];
  if (fromUrl) return fromUrl.trim();

  return trimmed.match(/^[\w-]+$/)?.[0] ?? null;
}

function getPrimaryImage(
  imageVersions?: InstagramImageVersions,
  carouselMedia?: InstagramTimelineItem["carousel_media"]
) {
  const directImage = imageVersions?.candidates?.[0]?.url?.trim();
  if (directImage) return directImage;

  return (
    carouselMedia?.find((item) => item.image_versions2?.candidates?.[0]?.url)
      ?.image_versions2?.candidates?.[0]?.url?.trim() ?? null
  );
}

function hasVideoContent(item: InstagramTimelineItem) {
  if ((item.video_versions?.length ?? 0) > 0) return true;
  if (item.media_type === 2) return true;
  if (item.product_type === "clips") return true;

  return (
    item.carousel_media?.some(
      (media) =>
        media.media_type === 2 || (media.video_versions?.length ?? 0) > 0
    ) ?? false
  );
}

function buildInstagramPostUrl(item: InstagramTimelineItem) {
  const code = extractInstagramCode(item.code);
  if (!code) return null;

  const postType =
    item.product_type === "clips" || item.media_type === 2 ? "reel" : "p";

  return `https://www.instagram.com/${postType}/${code}/`;
}

function buildInstagramTitle(
  caption: InstagramTimelineItem["caption"],
  sourceLabel: string
) {
  const text = caption?.text?.replace(/\s+/g, " ").trim();
  if (!text) return `Новое видео ${sourceLabel}`;

  const firstLine = text.split(/[.!?]/)[0]?.trim() || text;
  if (firstLine.length <= 78) return firstLine;

  return `${firstLine.slice(0, 75).trim()}...`;
}

function sortVideos(videos: InstagramVideo[]) {
  return [...videos].sort((a, b) => {
    const aTime = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
    const bTime = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
    return bTime - aTime;
  });
}

function isGenericTitle(title: string, sourceLabel: string) {
  return title.trim() === `Новое видео ${sourceLabel}`;
}

function getVideoKey(video: InstagramVideo) {
  return (
    extractInstagramCode(video.code) ||
    extractInstagramCode(video.url) ||
    video.id
  );
}

function mergeVideoRecord(existing: InstagramVideo, incoming: InstagramVideo) {
  return {
    id: incoming.id || existing.id,
    code: incoming.code || existing.code,
    title:
      isGenericTitle(incoming.title, incoming.sourceLabel) &&
      !isGenericTitle(existing.title, existing.sourceLabel)
        ? existing.title
        : incoming.title,
    url: incoming.url || existing.url,
    thumbnail: incoming.thumbnail || existing.thumbnail,
    publishedAt: incoming.publishedAt || existing.publishedAt,
    sourceLabel: incoming.sourceLabel || existing.sourceLabel,
    sourceUrl: incoming.sourceUrl || existing.sourceUrl,
  } satisfies InstagramVideo;
}

function normalizeTimelineItem(
  item: InstagramTimelineItem,
  profile: InstagramProfile
): InstagramVideo | null {
  if (!hasVideoContent(item)) return null;

  const thumbnail = getPrimaryImage(item.image_versions2, item.carousel_media);
  const url = buildInstagramPostUrl(item);
  const code = extractInstagramCode(item.code) || extractInstagramCode(url);
  if (!thumbnail || !url || !code) return null;

  return {
    id: item.id?.trim() || code || url,
    code,
    title: buildInstagramTitle(item.caption, profile.label),
    url,
    thumbnail,
    publishedAt: item.taken_at
      ? new Date(item.taken_at * 1000).toISOString()
      : undefined,
    sourceLabel: profile.label,
    sourceUrl: profile.href,
  } satisfies InstagramVideo;
}

async function fetchProfileVideos(
  profile: InstagramProfile,
  count = 12
): Promise<InstagramVideo[]> {
  try {
    const timelineUrl = `https://www.instagram.com/api/v1/feed/user/${encodeURIComponent(
      profile.handle
    )}/username/?count=${count}`;

    const timelineResponse = await fetch(timelineUrl, {
      next: { revalidate: INSTAGRAM_REVALIDATE_SECONDS },
      headers: {
        ...INSTAGRAM_HEADERS,
        cookie: "csrftoken=bqmedia",
        referer: profile.href,
        "x-ig-app-id": INSTAGRAM_APP_ID,
        "x-requested-with": "XMLHttpRequest",
      },
    });

    if (!timelineResponse.ok) return [];

    const data = (await timelineResponse.json()) as InstagramTimelineResponse;

    return (data.items ?? [])
      .map((item) => normalizeTimelineItem(item, profile))
      .filter((item): item is InstagramVideo => item !== null);
  } catch {
    return [];
  }
}

function mergeVideos(primary: InstagramVideo[], fallback: InstagramVideo[]) {
  const unique = new Map<string, InstagramVideo>();

  for (const video of fallback) {
    unique.set(getVideoKey(video), video);
  }

  for (const video of primary) {
    const key = getVideoKey(video);
    const existing = unique.get(key);
    unique.set(key, existing ? mergeVideoRecord(existing, video) : video);
  }

  return sortVideos(Array.from(unique.values()));
}

export async function getInstagramVideos(limit = 6) {
  const count = Math.max(limit * 2, 12);
  const liveVideos = await Promise.all(
    FEED_PROFILES.map((profile) => fetchProfileVideos(profile, count))
  );

  return mergeVideos(liveVideos.flat(), fallbackVideos).slice(0, limit);
}

export function formatInstagramDate(value?: string) {
  if (!value) return null;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  return date.toLocaleDateString("ru-RU");
}

export const INSTAGRAM_FEED_URL = BQ_PRODUCTION_INSTAGRAM.href;
