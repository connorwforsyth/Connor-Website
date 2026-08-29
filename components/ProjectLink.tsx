import Link from "next/link";

type ProjectLinkProps = {
  children: React.ReactNode;
  href: string;
};

export default function ProjectLink({ children, href }: ProjectLinkProps) {
  return (
    <span>
      <Link basics-link="" className="" href={href}>
        {children}
      </Link>
      <svg
        className="ml-1 inline h-3 w-3 text-muted-foreground"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
