import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
  type ReactNode
} from "react";
import type { SprintAction } from "@/features/paperTrailSprint/state/actions";
import { initialSprintState } from "@/features/paperTrailSprint/state/initialState";
import { sprintReducer } from "@/features/paperTrailSprint/state/reducer";
import type {
  AnalyticsEventName,
  AnalyticsPayload,
  EntryPoint,
  ScenarioAccess,
  SprintResult,
  SprintProgress,
  SprintState
} from "@/features/paperTrailSprint/state/types";
import { mockAttemptRepository } from "@/features/paperTrailSprint/services/mockAttemptRepository";
import { mockProgressRepository } from "@/features/paperTrailSprint/services/mockProgressRepository";
import { mockRewardService } from "@/features/paperTrailSprint/services/mockRewardService";
import { mockScenarioRepository } from "@/features/paperTrailSprint/services/mockScenarioRepository";
import { createAnalyticsClient } from "@/features/paperTrailSprint/utils/analytics";
import { restoreProgressFromStorage } from "@/features/paperTrailSprint/utils/persistence";
import {
  applyProgressFromResult,
  applyRewardToProgress,
  buildScenarioAccessList,
  createInitialProgress,
  getScenarioAccess,
  isScenarioUnlocked
} from "@/features/paperTrailSprint/utils/progression";
import { areAllCardsPlaced, evaluateAttempt } from "@/features/paperTrailSprint/utils/scoring";
import { DEFAULT_SCENARIO_ID } from "@/features/paperTrailSprint/constants/ui";

interface IntegrationSession {
  lessonId: string;
  lessonTitle: string;
  scenarioId: string;
  entryPoint: EntryPoint;
  startingCoins: number;
  onContinueLearning?: () => void;
  onExit?: () => void;
  onAnalyticsEvent?: (eventName: AnalyticsEventName, payload: AnalyticsPayload) => void;
}

interface PaperTrailSprintContextValue {
  state: SprintState;
  isLoading: boolean;
  integration: IntegrationSession;
  progress: SprintProgress;
  walletBalance: number;
  scenarioAccessList: ScenarioAccess[];
  latestUnlockedScenarioIds: string[];
  registerIntegrationSession: (session: Partial<IntegrationSession>) => void;
  initializeScenario: (scenarioId: string, entryPoint: EntryPoint) => Promise<void>;
  placeCard: (cardId: string, bucketId: string) => void;
  removeCard: (cardId: string) => void;
  retryScenario: () => Promise<void>;
  submitAttempt: () => Promise<SprintResult | null>;
  clearStoredAttempt: () => Promise<void>;
  getScenarioAccess: (scenarioId: string) => ScenarioAccess | null;
  trackEvent: (eventName: AnalyticsEventName, payload: Omit<AnalyticsPayload, "entryPoint">) => void;
}

const defaultIntegration: IntegrationSession = {
  lessonId: "lesson_mortgage_basics",
  lessonTitle: "Mortgage Basics",
  scenarioId: DEFAULT_SCENARIO_ID,
  entryPoint: "lesson_completion",
  startingCoins: 145
};

const PaperTrailSprintContext = createContext<PaperTrailSprintContextValue | null>(null);

function applyAction(state: SprintState, action: SprintAction) {
  return sprintReducer(state, action);
}

