import Link from "next/link";
import { products, productsCopy, type Locale } from "@/app/site-data";
import { ProductIcon } from "@/components/shared/ProductIcon";

/** Product cards with the catalogue facts (user / problem / result). Used on the hub and the home page. */
export function ProductCards({ locale }: { locale: Locale }) {
  const labels = locale === "th"
    ? { user: "ผู้ใช้หลัก", problem: "ปัญหาที่แก้", result: "ผลลัพธ์" }
    : { user: "Main user", problem: "Problem", result: "Result" };
  return (
    <div className="product-cards">
      {products.map((product, index) => (
        <Link
          key={product.slug}
          href={`/${locale}/products/${product.slug}`}
          className={`product-card reveal tone-${index % 2 === 0 ? "purple" : "teal"}`}
          style={{ "--reveal-delay": `${(index % 3) * 0.08}s` } as React.CSSProperties}
        >
          <span className="product-card-icon"><ProductIcon name={product.icon} size={30} /></span>
          <h3>{product.name[locale]}</h3>
          <p>{product.oneLiner[locale]}</p>
          <dl className="product-card-facts">
            {(["user", "problem", "result"] as const).map((key) => (
              <div key={key}>
                <dt>{labels[key]}</dt>
                <dd>{product.facts[key][locale]}</dd>
              </div>
            ))}
          </dl>
          <span className="product-card-more">{productsCopy.more[locale]} <span aria-hidden="true">→</span></span>
        </Link>
      ))}
    </div>
  );
}
