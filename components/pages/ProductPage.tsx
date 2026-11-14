import Link from "next/link";
import {
  assistantSample,
  getProduct,
  products,
  productsCopy,
  watchSample,
  type Locale,
  type Product,
} from "@/app/site-data";
import { ProductIcon } from "@/components/shared/ProductIcon";
import { FlowDiagram } from "@/components/shared/FlowDiagram";

function SampleTag({ locale }: { locale: Locale }) {
  return <span className="sample-tag">{productsCopy.sample[locale]}</span>;
}

/* ───────── Product 1: hero chat mock-up (generic window, no third-party logo) ───────── */
function AssistantHeroVisual({ locale }: { locale: Locale }) {
  const { chat, shortcuts } = assistantSample;
  return (
    <div className="mock-window" role="img" aria-label={locale === "th" ? "ตัวอย่างหน้าแชตของผู้สมัคร" : "Example of an applicant's chat"}>
      <div className="mock-bar"><span /><span /><span /></div>
      <div className="mock-chat">
        <p className="bubble from-user">{chat.question[locale]}</p>
        <p className="bubble from-bot">{chat.answer[locale]}</p>
        <div className="quick-replies">
          {shortcuts.map((item) => (
            <span key={item.en} className="quick-reply">{item[locale]}</span>
          ))}
        </div>
      </div>
      <SampleTag locale={locale} />
    </div>
  );
}

/* ───────── Product 1: logged-questions bar chart (no numbers) ───────── */
function AssistantInsight({ locale }: { locale: Locale }) {
  const { shortcuts, topicBars, logTitle } = assistantSample;
  return (
    <section className="product-section section-pad">
      <div className="product-heading reveal">
        <h2>{logTitle[locale]}</h2>
      </div>
      <div className="bars reveal">
        {shortcuts.map((item, index) => (
          <div key={item.en} className="bar-row">
            <span className="bar-label">{item[locale]}</span>
            <span className="bar-track"><span className="bar-fill" style={{ width: `${topicBars[index]}%` }} /></span>
          </div>
        ))}
        <SampleTag locale={locale} />
      </div>
    </section>
  );
}

