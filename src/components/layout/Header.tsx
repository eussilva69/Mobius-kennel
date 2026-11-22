import Image from "next/image";
import Link from "next/link";
import { logo } from "@/data/images";
import { navigation, site } from "@/data/site";
import { createWhatsAppLink, whatsappMessages } from "@/lib/whatsapp";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  return (
    <header className="sticky top-0 z-50 isolate">
      {/*
        Fundo numa camada própria: backdrop-filter no <header> o tornaria o bloco de contenção
        dos elementos position:fixed internos (painel do menu mobile), colapsando o painel.
      */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 border-b border-line bg-ink/95 backdrop-blur-md"
      />
      <div className="mx-auto flex h-(--header-h) max-w-[78rem] items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
        <Link
          prefetch={false}
          href="/#inicio"
          className="flex shrink-0 items-center gap-3"
          aria-label={`${site.name}, voltar ao início`}
        >
          <Image src={logo.src} alt="" width={44} height={44} sizes="44px" className="size-10 sm:size-11" loading="eager" />
          {/* Em telas muito estreitas o nome quebra em duas linhas para caber ao lado dos botões */}
          <span className="display text-[0.95rem] leading-[0.95] tracking-[0.02em] text-fg sm:text-[1.05rem]">
            <span className="block min-[400px]:inline">Morbius</span> <span className="block min-[400px]:inline">Kennel</span>
          </span>
        </Link>

        <nav aria-label="Navegação principal" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  prefetch={false}
                  href={item.href}
                  className="py-2 text-[0.92rem] font-semibold text-fg-muted transition-colors hover:text-fg"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden lg:block">
            <WhatsAppButton message={whatsappMessages.header} source="navbar" className="min-h-11 px-5">
              WhatsApp
            </WhatsAppButton>
          </div>

          <a
            href={createWhatsAppLink(whatsappMessages.header)}
            target="_blank"
            rel="noopener noreferrer"
            data-track="whatsapp_click"
            data-source="navbar_mobile"
            // Some ao rolar: a barra inferior (ou botão redondo) assume o contato — evita dois botões iguais.
            className="inline-flex size-11 items-center justify-center bg-gold text-ink transition-colors hover:bg-gold-light lg:hidden scrolled:hidden"
          >
            <WhatsAppIcon className="size-5" />
            <span className="sr-only">Falar no WhatsApp (abre em nova aba)</span>
          </a>

          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
