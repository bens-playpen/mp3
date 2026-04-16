import { Badge } from "@/components/ui/badge";
import { PERSONAS } from "@/lib/personas";

export function PersonaGrid() {
  return (
    <section id="personas" className="relative scroll-mt-20 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Badge variant="soft">Is this you?</Badge>
            <h2 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
              If this sounds like you,
              <br />
              you&apos;ll feel right at home.
            </h2>
          </div>
          <p className="max-w-md text-[15px] text-foreground/65">
            Three common starting points. No quiz. No toggles. Just pick the
            plan that matches where you are right now.
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {PERSONAS.map((persona) => {
            return (
              <a
                key={persona.id}
                href={`#pricing-${persona.tierId}`}
                className="group relative flex flex-col overflow-hidden rounded-[1.5rem] border border-foreground/10 bg-card p-7 transition-colors hover:border-foreground/25"
              >
                <p className="text-[20px] leading-relaxed text-foreground">
                  <span className="font-semibold">&quot;{persona.quote}&quot;</span>
                </p>
                <div className="mt-6 border-t border-foreground/10 pt-5">
                  <p className="text-[14px] text-foreground/65">
                    {persona.business} →{" "}
                    <span className="font-semibold text-foreground">{persona.tierLabel}</span>
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
