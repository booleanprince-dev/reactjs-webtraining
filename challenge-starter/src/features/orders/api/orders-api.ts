import type { OrderFilters, OrderPage, OrderStatus } from '../model/order';

const baseUrl = '/api';

export async function listOrders(_filters: OrderFilters, _signal?: AbortSignal): Promise<OrderPage> {
  // TODO: serialize every response-affecting filter; call fetch with the signal;
  // validate the response; map raw API data into the domain model.
  throw new Error('Implement listOrders');
}

export async function updateOrderStatus(_id: string, _status: OrderStatus): Promise<void> {
  // TODO: call PATCH /orders/:id, translate expected API errors, return canonical data.
  throw new Error('Implement updateOrderStatus');
}
