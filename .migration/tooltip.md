# tooltip

2026-08-29, CLI-generated Base Nova component plus local integration, added a reusable Base-compatible tooltip.

## Changed

`components/ui/tooltip.tsx`: adds the Base UI tooltip provider, trigger, portal, positioner, popup, and arrow composition.

`components/Offline.tsx`: replaces its Radix tooltip with the reusable wrapper and Base UI `render` trigger API.

`components/ui/spinner.tsx`: adds the reusable Phosphor spinner export.

Leftover scan: `grep -n "radix-ui\|@radix-ui" components/ui/tooltip.tsx components/Offline.tsx components/ui/spinner.tsx` is clean.

## Left alone

Offline detection and its presentation-specific styles remain unchanged.

## Behavior changes

Tooltip trigger composition uses `render` instead of `asChild`.

## Verify by hand

Go offline, hover and keyboard-focus the Offline badge, then confirm the tooltip appears at the expected delay and dismisses when focus leaves.