/* ───────── Product 2: hero register mock-up ───────── */
function WatchHeroVisual({ locale }: { locale: Locale }) {
  const { register } = watchSample;
  return (
    <div className="mock-window" role="img" aria-label={locale === "th" ? "ตัวอย่างทะเบียนสัญญา" : "Example of a contract register"}>
      <div className="mock-bar"><span /><span /><span /></div>
      <table className="mock-table">
        <caption>{register.title[locale]}</caption>
        <thead>
          <tr>
            <th scope="col">{register.cols.name[locale]}</th>
            <th scope="col">{register.cols.left[locale]}</th>
            <th scope="col">{register.cols.status[locale]}</th>
          </tr>
        </thead>
        <tbody>
          {register.rows.map((row) => (
            <tr key={row.name.en}>
              <td>{row.name[locale]}</td>
              <td>{row.left}</td>
              <td><span className={`level-chip tone-${row.tone}`}>{row.status[locale]}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
      <SampleTag locale={locale} />
    </div>
  );
}

/* ───────── Product 2: warning timeline + weekly email mock-up ───────── */
function WatchInsight({ locale }: { locale: Locale }) {
  const { levels, levelsTitle, email } = watchSample;
  return (
    <>
      <section className="product-section section-pad">
        <div className="product-heading reveal">
          <h2>{levelsTitle[locale]}</h2>
        </div>
        <ol className="level-timeline reveal">
          {levels.map((level) => (
            <li key={level.en} className={`level-step tone-${level.tone}`}>
              <span className="level-dot" />
              <span className="level-label">{level[locale]}</span>
            </li>
          ))}
        </ol>
      </section>
      <section className="product-section section-pad">
        <div className="product-heading reveal">
          <h2>{email.title[locale]}</h2>
        </div>
        <div className="mock-window mock-email reveal" role="img" aria-label={email.subject[locale]}>
          <div className="mock-bar"><span /><span /><span /></div>
          <p className="mock-email-subject"><ProductIcon name="mail" size={18} /> {email.subject[locale]}</p>
          <ul className="mock-email-rows">
            {email.rows.map((row) => (
              <li key={row.label.en}>
                <span className={`level-chip tone-${row.tone}`}>{row.label[locale]}</span>
                <span className="mock-email-lines" aria-hidden="true"><i /><i /></span>
              </li>
            ))}
          </ul>
          <SampleTag locale={locale} />
        </div>
      </section>
    </>
  );
}

export function ProductPage({ locale, product }: { locale: Locale; product: Product }) {
  const isAssistant = product.slug === "line-hr-assistant";
  const other = products.find((item) => item.slug !== product.slug)!;
  const ctaHref = `/${locale}/contact#quote`;

  return (
    <main className="product-page">
      {/* ─── HERO ─── */}
      <section className="product-hero section-pad">
        <div className="product-hero-copy">
          <Link className="product-back" href={`/${locale}/products`}>{productsCopy.back[locale]}</Link>
          <p className="eyebrow">{product.name[locale]}</p>
          <h1>{product.hero.title[locale]}</h1>
          <p className="lede">{product.hero.sub[locale]}</p>
          <Link className="button" href={ctaHref}>{product.hero.cta[locale]}</Link>
        </div>
        <div className="product-hero-visual">
          {isAssistant ? <AssistantHeroVisual locale={locale} /> : <WatchHeroVisual locale={locale} />}
        </div>
      </section>

      {/* ─── PROBLEM ─── */}
      <section className="product-section section-pad">
        <div className="product-heading reveal">
          <h2>{product.problem.title[locale]}</h2>
          <p>{product.problem.sub[locale]}</p>
        </div>
        <div className="problem-grid">
          {product.problem.items.map((item, index) => (
            <div key={item.title.en} className="problem-card reveal" style={{ "--reveal-delay": `${index * 0.08}s` } as React.CSSProperties}>
              <span className="problem-icon"><ProductIcon name={item.icon} size={30} /></span>
              <strong>{item.title[locale]}</strong>
            </div>
          ))}
        </div>
      </section>

      {/* ─── BEFORE / AFTER ─── */}
      <section className="product-section section-pad">
        <div className="before-after reveal">
          <div className="ba-panel ba-before">
            <span className="ba-tag">{productsCopy.before[locale]}</span>
            <span className="ba-icon"><ProductIcon name={product.beforeAfter.before.icon} size={40} /></span>
            <strong>{product.beforeAfter.before.title[locale]}</strong>
          </div>
          <span className="ba-arrow" aria-hidden="true">→</span>
          <div className="ba-panel ba-after">
            <span className="ba-tag">{productsCopy.after[locale]}</span>
            <span className="ba-icon"><ProductIcon name={product.beforeAfter.after.icon} size={40} /></span>
            <strong>{product.beforeAfter.after.title[locale]}</strong>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS (4 steps) ─── */}
      <section className="product-section section-pad">
        <div className="product-heading reveal">
          <h2>{product.how.title[locale]}</h2>
          <p>{product.how.sub[locale]}</p>
        </div>
        <ol className="steps-row">
          {product.how.steps.map((step, index) => (
            <li key={step.label.en} className="step-card reveal" style={{ "--reveal-delay": `${index * 0.08}s` } as React.CSSProperties}>
              <span className="step-card-num">{index + 1}</span>
              <span className="step-card-icon"><ProductIcon name={step.icon} size={28} /></span>
              <strong>{step.label[locale]}</strong>
            </li>
          ))}
        </ol>
      </section>

      {/* ─── FLOW DIAGRAM ─── */}
      <section className="product-section section-pad">
        <div className="product-heading reveal">
          <h2>{product.flow.title[locale]}</h2>
        </div>
        <div className="reveal">
          <FlowDiagram product={product} locale={locale} />
        </div>
      </section>

      {/* ─── HIGHLIGHTS ─── */}
      <section className="product-section section-pad">
        <div className="highlight-grid">
          {product.highlights.map((item, index) => (
            <article key={item.title.en} className="feature-card reveal" style={{ "--reveal-delay": `${index * 0.1}s` } as React.CSSProperties}>
              <div className="feature-icon-badge tone-teal"><ProductIcon name={item.icon} size={24} /></div>
              <h3>{item.title[locale]}</h3>
              <p>{item.body[locale]}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ─── PRODUCT-SPECIFIC VISUAL ─── */}
      {isAssistant ? <AssistantInsight locale={locale} /> : <WatchInsight locale={locale} />}

      {/* ─── BENEFITS + LIMITS ─── */}
      <section className="product-section section-pad">
        <div className="benefit-limit">
          <div className="bl-col reveal">
            <h2>{product.benefitsTitle[locale]}</h2>
            <ul className="bl-list bl-good">
              {product.benefits.map((item) => <li key={item.en}>{item[locale]}</li>)}
            </ul>
          </div>
          <div className="bl-col reveal">
            <h2>{product.limitsTitle[locale]}</h2>
            <ul className="bl-list bl-limit">
              {product.limits.map((item) => <li key={item.en}>{item[locale]}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── CLOSING CTA ─── */}
      <section className="cta section-pad reveal">
        <h2>{product.closing[locale]}</h2>
        <Link className="button light" href={ctaHref}>{product.hero.cta[locale]} <span>↗</span></Link>
      </section>

      <section className="product-section section-pad product-other">
        <Link className="text-link" href={`/${locale}/products/${other.slug}`}>
          {other.name[locale]} <span aria-hidden="true">→</span>
        </Link>
      </section>
    </main>
  );
}

export function ProductPageBySlug({ locale, slug }: { locale: Locale; slug: string }) {
  const product = getProduct(slug);
  return product ? <ProductPage locale={locale} product={product} /> : null;
}
