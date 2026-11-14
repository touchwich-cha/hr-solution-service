# HR Solution Service — Website

เว็บไซต์บริการ **สื่ออบรม (Learning Media) + ระบบงาน HR (HR Systems)** สองภาษา TH/EN
สร้างด้วย Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · Deploy บน Vercel

เดิมคือโปรเจกต์ "TechLearning" — รีแบรนด์และขยายเป็น HR Solution Service (2026-07)

## โครงสร้างสำคัญ

| ที่อยู่ | หน้าที่ |
|---|---|
| `app/site-data.ts` | **เนื้อหาทั้งเว็บอยู่ไฟล์เดียว** — brand, nav, copy, servicePillars, caseStudies, projectGroups, videos/videoGroups/videoPublished, channel, contact |
| `app/[locale]/[[...slug]]/page.tsx` | Router เดียวของทุกหน้า: `/{th\|en}/{slug}` (8 slugs) |
| `components/pages/*` | คอมโพเนนต์ 8 หน้า (Home, Services, Portfolio, Videos, HrSystems, Process, About, Contact) |
| `components/shared/*` | ProjectCard, CaseStudyCard, QuoteForm, VideoCard, VideoTile, ฯลฯ |
| `app/globals.css` | Design system ทั้งหมด (design tokens + component styles) |
| `scripts/prepare-images.mjs` | Pipeline คัด/ย่อ/บีบอัดรูปผลงานเป็น WebP |

**เปลี่ยนชื่อแบรนด์:** แก้ที่ `brand` ใน `app/site-data.ts` จุดเดียว มีผลทั้งเว็บ (header, footer, SEO)

## คำสั่งพัฒนา

```bash
npm install
npm run dev      # http://localhost:3000 (redirect ไป /th)
npm run lint
npm run build
```

## Image pipeline (เพิ่ม/เปลี่ยนรูปผลงาน)

รูปต้นฉบับความละเอียดเต็มอยู่นอก repo (`C:/Users/touch/Desktop/ผลงาน E-Learning`)
สคริปต์จะย่อเหลือกว้างสุด 1600px เป็น WebP q82 ลง `public/projects/<slug>/`

```bash
node scripts/prepare-images.mjs
# หรือชี้โฟลเดอร์ต้นทางอื่น:
SRC_ROOT="D:/path/to/source" node scripts/prepare-images.mjs
```

- แก้รายชื่อไฟล์ที่คัดไว้ใน `manifest` ภายในสคริปต์ (ระบุชื่อไฟล์ต้นทางตรง ๆ ตรวจทานได้)
- สคริปต์สร้าง `public/og.jpg` (1200×630) สำหรับ social card ด้วย
- เพิ่มกลุ่มใหม่แล้ว อย่าลืมเพิ่มรายการใน `projectGroups` ที่ `app/site-data.ts`

## ฟอร์มขอใบเสนอราคา (QuoteForm)

ฟอร์มที่ `/th/contact#quote` ทำงานได้ 2 โหมด:

1. **ยังไม่ตั้งค่า endpoint (ค่าเริ่มต้น):** กดส่งแล้วเปิดโปรแกรมอีเมลของผู้เยี่ยมชม (mailto) พร้อมข้อมูลที่กรอกไว้ — ใช้ได้ทันทีไม่ต้องมี backend
2. **ตั้งค่า `NEXT_PUBLIC_QUOTE_ENDPOINT`:** ฟอร์มจะ `POST` JSON (ส่งเป็น `Content-Type: text/plain` เพื่อเลี่ยง CORS preflight) ไปที่ URL ที่กำหนด

ตัวอย่าง payload:

```json
{ "name": "...", "company": "...", "email": "...", "phone": "...",
  "interest": "...", "message": "...", "locale": "th", "submittedAt": "ISO date" }
```

