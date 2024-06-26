import { cn } from "@/lib/utils";
import { ReactElement } from "react";
type comment = {
  text: ReactElement;
  children: any;
};

// lg:bg-zinc-300 lg:dark:bg-zinc-700
export default function Comment({ text, children }: comment) {
  return (
    <span className="lg:cursor-crosshair">
      <span className="decoration-zinc-500 decoration-[1.5px] underline-offset-4 transition-all *:transition-all hover:decoration-zinc-950 hover:dark:decoration-zinc-400 lg:bg-zinc-300 lg:underline *:hover:lg:border-l-zinc-950 lg:dark:bg-zinc-800 *:hover:dark:lg:border-l-zinc-400 ">
        {children}
        <span
          className={cn(
            ` before:content-['_('] after:content-[')'] lg:absolute lg:right-[-11.25rem] lg:w-[11rem] lg:border-l-[1.5px] lg:border-zinc-500 lg:pl-2.5  lg:text-sm lg:normal-case lg:first-letter:uppercase lg:before:content-none lg:after:content-['.']  xl:right-[-20rem] xl:w-[18rem]`,
          )}
        >
          {text}
        </span>
      </span>
    </span>
  );
}
