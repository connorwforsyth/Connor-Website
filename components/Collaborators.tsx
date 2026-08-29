import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import collaboratorsData from "../data/collaborators/collaborators.json";

interface Collaborator {
  image: string;
  link: string;
  name: string;
}

interface CollaboratorsProps {
  className?: string[];
  inline?: boolean;
  people?: string[];
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
      <h2 className="mb-2 text-foreground/80">
        <em>Collaborators</em>
      </h2>
      <div className="flex flex-wrap gap-2">
        {searchedPeople.map((i: Collaborator) => (
          <Link
            basics-link-pill=""
            className="flex items-center gap-1 rounded-full bg-muted p-1 pr-2 align-center text-foreground text-sm no-underline hover:text-[var(--text-highlight)]"
            href={i.link}
            key={i.name}
          >
            <div className="flex h-6 w-6 items-center overflow-hidden rounded-full">
              <Image
                alt={i.name}
                className="h-full w-full object-cover"
                height={24}
                src={`../${i.image}`}
                unoptimized={true}
                width={24}
              />
            </div>
            <span className="[text-box:trim-both_cap_alphabetic]">{i.name}</span>
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
