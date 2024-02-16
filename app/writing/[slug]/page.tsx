import { allWritings } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { Mdx } from "@/components/mdx";
import BackButton from "@/components/BackButton";

interface PageProps {
  params: {
    slug: string;
  };
}

async function getDocFromParams(slug: string) {
  const doc = allWritings.find((doc) => doc.slugAsParams === slug);
  if (!doc) notFound();
  return doc;
}

const page = async ({ params }: PageProps) => {
  const doc = await getDocFromParams(params.slug);

  return (
    <div className="relative">
      <BackButton label="All Writing" />
      <Mdx code={doc.body.code} />
    </div>
  );
};

export default page;
