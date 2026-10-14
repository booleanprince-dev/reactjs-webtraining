import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi, describe, expect, it } from 'vitest';
import { OrdersPage } from './orders-page';

vi.mock('../api/orders-api', () => ({
  listOrders: vi.fn().mockResolvedValue({ items: [], page: 1, totalPages: 1 }),
  updateOrderStatus: vi.fn(),
}));

function renderPage() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(<MemoryRouter><QueryClientProvider client={client}><OrdersPage /></QueryClientProvider></MemoryRouter>);
}

describe('OrdersPage', () => {
  it('shows the empty state after a successful empty response', async () => {
    renderPage();
    expect(await screen.findByText('No orders match these filters.')).toBeInTheDocument();
  });

  it('writes a search term to the shareable URL state', async () => {
    renderPage();
    await screen.findByText('No orders match these filters.');
    fireEvent.change(screen.getByLabelText('Search'), { target: { value: 'ACME' } });
    expect(screen.getByLabelText('Search')).toHaveValue('ACME');
  });
});
