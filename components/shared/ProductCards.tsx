import Link from "next/link";
import { products, productsCopy, type Locale } from "@/app/site-data";
import { ProductIcon } from "@/components/shared/ProductIcon";

/** Two product cards, used on the Products hub and as a teaser on the home page. */
export function ProductCards({ locale }: { locale: Locale }) {
  return (
    <div className="product-cards">
      {products.map((product, index) => (
        <Link
          key={product.slug}
          href={`/${locale}/products/${product.slug}`}
          className={`product-card reveal tone-${index === 0 ? "purple" : "teal"}`}
          style={{ "--reveal-delay": `${index * 0.1}s` } as React.CSSProperties}
        >
          <span className="product-card-icon"><ProductIcon name={product.icon} size={30} /></span>
          <h3>{product.name[locale]}</h3>
          <p>{product.oneLiner[locale]}</p>
          <span className="product-card-more">{productsCopy.more[locale]} <span aria-hidden="true">→</span></span>
        </Link>
      ))}
    </div>
  );
}
