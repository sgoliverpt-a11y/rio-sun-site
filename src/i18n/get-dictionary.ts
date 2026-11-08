import type { Locale } from "./config";
import en from "./dictionaries/en";
import ptBR from "./dictionaries/pt-br";

const dictionaries = { en, "pt-br": ptBR } as const;

export const getDictionary = (locale: Locale) => dictionaries[locale] ?? en;
export type { Dictionary } from "./dictionaries/en";
