import * as React from "react";
import { cn } from "@/lib/utils";

function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-[1.5rem] border border-foreground/10 bg-card text-foreground shadow-[var(--shadow-card)]",
        className,
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col gap-2 p-6 md:p-7", className)} {...props} />
  );
}

function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-1 flex-col gap-4 px-6 pb-6 md:px-7 md:pb-7", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 border-t border-foreground/10 px-6 py-5 md:px-7",
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "font-[family-name:var(--font-display)] text-xl font-extrabold tracking-tight text-foreground",
        className,
      )}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-[14px] leading-relaxed text-foreground/65", className)}
      {...props}
    />
  );
}

export { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription };
