# React Architecture Interview Crash Course

Audience: senior/lead engineers preparing for a TypeScript + React technical interview. Timebox: 6–8 focused hours.

## How to use this pack

1. Read [the learning guide](docs/learning-guide.md) end to end (about 90 minutes).
2. Draw the target architecture in [the architecture notes](docs/architecture-notes.md) from memory.
3. Build the challenge in `challenge-starter` in 2–3 hours. Do not open the solution first.
4. Compare your result against `challenge-solution`, then answer the interview drills aloud.

## What an interviewer is evaluating

They are rarely looking for a particular library. They are testing whether you can:

- split a UI into components and state boundaries that survive change;
- separate server state from client/UI state;
- make async states explicit (loading, empty, error, retry, stale data);
- choose Redux only when its trade-offs make sense;
- prevent regressions with types, tests, observability, and delivery discipline;
- lead the decision-making process, not merely write components.

## Folder map

| Path | Purpose |
| --- | --- |
| `docs/learning-guide.md` | Follow-through crash course and interview answers |
| `docs/architecture-notes.md` | Reference architecture, decision framework, diagrams |
| `docs/interview-drills.md` | Lead-level prompts and answer outlines |
| `challenge-starter/` | Intentionally incomplete order-management exercise |
| `challenge-solution/` | One possible architecture; compare decisions, not just code |

## Recommended stack and why

`React 19 + TypeScript + Vite` provides the app shell. `TanStack Query` owns HTTP/server data caching, invalidation, retries and request lifecycles. `Redux Toolkit` owns cross-cutting, durable client workflow state when URL/local state is insufficient. `React Router` owns navigation and URL-shareable filters. `Zod` validates untrusted API boundaries. `MSW` makes API behavior testable. `Vitest + Testing Library` test behavior; Playwright covers critical journeys.

Avoid presenting this as mandatory. A lead explains the boundary first, then selects the smallest tool that preserves clarity.
