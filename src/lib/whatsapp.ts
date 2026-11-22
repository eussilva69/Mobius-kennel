import { site } from "@/data/site";

/** Monta o link oficial do WhatsApp com a mensagem pré-preenchida. */
export function createWhatsAppLink(message?: string): string {
  const base = `https://wa.me/${site.whatsapp.number}`;
  const text = message?.trim();
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

/**
 * Mensagens por origem do clique.
 * Botões gerais expressam claramente o interesse em saber mais sobre o adestramento.
 */
export const whatsappMessages = {
  header: "Olá! Vi o site de vocês e tenho interesse em saber mais sobre o adestramento.",
  hero: "Olá! Vi o site de vocês e tenho interesse em saber mais sobre o adestramento em domicílio.",
  howItWorks: "Olá! Vi como funciona no site e tenho interesse em saber mais para começar o adestramento.",
  location: "Olá! Tenho interesse em saber mais sobre o atendimento no meu bairro. Moro em:",
  faq: "Olá! Tenho uma dúvida sobre o adestramento e gostaria de saber mais:",
  finalCta: "Olá! Gostaria de saber mais e conversar sobre o adestramento do meu cão.",
  floating: "Olá! Vim pelo site e tenho interesse em saber mais sobre o adestramento.",
  footer: "Olá! Vi o site de vocês e tenho interesse em saber mais sobre o adestramento.",
} as const;

export type WhatsAppSource = keyof typeof whatsappMessages;
