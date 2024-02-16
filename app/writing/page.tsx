import { allDocuments } from "@/.contentlayer/generated";
import Link from "next/link";
import { format } from "date-fns";
import BackButton from "@/components/BackButton";

type PostWithElement = { element: JSX.Element; date: string };

export default function Writing() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-8">
      <div>
        <BackButton label="Index" />
      </div>
      <h1>Writing</h1>

      <ol basic-list="" className="border-b">
        {allDocuments
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
          )
          .reduce<PostWithElement[]>((acc, post) => {
            const year = new Date(post.date).getFullYear();
            const isFirstOfYear = !acc.find(
              (item) => new Date(item.date).getFullYear() === year,
            );
            const element = (
              <li key={post.title} className="flex w-full border-t">
                {isFirstOfYear && <span className="w-24 p-3">{year}</span>}
                {!isFirstOfYear && <span className=""></span>}
                <Link
                  basic-list-item=""
                  href={post.slug}
                  className="flex flex-grow justify-between"
                >
                  <h2 className=" p-3">{post.title}</h2>
                  <time className=" p-3" dateTime={post.date}>
                    {format(new Date(post.date), "dd/MM")}
                  </time>
                </Link>
              </li>
            );
            acc.push({ element, date: post.date });
            return acc;
          }, [])
          .map((item) => item.element)}
      </ol>
    </div>
  );
}
