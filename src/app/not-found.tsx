import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";

// O Next.js já emite noindex na página 404.
export const metadata: Metadata = {
  title: "Página não encontrada",
};

export default function NotFound() {
  return (
    <section aria-labelledby="nao-encontrada-title" className="bg-ink py-28 sm:py-40">
      <Container>
        <p className="display text-[5rem] leading-none text-gold">404</p>
        <h1 id="nao-encontrada-title" className="display mt-6 text-h2">
          Esta página não existe
        </h1>
        <p className="mt-4 max-w-[30rem] text-lead text-fg-muted">O endereço pode ter mudado. Volte ao início do site.</p>
        <ButtonLink href="/" className="mt-9">
          Voltar ao início
        </ButtonLink>
      </Container>
    </section>
  );
}
