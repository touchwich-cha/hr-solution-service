"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { brand, channel, contact, copy, nav, type Locale } from "@/app/site-data";

export function Shell({ locale, page, children }: { locale: Locale; page: string; children: React.ReactNode }) {
  const opposite = locale === "th" ? "en" : "th";
  const base = `/${locale}`;
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const header = document.querySelector(".site-header");
    if (!header) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.boundingClientRect.top < 0) {
          header.classList.add("scrolled");
        } else {
          header.classList.remove("scrolled");
        }
      },
      { rootMargin: "-1px 0px 0px 0px", threshold: 0 }
    );
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Scroll-reveal: fades/slides in any ".reveal" element as it enters the viewport.
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(".reveal:not(.reveal-in)");
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
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" }
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [page]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <header className="site-header">
        <Link className="brand" href={base} aria-label={`${brand.name} home`} onClick={closeMenu}>
          <span className="brand-mark">{brand.mark}</span><span>{brand.name}</span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {nav[locale].map(([label, href]) => (
            <Link key={href || "home"} className={(page === href || (!page && !href)) ? "active" : ""} href={`${base}${href ? `/${href}` : ""}`}>{label}</Link>
          ))}
        </nav>
        <div className="header-actions">
          <Link className="language" href={`/${opposite}${page ? `/${page}` : ""}`}>{opposite.toUpperCase()}</Link>
          <Link className="button small" href={`${base}/contact#quote`}>{copy[locale].quote}</Link>
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={menuOpen}
            aria-label={locale === "th" ? (menuOpen ? "ปิดเมนู" : "เปิดเมนู") : (menuOpen ? "Close menu" : "Open menu")}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>
      {menuOpen && (
        <div className="mobile-menu">
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {nav[locale].map(([label, href]) => (
              <Link key={href || "home"} className={(page === href || (!page && !href)) ? "active" : ""} href={`${base}${href ? `/${href}` : ""}`} onClick={closeMenu}>{label}</Link>
            ))}
          </nav>
          <div className="mobile-menu-actions">
            <Link className="button" href={`${base}/contact#quote`} onClick={closeMenu}>{copy[locale].quote}</Link>
            <Link className="language" href={`/${opposite}${page ? `/${page}` : ""}`} onClick={closeMenu}>
              {opposite === "th" ? "ภาษาไทย" : "English"}
            </Link>
          </div>
        </div>
      )}
      {children}
      <footer className="site-footer">
        <div><span className="brand-mark">{brand.mark}</span><strong>{brand.name}</strong></div>
        <p>{brand.tagline[locale]}</p>
        <div className="footer-links">
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <a href={`tel:${contact.phone}`}>{contact.phoneDisplay}</a>
          <a href={channel.youtube} target="_blank" rel="noopener noreferrer">
            YouTube {channel.handle} ↗
          </a>
          <a href={channel.tiktok} target="_blank" rel="noopener noreferrer">
            TikTok ↗
          </a>
        </div>
      </footer>
    </div>
  );
}
