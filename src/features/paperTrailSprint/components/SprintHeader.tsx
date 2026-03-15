import { motion } from "motion/react";
import { Badge } from "@/shared/components/Badge";
import { ProgressPill } from "@/shared/components/ProgressPill";
import type { SprintScenario } from "@/features/paperTrailSprint/state/types";

interface SprintHeaderProps {
  scenario: SprintScenario;
  remainingCount: number;
  coinBalance: number;
}

export function SprintHeader({ scenario, remainingCount, coinBalance }: SprintHeaderProps) {
  return (
    <motion.header
      className="relative overflow-hidden rounded-[38px] border border-[rgba(150,168,255,0.22)] bg-[linear-gradient(180deg,#344fdd_0%,#5871ef_58%,#7d86ff_100%)] px-[1.35rem] py-[1.5rem] shadow-lifted min-[900px]:px-[1.8rem] min-[900px]:py-[1.8rem]"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32 }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-5rem] right-[-4rem] h-[13rem] w-[13rem] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.32),transparent_68%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-4rem] left-[-3rem] h-[10rem] w-[10rem] rounded-full bg-[radial-gradient(circle,rgba(183,214,255,0.3),transparent_70%)]"
      />

      <div className="relative z-[1]">
        <Badge
          tone="accent"
          className="border-[rgba(255,255,255,0.24)] bg-[rgba(255,255,255,0.16)] text-white"
        >
          Paper Trail Sprint
        </Badge>
        <h1 className="mt-[0.95rem] mb-[0.5rem] max-w-[18ch] font-display text-[clamp(2.15rem,4vw,3.5rem)] leading-[0.95] text-white">
          {scenario.title}
        </h1>
        <p className="m-0 max-w-[64ch] text-[1rem] leading-[1.65] text-[rgba(245,247,255,0.88)]">
          {scenario.shortDescription}
        </p>
      </div>

      <div className="relative z-[1] mt-[1.2rem] flex flex-wrap gap-[0.8rem]">
        <ProgressPill label="Difficulty" value={scenario.difficulty} />
        <ProgressPill label="Est. time" value={`${scenario.estimatedMinutes} min`} />
        <ProgressPill label="Left to place" value={`${remainingCount}`} />
        <ProgressPill label="Wallet" value={`${coinBalance.toLocaleString()} coins`} />
      </div>
    </motion.header>
  );
}
