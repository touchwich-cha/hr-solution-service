import Link from "next/link";
import { brand, pageSeo, siteUrl, videoPublished, videoUploadDate, type Locale } from "@/app/site-data";
import { articles, getArticle, thaiDate, type Article, type Block } from "@/app/articles-data";
import { formatPrice, fromPrice, getFwProduct } from "@/app/catalog-data";
import { breadcrumbJsonLd } from "@/app/seo";
import { JsonLd } from "@/components/shared/JsonLd";
import { CtaBlock } from "@/components/rd/Blocks";
import { VideoGrid } from "@/components/home/HomeClient";

function BlockView({ block }: { block: Block }) {
  switch (block.t) {
    case "h2":
      return <h2>{block.text}</h2>;
    case "p":
      return <p>{block.text}</p>;
    case "ul":
      return <ul>{block.items.map((item) => <li key={item}>{item}</li>)}</ul>;
    case "note":
      return <aside className="rd-note-box">{block.text}</aside>;
    case "verdict":
      return (
        <div className={`rd-verdict v-${block.label === "จริง" ? "true" : block.label === "ไม่จริง" ? "false" : "half"}`}>
          <b className="rd-mono">{block.label}</b>
          <span>{block.text}</span>
        </div>
      );
  }
}

export function ArticlePage({ locale, article }: { locale: Locale; article: Article }) {
  const th = locale === "th";
  const url = `${siteUrl}/th/articles/${article.slug}`;
  const related = article.related.map((slug) => getArticle(slug)).filter((item): item is Article => Boolean(item));
  const product = article.product ? getFwProduct(article.product.slug) : undefined;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    inLanguage: "th",
    datePublished: article.date,
    dateModified: article.updated ?? article.date,
    mainEntityOfPage: url,
    image: `${siteUrl}/og.jpg`,
    author: { "@type": "Organization", name: brand.name, url: siteUrl },
    publisher: { "@type": "Organization", name: brand.name, url: siteUrl, logo: { "@type": "ImageObject", url: `${siteUrl}/logo-mark.png` } },
  };
  const videoJsonLd = article.videoId && videoPublished[article.videoId]
    ? {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        name: article.videoLabel ?? article.title,
        description: article.description,
        thumbnailUrl: `https://i.ytimg.com/vi/${article.videoId}/hqdefault.jpg`,
        uploadDate: videoUploadDate(article.videoId),
        embedUrl: `https://www.youtube-nocookie.com/embed/${article.videoId}`,
        url: `https://youtu.be/${article.videoId}`,
      }
    : undefined;

  return (
    <main>
      <JsonLd data={articleJsonLd} />
      {videoJsonLd && <JsonLd data={videoJsonLd} />}
      <JsonLd
        data={breadcrumbJsonLd(locale, pageSeo[""].crumb[locale], [
          { name: pageSeo.articles.crumb[locale], path: "articles" },
          { name: article.title, path: `articles/${article.slug}` },
        ])}
      />
      <header className="rd-intro">
        <div className="rd-wrap rd-art-head" lang="th">
          <Link className="rd-back rd-mono" href={`/${locale}/articles`}>← {th ? "บทความทั้งหมด" : "All articles"}</Link>
          <div className="rd-eyebrow rd-mono">{article.kind}</div>
          <h1 className="rd-art-title">{article.title}</h1>
          <p className="rd-art-meta rd-mono">{thaiDate(article.date)} · {brand.name}</p>
        </div>
      </header>

      <article className="rd-wrap rd-art" lang="th">
        <div className="rd-answer">
          <span className="rd-mono rd-acc">คำตอบสั้น</span>
          <p>{article.answer}</p>
        </div>

        {article.body.map((block, i) => <BlockView key={i} block={block} />)}

        {article.videoId && (
          <section className="rd-art-video" aria-label="วิดีโอประกอบ">
            <h2>ดูเป็นวิดีโอ</h2>
            <VideoGrid
              locale={locale}
              videos={[{ id: article.videoId, aspect: article.videoId === "qfpygdPSu9I" ? "tall" : "wide", title: { th: article.videoLabel ?? article.title, en: article.videoLabel ?? article.title } }]}
            />
          </section>
        )}

        <section className="rd-sources">
          <h2>แหล่งอ้างอิง</h2>
          <ul>{article.sources.map((source) => <li key={source}>{source}</li>)}</ul>
          <p className="rd-note-line">บทความนี้สรุปเพื่อการเรียนรู้ ก่อนนำไปใช้จริง ควรตรวจฉบับล่าสุดของหน่วยงานที่เกี่ยวข้อง</p>
        </section>

        {product && article.product && (
          <Link href={`/${locale}/products/${product.slug}`} className="rd-art-cta">
            <span>{article.product.cta}</span>
            <b className="rd-mono">เริ่ม ฿{formatPrice(fromPrice(product))}</b>
            <span className="rd-circ sm" aria-hidden="true">↗</span>
          </Link>
        )}
      </article>

      <section className="rd-sec" style={{ paddingTop: 30 }}>
        <div className="rd-wrap" lang="th">
          <div className="rd-eyebrow rd-mono">อ่านต่อ</div>
          <div className="rd-related">
            {related.map((item) => (
              <Link key={item.slug} href={`/${locale}/articles/${item.slug}`}>
                <span>{item.title}</span>
                <small className="rd-mono">{item.kind}</small>
                <span className="rd-circ sm" aria-hidden="true">↗</span>
              </Link>
            ))}
            {articles.length > related.length + 1 && (
              <Link href={`/${locale}/articles`}><span>บทความทั้งหมด</span><span className="rd-circ sm" aria-hidden="true">↗</span></Link>
            )}
          </div>
        </div>
      </section>

      <CtaBlock locale={locale} />
    </main>
  );
}
