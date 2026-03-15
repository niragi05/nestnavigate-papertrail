import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Button } from "@/shared/components/Button";
import { Card } from "@/shared/components/Card";
import { Badge } from "@/shared/components/Badge";
import { DEFAULT_SCENARIO_ID } from "@/features/paperTrailSprint/constants/ui";
import { usePaperTrailSprint } from "@/features/paperTrailSprint/hooks/usePaperTrailSprint";
import type { AnalyticsEventName, AnalyticsPayload, EntryPoint } from "@/features/paperTrailSprint/state/types";
import { cn } from "@/shared/lib/cn";

interface PracticeCardProps {
  lessonId: string;
  lessonTitle: string;
  scenarioId?: string;
  entryPoint?: EntryPoint;
  startingCoins: number;
  onContinueLearning?: () => void;
  onExit?: () => void;
  onAnalyticsEvent?: (eventName: AnalyticsEventName, payload: AnalyticsPayload) => void;
}

export function PracticeCard({
  lessonId,
  lessonTitle,
  scenarioId = DEFAULT_SCENARIO_ID,
  entryPoint = "lesson_completion",
  startingCoins,
  onContinueLearning,
  onExit,
  onAnalyticsEvent
}: PracticeCardProps) {
  const navigate = useNavigate();
  const { registerIntegrationSession, scenarioAccessList, walletBalance } = usePaperTrailSprint();

  function handleStart(selectedScenarioId: string) {
    registerIntegrationSession({
      lessonId,
      lessonTitle,
      scenarioId: selectedScenarioId,
      entryPoint,
      startingCoins,
      onContinueLearning,
      onExit,
      onAnalyticsEvent
    });

    navigate(`/sprint/${selectedScenarioId}?entryPoint=${entryPoint}`);
  }

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.22 }}>
      <Card className="relative p-[1.6rem] min-[900px]:p-[1.8rem]" tone="spotlight">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-3rem] top-[-3rem] h-[12rem] w-[12rem] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.22),transparent_68%)]"
        />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Badge
            tone="accent"
            className="border-[rgba(255,255,255,0.24)] bg-[rgba(255,255,255,0.14)] text-white"
          >
            Practice it now
          </Badge>
          <span className="rounded-full border border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.14)] px-[0.9rem] py-[0.45rem] text-[0.84rem] font-medium text-white">
            Wallet: {walletBalance.toLocaleString()} coins
          </span>
        </div>
        <h2 className="mt-[1.2rem] mb-[0.55rem] font-display text-[clamp(2.15rem,4vw,3rem)] leading-[0.98] text-white">
          Paper Trail Sprint
        </h2>
        <p className="m-0 max-w-[48ch] text-[1.02rem] leading-[1.65] text-[rgba(244,247,255,0.88)]">
          Wrap up <strong>{lessonTitle}</strong> by sorting real paperwork into the right stage folders.
        </p>

        <div className="mt-[1.5rem] grid gap-[1rem] min-[980px]:grid-cols-3">
          {scenarioAccessList.map((access, index) => {
            const isPreferred = access.scenario.id === scenarioId;
            const isLocked = !access.isUnlocked;
            const isViewOnly = access.isPerfected;
            const helperCopy = access.lockedReason
              ? access.lockedReason
              : access.isPerfected
                ? "100% achieved. Open the solved board to review the correct filing flow."
                : access.isCompleted
                  ? "Completed once. Replay it to unlock the next file set."
                  : "Ready to play now.";

            return (
              <motion.article
                key={access.scenario.id}
                className={cn(
                  "grid gap-[0.9rem] rounded-[28px] border border-[rgba(223,229,255,0.92)] bg-[rgba(255,255,255,0.95)] p-[1.1rem] text-ink-strong shadow-[0_18px_32px_rgba(72,97,206,0.14)]",
                  isPreferred &&
                    "border-[rgba(107,126,255,0.34)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(238,243,255,0.97))] shadow-[0_20px_38px_rgba(77,102,223,0.18)]",
                  isLocked && "opacity-[0.84]"
                )}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06, duration: 0.24 }}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <Badge tone={access.isPerfected ? "success" : isLocked ? "warning" : "accent"}>
                    Level {index + 1}
                  </Badge>
                  <span className="rounded-full border border-[rgba(218,225,255,0.9)] bg-[rgba(244,247,255,0.92)] px-[0.65rem] py-[0.28rem] text-[0.76rem] font-semibold text-info">
                    {access.statusLabel}
                  </span>
                </div>

                <h3 className="m-0 font-display text-[1.1rem] font-semibold leading-[1.25] text-ink-strong">
                  {access.scenario.title.replace("Paper Trail Sprint: ", "")}
                </h3>
                <p className="m-0 text-[0.92rem] leading-[1.55] text-ink-soft">
                  {access.scenario.shortDescription}
                </p>
                <div className="flex flex-wrap gap-[0.55rem] text-[0.82rem] capitalize text-ink-soft">
                  <span className="rounded-full border border-[rgba(218,225,255,0.9)] bg-[rgba(244,247,255,0.92)] px-[0.7rem] py-[0.28rem]">
                    {access.scenario.difficulty}
                  </span>
                  <span className="rounded-full border border-[rgba(218,225,255,0.9)] bg-[rgba(244,247,255,0.92)] px-[0.7rem] py-[0.28rem]">
                    {access.scenario.estimatedMinutes} min
                  </span>
                </div>
                <p className={cn(
                  "m-0 min-h-[2.8em] text-[0.88rem] leading-[1.5]",
                  isLocked ? "text-warning" : "text-info"
                )}>
                  {helperCopy}
                </p>
                <Button
                  variant={isLocked ? "secondary" : isViewOnly ? "secondary" : "primary"}
                  disabled={!access.isUnlocked}
                  onClick={() => handleStart(access.scenario.id)}
                  className="w-full"
                >
                  {isViewOnly
                    ? "View solved board"
                    : access.isUnlocked
                    ? `Play ${access.scenario.difficulty}`
                    : access.statusLabel}
                </Button>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-[1.45rem] flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-[rgba(244,247,255,0.76)]">
              How progression works
            </div>
            <p className="mt-[0.3rem] mb-0 max-w-[44ch] leading-[1.6] text-[rgba(244,247,255,0.84)]">
              Perfect each round to unlock the next file set, from easy paperwork prep to the final closing table.
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
