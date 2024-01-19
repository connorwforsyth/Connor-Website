import { allPosts } from "@/.contentlayer/generated";
import Link from "next/link";

export default function Writing() {
  return (
    <div className="flex flex-col">
      <div>
        <Link
          className="border dark:border-slate-500 dark:hover:border-slate-50 px-3 py-2 rounded-full dark:stroke-slate-400 dark:hover:text-white dark:hover:stroke-slate-50 transition-all"
          href="/"
        >
          ◁ Back to Index
        </Link>
      </div>
      <div className="flex flex-col pt-12">
        <h1 className="text-xl dark:text-white">
          Writing, thoughts, notes for sharing.
        </h1>
        <p className="pt-3 pb-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut illum
          nostrum quidem aliquid ea maiores beatae, labore consequatur harum
          repellat saepe nihil necessitatibus minima facere. Rerum ullam maiores
          ipsa modi.
        </p>
        {allPosts
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
          .map((post) => (
            <Link
              className=" pt-3 pb-3 dark:hover:text-gray-100 transition-all"
              href={post.slug}
              key={post.slug}
            >
              <h3 className="text-md font-medium">{post.title}</h3>
              <p>{post.description}</p>
              <p>{new Date(post.date).toLocaleDateString()}</p>
            </Link>
          ))}
      </div>
    </div>
  );
}
