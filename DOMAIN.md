# ย้ายเว็บไปใช้ domain ของตัวเอง (ทำครั้งเดียว ~15 นาที)

โค้ดเตรียมไว้แล้ว: ที่อยู่เว็บอ่านจาก `NEXT_PUBLIC_SITE_URL` (`app/site-data.ts`) ทั้ง canonical, sitemap, robots, hreflang และ structured data จะเปลี่ยนตามเองทั้งหมด ไม่ต้องแก้โค้ด

## 1. ซื้อ domain
แนะนำ `.com` หรือ `.co.th` (ต้องมีเอกสารบริษัท) สั้น จำง่าย เช่น `hrsolution...` ซื้อได้ที่ Vercel (Settings → Domains → Buy) หรือผู้ให้บริการอื่น

## 2. ผูก domain กับ Vercel
1. Vercel → โปรเจกต์ `hr-solution-service` → **Settings → Domains → Add** ใส่ `www.โดเมนของคุณ` และ `โดเมนของคุณ`
2. ตั้งให้ตัวหนึ่ง redirect ไปอีกตัว (แนะนำใช้ `www.` เป็นหลัก) Vercel มีตัวเลือกให้ในหน้าเดียวกัน
3. ถ้าซื้อที่อื่น ให้ตั้ง DNS ตามที่ Vercel แสดง (A record / CNAME)

## 3. บอกเว็บว่าที่อยู่ใหม่คืออะไร
1. Vercel → **Settings → Environment Variables → Add**
   - Key: `NEXT_PUBLIC_SITE_URL`
   - Value: `https://www.โดเมนของคุณ` (ไม่มี `/` ท้าย)
   - Environment: **Production** เท่านั้น
2. **Deployments → Redeploy** production 1 ครั้ง (ค่านี้ถูกอ่านตอน build)
3. เปิด `https://www.โดเมนของคุณ/sitemap.xml` ต้องเห็นลิงก์เป็นโดเมนใหม่ทั้งหมด

## 4. ให้ที่อยู่เดิมพาไปที่ใหม่
ใน **Settings → Domains** แก้ `hr-solution-service.vercel.app` ให้ **Redirect to** โดเมนใหม่ (308) เพื่อให้ Google ย้ายคะแนนจากที่อยู่เดิมมา

## 5. ส่งเว็บให้ Google (เจ้าของต้องทำเอง)
1. https://search.google.com/search-console → Add property → **Domain** → ยืนยันด้วย DNS TXT ที่ผู้ให้บริการ domain
2. เมนู **Sitemaps** → ส่ง `sitemap.xml`
3. เมนู **URL Inspection** → ใส่หน้าแรก `/th` แล้วกด Request indexing
4. แก้ลิงก์เว็บในทุกช่องทางให้เป็นโดเมนใหม่: YouTube (About + end card), Facebook, TikTok, LINE OA, E-Book PDF, ลายเซ็นอีเมล
   (ห้ามใส่ลิงก์ในข้อความประกาศ Fastwork ตามกติกา Fastwork)

## สิ่งที่มีให้ Google แล้วในโค้ด
| ส่วน | ที่อยู่ |
|---|---|
| sitemap ทุกหน้า ภาษาไทย + อังกฤษ | `app/sitemap.ts` (`siteUpdated` ใน `site-data.ts` = วันที่แก้เนื้อหาล่าสุด) |
| robots | `app/robots.ts` |
| canonical + hreflang th/en | `app/[locale]/[[...slug]]/page.tsx` |
| ธุรกิจ (ProfessionalService) + สินค้าและราคา | `app/[locale]/layout.tsx` |
| สินค้าแต่ละตัว (Service + AggregateOffer) | `app/seo.ts` |
| วิดีโอผลงาน (VideoObject) | หน้าแรก + หน้าสื่ออบรม (เฉพาะคลิปที่มีวันเผยแพร่ใน `videoPublished`) |
| คำถามที่พบบ่อย (FAQPage) | หน้าติดต่อ |
| breadcrumb | ทุกหน้าย่อย |
| ภาพแชร์ลิงก์ | `public/og.jpg` (1200×630) |

เพิ่มคลิปใหม่ในหน้าแรก: ใส่ id ใน `app/home-data.ts` และวันเผยแพร่ใน `videoPublished` (`app/site-data.ts`)
