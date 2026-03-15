import { motion } from "motion/react";
import type { KeyboardEvent, MouseEvent } from "react";
import type { DocumentCard as SprintDocumentCard } from "@/features/paperTrailSprint/state/types";
import { cn } from "@/shared/lib/cn";

interface DocumentCardProps {
  card: SprintDocumentCard;
  isSelected: boolean;
  isAttentionNeeded?: boolean;
  isPlaced?: boolean;
  draggable?: boolean;
  compact?: boolean;
  readOnly?: boolean;
  statusLabel?: string;
  onSelect?: (cardId: string) => void;
  onRemove?: (cardId: string) => void;
  onDragStart?: (cardId: string) => void;
  onDragEnd?: () => void;
}

export function DocumentCard({
  card,
  isSelected,
  isAttentionNeeded = false,
  isPlaced = false,
  draggable = true,
  compact = false,
  readOnly = false,
  statusLabel,
  onSelect,
  onRemove,
  onDragStart,
  onDragEnd
}: DocumentCardProps) {
  const cardClasses = cn(
    "relative grid w-full gap-[0.72rem] rounded-[26px] border border-[rgba(223,229,255,0.95)] bg-[linear-gradient(180deg,rgba(255,255,255,0.99),rgba(246,248,255,0.96))] px-[1rem] pt-[1rem] pb-[0.95rem] text-left shadow-[0_14px_30px_rgba(92,112,208,0.12)]",
    compact && "gap-[0.6rem] px-[0.9rem] py-[0.92rem]",
    isSelected &&
      "border-[rgba(107,126,255,0.44)] bg-[linear-gradient(180deg,rgba(255,255,255,1),rgba(238,243,255,0.98))] shadow-[0_18px_34px_rgba(92,112,208,0.18)]",
    isPlaced &&
      "bg-[linear-gradient(180deg,rgba(251,252,255,0.99),rgba(239,244,255,0.96))]",
    isAttentionNeeded && "border-[rgba(245,195,85,0.48)] shadow-[0_0_0_4px_rgba(255,240,204,0.8)]"
  );

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (!onSelect) {
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();
      onSelect(card.id);
    }
  }

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    if (!onSelect) {
      return;
    }

    event.stopPropagation();
    onSelect(card.id);
  }

  const cardContent = (
    <>
      <span
        className="absolute top-[0.8rem] right-[0.9rem] h-[28px] w-[28px] rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.95),rgba(156,196,255,0.84)_55%,rgba(113,132,255,0.94))] shadow-[0_8px_18px_rgba(116,141,255,0.24)]"
        aria-hidden="true"
      />
      <span className="flex items-start justify-between gap-[0.7rem] pr-[2rem]">
        <span className="font-display font-semibold leading-[1.24] text-ink-strong">{card.title}</span>
        {statusLabel ? (
          <span className="shrink-0 rounded-full border border-[rgba(218,225,255,0.9)] bg-[rgba(244,247,255,0.92)] px-[0.55rem] py-[0.22rem] text-[0.72rem] font-medium text-info">
            {statusLabel}
          </span>
        ) : null}
      </span>
      <span className="text-[0.92rem] leading-[1.5] text-ink-soft">{card.shortDescription}</span>
      <span className="text-[0.82rem] font-medium text-warning">{card.lessonTieIn}</span>
    </>
  );

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16, rotate: -1 }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: isSelected ? -0.8 : 0,
        scale: isSelected ? 1.015 : 1
      }}
      whileHover={readOnly ? undefined : { y: -3, rotate: compact ? 0 : -0.3 }}
      transition={{ type: "spring", stiffness: 240, damping: 22 }}
    >
      {readOnly ? (
        <div className={cardClasses} aria-label={`${card.title}. ${card.shortDescription}`} role="article">
          {cardContent}
        </div>
      ) : (
        <button
          type="button"
          className={cardClasses}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          draggable={draggable}
          onDragStart={(event) => {
            event.dataTransfer.setData("text/plain", card.id);
            event.dataTransfer.effectAllowed = "move";
            onDragStart?.(card.id);
          }}
          onDragEnd={onDragEnd}
          aria-pressed={isSelected}
          aria-label={`${card.title}. ${card.shortDescription}`}
        >
          {cardContent}
        </button>
      )}

      {onRemove && !readOnly ? (
        <button
          type="button"
          className="mt-[0.5rem] ml-[0.25rem] border-0 bg-transparent text-[0.84rem] font-medium text-info"
          onClick={(event) => {
            event.stopPropagation();
            onRemove(card.id);
          }}
        >
          Return to tray
        </button>
      ) : null}
    </motion.div>
  );
}
