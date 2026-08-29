import { notFound } from "next/navigation";

import { MigrationPrimitiveFixture } from "@/components/migration-primitive-fixture";

export default function MigrationFixturePage() {
  if (process.env.PLAYWRIGHT !== "true") {
    notFound();
  }

  return <MigrationPrimitiveFixture />;
}
