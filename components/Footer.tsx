import { ModeToggle } from "./mode-toggle";
export default function Footer() {
  const date = new Date();
  let year = date.getFullYear();
  return (
    <footer className="border-t border-stone-300 border-opacity-50 text-sm text-stone-700 dark:text-stone-400 ">
      {/* <div className="flex flex-grow">
        Last Visit: <span>Location</span>
        <div className="flex-grow"></div>
      </div> */}
      <div className="flex max-w-2xl flex-grow p-3 align-baseline">
        <div className="flex h-full p-1">
          <span className="translate-y-[-1px] text-[1rem]">☺ </span> Connor
          Forsyth {year}
        </div>
        <div className="relative flex flex-grow">
          <div className="sm:flex-grow"></div>
          <div className="flex-shrink">
            <ModeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
