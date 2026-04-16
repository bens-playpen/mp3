import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "What's included in each plan?",
    a: "Each plan includes a clearly defined scope. Full inclusions are listed on the pricing cards above, with Foundation, Growth, and Performance expanding based on your stage.",
  },
  {
    q: "Can I change plans?",
    a: "Yes. Month to month, no lock-in. Upgrade or downgrade anytime with 30 days notice.",
  },
  {
    q: "What if I need something not in my plan?",
    a: "Add-ons are available for things like email marketing, workspace migrations, and website rebuilds. Your account lead will recommend what makes sense.",
  },
  {
    q: "Who does the work?",
    a: "Our team in the Philippines, managed from New Zealand. 130+ people, 15+ years in business. You'll have a named person on your account.",
  },
  {
    q: "Is there a contract?",
    a: "Month to month. We earn your business every month.",
  },
  {
    q: "What about website builds?",
    a: "Quoted separately after a discovery call. Not part of the monthly plans. Astro builds from $5,900, Webflow from $6,500.",
  },
  {
    q: "Why don't you have a cheaper option?",
    a: "Because doing digital properly costs real time and attention. Below $600/month, we can't deliver work we'd be comfortable putting our name to.",
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
