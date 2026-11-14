import type { NextConfig } from "next";

// Pages merged in the site restructure: old URL -> new home. Permanent (308) so search engines
// move the old addresses to the new ones. Keep in sync with the pages in app/[locale]/[[...slug]].
const mergedPages: { from: string; to: string }[] = [
  { from: "services", to: "products" },
  { from: "hr-systems", to: "products#systems" },
  { from: "portfolio", to: "training-media" },
  { from: "videos", to: "training-media#videos" },
  { from: "process", to: "about#process" },
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
