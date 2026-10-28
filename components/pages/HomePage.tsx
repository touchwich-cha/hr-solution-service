"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { caseStudies, copy, projectGroups, proofStats, type Locale } from "@/app/site-data";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { ServicesPreview } from "@/components/shared/ServicesPreview";
import { CallToAction } from "@/components/shared/CallToAction";
import { VideoCard } from "@/components/shared/VideoCard";
import { FeatureGrid } from "@/components/shared/FeatureGrid";

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  // Start at the real value so SSR, crawlers, link-preview bots and no-JS
  // visitors always see the true number instead of 0. The count-up runs only
  // as a progressive enhancement once the element scrolls into view.
  const [display, setDisplay] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Respect reduced-motion: keep the real number, skip the animation.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          let current = 0;
          const step = Math.ceil(value / 30);
          setDisplay(0);
          const timer = setInterval(() => {
            current += step;
            if (current >= value) {
              current = value;
              clearInterval(timer);
            }
            setDisplay(current);
          }, 40);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref}>
      {display}{suffix}
    </span>
  );
}

export function HomePage({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <main>
      {/* ─── HERO ─── */}
      <section className="hero section-pad">
        <div className="hero-copy">
          <span className="hero-badge">
            <span className="hero-badge-dot" />
            {locale === "th" ? "สื่ออบรมและระบบ HR ที่ใช้งานจริง" : "Training media & HR systems, proven in production"}
          </span>
          <h1>
            {locale === "th" ? (
              <>สื่ออบรมที่คนอยากดู <span className="gradient-text">ระบบงาน HR</span> ที่ทำงานแทนคุณ</>
            ) : (
              <>Training media people want to watch. <span className="gradient-text">HR systems</span> that work for you.</>
            )}
          </h1>
          <p className="lede">{t.intro}</p>
          <div className="hero-actions">
            <Link className="button" href={`/${locale}/portfolio`}>
              {t.viewWork}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link className="button outline" href={`/${locale}/hr-systems`}>
              {t.viewSystems}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
        <div className="hero-stage">
          <div className="hero-visual">
            <Image
              src="/projects/factory-lighting/factory-lighting-01.webp"
              alt={locale === "th" ? "ตัวอย่างสื่ออบรม Food Safety แบบ 3D" : "3D food-safety training media example"}
              fill
              sizes="(max-width: 900px) 100vw, 48vw"
              priority
            />
            <span className="visual-label">Food Safety Thailand series / 2026</span>
            <div
              className="hero-visual-glow"
              style={mousePos ? {
                background: `radial-gradient(600px circle at ${mousePos.x - window.innerWidth * 0.55}px ${mousePos.y - 100}px, rgba(45,212,191,0.1), transparent 50%)`,
              } : undefined}
            />
          </div>
          <div className="hero-float hero-float-a">
            <span className="hero-float-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            <span>
              <b>10</b>
              {locale === "th" ? "โมดูล Food Safety" : "Food Safety modules"}
            </span>
          </div>
          <div className="hero-float hero-float-b">
            <span className="hero-float-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </span>
            <span>
              <b>512</b>
              {locale === "th" ? "เฟรมผลิตจริง" : "frames produced"}
            </span>
          </div>
          <div className="hero-float hero-float-c">
            <span className="hero-float-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </span>
            <span>
              <b>6</b>
              {locale === "th" ? "ระบบ HR ใช้งานจริง" : "HR systems live"}
            </span>
          </div>
        </div>
      </section>

      {/* ─── PROOF STRIP ─── */}
      <div className="proof-strip">
        {proofStats.map((stat) => (
          <span key={stat.label.en}>
            <b><AnimatedNumber value={stat.value} suffix={stat.suffix} /></b>
            {stat.label[locale]}
          </span>
        ))}
      </div>

      {/* ─── MARQUEE — real systems & series in production ─── */}
      <div className="marquee" aria-label={locale === "th" ? "รายชื่อระบบและผลงานที่ใช้งานจริง" : "Systems and series in production"}>
        <div className="marquee-track">
          {[...caseStudies, ...caseStudies].map((study, i) => (
            <span key={`${study.slug}-${i}`} className="marquee-chip">
              <span className="marquee-dot" />
              {study.title[locale]}
            </span>
          ))}
        </div>
      </div>

      <FeatureGrid locale={locale} />

      {/* ─── SELECTED WORK ─── */}
      <section className="section-pad work-section">
        <div className="section-heading reveal">
          <p className="eyebrow">Selected work / 2026</p>
          <h2>{t.selected}</h2>
          <p>{t.selectedSub}</p>
        </div>
        <div className="project-grid featured">
          {projectGroups.slice(0, 4).map((project, i) => (
            <div key={project.slug} className="reveal" style={{ "--reveal-delay": `${i * 0.1}s` } as React.CSSProperties}>
              <ProjectCard project={project} locale={locale} priority={i < 2} />
            </div>
          ))}
        </div>
        <div className="center-button">
          <Link className="button outline" href={`/${locale}/portfolio`}>
            {locale === "th" ? "ดูผลงานสื่อทั้งหมด" : "Explore all media work"}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      <VideoCard locale={locale} />
      <ServicesPreview locale={locale} />
      <ShowcaseSection locale={locale} />
      <CallToAction locale={locale} />
    </main>
  );
}

function ShowcaseSection({ locale }: { locale: Locale }) {
  const [primary, secondary] = caseStudies;
  return (
    <section className="showcase section-pad">
      <div className="showcase-copy reveal">
        <p className="eyebrow">{locale === "th" ? "จากงานจริง ไม่ใช่ demo" : "Real work, not a demo"}</p>
        <h2>
          {locale === "th" ? (
            <>ระบบที่ทีม HR <em>ใช้งานอยู่จริง</em> ทุกวันนี้</>
          ) : (
            <>Systems HR teams <em>actually run</em> today</>
          )}
        </h2>
        <p className="lede">
          {locale === "th"
            ? "ไม่ใช่ mockup — ทุกระบบด้านล่างสร้างและใช้งานจริงในองค์กร เราไม่ระบุชื่อลูกค้าเพื่อความเป็นส่วนตัว"
            : "Not a mockup — every system below was built and runs in a real workplace. Client names are withheld for privacy."}
        </p>
        <div className="showcase-highlights">
          {[primary, secondary].map((study) => (
            <Link key={study.slug} href={`/${locale}/hr-systems`} className="showcase-highlight">
              <span className="showcase-highlight-dot" />
              <div>
                <strong>{study.title[locale]}</strong>
                <p>{study.outcome[locale]}</p>
              </div>
            </Link>
          ))}
        </div>
        <Link className="button light" href={`/${locale}/hr-systems`}>
          {locale === "th" ? "ดูทั้ง 6 ระบบ" : "See all 6 systems"}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
      <div className="showcase-stack reveal">
        <div className="showcase-frame showcase-frame-back">
          <Image
            src="/projects/food-factory-location/food-factory-location-03.webp"
            alt={locale === "th" ? "ภาพทำเลและสภาพแวดล้อมโรงงานอาหารจากซีรีส์ Food Safety" : "Food factory location and surroundings from the Food Safety series"}
            fill
            sizes="(max-width: 900px) 70vw, 30vw"
          />
        </div>
        <div className="showcase-frame showcase-frame-front">
          <Image
            src="/projects/factory-hidden-flaw/factory-hidden-flaw-05.webp"
            alt={locale === "th" ? "ภาพจากซีรีส์ Food Safety" : "Frame from the Food Safety series"}
            fill
            sizes="(max-width: 900px) 80vw, 34vw"
          />
        </div>
      </div>
    </section>
  );
}
