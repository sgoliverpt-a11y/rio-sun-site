import type { L10n } from "@/i18n/config";
import type { AssetId } from "./assets";

/**
 * CENTRAL TREATMENT CATALOGUE
 * ---------------------------------------------------------------
 * One file feeds the Home cards, the Treatments page, every detail page
 * and the booking buttons. Update prices here once; the whole site follows.
 *
 * Source data captured 2026-11-08 from:
 *   F  = Fresha  (fresha.com/en-GB/p/rio-sun-massage-therapy-4512058 + venue page)
 *   TW = Treatwell (treatwell.co.uk/place/rio-sun-massage-therapy-london)
 *
 * `status`
 *   "confirmed"   → same data on both platforms, or single-platform data with no conflict
 *   "conflict"    → platforms disagree (name / duration / price) → client must confirm
 *   "partial"     → service exists but duration or price not visible on either platform
 *
 * Descriptions are DRAFT copy written for review: neutral, no medical claims,
 * no promised results. They must be approved by Rio Sun before launch.
 */

export type CategoryId = "brazilian-body" | "specialist-care" | "facial" | "relaxation";
export type Status = "confirmed" | "conflict" | "partial";

export interface Variant {
  minutes: number | null;
  /** GBP. `from` = platform shows "from £x" (off-peak / discount pricing exists). */
  price: { amount: number; from?: boolean } | null;
}

export interface Treatment {
  slug: string;
  category: CategoryId;
  name: L10n;
  /** Exact names as listed on each platform, for traceability. */
  platformNames: { fresha?: string; treatwell?: string };
  variants: Variant[];
  status: Status;
  note?: string; // internal: what needs confirming
  summary: L10n;
  featured?: boolean;
  /** Has its own detail page (Treatment Detail template). */
  detail?: boolean;
  media: AssetId;
  bookOn: ("fresha" | "treatwell")[];
}

export const categories: { id: CategoryId; name: L10n; intro: L10n }[] = [
  {
    id: "brazilian-body",
    name: { en: "Brazilian Body Treatments", "pt-br": "Tratamentos Corporais Brasileiros" },
    intro: {
      en: "The signature of Rio Sun: manual lymphatic drainage and sculpting massage, performed with the Brazilian technique.",
      "pt-br": "A assinatura da Rio Sun: drenagem linfática manual e massagem modeladora, com a técnica brasileira.",
    },
  },
  {
    id: "specialist-care",
    name: { en: "Specialist Care", "pt-br": "Cuidados Especializados" },
    intro: {
      en: "Gentle protocols for pregnancy and post-surgical recovery, always alongside the guidance of your doctor.",
      "pt-br": "Protocolos delicados para gestação e pós-operatório, sempre em conjunto com a orientação do seu médico.",
    },
  },
  {
    id: "facial",
    name: { en: "Facial Treatments", "pt-br": "Tratamentos Faciais" },
    intro: {
      en: "Lymphatic techniques adapted to the face, for moments when you want to arrive looking rested.",
      "pt-br": "Técnicas linfáticas adaptadas ao rosto, para quando você quer chegar com aparência descansada.",
    },
  },
  {
    id: "relaxation",
    name: { en: "Relaxation & Rituals", "pt-br": "Relaxamento & Rituais" },
    intro: {
      en: "Massage, hot oil and energy work for the head, the feet and the whole body.",
      "pt-br": "Massagem, óleo quente e terapia energética para a cabeça, os pés e o corpo inteiro.",
    },
  },
];

