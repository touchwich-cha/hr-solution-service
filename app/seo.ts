import { brand, contact, productsCopy, siteUrl, type Locale, type Product } from "@/app/site-data";

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

/** A product page is described as a Service (no price is stated anywhere on the site). */
export function serviceJsonLd(locale: Locale, product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: product.name[locale],
    description: product.seo.description[locale],
    url: pageUrl(locale, `products/${product.slug}`),
    inLanguage: locale,
    areaServed: "TH",
    serviceType: productsCopy.eyebrow[locale],
    provider: { "@type": "Organization", name: brand.name, url: siteUrl, email: contact.email },
  };
}
