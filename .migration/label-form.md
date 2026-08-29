# label/form

2026-08-29, engine migration, replaced legacy React Hook Form wrappers with native labels and Base Field primitives.

## Changed

`components/ui/label.tsx`: uses a native label wrapper.

`components/ui/form.tsx`: removes the unused React Hook Form bridge and exports Base-compatible Field, FieldLabel, FieldDescription, and FieldError primitives.

`components/access-form.tsx`: uses native form fields, Base Field composition, accessible invalid state, and live error/status feedback.

Leftover scan: `grep -n "radix-ui\|@radix-ui\|react-hook-form" components/ui/label.tsx components/ui/form.tsx components/access-form.tsx` is clean.

## Left alone

Server-action contracts, URL-code submission, animation timing, PostHog identification, and router refresh behavior are unchanged.

## Behavior changes

Legacy `Form*` exports were removed. Forms now compose native forms and Field primitives.

## Verify by hand

Submit an invalid access code and confirm the input is announced as invalid. Complete all three steps, then revisit with `?code=` and confirm automatic submission still works.
