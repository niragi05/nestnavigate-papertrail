import { motion } from "motion/react";
import type { DocumentCard as SprintDocumentCard } from "@/features/paperTrailSprint/state/types";
import { DocumentCard } from "@/features/paperTrailSprint/components/DocumentCard";
import { eyebrowClass } from "@/shared/styles/patterns";

interface DocumentTrayProps {
  cards: SprintDocumentCard[];
  selectedCardId: string | null;
  highlightCards: boolean;
  onSelectCard: (cardId: string) => void;
  onDragStart: (cardId: string) => void;
  onDragEnd: () => void;
}

export function DocumentTray({
  cards,
  selectedCardId,
  highlightCards,
  onSelectCard,
  onDragStart,
  onDragEnd
}: DocumentTrayProps) {
  return (
    <section
      className="grid h-full grid-rows-[auto_minmax(0,1fr)] content-start gap-4 rounded-[32px] border border-[rgba(223,229,255,0.95)] bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(241,245,255,0.94))] p-4 shadow-card backdrop-blur-[18px]"
      aria-labelledby="document-tray-heading"
    >
      <div className="flex flex-wrap items-end justify-between gap-4 px-2 pt-2 min-[720px]:px-4">
        <div>
          <p className={eyebrowClass}>Document tray</p>
          <h2
            id="document-tray-heading"
            className="mt-[0.45rem] mb-0 font-display text-[1.18rem] leading-[1.25] text-ink-strong"
          >
            Pick up each paper tile and match it to the right stage.
          </h2>
        </div>
        <span className="rounded-full border border-[rgba(216,223,255,0.95)] bg-[rgba(244,247,255,0.92)] px-[0.9rem] py-[0.45rem] text-[0.82rem] font-semibold text-info">
          {cards.length} unplaced
        </span>
      </div>

      <motion.div
        layout
        className="grid min-h-0 max-h-[calc(100vh-300px)] content-start gap-[0.95rem] overflow-y-auto rounded-[26px] bg-[radial-gradient(circle_at_top,rgba(235,240,255,0.8),transparent_38%),rgba(247,249,255,0.86)] p-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04, duration: 0.22 }}
          >
            <DocumentCard
              card={card}
              isSelected={selectedCardId === card.id}
              isAttentionNeeded={highlightCards}
              onSelect={onSelectCard}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
