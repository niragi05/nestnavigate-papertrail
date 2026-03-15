import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { AppPage } from "@/shared/components/AppPage";
import { Button } from "@/shared/components/Button";
import { ResultsHero } from "@/features/paperTrailSprint/components/ResultsHero";
import { ScoreSummary } from "@/features/paperTrailSprint/components/ScoreSummary";
import { FeedbackList } from "@/features/paperTrailSprint/components/FeedbackList";
import { getScenarioById } from "@/features/paperTrailSprint/data/scenarios";
import { usePaperTrailSprint } from "@/features/paperTrailSprint/hooks/usePaperTrailSprint";
import { getNextScenarioId } from "@/features/paperTrailSprint/utils/progression";
import { eyebrowClass, pageShellClass, softPanelClass } from "@/shared/styles/patterns";

export function SprintResultsPage() {
  const { scenarioId } = useParams();
  const navigate = useNavigate();
  const {
    state,
    isLoading,
    integration,
    walletBalance,
    initializeScenario,
    getScenarioAccess,
    latestUnlockedScenarioIds,
    registerIntegrationSession,
    retryScenario,
    clearStoredAttempt
  } = usePaperTrailSprint();
  const [attemptedRestore, setAttemptedRestore] = useState(false);

  useEffect(() => {
    if (!scenarioId || (state.scenario?.id === scenarioId && state.result)) {
      setAttemptedRestore(true);
      return;
    }

    void initializeScenario(scenarioId, integration.entryPoint).finally(() => {
      setAttemptedRestore(true);
    });
  }, [scenarioId, state.scenario?.id, state.result]);

  if (!scenarioId) {
    return <Navigate to="/" replace />;
  }

  if (isLoading || !attemptedRestore) {
    return (
      <AppPage className="px-4 pt-4 pb-12 min-[900px]:pt-6" onHomeClick={handleContinue}>
        <div className={`${pageShellClass} gap-[1.15rem]`}>
          <div className="rounded-[34px] border border-[rgba(223,229,255,0.95)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(244,247,255,0.92))] p-8 text-center shadow-card">
            Loading your latest results…
          </div>
        </div>
      </AppPage>
    );
  }

  if (!state.scenario || !state.result || state.scenario.id !== scenarioId) {
    return <Navigate to="/" replace />;
  }

  const nextScenarioId = getNextScenarioId(state.scenario.id);
  const nextScenario = nextScenarioId ? getScenarioById(nextScenarioId) : null;
  const nextScenarioAccess = nextScenarioId ? getScenarioAccess(nextScenarioId) : null;
  const canPlayNextScenario = Boolean(state.result.perfectRun && nextScenario && nextScenarioAccess?.isUnlocked);
  const isFinalPerfectRun = Boolean(state.result.perfectRun && !nextScenario);
  const unlockedScenarios = latestUnlockedScenarioIds
    .map((id) => getScenarioById(id))
    .filter((scenario): scenario is NonNullable<typeof scenario> => Boolean(scenario));

  function handleViewSolvedBoard() {
    navigate(`/sprint/${state.scenario!.id}?entryPoint=${state.entryPoint}`);
  }

  async function handleRetry() {
    await retryScenario();
    navigate(`/sprint/${state.scenario!.id}?entryPoint=${state.entryPoint}`);
  }

  async function handlePlayNext() {
    if (!nextScenario) {
      return;
    }

    await clearStoredAttempt();
    registerIntegrationSession({
      scenarioId: nextScenario.id
    });
    navigate(`/sprint/${nextScenario.id}?entryPoint=${state.entryPoint}`);
  }

  async function handleContinue() {
    await clearStoredAttempt();
    integration.onContinueLearning?.();
    navigate("/");
  }

  return (
    <AppPage className="px-4 pt-4 pb-12 min-[900px]:pt-6" onHomeClick={handleContinue}>
      <div className={`${pageShellClass} gap-[1.15rem]`}>
        <ResultsHero
          result={state.result}
          scenario={state.scenario}
          rewardFailed={state.rewardStatus === "failed"}
          walletBalance={walletBalance}
        />

        <div className="grid gap-4 min-[900px]:grid-cols-[minmax(0,1fr)_minmax(260px,0.82fr)]">
          <ScoreSummary result={state.result} attemptCount={state.attemptCount} />
          <div className={`${softPanelClass} p-[1.45rem]`}>
            <p className={eyebrowClass}>
              {unlockedScenarios.length ? "Unlock earned" : "Next move"}
            </p>
            <h2 className="mt-[0.7rem] mb-0 font-display text-[1.2rem] font-semibold leading-[1.35] text-ink-strong">
              {canPlayNextScenario
                ? `${nextScenario?.title.replace("Paper Trail Sprint: ", "")} is ready to play.`
                : isFinalPerfectRun
                  ? "All three rounds are perfected."
                  : "Keep the momentum while the paperwork map is still fresh."}
            </h2>
            {unlockedScenarios.length ? (
              <p className="mt-[0.85rem] mb-0 rounded-[22px] border border-[rgba(245,202,101,0.32)] bg-[rgba(255,241,206,0.8)] px-[0.95rem] py-[0.8rem] text-[0.92rem] leading-[1.55] text-warning">
                Unlocked: {unlockedScenarios.map((scenario) => scenario.title.replace("Paper Trail Sprint: ", "")).join(", ")}
              </p>
            ) : null}
            <div className="mt-[1.1rem] flex flex-wrap gap-[0.7rem]">
              {state.result.perfectRun ? (
                <Button variant="secondary" onClick={handleViewSolvedBoard}>
                  View solved board
                </Button>
              ) : (
                <Button variant="secondary" onClick={handleRetry}>
                  Try again
                </Button>
              )}
              {canPlayNextScenario ? (
                <Button onClick={handlePlayNext}>
                  Play {nextScenario?.difficulty}
                </Button>
              ) : (
                <Button onClick={handleContinue}>
                  {isFinalPerfectRun ? "Back to levels" : "Continue learning"}
                </Button>
              )}
            </div>
          </div>
        </div>

        <FeedbackList scenario={state.scenario} result={state.result} />
      </div>
    </AppPage>
  );
}
