import { getWritingBySlug } from "@/lib/content";
import { Mdx } from "@/components/mdx";
import BackButton from "@/components/BackButton";
import { format } from "date-fns";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const page = async ({ params }: PageProps) => {
  const { slug } = await params;
  const doc = getWritingBySlug(slug);

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
      <Mdx source={doc.content} />
    </article>
  );
};

export default page;
