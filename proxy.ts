import { createI18nMiddleware } from "fumadocs-core/i18n/middleware";
import { i18n } from "@/lib/i18n";

/*
  Next 16 renomeou `middleware.ts` para `proxy.ts` (mesma funcionalidade).
  Aqui ele só resolve o locale da URL: /docs/... → pt, /en/docs/... → en.
*/
export default createI18nMiddleware(i18n);

export const config = {
  // Não intercepta assets, rotas de API nem arquivos estáticos.
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)"],
};
