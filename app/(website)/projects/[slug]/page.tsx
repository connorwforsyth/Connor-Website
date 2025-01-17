import { allProjects } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { Mdx } from "@/components/mdx";
import BackButton from "@/components/BackButton";
import { format } from "date-fns";
import { getSession } from "@/server-actions/actions";
import { Metadata, ResolvingMetadata } from "next";
import siteMetadata from "@/config/site-metadata";
import AccessForm from "@/components/access-form";

interface PageProps {
  params: {
    slug: string;
  };
}

async function getDocFromParams(slug: string) {
  const doc = allProjects.find((doc) => doc.slugAsParams === slug);
  if (!doc) notFound();
  return doc;
}

// export async function generateMetaData(
//   { params }: PageProps,
//   parent: ResolvingMetadata,
// ): Promise<Metadata> {
//   const doc = await getDocFromParams(params.slug);

//   if (!doc || !doc.title) return {};

//   const url = siteMetadata.siteUrl;
//   const ogURL = new URL(`${url}/api/og`);
//   ogURL.searchParams.set("title", doc.title);
//   // ogURL.searchParams.set("type", "Project");
//   // ogURL.searchParams.set("url", doc.slug);
//   return {
//     title: doc.title,
//     description: doc.description,
//     authors: {
//       name: "Connor Forsyth",
//     },
//     alternates: {
//       canonical: `${siteMetadata.siteUrl}/projects/${doc.slug}`,
//     },
//     openGraph: {
//       title: doc.title,
//       description: doc.description,
//       type: "article",
//       url: `${siteMetadata.siteUrl}/projects/${doc.slug}`,
//       images: [
//         {
//           url: ogURL.toString(),
//           width: 1200,
//           height: 630,
//           alt: doc.title,
//         },
//       ],
//     },
//   };
// }

export default async function Page({ params }: PageProps) {
  const doc = await getDocFromParams(params.slug);
  const session = await getSession();

  const Header = () => {
    return (
      <article>
        <BackButton label="Projects" />
        <div className="mx-auto mb-3 w-full max-w-2xl text-stone-500">
          <h1 className="font-medium text-stone-950 dark:text-stone-100 md:inline">
            {doc.title}
          </h1>{" "}
          <span className="hidden md:inline"> | </span>
          {format(new Date(doc.date), "EEE dd MMM yyy")}
        </div>
        <p className="mx-auto mb-3 w-full max-w-2xl">{doc.description}</p>
        {doc.p2 && <p className="mx-auto mb-3 w-full max-w-2xl">{doc.p2}</p>}
      </article>
    );
  };
  if (doc.protected === true)
    return !session.isLoggedIn ? (
      <article>
        <Header />
        <div className="my-8" />
        <AccessForm />
      </article>
    ) : (
      <article>
        <Header />
        <p className="mx-auto w-full max-w-2xl">
          Hey {session.name} 👋 Thanks for checking out my portfolio. Just a
          reminder to please keep this project confidential. If you have any
          questions, please reach out.
        </p>
        <Mdx code={doc.body.code} />
      </article>
    );
  return (
    <article>
      <Header />
      <Mdx code={doc.body.code} />
    </article>
  );
}
