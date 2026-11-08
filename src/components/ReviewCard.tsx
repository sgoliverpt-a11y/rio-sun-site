import type { Review } from "@/content/people-reviews";
import { platformLabel } from "@/content/people-reviews";
import type { Dictionary } from "@/i18n/get-dictionary";
import { site } from "@/content/site";

export function ReviewCard({ r, dict }: { r: Review; dict: Dictionary }) {
  return (
    <figure className="flex h-full flex-col justify-between border-t border-line pt-6" lang="en-GB">
      <blockquote className="font-display text-[1.35rem] leading-[1.3] sm:text-[1.55rem]">
        <span aria-hidden className="text-accent">“</span>{r.text}<span aria-hidden className="text-accent">”</span>
      </blockquote>
      <figcaption className="mt-8 flex flex-wrap items-center justify-between gap-2 text-[13px]">
        <span className="font-semibold">{r.author}<span className="font-normal text-muted"> · {r.treatment}</span></span>
        <span className="eyebrow text-muted">
          {r.stars && <span aria-label="5/5" className="mr-2 tracking-[.1em] text-accent">★★★★★</span>}
          {dict.reviews.source} {platformLabel[r.platform]}
        </span>
      </figcaption>
      {dict.common.originalLanguage && <p className="mt-2 text-[11px] text-muted">{dict.common.originalLanguage}</p>}
    </figure>
  );
}

/** Aggregate ratings, linked to the source (verifiable). */
export function RatingBadges({ dict, tone = "light" }: { dict: Dictionary; tone?: "light" | "dark" }) {
  const items = [
    { name: "Treatwell", ...site.ratings.treatwell },
    { name: "Fresha", ...site.ratings.fresha },
  ];
  return (
    <ul className="flex flex-wrap gap-x-10 gap-y-4">
      {items.map((i) => (
        <li key={i.name}>
          <a href={i.url} target="_blank" rel="noopener" className="group flex items-baseline gap-3">
            <span className={`font-display text-4xl ${tone === "dark" ? "text-gold-metal" : "text-burgundy-800"}`}>{i.score.toFixed(1)}</span>
            <span className="text-[13px] leading-tight text-muted">
              <span aria-hidden className="text-accent">★★★★★</span><br />
              <span className="link-underline">{i.count} {dict.common.reviewsOn} {i.name}</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
