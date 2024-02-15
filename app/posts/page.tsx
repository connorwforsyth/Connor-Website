import { allPosts } from "@/.contentlayer/generated";
import Link from "next/link";
import { format } from "date-fns";

export default function Writing() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <Link
          href="../"
          className="relative underline decoration-gray-500 transition-all hover:decoration-black"
        >
          <span
            basics-css-icon=""
            className="absolute inset-0 -left-6 translate-y-[1px]"
            data-icon="arrow-left-curve"
            role="img"
            aria-label="arrow-up-left-icon"
          />
          Index
        </Link>
      </div>
      <h1>Writing</h1>

      <ol basic-list="" className="border-b">
        {allPosts
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
          )
          .reduce<JSX.Element[]>((acc, post) => {
            // Specify the type of the accumulator here
            const year = new Date(post.date).getFullYear();
            const isFirstOfYear = !acc.find(
              (p) => new Date(p.date).getFullYear() === year,
            );
            acc.push(
              <li key={post.title} className="flex w-full border-t">
                {isFirstOfYear && <span className="w-24 p-3">{year}</span>}
                {!isFirstOfYear && <span className=""></span>}
                <Link
                  basic-list-item=""
                  href={post.url}
                  className="flex flex-grow justify-between"
                >
                  <h2 className=" p-3">{post.title}</h2>
                  <time className=" p-3" dateTime={post.date}>
                    {format(new Date(post.date), "dd/MM")}
                  </time>
                </Link>
              </li>,
            );
            return acc;
          }, [])}
      </ol>
    </div>
  );
}
