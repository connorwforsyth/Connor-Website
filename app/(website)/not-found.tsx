import BackButton from "@/components/BackButton";
import { TrackNotFound } from "@/components/track-not-found";

export default function Page() {
  return (
    <>
      <TrackNotFound />
      <BackButton label="Index" type="404" />
      <div className="mx-auto w-full max-w-2xl">
        <h1 className="font-medium">404 Not Found</h1>
        <p className="mt-3">Page not found. Better luck next time. ✌️</p>
      </div>
    </>
  );
}
