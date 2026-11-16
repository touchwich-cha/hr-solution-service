import type { Metadata } from "next";
import "@fontsource-variable/noto-sans-thai";
import "@fontsource-variable/inter";
import "@fontsource-variable/montserrat";
import "../globals.css";
import { brand, siteUrl, contact, channel } from "@/app/site-data";
import { fwProducts } from "@/app/catalog-data";

const siteDescription =
  `ให้ระบบจัดการงานซ้ำซ้อน เพื่อให้คุณโฟกัสงานสำคัญ — ${fwProducts.length} สินค้า 3 แพ็กเกจ — วิดีโออบรม แบบทดสอบ HR ระบบแจ้งเตือนเอกสาร และแชตบอท LINE พร้อมสื่ออบรม GMP / Food Safety แบบ 3D และวิดีโอเผยแพร่จริง ${channel.videoCount} คลิป`;

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: brand.name,
  url: siteUrl,
  description: siteDescription,
  email: contact.email,
  telephone: contact.phone,
  areaServed: "TH",
  logo: `${siteUrl}/og.jpg`,
  sameAs: [channel.youtube, channel.tiktok, channel.facebook],
  knowsAbout: ["HR automation", "LINE chatbot", "Google Workspace automation", "GMP", "Food Safety training"],
  makesOffer: fwProducts.map((product) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: product.name.en,
      description: product.oneLiner.en,
    },
  })),
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${brand.name} — สื่ออบรมและระบบงาน HR`,
    template: `%s | ${brand.name}`,
  },
  description: siteDescription,
  keywords: [
    "สื่ออบรม", "GMP", "Food Safety", "E-Learning", "ระบบ HR", "HR automation",
    "ระบบประเมินผล KPI", "Onboarding", "Google Apps Script", brand.name,
    "training media", "HR systems", "hr solution",
  ],
  authors: [{ name: brand.name }],
  creator: brand.name,
  publisher: brand.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: `${brand.name} — สื่ออบรมและระบบงาน HR`,
    description: "สื่ออบรมที่คนอยากดู ระบบงาน HR ที่ทำงานแทนคุณ — ผลงานจริง ระบบใช้งานจริง",
    url: siteUrl,
    siteName: brand.name,
    locale: "th_TH",
    type: "website",
    images: [
      {
        url: `${siteUrl}/og.jpg`,
        width: 1200,
        height: 630,
        alt: `${brand.name} — Food Safety training media`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${brand.name} — สื่ออบรมและระบบงาน HR`,
    description: "สื่ออบรมที่คนอยากดู ระบบงาน HR ที่ทำงานแทนคุณ — ผลงานจริง ระบบใช้งานจริง",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: brand.name,
  url: siteUrl,
  inLanguage: ["th", "en"],
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  return (
    <html lang={locale === "en" ? "en" : "th"}>
      <head>
        <meta name="theme-color" content="#06302B" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
