import Link from "next/link";
import { elearningDemoUrl, siteUrl, videoPublished, videoUploadDate, type Locale } from "@/app/site-data";
import { formatPrice, fromPrice, getFwProduct, pricePer } from "@/app/catalog-data";
import {
  homeAbout, homeFaq, homeHero, homeLab, homeMarquee, homeServices, homeStats, homeWork, type ServiceItem,
} from "@/app/home-data";
import { JsonLd } from "@/components/shared/JsonLd";
import { Approach, HeroCube, Lab, Stats, WorkCases } from "@/components/home/HomeClient";
import { CtaBlock } from "@/components/rd/Blocks";
import { articles, thaiDate } from "@/app/articles-data";

function ServiceLine({ item, locale }: { item: ServiceItem; locale: Locale }) {
  const from = homeServices.from[locale];
  if ("slug" in item) {
    const product = getFwProduct(item.slug);
    if (!product) return null;
    return (
      <li>
        <Link href={`/${locale}/products/${product.slug}`}>
          {product.name[locale]}<small>{from} ฿{formatPrice(fromPrice(product))}{pricePer(product, locale)}</small>
        </Link>
      </li>
    );
  }
  return (
    <li>
      <a href={item.url} target="_blank" rel="noopener noreferrer">
        {item.label[locale]} ↗<small>{from} ฿{formatPrice(item.from)}</small>
      </a>
    </li>
  );
}

