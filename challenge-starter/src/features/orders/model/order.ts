export type OrderStatus = 'pending' | 'processing' | 'fulfilled' | 'cancelled';

export interface Order {
  id: string;
  reference: string;
  customerName: string;
  totalCents: number;
  status: OrderStatus;
  updatedAt: string;
}

export interface OrderFilters {
  q: string;
  status?: OrderStatus;
  page: number;
}

export interface OrderPage {
  items: Order[];
  page: number;
  totalPages: number;
}
