import collaboratorsData from "../data/collaborators/collaborators.json";
import Image from "next/image";
import Link from "next/link";

interface Collaborator {
  name: string;
  link: string;
  image: string;
}

interface CollaboratorsProps {
  who?: string[];
  all?: boolean;
}

export function Collaborators({ who, all }: CollaboratorsProps) {
  const filteredCollaborators = who
    ? collaboratorsData
        .filter((collaborator) => who.includes(collaborator.name))
        .sort((a, b) => who.indexOf(a.name) - who.indexOf(b.name))
    : collaboratorsData;

  return (
    <>
      <h2 className="mb-2">
        <em>Collaborators</em>
      </h2>
      <div className="flex flex-wrap gap-2">
        {filteredCollaborators.map((collaborator: Collaborator) => (
          <Link
            basics-link=""
            className="flex items-center gap-1 rounded-full bg-stone-300 bg-opacity-70  p-1 pr-2 text-sm no-underline dark:bg-stone-700 dark:bg-opacity-90 dark:text-stone-100 dark:hover:text-white"
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
    </>
  );
}
