import Link from "next/link";
import {
  channel,
  featuredVideoIds,
  pageSeo,
  servicePillars,
  siteUrl,
  videoGroups,
  videoPublished, videoUploadDate,
  type Locale,
  type VideoItem,
} from "@/app/site-data";
import { breadcrumbJsonLd } from "@/app/seo";
import { JsonLd } from "@/components/shared/JsonLd";
import { FeaturedSeries } from "@/components/shared/FeaturedSeries";
import { CtaBlock, RdIntro } from "@/components/rd/Blocks";
import { VideoGrid, WorkCases } from "@/components/home/HomeClient";

const allVideos = videoGroups.flatMap((group) => group.videos);
const pick = (ids: readonly string[]) =>
  ids.map((id) => allVideos.find((video) => video.id === id)).filter((video): video is VideoItem => Boolean(video));

/** "7:04" → "PT7M4S" (ISO 8601 duration, as VideoObject expects). */
function isoDuration(value?: string) {
  if (!value || !/^\d+:\d{2}$/.test(value)) return undefined;
  const [minutes, seconds] = value.split(":").map(Number);
  return `PT${minutes}M${seconds}S`;
}

type L2 = { th: string; en: string };
/** Services we take on — written so each block matches what buyers type into Google. No new products:
 *  blocks with a catalogue product link to it; the rest ask for a quote. */
const mediaServices: readonly { id: string; title: L2; body: L2; points: readonly L2[]; product?: string; article?: string }[] = [
  {
    id: "onboarding",
    title: { th: "สื่ออบรมปฐมนิเทศพนักงานใหม่", en: "New-hire onboarding media" },
    body: {
      th: "วิดีโอและสื่อปฐมนิเทศที่พนักงานใหม่ดูได้เองก่อนเริ่มงาน เล่าเรื่องบริษัท กฎระเบียบ สวัสดิการ และสิ่งที่ต้องรู้ในวันแรก เปิดซ้ำได้ทุกรุ่น ไม่ต้องจัดบรรยายใหม่ทุกครั้ง",
      en: "Onboarding videos new staff can watch on their own before day one — company story, rules, benefits and first-day essentials. Reuse them for every intake.",
    },
    points: [
      { th: "วิดีโอปฐมนิเทศ 16:9 + คลิปสั้นแนวตั้งสำหรับมือถือ", en: "16:9 onboarding video + vertical clips for phones" },
      { th: "Infographic สรุปกฎ สวัสดิการ และขั้นตอนงาน", en: "Infographics for rules, benefits and procedures" },
      { th: "แบบทดสอบหลังดู เก็บเป็นหลักฐานการอบรม", en: "A quiz afterwards, kept as training evidence" },
    ],
    article: "new-employee-safety-training-6-hours",
  },
  {
    id: "safety",
    title: { th: "สื่ออบรมความปลอดภัยในการทำงาน", en: "Workplace safety training media" },
    body: {
      th: "วิดีโออบรมความปลอดภัย (Safety Induction) แบบจำลองเหตุการณ์ด้วยภาพ 3D ให้พนักงานเห็นจุดเสี่ยงและวิธีทำงานที่ถูกต้อง ใช้ประกอบการอบรมลูกจ้างใหม่และลูกจ้างทั่วไปของบริษัท",
      en: "Safety induction videos that simulate real situations in 3D, so staff see the hazard and the right way to work. Use them alongside your required safety training.",
    },
    points: [
      { th: "PPE เครื่องจักร ไฟฟ้า สารเคมี การยกเคลื่อนย้าย", en: "PPE, machinery, electricity, chemicals, manual handling" },
      { th: "ปรับฉากตามหน้างานและข้อบังคับความปลอดภัยของบริษัท", en: "Scenes shaped to your site and your own safety rules" },
      { th: "เสียงบรรยายไทย + ซับไตเติล", en: "Thai voice-over + subtitles" },
    ],
    article: "new-employee-safety-training-6-hours",
  },
  {
    id: "gmp",
    title: { th: "วิดีโออบรม GMP / Food Safety แบบ 3D", en: "3D GMP / Food Safety training video" },
    body: {
      th: "เปลี่ยนข้อกำหนด GMP 420 / GHPs ในกระดาษให้เป็นวิดีโอ 3D สำหรับโรงงานอาหาร ทั้งจอกว้างสำหรับห้องอบรม และแนวตั้งสำหรับมือถือ",
      en: "Turn GMP 420 / GHPs requirements into 3D video for food factories — widescreen for the training room, vertical for phones.",
    },
    points: [
      { th: "สคริปต์ + สตอรีบอร์ด + ฉาก 3D", en: "Script + storyboard + 3D scenes" },
      { th: "แบบทดสอบท้ายคลิป", en: "End-of-video quiz" },
    ],
    product: "gmp-3d-video",
  },
  {
    id: "software",
    title: { th: "วิดีโอสอนใช้งานโปรแกรม / ระบบ ERP", en: "Software & ERP how-to videos" },
    body: {
      th: "วิดีโอสอนใช้งานโปรแกรมทีละขั้น ทั้งระบบ ERP / SAP โปรแกรมสำเร็จรูป เว็บไซต์ และระบบภายในบริษัท จำลองหน้าจอใหม่ ไม่ต้องเปิดข้อมูลจริง พร้อมเคอร์เซอร์ ซูม และเสียงบรรยายไทย",
      en: "Step-by-step how-to videos for ERP / SAP, off-the-shelf software, websites and in-house systems — recreated screens, so no real data is shown.",
    },
    points: [
      { th: "SAP / ERP / โปรแกรมบัญชี / HR / เว็บแอป", en: "SAP / ERP / accounting / HR / web apps" },
      { th: "แบ่งเป็นตอนสั้น ค้นหาง่าย", en: "Short episodes that are easy to find" },
    ],
    product: "software-video",
    article: "software-how-to-video-checklist",
  },
  {
    id: "elearning",
    title: { th: "สื่อ E-Learning สำหรับ LMS", en: "E-learning content for your LMS" },
    body: {
      th: "ทำบทเรียน E-Learning ครบชุด ทั้งวิดีโอ แบบทดสอบ และภาพปกบทเรียน ส่งเป็นไฟล์ MP4 ไปใช้ในระบบ LMS ที่บริษัทมีอยู่ หรือใช้กับระบบ E-Learning ของเราที่มีเดโมให้ลองฟรี",
      en: "Complete e-learning lessons — video, quizzes and lesson covers — delivered as MP4 for the LMS you already use, or with our own e-learning system (free demo).",
    },
    points: [
      { th: "แบ่งบทตามหลักสูตร มีแบบทดสอบทุกบท", en: "Chapters per course, a quiz for every chapter" },
      { th: "ใช้กับระบบ E-Learning / LMS ที่มีอยู่ได้", en: "Works with the e-learning / LMS you already have" },
    ],
    product: "elearning-system",
    article: "elearning-content-motion-3d-video",
  },
  {
    id: "motion",
    title: { th: "Motion Graphic / Animation สื่ออบรม", en: "Motion graphics / animation for training" },
    body: {
      th: "Motion Graphic และ Animation อธิบายขั้นตอน นโยบาย หรือแนวคิดที่ถ่ายทำจริงยาก ให้เข้าใจในไม่กี่นาที ทั้งแบบ 2D Motion และฉาก 3D พร้อมเสียงบรรยายไทย",
      en: "Motion graphics and animation that explain procedures, policies or ideas that are hard to film — 2D motion or 3D scenes, with Thai voice-over.",
    },
    points: [
      { th: "Micro-learning 1–5 นาที", en: "1–5 minute micro-learning" },
      { th: "ตัวละคร / มาสคอตตามแบรนด์บริษัท", en: "Characters / mascot in your brand style" },
    ],
    article: "elearning-content-motion-3d-video",
  },
];

