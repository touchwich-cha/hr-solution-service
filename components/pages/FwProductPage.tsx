import Image from "next/image";
import Link from "next/link";
import { pageSeo, type Locale } from "@/app/site-data";
import { catalogCopy, catalogGroups, fastwork, formatPrice, fromPrice, getFwProduct, pricePer, type FwProduct } from "@/app/catalog-data";
import { breadcrumbJsonLd, serviceJsonLd } from "@/app/seo";
import { JsonLd } from "@/components/shared/JsonLd";
import { CtaBlock, FastworkBand } from "@/components/rd/Blocks";

/** One product page: cover, who it is for, the 3 tiers (same as Fastwork), samples, exclusions, related products. */
export function FwProductPage({ locale, product }: { locale: Locale; product: FwProduct }) {
  const th = locale === "th";
  const group = catalogGroups.find((item) => item.id === product.group);
  const related = product.related.map((slug) => getFwProduct(slug)).filter((item): item is FwProduct => Boolean(item));
  // quote-based products are not sold on Fastwork: no order button, no Fastwork band
  const orderUrl = product.quote ? product.fastworkUrl : product.fastworkUrl || fastwork.profileUrl;
  return (
    <main>
      <JsonLd data={serviceJsonLd(locale, product)} />
      <JsonLd
        data={breadcrumbJsonLd(locale, pageSeo[""].crumb[locale], [
          { name: pageSeo.products.crumb[locale], path: "products" },
          { name: product.name[locale], path: `products/${product.slug}` },
        ])}
      />
      <header className="rd-intro rd-intro-split">
        <div className="rd-wrap rd-pd-hero">
          <div>
            <Link className="rd-back rd-mono" href={`/${locale}/products`}>{catalogCopy.back[locale]}</Link>
            {group && <div className="rd-eyebrow rd-mono">{group.title[locale]}</div>}
            <h1 className="rd-pd-title">{product.name[locale]}</h1>
            <p className="rd-intro-body">{product.oneLiner[locale]}</p>
            <p className="rd-pd-who"><b className="rd-mono rd-acc">{catalogCopy.forWho[locale]}</b>{product.forWho[locale]}</p>
            <div className="rd-pd-from">
              <span className="rd-mono">{catalogCopy.from[locale]}</span>
              <strong>฿{formatPrice(fromPrice(product))}{product.quote && <small>{pricePer(product, locale)}</small>}</strong>
            </div>
            {product.quote && <p className="rd-pd-quote rd-mono">{catalogCopy.quotePrice[locale]}</p>}
            <div className="rd-ctas">
              {product.demoUrl && <a className="rd-btn rd-btn-acc" href={product.demoUrl} target="_blank" rel="noopener">{catalogCopy.tryDemo[locale]} ↗</a>}
              <a className={`rd-btn ${product.demoUrl ? "rd-btn-line" : "rd-btn-acc"}`} href="#tiers">{th ? "ดูแพ็กเกจ" : "See tiers"} ↓</a>
              {orderUrl && <a className="rd-btn rd-btn-line" href={orderUrl} target="_blank" rel="noopener noreferrer">{catalogCopy.orderFastwork[locale]} ↗</a>}
              <Link className="rd-btn rd-btn-line" href={`/${locale}/contact#quote`}>{th ? "ขอใบเสนอราคา" : "Request a quote"}</Link>
            </div>
          </div>
          <div className="rd-pd-cover">
            <Image src={product.cover} alt={product.name[locale]} fill priority sizes="(max-width: 1000px) 92vw, 560px" />
          </div>
        </div>
      </header>

      <section id="tiers" className="rd-sec">
        <div className="rd-wrap">
          <div className="rd-head rd-rv">
            <div>
              <div className="rd-eyebrow rd-mono">{th ? "แพ็กเกจ" : "Tiers"}</div>
              <h2 className="rd-big">{(product.quote ? catalogCopy.tiersTitleQuote : catalogCopy.tiersTitle)[locale]}</h2>
            </div>
          </div>
          <div className="rd-tiers">
            {product.tiers.map((tier, index) => (
              <article key={tier.name.en} className={`rd-tier rd-rv${index === product.popular ? " pop" : ""}`}>
                <div className="rd-tier-top">
                  <span className="rd-mono">{["Basic", "Standard", "Premium"][index]}</span>
                  {index === product.popular && <span className="rd-tier-badge rd-mono">{catalogCopy.usual[locale]}</span>}
                </div>
                <h3>{tier.name[locale]}</h3>
                {product.quote ? (
                  <p className="rd-tier-meta rd-mono">{catalogCopy.quotePrice[locale]}</p>
                ) : (
                  <>
                    <p className="rd-tier-price">฿{formatPrice(tier.price)}</p>
                    <p className="rd-tier-meta rd-mono">{tier.days} {catalogCopy.days[locale]} · {tier.revisions} {catalogCopy.revisions[locale]}</p>
                  </>
                )}
                <ul>
                  {tier.includesPrevious && <li className="plus">{catalogCopy.plus[locale]}</li>}
                  {tier.items.map((line) => <li key={line[0]}>{line[th ? 0 : 1]}</li>)}
                </ul>
                <Link className={`rd-btn ${index === product.popular ? "rd-btn-acc" : "rd-btn-line"}`} href={`/${locale}/contact#quote`}>{catalogCopy.ask[locale]}</Link>
              </article>
            ))}
          </div>
          {!product.quote && <p className="rd-note">{catalogCopy.scopeNote[locale]}</p>}
          <div className="rd-pd-info rd-rv">
            <div><h3 className="rd-mono rd-acc">{catalogCopy.excludes[locale]}</h3><p>{product.excludes[locale]}</p></div>
            {product.note && <div><h3 className="rd-mono rd-acc">{th ? "ข้อควรทราบ" : "Good to know"}</h3><p>{product.note[locale]}</p></div>}
          </div>
        </div>
      </section>

      <section className="rd-sec" style={{ paddingTop: 20 }}>
        <div className="rd-wrap">
          <div className="rd-head rd-rv">
            <div>
              <div className="rd-eyebrow rd-mono">{th ? "ตัวอย่าง" : "Samples"}</div>
              <h2 className="rd-big">{catalogCopy.samples[locale]}</h2>
            </div>
            <p>{catalogCopy.sample[locale]}</p>
          </div>
          <div className="rd-samples">
            {product.samples.map((src) => (
              <div key={src} className="rd-sample rd-rv"><Image src={src} alt={product.name[locale]} fill sizes="(max-width: 720px) 92vw, 400px" /></div>
            ))}
          </div>
        </div>
      </section>

      {!product.quote && <FastworkBand locale={locale} />}

      <nav className="rd-sec" aria-label={catalogCopy.related[locale]}>
        <div className="rd-wrap">
          <div className="rd-eyebrow rd-mono">{catalogCopy.related[locale]}</div>
          <div className="rd-related">
            {related.map((item) => (
              <Link key={item.slug} href={`/${locale}/products/${item.slug}`}>
                <span>{item.name[locale]}</span>
                <small className="rd-mono">{catalogCopy.from[locale]} ฿{formatPrice(fromPrice(item))}{pricePer(item, locale)}</small>
                <span className="rd-circ sm" aria-hidden="true">↗</span>
              </Link>
            ))}
            <Link href={`/${locale}/products`}><span>{catalogCopy.back[locale].replace(/^←\s*/, "")}</span><span className="rd-circ sm" aria-hidden="true">←</span></Link>
          </div>
        </div>
      </nav>

      <CtaBlock locale={locale} />
    </main>
  );
}
