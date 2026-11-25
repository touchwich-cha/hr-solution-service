import Link from "next/link";
import { pageSeo, siteUrl, type Locale } from "@/app/site-data";
import { articles, thaiDate } from "@/app/articles-data";
import { breadcrumbJsonLd } from "@/app/seo";
import { JsonLd } from "@/components/shared/JsonLd";
import { CtaBlock, RdIntro } from "@/components/rd/Blocks";

export function ArticlesPage({ locale }: { locale: Locale }) {
  const th = locale === "th";
  const list = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: articles.map((article, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: article.title,
      url: `${siteUrl}/th/articles/${article.slug}`,
    })),
  };
  return (
    <main>
      <JsonLd data={breadcrumbJsonLd(locale, pageSeo[""].crumb[locale], [{ name: pageSeo.articles.crumb[locale], path: "articles" }])} />
      <JsonLd data={list} />
      <RdIntro
        locale={locale}
        eyebrow={th ? "บทความ · Knowledge" : "Articles · Knowledge"}
        title={{ th: "ความรู้ที่ใช้ได้จริง", en: "Practical knowledge" }}
        accent={{ th: "จากหน้างานโรงงานและ HR", en: "from the factory floor and HR" }}
        body={{
          th: "สรุปกฎ GMP ตามประกาศ สธ. ฉบับที่ 420 พร้อมอ้างอิงข้อ และมุมมองงาน HR กับการสร้างระบบอัตโนมัติ จากประสบการณ์ในโรงงานผลิตกว่า 17 ปี",
          en: "GMP notice 420 summarised with clause references, plus HR and automation know-how from 17 years in manufacturing. The articles are written in Thai.",
        }}
      />
      <section className="rd-sec" style={{ paddingTop: 20 }}>
        <div className="rd-wrap">
          <div className="rd-alist">
            {articles.map((article, i) => (
              <Link key={article.slug} href={`/${locale}/articles/${article.slug}`} className="rd-acard rd-rv" lang="th">
                <span className="rd-mono rd-acc">{String(i + 1).padStart(2, "0")} · {article.kind}</span>
                <h2>{article.title}</h2>
                <p>{article.answer}</p>
                <span className="rd-acard-foot">
                  <span className="rd-mono">{thaiDate(article.date)}</span>
                  <span className="rd-circ sm" aria-hidden="true">↗</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CtaBlock locale={locale} />
    </main>
  );
}
