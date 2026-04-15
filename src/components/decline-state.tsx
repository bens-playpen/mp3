import { AlertTriangle, Info, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "floor-below" | "service-boundary" | "empty-basket";

interface DeclineStateProps {
  variant: Variant;
  title?: string;
  message?: string;
  boundaries?: string[];
  className?: string;
}

const PRESETS: Record<
  Variant,
  { title: string; message: string; tone: string; icon: typeof AlertTriangle }
> = {
  "floor-below": {
    title: "Subscription minimum not met",
    message:
      "Subscriptions start at $600/mo so the team has room to deliver properly. Add more services — or pick a bigger container — to unlock the subscribe button.",
    tone: "border-secondary/30 bg-secondary/10 text-foreground",
    icon: AlertTriangle,
  },
  "service-boundary": {
    title: "Here's what this service does NOT cover",
    message:
      "Decline is a feature. If you need something outside the list, the system will ask you to decompose it into defined services instead.",
    tone: "border-foreground/15 bg-background text-foreground/80",
    icon: ShieldAlert,
  },
  "empty-basket": {
    title: "Start with the menu, not a brief",
    message:
      "Pick a service and pick a request type. Everything in the marketplace is in a defined container, so the team can deliver without a discovery call.",
    tone: "border-foreground/15 bg-card text-foreground/70",
    icon: Info,
  },
};

export function DeclineState({
  variant,
  title,
  message,
  boundaries,
  className,
}: DeclineStateProps) {
  const preset = PRESETS[variant];
  const Icon = preset.icon;
  return (
    <div
      role="note"
      className={cn(
        "flex flex-col gap-3 rounded-2xl border p-5",
        preset.tone,
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-foreground/5 text-foreground">
          <Icon className="h-4 w-4" strokeWidth={2.25} />
        </span>
        <div className="flex flex-col gap-1">
          <h4 className="font-[family-name:var(--font-display)] text-[15px] font-extrabold leading-snug">
            {title ?? preset.title}
          </h4>
          <p className="text-[13px] leading-relaxed text-foreground/70">
            {message ?? preset.message}
          </p>
        </div>
      </div>
      {boundaries && boundaries.length > 0 && (
        <ul className="mt-1 flex flex-col gap-1.5 border-t border-foreground/10 pt-3 text-[13px] text-foreground/70">
          {boundaries.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-[7px] h-1 w-2 shrink-0 rounded-full bg-foreground/40" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
