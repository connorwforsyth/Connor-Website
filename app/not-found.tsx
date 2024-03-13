import BackButton from "@/components/BackButton";

export default function Page() {
  return (
    <>
      <BackButton type="404" label="Index" />
      <div className="mx-auto w-full max-w-2xl">
        <h1 className="font-medium">404 Not Found</h1>
        <p className="mt-3">Page not found. Better luck next time. ✌️</p>
      </div>
    </>
  );
}
