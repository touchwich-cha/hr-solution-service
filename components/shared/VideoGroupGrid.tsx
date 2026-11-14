"use client";

import { useState } from "react";
import type { Locale, VideoItem } from "@/app/site-data";
import { VideoTile } from "@/components/shared/VideoTile";

/** Shows the first clips of a group and reveals the rest on request (keeps the page short). */
export function VideoGroupGrid({
  videos,
  locale,
  initial = 6,
}: {
  videos: readonly VideoItem[];
  locale: Locale;
  initial?: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const hidden = Math.max(0, videos.length - initial);
  const visible = expanded ? videos : videos.slice(0, initial);

  return (
    <>
      <div className="video-grid">
        {visible.map((video, index) => (
          <VideoTile key={video.id} video={video} locale={locale} priority={index < 2} />
        ))}
      </div>
      {hidden > 0 && (
        <div className="video-more">
          <button type="button" aria-expanded={expanded} onClick={() => setExpanded((open) => !open)}>
            {expanded
              ? locale === "th" ? "แสดงน้อยลง" : "Show fewer"
              : locale === "th" ? `ดูเพิ่มอีก ${hidden} คลิป` : `Show ${hidden} more clips`}
          </button>
        </div>
      )}
    </>
  );
}
