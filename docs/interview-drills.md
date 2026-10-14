# Lead-Level Interview Drills

## 1. “How do you decide between Context, Redux, and TanStack Query?”

Classify ownership first. Context is good for stable dependencies like theme, locale, auth facade, or a small subtree state; it can trigger broad rerenders and is not a cache. Redux Toolkit is for complex shared client transitions and debugging. TanStack Query/RTK Query is for data whose source of truth is the server. URL state holds shareable navigation state.

## 2. “How would you structure a growing React application?”

Use feature boundaries, dependency direction, explicit public APIs, and a small app composition layer. Explain that packages/folders follow product domains. Centralize conventions such as error handling, API client, telemetry, and design tokens, not every component.

## 3. “A page is slow. What do you do?”

Measure first using browser performance tools, React Profiler, Web Vitals, network waterfall, and bundle analysis. Diagnose whether it is slow API, too much JavaScript, render churn, expensive calculation, or DOM size. Fix the measured bottleneck: cache/prefetch, code-split, virtualize, move work server-side, stabilize props, or memoize a proven hot path. Verify improvement with the same measurement.

## 4. “How do you manage async failure?”

Model all states; distinguish initial loading from refetch; provide retry and stable prior data where safe; place error boundaries by recovery domain; map API errors to user-relevant messages; log unexpected errors with context; never silently swallow a rejected promise.

## 5. “How do you lead code reviews?”

Start with correctness, security, behavior, architecture, and test coverage before style. Ask questions that teach judgement. Keep comments actionable and proportional to risk. Set team conventions through examples, linters, templates, and short ADRs—not repeated review comments. Escalate blocking concerns clearly and pair on high-risk changes.

## 6. “How would you plan this in Linear?”

Turn the objective into a thin vertical slice, enumerate risks/dependencies, create outcome-oriented tickets with acceptance criteria, size uncertainty honestly, and use milestones/initiatives for the release. Track decisions and unblock work; do not confuse updating tickets with managing delivery.

## 7. Questions to ask them

- What is the current boundary between frontend platform work and product-team ownership?
- Which reliability or delivery metric would this lead be expected to improve first?
- How are architectural decisions made when US and Philippines teams have limited overlap?
- What does a successful first 90 days look like for this role?
