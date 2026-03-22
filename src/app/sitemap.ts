import type { MetadataRoute } from "next";
import { CASE_ROUTES } from "@/lib/cases";
import { SITE_URL, SITEMAP_ROUTES } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [...SITEMAP_ROUTES, ...CASE_ROUTES].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/cases/") ? 0.9 : 0.8,
  }));
}
