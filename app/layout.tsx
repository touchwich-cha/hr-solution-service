import type { Metadata } from "next";
import "@fontsource-variable/noto-sans-thai";
import "@fontsource-variable/inter";
import "@fontsource-variable/montserrat";
import "./globals.css";
import { brand, siteUrl, contact, channel, servicePillars } from "@/app/site-data";

const siteDescription =
  "สื่ออบรม GMP / Food Safety แบบ 3D กว่า 500 เฟรม พร้อมวิดีโอเผยแพร่จริง 34 คลิปบน YouTube และระบบงาน HR อัตโนมัติบน Google Workspace — คัดกรองใบสมัคร Onboarding ประเมิน KPI บันทึกงานภาคสนาม และแจ้งเตือนเอกสาร ใช้งานจริงแล้ว 6 ระบบ";

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
  sameAs: [channel.youtube, channel.tiktok],
  makesOffer: servicePillars.map((pillar) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: pillar.title.en,
      description: pillar.intro.en,
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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th">
      <head>
        <meta name="theme-color" content="#06302B" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
