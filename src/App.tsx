import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Catalog from '../src/routes/ClientHome/Catalog';
import ProductDetails from '../src/routes/ClientHome/ProductDetails';
import ClientHome from './routes/ClientHome';
import Cart from './routes/ClientHome/Cart';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ClientHome />}>
          <Route index element={<Catalog />} />
          <Route path='catalog' element={<Catalog />} />
          <Route path='product-details/:productId' element={<ProductDetails />} />
          <Route path='cart' element={<Cart />} />
        </Route>
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
