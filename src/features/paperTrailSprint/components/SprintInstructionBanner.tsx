import { Banner } from "@/shared/components/Banner";

interface SprintInstructionBannerProps {
  selectedCardTitle: string | null;
  remainingCount: number;
}

export function SprintInstructionBanner({
  selectedCardTitle,
  remainingCount
}: SprintInstructionBannerProps) {
  return (
    <Banner title="How to play">
      {selectedCardTitle
        ? `${selectedCardTitle} is picked up. Choose a folder to place it.`
        : `${remainingCount} documents still need a home. Drag a card, tap a card then a folder, or use Enter to pick up and place.`}
    </Banner>
  );
}
