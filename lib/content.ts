import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { notFound } from "next/navigation";

const contentDirectory = path.join(process.cwd(), "content");

interface BaseFields {
  date: string;
  description: string;
  protected: boolean;
  published: boolean;
  title: string;
}

export interface Writing extends BaseFields {
  content: string;
  protectedEnd?: string;
  protectedIntro?: string;
  slug: string;
  slugAsParams: string;
}

export interface Project extends BaseFields {
  content: string;
  p2?: string;
  slug: string;
  slugAsParams: string;
}

type ContentDir = "writing" | "projects";

function readDocs<T>(dir: ContentDir): T[] {
  const dirPath = path.join(contentDirectory, dir);
  const files = fs.readdirSync(dirPath).filter((file) => file.endsWith(".mdx"));

  return files.map((file) => {
    const slugAsParams = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(dirPath, file), "utf8");
    const { data, content } = matter(raw);

    return {
      date: "2022-6-4",
      protected: false,
      published: true,
      ...data,
      content,
      slug: `/${dir}/${slugAsParams}`,
      slugAsParams,
    } as T;
  });
}

export function getAllWritings(): Writing[] {
  return readDocs<Writing>("writing");
}

export function getAllProjects(): Project[] {
  return readDocs<Project>("projects");
}

export function getWritingBySlug(slug: string): Writing {
  const doc = getAllWritings().find((doc) => doc.slugAsParams === slug);
  if (!doc) {
    notFound();
  }
  return doc;
}

export function getProjectBySlug(slug: string): Project {
  const doc = getAllProjects().find((doc) => doc.slugAsParams === slug);
  if (!doc) {
    notFound();
  }
  return doc;
}