const mediaFaq: readonly (readonly [L2, L2])[] = [
  [
    { th: "ราคาทำสื่ออบรมเท่าไหร่", en: "How much does training media cost?" },
    { th: "ขึ้นกับความยาว จำนวนฉาก และรูปแบบ (3D, Motion Graphic, จำลองหน้าจอ) งานที่มีแพ็กเกจ เช่น วิดีโอ GMP 3D และวิดีโอสอนใช้งานโปรแกรม ดูราคาได้ที่หน้าสินค้า ส่วนงานอื่นส่งรายละเอียดมาเพื่อประเมินราคาได้ฟรี", en: "It depends on length, number of scenes and format (3D, motion graphics, recreated screens). Packaged work such as 3D GMP videos and software how-to videos has prices on its product page; for anything else, send the details for a free quote." },
  ],
  [
    { th: "ต้องเตรียมอะไรบ้างก่อนจ้าง", en: "What do we need to prepare?" },
    { th: "เอกสารต้นฉบับ เช่น คู่มือ SOP สไลด์อบรม หรือข้อบังคับของบริษัท ถ้ามีภาพหน้างานหรือภาพหน้าจอระบบจะช่วยให้ฉากตรงกับของจริงมากขึ้น ที่เหลือเราเขียนสคริปต์และสตอรีบอร์ดให้", en: "Your source material — manuals, SOPs, training slides or company rules. Site photos or screenshots help scenes match reality. We write the script and storyboard." },
  ],
  [
    { th: "ใช้กับระบบ LMS ของบริษัทได้ไหม", en: "Will it work with our LMS?" },
    { th: "ได้ เราส่งเป็นไฟล์วิดีโอ MP4 พร้อมชุดคำถาม ซึ่งระบบ LMS ส่วนใหญ่รับได้ ถ้ายังไม่มีระบบ ใช้ระบบ E-Learning ของเราได้ และมีเดโมให้ลองก่อน", en: "Yes — we deliver MP4 video plus the question set, which most LMSs accept. No LMS yet? Use our e-learning system; there's a demo to try first." },
  ],
  [
    { th: "วิดีโออบรมความปลอดภัยใช้แทนการอบรมตามกฎหมายได้ไหม", en: "Can a safety video replace the legally required training?" },
    { th: "ไม่ควรใช้แทนทั้งหมด การอบรมตามประกาศกรมสวัสดิการและคุ้มครองแรงงานมีข้อกำหนดเรื่องหลักสูตร ชั่วโมง วิทยากร และหลักฐาน สื่อวิดีโอเหมาะใช้ประกอบการอบรม ทบทวน และสอนข้อบังคับเฉพาะของบริษัท", en: "Not on its own. The Thai labour-department rules set the syllabus, hours, trainer and records. Video works best alongside that training, for refreshers and for your company-specific rules." },
  ],
];

