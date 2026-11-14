import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Shell } from "@/components/layout/Shell";
import { HomePage } from "@/components/pages/HomePage";
import { ProductsHubPage } from "@/components/pages/ProductsHubPage";
import { ProductPage } from "@/components/pages/ProductPage";
import { TrainingMediaPage } from "@/components/pages/TrainingMediaPage";
import { AboutPage } from "@/components/pages/AboutPage";
import { ContactPage } from "@/components/pages/ContactPage";
import { brand, getProduct, pageSeo, siteUrl, type Locale } from "@/app/site-data";

// Top-level pages. Product pages live under /products/{slug}. Old URLs are redirected in next.config.ts.
const pages = ["", "products", "training-media", "about", "contact"] as const;
type PageKey = (typeof pages)[number];

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug?: string[] }> }): Promise<Metadata> {
  const { locale, slug = [] } = await params;
  const language: Locale = locale === "en" ? "en" : "th";
  const page = slug.join("/");
  const product = slug[0] === "products" && slug.length === 2 ? getProduct(slug[1]) : undefined;
  const seo = product ? product.seo : pageSeo[page as PageKey];
  const path = page ? `/${page}` : "";
  const title = seo?.title[language] ?? brand.name;
  const description = seo?.description[language];
  const url = `${siteUrl}/${language}${path}`;

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
  const product = slug[0] === "products" && slug.length === 2 ? getProduct(slug[1]) : undefined;
  const isKnownPage = slug.length <= 1 && pages.includes(page as PageKey);
  if (!isKnownPage && !product) notFound();

  const content =
    product ? <ProductPage locale={locale} product={product} /> :
    page === "products" ? <ProductsHubPage locale={locale} /> :
    page === "training-media" ? <TrainingMediaPage locale={locale} /> :
    page === "about" ? <AboutPage locale={locale} /> :
    page === "contact" ? <ContactPage locale={locale} /> :
    <HomePage locale={locale} />;

  return <Shell locale={locale} page={page}>{content}</Shell>;
}
