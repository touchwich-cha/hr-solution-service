import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/app/site-data";
import { catalogCopy, catalogGroups, formatPrice, fromPrice, productsInGroup } from "@/app/catalog-data";

/** The 9 products grouped by the job the buyer wants done. Same cards on the home page and the hub. */
export function ProductGroups({ locale }: { locale: Locale }) {
  return (
    <div className="pg-wrap">
      <nav className="pg-chips" aria-label={locale === "th" ? "กลุ่มสินค้า" : "Product groups"}>
        {catalogGroups.map((group) => (
          <a key={group.id} href={`#${group.id}`} className="pg-chip">{group.title[locale]}</a>
        ))}
      </nav>
      {catalogGroups.map((group) => (
        <section key={group.id} id={group.id} className="pg-group reveal">
          <h3>{group.title[locale]}</h3>
          <p className="pg-sub">{group.sub[locale]}</p>
          <div className="pg-grid">
            {productsInGroup(group.id).map((product) => (
              <Link key={product.slug} href={`/${locale}/products/${product.slug}`} className="pg-card">
                <div className="pg-img">
                  <Image src={product.cover} alt={product.name[locale]} fill sizes="(max-width: 720px) 90vw, (max-width: 1100px) 45vw, 30vw" />
                </div>
                <div className="pg-thumbs">
                  {product.samples.map((src) => (
                    <div key={src} className="pg-thumb"><Image src={src} alt="" fill sizes="120px" /></div>
                  ))}
                </div>
                <div className="pg-body">
                  <h4>{product.name[locale]}</h4>
                  <p>{product.oneLiner[locale]}</p>
                  <ul className="pg-tiers" aria-label={locale === "th" ? "แพ็กเกจ" : "Tiers"}>
                    {product.tiers.map((tier) => (
                      <li key={tier.name.en}><span>{tier.name[locale]}</span><b>{catalogCopy.baht[locale]}{formatPrice(tier.price)}</b></li>
                    ))}
                  </ul>
                  <span className="pg-more">
                    {catalogCopy.from[locale]} {catalogCopy.baht[locale]}{formatPrice(fromPrice(product))} · {catalogCopy.see[locale]} →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
      <p className="pg-note">{catalogCopy.sample[locale]}</p>
    </div>
  );
}
