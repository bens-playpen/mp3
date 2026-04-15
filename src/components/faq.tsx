import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Why is everything in a container?",
    a: "Because open-ended scoping is how agencies get into trouble. Every service in the catalogue has a defined deliverable, a defined intake form and a defined price. You know what you're getting, we know what we're delivering, and the team can actually be held to a scope. No bespoke project proposals.",
  },
  {
    q: "What if my request isn't on the menu?",
    a: "Most \"unique\" requests are combinations of things that are on the menu. Redesigning a services page and setting up tracking is a Website Updates task plus a Google Ads conversion tracking task — not a custom project. If we genuinely can't decompose your request into defined services, we'll tell you, and we'll say no rather than improvise.",
  },
  {
    q: "Why the $600/mo subscription minimum?",
    a: "It's the floor below which we can't deliver the quality we'd put our name to. It protects margin, it protects the team's focus, and it filters for clients who are serious about investing in the work. Below that threshold we'd rather say no than ship half-finished work.",
  },
  {
    q: "Can I submit quote requests without subscribing?",
    a: "Yes. One-off services — website builds, landing pages, Workspace migrations — sit in a separate quotes section of the basket. You can submit them anytime, no minimum, and no pressure to also sign up for ongoing work.",
  },
  {
    q: "Who actually does the work?",
    a: "The delivery team is 130+ strong in Balanga, Philippines — same crew that's served 500+ Australian and New Zealand businesses over 15+ years. Your account lead sits in Australia or New Zealand. In-region face, offshore engine room, one integrated team.",
  },
  {
    q: "What about contracts and notice periods?",
    a: "Subscriptions are month to month with 30 days' notice. No 12-month lock-ins. If the work isn't delivering, you shouldn't have to wait out a contract to leave. One-off quotes are scoped and priced before anything starts.",
  },
  {
    q: "Can I add or remove services later?",
    a: "Yes — your basket is your subscription. Add services, remove services, and re-submit from the catalogue whenever your needs change. Ad spend and third-party licences are billed direct to those platforms, separate from the Yoonet subscription.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="relative scroll-mt-20 py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 md:grid-cols-[minmax(0,22rem)_1fr] md:px-10">
        <div>
          <Badge variant="soft">Questions</Badge>
          <h2 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-extrabold leading-[1.05] tracking-tight md:text-5xl">
            Before you ask.
          </h2>
          <p className="mt-5 text-[15px] text-foreground/65">
            The seven we get most weeks. If yours isn&apos;t here, drop us a
            note — we&apos;ll reply from a real person, usually within a day.
          </p>
        </div>

        <Accordion
          type="single"
          collapsible
          defaultValue="item-0"
          className="w-full border-t border-foreground/10"
        >
          {faqs.map((faq, i) => (
            <AccordionItem key={faq.q} value={`item-${i}`}>
              <AccordionTrigger>{faq.q}</AccordionTrigger>
              <AccordionContent>{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
