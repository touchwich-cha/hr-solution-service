import Image from "next/image";
import { additionalTools, type Locale } from "@/app/site-data";

export function AdditionalTools({ locale }: { locale: Locale }) {
  return (
    <section className="additional-tools section-pad">
      <div className="section-heading reveal">
        <p className="eyebrow">{locale === "th" ? "นอกเหนือจาก 6 ระบบหลัก" : "Beyond the 6 core systems"}</p>
        <h2>{locale === "th" ? "เครื่องมือ HR เพิ่มเติมที่เราพัฒนาไว้" : "Additional HR tooling we've built"}</h2>
        <p>
          {locale === "th"
            ? "เครื่องมือเฉพาะทางด้านการสรรหาและการเรียนรู้ ที่ไม่ได้นับรวมในสถิติ 6 ระบบด้านบน แต่ใช้งานจริงเช่นกัน"
            : "Specialized recruiting and learning tools — not counted in the 6 systems above, but just as real."}
        </p>
      </div>
      <div className="tool-grid">
        {additionalTools.map((tool, i) => (
          <article key={tool.slug} className="tool-card reveal" style={{ "--reveal-delay": `${i * 0.1}s` } as React.CSSProperties}>
            <div className="tool-gallery">
              {tool.images.map((image) => (
                <div key={image} className="tool-gallery-frame">
                  <Image
                    src={`/systems/${tool.slug}/${image}`}
                    alt={tool.title[locale]}
                    fill
                    sizes="(max-width: 720px) 90vw, 45vw"
                  />
                </div>
              ))}
            </div>
            <h3>{tool.title[locale]}</h3>
            <p>{tool.description[locale]}</p>
            <div className="tool-stack">
              {tool.stack.map((tech) => (
                <span key={tech} className="stack-badge">{tech}</span>
              ))}
            </div>
            {tool.link && (
              <a className="text-link tool-link" href={tool.link.href} target="_blank" rel="noopener noreferrer">
                {tool.link.label[locale]} ↗
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
