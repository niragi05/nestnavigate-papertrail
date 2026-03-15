import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

interface BannerProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  icon?: ReactNode;
}

export function Banner({ title, children, className, icon, ...props }: BannerProps) {
  return (
    <div
      {...props}
      className={cn(
        "rounded-[28px] border border-[rgba(149,165,255,0.2)] bg-[linear-gradient(180deg,rgba(247,249,255,0.98),rgba(236,241,255,0.94))] px-[1.2rem] py-[1.1rem] shadow-soft",
        className
      )}
    >
      <div className="inline-flex items-center gap-[0.55rem] text-ink-strong">
        {icon ? <span className="inline-flex">{icon}</span> : null}
        <strong className="font-semibold">{title}</strong>
      </div>
      <div className="mt-[0.45rem] leading-[1.55] text-ink-soft">{children}</div>
    </div>
  );
}
