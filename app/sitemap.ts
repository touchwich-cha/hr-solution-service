import type { MetadataRoute } from "next";
import { siteUrl } from "@/app/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["th", "en"];
  const pages = ["", "services", "portfolio", "videos", "hr-systems", "process", "about", "contact"];
  const lastModified = new Date();

  return locales.flatMap((locale) =>
    pages.map((page) => ({
      url: `${siteUrl}/${locale}${page ? `/${page}` : ""}`,
      lastModified,
      changeFrequency: page === "" ? ("weekly" as const) : ("monthly" as const),
      priority: page === "" ? 1 : 0.8,
    }))
  );
}
