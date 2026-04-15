import { Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const good = [
  "You&rsquo;ve been trading 2+ years and know your margins",
  "You already have a website — even if it&rsquo;s tired",
  "You want one team you can call, not five freelancers",
  "You&rsquo;d rather invest properly than cheaply",
];

const bad = [
  "You want the cheapest quote on the table",
  "You want to run ads without anyone touching the website",
  "You&rsquo;re shopping for a single one-off task",
  "You expect results without giving us the access to deliver them",
];

export function FitGate() {
  return (
    <section className="relative overflow-hidden bg-foreground py-24 text-background md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 yn-grid-dots opacity-[0.12]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-primary/30 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-secondary/25 blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="max-w-3xl">
          <Badge
            variant="outline"
            className="border-background/25 text-background"
          >
            The honest bit
          </Badge>
          <h2 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
            We&apos;re not for everyone.
            <br />
            And that&apos;s on purpose.
          </h2>
          <p className="mt-5 max-w-2xl text-lg text-background/70">
            We work best with established businesses who want reliable,
            considered work from people who actually understand their business.
            If you&apos;re chasing the cheapest option, we&apos;re probably not
            it — and we&apos;d rather say so now.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <div className="rounded-[1.5rem] bg-background/[0.04] p-8 ring-1 ring-background/10 backdrop-blur md:p-10">
            <h3 className="flex items-center gap-3 font-[family-name:var(--font-display)] text-xl font-extrabold">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-foreground">
                <Check className="h-4 w-4" strokeWidth={3} />
              </span>
              You&apos;ll love us if…
            </h3>
            <ul className="mt-6 flex flex-col gap-4">
              {good.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-[15px] leading-relaxed text-background/80"
                >
                  <span className="mt-2 h-1 w-3 shrink-0 rounded-full bg-accent" />
                  <span dangerouslySetInnerHTML={{ __html: item }} />
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[1.5rem] bg-background/[0.04] p-8 ring-1 ring-background/10 backdrop-blur md:p-10">
            <h3 className="flex items-center gap-3 font-[family-name:var(--font-display)] text-xl font-extrabold">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                <X className="h-4 w-4" strokeWidth={3} />
              </span>
              We&apos;re wrong for you if…
            </h3>
            <ul className="mt-6 flex flex-col gap-4">
              {bad.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-[15px] leading-relaxed text-background/60"
                >
                  <span className="mt-2 h-1 w-3 shrink-0 rounded-full bg-secondary" />
                  <span dangerouslySetInnerHTML={{ __html: item }} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
