# Architecture Reference: Order Operations Console

## Context

An operations team needs to search orders, filter by status, inspect an order, and update status. Filters must be shareable. Multiple tabs may be open. The API is eventually consistent after an update.

## Proposed flow

```text
Browser URL (q, status, page)
            |
            v
Route / feature container -----> TanStack Query cache <---- orders API
            |                         |                         |
            v                         v                         v
  local dialog/form state       invalidation/refetch        schema validation
            |
            v
  Redux only for cross-route client workflow (notifications / draft)
```

## Boundary decisions

| Concern | Decision | Reason |
| --- | --- | --- |
| Orders and status transitions | Query cache | Backend owns the truth; cache/invalidation fits |
| Search/status/page | URL search params | Shareable, back-button friendly, durable |
| Status-edit dialog form | Component state | One interaction owns it |
| Toast queue | Redux Toolkit slice | Cross-route, ordered client workflow |
| `visibleOrders` | Derived selector | Avoid two sources of truth |
| Permissions | Bootstrap/session query | Server still authorizes every mutation |

## API contract assumptions to state in an interview

- `GET /orders?q=&status=&page=` returns items, pagination metadata, and a server version/timestamp.
- `PATCH /orders/:id` expects an idempotency key and returns the canonical updated order.
- `409` represents a conflict/version mismatch; show the latest data and ask the user to retry.
- `401` starts re-authentication; `403` means visible but unavailable action or feature route.
- Validation failures use a stable field-error shape; unknown failures are retryable only where safe.

## Scaling and trade-offs

At 20 records, local list rendering is enough. At thousands, use server filtering, cursor pagination, and virtualization. For frequent multi-user updates, invalidate/refetch after mutation; introduce WebSocket/SSE only after proving freshness requirements demand it. For a multi-team monorepo, enforce feature import boundaries and expose a small public API per feature.

## Example ADR format

**Decision:** use TanStack Query for remote order data and Redux Toolkit for notifications only.  
**Why:** separates cache behavior from client workflow transitions and reduces duplicated state.  
**Consequences:** team learns two focused tools; query keys and invalidation conventions need documentation.  
**Revisit when:** offline-first editing or a standardized RTK Query platform becomes a product need.
