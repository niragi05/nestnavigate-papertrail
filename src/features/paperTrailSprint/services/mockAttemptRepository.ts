import { clearStoredState, restoreStateFromStorage, saveStateToStorage } from "@/features/paperTrailSprint/utils/persistence";
import type { SprintState } from "@/features/paperTrailSprint/state/types";

export const mockAttemptRepository = {
  async saveInProgress(state: SprintState) {
    saveStateToStorage(state);
    return Promise.resolve(true);
  },
  async restore() {
    return Promise.resolve(restoreStateFromStorage());
  },
  async clear() {
    clearStoredState();
    return Promise.resolve(true);
  }
};
