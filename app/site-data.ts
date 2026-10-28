export type Locale = "th" | "en";

// ─── Brand (single place to tweak the final name) ───

export const brand = {
  mark: "HRS",
  name: "HR Solution Service",
  tagline: {
    th: "สื่ออบรมและระบบงาน HR สำหรับองค์กรไทย",
    en: "Training media and HR systems for Thai organizations",
  },
} as const;

export const siteUrl = "https://hr-solution-service.vercel.app";

export const contact = {
  email: "touchwich.cha@gmail.com",
  phone: "+66818121311",
  phoneDisplay: "081-812-1311",
  hours: { th: "จ-ศ 09:00–18:00 น.", en: "Mon–Fri 09:00–18:00" },
  /** LINE QR image lives in public/ — swap the file to change it. */
  lineQr: "/line-qr.jpg",
} as const;

// ─── Social channels (the YouTube channel credits this website in its bio) ───

export const channel = {
  name: "Food Safety Thailand",
  handle: "@foodsafetythailand",
  youtube: "https://www.youtube.com/@foodsafetythailand",
  tiktok: "https://www.tiktok.com/@hrsolutionservice",
  playlists: "https://www.youtube.com/@foodsafetythailand/playlists",
  gmp420Playlist: "https://www.youtube.com/playlist?list=PL4xb7oWk_9ZseVRyUhnjli0zrOOkj0JVw",
  quizPlaylist: "https://www.youtube.com/playlist?list=PLWp3qWsnq67k",
  /** Verified 2026-10-28: 15 long-form + 19 shorts. */
  videoCount: 34,
} as const;

// ─── Navigation ───

export const nav = {
  th: [
    ["หน้าแรก", ""], ["บริการ", "services"], ["ผลงานสื่อ", "portfolio"], ["วิดีโอ", "videos"],
    ["ระบบงาน HR", "hr-systems"], ["ขั้นตอน", "process"], ["เกี่ยวกับเรา", "about"], ["ติดต่อ", "contact"],
  ],
  en: [
    ["Home", ""], ["Services", "services"], ["Learning Media", "portfolio"], ["Videos", "videos"],
    ["HR Systems", "hr-systems"], ["Process", "process"], ["About", "about"], ["Contact", "contact"],
  ],
} as const;

// ─── Real, verifiable numbers only ───

// Every number here is checkable:
//   512 = distinct successful frames in "Youtube_Foodsafety 16x9 - Image Log.csv"
//         (551 logged rows · 548 success · 30 story titles · 2025-04 → 2026-10)
//    34 = videos published on the Food Safety Thailand channel
//     6 = HR systems running in real workplaces
export const proofStats = [
  { value: 512, suffix: "", label: { th: "ภาพฉากสื่ออบรมที่ผลิตจริง", en: "training frames produced" } },
  { value: 34, suffix: "", label: { th: "วิดีโอเผยแพร่บน YouTube", en: "videos published on YouTube" } },
  { value: 6, suffix: "", label: { th: "ระบบงาน HR ที่ใช้งานจริง", en: "HR systems in real use" } },
] as const;

// ─── Video library (Food Safety Thailand — 34 published videos) ───
//
// IDs, durations and grouping were read from the channel on 2026-10-28.
// Views are intentionally NOT stored: they change daily, durations do not.
// The home page shows `videos` (curated); /videos renders every `videoGroups` entry.

export type VideoItem = {
  id: string;
  aspect: "wide" | "tall";
  duration?: string;
  title: { th: string; en: string };
};

export type VideoGroup = {
  slug: string;
  eyebrow: { th: string; en: string };
  title: { th: string; en: string };
  description: { th: string; en: string };
  playlist?: string;
  videos: readonly VideoItem[];
};

/** Curated for the home page — first entry is the featured player. */
export const videos: readonly VideoItem[] = [
  {
    id: "6WkrbKnv7SA",
    aspect: "wide",
    duration: "7:04",
    title: {
      th: "GMP420 ข้อ 1.8 — ห้องบรรจุและการป้องกันการปนเปื้อนซ้ำ",
      en: "GMP420 1.8 — Packing room & recontamination control",
    },
  },
  {
    id: "0T3cIlHFhcs",
    aspect: "tall",
    duration: "9:16",
    title: {
      th: "GMP420 ข้อ 2.6 — การทำความสะอาดเครื่องมือ (แนวตั้ง)",
      en: "GMP420 2.6 — Equipment cleaning (vertical)",
    },
  },
  {
    id: "RWzfivHF0cg",
    aspect: "wide",
    duration: "8:29",
    title: {
      th: "ผลิตอาหารได้ทุกวัน แต่อาจไม่ผ่านมาตรฐานเพราะเรื่องเครื่องจักร",
      en: "Daily production still fails the standard — because of the machines",
    },
  },
  {
    id: "nmVLPBOSAMQ",
    aspect: "wide",
    duration: "8:27",
    title: {
      th: "GMP420 ข้อ 1.7 — ไขข้อสงสัยมาตรฐานโรงงานอาหาร",
      en: "GMP420 1.7 — What the clause actually requires",
    },
  },
  {
    id: "_kHF1uBlQH0",
    aspect: "wide",
    duration: "4:39",
    title: {
      th: "โรงงานไฟสลัว เสี่ยงปิดกิจการ — แสงสว่างที่คนผลิตต้องรู้",
      en: "Dim factory lighting — the cost of poor light",
    },
  },
];

// Publish dates read from each watch page on 2026-10-28 (ISO date, converted to
// the site's timezone-neutral form). Used for VideoObject structured data and
// for the "latest" ordering on /videos — never invent a date that is missing here.
export const videoPublished: Readonly<Record<string, string>> = {
  "xUx-B5UXwHc": "2026-10-28",
  "Fq6Pr2-6QbI": "2026-10-28",
  "orzPIGHbHzU": "2026-10-26",
  "oR6Pd8N28bA": "2026-10-25",
  "mXL6UEW0Yq0": "2026-10-24",
  "--vvO8UX3Oc": "2026-10-22",
  "tukNj3UaG_c": "2026-10-21",
  "iBy6hDm6wAo": "2026-10-19",
  "0pW6im2VtSg": "2026-10-17",
  "7IXFhBYK_zU": "2026-10-18",
  "I_NUAdniuf4": "2026-10-17",
  "vClgeIsX6bE": "2026-10-18",
  "h0TLcXk853E": "2026-10-16",
  "DT0SR0kTVOQ": "2026-10-11",
  "QT9w3Ua41rU": "2026-10-09",
  "_QrDP_a6pM8": "2026-09-24",
  "RWzfivHF0cg": "2026-09-19",
  "s6BsJsnHUTU": "2026-09-12",
  "NBdkCiRGJzw": "2026-08-23",
  "_kHF1uBlQH0": "2026-07-24",
  "58b6BniBg_w": "2026-07-18",
  "6WkrbKnv7SA": "2026-07-17",
  "0uOeNrh7nz0": "2026-07-12",
  "k9RVdPM4RZM": "2026-07-03",
  "o3Qe2uc-VDc": "2026-06-26",
  "rbpWjQxRRq8": "2026-06-25",
  "yumHjKvIRYo": "2026-06-20",
  "oth_TmBLdQE": "2026-06-18",
  "0T3cIlHFhcs": "2026-06-14",
  "Ek5T5TiNLhg": "2026-06-13",
  "nmVLPBOSAMQ": "2026-06-12",
  "5qTwJHTQyZU": "2026-06-12",
  "r_JeSnBx0Dw": "2026-06-08",
  "djgjUUzkm7A": "2026-06-07",
};

