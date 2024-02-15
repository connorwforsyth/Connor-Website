import { ModeToggle } from "./mode-toggle";
export default function Footer() {
  const date = new Date();
  let year = date.getFullYear();
  return (
    <footer className="flex justify-center border-t border-gray-300 border-opacity-50 text-sm text-gray-700 dark:text-gray-400 sm:flex-row sm:items-center">
      {/* <div className="flex flex-grow">
        Last Visit: <span>Location</span>
        <div className="flex-grow"></div>
      </div> */}
      <div className="flex max-w-2xl flex-grow p-3 align-baseline">
        <div className="flex h-full p-1">
          <span className="translate-y-[-1px] text-[1rem]">☺ </span> Connor
          Forsyth {year}
        </div>
        <div className="relative flex sm:flex-grow">
          <div className="sm:flex-grow"></div>
          <div className="flex-shrink">
            <ModeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
