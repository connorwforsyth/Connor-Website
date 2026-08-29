# button

2026-08-29, engine migration, migrated to Base UI while preserving variants and visual classes.

## Changed

`components/ui/button.tsx`: replaced Radix Slot and `asChild` with Base UI Button and its `render` API. Added component-managed icon sizing.

`components/ui/carousel.tsx`: uses Phosphor navigation icons with the Button icon contract.

Leftover scan: `grep -n "radix-ui\|@radix-ui" components/ui/button.tsx components/ui/carousel.tsx` is clean.

## Left alone

Embla carousel behavior remains unchanged.

## Behavior changes

Consumers must use `render` instead of the removed `asChild` prop.

## Verify by hand

Click and keyboard-focus each Button variant, then use both carousel controls and confirm disabled controls cannot be activated.
