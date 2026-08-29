import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type NavigationButtonProps = {
  direction: "FORWARD" | "BACKWARD";
  onClick: () => void;
  isActive?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function NavigationButton({
  direction,
  onClick,
  className,
}: NavigationButtonProps) {
  const [isActive, setIsActive] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleAction = useCallback(() => {
    setIsActive(true);
    onClick();
    buttonRef.current?.focus();
    requestAnimationFrame(() => {
      setTimeout(() => {
        setIsActive(false);
      }, 100);
    });
  }, [onClick]);

  useEffect(() => {
    const isCorrectKey = (key: string) =>
      (direction === "BACKWARD" && key === "ArrowLeft") ||
      (direction === "FORWARD" && key === "ArrowRight");

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isCorrectKey(e.key)) {
        e.preventDefault();
        handleAction();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [direction, handleAction]);

  return (
    <button
      className={cn(
        "flex items-center gap-2 rounded-md bg-zinc-800 p-2 text-white text-xs hover:bg-zinc-700 focus:outline-none focus:ring-1 focus:ring-zinc-400 active:bg-zinc-700 active:ring-zinc-400",
        isActive && "ring-2",
        className
      )}
      onBlur={() => setIsActive(false)}
      onClick={handleAction}
      ref={buttonRef}
      type="button"
    >
      {direction === "BACKWARD" && (
        <span className={cn("text-xs opacity-50", isActive && "opacity-100")}>
          ←
        </span>
      )}

      {direction === "BACKWARD" ? "Previous" : "Next"}

      {direction === "FORWARD" && (
        <span className={cn("text-xs opacity-50", isActive && "opacity-100")}>
          →
        </span>
      )}
    </button>
  );
}
