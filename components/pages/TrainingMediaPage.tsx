import Link from "next/link";
import {
  channel,
  featuredVideoIds,
  pageSeo,
  servicePillars,
  siteUrl,
  videoGroups,
  videoPublished, videoUploadDate,
  type Locale,
  type VideoItem,
} from "@/app/site-data";
import { breadcrumbJsonLd } from "@/app/seo";
import { JsonLd } from "@/components/shared/JsonLd";
import { FeaturedSeries } from "@/components/shared/FeaturedSeries";
import { CtaBlock, RdIntro } from "@/components/rd/Blocks";
import { VideoGrid, WorkCases } from "@/components/home/HomeClient";

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
  const shown = [...pick(featuredVideoIds.wide), ...pick(featuredVideoIds.tall)];

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
          uploadDate: videoUploadDate(video.id),
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
      <RdIntro
        locale={locale}
        eyebrow={th ? "สื่ออบรม · Training media" : "Training media"}
        title={{ th: "กฎที่จำไม่ได้", en: "Rules nobody remembers" }}
        accent={{ th: "ทำให้เห็นภาพ", en: "become scenes they do" }}
        body={media.intro}
      >
        <a className="rd-btn rd-btn-acc" href="#videos">{th ? "ดูวิดีโอผลงาน" : "Watch the videos"} ↓</a>
        <Link className="rd-btn rd-btn-line" href={`/${locale}/products/gmp-3d-video`}>{th ? "ดูแพ็กเกจและราคา" : "Tiers & prices"} →</Link>
      </RdIntro>

      <section className="rd-sec" style={{ paddingTop: 40 }}>
        <div className="rd-wrap">
          <div className="rd-head rd-rv">
            <div>
              <div className="rd-eyebrow rd-mono">{th ? "สิ่งที่เราผลิต" : "What we make"}</div>
              <h2 className="rd-big">{th ? "จากกระดาษ" : "From paper"} <span className="rd-acc">{th ? "สู่ฉาก 3D" : "to 3D scenes"}</span></h2>
            </div>
          </div>
          <div className="rd-svc rd-svc-4 rd-rv">
            {media.items.map(([number, title, body]) => (
              <div className="rd-svc-col" key={number}>
                <div className="rd-svc-n" aria-hidden="true">{number}</div>
                <h3>{title[locale]}</h3>
                <p className="rd-muted">{body[locale]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rd-sec" style={{ paddingTop: 20 }}>
        <div className="rd-wrap"><WorkCases locale={locale} /></div>
      </section>

      <section id="videos" className="rd-sec" style={{ paddingTop: 20 }}>
        <div className="rd-wrap">
          <div className="rd-head rd-rv">
            <div>
              <div className="rd-eyebrow rd-mono">{th ? "วิดีโอเด่น" : "Featured videos"}</div>
              <h2 className="rd-big">{th ? "จอกว้างและ" : "Widescreen &"} <span className="rd-acc">{th ? "แนวตั้ง" : "vertical"}</span></h2>
            </div>
            <p>
              {th
                ? `คัดมาจาก ${channel.videoCount} คลิปบนช่อง ${channel.name} — 16:9 สำหรับห้องอบรม และ 9:16 สำหรับมือถือ`
                : `Picked from ${channel.videoCount} videos on the ${channel.name} channel — 16:9 for the training room, 9:16 for mobile.`}
            </p>
          </div>
          <VideoGrid locale={locale} videos={shown} />
          <div className="rd-channels rd-rv">
            <span className="rd-mono">{th ? `ดูครบทั้ง ${channel.videoCount} คลิป` : `All ${channel.videoCount} videos`}</span>
            <a className="rd-btn rd-btn-acc" href={channel.youtube} target="_blank" rel="noopener noreferrer">YouTube ↗</a>
            <a className="rd-btn rd-btn-line" href={channel.facebook} target="_blank" rel="noopener noreferrer">Facebook ↗</a>
            <a className="rd-btn rd-btn-line" href={channel.tiktok} target="_blank" rel="noopener noreferrer">TikTok ↗</a>
          </div>
        </div>
      </section>

      <section className="rd-sec rd-series" style={{ paddingTop: 20 }}>
        <div className="rd-wrap">
          <div className="rd-head rd-rv">
            <div>
              <div className="rd-eyebrow rd-mono">{th ? "ซีรีส์ภาพ 3D" : "3D image series"}</div>
              <h2 className="rd-big">{th ? "ผลงานเด่น" : "Standout"} <span className="rd-acc">{th ? "6 ซีรีส์" : "series"}</span></h2>
            </div>
            <p>{th ? "เปิดดูแต่ละซีรีส์เพื่อดูภาพทั้งหมด" : "Open a series to see every visual."}</p>
          </div>
        </div>
        <FeaturedSeries locale={locale} />
      </section>

      <CtaBlock locale={locale} />
    </main>
  );
}
