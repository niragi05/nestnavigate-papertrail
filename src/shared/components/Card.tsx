import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  tone?: "paper" | "sage" | "spotlight";
}

export function Card({ children, className, tone = "paper", ...props }: CardProps) {
  const toneClasses = {
    paper:
      "bg-[linear-gradient(180deg,rgba(255,255,255,0.97),rgba(246,248,255,0.94))]",
    sage:
      "bg-[linear-gradient(180deg,rgba(250,252,255,0.98),rgba(236,241,255,0.94))]",
    spotlight:
      "bg-[linear-gradient(180deg,#3451df_0%,#5870ef_55%,#7c84ff_100%)] text-white"
  };

  return (
    <div
      {...props}
      className={cn(
        "relative overflow-hidden rounded-[34px] border border-[rgba(224,230,255,0.96)] shadow-card backdrop-blur-[18px]",
        toneClasses[tone],
        className
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0",
          tone === "spotlight"
            ? "bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.2),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.12),transparent_72%)]"
            : "bg-[linear-gradient(150deg,rgba(255,255,255,0.72),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.42),transparent_78%)]"
        )}
      />
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}
