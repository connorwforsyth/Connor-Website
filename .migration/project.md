# project

2026-08-29, whole-project engine migration, complete.

## Changed

`components.json`: CLI-initialized as `base-nova`; existing Radix palette tokens remain the authoritative theme in `styles/globals.css`.

`package.json` and `bun.lock`: add Base UI, Phosphor, and Playwright; remove obsolete Radix interaction, React Hook Form, resolver, slot, icon, and `shadcn-ui` packages. `@radix-ui/colors` remains intentionally.

`playwright.config.ts`, `app/(website)/migration-fixture/page.tsx`, `components/migration-primitive-fixture.tsx`, and `tests/primitives.spec.ts`: add a `PLAYWRIGHT=true`-gated primitive fixture and keyboard/focus coverage.

`next.config.mjs`: permits the local Playwright dev origin required by Next 16.

Leftover runtime scan: `grep -RInE "@radix-ui/react-|@radix-ui/react-icons|react-hook-form|@hookform/resolvers" app components context lib server-actions --include='*.ts' --include='*.tsx'` is clean.

## Left alone

`@radix-ui/colors`, MDX examples, Embla, Framer Motion, next-themes, presentation controls, and portfolio/editorial content remain unchanged.

## Behavior changes

Select values are nullable and Button/Tooltip composition uses `render`. These changes are covered in the primitive fixture.

## Verify by hand

Run `bun run typecheck`, `bun run build`, `bunx ultracite check`, and `CI=1 bunx playwright test`. Manually test access-code success, error, URL-code, offline, and light/dark/system theme flows.
