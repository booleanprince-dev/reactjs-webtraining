# Decisions

- Search and status are router state because they define a shareable resource view.
- Orders remain in TanStack Query; Redux is unnecessary here. A real cross-route toast queue would be a reasonable small Redux Toolkit slice.
- The query key includes the entire normalized filters object, avoiding cache collisions.
- The status form is local because only the edit dialog uses it.
- The mutation invalidates `['orders']`. This favors canonical eventual consistency over optimistic complexity. If latency becomes a proven UX issue, add `onMutate` snapshot/rollback and handle conflicts explicitly.