### ต่อกับ n8n
1. สร้าง workflow: **Webhook node** (Method: POST) → **Code/Set node** `JSON.parse($json.body)` → **Gmail/SMTP node** ส่งเข้าอีเมลคุณ
2. เอา Production Webhook URL ไปใส่ใน Vercel → Settings → Environment Variables → `NEXT_PUBLIC_QUOTE_ENDPOINT`
3. **Redeploy** (ค่า `NEXT_PUBLIC_*` ถูกฝังตอน build — แก้แล้วต้อง build ใหม่เสมอ)

### ต่อกับ Google Apps Script
```js
function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  MailApp.sendEmail({
    to: "touchwich.cha@gmail.com",
    subject: `ขอใบเสนอราคา — ${d.interest} (${d.name})`,
    body: `ชื่อ: ${d.name}\nบริษัท: ${d.company}\nอีเมล: ${d.email}\nโทร: ${d.phone}\n\n${d.message}`,
  });
  return ContentService.createTextOutput("ok");
}
```
Deploy เป็น **Web App** (Execute as: Me · Who has access: Anyone) แล้วเอา URL ที่ลงท้าย `/exec` ไปใส่ `NEXT_PUBLIC_QUOTE_ENDPOINT`

ทดสอบ local: ใส่ค่าใน `.env.local` (ดูตัวอย่างที่ `.env.example`) แล้วรัน dev ใหม่

## วิดีโอ (ช่อง Food Safety Thailand)

ช่อง YouTube `@foodsafetythailand` เป็นผลงานของเรา (คำโปรยช่องระบุ "ผลิตโดย HR Solution Service" และลิงก์กลับมาที่เว็บนี้)

| ข้อมูล | ที่อยู่ |
|---|---|
| `channel` | ลิงก์ช่อง/เพลย์ลิสต์/TikTok + `videoCount` (ใช้ใน header, footer, JSON-LD `sameAs`) |
| `videos` | 3 คลิปคัดสำหรับหน้าแรก (ตัวแรก = ตัวเล่นหลักแนวนอน, อีก 2 = แนวตั้ง) |
| `videoGroups` | คลังเต็ม 49 คลิป (ตรวจ 2026-11-14) แบ่ง 3 หมวด: `gmp420` (17), `micro-learning` (27), `quiz` (5) — หน้า /videos แสดงหมวดละ 6 คลิปแรก กด "ดูเพิ่ม" เพื่อเปิดที่เหลือ |
| `videoPublished` | วันที่เผยแพร่จริงของทุกคลิป (ใช้ทำ `VideoObject` schema) — **ห้ามเดา ถ้าไม่มีข้อมูลให้เว้น** |

- หน้า `/{th|en}/videos` เรนเดอร์จาก `videoGroups` + สร้าง `CollectionPage`/`VideoObject` JSON-LD อัตโนมัติ
- `VideoTile` เป็น **click-to-play**: ยังไม่คลิก = โหลดแค่ thumbnail จาก `i.ytimg.com`, คลิกแล้วจึงใส่ iframe (`youtube-nocookie`) — หน้าเดียวมี 30+ คลิปก็ไม่หนัก
- เพิ่มคลิปใหม่: เพิ่ม object ใน `videoGroups` (id/duration/title TH-EN) แล้วเพิ่มวันที่ใน `videoPublished` และอัปเดต `channel.videoCount` (ตัวเลขในข้อความอื่นดึงจากค่านี้อัตโนมัติ)
- คลิป Private ห้ามใส่ (คนดูจะเห็นหน้าว่าง) ใส่เฉพาะคลิป Public/Unlisted
- วิดีโอพื้นหลังหน้าแรก: `heroVideo` ใน `app/site-data.ts` (ลิงก์ Cloudinary + รูปปก) — ผู้ใช้ที่ตั้งค่าลดการเคลื่อนไหวหรือเปิดโหมดประหยัดข้อมูลจะเห็นรูปนิ่งแทน

## สินค้า (หน้า /products)

