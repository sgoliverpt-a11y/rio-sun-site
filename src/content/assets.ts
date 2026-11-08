import type { L10n } from "@/i18n/config";

/**
 * ASSET MANIFEST
 * ---------------------------------------------------------------
 * Every photo / video slot on the site is declared here once.
 * To replace a placeholder: drop the file into /public/media/ and fill `src`
 * (and `srcMobile` / `poster` where relevant). No page needs to be rebuilt.
 *
 * `ratio`       desktop aspect ratio (w/h) the layout is designed around
 * `ratioMobile` vertical composition used on phones (art direction, not a crop)
 * `brief`       art-direction note for the photo/video production
 */

export type AssetKind = "image" | "video";

export interface Asset {
  kind: AssetKind;
  ratio: number;
  ratioMobile?: number;
  src?: string;
  srcMobile?: string;
  poster?: string;
  alt: L10n;
  brief: string;
}

const a = <T extends Record<string, Asset>>(m: T): { [K in keyof T]: Asset } => m;

export const assets = a({
  HERO_VIDEO_DESKTOP: {
    kind: "video", ratio: 9 / 16,
    src: "/media/hero-desktop.mp4", poster: "/media/hero-poster.webp",
    alt: { en: "Rio Sun's therapists preparing the treatment room and performing a lymphatic massage", "pt-br": "As terapeutas da Rio Sun preparando a sala e realizando uma massagem linfática" },
    brief: "DELIVERED 2026-11-08: 8 s film (plays once, rests on the room) cut from Rio Sun's own Instagram film (360×640 source, upscaled to 540×960), subtle warm grade, no audio. Replace with the uncaptioned original for full sharpness.",
  },
  HERO_VIDEO_MOBILE: {
    kind: "video", ratio: 9 / 16,
    src: "/media/hero-mobile.mp4", poster: "/media/hero-poster-mobile.webp",
    alt: { en: "Rio Sun's therapists preparing the treatment room and performing a lymphatic massage", "pt-br": "As terapeutas da Rio Sun preparando a sala e realizando uma massagem linfática" },
    brief: "DELIVERED 2026-11-08: same film at 360×640 (~255 KB).",
  },
  HERO_POSTER: {
    kind: "image", ratio: 16 / 9, ratioMobile: 9 / 16,
    alt: { en: "Treatment room detail", "pt-br": "Detalhe da sala de tratamento" },
    brief: "First frame of the hero video, used as poster and LCP image. AVIF/WebP, ≤ 180 KB.",
  },
  PHILOSOPHY_HANDS_IMAGE: {
    kind: "image", ratio: 4 / 5,
    alt: { en: "Hands at work during a massage", "pt-br": "Mãos em movimento durante a massagem" },
    brief: "Close-up, hands on skin, natural light. Editorial, warm, no logos.",
  },
  MOTHER_DAUGHTER_PORTRAIT: {
    kind: "image", ratio: 3 / 2, ratioMobile: 4 / 5,
    alt: { en: "Marcia and Isabella, the mother-and-daughter team behind Rio Sun", "pt-br": "Marcia e Isabella, mãe e filha à frente da Rio Sun" },
    brief: "Editorial double portrait. Burgundy / ivory wardrobe. Horizontal for desktop + vertical crop for mobile.",
  },
  MARCIA_PORTRAIT: {
    kind: "image", ratio: 4 / 5,
    alt: { en: "Portrait of Marcia", "pt-br": "Retrato de Marcia" },
    brief: "Single portrait, same session as the double portrait.",
  },
  ISABELLA_PORTRAIT: {
    kind: "image", ratio: 4 / 5,
    alt: { en: "Portrait of Isabella", "pt-br": "Retrato de Isabella" },
    brief: "Single portrait, same session as the double portrait.",
  },
  LYMPHATIC_TREATMENT_VIDEO: {
    kind: "video", ratio: 4 / 5,
    alt: { en: "Brazilian lymphatic drainage in progress", "pt-br": "Drenagem linfática brasileira em andamento" },
    brief: "6–8 s loop for the treatment card, 1080×1350, ≤ 1.5 MB, + poster.",
  },
  BODY_SCULPTING_IMAGE: {
    kind: "image", ratio: 4 / 5,
    alt: { en: "Brazilian sculpting massage", "pt-br": "Massagem modeladora brasileira" },
    brief: "Treatment detail, firm hands, warm light.",
  },
  RIO_SHAPE_IMAGE: {
    kind: "image", ratio: 4 / 5,
    alt: { en: "Brazilian RIO Shape massage", "pt-br": "Massagem RIO Shape brasileira" },
    brief: "Signature treatment image.",
  },
  ABDOMINAL_IMAGE: { kind: "image", ratio: 4 / 5, alt: { en: "Abdominal sculpting massage", "pt-br": "Massagem modeladora abdominal" }, brief: "Discreet, editorial framing." },
  EXPRESS_IMAGE: { kind: "image", ratio: 4 / 5, alt: { en: "Express Brazilian treatment", "pt-br": "Tratamento brasileiro express" }, brief: "Treatment detail." },
  PREGNANCY_IMAGE: { kind: "image", ratio: 4 / 5, alt: { en: "Pregnancy lymphatic drainage", "pt-br": "Drenagem linfática na gestação" }, brief: "Gentle, side-lying position, soft light. Model release required." },
  POST_SURGICAL_IMAGE: { kind: "image", ratio: 4 / 5, alt: { en: "Post-surgical lymphatic drainage", "pt-br": "Drenagem linfática pós-operatória" }, brief: "Clinical calm, no scars shown." },
  FACIAL_TREATMENT_IMAGE: { kind: "image", ratio: 4 / 5, alt: { en: "Facial lymphatic drainage", "pt-br": "Drenagem linfática facial" }, brief: "Overhead, hands framing the face." },
  HEAD_MASSAGE_IMAGE: { kind: "image", ratio: 4 / 5, alt: { en: "Head massage with hot oil", "pt-br": "Massagem na cabeça com óleo quente" }, brief: "Oil detail, hair, warm tones." },
  FOOT_RITUAL_IMAGE: { kind: "image", ratio: 4 / 5, alt: { en: "Foot massage and scrub", "pt-br": "Massagem e esfoliação nos pés" }, brief: "Bowl, scrub texture, towels." },
  REIKI_IMAGE: { kind: "image", ratio: 4 / 5, alt: { en: "Reiki session", "pt-br": "Sessão de Reiki" }, brief: "Hands hovering, stillness." },
  CLASSIC_MASSAGE_IMAGE: { kind: "image", ratio: 4 / 5, alt: { en: "Classic massage", "pt-br": "Massagem clássica" }, brief: "Back massage, wide editorial frame." },
  EXPERIENCE_ROOM_IMAGE: {
    kind: "image", ratio: 16 / 10, ratioMobile: 4 / 5,
    alt: { en: "The Rio Sun treatment room inside Cullinan Clinic", "pt-br": "A sala da Rio Sun dentro da Cullinan Clinic" },
    brief: "Wide shot of the room as prepared for a client: bed, Rio Sun pillows, towels, light.",
  },
  EXPERIENCE_TEA_IMAGE: {
    kind: "image", ratio: 1,
    alt: { en: "Tea served after the treatment", "pt-br": "Chá servido após o tratamento" },
    brief: "Detail of the hospitality ritual (only if it is part of the real experience).",
  },
  EXPERIENCE_TOWELS_IMAGE: {
    kind: "image", ratio: 4 / 5,
    alt: { en: "Prepared towels and oils", "pt-br": "Toalhas e óleos preparados" },
    brief: "Still life: folded towels, oils, warm light.",
  },
  EXPERTISE_VIDEO_01: {
    kind: "video", ratio: 9 / 16,
    alt: { en: "Educational video: what lymphatic drainage is", "pt-br": "Vídeo educativo: o que é drenagem linfática" },
    brief: "Reel from Instagram, re-exported 1080×1920 with burnt-in or VTT captions EN + PT. Click-to-play.",
  },
  EXPERTISE_VIDEO_02: {
    kind: "video", ratio: 9 / 16,
    alt: { en: "Educational video: myths about lymphatic drainage", "pt-br": "Vídeo educativo: mitos sobre drenagem linfática" },
    brief: "Reel from Instagram, captions EN + PT.",
  },
  EXPERTISE_VIDEO_03: {
    kind: "video", ratio: 9 / 16,
    alt: { en: "Educational video: preparing for your session", "pt-br": "Vídeo educativo: como se preparar para a sessão" },
    brief: "Reel from Instagram, captions EN + PT.",
  },
  STORY_BRAZIL_IMAGE: {
    kind: "image", ratio: 3 / 4,
    alt: { en: "Archive photograph from Brazil", "pt-br": "Fotografia de arquivo do Brasil" },
    brief: "Personal archive photo supplied by the family, if they wish to share one.",
  },
  CONTACT_EXTERIOR_IMAGE: {
    kind: "image", ratio: 3 / 2,
    alt: { en: "Cullinan Clinic entrance, 659 Fulham Road", "pt-br": "Entrada da Cullinan Clinic, 659 Fulham Road" },
    brief: "Street-level photo of the entrance so clients recognise it on arrival.",
  },
});

export type AssetId = keyof typeof assets;

/**
 * Brand assets status.
 * The official logo is used from the approved raster (gold extracted from the
 * supplied emblem, nothing redrawn). Separate vector bands for the motion system
 * require the original vector file from the identity designer.
 */
export const brand = {
  logo: "/brand/rio-sun-logo-gold.webp",
  symbol: "/brand/rio-sun-symbol-gold.webp",
  wordmark: "/brand/rio-sun-wordmark-gold.webp", // crop of the original lockup (1480×190)
  logoRatio: 1480 / 530,
  symbolRatio: 1010 / 330,
  bandsVector: null as string | null, // BRAND_BANDS_SVG — pending original AI/SVG/PDF
};
