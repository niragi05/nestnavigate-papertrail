import { AnimatePresence } from "motion/react";
import { Routes, Route, useLocation } from "react-router-dom";
import { LessonCompletionDemoPage } from "@/pages/LessonCompletionDemoPage";
import { PaperTrailSprintPage } from "@/pages/PaperTrailSprintPage";
import { SprintResultsPage } from "@/pages/SprintResultsPage";

export function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LessonCompletionDemoPage />} />
        <Route path="/sprint/:scenarioId" element={<PaperTrailSprintPage />} />
        <Route path="/results/:scenarioId" element={<SprintResultsPage />} />
      </Routes>
    </AnimatePresence>
  );
}
