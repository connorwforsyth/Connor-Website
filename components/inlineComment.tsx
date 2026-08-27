import { cn } from "@/lib/utils";
import { ReactElement } from "react";
type comment = {
  text: ReactElement;
  children: ReactElement;
};

export default function Comment({ text, children }: comment) {
  return (
    <span className="inline lg:cursor-crosshair">
      <mark className="bg-transparent decoration-muted-foreground decoration-[1.5px] underline-offset-4 transition-all *:transition-all hover:decoration-foreground text-foreground lg:bg-muted lg:underline *:hover:lg:border-l-foreground lg:dark:text-foreground/80 lg:hover:dark:text-foreground ">
        {children}
        <span
          className={cn(
            ` before:content-['_('] after:content-[')'] lg:absolute lg:right-[-11.25rem] lg:w-[11rem] lg:border-l-[1.5px] lg:border-border lg:pl-2.5  lg:text-sm lg:normal-case lg:first-letter:uppercase lg:before:content-none lg:after:content-['.']  xl:right-[-20rem] xl:w-[18rem]`,
          )}
        >
          {text}
        </span>
      </mark>
    </span>
  );
}
