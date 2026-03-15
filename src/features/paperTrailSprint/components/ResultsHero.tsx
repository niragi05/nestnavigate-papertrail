import { motion, useReducedMotion } from "motion/react";
import { Badge } from "@/shared/components/Badge";
import type { SprintResult, SprintScenario } from "@/features/paperTrailSprint/state/types";
import { getResultsHeadline } from "@/features/paperTrailSprint/utils/feedback";

interface ResultsHeroProps {
  result: SprintResult;
  scenario: SprintScenario;
  rewardFailed: boolean;
  walletBalance: number;
}

export function ResultsHero({ result, scenario, rewardFailed, walletBalance }: ResultsHeroProps) {
  const reduceMotion = useReducedMotion();
  const sparkles = reduceMotion ? [] : [0, 1, 2, 3, 4];

  return (
    <section className="grid gap-5 min-[900px]:grid-cols-[minmax(0,1.5fr)_minmax(260px,0.9fr)] min-[900px]:items-stretch">
      <div className="relative overflow-hidden rounded-[36px] border border-[rgba(150,168,255,0.2)] bg-[linear-gradient(180deg,#3550de_0%,#5872f0_58%,#7f88ff_100%)] p-[1.6rem] text-white shadow-lifted">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-2rem] top-[-2rem] h-[10rem] w-[10rem] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.26),transparent_68%)]"
        />
        <div className="relative z-[1]">
          <Badge
            tone={result.perfectRun ? "success" : "warning"}
            className={
              result.perfectRun
                ? "border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.14)] text-white"
                : ""
            }
          >
          {result.perfectRun ? "Perfect filing run" : "Round complete"}
        </Badge>
          <h1 className="mt-[1rem] mb-[0.7rem] max-w-[14ch] font-display text-[clamp(2rem,4vw,3.35rem)] leading-[0.98] text-white">
            {getResultsHeadline(result)}
          </h1>
          <p className="m-0 max-w-[60ch] text-[1.02rem] leading-[1.65] text-[rgba(245,247,255,0.88)]">
            {result.perfectRun ? scenario.successMessage : scenario.retryMessage}
          </p>
          {rewardFailed ? (
            <p className="mt-[0.8rem] mb-0 text-[rgba(255,239,191,0.96)]">
              Reward could not be saved right now, but your score is still here.
            </p>
          ) : null}
        </div>
      </div>

      <motion.div
        className="relative overflow-hidden rounded-[36px] border border-[rgba(151,167,255,0.22)] bg-[linear-gradient(180deg,#3652df_0%,#5b73ef_58%,#8188ff_100%)] p-[1.6rem] text-white shadow-lifted"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[40%] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.22),transparent_62%)]"
        />
        <div className="relative z-[1] text-[0.82rem] uppercase tracking-[0.16em] text-[rgba(245,247,255,0.82)]">
          NestCoins earned
        </div>
        <div className="relative z-[1] mt-[1rem] text-[clamp(2.8rem,7vw,4.4rem)] leading-[0.95] font-black">
          +{result.coinsEarned}
        </div>
        <div className="relative z-[1] mt-[0.55rem] text-[rgba(245,247,255,0.82)]">
          {result.correctCount} correct placements
        </div>
        {!rewardFailed ? (
          <div className="relative z-[1] mt-[1rem] inline-flex flex-wrap items-center gap-[0.55rem] rounded-full border border-[rgba(255,255,255,0.22)] bg-[rgba(255,255,255,0.14)] px-[0.95rem] py-[0.55rem] text-white">
            <span className="text-[0.72rem] uppercase tracking-[0.14em] text-[rgba(245,247,255,0.76)]">
              Wallet total now
            </span>
            <strong className="text-[0.96rem] font-semibold">
              {walletBalance.toLocaleString()} coins
            </strong>
          </div>
        ) : null}
        {sparkles.map((sparkle) => (
          <motion.span
            key={sparkle}
            className="absolute h-3 w-3 rounded-full bg-[rgba(255,224,123,0.92)] shadow-[0_0_18px_rgba(255,224,123,0.55)]"
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: [0, 1, 0], scale: [0.3, 1, 0.4], y: [-2, -16, -24] }}
            transition={{
              repeat: Infinity,
              duration: 2.2,
              delay: sparkle * 0.22,
              ease: "easeOut"
            }}
            style={{
              left: `${10 + sparkle * 18}%`,
              top: sparkle % 2 === 0 ? "10%" : "72%"
            }}
          />
        ))}
      </motion.div>
    </section>
  );
}
