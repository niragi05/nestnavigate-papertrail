import { motion } from "motion/react";
import type { DocumentCard as SprintDocumentCard, StageBucket as SprintStageBucket } from "@/features/paperTrailSprint/state/types";
import { DocumentCard } from "@/features/paperTrailSprint/components/DocumentCard";
import { cn } from "@/shared/lib/cn";

interface StageBucketProps {
  bucket: SprintStageBucket;
  cards: SprintDocumentCard[];
  selectedCardId: string | null;
  dragOver: boolean;
  readOnly?: boolean;
  onPlaceSelectedCard: (bucketId: string) => void;
  onSelectCard: (cardId: string) => void;
  onRemoveCard: (cardId: string) => void;
  onDropCard: (bucketId: string, cardId: string) => void;
  onDragEnter: (bucketId: string) => void;
  onDragLeave: () => void;
}

export function StageBucket({
  bucket,
  cards,
  selectedCardId,
  dragOver,
  readOnly = false,
  onPlaceSelectedCard,
  onSelectCard,
  onRemoveCard,
  onDropCard,
  onDragEnter,
  onDragLeave
}: StageBucketProps) {
  return (
    <motion.section
      layout
      className={cn(
        "relative grid h-full grid-rows-[auto_1fr] gap-4 rounded-[30px] border border-[rgba(223,229,255,0.95)] bg-[linear-gradient(180deg,rgba(255,255,255,0.97),rgba(242,246,255,0.95))] px-4 pt-[1.2rem] pb-[1rem] shadow-[0_18px_36px_rgba(92,112,208,0.13)] backdrop-blur-[14px]",
        !readOnly &&
          dragOver &&
          "translate-y-[-2px] border-[rgba(107,126,255,0.34)] shadow-[0_22px_44px_rgba(92,112,208,0.2),0_0_0_4px_rgba(213,220,255,0.9)]"
      )}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24 }}
      onDragOver={readOnly ? undefined : (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
      }}
      onDragEnter={readOnly ? undefined : () => onDragEnter(bucket.id)}
      onDragLeave={readOnly ? undefined : onDragLeave}
      onDrop={readOnly ? undefined : (event) => {
        event.preventDefault();
        const cardId = event.dataTransfer.getData("text/plain");
        onDropCard(bucket.id, cardId);
      }}
      onClick={readOnly ? undefined : () => onPlaceSelectedCard(bucket.id)}
      onKeyDown={readOnly ? undefined : (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onPlaceSelectedCard(bucket.id);
        }
      }}
      role={readOnly ? undefined : "button"}
      tabIndex={readOnly ? undefined : 0}
      aria-label={`${bucket.label}. ${bucket.description}`}
    >
      <div
        className="absolute top-[-0.85rem] left-4 flex h-[2.5rem] min-w-[2.5rem] items-center justify-center rounded-full border border-[rgba(150,168,255,0.2)] bg-[linear-gradient(180deg,#3752df_0%,#7181ff_100%)] px-[0.7rem] text-center text-[0.86rem] font-bold text-white shadow-[0_12px_24px_rgba(77,102,223,0.28)]"
        aria-hidden="true"
      >
        {bucket.order}
      </div>
      <div className="mt-[0.7rem] flex items-start justify-between gap-[0.7rem]">
        <div>
          <h3 className="m-0 font-display text-[1.04rem] font-semibold text-ink-strong">{bucket.label}</h3>
          <p className="mt-[0.35rem] mb-0 text-[0.9rem] leading-[1.48] text-ink-soft">
            {bucket.description}
          </p>
        </div>
        <span className="min-w-[2.3rem] rounded-full border border-[rgba(218,225,255,0.9)] bg-[rgba(245,248,255,0.94)] px-[0.6rem] py-[0.36rem] text-center text-[0.84rem] font-semibold text-info">
          {cards.length}
        </span>
      </div>

      <div
        className={cn(
          "grid h-full min-h-0 content-start gap-[0.8rem]",
          !cards.length && "grid-rows-[minmax(0,1fr)]"
        )}
      >
        {cards.length ? (
          cards.map((card) => (
            <DocumentCard
              key={card.id}
              card={card}
              compact
              isPlaced
              readOnly={readOnly}
              isSelected={selectedCardId === card.id}
              onSelect={readOnly ? undefined : onSelectCard}
              onRemove={readOnly ? undefined : onRemoveCard}
              onDragStart={readOnly ? undefined : () => onSelectCard(card.id)}
            />
          ))
        ) : (
          <div className="grid h-full min-h-[112px] place-items-center rounded-[24px] border border-dashed border-[rgba(160,177,255,0.45)] bg-[linear-gradient(180deg,rgba(247,249,255,0.92),rgba(239,244,255,0.92))] p-4 text-center text-[0.92rem] leading-[1.55] text-ink-soft">
            {readOnly
              ? "No documents belong in this stage for this round."
              : "Drop papers here or choose this folder after picking a card up."}
          </div>
        )}
      </div>
    </motion.section>
  );
}
