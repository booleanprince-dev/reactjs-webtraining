import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { listOrders, updateOrderStatus } from '../api/orders-api';
import type { OrderFilters, OrderStatus } from '../model/order';

export const orderKeys = { all: ['orders'] as const, list: (filters: OrderFilters) => ['orders', filters] as const };

export function useOrders(filters: OrderFilters) {
  return useQuery({
    queryKey: orderKeys.list(filters),
    queryFn: ({ signal }) => listOrders(filters, signal),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: OrderStatus }) => updateOrderStatus(id, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: orderKeys.all }),
  });
}
