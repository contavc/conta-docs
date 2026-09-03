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
    default: "Conta — documentação técnica",
    template: "%s · Conta docs",
  },
  description:
    "Como a Conta funciona por dentro: autocustódia, rails PIX em BRLA na Base, e as escolhas de tecnologia por trás delas.",
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
      <head>
        <link rel="describedby" href="/llms.txt" type="text/markdown" />
      </head>
      <body className="flex min-h-screen flex-col">
        <RootProvider i18n={i18n.provider(lang)}>{children}</RootProvider>
      </body>
    </html>
  );
}
