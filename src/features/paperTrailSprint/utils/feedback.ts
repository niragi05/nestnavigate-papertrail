import type { SprintResult } from "@/features/paperTrailSprint/state/types";

export function getResultsHeadline(result: SprintResult) {
  if (result.perfectRun) {
    return "Everything is in the right folder.";
  }

  if (result.accuracyPercent >= 75) {
    return "You are getting comfortable with the paperwork flow.";
  }

  return "Good practice round. The explanations below will sharpen the tricky parts.";
}

export function getResultsTone(result: SprintResult) {
  if (result.perfectRun) {
    return "success";
  }

  if (result.accuracyPercent >= 75) {
    return "warning";
  }

  return "accent";
}
