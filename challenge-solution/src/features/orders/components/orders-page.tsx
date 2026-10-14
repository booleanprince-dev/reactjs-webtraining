import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import type { Order, OrderFilters, OrderStatus } from '../model/order';
import { OrderList } from './order-list';
import { useOrders, useUpdateOrderStatus } from '../hooks/use-orders';

const statuses: OrderStatus[] = ['pending', 'processing', 'fulfilled', 'cancelled'];

function filtersFrom(params: URLSearchParams): OrderFilters {
  const rawStatus = params.get('status');
  return { q: params.get('q') ?? '', status: statuses.includes(rawStatus as OrderStatus) ? rawStatus as OrderStatus : undefined, page: Math.max(1, Number(params.get('page') ?? '1') || 1) };
}

export function OrdersPage() {
  const [params, setParams] = useSearchParams();
  const filters = filtersFrom(params);
  const { data, isPending, isFetching, isError, error, refetch } = useOrders(filters);
  const mutation = useUpdateOrderStatus();
  const [selected, setSelected] = useState<Order | null>(null);
  const setFilter = (name: string, value: string) => setParams((current) => { const next = new URLSearchParams(current); value ? next.set(name, value) : next.delete(name); next.set('page', '1'); return next; });
  const submit = (status: OrderStatus) => selected && mutation.mutate({ id: selected.id, status }, { onSuccess: () => setSelected(null) });

  return <main><h1>Order operations</h1>
    <label>Search <input value={filters.q} onChange={(event) => setFilter('q', event.target.value)} /></label>
    <label>Status <select value={filters.status ?? ''} onChange={(event) => setFilter('status', event.target.value)}><option value="">All</option>{statuses.map((status) => <option key={status}>{status}</option>)}</select></label>
    {isPending && <p role="status">Loading orders…</p>}
    {isError && <section role="alert"><p>{error.message}</p><button onClick={() => refetch()}>Retry</button></section>}
    {data?.items.length === 0 && <p>No orders match these filters.</p>}
    {data && data.items.length > 0 && <><OrderList orders={data.items} onEdit={setSelected} />{isFetching && <p role="status">Refreshing…</p>}</>}
    {selected && <section role="dialog" aria-modal="true" aria-label={`Update ${selected.reference}`}><h2>Update status</h2>{statuses.map((status) => <button key={status} disabled={mutation.isPending} onClick={() => submit(status)}>{status}</button>)}{mutation.isError && <p role="alert">{mutation.error.message}</p>}<button onClick={() => setSelected(null)}>Cancel</button></section>}
  </main>;
}
