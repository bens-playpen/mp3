import type { ClusterId } from "./clusters";
import type { IntakeFieldId } from "./intake-fields";

export type Lane = "oneOff" | "ongoing";

export type ServiceId =
  | "domain-hosting"
  | "website-hosting-vercel"
  | "website-hosting-webflow"
  | "workspace-managed"
  | "workspace-migration"
  | "seo-basic"
  | "seo-growth"
  | "google-ads"
  | "meta-ads"
  | "social-media"
  | "managed-website-clinic"
  | "basic-website-updates"
  | "website-dev-astro"
  | "website-dev-webflow";

export interface RequestType {
  id: string;
  label: string;
  blurb?: string;
  fieldIds: IntakeFieldId[];
  fromPrice?: number;
}

export interface ServicePricing {
  /** Monthly subscription price in AUD. Sums into basket for ongoing lane. */
  monthly?: number;
  /** One-off "from" price in AUD — display only. */
  oneOffFrom?: number;
  /** Fallback label when no numeric price applies. */
  display?: string;
}

export type ServiceBadge = "Popular" | "Hybrid" | "Foundational";

export interface Service {
  id: ServiceId;
  name: string;
  oneLiner: string;
  bullets: string[];
  boundaries?: string[];
  clusterId: ClusterId;
  lane: Lane;
  /** True for Managed Website — ongoing lane with "no upfront" framing. Display-only. */
  hybrid?: boolean;
  pricing: ServicePricing;
  /** 1..N request types. Never empty. */
  requestTypes: RequestType[];
  badge?: ServiceBadge;
}

