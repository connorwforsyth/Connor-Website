import collaborators from "../data/collaborators/collaborators.json";
import Image from "next/image";
import Link from "next/link";
export function Collaborators() {
  return (
    <div className="flex flex-wrap gap-2">
      {collaborators.map((collaborator) => (
        <Link
          basics-link=""
          className="flex items-center gap-1 rounded-full bg-gray-300 bg-opacity-70 bg-gradient-to-r p-1 pr-2 text-sm no-underline dark:bg-gray-700 dark:bg-opacity-90 dark:text-gray-100 dark:hover:text-white"
          key={collaborator.name}
          href={collaborator.link}
        >
          <Image
            className="h-6 w-6 rounded-full"
            src={collaborator.image}
            width={16}
            height={16}
            alt={collaborator.name}
            unoptimized={true}
          />
          <span>{collaborator.name}</span>
        </Link>
      ))}
    </div>
  );
}
