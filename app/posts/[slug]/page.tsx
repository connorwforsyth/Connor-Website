import { allPosts } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Collaborators } from "@/components/Collaborators";
import Image from "next/image";

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post._raw.flattenedPath,
  }));
}

// const components = {
//   Image,
//   Collaborators,
// };

// interface MdxProps {
//   code: string;
// }

// export function Mdx({ code }: MdxProps) {
//   const Component = useMDXComponent(code);

//   return <Component components={components} />;
// }

export default async function Page({ params }: { params: { slug: string } }) {
  // Find the post for the current page.
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);

  // 404 if the post does not exist.
  if (!post) notFound();

  // Parse the MDX file via the useMDXComponent hook.
  // const MDXContent = useMDXComponent(post.body.html);

  return (
    <div className="flex flex-col gap-8">
      <Link
        href="./"
        className="sticky underline decoration-gray-500 transition-all hover:decoration-black"
      >
        <span
          basics-css-icon=""
          className="absolute inset-0 -left-6 translate-y-[1px]"
          data-icon="arrow-left-curve"
          role="img"
          aria-label="arrow-up-left-icon"
        />
        All Writing
      </Link>
      <div
        className="prose dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: post.body.html }}
      />
      {/* Some code ... */}
      {/* <MDXContent /> */}
    </div>
  );
}
