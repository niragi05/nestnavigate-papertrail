import type { AttemptFeedback, SprintResult, SprintScenario } from "@/features/paperTrailSprint/state/types";

export function areAllCardsPlaced(placements: Record<string, string | null>, cardIds: string[]) {
  return cardIds.every((id) => Boolean(placements[id]));
}

export function evaluateAttempt(
  scenario: SprintScenario,
  placements: Record<string, string | null>,
  isRetry: boolean
): SprintResult {
  const feedback: AttemptFeedback[] = scenario.documentCards.map((card) => {
    const selectedBucketId = placements[card.id] ?? null;
    const isCorrect = selectedBucketId === card.correctBucketId;

    return {
      cardId: card.id,
      selectedBucketId,
      correctBucketId: card.correctBucketId,
      isCorrect,
      explanation: card.explanation
    };
  });

  const correctCount = feedback.filter((item) => item.isCorrect).length;
  const incorrectCount = feedback.length - correctCount;
  const accuracyPercent = Math.round((correctCount / feedback.length) * 100);
  const score = correctCount * 10;
  const perfectRun = correctCount === feedback.length;

  let coinsEarned =
    scenario.rewardRule.baseCoins +
    correctCount * 3 +
    (perfectRun ? scenario.rewardRule.perfectBonusCoins : 0);

  if (isRetry) {
    coinsEarned = Math.min(coinsEarned, scenario.rewardRule.retryCoinCap);
  }

  return {
    scenarioId: scenario.id,
    score,
    accuracyPercent,
    correctCount,
    incorrectCount,
    coinsEarned,
    perfectRun,
    feedback,
    completedAt: new Date().toISOString()
  };
}
