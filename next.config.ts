import type { NextConfig } from "next";

// Pages merged in the site restructure: old URL -> new home. Permanent (308) so search engines
// move the old addresses to the new ones. Keep in sync with the pages in app/[locale]/[[...slug]].
const mergedPages: { from: string; to: string }[] = [
  { from: "services", to: "products" },
  { from: "hr-systems", to: "products#systems" },
  { from: "portfolio", to: "training-media" },
  { from: "videos", to: "training-media#videos" },
  { from: "process", to: "about#process" },
  // Old 5-assistant product pages -> the closest product in the new 9-product catalogue.
  { from: "products/line-hr-assistant", to: "products/chatbot-faq" },
  { from: "products/safety-officer-assistant", to: "products/chatbot-faq" },
  { from: "products/comment-reply-assistant", to: "products/chatbot-faq" },
  { from: "products/slip-ocr-alert", to: "products/doc-alert" },
  { from: "products/contract-watch", to: "products/doc-alert" },
];

const nextConfig: NextConfig = {
  async redirects() {
    return mergedPages.map(({ from, to }) => ({
      source: `/:locale(th|en)/${from}`,
      destination: `/:locale/${to}`,
      permanent: true,
    }));
  },
};

export default nextConfig;
