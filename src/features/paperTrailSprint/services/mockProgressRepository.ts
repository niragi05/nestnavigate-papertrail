import type { SprintProgress } from "@/features/paperTrailSprint/state/types";
import {
  clearStoredProgress,
  restoreProgressFromStorage,
  saveProgressToStorage
} from "@/features/paperTrailSprint/utils/persistence";

export const mockProgressRepository = {
  async save(progress: SprintProgress) {
    saveProgressToStorage(progress);
    return Promise.resolve(true);
  },
  async restore() {
    return Promise.resolve(restoreProgressFromStorage());
  },
  async clear() {
    clearStoredProgress();
    return Promise.resolve(true);
  }
};
