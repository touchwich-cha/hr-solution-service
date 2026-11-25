import { pageSeo, type Locale } from "@/app/site-data";
import { homeAbout, homeStats } from "@/app/home-data";
import { breadcrumbJsonLd } from "@/app/seo";
import { JsonLd } from "@/components/shared/JsonLd";
import { CtaBlock, RdIntro } from "@/components/rd/Blocks";
import { Approach, Stats } from "@/components/home/HomeClient";

type L = { th: string; en: string };
const T = (th: string, en: string): L => ({ th, en });

// Career stages from the owner's profile (no employer names, no years on purpose).
const timeline = [
  { k: "01", title: T("บรรจุภัณฑ์พลาสติกส่งออก", "Export plastic packaging"), body: T("จัดซื้อและวางแผนการผลิต เข้าใจต้นทุน กำลังการผลิต และงานหน้าโรงงานจริง", "Purchasing and production planning — cost, capacity and the real factory floor.") },
  { k: "02", title: T("โรงงานอาหาร 1,000+ คน", "Food factory, 1,000+ staff"), body: T("Senior HR Manager 15 ปีขึ้นไป ดูแลสรรหา อบรม สวัสดิการ และนำโปรเจกต์ย้ายฐานการผลิต พร้อมคงมาตรฐาน ISO และ GMP", "Senior HR Manager for 15+ years — hiring, training, welfare, and leading a factory relocation while keeping ISO and GMP in place.") },
  { k: "03", title: T("HR Digital ในองค์กร", "HR digital in-house"), body: T("สร้างระบบด้วย Google Apps Script และ n8n กว่า 15 ระบบ และ Workflow อนุมัติบน Kissflow ใช้งานจริงทุกวัน", "Built 15+ systems on Google Apps Script and n8n plus approval workflows on Kissflow — in daily use.") },
  { k: "04", title: T("HR Solution Service", "HR Solution Service"), body: T("นำระบบและสื่อที่พิสูจน์แล้วมาปรับให้โรงงานและธุรกิจไทยใช้ได้", "Shaping those proven systems and media for other Thai factories and businesses.") },
];

const audiences = [
  { title: T("โรงงานอาหารและการผลิต", "Food factories & manufacturing"), body: T("สื่อ Safety, GMP, Food Safety ที่พนักงานหน้างานเข้าใจ พร้อมระบบบันทึกงานภาคสนามที่ใช้ได้จริงบนมือถือ", "Safety, GMP and food-safety media the floor understands — plus mobile field logging that works on site.") },
  { title: T("ทีม HR และฝ่ายบุคคล", "HR & people teams"), body: T("ระบบคัดใบสมัคร Onboarding ประเมินผล และแจ้งเตือนเอกสาร ที่ตัดงานทำมือออกจากทุกเดือน", "Screening, onboarding, evaluation and document reminders that remove monthly manual work.") },
  { title: T("ธุรกิจ SME", "SME businesses"), body: T("เริ่มจาก Google Workspace ที่มีอยู่แล้ว ได้ระบบพอดีตัวโดยไม่ต้องลงทุนซอฟต์แวร์ HRIS ราคาแพง", "Start from the Google Workspace you already have — a right-sized system without pricey HRIS licences.") },
];

// Keynote / workshop topics from the owner's profile.
const talks = [
  { k: "A", title: "AI-Powered HR", body: T("ยกระดับงานบุคคลด้วยปัญญาประดิษฐ์", "Raising HR work with AI"), who: T("ผู้บริหาร HR และผู้จัดการ", "HR leaders, managers") },
  { k: "B", title: "Low-Code Automation", body: T("สร้างระบบทำงานอัตโนมัติสำหรับผู้บริหาร", "Building automation for executives"), who: T("ผู้บริหาร ฝ่ายปฏิบัติการ", "Executives, operations") },
  { k: "C", title: "Digital Presence with AI", body: T("เทคนิคปั้นช่องออนไลน์ด้วย AI", "Growing online channels with AI"), who: T("การตลาด ครีเอเตอร์", "Marketing, creators") },
  { k: "D", title: "QMS & Safety Standards", body: T("ISO 9001 / 14001 / 45001 และ GMP Audit", "ISO 9001 / 14001 / 45001 and GMP audit"), who: T("QA ความปลอดภัย พนักงานทุกระดับ", "QA, safety, all staff") },
];

