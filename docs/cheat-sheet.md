# Five-Minute React Architecture Cheat Sheet

## Say these things

- “I choose state management by ownership and lifecycle.”
- “The query key is the identity of cached server data.”
- “Derived state is computed, not stored.”
- “I favor feature boundaries and dependency direction over a universal folder taxonomy.”
- “I measure performance before applying memoization.”
- “Client guards support user experience; the API is the authorization boundary.”
- “I test observable behavior and failure paths, with MSW at the network boundary.”

## Avoid these traps

| Trap | Better framing |
| --- | --- |
| “Redux for all app state” | Use the smallest correct state owner |
| “`useEffect` for fetching everywhere” | Adopt a query abstraction with cache/error semantics |
| “Memoize every callback” | Optimize measured render/compute bottlenecks |
| “Context replaces Redux” | Context distributes dependencies; it does not solve all state workflow concerns |
| “Frontend role checks secure the app” | Server authorization is mandatory |
| “We need microfrontends” | Establish clear feature/package boundaries; add distributed deployment only for organizational need |

## A 60-second system-design answer

“I would begin with a feature-oriented React application. The route owns URL state, TanStack Query owns remote data and request lifecycles, components own ephemeral interaction state, and Redux Toolkit is reserved for cross-route client workflows such as notifications or offline drafts. Each feature maps API data into a typed domain model at its boundary, exposes a small public interface, and handles loading, error, empty, and stale states deliberately. I would add route-level error boundaries, accessible interaction behavior, analytics/error telemetry, and a test suite built around MSW and Testing Library. We would ship thin vertical slices, capture consequential decisions in ADRs, and use metrics to target performance work.”
