/**
 * Business facts. Single source of truth.
 * `verified` = seen on an official platform on the date below.
 * Anything marked `toConfirm` is NOT shown as fact on the site until confirmed by Rio Sun.
 * Data captured: 2026-11-08 from Fresha + Treatwell public pages.
 */
export const site = {
  name: "Rio Sun Massage Therapy",
  brandLine: "Brazilian Aesthetics",
  venue: {
    host: "Cullinan Clinic", // Rio Sun practises from a treatment room inside the clinic. Not owned by Rio Sun.
    street: "659 Fulham Road",
    city: "London",
    postcode: "SW6 5PY",
    country: "United Kingdom",
    nearest: "Fulham Broadway", // Treatwell: ~6 min walk
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=659+Fulham+Road+London+SW6+5PY",
    mapEmbed: "https://www.google.com/maps?q=659+Fulham+Road,+London+SW6+5PY&output=embed",
  },
  languages: ["English", "Português (Brasil)"],
  links: {
    // Official links supplied by the client on 2026-11-08
    instagram: "https://www.instagram.com/riosunmassagetherapy/",
    treatwell: "https://www.treatwell.co.uk/place/rio-sun-massage-therapy-london/",
    treatwellReviews: "https://www.treatwell.co.uk/place/rio-sun-massage-therapy-london/reviews/",
    freshaProfile: "https://www.fresha.com/en-GB/p/rio-sun-massage-therapy-4512058",
    // Venue booking flow on Fresha (opens the service menu + calendar)
    freshaBooking: "https://www.fresha.com/a/rio-sun-massage-therapy-london-659-fulham-road-rwzlukmn/booking?menu=true",
  },
  ratings: {
    treatwell: { score: 5.0, count: 52, capturedOn: "2026-11-08", url: "https://www.treatwell.co.uk/place/rio-sun-massage-therapy-london/" },
    fresha: { score: 5.0, count: 31, capturedOn: "2026-11-08", url: "https://www.fresha.com/en-GB/p/rio-sun-massage-therapy-4512058" },
  },
  /**
   * Opening hours DIFFER between platforms → not displayed as fact yet.
   * The Contact page points to live availability on the booking platforms instead.
   */
  hours: {
    toConfirm: true,
    fresha: { mon: "11:00–19:30", tue: "10:00–19:30", wed: "10:00–19:30", thu: "10:00–19:30", fri: "10:00–19:30", sat: "09:00–18:00", sun: "10:00–17:30" },
    treatwell: { mon: "11:00–19:00", tue: "10:00–19:00", wed: "10:00–19:00", thu: "10:00–19:00", fri: "09:00–19:00", sat: "09:00–18:30", sun: "10:00–19:00" },
  },
  contact: {
    // Supplied by the client on 2026-11-08
    phone: "+44 7576 223654",
    phoneHref: "tel:+447576223654",
    whatsapp: "https://wa.me/447576223654",
    email: "Riosunmassagetherapy@outlook.com",
    /** Contact form delivery (FormSubmit, no backend needed). The first message
     *  sends an activation e-mail to this inbox; after one click, forms are delivered. */
    formEndpoint: "https://formsubmit.co/ajax/Riosunmassagetherapy@outlook.com",
  },
} as const;

export type Platform = "fresha" | "treatwell";
