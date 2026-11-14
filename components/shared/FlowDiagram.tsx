import { productsCopy, type FlowKind, type FlowStep, type Locale, type Product } from "@/app/site-data";
import { ProductIcon } from "@/components/shared/ProductIcon";

const kinds: FlowKind[] = ["person", "system", "data"];

function FlowLegend({ locale }: { locale: Locale }) {
  return (
    <ul className="pflow-legend" aria-label={productsCopy.legendTitle[locale]}>
      {kinds.map((kind) => (
        <li key={kind}>
          <span className={`pflow-swatch kind-${kind}`} />
          {productsCopy.legend[kind][locale]}
        </li>
      ))}
    </ul>
  );
}

function FlowNode({ step, locale, number }: { step: FlowStep; locale: Locale; number?: number }) {
  return (
    <div className={`pflow-node kind-${step.kind}`}>
      {number !== undefined && <span className="pflow-num">{number}</span>}
      <span className="pflow-icon"><ProductIcon name={step.icon} size={22} /></span>
      <span className="pflow-label">{step.label[locale]}</span>
    </div>
  );
}

/** Numbered main flow (left) + side paths (right). Colours: grey = people, purple = system, teal = data. */
export function FlowDiagram({ product, locale }: { product: Product; locale: Locale }) {
  const { flow } = product;
  return (
    <div className="pflow">
      <ol className="pflow-main">
        {flow.main.map((step, index) => (
          <li key={step.label.en}>
            <FlowNode step={step} locale={locale} number={index + 1} />
          </li>
        ))}
      </ol>
      <aside className="pflow-side" aria-label={flow.sideTitle[locale]}>
        <h3>{flow.sideTitle[locale]}</h3>
        {flow.side.map((lane) => (
          <div key={lane.step.label.en} className="pflow-lane">
            <span className="pflow-trigger">{lane.trigger[locale]}</span>
            <svg className="pflow-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
            <FlowNode step={lane.step} locale={locale} />
          </div>
        ))}
        <FlowLegend locale={locale} />
      </aside>
    </div>
  );
}
