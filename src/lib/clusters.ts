import type { LucideIcon } from "lucide-react";
import { Plug, Sparkles, Layers } from "lucide-react";
import type { ServiceId } from "./catalog";

export type ClusterId = "infrastructure" | "growth" | "managed";

export interface Cluster {
  id: ClusterId;
  label: string;
  blurb: string;
  icon: LucideIcon;
  serviceIds: ServiceId[];
}

export const CLUSTERS: Cluster[] = [
  {
    id: "infrastructure",
    label: "Infrastructure & plumbing",
    blurb:
      "The load-bearing layer — domains, hosting, workspaces. Boring, essential, done right.",
    icon: Plug,
    serviceIds: [
      "domain-hosting",
      "website-hosting-vercel",
      "website-hosting-webflow",
      "workspace-managed",
      "workspace-migration",
    ],
  },
  {
    id: "growth",
    label: "Growth & visibility",
    blurb:
      "The outbound work that finds you customers — search, paid, and social, run as productised containers.",
    icon: Sparkles,
    serviceIds: [
      "seo-basic",
      "seo-growth",
      "google-ads",
      "meta-ads",
      "social-media",
    ],
  },
  {
    id: "managed",
    label: "Managed & bundled",
    blurb:
      "Whole website services bundled into a single scope — builds, updates and managed subscriptions.",
    icon: Layers,
    serviceIds: [
      "managed-website-clinic",
      "basic-website-updates",
      "website-dev-astro",
      "website-dev-webflow",
    ],
  },
];

export const CLUSTERS_BY_ID: Record<ClusterId, Cluster> = CLUSTERS.reduce(
  (acc, c) => {
    acc[c.id] = c;
    return acc;
  },
  {} as Record<ClusterId, Cluster>,
);
