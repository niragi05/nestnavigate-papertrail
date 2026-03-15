import { Badge } from "@/shared/components/Badge";
import type { AttemptFeedback, SprintScenario } from "@/features/paperTrailSprint/state/types";

interface FeedbackItemProps {
  item: AttemptFeedback;
  scenario: SprintScenario;
}

export function FeedbackItem({ item, scenario }: FeedbackItemProps) {
  const card = scenario.documentCards.find((document) => document.id === item.cardId);
  const selectedLabel =
    scenario.stageBuckets.find((bucket) => bucket.id === item.selectedBucketId)?.label ?? "Not placed";
  const correctLabel =
    scenario.stageBuckets.find((bucket) => bucket.id === item.correctBucketId)?.label ?? "Unknown stage";

  return (
    <article className="rounded-[28px] border border-[rgba(223,229,255,0.95)] bg-[linear-gradient(180deg,rgba(255,255,255,0.97),rgba(244,247,255,0.94))] p-[1.2rem] shadow-soft">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="m-0 font-display text-[1rem] font-semibold text-ink-strong">
            {card?.title ?? "Document"}
          </h3>
          <p className="mt-[0.35rem] mb-0 leading-[1.55] text-ink-soft">
            You placed it in <strong>{selectedLabel}</strong>. The best fit was{" "}
            <strong>{correctLabel}</strong>.
          </p>
        </div>
        <Badge tone={item.isCorrect ? "success" : "warning"}>
          {item.isCorrect ? "Correct" : "Review this one"}
        </Badge>
      </div>
      <p className="mt-[0.85rem] mb-0 leading-[1.6] text-ink-strong">{item.explanation}</p>
      {card ? (
        <p className="mt-[0.65rem] mb-0 text-[0.9rem] font-medium text-warning">{card.lessonTieIn}</p>
      ) : null}
    </article>
  );
}
