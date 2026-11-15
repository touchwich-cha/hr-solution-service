// ─── Product catalogue grouped by what the buyer wants to achieve ───
// Each item is a custom-built service (scope and price agreed per job). Images are fictional
// sample screens made for this catalogue, so the section carries a "fictional sample" note.

type L = { th: string; en: string };

export type CatalogItem = {
  slug: string;
  name: L;
  summary: L;
  image: string;
  /** Extra work samples shown as small thumbnails under the cover. */
  samples?: readonly string[];
  /** Existing page on this site (path after /{locale}/), when there is one. */
  href?: string;
};

export type CatalogGroup = {
  id: string;
  title: L;
  sub: L;
  items: readonly CatalogItem[];
};

export const catalogCopy = {
  title: { th: "สินค้าและบริการแยกตามกลุ่มงาน", en: "Products and services by type of work" },
  body: {
    th: "เลือกตามงานที่อยากแก้ แต่ละรายการสั่งทำตามขั้นตอนขององค์กร ตกลงขอบเขตและราคาก่อนเริ่มงานทุกครั้ง",
    en: "Pick by the job you want solved. Each item is built around your own process, with scope and price agreed before work starts.",
  },
  ask: { th: "สอบถามรายการนี้", en: "Ask about this item" },
  see: { th: "ดูรายละเอียด", en: "See details" },
  sample: { th: "ภาพประกอบเป็นตัวอย่างสมมติ ไม่ใช่ข้อมูลจริงของลูกค้า", en: "Images are fictional samples, not real client data." },
} as const;

