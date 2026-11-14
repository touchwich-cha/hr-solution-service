import { caseStudies, productsCopy, type Locale } from "@/app/site-data";
import { AdditionalTools } from "@/components/shared/AdditionalTools";
import { SystemCard, SystemIcon } from "@/components/shared/SystemCard";

/** "Systems in real use" — the six custom HR systems, shown on the Automation page (#systems). */
export function SystemsSection({ locale }: { locale: Locale }) {
  const th = locale === "th";
  return (
    <section id="systems" className="sys-section">
      <div className="section-pad sys-grid-section">
        <div className="product-heading reveal">
          <h2>{productsCopy.systemsTitle[locale]}</h2>
          <p>{productsCopy.systemsBody[locale]}</p>
        </div>
        <nav className="sys-icons" aria-label={th ? "ไปยังระบบ" : "Jump to a system"}>
          {caseStudies.map((study) => (
            <a key={study.slug} href={`#${study.slug}`} className="sys-icon-link">
              <span className="sys-icon-circle"><SystemIcon name={study.icon} size={26} /></span>
              <span>{study.short[locale]}</span>
            </a>
          ))}
        </nav>
        <div className="sys-grid">
          {caseStudies.map((study, index) => (
            <SystemCard key={study.slug} study={study} locale={locale} index={index} />
          ))}
        </div>
      </div>
      <AdditionalTools locale={locale} />
    </section>
  );
}
