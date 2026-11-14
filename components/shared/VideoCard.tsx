import Link from "next/link";
import { channel, videos, type Locale } from "@/app/site-data";
import { VideoTile } from "@/components/shared/VideoTile";

/** Home teaser for the Training media page: one featured clip + link. */
export function VideoCard({ locale }: { locale: Locale }) {
  const [featured] = videos;
  const th = locale === "th";

  return (
    <section className="video-section product-section section-pad">
      <div className="product-heading reveal">
        <p className="eyebrow">{th ? "สื่ออบรม Food Safety แบบ 3D" : "3D Food Safety training media"}</p>
        <h2>{th ? "สื่ออบรม GMP ที่พนักงานดูจนจบ" : "GMP training media that staff finish watching"}</h2>
        <p>
          {th
            ? `เปลี่ยนข้อกำหนดในกระดาษให้เป็นฉากภาพ 3D เผยแพร่จริงบนช่อง ${channel.name} ${channel.videoCount} คลิป`
            : `Paper regulations turned into 3D scenes — ${channel.videoCount} videos published on the ${channel.name} channel.`}
        </p>
      </div>
      <div className="video-teaser">
        <VideoTile video={featured} locale={locale} variant="feature" priority />
      </div>
      <div className="video-actions">
        <Link className="button outline" href={`/${locale}/training-media`}>
          {th ? "ดูสื่ออบรมและผลงานทั้งหมด" : "See the training media and work"}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
        <a className="text-link" href={channel.youtube} target="_blank" rel="noopener noreferrer">
          {th ? `ติดตามช่อง ${channel.handle} บน YouTube` : `Follow ${channel.handle} on YouTube`}
        </a>
      </div>
    </section>
  );
}
