import Link from "next/link";

type ProjectLinkProps = {
  children: React.ReactNode;
  href: string;
};

export default function ProjectLink({ children, href }: ProjectLinkProps) {
  return (
    <span>
      <Link basics-link="" href={href} className="">
        {children}
      </Link>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.8}
        stroke="currentColor"
        className="ml-1 inline h-3 w-3 text-zinc-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
        />
      </svg>
    </span>
  );
    }