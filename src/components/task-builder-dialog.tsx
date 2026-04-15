"use client";

import * as React from "react";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { DeclineState } from "@/components/decline-state";
import { useBasket } from "@/components/basket/basket-context";
import {
  formatAud,
  type RequestType,
  type Service,
} from "@/lib/catalog";
import { INTAKE_FIELDS, type IntakeFieldId } from "@/lib/intake-fields";
import { validateTaskValues } from "@/lib/validate-task";

type Step = "pick-request" | "fill-fields";

interface TaskBuilderDialogProps {
  service: Service | null;
  onOpenChange: (open: boolean) => void;
}

function initialValues(requestType: RequestType): Record<string, string> {
  const values: Record<string, string> = {};
  for (const fieldId of requestType.fieldIds) {
    const schema = INTAKE_FIELDS[fieldId];
    if (!schema) continue;
    values[fieldId] =
      schema.kind === "select" && schema.options?.[0]
        ? schema.options[0].value
        : "";
  }
  return values;
}

function servicePriceLine(service: Service): string {
  if (service.pricing.display) return service.pricing.display;
  if (service.pricing.monthly !== undefined) {
    return `${formatAud(service.pricing.monthly)}/mo`;
  }
  if (service.pricing.oneOffFrom !== undefined) {
    return `Quote from ${formatAud(service.pricing.oneOffFrom)}`;
  }
  return "Custom quote";
}

