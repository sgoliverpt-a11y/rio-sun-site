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
    src: "/media/mother-daughter.webp",
    alt: { en: "Isabella and Marcia Braga, daughter and mother, back to back in their burgundy uniforms", "pt-br": "Isabella e Marcia Braga, filha e mãe, de costas uma para a outra com o uniforme bordô" },
    brief: "Supplied 2026-11-08 (vertical original; cropped by focus).",
  },
  MARCIA_PORTRAIT: {
    kind: "image", ratio: 4 / 5,
    src: "/media/marcia-portrait.webp",
    alt: { en: "Marcia Braga, smiling, in the Rio Sun treatment room", "pt-br": "Marcia Braga, sorrindo, na sala de atendimento da Rio Sun" },
    brief: "Single portrait (supplied 2026-11-08, 1024×1536).",
  },
  ISABELLA_PORTRAIT: {
    kind: "image", ratio: 4 / 5,
    src: "/media/isabella-portrait.webp",
    alt: { en: "Isabella Braga, smiling, in the Rio Sun treatment room", "pt-br": "Isabella Braga, sorrindo, na sala de atendimento da Rio Sun" },
    brief: "Single portrait (supplied 2026-11-08, 1024×1536).",
  },
  LYMPHATIC_IMAGE: {
    kind: "image", ratio: 4 / 5,
    src: "/media/treatment-lymphatic.webp",
    alt: { en: "Hands performing a gentle lymphatic drainage on the abdomen", "pt-br": "Mãos fazendo uma drenagem linfática suave no abdômen" },
    brief: "Supplied 2026-11-08 (1120×1405). A 6–8 s video can replace it later.",
  },
  BODY_SCULPTING_IMAGE: {
    kind: "image", ratio: 4 / 5, src: "/media/treatment-body-sculpting.webp",
    alt: { en: "Brazilian sculpting massage", "pt-br": "Massagem modeladora brasileira" },
    brief: "Illustrative image generated with WaveSpeed (2026-11-08) in the style of the supplied lymphatic photo; replace with a real photo when available.",
  },
  RIO_SHAPE_IMAGE: {
    kind: "image", ratio: 4 / 5, src: "/media/treatment-rio-shape.webp",
    alt: { en: "Brazilian RIO Shape massage", "pt-br": "Massagem RIO Shape brasileira" },
    brief: "Illustrative image generated with WaveSpeed (2026-11-08) in the style of the supplied lymphatic photo; replace with a real photo when available.",
  },
  ABDOMINAL_IMAGE: { kind: "image", ratio: 4 / 5, src: "/media/treatment-abdominal-sculpting.webp", alt: { en: "Abdominal sculpting massage", "pt-br": "Massagem modeladora abdominal" }, brief: "Illustrative image generated with WaveSpeed (2026-11-08) in the style of the supplied lymphatic photo; replace with a real photo when available." },
  EXPRESS_IMAGE: { kind: "image", ratio: 4 / 5, src: "/media/treatment-express.webp", alt: { en: "Express Brazilian treatment", "pt-br": "Tratamento brasileiro express" }, brief: "Illustrative image generated with WaveSpeed (2026-11-08) in the style of the supplied lymphatic photo; replace with a real photo when available." },
  PREGNANCY_IMAGE: { kind: "image", ratio: 4 / 5, src: "/media/treatment-pregnancy.webp", alt: { en: "Pregnancy lymphatic drainage", "pt-br": "Drenagem linfática na gestação" }, brief: "Illustrative image generated with WaveSpeed (2026-11-08) in the style of the supplied lymphatic photo; replace with a real photo when available." },
  POST_SURGICAL_IMAGE: { kind: "image", ratio: 4 / 5, src: "/media/treatment-post-surgical.webp", alt: { en: "Post-surgical lymphatic drainage", "pt-br": "Drenagem linfática pós-operatória" }, brief: "Illustrative image generated with WaveSpeed (2026-11-08) in the style of the supplied lymphatic photo; replace with a real photo when available." },
  FACIAL_TREATMENT_IMAGE: { kind: "image", ratio: 4 / 5, src: "/media/treatment-facial.webp", alt: { en: "Facial lymphatic drainage", "pt-br": "Drenagem linfática facial" }, brief: "Illustrative image generated with WaveSpeed (2026-11-08) in the style of the supplied lymphatic photo; replace with a real photo when available." },
  HEAD_MASSAGE_IMAGE: { kind: "image", ratio: 4 / 5, src: "/media/treatment-head-massage.webp", alt: { en: "Head massage with hot oil", "pt-br": "Massagem na cabeça com óleo quente" }, brief: "Illustrative image generated with WaveSpeed (2026-11-08) in the style of the supplied lymphatic photo; replace with a real photo when available." },
  FOOT_RITUAL_IMAGE: { kind: "image", ratio: 4 / 5, src: "/media/treatment-foot-ritual.webp", alt: { en: "Foot massage and scrub", "pt-br": "Massagem e esfoliação nos pés" }, brief: "Illustrative image generated with WaveSpeed (2026-11-08) in the style of the supplied lymphatic photo; replace with a real photo when available." },
  REIKI_IMAGE: { kind: "image", ratio: 4 / 5, src: "/media/treatment-reiki.webp", alt: { en: "Reiki session", "pt-br": "Sessão de Reiki" }, brief: "Illustrative image generated with WaveSpeed (2026-11-08) in the style of the supplied lymphatic photo; replace with a real photo when available." },
  REIKI_FEET_IMAGE: { kind: "image", ratio: 4 / 5, src: "/media/treatment-reiki-feet.webp", alt: { en: "Reiki and foot massage", "pt-br": "Reiki e massagem nos pés" }, brief: "Illustrative image generated with WaveSpeed (2026-11-08) in the style of the supplied lymphatic photo; replace with a real photo when available." },
  CLASSIC_MASSAGE_IMAGE: { kind: "image", ratio: 4 / 5, src: "/media/treatment-classic-massage.webp", alt: { en: "Classic massage", "pt-br": "Massagem clássica" }, brief: "Illustrative image generated with WaveSpeed (2026-11-08) in the style of the supplied lymphatic photo; replace with a real photo when available." },
  EXPERIENCE_ROOM_IMAGE: {
    kind: "image", ratio: 16 / 10, ratioMobile: 4 / 5,
    src: "/media/treatment-room.webp",
    alt: { en: "The Rio Sun treatment room inside Cullinan Clinic", "pt-br": "A sala da Rio Sun dentro da Cullinan Clinic" },
    brief: "Supplied 2026-11-08: treatment bed with the Rio Sun Therapy pillow.",
  },
  EXPERIENCE_TEA_IMAGE: {
    kind: "image", ratio: 1,
    src: "/media/experience-tea.webp",
    alt: { en: "Candles, a crystal and a pot of tea set out in the Rio Sun room", "pt-br": "Velas, um cristal e um bule de chá preparados na sala da Rio Sun" },
    brief: "Supplied 2026-11-08: sideboard with candles, mirror and tea set.",
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
    src: "/media/clinic-exterior.webp",
    alt: { en: "The entrance of Cullinan Clinic at 659 Fulham Road, where Rio Sun has its room", "pt-br": "A entrada da Cullinan Clinic, no 659 da Fulham Road, onde fica a sala da Rio Sun" },
    brief: "Supplied 2026-11-08: street-level entrance (vertical original; cropped by focus).",
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
