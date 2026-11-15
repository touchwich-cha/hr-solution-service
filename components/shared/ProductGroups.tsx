import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/app/site-data";
import { catalogCopy, catalogGroups } from "@/app/catalog-data";

/** Catalogue of every service, grouped by the job the buyer wants done. */
export function ProductGroups({ locale }: { locale: Locale }) {
  return (
    <section id="catalog" className="pg-section section-pad">
      <div className="product-heading reveal">
        <h2>{catalogCopy.title[locale]}</h2>
        <p>{catalogCopy.body[locale]}</p>
      </div>
      {catalogGroups.map((group) => (
        <div key={group.id} id={group.id} className="pg-group reveal">
          <h3>{group.title[locale]}</h3>
          <p className="pg-sub">{group.sub[locale]}</p>
          <div className="pg-grid">
            {group.items.map((item) => (
              <article key={item.slug} className="pg-card">
                <div className="pg-img">
                  <Image src={item.image} alt={item.name[locale]} fill sizes="(max-width: 720px) 90vw, (max-width: 1100px) 45vw, 30vw" />
                </div>
                <div className="pg-body">
                  <h4>{item.name[locale]}</h4>
                  <p>{item.summary[locale]}</p>
                  <Link className="text-link" href={item.href ? `/${locale}/${item.href}` : `/${locale}/contact#quote`}>
                    {item.href ? catalogCopy.see[locale] : catalogCopy.ask[locale]} →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      ))}
      <p className="pg-note">{catalogCopy.sample[locale]}</p>
    </section>
  );
}
