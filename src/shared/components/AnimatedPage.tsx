import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

interface AnimatedPageProps {
  children: ReactNode;
  className?: string;
}

export function AnimatedPage({ children, className }: AnimatedPageProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.main
      className={className}
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
      animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
      transition={{ duration: reduceMotion ? 0.14 : 0.38, ease: "easeOut" }}
    >
      {children}
    </motion.main>
  );
}
