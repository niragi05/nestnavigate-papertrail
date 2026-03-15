import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { AppPage } from "@/shared/components/AppPage";
import { Toast } from "@/shared/components/Toast";
import { Button } from "@/shared/components/Button";
import { Card } from "@/shared/components/Card";
import { SprintHeader } from "@/features/paperTrailSprint/components/SprintHeader";
import { SprintInstructionBanner } from "@/features/paperTrailSprint/components/SprintInstructionBanner";
import { DocumentTray } from "@/features/paperTrailSprint/components/DocumentTray";
import { StageBucketGrid } from "@/features/paperTrailSprint/components/StageBucketGrid";
import { SprintActionBar } from "@/features/paperTrailSprint/components/SprintActionBar";
import { getScenarioById } from "@/features/paperTrailSprint/data/scenarios";
import { usePaperTrailSprint } from "@/features/paperTrailSprint/hooks/usePaperTrailSprint";
import {
  buildSolvedPlacements,
  selectBucketLabel,
  selectCardById,
  selectRemainingCardCount,
  selectUnplacedCards
} from "@/features/paperTrailSprint/state/selectors";
import {
  getPlacementAnnouncement,
  getRemainingAnnouncement
} from "@/features/paperTrailSprint/utils/accessibility";
import type { EntryPoint, SprintScenario, SprintState } from "@/features/paperTrailSprint/state/types";
import {
  eyebrowClass,
  hiddenLiveRegionClass,
  pageShellClass,
  softPanelClass
} from "@/shared/styles/patterns";

const sprintPageClassName = "px-4 pt-4 pb-12 min-[900px]:pt-6";
const sprintPageWrapperClassName = "min-[1280px]:[--page-max-width:1560px]";

