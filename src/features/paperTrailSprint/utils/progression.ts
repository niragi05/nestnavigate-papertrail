import {
  getScenarioById,
  orderedSprintScenarioIds,
  orderedSprintScenarios
} from "@/features/paperTrailSprint/data/scenarios";
import type { ScenarioAccess, SprintProgress } from "@/features/paperTrailSprint/state/types";

function orderScenarioIds(ids: Iterable<string>) {
  const idSet = new Set(ids);
  return orderedSprintScenarioIds.filter((id) => idSet.has(id));
}

export function createInitialProgress(): SprintProgress {
  return {
    unlockedScenarioIds: [orderedSprintScenarioIds[0]],
    completedScenarioIds: [],
    perfectScenarioIds: [],
    earnedCoins: 0
  };
}

export function getNextScenarioId(scenarioId: string) {
  const index = orderedSprintScenarioIds.indexOf(scenarioId);

  if (index === -1 || index === orderedSprintScenarioIds.length - 1) {
    return null;
  }

  return orderedSprintScenarioIds[index + 1];
}

export function isScenarioUnlocked(progress: SprintProgress, scenarioId: string) {
  return progress.unlockedScenarioIds.includes(scenarioId);
}

export function isScenarioCompleted(progress: SprintProgress, scenarioId: string) {
  return progress.completedScenarioIds.includes(scenarioId);
}

export function isScenarioPerfected(progress: SprintProgress, scenarioId: string) {
  return progress.perfectScenarioIds.includes(scenarioId);
}

export function buildScenarioAccessList(progress: SprintProgress): ScenarioAccess[] {
  return orderedSprintScenarios.map((scenario, index) => {
    const isUnlocked = isScenarioUnlocked(progress, scenario.id);
    const isCompleted = isScenarioCompleted(progress, scenario.id);
    const isPerfected = isScenarioPerfected(progress, scenario.id);
    const previousScenarioId = index > 0 ? orderedSprintScenarioIds[index - 1] : null;
    const previousUnlocked = previousScenarioId
      ? isScenarioUnlocked(progress, previousScenarioId)
      : true;

    let statusLabel: ScenarioAccess["statusLabel"] = "Locked";
    let lockedReason: string | null = "Unlock the earlier file set first.";

    if (isPerfected) {
      statusLabel = "Perfected";
      lockedReason = null;
    } else if (isCompleted) {
      statusLabel = "Cleared";
      lockedReason = null;
    } else if (isUnlocked) {
      statusLabel = "Available";
      lockedReason = null;
    } else if (previousUnlocked && previousScenarioId) {
      statusLabel = "Perfect to unlock";
      lockedReason = `Earn 100% on ${getScenarioById(previousScenarioId)?.title.replace(
        "Paper Trail Sprint: ",
        ""
      )} to unlock this round.`;
    }

    return {
      scenario,
      isUnlocked,
      isCompleted,
      isPerfected,
      statusLabel,
      lockedReason
    };
  });
}

export function getScenarioAccess(progress: SprintProgress, scenarioId: string) {
  return buildScenarioAccessList(progress).find((access) => access.scenario.id === scenarioId) ?? null;
}

export function applyProgressFromResult(
  progress: SprintProgress,
  scenarioId: string,
  perfectRun: boolean
) {
  const completedScenarioIds = new Set(progress.completedScenarioIds);
  const perfectScenarioIds = new Set(progress.perfectScenarioIds);
  const unlockedScenarioIds = new Set(progress.unlockedScenarioIds);
  const newlyUnlockedScenarioIds: string[] = [];

  completedScenarioIds.add(scenarioId);

  if (perfectRun) {
    perfectScenarioIds.add(scenarioId);
    const nextScenarioId = getNextScenarioId(scenarioId);

    if (nextScenarioId && !unlockedScenarioIds.has(nextScenarioId)) {
      unlockedScenarioIds.add(nextScenarioId);
      newlyUnlockedScenarioIds.push(nextScenarioId);
    }
  }

  return {
    progress: {
      unlockedScenarioIds: orderScenarioIds(unlockedScenarioIds),
      completedScenarioIds: orderScenarioIds(completedScenarioIds),
      perfectScenarioIds: orderScenarioIds(perfectScenarioIds),
      earnedCoins: progress.earnedCoins
    },
    newlyUnlockedScenarioIds
  };
}

export function applyRewardToProgress(progress: SprintProgress, coinsEarned: number): SprintProgress {
  return {
    ...progress,
    earnedCoins: progress.earnedCoins + coinsEarned
  };
}
