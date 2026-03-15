import type { AnalyticsEventName } from "@/features/paperTrailSprint/state/types";

export const ANALYTICS_EVENTS: Record<AnalyticsEventName, AnalyticsEventName> = {
  paper_trail_viewed: "paper_trail_viewed",
  paper_trail_started: "paper_trail_started",
  paper_trail_card_placed: "paper_trail_card_placed",
  paper_trail_submit_attempted: "paper_trail_submit_attempted",
  paper_trail_completed: "paper_trail_completed",
  paper_trail_progress_unlocked: "paper_trail_progress_unlocked",
  paper_trail_retry_clicked: "paper_trail_retry_clicked",
  paper_trail_exit_clicked: "paper_trail_exit_clicked",
  paper_trail_reward_granted: "paper_trail_reward_granted"
};
