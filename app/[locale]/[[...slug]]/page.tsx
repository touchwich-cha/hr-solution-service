import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Shell } from "@/components/layout/Shell";
import { HomePage } from "@/components/pages/HomePage";
import { ProductsHubPage } from "@/components/pages/ProductsHubPage";
import { FwProductPage } from "@/components/pages/FwProductPage";
import { TrainingMediaPage } from "@/components/pages/TrainingMediaPage";
import { AboutPage } from "@/components/pages/AboutPage";
import { ContactPage } from "@/components/pages/ContactPage";
import { brand, pageSeo, siteUrl, type Locale } from "@/app/site-data";
import { getFwProduct } from "@/app/catalog-data";
import { getArticle } from "@/app/articles-data";
import { ArticlesPage } from "@/components/pages/ArticlesPage";
import { ArticlePage } from "@/components/pages/ArticlePage";

// Top-level pages. Product pages live under /products/{slug}. Old URLs are redirected in next.config.ts.
const pages = ["", "products", "training-media", "about", "contact", "articles"] as const;
type PageKey = (typeof pages)[number];

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug?: string[] }> }): Promise<Metadata> {
  const { locale, slug = [] } = await params;
  const language: Locale = locale === "en" ? "en" : "th";
  const page = slug.join("/");
  const product = slug[0] === "products" && slug.length === 2 ? getFwProduct(slug[1]) : undefined;
  const article = slug[0] === "articles" && slug.length === 2 ? getArticle(slug[1]) : undefined;
  const seo = product ? product.seo : pageSeo[page as PageKey];
  const path = page ? `/${page}` : "";
  const title = article ? article.title : seo?.title[language] ?? brand.name;
  const description = article ? article.description : seo?.description[language];
  // Articles are written in Thai: the /en copies point to the Thai page so search engines index one version.
  const isArticlePage = page === "articles" || Boolean(article);
  const url = `${siteUrl}/${isArticlePage ? "th" : language}${path}`;

  if (isArticlePage) {
    return {
      title,
      description,
      alternates: { canonical: url },
      openGraph: {
        title,
        description,
        url,
        siteName: brand.name,
        locale: "th_TH",
        type: article ? "article" : "website",
        ...(article ? { publishedTime: article.date, modifiedTime: article.updated ?? article.date, authors: [brand.name] } : {}),
        images: [{ url: `${siteUrl}/og.jpg`, width: 1200, height: 630, alt: `${brand.name} — ${title}` }],
      },
      twitter: { card: "summary_large_image", title, description, images: [`${siteUrl}/og.jpg`] },
    };
  }

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        th: `${siteUrl}/th${path}`,
        en: `${siteUrl}/en${path}`,
        "x-default": `${siteUrl}/th${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: brand.name,
      locale: language === "th" ? "th_TH" : "en_US",
      alternateLocale: language === "th" ? "en_US" : "th_TH",
      type: "website",
      images: [{ url: `${siteUrl}/og.jpg`, width: 1200, height: 630, alt: `${brand.name} — ${title}` }],
    },
    twitter: { card: "summary_large_image", title, description, images: [`${siteUrl}/og.jpg`] },
  };
}

export default async function LocalizedPage({ params }: { params: Promise<{ locale: string; slug?: string[] }> }) {
  const { locale: rawLocale, slug = [] } = await params;
  if (rawLocale !== "th" && rawLocale !== "en") notFound();
  const locale = rawLocale as Locale;
  const page = slug.join("/");
  const product = slug[0] === "products" && slug.length === 2 ? getFwProduct(slug[1]) : undefined;
  const article = slug[0] === "articles" && slug.length === 2 ? getArticle(slug[1]) : undefined;
  const isKnownPage = slug.length <= 1 && pages.includes(page as PageKey);
  if (!isKnownPage && !product && !article) notFound();

  const content =
    product ? <FwProductPage locale={locale} product={product} /> :
    article ? <ArticlePage locale={locale} article={article} /> :
    page === "articles" ? <ArticlesPage locale={locale} /> :
    page === "products" ? <ProductsHubPage locale={locale} /> :
    page === "training-media" ? <TrainingMediaPage locale={locale} /> :
    page === "about" ? <AboutPage locale={locale} /> :
    page === "contact" ? <ContactPage locale={locale} /> :
    <HomePage locale={locale} />;

  return <Shell locale={locale} page={page}>{content}</Shell>;
}
