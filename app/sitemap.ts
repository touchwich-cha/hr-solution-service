import type { MetadataRoute } from "next";
import { siteUpdated, siteUrl } from "@/app/site-data";
import { fwProducts } from "@/app/catalog-data";
import { articles } from "@/app/articles-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["th", "en"] as const;
  const pages = ["", "products", "training-media", "about", "contact", ...fwProducts.map((product) => `products/${product.slug}`)];
  // Articles are Thai-only: listed once, under /th (the /en copies canonicalise to /th).
  const articlePages = ["articles", ...articles.map((article) => `articles/${article.slug}`)];
  const lastModified = new Date(siteUpdated);
  const urlFor = (locale: string, page: string) => `${siteUrl}/${locale}${page ? `/${page}` : ""}`;

  const main = locales.flatMap((locale) =>
    pages.map((page) => ({
      url: urlFor(locale, page),
      lastModified,
      changeFrequency: page === "" ? ("weekly" as const) : ("monthly" as const),
      priority: page === "" ? 1 : page.startsWith("products/") ? 0.7 : 0.8,
      alternates: { languages: { th: urlFor("th", page), en: urlFor("en", page) } },
    }))
  );
  const knowledge = articlePages.map((page) => ({
    url: urlFor("th", page),
    lastModified: new Date(page === "articles" ? siteUpdated : articles.find((article) => `articles/${article.slug}` === page)?.updated ?? articles.find((article) => `articles/${article.slug}` === page)?.date ?? siteUpdated),
    changeFrequency: "monthly" as const,
    priority: page === "articles" ? 0.8 : 0.7,
  }));
  return [...main, ...knowledge];
}
