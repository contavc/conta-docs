import { createMDX } from "fumadocs-mdx/next";
import type { NextConfig } from "next";

const withMDX = createMDX();

const config: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    // Keep previous links useful as the docs move to public-facing concepts.
    const previousPages: Record<string, string> = {
      arquitetura: "/seguranca",
      "arquitetura/custodia": "/seguranca",
      "arquitetura/dados": "/seguranca",
      rails: "https://www.conta.vc/como-funciona",
      "rails/onramp": "https://www.conta.vc/como-funciona",
      "rails/offramp": "https://www.conta.vc/como-funciona",
      "rails/p2p-links": "/pagamentos/transferencias",
      "rails/reconciliacao": "/seguranca",
      "seguranca/registros": "/seguranca",
      dolares: "https://www.conta.vc/receber-dolares",
      stack: "",
      autocustodia: "/seguranca",
      cbrl: "/dinheiro/cbrl",
      acesso: "https://www.conta.vc/ajuda",
      saldo: "/dinheiro/cbrl",
      "receber-cripto": "https://www.conta.vc/receber-dolares",
      conta: "",
      "conta-backend": "",
      "conta-contracts": "/dinheiro/cbrl",
      "conta-magic-router": "/pagamentos/magic-swap",
      sobre: "https://www.conta.vc/sobre",
      "sobre/bancos": "https://www.conta.vc/seguranca",
      "seguranca/passkeys": "https://www.conta.vc/ajuda",
      pagamentos: "https://www.conta.vc/como-funciona",
      "pagamentos/cripto": "https://www.conta.vc/receber-dolares",
      transparencia: "/dinheiro/lastro",
      "transparencia/registros": "/seguranca",
      "transparencia/verificar": "/dinheiro/lastro",
      "transparencia/custos": "https://www.conta.vc/precos",
    };

    return ["", "/en", "/pt"].flatMap((locale) =>
      Object.entries(previousPages).map(([page, destination]) => ({
        source: `${locale}/docs/${page}`,
        destination: destination.startsWith("https://")
          ? destination
          : `${locale === "/en" ? "/en" : ""}/docs${destination}`,
        permanent: true,
      })),
    );
  },
  turbopack: {
    // Este projeto é a raiz. Sem isso o Turbopack sobe a árvore e escolhe
    // um lockfile de fora do repo como workspace root.
    root: import.meta.dirname,
  },
};

export default withMDX(config);
