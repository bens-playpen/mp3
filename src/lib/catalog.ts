export interface Tier {
  id: "foundation" | "growth" | "performance";
  name: string;
  price: number;
  tagline: string;
  description: string;
  highlighted: boolean;
  includes: string[];
  vignette: {
    voice: string;
    business: string;
  };
}

export const tiers = [
  {
    id: "foundation",
    name: "Foundation",
    price: 600,
    tagline: "Your digital base, looked after.",
    description:
      "For businesses with a working website that just needs to stay healthy and current.",
    highlighted: false,
    includes: [
      "Domain hosting and DNS management",
      "Website hosting (Vercel or Webflow)",
      "Security updates, uptime monitoring, SSL, backups",
      "Basic website updates - up to 2 hours/month",
      "Monthly performance report",
      "Email support, 48-hour response",
    ],
    vignette: {
      voice: "I've got a website. I just need someone to keep it running and make the odd update.",
      business: "Trades, professional services, local operators",
    },
  },
  {
    id: "growth",
    name: "Growth",
    price: 1490,
    tagline: "Found, trusted, chosen.",
    description:
      "For businesses ready to grow. You know you should be doing more with SEO and social but don't have the time.",
    highlighted: true,
    includes: [
      "Everything in Foundation",
      "SEO - on-page, technical, monthly content",
      "Google Business Profile management",
      "Social media - 3 posts/week, 2 platforms",
      "Monthly strategy call (30 min)",
      "Quarterly SEO review with recommendations",
      "Email support, 24-hour response",
    ],
    vignette: {
      voice: "I know I should be doing more with SEO and social media but I don't have the time or the know-how.",
      business: "Allied health, home services, professional services",
    },
  },
  {
    id: "performance",
    name: "Performance",
    price: 2990,
    tagline: "Accelerate what's working.",
    description:
      "For businesses actively investing in growth, with budget for paid advertising and a need for the whole picture managed.",
    highlighted: false,
    includes: [
      "Everything in Growth",
      "Google Ads management (ad spend billed separately)",
      "Meta Ads management (ad spend billed separately)",
      "Advanced SEO - content, link building, competitor analysis",
      "Social media - 5 posts/week, 3 platforms",
      "Dedicated named account manager",
      "Fortnightly strategy call",
      "Priority same-day support",
    ],
    vignette: {
      voice: "I'm ready to invest in ads and serious growth. I need someone managing the whole picture.",
      business: "E-commerce, SaaS, multi-location practices, scaling operators",
    },
  },
] as const satisfies readonly Tier[];

export type TierId = (typeof tiers)[number]["id"];

export function formatAud(cents: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 0,
  }).format(cents);
}
