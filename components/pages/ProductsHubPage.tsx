import { productsCopy, type Locale } from "@/app/site-data";
import { PageIntro } from "@/components/shared/PageIntro";
import { ProductCards } from "@/components/shared/ProductCards";
import { CallToAction } from "@/components/shared/CallToAction";

export function ProductsHubPage({ locale }: { locale: Locale }) {
  return (
    <main className="product-page">
      <PageIntro
        eyebrow={productsCopy.eyebrow[locale]}
        title={productsCopy.title[locale]}
        body={productsCopy.body[locale]}
      />
      <section className="product-section section-pad">
        <ProductCards locale={locale} />
      </section>
      <CallToAction locale={locale} />
    </main>
  );
}
