import { channel, siteUrl, videoGroups, videoPublished, type Locale } from "@/app/site-data";
import { PageIntro } from "@/components/shared/PageIntro";
import { CallToAction } from "@/components/shared/CallToAction";
import { VideoTile } from "@/components/shared/VideoTile";

const allVideos = videoGroups.flatMap((group) => group.videos);

/** "7:04" → "PT7M4S" (ISO 8601 duration, as VideoObject expects). */
function isoDuration(value?: string) {
  if (!value || !/^\d+:\d{2}$/.test(value)) return undefined;
  const [minutes, seconds] = value.split(":").map(Number);
  return `PT${minutes}M${seconds}S`;
}

export function VideosPage({ locale }: { locale: Locale }) {
  const totalVideos = allVideos.length;
  const latestDate = [...new Set(Object.values(videoPublished))].sort().pop() ?? "";
  const latestLabel = latestDate
    ? new Intl.DateTimeFormat(locale === "th" ? "th-TH" : "en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        timeZone: "UTC",
      }).format(new Date(`${latestDate}T00:00:00Z`))
    : "";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: locale === "th" ? "วิดีโอสื่ออบรม Food Safety / GMP" : "Food Safety / GMP training videos",
    url: `${siteUrl}/${locale}/videos`,
    inLanguage: locale,
    isPartOf: { "@type": "WebSite", name: "HR Solution Service", url: siteUrl },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: totalVideos,
      itemListElement: allVideos.map((video, index) => ({
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
    },
  };

  const stats =
    locale === "th"
      ? [
          [String(totalVideos), "คลิปเผยแพร่จริง"],
          [String(videoGroups.length), "หมวดเนื้อหา"],
          [latestLabel, "อัปเดตล่าสุด"],
        ]
      : [
          [String(totalVideos), "published videos"],
          [String(videoGroups.length), "content tracks"],
          [latestLabel, "latest upload"],
        ];

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageIntro
        eyebrow="Learning media / YouTube"
        title={locale === "th" ? "วิดีโออบรมที่เผยแพร่จริง ไม่ใช่แค่ตัวอย่าง" : "Training videos that are actually published"}
        body={
          locale === "th"
            ? `รวม ${totalVideos} คลิปจากช่อง ${channel.name} — ซีรีส์ GMP420 ฉบับเต็ม คลิปสั้นสำหรับมือถือ และเกมส์ทายภาพ GMP ทั้งหมดคือผลงานที่ผลิตโดยทีมเรา`
            : `All ${totalVideos} clips from the ${channel.name} channel — the full GMP420 series, mobile-sized micro learning and the GMP picture quiz. Every one produced by our team.`
        }
      />

      <section className="channel-banner section-pad reveal">
        <div className="channel-copy">
          <p className="eyebrow">{locale === "th" ? "ช่องของเรา" : "Our channel"}</p>
          <h2>
            {channel.name} <span className="channel-handle">{channel.handle}</span>
          </h2>
          <p>
            {locale === "th"
              ? "สื่ออบรม Food Safety, GMP & GHP, HACCP, Personal Hygiene, Allergen Management และ Pest Control แบบแอนิเมชัน 3D — ใช้ได้ทั้งอบรมในโรงงานและให้พนักงานดูเอง"
              : "3D-animated Food Safety, GMP & GHP, HACCP, personal hygiene, allergen management and pest control — for factory training sessions and self-paced learning."}
          </p>
          <div className="channel-actions">
            <a className="button light" href={channel.youtube} target="_blank" rel="noopener noreferrer">
              YouTube ↗
            </a>
            <a className="button light" href={channel.tiktok} target="_blank" rel="noopener noreferrer">
              TikTok ↗
            </a>
          </div>
        </div>
        <dl className="channel-stats">
          {stats.map(([value, label]) => (
            <div key={label}>
              <dt>{value}</dt>
              <dd>{label}</dd>
            </div>
          ))}
        </dl>
      </section>

      {videoGroups.map((group) => (
        <section key={group.slug} id={group.slug} className="video-group section-pad">
          <div className="section-heading reveal">
            <p className="eyebrow">{group.eyebrow[locale]}</p>
            <h2>{group.title[locale]}</h2>
            <p>{group.description[locale]}</p>
          </div>
          <div className="video-grid">
            {group.videos.map((video, index) => (
              <VideoTile key={video.id} video={video} locale={locale} priority={index < 2} />
            ))}
          </div>
          {group.playlist && (
            <div className="video-group-foot">
              <a className="text-link" href={group.playlist} target="_blank" rel="noopener noreferrer">
                {locale === "th" ? "เปิดเพลย์ลิสต์นี้บน YouTube" : "Open this playlist on YouTube"} ↗
              </a>
            </div>
          )}
        </section>
      ))}

      <CallToAction locale={locale} />
    </main>
  );
}
