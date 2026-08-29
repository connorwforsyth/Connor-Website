import { format } from "date-fns";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BackButton from "@/components/BackButton";
import { Mdx } from "@/components/mdx";
import siteMetadata from "@/config/site-metadata";
import { getAllWritings, getWritingBySlug } from "@/lib/content";
import { getOgImageUrl } from "@/lib/og";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return getAllWritings().map((writing) => ({
    slug: writing.slugAsParams,
  }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const doc = getWritingBySlug(slug);
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
            type: "Writing",
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

const page = async ({ params }: PageProps) => {
  const { slug } = await params;
  const doc = getWritingBySlug(slug);
  const { default: Content } = await import(
    `@/content/writing/${slug}.mdx`
  ).catch(() => notFound());

  const Header = () => (
    <>
      <BackButton href="/writing" label="Writing" />
      <div className="mx-auto mb-3 w-full max-w-2xl text-muted-foreground">
        <h1 className="font-medium text-foreground md:inline">{doc.title}</h1>{" "}
        <span className="hidden md:inline"> | </span>
        {format(new Date(doc.date), "EEE dd MMM yyy")}
      </div>
    </>
  );

  return (
    <article>
      <Header />
      <Mdx>
        <Content />
      </Mdx>
    </article>
  );
};

export default page;
