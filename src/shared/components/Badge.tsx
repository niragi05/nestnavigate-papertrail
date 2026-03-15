import type { HTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: "neutral" | "success" | "warning" | "accent";
}

export function Badge({ children, className, tone = "neutral", ...props }: BadgeProps) {
  const toneClasses = {
    neutral: "border border-[rgba(218,225,255,0.88)] bg-[rgba(244,247,255,0.92)] text-ink-soft",
    success: "border border-[rgba(150,168,255,0.24)] bg-[rgba(238,243,255,0.92)] text-info",
    warning: "border border-[rgba(245,202,101,0.35)] bg-[rgba(255,241,206,0.88)] text-warning",
    accent: "border border-[rgba(153,169,255,0.24)] bg-[rgba(236,240,255,0.94)] text-info"
  };

  return (
    <span
      {...props}
      className={cn(
        "inline-flex items-center gap-[0.4rem] rounded-full px-[0.9rem] py-[0.44rem] text-[0.8rem] font-semibold tracking-[0.02em] backdrop-blur-[10px]",
        toneClasses[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
