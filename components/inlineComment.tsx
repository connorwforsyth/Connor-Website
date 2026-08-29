import type { ReactElement } from "react";
import { cn } from "@/lib/utils";

type comment = {
  text: ReactElement;
  children: ReactElement;
};

export default function Comment({ text, children }: comment) {
  return (
    <span className="inline lg:cursor-crosshair">
      <mark className="bg-transparent text-foreground decoration-[1.5px] decoration-muted-foreground underline-offset-4 transition-all *:transition-all hover:decoration-foreground lg:bg-muted lg:underline *:hover:lg:border-l-foreground lg:dark:text-foreground/80 lg:hover:dark:text-foreground">
        {children}
        <span
          className={cn(
            `before:content-['_('] after:content-[')'] lg:absolute lg:right-[-11.25rem] lg:w-[11rem] lg:border-border lg:border-l-[1.5px] lg:pl-2.5 lg:text-sm lg:normal-case lg:after:content-['.'] lg:before:content-none lg:first-letter:uppercase xl:right-[-20rem] xl:w-[18rem]`
          )}
        >
          {text}
        </span>
      </mark>
    </span>
  );
}
