// ─── Home page content (redesign 2026) ───
// Copy for the dark "studio" home page. Prices come from catalog-data.ts so they always match Fastwork.
// Facts here are from the owner's profile and in-house system records. Do NOT add turnover-reduction
// figures (the owner asked for them to be left out everywhere).

type L = { th: string; en: string };
const T = (th: string, en: string): L => ({ th, en });

export const homeHero = {
  badge: "n8n Certified",
  studio: T("HR Studio · Thailand", "HR Studio · Thailand"),
  lines: [T("งาน HR ส่วนใหญ่", "Most HR work"), T("ยังทำด้วยมือ", "is still done by hand."), T("นั่นคือทางเลือก", "That is a choice.")] as const,
  sub: T(
    "HR Solution Service รวมสื่ออบรม 3D แบบทดสอบ HR และระบบอัตโนมัติไว้ในที่เดียว ออกแบบโดยผู้บริหาร HR โรงงาน 15 ปี ที่เขียนระบบเองได้",
    "HR Solution Service brings 3D training media, HR assessments and automation under one roof — designed by a factory HR manager of 15 years who also writes the code.",
  ),
  sub2: T("งานส่วนใหญ่จบตอนส่งมอบ ระบบของเราถูกสร้างให้ใช้ได้ทุกวัน", "Most work ends at hand-over. Ours is built to be used every day."),
  ctaWork: T("ดูผลงานของเรา", "View our work"),
  ctaServices: T("เราทำอะไรบ้าง", "What we do"),
  faces: [
    ["⚙️", "Apps Script"],
    ["🎬", T("สื่ออบรม 3D", "3D training")],
    ["🧠", T("แบบทดสอบ", "Assessments")],
    ["💬", "LINE · n8n"],
  ] as const,
  scroll: T("เลื่อนลง", "Scroll"),
};

export const homeMarquee: readonly L[] = [
  T("สื่ออบรม 3D", "3D training media"), T("แบบทดสอบ HR", "HR assessments"), T("ระบบอัตโนมัติ", "Automation"),
  T("GMP Food Safety", "GMP Food Safety"), T("Chatbot LINE", "LINE chatbots"), T("คลิปสอนใช้งาน", "How-to videos"),
];

export type CaseCat = "3d" | "short" | "soft";
export type HomeCase = {
  cat: CaseCat;
  tags: readonly string[];
  title: L;
  claim: L;
  body: L;
  /** YouTube ids; vertical = 9:16 Shorts */
  videos: readonly { id: string; label: L }[];
  layout: "single" | "duo" | "stack";
  vertical?: boolean;
};

