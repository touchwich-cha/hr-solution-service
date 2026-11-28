// ─── Product catalogue — 9 products with the SAME names, tiers and prices as the Fastwork listings,
//     plus the quote-based E-Learning system (not on Fastwork; priced per customer, from THB 9,999/year) ───
//
// Source of truth: Fastwork_HR_Solution_Service/products/Fastwork_Listings_v2.md (+ Fastwork_Listings.md).
// 1 product = 1 Fastwork listing = 3 tiers (Basic / Standard / Premium). Change a price or a tier here
// and on Fastwork together so the two never disagree.
// Images are fictional sample screens (labelled on the page) — never real client data.

import { elearningDemoUrl, type ProductIcon } from "@/app/site-data";

type L = { th: string; en: string };
/** One deliverable line, [Thai, English]. */
type Line = readonly [string, string];

export type Tier = {
  name: L;
  price: number;
  days: number;
  revisions: number;
  /** Standard / Premium say "everything in the previous tier, plus…" */
  includesPrevious: boolean;
  items: readonly Line[];
};

export type GroupId = "training" | "assessment" | "hr-automation" | "chatbot";

export type FwProduct = {
  slug: string;
  group: GroupId;
  icon: ProductIcon;
  name: L;
  oneLiner: L;
  forWho: L;
  tiers: readonly [Tier, Tier, Tier];
  /** Which tier to highlight as the usual choice (index). */
  popular: 1;
  excludes: L;
  /** Extra cost / condition note shown under the tiers. */
  note?: L;
  cover: string;
  samples: readonly string[];
  related: readonly string[];
  seo: { title: L; description: L };
  /** This product's own Fastwork listing (same tiers and prices). */
  fastworkUrl?: string;
  /** Quote-based product: tiers show "ask us" instead of prices; `from` is the starting price per `per`. */
  quote?: { from: number; per: L };
  /** Public try-it demo for this product. */
  demoUrl?: string;
};

export type CatalogGroup = { id: GroupId; icon: ProductIcon; title: L; sub: L };

export const fastwork = {
  /** Paste the seller's public Fastwork profile URL here to turn on the "Order on Fastwork" buttons. */
  profileUrl: "https://fastwork.co/user/hrsolutionservice" as string,
  fee: { th: "ชำระและรับงานผ่านระบบกลางของ Fastwork", en: "Pay and receive work through Fastwork's escrow" },
};

export const catalogCopy = {
  eyebrow: { th: "Products / สินค้า", en: "Products" },
  title: { th: "10 สินค้า จัดเป็น 4 กลุ่มงาน — เลือกแพ็กเกจที่ใช่ได้เลย", en: "10 products in 4 groups — pick the tier that fits" },
  body: {
    th: "ทุกสินค้ามี 3 แพ็กเกจ (Basic / Standard / Premium) เป็นงานชนิดเดียวกัน ต่างกันที่ขนาดและปริมาณงาน และมีประกาศชื่อเดียวกันบน Fastwork ด้วยแพ็กเกจและราคาเดียวกัน (ยกเว้นระบบ E-Learning ที่เสนอราคาตามฟีเจอร์) คุยขอบเขตกับเราก่อนสั่งซื้อได้เสมอ",
    en: "Every product comes in 3 tiers (Basic / Standard / Premium) — the same work at different scale — and has a matching Fastwork listing with the same tiers and prices (except the E-Learning system, quoted by features). Talk scope with us before you order.",
  },
  from: { th: "เริ่มต้น", en: "From" },
  baht: { th: "฿", en: "THB " },
  days: { th: "วัน", en: "days" },
  revisions: { th: "แก้ไข", en: "revisions" },
  usual: { th: "ยอดนิยม", en: "Most chosen" },
  quotePrice: { th: "ราคาตามฟีเจอร์ · ติดต่อสอบถาม", en: "Priced by features · ask us" },
  quoteShort: { th: "ติดต่อสอบถาม", en: "Ask us" },
  tryDemo: { th: "ทดลองใช้เดโมฟรี", en: "Try the free demo" },
  plus: { th: "ทุกอย่างในแพ็กเกจก่อนหน้า และ", en: "Everything in the previous tier, plus" },
  see: { th: "ดูแพ็กเกจและรายละเอียด", en: "See tiers & details" },
  ask: { th: "สอบถามแพ็กเกจนี้", en: "Ask about this tier" },
  orderFastwork: { th: "สั่งซื้อผ่าน Fastwork", en: "Order on Fastwork" },
  forWho: { th: "เหมาะกับใคร", en: "Who it's for" },
  tiersTitle: { th: "3 แพ็กเกจ — ชนิดงานเดียวกัน ต่างกันที่ขนาด", en: "3 tiers — the same work at different scale" },
  tiersTitleQuote: { th: "เลือกฟีเจอร์ตามที่องค์กรต้องการ — ราคาตามฟีเจอร์", en: "Pick the features you need — priced by features" },
  excludes: { th: "ไม่รวมในแพ็กเกจ", en: "Not included" },
  samples: { th: "ตัวอย่างงาน", en: "Work samples" },
  related: { th: "สินค้าที่มักใช้ร่วมกัน", en: "Often used together" },
  back: { th: "← สินค้าทั้งหมด", en: "← All products" },
  sample: { th: "ภาพประกอบเป็นตัวอย่างสมมติ ไม่ใช่ข้อมูลจริงของลูกค้า", en: "Images are fictional samples, not real client data." },
  scopeNote: {
    th: "คุยขอบเขตงานก่อนสั่งซื้อ · เริ่มนับวันทำงานเมื่อได้รับข้อมูลครบ · “แก้ไข” คือแก้ตามขอบเขตเดิม ไม่ใช่เพิ่มฟีเจอร์ใหม่",
    en: "Agree scope before ordering · working days start once we have your materials · a “revision” means changes within the agreed scope, not new features.",
  },
  systemsTitle: { th: "ระบบที่ใช้งานจริง — ต้นแบบของสินค้าด้านบน", en: "Systems in real use — the foundation of the products above" },
  systemsBody: {
    th: "สินค้าด้านบนมาจากระบบที่เราสร้างและใช้งานจริงบน Google Workspace ของทีม HR ไม่ระบุชื่อลูกค้าเพื่อความเป็นส่วนตัว ถ้าต้องการปรับตามขั้นตอนขององค์กร คุยกับเราเพื่อสั่งทำได้",
    en: "The products above grew out of systems we built and run on real HR teams' Google Workspace — client names withheld for privacy. Need it shaped to your own process? Talk to us for a custom build.",
  },
  fastworkTitle: { th: "สินค้าเดียวกันกับที่ขายบน Fastwork", en: "Same products as on Fastwork" },
  fastworkBody: {
    th: "ชื่อสินค้า แพ็กเกจ และราคาในหน้านี้ตรงกับประกาศบน Fastwork เลือกสั่งผ่าน Fastwork เพื่อชำระเงินผ่านระบบกลาง หรือคุยกับเราโดยตรงเพื่อออกใบเสนอราคาสำหรับองค์กรก็ได้",
    en: "Names, tiers and prices here match our Fastwork listings. Order through Fastwork to pay via escrow, or talk to us directly for a company quotation.",
  },
} as const;

