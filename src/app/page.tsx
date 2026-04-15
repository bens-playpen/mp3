import { Suspense } from "react";
import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { PersonaGrid } from "@/components/persona-grid";
import { ServiceCatalog } from "@/components/service-catalog";
import { HowWeWork } from "@/components/how-we-work";
import { FitGate } from "@/components/fit-gate";
import { FAQ } from "@/components/faq";
import { CTASection } from "@/components/cta-section";
import { SiteFooter } from "@/components/site-footer";
import { BasketProvider } from "@/components/basket/basket-context";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <BasketProvider>
        <main>
          <Hero />
          <PersonaGrid />
          <Suspense
            fallback={
              <div className="mx-auto max-w-7xl px-6 py-24 text-foreground/50 md:px-10">
                Loading catalogue…
              </div>
            }
          >
            <ServiceCatalog />
          </Suspense>
          <HowWeWork />
          <FitGate />
          <FAQ />
          <CTASection />
        </main>
      </BasketProvider>
      <SiteFooter />
    </>
  );
}
