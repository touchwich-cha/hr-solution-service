import Image from "next/image";
import Link from "next/link";
import { pageSeo, type Locale } from "@/app/site-data";
import { catalogCopy, catalogGroups, fastwork, formatPrice, fromPrice, getFwProduct, type FwProduct } from "@/app/catalog-data";
import { breadcrumbJsonLd, serviceJsonLd } from "@/app/seo";
import { JsonLd } from "@/components/shared/JsonLd";
import { FastworkNote } from "@/components/shared/FastworkNote";
import { CallToAction } from "@/components/shared/CallToAction";

/** One product page: cover, who it is for, the 3 tiers (same as Fastwork), samples, exclusions, related products. */
export function FwProductPage({ locale, product }: { locale: Locale; product: FwProduct }) {
  const th = locale === "th";
  const group = catalogGroups.find((item) => item.id === product.group);
  const related = product.related.map((slug) => getFwProduct(slug)).filter((item): item is FwProduct => Boolean(item));
  return (
    <main className="product-page fwp">
      <JsonLd data={serviceJsonLd(locale, product)} />
      <JsonLd
        data={breadcrumbJsonLd(locale, pageSeo[""].crumb[locale], [
          { name: pageSeo.products.crumb[locale], path: "products" },
          { name: product.name[locale], path: `products/${product.slug}` },
        ])}
      />
      <section className="fwp-hero section-pad">
        <div className="fwp-copy">
          <Link className="product-back" href={`/${locale}/products`}>{catalogCopy.back[locale]}</Link>
          {group && <p className="eyebrow">{group.title[locale]}</p>}
          <h1>{product.name[locale]}</h1>
          <p className="lede">{product.oneLiner[locale]}</p>
          <p className="fwp-who"><b>{catalogCopy.forWho[locale]}:</b> {product.forWho[locale]}</p>
          <p className="fwp-from">
            {catalogCopy.from[locale]} <b>{catalogCopy.baht[locale]}{formatPrice(fromPrice(product))}</b>
          </p>
          <div className="hero-actions">
            <a className="button" href="#tiers">{th ? "ดูแพ็กเกจ" : "See tiers"} ↓</a>
            {(product.fastworkUrl || fastwork.profileUrl) && (
              <a className="button outline" href={product.fastworkUrl || fastwork.profileUrl} target="_blank" rel="noopener noreferrer">{catalogCopy.orderFastwork[locale]} ↗</a>
            )}
            <Link className="button outline" href={`/${locale}/contact#quote`}>{th ? "ขอใบเสนอราคา" : "Request a quote"}</Link>
          </div>
        </div>
        <div className="fwp-cover">
          <Image src={product.cover} alt={product.name[locale]} fill priority sizes="(max-width: 900px) 92vw, 48vw" />
        </div>
      </section>

      <section id="tiers" className="product-section section-pad">
        <div className="product-heading reveal"><h2>{catalogCopy.tiersTitle[locale]}</h2></div>
        <div className="fwp-tiers">
          {product.tiers.map((tier, index) => (
            <article key={tier.name.en} className={`fwp-tier reveal${index === product.popular ? " popular" : ""}`}>
              {index === product.popular && <span className="fwp-badge">{catalogCopy.usual[locale]}</span>}
              <h3>{tier.name[locale]}</h3>
              <p className="fwp-price">{catalogCopy.baht[locale]}{formatPrice(tier.price)}</p>
              <p className="fwp-meta">{tier.days} {catalogCopy.days[locale]} · {tier.revisions} {catalogCopy.revisions[locale]}</p>
              <ul>
                {tier.includesPrevious && <li className="plus">{catalogCopy.plus[locale]}</li>}
                {tier.items.map((line) => <li key={line[0]}>{line[th ? 0 : 1]}</li>)}
              </ul>
              <Link className="button outline" href={`/${locale}/contact#quote`}>{catalogCopy.ask[locale]}</Link>
            </article>
          ))}
        </div>
        <p className="fwp-scope">{catalogCopy.scopeNote[locale]}</p>
        <div className="fwp-info">
          <div><h3>{catalogCopy.excludes[locale]}</h3><p>{product.excludes[locale]}</p></div>
          {product.note && <div><h3>{th ? "ข้อควรทราบ" : "Good to know"}</h3><p>{product.note[locale]}</p></div>}
        </div>
      </section>

      <section className="product-section section-pad">
        <div className="product-heading reveal"><h2>{catalogCopy.samples[locale]}</h2></div>
        <div className="fwp-samples">
          {product.samples.map((src) => (
            <div key={src} className="fwp-sample"><Image src={src} alt={product.name[locale]} fill sizes="(max-width: 720px) 92vw, 30vw" /></div>
          ))}
        </div>
        <p className="pg-note">{catalogCopy.sample[locale]}</p>
      </section>

      <FastworkNote locale={locale} />

      <nav className="product-section section-pad product-other" aria-label={catalogCopy.related[locale]}>
        <h2>{catalogCopy.related[locale]}</h2>
        <div className="fwp-related">
          {related.map((item) => (
            <Link key={item.slug} className="text-link" href={`/${locale}/products/${item.slug}`}>{item.name[locale]} →</Link>
          ))}
          <Link className="text-link" href={`/${locale}/products`}>{catalogCopy.back[locale]}</Link>
        </div>
      </nav>
      <CallToAction locale={locale} />
    </main>
  );
}
