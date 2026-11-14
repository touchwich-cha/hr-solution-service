import type { MetadataRoute } from "next";
import { products, siteUpdated, siteUrl } from "@/app/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["th", "en"] as const;
  const pages = ["", "products", "training-media", "about", "contact", ...products.map((product) => `products/${product.slug}`)];
  const lastModified = new Date(siteUpdated);
  const urlFor = (locale: string, page: string) => `${siteUrl}/${locale}${page ? `/${page}` : ""}`;

  return locales.flatMap((locale) =>
    pages.map((page) => ({
      url: urlFor(locale, page),
      lastModified,
      changeFrequency: page === "" ? ("weekly" as const) : ("monthly" as const),
      priority: page === "" ? 1 : page.startsWith("products/") ? 0.7 : 0.8,
      alternates: { languages: { th: urlFor("th", page), en: urlFor("en", page) } },
    }))
  );
}