export function TrainingMediaPage({ locale }: { locale: Locale }) {
  const th = locale === "th";
  const media = servicePillars[0];
  const shown = [...pick(featuredVideoIds.wide), ...pick(featuredVideoIds.tall)];

  // VideoObject needs a real upload date — only clips with a verified date are marked up.
  const videoJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: shown
      .filter((video) => videoPublished[video.id])
      .map((video, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "VideoObject",
          name: video.title[locale],
          description: video.title[locale],
          thumbnailUrl: `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`,
          uploadDate: videoUploadDate(video.id),
          duration: isoDuration(video.duration),
          embedUrl: `https://www.youtube-nocookie.com/embed/${video.id}`,
          url: `https://youtu.be/${video.id}`,
          publisher: { "@type": "Organization", name: "HR Solution Service", url: siteUrl },
        },
      })),
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: mediaFaq.map(([q, a]) => ({ "@type": "Question", name: q[locale], acceptedAnswer: { "@type": "Answer", text: a[locale] } })),
  };

  return (
    <main>
      <JsonLd data={breadcrumbJsonLd(locale, pageSeo[""].crumb[locale], [{ name: pageSeo["training-media"].crumb[locale], path: "training-media" }])} />
      <JsonLd data={videoJsonLd} />
      <JsonLd data={faqJsonLd} />
      <RdIntro
        locale={locale}
        eyebrow={th ? "สื่ออบรม · Training media" : "Training media"}
        title={{ th: "รับทำสื่ออบรมพนักงาน", en: "Training media for your staff" }}
        accent={{ th: "ที่เห็นภาพ จำได้จริง", en: "that people remember" }}
        body={media.intro}
      >
        <a className="rd-btn rd-btn-acc" href="#services">{th ? "งานที่รับทำ" : "What we take on"} ↓</a>
        <a className="rd-btn rd-btn-line" href="#videos">{th ? "ดูวิดีโอผลงาน" : "Watch the videos"} ↓</a>
        <Link className="rd-btn rd-btn-line" href={`/${locale}/contact#quote`}>{th ? "สอบถามเพื่อประเมินราคา" : "Ask for a quote"} →</Link>
      </RdIntro>

      <section id="services" className="rd-sec" style={{ paddingTop: 40 }}>
        <div className="rd-wrap">
          <div className="rd-head rd-rv">
            <div>
              <div className="rd-eyebrow rd-mono">{th ? "งานที่รับทำ" : "What we take on"}</div>
              <h2 className="rd-big">{th ? "สื่ออบรมครบ" : "Every kind of"} <span className="rd-acc">{th ? "ตั้งแต่วันแรกของพนักงาน" : "training media"}</span></h2>
            </div>
            <p>{th ? "ปฐมนิเทศ ความปลอดภัย GMP สอนใช้งานโปรแกรม E-Learning และ Motion Graphic ทุกงานเขียนสคริปต์ให้ พร้อมเสียงบรรยายไทย" : "Onboarding, safety, GMP, software how-tos, e-learning and motion graphics — scripted for you, with Thai voice-over."}</p>
          </div>
          <div className="rd-msvc rd-rv">
            {mediaServices.map((service, i) => (
              <div className="rd-msvc-item" id={service.id} key={service.id}>
                <span className="rd-mono rd-acc">{String(i + 1).padStart(2, "0")}</span>
                <h3>{service.title[locale]}</h3>
                <p>{service.body[locale]}</p>
                <ul>{service.points.map((point) => <li key={point.en}>{point[locale]}</li>)}</ul>
                <div className="rd-msvc-links">
                  {service.product
                    ? <Link className="rd-btn rd-btn-line" href={`/${locale}/products/${service.product}`}>{th ? "ดูแพ็กเกจ" : "See packages"} →</Link>
                    : <Link className="rd-btn rd-btn-line" href={`/${locale}/contact#quote`}>{th ? "สอบถามเพื่อประเมินราคา" : "Ask for a quote"} →</Link>}
                  {service.article && <Link className="rd-msvc-art" href={`/${locale}/articles/${service.article}`}>{th ? "อ่านบทความ" : "Read the article (Thai)"} ↗</Link>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rd-sec" style={{ paddingTop: 40 }}>
        <div className="rd-wrap">
          <div className="rd-head rd-rv">
            <div>
              <div className="rd-eyebrow rd-mono">{th ? "สิ่งที่เราผลิต" : "What we make"}</div>
              <h2 className="rd-big">{th ? "จากกระดาษ" : "From paper"} <span className="rd-acc">{th ? "สู่ฉาก 3D" : "to 3D scenes"}</span></h2>
            </div>
          </div>
          <div className="rd-svc rd-svc-4 rd-rv">
            {media.items.map(([number, title, body]) => (
              <div className="rd-svc-col" key={number}>
                <div className="rd-svc-n" aria-hidden="true">{number}</div>
                <h3>{title[locale]}</h3>
                <p className="rd-muted">{body[locale]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rd-sec" style={{ paddingTop: 20 }}>
        <div className="rd-wrap"><WorkCases locale={locale} /></div>
      </section>

      <section id="videos" className="rd-sec" style={{ paddingTop: 20 }}>
        <div className="rd-wrap">
          <div className="rd-head rd-rv">
            <div>
              <div className="rd-eyebrow rd-mono">{th ? "วิดีโอเด่น" : "Featured videos"}</div>
              <h2 className="rd-big">{th ? "จอกว้างและ" : "Widescreen &"} <span className="rd-acc">{th ? "แนวตั้ง" : "vertical"}</span></h2>
            </div>
            <p>
              {th
                ? `คัดมาจาก ${channel.videoCount} คลิปบนช่อง ${channel.name} — 16:9 สำหรับห้องอบรม และ 9:16 สำหรับมือถือ`
                : `Picked from ${channel.videoCount} videos on the ${channel.name} channel — 16:9 for the training room, 9:16 for mobile.`}
            </p>
          </div>
          <VideoGrid locale={locale} videos={shown} />
          <div className="rd-channels rd-rv">
            <span className="rd-mono">{th ? `ดูครบทั้ง ${channel.videoCount} คลิป` : `All ${channel.videoCount} videos`}</span>
            <a className="rd-btn rd-btn-acc" href={channel.youtube} target="_blank" rel="noopener noreferrer">YouTube ↗</a>
            <a className="rd-btn rd-btn-line" href={channel.facebook} target="_blank" rel="noopener noreferrer">Facebook ↗</a>
            <a className="rd-btn rd-btn-line" href={channel.tiktok} target="_blank" rel="noopener noreferrer">TikTok ↗</a>
          </div>
        </div>
      </section>

      <section className="rd-sec rd-series" style={{ paddingTop: 20 }}>
        <div className="rd-wrap">
          <div className="rd-head rd-rv">
            <div>
              <div className="rd-eyebrow rd-mono">{th ? "ซีรีส์ภาพ 3D" : "3D image series"}</div>
              <h2 className="rd-big">{th ? "ผลงานเด่น" : "Standout"} <span className="rd-acc">{th ? "6 ซีรีส์" : "series"}</span></h2>
            </div>
            <p>{th ? "เปิดดูแต่ละซีรีส์เพื่อดูภาพทั้งหมด" : "Open a series to see every visual."}</p>
          </div>
        </div>
        <FeaturedSeries locale={locale} />
      </section>

      <section className="rd-sec" id="faq" style={{ paddingTop: 40 }}>
        <div className="rd-wrap rd-faq">
          <div className="rd-rv">
            <div className="rd-eyebrow rd-mono">{th ? "คำถามที่พบบ่อย" : "FAQ"}</div>
            <h2 className="rd-big">{th ? "ก่อนจ้าง" : "Before you"} <span className="rd-acc">{th ? "ทำสื่ออบรม" : "hire us"}</span></h2>
          </div>
          <div className="rd-rv">
            {mediaFaq.map(([q, a]) => (
              <details key={q.en}>
                <summary>{q[locale]}<i aria-hidden="true">+</i></summary>
                <p>{a[locale]}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBlock locale={locale} />
    </main>
  );
}