export function AboutPage({ locale }: { locale: Locale }) {
  const th = locale === "th";
  const v = homeAbout.venn;
  return (
    <main>
      <JsonLd data={breadcrumbJsonLd(locale, pageSeo[""].crumb[locale], [{ name: pageSeo.about.crumb[locale], path: "about" }])} />
      <RdIntro
        locale={locale}
        eyebrow={th ? "เกี่ยวกับเรา · About" : "About"}
        title={T("สร้างโดยคนที่เคย", "Built by someone who has")}
        accent={T("นั่งโต๊ะ HR จริง", "sat at the HR desk")}
        body={homeAbout.p1}
      />

      <section className="rd-sec" style={{ paddingTop: 40 }}>
        <div className="rd-wrap rd-about">
          <div className="rd-rv">
            <div className="rd-eyebrow rd-mono">{th ? "ทำไมต้องเรา" : "Why us"}</div>
            <h2 className="rd-big">{th ? "เข้าใจคน" : "People,"}<br />{th ? "เข้าใจระบบ" : "systems,"}<br /><span className="rd-acc">{th ? "ทำได้จริง" : "execution"}</span></h2>
            <p>{homeAbout.p2[locale]}</p>
            <div className="rd-creds">{homeAbout.creds.map((c) => <span key={c.en} className="rd-pill rd-mono">{c[locale]}</span>)}</div>
          </div>
          <svg className="rd-venn rd-rv" viewBox="0 0 520 480" role="img" aria-label={v.aria[locale]}>
            <circle cx="190" cy="180" r="130" /><circle cx="330" cy="180" r="130" /><circle cx="260" cy="300" r="130" />
            <path className="core" d="M260 132 A130 130 0 0 1 320 245 A130 130 0 0 1 200 245 A130 130 0 0 1 260 132Z" />
            <text x="110" y="130" className="m">HUMAN</text><text x="110" y="152">{v.human[0][locale]}</text><text x="110" y="170" className="s">{v.human[1][locale]}</text>
            <text x="340" y="130" className="m">SYSTEM</text><text x="340" y="152">{v.system[0][locale]}</text><text x="340" y="170" className="s">{v.system[1][locale]}</text>
            <text x="215" y="370" className="m">EXECUTION</text><text x="215" y="392">{v.exec[0][locale]}</text><text x="215" y="410" className="s">{v.exec[1][locale]}</text>
          </svg>
        </div>
      </section>

      <section className="rd-sec" style={{ paddingTop: 20 }}>
        <div className="rd-wrap">
          <div className="rd-head rd-rv">
            <div>
              <div className="rd-eyebrow rd-mono">{th ? "เส้นทาง" : "The path"}</div>
              <h2 className="rd-big">{th ? "17 ปี" : "17 years"} <span className="rd-acc">{th ? "ในโรงงานผลิต" : "on the factory side"}</span></h2>
            </div>
          </div>
          <ol className="rd-timeline">
            {timeline.map((t) => (
              <li key={t.k} className="rd-rv">
                <span className="rd-mono rd-acc">{t.k}</span>
                <h3>{t.title[locale]}</h3>
                <p>{t.body[locale]}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="rd-sec" style={{ padding: "20px 0 130px" }}>
        <div className="rd-wrap">
          <div className="rd-head rd-rv">
            <div>
              <div className="rd-eyebrow rd-mono">{homeStats.eyebrow[locale]}</div>
              <h2 className="rd-big">{homeStats.title[0][locale]} <span className="rd-acc">{homeStats.title[1][locale]}</span></h2>
            </div>
          </div>
          <Stats locale={locale} />
        </div>
      </section>

      <section className="rd-sec" style={{ paddingTop: 0 }}>
        <div className="rd-wrap">
          <div className="rd-head rd-rv">
            <div>
              <div className="rd-eyebrow rd-mono">{th ? "เราทำงานให้ใคร" : "Who we work with"}</div>
              <h2 className="rd-big">{th ? "ลูกค้า" : "Three kinds"} <span className="rd-acc">{th ? "3 กลุ่ม" : "of client"}</span></h2>
            </div>
          </div>
          <div className="rd-svc rd-rv">
            {audiences.map((a, i) => (
              <div className="rd-svc-col" key={a.title.en}>
                <div className="rd-svc-n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</div>
                <h3>{a.title[locale]}</h3>
                <p className="rd-muted">{a.body[locale]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rd-sec" style={{ paddingTop: 20 }}>
        <Approach locale={locale} />
      </section>

      <section className="rd-sec" style={{ paddingTop: 20 }}>
        <div className="rd-wrap">
          <div className="rd-head rd-rv">
            <div>
              <div className="rd-eyebrow rd-mono">{th ? "บรรยายและอบรมในองค์กร" : "Talks & workshops"}</div>
              <h2 className="rd-big">{th ? "หัวข้อบรรยาย" : "Signature"} <span className="rd-acc">{th ? "และเวิร์กช็อป" : "topics"}</span></h2>
            </div>
            <p>{th ? "ติดต่อเพื่อเชิญบรรยาย จัดอบรม หรือปรึกษาโครงการ" : "Get in touch for a keynote, in-house workshop or project consulting."}</p>
          </div>
          <div className="rd-talks rd-rv">
            {talks.map((t) => (
              <div key={t.k} className="rd-talk">
                <span className="rd-mono rd-acc">Topic {t.k}</span>
                <h3>{t.title}</h3>
                <p>{t.body[locale]}</p>
                <span className="rd-mono rd-talk-who">{t.who[locale]}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBlock locale={locale} />
    </main>
  );
}
