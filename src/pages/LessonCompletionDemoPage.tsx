import { motion } from "motion/react";
import { AppPage } from "@/shared/components/AppPage";
import { Card } from "@/shared/components/Card";
import { Badge } from "@/shared/components/Badge";
import { Button } from "@/shared/components/Button";
import { getPreviewDocumentTitles } from "@/features/paperTrailSprint/data/scenarios";
import { usePaperTrailSprint } from "@/features/paperTrailSprint/hooks/usePaperTrailSprint";
import { PracticeCard } from "@/features/paperTrailSprint/integration/PracticeCard";
import {
  eyebrowClass,
  pageShellClass,
  spotlightPanelClass
} from "@/shared/styles/patterns";

export function LessonCompletionDemoPage() {
  const { walletBalance } = usePaperTrailSprint();
  const previewTitles = getPreviewDocumentTitles(8);

  return (
    <AppPage className="px-4 pt-4 pb-12 min-[900px]:pt-6">
      <div className={`${pageShellClass} gap-[1.6rem]`}>
        <section
          className={`${spotlightPanelClass} relative grid items-center gap-6 p-[1.8rem] min-[900px]:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.9fr)] min-[900px]:p-[2rem]`}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-[-4rem] top-[-4rem] h-[14rem] w-[14rem] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.2),transparent_68%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[-3rem] left-[-2rem] h-[10rem] w-[10rem] rounded-full bg-[radial-gradient(circle,rgba(188,220,255,0.28),transparent_68%)]"
          />
          <div className="relative z-[1]">
            <Badge
              tone="accent"
              className="border-[rgba(255,255,255,0.24)] bg-[rgba(255,255,255,0.14)] text-white"
            >
              Lesson complete
            </Badge>
            <h1 className="mt-[1rem] mb-[0.8rem] font-display text-[clamp(2.52rem,4.75vw,4.37rem)] leading-[0.92] text-white">
              Mortgage Basics is fresh in your mind. Now make it feel real.
            </h1>

            <div className="mt-[1.4rem] flex flex-wrap gap-4">
              <div className="min-w-[160px] rounded-full border border-[rgba(255,255,255,0.2)] bg-[#FDF8F3] px-[2rem] py-[1rem] backdrop-blur-[16px]">
                <span className="block text-[0.78rem] uppercase tracking-[0.12em] text-ink-soft">
                  Coins balance
                </span>
                <strong className="mt-[0.35rem] block font-display text-[1.28rem] font-semibold text-ink-strong">
                  {walletBalance.toLocaleString()}
                </strong>
              </div>
              <div className="min-w-[160px] rounded-full border border-[rgba(255,255,255,0.2)] bg-[#FDF8F3] px-[2rem] py-[1rem] backdrop-blur-[16px]">
                <span className="block text-[0.78rem] uppercase tracking-[0.12em] text-ink-soft">
                  Today’s streak
                </span>
                <strong className="mt-[0.35rem] block font-display text-[1.28rem] font-semibold text-ink-strong">4 days</strong>
              </div>
            </div>
          </div>

          <motion.div
            className="relative min-h-[320px] min-[900px]:min-h-[400px]"
            initial={{ opacity: 0, rotate: -4, y: 20 }}
            animate={{ opacity: 1, rotate: 0, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="absolute right-[0.4rem] top-[0.5rem] h-[5rem] w-[5rem] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.28),transparent_70%)] blur-[4px]" />
            <div className="absolute bottom-[1.1rem] left-[0.4rem] h-[4rem] w-[4rem] rounded-full bg-[radial-gradient(circle,rgba(195,226,255,0.24),transparent_70%)] blur-[2px]" />
            <div
              className="absolute inset-y-[0.6rem] right-[0.4rem] left-[0.2rem] rotate-[-6deg] rounded-[34px] bg-[#f3c77d61] shadow-card"
              aria-hidden="true"
            />
            <div className="absolute inset-y-[1rem] right-0 left-[0.6rem] rounded-[34px] bg-[#FDF8F3] p-[1rem] shadow-card">
              <div className="flex items-center justify-between gap-3">
                <div></div>
              </div>

              <ul className="mt-[1rem] grid grid-cols-2 gap-x-[1rem]">
                {previewTitles.map((title) => (
                  <li
                    key={title}
                    className="border-b border-dashed border-[rgba(60,70,60,0.2)] py-[0.65rem] text-[0.85rem] text-ink-strong font-display font-medium"
                  >
                    {title}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </section>

        <PracticeCard
          lessonId="lesson_mortgage_basics"
          lessonTitle="Mortgage Basics"
          startingCoins={145}
        />

        <section className="grid gap-4 min-[900px]:grid-cols-2">
          <Card className="p-[1.5rem] shadow-soft" tone="paper">
            <p className={eyebrowClass}>Why this practice works</p>
            <h2 className="mt-[0.55rem] mb-0 font-display text-[1.24rem] font-semibold text-ink-strong">
              This is application, not trivia.
            </h2>
            <p className="mt-[0.85rem] mb-0 leading-[1.65] text-ink-soft">
              Instead of memorizing definitions, learners rehearse when real paperwork matters. That builds
              confidence at exactly the point homebuying usually becomes intimidating.
            </p>
          </Card>

          <Card className="p-[1.5rem]" tone="sage">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className={eyebrowClass}>Daily challenge teaser</p>
                <h2 className="mt-[0.55rem] mb-0 font-display text-[1.24rem] font-semibold text-ink-strong">
                  Offer to Contract
                </h2>
              </div>
              <Badge tone="warning">Medium</Badge>
            </div>
            <p className="mt-[0.85rem] mb-0 leading-[1.65] text-ink-soft">
              Tomorrow’s round will focus on the handoff from shopping to formal agreement.
            </p>
            <div className="mt-[1rem] mb-[1.1rem] flex flex-wrap gap-3 text-[0.86rem] text-ink-soft">
              <span className="rounded-full border border-[rgba(218,225,255,0.9)] bg-[rgba(244,247,255,0.92)] px-[0.75rem] py-[0.35rem]">
                2 min
              </span>
              <span className="rounded-full border border-[rgba(245,202,101,0.35)] bg-[rgba(255,241,206,0.88)] px-[0.75rem] py-[0.35rem] text-warning">
                Reward preview: +52 coins
              </span>
            </div>
            <Button variant="secondary" disabled>
              Starts in the dashboard
            </Button>
          </Card>
        </section>
      </div>
    </AppPage>
  );
}