// ─── Full video library, grouped the way the channel is organised ───

export const videoGroups: readonly VideoGroup[] = [
  {
    slug: "gmp420",
    eyebrow: { th: "ซีรีส์หลัก · 16:9", en: "Core series · 16:9" },
    title: { th: "ซีรีส์ GMP420 ฉบับเต็ม", en: "The full GMP420 series" },
    description: {
      th: "อธิบายข้อกำหนด GMP420 ทีละข้อด้วยแอนิเมชัน 3D คลิปละ 4–10 นาที ใช้ได้ทั้งอบรมในห้องและให้พนักงานดูเองก่อนเข้าพื้นที่ผลิต",
      en: "Every GMP420 clause explained with 3D animation, 4–10 minutes each — for classroom sessions or self-paced learning before staff enter the production area.",
    },
    playlist: channel.gmp420Playlist,
    videos: [
      {
        id: "6WkrbKnv7SA",
        aspect: "wide",
        duration: "7:04",
        title: { th: "GMP420 ข้อ 1.8 — ห้องบรรจุและการป้องกันการปนเปื้อนซ้ำ", en: "GMP420 1.8 — Packing room & recontamination control" },
      },
      {
        id: "yumHjKvIRYo",
        aspect: "wide",
        duration: "4:46",
        title: { th: "GMP420 หมวด 1 — การทำความสะอาดและบำรุงรักษา", en: "GMP420 Part 1 — Cleaning and maintenance" },
      },
      {
        id: "djgjUUzkm7A",
        aspect: "wide",
        duration: "5:07",
        title: { th: "GMP420 ข้อ 1.2 — ห้ามสะสมของที่ไม่ใช้แล้วในพื้นที่ผลิต", en: "GMP420 1.2 — No unused items in the production area" },
      },
      {
        id: "r_JeSnBx0Dw",
        aspect: "wide",
        duration: "5:10",
        title: { th: "GMP420 ข้อ 1.4 — ข้อกำหนดที่คนในโรงงานมักมองข้าม", en: "GMP420 1.4 — The clause factory teams overlook most" },
      },
      {
        id: "o3Qe2uc-VDc",
        aspect: "wide",
        duration: "5:13",
        title: { th: "GMP420 ข้อ 1.4.1 — 3 เรื่องที่ต้องรู้เกี่ยวกับพื้นโรงงานผลิตอาหาร", en: "GMP420 1.4.1 — Three things to know about factory floors" },
      },
      {
        id: "k9RVdPM4RZM",
        aspect: "wide",
        duration: "8:43",
        title: { th: "GMP420 ข้อ 1.4.3 — เพดานที่ลดทั้งค่าทำความสะอาดและความเสี่ยงปนเปื้อน", en: "GMP420 1.4.3 — Ceilings that cut cleaning cost and contamination risk" },
      },
      {
        id: "nmVLPBOSAMQ",
        aspect: "wide",
        duration: "8:27",
        title: { th: "GMP420 ข้อ 1.7 — ไขข้อสงสัยมาตรฐานโรงงานอาหาร", en: "GMP420 1.7 — What the clause actually requires" },
      },
      {
        id: "0uOeNrh7nz0",
        aspect: "wide",
        duration: "6:03",
        title: { th: "GMP420 ข้อ 1.1 — กฎของโรงงานอาหาร เลือกที่ตั้งผิดชีวิตเปลี่ยน", en: "GMP420 1.1 — Choosing the right factory location" },
      },
      {
        id: "58b6BniBg_w",
        aspect: "wide",
        duration: "6:10",
        title: { th: "GMP420 ข้อ 2.1 — เครื่องมือและเครื่องจักรที่สัมผัสอาหารต้องออกแบบถูกสุขลักษณะ", en: "GMP420 2.1 — Hygienic design for food-contact equipment" },
      },
      {
        id: "NBdkCiRGJzw",
        aspect: "wide",
        duration: "5:30",
        title: { th: "วางเครื่องจักรให้ทำความสะอาดง่าย ผ่าน Audit ทุกครั้ง", en: "Lay out machinery for easy cleaning and pass every audit" },
      },
      {
        id: "s6BsJsnHUTU",
        aspect: "wide",
        duration: "10:27",
        title: { th: "GMP420 ข้อ 2.7 — บำรุงรักษาเครื่องมือให้อยู่ในสภาพดี", en: "GMP420 2.7 — Keeping equipment in good condition" },
      },
      {
        id: "_kHF1uBlQH0",
        aspect: "wide",
        duration: "4:39",
        title: { th: "โรงงานไฟสลัว เสี่ยงปิดกิจการ — แสงสว่างที่คนผลิตต้องรู้", en: "Dim factory lighting — the cost of poor light" },
      },
      {
        id: "vClgeIsX6bE",
        aspect: "wide",
        duration: "8:13",
        title: { th: "เลือกภาชนะบรรจุผิด อาหารเสียก่อนวันหมดอายุ", en: "Wrong packaging material and food spoils before its expiry date" },
      },
      {
        id: "RWzfivHF0cg",
        aspect: "wide",
        duration: "8:29",
        title: { th: "ผลิตอาหารได้ทุกวัน แต่อาจไม่ผ่านมาตรฐานเพราะเรื่องเครื่องจักร", en: "Daily production still fails the standard — because of the machines" },
      },
      {
        id: "_QrDP_a6pM8",
        aspect: "wide",
        duration: "9:48",
        title: { th: "หลังบ้านสายการผลิตอาหาร ทำไมทุกขั้นตอนต้องมีการควบคุม", en: "Behind the production line — why every step needs control" },
      },
    ],
  },
  {
    slug: "micro-learning",
    eyebrow: { th: "Micro Learning · 9:16", en: "Micro learning · 9:16" },
    title: { th: "คลิปสั้นที่พนักงานดูจนจบ", en: "Short clips staff actually finish" },
    description: {
      th: "เหตุการณ์จริงในโรงงานที่ย่อเหลือคลิปสั้น — ใช้เปิดประชุมเช้า แชร์เข้ากลุ่มทีม หรือให้พนักงานใหม่ดูก่อนเข้าพื้นที่ผลิต",
      en: "Real factory incidents compressed into short vertical clips — open a shift meeting with one, drop it in the team chat, or show it to new hires before they enter production.",
    },
    videos: [
      {
        id: "Ek5T5TiNLhg",
        aspect: "tall",
        duration: "9:16",
        title: { th: "ความลาดเอียงของพื้น อาวุธลับที่ทำให้โรงงานปลอดเชื้อรา", en: "Floor slope — the hidden weapon against mould" },
      },
      {
        id: "0T3cIlHFhcs",
        aspect: "tall",
        duration: "9:16",
        title: { th: "GMP420 ข้อ 2.6 — การทำความสะอาดเครื่องมือ", en: "GMP420 2.6 — Cleaning equipment properly" },
      },
      {
        id: "5qTwJHTQyZU",
        aspect: "tall",
        duration: "9:16",
        title: { th: "เช็คลิสต์ท่อระบายน้ำ GMP — ต้องลาดเอียงและไม่อุดตัน", en: "GMP drain checklist — sloped and never blocked" },
      },
      {
        id: "tukNj3UaG_c",
        aspect: "tall",
        duration: "9:16",
        title: { th: "แค่ความเย็นผิดพลาด อาจสูญเสียสินค้าทั้งหมด", en: "One cold-chain mistake can cost the whole batch" },
      },
      {
        id: "iBy6hDm6wAo",
        aspect: "tall",
        duration: "9:16",
        title: { th: "โรงงานปลาป่นกลิ่นเหม็นทะลักชุมชน วัดค่าได้ 18 เกินมาตรฐาน", en: "Fishmeal plant odour — the reading that broke the limit" },
      },
      {
        id: "h0TLcXk853E",
        aspect: "tall",
        duration: "9:16",
        title: { th: "ท่ออาหารที่ดูสะอาดทุกวัน แต่ข้างในซ่อนจุดที่ล้างไม่ออก", en: "Food pipes look clean — until you see inside" },
      },
      {
        id: "0pW6im2VtSg",
        aspect: "tall",
        duration: "9:16",
        title: { th: "อาหารปลอม = วัตถุดิบไม่ตรงกับฉลาก ความผิดร้ายแรงทางกฎหมาย", en: "Food fraud: ingredients that don't match the label" },
      },
      {
        id: "7IXFhBYK_zU",
        aspect: "tall",
        duration: "9:16",
        title: { th: "ประตูคลังวัตถุดิบเปิดทิ้งไว้ เสี่ยงสัตว์พาหะ", en: "Raw-material store left open — pest risk at the door" },
      },
      {
        id: "I_NUAdniuf4",
        aspect: "tall",
        duration: "9:16",
        title: { th: "GMP420 ข้อ 3.8 — ข้อมูลเพื่อการตามสอบย้อนกลับ", en: "GMP420 3.8 — Traceability that actually works" },
      },
      {
        id: "DT0SR0kTVOQ",
        aspect: "tall",
        duration: "9:16",
        title: { th: "เครื่องชั่งไม่สอบเทียบปีละครั้ง กำลังโกหกคุณ", en: "A scale that's never calibrated is lying to you" },
      },
      {
        id: "--vvO8UX3Oc",
        aspect: "tall",
        duration: "9:16",
        title: { th: "ลดเชื้ออย่างถูกวิธี และบันทึกตามหลัก GMP 3.4", en: "Reduce microbes the right way — and log it under GMP 3.4" },
      },
      {
        id: "oR6Pd8N28bA",
        aspect: "tall",
        duration: "9:16",
        title: { th: "อ่างล้างมือครบ แต่ไม่มีสบู่ เท่ากับศูนย์", en: "A hand-wash station with no soap still counts as zero" },
      },
      {
        id: "mXL6UEW0Yq0",
        aspect: "tall",
        duration: "9:16",
        title: { th: "ชั่งเป๊ะตามสูตร แต่ค่าที่ได้ไม่ตรงฉลาก", en: "Weighed to the recipe, yet the label doesn't match" },
      },
      {
        id: "rbpWjQxRRq8",
        aspect: "tall",
        duration: "9:16",
        title: { th: "รถเข็นที่ไม่ถูกล้าง ต้นเหตุโรงงานเสียใบรับรอง", en: "Trolleys nobody washes — and a lost certificate" },
      },
      {
        id: "oth_TmBLdQE",
        aspect: "tall",
        duration: "9:16",
        title: { th: "รอยร้าวที่มองไม่เห็น ต้นเหตุความเสียหายระดับล้าน", en: "The invisible crack that costs millions" },
      },
      {
        id: "QT9w3Ua41rU",
        aspect: "tall",
        duration: "9:16",
        title: { th: "ทำไมโต๊ะเตรียมอาหารต้องสูง 60 เซนติเมตร", en: "Why prep tables must stand 60 cm high" },
      },
      {
        id: "Fq6Pr2-6QbI",
        aspect: "tall",
        duration: "9:16",
        title: { th: "เห็ดเข็มทองดิบเจอเชื้อลิสทิเรีย 5 จาก 5 ตัวอย่าง", en: "Raw enoki mushrooms: Listeria in 5 of 5 samples" },
      },
    ],
  },
  {
    slug: "quiz",
    eyebrow: { th: "ควิซ · 9:16", en: "Quiz · 9:16" },
    title: { th: "เกมส์ทายภาพ GMP", en: "The GMP picture quiz" },
    description: {
      th: "ให้พนักงานทายว่าภาพนี้ผิดตรงไหน แล้วเฉลยด้วยภาพเดียวกัน — ใช้ปิดการอบรมหรือเล่นในกลุ่มไลน์ทีมได้ทันที และเป็นตัวอย่างของระบบ Gamification ที่เราออกแบบให้องค์กร",
      en: "Staff guess what is wrong in the scene, then the same clip reveals the answer — perfect as a session closer or a team LINE challenge, and a live sample of the gamification systems we build.",
    },
    playlist: channel.quizPlaylist,
    videos: [
      {
        id: "xUx-B5UXwHc",
        aspect: "tall",
        duration: "9:16",
        title: { th: "ทายซิ ภาพนี้ผิดตรงไหน? ทายถูกกี่ข้อ", en: "Spot the mistake — how many did you get right?" },
      },
      {
        id: "orzPIGHbHzU",
        aspect: "tall",
        duration: "9:16",
        title: { th: "เรียนสนุกเหมือนพิชิตด่านเกม", en: "Learning that feels like clearing a game level" },
      },
    ],
  },
];