export const catalogGroups: readonly CatalogGroup[] = [
  {
    id: "training",
    title: { th: "สื่ออบรมและวิดีโอ", en: "Training media & video" },
    sub: { th: "เปลี่ยนมาตรฐานและขั้นตอนงานให้เป็นวิดีโอที่พนักงานดูจนจบ", en: "Turn standards and procedures into video people watch to the end." },
    items: [
      {
        slug: "gmp-3d-video",
        name: { th: "วิดีโออบรม GMP / Food Safety แบบ 3D", en: "3D GMP / Food Safety training video" },
        summary: { th: "สตอรีบอร์ดถึงวิดีโอพร้อมเผยแพร่ ทั้งจอกว้าง 16:9 และแนวตั้ง 9:16", en: "Storyboard to publish-ready video, in 16:9 and 9:16." },
        image: "/catalog/gmp-3d-cover.webp",
        samples: ["/projects/gmp-compliance-audit/gmp-compliance-audit-01.webp", "/projects/factory-hidden-flaw/factory-hidden-flaw-01.webp", "/projects/floor-slope-design/floor-slope-design-01.webp"],
        href: "training-media",
      },
      {
        slug: "software-video",
        name: { th: "วิดีโอสอนใช้งานระบบ / โปรแกรมบริษัท", en: "Software how-to video for your systems" },
        summary: { th: "จำลองหน้าจอ ซูม เคอร์เซอร์ และเสียงบรรยายไทย สำหรับสอนพนักงานใช้ระบบ", en: "Recreated screens, zoom, cursor and Thai voice-over to teach staff a system." },
        image: "/catalog/software-video-cover.webp",
        samples: ["/catalog/software-video-1.webp", "/catalog/software-video-2.webp", "/catalog/software-video-3.webp"],
      },
    ],
  },
  {
    id: "assessment",
    title: { th: "แบบทดสอบและประเมินผล", en: "Tests & assessment" },
    sub: { th: "คัดผู้สมัคร วัดผลอบรม และเข้าใจคนทำงานมากขึ้น", en: "Screen candidates, measure training, understand your people." },
    items: [
      {
        slug: "logical-test",
        name: { th: "Logical Test — แบบทดสอบกระบวนการคิด", en: "Logical Test — reasoning assessment" },
        summary: { th: "สุ่มข้อ จับเวลา ตรวจให้อัตโนมัติ ลงผลใน Google Sheets", en: "Randomised, timed, auto-scored, results in Google Sheets." },
        image: "/catalog/logical-test-cover.webp",
        samples: ["/catalog/logical-test-1.webp", "/catalog/logical-test-2.webp", "/catalog/logical-test-3.webp"],
      },
      {
        slug: "disc-style",
        name: { th: "แบบทดสอบบุคลิกภาพแนว DISC", en: "DISC-style personality test" },
        summary: { th: "แบบสอบถามบุคลิกภาพแนว DISC พร้อมรายงานผลรายคน ใช้ประกอบการสรรหาและพัฒนาทีม", en: "A DISC-style questionnaire with an individual report, to support hiring and team development." },
        image: "/catalog/disc-style-cover.webp",
        samples: ["/catalog/disc-style-1.webp", "/catalog/disc-style-2.webp", "/catalog/disc-style-3.webp"],
      },
      {
        slug: "training-exam",
        name: { th: "ข้อสอบหลังอบรม + เกียรติบัตร", en: "Post-training exam + certificate" },
        summary: { th: "ทำข้อสอบออนไลน์หลังอบรม ตรวจคะแนน และออกเกียรติบัตรให้ผู้ที่ผ่าน", en: "Online post-training exam, auto-scoring and certificates for those who pass." },
        image: "/catalog/training-exam-cover.webp",
        samples: ["/catalog/training-exam-1.webp", "/catalog/training-exam-2.webp", "/catalog/training-exam-3.webp"],
      },
    ],
  },
  {
    id: "hr-automation",
    title: { th: "ระบบงาน HR และเอกสารอัตโนมัติ", en: "HR & document automation" },
    sub: { th: "เตือนให้ก่อนพลาด บันทึกให้ครบ ลดงานทำมือทุกเดือน", en: "Reminders before things slip, records kept complete, less manual work." },
    items: [
      {
        slug: "doc-alert",
        name: { th: "ระบบแจ้งเตือนเอกสาร / สัญญาหมดอายุ", en: "Document & contract expiry alerts" },
        summary: { th: "สัญญา บัตรประชาชน ใบขับขี่ ใบอนุญาต เตือนล่วงหน้าผ่านอีเมลหรือ LINE จาก Google Sheets", en: "Contracts, IDs, licences and permits flagged ahead by email or LINE, from Google Sheets." },
        image: "/catalog/doc-alert-cover.webp",
        samples: ["/catalog/doc-alert-1.webp", "/catalog/doc-alert-2.webp", "/catalog/doc-alert-3.webp"],
        href: "products/contract-watch",
      },
      {
        slug: "probation",
        name: { th: "ระบบเตือนทดลองงานครบ 45 / 90 วัน", en: "Probation reminders at day 45 / 90" },
        summary: { th: "คำนวณวันครบทดลองงาน แจ้งหัวหน้าและ HR ให้ประเมินทันเวลา", en: "Counts probation dates and prompts managers and HR in time to review." },
        image: "/catalog/probation-cover.webp",
        samples: ["/catalog/probation-1.webp", "/catalog/probation-2.webp", "/catalog/probation-3.webp"],
      },
      {
        slug: "guard-system",
        name: { th: "ระบบบันทึกงาน รปภ. และแม่บ้านบนมือถือ", en: "Mobile logbook for security & cleaning crews" },
        summary: { th: "ลงเวลา ตรวจจุด บันทึกรูป และแจ้งเตือนเข้า LINE พร้อมรายงานรายเดือน", en: "Check-ins, patrol points, photos and LINE alerts with monthly reports." },
        image: "/catalog/guard-cover.webp",
        samples: ["/catalog/guard-1.webp", "/catalog/guard-2.webp", "/catalog/guard-3.webp"],
      },
    ],
  },
  {
    id: "chatbot",
    title: { th: "แชตบอทตอบคำถามลูกค้า", en: "Chatbots that answer customers" },
    sub: { th: "ตอบคำถามซ้ำ ๆ ตลอด 24 ชั่วโมง และส่งต่อเรื่องที่ต้องใช้คน", en: "Answer repeat questions 24/7 and hand the rest to a person." },
    items: [
      {
        slug: "chatbot-faq",
        name: { th: "Chatbot FAQ บน LINE / Facebook", en: "FAQ chatbot on LINE / Facebook" },
        summary: { th: "ตอบจากข้อมูลของธุรกิจคุณ ค่า AI Model เป็นไปตามที่ตกลง", en: "Answers from your own business information. AI model cost is agreed separately." },
        image: "/catalog/chatbot-faq-cover.webp",
        samples: ["/catalog/chatbot-faq-1.webp", "/catalog/chatbot-faq-2.webp", "/catalog/chatbot-faq-3.webp"],
        href: "products/line-hr-assistant",
      },
    ],
  },
];