export const catalogGroups: readonly CatalogGroup[] = [
  {
    id: "training",
    icon: "layers",
    title: { th: "สื่ออบรมและวิดีโอ", en: "Training media & video" },
    sub: { th: "เปลี่ยนมาตรฐานและขั้นตอนงานให้เป็นวิดีโอที่พนักงานดูจนจบ", en: "Turn standards and procedures into video people watch to the end." },
  },
  {
    id: "assessment",
    icon: "checklist",
    title: { th: "แบบทดสอบและประเมินผล", en: "Tests & assessment" },
    sub: { th: "คัดผู้สมัคร วัดผลอบรม และเข้าใจคนทำงานมากขึ้น", en: "Screen candidates, measure training, understand your people." },
  },
  {
    id: "hr-automation",
    icon: "bell",
    title: { th: "ระบบงาน HR และเอกสารอัตโนมัติ", en: "HR & document automation" },
    sub: { th: "เตือนให้ก่อนพลาด บันทึกให้ครบ ลดงานทำมือทุกเดือน", en: "Reminders before things slip, records kept complete, less manual work." },
  },
  {
    id: "chatbot",
    icon: "chat",
    title: { th: "แชตบอทตอบคำถามลูกค้า", en: "Chatbots that answer customers" },
    sub: { th: "ตอบคำถามซ้ำ ๆ ตลอด 24 ชั่วโมง และส่งต่อเรื่องที่ต้องใช้คน", en: "Answer repeat questions 24/7 and hand the rest to a person." },
  },
];

const T = (th: string, en: string): L => ({ th, en });

