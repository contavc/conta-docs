# conta-docs

Documentação pública da [Conta](https://conta.vc) — publicada em
`docs.conta.vc`.

O conteúdo apresenta a Conta ao público externo, incluindo possíveis usuários
e investidores. Explica autocustódia, o lastro do cBRL, segurança e a conexão
com PIX e cripto em linguagem simples. Os repositórios `contavc/conta`,
`contavc/conta-backend`, `contavc/conta-contracts` e `contavc/conta-magic-router`
são fontes para conferir o comportamento do produto. A documentação é
organizada como uma leitura guiada: carteira e autocustódia, saldo e cBRL,
BRLA/BRS, Reserva (vaults), Magic Swap e transferências.
A mensagem central é mais propriedade e controle sobre o dinheiro
do dia a dia. Não inclui modelo de negócio, captação ou planos da empresa.

Os quatro capítulos numerados seguem o caminho do dinheiro, com transições entre
as páginas, exemplos e fontes. Apresentação do produto, comparação com bancos, preços, instruções de
acesso e guias de PIX/dólares ficam em conta.vc; use links para essas páginas,
sem duplicar o conteúdo nos docs.
Métricas de usuários e volume ficam fora até a definição de quais publicar.

O cBRL permite reduzir a dependência de um único provedor, mantendo a mesma
experiência de saldo ao integrar alternativas compatíveis. Ele representa
stablecoins de real, como BRLA e BRS; não deve ser apresentado
como uma stablecoin regulada pelo governo. A comparação de segurança deve
explicar as diferenças de controle e transparência, considerando também as
regras dos tokens e a dependência dos emissores. As fontes e os limites das
afirmações estão em [docs/content-sources.md](docs/content-sources.md).

Site estático de docs construído com **Fumadocs** sobre **Next.js 16**. É um
repositório independente do app: nada aqui depende do código privado da Conta,
e nada aqui contém segredo, credencial ou detalhe operacional interno.

## Stack

- **Next.js 16** (App Router, Turbopack) + **React 19**
- **Fumadocs** (`fumadocs-ui`, `fumadocs-core`, `fumadocs-mdx`)
- **Tailwind 4** com o sistema de marca da Conta (petrol / cream / ink)
- **Mermaid** para os diagramas de fluxo
- Busca local via Orama (`/api/search`)
- **pnpm**; deploy na Vercel

## Rodando local

```bash
pnpm install
pnpm dev
```

Abra `http://localhost:3000` — a raiz redireciona para `/docs`.

| comando          | descrição                          |
| ---------------- | ---------------------------------- |
| `pnpm dev`       | servidor de desenvolvimento        |
| `pnpm build`     | build de produção                  |
| `pnpm start`     | serve o build                      |
| `pnpm typecheck` | `tsc --noEmit`                     |

## Idiomas

O site é bilíngue: **português é o padrão** e vive sem prefixo (`/docs/...`);
inglês vive em `/en/docs/...`. O locale é resolvido em `proxy.ts` — no Next 16
o antigo `middleware.ts` chama-se `proxy.ts`.

Cada página tem dois arquivos:

```
content/docs/dinheiro/cbrl.mdx      → português (padrão)
content/docs/dinheiro/cbrl.en.mdx   → inglês
```

O mesmo vale para a navegação: `meta.json` e `meta.en.json`.

<!-- prettier-ignore -->
> Ao adicionar uma página, escreva as duas versões. Uma página sem tradução
> some da navegação naquele idioma.

## Estrutura

```
app/
  [lang]/
    layout.tsx              # root layout (html/body, fontes, RootProvider)
    page.tsx                # redireciona / → /docs
    docs/
      layout.tsx            # shell do Fumadocs (sidebar, nav, busca)
      [[...slug]]/page.tsx  # renderiza uma página MDX
  api/search/route.ts       # índice de busca
  global.css                # marca da Conta mapeada nos tokens --color-fd-*
components/mermaid.tsx      # diagramas, nas cores da marca
content/docs/               # todo o conteúdo (.mdx e .en.mdx)
lib/
  i18n.ts                   # locales e política de prefixo
  source.ts                 # loader do conteúdo
  layout.shared.tsx         # nav e links compartilhados
proxy.ts                    # resolução de locale (Next 16)
source.config.ts            # config do fumadocs-mdx (+ plugin do Mermaid)
```

## Escrevendo conteúdo

Frontmatter mínimo:

```mdx
---
title: Título da página
description: Uma frase que aparece na busca e nos cards.
---
```

Componentes disponíveis no MDX: `Callout`, `Cards`/`Card`, `Steps`/`Step`,
`Tabs`/`Tab`, `Accordions`/`Accordion` e blocos ` ```mermaid `.

## Deploy

Projeto Vercel próprio, apontando para este repositório, com o domínio
`docs.conta.vc`. Não há variável de ambiente obrigatória — o site é totalmente
estático mais a rota de busca.
