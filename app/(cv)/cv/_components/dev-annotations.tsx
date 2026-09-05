"use client";

import dynamic from "next/dynamic";

/**
 * The Agentation annotation toolbar is a local design-review tool. Importing it
 * at module scope pulled ~400KB of it into the production client chunk for /cv
 * even though the render was guarded, because the guard removes the element,
 * not the module. Loading it lazily keeps it out of the bytes visitors fetch,
 * and the guard means the chunk is never requested outside `next dev`.
 */
const Agentation = dynamic(
  () => import("agentation").then((mod) => mod.Agentation),
  { ssr: false }
);

export function DevAnnotations() {
  if (process.env.NODE_ENV !== "development") {
    return null;
  }
  return <Agentation />;
}
