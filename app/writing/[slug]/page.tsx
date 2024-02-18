import { allWritings } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { Mdx } from "@/components/mdx";
import BackButton from "@/components/BackButton";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/server";
import { format } from "date-fns";
import Link from "next/link";
import Nudge from "@/components/nudge";

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

  const { isAuthenticated, getUser, getPermission, getAccessToken } =
    getKindeServerSession();

  const user = getUser();
  if (doc.protected === true)
    if (!(await isAuthenticated()))
      //check if they're sign in
      return (
        <div className="mx-auto w-full max-w-2xl">
          <BackButton label="All Writing" />
          <div className="mb-3 text-stone-500">
            <h1 className="inline-block font-medium text-stone-950">
              {doc.title}{" "}
            </h1>{" "}
            / {format(new Date(doc.date), "EEE dd MMM yyyy")}
          </div>
          <p className="mb-3">{doc.description}</p>
          <p>
            This is a protected route, please{" "}
            <LoginLink className="">login</LoginLink> or{" "}
            <RegisterLink>sign up</RegisterLink> to get access.
          </p>
        </div>
      );
    else if ((await getPermission("approved:true")).isGranted)
      return (
        <div className="relative">
          <BackButton label="All Writing" />
          <p className="mx-auto w-full max-w-2xl">
            Hey {(await user).given_name} 👋 — This is a protected page, please
            keep it confidential.
          </p>
          <Mdx code={doc.body.code} />
        </div>
      );
    else
      return (
        <div className="relative">
          <BackButton label="All Writing" />
          <p className="mx-auto mb-3 w-full max-w-2xl">
            Hey {(await user).given_name} 👋 — Thanks for requesting access.
          </p>
          <p className="mx-auto w-full max-w-2xl">
            I have to manually approve your access, you will recieve an email
            from me once it's granted. Until then, you can give me a{" "}
            <span>
              <Nudge /> on{" "}
            </span>
            <Link href="https://Linkedin.com/in/connorwforsyth">LinkedIn</Link>.
          </p>
        </div>
      );
  else
    return (
      <div className="relative">
        <BackButton label="All Writing" />
        <Mdx code={doc.body.code} />
      </div>
    );
};

export default page;
