import type { Order } from '../model/order';

interface OrderListProps {
  orders: Order[];
  onEdit(order: Order): void;
}

export function OrderList({ orders, onEdit }: OrderListProps) {
  return (
    <table>
      <caption>Orders</caption>
      <thead><tr><th>Reference</th><th>Customer</th><th>Status</th><th>Total</th><th>Action</th></tr></thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id}>
            <td>{order.reference}</td><td>{order.customerName}</td><td>{order.status}</td>
            <td>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(order.totalCents / 100)}</td>
            <td><button type="button" onClick={() => onEdit(order)}>Update status</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
