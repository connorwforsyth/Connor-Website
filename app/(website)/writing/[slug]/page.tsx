import { getAllWritings, getWritingBySlug } from "@/lib/content";
import { Mdx } from "@/components/mdx";
import BackButton from "@/components/BackButton";
import { format } from "date-fns";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import siteMetadata from "@/config/site-metadata";
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
    title: doc.title,
    description: doc.description,
    authors: {
      name: "Connor Forsyth",
    },
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: doc.title,
      description: doc.description,
      type: "article",
      url,
      images: [
        {
          url: getOgImageUrl({
            title: doc.title,
            description: doc.description,
            type: "Writing",
          }),
          width: 1200,
          height: 630,
          alt: doc.title,
        },
      ],
    },
  };
}

const page = async ({ params }: PageProps) => {
  const { slug } = await params;
  const doc = getWritingBySlug(slug);
  const { default: Content } = await import(
    `@/content/writing/${slug}.mdx`
  ).catch(() => notFound());

  const Header = () => {
    return (
      <>
        <BackButton label="Writings" />
        <div className="mx-auto mb-3 w-full max-w-2xl text-stone-500">
          <h1 className="font-medium text-stone-950 dark:text-stone-100 md:inline">
            {doc.title}
          </h1>{" "}
          <span className="hidden md:inline"> | </span>
          {format(new Date(doc.date), "EEE dd MMM yyy")}
        </div>
      </>
    );
  };

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