export const homeWork = {
  eyebrow: T("ผลงานคัดสรร", "Selected work"),
  title: [T("ของจริง", "Real work,"), T("ใช้งานจริง", "in real use")] as const,
  filters: [
    ["all", T("ทั้งหมด", "All")],
    ["3d", T("สื่ออบรม 3D", "3D training")],
    ["short", T("Short", "Shorts")],
    ["soft", T("สอนใช้งานโปรแกรม", "Software how-to")],
  ] as const,
  cases: [
    {
      cat: "3d", tags: ["สื่ออบรม", "3D", "16:9"], layout: "single",
      title: T("GMP กับ GHPs", "GMP vs GHPs"),
      claim: T("บางกฎ ต้องเห็นภาพ ถึงจะจำได้", "Some rules only stick once you see them"),
      body: T("ไขความเข้าใจผิด 5 ข้อเรื่องมาตรฐาน GMP และ GHPs ด้วยตัวละคร 3D เล่าเป็นเรื่อง ใช้เปิดในห้องอบรมพนักงานใหม่ได้ทันที",
        "Five common misconceptions about GMP and GHPs, told as a story with 3D characters — ready to play in a new-staff training room."),
      videos: [{ id: "wXO3-wPOyhk", label: T("GMP กับ GHPs ความเข้าใจผิด 5 ข้อ", "GMP vs GHPs: 5 misconceptions") }],
    },
    {
      cat: "3d", tags: ["กฎหมายแรงงาน", "3D", "16:9"], layout: "single",
      title: T("มรท. ห้องน้ำโรงงาน", "Thai Labour Standard: toilets"),
      claim: T("ข้อกฎหมายยาวหนึ่งหน้า สรุปให้เข้าใจในไม่กี่นาที", "A page of regulation, clear in minutes"),
      body: T("มาตรฐานแรงงานไทยกำหนดจำนวนห้องน้ำอย่างไร อธิบายด้วยภาพ 3D และอ้างอิงข้อกำหนดจริง",
        "How the Thai Labour Standard sets the number of factory toilets — explained in 3D and tied to the actual clauses."),
      videos: [{ id: "Ycn8a4AeDCY", label: T("มรท. โรงงานต้องมีห้องน้ำกี่ห้อง", "How many toilets must a factory have?") }],
    },
    {
      cat: "short", tags: ["Short", "9:16", "GMP 420"], layout: "duo", vertical: true,
      title: T("คลิปสั้นบนมือถือ", "Shorts for the phone"),
      claim: T("พนักงานดูจบในหนึ่งนาที", "Watched to the end in a minute"),
      body: T("ใส่แหวนเข้าไลน์ผลิตได้ไหม และล้างมือ 5 วินาทีสะอาดพอไหม ส่งต่อในกลุ่ม LINE ของโรงงานได้ทันที",
        "Can you wear a ring on the line? Is a 5-second hand wash enough? Ready to share in the factory LINE group."),
      videos: [
        { id: "qfpygdPSu9I", label: T("ใส่แหวนเข้าไลน์ผลิตได้ไหม", "Rings on the production line?") },
        { id: "OV1kzqDZPa4", label: T("ล้างมือ 5 วิ สะอาดพอไหม", "Is a 5-second hand wash enough?") },
      ],
    },
    {
      cat: "soft", tags: ["สอนใช้งาน", "เสียงบรรยาย", "ทีละขั้น"], layout: "stack",
      title: T("สอนใช้งานทีละขั้น", "Step-by-step how-to"),
      claim: T("คู่มือที่คนดูจบจริง", "The manual people actually finish"),
      body: T("ขึ้นทะเบียนว่างงาน ม.33 และยื่นภาษีออนไลน์ อธิบายทีละหน้าจอพร้อมเสียงบรรยาย ใช้แนวเดียวกันกับระบบ ERP หรือโปรแกรมภายในบริษัทคุณ",
        "Registering for unemployment benefit and filing tax online, screen by screen with narration — the same approach works for your ERP or in-house software."),
      videos: [
        { id: "qm7BSPrEZNo", label: T("ขึ้นทะเบียนว่างงานออนไลน์ 2569", "Unemployment registration online") },
        { id: "qDbCb-otK5U", label: T("ยื่นภาษีออนไลน์ 2570", "Filing personal income tax online") },
      ],
    },
  ] satisfies readonly HomeCase[],
};

/** A service line: either an on-site product page (slug) or a Fastwork-only listing (url + price). */
export type ServiceItem = { slug: string } | { label: L; url: string; from: number };

