import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import { site } from "@/data/site";
import { baseOpenGraph, ogImage, seoKeywords, siteDescription, siteTitle } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";
import { AnalyticsListener } from "@/components/analytics/AnalyticsListener";
import { AnalyticsScripts } from "@/components/analytics/AnalyticsScripts";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { InPageFocus } from "@/components/layout/InPageFocus";
import { ScrollState } from "@/components/layout/ScrollState";
import "./globals.css";

// Archivo variável com eixo de largura: títulos largos e pesados (estilo da marca) e corpo normal.
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: { default: siteTitle, template: `%s | ${site.name}` },
  description: siteDescription,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.instagram.url }],
  creator: site.name,
  publisher: site.name,
  keywords: [...seoKeywords],
  // canonical e og:url são definidos por página (page.tsx), para não herdarem "/" por engano.
  openGraph: {
    ...baseOpenGraph,
    title: siteTitle,
    description: siteDescription,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    site: "@morbius.kennel",
    creator: "@morbius.kennel",
    images: [{ url: ogImage.url, alt: ogImage.alt, width: ogImage.width, height: ogImage.height }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: { telephone: false, email: false, address: false },
  category: "Adestramento de cães",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: site.name,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    yahoo: process.env.NEXT_PUBLIC_YAHOO_VERIFICATION,
    other: {
      ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
        ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
        : {}),
    },
  },
  other: {
    "geo.region": "BR-SP",
    "geo.placename": "Arujá, Alto Tietê, São Paulo, Brasil",
    "geo.position": `${site.location.latitude};${site.location.longitude}`,
    ICBM: `${site.location.latitude}, ${site.location.longitude}`,
    "DC.title": siteTitle,
    "DC.creator": site.name,
    "DC.coverage": "Arujá, Santa Isabel, Mogi das Cruzes, Guarulhos, Itaquaquecetuba, Poá, Suzano, Alto Tietê, SP, Brasil",
    "DC.subject": "Adestramento canino em domicílio, comportamento animal, obediência e passeio",
    "DC.language": "pt-BR",
    "DC.format": "text/html",
    "DC.type": "Service",
  },
};

export const viewport: Viewport = {
  themeColor: "#0e0e0d",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth" className={archivo.variable}>
      <body>
        <ScrollState />
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-60 focus:bg-gold focus:px-4 focus:py-3 focus:font-bold focus:text-ink"
        >
          Pular para o conteúdo
        </a>
        <Header />
        <main id="conteudo" tabIndex={-1} className="focus:outline-none">
          {children}
        </main>
        <Footer />
        <FloatingWhatsApp />
        <InPageFocus />
        <AnalyticsListener />
        <AnalyticsScripts />
      </body>
    </html>
  );
}