เนื้อหาสินค้า 2 ตัว (น้องรับสมัคร AI, Contract Watch) อยู่ใน `products` ที่ `app/site-data.ts` (ภาษาไทย/อังกฤษ) ต้นทางข้อความคือไฟล์ Product Brief — เขียนเฉพาะความสามารถที่ยืนยันแล้ว ห้ามใส่ราคา/ตัวเลขผลลัพธ์ที่ไม่มีหลักฐาน

- Route: `/{th|en}/products` (หน้ารวม) และ `/{th|en}/products/{slug}` (หน้าสินค้า)
- ข้อมูลที่ต้องตรวจจากโค้ดจริงก่อนเขียนลงหน้า Contract Watch เก็บไว้ใน `verifyBeforePublish` (ไม่แสดงบนเว็บ)
- แผนภาพ flow ใช้สี: เทา = คน, ม่วง = ระบบทำเอง, เขียวอมฟ้า = ข้อมูล (`FlowDiagram`)
- ข้อมูลตัวอย่างบนหน้า (แชต ตารางสัญญา อีเมลสรุป) เป็นข้อมูลสมมติ และมีป้ายกำกับ

## ผลงานสื่อและระบบงาน HR

- หน้า /portfolio แสดงเฉพาะซีรีส์ใน `portfolioFeatured` (6 ชุด) ที่เหลือยังอยู่ใน `projectGroups` และรูปยังอยู่ใน `public/projects/` ถ้าจะนำกลับมาแสดง เพิ่ม slug ใน `portfolioFeatured`
- หน้า /hr-systems แสดงเป็นการ์ดย่อ (หัวการ์ด + ติ๊ก 3 ข้อ + แท็ก) ข้อความเต็มอยู่ในปุ่ม "ดูรายละเอียด" ข้อมูลมาจาก `caseStudies` (ฟิลด์ `short` ใช้กับแถวไอคอนด้านบน)

## QR Code LINE (หน้า Contact)

ไฟล์อยู่ที่ `public/line-qr.jpg` และอ้างจาก `contact.lineQr` ใน `app/site-data.ts`
เปลี่ยน QR ได้โดยทับไฟล์ชื่อเดิม (ไม่ต้องแก้โค้ด) — ขนาดที่แนะนำ 900×900 px ขึ้นไป

## หน้า HR Systems (case studies)

ข้อมูล 6 ระบบอยู่ใน `caseStudies` ที่ `app/site-data.ts` — **ไม่ระบุชื่อลูกค้า** (ระบุแค่ประเภทธุรกิจ)
ถ้าภายหลังต้องการใส่ screenshot จริง: ใช้ภาพที่ **ลบข้อมูลลูกค้า/ข้อมูลจริงออกแล้วเท่านั้น** วางใน `public/systems/<slug>/` แล้วเพิ่ม field ใน caseStudies + render ใน `CaseStudyCard`

## Deploy

- Push ขึ้น `main` → Vercel build อัตโนมัติ (โปรเจกต์ผูก Git integration อยู่แล้ว)
- โดเมนปัจจุบัน: `hr-solution-service.vercel.app` — กำหนดไว้ที่ `siteUrl` ใน `app/site-data.ts`
- Repo: `github.com/touchwich-cha/hr-solution-service`
- **ถ้าต่อ custom domain ในอนาคต:** แก้ `siteUrl` จุดเดียวแล้ว redeploy (optional ทำเมื่อไหร่ก็ได้ เว็บทำงานได้ปกติโดยไม่ต้องเปลี่ยน)

## หมายเหตุความปลอดภัย

- อย่า commit token/credential ลง repo และอย่าฝัง token ใน remote URL
- รูปและข้อความบนเว็บต้องไม่มีชื่อลูกค้า/ข้อมูลภายในของลูกค้า เว้นแต่ได้รับอนุญาตเป็นลายลักษณ์อักษร
