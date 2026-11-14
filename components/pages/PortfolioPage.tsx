"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { channel, portfolioFeatured, projectGroups as allProjectGroups, type Locale } from "@/app/site-data";
import { PageIntro } from "@/components/shared/PageIntro";
import { CallToAction } from "@/components/shared/CallToAction";

function imagePath(slug: string, name: string) {
  return `/projects/${slug}/${name}`;
}

// Only the strongest series are shown here; the rest of the work is linked from the channels below.
const projectGroups = portfolioFeatured
  .map((slug) => allProjectGroups.find((project) => project.slug === slug))
  .filter((project): project is (typeof allProjectGroups)[number] => Boolean(project));

const totalImages = projectGroups.reduce((count, project) => count + project.images.length, 0);

export function PortfolioPage({ locale }: { locale: Locale }) {
  const [openIndex, setOpenIndex] = useState(0);
  const detailRefs = useRef<(HTMLDetailsElement | null)[]>([]);

  useEffect(() => {
    let timer: number | undefined;
    const openFromHash = () => {
      const hash = decodeURIComponent(window.location.hash.slice(1));
      if (!hash) return;
      const index = projectGroups.findIndex((project) => project.slug === hash);
      if (index < 0) return;
      const detail = detailRefs.current[index];
      if (!detail) return;
      detail.open = true; // fires onToggle, which syncs openIndex
      // wait for the previously-open group to collapse so the scroll target is stable
      window.clearTimeout(timer);
      timer = window.setTimeout(() => detail.scrollIntoView({ behavior: "smooth", block: "start" }), 250);
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("hashchange", openFromHash);
    };
  }, []);

  return (
    <main>
      <PageIntro
        eyebrow="Learning media / 2026"
        title={locale === "th" ? "ผลงานสื่อที่เล่าเรื่องด้วยภาพ" : "Media work that makes ideas visible"}
        body={locale === "th"
          ? `คัดมาให้ชม ${projectGroups.length} ซีรีส์เด่น รวม ${totalImages} ภาพ จากงานสื่อ Food Safety แบบ 3D — ผลงานทั้งหมดดูต่อได้ที่ช่องของเรา`
          : `${projectGroups.length} standout series, ${totalImages} visuals from our 3D food-safety media — the full body of work is on our channels.`}
      />
      <section className="portfolio-list section-pad">
        {projectGroups.map((project, index) => (
          <details
            key={project.slug}
            id={project.slug}
            ref={(el) => { detailRefs.current[index] = el; }}
            className="project-detail"
            open={index === openIndex}
            onToggle={(e) => {
              if (e.currentTarget.open) setOpenIndex(index);
            }}
          >
            <summary>
              <span className="detail-index">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <p>{project.type[locale]}</p>
                <h2>{project.title[locale]}</h2>
              </div>
              <span className="detail-count">
                {project.images.length} {locale === "th" ? "ภาพ" : "visuals"}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </summary>
            <p className="detail-description">{project.description[locale]}</p>
            <div className={`gallery-grid ${project.aspect}`}>
              {project.images.map((image, imageIndex) => (
                <figure key={image}>
                  <div className="gallery-image-wrap">
                    <Image
                      src={imagePath(project.slug, image)}
                      alt={`${project.title[locale]} — ${imageIndex + 1}`}
                      width={project.aspect === "wide" ? 1536 : 1024}
                      height={project.aspect === "wide" ? 864 : 1024}
                      sizes="(max-width: 720px) 100vw, 50vw"
                    />
                  </div>
                  <figcaption>
                    {String(imageIndex + 1).padStart(2, "0")} / {String(project.images.length).padStart(2, "0")}
                  </figcaption>
                </figure>
              ))}
            </div>
          </details>
        ))}
        <div className="more-work reveal">
          <h2>{locale === "th" ? "ดูผลงานเพิ่มเติมได้ที่ช่องของเรา" : "See more of our work on our channels"}</h2>
          <p>
            {locale === "th"
              ? "วิดีโอและผลงานชุดอื่นๆ อัปเดตต่อเนื่องบนช่องทางเหล่านี้"
              : "More videos and series are published regularly on these channels."}
          </p>
          <div className="more-work-links">
            <a className="button" href={channel.youtube} target="_blank" rel="noopener noreferrer">YouTube ↗</a>
            <a className="button outline" href={channel.facebook} target="_blank" rel="noopener noreferrer">Facebook ↗</a>
            <a className="button outline" href={channel.tiktok} target="_blank" rel="noopener noreferrer">TikTok ↗</a>
          </div>
        </div>
      </section>
      <CallToAction locale={locale} />
    </main>
  );
}
