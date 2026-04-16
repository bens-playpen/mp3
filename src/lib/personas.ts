import type { TierId } from "./catalog";

export interface PersonaVignette {
  id: string;
  quote: string;
  business: string;
  tierId: TierId;
  tierLabel: string;
}

export const PERSONAS: PersonaVignette[] = [
  {
    id: "foundation-fit",
    quote: "I've got a website. I just need someone to keep it running and make the odd update.",
    business: "Trades, professional services, local operators",
    tierId: "foundation",
    tierLabel: "Foundation",
  },
  {
    id: "growth-fit",
    quote: "I know I should be doing more with SEO and social media but I don't have the time.",
    business: "Allied health, home services, professional services",
    tierId: "growth",
    tierLabel: "Growth",
  },
  {
    id: "performance-fit",
    quote: "I'm ready to invest in ads and serious growth. I need someone managing the whole picture.",
    business: "E-commerce, SaaS, multi-location, scaling operators",
    tierId: "performance",
    tierLabel: "Performance",
  },
];
