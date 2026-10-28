"use client";

import { useState } from "react";
import type { Locale, VideoItem } from "@/app/site-data";

/**
 * Click-to-play YouTube tile.
 *
 * The iframe is only mounted after a click, so a page with 30+ videos costs
 * one thumbnail request each instead of 30+ embedded players. Thumbnails use a
 * plain <img> on purpose: they are already optimised on YouTube's CDN and this
 * keeps next/image from needing remote-host configuration.
 */
export function VideoTile({
  video,
  locale,
  variant = "tile",
  priority = false,
}: {
  video: VideoItem;
  locale: Locale;
  variant?: "tile" | "feature";
  priority?: boolean;
}) {
  const [playing, setPlaying] = useState(false);
  const label = video.title[locale];
  const playLabel = locale === "th" ? `เล่นวิดีโอ: ${label}` : `Play video: ${label}`;

  return (
    <figure className={`video-tile ${video.aspect}${variant === "feature" ? " feature" : ""}`}>
      <div className={`video-tile-frame ${video.aspect}`}>
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1&color=white`}
            title={label}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button type="button" className="video-facade" onClick={() => setPlaying(true)} aria-label={playLabel}>
            {/* eslint-disable-next-line @next/next/no-img-element -- YouTube thumbnails are already optimised on their CDN; a plain <img> avoids remote-host config for 34 external images. */}
            <img
              src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
              alt=""
              width={480}
              height={360}
              loading={priority ? "eager" : "lazy"}
              decoding="async"
            />
            {video.duration && <span className="video-facade-tag">{video.duration}</span>}
            <span className="video-facade-play" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        )}
      </div>
      <figcaption>
        <span>{label}</span>
        <a href={`https://youtu.be/${video.id}`} target="_blank" rel="noopener noreferrer">
          YouTube ↗
        </a>
      </figcaption>
    </figure>
  );
}
