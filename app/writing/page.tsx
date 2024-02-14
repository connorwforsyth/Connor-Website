import { allPosts } from "@/.contentlayer/generated";
import Link from "next/link";

export default function Writing() {
  return (
    <div className="flex flex-col">
      <h1 className="text-xl dark:text-white">
        Writing, thoughts, notes for sharing.
      </h1>
      <p className="pb-3 pt-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut illum
        nostrum quidem aliquid ea maiores beatae, labore consequatur harum
        repellat saepe nihil necessitatibus minima facere. Rerum ullam maiores
        ipsa modi.
      </p>
      <div>
        <ol className="flex flex-col border-b border-t">
          {allPosts
            .sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
            )
            .map((post) => (
              <Link
                className=" pb-3 pt-3 transition-all dark:hover:text-gray-100"
                href={post.slug}
                key={post.slug}
              >
                <h3 className="text-md font-medium">{post.title}</h3>
                <p>{post.description}</p>
                <p>{new Date(post.date).toLocaleDateString()}</p>
              </Link>
            ))}
        </ol>
      </div>
    </div>
  );
}
