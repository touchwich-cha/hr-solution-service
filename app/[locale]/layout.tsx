import type { Metadata } from "next";
// Fonts are self-hosted (fontsource) so the build never depends on fetching Google Fonts.
import "@fontsource-variable/anuphan";
import "@fontsource/ibm-plex-sans-thai/400.css";
import "@fontsource/ibm-plex-sans-thai/500.css";
import "@fontsource/ibm-plex-sans-thai/600.css";
import "@fontsource-variable/jetbrains-mono";
import "../globals.css";
import "../redesign.css";
import { brand, siteUrl, contact, channel, pageSeo } from "@/app/site-data";
import { fastwork, fromPrice, fwProducts } from "@/app/catalog-data";

const siteDescription = pageSeo[""].description.th;

// One business entity for Google: a professional service (no street address — remote service across Thailand).
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${siteUrl}/#business`,
  name: brand.name,
  url: siteUrl,
  description: siteDescription,
  email: contact.email,
  telephone: contact.phone,
  areaServed: { "@type": "Country", name: "Thailand" },
  logo: `${siteUrl}/logo-mark.png`,
  image: `${siteUrl}/og.jpg`,
  priceRange: "฿250–฿15,990",
  availableLanguage: ["th", "en"],
  contactPoint: [{
    "@type": "ContactPoint",
    contactType: "sales",
    email: contact.email,
    telephone: contact.phone,
    availableLanguage: ["Thai", "English"],
    areaServed: "TH",
  }],
  sameAs: [channel.youtube, channel.tiktok, channel.facebook, fastwork.profileUrl],
  knowsAbout: [
    "HR automation", "Google Apps Script", "n8n", "LINE chatbot", "GMP", "Food Safety training",
    "ISO 9001", "ISO 14001", "ISO 45001", "3D training video", "Employee assessment",
  ],
  makesOffer: fwProducts.map((product) => ({
    "@type": "Offer",
    url: `${siteUrl}/th/products/${product.slug}`,
    priceCurrency: "THB",
    price: fromPrice(product),
    itemOffered: { "@type": "Service", name: product.name.th, description: product.oneLiner.th },
  })),
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${pageSeo[""].title.th} | ${brand.name}`,
    template: `%s | ${brand.name}`,
  },
  description: siteDescription,
  keywords: [
    "สื่ออบรม", "GMP", "Food Safety", "E-Learning", "ระบบ HR", "HR automation",
    "ระบบประเมินผล KPI", "Onboarding", "Google Apps Script", brand.name,
    "training media", "HR systems", "hr solution", "รับทำสื่ออบรม", "วิดีโออบรม 3D",
    "แบบทดสอบ Logical", "DISC", "แชตบอท LINE", "ระบบแจ้งเตือนทดลองงาน", "n8n",
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
    title: `${brand.name} — งาน HR ส่วนใหญ่ยังทำด้วยมือ นั่นคือทางเลือก`,
    description: siteDescription,
    url: siteUrl,
    siteName: brand.name,
    locale: "th_TH",
    type: "website",
    images: [
      {
        url: `${siteUrl}/og.jpg`,
        width: 1200,
        height: 630,
        alt: `${brand.name} — สื่ออบรม 3D แบบทดสอบ HR และระบบอัตโนมัติ`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${brand.name} — งาน HR ส่วนใหญ่ยังทำด้วยมือ นั่นคือทางเลือก`,
    description: siteDescription,
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
        <meta name="theme-color" content="#0b0c0e" />
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
