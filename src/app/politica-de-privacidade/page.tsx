import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";
import { baseOpenGraph } from "@/lib/seo";
import { buildPrivacyStructuredData, jsonLd } from "@/lib/structured-data";
import { createWhatsAppLink } from "@/lib/whatsapp";
import { Container } from "@/components/ui/Container";

const description = `Como o site da ${site.name} trata informações de visitantes, contatos pelo WhatsApp e medição de audiência.`;

export const metadata: Metadata = {
  title: "Política de privacidade",
  description,
  alternates: { canonical: "/politica-de-privacidade" },
  openGraph: {
    ...baseOpenGraph,
    title: `Política de privacidade | ${site.name}`,
    description,
    url: "/politica-de-privacidade",
  },
};

const UPDATED_AT = "21 de novembro de 2026";

/** PENDENTE: revisão jurídica do texto antes da publicação. */
export default function PrivacyPage() {
  const link = "font-semibold text-gold underline decoration-gold/40 underline-offset-4 hover:decoration-gold";
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(buildPrivacyStructuredData()) }}
      />
      <article className="py-16 sm:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="text-sm text-fg-muted">Última atualização: {UPDATED_AT}</p>
            <h1 className="display mt-3 text-h2 text-fg">Política de privacidade</h1>
            <p className="mt-6 text-lead text-fg-muted">
              Esta página explica como o site da {site.name} lida com as informações de quem o visita. Escrevemos de forma
              direta, em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).
            </p>

            <div className="mt-12 space-y-10 text-[1.02rem] leading-relaxed text-fg-muted [&_h2]:text-[1.3rem] [&_h2]:font-bold [&_h2]:leading-tight [&_h2]:text-fg [&_p]:mt-3 [&_li]:mt-2 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5">
              <section>
                <h2>Sem cadastro e sem formulário armazenado</h2>
                <p>
                  O site não tem login, cadastro nem formulário que guarde seus dados. O questionário “Não sabe qual plano
                  escolher?” funciona apenas no seu navegador: as respostas não são enviadas para nós nem salvas. Elas só
                  saem do seu aparelho se você tocar em “Enviar pelo WhatsApp”, e mesmo assim o WhatsApp abre com o texto
                  para você revisar antes de enviar.
                </p>
              </section>

              <section>
                <h2>Contato pelo WhatsApp</h2>
                <p>
                  Os botões de contato abrem o WhatsApp, serviço da Meta, que tem sua própria política de privacidade. As
                  informações que você compartilhar na conversa (como nome, telefone, região e dados sobre o seu cão) são
                  usadas somente para atendimento, orientação e elaboração de proposta de adestramento.
                </p>
              </section>

              <section>
                <h2>Medição de audiência</h2>
                <p>
                  O site pode utilizar ferramentas como Google Analytics e Google Tag Manager para entender, de forma
                  agregada, como as páginas são usadas, por exemplo, quais botões de contato recebem mais cliques. Não
                  enviamos a essas ferramentas nomes, telefones, respostas do questionário ou descrições sobre o seu cão.
                  Essas ferramentas podem utilizar cookies, que você pode bloquear ou apagar nas configurações do navegador.
                </p>
              </section>

              <section>
                <h2>Dados técnicos de acesso</h2>
                <p>
                  Como qualquer site, o provedor de hospedagem pode registrar dados técnicos das visitas, como endereço IP,
                  tipo de navegador e data de acesso, para fins de segurança e funcionamento.
                </p>
              </section>

              <section>
                <h2>Seus direitos</h2>
                <p>Você pode, a qualquer momento, solicitar:</p>
                <ul>
                  <li>confirmação e acesso aos dados que tenha compartilhado conosco;</li>
                  <li>correção de dados incompletos ou desatualizados;</li>
                  <li>exclusão das informações enviadas pelo WhatsApp.</li>
                </ul>
                <p>
                  Para isso, fale com a {site.name} pelo{" "}
                  <a
                    href={createWhatsAppLink("Olá! Gostaria de fazer uma solicitação sobre meus dados pessoais.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={link}
                  >
                    WhatsApp {site.whatsapp.display}
                    <span className="sr-only"> (abre em nova aba)</span>
                  </a>
                  .
                </p>
              </section>

              <section>
                <h2>Alterações</h2>
                <p>
                  Esta política pode ser atualizada quando o site mudar. A data no topo da página indica a versão vigente.
                </p>
              </section>

              <p>
                <Link href="/" className={link}>
                  Voltar ao início
                </Link>
              </p>
            </div>
          </div>
        </Container>
      </article>
    </>
  );
}
