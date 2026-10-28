import Image from "next/image";
import { contact, type Locale } from "@/app/site-data";
import { QuoteForm } from "@/components/shared/QuoteForm";

export function ContactPage({ locale }: { locale: Locale }) {
  return (
    <main>
      <section className="contact-page section-pad">
        <div className="contact-content">
          <p className="eyebrow">Start a project</p>
          <h1>
            {locale === "th"
              ? "เล่าโจทย์ของคุณ รับใบเสนอราคาใน 24 ชม."
              : "Tell us the brief — quote within 24 hours"}
          </h1>
          <p className="lede">
            {locale === "th"
              ? "กรอกฟอร์มด้านล่าง หรือติดต่อทางอีเมล/โทรศัพท์ก็ได้ เราจะช่วยแนะนำรูปแบบสื่อหรือระบบที่เหมาะกับโจทย์และงบของคุณ"
              : "Use the form below or reach us by email or phone — we'll recommend the media format or system that fits your brief and budget."}
          </p>
        </div>
        <div id="quote" className="quote-panel">
          <QuoteForm locale={locale} />
        </div>
        <div className="contact-methods">
          <a href={`mailto:${contact.email}`} className="contact-link">
            <span className="contact-label">Email</span>
            <div className="contact-detail">
              <strong>{contact.email}</strong>
              <small>{locale === "th" ? "ตอบกลับภายใน 24 ชั่วโมง" : "Replies within 24 hours"}</small>
            </div>
            <span className="contact-arrow">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </span>
          </a>
          <a href={`tel:${contact.phone}`} className="contact-link">
            <span className="contact-label">Phone</span>
            <div className="contact-detail">
              <strong>{contact.phoneDisplay}</strong>
              <small>{contact.hours[locale]}</small>
            </div>
            <span className="contact-arrow">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </span>
          </a>
        </div>
        <div className="contact-line-card">
          <div className="contact-line-copy">
            <span className="contact-label">LINE</span>
            <h2>{locale === "th" ? "แชทกับเราทาง LINE" : "Chat with us on LINE"}</h2>
            <p>
              {locale === "th"
                ? "สแกน QR Code ด้วยแอป LINE เพื่อคุยกับทีมเราโดยตรง ส่งโจทย์งานสื่อหรือระบบ พร้อมขอใบเสนอราคาได้ทันที"
                : "Scan the QR code with the LINE app to reach our team directly — send a media or systems brief and ask for a quote in the same chat."}
            </p>
            <a className="text-link" href={`/${locale}/videos`}>
              {locale === "th" ? "ดูวิดีโอผลงานก่อนตัดสินใจ" : "Watch our published videos first"}
            </a>
          </div>
          <figure className="contact-qr">
            <Image
              src={contact.lineQr}
              alt={locale === "th" ? "QR Code สำหรับเพิ่มเพื่อน LINE ของ HR Solution Service" : "LINE QR code to add HR Solution Service"}
              width={900}
              height={900}
              sizes="(max-width: 720px) 60vw, 220px"
            />
            <figcaption>{locale === "th" ? "สแกนด้วยแอป LINE" : "Scan with the LINE app"}</figcaption>
          </figure>
        </div>
      </section>
    </main>
  );
}