export const homeServices = {
  eyebrow: T("บริการ", "Services"),
  title: [T("ลึกในงาน", "Deep craft,"), T("ครบในที่เดียว", "one roof")] as const,
  body: T("ทุกงานคุยขอบเขตก่อน แล้วเสนอราคาตามงานจริง ไม่บวกฟีเจอร์ที่ไม่จำเป็น", "Every job starts with a scope talk and a quote for the real work — no features you don't need."),
  quote: T("ขอใบเสนอราคา", "Request a quote"),
  from: T("เริ่ม", "from"),
  columns: [
    {
      title: T("สื่ออบรมและคู่มือ", "Training media & manuals"),
      items: [
        { slug: "gmp-3d-video" }, { slug: "software-video" },
        { label: T("คู่มือการใช้งาน Word + PDF", "User manual, Word + PDF"), url: "https://fastwork.co/user/hrsolutionservice/typing-and-data-entry-28623650", from: 499 },
      ],
    },
    {
      title: T("แบบทดสอบและเครื่องมือ HR", "Assessments & HR tools"),
      items: [
        { slug: "logical-test" }, { slug: "disc-style" },
        { label: T("ไฟล์ HR สำเร็จรูป Excel + PDPA", "Ready-made HR files, Excel + PDPA"), url: "https://fastwork.co/user/hrsolutionservice/typing-and-data-entry-80354780", from: 250 },
      ],
    },
    {
      title: T("ระบบอัตโนมัติ", "Automation"),
      items: [{ slug: "probation" }, { slug: "guard-system" }, { slug: "chatbot-faq" }, { slug: "doc-alert" }],
    },
  ] satisfies readonly { title: L; items: readonly ServiceItem[] }[],
};

export const homeApproach = {
  eyebrow: T("วิธีทำงาน", "How we work"),
  title: [T("คิดก่อน", "We think first."), T("แล้วค่อยสร้าง", "Then we build.")] as const,
  steps: [
    { k: T("คุยโจทย์", "Brief"), title: T("เข้าใจงานก่อนเขียนระบบ", "Understand the work before the code"),
      body: T("เล่าปัญหาผ่าน LINE หรืออีเมล เราถามแบบคนที่เคยทำงาน HR และฝ่ายผลิตจริง ถ้าปัญหาไม่ต้องใช้ระบบ เราก็บอกตรงๆ",
        "Tell us the problem on LINE or by email. We ask the questions of someone who has worked in HR and production — and if you don't need a system, we say so.") },
    { k: T("เสนอแนวทาง", "Proposal"), title: T("ขอบเขตชัด ราคาชัด", "Clear scope, clear price"),
      body: T("ได้ใบเสนอราคาพร้อมระยะเวลาและสิ่งที่จะได้รับ จ้างในนามบริษัทได้ หรือจ้างผ่าน Fastwork ที่ถือเงินกลางไว้จนคุณอนุมัติงาน",
        "A quotation with timeline and deliverables. Hire us as a company, or through Fastwork, which holds payment until you approve the work.") },
    { k: T("สร้างและทดสอบ", "Build & test"), title: T("เห็นตัวอย่างก่อนส่งจริง", "See it before it ships"),
      body: T("ทดสอบกับข้อมูลของคุณ บน Google Workspace และ LINE ที่องค์กรมีอยู่แล้ว ค่าใช้จ่ายรายเดือนจึงต่ำ",
        "Tested with your data on the Google Workspace and LINE you already have, so running costs stay low.") },
    { k: T("ส่งมอบและต่อยอด", "Hand-over"), title: T("ใช้ได้ทุกวัน ไม่ใช่แค่วันส่งงาน", "Used every day, not just on launch day"),
      body: T("ส่งมอบพร้อมคู่มือและคลิปสอนใช้งาน สอนทีมของคุณ และดูแลหลังส่งมอบตามแพ็กเกจ",
        "Delivered with a manual and how-to video, your team trained, and support after hand-over as per the package.") },
  ],
};

export const homeStats = {
  eyebrow: T("ตัวเลขที่อยู่เบื้องหลัง", "Behind the work"),
  title: [T("ประสบการณ์", "Experience"), T("ที่จับต้องได้", "you can count")] as const,
  items: [
    { to: 17, suffix: "+", label: T("ปีในโรงงานผลิต บรรจุภัณฑ์และอาหาร", "years in packaging and food factories") },
    { to: 1000, suffix: "+", label: T("พนักงานในองค์กรที่เคยดูแล", "employees in organisations we've run HR for") },
    { to: 15, suffix: "+", label: T("ระบบ HR ที่สร้างและใช้งานจริง", "HR systems built and in real use") },
    { to: 100, suffix: "%", label: T("ออกแบบและสร้างเองทุกขั้นตอน", "designed and built in-house") },
  ],
};

