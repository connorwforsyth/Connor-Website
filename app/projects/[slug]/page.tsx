import { allProjects } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { Mdx } from "@/components/mdx";
import BackButton from "@/components/BackButton";
import { format } from "date-fns";
import PasswordForm from "@/components/password-form";
import { getSession } from "@/server-actions/actions";

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

const page = async ({ params }: PageProps) => {
  const doc = await getDocFromParams(params.slug);
  const session = await getSession();

  const Header = () => {
    return (
      <>
        <BackButton label="Projects" />
        <div className="mx-auto mb-3 w-full max-w-2xl text-stone-500">
          <h1 className="font-medium text-stone-950 dark:text-stone-100 md:inline">
            {doc.title}
          </h1>{" "}
          <span className="hidden md:inline"> | </span>
          {format(new Date(doc.date), "EEE dd MMM yyyy")}
        </div>
        <p className="mx-auto mb-3 w-full max-w-2xl">{doc.description}</p>
        {doc.p2 && <p className="mx-auto mb-3 w-full max-w-2xl">{doc.p2}</p>}
      </>
    );
  };
  if (doc.protected === true)
    return !session.isLoggiedIn ? (
      <>
        <Header />
        <p className="mx-auto w-full max-w-2xl">
          Due to the confidentiality of some of my projects, this page has to be
          protected. To access, please fill in the following:
        </p>
        <PasswordForm />
      </>
    ) : (
      <>
        <Header />
        <p className="mx-auto w-full max-w-2xl">
          Hey {session.name} 👋. Thanks for checking out my portfolio. If you
          have any questions, please reach out.
        </p>
        <Mdx code={doc.body.code} />
      </>
    );
  return (
    <>
      <Header />
      <Mdx code={doc.body.code} />
    </>
  );
};

export default page;
