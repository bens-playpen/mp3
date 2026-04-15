import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section id="contact" className="relative scroll-mt-20 py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        <div className="relative overflow-hidden rounded-[2rem] bg-primary p-10 text-primary-foreground md:p-16">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-accent/60 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-secondary/60 blur-3xl"
          />

          <div className="relative max-w-2xl">
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-primary-foreground/70">
              Ready when you are
            </p>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-extrabold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
              Hand off your digital headaches.
            </h2>
            <p className="mt-5 max-w-xl text-lg text-primary-foreground/85">
              Book a 30-minute discovery call and you&apos;ll leave with a clear
              recommendation — even if that recommendation is &ldquo;not
              yet&rdquo;. No pressure, no proposal deck.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" variant="inverse">
                <a href="https://cal.com/yoonet/discovery" target="_blank" rel="noreferrer">
                  Book a discovery call
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-background/40 bg-transparent text-background hover:bg-background hover:text-foreground"
              >
                <a href="mailto:hello@yoonet.com.au">
                  <Mail className="h-4 w-4" />
                  hello@yoonet.com.au
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
