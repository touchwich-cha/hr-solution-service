import Link from "next/link";
import { channel, videos, type Locale } from "@/app/site-data";
import { VideoTile } from "@/components/shared/VideoTile";

export function VideoCard({ locale }: { locale: Locale }) {
  const [featured, vertical, ...strip] = videos;

  return (
    <section className="video-section section-pad" style={{ paddingBlock: "clamp(64px, 8vw, 120px)" }}>
      <div className="section-heading reveal">
        <p className="eyebrow">
          <span className="hero-badge-dot" style={{ marginRight: 2 }} />
          {locale === "th" ? `วิดีโอเผยแพร่จริง · ${channel.videoCount} คลิป` : `Published videos · ${channel.videoCount} clips`}
        </p>
        <h2>
          {locale === "th"
            ? "ตัวอย่างวิดีโอจริงจากซีรีส์ GMP420"
            : "Real published work — the GMP420 series"}
        </h2>
        <p>
          {locale === "th"
            ? `ผลงานวิดีโอที่เผยแพร่จริงบนช่อง ${channel.name} — ทั้งจอกว้าง 16:9 สำหรับห้องอบรม และแนวตั้ง 9:16 สำหรับมือถือ`
            : `Videos published on the ${channel.name} channel — widescreen 16:9 for the training room and vertical 9:16 for mobile.`}
        </p>
      </div>

      <div className="video-feature">
        <VideoTile video={featured} locale={locale} variant="feature" priority />
        <VideoTile video={vertical} locale={locale} />
      </div>

      <div className="video-strip">
        {strip.map((video) => (
          <VideoTile key={video.id} video={video} locale={locale} />
        ))}
      </div>

      <div className="video-actions">
        <Link className="button outline" href={`/${locale}/videos`}>
          {locale === "th" ? `ดูวิดีโอทั้งหมด ${channel.videoCount} คลิป` : `See all ${channel.videoCount} videos`}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
        <a className="text-link" href={channel.youtube} target="_blank" rel="noopener noreferrer">
          {locale === "th" ? `ติดตามช่อง ${channel.handle} บน YouTube` : `Follow ${channel.handle} on YouTube`}
        </a>
      </div>
    </section>
  );
}

