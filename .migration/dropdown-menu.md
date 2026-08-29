# dropdown-menu

2026-08-29, engine migration, rebuilt against Base UI Menu Portal, Positioner, Popup, and submenu parts.

## Changed

`components/ui/dropdown-menu.tsx`: preserves the existing wrapper surface and classes, replacing Radix interaction parts and icons with Base UI and Phosphor.

Leftover scan: `grep -n "radix-ui\|@radix-ui" components/ui/dropdown-menu.tsx` is clean.

## Left alone

No application consumer currently uses this wrapper.

## Behavior changes

Base UI uses `data-highlighted` and `data-popup-open` state attributes instead of Radix focus/open data attributes.

## Verify by hand

Open a menu with Enter, navigate items with arrow keys, dismiss it with Escape, and confirm focus returns to its trigger. Repeat for a submenu.
