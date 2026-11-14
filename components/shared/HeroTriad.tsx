import type { Locale, Product } from "@/app/site-data";
import { ProductIcon } from "@/components/shared/ProductIcon";
import { FlowLegend } from "@/components/shared/FlowDiagram";

/** The 3-node concept diagram from the catalogue: who → the assistant → data / next person. */
export function HeroTriad({ product, locale }: { product: Product; locale: Locale }) {
  const { nodes, chips } = product.triad;
  return (
    <div className="triad">
      <ol className="triad-row">
        {nodes.map((node, index) => (
          <li key={node.label.en}>
            <span className={`triad-circle kind-${node.kind}`}><ProductIcon name={node.icon} size={34} /></span>
            <span className="triad-label">{node.label[locale]}</span>
            {index < nodes.length - 1 && <span className="triad-arrow" aria-hidden="true">→</span>}
          </li>
        ))}
      </ol>
      {chips && (
        <div className="quick-replies" aria-label={locale === "th" ? "ปุ่มลัด" : "Quick buttons"}>
          {chips.map((chip) => <span key={chip.en} className="quick-reply">{chip[locale]}</span>)}
        </div>
      )}
      <FlowLegend locale={locale} />
    </div>
  );
}
