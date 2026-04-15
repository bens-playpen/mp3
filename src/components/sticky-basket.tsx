"use client";

import * as React from "react";
import { Minus, FileText, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeclineState } from "@/components/decline-state";
import { useBasket, type Task } from "@/components/basket/basket-context";
import { formatAud, getService, getRequestType, type Lane } from "@/lib/catalog";
import { ONGOING_FLOOR_AUD } from "@/lib/submission";

interface StickyBasketProps {
  onSubmit: (lane: Lane) => void;
}

function TaskRow({
  task,
  onRemove,
}: {
  task: Task;
  onRemove: (id: string) => void;
}) {
  const service = getService(task.serviceId);
  const requestType = getRequestType(service, task.requestTypeId);
  return (
    <li className="flex items-start justify-between gap-3 py-2 text-[13px]">
      <div className="flex min-w-0 flex-col">
        <span className="truncate font-semibold text-foreground">
          {requestType?.label ?? task.requestTypeId}
        </span>
        <span className="truncate text-[11px] text-foreground/50">
          {service.name}
        </span>
      </div>
      <button
        type="button"
        onClick={() => onRemove(task.id)}
        className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-foreground/5 text-foreground/50 transition-colors hover:bg-destructive/15 hover:text-destructive"
        aria-label="Remove task"
      >
        <Minus className="h-3.5 w-3.5" strokeWidth={2.5} />
      </button>
    </li>
  );
}

export function StickyBasket({ onSubmit }: StickyBasketProps) {
  const {
    oneOffTasks,
    ongoingTasks,
    hydrated,
    removeTask,
    getOngoingMonthlyTotal,
    getOngoingServicesInBasket,
  } = useBasket();

  const ongoingTotal = getOngoingMonthlyTotal();
  const delta = ONGOING_FLOOR_AUD - ongoingTotal;
  const ongoingServices = getOngoingServicesInBasket();
  const hasOngoing = ongoingTasks.length > 0;
  const hasOneOff = oneOffTasks.length > 0;
  const canSubscribe = hasOngoing && delta <= 0;

  // Group ongoing tasks by serviceId — one header per service, subtotal shown once.
  const ongoingGroups = React.useMemo(() => {
    const groups = new Map<string, typeof ongoingTasks>();
    for (const task of ongoingTasks) {
      const list = groups.get(task.serviceId) ?? [];
      list.push(task);
      groups.set(task.serviceId, list);
    }
    return Array.from(groups.entries()).map(([serviceId, tasks]) => ({
      serviceId,
      tasks,
    }));
  }, [ongoingTasks]);

  const floorProgress = Math.min(100, (ongoingTotal / ONGOING_FLOOR_AUD) * 100);
  const aboveFloor = delta <= 0;

  return (
    <div className="flex flex-col gap-5">
      {/* Subscription section */}
      <section className="flex flex-col overflow-hidden rounded-[1.5rem] border border-foreground/10 bg-card shadow-[var(--shadow-card)]">
        <header className="flex items-center justify-between gap-2 border-b border-foreground/10 px-5 py-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground/55">
              Your subscription
            </p>
            <p className="mt-0.5 font-[family-name:var(--font-display)] text-xl font-extrabold">
              {formatAud(ongoingTotal)}/mo
            </p>
          </div>
          <div className="text-right text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground/55">
            {ongoingServices.length} service{ongoingServices.length === 1 ? "" : "s"}
          </div>
        </header>

        <div className="flex flex-col gap-4 px-5 py-4">
          <div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-foreground/5">
              <div
                className={`h-full rounded-full transition-all ${
                  aboveFloor ? "bg-primary" : "bg-secondary"
                }`}
                style={{ width: `${floorProgress}%` }}
              />
            </div>
            <p className="mt-2 text-[11px] text-foreground/55">
              {aboveFloor
                ? `${formatAud(Math.abs(delta))} above the $600/mo minimum`
                : `Add ${formatAud(delta)} more to meet the $600/mo minimum`}
            </p>
          </div>

          {hasOngoing ? (
            <ul className="flex flex-col divide-y divide-foreground/5">
              {ongoingGroups.map(({ serviceId, tasks }) => {
                const service = getService(serviceId as Parameters<typeof getService>[0]);
                return (
                  <li key={serviceId} className="py-3 first:pt-0 last:pb-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-[family-name:var(--font-display)] text-[14px] font-extrabold">
                          {service.name}
                        </p>
                        <p className="text-[11px] text-foreground/50">
                          {tasks.length} task{tasks.length === 1 ? "" : "s"} queued
                        </p>
                      </div>
                      {service.pricing.monthly !== undefined && (
                        <span className="text-[13px] font-semibold text-foreground">
                          {formatAud(service.pricing.monthly)}/mo
                        </span>
                      )}
                    </div>
                    <ul className="mt-2 flex flex-col gap-1 border-l-2 border-primary/30 pl-3">
                      {tasks.map((task) => (
                        <TaskRow key={task.id} task={task} onRemove={removeTask} />
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ul>
          ) : hydrated ? (
            <DeclineState variant="empty-basket" />
          ) : (
            <p className="text-[13px] text-foreground/55">Loading basket…</p>
          )}

          {hasOngoing && !aboveFloor && <DeclineState variant="floor-below" />}

          <Button
            size="lg"
            disabled={!canSubscribe}
            onClick={() => onSubmit("ongoing")}
            className="w-full"
          >
            <Send className="h-4 w-4" />
            Start my subscription
          </Button>
        </div>
      </section>

      {/* Quote requests section */}
      <section className="flex flex-col overflow-hidden rounded-[1.5rem] border border-foreground/10 bg-card shadow-[var(--shadow-card)]">
        <header className="flex items-center justify-between gap-2 border-b border-foreground/10 px-5 py-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground/55">
              Your quote requests
            </p>
            <p className="mt-0.5 font-[family-name:var(--font-display)] text-xl font-extrabold">
              {oneOffTasks.length} task{oneOffTasks.length === 1 ? "" : "s"}
            </p>
          </div>
          <FileText className="h-5 w-5 text-foreground/35" />
        </header>

        <div className="flex flex-col gap-4 px-5 py-4">
          {hasOneOff ? (
            <ul className="flex flex-col divide-y divide-foreground/5">
              {oneOffTasks.map((task) => (
                <TaskRow key={task.id} task={task} onRemove={removeTask} />
              ))}
            </ul>
          ) : (
            <p className="text-[13px] text-foreground/55">
              One-off builds and migrations come here as a flat list — submit
              anytime, no minimum.
            </p>
          )}

          <Button
            size="lg"
            variant="outline"
            disabled={!hasOneOff}
            onClick={() => onSubmit("oneOff")}
            className="w-full"
          >
            <FileText className="h-4 w-4" />
            Request a quote
          </Button>
        </div>
      </section>
    </div>
  );
}
