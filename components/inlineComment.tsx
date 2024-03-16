import { cn } from "@/lib/utils";
type comment = {
  text: string;
  children: any;
};

export default function Comment({ text, children }: comment) {
  return (
    <span>
      <span className=" lg:bg-zinc-300 lg:dark:bg-zinc-700">{children}</span>
      <span
        className={cn(
          `opacity-70 before:content-['_('] after:content-[')'] lg:absolute  lg:right-[-11rem] lg:w-[11rem] lg:border-l lg:border-zinc-500 lg:pl-2.5  lg:text-sm lg:normal-case lg:first-letter:uppercase lg:before:content-none lg:after:content-['.']  xl:right-[-16.5rem] xl:w-[16.5rem]`,
        )}
      >
        {text}
      </span>
    </span>
  );
}
