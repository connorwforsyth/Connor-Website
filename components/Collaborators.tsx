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
  let searchedPeople = people
    ? collaboratorsData
        .filter((i) => people.includes(i.name))
        .sort(() => 0.5 - Math.random())
    : collaboratorsData.sort(() => 0.5 - Math.random());

  // Limit to a maximum of 12 entries
  searchedPeople = searchedPeople.slice(0, 12);

  return (
    <div className={cn("mx-auto my-8 w-full max-w-2xl", className)}>
      <h2 className="mb-2 text-zinc-700 dark:text-zinc-100">
        <em>Collaborators</em>
      </h2>
      <div className="flex flex-wrap gap-2">
        {searchedPeople.map((i: Collaborator) => (
          <Link
            basics-link-pill=""
            className="align-center flex items-center gap-1 rounded-full bg-zinc-300 bg-opacity-70  p-1 pr-2 text-sm no-underline dark:bg-zinc-700 dark:bg-opacity-90 dark:text-zinc-100 dark:hover:text-white"
            key={i.name}
            href={i.link}
          >
            <div className="flex h-6 w-6 items-center overflow-hidden rounded-full">
              <Image
                className="h-full w-full object-cover"
                src={`../${i.image}`}
                width={24}
                height={24}
                alt={i.name}
                unoptimized={true}
              />
            </div>
            <span className="translate-y-[1px] ">{i.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function Person({ name }: { name: string }) {
  const person = collaboratorsData.find((person) => person.name === name);

  if (!person) {
    return <div>Person not found</div>;
  }

  return <Link href={person.link}>{person.name}</Link>;
}
