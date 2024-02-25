import Link from "next/link";
import "../styles/icons.css";
import { Collaborators } from "@/components/Collaborators";

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
          description: "Evolving the digital and inperson experience.",
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
          title: "Portfolio 2024 Readme",
          description: "A guide to reading my portfolio and website.",
          href: "/writing/readme",
        },
        {
          title: "Miro Design Systems",
          description: "",
          href: "/writing/miro-design-system",
        },
      ],
    },
  ];

  return (
    <div className="mx-auto w-full max-w-2xl flex-col ">
      <div className="flex flex-col gap-3 dark:text-gray-300">
        <h1
          data-animate=""
          className="pb-4 text-xl text-gray-800  dark:text-gray-50"
        >
          Connor Forsyth
        </h1>
        <div className="flex flex-col gap-3" data-animate="" basic-stagger="1">
          <p>
            I’m a designer and technologist with a background in design sprints,
            lean ux, agile and web technology. I currently work as a service
            designer at{" "}
            <Link
              href="https://designit.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Designit
            </Link>{" "}
            and as an academic tutor at{" "}
            <span>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://sydney.edu.au"
              >
                The University of Sydney
              </Link>
            </span>
            .
          </p>
          {/* <p>
            Previously, I’ve worked in public and private sector industries,
            startups, local government councils, universities, utilities,
            non-profits, community groups and the events industry. I started my
            career in architecture.
          </p> */}
          <p>
            Outside of work, you’ll find me working on small web projects,
            bouldering, and brewing coffee.
          </p>
        </div>
      </div>

      {/*Posts*/}

      <div
        data-animate=""
        basic-stagger="2"
        className=" my-8 flex flex-col gap-4 sm:w-[90%]"
      >
        {contents.map((column) => (
          <div
            key={column.title}
            className="border-dotted border-t-zinc-300  dark:border-t-zinc-700  sm:border-none"
          >
            <h2 className="mb-4 text-zinc-700 dark:text-zinc-300">
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
        <h2>
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
