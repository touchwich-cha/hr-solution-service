"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { heroVideo, type Locale } from "@/app/site-data";

/**
 * Hero media: still poster first (fast LCP), then a muted looping clip on top.
 * The clip is skipped for visitors who ask for reduced motion or have data-saver on,
 * and removed if it fails to load, so the poster always remains as a safe fallback.
 */
export function HeroVideo({ locale }: { locale: Locale }) {
  // "allowed" = the visitor has not asked for reduced motion or data saving.
  // Starts false (server and first client render match), then the check below runs once.
  const [allowed, setAllowed] = useState(false);
  const [failed, setFailed] = useState(false);
  const showVideo = allowed && !failed;

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const update = () => setAllowed(!reduceMotion.matches && !connection?.saveData);
    const frame = requestAnimationFrame(update);
    reduceMotion.addEventListener("change", update);
    return () => {
      cancelAnimationFrame(frame);
      reduceMotion.removeEventListener("change", update);
    };
  }, []);

  return (
    <>
      <Image
        src={heroVideo.poster}
        alt={locale === "th" ? "ตัวอย่างสื่ออบรม Food Safety แบบ 3D" : "3D food-safety training media example"}
        fill
        sizes="(max-width: 900px) 100vw, 48vw"
        priority
      />
      {showVideo && (
        <video
          className="hero-video"
          src={heroVideo.url}
          poster={heroVideo.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          onError={() => setFailed(true)}
        />
      )}
    </>
  );
}
