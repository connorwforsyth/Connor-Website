import { ModeToggle } from "./mode-toggle";
export default function Footer() {
  const date = new Date();
  let year = date.getFullYear();
  return (
    <footer className="place-items-baseline border-t border-gray-300 border-opacity-50 p-3 text-sm">
      <p>
        Last Visit: <span>Location</span>
      </p>
      <p>
        <span className="">☺</span>
        Connor Forsyth {year}
      </p>
      <ModeToggle />
    </footer>
  );
}
