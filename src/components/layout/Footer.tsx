import Image from "next/image";
import Link from "next/link";
import { logo } from "@/data/images";
import { navigation, site } from "@/data/site";
import { createWhatsAppLink, whatsappMessages } from "@/lib/whatsapp";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import { Container } from "@/components/ui/Container";

const link = "inline-flex min-h-10 items-center transition-colors hover:text-fg";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink pb-[calc(var(--mobile-bar-h)+env(safe-area-inset-bottom))] text-fg-muted lg:pb-0 short:pb-0">
      <Container className="grid gap-10 border-t border-line py-14 md:grid-cols-[1.2fr_1fr_1fr] md:gap-8">
        <div className="flex items-center gap-4">
          <Image src={logo.src} alt="" width={64} height={64} sizes="64px" className="size-16" />
          <div>
            <p className="display text-[1.05rem] leading-none text-fg">{site.name}</p>
            <p className="mt-2 text-sm">{site.slogan}</p>
          </div>
        </div>

        <nav aria-label="Rodapé" className="text-[0.95rem]">
          <ul className="grid grid-cols-2 gap-x-6 md:grid-cols-1">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link prefetch={false} href={item.href} className={link}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="text-[0.95rem]">
          <li>
            <a
              href={createWhatsAppLink(whatsappMessages.footer)}
              target="_blank"
              rel="noopener noreferrer"
              data-track="whatsapp_click"
              data-source="footer"
              className={`${link} gap-2.5`}
            >
              <WhatsAppIcon className="size-4 text-gold" />
              {site.whatsapp.display}
              <span className="sr-only"> (WhatsApp, abre em nova aba)</span>
            </a>
          </li>
          <li>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              data-track="instagram_click"
              data-source="footer"
              className={`${link} gap-2.5`}
            >
              <InstagramIcon className="size-4 text-gold" />
              {site.instagram.handle}
              <span className="sr-only"> (Instagram, abre em nova aba)</span>
            </a>
          </li>
          <li className="mt-2 text-sm">
            {site.location.serviceArea} · {site.hours.short}
          </li>
        </ul>
      </Container>

      <Container className="flex flex-col gap-2 border-t border-line py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {site.name}
        </p>
        <Link prefetch={false} href="/politica-de-privacidade" className={link}>
          Política de privacidade
        </Link>
      </Container>
    </footer>
  );
}
