import type { ReactNode } from "react";
import { AnimatedPage } from "@/shared/components/AnimatedPage";
import { AppHeader } from "@/shared/components/AppHeader";
import { cn } from "@/shared/lib/cn";

interface AppPageProps {
  children: ReactNode;
  className?: string;
  pageClassName?: string;
  onHomeClick?: () => void | Promise<void>;
}

export function AppPage({ children, className, pageClassName, onHomeClick }: AppPageProps) {
  return (
    <div className={cn("min-h-screen", pageClassName)}>
      <AppHeader onHomeClick={onHomeClick} />
      <AnimatedPage className={className}>{children}</AnimatedPage>
    </div>
  );
}
