import type { DocumentCard, SprintScenario, SprintState } from "@/features/paperTrailSprint/state/types";

export function buildSolvedPlacements(scenario: SprintScenario) {
  return scenario.documentCards.reduce<Record<string, string | null>>((placements, card) => {
    placements[card.id] = card.correctBucketId;
    return placements;
  }, {});
}

export function selectRemainingCardCount(state: SprintState) {
  return Object.values(state.placements).filter((placement) => !placement).length;
}

export function selectUnplacedCards(state: SprintState): DocumentCard[] {
  if (!state.scenario) {
    return [];
  }

  return state.scenario.documentCards.filter((card) => !state.placements[card.id]);
}

export function selectBucketCards(state: SprintState, bucketId: string): DocumentCard[] {
  if (!state.scenario) {
    return [];
  }

  return state.scenario.documentCards.filter((card) => state.placements[card.id] === bucketId);
}

export function selectCardById(state: SprintState, cardId: string) {
  return state.scenario?.documentCards.find((card) => card.id === cardId) ?? null;
}

export function selectBucketLabel(state: SprintState, bucketId: string | null) {
  if (!bucketId) {
    return "Not placed";
  }

  return state.scenario?.stageBuckets.find((bucket) => bucket.id === bucketId)?.label ?? "Unknown stage";
}
