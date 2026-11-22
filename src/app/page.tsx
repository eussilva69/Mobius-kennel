import type { Metadata } from "next";
import { baseOpenGraph, siteDescription, siteTitle } from "@/lib/seo";
import { buildStructuredData, jsonLd } from "@/lib/structured-data";
import { About } from "@/components/sections/About";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Pricing } from "@/components/sections/Pricing";
import { Results } from "@/components/sections/Results";
import { Services } from "@/components/sections/Services";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { ...baseOpenGraph, title: siteTitle, description: siteDescription, url: "/" },
};

/**
 * O essencial, em ordem: o que é e onde → o que treina → como funciona → quanto custa
 * → quem atende → dúvidas → contato. Fundos alternam preto, claro e dourado.
 */
export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(buildStructuredData()) }} />
      <Hero />
      <Services />
      <HowItWorks />
      <Pricing />
      <About />
      <Results />
      <FAQ />
      <FinalCTA />
    </>
  );
}