export function PaperTrailSprintProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(sprintReducer, initialSprintState);
  const [isLoading, setIsLoading] = useState(false);
  const [integration, setIntegration] = useState<IntegrationSession>(defaultIntegration);
  const [progress, setProgress] = useState<SprintProgress>(() => {
    try {
      return restoreInitialProgress();
    } catch (error) {
      console.warn("Paper Trail Sprint progress restore failed", error);
      return createInitialProgress();
    }
  });
  const [latestUnlockedScenarioIds, setLatestUnlockedScenarioIds] = useState<string[]>([]);
  const analytics = createAnalyticsClient(integration.onAnalyticsEvent);
  const walletBalance = integration.startingCoins + progress.earnedCoins;
  const scenarioAccessList = buildScenarioAccessList(progress);

  useEffect(() => {
    if (state.status === "idle" || !state.scenario) {
      return;
    }

    void mockAttemptRepository.saveInProgress(state);
  }, [state]);

  useEffect(() => {
    void mockProgressRepository.save(progress);
  }, [progress]);

  async function initializeScenario(scenarioId: string, entryPoint: EntryPoint) {
    setIsLoading(true);

    try {
      const scenario = await mockScenarioRepository.getById(scenarioId);

      if (!scenario) {
        dispatch({
          type: "RESTORE_ATTEMPT",
          payload: {
            ...initialSprintState,
            entryPoint,
            lastError: "We could not load this practice round. Please try again."
          }
        });
        return;
      }

      if (!isScenarioUnlocked(progress, scenarioId)) {
        dispatch({
          type: "RESTORE_ATTEMPT",
          payload: {
            ...initialSprintState,
            entryPoint,
            lastError: "This round is still locked. Perfect the earlier level to unlock it."
          }
        });
        return;
      }

      const restoredState = await mockAttemptRepository.restore();

      if (restoredState?.scenario?.id === scenarioId && restoredState.status !== "idle") {
        dispatch({
          type: "RESTORE_ATTEMPT",
          payload: {
            ...restoredState,
            entryPoint
          }
        });
        analytics.track("paper_trail_viewed", {
          scenarioId,
          lessonId: restoredState.scenario.lessonId,
          difficulty: restoredState.scenario.difficulty,
          entryPoint
        });

        return;
      }

      dispatch({
        type: "LOAD_SCENARIO",
        payload: {
          scenario,
          entryPoint
        }
      });
      analytics.track("paper_trail_viewed", {
        scenarioId,
        lessonId: scenario.lessonId,
        difficulty: scenario.difficulty,
        entryPoint
      });
    } catch (error) {
      console.warn("Paper Trail Sprint restore failed", error);
      const scenario = await mockScenarioRepository.getById(scenarioId);

      if (scenario) {
        dispatch({
          type: "RESTORE_ATTEMPT",
          payload: {
            ...applyAction(initialSprintState, {
              type: "LOAD_SCENARIO",
              payload: {
                scenario,
                entryPoint
              }
            }),
            lastError: "Saved progress could not be restored, so we started fresh."
          }
        });

        analytics.track("paper_trail_viewed", {
          scenarioId,
          lessonId: scenario.lessonId,
          difficulty: scenario.difficulty,
          entryPoint
        });
      } else {
        dispatch({
          type: "RESTORE_ATTEMPT",
          payload: {
            ...initialSprintState,
            entryPoint,
            lastError: "We could not load this practice round. Please try again."
          }
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  function registerIntegrationSession(session: Partial<IntegrationSession>) {
    setIntegration((current) => ({
      ...current,
      ...session
    }));
  }

  function getScenarioAccessById(scenarioId: string) {
    return getScenarioAccess(progress, scenarioId);
  }

  function trackEvent(eventName: AnalyticsEventName, payload: Omit<AnalyticsPayload, "entryPoint">) {
    analytics.track(eventName, {
      ...payload,
      entryPoint: state.entryPoint || integration.entryPoint
    });
  }

  function ensureStarted(nextAction: SprintAction) {
    const now = new Date().toISOString();
    let nextState = state;

    if (!state.startedAt) {
      const startAction: SprintAction = {
        type: "START_ATTEMPT",
        payload: {
          startedAt: now
        }
      };

      nextState = applyAction(nextState, startAction);
      dispatch(startAction);

      if (nextState.scenario) {
        analytics.track("paper_trail_started", {
          scenarioId: nextState.scenario.id,
          lessonId: nextState.scenario.lessonId,
          difficulty: nextState.scenario.difficulty,
          entryPoint: nextState.entryPoint
        });
      }
    }

    dispatch(nextAction);
  }

  function placeCard(cardId: string, bucketId: string) {
    const scenario = state.scenario;
    const bucket = scenario?.stageBuckets.find((item) => item.id === bucketId);
    const action: SprintAction = {
      type: "PLACE_CARD",
      payload: {
        cardId,
        bucketId
      }
    };

    ensureStarted(action);

    if (scenario && bucket) {
      analytics.track("paper_trail_card_placed", {
        scenarioId: scenario.id,
        lessonId: scenario.lessonId,
        difficulty: scenario.difficulty,
        cardId,
        selectedBucketId: bucketId,
        entryPoint: state.entryPoint
      });
    }
  }

  function removeCard(cardId: string) {
    const action: SprintAction = {
      type: "REMOVE_CARD",
      payload: {
        cardId
      }
    };

    ensureStarted(action);
  }

  async function submitAttempt() {
    if (!state.scenario) {
      return null;
    }

    const cardIds = state.scenario.documentCards.map((card) => card.id);

    if (!areAllCardsPlaced(state.placements, cardIds)) {
      return null;
    }

    const submittedAt = new Date().toISOString();
    const result = evaluateAttempt(state.scenario, state.placements, state.attemptCount > 0);
    const submitAction: SprintAction = {
      type: "SUBMIT_ATTEMPT",
      payload: {
        result,
        submittedAt
      }
    };

    const submittedState = applyAction(state, submitAction);
    dispatch(submitAction);
    await mockAttemptRepository.saveInProgress(submittedState);

    const progressionUpdate = applyProgressFromResult(progress, state.scenario.id, result.perfectRun);
    setLatestUnlockedScenarioIds(progressionUpdate.newlyUnlockedScenarioIds);

    analytics.track("paper_trail_submit_attempted", {
      scenarioId: state.scenario.id,
      lessonId: state.scenario.lessonId,
      difficulty: state.scenario.difficulty,
      entryPoint: state.entryPoint
    });

    analytics.track("paper_trail_completed", {
      scenarioId: state.scenario.id,
      lessonId: state.scenario.lessonId,
      difficulty: state.scenario.difficulty,
      accuracyPercent: result.accuracyPercent,
      score: result.score,
      coinsEarned: result.coinsEarned,
      entryPoint: state.entryPoint
    });

    progressionUpdate.newlyUnlockedScenarioIds.forEach((unlockedScenarioId) => {
      analytics.track("paper_trail_progress_unlocked", {
        scenarioId: state.scenario!.id,
        lessonId: state.scenario!.lessonId,
        difficulty: state.scenario!.difficulty,
        unlockedScenarioId,
        entryPoint: state.entryPoint
      });
    });

    try {
      const reward = await mockRewardService.grantCoins(result.coinsEarned);
      const nextProgress = reward.success
        ? applyRewardToProgress(progressionUpdate.progress, result.coinsEarned)
        : progressionUpdate.progress;
      const rewardAction: SprintAction = {
        type: "COMPLETE_REWARD",
        payload: {
          status: reward.success ? "granted" : "failed",
          error: reward.success ? null : "Reward could not be saved right now."
        }
      };

      setProgress(nextProgress);
      await mockProgressRepository.save(nextProgress);

      const completedState = applyAction(submittedState, rewardAction);
      dispatch(rewardAction);
      await mockAttemptRepository.saveInProgress(completedState);

      if (reward.success) {
        analytics.track("paper_trail_reward_granted", {
          scenarioId: state.scenario.id,
          lessonId: state.scenario.lessonId,
          difficulty: state.scenario.difficulty,
          coinsEarned: result.coinsEarned,
          entryPoint: state.entryPoint
        });
      }
    } catch (error) {
      console.warn("Paper Trail Sprint reward failed", error);
      const failedAction: SprintAction = {
        type: "COMPLETE_REWARD",
        payload: {
          status: "failed",
          error: "Reward could not be saved right now."
        }
      };

      setProgress(progressionUpdate.progress);
      await mockProgressRepository.save(progressionUpdate.progress);

      const failedState = applyAction(submittedState, failedAction);
      dispatch(failedAction);
      await mockAttemptRepository.saveInProgress(failedState);
    }

    return result;
  }

  async function retryScenario() {
    const resetAction: SprintAction = { type: "RESET_ATTEMPT" };
    const nextState = applyAction(state, resetAction);
    dispatch(resetAction);
    setLatestUnlockedScenarioIds([]);
    await mockAttemptRepository.saveInProgress(nextState);

    if (state.scenario) {
      analytics.track("paper_trail_retry_clicked", {
        scenarioId: state.scenario.id,
        lessonId: state.scenario.lessonId,
        difficulty: state.scenario.difficulty,
        entryPoint: state.entryPoint
      });
    }
  }

  async function clearStoredAttempt() {
    setLatestUnlockedScenarioIds([]);
    await mockAttemptRepository.clear();
  }

  return (
    <PaperTrailSprintContext.Provider
      value={{
        state,
        isLoading,
        integration,
        progress,
        walletBalance,
        scenarioAccessList,
        latestUnlockedScenarioIds,
        registerIntegrationSession,
        initializeScenario,
        placeCard,
        removeCard,
        retryScenario,
        submitAttempt,
        clearStoredAttempt,
        getScenarioAccess: getScenarioAccessById,
        trackEvent
      }}
    >
      {children}
    </PaperTrailSprintContext.Provider>
  );
}

export function usePaperTrailSprint() {
  const context = useContext(PaperTrailSprintContext);

  if (!context) {
    throw new Error("usePaperTrailSprint must be used inside PaperTrailSprintProvider");
  }

  return context;
}

function restoreInitialProgress() {
  return restoreProgressFromStorage() ?? createInitialProgress();
}