export function TaskBuilderDialog({
  service,
  onOpenChange,
}: TaskBuilderDialogProps) {
  const { addTask } = useBasket();
  const [step, setStep] = React.useState<Step>("pick-request");
  const [requestTypeId, setRequestTypeId] = React.useState<string | null>(null);
  const [values, setValues] = React.useState<Record<string, string>>({});
  const [touched, setTouched] = React.useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = React.useState(false);

  // Reset state each time a new service is opened
  React.useEffect(() => {
    if (service) {
      setStep("pick-request");
      setRequestTypeId(null);
      setValues({});
      setTouched({});
      setSubmitted(false);
    }
  }, [service]);

  const requestType = React.useMemo(() => {
    if (!service || !requestTypeId) return null;
    return service.requestTypes.find((rt) => rt.id === requestTypeId) ?? null;
  }, [service, requestTypeId]);

  const errors = React.useMemo(() => {
    if (!requestType) return {};
    return validateTaskValues(requestType, values);
  }, [requestType, values]);

  const canAdd = requestType && Object.keys(errors).length === 0;

  const handlePickRequest = (id: string) => {
    if (!service) return;
    setRequestTypeId(id);
    const rt = service.requestTypes.find((r) => r.id === id);
    if (rt) {
      setValues(initialValues(rt));
      setTouched({});
      setStep("fill-fields");
    }
  };

  const handleFieldChange = (fieldId: IntakeFieldId, value: string) => {
    setValues((prev) => ({ ...prev, [fieldId]: value }));
  };

  const handleFieldBlur = (fieldId: IntakeFieldId) => {
    setTouched((prev) => ({ ...prev, [fieldId]: true }));
  };

  const handleBack = () => {
    setStep("pick-request");
    setSubmitted(false);
  };

  const handleAddToBasket = () => {
    if (!service || !requestType) return;
    setSubmitted(true);
    if (Object.keys(errors).length > 0) return;
    const id = addTask({
      serviceId: service.id,
      requestTypeId: requestType.id,
      values,
    });
    if (id) onOpenChange(false);
  };

  return (
    <Dialog open={!!service} onOpenChange={onOpenChange}>
      {service && (
        <DialogContent>
          <DialogHeader>
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
              {service.lane === "ongoing" ? "Subscription service" : "One-off quote"}
            </span>
            <DialogTitle>{service.name}</DialogTitle>
            <DialogDescription>
              {servicePriceLine(service)} — {service.oneLiner}
            </DialogDescription>
          </DialogHeader>

          {step === "pick-request" ? (
            <DialogBody>
              <h4 className="font-[family-name:var(--font-display)] text-lg font-extrabold">
                What do you need from {service.name}?
              </h4>
              <p className="mt-1 text-[13px] text-foreground/60">
                Pick the request type that fits. Each one has a defined intake
                form, so you know what we need and we know what we're delivering.
              </p>

              <div className="mt-5 flex flex-col gap-3">
                {service.requestTypes.map((rt) => (
                  <button
                    key={rt.id}
                    type="button"
                    onClick={() => handlePickRequest(rt.id)}
                    className="flex w-full items-start justify-between gap-4 rounded-2xl border border-foreground/15 bg-background p-4 text-left transition-colors hover:border-primary hover:bg-primary-soft/40"
                  >
                    <div>
                      <p className="font-[family-name:var(--font-display)] text-[15px] font-extrabold">
                        {rt.label}
                      </p>
                      {rt.blurb && (
                        <p className="mt-1 text-[13px] text-foreground/60">
                          {rt.blurb}
                        </p>
                      )}
                    </div>
                    <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-foreground/50" />
                  </button>
                ))}
              </div>

              {service.boundaries && service.boundaries.length > 0 && (
                <div className="mt-6">
                  <DeclineState
                    variant="service-boundary"
                    boundaries={service.boundaries}
                  />
                </div>
              )}
            </DialogBody>
          ) : (
            <DialogBody>
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground/50">
                  Step 2 of 2
                </span>
                <h4 className="font-[family-name:var(--font-display)] text-lg font-extrabold">
                  {requestType?.label}
                </h4>
              </div>

              <form
                className="mt-5 flex flex-col gap-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAddToBasket();
                }}
              >
                {requestType?.fieldIds.map((fieldId) => {
                  const schema = INTAKE_FIELDS[fieldId];
                  if (!schema) return null;
                  const value = values[fieldId] ?? "";
                  const shouldShow = (touched[fieldId] || submitted) && errors[fieldId];
                  return (
                    <div key={fieldId} className="flex flex-col gap-1.5">
                      <Label htmlFor={fieldId} required={schema.required}>
                        {schema.label}
                      </Label>
                      {schema.kind === "textarea" ? (
                        <Textarea
                          id={fieldId}
                          value={value}
                          onChange={(e) => handleFieldChange(fieldId, e.target.value)}
                          onBlur={() => handleFieldBlur(fieldId)}
                          placeholder={schema.placeholder}
                        />
                      ) : schema.kind === "select" ? (
                        <Select
                          id={fieldId}
                          value={value}
                          onChange={(e) => handleFieldChange(fieldId, e.target.value)}
                          onBlur={() => handleFieldBlur(fieldId)}
                        >
                          {schema.options?.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </Select>
                      ) : (
                        <Input
                          id={fieldId}
                          type={
                            schema.kind === "email"
                              ? "email"
                              : schema.kind === "url"
                                ? "url"
                                : schema.kind === "tel"
                                  ? "tel"
                                  : schema.kind === "number"
                                    ? "number"
                                    : "text"
                          }
                          value={value}
                          onChange={(e) => handleFieldChange(fieldId, e.target.value)}
                          onBlur={() => handleFieldBlur(fieldId)}
                          placeholder={schema.placeholder}
                          min={schema.min}
                          max={schema.max}
                        />
                      )}
                      {schema.helpText && !shouldShow && (
                        <p className="text-[12px] text-foreground/55">{schema.helpText}</p>
                      )}
                      {shouldShow && (
                        <p className="text-[12px] font-medium text-destructive">
                          {errors[fieldId]}
                        </p>
                      )}
                    </div>
                  );
                })}
              </form>
            </DialogBody>
          )}

          <DialogFooter>
            {step === "pick-request" ? (
              <>
                <DialogClose asChild>
                  <Button variant="ghost" size="sm">
                    Cancel
                  </Button>
                </DialogClose>
                <span className="hidden text-[12px] text-foreground/50 sm:inline">
                  Step 1 of 2 · pick a request type
                </span>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={handleBack}>
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
                <Button
                  type="button"
                  size="sm"
                  onClick={handleAddToBasket}
                  disabled={!canAdd && submitted}
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Add to basket
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
}
