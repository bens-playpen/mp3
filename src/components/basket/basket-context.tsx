"use client";

import * as React from "react";
import {
  SERVICES_BY_ID,
  getService,
  getRequestType,
  type Lane,
  type ServiceId,
} from "@/lib/catalog";
import { PERSONAS_BY_ID } from "@/lib/personas";

export type TaskId = string;

interface BaseTask {
  id: TaskId;
  serviceId: ServiceId;
  requestTypeId: string;
  values: Record<string, string>;
  createdAt: string;
}

export type OngoingTask = BaseTask & { lane: "ongoing" };
export type OneOffTask = BaseTask & { lane: "oneOff" };
export type Task = OngoingTask | OneOffTask;

export interface BasketState {
  oneOffTasks: OneOffTask[];
  ongoingTasks: OngoingTask[];
}

export interface AddTaskInput {
  serviceId: ServiceId;
  requestTypeId: string;
  values: Record<string, string>;
}

export interface BasketContextValue extends BasketState {
  hydrated: boolean;
  pendingPersonaId: string | null;
  dismissPendingPersona: () => void;
  addTask: (input: AddTaskInput) => TaskId | null;
  updateTask: (id: TaskId, patch: { values?: Record<string, string> }) => void;
  removeTask: (id: TaskId) => void;
  clearLane: (lane: Lane) => void;
  clearAll: () => void;
  loadPersonaPreset: (personaId: string) => boolean;
  getOngoingMonthlyTotal: () => number;
  getOngoingServicesInBasket: () => ServiceId[];
}

const STORAGE_KEY = "mp3-basket-v1";
const STORAGE_VERSION = 1;

const BasketContext = React.createContext<BasketContextValue | null>(null);

function newId(): TaskId {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function isOngoingTask(task: BaseTask & { lane: Lane }): task is OngoingTask {
  return task.lane === "ongoing";
}

function normalisePersisted(raw: unknown): BasketState {
  const empty: BasketState = { oneOffTasks: [], ongoingTasks: [] };
  if (!raw || typeof raw !== "object") return empty;
  const parsed = raw as {
    v?: number;
    oneOffTasks?: unknown;
    ongoingTasks?: unknown;
  };
  if (parsed.v !== STORAGE_VERSION) return empty;

  const validate = <T extends Task>(value: unknown, lane: Lane): T[] => {
    if (!Array.isArray(value)) return [] as T[];
    return value.filter((item): item is T => {
      if (!item || typeof item !== "object") return false;
      const task = item as Partial<Task>;
      if (typeof task.id !== "string") return false;
      if (typeof task.serviceId !== "string") return false;
      if (typeof task.requestTypeId !== "string") return false;
      if (task.lane !== lane) return false;
      const service = SERVICES_BY_ID[task.serviceId as ServiceId];
      if (!service) return false;
      if (service.lane !== lane) return false;
      if (!getRequestType(service, task.requestTypeId)) return false;
      return true;
    });
  };

  return {
    oneOffTasks: validate<OneOffTask>(parsed.oneOffTasks, "oneOff"),
    ongoingTasks: validate<OngoingTask>(parsed.ongoingTasks, "ongoing"),
  };
}

function personaIdFromSearch(): string | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  const p = params.get("p");
  return p && PERSONAS_BY_ID[p] ? p : null;
}

