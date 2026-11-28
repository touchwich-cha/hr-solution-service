import { brand, contact, siteUrl, type Locale } from "@/app/site-data";
import { catalogCopy, fromPrice, type FwProduct } from "@/app/catalog-data";

/** Absolute URL of a page in a locale ("" = home). */
export function pageUrl(locale: Locale, path = "") {
  return `${siteUrl}/${locale}${path ? `/${path}` : ""}`;
}

/** BreadcrumbList for Google. `trail` runs from the first level after Home to the current page. */
export function breadcrumbJsonLd(locale: Locale, homeLabel: string, trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: homeLabel, path: "" }, ...trail].map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: pageUrl(locale, item.path),
    })),
  };
}

/** A product page is a Service with one Offer per tier (the same prices as the Fastwork listing). */
export function serviceJsonLd(locale: Locale, product: FwProduct) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: product.name[locale],
    description: product.seo.description[locale],
    url: pageUrl(locale, `products/${product.slug}`),
    inLanguage: locale,
    areaServed: "TH",
    serviceType: catalogCopy.eyebrow[locale],
    provider: { "@type": "Organization", name: brand.name, url: siteUrl, email: contact.email },
    offers: product.quote
      ? {
          "@type": "Offer",
          priceCurrency: "THB",
          price: product.quote.from,
          priceSpecification: { "@type": "UnitPriceSpecification", price: product.quote.from, priceCurrency: "THB", unitCode: "ANN" },
          description: catalogCopy.quotePrice[locale],
        }
      : {
          "@type": "AggregateOffer",
          priceCurrency: "THB",
          lowPrice: fromPrice(product),
          highPrice: Math.max(...product.tiers.map((tier) => tier.price)),
          offerCount: product.tiers.length,
        },
  };
}
