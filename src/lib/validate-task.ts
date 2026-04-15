import type { RequestType } from "./catalog";
import type { ContactPayload } from "./submission";
import type { IntakeFieldId, IntakeFieldSchema } from "./intake-fields";
import { INTAKE_FIELDS } from "./intake-fields";

export type FieldErrors = Partial<Record<string, string>>;

function looksLikeEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function looksLikeUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function validateField(
  schema: IntakeFieldSchema,
  rawValue: string | undefined,
): string | null {
  const value = (rawValue ?? "").trim();
  const required = schema.required ?? false;

  if (!value) {
    return required ? `${schema.label} is required.` : null;
  }

  if (schema.minLength && value.length < schema.minLength) {
    return `${schema.label} must be at least ${schema.minLength} characters.`;
  }
  if (schema.maxLength && value.length > schema.maxLength) {
    return `${schema.label} must be at most ${schema.maxLength} characters.`;
  }

  switch (schema.kind) {
    case "email":
      if (!looksLikeEmail(value)) return `Enter a valid email address.`;
      break;
    case "url":
      if (!looksLikeUrl(value)) return `Enter a valid URL, starting with http:// or https://.`;
      break;
    case "number": {
      const n = Number(value);
      if (!Number.isFinite(n)) return `${schema.label} must be a number.`;
      if (schema.min !== undefined && n < schema.min) {
        return `${schema.label} must be at least ${schema.min}.`;
      }
      if (schema.max !== undefined && n > schema.max) {
        return `${schema.label} must be at most ${schema.max}.`;
      }
      break;
    }
    case "select":
      if (
        schema.options &&
        !schema.options.some((option) => option.value === value)
      ) {
        return `Pick one of the available options.`;
      }
      break;
    default:
      break;
  }

  return null;
}

export function validateTaskValues(
  requestType: RequestType,
  values: Record<string, string>,
): FieldErrors {
  const errors: FieldErrors = {};
  for (const fieldId of requestType.fieldIds) {
    const schema = INTAKE_FIELDS[fieldId];
    if (!schema) continue;
    const error = validateField(schema, values[fieldId]);
    if (error) errors[fieldId] = error;
  }
  return errors;
}

export function isTaskValid(
  requestType: RequestType,
  values: Record<string, string>,
): boolean {
  return Object.keys(validateTaskValues(requestType, values)).length === 0;
}

const CONTACT_SCHEMA: IntakeFieldId[] = [
  "contactName",
  "contactEmail",
  "contactCompany",
  "contactPhone",
  "contactRole",
];

export function validateContact(contact: Partial<ContactPayload>): FieldErrors {
  const errors: FieldErrors = {};
  for (const fieldId of CONTACT_SCHEMA) {
    const schema = INTAKE_FIELDS[fieldId];
    if (!schema) continue;
    const error = validateField(schema, contact[fieldId as keyof ContactPayload]);
    if (error) errors[fieldId] = error;
  }
  return errors;
}

export function isContactValid(contact: Partial<ContactPayload>): boolean {
  return Object.keys(validateContact(contact)).length === 0;
}
