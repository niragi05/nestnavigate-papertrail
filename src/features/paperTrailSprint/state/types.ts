export type EntryPoint = "lesson_completion" | "dashboard" | "daily_challenge";

export type SprintMode = "untimed" | "timed";

export type Difficulty = "easy" | "medium" | "hard";

export interface StageBucket {
  id: string;
  label: string;
  description: string;
  order: number;
}

export interface DocumentCard {
  id: string;
  title: string;
  shortDescription: string;
  correctBucketId: string;
  explanation: string;
  lessonTieIn: string;
  order: number;
}

export interface RewardRule {
  baseCoins: number;
  perfectBonusCoins: number;
  retryCoinCap: number;
}

export interface SprintScenario {
  id: string;
  lessonId: string;
  title: string;
  shortDescription: string;
  mode: SprintMode;
  difficulty: Difficulty;
  estimatedMinutes: number;
  stageBuckets: StageBucket[];
  documentCards: DocumentCard[];
  rewardRule: RewardRule;
  successMessage: string;
  retryMessage: string;
}

export interface AttemptFeedback {
  cardId: string;
  selectedBucketId: string | null;
  correctBucketId: string;
  isCorrect: boolean;
  explanation: string;
}

export interface SprintResult {
  scenarioId: string;
  score: number;
  accuracyPercent: number;
  correctCount: number;
  incorrectCount: number;
  coinsEarned: number;
  perfectRun: boolean;
  feedback: AttemptFeedback[];
  completedAt: string;
}

export interface SprintProgress {
  unlockedScenarioIds: string[];
  completedScenarioIds: string[];
  perfectScenarioIds: string[];
  earnedCoins: number;
}

export type ScenarioStatusLabel =
  | "Available"
  | "Locked"
  | "Perfect to unlock"
  | "Cleared"
  | "Perfected";

export interface ScenarioAccess {
  scenario: SprintScenario;
  isUnlocked: boolean;
  isCompleted: boolean;
  isPerfected: boolean;
  statusLabel: ScenarioStatusLabel;
  lockedReason: string | null;
}

export type RewardStatus = "idle" | "granting" | "granted" | "failed";

export interface SprintState {
  status: "idle" | "ready" | "in_progress" | "submitted" | "complete";
  entryPoint: EntryPoint;
  scenario: SprintScenario | null;
  placements: Record<string, string | null>;
  startedAt: string | null;
  submittedAt: string | null;
  result: SprintResult | null;
  attemptCount: number;
  rewardStatus: RewardStatus;
  lastError: string | null;
}

export type AnalyticsEventName =
  | "paper_trail_viewed"
  | "paper_trail_started"
  | "paper_trail_card_placed"
  | "paper_trail_submit_attempted"
  | "paper_trail_completed"
  | "paper_trail_progress_unlocked"
  | "paper_trail_retry_clicked"
  | "paper_trail_exit_clicked"
  | "paper_trail_reward_granted";

export interface AnalyticsPayload {
  scenarioId: string;
  lessonId?: string;
  entryPoint: EntryPoint;
  difficulty?: Difficulty;
  cardId?: string;
  selectedBucketId?: string;
  accuracyPercent?: number;
  score?: number;
  coinsEarned?: number;
  unlockedScenarioId?: string;
}
