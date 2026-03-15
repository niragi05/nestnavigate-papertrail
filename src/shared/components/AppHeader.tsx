import { Link } from "react-router-dom";

interface AppHeaderProps {
  onHomeClick?: () => void | Promise<void>;
}

export function AppHeader({ onHomeClick }: AppHeaderProps) {
  const nestLogoPath = "/brand/nest-logo.svg";
  const brandClassName =
    "inline-flex items-center gap-[0.55rem] rounded-full border-0 bg-transparent px-[0.5rem] py-[0.2rem] text-left transition-transform duration-150 ease-out hover:-translate-y-px focus-visible:outline-none";
  const brandContent = (
    <>
      <img
        src={nestLogoPath}
        alt=""
        className="h-[2rem] w-auto shrink-0 min-[900px]:h-[2.15rem]"
      />
      <span className="font-display text-[clamp(1.6rem,3vw,2rem)] font-semibold leading-none text-[#25273a]">
        NestNavigate
      </span>
    </>
  );

  return (
    <header className="border-b border-[rgba(224,228,241,0.92)] bg-[rgba(255,255,255,0.96)] shadow-[0_10px_26px_rgba(93,110,173,0.08)] backdrop-blur-[10px]">
      <div className="mx-auto flex w-[min(var(--page-max-width),100%)] items-center justify-center px-4 py-[0.9rem] min-[900px]:py-[1rem]">
        {onHomeClick ? (
          <button
            type="button"
            onClick={() => {
              void onHomeClick();
            }}
            className={brandClassName}
            aria-label="Go to NestNavigate home"
          >
            {brandContent}
          </button>
        ) : (
          <Link to="/" className={brandClassName} aria-label="Go to NestNavigate home">
            {brandContent}
          </Link>
        )}
      </div>
    </header>
  );
}
