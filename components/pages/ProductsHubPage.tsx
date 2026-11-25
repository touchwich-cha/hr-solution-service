import Image from "next/image";
import Link from "next/link";
import { pageSeo, type Locale } from "@/app/site-data";
import { catalogCopy, catalogGroups, formatPrice, fromPrice, fwProducts, productsInGroup } from "@/app/catalog-data";
import { homeLab, homeServices } from "@/app/home-data";
import { breadcrumbJsonLd, pageUrl } from "@/app/seo";
import { JsonLd } from "@/components/shared/JsonLd";
import { CtaBlock, FastworkBand, RdIntro } from "@/components/rd/Blocks";
import { Lab } from "@/components/home/HomeClient";

/** Listings that exist on Fastwork only (no product page here yet) — shown as outbound cards. */
const fastworkOnly = homeServices.columns
  .flatMap((col) => col.items as readonly ({ slug: string } | { label: { th: string; en: string }; url: string; from: number })[])
  .filter((item): item is { label: { th: string; en: string }; url: string; from: number } => "url" in item);

export function ProductsHubPage({ locale }: { locale: Locale }) {
  const th = locale === "th";
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
    <main>
      <JsonLd data={breadcrumbJsonLd(locale, pageSeo[""].crumb[locale], [{ name: pageSeo.products.crumb[locale], path: "products" }])} />
      <JsonLd data={itemList} />
      <RdIntro
        locale={locale}
        eyebrow={th ? "สินค้า · Products" : "Products"}
        title={{ th: "เลือกงานที่ใช่", en: "Pick the job," }}
        accent={{ th: "แล้วเลือกขนาดที่พอดี", en: "then the right size" }}
        body={catalogCopy.body}
      />

      <nav className="rd-wrap rd-chips" aria-label={th ? "กลุ่มสินค้า" : "Product groups"}>
        {catalogGroups.map((group, i) => (
          <a key={group.id} href={`#${group.id}`} className="rd-pill"><span className="rd-mono rd-acc">{String(i + 1).padStart(2, "0")}</span>{group.title[locale]}</a>
        ))}
      </nav>

      {catalogGroups.map((group, i) => (
        <section key={group.id} id={group.id} className="rd-sec rd-group">
          <div className="rd-wrap">
            <div className="rd-head rd-rv">
              <div>
                <div className="rd-eyebrow rd-mono">{String(i + 1).padStart(2, "0")} / {String(catalogGroups.length).padStart(2, "0")}</div>
                <h2 className="rd-big">{group.title[locale]}</h2>
              </div>
              <p>{group.sub[locale]}</p>
            </div>
            <div className="rd-pgrid">
              {productsInGroup(group.id).map((product) => (
                <Link key={product.slug} href={`/${locale}/products/${product.slug}`} className="rd-pcard rd-rv">
                  <div className="rd-pcard-img">
                    <Image src={product.cover} alt={product.name[locale]} fill sizes="(max-width: 720px) 92vw, (max-width: 1100px) 45vw, 380px" />
                  </div>
                  <div className="rd-pcard-body">
                    <h3>{product.name[locale]}</h3>
                    <p>{product.oneLiner[locale]}</p>
                    <ul aria-label={th ? "แพ็กเกจ" : "Tiers"}>
                      {product.tiers.map((tier) => (
                        <li key={tier.name.en}><span>{tier.name[locale]}</span><b>฿{formatPrice(tier.price)}</b></li>
                      ))}
                    </ul>
                    <span className="rd-pcard-more">
                      <span className="rd-mono">{catalogCopy.from[locale]} ฿{formatPrice(fromPrice(product))}</span>
                      <span className="rd-circ sm" aria-hidden="true">↗</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="rd-sec" style={{ paddingTop: 20 }}>
        <div className="rd-wrap">
          <div className="rd-head rd-rv">
            <div>
              <div className="rd-eyebrow rd-mono">{th ? "สั่งได้บน Fastwork" : "On Fastwork"}</div>
              <h2 className="rd-big">{th ? "งานเล็ก" : "Small jobs,"} <span className="rd-acc">{th ? "เริ่มได้ทันที" : "start today"}</span></h2>
            </div>
          </div>
          <div className="rd-pgrid">
            {fastworkOnly.map((item) => (
              <a key={item.url} href={item.url} target="_blank" rel="noopener noreferrer" className="rd-pcard rd-pcard-text rd-rv">
                <div className="rd-pcard-body">
                  <span className="rd-mono rd-acc">Fastwork ↗</span>
                  <h3>{item.label[locale]}</h3>
                  <span className="rd-pcard-more">
                    <span className="rd-mono">{catalogCopy.from[locale]} ฿{formatPrice(item.from)}</span>
                    <span className="rd-circ sm" aria-hidden="true">↗</span>
                  </span>
                </div>
              </a>
            ))}
          </div>
          <p className="rd-note">{catalogCopy.sample[locale]}</p>
        </div>
      </section>

      <FastworkBand locale={locale} />

      <section className="rd-sec" id="lab">
        <div className="rd-wrap">
          <div className="rd-head rd-rv">
            <div>
              <div className="rd-eyebrow rd-mono">{homeLab.eyebrow[locale]}</div>
              <h2 className="rd-big">{homeLab.title[0][locale]}<br /><span className="rd-acc">{homeLab.title[1][locale]}</span></h2>
            </div>
            <p>{catalogCopy.systemsBody[locale]}</p>
          </div>
          <Lab locale={locale} />
        </div>
      </section>

      <CtaBlock locale={locale} />
    </main>
  );
}
