import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/shared/lib/cn";

interface ToastProps {
  message: string | null;
  tone?: "info" | "warning";
}

export function Toast({ message, tone = "info" }: ToastProps) {
  const toneClasses = {
    info: "border-[rgba(150,168,255,0.28)] bg-[rgba(255,255,255,0.88)] text-ink-strong",
    warning: "border-[rgba(245,202,101,0.34)] bg-[rgba(255,249,237,0.94)] text-warning"
  };

  return (
    <AnimatePresence>
      {message ? (
        <motion.div
          className={cn(
            "fixed right-5 bottom-5 z-30 w-[calc(100vw-2rem)] max-w-[360px] rounded-[24px] border px-[1rem] py-[0.95rem] shadow-lifted backdrop-blur-[24px]",
            toneClasses[tone]
          )}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          role="status"
          aria-live="polite"
        >
          {message}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
