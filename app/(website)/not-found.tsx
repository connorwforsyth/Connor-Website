import Link from "next/link";
import BackButton from "@/components/BackButton";
import { TrackNotFound } from "@/components/track-not-found";

export default function Page() {
  return (
    <>
      <TrackNotFound />
      <BackButton href="/" label="Index" type="404" />
      <div className="mx-auto w-full max-w-2xl">
        <h1 className="font-medium">Page not found</h1>
        <p className="mt-3">
          That page doesn't exist. Head back to the <Link href="/">index</Link>{" "}
          or browse <Link href="/projects">projects</Link>.
        </p>
      </div>
    </>
  );
}
