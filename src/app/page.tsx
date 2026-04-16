import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { PersonaGrid } from "@/components/persona-grid";
import { PricingSection } from "@/components/pricing-section";
import { HowWeWork } from "@/components/how-we-work";
import { FitGate } from "@/components/fit-gate";
import { FAQ } from "@/components/faq";
import { CTASection } from "@/components/cta-section";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <PricingSection />
        <PersonaGrid />
        <HowWeWork />
        <FitGate />
        <FAQ />
        <CTASection />
      </main>
      <SiteFooter />
    </>
  );
}
