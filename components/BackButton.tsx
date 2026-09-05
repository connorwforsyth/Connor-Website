import Link from "next/link";

type BackType = {
  type?: string;
  label: string;
  href: string;
  icon?: string;
};

export default function BackButton({ type, label, href }: BackType) {
  const svgIcon =
    label === "Index" ? (
      <svg
        className="h-3 w-3 scale-x-[-1]"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          clipRule="evenodd"
          d="M12.207 2.232a.75.75 0 0 0 .025 1.06l4.146 3.958H6.375a5.375 5.375 0 0 0 0 10.75H9.25a.75.75 0 0 0 0-1.5H6.375a3.875 3.875 0 0 1 0-7.75h10.003l-4.146 3.957a.75.75 0 0 0 1.036 1.085l5.5-5.25a.75.75 0 0 0 0-1.085l-5.5-5.25a.75.75 0 0 0-1.06.025Z"
          fillRule="evenodd"
        />
      </svg>
    ) : (
      <svg
        className="h-3 w-3"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="m19.5 19.5-15-15m0 0v11.25m0-11.25h11.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );

  const wrapperClass =
    "mx-auto mb-8 w-full max-w-2xl font-rodney italic lg:mb-[2px] lg:max-w-5xl";
  const linkClass =
    "flex items-center gap-0.5 rounded-full border border-border px-2 py-1 align-center text-sm transition-all hover:border-foreground hover:shadow-md lg:fixed";

  return (
    <div className={wrapperClass} data-back-type={type}>
      <div className="flex">
        <Link className={linkClass} href={href}>
          {svgIcon}
          <span className="translate-y-[-1px] px-1">{label}</span>
        </Link>
      </div>
    </div>
  );
}
