export default function Caption({ children }) {
  return (
    <em className="mx-auto mt-2 mb-4 block w-full max-w-2xl text-center text-foreground/80 text-sm">
      {children}
    </em>
  );
}
