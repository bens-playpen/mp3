import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SERVICES_BY_ID, formatAud } from "@/lib/catalog";
import { PERSONAS } from "@/lib/personas";

function personaMonthlyTotal(serviceIds: readonly string[]): number {
  const seen = new Set<string>();
  let total = 0;
  for (const id of serviceIds) {
    if (seen.has(id)) continue;
    seen.add(id);
    const service = SERVICES_BY_ID[id as keyof typeof SERVICES_BY_ID];
    if (service?.pricing.monthly) total += service.pricing.monthly;
  }
  return total;
}

export function PersonaGrid() {
  return (
    <section id="templates" className="relative scroll-mt-20 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Badge variant="soft">Templates</Badge>
            <h2 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
              Or start with a template.
            </h2>
          </div>
          <p className="max-w-md text-[15px] text-foreground/65">
            Six common setups, each loaded into the catalogue with a preset
            basket. Tweak from there — every template hits the $600/mo minimum.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {PERSONAS.map((persona) => {
            const total = personaMonthlyTotal(persona.subscriptionPreset);
            return (
              <Link
                key={persona.id}
                href={`/?p=${persona.id}#catalog`}
                className="group relative flex flex-col overflow-hidden rounded-[1.5rem] border border-foreground/10 bg-card p-7 transition-colors hover:border-foreground/25"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/10 blur-2xl transition-opacity group-hover:opacity-100"
                />
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground/50">
                  {persona.tagline}
                </span>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-[22px] font-extrabold leading-snug tracking-tight">
                  {persona.name}
                </h3>
                <ul className="mt-5 flex flex-col gap-2 text-[13px] text-foreground/65">
                  {persona.subscriptionPreset.map((id) => {
                    const service = SERVICES_BY_ID[id as keyof typeof SERVICES_BY_ID];
                    if (!service) return null;
                    return (
                      <li key={id} className="flex items-start gap-2">
                        <span className="mt-[7px] h-1 w-2 shrink-0 rounded-full bg-primary/80" />
                        <span>{service.name}</span>
                      </li>
                    );
                  })}
                </ul>
                <div className="mt-6 flex items-center justify-between border-t border-foreground/10 pt-5">
                  <span className="font-[family-name:var(--font-display)] text-lg font-extrabold">
                    from {formatAud(total)}/mo
                  </span>
                  <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-primary">
                    Load template
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