export type LabSystem = { icon: string; name: L; group: L; flow: readonly L[]; tools: readonly string[] };

export const homeLab = {
  eyebrow: T("ห้องระบบ · The Lab", "The Lab"),
  title: [T("ระบบที่เราใช้จริง", "Systems we actually run."), T("ลองกดดูได้", "Click around.")] as const,
  body: T("กดไอคอนเพื่อเปิดดูว่าแต่ละระบบทำงานอย่างไร ทุกระบบปรับให้เข้ากับองค์กรของคุณได้", "Open any icon to see how the system works. Each one can be adapted to your organisation."),
  systemNo: T("ระบบที่", "System"),
  systems: [
    { icon: "📨", name: T("นัดสัมภาษณ์อัตโนมัติ", "Auto interview invites"), group: T("สรรหา", "Recruiting"), tools: ["Apps Script", "Gmail", "Sheets"],
      flow: [T('HR กดปุ่ม "นัดสัมภาษณ์" ใน Google Sheets', 'HR clicks "Invite" in Google Sheets'), T("ระบบส่งอีเมลพร้อมแผนที่ GPS และ Checklist เอกสาร", "An email goes out with a map pin and document checklist"), T("ผู้สมัครได้ข้อมูลครบ ไม่ต้องโทรถามซ้ำ", "Candidates have everything — no follow-up calls")] },
    { icon: "🗓️", name: T("สรุปนัดสัมภาษณ์รายวัน", "Daily interview digest"), group: T("สรรหา", "Recruiting"), tools: ["Apps Script", "Google Chat"],
      flow: [T("ทุกเช้ารวบรวมผู้สมัครที่นัดวันนี้", "Each morning, today's interviews are collected"), T("แยกตามแผนก พร้อมเวลาและรูปแบบออนไลน์/ออนไซต์", "Grouped by department with time and online/on-site"), T("ส่งเข้าแชตหัวหน้างานที่เกี่ยวข้อง", "Posted to each hiring manager's chat")] },
    { icon: "🧠", name: T("แบบทดสอบ Logical", "Logical test"), group: T("แบบทดสอบ", "Assessment"), tools: ["Apps Script", "Web App"],
      flow: [T("คลังข้อสอบ 300 ข้อ 3 แกน: คำนวณ ตีความ วิเคราะห์", "A 300-question bank on 3 axes: numerical, verbal, analytical"), T("สุ่มครั้งละ 20 ข้อ ตอบถูก 3 ข้อติดกันความยากเพิ่มขึ้น", "20 random questions; difficulty rises after 3 correct in a row"), T("หลังบ้านเห็นเวลาที่ใช้ต่อข้อ และข้อที่ถูกผิด", "Back office shows time per question and every right/wrong answer")] },
    { icon: "🎮", name: T("เกมเรียนรู้ผ่านด่าน", "Level-up quiz game"), group: T("แบบทดสอบ", "Assessment"), tools: ["Apps Script", "Sheets"],
      flow: [T("พนักงานเล่นเกมตอบคำถามทีละด่าน", "Staff play a quiz level by level"), T("เฉลยทันทีหลังตอบ", "Instant answers after each question"), T("สรุปคะแนนรายคนให้ HR", "Per-person scores for HR")] },
    { icon: "👋", name: T("แจ้งเตือนพนักงานใหม่", "New-hire alert"), group: T("พนักงานใหม่", "Onboarding"), tools: ["Apps Script", "Google Chat"],
      flow: [T("แจ้งทุกแผนกล่วงหน้า 2 วันก่อนวันเริ่มงาน", "Every department is told 2 days before the start date"), T("เตรียมอุปกรณ์ บัตร และอีเมลให้ทัน", "Equipment, badge and email ready in time"), T("รายงานตัวแล้วส่งการ์ดข้อมูลเข้ากลุ่ม", "On arrival, a profile card goes to the team")] },
    { icon: "💌", name: T("อีเมลต้อนรับวันแรก", "Day-one welcome email"), group: T("พนักงานใหม่", "Onboarding"), tools: ["Apps Script", "Gmail"],
      flow: [T("10.00 น. วันแรก ระบบส่งอีเมลต้อนรับ", "At 10:00 on day one, a welcome email is sent"), T("มีผู้ติดต่อ คู่มือ และนโยบายบริษัท", "Contacts, handbook and company policies inside"), T("พนักงานใหม่รู้ว่าต้องทำอะไรต่อ", "New hires know what to do next")] },
    { icon: "💬", name: T("Day-1 Check-in", "Day-1 check-in"), group: T("พนักงานใหม่", "Onboarding"), tools: ["Apps Script", "Forms"],
      flow: [T("ท้ายวันแรกส่งแบบสอบถามความรู้สึกสั้นๆ", "A short how-was-today survey at the end of day one"), T("HR เห็นปัญหาตั้งแต่วันแรก", "HR sees problems on day one"), T("แก้ไขได้ก่อนจะกลายเป็นเรื่องใหญ่", "Fixed before they grow")] },
    { icon: "🎓", name: T("แจ้งเตือนอบรมตามรอบ", "Training reminders"), group: T("อบรม", "Training"), tools: ["Apps Script", "Gmail"],
      flow: [T("ดึงแผนอบรมรายสัปดาห์", "Reads the weekly training plan"), T("เตือน HR ล่วงหน้า 5 วัน และหัวหน้า 3 กับ 1 วัน", "Reminds HR 5 days ahead and managers 3 and 1 day ahead"), T("พนักงานเข้าอบรมครบตามแผน", "Everyone attends as planned")] },
    { icon: "🏅", name: T("ใบประกาศนียบัตรอัตโนมัติ", "Auto certificates"), group: T("อบรม", "Training"), tools: ["Apps Script", "Slides", "Gmail"],
      flow: [T("พนักงานส่งคำตอบแบบทดสอบหลังอบรม", "Staff submit the post-training test"), T("ตรวจคะแนนอัตโนมัติ ผ่านเกณฑ์ออกใบ PDF", "Auto-scored; a PDF certificate on passing"), T("ส่งอีเมลให้พนักงานและหัวหน้า", "Emailed to the employee and manager")] },
    { icon: "📑", name: T("ทะเบียนเอกสารและสัญญา", "Document & contract register"), group: T("เอกสาร", "Documents"), tools: ["Apps Script", "Sheets", "Gmail"],
      flow: [T("ตรวจวันหมดอายุทุกวัน", "Checks expiry dates daily"), T("เตือนล่วงหน้า 60 / 45 / 30 วัน", "Alerts at 60 / 45 / 30 days"), T("ยังไม่ดำเนินการ เตือนซ้ำทุก 5 วัน", "Repeats every 5 days until handled")] },
    { icon: "✅", name: T("ติดตามงานทีม", "Team task tracker"), group: T("งานทีม", "Teamwork"), tools: ["Apps Script", "Google Chat"],
      flow: [T("บันทึกงานผ่าน Sidebar หรือ Web App", "Log tasks from a sidebar or web app"), T("08.00 น. สรุปงานเข้าแชตทุกวัน", "Daily summary to chat at 08:00"), T("10.00 น. เตือนงานที่เลยกำหนด", "Overdue reminders at 10:00")] },
    { icon: "⏰", name: T("แจ้งเตือนงานตามรอบ", "Scheduled reminders"), group: T("งานทีม", "Teamwork"), tools: ["Apps Script"],
      flow: [T("ตั้งรอบงาน: ทุกวันจันทร์ ทุกวันที่ 1 หรือวันเฉพาะ", "Set a cycle: every Monday, the 1st, or a set date"), T("ส่งข้อความพร้อมรูปและลิงก์เข้าแชต", "Posts a message with image and link to chat"), T("ไม่มีงานไหนถูกลืม", "Nothing gets forgotten")] },
    { icon: "📅", name: T("แจ้งเตือนจากปฏิทิน", "Calendar alerts"), group: T("งานทีม", "Teamwork"), tools: ["Apps Script", "Calendar"],
      flow: [T("ตรวจปฏิทินทุก 5–10 นาที", "Checks the calendar every 5–10 minutes"), T("กิจกรรมที่จะเริ่มใน 30 นาที ส่งรายละเอียดเข้าแชต", "Events starting in 30 minutes are posted to chat"), T("ทีมไม่พลาดนัดสำคัญ", "No missed meetings")] },
    { icon: "🔗", name: T("ดึงข้อมูลการลา", "Leave-request sync"), group: T("เชื่อมระบบ", "Integration"), tools: ["Apps Script", "API"],
      flow: [T("ดึงใบลาจากระบบภายนอกเข้าฐานข้อมูลกลาง", "Pulls leave requests from an outside system into one database"), T("แจ้งเตือนเข้าแชตทันที", "Instant chat alert"), T("รายการค้างเกิน 1–3 วัน ส่งเตือนซ้ำ", "Re-alerts items pending 1–3 days")] },
    { icon: "🔎", name: T("ตรวจจับอีเมลตามคีย์เวิร์ด", "Email keyword watch"), group: T("เชื่อมระบบ", "Integration"), tools: ["Apps Script", "Gmail", "AI"],
      flow: [T("เฝ้ากล่องอีเมลหาคำสำคัญ เช่น Customer Agreement", "Watches the inbox for key terms like Customer Agreement"), T("สรุปใจความแจ้งเตือนเข้าแชตทันที", "Posts a summary to chat at once"), T("บันทึกลงฐานข้อมูลไว้ติดตาม", "Logs it for follow-up")] },
    { icon: "🛂", name: T("Workflow อนุมัติสวัสดิการ", "Welfare approval workflow"), group: T("Workflow", "Workflow"), tools: ["Kissflow"],
      flow: [T("พนักงานยื่นขอเบิก ระบบตรวจสิทธิ์และวงเงินเอง", "Staff claim; eligibility and limits are checked automatically"), T("อนุมัติ 4 ขั้นตามสายบังคับบัญชา", "4-step approval up the reporting line"), T("อนุมัติครบออกเอกสาร PDF อัตโนมัติ", "A PDF is issued on final approval")] },
  ] satisfies readonly LabSystem[],
};

