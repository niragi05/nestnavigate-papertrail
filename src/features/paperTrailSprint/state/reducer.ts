import type { SprintAction } from "@/features/paperTrailSprint/state/actions";
import { initialSprintState } from "@/features/paperTrailSprint/state/initialState";
import type { SprintScenario, SprintState } from "@/features/paperTrailSprint/state/types";

function createEmptyPlacements(scenario: SprintScenario) {
  return scenario.documentCards.reduce<Record<string, string | null>>((placements, card) => {
    placements[card.id] = null;
    return placements;
  }, {});
}

export function sprintReducer(state: SprintState, action: SprintAction): SprintState {
  switch (action.type) {
    case "LOAD_SCENARIO":
      return {
        status: "ready",
        entryPoint: action.payload.entryPoint,
        scenario: action.payload.scenario,
        placements: createEmptyPlacements(action.payload.scenario),
        startedAt: null,
        submittedAt: null,
        result: null,
        attemptCount: 0,
        rewardStatus: "idle",
        lastError: null
      };
    case "START_ATTEMPT":
      return {
        ...state,
        status: "in_progress",
        startedAt: state.startedAt ?? action.payload.startedAt,
        lastError: null
      };
    case "PLACE_CARD":
      return {
        ...state,
        status: "in_progress",
        placements: {
          ...state.placements,
          [action.payload.cardId]: action.payload.bucketId
        }
      };
    case "REMOVE_CARD":
      return {
        ...state,
        status: "in_progress",
        placements: {
          ...state.placements,
          [action.payload.cardId]: null
        }
      };
    case "SUBMIT_ATTEMPT":
      return {
        ...state,
        status: "submitted",
        submittedAt: action.payload.submittedAt,
        result: action.payload.result,
        rewardStatus: "granting",
        lastError: null
      };
    case "RESET_ATTEMPT":
      return state.scenario
        ? {
            ...state,
            status: "ready",
            placements: createEmptyPlacements(state.scenario),
            startedAt: null,
            submittedAt: null,
            result: null,
            attemptCount: state.attemptCount + 1,
            rewardStatus: "idle",
            lastError: null
          }
        : initialSprintState;
    case "RESTORE_ATTEMPT":
      return action.payload;
    case "COMPLETE_REWARD":
      return {
        ...state,
        status: "complete",
        rewardStatus: action.payload.status,
        lastError: action.payload.status === "failed" ? action.payload.error ?? null : null
      };
    default:
      return state;
  }
}
