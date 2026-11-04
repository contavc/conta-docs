import { defineDocs, defineConfig } from "fumadocs-mdx/config";
import { remarkMdxMermaid } from "fumadocs-core/mdx-plugins/remark-mdx-mermaid";
import type { MdxJsxFlowElement, MdxJsxTextElement } from "mdast-util-mdx";
import type { Nodes } from "mdast";

export const docs = defineDocs({
  dir: "content/docs",
});

type JsxElement = MdxJsxFlowElement | MdxJsxTextElement;

function isJsx(node: Nodes): node is JsxElement {
  return node.type === "mdxJsxFlowElement" || node.type === "mdxJsxTextElement";
}

/** Lê um atributo JSX de valor literal (string). */
function attr(node: JsxElement, name: string): string {
  const found = node.attributes.find(
    (a) => a.type === "mdxJsxAttribute" && a.name === name,
  );
  if (!found || found.type !== "mdxJsxAttribute") return "";
  return typeof found.value === "string" ? found.value : "";
}

export default defineConfig({
  mdxOptions: {
    // Converte blocos ```mermaid no componente <Mermaid /> (components/mermaid.tsx).
    remarkPlugins: (v) => [remarkMdxMermaid, ...v],

    /*
      Sem isto, o índice de busca guarda o JSX cru dos componentes — um
      resultado aparecia literalmente como `<Card title="..." description=...>`.
      Aqui Card e Callout são reduzidos ao texto que eles de fato mostram.
    */
    remarkStructureOptions: {
      stringify: {
        stringify(node, _parent, state, info) {
          if (!isJsx(node)) return undefined;

          if (node.name === "Card") {
            return [attr(node, "title"), attr(node, "description")]
              .filter(Boolean)
              .join(" — ");
          }

          // containerFlow só aceita elemento de bloco; Callout inline cai no default.
          if (node.name === "Callout" && node.type === "mdxJsxFlowElement") {
            const body = state.containerFlow(node, info);
            return [attr(node, "title"), body].filter(Boolean).join("\n");
          }

          return undefined;
        },
      },
    },
  },
});
