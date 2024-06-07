import Link from "next/link";
import "../styles/icons.css";
import { Collaborators } from "@/components/Collaborators";
import Image from "next/image";
import { Metadata } from "next";
import siteMetadata from "@/config/site-metadata";

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: siteMetadata.title,
  description: siteMetadata.description,
  openGraph: {
    type: "website",
    url: siteMetadata.siteUrl,
    title: siteMetadata.title,
    description: siteMetadata.description,
    siteName: siteMetadata.title,
    images: {
      url: `${siteMetadata.siteUrl}/api/og/?title=${siteMetadata.title}`,
    },
  },
};

export default function Home() {
  type ContentItem = {
    href: string;
    title: string;
    description?: string;
    external?: boolean;
  };

  type Content = {
    title: string;
    items: ContentItem[];
  };
  const contents: Content[] = [
    {
      title: "Projects",
      items: [
        {
          title: "All Projects",

          href: "/projects",
        },
        {
          title: "Makeit — by Designit",
          description: "Building a routine for design strategy.",
          href: "/projects/makeit",
          external: true,
        },
        {
          title: "TEDxMelbourne",
          description: "Evolving digital and in-person experiences.",
          href: "projects/tedxmelbourne",
          external: true,
        },
      ],
    },
    {
      title: "Writing",
      items: [
        {
          title: "All Writing",

          href: "/writing",
        },
        {
          title: "2024 Portfolio Readme",
          description: "A guide to my portfolio and website.",
          href: "/writing/readme",
        },
        {
          title: "Miro Design Systems",
          description: "An atomic structure for Miro workshops.",
          href: "/writing/miro-design-system",
        },
      ],
    },
  ];

  return (
    <div className="mx-auto w-full max-w-2xl flex-col text-pretty ">
      <div className="flex flex-col gap-3 dark:text-zinc-300">
        <h1 className="pb-4 text-xl text-zinc-800 dark:text-zinc-50">
          Connor Forsyth
        </h1>
        <div className=" flex flex-col gap-3" data-animate="" basic-stagger="1">
          <p>
            I am a designer and technologist with a focus on design sprints,
            agile methodologies, and web development. I currently work as a
            service designer at{" "}
            <Link
              href="https://designit.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Designit
            </Link>{" "}
            and as an academic tutor at{" "}
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://sydney.edu.au"
            >
              The University of Sydney
            </Link>
            .
          </p>
          {/* <p>
            Previously, I’ve worked in public and private sector industries,
            startups, local government councils, universities, utilities,
            non-profits, community groups and the events industry. I started my
            career in architecture.
          </p> */}
          <Image
            width="0"
            height="0"
            alt="ConnorForsythHeadshot"
            className="sr-only rounded-lg"
            src="/connorforsyth-headshot.jpg"
          />
          <p>
            Outside of work, you’ll find me working on small web projects,
            geeking out to music, and brewing filter coffee. Day by day, working
            to improve all aspects of my craft.
          </p>
        </div>
      </div>

      {/*Posts*/}

      <div
        data-animate=""
        basic-stagger="2"
        className=" my-8 flex flex-col gap-4"
      >
        {contents.map((column) => (
          <div key={column.title} className="">
            <h2 className="mb-2 text-zinc-700 dark:text-zinc-100">
              <em>{column.title}</em>
            </h2>
            <div className="grid gap-4 sm:grid-cols-3 ">
              {column.items.map((item) => (
                <div className="" key={item.title}>
                  {item.title.includes("All") ? (
                    <span className="pr-10">
                      <Link basics-link="" href={item.href} className="">
                        {item.title}
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
                  ) : (
                    <span className="">
                      <Link basics-link="" href={item.href}>
                        {item.title}
                      </Link>
                    </span>
                  )}
                  <p className="text-zinc-600 dark:text-zinc-300">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-3" data-animate="" basic-stagger="3">
        {/* <p>
          I see design as <em>realising ideas.</em>
          Some would say my design process is a little unorthodox, however this
          is overshadowed by my eagnerness to build a positive impact on
          products, services and communtiies. 
        </p>*/}
      </div>
      <div data-animate="" basic-stagger="3" className="flex flex-col gap-4">
        <Collaborators />
      </div>
      <div data-animate="" basic-stagger="4" className="">
        <h2 className="mb-3 text-zinc-700 dark:text-zinc-100">
          <em>Connect</em>
        </h2>
        <p>
          You can reach me on{" "}
          <Link href="https://www.linkedin.com/in/connorwforsyth">
            LinkedIn
          </Link>{" "}
          or <Link href="https://x.com/connorwforsyth">𝕏 (Twitter)</Link> or
          email me:{" "}
          <Link href="mailto:c@connorforsyth.co">c@connorforsyth.co</Link>
        </p>
      </div>
    </div>
  );
}
