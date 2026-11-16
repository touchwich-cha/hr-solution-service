"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { proofStats, type Locale } from "@/app/site-data";
import { catalogCopy, fwProducts, fromPrice, formatPrice } from "@/app/catalog-data";
import { FastworkNote } from "@/components/shared/FastworkNote";
import { CallToAction } from "@/components/shared/CallToAction";
import { VideoCard } from "@/components/shared/VideoCard";
import { HeroVideo } from "@/components/shared/HeroVideo";
import { ProductGroups } from "@/components/shared/ProductGroups";
import { ProductIcon } from "@/components/shared/ProductIcon";
import type { ProductIcon as ProductIconName } from "@/app/site-data";

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


const arrow = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export function HomePage({ locale }: { locale: Locale }) {
  const th = locale === "th";
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const problems: { icon: ProductIconName; label: string }[] = th
    ? [
        { icon: "clock", label: "งานล้นมือ" },
        { icon: "repeat", label: "คีย์ข้อมูลซ้ำๆ" },
        { icon: "calendar", label: "ลืมกำหนดเวลาสำคัญ" },
      ]
    : [
        { icon: "clock", label: "Overloaded days" },
        { icon: "repeat", label: "Re-keying data" },
        { icon: "calendar", label: "Missed deadlines" },
      ];

  return (
    <main>
      {/* ─── HERO ─── */}
      <section className="hero section-pad">
        <div className="hero-copy">
          <span className="hero-badge">
            <span className="hero-badge-dot" />
            {th ? "สื่ออบรม แบบทดสอบ HR และระบบอัตโนมัติ — สั่งทำตามโจทย์" : "Training media, HR assessments and automation — built to order"}
          </span>
          <h1>
            {th ? (
              <>ให้ระบบจัดการงานซ้ำซ้อน <span className="gradient-text">เพื่อให้คุณโฟกัสงานสำคัญ</span></>
            ) : (
              <>Let the system handle repetitive work, <span className="gradient-text">so you can focus on what matters</span></>
            )}
          </h1>
          <p className="lede">
            {th
              ? "9 สินค้า 4 กลุ่มงาน ตั้งแต่วิดีโออบรม GMP 3D แบบทดสอบ Logical / DISC ระบบแจ้งเตือนเอกสาร ไปจนถึงแชตบอท LINE ทุกสินค้ามี 3 แพ็กเกจ เริ่มต้น 399 บาท และตรงกับประกาศบน Fastwork"
              : "9 products in 4 groups — from 3D GMP videos and Logical / DISC tests to document alerts and LINE chatbots. Every product has 3 tiers from THB 399 and matches our Fastwork listings."}
          </p>
          <div className="hero-actions">
            <Link className="button" href={`/${locale}/products`}>
              {th ? `ดูสินค้าทั้ง ${fwProducts.length} รายการ` : `See all ${fwProducts.length} products`}
              {arrow}
            </Link>
            <Link className="button outline" href={`/${locale}/contact#quote`}>
              {th ? "ขอทดลองใช้" : "Request a trial"}
              {arrow}
            </Link>
          </div>
        </div>
        <div className="hero-stage">
          <div className="hero-visual">
            <HeroVideo locale={locale} />
            <span className="visual-label">Food Safety Thailand series / 2026</span>
            <div
              className="hero-visual-glow"
              style={mousePos ? {
                background: `radial-gradient(600px circle at ${mousePos.x - window.innerWidth * 0.55}px ${mousePos.y - 100}px, rgba(45,212,191,0.1), transparent 50%)`,
              } : undefined}
            />
          </div>
          <div className="hero-float hero-float-a">
            <span className="hero-float-icon"><ProductIcon name="bolt" size={16} /></span>
            <span><b>{fwProducts.length}</b>{th ? "สินค้า 3 แพ็กเกจ" : "products, 3 tiers each"}</span>
          </div>
          <div className="hero-float hero-float-b">
            <span className="hero-float-icon"><ProductIcon name="sheet" size={16} /></span>
            <span><b>512</b>{th ? "เฟรมสื่ออบรมผลิตจริง" : "training frames produced"}</span>
          </div>
          <div className="hero-float hero-float-c">
            <span className="hero-float-icon"><ProductIcon name="shield" size={16} /></span>
            <span><b>6</b>{th ? "ระบบ HR ใช้งานจริง" : "HR systems live"}</span>
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

      {/* ─── PROBLEM → SYSTEM ─── */}
      <section className="product-section section-pad">
        <div className="product-heading reveal">
          <h2>{th ? "งานซ้ำซ้อน 3 แบบ ที่ระบบรับช่วงแทนคุณ" : "Three kinds of repetitive work the system takes over"}</h2>
        </div>
        <div className="p2s reveal">
          <ul className="p2s-problems">
            {problems.map((problem) => (
              <li key={problem.label}>
                <span className="p2s-icon"><ProductIcon name={problem.icon} size={28} /></span>
                {problem.label}
              </li>
            ))}
          </ul>
          <span className="p2s-arrow" aria-hidden="true">→</span>
          <div className="p2s-system">
            <span className="p2s-system-icon"><ProductIcon name="bolt" size={40} /></span>
            <strong>{th ? "ระบบผู้ช่วยอัตโนมัติ" : "Automation assistants"}</strong>
          </div>
        </div>
      </section>

      {/* ─── PRODUCTS: 9 products in 4 groups (same as Fastwork) ─── */}
      <section className="product-section section-pad">
        <div className="product-heading reveal">
          <p className="eyebrow">{catalogCopy.eyebrow[locale]}</p>
          <h2>{catalogCopy.title[locale]}</h2>
          <p>{th ? `เริ่มต้น ฿${formatPrice(Math.min(...fwProducts.map(fromPrice)))} · เลือกแพ็กเกจ Basic / Standard / Premium ได้ในแต่ละสินค้า` : `From THB ${formatPrice(Math.min(...fwProducts.map(fromPrice)))} · pick Basic / Standard / Premium on each product`}</p>
        </div>
        <ProductGroups locale={locale} />
      </section>
      <FastworkNote locale={locale} />

      {/* ─── WORKS WHERE YOU ALREADY WORK ─── */}
      <section className="product-section section-pad">
        <div className="product-heading reveal">
          <h2>{th ? "ทำงานผ่าน LINE และ Google Workspace ที่คุณคุ้นเคย" : "Works through the LINE and Google Workspace you already know"}</h2>
        </div>
        <div className="works-on reveal">
          <div className="works-node"><span className="works-circle"><ProductIcon name="chat" size={34} /></span><strong>LINE</strong></div>
          <span className="works-link" aria-hidden="true">⇄</span>
          <div className="works-node works-center"><span className="works-circle"><ProductIcon name="user" size={34} /></span><strong>{th ? "ผู้ใช้งาน" : "You"}</strong></div>
          <span className="works-link" aria-hidden="true">⇄</span>
          <div className="works-node"><span className="works-circle"><ProductIcon name="sheet" size={34} /></span><strong>Google Workspace</strong><small>Drive · Sheets · Chat</small></div>
        </div>
      </section>

      {/* ─── TRAINING MEDIA TEASER ─── */}
      <VideoCard locale={locale} />

      <CallToAction locale={locale} />
    </main>
  );
}
