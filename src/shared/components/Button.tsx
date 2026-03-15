import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  icon?: ReactNode;
}

export function Button({
  children,
  className,
  icon,
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  const variantClasses = {
    primary:
      "border border-[rgba(111,127,255,0.32)] bg-[linear-gradient(135deg,#3250de_0%,#566ef0_52%,#7a80ff_100%)] text-white shadow-[0_18px_36px_rgba(77,102,223,0.28)] hover:not-disabled:shadow-[0_22px_42px_rgba(77,102,223,0.34)]",
    secondary:
      "border border-[rgba(110,126,255,0.22)] bg-[rgba(255,255,255,0.9)] text-info shadow-[0_14px_28px_rgba(92,112,208,0.14)] hover:not-disabled:bg-[rgba(248,250,255,0.98)]",
    ghost:
      "border border-[rgba(213,221,255,0.9)] bg-[rgba(244,247,255,0.72)] text-ink-soft hover:not-disabled:bg-[rgba(255,255,255,0.88)]"
  };

  return (
    <button
      {...props}
      type={type}
      className={cn(
        "inline-flex min-h-[3.3rem] items-center justify-center gap-[0.55rem] rounded-full px-[1.45rem] py-[0.9rem] text-[0.98rem] font-semibold tracking-[0.01em] transition-[transform,box-shadow,background-color,color,border-color] duration-150 ease-out hover:not-disabled:-translate-y-px disabled:cursor-not-allowed disabled:border-[rgba(209,216,241,0.95)] disabled:bg-[rgba(234,239,252,0.98)] disabled:text-[rgba(83,96,140,0.92)] disabled:shadow-none disabled:[background-image:none]",
        variantClasses[variant],
        className
      )}
    >
      {icon ? <span className="inline-flex">{icon}</span> : null}
      <span>{children}</span>
    </button>
  );
}