// ─── Two service pillars ───

export const servicePillars = [
  {
    id: "media",
    eyebrow: { th: "เสาหลักที่ 1 — สื่ออบรม", en: "Pillar 01 — Learning media" },
    title: { th: "สื่ออบรมและ E-Learning", en: "Training media & E-Learning" },
    pain: {
      th: "อบรม GMP กี่รอบ พนักงานก็ยังจำไม่ได้?",
      en: "Trained GMP again and again — and it still doesn't stick?",
    },
    intro: {
      th: "เราเปลี่ยนข้อกำหนดในกระดาษให้เป็นฉากภาพ 3D ที่เล่าเป็นเรื่อง ผลิตแล้วกว่า 500 เฟรม ครอบคลุม 10 โมดูล Food Safety พร้อมวิดีโอเผยแพร่จริง 34 คลิปบน YouTube",
      en: "We turn paper regulations into story-driven 3D scenes — 500+ frames across 10 food-safety modules, with 34 videos published on YouTube.",
    },
    items: [
      ["01", { th: "ชุดภาพเล่าเรื่อง GMP / Safety", en: "GMP / safety story scenes" }, {
        th: "จำลองเหตุการณ์ในโรงงานด้วยตัวละคร 3D ให้พนักงานเห็นภาพความเสี่ยงและวิธีปฏิบัติที่ถูกต้อง",
        en: "Simulate real factory situations with 3D characters so teams see both the risk and the right practice.",
      }],
      ["02", { th: "E-Learning Visuals", en: "E-Learning visuals" }, {
        th: "เปลี่ยนคู่มือ มาตรฐาน และ SOP ให้เป็นบทเรียนภาพที่พร้อมใช้อบรมภายในองค์กร",
        en: "Turn manuals, standards, and SOPs into visual lessons ready for internal training.",
      }],
      ["03", { th: "วิดีโอจอกว้างและแนวตั้ง", en: "Widescreen & vertical video" }, {
        th: "ออกแบบตั้งแต่สตอรีบอร์ดจนถึงวิดีโอเผยแพร่จริง ทั้ง 16:9 สำหรับห้องอบรม และ 9:16 สำหรับมือถือ",
        en: "From storyboard to published video — 16:9 for the training room, 9:16 for mobile.",
      }],
      ["04", { th: "Infographic / สื่อปฐมนิเทศ", en: "Infographics / orientation media" }, {
        th: "จัดระเบียบนโยบาย ขั้นตอน และสิ่งที่พนักงานใหม่ต้องรู้ ให้อ่านเข้าใจได้ในครั้งเดียว",
        en: "Structure policies, procedures, and new-hire essentials so they land on the first read.",
      }],
    ],
    href: "portfolio",
    cta: { th: "ดูผลงานสื่อ", en: "View media work" },
  },
  {
    id: "systems",
    eyebrow: { th: "เสาหลักที่ 2 — ระบบงาน HR", en: "Pillar 02 — HR systems" },
    title: { th: "ระบบงาน HR อัตโนมัติ", en: "HR automation systems" },
    pain: {
      th: "งานเอกสาร HR ที่วนซ้ำทุกเดือน ไม่ควรต้องทำมือทุกขั้น",
      en: "Repetitive monthly HR admin shouldn't be done by hand.",
    },
    intro: {
      th: "คัดใบสมัคร รับพนักงานใหม่ ติดตามประเมิน เตือนสัญญาหมดอายุ — สร้างบนเครื่องมือ Google Workspace ที่องค์กรมีอยู่แล้ว ใช้งานจริงแล้ว 6 ระบบ",
      en: "Screening, onboarding, evaluations, contract reminders — built on the Google Workspace your team already has. Six systems in real use.",
    },
    items: [
      ["01", { th: "คัดกรองใบสมัครอัตโนมัติ", en: "Automated resume screening" }, {
        th: "อ่านอีเมลสมัครงาน แยกตำแหน่ง จัดเก็บไฟล์ และแจ้งเตือนทีมโดยไม่ต้องเปิดอ่านเอง",
        en: "Reads application emails, sorts by position, files attachments, and alerts the team.",
      }],
      ["02", { th: "Onboarding และทดลองงาน", en: "Onboarding & probation" }, {
        th: "ตั้งแต่ขออัตรากำลัง อีเมลต้อนรับ จนถึงเตือนประเมินทดลองงานตามกำหนดอัตโนมัติ",
        en: "From manpower requests and welcome emails to automatic probation-review reminders.",
      }],
      ["03", { th: "ประเมินผล KPI / Competency", en: "KPI / competency evaluation" }, {
        th: "เก็บคะแนนออนไลน์พร้อมสายอนุมัติ ล็อกผล และรายงานสรุป ตรวจสอบย้อนหลังได้",
        en: "Online scoring with approval chains, locked results, reports, and a full audit trail.",
      }],
      ["04", { th: "บันทึกงานภาคสนาม", en: "Field-work logging" }, {
        th: "เช็คอิน ตรวจจุด บันทึกผู้มาติดต่อพร้อมรูปถ่าย และแจ้งเตือนเข้า LINE เรียลไทม์",
        en: "Check-ins, patrol points, visitor logs with photos, and real-time LINE alerts.",
      }],
      ["05", { th: "ทะเบียนสัญญาและเตือนเอกสาร", en: "Contract registry & reminders" }, {
        th: "รวมเอกสารสำคัญไว้ที่เดียว พร้อมอีเมลเตือนก่อนวันหมดอายุ",
        en: "Key documents in one place, with email reminders before anything expires.",
      }],
      ["06", { th: "Chatbot และ Automation", en: "Chatbot & automation" }, {
        th: "บอท LINE + AI ตอบคำถามซ้ำ ๆ และส่งต่อเรื่องถึงคนที่ใช่โดยอัตโนมัติ",
        en: "LINE + AI bots that answer repeat questions and route the rest to the right person.",
      }],
    ],
    href: "hr-systems",
    cta: { th: "ดู 6 ระบบที่ใช้งานจริง", en: "See all 6 systems" },
  },
] as const;

