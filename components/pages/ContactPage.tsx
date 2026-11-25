import Image from "next/image";
import { contact, pageSeo, type Locale } from "@/app/site-data";
import { fastwork } from "@/app/catalog-data";
import { homeFaq } from "@/app/home-data";
import { breadcrumbJsonLd } from "@/app/seo";
import { JsonLd } from "@/components/shared/JsonLd";
import { QuoteForm } from "@/components/shared/QuoteForm";
import { RdIntro } from "@/components/rd/Blocks";

export function ContactPage({ locale }: { locale: Locale }) {
  const th = locale === "th";
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homeFaq.items.map(([q, a]) => ({
      "@type": "Question",
      name: q[locale],
      acceptedAnswer: { "@type": "Answer", text: a[locale] },
    })),
  };
  return (
    <main>
      <JsonLd data={breadcrumbJsonLd(locale, pageSeo[""].crumb[locale], [{ name: pageSeo.contact.crumb[locale], path: "contact" }])} />
      <JsonLd data={faqJsonLd} />
      <RdIntro
        locale={locale}
        eyebrow={th ? "ติดต่อ · Start a project" : "Start a project"}
        title={{ th: "เล่าโจทย์ของคุณ", en: "Tell us the brief," }}
        accent={{ th: "รับใบเสนอราคาใน 24 ชม.", en: "quote within 24 hours" }}
        body={{
          th: "กรอกฟอร์ม หรือทักทาง LINE / อีเมล / โทรศัพท์ เราจะแนะนำรูปแบบสื่อหรือระบบที่เหมาะกับโจทย์และงบของคุณ",
          en: "Use the form, or reach us on LINE, email or phone — we'll recommend the media or system that fits your brief and budget.",
        }}
      />

      <section className="rd-sec" style={{ paddingTop: 20 }}>
        <div className="rd-wrap rd-contact">
          <div id="quote" className="rd-form-card rd-rv">
            <QuoteForm locale={locale} />
          </div>
          <aside className="rd-contact-side">
            <div className="rd-line-card rd-rv">
              <div>
                <span className="rd-mono rd-acc">LINE</span>
                <h2>{th ? "แชตกับเราทาง LINE" : "Chat with us on LINE"}</h2>
                <p>{th ? "สแกนด้วยแอป LINE ส่งโจทย์และขอใบเสนอราคาได้ในแชตเดียว" : "Scan with the LINE app — send your brief and ask for a quote in one chat."}</p>
              </div>
              <Image src={contact.lineQr} alt={th ? "QR Code สำหรับเพิ่มเพื่อน LINE ของ HR Solution Service" : "LINE QR code to add HR Solution Service"} width={900} height={900} sizes="180px" />
            </div>
            <a href={`mailto:${contact.email}`} className="rd-clink rd-rv">
              <span className="rd-mono rd-acc">Email</span>
              <strong>{contact.email}</strong>
              <small>{th ? "ตอบกลับภายใน 24 ชั่วโมง" : "Replies within 24 hours"}</small>
              <span className="rd-circ sm" aria-hidden="true">↗</span>
            </a>
            <a href={`tel:${contact.phone}`} className="rd-clink rd-rv">
              <span className="rd-mono rd-acc">{th ? "โทร" : "Phone"}</span>
              <strong>{contact.phoneDisplay}</strong>
              <small>{contact.hours[locale]}</small>
              <span className="rd-circ sm" aria-hidden="true">↗</span>
            </a>
            <a href={fastwork.profileUrl} target="_blank" rel="noopener noreferrer" className="rd-clink rd-rv">
              <span className="rd-mono rd-acc">Fastwork</span>
              <strong>@hrsolutionservice</strong>
              <small>{th ? "จ้างผ่านระบบถือเงินกลางของ Fastwork" : "Hire through Fastwork's escrow"}</small>
              <span className="rd-circ sm" aria-hidden="true">↗</span>
            </a>
          </aside>
        </div>
      </section>

      <section className="rd-sec" style={{ paddingTop: 20 }}>
        <div className="rd-wrap rd-faq">
          <div className="rd-rv">
            <div className="rd-eyebrow rd-mono">{homeFaq.eyebrow[locale]}</div>
            <h2 className="rd-big">{homeFaq.title[0][locale]}<br /><span className="rd-acc">{homeFaq.title[1][locale]}</span></h2>
          </div>
          <div className="rd-rv">
            {homeFaq.items.map(([q, a]) => (
              <details key={q.en}>
                <summary>{q[locale]}<i aria-hidden="true">+</i></summary>
                <p>{a[locale]}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