export function HomePage({ locale }: { locale: Locale }) {
  const v = homeAbout.venn;
  // VideoObject for the showcased clips — only those with a verified publish date.
  const workVideos = homeWork.cases.flatMap((c) => c.videos.map((video) => ({ ...video, body: c.body })));
  const videoJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: workVideos
      .filter((video) => videoPublished[video.id])
      .map((video, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "VideoObject",
          name: video.label[locale],
          description: video.body[locale],
          thumbnailUrl: `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`,
          uploadDate: videoUploadDate(video.id),
          embedUrl: `https://www.youtube-nocookie.com/embed/${video.id}`,
          url: `https://youtu.be/${video.id}`,
          publisher: { "@type": "Organization", name: "HR Solution Service", url: siteUrl },
        },
      })),
  };
  return (
    <main>
      <JsonLd data={videoJsonLd} />
      {/* ---------- hero ---------- */}
      <header className="rd-hero" id="top">
        <div className="rd-wrap rd-hero-grid">
          <div>
            <div className="rd-badges">
              <span className="rd-pill rd-badge-cert">{homeHero.badge}</span>
              <span className="rd-pill rd-mono rd-badge-mono">{homeHero.studio[locale]}</span>
            </div>
            <h1>
              {homeHero.lines.map((line, i) => (
                <span className="rd-line" key={line.en}><span className={i === 2 ? "rd-acc" : undefined}>{line[locale]}</span></span>
              ))}
            </h1>
            <p className="rd-sub">{homeHero.sub[locale]}</p>
            <p className="rd-sub2">{homeHero.sub2[locale]}</p>
            <div className="rd-ctas">
              <a className="rd-btn rd-btn-acc" href="#work">{homeHero.ctaWork[locale]}</a>
              <a className="rd-btn rd-btn-line" href="#services">{homeHero.ctaServices[locale]}</a>
              <a className="rd-btn rd-btn-line" href={elearningDemoUrl} target="_blank" rel="noopener">{homeHero.ctaDemo[locale]} ↗</a>
            </div>
          </div>
          <HeroCube locale={locale} />
        </div>
        <div className="rd-scroll-hint rd-mono" aria-hidden="true"><i />{homeHero.scroll[locale]}</div>
      </header>

      <div className="rd-marq" aria-hidden="true">
        <div className="rd-marq-in">
          {[...homeMarquee, ...homeMarquee].map((m, i) => <span key={i}>{m[locale]}</span>)}
        </div>
      </div>

      {/* ---------- work ---------- */}
      <section className="rd-sec" id="work">
        <div className="rd-wrap"><WorkCases locale={locale} /></div>
      </section>

      {/* ---------- services ---------- */}
      <section className="rd-sec" id="services" style={{ paddingTop: 40 }}>
        <div className="rd-wrap">
          <div className="rd-head rd-rv">
            <div>
              <div className="rd-eyebrow rd-mono">{homeServices.eyebrow[locale]}</div>
              <h2 className="rd-big">{homeServices.title[0][locale]}<br /><span className="rd-acc">{homeServices.title[1][locale]}</span></h2>
            </div>
            <p>{homeServices.body[locale]}</p>
          </div>
          <div className="rd-svc rd-rv">
            {homeServices.columns.map((col, i) => (
              <div className="rd-svc-col" key={col.title.en}>
                <div className="rd-svc-n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</div>
                <h3>{col.title[locale]}</h3>
                <ul>{col.items.map((item, j) => <ServiceLine key={j} item={item} locale={locale} />)}</ul>
                <Link className="rd-btn rd-btn-line" href={`/${locale}/contact#quote`}>{homeServices.quote[locale]} ↗</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- approach ---------- */}
      <section className="rd-sec" id="approach" style={{ paddingTop: 40 }}>
        <Approach locale={locale} />
      </section>

      {/* ---------- stats ---------- */}
      <section className="rd-sec" style={{ padding: "40px 0 130px" }}>
        <div className="rd-wrap">
          <div className="rd-head rd-rv">
            <div>
              <div className="rd-eyebrow rd-mono">{homeStats.eyebrow[locale]}</div>
              <h2 className="rd-big">{homeStats.title[0][locale]}<br /><span className="rd-acc">{homeStats.title[1][locale]}</span></h2>
            </div>
          </div>
          <Stats locale={locale} />
        </div>
      </section>

      {/* ---------- lab ---------- */}
      <section className="rd-sec" id="lab" style={{ paddingTop: 20 }}>
        <div className="rd-wrap">
          <div className="rd-head rd-rv">
            <div>
              <div className="rd-eyebrow rd-mono">{homeLab.eyebrow[locale]}</div>
              <h2 className="rd-big">{homeLab.title[0][locale]}<br /><span className="rd-acc">{homeLab.title[1][locale]}</span></h2>
            </div>
            <p>{homeLab.body[locale]}</p>
          </div>
          <Lab locale={locale} />
        </div>
      </section>

      {/* ---------- about ---------- */}
      <section className="rd-sec" id="about">
        <div className="rd-wrap rd-about">
          <div className="rd-rv">
            <div className="rd-eyebrow rd-mono">{homeAbout.eyebrow[locale]}</div>
            <h2 className="rd-big">{homeAbout.title[0][locale]}<br />{homeAbout.title[1][locale]}<br /><span className="rd-acc">{homeAbout.title[2][locale]}</span></h2>
            <p>{homeAbout.p1[locale]}</p>
            <p>{homeAbout.p2[locale]}</p>
            <div className="rd-creds">{homeAbout.creds.map((c) => <span key={c.en} className="rd-pill rd-mono">{c[locale]}</span>)}</div>
          </div>
          <svg className="rd-venn rd-rv" viewBox="0 0 520 480" role="img" aria-label={v.aria[locale]}>
            <circle cx="190" cy="180" r="130" /><circle cx="330" cy="180" r="130" /><circle cx="260" cy="300" r="130" />
            <path className="core" d="M260 132 A130 130 0 0 1 320 245 A130 130 0 0 1 200 245 A130 130 0 0 1 260 132Z" />
            <text x="110" y="130" className="m">HUMAN</text><text x="110" y="152">{v.human[0][locale]}</text><text x="110" y="170" className="s">{v.human[1][locale]}</text>
            <text x="340" y="130" className="m">SYSTEM</text><text x="340" y="152">{v.system[0][locale]}</text><text x="340" y="170" className="s">{v.system[1][locale]}</text>
            <text x="215" y="370" className="m">EXECUTION</text><text x="215" y="392">{v.exec[0][locale]}</text><text x="215" y="410" className="s">{v.exec[1][locale]}</text>
          </svg>
        </div>
      </section>

      {/* ---------- articles ---------- */}
      <section className="rd-sec" id="articles" style={{ paddingTop: 40 }}>
        <div className="rd-wrap">
          <div className="rd-head rd-rv">
            <div>
              <div className="rd-eyebrow rd-mono">{locale === "th" ? "บทความ" : "Articles (Thai)"}</div>
              <h2 className="rd-big">{locale === "th" ? "ความรู้ที่ใช้ได้จริง" : "Practical know-how"}<br /><span className="rd-acc">{locale === "th" ? "จากหน้างานและ HR" : "from the floor and HR"}</span></h2>
            </div>
            <Link className="rd-btn rd-btn-line" href={`/${locale}/articles`}>{locale === "th" ? "บทความทั้งหมด" : "All articles"} →</Link>
          </div>
          <div className="rd-alist">
            {articles.slice(0, 3).map((article, i) => (
              <Link key={article.slug} href={`/${locale}/articles/${article.slug}`} className="rd-acard rd-rv" lang="th">
                <span className="rd-mono rd-acc">{String(i + 1).padStart(2, "0")} · {article.kind}</span>
                <h3>{article.title}</h3>
                <span className="rd-acard-foot">
                  <span className="rd-mono">{thaiDate(article.date)}</span>
                  <span className="rd-circ sm" aria-hidden="true">↗</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- faq ---------- */}
      <section className="rd-sec" id="faq" style={{ paddingTop: 40 }}>
        <div className="rd-wrap rd-faq">
          <div className="rd-rv">
            <div className="rd-eyebrow rd-mono">{homeFaq.eyebrow[locale]}</div>
            <h2 className="rd-big">{homeFaq.title[0][locale]}<br /><span className="rd-acc">{homeFaq.title[1][locale]}</span></h2>
          </div>
          <div className="rd-rv">
            {homeFaq.items.map(([q, a]) => (
              <details key={q.en}>
                <summary>{q[locale]}<i aria-hidden="true">+</i></summary>
                <p>{a[locale]}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBlock locale={locale} />
    </main>
  );
}