// ─── Feature grid highlights (Home, light empeo-style card grid) ───

export const featureHighlights = [
  {
    icon: "scene",
    tone: "teal",
    title: { th: "ชุดภาพเล่าเรื่อง 3D", en: "3D story scenes" },
    description: {
      th: "จำลองสถานการณ์จริงในโรงงานด้วยตัวละคร 3D ให้พนักงานจดจำได้มากกว่าคู่มือกระดาษ",
      en: "Simulate real factory situations with 3D characters — more memorable than a paper manual.",
    },
    tags: [{ th: "512 เฟรม", en: "512 frames" }, { th: "10 โมดูล", en: "10 modules" }],
  },
  {
    icon: "video",
    tone: "mint",
    title: { th: "วิดีโอพร้อมเผยแพร่", en: "Publish-ready video" },
    description: {
      th: "ผลิตทั้งจอกว้าง 16:9 และแนวตั้ง 9:16 พร้อมใช้บน YouTube, LMS หรือมือถือ",
      en: "Produced in both 16:9 widescreen and 9:16 vertical — ready for YouTube, your LMS, or mobile.",
    },
    tags: [{ th: "16:9", en: "16:9" }, { th: "9:16", en: "9:16" }],
  },
  {
    icon: "inbox",
    tone: "amber",
    title: { th: "คัดกรองใบสมัครอัตโนมัติ", en: "Automated resume screening" },
    description: {
      th: "อ่านอีเมลสมัครงาน แยกแผนก จัดเก็บไฟล์ และแจ้งเตือนทีมโดยไม่ต้องเปิดอ่านเอง",
      en: "Reads application emails, sorts by department, files attachments, and alerts the team.",
    },
    tags: [{ th: "Gmail", en: "Gmail" }, { th: "Google Drive", en: "Google Drive" }],
  },
  {
    icon: "rocket",
    tone: "teal",
    title: { th: "Onboarding ครบวงจร", en: "End-to-end onboarding" },
    description: {
      th: "ตั้งแต่ขออัตรากำลังจนถึงเตือนประเมินทดลองงานอัตโนมัติ",
      en: "From manpower requests to automatic probation-review reminders.",
    },
    tags: [{ th: "Deploy 30 เวอร์ชัน", en: "30 deployments" }, { th: "4 บทบาท", en: "4 roles" }],
  },
  {
    icon: "chart",
    tone: "mint",
    title: { th: "ประเมิน KPI ออนไลน์", en: "Online KPI evaluation" },
    description: {
      th: "เก็บคะแนนพร้อมสายอนุมัติ ล็อกผลเมื่ออนุมัติแล้ว ตรวจสอบย้อนหลังได้ทุกรายการ",
      en: "Scoring with an approval chain, locked results, and a full audit trail.",
    },
    tags: [{ th: "Audit log", en: "Audit log" }, { th: "CSV / PDF", en: "CSV / PDF" }],
  },
  {
    icon: "shield",
    tone: "amber",
    title: { th: "บันทึกงานภาคสนาม", en: "Field-work logging" },
    description: {
      th: "เช็คอิน ตรวจจุด บันทึกผู้มาติดต่อพร้อมรูปถ่าย แจ้งเตือนเข้า LINE ทันที",
      en: "Check-ins, patrol points, visitor logs with photos, and instant LINE alerts.",
    },
    tags: [{ th: "GPS / รูปถ่าย", en: "GPS / photos" }, { th: "LINE Alert", en: "LINE alert" }],
  },
] as const;

