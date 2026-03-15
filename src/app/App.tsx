import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import { useLocation } from "react-router-dom";
import { PaperTrailSprintProvider } from "@/features/paperTrailSprint/hooks/usePaperTrailSprint";
import { AppRoutes } from "@/app/routes";

const appTitle = "Paper Trail Sprint";
const faviconPath = "/brand/nest-logo.svg?v=2";

export function App() {
  const location = useLocation();

  useEffect(() => {
    document.title = appTitle;
    syncFaviconLink("icon", faviconPath);
    syncFaviconLink("shortcut icon", faviconPath);
  }, [location.pathname]);

  return (
    <PaperTrailSprintProvider>
      <AppRoutes />
      <Analytics />
    </PaperTrailSprintProvider>
  );
}

function syncFaviconLink(rel: string, href: string) {
  let link = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;

  if (!link) {
    link = document.createElement("link");
    link.rel = rel;
    document.head.appendChild(link);
  }

  link.type = "image/svg+xml";
  link.href = href;
}
