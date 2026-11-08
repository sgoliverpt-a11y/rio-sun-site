import type { L10n } from "@/i18n/config";
import type { Platform } from "./site";

/**
 * TEAM — only facts stated on the official Treatwell profile (captured 2026-11-08).
 * Who is the mother and who is the daughter is NOT stated on any platform:
 * the site says "mother and daughter" for the pair without assigning roles until confirmed.
 */
export const team = [
  {
    id: "marcia",
    name: "Marcia",
    portrait: "MARCIA_PORTRAIT" as const,
    facts: {
      en: ["Originally from Brazil", "Over 12 years' experience", "Specialised in lymphatic drainage massage"],
      "pt-br": ["Natural do Brasil", "Mais de 12 anos de experiência", "Especializada em drenagem linfática"],
    },
    source: "treatwell" as Platform,
  },
  {
    id: "isabella",
    name: "Isabella",
    portrait: "ISABELLA_PORTRAIT" as const,
    facts: {
      en: ["Around 6 years' experience in Brazil and London", "Combines therapeutic and relaxation techniques"],
      "pt-br": ["Cerca de 6 anos de experiência no Brasil e em Londres", "Combina técnicas terapêuticas e de relaxamento"],
    },
    source: "treatwell" as Platform,
  },
];

/**
 * REVIEWS — verbatim, as published on each platform (captured 2026-11-08).
 * Only reviews whose full text was captured are included. Names as displayed by the platform.
 * Reviews stay in their original language; the PT-BR site labels them as such.
 */
export interface Review {
  author: string;
  platform: Platform;
  treatment: string;
  text: string;
  stars?: 5; // Fresha shows stars per review; Treatwell per-review stars not captured
}

export const reviews: Review[] = [
  { author: "Emily", platform: "treatwell", treatment: "Relaxing Massage", text: "An AMAZING massage - best I’ve had in London. Calm, relaxing, everything you could want. I’ll definitely be back!" },
  { author: "Georgie", platform: "treatwell", treatment: "Lymphatic Drainage", text: "The best as always Marcia is wonderful and it’s such a calming space" },
  { author: "Victoria C.", platform: "fresha", treatment: "2 services", text: "Amazing massage, very relaxing and effective. Both ladies are very talented!", stars: 5 },
  { author: "Sydney-Louise", platform: "treatwell", treatment: "Lymphatic Drainage", text: "Fabulous massage- one of the best lymphatic drainage massages I have had in London! Will definitely be back!" },
  { author: "Renata", platform: "treatwell", treatment: "Lymphatic Drainage", text: "I had an amazing massage yet again. Had stiff shoulders and the lovely Marcia sorted them out. Feel totally rejuvenated." },
  { author: "Emily S.", platform: "fresha", treatment: "Brazilian Lymphatic Drainage Full Body", text: "10/10 experience and advice, I felt very comfortable and the service was excellent!", stars: 5 },
  { author: "Christina", platform: "treatwell", treatment: "Lymphatic Drainage", text: "Isabella is fantastic. She is very polite and professional. I will keep coming back!" },
  { author: "Emmy", platform: "treatwell", treatment: "Deep Tissue Massage", text: "Feeling so much better and much more rested." },
  { author: "Hanna A.", platform: "fresha", treatment: "Brazilian Lymphatic Drainage Full Body", text: "Amazing massage and super friendly staff!!", stars: 5 },
  { author: "Tracy M.", platform: "fresha", treatment: "Brazilian Lymphatic Drainage Full Body", text: "Left feeling recharged", stars: 5 },
];

export const platformLabel: Record<Platform, string> = { fresha: "Fresha", treatwell: "Treatwell" };

/** FAQ — draft answers, factual and cautious. To be reviewed by Rio Sun. */
export const faqs: { q: L10n; a: L10n; tags: string[] }[] = [
  {
    tags: ["lymphatic", "general"],
    q: { en: "What is Brazilian lymphatic drainage?", "pt-br": "O que é a drenagem linfática brasileira?" },
    a: {
      en: "A manual massage technique using light, rhythmic and precise movements that follow the direction of the lymphatic system. The Brazilian method is known for its pace and its attention to the body's contours.",
      "pt-br": "Uma técnica de massagem manual com movimentos leves, rítmicos e precisos, que acompanham o sentido do sistema linfático. O método brasileiro é conhecido pelo ritmo e pela atenção aos contornos do corpo.",
    },
  },
  {
    tags: ["lymphatic", "general"],
    q: { en: "Does lymphatic drainage hurt?", "pt-br": "A drenagem linfática dói?" },
    a: {
      en: "It should not. The pressure is adjusted to you throughout the session, and you can ask for it to be lighter or firmer at any moment.",
      "pt-br": "Não deveria. A pressão é ajustada a você durante toda a sessão, e você pode pedir mais leveza ou firmeza a qualquer momento.",
    },
  },
  {
    tags: ["general"],
    q: { en: "How should I prepare for my session?", "pt-br": "Como devo me preparar para a sessão?" },
    a: {
      en: "Arrive a few minutes early, stay hydrated and let us know about any medical condition, pregnancy or recent surgery when you book.",
      "pt-br": "Chegue alguns minutos antes, mantenha-se hidratada e informe qualquer condição médica, gestação ou cirurgia recente no momento do agendamento.",
    },
  },
  {
    tags: ["specialist"],
    q: { en: "Can I book during pregnancy or after surgery?", "pt-br": "Posso agendar durante a gestação ou após uma cirurgia?" },
    a: {
      en: "We offer dedicated pregnancy and post-surgical sessions. Please speak to your doctor or surgeon first and mention it when booking, so we can prepare the right protocol.",
      "pt-br": "Oferecemos sessões específicas para gestação e pós-operatório. Converse antes com seu médico ou cirurgião e informe no agendamento, para prepararmos o protocolo adequado.",
    },
  },
  {
    tags: ["general"],
    q: { en: "Where exactly are you?", "pt-br": "Onde exatamente vocês ficam?" },
    a: {
      en: "Our treatment room is inside Cullinan Clinic, 659 Fulham Road, London SW6 5PY, a short walk from Fulham Broadway station.",
      "pt-br": "Nossa sala fica dentro da Cullinan Clinic, 659 Fulham Road, London SW6 5PY, a poucos minutos a pé da estação Fulham Broadway.",
    },
  },
  {
    tags: ["general"],
    q: { en: "Do you speak Portuguese?", "pt-br": "Vocês falam português?" },
    a: { en: "Yes. Sessions can be in English or Brazilian Portuguese.", "pt-br": "Sim. Os atendimentos podem ser em inglês ou em português." },
  },
];