// ─── HR system case studies (anonymized: business type only, all facts verified) ───

export type CaseStudy = {
  slug: string;
  icon: "inbox" | "rocket" | "chart" | "shield" | "bell" | "chat";
  sector: { th: string; en: string };
  title: { th: string; en: string };
  pain: { th: string; en: string };
  solution: { th: readonly string[]; en: readonly string[] };
  outcome: { th: string; en: string };
  metric?: { th: string; en: string };
  flow: { th: readonly string[]; en: readonly string[] };
  stack: readonly string[];
  status: { th: string; en: string };
  /** Optional supporting diagrams under public/systems/<slug>/ — never a real client screenshot. */
  images?: readonly string[];
};

export const caseStudies: readonly CaseStudy[] = [
  {
    slug: "resume-screening",
    icon: "inbox",
    sector: { th: "ฝ่ายสรรหาฯ กลุ่มธุรกิจอาหาร", en: "Recruitment team, food-industry group" },
    title: { th: "ระบบคัดกรองใบสมัครจากอีเมลอัตโนมัติ", en: "Automated resume-screening inbox" },
    pain: {
      th: "ใบสมัครจาก JobThai / JobsDB ไหลเข้า Gmail รวมกันทุกตำแหน่ง HR ต้องเปิดอ่านทีละฉบับ แยกแผนกเอง เก็บไฟล์เอง และไม่รู้ว่าตอบใครไปแล้วบ้าง",
      en: "Applications from JobThai / JobsDB pile into one Gmail inbox. HR opens each email, sorts departments, files resumes by hand, and loses track of replies.",
    },
    solution: {
      th: [
        "อ่านอีเมลสมัครงานอัตโนมัติ และจับคู่ตำแหน่ง → แผนกตามผังที่กำหนด",
        "จัดเก็บเรซูเม่และไฟล์แนบลง Google Drive อย่างเป็นระเบียบ",
        "ติดตามสถานะการตอบกลับผู้สมัครแต่ละราย",
        "แจ้งเตือนทีมผ่าน Google Chat ทันทีที่มีใบสมัครใหม่",
      ],
      en: [
        "Reads application emails automatically and maps position → department",
        "Files resumes and attachments into organized Google Drive folders",
        "Tracks reply status for every applicant",
        "Pushes instant Google Chat alerts on new applications",
      ],
    },
    outcome: {
      th: "HR เห็นผู้สมัครทุกคนในชีตเดียว ไม่มีใบสมัครตกหล่นอยู่ใน Inbox",
      en: "Every applicant lands in one sheet — nothing gets buried in the inbox.",
    },
    flow: {
      th: ["อีเมลสมัครงาน", "คัดแยกอัตโนมัติ", "เก็บไฟล์ Drive", "แจ้งเตือนทีม"],
      en: ["Application email", "Auto-sort", "File to Drive", "Team alert"],
    },
    stack: ["Google Apps Script", "Gmail", "Google Sheets", "Google Chat"],
    status: { th: "ใช้งานจริง", en: "In production" },
  },
  {
    slug: "onboardpro",
    icon: "rocket",
    sector: { th: "ฝ่ายบุคคล องค์กรภาคการผลิต", en: "HR team, manufacturing organization" },
    title: { th: "OnboardPro — รับพนักงานใหม่และติดตามทดลองงาน", en: "OnboardPro — onboarding & probation tracking" },
    pain: {
      th: "ขออัตรากำลังด้วยกระดาษ อนุมัติช้า พนักงานใหม่ไม่ได้รับข้อมูลในวันแรก และ HR ต้องจำวันครบกำหนดประเมินทดลองงานเอง",
      en: "Paper manpower requests, slow approvals, new hires starting without information, and probation deadlines tracked from memory.",
    },
    solution: {
      th: [
        "ฟอร์มขออัตรากำลังออนไลน์ พร้อมสายอนุมัติและแจ้งผลทางอีเมล",
        "อีเมลต้อนรับพนักงานใหม่พร้อม E-book ปฐมนิเทศแบบสแกน QR",
        "เตือนประเมินทดลองงานอัตโนมัติตามไทม์ไลน์ (วันที่ 15 / 20 / 30 / 70 / 75 / 85)",
        "ล็อกอินแบบเข้ารหัส บันทึกกิจกรรม และระบบ Support Ticket ในตัว",
      ],
      en: [
        "Online manpower-request form with an approval chain and email results",
        "Welcome email with a QR-code orientation e-book",
        "Automatic probation-review reminders (day 15 / 20 / 30 / 70 / 75 / 85)",
        "Hashed-password login, activity log, and built-in support tickets",
      ],
    },
    outcome: {
      th: "วงจรตั้งแต่ขอคนจนถึงผ่านทดลองงานอยู่ในระบบเดียว ไม่มีกำหนดการหลุด",
      en: "The whole request-to-pass-probation cycle lives in one system — no missed dates.",
    },
    metric: { th: "Deploy แล้ว 30 เวอร์ชัน · คู่มือผู้ใช้ 4 บทบาท", en: "30 deployed versions · manuals for 4 roles" },
    flow: {
      th: ["ขออัตรากำลัง", "อนุมัติ", "ต้อนรับวันแรก", "ประเมินทดลองงาน"],
      en: ["Manpower request", "Approve", "Day-one welcome", "Probation review"],
    },
    stack: ["Google Apps Script", "Google Sheets", "Gmail"],
    status: { th: "ใช้งานจริง", en: "In production" },
    images: ["onboardpro-01.webp"],
  },
  {
    slug: "kpi-evaluation",
    icon: "chart",
    sector: { th: "ผู้ผลิตในภาคอุตสาหกรรม", en: "Industrial manufacturer" },
    title: { th: "ระบบประเมินผล KPI / Competency ออนไลน์", en: "KPI / competency evaluation web app" },
    pain: {
      th: "คะแนน KPI กระจายอยู่ในกระดาษและ Excel หลายไฟล์ รวมคะแนนช้า แก้ไขกันได้อิสระ และตรวจสอบย้อนหลังไม่ได้",
      en: "KPI scores scattered across paper and Excel files — slow to consolidate, freely editable, impossible to audit.",
    },
    solution: {
      th: [
        "4 บทบาท User / Manager / HR / Admin พร้อมสิทธิ์แยกชัดเจน",
        "กรอกผลงานรายเดือน หัวหน้าให้คะแนน และล็อกผลเมื่ออนุมัติแล้ว",
        "ล็อกอินปลอดภัย จำกัดครั้งที่ผิด พร้อม Audit Log ทุกการแก้ไข",
        "ออกรายงาน CSV / PDF สำหรับสรุปผลประเมิน",
      ],
      en: [
        "Four roles — User / Manager / HR / Admin — with strict permissions",
        "Monthly submissions, manager scoring, and locked results after approval",
        "Secure login with lockout, plus an audit log on every change",
        "CSV / PDF reports for evaluation summaries",
      ],
    },
    outcome: {
      th: "คะแนนรวมถูกต้อง ตรวจสอบย้อนหลังได้ทุกรายการ ส่งมอบพร้อมคู่มือผู้ใช้",
      en: "Accurate totals, a full audit trail, delivered with user manuals.",
    },
    flow: {
      th: ["ตั้ง KPI", "อนุมัติแผน", "กรอกผลรายเดือน", "สรุปคะแนน"],
      en: ["Set KPIs", "Approve plan", "Monthly entries", "Final scores"],
    },
    stack: ["Google Apps Script", "Google Sheets", "clasp"],
    status: { th: "ส่งมอบแล้ว", en: "Delivered" },
  },
  {
    slug: "field-logbook",
    icon: "shield",
    sector: { th: "งานบริหารอาคารและรักษาความปลอดภัย", en: "Facility & security operations" },
    title: { th: "ระบบบันทึกงาน รปภ. และแม่บ้านผ่านมือถือ", en: "Mobile logbook for security & housekeeping" },
    pain: {
      th: "การรายงานตัว ตรวจจุด และบันทึกรถเข้า–ออกอยู่บนกระดาษ ค้นย้อนหลังยาก และหัวหน้างานไม่เห็นหน้างานแบบเรียลไทม์",
      en: "Check-ins, patrols, and vehicle logs on paper — hard to search, invisible to supervisors in real time.",
    },
    solution: {
      th: [
        "เช็คอินเข้างาน ตรวจจุด patrol และบันทึกผู้มาติดต่อ/ยานพาหนะพร้อมรูปถ่าย",
        "เก็บรูปบนคลาวด์ ค้นหาย้อนหลังได้จากชื่อ วันที่ หรือทะเบียนรถ",
        "แจ้งเตือนเหตุการณ์เข้า LINE ของหัวหน้างานทันที",
        "สรุปรายงาน PDF / Excel รายเดือนอัตโนมัติพร้อมส่งอีเมล",
      ],
      en: [
        "Mobile check-ins, patrol checkpoints, and visitor/vehicle logs with photos",
        "Cloud photo storage, searchable by name, date, or plate",
        "Instant LINE alerts to supervisors on every event",
        "Automatic monthly PDF / Excel reports by email",
      ],
    },
    outcome: {
      th: "หัวหน้างานเห็นทุกจุดแบบเรียลไทม์ รายงานประจำเดือนออกเองโดยไม่ต้องรวบรวม",
      en: "Supervisors see every post in real time; monthly reports compile themselves.",
    },
    flow: {
      th: ["เช็คอินหน้างาน", "ถ่ายรูปแนบ", "แจ้งเตือน LINE", "รายงานรายเดือน"],
      en: ["On-site check-in", "Photo attached", "LINE alert", "Monthly report"],
    },
    stack: ["Google Apps Script", "Google Sheets", "Cloudinary", "LINE Messaging API"],
    status: { th: "ใช้งานจริง", en: "In production" },
  },
  {
    slug: "contract-registry",
    icon: "bell",
    sector: { th: "ฝ่ายบุคคล องค์กรเอกชน", en: "HR team, private company" },
    title: { th: "ทะเบียนสัญญาและระบบเตือนเอกสารหมดอายุ", en: "Contract registry with expiry reminders" },
    pain: {
      th: "สัญญาและเอกสารสำคัญกระจายหลายที่ ไม่มีใครเตือนวันหมดอายุ — รู้ตัวอีกทีคือเลยกำหนดแล้ว",
      en: "Contracts scattered everywhere with no expiry warnings — you find out after the deadline.",
    },
    solution: {
      th: [
        "ทะเบียนเอกสาร/สัญญากลาง พร้อมการจัดเก็บอัตโนมัติ",
        "นับถอยหลังและเตือนล่วงหน้าก่อนเอกสารหมดอายุ",
        "อีเมลสรุปรายการที่ต้องติดตามทุกสัปดาห์ (HTML อ่านง่าย)",
        "ระบบเตือนกำหนดการงานของทีมในชุดเดียวกัน",
      ],
      en: [
        "A central contract/document registry with automatic filing",
        "Expiry countdowns with advance reminders",
        "A weekly HTML email digest of items needing attention",
        "A companion task-deadline reminder system",
      ],
    },
    outcome: {
      th: "ไม่มีสัญญาหมดอายุเงียบ ๆ — ทุกกำหนดการมีคนถูกเตือนเสมอ",
      en: "No contract expires silently — every deadline reminds someone.",
    },
    flow: {
      th: ["ลงทะเบียนเอกสาร", "นับวันหมดอายุ", "อีเมลเตือนรายสัปดาห์"],
      en: ["Register document", "Track expiry", "Weekly reminder email"],
    },
    stack: ["Google Apps Script", "Google Sheets", "Gmail"],
    status: { th: "ใช้งานจริง", en: "In production" },
  },
  {
    slug: "line-ai-assistant",
    icon: "chat",
    sector: { th: "ธุรกิจค้าปลีกวัสดุตกแต่ง", en: "Decor-materials retail business" },
    title: { th: "LINE AI Chatbot ตอบลูกค้าและบันทึกใบเสนอราคา", en: "LINE AI chatbot for replies & quotations" },
    pain: {
      th: "แชทลูกค้าเข้าตลอดวัน แอดมินตอบไม่ทัน คำถามซ้ำ ๆ กินเวลา และใบเสนอราคาต้องพิมพ์เองทุกครั้ง",
      en: "Chats arrive all day, admins can't keep up, repeat questions eat hours, and every quotation is typed by hand.",
    },
    solution: {
      th: [
        "จำแนกความต้องการอัตโนมัติ: ถามสินค้า ขอรูป ขอราคา หรือติดต่อแอดมิน",
        "AI ตอบในบทบาททีมขาย โดยค้นข้อมูลจากแคตตาล็อกสินค้าจริง",
        "เก็บรายละเอียดงานและบันทึกใบเสนอราคาเบื้องต้นลง Google Sheets",
        "แจ้งแอดมินทาง LINE ทันทีเมื่อลูกค้าพร้อมคุยต่อ",
      ],
      en: [
        "Auto-classifies intent: product questions, photo requests, pricing, or admin",
        "AI replies in a sales-team voice, grounded in the real product catalog",
        "Captures job details and logs draft quotations to Google Sheets",
        "Alerts the admin on LINE the moment a customer is ready to talk",
      ],
    },
    outcome: {
      th: "เคสนี้เป็นงานขาย/บริการลูกค้า — สถาปัตยกรรมเดียวกันนำไปใช้เป็น HR Helpdesk ตอบคำถามพนักงานได้ทันที",
      en: "This case is sales/service automation — the same architecture doubles as an HR helpdesk for employee questions.",
    },
    flow: {
      th: ["ลูกค้าทัก LINE", "AI จำแนกและตอบ", "บันทึกใบเสนอราคา", "แจ้งแอดมิน"],
      en: ["Customer messages", "AI classifies & replies", "Quotation logged", "Admin alerted"],
    },
    stack: ["n8n", "LINE Messaging API", "AI / LLM", "Google Sheets"],
    status: { th: "ใช้งานจริง", en: "In production" },
  },
];

