"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { brand, channel, contact, copy, nav, type Locale } from "@/app/site-data";
import { fastwork, fwProducts } from "@/app/catalog-data";
import { homeCta } from "@/app/home-data";

function bangkokTime() {
  return new Date().toLocaleTimeString("en-GB", { timeZone: "Asia/Bangkok", hour12: false });
}

export function Shell({ locale, page, children }: { locale: Locale; page: string; children: React.ReactNode }) {
  const th = locale === "th";
  const opposite = th ? "en" : "th";
  const base = `/${locale}`;
  const section = page.split("/")[0];
  const [menuOpen, setMenuOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [time, setTime] = useState("");

  // live Bangkok clock (set after mount to avoid a hydration mismatch)
  useEffect(() => {
    const tick = () => setTime(bangkokTime());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [menuOpen]);

  // Scroll-reveal for both the legacy ".reveal" and the new ".rd-rv" blocks.
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(".reveal:not(.reveal-in), .rd-rv:not(.reveal-in)");
    if (targets.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-in");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [page]);

  // Small accent cursor on mouse devices.
  useEffect(() => {
    const cursor = document.querySelector<HTMLElement>(".rd-cursor");
    if (!cursor || !window.matchMedia("(pointer: fine)").matches) return;
    const move = (e: MouseEvent) => { cursor.style.left = `${e.clientX}px`; cursor.style.top = `${e.clientY}px`; };
    const over = (e: MouseEvent) => {
      const hit = (e.target as HTMLElement | null)?.closest("a, button");
      cursor.classList.toggle("big", Boolean(hit));
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseover", over); };
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const href = (path: string) => `${base}${path ? `/${path}` : ""}`;

  return (
    <div className="rd">
      <div className="rd-cursor" aria-hidden="true" />
      <header className={`rd-nav${solid || menuOpen ? " solid" : ""}`}>
        <div className="rd-wrap rd-nav-in">
          <Link className="rd-logo" href={base} aria-label={`${brand.name} — ${th ? "หน้าแรก" : "home"}`} onClick={closeMenu}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-mark.png" alt="" width={34} height={34} />
            HR Solution<b>.</b>
          </Link>
          <div className="rd-nav-r">
            <span className="rd-clock" aria-hidden="true">BANGKOK · {time || "--:--:--"}</span>
            <button
              type="button"
              className="rd-menu-btn"
              aria-expanded={menuOpen}
              aria-controls="rd-menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <i aria-hidden="true"><b /><b /><b /><b /></i>
              <span>{menuOpen ? (th ? "ปิด" : "Close") : (th ? "เมนู" : "Menu")}</span>
            </button>
            <Link className="rd-nav-cta" href={`${base}/contact#quote`} aria-label={copy[locale].quote} onClick={closeMenu}>↗</Link>
          </div>
        </div>
      </header>

      <nav id="rd-menu" className={`rd-menu${menuOpen ? " open" : ""}`} aria-label={th ? "เมนูหลัก" : "Main menu"} aria-hidden={!menuOpen}>
        {nav[locale].map(([label, path], i) => (
          <Link key={path || "home"} href={href(path)} className={section === path ? "active" : ""} tabIndex={menuOpen ? 0 : -1} onClick={closeMenu}>
            <span>{String(i + 1).padStart(2, "0")}</span>{label}
          </Link>
        ))}
        <div className="rd-menu-foot">
          <Link href={`/${opposite}${page ? `/${page}` : ""}`} tabIndex={menuOpen ? 0 : -1} onClick={closeMenu}>
            {opposite === "th" ? "ภาษาไทย" : "English"}
          </Link>
          <a href={`mailto:${contact.email}`} tabIndex={menuOpen ? 0 : -1}>{contact.email}</a>
          <a href={fastwork.profileUrl} target="_blank" rel="noopener noreferrer" tabIndex={menuOpen ? 0 : -1}>Fastwork ↗</a>
        </div>
      </nav>

      {children}

      <footer className="rd-footer">
        <div className="rd-wrap">
          <div className="rd-f-top">
            <div>
              <div className="rd-logo" style={{ marginBottom: 14 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo-mark.png" alt="" width={34} height={34} />
                HR Solution<b>.</b>
              </div>
              <p>{brand.tagline[locale]}</p>
            </div>
            <nav aria-label={th ? "เมนู" : "Menu"}>
              <h4>{th ? "เมนู" : "Menu"}</h4>
              {nav[locale].map(([label, path]) => <Link key={path || "home"} href={href(path)}>{label}</Link>)}
            </nav>
            <nav aria-label={th ? "สินค้า" : "Products"}>
              <h4>{th ? "สินค้า" : "Products"}</h4>
              {fwProducts.map((product) => (
                <Link key={product.slug} href={href(`products/${product.slug}`)}>{product.name[locale]}</Link>
              ))}
            </nav>
            <div>
              <h4>{th ? "ช่องทาง" : "Channels"}</h4>
              <a href={fastwork.profileUrl} target="_blank" rel="noopener noreferrer">Fastwork ↗</a>
              <a href={channel.youtube} target="_blank" rel="noopener noreferrer">YouTube ↗</a>
              <a href={channel.tiktok} target="_blank" rel="noopener noreferrer">TikTok ↗</a>
              <a href={channel.facebook} target="_blank" rel="noopener noreferrer">Facebook ↗</a>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <a href={`tel:${contact.phone}`}>{contact.phoneDisplay}</a>
            </div>
          </div>
          <div className="rd-word" aria-hidden="true">HR Solution<b>.</b></div>
          <div className="rd-f-bot">
            <span>© 2026 {brand.name}</span>
            <span className="rd-mono">Made in Thailand</span>
          </div>
        </div>
      </footer>

      <Link className="rd-ask" href={page ? `${base}/contact#quote` : "#contact"}>
        <span className="t">{homeCta.ask[locale]}</span><span className="sw" aria-hidden="true" />
      </Link>
    </div>
  );
}
