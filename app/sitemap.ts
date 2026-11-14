import type { MetadataRoute } from "next";
import { products, siteUrl } from "@/app/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["th", "en"];
  const pages = [
    "", "services", "portfolio", "videos", "products", "hr-systems", "process", "about", "contact",
    ...products.map((product) => `products/${product.slug}`),
  ];
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
