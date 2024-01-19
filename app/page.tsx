import { allPosts } from "@/.contentlayer/generated";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1 className=" text-weight font-medium text-gray-800  dark:text-gray-50">
        Connor Forsyth
      </h1>
      <p className="pt-3">
        I’m a designer and technologist interested in design sprints, Lean UX,
        agile, web technology, user/dev experience, education and open source. I
        currently work as a service designer at{" "}
        <span className=" text-gray-900 dark:text-gray-300 dark:hover:text-gray-50 transition-all">
          <Link className="underline" href="https://designit.com">
            Designit
          </Link>{" "}
        </span>{" "}
        and as an academic tutor at The University of Sydney.
      </p>
      <p className="pt-3">
        Previously, I’ve worked across public and private sector industries,
        startups, local government councils, universities, utilities,
        non-profits, community groups and the events industry. I started my
        career in architecture.
      </p>
      <p className="pt-3">
        After work, you’ll find me chipping away at small web projects,
        bouldering, and brewing coffee.
      </p>
      <p className="pt-3">
        Some would say my design process is a little unorthodox, however this is
        overshadowed by my eagnerness to build a positive impact on products,
        services and communtiies.
      </p>

      <p className="pt-3">
        You can find me on
        <a
          className="text-gray-950 hover:text-gray-500 transition-all"
          href="twitter.com/connorwforsyth"
        >
          {" "}
          𝕏 <span className=" underline">@connorwforsyth</span>{" "}
        </a>
        and{" "}
        <svg
          className="inline"
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 1C1.44772 1 1 1.44772 1 2V13C1 13.5523 1.44772 14 2 14H13C13.5523 14 14 13.5523 14 13V2C14 1.44772 13.5523 1 13 1H2ZM3.05 6H4.95V12H3.05V6ZM5.075 4.005C5.075 4.59871 4.59371 5.08 4 5.08C3.4063 5.08 2.925 4.59871 2.925 4.005C2.925 3.41129 3.4063 2.93 4 2.93C4.59371 2.93 5.075 3.41129 5.075 4.005ZM12 8.35713C12 6.55208 10.8334 5.85033 9.67449 5.85033C9.29502 5.83163 8.91721 5.91119 8.57874 6.08107C8.32172 6.21007 8.05265 6.50523 7.84516 7.01853H7.79179V6.00044H6V12.0047H7.90616V8.8112C7.8786 8.48413 7.98327 8.06142 8.19741 7.80987C8.41156 7.55832 8.71789 7.49825 8.95015 7.46774H9.02258C9.62874 7.46774 10.0786 7.84301 10.0786 8.78868V12.0047H11.9847L12 8.35713Z"
            fill="currentColor"
            fill-rule="evenodd"
            clip-rule="evenodd"
          ></path>
        </svg>{" "}
        <a>@connorwforsyth</a>
      </p>

      {/*Posts*/}

      <div className="flex flex-col pt-4 pb-4">
        <div className="divide-red-900">----------</div>
        <h2 className="text-md font-medium">Writing</h2>
        {allPosts
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
          .map((post) => (
            <Link
              className=" pt-2 hover:text-gray-800 transition-all"
              href={post.slug}
              key={post.slug}
            >
              <h3 className="text-md font-medium">{post.title}</h3>
              <p>{post.description}</p>
              <p>{new Date(post.date).toLocaleDateString()}</p>
            </Link>
          ))
          .slice(0, 2)}
        <Link className=" pt-2 hover:text-gray-800 transition-all" href="posts">
          <h3 className="text-md font-medium">All writing</h3>
          <p>All Writing</p>
          <p>Storing throughts</p>
        </Link>
      </div>
    </div>
  );
}
