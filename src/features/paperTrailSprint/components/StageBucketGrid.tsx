import type { SprintState } from "@/features/paperTrailSprint/state/types";
import { selectBucketCards } from "@/features/paperTrailSprint/state/selectors";
import { StageBucket } from "@/features/paperTrailSprint/components/StageBucket";
import { eyebrowClass } from "@/shared/styles/patterns";

interface StageBucketGridProps {
  state: SprintState;
  selectedCardId: string | null;
  dragOverBucketId: string | null;
  readOnly?: boolean;
  onPlaceSelectedCard: (bucketId: string) => void;
  onSelectCard: (cardId: string) => void;
  onRemoveCard: (cardId: string) => void;
  onDropCard: (bucketId: string, cardId: string) => void;
  onDragEnter: (bucketId: string) => void;
  onDragLeave: () => void;
}

export function StageBucketGrid({
  state,
  selectedCardId,
  dragOverBucketId,
  readOnly = false,
  onPlaceSelectedCard,
  onSelectCard,
  onRemoveCard,
  onDropCard,
  onDragEnter,
  onDragLeave
}: StageBucketGridProps) {
  if (!state.scenario) {
    return null;
  }

  return (
    <section className="grid h-full grid-rows-[auto_1fr] gap-4" aria-labelledby="folder-grid-heading">
      <div className="grid gap-[0.45rem] px-1 pt-3">
        <p className={eyebrowClass}>Stage folders</p>
        <h2
          id="folder-grid-heading"
          className="m-0 font-display text-[1.18rem] leading-[1.28] text-ink-strong"
        >
          Match each document to the moment when it becomes most relevant.
        </h2>
      </div>

      <div className="grid h-full grid-cols-1 items-stretch gap-4 min-[720px]:grid-cols-2 min-[1280px]:grid-cols-4">
        {state.scenario.stageBuckets.map((bucket) => (
          <StageBucket
            key={bucket.id}
            bucket={bucket}
            cards={selectBucketCards(state, bucket.id)}
            selectedCardId={selectedCardId}
            dragOver={dragOverBucketId === bucket.id}
            readOnly={readOnly}
            onPlaceSelectedCard={onPlaceSelectedCard}
            onSelectCard={onSelectCard}
            onRemoveCard={onRemoveCard}
            onDropCard={onDropCard}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
          />
        ))}
      </div>
    </section>
  );
}
