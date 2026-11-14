import type { Locale } from "@/app/site-data";

const processIcons = [
  "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
  "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
  "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
  "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  "M13 10V3L4 14h7v7l9-11h-7z",
];

/** The 5-step working process (shown on the About page, #process). */
export function ProcessSteps({ locale }: { locale: Locale }) {
  const steps = locale === "th"
    ? [
        ["01", "Discovery", "ค้นหาโจทย์ร่วมกัน", "คุยเป้าหมาย กลุ่มผู้ใช้ เนื้อหา และหน้างานจริง ทั้งงานสื่อและงานระบบ"],
        ["02", "Blueprint", "วางโครงเรื่องและโครงระบบ", "งานสื่อ: โครงเรื่องและลำดับภาพ · งานระบบ: Flow การทำงานและโครงสร้างข้อมูล"],
        ["03", "Creation", "ออกแบบและพัฒนา", "ผลิตภาพ ตัวละคร และวิดีโอ หรือพัฒนาระบบบน Google Workspace ตามทิศทางที่อนุมัติ"],
        ["04", "Quality", "ตรวจทานร่วมกัน", "ส่งรอบตรวจ แก้ไข ทดสอบการใช้งานจริง และตรวจความถูกต้องของเนื้อหา"],
        ["05", "Deployment", "ส่งมอบพร้อมใช้", "ส่งไฟล์สื่อพร้อมใช้อบรม หรือติดตั้งระบบพร้อมคู่มือและการสอนใช้งาน"],
      ]
    : [
        ["01", "Discovery", "Find the brief together", "Align goals, users, content, and real workflows — media and systems alike."],
        ["02", "Blueprint", "Story and system design", "Media: narrative and visual sequence. Systems: workflows and data structure."],
        ["03", "Creation", "Design and build", "Produce visuals, characters, and video — or build the system on Google Workspace."],
        ["04", "Quality", "Review together", "Review rounds, refinements, real-use testing, and content accuracy checks."],
        ["05", "Deployment", "Deliver ready to use", "Training-ready media files, or an installed system with manuals and a walkthrough."],
      ];

  return (
    <section id="process" className="timeline section-pad">
      <div className="product-heading reveal">
        <h2>{locale === "th" ? "เส้นทางโปร่งใสสู่งานที่ใช้ได้จริง" : "A clear path to work that ships"}</h2>
        <p>
          {locale === "th"
            ? "ขั้นตอนเดียวกันทั้งงานสื่อและงานระบบ — ตั้งแต่คุยครั้งแรกจนถึงส่งมอบและสอนใช้งาน"
            : "One process for media and systems — from first conversation to delivery and handover."}
        </p>
      </div>
      {steps.map(([number, en, title, body], i) => (
        <article key={number} className="process-step" style={{ "--step-delay": `${i * 0.12}s` } as React.CSSProperties}>
          <div className="step-number-wrap">
            <span className="step-number">{number}</span>
            <div className="step-line" />
          </div>
          <div className="step-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d={processIcons[i]} />
            </svg>
          </div>
          <div className="step-content">
            <span className="step-tag">{en.toUpperCase()}</span>
            <h3>{title}</h3>
            <p>{body}</p>
          </div>
        </article>
      ))}
    </section>
  );
}
