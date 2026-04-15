import { Badge } from "@/components/ui/badge";

const phases = [
  {
    n: "01",
    title: "Discovery",
    duration: "30 min",
    body:
      "A short call with someone senior — no discovery form, no sales funnel. We map where your business is, where you want it in 12 months, and whether we&rsquo;re a fit at all.",
    moments: ["Brief-back the same week", "Honest yes / no / not yet", "Tier recommendation"],
  },
  {
    n: "02",
    title: "Launch",
    duration: "Weeks 1–3",
    body:
      "We onboard properly. Access, audits, a 30/60/90 day priority list, and a named human on your account. You&rsquo;ll meet the team before we touch anything live.",
    moments: ["Access &amp; audit checklist", "30 / 60 / 90 plan", "Kick-off with your team"],
  },
  {
    n: "03",
    title: "Rhythm",
    duration: "Every month, forever",
    body:
      "Monthly reporting, regular check-ins, continuous delivery against the plan. If something isn&rsquo;t working, we change it before you have to ask.",
    moments: ["Monthly performance report", "Recurring strategy call", "Slack / email access"],
  },
];

export function HowWeWork() {
  return (
    <section id="how" className="relative scroll-mt-20 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="max-w-3xl">
          <Badge variant="soft">How we work</Badge>
          <h2 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
            Three phases.
            <br />
            Then we&apos;re just your team.
          </h2>
          <p className="mt-5 text-lg text-foreground/70">
            No long contracts, no mysterious ramp-ups. You&apos;ll know exactly
            who&apos;s doing what and when — from the first call.
          </p>
        </div>

        <ol className="mt-16 grid gap-6 md:grid-cols-3">
          {phases.map((phase, i) => (
            <li
              key={phase.n}
              className="relative flex flex-col rounded-[1.5rem] bg-card p-8 ring-1 ring-foreground/10 md:p-10"
            >
              <div className="flex items-center justify-between">
                <span className="font-[family-name:var(--font-display)] text-5xl font-extrabold leading-none text-primary/80">
                  {phase.n}
                </span>
                <span className="rounded-full bg-foreground/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-foreground/60">
                  {phase.duration}
                </span>
              </div>

              <h3 className="mt-8 font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight">
                {phase.title}
              </h3>

              <p
                className="mt-3 text-[15px] leading-relaxed text-foreground/70"
                dangerouslySetInnerHTML={{ __html: phase.body }}
              />

              <ul className="mt-8 flex flex-col gap-2.5 border-t border-foreground/10 pt-6">
                {phase.moments.map((m) => (
                  <li
                    key={m}
                    className="flex items-center gap-2.5 text-[13px] text-foreground/70"
                  >
                    <span className="h-1 w-4 rounded-full bg-primary" />
                    <span dangerouslySetInnerHTML={{ __html: m }} />
                  </li>
                ))}
              </ul>

              {i < phases.length - 1 && (
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-3 top-1/2 hidden h-px w-6 -translate-y-1/2 bg-foreground/15 md:block"
                />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