export const homeAbout = {
  eyebrow: T("เบื้องหลัง", "Behind the studio"),
  title: [T("สร้างโดยคน", "Built by someone"), T("ที่เคยนั่ง", "who has sat"), T("โต๊ะ HR จริง", "at the HR desk")] as const,
  p1: T("17 ปีในโรงงานผลิต ตั้งแต่จัดซื้อ วางแผนการผลิต จนถึงผู้บริหาร HR ในองค์กรกว่า 1,000 คน เราเจอปัญหาเดิมทุกวัน ใบสมัครล้นอีเมล ลืมวันครบทดลองงาน สัญญาหมดอายุโดยไม่มีใครรู้ และต้องสอนพนักงานใหม่ซ้ำๆ",
    "17 years in manufacturing — purchasing, production planning, then HR management in organisations of over 1,000 people. The same problems every day: inboxes full of applications, missed probation dates, contracts expiring unnoticed, and onboarding repeated by hand."),
  p2: T("ระบบทุกตัวที่เราขายจึงเริ่มจากการแก้ปัญหาของตัวเองก่อน แล้วค่อยปรับให้ธุรกิจอื่นใช้ได้", "So every system we sell started as a fix for our own problem, then was shaped for other businesses."),
  creds: [T("Senior HR Manager 15+ ปี", "Senior HR Manager, 15+ yrs"), T("วิทยากร GMP · ISO 9001/14001/45001", "Trainer: GMP · ISO 9001/14001/45001"), T("ผู้นำโปรเจกต์ย้ายฐานการผลิต", "Led a factory relocation")],
  venn: {
    human: [T("เข้าใจคน", "People"), T("ความต้องการและพฤติกรรม", "needs and behaviour")],
    system: [T("เข้าใจระบบ", "Systems"), T("ศักยภาพและข้อจำกัด", "what they can and can't do")],
    exec: [T("ทำได้จริง", "Execution"), T("ทดลองและใช้ในองค์กรมาก่อน", "proven in-house first")],
    aria: T("แผนภาพจุดแข็ง: เข้าใจคน เข้าใจระบบ และลงมือได้จริง", "Diagram: people, systems and execution overlap"),
  },
};

