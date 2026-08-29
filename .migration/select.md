# select

2026-08-29, engine migration, rebuilt against Base UI Select Portal, Positioner, Popup, and List parts.

## Changed

`components/ui/select.tsx`: preserves wrapper exports and editorial classes while using Base UI positioning and Phosphor icons.

`components/mode-toggle.tsx`: handles Base UI's nullable selected value and wraps items in SelectGroup.

Leftover scan: `grep -n "radix-ui\|@radix-ui" components/ui/select.tsx components/mode-toggle.tsx` is clean.

## Left alone

Theme names and next-themes behavior are unchanged.

## Behavior changes

`onValueChange` can receive `null`; consumers must handle it.

## Verify by hand

Open the theme selector with the keyboard, choose each option with arrow keys and Enter, then confirm focus returns to the trigger after Escape.
