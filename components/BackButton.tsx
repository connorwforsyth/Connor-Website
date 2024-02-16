import Link from "next/link";
export default function BackButton({ label }: { label: string }) {
  return (
    <div className="mx-auto mb-3 w-full max-w-2xl">
      <Link
        href="./"
        className="sticky top-3 z-10 gap-3 rounded-full border bg-slate-50 px-2 py-1 text-sm decoration-gray-500 transition-all hover:decoration-black"
      >
        <span
          basics-css-icon=""
          className="translate-y-[1px]"
          data-icon="arrow-left-curve"
          role="img"
          aria-label="arrow-up-left-icon"
        />
        <span className="px-1">{label}</span>
      </Link>
    </div>
  );
}