// ─── Additional HR-adjacent tooling (shown separately — not counted in the 6 systems above) ───

export type AdditionalTool = {
  slug: string;
  title: { th: string; en: string };
  description: { th: string; en: string };
  stack: readonly string[];
  images: readonly string[];
  /** Optional link to a live, public example of the tool. */
  link?: { label: { th: string; en: string }; href: string };
};

export const additionalTools: readonly AdditionalTool[] = [
  {
    slug: "logical-test",
    title: { th: "Logical Test — ระบบทดสอบเชิงตรรกะ", en: "Logical Test — logical reasoning assessment" },
    description: {
      th: "แบบทดสอบเชิงตรรกะสำหรับคัดกรองผู้สมัครงาน แทนที่การตรวจกระดาษด้วยมือ ด้วยหน้าจอทำแบบทดสอบและประมวลผลคะแนนอัตโนมัติแบบเรียลไทม์",
      en: "A logical-reasoning test for candidate screening — replaces manual paper grading with an online test interface and real-time automated scoring.",
    },
    stack: ["Google Apps Script", "Google Sheets"],
    images: ["logical-test-03.webp", "logical-test-04.webp"],
  },
  {
    slug: "gamifications",
    title: { th: "Gamification System — ระบบการเรียนรู้เชิงเกม", en: "Gamification System — game-based learning" },
    description: {
      th: "เปลี่ยนการอบรมแบบบรรยายให้เป็นภารกิจที่เล่นผ่านหน้าจอ พร้อมระบบคะแนนและความก้าวหน้า เพื่อกระตุ้นให้ผู้เรียนอยากเรียนต่อจนจบ",
      en: "Turns lecture-style training into on-screen missions with scoring and progress tracking, designed to keep learners engaged to the end.",
    },
    stack: ["Google Apps Script", "Google Sheets"],
    images: ["gamifications-04.webp", "gamifications-05.webp", "gamifications-06.webp"],
    link: {
      label: { th: "ดูตัวอย่างจริงบน YouTube", en: "Watch the live example on YouTube" },
      href: channel.quizPlaylist,
    },
  },
];

