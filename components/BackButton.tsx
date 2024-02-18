import Link from "next/link";
export default function BackButton({ label }: { label: string }) {
  return (
    <div className="mx-auto mb-8 w-full max-w-2xl md:mb-[2px] md:max-w-6xl">
      <div className="flex">
        <Link
          href="./"
          className="z-1 align-center flex items-center gap-0.5 rounded-full border bg-slate-50 px-2 py-1 text-sm decoration-gray-500 transition-all hover:decoration-black  hover:shadow-md dark:bg-transparent md:fixed"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-3 w-3 translate-y-[-1px] scale-x-[-1]"
          >
            <path
              fillRule="evenodd"
              d="M12.207 2.232a.75.75 0 0 0 .025 1.06l4.146 3.958H6.375a5.375 5.375 0 0 0 0 10.75H9.25a.75.75 0 0 0 0-1.5H6.375a3.875 3.875 0 0 1 0-7.75h10.003l-4.146 3.957a.75.75 0 0 0 1.036 1.085l5.5-5.25a.75.75 0 0 0 0-1.085l-5.5-5.25a.75.75 0 0 0-1.06.025Z"
              clipRule="evenodd"
            />
          </svg>
          <span className="px-1">{label}</span>
        </Link>
      </div>
    </div>
  );
}
