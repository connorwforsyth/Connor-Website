import { allPosts } from "@/.contentlayer/generated";
import Link from "next/link";
import "../styles/icons.css";
import { Collaborators } from "@/components/Collaborators";

export default function Home() {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-3 dark:text-gray-300">
        <h1
          data-animate=""
          className="pb-4 text-xl text-gray-800  dark:text-gray-50"
        >
          Connor Forsyth
        </h1>
        <p data-animate="" style={{ "--stagger": "1" }}>
          I’m a designer and technologist interested in design sprints, Lean UX,
          agile, web technology, user/dev experience, education and open source.
          I currently work as a service designer at{" "}
          <Link href="https://designit.com">Designit</Link> and as an academic
          tutor at{" "}
          <span>
            <Link href="https://sydney.edu.au">The University of Sydney</Link>
          </span>
          .
        </p>
        <p data-animate="" style={{ "--stagger": "2" }}>
          Previously, I’ve worked across public and private sector industries,
          startups, local government councils, universities, utilities,
          non-profits, community groups and the events industry. I started my
          career in architecture.
        </p>
        <p data-animate="" style={{ "--stagger": "3" }}>
          After work, you’ll find me chipping away at small web projects,
          bouldering, and brewing coffee.
        </p>
        <p data-animate="" style={{ "--stagger": "4" }}>
          Some would say my design process is a little unorthodox, however this
          is overshadowed by my eagnerness to build a positive impact on
          products, services and communtiies.
        </p>
      </div>

      {/*Posts*/}

      <div
        data-animate=""
        style={{ "--stagger": "5" }}
        className="grid grid-cols-1 gap-2 sm:grid-cols-3"
      >
        {[
          {
            title: "Building",
            items: [
              {
                href: "#",
                title: "Portfolio Readme",
                description: "My approach to sharing work.",
              },
              {
                href: "#",
                title: "Craft",
                description: "Small projects that help push my craft forward.",
              },
            ],
          },
          {
            title: "Projects",
            items: [
              {
                href: "https://makeitbydesignit.com",
                title: "Makeit — by Designit",
                description: "My approach to sharing work.",
                external: true,
              },
              {
                href: "https://tedxmelbourne.com",
                title: "TEDxMelbourne",
                description: "Small projects that help push my craft forward.",
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
                href: "#",
                title: "Good Judgement in Design",
                description: "My approach to sharing work.",
              },
              {
                href: "#",
                title: "Figma file structure",
                description: "How we approach figma structures.",
              },
              {
                href: "#",
                title: "All writing",
              },
            ],
          },
        ].map((column) => (
          <div key={column.title} className="flex flex-col">
            <h2 className="pb-4 pt-6 sm:pb-8 sm:pt-0">
              <em>{column.title}</em>
            </h2>
            <div className="grid gap-4">
              {column.items.map((item) => (
                <div className="sm:h-24" key={item.title}>
                  {item.external ? (
                    <span className="">
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.title}
                      </a>
                      <span
                        basics-css-icon=""
                        data-icon="arrow-up-right"
                        role="img"
                        aria-label="arrow-up-right icon"
                      ></span>
                    </span>
                  ) : (
                    <span className="">
                      <Link href={item.href}>{item.title}</Link>
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
      <div
        data-animate=""
        style={{ "--stagger": "6" }}
        className="flex flex-col gap-4"
      >
        <h2>
          <em>Collaborators</em>
        </h2>
        <Collaborators />
      </div>
      <div
        data-animate=""
        style={{ "--stagger": "8" }}
        className="flex flex-col gap-4"
      >
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