export function BasketProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<BasketState>({
    oneOffTasks: [],
    ongoingTasks: [],
  });
  const [hydrated, setHydrated] = React.useState(false);
  const [pendingPersonaId, setPendingPersonaId] = React.useState<string | null>(
    null,
  );

  // Hydrate from localStorage + apply persona query param
  React.useEffect(() => {
    let persisted: BasketState = { oneOffTasks: [], ongoingTasks: [] };
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        persisted = normalisePersisted(JSON.parse(raw));
      }
    } catch {
      /* ignore corrupt storage */
    }

    setState(persisted);
    setHydrated(true);

    const personaId = personaIdFromSearch();
    if (personaId) {
      const basketHasTasks =
        persisted.ongoingTasks.length > 0 || persisted.oneOffTasks.length > 0;
      if (basketHasTasks) {
        setPendingPersonaId(personaId);
      } else {
        applyPersonaInternal(personaId, setState);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist every change once hydrated
  React.useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ v: STORAGE_VERSION, ...state }),
      );
    } catch {
      /* ignore quota errors */
    }
  }, [state, hydrated]);

  const addTask = React.useCallback(
    ({ serviceId, requestTypeId, values }: AddTaskInput): TaskId | null => {
      const service = SERVICES_BY_ID[serviceId];
      if (!service) return null;
      const requestType = getRequestType(service, requestTypeId);
      if (!requestType) return null;

      const id = newId();
      const createdAt = new Date().toISOString();

      setState((prev) => {
        if (service.lane === "ongoing") {
          const task: OngoingTask = {
            id,
            serviceId,
            requestTypeId,
            values,
            createdAt,
            lane: "ongoing",
          };
          return { ...prev, ongoingTasks: [...prev.ongoingTasks, task] };
        }
        const task: OneOffTask = {
          id,
          serviceId,
          requestTypeId,
          values,
          createdAt,
          lane: "oneOff",
        };
        return { ...prev, oneOffTasks: [...prev.oneOffTasks, task] };
      });

      return id;
    },
    [],
  );

  const updateTask = React.useCallback(
    (id: TaskId, patch: { values?: Record<string, string> }) => {
      setState((prev) => ({
        oneOffTasks: prev.oneOffTasks.map((t) =>
          t.id === id && patch.values ? { ...t, values: patch.values } : t,
        ),
        ongoingTasks: prev.ongoingTasks.map((t) =>
          t.id === id && patch.values ? { ...t, values: patch.values } : t,
        ),
      }));
    },
    [],
  );

  const removeTask = React.useCallback((id: TaskId) => {
    setState((prev) => ({
      oneOffTasks: prev.oneOffTasks.filter((t) => t.id !== id),
      ongoingTasks: prev.ongoingTasks.filter((t) => t.id !== id),
    }));
  }, []);

  const clearLane = React.useCallback((lane: Lane) => {
    setState((prev) =>
      lane === "ongoing"
        ? { ...prev, ongoingTasks: [] }
        : { ...prev, oneOffTasks: [] },
    );
  }, []);

  const clearAll = React.useCallback(() => {
    setState({ oneOffTasks: [], ongoingTasks: [] });
    setPendingPersonaId(null);
  }, []);

  const loadPersonaPreset = React.useCallback((personaId: string): boolean => {
    return applyPersonaInternal(personaId, setState);
  }, []);

  const dismissPendingPersona = React.useCallback(() => {
    setPendingPersonaId(null);
  }, []);

  const getOngoingMonthlyTotal = React.useCallback((): number => {
    const seen = new Set<ServiceId>();
    let total = 0;
    for (const task of state.ongoingTasks) {
      if (seen.has(task.serviceId)) continue;
      seen.add(task.serviceId);
      const service = SERVICES_BY_ID[task.serviceId];
      if (service?.pricing.monthly) total += service.pricing.monthly;
    }
    return total;
  }, [state.ongoingTasks]);

  const getOngoingServicesInBasket = React.useCallback((): ServiceId[] => {
    const seen = new Set<ServiceId>();
    const ordered: ServiceId[] = [];
    for (const task of state.ongoingTasks) {
      if (seen.has(task.serviceId)) continue;
      seen.add(task.serviceId);
      ordered.push(task.serviceId);
    }
    return ordered;
  }, [state.ongoingTasks]);

  const value: BasketContextValue = {
    ...state,
    hydrated,
    pendingPersonaId,
    dismissPendingPersona,
    addTask,
    updateTask,
    removeTask,
    clearLane,
    clearAll,
    loadPersonaPreset,
    getOngoingMonthlyTotal,
    getOngoingServicesInBasket,
  };

  return (
    <BasketContext.Provider value={value}>{children}</BasketContext.Provider>
  );
}

export function useBasket(): BasketContextValue {
  const ctx = React.useContext(BasketContext);
  if (!ctx) {
    throw new Error("useBasket must be used inside a BasketProvider");
  }
  return ctx;
}

function applyPersonaInternal(
  personaId: string,
  setState: React.Dispatch<React.SetStateAction<BasketState>>,
): boolean {
  const persona = PERSONAS_BY_ID[personaId];
  if (!persona) return false;

  const ongoingTasks: OngoingTask[] = [];
  for (const serviceId of persona.subscriptionPreset) {
    const service = SERVICES_BY_ID[serviceId];
    if (!service || service.lane !== "ongoing") continue;
    const firstRequestType = service.requestTypes[0];
    if (!firstRequestType) continue;
    ongoingTasks.push({
      id: newId(),
      serviceId,
      requestTypeId: firstRequestType.id,
      values: {},
      createdAt: new Date().toISOString(),
      lane: "ongoing",
    });
  }

  const oneOffTasks: OneOffTask[] = [];
  if (persona.oneOffPreset) {
    for (const preset of persona.oneOffPreset) {
      const service = SERVICES_BY_ID[preset.serviceId];
      if (!service || service.lane !== "oneOff") continue;
      const requestType = getRequestType(service, preset.requestTypeId);
      if (!requestType) continue;
      oneOffTasks.push({
        id: newId(),
        serviceId: preset.serviceId,
        requestTypeId: preset.requestTypeId,
        values: {},
        createdAt: new Date().toISOString(),
        lane: "oneOff",
      });
    }
  }

  setState({ oneOffTasks, ongoingTasks });
  return true;
}

// Silence unused warning for the type guard helper — it's exported for tests.
export const _isOngoingTask = isOngoingTask;
