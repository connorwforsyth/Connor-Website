import { allWritings } from "@/.contentlayer/generated";
import Link from "next/link";
import { format } from "date-fns";
import BackButton from "@/components/BackButton";

type PostWithElement = { element: JSX.Element; date: string };

export default function Writing() {
  return (
    <>
      <div></div>
      <BackButton label="Index" />
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-8">
        <h1 className="font-medium">Writing</h1>

        <ol basic-list="" className="border-b border-zinc-300">
          {allWritings
            .sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
            )
            .reduce<PostWithElement[]>((acc, post) => {
              const year = new Date(post.date).getFullYear();
              const isFirstOfYear = !acc.find(
                (item) => new Date(item.date).getFullYear() === year,
              );
              const element = (
                <li basic-list-item="" className="" key={post.title}>
                  <Link className="flex " href={post.slug}>
                    {/* {isFirstOfYear ? (
                      <span
                        basic-list-year=""
                        className="flex  w-24 border-t border-zinc-300 px-0 py-3  sm:px-3"
                      >
                        {year}
                      </span>
                    ) : (
                      <span className=" w-24 px-0 py-3 sm:px-3"></span>
                    )} */}
                    <span className="flex w-full flex-grow  items-center gap-1 border-t border-zinc-300">
                      <h2 className="flex-grow py-3">{post.title}</h2>
                      <time
                        className=" whitespace-nowrap py-3 text-sm"
                        dateTime={post.date}
                      >
                        {format(new Date(post.date), "d MMM yyy")}
                      </time>
                    </span>
                  </Link>
                </li>
              );
              acc.push({ element, date: post.date });
              return acc;
            }, [])
            .map((item) => item.element)}
        </ol>
      </div>
    </>
  );
}
