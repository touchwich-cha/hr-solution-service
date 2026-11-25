"use client";

// Interactive parts of the home page: 3D cube tilt, work filter + video modal,
// sticky approach counter, count-up stats and the Lab "desktop".

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/app/site-data";
import { homeApproach, homeHero, homeLab, homeStats, homeWork, type CaseCat } from "@/app/home-data";

const reduceMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- hero cube ---------- */
export function HeroCube({ locale }: { locale: Locale }) {
  const tilt = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (reduceMotion() || !window.matchMedia("(pointer: fine)").matches) return;
    const move = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      if (tilt.current) tilt.current.style.transform = `rotateY(${x * 30}deg) rotateX(${-y * 24}deg)`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <div className="rd-scene" aria-hidden="true">
      <div className="rd-ring" />
      <div className="rd-tilt" ref={tilt}>
        <div className="rd-cube">
          {homeHero.faces.map(([icon, label]) => (
            <div className="rd-face" key={icon}>
              <b>{icon}</b>
              <span>{typeof label === "string" ? label : label[locale]}</span>
            </div>
          ))}
          <div className="rd-face" />
          <div className="rd-face" />
        </div>
      </div>
    </div>
  );
}

/* ---------- work: filter + cases + video modal ---------- */
type Playing = { id: string; vertical: boolean } | null;

