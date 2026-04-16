import { ArrowRight, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 yn-mesh" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px] yn-grid-dots opacity-[0.35]" />

      <div className="mx-auto max-w-7xl px-6 pt-20 pb-24 md:px-10 md:pt-28 md:pb-32">
        <div className="max-w-4xl">
          <div className="yn-fade-up yn-delay-1">
            <Badge variant="soft">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Now booking May intakes · Australia &amp; New Zealand
            </Badge>
          </div>

          <h1 className="yn-fade-up yn-delay-2 mt-8 font-[family-name:var(--font-display)] text-[44px] font-extrabold leading-[1.02] tracking-[-0.035em] text-foreground sm:text-[64px] md:text-[84px] lg:text-[96px]">
            Your digital team,
            <br />
            sorted.
          </h1>

          <p className="yn-fade-up yn-delay-3 mt-8 max-w-2xl text-lg leading-relaxed text-foreground/70 md:text-xl">
            Three plans. One team. Zero guesswork. Hosting, SEO, ads, social,
            website updates - handled by 130 people who&apos;ve looked after{" "}
            <span className="font-semibold text-foreground">
              500+ Australian and Kiwi businesses
            </span>{" "}
            for 15 years.
          </p>

          <div className="yn-fade-up yn-delay-4 mt-10 flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <a href="#pricing">
                See the plans
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="https://calendly.com/yoonet" target="_blank" rel="noreferrer">
                <Calendar className="h-4 w-4" />
                Book a strategy call
              </a>
            </Button>
          </div>

          <dl className="yn-fade-up yn-delay-5 mt-16 grid max-w-2xl grid-cols-3 gap-6 border-t border-foreground/10 pt-8 md:gap-12">
            {[
              { k: "15+ yrs", v: "Years running" },
              { k: "500+", v: "Businesses served" },
              { k: "130", v: "People on the team" },
            ].map((s) => (
              <div key={s.k} className="flex flex-col gap-1">
                <dt className="font-[family-name:var(--font-display)] text-2xl font-extrabold md:text-3xl">
                  {s.k}
                </dt>
                <dd className="text-[13px] text-foreground/60">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Floating accent shapes */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 top-24 hidden h-64 w-64 rotate-12 rounded-[3rem] bg-accent/60 blur-2xl md:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-20 hidden h-48 w-48 rounded-full bg-secondary/30 blur-3xl md:block"
      />
    </section>
  );
}
