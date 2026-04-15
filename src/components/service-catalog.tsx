"use client";

import * as React from "react";
import { Plus, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TaskBuilderDialog } from "@/components/task-builder-dialog";
import { StickyBasket } from "@/components/sticky-basket";
import { SubmissionDialog } from "@/components/submission-dialog";
import { useBasket } from "@/components/basket/basket-context";
import { CLUSTERS } from "@/lib/clusters";
import {
  getService,
  type Lane,
  type Service,
} from "@/lib/catalog";

function servicePriceLine(service: Service): string {
  if (service.pricing.display) return service.pricing.display;
  if (service.pricing.monthly !== undefined) {
    return `${formatCurrency(service.pricing.monthly)}/mo`;
  }
  if (service.pricing.oneOffFrom !== undefined) {
    return `Quote from ${formatCurrency(service.pricing.oneOffFrom)}`;
  }
  return "Custom quote";
}

function formatCurrency(n: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  }).format(n);
}

function laneLabel(service: Service): string {
  if (service.hybrid) return "Hybrid — no upfront";
  return service.lane === "ongoing" ? "Subscription" : "One-off quote";
}

function ServiceCard({
  service,
  onAdd,
  taskCount,
}: {
  service: Service;
  onAdd: (service: Service) => void;
  taskCount: number;
}) {
  const inBasket = taskCount > 0;
  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-[1.25rem] border bg-card p-6 transition-all ${
        inBasket
          ? "border-primary ring-2 ring-primary/25"
          : "border-foreground/10 hover:border-foreground/25"
      }`}
    >
      <header className="flex items-start justify-between gap-3">
        <Badge variant={service.hybrid ? "accent" : "soft"} className="shrink-0">
          {laneLabel(service)}
        </Badge>
        {service.badge && (
          <span className="rounded-full bg-foreground/5 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground/60">
            {service.badge}
          </span>
        )}
      </header>

      <h3 className="mt-4 font-[family-name:var(--font-display)] text-[20px] font-extrabold leading-snug tracking-tight">
        {service.name}
      </h3>
      <p className="mt-2 text-[13px] leading-relaxed text-foreground/65">
        {service.oneLiner}
      </p>

      <ul className="mt-4 flex flex-1 flex-col gap-2 text-[13px] text-foreground/70">
        {service.bullets.slice(0, 4).map((bullet) => (
          <li key={bullet} className="flex items-start gap-2">
            <span className="mt-[7px] h-1 w-2 shrink-0 rounded-full bg-primary/70" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      <footer className="mt-6 flex items-end justify-between gap-3 border-t border-foreground/10 pt-5">
        <div className="flex flex-col">
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-foreground/50">
            Starts at
          </span>
          <span className="font-[family-name:var(--font-display)] text-lg font-extrabold">
            {servicePriceLine(service)}
          </span>
        </div>
        <Button
          size="sm"
          variant={inBasket ? "outline" : "default"}
          onClick={() => onAdd(service)}
        >
          {inBasket ? (
            <>
              <CheckCircle2 className="h-4 w-4" />
              {taskCount} in basket · add another
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" />
              Add task
            </>
          )}
        </Button>
      </footer>
    </article>
  );
}

export function ServiceCatalog() {
  const {
    pendingPersonaId,
    dismissPendingPersona,
    loadPersonaPreset,
    oneOffTasks,
    ongoingTasks,
    clearAll,
  } = useBasket();
  const [openService, setOpenService] = React.useState<Service | null>(null);
  const [submitLane, setSubmitLane] = React.useState<Lane | null>(null);

  const handleAdd = (service: Service) => setOpenService(service);
  const handleBuilderOpenChange = (open: boolean) => {
    if (!open) setOpenService(null);
  };
  const handleSubmit = (lane: Lane) => setSubmitLane(lane);
  const handleSubmitOpenChange = (open: boolean) => {
    if (!open) setSubmitLane(null);
  };

  // Count tasks per service for the "in basket" affordance
  const countsByService = React.useMemo(() => {
    const counts: Record<string, number> = {};
    for (const task of ongoingTasks) {
      counts[task.serviceId] = (counts[task.serviceId] ?? 0) + 1;
    }
    for (const task of oneOffTasks) {
      counts[task.serviceId] = (counts[task.serviceId] ?? 0) + 1;
    }
    return counts;
  }, [ongoingTasks, oneOffTasks]);

  const handleReplaceWithPersona = () => {
    if (!pendingPersonaId) return;
    clearAll();
    loadPersonaPreset(pendingPersonaId);
    dismissPendingPersona();
  };

  return (
    <section id="catalog" className="relative scroll-mt-20 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="max-w-3xl">
          <Badge variant="soft">The catalogue</Badge>
          <h2 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
            Pick what you need.
            <br />
            We'll pick it up from there.
          </h2>
          <p className="mt-5 text-lg text-foreground/70">
            Everything in a container. Every service has a defined scope, a
            clear intake form and a price. If it's not on the menu, we'll ask
            you to decompose it into things that are.
          </p>
        </div>

        {pendingPersonaId && (
          <div className="mt-8 flex flex-col items-start gap-4 rounded-2xl border border-primary/30 bg-primary/10 p-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-[family-name:var(--font-display)] text-[15px] font-extrabold text-foreground">
                Template waiting
              </p>
              <p className="text-[13px] text-foreground/70">
                You already have items in your basket. Loading the template
                will replace them.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={dismissPendingPersona}
              >
                Keep basket
              </Button>
              <Button size="sm" onClick={handleReplaceWithPersona}>
                Replace with template
              </Button>
            </div>
          </div>
        )}

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_360px] lg:gap-12">
          <div className="flex flex-col gap-14">
            {CLUSTERS.map((cluster) => {
              const Icon = cluster.icon;
              return (
                <div key={cluster.id}>
                  <div className="flex items-start gap-4">
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-[family-name:var(--font-display)] text-2xl font-extrabold tracking-tight">
                        {cluster.label}
                      </h3>
                      <p className="mt-1 max-w-xl text-[14px] text-foreground/65">
                        {cluster.blurb}
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    {cluster.serviceIds.map((id) => {
                      const service = getService(id);
                      return (
                        <ServiceCard
                          key={id}
                          service={service}
                          onAdd={handleAdd}
                          taskCount={countsByService[id] ?? 0}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <StickyBasket onSubmit={handleSubmit} />
          </aside>
        </div>
      </div>

      <TaskBuilderDialog
        service={openService}
        onOpenChange={handleBuilderOpenChange}
      />
      <SubmissionDialog lane={submitLane} onOpenChange={handleSubmitOpenChange} />
    </section>
  );
}
