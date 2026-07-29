import { defineI18nUI } from "fumadocs-ui/i18n";

/*
  pt-BR é o idioma padrão (o produto e a UI do app são em português).
  hideLocale: "default-locale" → português vive em /docs/... sem prefixo,
  inglês em /en/docs/.... O rewrite é feito pelo proxy.ts na raiz.
*/
export const i18n = defineI18nUI(
  {
    languages: ["pt", "en"],
    defaultLanguage: "pt",
    hideLocale: "default-locale",
  },
  {
    pt: { displayName: "Português" },
    en: { displayName: "English" },
  },
);
