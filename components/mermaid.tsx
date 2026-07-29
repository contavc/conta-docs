"use client";

import { useEffect, useId, useState } from "react";
import { useTheme } from "fumadocs-ui/provider/base";

/*
  Renderiza diagramas Mermaid nas cores da marca. O tema é resolvido em runtime
  porque o Mermaid precisa das cores no momento do render, e o usuário pode
  trocar claro/escuro sem recarregar a página.
*/
export function Mermaid({ chart }: { chart: string }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const { resolvedTheme } = useTheme();
  const [svg, setSvg] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function render() {
      const { default: mermaid } = await import("mermaid");
      const dark = resolvedTheme === "dark";

      mermaid.initialize({
        startOnLoad: false,
        securityLevel: "strict",
        fontFamily: "var(--font-hanken), ui-sans-serif, system-ui, sans-serif",
        theme: "base",
        themeVariables: dark
          ? {
              background: "#101b1f",
              primaryColor: "#1c2f35",
              primaryTextColor: "#e9e5db",
              primaryBorderColor: "#7fb8c6",
              lineColor: "#7fb8c6",
              secondaryColor: "#16242a",
              tertiaryColor: "#16242a",
              mainBkg: "#1c2f35",
              nodeBorder: "#7fb8c6",
              clusterBkg: "#16242a",
              clusterBorder: "rgba(217,211,196,0.14)",
              textColor: "#e9e5db",
            }
          : {
              background: "#f4f1ea",
              primaryColor: "#ede9df",
              primaryTextColor: "#15252b",
              primaryBorderColor: "#2c6e7d",
              lineColor: "#2c6e7d",
              secondaryColor: "#e4dfd2",
              tertiaryColor: "#e4dfd2",
              mainBkg: "#ede9df",
              nodeBorder: "#2c6e7d",
              clusterBkg: "#e4dfd2",
              clusterBorder: "#d9d3c4",
              textColor: "#15252b",
            },
      });

      try {
        const { svg } = await mermaid.render(`mermaid-${id}`, chart.trim());
        if (!cancelled) setSvg(svg);
      } catch {
        // Diagrama inválido não derruba a página — só não renderiza.
        if (!cancelled) setSvg(null);
      }
    }

    void render();
    return () => {
      cancelled = true;
    };
  }, [chart, id, resolvedTheme]);

  if (!svg) {
    return (
      <div
        className="my-6 h-40 animate-pulse rounded-lg border border-fd-border bg-fd-card"
        aria-hidden
      />
    );
  }

  return (
    <div
      className="my-6 overflow-x-auto rounded-lg border border-fd-border bg-fd-card p-4 [&_svg]:mx-auto [&_svg]:h-auto [&_svg]:max-w-full"
      // O SVG vem do Mermaid em securityLevel "strict" (sanitizado, sem script).
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
