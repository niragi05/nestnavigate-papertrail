import { Card } from "@/shared/components/Card";
import type { SprintResult } from "@/features/paperTrailSprint/state/types";

interface ScoreSummaryProps {
  result: SprintResult;
  attemptCount: number;
}

export function ScoreSummary({ result, attemptCount }: ScoreSummaryProps) {
  const metrics = [
    { label: "Score", value: `${result.score}` },
    { label: "Accuracy", value: `${result.accuracyPercent}%` },
    { label: "Correct", value: `${result.correctCount}` },
    { label: "Incorrect", value: `${result.incorrectCount}` }
  ];

  return (
    <Card className="p-[1.45rem]">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="m-0 font-display text-[1.18rem] font-semibold text-ink-strong">Round breakdown</h2>
        <span className="rounded-full border border-[rgba(218,225,255,0.9)] bg-[rgba(244,247,255,0.92)] px-[0.75rem] py-[0.35rem] text-[0.82rem] font-medium text-info">
          {attemptCount > 0 ? `Retry #${attemptCount}` : "First attempt"}
        </span>
      </div>
      <div className="mt-[1rem] grid gap-[0.85rem] min-[520px]:grid-cols-[repeat(auto-fit,minmax(140px,1fr))]">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-[24px] border border-[rgba(223,229,255,0.95)] bg-[rgba(255,255,255,0.95)] p-[1rem] shadow-[0_12px_24px_rgba(92,112,208,0.1)]"
          >
            <span className="block text-[0.8rem] font-medium uppercase tracking-[0.08em] text-ink-soft">
              {metric.label}
            </span>
            <strong className="mt-[0.45rem] block font-display text-[1.6rem] font-semibold text-ink-strong">
              {metric.value}
            </strong>
          </div>
        ))}
      </div>
    </Card>
  );
}