// ─── Portfolio groups (new curated Food Safety series first) ───

export const projectGroups = [
  {
    slug: "factory-lighting",
    title: { th: "Food Safety — คุณภาพแสงสว่างในไลน์ผลิต", en: "Food Safety — Lighting quality on the line" },
    type: { th: "คัด 8 จาก 30 ฉาก", en: "8 of 30 scenes" },
    description: {
      th: "เล่าเหตุการณ์หลอดไฟชำรุดเหนือไลน์บรรจุ ตั้งแต่สัญญาณเตือน ผลกระทบต่อความปลอดภัยอาหาร จนถึงการแก้ไขที่ถูกต้อง",
      en: "A failing light above the bottling line — from warning signs and food-safety impact to the correct fix.",
    },
    images: [
      "factory-lighting-01.webp", "factory-lighting-02.webp", "factory-lighting-03.webp", "factory-lighting-04.webp",
      "factory-lighting-05.webp", "factory-lighting-06.webp", "factory-lighting-07.webp", "factory-lighting-08.webp",
    ],
    cover: "factory-lighting-01.webp",
    aspect: "wide",
  },
  {
    slug: "factory-hidden-flaw",
    title: { th: "Food Safety — จุดบกพร่องที่ซ่อนอยู่ในโรงงาน", en: "Food Safety — Hidden flaws in the factory" },
    type: { th: "คัด 8 จาก 34 ฉาก", en: "8 of 34 scenes" },
    description: {
      th: "ตามหาความเสี่ยงที่มองไม่เห็นในเครื่องจักรและพื้นที่ผลิต ปิดท้ายด้วยการตรวจสวอบเชื้อแบบงาน QC จริง",
      en: "Hunting invisible risks in machines and production areas, ending with real QC swab sampling.",
    },
    images: [
      "factory-hidden-flaw-01.webp", "factory-hidden-flaw-02.webp", "factory-hidden-flaw-03.webp", "factory-hidden-flaw-04.webp",
      "factory-hidden-flaw-05.webp", "factory-hidden-flaw-06.webp", "factory-hidden-flaw-07.webp", "factory-hidden-flaw-08.webp",
    ],
    cover: "factory-hidden-flaw-01.webp",
    aspect: "wide",
  },
  {
    slug: "gmp-compliance-audit",
    title: { th: "Food Safety — ตรวจสอบตามเกณฑ์ GMP420", en: "Food Safety — GMP420 compliance checks" },
    type: { th: "8 ฉากตรวจสอบมาตรฐาน", en: "8 compliance-check scenes" },
    description: {
      th: "ลำดับภาพการตรวจสอบตามเกณฑ์ GMP420 ตั้งแต่ป้ายเตือนหน้าประตู เครื่องวัดคุณภาพอากาศ การตรวจสวอบในห้องคลีนรูม จนถึงไลน์บรรจุ",
      en: "A GMP420 compliance-check sequence — from doorway warning signage and air-quality meters to cleanroom swab testing and the packing line.",
    },
    images: [
      "gmp-compliance-audit-01.webp", "gmp-compliance-audit-02.webp", "gmp-compliance-audit-03.webp",
      "gmp-compliance-audit-04.webp", "gmp-compliance-audit-05.webp", "gmp-compliance-audit-06.webp",
      "gmp-compliance-audit-07.webp", "gmp-compliance-audit-08.webp",
    ],
    cover: "gmp-compliance-audit-01.webp",
    aspect: "wide",
  },
  {
    slug: "food-factory-location",
    title: { th: "Food Safety — ทำเลที่ตั้งโรงงานอาหาร", en: "Food Safety — Food-factory location" },
    type: { th: "คัด 8 จาก 20 ฉาก", en: "8 of 20 scenes" },
    description: {
      th: "ข้อกำหนดทำเลและสภาพแวดล้อมรอบโรงงาน ตั้งแต่รั้ว ทางระบายน้ำ ไปจนถึงการเดินตรวจพื้นที่รอบนอก",
      en: "Site and surroundings requirements — fences, drainage, and perimeter inspection walks.",
    },
    images: [
      "food-factory-location-01.webp", "food-factory-location-02.webp", "food-factory-location-03.webp", "food-factory-location-04.webp",
      "food-factory-location-05.webp", "food-factory-location-06.webp", "food-factory-location-07.webp", "food-factory-location-08.webp",
    ],
    cover: "food-factory-location-01.webp",
    aspect: "wide",
  },
  {
    slug: "factory-ceiling",
    title: { th: "Food Safety — โครงสร้างเพดานและการปนเปื้อน", en: "Food Safety — Ceiling structure & contamination" },
    type: { th: "คัด 8 จาก 32 ฉาก", en: "8 of 32 scenes" },
    description: {
      th: "จุดเสี่ยงเหนือหัวที่มักถูกมองข้าม — คราบ หยดน้ำ และมาตรฐานโครงสร้างเพดานที่ถูกต้องตามหลัก Food Safety",
      en: "The overlooked risks overhead — stains, drips, and correct ceiling standards for food safety.",
    },
    images: [
      "factory-ceiling-01.webp", "factory-ceiling-02.webp", "factory-ceiling-03.webp", "factory-ceiling-04.webp",
      "factory-ceiling-05.webp", "factory-ceiling-06.webp", "factory-ceiling-07.webp", "factory-ceiling-08.webp",
    ],
    cover: "factory-ceiling-01.webp",
    aspect: "wide",
  },
  {
    slug: "floor-slope-design",
    title: { th: "Food Safety — พื้นลาดเอียงและการระบายน้ำ", en: "Food Safety — Floor slope & drainage" },
    type: { th: "คัด 8 จาก 34 ฉาก", en: "8 of 34 scenes" },
    description: {
      th: "การออกแบบพื้นโรงงาน ความลาดเอียง และการล้างทำความสะอาดที่ถูกสุขลักษณะ เล่าผ่านการทำงานจริงหน้าไลน์ผลิต",
      en: "Floor design, slope, and hygienic wash-downs — told through real work at the line.",
    },
    images: [
      "floor-slope-design-01.webp", "floor-slope-design-02.webp", "floor-slope-design-03.webp", "floor-slope-design-04.webp",
      "floor-slope-design-05.webp", "floor-slope-design-06.webp", "floor-slope-design-07.webp", "floor-slope-design-08.webp",
    ],
    cover: "floor-slope-design-01.webp",
    aspect: "wide",
  },
  {
    slug: "logical-test",
    title: { th: "Logical Test", en: "Logical Test" },
    type: { th: "Interactive assessment", en: "Interactive assessment" },
    description: {
      th: "ระบบประเมินเชิงตรรกะที่แปลงเกณฑ์ซับซ้อนให้เป็นหน้าจอใช้งานที่อ่านง่ายและตัดสินใจได้รวดเร็ว",
      en: "A logical assessment interface that turns complex criteria into clear, decision-ready screens.",
    },
    images: ["logical-test-01.png", "logical-test-02.png"],
    cover: "logical-test-01.png",
    aspect: "square",
  },
  {
    slug: "gamifications",
    title: { th: "Gamification System", en: "Gamification System" },
    type: { th: "Learning mechanics", en: "Learning mechanics" },
    description: {
      th: "ระบบระดับ คะแนน และความก้าวหน้า เพื่อช่วยให้ผู้เรียนเห็นเป้าหมายและอยากเรียนต่อจนจบ",
      en: "Levels, scores, and progress mechanics designed to sustain learner motivation.",
    },
    images: ["gamifications-01.png", "gamifications-02.png", "gamifications-03.png"],
    cover: "gamifications-01.png",
    aspect: "square",
  },
  {
    slug: "gmp-pest-control",
    title: { th: "GMP — การควบคุมสัตว์พาหะ", en: "GMP — Pest Control" },
    type: { th: "ชุดภาพอบรม 17 ฉาก", en: "17-scene training series" },
    description: {
      th: "ชุดตัวละครและเหตุการณ์สำหรับอธิบายความเสี่ยงจากสัตว์พาหะในพื้นที่ผลิต ให้จดจำสัญญาณเตือนได้จากภาพ",
      en: "A character-led scene series that makes pest risks and warning signs memorable for production teams.",
    },
    images: [
      "gmp-pest-control-01.png","gmp-pest-control-02.png","gmp-pest-control-03.png",
      "gmp-pest-control-04.png","gmp-pest-control-05.png","gmp-pest-control-06.png",
      "gmp-pest-control-07.png","gmp-pest-control-08.png","gmp-pest-control-09.png",
      "gmp-pest-control-10.png","gmp-pest-control-11.png","gmp-pest-control-12.png",
      "gmp-pest-control-13.png","gmp-pest-control-14.png","gmp-pest-control-15.png",
      "gmp-pest-control-16.png","gmp-pest-control-17.png",
    ],
    cover: "gmp-pest-control-01.png",
    aspect: "wide",
  },
  {
    slug: "gmp-cleanliness",
    title: { th: "GMP — ความสะอาด", en: "GMP — Cleanliness" },
    type: { th: "ชุดภาพอบรม 4 ฉาก", en: "4-scene training series" },
    description: {
      th: "สื่อภาพขั้นตอนและพฤติกรรมด้านความสะอาดสำหรับพื้นที่ผลิต ถ่ายทอดมาตรฐานให้เป็นสถานการณ์ที่เข้าถึงง่าย",
      en: "A visual series translating cleanliness standards into friendly, practical workplace situations.",
    },
    images: ["gmp-cleanliness-01.png", "gmp-cleanliness-02.png", "gmp-cleanliness-03.png", "gmp-cleanliness-04.png"],
    cover: "gmp-cleanliness-01.png",
    aspect: "wide",
  },
  {
    slug: "gmp-floor",
    title: { th: "GMP — การดูแลพื้น", en: "GMP — Floor Care" },
    type: { th: "ชุดภาพอบรม 11 ฉาก", en: "11-scene training series" },
    description: {
      th: "ลำดับภาพการดูแลพื้นในโรงงาน ตั้งแต่การสังเกตความเสี่ยงจนถึงการจัดการอย่างถูกวิธี",
      en: "An 11-scene sequence covering floor hazards, observation, and correct handling in production areas.",
    },
    images: [
      "gmp-floor-01.png","gmp-floor-02.png","gmp-floor-03.png",
      "gmp-floor-04.png","gmp-floor-05.png","gmp-floor-06.png",
      "gmp-floor-07.png","gmp-floor-08.png","gmp-floor-09.png",
      "gmp-floor-10.png","gmp-floor-11.png",
    ],
    cover: "gmp-floor-01.png",
    aspect: "wide",
  },
] as const;

