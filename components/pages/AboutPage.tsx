import { brand, pageSeo, type Locale } from "@/app/site-data";
import { breadcrumbJsonLd } from "@/app/seo";
import { JsonLd } from "@/components/shared/JsonLd";
import { ProcessSteps } from "@/components/shared/ProcessSteps";
import { PageIntro } from "@/components/shared/PageIntro";
import { CallToAction } from "@/components/shared/CallToAction";

const audienceIcons = [
  "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  "M21 13.255A23.193 23.193 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  "M13 10V3L4 14h7v7l9-11h-7z",
];

export function AboutPage({ locale }: { locale: Locale }) {
  const groups = locale === "th"
    ? [
        ["โรงงานอาหารและการผลิต", "สื่อ Safety, GMP, Food Safety ที่พนักงานหน้างานเข้าใจ พร้อมระบบบันทึกงานภาคสนามที่ใช้ได้จริงบนมือถือ"],
        ["ทีม HR และฝ่ายบุคคล", "ระบบคัดใบสมัคร Onboarding ประเมินผล และแจ้งเตือนเอกสาร ที่ตัดงานทำมือออกจากทุก ๆ เดือน"],
        ["ธุรกิจ SME", "เริ่มจาก Google Workspace ที่มีอยู่แล้ว ได้ระบบพอดีตัวโดยไม่ต้องลงทุนซอฟต์แวร์ HRIS ราคาแพง"],
      ]
    : [
        ["Food factories & manufacturing", "Safety, GMP, and food-safety media the floor understands — plus mobile field-logging that works on site."],
        ["HR & people teams", "Screening, onboarding, evaluation, and document-reminder systems that remove monthly manual work."],
        ["SME businesses", "Start from the Google Workspace you already have — a right-sized system without pricey HRIS licenses."],
      ];

  return (
    <main>
      <JsonLd data={breadcrumbJsonLd(locale, pageSeo[""].crumb[locale], [{ name: pageSeo.about.crumb[locale], path: "about" }])} />
      <PageIntro
        eyebrow={`About ${brand.name}`}
        title={locale === "th" ? "ให้คนเข้าใจง่ายขึ้น และให้ระบบทำงานแทน" : "Help people understand. Let systems do the rest."}
        body={locale === "th"
          ? "เราออกแบบสื่อที่คนจดจำได้ และสร้างระบบที่ลดงานซ้ำซ้อน โดยไม่ลดทอนความถูกต้องของเนื้อหาและกระบวนการ"
          : "We design media people remember and build systems that cut repetitive work — without compromising accuracy."}
      />
      <section className="about-grid section-pad">
        <div className="about-values">
          <div className="about-values-sticky">
            Expert<br />
            Reliable<br />
            Modern<br />
            <em>Creative</em>
            <div className="about-accent-line" />
          </div>
        </div>
        <div className="audiences">
          {groups.map(([title, body], i) => (
            <article key={title} className="audience-card">
              <div className="audience-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d={audienceIcons[i]} />
                </svg>
              </div>
              <span className="audience-tag">0{i + 1}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>
      <ProcessSteps locale={locale} />
      <CallToAction locale={locale} />
    </main>
  );
}
