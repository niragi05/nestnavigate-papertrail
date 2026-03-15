import type { SprintState } from "@/features/paperTrailSprint/state/types";

export const initialSprintState: SprintState = {
  status: "idle",
  entryPoint: "lesson_completion",
  scenario: null,
  placements: {},
  startedAt: null,
  submittedAt: null,
  result: null,
  attemptCount: 0,
  rewardStatus: "idle",
  lastError: null
};
