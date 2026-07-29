import { createMDX } from "fumadocs-mdx/next";
import type { NextConfig } from "next";

const withMDX = createMDX();

const config: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    // Este projeto é a raiz. Sem isso o Turbopack sobe a árvore e escolhe
    // um lockfile de fora do repo como workspace root.
    root: import.meta.dirname,
  },
};

export default withMDX(config);
