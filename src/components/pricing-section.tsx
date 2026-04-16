import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatAud, tiers } from "@/lib/catalog";

const tiersById = Object.fromEntries(tiers.map((tier) => [tier.id, tier])) as Record<
  (typeof tiers)[number]["id"],
  (typeof tiers)[number]
>;
const orderedTierIds = ["growth", "foundation", "performance"] as const;
const orderedTiers = orderedTierIds.map((id) => tiersById[id]);

export function PricingSection() {
  return (
    <section id="pricing" className="relative scroll-mt-20 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="max-w-3xl">
          <Badge variant="soft">Pricing</Badge>
          <h2 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
            Three plans.
            <br />
            One team behind them.
          </h2>
          <p className="mt-5 text-lg text-foreground/70">
            All prices are AUD, GST exclusive, billed month to month.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {orderedTiers.map((tier) => {
            const highlighted = tier.highlighted;
            return (
              <article
                key={tier.id}
                id={`pricing-${tier.id}`}
                className={`relative flex flex-col rounded-[1.5rem] border bg-card p-7 ${
                  highlighted
                    ? "border-primary shadow-[var(--shadow-card)] lg:-translate-y-1"
                    : "border-foreground/10"
                }`}
              >
                {highlighted && (
                  <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary-foreground">
                    Most popular
                  </span>
                )}

                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground/50">
                    {tier.name}
                  </p>
                  <p className="mt-3 font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-tight">
                    {formatAud(tier.price)}
                    <span className="text-base font-semibold text-foreground/60">/mo</span>
                  </p>
                  <p className="mt-2 text-[15px] font-semibold text-foreground">
                    {tier.tagline}
                  </p>
                  <p className="mt-2 text-[14px] leading-relaxed text-foreground/65">
                    {tier.description}
                  </p>
                </div>

                <div className="mt-6 border-t border-foreground/10 pt-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-foreground/50">
                    What&apos;s included
                  </p>
                  <ul className="mt-3 flex flex-col gap-2.5 text-[14px] text-foreground/75">
                    {tier.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-[8px] h-1 w-2 shrink-0 rounded-full bg-primary/80" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-7 flex flex-col gap-3">
                  <Button asChild size="lg" className="w-full">
                    <a
                      href={`https://calendly.com/yoonet?tier=${tier.id}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Book a call
                    </a>
                  </Button>
                  <a
                    href={`mailto:hello@yoonet.com.au?subject=${encodeURIComponent(`Get started now - ${tier.name}`)}`}
                    className="text-center text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
                  >
                    or get started now →
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
