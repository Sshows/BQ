import {
  BQ_MEDIA_INSTAGRAM,
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

const FEED_PROFILES = [BQ_PRODUCTION_INSTAGRAM, BQ_MEDIA_INSTAGRAM];

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
    title: "Backstage коммерческой съёмки",
    url: BQ_PRODUCTION_INSTAGRAM.href,
    thumbnail: "/images/founder/buti-onset-v2.png",
    publishedAt: "2026-03-01T00:00:00.000Z",
    sourceLabel: BQ_PRODUCTION_INSTAGRAM.label,
    sourceUrl: BQ_PRODUCTION_INSTAGRAM.href,
  },
  {
    id: "fallback-media-1",
    title: "Love Story",
    url: BQ_MEDIA_INSTAGRAM.href,
    thumbnail: "/images/portfolio/lovestory-1.jpg",
    publishedAt: "2026-02-16T00:00:00.000Z",
    sourceLabel: BQ_MEDIA_INSTAGRAM.label,
    sourceUrl: BQ_MEDIA_INSTAGRAM.href,
  },
  {
    id: "fallback-media-2",
    title: "Wedding highlights",
    url: BQ_MEDIA_INSTAGRAM.href,
    thumbnail: "/images/portfolio/wedding-2.jpg",
    publishedAt: "2026-02-05T00:00:00.000Z",
    sourceLabel: BQ_MEDIA_INSTAGRAM.label,
    sourceUrl: BQ_MEDIA_INSTAGRAM.href,
  },
  {
    id: "fallback-production-2",
    title: "Съёмка в студии",
    url: BQ_PRODUCTION_INSTAGRAM.href,
    thumbnail: "/images/founder/buti-onset.png",
    publishedAt: "2026-01-29T00:00:00.000Z",
    sourceLabel: BQ_PRODUCTION_INSTAGRAM.label,
    sourceUrl: BQ_PRODUCTION_INSTAGRAM.href,
  },
  {
    id: "fallback-media-3",
    title: "Портретная история",
    url: BQ_MEDIA_INSTAGRAM.href,
    thumbnail: "/images/portfolio/bqmedia/portfolio-3.png",
    publishedAt: "2026-01-18T00:00:00.000Z",
    sourceLabel: BQ_MEDIA_INSTAGRAM.label,
    sourceUrl: BQ_MEDIA_INSTAGRAM.href,
  },
  {
    id: "fallback-media-4",
    title: "Съёмка для пары",
    url: BQ_MEDIA_INSTAGRAM.href,
    thumbnail: "/images/portfolio/bqmedia/portfolio-6.png",
    publishedAt: "2026-01-03T00:00:00.000Z",
    sourceLabel: BQ_MEDIA_INSTAGRAM.label,
    sourceUrl: BQ_MEDIA_INSTAGRAM.href,
  },
];

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
  if (!item.code) return null;

  const postType =
    item.product_type === "clips" || item.media_type === 2 ? "reel" : "p";

  return `https://www.instagram.com/${postType}/${item.code}/`;
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

function normalizeTimelineItem(
  item: InstagramTimelineItem,
  profile: InstagramProfile
): InstagramVideo | null {
  if (!hasVideoContent(item)) return null;

  const thumbnail = getPrimaryImage(item.image_versions2, item.carousel_media);
  const url = buildInstagramPostUrl(item);
  if (!thumbnail || !url) return null;

  return {
    id: item.id?.trim() || item.code?.trim() || url,
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
  count = 6
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

    const items = (data.items ?? [])
      .map((item) => normalizeTimelineItem(item, profile))
      .filter((item): item is InstagramVideo => item !== null);

    return items;
  } catch {
    return [];
  }
}

function mergeVideos(primary: InstagramVideo[], fallback: InstagramVideo[]) {
  const unique = new Map<string, InstagramVideo>();

  for (const video of fallback) {
    unique.set(video.id, video);
  }

  for (const video of primary) {
    unique.set(video.id, video);
  }

  return sortVideos(Array.from(unique.values()));
}

export async function getInstagramVideos(limit = 6) {
  const liveVideos = await Promise.all(
    FEED_PROFILES.map((profile) => fetchProfileVideos(profile, limit))
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
