import Link from "next/link";
import {
  channel,
  featuredVideoIds,
  pageSeo,
  servicePillars,
  siteUrl,
  videoGroups,
  videoPublished,
  type Locale,
  type VideoItem,
} from "@/app/site-data";
import { breadcrumbJsonLd } from "@/app/seo";
import { PageIntro } from "@/components/shared/PageIntro";
import { CallToAction } from "@/components/shared/CallToAction";
import { FeaturedSeries } from "@/components/shared/FeaturedSeries";
import { VideoTile } from "@/components/shared/VideoTile";
import { JsonLd } from "@/components/shared/JsonLd";

const allVideos = videoGroups.flatMap((group) => group.videos);
const pick = (ids: readonly string[]) =>
  ids.map((id) => allVideos.find((video) => video.id === id)).filter((video): video is VideoItem => Boolean(video));

/** "7:04" → "PT7M4S" (ISO 8601 duration, as VideoObject expects). */
function isoDuration(value?: string) {
  if (!value || !/^\d+:\d{2}$/.test(value)) return undefined;
  const [minutes, seconds] = value.split(":").map(Number);
  return `PT${minutes}M${seconds}S`;
}

export function TrainingMediaPage({ locale }: { locale: Locale }) {
  const th = locale === "th";
  const media = servicePillars[0];
  const wide = pick(featuredVideoIds.wide);
  const tall = pick(featuredVideoIds.tall);
  const shown = [...wide, ...tall];

  // VideoObject needs a real upload date — only clips with a verified date are marked up.
  const videoJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: shown
      .filter((video) => videoPublished[video.id])
      .map((video, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "VideoObject",
          name: video.title[locale],
          description: video.title[locale],
          thumbnailUrl: `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`,
          uploadDate: videoPublished[video.id],
          duration: isoDuration(video.duration),
          embedUrl: `https://www.youtube-nocookie.com/embed/${video.id}`,
          url: `https://youtu.be/${video.id}`,
          publisher: { "@type": "Organization", name: "HR Solution Service", url: siteUrl },
        },
      })),
  };

  return (
    <main>
      <JsonLd data={breadcrumbJsonLd(locale, pageSeo[""].crumb[locale], [{ name: pageSeo["training-media"].crumb[locale], path: "training-media" }])} />
      <JsonLd data={videoJsonLd} />
      <PageIntro
        eyebrow="Training media"
        title={pageSeo["training-media"].title[locale]}
        body={media.intro[locale]}
      />

      {/* ─── WHAT WE MAKE ─── */}
      <section className="product-section section-pad">
        <div className="product-heading reveal">
          <h2>{th ? "สิ่งที่เราผลิต" : "What we make"}</h2>
        </div>
        <div className="make-grid">
          {media.items.map(([number, title, body]) => (
            <article key={number} className="make-card reveal">
              <span className="make-num">{number}</span>
              <h3>{title[locale]}</h3>
              <p>{body[locale]}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ─── FEATURED SERIES ─── */}
      <section className="product-section section-pad">
        <div className="product-heading reveal">
          <h2>{th ? "ผลงานเด่น 6 ซีรีส์" : "6 standout series"}</h2>
          <p>
            {th
              ? "เปิดดูแต่ละซีรีส์เพื่อดูภาพทั้งหมด ผลงานชุดอื่นดูต่อได้ที่ช่องของเรา"
              : "Open a series to see every visual. More of our work is on our channels."}
          </p>
        </div>
      </section>
      <FeaturedSeries locale={locale} />

      {/* ─── VIDEOS ─── */}
      <section id="videos" className="product-section section-pad">
        <div className="product-heading reveal">
          <h2>{th ? "วิดีโอเด่น" : "Featured videos"}</h2>
          <p>
            {th
              ? `คัดมาจาก ${channel.videoCount} คลิปบนช่อง ${channel.name} — จอกว้างสำหรับห้องอบรม และแนวตั้งสำหรับมือถือ`
              : `Picked from ${channel.videoCount} videos on the ${channel.name} channel — widescreen for the training room, vertical for mobile.`}
          </p>
        </div>
        <div className="video-grid">
          {wide.map((video, index) => <VideoTile key={video.id} video={video} locale={locale} priority={index === 0} />)}
        </div>
        <div className="video-grid video-grid-tall">
          {tall.map((video) => <VideoTile key={video.id} video={video} locale={locale} />)}
        </div>
        <div className="more-work reveal">
          <h2>{th ? `ดูครบทั้ง ${channel.videoCount} คลิปได้ที่ช่องของเรา` : `Watch all ${channel.videoCount} videos on our channels`}</h2>
          <div className="more-work-links">
            <a className="button" href={channel.youtube} target="_blank" rel="noopener noreferrer">YouTube ↗</a>
            <a className="button outline" href={channel.facebook} target="_blank" rel="noopener noreferrer">Facebook ↗</a>
            <a className="button outline" href={channel.tiktok} target="_blank" rel="noopener noreferrer">TikTok ↗</a>
          </div>
          <Link className="text-link" href={`/${locale}/products`}>
            {th ? "ดูระบบผู้ช่วยอัตโนมัติของเรา →" : "See our automation assistants →"}
          </Link>
        </div>
      </section>

      <CallToAction locale={locale} />
    </main>
  );
}