export function PaperTrailSprintPage() {
  const { scenarioId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    state,
    isLoading,
    integration,
    walletBalance,
    initializeScenario,
    getScenarioAccess,
    placeCard,
    removeCard,
    retryScenario,
    submitAttempt,
    trackEvent
  } = usePaperTrailSprint();
  const [pickedCardId, setPickedCardId] = useState<string | null>(null);
  const [dragOverBucketId, setDragOverBucketId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [warningMessage, setWarningMessage] = useState<string | null>(null);
  const [liveMessage, setLiveMessage] = useState("");

  const entryPoint = (searchParams.get("entryPoint") as EntryPoint | null) ?? integration.entryPoint;
  const requestedScenario = scenarioId ? getScenarioById(scenarioId) : null;
  const requestedAccess = scenarioId ? getScenarioAccess(scenarioId) : null;
  const exitScenario = requestedScenario ?? state.scenario;

  useEffect(() => {
    if (!scenarioId || !requestedAccess?.isUnlocked || requestedAccess.isPerfected) {
      return;
    }

    void initializeScenario(scenarioId, entryPoint);
  }, [scenarioId, entryPoint, requestedAccess?.isUnlocked, requestedAccess?.isPerfected]);

  useEffect(() => {
    if (!toastMessage) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setToastMessage(null);
    }, 2200);

    return () => window.clearTimeout(timeout);
  }, [toastMessage]);

  if (!scenarioId) {
    return <Navigate to="/" replace />;
  }

  if (requestedScenario && requestedAccess && !requestedAccess.isUnlocked) {
    return (
      <AppPage
        className={sprintPageClassName}
        pageClassName={sprintPageWrapperClassName}
        onHomeClick={handleExit}
      >
        <div className={`${pageShellClass} gap-[1.2rem]`}>
          <Card className="p-8 text-center" tone="spotlight">
            <p className={`${eyebrowClass} text-[rgba(244,247,255,0.72)]`}>Round locked</p>
            <h1 className="mt-[0.7rem] mb-0 font-display text-[clamp(2rem,4vw,3rem)] text-white">
              {requestedScenario.title.replace("Paper Trail Sprint: ", "")} is not unlocked yet.
            </h1>
            <p className="mx-auto mt-[0.8rem] mb-[1.2rem] max-w-[38ch] leading-[1.55] text-[rgba(245,247,255,0.86)]">
              {requestedAccess.lockedReason ?? "Perfect the earlier level to unlock this round."}
            </p>
            <Button variant="secondary" onClick={() => navigate("/")}>
              Back to level path
            </Button>
          </Card>
        </div>
      </AppPage>
    );
  }

  if (requestedScenario && requestedAccess?.isPerfected) {
    const reviewState = createSolvedReviewState(requestedScenario, entryPoint);
    const remainingCount = selectRemainingCardCount(reviewState);

    return (
      <AppPage
        className={sprintPageClassName}
        pageClassName={sprintPageWrapperClassName}
        onHomeClick={handleExit}
      >
        <div className={`${pageShellClass} gap-[1.2rem]`}>
          <SprintHeader
            scenario={requestedScenario}
            remainingCount={remainingCount}
            coinBalance={walletBalance}
          />

          <div className={`${softPanelClass} grid gap-5 p-4 min-[980px]:p-5`}>
            <div className="relative flex flex-wrap items-start justify-between gap-4 overflow-hidden rounded-[28px] border border-[rgba(163,207,178,0.62)] bg-[linear-gradient(135deg,rgb(225_240_231_/_98%)_0%,rgba(234,249,239,0.97)_58%,rgba(237,246,255,0.95)_100%)] px-[1.2rem] py-[1.05rem] shadow-[0_18px_40px_rgba(109,157,127,0.16)]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute right-[-2rem] top-[-2.5rem] h-[8.5rem] w-[8.5rem] rounded-full bg-[radial-gradient(circle,rgba(193,235,206,0.48),transparent_68%)]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-[-3rem] left-[-1.5rem] h-[8rem] w-[8rem] rounded-full bg-[radial-gradient(circle,rgba(203,226,255,0.32),transparent_70%)]"
              />
              <div className="grid gap-[0.42rem]">
                <p className={`${eyebrowClass} text-[rgba(72,128,92,0.92)]`}>Mastered round</p>
                <h2 className="m-0 font-display text-[1.18rem] leading-[1.28] text-ink-strong">
                  This board is locked for replay and open for review.
                </h2>
                <p className="m-0 max-w-[64ch] text-[0.95rem] leading-[1.58] text-ink-soft">
                  Every document is filed into the correct stage.
                </p>
              </div>
              <Button
                variant="secondary"
                onClick={handleExit}
                className="border-[rgba(145,194,162,0.52)] bg-[rgba(255,255,255,0.84)] text-[rgba(64,122,86,0.96)] shadow-[0_14px_28px_rgba(109,157,127,0.12)] hover:not-disabled:bg-[rgba(251,255,252,0.98)]"
              >
                Back to levels
              </Button>
            </div>

            <StageBucketGrid
              state={reviewState}
              selectedCardId={null}
              dragOverBucketId={null}
              readOnly
              onPlaceSelectedCard={() => undefined}
              onSelectCard={() => undefined}
              onRemoveCard={() => undefined}
              onDropCard={() => undefined}
              onDragEnter={() => undefined}
              onDragLeave={() => undefined}
            />
          </div>
        </div>
      </AppPage>
    );
  }

  if (isLoading || !state.scenario || state.scenario.id !== scenarioId) {
    return (
      <AppPage
        className={sprintPageClassName}
        pageClassName={sprintPageWrapperClassName}
        onHomeClick={handleExit}
      >
        <div className={`${pageShellClass} gap-[1.2rem]`}>
          <Card className="p-8 text-center" tone="spotlight">
            <p className={`${eyebrowClass} text-[rgba(244,247,255,0.72)]`}>Preparing the board</p>
            <h1 className="mt-[0.7rem] mb-0 font-display text-[clamp(2rem,4vw,3rem)] text-white">
              Pulling the right folders and paper tiles into place.
            </h1>
          </Card>
        </div>
      </AppPage>
    );
  }

  if (state.lastError && state.status === "idle") {
    return (
      <AppPage
        className={sprintPageClassName}
        pageClassName={sprintPageWrapperClassName}
        onHomeClick={handleExit}
      >
        <div className={`${pageShellClass} gap-[1.2rem]`}>
          <Card className="p-8 text-center" tone="spotlight">
            <p className={`${eyebrowClass} text-[rgba(244,247,255,0.72)]`}>Challenge unavailable</p>
            <h1 className="mt-[0.7rem] mb-0 font-display text-[clamp(2rem,4vw,3rem)] text-white">
              {state.lastError}
            </h1>
            <Button variant="secondary" onClick={() => navigate("/")}>
              Back to lesson
            </Button>
          </Card>
        </div>
      </AppPage>
    );
  }

  const unplacedCards = selectUnplacedCards(state);
  const remainingCount = selectRemainingCardCount(state);
  const selectedCard = pickedCardId ? selectCardById(state, pickedCardId) : null;
  const submitDisabled = remainingCount > 0;
  const scenario = state.scenario;

  function handleSelectCard(cardId: string) {
    setPickedCardId((current) => (current === cardId ? null : cardId));
    setWarningMessage(null);
  }

  function handlePlaceIntoBucket(bucketId: string) {
    if (!pickedCardId) {
      return;
    }

    const card = selectCardById(state, pickedCardId);
    const bucketLabel = selectBucketLabel(state, bucketId);

    placeCard(pickedCardId, bucketId);
    setLiveMessage(getPlacementAnnouncement(card?.title ?? "Document", bucketLabel));
    setToastMessage(`${card?.title ?? "Document"} filed under ${bucketLabel}.`);
    setWarningMessage(null);
    setPickedCardId(null);
    setDragOverBucketId(null);
  }

  function handleRemoveCard(cardId: string) {
    const card = selectCardById(state, cardId);
    removeCard(cardId);
    setPickedCardId(cardId);
    setToastMessage(`${card?.title ?? "Document"} returned to the tray.`);
    setLiveMessage(getRemainingAnnouncement(selectRemainingCardCount({
      ...state,
      placements: {
        ...state.placements,
        [cardId]: null
      }
    })));
  }

  async function handleReset() {
    await retryScenario();
    setPickedCardId(null);
    setWarningMessage(null);
    setLiveMessage("Board reset. All documents are back in the tray.");
  }

  async function handleSubmit() {
    if (submitDisabled) {
      setWarningMessage("Place the remaining documents before submitting.");
      setToastMessage("A few documents still need a folder.");
      setLiveMessage(getRemainingAnnouncement(remainingCount));
      return;
    }

    const result = await submitAttempt();

    if (!result) {
      return;
    }

    setLiveMessage(`Practice round complete. Accuracy ${result.accuracyPercent} percent.`);
    navigate(`/results/${scenario.id}`);
  }

  function handleExit() {
    if (exitScenario) {
      trackEvent("paper_trail_exit_clicked", {
        scenarioId: exitScenario.id,
        lessonId: exitScenario.lessonId,
        difficulty: exitScenario.difficulty
      });
    }

    integration.onExit?.();
    navigate("/");
  }

  return (
    <AppPage
      className={sprintPageClassName}
      pageClassName={sprintPageWrapperClassName}
      onHomeClick={handleExit}
    >
      <div className={`${pageShellClass} gap-[1.2rem]`}>
        <SprintHeader
          scenario={scenario}
          remainingCount={remainingCount}
          coinBalance={walletBalance}
        />

        <div
          className={`${softPanelClass} grid items-start gap-5 p-4 min-[980px]:grid-cols-[minmax(270px,0.92fr)_minmax(0,2fr)] min-[980px]:p-5 min-[1280px]:grid-cols-[minmax(240px,0.72fr)_minmax(0,3fr)]`}
        >
          <div className="grid h-full gap-4">
            <DocumentTray
              cards={unplacedCards}
              selectedCardId={pickedCardId}
              highlightCards={Boolean(warningMessage)}
              onSelectCard={handleSelectCard}
              onDragStart={setPickedCardId}
              onDragEnd={() => setDragOverBucketId(null)}
            />
          </div>

          <div className="grid h-full gap-4">
            <StageBucketGrid
              state={state}
              selectedCardId={pickedCardId}
              dragOverBucketId={dragOverBucketId}
              onPlaceSelectedCard={handlePlaceIntoBucket}
              onSelectCard={handleSelectCard}
              onRemoveCard={handleRemoveCard}
              onDropCard={(bucketId, cardId) => {
                const card = selectCardById(state, cardId);
                const bucketLabel = selectBucketLabel(state, bucketId);
                placeCard(cardId, bucketId);
                setLiveMessage(getPlacementAnnouncement(card?.title ?? "Document", bucketLabel));
                setToastMessage(`${card?.title ?? "Document"} filed under ${bucketLabel}.`);
                setWarningMessage(null);
                setPickedCardId(null);
                setDragOverBucketId(null);
              }}
              onDragEnter={setDragOverBucketId}
              onDragLeave={() => setDragOverBucketId(null)}
            />
          </div>
        </div>

        <SprintActionBar
          submitDisabled={submitDisabled}
          warningMessage={warningMessage}
          onReset={handleReset}
          onSubmit={handleSubmit}
          onExit={handleExit}
        />

        <div className={hiddenLiveRegionClass} aria-live="polite" aria-atomic="true">
          {liveMessage}
        </div>
      </div>

      <Toast message={toastMessage} tone={warningMessage ? "warning" : "info"} />
    </AppPage>
  );
}

function createSolvedReviewState(scenario: SprintScenario, entryPoint: EntryPoint): SprintState {
  return {
    status: "complete",
    entryPoint,
    scenario,
    placements: buildSolvedPlacements(scenario),
    startedAt: null,
    submittedAt: null,
    result: null,
    attemptCount: 0,
    rewardStatus: "idle",
    lastError: null
  };
}
