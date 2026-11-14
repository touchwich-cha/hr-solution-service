import { pageSeo, products, productsCopy, type Locale } from "@/app/site-data";
import { breadcrumbJsonLd, pageUrl } from "@/app/seo";
import { PageIntro } from "@/components/shared/PageIntro";
import { ProductCards } from "@/components/shared/ProductCards";
import { SystemsSection } from "@/components/shared/SystemsSection";
import { CallToAction } from "@/components/shared/CallToAction";
import { JsonLd } from "@/components/shared/JsonLd";

export function ProductsHubPage({ locale }: { locale: Locale }) {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: pageSeo.products.title[locale],
    itemListElement: products.map((product, index) => ({
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
      <PageIntro
        eyebrow={productsCopy.eyebrow[locale]}
        title={productsCopy.title[locale]}
        body={productsCopy.body[locale]}
      />
      <section className="product-section section-pad">
        <ProductCards locale={locale} />
      </section>
      <SystemsSection locale={locale} />
      <CallToAction locale={locale} />
    </main>
  );
}
