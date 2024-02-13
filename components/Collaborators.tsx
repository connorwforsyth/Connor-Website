import collaborators from "../data/collaborators/collaborators.json";
import Image from "next/image";
import Link from "next/link";
export function Collaborators() {
  return (
    <div className="flex flex-wrap gap-2">
      {collaborators.map((collaborator) => (
        <Link
          className="flex gap-1 rounded-full bg-gray-200 p-1 pr-2 no-underline dark:bg-zinc-700 dark:text-gray-200"
          key={collaborator.name}
          href={collaborator.link}
        >
          <Image
            className="rounded-full"
            src={collaborator.image}
            width={24}
            height={24}
            alt={collaborator.name}
            unoptimized={true}
          />
          <span>{collaborator.name}</span>
        </Link>
      ))}
    </div>
  );
}
