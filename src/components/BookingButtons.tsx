import { site } from "@/content/site";
import type { Dictionary } from "@/i18n/get-dictionary";
import { Arrow } from "./ui";

/** Fresha + Treatwell buttons. Booking works from day one: official links, no custom system. */
export function BookingButtons({ dict, on = ["fresha", "treatwell"], tone = "dark", size = "md", className = "" }: {
  dict: Dictionary; on?: ("fresha" | "treatwell")[]; tone?: "dark" | "light"; size?: "md" | "sm"; className?: string;
}) {
  const links = { fresha: site.links.freshaBooking, treatwell: site.links.treatwell };
  const names = { fresha: "Fresha", treatwell: "Treatwell" };
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {on.map((p, i) => (
        <a key={p} href={links[p]} target="_blank" rel="noopener"
          className={`btn ${size === "sm" ? "!min-h-11 !px-5" : ""} ${i === 0 ? (tone === "dark" ? "btn-gold" : "btn-burgundy") : (tone === "dark" ? "btn-ghost-light" : "btn-ghost-dark")}`}
          data-booking={p}>
          {dict.cta.bookOn} {names[p]} <Arrow />
        </a>
      ))}
    </div>
  );
}
