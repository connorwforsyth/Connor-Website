import { ModeToggle } from "./mode-toggle";
export default function Footer() {
  const date = new Date();
  let year = date.getFullYear();
  return (
    <footer className="border-t border-zinc-300 border-opacity-50 text-sm text-zinc-700 dark:text-zinc-400 ">
      {/* <div className="flex flex-grow">
        Last Visit: <span>Location</span>
        <div className="flex-grow"></div>
      </div> */}
      <div className="mx-auto flex w-full max-w-2xl p-3 align-baseline">
        <div className="flex h-full p-1">
          <span className="translate-y-[-2px] pr-1 font-mono text-[1rem]">
            ☺{" "}
          </span>{" "}
          Connor Forsyth {year}
        </div>
        <div className="relative flex flex-grow">
          <div className="flex-grow"></div>
          <div className="flex-shrink">
            <ModeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
