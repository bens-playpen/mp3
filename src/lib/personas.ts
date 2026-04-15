import type { ServiceId } from "./catalog";

export interface PersonaOneOffPreset {
  serviceId: ServiceId;
  requestTypeId: string;
}

export interface Persona {
  id: string;
  name: string;
  tagline: string;
  /** Services that become the subscription preset. Must total ≥ $600/mo at catalog prices. */
  subscriptionPreset: ServiceId[];
  /** Optional one-off quote requests the persona would typically start with. */
  oneOffPreset?: PersonaOneOffPreset[];
}

export const PERSONAS: Persona[] = [
  {
    id: "home-services",
    name: "Home services company",
    tagline: "Local trades, 15 staff, 3 trucks",
    subscriptionPreset: ["google-ads", "basic-website-updates", "domain-hosting"],
  },
  {
    id: "allied-health",
    name: "Allied health clinic",
    tagline: "Multi-practitioner, Cliniko stack",
    subscriptionPreset: ["managed-website-clinic", "seo-basic"],
  },
  {
    id: "saas-startup",
    name: "SaaS startup",
    tagline: "Seed-stage, product-led growth",
    subscriptionPreset: [
      "seo-growth",
      "google-ads",
      "website-hosting-vercel",
    ],
    oneOffPreset: [
      { serviceId: "website-dev-astro", requestTypeId: "landing-page" },
    ],
  },
  {
    id: "ecommerce",
    name: "E-commerce brand",
    tagline: "Shopify, 7-figure, scaling paid",
    subscriptionPreset: ["meta-ads", "social-media", "seo-growth"],
  },
  {
    id: "professional-services",
    name: "Professional services",
    tagline: "Consulting firm, 8 partners",
    subscriptionPreset: [
      "seo-basic",
      "workspace-managed",
      "basic-website-updates",
    ],
  },
  {
    id: "real-estate",
    name: "Real estate agency",
    tagline: "Regional team, 12 agents",
    subscriptionPreset: [
      "social-media",
      "meta-ads",
      "basic-website-updates",
    ],
  },
];

export const PERSONAS_BY_ID: Record<string, Persona> = PERSONAS.reduce(
  (acc, p) => {
    acc[p.id] = p;
    return acc;
  },
  {} as Record<string, Persona>,
);
