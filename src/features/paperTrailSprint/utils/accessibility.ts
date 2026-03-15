import type { SprintScenario } from "@/features/paperTrailSprint/state/types";

export function getCardAriaLabel(title: string, description: string) {
  return `${title}. ${description}`;
}

export function getBucketAriaLabel(label: string, description: string) {
  return `${label}. ${description}`;
}

export function getPlacementAnnouncement(cardTitle: string, bucketLabel: string) {
  return `${cardTitle} placed in ${bucketLabel}.`;
}

export function getRemainingAnnouncement(remainingCount: number) {
  if (remainingCount === 0) {
    return "All documents placed. Submit is now available.";
  }

  return `${remainingCount} documents still need a folder.`;
}

export function getResultAnnouncement(scenario: SprintScenario, accuracyPercent: number) {
  return `${scenario.title} completed. Accuracy ${accuracyPercent} percent.`;
}
