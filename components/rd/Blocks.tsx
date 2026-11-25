// Shared server-rendered blocks for the 2026 redesign (page intro, Fastwork band, closing CTA).

import Link from "next/link";
import { contact, type Locale } from "@/app/site-data";
import { catalogCopy, fastwork } from "@/app/catalog-data";
import { homeCta } from "@/app/home-data";

type L = { th: string; en: string };

export function RdIntro({
  locale, eyebrow, title, accent, body, children,
}: { locale: Locale; eyebrow: string; title: L; accent?: L; body?: L; children?: React.ReactNode }) {
  return (
    <header className="rd-intro">
      <div className="rd-wrap">
        <div className="rd-eyebrow rd-mono">{eyebrow}</div>
        <h1>
          <span className="rd-line"><span>{title[locale]}</span></span>
          {accent && <span className="rd-line"><span className="rd-acc">{accent[locale]}</span></span>}
        </h1>
        {body && <p className="rd-intro-body">{body[locale]}</p>}
        {children && <div className="rd-ctas">{children}</div>}
      </div>
    </header>
  );
}

export function FastworkBand({ locale }: { locale: Locale }) {
  return (
    <section className="rd-wrap">
      <div className="rd-fwband rd-rv">
        <div>
          <span className="rd-mono rd-acc">Fastwork</span>
          <h2>{catalogCopy.fastworkTitle[locale]}</h2>
          <p>{catalogCopy.fastworkBody[locale]}</p>
        </div>
        <a className="rd-btn rd-btn-acc" href={fastwork.profileUrl} target="_blank" rel="noopener noreferrer">
          {catalogCopy.orderFastwork[locale]} ↗
        </a>
      </div>
    </section>
  );
}

export function CtaBlock({ locale, id = "contact" }: { locale: Locale; id?: string }) {
  return (
    <section className="rd-cta" id={id}>
      <div className="rd-wrap">
        <h2 className="rd-rv">{homeCta.title[0][locale]}<br />{homeCta.title[1][locale]}<br /><span className="rd-acc">{homeCta.title[2][locale]}</span></h2>
        <div className="rd-q rd-rv">
          <div>
            <h3>{homeCta.boxTitle[locale]}</h3>
            <p>{homeCta.boxBody[locale]}</p>
            <div className="row">
              <a className="rd-btn rd-btn-acc" href={`mailto:${contact.email}`}>✉ {contact.email}</a>
              <Link className="rd-btn rd-btn-line" href={`/${locale}/contact#quote`}>{locale === "th" ? "กรอกฟอร์มขอใบเสนอราคา" : "Quote request form"} →</Link>
            </div>
          </div>
          <div className="rd-qr">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={contact.lineQr} alt={locale === "th" ? "QR Code เพิ่มเพื่อน LINE" : "LINE QR code"} width={150} height={150} />
            <div className="rd-mono">{homeCta.scanLine[locale]}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
