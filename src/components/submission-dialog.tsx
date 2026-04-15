"use client";

import * as React from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Send } from "lucide-react";
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
import { Label } from "@/components/ui/label";
import { useBasket, type Task } from "@/components/basket/basket-context";
import {
  formatAud,
  getService,
  getRequestType,
  type Lane,
} from "@/lib/catalog";
import { INTAKE_FIELDS, type IntakeFieldId } from "@/lib/intake-fields";
import {
  buildOngoingPayload,
  buildOneOffPayload,
  snapshotTask,
  submitBasket,
  type ContactPayload,
  type SubmitError,
} from "@/lib/submission";
import { validateContact } from "@/lib/validate-task";

interface SubmissionDialogProps {
  lane: Lane | null;
  onOpenChange: (open: boolean) => void;
}

type Step = "review" | "contact" | "sending" | "done" | "error";

const CONTACT_FIELDS: IntakeFieldId[] = [
  "contactName",
  "contactEmail",
  "contactCompany",
  "contactPhone",
  "contactRole",
];

function emptyContact(): ContactPayload {
  return {
    contactName: "",
    contactEmail: "",
    contactCompany: "",
    contactPhone: "",
    contactRole: "",
  };
}

function TaskSummary({ task }: { task: Task }) {
  const service = getService(task.serviceId);
  const requestType = getRequestType(service, task.requestTypeId);
  const entries = Object.entries(task.values).filter(([, v]) => v);
  return (
    <div className="rounded-2xl border border-foreground/10 bg-background p-4">
      <p className="font-[family-name:var(--font-display)] text-[15px] font-extrabold text-foreground">
        {service.name}
      </p>
      <p className="text-[13px] text-foreground/60">
        {requestType?.label ?? task.requestTypeId}
      </p>
      {entries.length > 0 && (
        <dl className="mt-3 flex flex-col gap-1.5 border-t border-foreground/10 pt-3 text-[13px] text-foreground/70">
          {entries.map(([key, value]) => {
            const schema = INTAKE_FIELDS[key as IntakeFieldId];
            return (
              <div key={key} className="flex flex-col gap-0.5">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.1em] text-foreground/45">
                  {schema?.label ?? key}
                </dt>
                <dd className="whitespace-pre-wrap">{value}</dd>
              </div>
            );
          })}
        </dl>
      )}
    </div>
  );
}

