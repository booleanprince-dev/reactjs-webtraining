import { BrowserRouter } from 'react-router-dom';
import { AppProviders } from './providers';
import { OrdersPage } from '../features/orders/components/orders-page';

export function App() { return <BrowserRouter><AppProviders><OrdersPage /></AppProviders></BrowserRouter>; }
