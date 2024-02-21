import collaboratorsData from "../data/collaborators/collaborators.json";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Collaborator {
  name: string;
  link: string;
  image: string;
}

interface CollaboratorsProps {
  people?: string[];
  className?: string[];
  inline?: boolean;
}

export function Collaborators({ people, className }: CollaboratorsProps) {
  const filteredCollaborators = people
    ? collaboratorsData
        .filter((collaborator) => people.includes(collaborator.name))
        .sort((a, b) => people.indexOf(a.name) - people.indexOf(b.name))
    : collaboratorsData;

  return (
    <div className={cn("mx-auto my-8 w-full max-w-2xl", className)}>
      <h2 className="mb-2">
        <em>Collaborators</em>
      </h2>
      <div className="flex flex-wrap gap-2">
        {filteredCollaborators.map((collaborator: Collaborator) => (
          <Link
            basics-link-pill=""
            className="align-center flex items-center gap-1 rounded-full bg-zinc-300 bg-opacity-70  p-1 pr-2 text-sm no-underline dark:bg-zinc-700 dark:bg-opacity-90 dark:text-zinc-100 dark:hover:text-white"
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
            <span className="translate-y-[1px] ">{collaborator.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
