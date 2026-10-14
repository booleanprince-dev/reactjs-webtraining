# Coding Challenge: Order Operations Console

## Goal

Build a small production-minded React feature in 2–3 hours. Explain your state-placement decisions as you work. The starter deliberately has no build configuration so you can either copy it into your preferred Vite TypeScript app or set one up yourself.

## Product brief

Operations users need to search orders, filter by status, and update an order’s status. A link to a filtered view must work when shared with another user.

## Requirements

1. Render loading, error (with retry), empty, and successful list states.
2. Store `q`, `status`, and `page` in URL search parameters.
3. Fetch orders through a query layer; do not mirror the response in a Redux slice.
4. Open an edit dialog/drawer for a row. Keep its form state local.
5. Submit a status update and refresh or correctly update cached data.
6. Display success/failure feedback. Decide whether that warrants a global store.
7. Validate API input/output at the boundary (Zod preferred).
8. Add tests for at least the error/retry state and successful mutation.

## Constraints

- TypeScript strict mode.
- Use semantic table/button/form elements and keyboard-accessible dialog behavior.
- Make stale-data/refetch behavior intentional.
- Include a short `DECISIONS.md` explaining state placement, query keys, mutation strategy, and trade-offs.

## Stretch

- Abort obsolete search requests and debounce URL writes.
- Handle a `409` conflict.
- Add optimistic update + rollback.
- Add an MSW handler and integration test.
- Add row virtualization and explain when it becomes justified.

## Suggested dependencies

`react`, `react-dom`, `react-router-dom`, `@tanstack/react-query`, `zod`, `@reduxjs/toolkit`, `react-redux`, `vitest`, `@testing-library/react`, `msw`.

## Suggested verbal walkthrough

“The URL owns shareable filters. The query cache owns orders because the server owns their truth. The dialog owns the temporary selection and form. A notification queue is global only because it crosses routes. The mutation invalidates the exact orders query family because this system is eventually consistent; I would add optimistic logic only after confirming its UX benefit and conflict semantics.”
