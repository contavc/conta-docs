import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

/** Opções compartilhadas pelo shell de docs (nav, links, GitHub). */
export function baseOptions(lang: string): BaseLayoutProps {
  const pt = lang !== "en";

  return {
    nav: {
      title: (
        <span className="font-[var(--font-display)] text-lg tracking-tight">
          Conta<span className="text-fd-primary"> docs</span>
        </span>
      ),
    },
    links: [
      {
        text: pt ? "Abrir o app" : "Open the app",
        url: "https://app.conta.vc",
        external: true,
      },
    ],
  };
}