export function WorkCases({ locale }: { locale: Locale }) {
  const [filter, setFilter] = useState<"all" | CaseCat>("all");
  const [playing, setPlaying] = useState<Playing>(null);
  const shown = homeWork.cases.filter((c) => filter === "all" || c.cat === filter);
  const play = locale === "th" ? "เล่นวิดีโอ" : "Play video";

  useEffect(() => {
    if (!playing) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setPlaying(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [playing]);

  return (
    <>
      <div className="rd-head rd-rv">
        <div>
          <div className="rd-eyebrow rd-mono">{homeWork.eyebrow[locale]}</div>
          <h2 className="rd-big">{homeWork.title[0][locale]}<br /><span className="rd-acc">{homeWork.title[1][locale]}</span></h2>
        </div>
        <div className="rd-filters" role="group" aria-label={locale === "th" ? "กรองผลงาน" : "Filter work"}>
          {homeWork.filters.map(([key, label]) => (
            <button key={key} type="button" aria-pressed={filter === key} onClick={() => setFilter(key)}>{label[locale]}</button>
          ))}
        </div>
      </div>
      <div className="rd-cases">
        {shown.map((c, i) => {
          const media = c.videos.map((v) => (
            <button key={v.id} type="button" className="rd-media" aria-label={`${play}: ${v.label[locale]}`} onClick={() => setPlaying({ id: v.id, vertical: Boolean(c.vertical) })}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`} alt="" loading="lazy" />
              <span className="rd-circ" aria-hidden="true">↗</span>
            </button>
          ));
          return (
            <article key={c.title.en} className={`rd-case rd-rv reveal-in${i % 2 ? " flip" : ""}`}>
              <div className="rd-c-text">
                <div className="rd-c-tags">{c.tags.map((t) => <span key={t} className="rd-tag rd-mono">{t}</span>)}</div>
                <h3>{c.title[locale]}</h3>
                <div className="rd-c-claim">{c.claim[locale]}</div>
                <p>{c.body[locale]}</p>
              </div>
              {c.layout === "single" ? media : <div className={c.layout === "duo" ? "rd-duo" : "rd-stack"}>{media}</div>}
            </article>
          );
        })}
      </div>
      {playing && (
        <div className="rd-modal" role="dialog" aria-modal="true" aria-label={play} onClick={(e) => { if (e.target === e.currentTarget) setPlaying(null); }}>
          <button type="button" className="x" aria-label={locale === "th" ? "ปิด" : "Close"} onClick={() => setPlaying(null)}>×</button>
          <div className={`box${playing.vertical ? " v" : ""}`}>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${playing.id}?autoplay=1&rel=0`}
              title={play}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}

/* ---------- approach: sticky counter ---------- */
export function Approach({ locale }: { locale: Locale }) {
  const [active, setActive] = useState(0);
  const steps = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    const sync = () => {
      let best = 0, dist = Infinity;
      steps.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - window.innerHeight / 2);
        if (d < dist) { dist = d; best = i; }
      });
      setActive(best);
    };
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    return () => window.removeEventListener("scroll", sync);
  }, []);
  const n = homeApproach.steps.length;
  return (
    <div className="rd-wrap rd-approach">
      <div className="rd-ap-left">
        <div className="rd-eyebrow rd-mono">{homeApproach.eyebrow[locale]}</div>
        <h2 className="rd-big">{homeApproach.title[0][locale]}<br /><span className="rd-acc">{homeApproach.title[1][locale]}</span></h2>
        <div className="rd-ap-count" aria-hidden="true">{String(active + 1).padStart(2, "0")}<small>/{String(n).padStart(2, "0")}</small></div>
        <div className="rd-ap-bar" aria-hidden="true"><i style={{ width: `${((active + 1) / n) * 100}%` }} /></div>
      </div>
      <div>
        {homeApproach.steps.map((s, i) => (
          <div key={s.k.en} ref={(el) => { steps.current[i] = el; }} className={`rd-ap-step${i === active ? " on" : ""}`}>
            <span className="rd-mono rd-acc">{String(i + 1).padStart(2, "0")} · {s.k[locale]}</span>
            <h3>{s.title[locale]}</h3>
            <p>{s.body[locale]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- stats: count up once in view ---------- */
function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(to);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduceMotion()) return;
    setValue(0);
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now(), dur = 1400;
      const step = (t: number) => {
        const p = Math.min(1, (t - t0) / dur);
        setValue(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{value.toLocaleString("en-US")}</span>;
}

export function Stats({ locale }: { locale: Locale }) {
  return (
    <div className="rd-stats rd-rv">
      {homeStats.items.map((s) => (
        <div className="rd-stat" key={s.label.en}>
          <strong><CountUp to={s.to} /><em>{s.suffix}</em></strong>
          <span>{s.label[locale]}</span>
        </div>
      ))}
    </div>
  );
}

/* ---------- the Lab desktop ---------- */
export function Lab({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(2);
  const [clock, setClock] = useState("");
  useEffect(() => {
    const tick = () => setClock(new Date().toLocaleTimeString("en-GB", { timeZone: "Asia/Bangkok", hour: "2-digit", minute: "2-digit" }));
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);
  const s = homeLab.systems[open];
  return (
    <div className="rd-desk rd-rv">
      <div className="rd-desk-bar"><i /><i /><i /><span className="rd-addr rd-mono">hr-solution.service / lab</span></div>
      <div className="rd-desk-body">
        <div className="rd-icons">
          {homeLab.systems.map((sys, i) => (
            <button key={sys.name.en} type="button" className="rd-ic" aria-pressed={i === open} onClick={() => setOpen(i)}>
              <span className="g" aria-hidden="true">{sys.icon}</span>{sys.name[locale]}
            </button>
          ))}
        </div>
        <div className="rd-app" key={open} aria-live="polite">
          <div className="rd-app-t rd-mono"><span>{s.icon} {s.group[locale]}</span><span aria-hidden="true">● ● ●</span></div>
          <div className="rd-app-b">
            <span className="rd-mono rd-acc">{homeLab.systemNo[locale]} {String(open + 1).padStart(2, "0")}</span>
            <h3>{s.name[locale]}</h3>
            <div className="rd-flow">{s.flow.map((f, j) => <div key={f.en}><b>{j + 1}</b><span>{f[locale]}</span></div>)}</div>
            <div className="rd-tools">{s.tools.map((t) => <span key={t} className="rd-tag rd-mono">{t}</span>)}</div>
          </div>
        </div>
      </div>
      <div className="rd-task rd-mono"><span>⊞ HR Lab</span><span>{clock}</span></div>
    </div>
  );
}