export const homeFaq = {
  eyebrow: T("คำถามที่พบบ่อย", "FAQ"),
  title: [T("ก่อน", "Before"), T("ตัดสินใจ", "you decide")] as const,
  items: [
    [T("ต้องมีโปรแกรมหรือเซิร์ฟเวอร์ของตัวเองไหม?", "Do we need our own software or server?"),
      T("ส่วนใหญ่ไม่ต้อง ระบบทำงานบน Google Workspace และ LINE ที่องค์กรมีอยู่แล้ว ค่าใช้จ่ายรายเดือนจึงต่ำหรือเป็นศูนย์", "Usually not. Systems run on the Google Workspace and LINE you already have, so monthly costs are low or zero.")],
    [T("จ้างในนามบริษัทและขอใบเสนอราคาได้ไหม?", "Can we hire as a company and get a quotation?"),
      T("ได้ ทักมาทาง LINE หรืออีเมลเพื่อขอใบเสนอราคา หรือจ้างผ่าน Fastwork ซึ่งถือเงินไว้จนกว่าคุณจะอนุมัติงาน", "Yes — ask on LINE or by email for a quotation, or hire through Fastwork, which holds payment until you approve the work.")],
    [T("ข้อมูลพนักงานจะปลอดภัยไหม?", "Is employee data safe?"),
      T("ข้อมูลอยู่ในบัญชีขององค์กรคุณเอง ไม่ได้เก็บที่เรา ออกแบบตามหลัก PDPA และจำกัดสิทธิ์ผู้เข้าถึงตามบทบาท", "Data stays in your organisation's own accounts, not ours — designed around PDPA with role-based access.")],
    [T("ทำสื่ออบรมเฉพาะของโรงงานเราได้ไหม?", "Can you make training media for our own factory?"),
      T("ได้ ทั้งวิดีโอ 3D อธิบายกฎ GMP ความปลอดภัย และกฎหมายแรงงาน และวิดีโอสอนใช้งานระบบของบริษัทพร้อมเสียงบรรยาย", "Yes — 3D videos on GMP, safety and labour law, and narrated how-to videos for your company systems.")],
  ] as const,
};

export const homeCta = {
  title: [T("องค์กรของคุณ", "Your organisation"), T("ควรได้มากกว่า", "deserves better than"), T("“พอใช้ได้”", "“good enough”")] as const,
  boxTitle: T("เล่าโจทย์ของคุณ", "Tell us your problem"),
  boxBody: T("ขอใบเสนอราคา หรือสอบถามความเป็นไปได้ ไม่มีค่าใช้จ่าย ตอบกลับภายในราว 2 ชั่วโมง", "Ask for a quote or check what's possible — free, with a reply in about 2 hours."),
  fastwork: T("จ้างผ่าน Fastwork", "Hire on Fastwork"),
  scanLine: T("สแกนคุยทาง LINE", "Scan to chat on LINE"),
  ask: T("คุยกับเราทาง LINE", "Chat with us on LINE"),
};
