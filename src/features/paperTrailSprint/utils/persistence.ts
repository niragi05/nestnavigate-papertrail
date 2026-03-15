import { PROGRESS_STORAGE_KEY, STORAGE_KEY } from "@/features/paperTrailSprint/constants/ui";
import type { SprintProgress, SprintState } from "@/features/paperTrailSprint/state/types";
import { createInitialProgress } from "@/features/paperTrailSprint/utils/progression";

export function saveStateToStorage(state: SprintState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function restoreStateFromStorage(): SprintState | null {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return null;
  }

  return JSON.parse(raw) as SprintState;
}

export function clearStoredState() {
  localStorage.removeItem(STORAGE_KEY);
}

export function saveProgressToStorage(progress: SprintProgress) {
  localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
}

export function restoreProgressFromStorage(): SprintProgress | null {
  const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);

  if (!raw) {
    return null;
  }

  const parsed = JSON.parse(raw) as Partial<SprintProgress> | null;
  const fallback = createInitialProgress();
  const unlockedScenarioIds = normalizeScenarioIds(parsed?.unlockedScenarioIds, fallback.unlockedScenarioIds);

  return {
    unlockedScenarioIds: unlockedScenarioIds.length ? unlockedScenarioIds : fallback.unlockedScenarioIds,
    completedScenarioIds: normalizeScenarioIds(parsed?.completedScenarioIds, []),
    perfectScenarioIds: normalizeScenarioIds(parsed?.perfectScenarioIds, []),
    earnedCoins:
      typeof parsed?.earnedCoins === "number" && Number.isFinite(parsed.earnedCoins)
        ? Math.max(0, parsed.earnedCoins)
        : 0
  };
}

export function clearStoredProgress() {
  localStorage.removeItem(PROGRESS_STORAGE_KEY);
}

function normalizeScenarioIds(value: unknown, fallback: string[]) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  return value.filter((item): item is string => typeof item === "string");
}
