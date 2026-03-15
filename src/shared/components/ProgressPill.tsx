import { cn } from "@/shared/lib/cn";

interface ProgressPillProps {
  label: string;
  value: string;
}

export function ProgressPill({ label, value }: ProgressPillProps) {
  return (
    <div
      className={cn(
        "inline-flex items-baseline gap-[0.55rem] rounded-full border border-[rgba(223,229,255,0.95)] bg-[rgba(255,255,255,0.92)] px-[1rem] py-[0.74rem] shadow-[0_10px_24px_rgba(92,112,208,0.12)]"
      )}
    >
      <span className="text-[0.8rem] font-medium text-ink-soft">{label}</span>
      <strong className="text-[0.96rem] font-semibold text-ink-strong">{value}</strong>
    </div>
  );
}
