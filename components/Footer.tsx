import { ModeToggle } from "./mode-toggle";
export default function Footer() {
  const date = new Date();
  let year = date.getFullYear();
  return (
    <footer className="p-3 place-items-baseline border-t text-sm border-opacity-50 border-gray-300">
      <p>
        <span className="">☺</span>
        Connor Forsyth {year}
      </p>
      <ModeToggle />
    </footer>
  );
}
