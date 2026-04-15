import type { Lane, ServiceId } from "./catalog";
import { formatAud, getService, getRequestType } from "./catalog";
import type { IntakeFieldId } from "./intake-fields";
import { INTAKE_FIELDS } from "./intake-fields";

/**
 * Formspree endpoint. Public-safe — lives in the client bundle.
 * Swap this for the real endpoint once Ben provisions it.
 */
export const FORMSPREE_ENDPOINT = "https://formspree.io/f/xnngnnqr";

export const ONGOING_FLOOR_AUD = 600;

export interface SubmissionTaskSnapshot {
  id: string;
  serviceId: ServiceId;
  serviceName: string;
  requestTypeId: string;
  requestTypeLabel: string;
  values: Record<string, string>;
}

export type ContactPayload = {
  contactName: string;
  contactEmail: string;
  contactCompany: string;
  contactPhone?: string;
  contactRole?: string;
};

export interface SubmissionPayload {
  _subject: string;
  lane: Lane;
  submittedAt: string;
  contactName: string;
  contactEmail: string;
  contactCompany: string;
  contactPhone: string;
  contactRole: string;
  ongoingMonthlyTotal?: string;
  taskCount: number;
  tasksJson: string;
  summary: string;
}

export type SubmitError =
  | { kind: "network"; message: string }
  | { kind: "rate-limit"; message: string }
  | { kind: "validation"; message: string }
  | { kind: "unknown"; message: string };

export type SubmitResult =
  | { ok: true }
  | { ok: false; error: SubmitError };

interface BuildPayloadArgs {
  tasks: SubmissionTaskSnapshot[];
  contact: ContactPayload;
}

interface BuildOngoingArgs extends BuildPayloadArgs {
  ongoingMonthlyTotal: number;
}

function humanizeField(fieldId: string): string {
  const schema = INTAKE_FIELDS[fieldId as IntakeFieldId];
  return schema ? schema.label : fieldId;
}

function summariseTask(task: SubmissionTaskSnapshot): string {
  const lines = [`• ${task.serviceName} — ${task.requestTypeLabel}`];
  for (const [key, value] of Object.entries(task.values)) {
    if (!value) continue;
    lines.push(`    ${humanizeField(key)}: ${value}`);
  }
  return lines.join("\n");
}

function baseSummary(
  title: string,
  tasks: SubmissionTaskSnapshot[],
  contact: ContactPayload,
): string {
  const header = [
    title,
    "",
    `From: ${contact.contactName} <${contact.contactEmail}>`,
    `Company: ${contact.contactCompany}`,
    contact.contactPhone ? `Phone: ${contact.contactPhone}` : "",
    contact.contactRole ? `Role: ${contact.contactRole}` : "",
    "",
    "Tasks:",
  ].filter(Boolean);
  return [...header, ...tasks.map(summariseTask)].join("\n");
}

export function buildOngoingPayload({
  tasks,
  contact,
  ongoingMonthlyTotal,
}: BuildOngoingArgs): SubmissionPayload {
  const totalLabel = formatAud(ongoingMonthlyTotal);
  const title = `New subscription start — ${totalLabel}/mo`;
  return {
    _subject: `[Yoonet Marketplace] ${title}`,
    lane: "ongoing",
    submittedAt: new Date().toISOString(),
    contactName: contact.contactName,
    contactEmail: contact.contactEmail,
    contactCompany: contact.contactCompany,
    contactPhone: contact.contactPhone ?? "",
    contactRole: contact.contactRole ?? "",
    ongoingMonthlyTotal: totalLabel,
    taskCount: tasks.length,
    tasksJson: JSON.stringify(tasks),
    summary: `${baseSummary(title, tasks, contact)}\n\nMonthly subtotal: ${totalLabel}`,
  };
}

export function buildOneOffPayload({
  tasks,
  contact,
}: BuildPayloadArgs): SubmissionPayload {
  const title = `New quote request (${tasks.length} task${tasks.length === 1 ? "" : "s"})`;
  return {
    _subject: `[Yoonet Marketplace] ${title}`,
    lane: "oneOff",
    submittedAt: new Date().toISOString(),
    contactName: contact.contactName,
    contactEmail: contact.contactEmail,
    contactCompany: contact.contactCompany,
    contactPhone: contact.contactPhone ?? "",
    contactRole: contact.contactRole ?? "",
    taskCount: tasks.length,
    tasksJson: JSON.stringify(tasks),
    summary: baseSummary(title, tasks, contact),
  };
}

export async function submitBasket(
  payload: SubmissionPayload,
): Promise<SubmitResult> {
  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) return { ok: true };

    if (response.status === 429) {
      return {
        ok: false,
        error: {
          kind: "rate-limit",
          message: "Too many submissions — please try again in a minute.",
        },
      };
    }

    if (response.status >= 400 && response.status < 500) {
      let message = "Submission rejected by the form service.";
      try {
        const body = (await response.json()) as { error?: string };
        if (body?.error) message = body.error;
      } catch {
        /* ignore non-JSON body */
      }
      return { ok: false, error: { kind: "validation", message } };
    }

    return {
      ok: false,
      error: {
        kind: "unknown",
        message: `Submission failed (${response.status}). Please try again.`,
      },
    };
  } catch (error) {
    return {
      ok: false,
      error: {
        kind: "network",
        message:
          error instanceof Error
            ? error.message
            : "Network error — please check your connection.",
      },
    };
  }
}

/**
 * Snapshot a raw basket task into the submission shape. Pulls service and
 * request-type labels fresh from the catalog so submissions always reflect
 * current names even if the basket was hydrated from localStorage.
 */
export function snapshotTask(task: {
  id: string;
  serviceId: ServiceId;
  requestTypeId: string;
  values: Record<string, string>;
}): SubmissionTaskSnapshot {
  const service = getService(task.serviceId);
  const requestType = getRequestType(service, task.requestTypeId);
  return {
    id: task.id,
    serviceId: task.serviceId,
    serviceName: service.name,
    requestTypeId: task.requestTypeId,
    requestTypeLabel: requestType?.label ?? task.requestTypeId,
    values: task.values,
  };
}
