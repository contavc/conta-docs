import { redirect } from "next/navigation";

/** A raiz não tem landing própria — a landing é conta.vc. Vai direto pra doc. */
export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  redirect(lang === "en" ? "/en/docs" : "/docs");
}
