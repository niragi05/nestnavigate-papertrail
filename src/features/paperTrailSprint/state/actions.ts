import type { EntryPoint, SprintResult, SprintScenario, SprintState } from "@/features/paperTrailSprint/state/types";

export type SprintAction =
  | { type: "LOAD_SCENARIO"; payload: { scenario: SprintScenario; entryPoint: EntryPoint } }
  | { type: "START_ATTEMPT"; payload: { startedAt: string } }
  | { type: "PLACE_CARD"; payload: { cardId: string; bucketId: string } }
  | { type: "REMOVE_CARD"; payload: { cardId: string } }
  | { type: "SUBMIT_ATTEMPT"; payload: { result: SprintResult; submittedAt: string } }
  | { type: "RESET_ATTEMPT" }
  | { type: "RESTORE_ATTEMPT"; payload: SprintState }
  | { type: "COMPLETE_REWARD"; payload: { status: "granted" | "failed"; error?: string | null } };
