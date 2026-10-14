# React.JS Architecture: Senior/Lead Crash Course

## 1. Your opening position in an architecture interview

Start with outcomes and constraints: “I design React applications around ownership of state, independent feature boundaries, accessible behavior, and safe delivery. I put server data in a query cache, URL-shareable state in the router, local interaction state in components, and introduce a global client store only for genuinely shared workflows.”

That statement signals judgement. The rest of the interview should substantiate it.

## 2. The state-placement decision (the highest-value React topic)

Before selecting Redux, classify the state:

| State | Owner | Example | Preferred tool |
| --- | --- | --- | --- |
| Server state | Backend, mirrored locally | orders, user profile, permissions | TanStack Query / RTK Query |
| URL state | Browser history | page, search, selected tab | React Router search params |
| Local UI state | A component/subtree | dialog open, input draft, hover | `useState`, `useReducer` |
| Shared client workflow state | Frontend | unsaved checkout, notification queue | Redux Toolkit, Zustand, context + reducer |
| Derived state | Nothing—compute it | filtered list, total price | selector / `useMemo` only if needed |

Do not copy remote data into Redux “because Redux is our state manager.” It creates cache invalidation and synchronization bugs. Likewise, do not globalize a modal state because it is convenient today; colocate it until several independent areas need it.

### A concise answer to “When would you use Redux?”

“I use Redux Toolkit when cross-feature client state has complex transitions, needs predictable debugging/auditability, or must survive route changes. I do not use it as an HTTP cache by default; TanStack Query or RTK Query handles server state better. For a small app, local state and context are simpler. I choose from data ownership and change patterns, not team habit.”

## 3. Feature-oriented architecture

Organize by business capability rather than file type. A feature owns its API adapter, model, components, hooks, state, and tests. The app layer composes features; `shared/` only contains genuinely reusable, domain-agnostic code.

```text
src/
  app/                 # providers, router, application composition
  features/
    orders/
      api/             # request/response adapters
      components/      # feature UI
      hooks/           # feature orchestration
      model/           # types, validation, domain rules
      state/           # only if global client state is warranted
  shared/
    api/ components/ lib/
```

Rules that keep this scalable:

1. Features may consume `shared`, but `shared` must not depend on features.
2. Prefer a feature’s public entry point over deep imports by other features.
3. Keep domain types close to their API mapping; UI should not know raw API shape.
4. Extract only after duplication proves a stable abstraction. Premature `common/` folders become dumping grounds.

## 4. Data fetching that behaves in production

Treat every request as a state machine: `pending`, `error`, `success with data`, and `success with no data`. Preserve existing content while background refetches run; display an unobtrusive “refreshing” indicator rather than replacing useful data with a spinner.

With TanStack Query, a query key is a cache identity. It must contain every input that changes the response:

```ts
const ordersQuery = (filters: OrderFilters) =>
  queryOptions({
    queryKey: ['orders', filters],
    queryFn: ({ signal }) => ordersApi.list(filters, signal),
    staleTime: 30_000,
  });
```

For mutation: optimistically update only when rollback is reliable and the interaction benefits from immediacy. Otherwise submit, invalidate the affected query keys on success, surface a meaningful failure, and retain the user’s input where possible. Cancel stale requests with `AbortSignal`, especially for search/typeahead.

## 5. Components, composition, and performance

Keep components focused on a single reason to change. Separate data orchestration from presentational rendering when it makes behavior testable and reusable—not mechanically.

- Use controlled inputs for validation, dependent fields, and persisted drafts; uncontrolled inputs can be perfectly valid for simple forms.
- Use `useReducer` when state transitions are related and named actions make rules clearer.
- Use `useMemo`, `useCallback`, and `memo` only after measuring or when they preserve referential contracts. They add complexity and can hide stale-closure bugs.
- Virtualize long lists. Paginate or cursor-fetch before rendering thousands of rows.
- Use `key` as stable identity, never an array index for mutable lists.
- Use `React.lazy`/route-level code splitting at natural product boundaries, then measure bundle impact.

## 6. TypeScript as architecture

Enable `strict`. Model state so invalid combinations are unrepresentable:

```ts
type Async<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };
```

Validate runtime data at the boundary (for example with Zod); TypeScript cannot prove a network response is truthful. Prefer discriminated unions for workflow states, exhaustive `switch` checks, `unknown` in error handling, and types derived from schemas where useful.

## 7. Reliability, accessibility, and security

Architecture includes the unhappy path. Mention:

- error boundaries around route/feature areas; retry actions and meaningful fallbacks;
- accessible names, semantic HTML, keyboard behavior, focus movement after dialogs/navigation, and screen-reader announcements for async updates;
- authorization checks enforced by the server; frontend guards improve UX but are not security;
- never trusting user-generated HTML; avoid `dangerouslySetInnerHTML` unless sanitized;
- centralized telemetry for client errors, performance, and important mutations—with request/correlation IDs but without sensitive data.

## 8. Testing pyramid

Test behavior, not implementation internals.

1. Unit-test pure domain transforms and reducers.
2. Component/integration-test user-visible behavior with Testing Library and MSW: loading, error, empty, success, mutation failure.
3. End-to-end-test only essential workflows: login, permissions, critical create/update flows.

A strong answer: “I use MSW so tests exercise the real request boundary without brittle mocked hooks. I test the server state transitions users can observe and keep a small E2E suite for wiring and browser-specific risks.”

## 9. Lead-level delivery process

For a new feature: clarify outcomes and nonfunctional constraints; slice vertically; write an ADR only for consequential decisions; agree on API contracts and error semantics; implement behind a flag if risk warrants; review with a definition of done; observe metrics/errors after release. In Linear, use a parent initiative/epic, thin independently shippable tickets, explicit acceptance criteria, dependencies, and a short decision log—not a task list that hides uncertainty.

## 10. 90-minute rehearsal plan

- 0–15: explain the state-placement table aloud.
- 15–35: sketch the feature architecture and data flow in `architecture-notes.md`.
- 35–70: start the coding challenge; make data states work before styling.
- 70–90: answer five prompts from `interview-drills.md` aloud, using a concrete past example.
