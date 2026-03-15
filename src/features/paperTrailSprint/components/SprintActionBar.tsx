import { Button } from "@/shared/components/Button";
import { softPanelClass } from "@/shared/styles/patterns";

interface SprintActionBarProps {
  submitDisabled: boolean;
  warningMessage: string | null;
  onReset: () => void;
  onSubmit: () => void;
  onExit: () => void;
}

export function SprintActionBar({
  submitDisabled,
  warningMessage,
  onReset,
  onSubmit,
  onExit
}: SprintActionBarProps) {
  return (
    <footer
      className={`${softPanelClass} flex flex-wrap items-center justify-between gap-4 px-[1.25rem] py-[1.2rem] shadow-[0_22px_44px_rgba(92,112,208,0.16)]`}
    >
      <div>
        <strong className="font-display text-[1.02rem] font-semibold text-ink-strong">Finish the round</strong>
        <p className="m-0 mt-[0.35rem] max-w-[46ch] text-[0.95rem] leading-[1.5] text-ink-soft">
          {warningMessage ?? "Every document needs a folder before you can submit."}
        </p>
      </div>
      <div className="flex flex-wrap gap-[0.7rem]">
        <Button variant="ghost" onClick={onExit}>
          Exit
        </Button>
        <Button variant="secondary" onClick={onReset}>
          Reset board
        </Button>
        <Button onClick={onSubmit} disabled={submitDisabled}>
          Submit practice
        </Button>
      </div>
    </footer>
  );
}
