import Link from "next/link";

type BackType = {
  label: string;
  icon: string;
};

export default function BackButton({ label }: { label: string }) {
  const svgIcon =
    label === "Index" ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="h-3 w-3 scale-x-[-1]"
      >
        <path
          fillRule="evenodd"
          d="M12.207 2.232a.75.75 0 0 0 .025 1.06l4.146 3.958H6.375a5.375 5.375 0 0 0 0 10.75H9.25a.75.75 0 0 0 0-1.5H6.375a3.875 3.875 0 0 1 0-7.75h10.003l-4.146 3.957a.75.75 0 0 0 1.036 1.085l5.5-5.25a.75.75 0 0 0 0-1.085l-5.5-5.25a.75.75 0 0 0-1.06.025Z"
          clipRule="evenodd"
        />
      </svg>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-3 w-3"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m19.5 19.5-15-15m0 0v11.25m0-11.25h11.25"
        />
      </svg>
    );

  return (
    <div className="font-rodney mx-auto mb-8 w-full max-w-2xl lg:mb-[2px] lg:max-w-5xl">
      <div className="flex">
        <Link
          href="./"
          className="align-center flex items-center gap-0.5 rounded-full border border-zinc-300 px-2 py-1 text-sm transition-all hover:border-zinc-500 hover:shadow-md dark:border-zinc-500 dark:hover:border-zinc-50 lg:fixed"
        >
          {svgIcon}
          <span className="translate-y-[-1px] px-1">{label}</span>
        </Link>
      </div>
    </div>
  );
}
