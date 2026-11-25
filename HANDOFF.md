# HANDOFF — เว็บไซต์ HR Solution Service

> ไฟล์นี้ให้ AI / คนที่มารับงานต่ออ่านก่อนเริ่มทุกครั้ง แล้วค่อยอ่าน `AGENTS.md`
> อัปเดตล่าสุด: **25 พ.ย. 2569** (redesign 2026 ขึ้น production แล้ว · ผูก domain hr-solution-service.com แล้ว)
> จบงานแต่ละครั้ง: แก้ส่วน "สถานะ" และ "งานค้าง" ในไฟล์นี้ แล้วใส่วันที่

## 1. ภาพรวม
| หัวข้อ | ค่า |
|---|---|
| เว็บจริง | **https://www.hr-solution-service.com** (`/th`, `/en`) · เดิม hr-solution-service.vercel.app |
| Domain | `hr-solution-service.com` ซื้อที่ Hostinger 25/11/2569 (1 ปี หมดอายุ 26/11/2570 ต่อ 519 บาท/ปี) · DNS: A `@` → 216.198.79.1, CNAME `www` → df62016f88294517.vercel-dns-017.com · apex → www (308) · `NEXT_PUBLIC_SITE_URL=https://www.hr-solution-service.com` (Production) |
| โค้ด | โฟลเดอร์นี้ · GitHub `touchwich-cha/hr-solution-service` · branch หลัก `main` |
| Deploy | push `main` → Vercel production อัตโนมัติ · push branch อื่น → Preview (ต้องล็อกอิน Vercel ถึงเปิดได้) |
| Vercel | https://vercel.com/touchwichcha-1508s-projects/hr-solution-service |
| Stack | Next.js 16 (App Router, อ่าน `node_modules/next/dist/docs/` ก่อนเขียนโค้ด) · React 19 · Tailwind 4 + CSS เอง · TypeScript |
| ธุรกิจ | ขายบน Fastwork `@hrsolutionservice` · ราคา/แพ็กเกจบนเว็บต้องตรงกับ Fastwork เสมอ |
| ไฟล์ธุรกิจ | `D:\03_YouTube\HR Solution Service\05_Business\Fastwork_HR_Solution_Service\` (HANDOFF.md, ร่างโปรไฟล์ `profile/`) |

## 2. สถานะ (25/11/2569)
- ✅ **Redesign 2026 ขึ้น production** (merge `feat/redesign-2026` → `main`, commit `cbe102f`)
  - ธีมดำ + เหลืองทอง แนวเว็บต้นแบบ https://www.dopaminestudio.io (Awwwards) สีตาม Profile PDF ของเจ้าของ
  - ทุกหน้าใหม่: หน้าแรก, สินค้า, รายละเอียดสินค้า 9 ตัว, สื่ออบรม, เกี่ยวกับ, ติดต่อ (TH/EN)
- ✅ ราคาตรงกับ Fastwork ณ 25/11/2569 · สินค้า 8 ตัวลิงก์ไปประกาศ Fastwork ของตัวเอง (`fastworkUrl`)
- ✅ SEO: ชื่อหน้า/คำอธิบายใหม่, ProfessionalService + Service + VideoObject + FAQPage + Breadcrumb, sitemap/robots/hreflang, ภาพแชร์ `public/og.jpg`
- ✅ พร้อมย้าย domain: ตั้ง `NEXT_PUBLIC_SITE_URL` อย่างเดียว ดู `DOMAIN.md`
- ตรวจแล้ว: lint / tsc / build ผ่าน, ทุกหน้าตอบ 200 บน production, มือถือ 375px ไม่มีเลื่อนแนวนอน

## 3. งานค้าง (เรียงตามความสำคัญ)
1. **Domain** — ✅ ผูกแล้ว 25/11/2569 · ⚠️ เจ้าของต้องกดยืนยันอีเมลจาก Hostinger ภายใน **9/12/2569** ไม่งั้นโดเมนถูกระงับ
   - Google Search Console: property แบบ Domain `hr-solution-service.com` ยืนยันด้วย TXT ใน DNS Hostinger แล้ว (บัญชี Google ของเจ้าของ) · ส่ง sitemap แล้ว Google อ่านได้ 28 หน้า · **ห้ามลบ TXT google-site-verification**
   - Bing Webmaster Tools: import จาก GSC แล้ว (บัญชี Google maizamag.cha@gmail.com, site https://hr-solution-service.com/) · ส่ง sitemap แล้ว · IndexNow key อยู่ที่ public/a891b8299439cdf08068ef509d14b9a5.txt (ห้ามลบ)
   - บทความ (Thai) อยู่ที่ /th/articles · เพิ่มบทความที่ app/articles-data.ts (เฉพาะข้อเท็จจริงที่ตรวจกับต้นฉบับ) แล้ว sitemap อัปเดตเอง
   - ฟอนต์ self-host ด้วย fontsource (ห้ามกลับไปใช้ next/font/google เพราะ build บน Vercel เคยล้มเมื่อดึง Google Fonts ไม่ได้)
   - ยังไม่ได้: เปลี่ยนลิงก์เว็บใน YouTube/Facebook/TikTok/LINE OA/E-Book เป็นโดเมนใหม่
2. **สินค้า "ข้อสอบอบรม + เกียรติบัตร" (`training-exam`, เริ่ม ฿300)** — ไม่มีประกาศบน Fastwork แต่ยังแสดงบนเว็บ · รอเจ้าของตัดสินใจ เก็บ / ซ่อน
3. **คู่มือการใช้งาน (฿499) และไฟล์ HR สำเร็จรูป (฿250)** — ตอนนี้เป็นการ์ดลิงก์ไป Fastwork (`homeServices` ใน `app/home-data.ts`) ยังไม่มีหน้าสินค้าของตัวเอง · ภาพมีใน `05_Business/.../products/manual/out/` · ไฟล์ HR อ่านแพ็กเกจจาก Fastwork ได้แค่ 2 ตัว (250 / 599) ต้องเช็คก่อน
4. **คู่มือ Premium** บน Fastwork = 2,900 แต่บันทึกเก่าบอกเจ้าของตั้ง 2,990 → ถามเจ้าของ
5. ล้างโค้ดเก่าที่ไม่ใช้แล้ว (ทำเมื่อว่าง): `components/shared/*` หลายตัว (HeroVideo, SystemsSection, ProductGroups, FastworkNote, CallToAction, PageIntro, ProcessSteps ฯลฯ) และ CSS เดิมใน `app/globals.css` · แพ็กเกจ `@fontsource-variable/*` ใน package.json ไม่ได้ใช้แล้ว
6. ลบโฟลเดอร์/ไฟล์ขยะใน repo ที่ไม่เกี่ยว (`SCG/`, `stitch_reference_temp/`, zip) — ถามเจ้าของก่อน

## 4. กติกาจากเจ้าของ (ห้ามฝ่า)
- **ห้ามใช้รูปถ่ายเจ้าของ** บนเว็บ (สั่ง 25/11/2569)
- **ห้ามใช้ตัวเลขลดการลาออก** (QC 70% / ปวช.-ปวส. 50% / ตอบคอมเมนต์ 70%) ในทุกช่องทาง
- ใช้ตัวเลขจริงที่ตรวจได้เท่านั้น: 17 ปีในโรงงาน · Senior HR Manager 15+ ปี · องค์กร 1,000+ คน · ระบบที่ใช้จริง 15+ · วิทยากร GMP / ISO 9001/14001/45001 · n8n Certified
- ไม่ระบุชื่อนายจ้าง · ภาพระบบภายในต้องเป็นภาพจำลอง ไม่ใช่หน้าจอจริงที่มีข้อมูลบริษัท
- ช่องทางติดต่อที่โชว์: อีเมล `touchwich.cha@gmail.com` + QR LINE (`public/line-qr.jpg`) + โทร
- ไม่ใส่ช่อง YouTube "นิทานแสนสุข" บนเว็บธุรกิจ
- เปลี่ยนราคา = แก้ที่ `app/catalog-data.ts` และบน Fastwork พร้อมกัน
- ขึ้น production (push `main`) ต้องได้คำยืนยันจากเจ้าของก่อน · ทำงานบน branch แล้วส่ง Preview ให้ดู

## 5. แผนที่โค้ด (redesign 2026)
| ต้องการแก้ | ไฟล์ |
|---|---|
| ข้อความหน้าแรก (hero, ผลงาน 6 คลิป, บริการ, ขั้นตอน, ตัวเลข, ห้องระบบ 16 ระบบ, FAQ, CTA) | `app/home-data.ts` |
| สินค้า ราคา แพ็กเกจ ลิงก์ Fastwork | `app/catalog-data.ts` |
| ชื่อหน้า/คำอธิบาย SEO, ช่องทาง, ที่อยู่เว็บ, วันเผยแพร่คลิป (`videoPublished`), วันที่ sitemap (`siteUpdated`) | `app/site-data.ts` |
| สไตล์ใหม่ทั้งหมด (prefix `rd-`) + map สีเก่าเป็นธีมมืด | `app/redesign.css` (โหลดหลัง `globals.css`) |
| ฟอนต์ (Anuphan / IBM Plex Sans Thai / JetBrains Mono ผ่าน `next/font`) + JSON-LD ธุรกิจ | `app/[locale]/layout.tsx` |
| เมนู / ส่วนหัว / ส่วนท้าย / ปุ่ม LINE ลอย / เคอร์เซอร์ | `components/layout/Shell.tsx` |
| หน้าต่างๆ | `components/pages/*Page.tsx` |
| ส่วนที่ต้องโต้ตอบ (กล่อง 3D, กรองผลงาน + video modal, ขั้นตอน sticky, นับตัวเลข, ห้องระบบ, VideoGrid) | `components/home/HomeClient.tsx` |
| บล็อกใช้ร่วม (หัวหน้า RdIntro, แถบ Fastwork, CTA ท้ายหน้า) | `components/rd/Blocks.tsx` |
| redirect URL เก่า | `next.config.ts` |
| SEO helper (breadcrumb, Service JSON-LD) / sitemap / robots | `app/seo.ts`, `app/sitemap.ts`, `app/robots.ts` |

ต้นแบบดีไซน์ (HTML นิ่ง): `D:\03_YouTube\HR Solution Service\05_Business\Fastwork_HR_Solution_Service\web_mockup\home.html`

## 6. คำสั่ง
```powershell
npm run lint
npx tsc --noEmit -p .
npm run build
npx next start -p 3417   # ดูผลหลัง build ที่ http://localhost:3417/th
```
- เพิ่มคลิปผลงานหน้าแรก: ใส่ใน `homeWork.cases` (`app/home-data.ts`) + วันเผยแพร่ใน `videoPublished` (อ่าน `publishDate` จากหน้า YouTube ห้ามเดา)
- ภาพแชร์ `public/og.jpg` สร้างจาก HTML ด้วย Playwright + Edge (ฟอนต์ไทยต้องใช้ browser render; PIL บนเครื่องนี้วางสระ/วรรณยุกต์ไทยผิด)

## 7. ประวัติ
| วันที่ | งาน | commit |
|---|---|---|
| 25/11/2569 | Redesign หน้าแรก + shell + ธีมดำทอง | `acfb68e` |
| 25/11/2569 | หน้าย่อยทั้งหมดสไตล์ใหม่ | `1f1e1c4` |
| 25/11/2569 | SEO + เตรียม domain + og.jpg | `e75b273` |
| 25/11/2569 | Merge ขึ้น production | `cbe102f` |
| 25/11/2569 | ผูก domain hr-solution-service.com + ตั้ง NEXT_PUBLIC_SITE_URL · .vercel.app และ apex redirect 308 → www | (ตั้งค่าใน Hostinger/Vercel) |
| 25/11/2569 | Google Search Console ยืนยันโดเมน + ส่ง sitemap (28 หน้า) | – |