export const CATALOG: Service[] = [
  // --- Infrastructure ---
  {
    id: "domain-hosting",
    name: "Domain hosting",
    oneLiner: "Register, renew and manage your domain through VentraIP, handled by us.",
    bullets: [
      "Domain registration and renewal management",
      "DNS record management (A, CNAME, MX, TXT)",
      "Proactive renewal monitoring",
      "Domain transfers in and out",
    ],
    boundaries: [
      "Does not include website or email hosting",
      "Does not include SSL provisioning",
      "Does not include advanced third-party DNS configuration",
    ],
    clusterId: "infrastructure",
    lane: "ongoing",
    pricing: { monthly: 29 },
    badge: "Foundational",
    requestTypes: [
      {
        id: "register-new",
        label: "Register a new domain",
        blurb: "We'll register a fresh domain in your name under our VentraIP management.",
        fieldIds: ["domainName", "orgName", "notes"],
      },
      {
        id: "transfer-in",
        label: "Transfer a domain to us",
        blurb: "Move a domain from another registrar onto our managed account.",
        fieldIds: ["domainName", "currentRegistrar", "notes"],
      },
      {
        id: "dns-update",
        label: "Update DNS records",
        fieldIds: ["domainName", "recordDetails"],
      },
    ],
  },
  {
    id: "website-hosting-vercel",
    name: "Website hosting — Vercel",
    oneLiner: "Managed hosting on Vercel with CDN, SSL, monitoring and continuous deployment.",
    bullets: [
      "Hosting setup and billing management",
      "DNS, SSL and custom domains",
      "Continuous deployment configuration",
      "Uptime monitoring and env var management",
    ],
    boundaries: [
      "Does not include design or development",
      "Does not include domain registration",
      "Does not cover Vercel plan overage costs",
    ],
    clusterId: "infrastructure",
    lane: "ongoing",
    pricing: { monthly: 49 },
    requestTypes: [
      {
        id: "new-setup",
        label: "Set up hosting for a new project",
        fieldIds: ["siteUrl", "repoUrl", "notes"],
      },
      {
        id: "migration",
        label: "Migrate an existing site onto Vercel",
        fieldIds: ["siteUrl", "currentHost", "notes"],
      },
      {
        id: "custom-domain",
        label: "Add or change a custom domain",
        fieldIds: ["domainName", "siteUrl"],
      },
    ],
  },
  {
    id: "website-hosting-webflow",
    name: "Website hosting — Webflow",
    oneLiner: "Managed Webflow CMS hosting — plan management, DNS, SSL and platform upkeep.",
    bullets: [
      "Hosting setup and billing management",
      "DNS, SSL and custom domains",
      "Platform updates and site monitoring",
      "Project settings management",
    ],
    boundaries: [
      "Does not include design or content updates",
      "Does not include Webflow plan upgrades",
      "Does not include domain registration",
    ],
    clusterId: "infrastructure",
    lane: "ongoing",
    pricing: { monthly: 49 },
    requestTypes: [
      {
        id: "new-setup",
        label: "Set up Webflow hosting",
        fieldIds: ["siteUrl", "notes"],
      },
      {
        id: "migration",
        label: "Migrate a site to our Webflow account",
        fieldIds: ["siteUrl", "currentHost", "notes"],
      },
      {
        id: "custom-domain",
        label: "Add or change a custom domain",
        fieldIds: ["domainName", "siteUrl"],
      },
    ],
  },
  {
    id: "workspace-managed",
    name: "Workspace managed accounts",
    oneLiner: "Ongoing Google Workspace administration, billed per inbox.",
    bullets: [
      "User creation, modification and deactivation",
      "Email aliases and signature templates",
      "Admin console management",
      "Weekday support, 9am–6pm AEST",
    ],
    boundaries: [
      "Does not include mailbox migration",
      "Does not include IT support outside Workspace",
      "Does not include after-hours support",
    ],
    clusterId: "infrastructure",
    lane: "ongoing",
    pricing: { monthly: 75, display: "from $75/mo · billed per inbox" },
    requestTypes: [
      {
        id: "add-user",
        label: "Add a new user",
        fieldIds: ["userName", "userEmail", "domainName"],
      },
      {
        id: "modify-user",
        label: "Modify an existing user",
        fieldIds: ["userName", "userEmail", "changeDescription"],
      },
      {
        id: "remove-user",
        label: "Remove a user",
        fieldIds: ["userName", "userEmail", "dataHandling"],
      },
      {
        id: "alias-change",
        label: "Update aliases or signatures",
        fieldIds: ["domainName", "changeDescription"],
      },
    ],
  },
  {
    id: "workspace-migration",
    name: "Workspace migration & optimisation",
    oneLiner: "End-to-end migration onto Google Workspace — mailboxes, DNS, Drive, the lot.",
    bullets: [
      "Pre-migration assessment and DNS audit",
      "MX, SPF, DKIM and DMARC configuration",
      "Mailbox, Drive, Sheets and Docs migration",
      "Post-migration testing and validation",
    ],
    boundaries: [
      "Does not include ongoing account management post-migration",
      "Does not include Workspace licence costs",
      "Does not include device configuration",
    ],
    clusterId: "infrastructure",
    lane: "oneOff",
    pricing: { oneOffFrom: 1490, display: "Quote from $1,490" },
    requestTypes: [
      {
        id: "new-migration",
        label: "Migrate onto Google Workspace",
        fieldIds: [
          "orgName",
          "userCount",
          "migrationSource",
          "deadline",
          "notes",
        ],
      },
      {
        id: "consolidation",
        label: "Consolidate multiple Workspace tenants",
        fieldIds: ["orgName", "userCount", "notes"],
      },
    ],
  },

  // --- Growth ---
  {
    id: "seo-basic",
    name: "SEO — Basic",
    oneLiner: "Technical SEO foundation and monthly health checks — keeping your site indexable and compliant.",
    bullets: [
      "Keyword research and on-page optimisation",
      "Google Search Console monitoring",
      "Technical health checks (speed, mobile, indexation)",
      "Monthly reporting",
    ],
    boundaries: [
      "Does not include backlink building or content creation",
      "Does not include local SEO or GBP optimisation",
      "Does not include paid advertising",
    ],
    clusterId: "growth",
    lane: "ongoing",
    pricing: { monthly: 490 },
    requestTypes: [
      {
        id: "monthly-report",
        label: "Monthly performance report",
        fieldIds: ["siteUrl"],
      },
      {
        id: "technical-audit",
        label: "Technical SEO audit",
        fieldIds: ["siteUrl", "notes"],
      },
      {
        id: "on-page-fixes",
        label: "On-page optimisation batch",
        fieldIds: ["siteUrl", "pagesList"],
      },
    ],
  },
  {
    id: "seo-growth",
    name: "SEO — Growth",
    oneLiner: "Everything in Basic plus content, local SEO, backlinks and strategy — for businesses competing seriously.",
    bullets: [
      "Everything in SEO Basic",
      "Competitor analysis and advanced keyword strategy",
      "Monthly blog creation",
      "Local SEO, GBP optimisation and backlink development",
    ],
    boundaries: [
      "Does not include paid advertising",
      "Does not include social media",
      "Does not include website development",
      "No ranking guarantees",
    ],
    clusterId: "growth",
    lane: "ongoing",
    pricing: { monthly: 1490 },
    badge: "Popular",
    requestTypes: [
      {
        id: "monthly-report",
        label: "Monthly performance report",
        fieldIds: ["siteUrl"],
      },
      {
        id: "blog-post",
        label: "New blog post",
        fieldIds: ["blogTopic", "blogWordcount", "targetKeywords", "deadline"],
      },
      {
        id: "keyword-research",
        label: "Keyword research brief",
        fieldIds: ["siteUrl", "targetAudience", "notes"],
      },
      {
        id: "backlink-batch",
        label: "Backlink outreach batch",
        fieldIds: ["siteUrl", "notes"],
      },
      {
        id: "gbp-refresh",
        label: "Google Business Profile refresh",
        fieldIds: ["gbpUrl", "notes"],
      },
    ],
  },
  {
    id: "google-ads",
    name: "Google Ads — managed",
    oneLiner: "Fully managed Google Ads — setup, campaign architecture, copy and ongoing optimisation.",
    bullets: [
      "Keyword research and negative lists",
      "Account setup and campaign architecture",
      "Ad copywriting, extensions and A/B testing",
      "Conversion tracking via GTM and GA4",
      "Monthly performance reports with commentary",
    ],
    boundaries: [
      "Ad spend is billed direct to the platform",
      "Does not include landing page design or development",
      "Does not include display or video asset creation",
    ],
    clusterId: "growth",
    lane: "ongoing",
    pricing: { monthly: 690, display: "from $690/mo · plus ad spend" },
    requestTypes: [
      {
        id: "new-campaign",
        label: "Launch a new campaign",
        fieldIds: ["siteUrl", "objective", "budgetMonth", "targetAudience"],
      },
      {
        id: "existing-optimise",
        label: "Take over an existing account",
        fieldIds: ["siteUrl", "currentAccount", "notes"],
      },
      {
        id: "creative-refresh",
        label: "Ad creative refresh",
        fieldIds: ["siteUrl", "campaignFocus"],
      },
      {
        id: "monthly-report",
        label: "Monthly performance report",
        fieldIds: ["siteUrl"],
      },
    ],
  },
  {
    id: "meta-ads",
    name: "Meta Ads — managed",
    oneLiner: "Fully managed Facebook and Instagram advertising — pixel, audiences, creative and reporting.",
    bullets: [
      "Business Manager and Meta Pixel setup",
      "Audience targeting and custom audiences",
      "Ad copy and creative guidance",
      "Conversion tracking and monthly reports",
    ],
    boundaries: [
      "Ad spend is billed direct to the platform",
      "Does not include video production",
      "Does not include Google Ads",
    ],
    clusterId: "growth",
    lane: "ongoing",
    pricing: { monthly: 690, display: "from $690/mo · plus ad spend" },
    requestTypes: [
      {
        id: "new-campaign",
        label: "Launch a new campaign",
        fieldIds: [
          "siteUrl",
          "objective",
          "budgetMonth",
          "targetAudience",
          "adAssets",
        ],
      },
      {
        id: "existing-optimise",
        label: "Take over an existing account",
        fieldIds: ["siteUrl", "currentAccount", "notes"],
      },
      {
        id: "monthly-report",
        label: "Monthly performance report",
        fieldIds: ["siteUrl"],
      },
    ],
  },
  {
    id: "social-media",
    name: "Social media management",
    oneLiner: "Organic social presence on Facebook and Instagram — calendars, posts and custom graphics.",
    bullets: [
      "3–4 posts per week across FB and IG",
      "Monthly content calendar",
      "Custom graphics per post",
      "Brand-aligned copywriting",
    ],
    boundaries: [
      "Does not include paid advertising",
      "Does not include LinkedIn or TikTok unless agreed",
      "Does not include video production",
    ],
    clusterId: "growth",
    lane: "ongoing",
    pricing: { monthly: 690 },
    requestTypes: [
      {
        id: "new-account",
        label: "Start a new social subscription",
        fieldIds: ["orgName", "platforms", "brandBrief", "postTheme"],
      },
      {
        id: "monthly-content",
        label: "Monthly content brief",
        fieldIds: ["platforms", "postCount", "postTheme", "notes"],
      },
    ],
  },

  // --- Managed & bundled ---
  {
    id: "managed-website-clinic",
    name: "Managed website — Clinic Sites",
    oneLiner:
      "Full website subscription — build, hosting, maintenance, SEO and monthly updates, no upfront cost.",
    bullets: [
      "Custom website build (agreed pages, CMS, forms)",
      "Hosting, domain, SSL and backups",
      "Technical maintenance and performance monitoring",
      "Up to 2 hours of content updates per month",
      "Analytics, GBP and GSC reporting",
    ],
    boundaries: [
      "Content update allowance is capped monthly (does not roll over)",
      "Decreasing buyout fee applies if you leave early",
      "Additional work outside fair use is quoted separately",
    ],
    clusterId: "managed",
    lane: "ongoing",
    hybrid: true,
    pricing: { monthly: 490, display: "from $490/mo · no upfront" },
    badge: "Hybrid",
    requestTypes: [
      {
        id: "new-subscription",
        label: "Start a new managed website",
        fieldIds: ["orgName", "industry", "pageCount", "brandBrief"],
      },
      {
        id: "update-request",
        label: "Monthly update request",
        fieldIds: ["pagesToUpdate", "changeDescription"],
      },
    ],
  },
  {
    id: "basic-website-updates",
    name: "Basic website updates",
    oneLiner: "Monthly retainer for routine content updates — copy tweaks, hours, staff, pricing.",
    bullets: [
      "Menu, pricing and trading hours updates",
      "Staff profiles and event listings",
      "Copy changes and image swaps",
      "Simple form adjustments",
    ],
    boundaries: [
      "Does not include rebuilds or new features",
      "Does not include design changes of significance",
      "Requests outside fair use are quoted separately",
    ],
    clusterId: "managed",
    lane: "ongoing",
    pricing: { monthly: 290 },
    requestTypes: [
      {
        id: "copy-change",
        label: "Copy change",
        fieldIds: ["pagesToUpdate", "changeDescription"],
      },
      {
        id: "image-swap",
        label: "Image swap",
        fieldIds: ["pagesToUpdate", "changeDescription"],
      },
      {
        id: "contact-details",
        label: "Contact details or trading hours",
        fieldIds: ["siteUrl", "changeDescription"],
      },
    ],
  },
  {
    id: "website-dev-astro",
    name: "Website development — Astro",
    oneLiner: "Custom website build on Astro — optimised for speed, SEO and long-term maintainability.",
    bullets: [
      "Full design and development",
      "Responsive pages, CMS and contact forms",
      "Technical SEO and metadata baked in",
      "GA4, GSC, GTM and GBP integration",
      "Handover documentation",
    ],
    boundaries: [
      "Does not include ongoing hosting or updates",
      "Does not include third-party licence costs",
      "Does not include custom photography or video",
    ],
    clusterId: "managed",
    lane: "oneOff",
    pricing: { oneOffFrom: 5900, display: "Quote from $5,900" },
    requestTypes: [
      {
        id: "new-website",
        label: "New website build",
        fieldIds: ["orgName", "pageCount", "brandBrief", "deadline"],
      },
      {
        id: "landing-page",
        label: "Single landing page",
        fieldIds: ["orgName", "objective", "deadline", "notes"],
      },
    ],
  },
  {
    id: "website-dev-webflow",
    name: "Website development — Webflow",
    oneLiner: "Custom Webflow build with visual CMS editor access — same scope as Astro, plus self-management.",
    bullets: [
      "Full design and development in Webflow",
      "Responsive pages, CMS and forms",
      "Technical SEO and metadata baked in",
      "Client walkthrough of the Webflow editor",
      "Handover documentation",
    ],
    boundaries: [
      "Does not include ongoing hosting or updates",
      "Does not include third-party licence costs",
      "Does not include ecommerce beyond stock Webflow functionality",
    ],
    clusterId: "managed",
    lane: "oneOff",
    pricing: { oneOffFrom: 5900, display: "Quote from $5,900" },
    requestTypes: [
      {
        id: "new-website",
        label: "New website build",
        fieldIds: ["orgName", "pageCount", "brandBrief", "deadline"],
      },
      {
        id: "landing-page",
        label: "Single landing page",
        fieldIds: ["orgName", "objective", "deadline", "notes"],
      },
    ],
  },
];

export const SERVICES_BY_ID: Record<ServiceId, Service> = CATALOG.reduce(
  (acc, s) => {
    acc[s.id] = s;
    return acc;
  },
  {} as Record<ServiceId, Service>,
);

export function getService(id: ServiceId): Service {
  const service = SERVICES_BY_ID[id];
  if (!service) {
    throw new Error(`Unknown service id: ${id}`);
  }
  return service;
}

export function getRequestType(
  service: Service,
  requestTypeId: string,
): RequestType | undefined {
  return service.requestTypes.find((rt) => rt.id === requestTypeId);
}

/**
 * Pure AUD formatter — avoids `Intl.NumberFormat` because server and client
 * ICU versions emit different whitespace characters before the number,
 * causing React 19 hydration text-content mismatches.
 */
export function formatAud(n: number): string {
  const rounded = Math.round(n);
  const withCommas = Math.abs(rounded)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return rounded < 0 ? `-$${withCommas}` : `$${withCommas}`;
}