export const treatments: Treatment[] = [
  // ─── BRAZILIAN BODY ────────────────────────────────────────────
  {
    slug: "brazilian-lymphatic-drainage",
    category: "brazilian-body",
    name: { en: "Brazilian Lymphatic Drainage — Full Body", "pt-br": "Drenagem Linfática Brasileira — Corpo Inteiro" },
    platformNames: { fresha: "Brazilian Lymphatic Drainage Full Body", treatwell: "Brazilian Lymphatic Drainage Full Body" },
    variants: [
      { minutes: 60, price: { amount: 88, from: true } },
      { minutes: 90, price: { amount: 120, from: true } }, // 90-min price seen on TW only; F shows "from £88" range
    ],
    status: "confirmed",
    note: "90-min price (£120) visible on Treatwell only. Both platforms show 'save up to 20%' offers.",
    summary: {
      en: "A full-body manual lymphatic drainage using rhythmic, precise Brazilian movements. Our most requested treatment.",
      "pt-br": "Drenagem linfática manual de corpo inteiro, com movimentos rítmicos e precisos da técnica brasileira. O nosso tratamento mais procurado.",
    },
    featured: true,
    detail: true,
    media: "LYMPHATIC_IMAGE",
    bookOn: ["fresha", "treatwell"],
  },
  {
    slug: "brazilian-sculpting-massage",
    category: "brazilian-body",
    name: { en: "Brazilian Sculpting Massage", "pt-br": "Massagem Modeladora Brasileira" },
    platformNames: { fresha: "Brazilian Sculpting Massage", treatwell: "Brazilian Sculpting Massage" },
    variants: [
      { minutes: 60, price: { amount: 120, from: true } },
      { minutes: 90, price: null },
    ],
    status: "partial",
    note: "Both show 'from £120' for 1h–1h30. Price of the 90-min option not visible.",
    summary: {
      en: "A firmer, deeper massage that works the body's contours with the classic Brazilian modelling technique.",
      "pt-br": "Massagem mais firme e profunda, que trabalha os contornos do corpo com a técnica modeladora brasileira.",
    },
    featured: true,
    detail: true,
    media: "BODY_SCULPTING_IMAGE",
    bookOn: ["fresha", "treatwell"],
  },
  {
    slug: "brazilian-rio-shape",
    category: "brazilian-body",
    name: { en: "Brazilian RIO Shape Massage", "pt-br": "Massagem RIO Shape Brasileira" },
    platformNames: { fresha: "Brazilian RIO Shape Massage" },
    variants: [{ minutes: 120, price: { amount: 200 } }],
    status: "partial",
    note: "Listed on Fresha only (2 h, £200). Not seen on Treatwell. Content of the protocol to be described by Rio Sun.",
    summary: {
      en: "Rio Sun's extended two-hour signature session. Full protocol description to follow.",
      "pt-br": "A sessão assinatura da Rio Sun, com duas horas de duração. Descrição completa do protocolo em breve.",
    },
    featured: true,
    detail: true,
    media: "RIO_SHAPE_IMAGE",
    bookOn: ["fresha"],
  },
  {
    slug: "abdominal-sculpting-massage",
    category: "brazilian-body",
    name: { en: "Abdominal Sculpting Massage", "pt-br": "Massagem Modeladora Abdominal" },
    platformNames: { fresha: "Abdominal Sculpting Massage (category)", treatwell: "Abdominal Sculpting Massage (category)" },
    variants: [{ minutes: null, price: { amount: 60, from: true } }],
    status: "partial",
    note: "Category on both; TW shows 'from £60'. Individual service name and duration not visible.",
    summary: {
      en: "A focused sculpting massage for the abdominal area.",
      "pt-br": "Massagem modeladora concentrada na região abdominal.",
    },
    media: "ABDOMINAL_IMAGE",
    bookOn: ["fresha", "treatwell"],
  },
  {
    slug: "express-brazilian-treatment",
    category: "brazilian-body",
    name: { en: "Express Brazilian Treatment", "pt-br": "Tratamento Brasileiro Express" },
    platformNames: { fresha: "Express Brazilian treatments (category)", treatwell: "Express Brazilian Treatments (category)" },
    variants: [{ minutes: null, price: { amount: 85 } }],
    status: "partial",
    note: "Category on both; TW shows £85 for 1 service. Service name and duration not visible.",
    summary: {
      en: "A shorter Brazilian session for full diaries.",
      "pt-br": "Uma sessão brasileira mais curta, para agendas cheias.",
    },
    media: "EXPRESS_IMAGE",
    bookOn: ["fresha", "treatwell"],
  },

  // ─── SPECIALIST CARE ──────────────────────────────────────────
  {
    slug: "pregnancy-lymphatic-drainage",
    category: "specialist-care",
    name: { en: "Pregnancy Lymphatic Drainage", "pt-br": "Drenagem Linfática na Gestação" },
    platformNames: { treatwell: "Pregnancy Lymphatic Drainage Massage" },
    variants: [{ minutes: null, price: { amount: 110 } }],
    status: "partial",
    note: "Treatwell only (£110). Duration and from which week of pregnancy it is offered: to confirm.",
    summary: {
      en: "A gentle lymphatic drainage adapted to pregnancy. Please check with your midwife or doctor before booking.",
      "pt-br": "Drenagem linfática delicada, adaptada à gestação. Consulte sua obstetra ou parteira antes de agendar.",
    },
    detail: true,
    media: "PREGNANCY_IMAGE",
    bookOn: ["treatwell"],
  },
  {
    slug: "post-surgical-lymphatic-drainage",
    category: "specialist-care",
    name: { en: "Post-Surgical Lymphatic Drainage", "pt-br": "Drenagem Linfática Pós-Operatória" },
    platformNames: { treatwell: "Post-Surgical Lymphatic Drainage Massage" },
    variants: [{ minutes: 60, price: { amount: 110 } }],
    status: "partial",
    note: "Treatwell only (1 h, £110). Not seen on Fresha. Requirements (surgeon clearance, timing) to confirm.",
    summary: {
      en: "Manual lymphatic drainage for the recovery period, scheduled with your surgeon's clearance.",
      "pt-br": "Drenagem linfática manual para o período de recuperação, agendada com a liberação do seu cirurgião.",
    },
    detail: true,
    media: "POST_SURGICAL_IMAGE",
    bookOn: ["treatwell"],
  },

  // ─── FACIAL ───────────────────────────────────────────────────
  {
    slug: "express-facial-glow",
    category: "facial",
    name: { en: "Express Lymphatic Facial Glow", "pt-br": "Drenagem Facial Express Glow" },
    platformNames: { treatwell: "Express Lymphatic Drainage Facial Glow" },
    variants: [{ minutes: 30, price: { amount: 65 } }],
    status: "partial",
    note: "Treatwell: 30 min, £65. TW lists 3 face treatments 'from £65'; the other 2 are not visible. F has a 'Face treatments' category, items not visible.",
    summary: {
      en: "Thirty minutes of facial lymphatic drainage to leave the face feeling fresh and light.",
      "pt-br": "Trinta minutos de drenagem linfática facial, para um rosto com sensação de leveza e frescor.",
    },
    detail: true,
    media: "FACIAL_TREATMENT_IMAGE",
    bookOn: ["treatwell", "fresha"],
  },

  // ─── RELAXATION & RITUALS ─────────────────────────────────────
  {
    slug: "head-massage-hot-oil",
    category: "relaxation",
    name: { en: "Head Massage with Hot Oil", "pt-br": "Massagem na Cabeça com Óleo Quente" },
    platformNames: { fresha: "Head Massage (category: Head Massage + Hot Oil)" },
    variants: [{ minutes: 30, price: { amount: 45 } }],
    status: "confirmed",
    summary: {
      en: "A slow, warming massage for the scalp, neck and shoulders.",
      "pt-br": "Massagem lenta e aquecida para o couro cabeludo, pescoço e ombros.",
    },
    media: "HEAD_MASSAGE_IMAGE",
    bookOn: ["fresha"],
  },
  {
    slug: "foot-massage-scrub",
    category: "relaxation",
    name: { en: "Hot Oil Foot Massage & Scrub", "pt-br": "Massagem nos Pés com Óleo Quente & Esfoliação" },
    platformNames: { fresha: "Hot Oil foot Massage and Scrub", treatwell: "Feet Massage and Scrub" },
    variants: [{ minutes: 40, price: { amount: 45 } }],
    status: "conflict",
    note: "Duration differs: Fresha 40 min, Treatwell 45 min. Price £45 on both. Name differs slightly.",
    summary: {
      en: "Exfoliation followed by a hot oil massage for tired feet.",
      "pt-br": "Esfoliação seguida de massagem com óleo quente para pés cansados.",
    },
    media: "FOOT_RITUAL_IMAGE",
    bookOn: ["fresha", "treatwell"],
  },
  {
    slug: "reiki",
    category: "relaxation",
    name: { en: "Reiki", "pt-br": "Reiki" },
    platformNames: { fresha: "Reiki Special", treatwell: "Reiki healing" },
    variants: [{ minutes: 30, price: { amount: 35 } }],
    status: "conflict",
    note: "Same duration and price; name differs (Fresha 'Reiki Special' / Treatwell 'Reiki healing').",
    summary: {
      en: "A quiet, hands-on energy session of thirty minutes.",
      "pt-br": "Uma sessão silenciosa de terapia energética, com trinta minutos de duração.",
    },
    media: "REIKI_IMAGE",
    bookOn: ["fresha", "treatwell"],
  },
  {
    slug: "reiki-and-feet",
    category: "relaxation",
    name: { en: "Reiki & Foot Massage", "pt-br": "Reiki & Massagem nos Pés" },
    platformNames: { treatwell: "Reiki & Feet massage" },
    variants: [{ minutes: 50, price: { amount: 54, from: true } }],
    status: "partial",
    note: "Treatwell only (50 min, from £54, 'save up to 10%').",
    summary: {
      en: "Reiki combined with a foot massage, in one fifty-minute ritual.",
      "pt-br": "Reiki combinado com massagem nos pés, num ritual de cinquenta minutos.",
    },
    media: "REIKI_FEET_IMAGE",
    bookOn: ["treatwell"],
  },
  {
    slug: "classic-massages",
    category: "relaxation",
    name: { en: "Classic Massages", "pt-br": "Massagens Clássicas" },
    platformNames: { fresha: "Classic massages (category)", treatwell: "Classic Massages (4 services)" },
    variants: [{ minutes: null, price: { amount: 45, from: true } }],
    status: "partial",
    note: "TW: 4 services from £45; F: category only. Individual names not visible (reviews mention Relaxing and Deep Tissue Massage). TW also lists 'Balancing Massages' (3, from £35).",
    summary: {
      en: "Relaxing and deep tissue massage, tailored to how you feel on the day.",
      "pt-br": "Massagem relaxante e de tecido profundo, ajustada a como você se sente no dia.",
    },
    media: "CLASSIC_MASSAGE_IMAGE",
    bookOn: ["fresha", "treatwell"],
  },
];

export const getTreatment = (slug: string) => treatments.find((x) => x.slug === slug);
export const byCategory = (id: CategoryId) => treatments.filter((x) => x.category === id);
export const featured = () => treatments.filter((x) => x.featured);
export const detailSlugs = () => treatments.filter((x) => x.detail).map((x) => x.slug);
