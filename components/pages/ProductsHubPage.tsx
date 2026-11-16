import { pageSeo, type Locale } from "@/app/site-data";
import { catalogCopy, fwProducts } from "@/app/catalog-data";
import { breadcrumbJsonLd, pageUrl } from "@/app/seo";
import { PageIntro } from "@/components/shared/PageIntro";
import { ProductGroups } from "@/components/shared/ProductGroups";
import { FastworkNote } from "@/components/shared/FastworkNote";
import { SystemsSection } from "@/components/shared/SystemsSection";
import { CallToAction } from "@/components/shared/CallToAction";
import { JsonLd } from "@/components/shared/JsonLd";

export function ProductsHubPage({ locale }: { locale: Locale }) {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: pageSeo.products.title[locale],
    itemListElement: fwProducts.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: product.name[locale],
      url: pageUrl(locale, `products/${product.slug}`),
    })),
  };
  return (
    <main className="product-page">
      <JsonLd data={breadcrumbJsonLd(locale, pageSeo[""].crumb[locale], [{ name: pageSeo.products.crumb[locale], path: "products" }])} />
      <JsonLd data={itemList} />
      <PageIntro eyebrow={catalogCopy.eyebrow[locale]} title={catalogCopy.title[locale]} body={catalogCopy.body[locale]} />
      <section className="product-section section-pad">
        <ProductGroups locale={locale} />
      </section>
      <FastworkNote locale={locale} />
      <SystemsSection locale={locale} />
      <CallToAction locale={locale} />
    </main>
  );
}
