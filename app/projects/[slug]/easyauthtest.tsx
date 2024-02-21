import { allProjects } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { Mdx } from "@/components/mdx";
import BackButton from "@/components/BackButton";
import { format } from "date-fns";
import PasswordPromptDialog from "@/components/PasswordPromptDialog";
import { cookies } from "next/headers";

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

  const cookiesStore = cookies();
  const loginCookies = cookiesStore.get(process.env.PASSWORD_COOKIE_NAME!);
  const isLoggedIn = !!loginCookies?.value;

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
      </>
    );
  };

  if (doc.protected === true)
    if (!isLoggedIn)
      //check if they're sign in
      return (
        <>
          <Header />

          <p className="mx-auto w-full max-w-2xl">
            This is a protected route, please
          </p>
          <PasswordPromptDialog />
          <p className="mx-auto my-3 w-full max-w-2xl">{doc.protectedIntro}</p>
          <p className="mx-auto w-full max-w-2xl">{doc.protectedEnd}</p>
        </>
      );
  return (
    <>
      <Header />
      <p className="mx-auto mb-3 w-full max-w-2xl">{doc.protectedIntro}</p>
      <Mdx code={doc.body.code} />
      <p className="mx-auto w-full max-w-2xl">{doc.protectedEnd}</p>
    </>
  );
};

export default page;
