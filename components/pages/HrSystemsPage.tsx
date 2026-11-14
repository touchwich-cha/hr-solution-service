import Image from "next/image";
import Link from "next/link";
import { caseStudies, type Locale } from "@/app/site-data";
import { CallToAction } from "@/components/shared/CallToAction";
import { AdditionalTools } from "@/components/shared/AdditionalTools";
import { SystemCard, SystemIcon } from "@/components/shared/SystemCard";

export function HrSystemsPage({ locale }: { locale: Locale }) {
  const th = locale === "th";
  const heroImage = caseStudies.find((study) => study.images?.[0]);
  const ticks = th
    ? [
        "ใช้งานจริงในองค์กร ไม่ใช่ demo",
        "สร้างบน Google Workspace ที่ทีมมีอยู่แล้ว",
        "ปรับตามขั้นตอนของแต่ละองค์กรได้",
        "ไม่ระบุชื่อลูกค้า เพื่อความเป็นส่วนตัว",
      ]
    : [
        "Running in real workplaces — not a demo",
        "Built on the Google Workspace your team already has",
        "Adjusted to each organisation's process",
        "Client names withheld for privacy",
      ];

  return (
    <main className="sys-page">
      {/* ─── HERO: copy + checklist on the left, diagram on the right ─── */}
      <section className="sys-hero section-pad">
        <div className="sys-hero-copy">
          <p className="eyebrow">HR Systems / Case studies</p>
          <h1>{th ? "ระบบงาน HR ที่สร้างและใช้งานจริง" : "HR systems built and running for real teams"}</h1>
          <p className="lede">
            {th
              ? "เปลี่ยนงานเอกสารและงานซ้ำๆ ของ HR ให้ระบบทำแทน แล้วให้ทีมไปทำงานที่ต้องใช้คน"
              : "Repetitive HR paperwork handled by the system, so the team can do the work that needs people."}
          </p>
          <ul className="sys-hero-ticks">
            {ticks.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <Link className="button" href={`/${locale}/contact#quote`}>
            {th ? "ปรึกษาระบบที่เหมาะกับคุณ" : "Talk about the right system for you"}
          </Link>
        </div>
        <div className="sys-hero-visual">
          {heroImage?.images?.[0] && (
            <Image
              src={`/systems/${heroImage.slug}/${heroImage.images[0]}`}
              alt={th ? "ตัวอย่างแผนภาพการทำงานของระบบ" : "Example system workflow diagram"}
              fill
              sizes="(max-width: 980px) 90vw, 46vw"
              priority
            />
          )}
          <span className="sys-hero-chip">
            <b>{caseStudies.length}</b> {th ? "ระบบใช้งานจริง" : "systems in real use"}
          </span>
        </div>
      </section>

      {/* ─── ICON ROW: jump to a system ─── */}
      <nav className="sys-icons section-pad" aria-label={th ? "ไปยังระบบ" : "Jump to a system"}>
        {caseStudies.map((study) => (
          <a key={study.slug} href={`#${study.slug}`} className="sys-icon-link">
            <span className="sys-icon-circle"><SystemIcon name={study.icon} size={26} /></span>
            <span>{study.short[locale]}</span>
          </a>
        ))}
      </nav>

      {/* ─── CARD GRID ─── */}
      <section className="section-pad sys-grid-section">
        <div className="product-heading reveal">
          <h2>{th ? `${caseStudies.length} ระบบที่ใช้งานจริง` : `${caseStudies.length} systems in real use`}</h2>
        </div>
        <div className="sys-grid">
          {caseStudies.map((study, index) => (
            <SystemCard key={study.slug} study={study} locale={locale} index={index} />
          ))}
        </div>
      </section>

      <AdditionalTools locale={locale} />
      <CallToAction locale={locale} />
    </main>
  );
}
