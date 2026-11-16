import { catalogCopy, fastwork } from "@/app/catalog-data";
import type { Locale } from "@/app/site-data";

/** Explains that every product here is also a Fastwork listing; shows the button once the profile URL is set. */
export function FastworkNote({ locale }: { locale: Locale }) {
  return (
    <section className="fw-note section-pad reveal">
      <div>
        <h2>{catalogCopy.fastworkTitle[locale]}</h2>
        <p>{catalogCopy.fastworkBody[locale]}</p>
      </div>
      {fastwork.profileUrl && (
        <a className="button" href={fastwork.profileUrl} target="_blank" rel="noopener noreferrer">
          {catalogCopy.orderFastwork[locale]} ↗
        </a>
      )}
    </section>
  );
}
