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
      <div className="mx-auto flex w-full max-w-2xl px-3 py-3 align-baseline sm:px-0">
        <div className="h-full gap-0.5 p-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
            className="my-auto inline h-4 w-3 pb-[2.2px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
            />
          </svg>
          <span className="sr-only">☺︎</span>
          <span> </span>
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
