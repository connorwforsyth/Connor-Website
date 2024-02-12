import { allPosts } from "@/.contentlayer/generated";
import Link from "next/link";
import "../styles/data.css";

export default function Home() {
  return (
    <div>
      <h1 className=" text-weight font-medium text-gray-800  dark:text-gray-50">
        Connor Forsyth
      </h1>
      <p>
        I’m a designer and technologist interested in design sprints, Lean UX,
        agile, web technology, user/dev experience, education and open source. I
        currently work as a service designer at{" "}
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
        Some would say my design process is a little unorthodox, however this is
        overshadowed by my eagnerness to build a positive impact on products,
        services and communtiies.
      </p>

      <p>
        You can reach out to me on{" "}
        <Link href="https://www.linkedin.com/in/connorwforsyth">LinkedIn</Link>{" "}
        or{" "}
        <Link href="https://x.com/connorwforsyth">
          <strong>𝕏</strong> (Twitter)
        </Link>{" "}
        or email me:{" "}
        <Link href="mailto:c@connorforsyth.co">c@connorforsyth.co</Link>
      </p>

      {/*Posts*/}

      <div className="flex flex-col pb-4 pt-4">
        <div className="divide-red-900">----------</div>
        <h2 className="text-md font-medium">Writing</h2>
        {allPosts
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
          )
          .map((post) => (
            <Link
              className=" pt-2 transition-all hover:text-gray-800"
              href={post.slug}
              key={post.slug}
            >
              <h3 className="text-md font-medium">{post.title}</h3>
              <p>{post.description}</p>
              <p>{new Date(post.date).toLocaleDateString()}</p>
            </Link>
          ))
          .slice(0, 2)}
        <Link className=" pt-2 transition-all hover:text-gray-800" href="posts">
          <h3 className="text-md font-medium">All writing</h3>
          <p>All Writing</p>
          <p>Storing throughts</p>
        </Link>
      </div>
    </div>
  );
}
