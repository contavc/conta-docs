import "@/app/global.css";
import { RootProvider } from "fumadocs-ui/provider/next";
import { Hanken_Grotesk, Newsreader } from "next/font/google";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { i18n } from "@/lib/i18n";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://docs.conta.vc"),
  title: {
    default: "Conta — documentação",
    template: "%s · Conta docs",
  },
  description:
    "Entenda a Conta: autocustódia, o lastro do cBRL em stablecoins de real, segurança e transparência para o seu dinheiro.",
};

export default async function RootLayout({
  params,
  children,
}: {
  params: Promise<{ lang: string }>;
  children: ReactNode;
}) {
  const { lang } = await params;

  return (
    <html
      lang={lang}
      className={`${hanken.variable} ${newsreader.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col">
        <RootProvider i18n={i18n.provider(lang)}>{children}</RootProvider>
      </body>
    </html>
  );
}
