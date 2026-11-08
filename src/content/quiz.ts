import type { L10n } from "@/i18n/config";

/**
 * "FIND YOUR TREATMENT" QUIZ
 * Every answer points to slugs from the central catalogue (no services invented here).
 * Wording describes what the visitor is looking for, never promised results or medical claims.
 * To change a recommendation, edit the `result` slugs: [suggestion, alternative?].
 */
export type QuestionId = "goal" | "timeBody" | "area" | "timeShape" | "relaxFocus";
export interface Option { label: L10n; next?: QuestionId; result?: [string, string?] }
export interface Question { id: QuestionId; title: L10n; options: Option[] }

export const quiz: Record<QuestionId, Question> = {
  goal: {
    id: "goal",
    title: { en: "What would you like from your session?", "pt-br": "O que você procura na sua sessão?" },
    options: [
      { label: { en: "To feel lighter", "pt-br": "Sentir o corpo mais leve" }, next: "timeBody" },
      { label: { en: "To work on my body contours", "pt-br": "Trabalhar os contornos do corpo" }, next: "area" },
      { label: { en: "To relax and unwind", "pt-br": "Relaxar e desacelerar" }, next: "relaxFocus" },
      { label: { en: "Care for my face", "pt-br": "Cuidar do rosto" }, result: ["express-facial-glow", "head-massage-hot-oil"] },
      { label: { en: "I am pregnant", "pt-br": "Estou grávida" }, result: ["pregnancy-lymphatic-drainage"] },
      { label: { en: "I am recovering from surgery", "pt-br": "Estou me recuperando de uma cirurgia" }, result: ["post-surgical-lymphatic-drainage"] },
    ],
  },
  timeBody: {
    id: "timeBody",
    title: { en: "How much time do you have?", "pt-br": "Quanto tempo você tem?" },
    options: [
      { label: { en: "A short session", "pt-br": "Uma sessão curta" }, result: ["express-brazilian-treatment", "brazilian-lymphatic-drainage"] },
      { label: { en: "About an hour", "pt-br": "Cerca de uma hora" }, result: ["brazilian-lymphatic-drainage", "brazilian-sculpting-massage"] },
      { label: { en: "An hour and a half", "pt-br": "Uma hora e meia" }, result: ["brazilian-lymphatic-drainage", "brazilian-rio-shape"] },
      { label: { en: "Two hours, the full experience", "pt-br": "Duas horas, a experiência completa" }, result: ["brazilian-rio-shape", "brazilian-lymphatic-drainage"] },
    ],
  },
  area: {
    id: "area",
    title: { en: "Which area would you like to focus on?", "pt-br": "Em qual área você quer focar?" },
    options: [
      { label: { en: "The whole body", "pt-br": "O corpo inteiro" }, next: "timeShape" },
      { label: { en: "The abdomen", "pt-br": "O abdômen" }, result: ["abdominal-sculpting-massage", "brazilian-sculpting-massage"] },
    ],
  },
  timeShape: {
    id: "timeShape",
    title: { en: "How much time do you have?", "pt-br": "Quanto tempo você tem?" },
    options: [
      { label: { en: "A short session", "pt-br": "Uma sessão curta" }, result: ["express-brazilian-treatment", "abdominal-sculpting-massage"] },
      { label: { en: "One hour to an hour and a half", "pt-br": "De uma hora a uma hora e meia" }, result: ["brazilian-sculpting-massage", "brazilian-lymphatic-drainage"] },
      { label: { en: "Two hours, the full experience", "pt-br": "Duas horas, a experiência completa" }, result: ["brazilian-rio-shape", "brazilian-sculpting-massage"] },
    ],
  },
  relaxFocus: {
    id: "relaxFocus",
    title: { en: "Where would you like the focus?", "pt-br": "Onde você quer o foco?" },
    options: [
      { label: { en: "Head, neck and shoulders", "pt-br": "Cabeça, pescoço e ombros" }, result: ["head-massage-hot-oil", "reiki"] },
      { label: { en: "Tired feet", "pt-br": "Pés cansados" }, result: ["foot-massage-scrub", "reiki-and-feet"] },
      { label: { en: "The whole body", "pt-br": "O corpo inteiro" }, result: ["classic-massages", "brazilian-lymphatic-drainage"] },
      { label: { en: "Calm and energy, without deep pressure", "pt-br": "Calma e energia, sem pressão profunda" }, result: ["reiki", "reiki-and-feet"] },
    ],
  },
};
