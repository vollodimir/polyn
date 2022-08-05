import { Routes, Route } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import { Shop, Cart, Home, NotFound, ShopDetail } from './pages';

import './scss/style.scss';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:id" element={<ShopDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
