import { z } from 'zod';
import type { OrderFilters, OrderPage, OrderStatus } from '../model/order';

const orderSchema = z.object({ id: z.string(), reference: z.string(), customerName: z.string(), totalCents: z.number().int().nonnegative(), status: z.enum(['pending', 'processing', 'fulfilled', 'cancelled']), updatedAt: z.string() });
const pageSchema = z.object({ items: z.array(orderSchema), page: z.number().int().positive(), totalPages: z.number().int().positive() });

export async function listOrders(filters: OrderFilters, signal?: AbortSignal): Promise<OrderPage> {
  const params = new URLSearchParams({ q: filters.q, page: String(filters.page) });
  if (filters.status) params.set('status', filters.status);
  const response = await fetch(`/api/orders?${params}`, { signal });
  if (!response.ok) throw new Error(`Could not load orders (${response.status})`);
  return pageSchema.parse(await response.json());
}

export async function updateOrderStatus(id: string, status: OrderStatus): Promise<void> {
  const response = await fetch(`/api/orders/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) });
  if (!response.ok) throw new Error(response.status === 409 ? 'Order changed elsewhere. Refresh and try again.' : 'Could not update order');
}