export const fwProducts: readonly FwProduct[] = [
  // ───────────── 1. 3D GMP video ─────────────
  {
    slug: "gmp-3d-video",
    fastworkUrl: "https://fastwork.co/user/hrsolutionservice/teaching-material-design-92902880",
    group: "training",
    icon: "layers",
    name: T("วิดีโออบรม GMP / Food Safety แบบ 3D", "3D GMP / Food Safety training video"),
    oneLiner: T("เปลี่ยนข้อกำหนด GMP ในกระดาษให้เป็นวิดีโอ 3D ที่พนักงานดูจนจบ", "Turn paper GMP rules into 3D video staff watch to the end."),
    forWho: T("โรงงานอาหาร ฝ่ายคุณภาพ / จป. / HR ที่ต้องอบรมพนักงานซ้ำทุกปี", "Food factories — QA, safety officers and HR who retrain staff every year."),
    popular: 1,
    tiers: [
      { name: T("ไม่เกิน 10 นาที", "Up to 10 min"), price: 490, days: 5, revisions: 3, includesPrevious: false, items: [
        ["วิดีโอ 16:9 ความยาวไม่เกิน 10 นาที", "16:9 video up to 10 minutes"], ["สคริปต์ + สตอรีบอร์ด", "Script + storyboard"],
        ["ประมาณ 20–30 ฉาก 3D", "About 20–30 3D scenes"], ["เสียงบรรยายไทย + ซับไตเติล", "Thai voice-over + subtitles"], ["ไฟล์ MP4", "MP4 file"] ] },
      { name: T("ไม่เกิน 20 นาที", "Up to 20 min"), price: 1990, days: 10, revisions: 5, includesPrevious: true, items: [
        ["40–60 ฉาก ปรับฉากตามไลน์ผลิตของคุณ", "40–60 scenes adapted to your production line"], ["แถมคลิปแนวตั้ง 9:16 จำนวน 1 คลิป", "1 bonus vertical 9:16 clip"], ["แบบทดสอบท้ายคลิป 10 ข้อ", "10-question quiz"] ] },
      { name: T("เต็มเรื่อง ไม่เกิน 40 นาที/ตอน", "Full episode, up to 40 min"), price: 9990, days: 20, revisions: 10, includesPrevious: true, items: [
        ["80+ ฉาก ตัวละครเฉพาะบริษัท", "80+ scenes with company-specific characters"], ["แบ่ง Chapter", "Chapters"], ["แถมคลิปแนวตั้ง 9:16 จำนวน 2 คลิป", "2 bonus vertical 9:16 clips"], ["แบบทดสอบ 20 ข้อ", "20-question quiz"] ] },
    ],
    excludes: T("การถ่ายทำจริงในโรงงาน และการขออนุมัติเนื้อหากับหน่วยงานรับรอง", "On-site filming and content approval by certification bodies."),
    cover: "/catalog/gmp-3d-cover.webp",
    samples: ["/projects/gmp-compliance-audit/gmp-compliance-audit-01.webp", "/projects/factory-hidden-flaw/factory-hidden-flaw-01.webp", "/projects/floor-slope-design/floor-slope-design-01.webp"],
    related: ["training-exam", "software-video"],
    seo: {
      title: T("ทำวิดีโออบรม GMP / Food Safety แบบ 3D สำหรับโรงงานอาหาร", "3D GMP / Food Safety training video for food factories"),
      description: T("วิดีโออบรม GMP แบบ 3D 3 แพ็กเกจ ไม่เกิน 10 / 20 / 40 นาที เริ่มต้น 490 บาท พร้อมสคริปต์ เสียงบรรยายไทย ซับไตเติล และคลิปแนวตั้ง", "3D GMP training video in 3 tiers — up to 10 / 20 / 40 minutes, from THB 490, with script, Thai voice-over, subtitles and vertical clips."),
    },
  },
  // ───────────── 2. Software how-to video ─────────────
  {
    slug: "software-video",
    fastworkUrl: "https://fastwork.co/user/hrsolutionservice/teaching-material-design-16951669",
    group: "training",
    icon: "table",
    name: T("วิดีโอสอนใช้งานระบบ / โปรแกรมบริษัท", "Software how-to video for your systems"),
    oneLiner: T("จำลองหน้าจอระบบ SAP / ERP พร้อมเคอร์เซอร์ ซูม และเสียงบรรยายไทย", "Recreated SAP / ERP screens with cursor, zoom and Thai voice-over."),
    forWho: T("ทีมฝึกอบรมและ IT ที่ต้องสอนพนักงานใช้ระบบใหม่ โดยไม่ต้องเปิดข้อมูลจริงบนหน้าจอ", "Training and IT teams teaching staff a new system without showing real data on screen."),
    popular: 1,
    tiers: [
      { name: T("คลิปสอน 1 ขั้นตอน", "1 how-to clip"), price: 1990, days: 5, revisions: 2, includesPrevious: false, items: [
        ["คลิปไม่เกิน 5 นาที", "One clip, up to 5 minutes"], ["สคริปต์", "Script"], ["เคอร์เซอร์ + ซูมหน้าจอ", "Animated cursor + screen zoom"], ["ซับไตเติลไทย", "Thai subtitles"], ["ไฟล์ MP4", "MP4 file"] ] },
      { name: T("วิดีโอสอน 1 โมดูล", "1 module video"), price: 4990, days: 10, revisions: 5, includesPrevious: true, items: [
        ["ความยาวไม่เกิน 15 นาที", "Up to 15 minutes"], ["สร้างหน้าจอใหม่จำลองระบบ", "Recreated system screens"], ["มาสคอตพิธีกร", "Mascot host"], ["เสียงบรรยาย + ซับไตเติล", "Voice-over + subtitles"], ["แบบทดสอบท้ายคลิป", "End-of-video quiz"] ] },
      { name: T("คอร์ส E-Learning ระบบ", "System e-learning course"), price: 9990, days: 21, revisions: 5, includesPrevious: true, items: [
        ["รวมไม่เกิน 30 นาที แบ่ง 3–5 บท", "Up to 30 minutes in total, 3–5 chapters"], ["มาสคอตตามแบรนด์ของคุณ", "Mascot in your brand style"], ["แบบทดสอบทุกบท", "A quiz for every chapter"], ["ภาพปกแต่ละบท", "A cover for each chapter"] ] },
    ],
    excludes: T("การสอนสดและการติดตั้งระบบให้ลูกค้า", "Live training and installing the system for you."),
    cover: "/catalog/software-video-cover.webp",
    samples: ["/catalog/software-video-1.webp", "/catalog/software-video-2.webp", "/catalog/software-video-3.webp"],
    related: ["gmp-3d-video", "training-exam"],
    seo: {
      title: T("ทำวิดีโอสอนใช้งานระบบ SAP / ERP พร้อมเสียงบรรยายไทย", "How-to videos for SAP / ERP and company software, Thai voice-over"),
      description: T("วิดีโอสอนใช้งานระบบ 3 แพ็กเกจ เริ่มต้น 1,990 บาท จำลองหน้าจอ ซูม เคอร์เซอร์ มาสคอต และแบบทดสอบท้ายคลิป", "System how-to videos in 3 tiers from THB 1,990 — recreated screens, zoom, cursor, mascot host and quizzes."),
    },
  },
  // ───────────── 10. E-Learning system (quote-based, yearly; not on Fastwork) ─────────────
  {
    slug: "elearning-system",
    group: "training",
    icon: "layers",
    name: T("ระบบ E-Learning สำหรับองค์กร", "E-Learning system for your company"),
    oneLiner: T(
      "ระบบเรียนออนไลน์ของบริษัทคุณ เรียนทีละด่าน ดูวิดีโอ ตอบคำถาม สอบ รับใบรับรอง พร้อมหลังบ้าน HR และรายงานชั่วโมงอบรม",
      "Your own online learning system — step-by-step lessons, video, quizzes, exams and certificates, with an HR back office and training-hour reports.",
    ),
    forWho: T(
      "ฝ่าย HR และฝึกอบรมที่ต้องการให้พนักงานเรียนออนไลน์ได้ทั้งมือถือและคอมพิวเตอร์ และต้องมีหลักฐานการอบรมไว้ใช้ตอน Audit",
      "HR and training teams who want staff to learn online on phone or computer, with training records ready for audits.",
    ),
    popular: 1,
    quote: { from: 9999, per: T("/ปี", "/year") },
    demoUrl: elearningDemoUrl,
    tiers: [
      { name: T("เริ่มต้น", "Starter"), price: 9999, days: 0, revisions: 0, includesPrevious: false, items: [
        ["ระบบบน Google Workspace ของบริษัท", "Runs on your company's Google Workspace"],
        ["พนักงานเข้าระบบด้วยอีเมลบริษัท + รหัส OTP", "Staff sign in with company email + one-time code"],
        ["บทเรียนวิดีโอจากลิงก์ YouTube + คำถามระหว่างคลิป", "Video lessons from YouTube links + in-video questions"],
        ["ข้อสอบท้ายหลักสูตร + ใบรับรองพร้อม QR ตรวจสอบ", "End-of-course exam + certificate with verification QR"],
        ["หลังบ้าน HR: นำเข้าพนักงานจาก Excel สร้างหลักสูตร มอบหมายตามแผนก", "HR back office: import staff from Excel, build courses, assign by department"] ] },
      { name: T("มาตรฐาน", "Standard"), price: 9999, days: 0, revisions: 0, includesPrevious: true, items: [
        ["เส้นทางการเรียนแบบกระดานด่าน", "Game-board learning path"],
        ["กันโกง: ห้ามข้ามวิดีโอ ลายน้ำชื่อผู้เรียน ตรวจการสลับหน้าจอระหว่างสอบ", "Anti-cheat: no video skipping, learner-name watermark, tab-switch checks in exams"],
        ["แจ้งเตือนทางอีเมลเมื่อใกล้ครบกำหนด", "Email reminders before due dates"],
        ["รายงานชั่วโมงอบรมรายคน / แผนก + ส่งออก Excel", "Training-hour reports per person / department + Excel export"],
        ["ประวัติการอบรมรายคน พิมพ์ / PDF ได้", "Personal training record, printable / PDF"] ] },
      { name: T("ตามความต้องการ", "Tailored"), price: 9999, days: 0, revisions: 0, includesPrevious: true, items: [
        ["ชื่อบริษัท โลโก้ และสีตามแบรนด์บนระบบและใบรับรอง", "Your company name, logo and brand colour on the system and certificates"],
        ["ปรับฟีเจอร์ตามขั้นตอนงานขององค์กร", "Features shaped to your own process"],
        ["หัวหน้างานดูความคืบหน้าของลูกทีม", "Managers see their team's progress"],
        ["ทำสื่ออบรมวิดีโอให้ด้วย (คิดตามสินค้าวิดีโออบรม)", "Training videos made for you (priced as our video products)"] ] },
    ],
    excludes: T(
      "ค่าทำสื่อวิดีโออบรม (ดูสินค้าวิดีโออบรม) และบัญชี Google Workspace ของบริษัท",
      "Making the training videos (see our video products) and your company's Google Workspace account.",
    ),
    note: T(
      "ราคาขึ้นอยู่กับฟีเจอร์และตัวเลือกที่องค์กรต้องการ เริ่มต้น 9,999 บาท/ปี ติดต่อเราเพื่อรับใบเสนอราคา · ทดลองใช้เดโมได้ฟรีก่อนตัดสินใจ",
      "Price depends on the features and options you need, from THB 9,999 per year. Contact us for a quotation — and try the free demo first.",
    ),
    cover: "/catalog/elearning-cover.webp",
    samples: ["/catalog/elearning-1.webp", "/catalog/elearning-2.webp", "/catalog/elearning-3.webp"],
    related: ["gmp-3d-video", "software-video", "training-exam"],
    seo: {
      title: T("ระบบ E-Learning สำหรับองค์กร เรียนออนไลน์ สอบ ออกใบรับรอง ทดลองฟรี", "E-Learning system for companies — online lessons, exams, certificates, free demo"),
      description: T(
        "ระบบเรียนออนไลน์ของบริษัท บทเรียนวิดีโอ คำถามระหว่างคลิป ข้อสอบ ใบรับรอง QR หลังบ้าน HR และรายงานชั่วโมงอบรม เริ่มต้น 9,999 บาท/ปี ทดลองใช้เดโมฟรี",
        "Company online learning: video lessons, in-video questions, exams, QR certificates, an HR back office and training-hour reports. From THB 9,999 a year — try the free demo.",
      ),
    },
  },
  // ───────────── 3. Logical Test ─────────────
  {
    slug: "logical-test",
    fastworkUrl: "https://fastwork.co/user/hrsolutionservice/ai-tool-and-saas-45015782",
    group: "assessment",
    icon: "filter",
    name: T("Logical Test — แบบทดสอบกระบวนการคิด", "Logical Test — reasoning assessment"),
    oneLiner: T("ทดสอบตัวเลข ภาษา และตรรกะรูปภาพ จับเวลาทุกข้อ แจ้งผลถึง HR ทันที", "Numerical, verbal and abstract reasoning, timed, results sent to HR at once."),
    forWho: T("ฝ่าย HR ที่คัดผู้สมัครจำนวนมากก่อนสัมภาษณ์", "HR teams screening many applicants before interviews."),
    popular: 1,
    tiers: [
      { name: T("แบบทดสอบ 1 ชุด", "1 test set"), price: 2990, days: 3, revisions: 2, includesPrevious: false, items: [
        ["คลังข้อสอบ 100 ข้อ 3 หมวด", "100-question bank in 3 categories"], ["สุ่มข้อ + จับเวลา", "Random order + timer"], ["บันทึกผลลง Google Sheets", "Results saved to Google Sheets"], ["หน้าขอความยินยอม PDPA", "PDPA consent page"], ["คู่มือการใช้งาน", "User guide"] ] },
      { name: T("ปรับตามงานของคุณ", "Tailored to your job"), price: 7990, days: 15, revisions: 3, includesPrevious: true, items: [
        ["ระบบปรับความยากตามผู้สอบ (Adaptive)", "Adaptive difficulty"], ["เกณฑ์ผ่านแยกตามตำแหน่ง", "Pass marks per position"], ["แจ้งผลทาง LINE", "Results via LINE"], ["ใส่โลโก้บริษัท", "Your company logo"], ["เรียงลำดับผู้สมัคร", "Ranked applicant list"] ] },
      { name: T("ชุดเครื่องมือคัดเลือกครบ", "Full selection toolkit"), price: 15990, days: 21, revisions: 3, includesPrevious: true, items: [
        ["เขียนข้อสอบเฉพาะตำแหน่ง 30 ข้อ", "30 custom questions for your position"], ["คะแนนรายหมวด เป็นรายงาน PDF", "Per-category score report (PDF)"], ["Dashboard ภาพรวมผู้สมัคร", "Applicant dashboard"], ["ดูแลหลังส่งมอบ 30 วัน", "30 days of support"] ] },
    ],
    excludes: T("แบบทดสอบบุคลิกภาพ (ดูสินค้า DISC)", "Personality testing (see the DISC-style product)."),
    note: T("ผลการทดสอบใช้ประกอบการตัดสินใจเท่านั้น ค่าบริการ Google Workspace หรือ LINE OA แบบเสียเงิน (ถ้ามี) ลูกค้าเป็นผู้ชำระ", "Results support decisions only. Paid Google Workspace or LINE OA fees, if any, are paid by the client."),
    cover: "/catalog/logical-test-cover.webp",
    samples: ["/catalog/logical-test-1.webp", "/catalog/logical-test-2.webp", "/catalog/logical-test-3.webp"],
    related: ["disc-style", "training-exam"],
    seo: {
      title: T("ระบบแบบทดสอบกระบวนการคิด Logical Test คัดผู้สมัครงาน", "Logical Test — online reasoning assessment for hiring"),
      description: T("แบบทดสอบตัวเลข ภาษา ตรรกะรูปภาพ 3 แพ็กเกจ เริ่มต้น 2,990 บาท สุ่มข้อ จับเวลา ตรวจให้อัตโนมัติ ลงผลใน Google Sheets", "Numerical, verbal and abstract tests in 3 tiers from THB 2,990 — randomised, timed, auto-scored into Google Sheets."),
    },
  },
  // ───────────── 4. DISC-style ─────────────
  {
    slug: "disc-style",
    fastworkUrl: "https://fastwork.co/user/hrsolutionservice/hr-consulting-69714443",
    group: "assessment",
    icon: "user",
    name: T("แบบทดสอบบุคลิกภาพแนว DISC", "DISC-style personality test"),
    oneLiner: T("ทำบนมือถือราว 10 นาที สรุปสไตล์ D / I / S / C จุดแข็ง และวิธีสื่อสาร", "About 10 minutes on a phone; summarises D / I / S / C style, strengths and how to communicate."),
    forWho: T("HR และหัวหน้าทีมที่ใช้ประกอบการสรรหา พัฒนาทีม และ Team Building", "HR and team leads supporting hiring, team development and team building."),
    popular: 1,
    tiers: [
      { name: T("ผลบนหน้าจอ", "On-screen result"), price: 1990, days: 3, revisions: 2, includesPrevious: false, items: [
        ["แบบทดสอบ 24 ข้อ", "24-question test"], ["ผลสไตล์หลักบนหน้าจอ", "Main style shown on screen"], ["บันทึกผลลง Google Sheets", "Results saved to Google Sheets"], ["หน้าขอความยินยอม PDPA", "PDPA consent page"], ["คู่มือการใช้งาน", "User guide"] ] },
      { name: T("รายงานรายคน", "Individual report"), price: 4990, days: 7, revisions: 3, includesPrevious: true, items: [
        ["รายงาน PDF รายคน (จุดแข็ง / ควรระวัง / วิธีสื่อสาร)", "Individual PDF report (strengths / watch-outs / how to communicate)"], ["แจ้งผลทาง LINE", "Results via LINE"], ["ใส่โลโก้บริษัท", "Your company logo"] ] },
      { name: T("ภาพรวมทีม", "Team overview"), price: 9990, days: 14, revisions: 3, includesPrevious: true, items: [
        ["Dashboard สัดส่วน DISC รายแผนก", "DISC mix dashboard by department"], ["กรองตามตำแหน่ง", "Filter by position"], ["คู่มือตีความผลสำหรับหัวหน้า", "Interpretation guide for managers"], ["ดูแลหลังส่งมอบ 30 วัน", "30 days of support"] ] },
    ],
    excludes: T("การสัมภาษณ์หรือให้คำปรึกษารายบุคคล และการรับรองผลทางจิตวิทยา", "Individual interviews or counselling, and any psychological certification."),
    note: T("เป็นแบบทดสอบ “แนว DISC” ที่เขียนข้อคำถามขึ้นเอง ไม่ใช่แบบทดสอบ DiSC® ของผู้ถือลิขสิทธิ์ ผลใช้ประกอบการตัดสินใจเท่านั้น", "A “DISC-style” test with our own questions — not the licensed DiSC® assessment. Results support decisions only."),
    cover: "/catalog/disc-style-cover.webp",
    samples: ["/catalog/disc-style-1.webp", "/catalog/disc-style-2.webp", "/catalog/disc-style-3.webp"],
    related: ["logical-test", "probation"],
    seo: {
      title: T("แบบทดสอบบุคลิกภาพแนว DISC ออนไลน์ พร้อมรายงานรายคน", "DISC-style personality test online with individual reports"),
      description: T("แบบทดสอบบุคลิกภาพแนว DISC 3 แพ็กเกจ เริ่มต้น 1,990 บาท ผลบนมือถือ รายงาน PDF รายคน และ Dashboard ภาพรวมทีม", "DISC-style personality test in 3 tiers from THB 1,990 — phone-friendly, individual PDF reports and a team dashboard."),
    },
  },
  // ───────────── 5. Training exam + certificate ─────────────
  {
    slug: "training-exam",
    group: "assessment",
    icon: "receipt",
    name: T("ข้อสอบหลังอบรม + เกียรติบัตรอัตโนมัติ", "Post-training exam + automatic certificate"),
    oneLiner: T("สแกน QR สอบบนมือถือ ผ่านเกณฑ์ได้เกียรติบัตร PDF ทางอีเมลทันที", "Scan a QR, take the exam on a phone, get a PDF certificate by email when you pass."),
    forWho: T("ฝ่ายฝึกอบรมและ HR ที่ต้องมีทะเบียนผู้อบรมไว้ใช้ตอน Audit", "Training and HR teams that need an attendee register for audits."),
    popular: 1,
    tiers: [
      { name: T("1 หลักสูตร", "1 course"), price: 300, days: 2, revisions: 2, includesPrevious: false, items: [
        ["1 หลักสูตร ข้อสอบไม่เกิน 20 ข้อ", "1 course, up to 20 questions"], ["สุ่มข้อ + เกณฑ์ผ่าน", "Random order + pass mark"], ["เกียรติบัตร PDF ส่งทางอีเมล", "PDF certificate by email"], ["ทะเบียนผู้อบรมใน Google Sheets", "Attendee register in Google Sheets"] ] },
      { name: T("หลายหลักสูตร", "Multiple courses"), price: 1990, days: 7, revisions: 3, includesPrevious: true, items: [
        ["ไม่เกิน 5 หลักสูตร", "Up to 5 courses"], ["Pre / Post-test เทียบคะแนนก่อน–หลัง", "Pre / post-test score comparison"], ["สอบซ่อม", "Re-sit exams"], ["แจ้ง HR ทาง LINE", "HR notified via LINE"], ["ใช้แบบเกียรติบัตรของบริษัท", "Your own certificate design"] ] },
      { name: T("ศูนย์อบรมครบ", "Full training centre"), price: 7990, days: 14, revisions: 3, includesPrevious: true, items: [
        ["ไม่จำกัดจำนวนหลักสูตร", "Unlimited courses"], ["เลขที่เกียรติบัตร + QR ตรวจสอบ", "Certificate number + verification QR"], ["Dashboard ชั่วโมงอบรมรายคน / แผนก", "Training-hours dashboard per person / department"], ["Export รายงานสำหรับ Audit", "Audit report export"], ["ดูแลหลังส่งมอบ 30 วัน", "30 days of support"] ] },
    ],
    excludes: T("การเขียนข้อสอบ (ลูกค้าส่งข้อสอบพร้อมเฉลย หรือจ้างเขียนเพิ่ม) และการออกแบบเกียรติบัตรใหม่ทั้งหมด", "Writing the exam questions (you supply them with answers, or add that service) and designing a brand-new certificate."),
    cover: "/catalog/training-exam-cover.webp",
    samples: ["/catalog/training-exam-1.webp", "/catalog/training-exam-2.webp", "/catalog/training-exam-3.webp"],
    related: ["gmp-3d-video", "logical-test"],
    seo: {
      title: T("ระบบสอบหลังอบรมออนไลน์ ออกเกียรติบัตร PDF อัตโนมัติ", "Online post-training exam with automatic PDF certificates"),
      description: T("ข้อสอบ Pre/Post-test บนมือถือ ผ่านเกณฑ์ออกเกียรติบัตรทางอีเมล 3 แพ็กเกจ เริ่มต้น 300 บาท พร้อมทะเบียนผู้อบรมสำหรับ Audit", "Pre / post-tests on phones with emailed certificates — 3 tiers from THB 300, plus an attendee register for audits."),
    },
  },
  // ───────────── 6. Document alerts ─────────────
  {
    slug: "doc-alert",
    fastworkUrl: "https://fastwork.co/user/hrsolutionservice/ai-automation-20148469",
    group: "hr-automation",
    icon: "calendar",
    name: T("ระบบแจ้งเตือนเอกสาร / สัญญาหมดอายุ", "Document & contract expiry alerts"),
    oneLiner: T("บันทึกเอกสารใน Google Sheets ระบบเตือนล่วงหน้าทางอีเมลหรือ LINE ไม่พลาดวันหมดอายุ", "Log documents in Google Sheets; get warned ahead by email or LINE and never miss an expiry."),
    forWho: T("งานธุรการ จัดซื้อ HR ที่ดูแลสัญญา ใบอนุญาต บัตรประชาชน และใบขับขี่", "Admin, purchasing and HR teams tracking contracts, permits, ID cards and driving licences."),
    popular: 1,
    tiers: [
      { name: T("เตือน 1 รอบ", "1 reminder"), price: 399, days: 1, revisions: 2, includesPrevious: false, items: [
        ["ทะเบียนเอกสารใน Google Sheets", "Document register in Google Sheets"], ["เตือนล่วงหน้า 1 รอบ", "One reminder ahead of expiry"], ["ส่งอีเมลหรือ LINE 1 ช่องทาง", "Email or LINE (one channel)"] ] },
      { name: T("เตือนหลายรอบ", "Multiple reminders"), price: 1990, days: 5, revisions: 10, includesPrevious: true, items: [
        ["ไม่จำกัดประเภทเอกสาร", "Unlimited document types"], ["เตือน 60 / 30 / 7 วันก่อนหมดอายุ", "Reminders at 60 / 30 / 7 days"], ["ส่งตามผู้รับผิดชอบรายแถว", "Sent to the owner of each row"], ["สีบอกสถานะ + สรุปรายสัปดาห์", "Colour status + weekly digest"] ] },
      { name: T("ทะเบียนเอกสารครบ", "Full document register"), price: 5990, days: 10, revisions: 20, includesPrevious: true, items: [
        ["ฟอร์มบันทึกและแนบไฟล์ใน Drive", "Entry form with Drive attachments"], ["ย้ายรายการเก่าเข้า Archive", "Auto-archive of old items"], ["แยกผู้รับตามแผนก", "Recipients by department"], ["Dashboard ภาพรวม", "Overview dashboard"], ["ดูแลหลังส่งมอบ 30 วัน", "30 days of support"] ] },
    ],
    excludes: T("การกรอกข้อมูลเอกสารเดิมทั้งหมด (มีบริการนำเข้าจาก Excel เพิ่มได้)", "Typing in all existing documents (an Excel import service can be added)."),
    cover: "/catalog/doc-alert-cover.webp",
    samples: ["/catalog/doc-alert-1.webp", "/catalog/doc-alert-2.webp", "/catalog/doc-alert-3.webp"],
    related: ["probation", "chatbot-faq"],
    seo: {
      title: T("ระบบแจ้งเตือนเอกสารหมดอายุ สัญญา ใบขับขี่ ด้วย Google Sheets", "Document & contract expiry alert system on Google Sheets"),
      description: T("ระบบเตือนสัญญาและเอกสารหมดอายุผ่านอีเมลหรือ LINE 3 แพ็กเกจ เริ่มต้น 399 บาท เตือนหลายรอบ แยกผู้รับผิดชอบ มี Dashboard", "Expiry reminders by email or LINE in 3 tiers from THB 399 — multiple reminders, per-owner routing and a dashboard."),
    },
  },
  // ───────────── 7. Probation ─────────────
  {
    slug: "probation",
    fastworkUrl: "https://fastwork.co/user/hrsolutionservice/chatbot-33967471",
    group: "hr-automation",
    icon: "clock",
    name: T("ระบบเตือนครบกำหนดทดลองงาน 45 / 90 วัน", "Probation reminders at day 45 / 90"),
    oneLiner: T("กรอกวันเริ่มงานครั้งเดียว ระบบนับวันและเตือน HR กับหัวหน้าก่อนถึงรอบประเมิน", "Enter the start date once; the system counts days and prompts HR and managers before each review."),
    forWho: T("HR ที่ดูแลพนักงานใหม่หลายคน และไม่อยากพลาดวันตัดสินผลทดลองงาน", "HR teams managing many new hires who can't afford to miss a probation decision date."),
    popular: 1,
    tiers: [
      { name: T("แจ้งเตือน", "Reminders"), price: 1500, days: 3, revisions: 2, includesPrevious: false, items: [
        ["Google Sheets พนักงานทดลองงาน", "Probation tracker in Google Sheets"], ["นับวันอัตโนมัติ", "Automatic day counting"], ["เตือน HR + หัวหน้า ตั้งรอบได้ เช่น 45 / 90 วัน", "Reminders to HR + manager, configurable (e.g. 45 / 90 days)"], ["ส่งทางอีเมลหรือ LINE", "By email or LINE"] ] },
      { name: T("+ แบบประเมิน", "+ Evaluation form"), price: 3990, days: 7, revisions: 3, includesPrevious: true, items: [
        ["ส่งแบบประเมินให้หัวหน้าอัตโนมัติ", "Evaluation form sent to the manager automatically"], ["เตือนซ้ำจนกว่าจะประเมิน", "Repeat reminders until it is done"], ["บันทึกคะแนน", "Scores recorded"], ["HR กดรับทราบผล", "HR acknowledges the result"] ] },
      { name: T("Web App ครบวงจร", "Full web app"), price: 8990, days: 14, revisions: 3, includesPrevious: true, items: [
        ["Web App รับพนักงานใหม่", "Onboarding web app"], ["อีเมลต้อนรับอัตโนมัติ", "Automatic welcome email"], ["Dashboard ทดลองงานทั้งบริษัท", "Company-wide probation dashboard"], ["สิทธิ์ผู้ใช้ HR / หัวหน้า", "HR / manager roles"], ["ดูแลหลังส่งมอบ 30 วัน", "30 days of support"] ] },
    ],
    excludes: T("การออกแบบเกณฑ์ประเมินใหม่ (ใช้แบบฟอร์มเดิมของลูกค้า) และการเชื่อมกับระบบเงินเดือน", "Designing new evaluation criteria (your existing form is used) and payroll integration."),
    cover: "/catalog/probation-cover.webp",
    samples: ["/catalog/probation-1.webp", "/catalog/probation-2.webp", "/catalog/probation-3.webp"],
    related: ["doc-alert", "disc-style"],
    seo: {
      title: T("ระบบแจ้งเตือนครบกำหนดทดลองงาน 45/90 วัน พร้อมแบบประเมินหัวหน้า", "Probation 45/90-day reminders with manager evaluation forms"),
      description: T("ระบบนับวันทดลองงานและเตือน HR กับหัวหน้า 3 แพ็กเกจ เริ่มต้น 1,500 บาท ส่งแบบประเมินอัตโนมัติ และ Web App รับพนักงานใหม่", "Probation date tracking with HR and manager reminders in 3 tiers from THB 1,500 — automatic evaluation forms and an onboarding web app."),
    },
  },
  // ───────────── 8. Guard / cleaner logbook ─────────────
  {
    slug: "guard-system",
    fastworkUrl: "https://fastwork.co/user/hrsolutionservice/mobile-application-28320226",
    group: "hr-automation",
    icon: "shield",
    name: T("ระบบบันทึกงาน รปภ. และแม่บ้านบนมือถือ", "Mobile logbook for security & cleaning crews"),
    oneLiner: T("ลงเวลา ตรวจจุด GPS บันทึกรูป แจ้งเตือนเข้า LINE พร้อมรายงานรายเดือน", "Check-ins, GPS patrol points, photos and LINE alerts with monthly reports."),
    forWho: T("บริษัทรักษาความปลอดภัยและบริษัทแม่บ้านที่ต้องส่งรายงานให้ลูกค้าประจำเดือน", "Security and cleaning companies that report to clients every month."),
    popular: 1,
    tiers: [
      { name: T("ลงเวลา + ตรวจจุด", "Check-in + patrol"), price: 3990, days: 5, revisions: 2, includesPrevious: false, items: [
        ["1 หน่วยงาน", "1 site"], ["เข้า–ออกงานด้วย GPS + รูปถ่าย", "GPS + photo check-in / out"], ["ตรวจจุดไม่เกิน 10 จุด", "Up to 10 patrol points"], ["บันทึกใน Google Sheets + คู่มือ", "Saved to Google Sheets + guide"] ] },
      { name: T("ระบบครบ + แจ้งเตือน LINE", "Full system + LINE alerts"), price: 7990, days: 10, revisions: 3, includesPrevious: true, items: [
        ["ตรวจจุดไม่เกิน 30 จุด", "Up to 30 patrol points"], ["บันทึกรถเข้า–ออก", "Vehicle in / out log"], ["แจ้งเตือน LINE แบบ Flex", "LINE Flex alerts"], ["รายงาน PDF รายเดือน + Auto archive", "Monthly PDF report + auto-archive"], ["สอนใช้งาน 1 ชั่วโมง + ดูแล 30 วัน", "1-hour training + 30 days of support"] ] },
      { name: T("หลายหน่วยงาน + แม่บ้าน", "Multi-site + cleaning module"), price: 14990, days: 21, revisions: 5, includesPrevious: true, items: [
        ["ไม่เกิน 5 หน่วยงาน", "Up to 5 sites"], ["โมดูลงานแม่บ้าน", "Cleaning-crew module"], ["PDF แยกรายหน่วยงาน + LINE แยกกลุ่ม", "Per-site PDFs + separate LINE groups"], ["ใส่โลโก้บริษัท", "Your company logo"], ["ดูแลหลังส่งมอบ 60 วัน", "60 days of support"] ] },
    ],
    excludes: T("โมดูลแม่บ้านในแพ็กเกจ Basic และ Standard (มีเฉพาะ Premium)", "The cleaning module in Basic and Standard (Premium only)."),
    note: T("ค่า LINE OA แบบเสียเงิน (ถ้ามี) ลูกค้าเป็นผู้ชำระ", "Paid LINE OA fees, if any, are paid by the client."),
    cover: "/catalog/guard-cover.webp",
    samples: ["/catalog/guard-1.webp", "/catalog/guard-2.webp", "/catalog/guard-3.webp"],
    related: ["doc-alert", "probation"],
    seo: {
      title: T("ระบบบันทึกงาน รปภ. แม่บ้าน ตรวจจุด GPS แจ้งเตือน LINE", "Security & cleaning crew logbook with GPS patrol and LINE alerts"),
      description: T("ระบบลงเวลา ตรวจจุด บันทึกรูป และรายงาน PDF รายเดือนสำหรับบริษัท รปภ. และแม่บ้าน 3 แพ็กเกจ เริ่มต้น 3,990 บาท", "Check-in, patrol points, photos and monthly PDF reports for security and cleaning firms — 3 tiers from THB 3,990."),
    },
  },
  // ───────────── 9. Chatbot FAQ ─────────────
  {
    slug: "chatbot-faq",
    fastworkUrl: "https://fastwork.co/user/hrsolutionservice/chatbot-45433275",
    group: "chatbot",
    icon: "chat",
    name: T("Chatbot FAQ บน LINE OA", "FAQ chatbot on LINE OA"),
    oneLiner: T("ตอบคำถามที่ลูกค้าถามบ่อยตลอด 24 ชม. ส่งต่อแอดมินเมื่อจำเป็น และบันทึกทุกแชต", "Answers frequent questions 24/7, hands over to an admin when needed and logs every chat."),
    forWho: T("ร้านค้าและธุรกิจที่ตอบแชตซ้ำ ๆ ทุกวัน และอยากแก้คำตอบเองได้ใน Google Sheets", "Shops and businesses answering the same chats daily who want to edit answers in Google Sheets."),
    popular: 1,
    tiers: [
      { name: T("FAQ ไม่ใช้ AI", "FAQ without AI"), price: 1500, days: 3, revisions: 2, includesPrevious: false, items: [
        ["ไม่ใช้ AI", "No AI"], ["FAQ ไม่เกิน 30 คำถาม + Quick Reply", "Up to 30 FAQs + quick replies"], ["Rich Menu 6 ปุ่ม", "6-button Rich Menu"], ["แก้คำตอบเองใน Google Sheets", "Edit answers yourself in Google Sheets"] ] },
      { name: T("AI ตอบจากข้อมูลร้าน", "AI from your own data"), price: 4990, days: 7, revisions: 3, includesPrevious: true, items: [
        ["AI ตอบจากข้อมูลบริษัทไม่เกิน 100 รายการ", "AI answers from up to 100 items of your company data"], ["ปุ่มคุยกับแอดมิน + แจ้งทีมทาง LINE", "“Talk to admin” button + team alert on LINE"], ["บันทึกแชตลง Google Sheets", "Chat log saved to Google Sheets"] ] },
      { name: T("AI + แคตตาล็อก", "AI + catalogue"), price: 7990, days: 14, revisions: 3, includesPrevious: true, items: [
        ["แคตตาล็อกสินค้าพร้อมรูป", "Product catalogue with photos"], ["ใบเสนอราคา Flex อัตโนมัติ", "Automatic Flex quotation"], ["จำบริบทแชตรายลูกค้า", "Per-customer chat memory"], ["ดูแลหลังส่งมอบ 30 วัน", "30 days of support"] ] },
    ],
    excludes: T("ค่าเซิร์ฟเวอร์ n8n (ถ้าไม่มี มีบริการเสริม) และการเขียนข้อมูลสินค้าทั้งหมดให้", "n8n server cost (an add-on is available) and writing all your product data for you."),
    note: T("ค่า AI Model (เช่น OpenRouter / OpenAI) และค่า LINE OA แบบเสียเงิน ลูกค้าเป็นผู้ชำระตามที่ตกลงกันก่อนเริ่มงาน แพ็กเกจ Basic ไม่มีค่า AI", "AI model fees (e.g. OpenRouter / OpenAI) and paid LINE OA fees are paid by the client as agreed before work starts. The Basic tier has no AI cost."),
    cover: "/catalog/chatbot-faq-cover.webp",
    samples: ["/catalog/chatbot-faq-1.webp", "/catalog/chatbot-faq-2.webp", "/catalog/chatbot-faq-3.webp"],
    related: ["doc-alert", "logical-test"],
    seo: {
      title: T("ทำแชตบอท LINE OA ตอบคำถามลูกค้าอัตโนมัติ FAQ / AI พร้อมส่งต่อแอดมิน", "LINE OA FAQ / AI chatbot with admin hand-over"),
      description: T("แชตบอท LINE 3 แพ็กเกจ เริ่มต้น 1,500 บาท FAQ ไม่ใช้ AI หรือ AI ตอบจากข้อมูลธุรกิจ แจ้งทีมเมื่อลูกค้าต้องการคุยกับคน", "LINE chatbot in 3 tiers from THB 1,500 — FAQ without AI or AI answering from your business data, with team alerts on hand-over."),
    },
  },
];

export function getFwProduct(slug: string) {
  return fwProducts.find((product) => product.slug === slug);
}

export function productsInGroup(group: GroupId) {
  return fwProducts.filter((product) => product.group === group);
}

export function fromPrice(product: FwProduct) {
  return product.quote ? product.quote.from : Math.min(...product.tiers.map((tier) => tier.price));
}

/** "/year" suffix for quote-based yearly products, empty otherwise. */
export function pricePer(product: FwProduct, locale: "th" | "en") {
  return product.quote ? product.quote.per[locale] : "";
}

export function formatPrice(value: number) {
  return value.toLocaleString("en-US");
}
