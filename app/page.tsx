import { allPosts } from "@/.contentlayer/generated";
import Link from "next/link";
import "../styles/icons.css";
import { Collaborators } from "@/components/Collaborators";

export default function Home() {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-3 dark:text-gray-300">
        <h1 className=" text-weight font-medium text-gray-800  dark:text-gray-50">
          Connor Forsyth
        </h1>
        <p>
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
          Some would say my design process is a little unorthodox, however this
          is overshadowed by my eagnerness to build a positive impact on
          products, services and communtiies.
        </p>
      </div>

      {/*Posts*/}

      <div className="grid grid-cols-3 gap-2">
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
                href: "#",
                title: "Makeit",
                description: "My approach to sharing work.",
              },
              {
                href: "#",
                title: "TEDxMelbourne.com",
                description: "Small projects that help push my craft forward.",
              },
              {
                href: "#",
                title: "MelbourneSOUP.org",
                description: "Small projects that help push my craft forward.",
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
          <div key={column.title}>
            <h2 className="pb-8">
              <em>{column.title}</em>
            </h2>
            <div className="col-span-1 grid gap-4">
              {column.items.map((item) => (
                <div className="h-24" key={item.title}>
                  <Link href={item.href}>{item.title}</Link>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-4">
        <h2>
          <em>Collaborators</em>
        </h2>
        <Collaborators />
      </div>
      <div className="flex flex-col gap-4">
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
