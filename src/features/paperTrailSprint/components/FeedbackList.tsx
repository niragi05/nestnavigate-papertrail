import type { SprintResult, SprintScenario } from "@/features/paperTrailSprint/state/types";
import { FeedbackItem } from "@/features/paperTrailSprint/components/FeedbackItem";
import { eyebrowClass } from "@/shared/styles/patterns";

interface FeedbackListProps {
  scenario: SprintScenario;
  result: SprintResult;
}

export function FeedbackList({ scenario, result }: FeedbackListProps) {
  return (
    <section className="grid gap-4" aria-labelledby="feedback-list-heading">
      <div className="grid gap-[0.45rem]">
        <p className={eyebrowClass}>What each document was teaching</p>
        <h2
          id="feedback-list-heading"
          className="m-0 font-display text-[1.18rem] font-semibold text-ink-strong"
        >
          Practical explanations, one paper at a time.
        </h2>
      </div>

      <div className="grid gap-[0.85rem]">
        {result.feedback.map((item) => (
          <FeedbackItem key={item.cardId} item={item} scenario={scenario} />
        ))}
      </div>
    </section>
  );
}