export function SubmissionDialog({ lane, onOpenChange }: SubmissionDialogProps) {
  const {
    oneOffTasks,
    ongoingTasks,
    getOngoingMonthlyTotal,
    clearLane,
  } = useBasket();
  const [step, setStep] = React.useState<Step>("review");
  const [contact, setContact] = React.useState<ContactPayload>(emptyContact());
  const [touched, setTouched] = React.useState<Record<string, boolean>>({});
  const [attempted, setAttempted] = React.useState(false);
  const [error, setError] = React.useState<SubmitError | null>(null);

  React.useEffect(() => {
    if (lane) {
      setStep("review");
      setAttempted(false);
      setTouched({});
      setError(null);
    }
  }, [lane]);

  const tasks = lane === "ongoing" ? ongoingTasks : oneOffTasks;
  const ongoingTotal = getOngoingMonthlyTotal();
  const contactErrors = validateContact(contact);
  const canSend = Object.keys(contactErrors).length === 0;

  const handleNext = () => setStep("contact");
  const handleBack = () => setStep("review");

  const handleSend = async () => {
    if (!lane) return;
    setAttempted(true);
    if (!canSend) return;
    setStep("sending");

    const snapshots = tasks.map((task) => snapshotTask(task));
    const payload =
      lane === "ongoing"
        ? buildOngoingPayload({
            tasks: snapshots,
            contact,
            ongoingMonthlyTotal: ongoingTotal,
          })
        : buildOneOffPayload({ tasks: snapshots, contact });

    const result = await submitBasket(payload);
    if (result.ok) {
      clearLane(lane);
      setStep("done");
    } else {
      setError(result.error);
      setStep("error");
    }
  };

  const handleContactChange = (fieldId: IntakeFieldId, value: string) => {
    setContact((prev) => ({ ...prev, [fieldId]: value }));
  };
  const handleContactBlur = (fieldId: IntakeFieldId) => {
    setTouched((prev) => ({ ...prev, [fieldId]: true }));
  };

  return (
    <Dialog open={!!lane} onOpenChange={onOpenChange}>
      {lane && (
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
              {lane === "ongoing" ? "Start subscription" : "Request a quote"}
            </span>
            <DialogTitle>
              {step === "done"
                ? "Thanks — we've got it."
                : lane === "ongoing"
                  ? `Review your subscription · ${formatAud(ongoingTotal)}/mo`
                  : `Review your quote request · ${tasks.length} task${tasks.length === 1 ? "" : "s"}`}
            </DialogTitle>
            <DialogDescription>
              {step === "review" &&
                "Check the basket, then add your contact details on the next step."}
              {step === "contact" && "How should the team get back to you?"}
              {step === "sending" && "Sending through to the Yoonet crew…"}
              {step === "done" &&
                "Ben's team will be in touch within one business day."}
              {step === "error" &&
                "Submission didn't land. You can retry without losing your basket."}
            </DialogDescription>
          </DialogHeader>

          {step === "review" && (
            <DialogBody>
              <div className="flex flex-col gap-3">
                {tasks.map((task) => (
                  <TaskSummary key={task.id} task={task} />
                ))}
              </div>
              {lane === "ongoing" && (
                <div className="mt-6 rounded-2xl bg-primary/10 p-5 text-foreground">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                    Monthly total
                  </p>
                  <p className="mt-1 font-[family-name:var(--font-display)] text-3xl font-extrabold">
                    {formatAud(ongoingTotal)}/mo
                  </p>
                  <p className="mt-1 text-[13px] text-foreground/65">
                    Charged monthly in advance. Ad spend and third-party licence
                    fees are billed direct to the platform.
                  </p>
                </div>
              )}
            </DialogBody>
          )}

          {step === "contact" && (
            <DialogBody>
              <form
                className="flex flex-col gap-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
              >
                {CONTACT_FIELDS.map((fieldId) => {
                  const schema = INTAKE_FIELDS[fieldId];
                  if (!schema) return null;
                  const value = contact[fieldId as keyof ContactPayload] ?? "";
                  const shouldShow =
                    (touched[fieldId] || attempted) && contactErrors[fieldId];
                  return (
                    <div key={fieldId} className="flex flex-col gap-1.5">
                      <Label htmlFor={fieldId} required={schema.required}>
                        {schema.label}
                      </Label>
                      <Input
                        id={fieldId}
                        type={schema.kind === "email" ? "email" : schema.kind === "tel" ? "tel" : "text"}
                        value={value}
                        onChange={(e) =>
                          handleContactChange(fieldId, e.target.value)
                        }
                        onBlur={() => handleContactBlur(fieldId)}
                      />
                      {shouldShow && (
                        <p className="text-[12px] font-medium text-destructive">
                          {contactErrors[fieldId]}
                        </p>
                      )}
                    </div>
                  );
                })}
              </form>
            </DialogBody>
          )}

          {step === "sending" && (
            <DialogBody>
              <div className="flex items-center justify-center py-10 text-foreground/70">
                <div className="flex flex-col items-center gap-3">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
                  <p className="text-[14px]">Sending…</p>
                </div>
              </div>
            </DialogBody>
          )}

          {step === "done" && (
            <DialogBody>
              <div className="flex flex-col items-center gap-4 py-8 text-center">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent text-foreground">
                  <CheckCircle2 className="h-7 w-7" />
                </span>
                <div className="flex flex-col gap-1">
                  <p className="font-[family-name:var(--font-display)] text-xl font-extrabold">
                    Submission received
                  </p>
                  <p className="text-[14px] text-foreground/65">
                    We'll email{" "}
                    <span className="font-semibold text-foreground">
                      {contact.contactEmail}
                    </span>{" "}
                    to kick off next steps.
                  </p>
                </div>
              </div>
            </DialogBody>
          )}

          {step === "error" && (
            <DialogBody>
              <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-5">
                <p className="font-[family-name:var(--font-display)] text-[15px] font-extrabold text-foreground">
                  {error?.kind === "network"
                    ? "Network error"
                    : error?.kind === "rate-limit"
                      ? "Too many submissions"
                      : "Submission failed"}
                </p>
                <p className="mt-1 text-[13px] text-foreground/70">
                  {error?.message ?? "Something went wrong. Please try again."}
                </p>
              </div>
            </DialogBody>
          )}

          <DialogFooter>
            {step === "review" && (
              <>
                <DialogClose asChild>
                  <Button variant="ghost" size="sm">
                    Cancel
                  </Button>
                </DialogClose>
                <Button size="sm" onClick={handleNext}>
                  Continue to contact
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </>
            )}
            {step === "contact" && (
              <>
                <Button variant="ghost" size="sm" onClick={handleBack}>
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
                <Button size="sm" onClick={handleSend}>
                  <Send className="h-4 w-4" />
                  Send
                </Button>
              </>
            )}
            {step === "sending" && (
              <Button variant="ghost" size="sm" disabled>
                Sending…
              </Button>
            )}
            {step === "done" && (
              <DialogClose asChild>
                <Button size="sm">Close</Button>
              </DialogClose>
            )}
            {step === "error" && (
              <>
                <DialogClose asChild>
                  <Button variant="ghost" size="sm">
                    Close
                  </Button>
                </DialogClose>
                <Button size="sm" onClick={handleSend}>
                  <Send className="h-4 w-4" />
                  Retry
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
}
