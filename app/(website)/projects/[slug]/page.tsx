import { format } from "date-fns";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AccessForm from "@/components/access-form";
import BackButton from "@/components/BackButton";
import { Mdx } from "@/components/mdx";
import siteMetadata from "@/config/site-metadata";
import { getAllProjects, getProjectBySlug } from "@/lib/content";
import { getOgImageUrl } from "@/lib/og";
import { getSession } from "@/server-actions/actions";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return getAllProjects().map((project) => ({
    slug: project.slugAsParams,
  }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const doc = getProjectBySlug(slug);
  const url = `${siteMetadata.siteUrl}${doc.slug}`;

  return {
    alternates: {
      canonical: url,
    },
    authors: {
      name: "Connor Forsyth",
    },
    description: doc.description,
    openGraph: {
      description: doc.description,
      images: [
        {
          alt: doc.title,
          height: 630,
          url: getOgImageUrl({
            description: doc.description,
            title: doc.title,
            type: "Project",
          }),
          width: 1200,
        },
      ],
      title: doc.title,
      type: "article",
      url,
    },
    title: doc.title,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const doc = getProjectBySlug(slug);
  const { default: Content } = await import(
    `@/content/projects/${slug}.mdx`
  ).catch(() => notFound());
  const session = await getSession();

  const header = (
    <article>
      <BackButton href="/projects" label="Projects" />
      <div className="mx-auto mb-3 w-full max-w-2xl text-muted-foreground">
        <h1 className="font-medium text-foreground md:inline">{doc.title}</h1>{" "}
        <span className="hidden md:inline"> | </span>
        {format(new Date(doc.date), "EEE dd MMM yyy")}
      </div>
      <p className="mx-auto mb-3 w-full max-w-2xl">{doc.description}</p>
      {doc.p2 && <p className="mx-auto mb-3 w-full max-w-2xl">{doc.p2}</p>}
    </article>
  );
  if (doc.protected === true) {
    return session.isLoggedIn ? (
      <article>
        {header}
        <p className="mx-auto w-full max-w-2xl">
          Hey {session.name} 👋 Thanks for checking out my portfolio. Just a
          reminder to please keep this project confidential. If you have any
          questions, please reach out.
        </p>
        <Mdx>
          <Content />
        </Mdx>
      </article>
    ) : (
      <article>
        {header}
        <div className="my-8" />
        <AccessForm />
      </article>
    );
  }
  return (
    <article>
      {header}
      <Mdx>
        <Content />
      </Mdx>
    </article>
  );
}
