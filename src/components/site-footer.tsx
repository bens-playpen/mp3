const footerNav = {
  Plans: [
    { label: "Foundation", href: "#pricing-foundation" },
    { label: "Growth", href: "#pricing-growth" },
    { label: "Performance", href: "#pricing-performance" },
  ],
  Company: [
    { label: "How we work", href: "#how-we-work" },
    { label: "Who it's for", href: "#fit" },
    { label: "FAQ", href: "#faq" },
  ],
  Connect: [
    { label: "hello@yoonet.com.au", href: "mailto:hello@yoonet.com.au" },
    { label: "Book a call", href: "https://calendly.com/yoonet" },
    { label: "Sydney · Auckland · Balanga", href: "#" },
  ],
};

export function SiteFooter() {
  return (
    <footer className="relative border-t border-foreground/10 bg-card pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <div className="flex items-center gap-2">
              <div className="relative h-9 w-9 rounded-xl bg-foreground">
                <div className="absolute inset-0 flex items-center justify-center text-background font-[family-name:var(--font-display)] text-xl font-extrabold">
                  y
                </div>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-[family-name:var(--font-display)] text-base font-extrabold tracking-tight">
                  Yoonet
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/50">
                  Marketplace
                </span>
              </div>
            </div>
            <p className="mt-6 text-[14px] leading-relaxed text-foreground/60">
              Productised digital care for Australian and New Zealand
              businesses. 15+ years, 130 humans, 500+ clients and counting.
            </p>
          </div>

          {Object.entries(footerNav).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/45">
                {heading}
              </h4>
              <ul className="mt-5 flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-foreground/75 transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col-reverse items-start justify-between gap-4 border-t border-foreground/10 pt-8 md:flex-row md:items-center">
          <p className="text-xs text-foreground/50">
            © {new Date().getFullYear()} Yoonet Pty Ltd. All prices AUD, GST
            exclusive.
          </p>
          <div className="flex items-center gap-6 text-xs text-foreground/50">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
