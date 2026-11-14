import Image from "next/image";
import Link from "next/link";
import { getProduct, productsCopy, type CaseStudy, type Locale } from "@/app/site-data";

const icons: Record<CaseStudy["icon"], string> = {
  inbox:
    "M22 12h-6l-2 3h-4l-2-3H2M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z",
  rocket:
    "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09zM12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2zM9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5",
  chart: "M3 3v18h18M18 17V9M13 17V5M8 17v-3",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  bell: "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0",
  chat: "M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z",
};

export function SystemIcon({ name, size = 24 }: { name: CaseStudy["icon"]; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d={icons[name]} />
    </svg>
  );
}

const tones = ["teal", "mint", "amber"] as const;

const labels = {
  more: { th: "ดูรายละเอียด", en: "See details" },
  pain: { th: "โจทย์", en: "The problem" },
  solution: { th: "สิ่งที่ระบบทำ", en: "What the system does" },
  outcome: { th: "ผลลัพธ์", en: "Outcome" },
  flow: { th: "ขั้นตอนการทำงาน", en: "How it flows" },
} as const;

/** Compact system card (header, 3 ticks, tags). Full text lives in the "See details" panel. */
export function SystemCard({ study, locale, index }: { study: CaseStudy; locale: Locale; index: number }) {
  const tone = tones[index % tones.length];
  const live = study.status.en === "In production";
  const photo = study.images?.[0];
  return (
    <article id={study.slug} className={`sys-card tone-${tone} reveal`} style={{ "--reveal-delay": `${(index % 3) * 0.08}s` } as React.CSSProperties}>
      <div className="sys-head">
        {photo ? (
          <Image
            src={`/systems/${study.slug}/${photo}`}
            alt={locale === "th" ? `แผนภาพระบบ ${study.title.th}` : `${study.title.en} system diagram`}
            fill
            sizes="(max-width: 720px) 90vw, (max-width: 1100px) 45vw, 30vw"
          />
        ) : (
          <span className="sys-head-icon"><SystemIcon name={study.icon} size={56} /></span>
        )}
        <span className={`sys-status${live ? " live" : ""}`}>{study.status[locale]}</span>
      </div>
      <div className="sys-body">
        <p className="sys-sector">{study.sector[locale]}</p>
        <h3>{study.title[locale]}</h3>
        <ul className="sys-ticks">
          {study.solution[locale].slice(0, 3).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="sys-tags">
          {study.stack.slice(0, 3).map((tech) => (
            <span key={tech} className="stack-badge">{tech}</span>
          ))}
        </div>
        {study.productSlug && (
          <Link className="text-link sys-product-link" href={`/${locale}/products/${study.productSlug}`}>
            {productsCopy.seeProduct[locale]}: {getProduct(study.productSlug)?.name[locale]} →
          </Link>
        )}
        <details className="sys-more">
          <summary>{labels.more[locale]}</summary>
          <div className="sys-more-body">
            <p><strong>{labels.pain[locale]}</strong>{study.pain[locale]}</p>
            {study.solution[locale].length > 3 && (
              <div>
                <strong>{labels.solution[locale]}</strong>
                <ul>
                  {study.solution[locale].map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            )}
            <p><strong>{labels.outcome[locale]}</strong>{study.outcome[locale]}</p>
            <div className="flow-strip" aria-label={labels.flow[locale]}>
              {study.flow[locale].map((step) => <span key={step} className="flow-chip">{step}</span>)}
            </div>
            {study.metric && <span className="metric-chip">{study.metric[locale]}</span>}
          </div>
        </details>
      </div>
    </article>
  );
}
