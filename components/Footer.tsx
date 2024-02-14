import { ModeToggle } from "./mode-toggle";
export default function Footer() {
  const date = new Date();
  let year = date.getFullYear();
  return (
    <footer className="relative flex flex-col gap-2 border-t border-gray-300 border-opacity-50 p-3 text-sm text-gray-700 dark:text-gray-400 sm:flex-row sm:items-center">
      {/* <div className="flex flex-grow">
        Last Visit: <span>Location</span>
        <div className="flex-grow"></div>
      </div> */}
      <div>
        <span className="inline-block -translate-y-[1.1px]">☺</span>
        Connor Forsyth {year}
      </div>
      <div className="relative flex sm:flex-grow">
        <div className="sm:flex-grow"></div>
        <div className="flex-shrink">
          <ModeToggle />
        </div>
      </div>
    </footer>
  );
}