// ─── Shared copy ───

export const copy = {
  th: {
    quote: "ขอใบเสนอราคา",
    eyebrow: "โซลูชันงาน HR — ครบทั้งสื่อและระบบ",
    hero: "สื่ออบรมที่คนอยากดู ระบบงาน HR ที่ทำงานแทนคุณ",
    intro:
      "เราช่วยทีม HR ในสองเรื่องที่กินเวลาที่สุด — เปลี่ยนมาตรฐาน GMP และความปลอดภัยให้เป็นสื่อภาพที่พนักงานจำได้ และเปลี่ยนงานที่ทำซ้ำทุกวันให้เป็นระบบอัตโนมัติที่ใช้งานจริงแล้ว 6 ระบบ",
    viewWork: "ดูผลงานสื่อ",
    viewSystems: "ดูระบบงาน HR",
    selected: "ผลงานสื่อชุดล่าสุด",
    selectedSub: "ซีรีส์ Food Safety แบบ 3D กว่า 500 เฟรมจากงานจริง และ 34 คลิปที่เผยแพร่บน YouTube — คัดมาให้ชมบางส่วน",
    services: "สิ่งที่เราทำ",
  },
  en: {
    quote: "Request a quote",
    eyebrow: "HR solutions — media and systems in one place",
    hero: "Training media people want to watch. HR systems that work for you.",
    intro:
      "We take on the two most time-consuming jobs in HR — turning GMP and safety standards into visuals people remember, and turning repetitive admin into automation already running in six real systems.",
    viewWork: "View media work",
    viewSystems: "See HR systems",
    selected: "Latest media series",
    selectedSub: "A 3D food-safety series — 500+ frames from real production, plus 34 videos published on YouTube. Curated highlights below.",
    services: "What we do",
  },
} as const;
