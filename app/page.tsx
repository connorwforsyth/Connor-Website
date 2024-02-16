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
      title: "Building",
      items: [
        {
          title: "Portfolio Readme",
          description: "My approach to sharing work.",
          href: "/readme",
        },
      ],
    },
    {
      title: "Projects",
      items: [
        {
          title: "Makeit — by Designit",
          description: "My approach to sharing work.",
          href: "https://makeitbydesignit.com",
          external: true,
        },
        {
          title: "TEDxMelbourne",
          description: "Small projects that help push my craft forward.",
          href: "https://tedxmelbourne.com",
          external: true,
        },
        {
          href: "https://melbournesoup.org",
          title: "MelbourneSOUP",
          description: "Small projects that help push my craft forward.",
          external: true,
        },
      ],
    },
    {
      title: "Writing",
      items: [
        {
          title: "Good Judgement in Design",
          description: "My approach to sharing work.",
          href: "",
        },
        {
          title: "Figma file structure",
          description: "How we approach figma structures.",
          href: "/writing/figma-file-structure",
        },
        {
          title: "All writing",
          href: "/writing",
        },
      ],
    },
  ];

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-12">
      <div className="flex flex-col gap-3 dark:text-gray-300">
        <h1
          data-animate=""
          className="pb-4 text-xl text-gray-800  dark:text-gray-50"
        >
          Connor Forsyth
        </h1>
        <div className="flex flex-col gap-3" data-animate="" basic-stagger="1">
          <p>
            I’m a designer and technologist interested in design sprints, Lean
            UX, agile, web technology, user/dev experience, education and open
            source. I currently work as a service designer at{" "}
            <Link href="https://designit.com">Designit</Link> and as an academic
            tutor at{" "}
            <span>
              <Link href="https://sydney.edu.au">The University of Sydney</Link>
            </span>
            .
          </p>
          <p>
            Previously, I’ve worked across public and private sector industries,
            startups, local government councils, universities, utilities,
            non-profits, community groups and the events industry. I started my
            career in architecture.
          </p>
          <p>
            After work, you’ll find me chipping away at small web projects,
            bouldering, and brewing coffee.
          </p>
          <p>
            Some would say my design process is a little unorthodox, however
            this is overshadowed by my eagnerness to build a positive impact on
            products, services and communtiies.
          </p>
        </div>
      </div>

      {/*Posts*/}

      <div
        data-animate=""
        basic-stagger="2"
        className="grid grid-cols-1 gap-2 sm:grid-cols-3"
      >
        {contents.map((column) => (
          <div key={column.title} className="flex flex-col">
            <h2 className="pb-4 pt-6 sm:pb-8 sm:pt-0">
              <em>{column.title}</em>
            </h2>
            <div className="grid gap-4">
              {column.items.map((item) => (
                <div className="sm:h-24" key={item.title}>
                  {item.external ? (
                    <span className="">
                      <Link
                        basics-link=""
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.title}
                      </Link>
                      <span
                        basics-css-icon=""
                        data-icon="arrow-up-right"
                        role="img"
                        aria-label="arrow-up-right icon"
                      ></span>
                    </span>
                  ) : (
                    <span className="">
                      <Link basics-link="" href={item.href}>
                        {item.title}
                      </Link>
                    </span>
                  )}
                  <p className="text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div data-animate="" basic-stagger="3" className="flex flex-col gap-4">
        <Collaborators />
      </div>
      <div data-animate="" basic-stagger="4" className="flex flex-col gap-4">
        <h2>
          <em>Connect</em>
        </h2>
        <p>
          You can reach out on{" "}
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
