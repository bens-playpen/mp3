import Link from "next/link";
import { Button } from "@/components/ui/button";

const nav = [
  { label: "Pricing", href: "#pricing" },
  { label: "Who it's for", href: "#fit" },
  { label: "How we work", href: "#how-we-work" },
  { label: "FAQ", href: "#faq" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-foreground/5 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-10">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative h-8 w-8 rounded-lg bg-foreground">
            <div className="absolute inset-0 rounded-lg bg-primary mix-blend-screen transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            <div className="absolute inset-0 flex items-center justify-center text-background font-[family-name:var(--font-display)] text-lg font-extrabold">
              y
            </div>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-[family-name:var(--font-display)] text-[15px] font-extrabold tracking-tight">
              Yoonet
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/50">
              Marketplace
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm">
            <a href="https://calendly.com/yoonet" target="_blank" rel="noreferrer">
              Book a call
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
