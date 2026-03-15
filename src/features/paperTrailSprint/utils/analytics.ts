import type {
  AnalyticsEventName,
  AnalyticsPayload
} from "@/features/paperTrailSprint/state/types";

export interface AnalyticsClient {
  track: (eventName: AnalyticsEventName, payload: AnalyticsPayload) => void;
}

export function createAnalyticsClient(
  reporter?: (eventName: AnalyticsEventName, payload: AnalyticsPayload) => void
): AnalyticsClient {
  return {
    track(eventName, payload) {
      reporter?.(eventName, payload);
      if (!reporter) {
        console.info("[paper-trail-analytics]", eventName, payload);
      }
    }
  };
}
