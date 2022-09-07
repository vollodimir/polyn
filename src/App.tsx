import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import { Shop, Cart, Home, NotFound, ShopDetail } from './pages';
import { AddCategory } from './pages/Admin/AddCategory';
import { AddProduct } from './pages/Admin/AddProduct';
import { AddSubcategory } from './pages/Admin/AddSubcategory';
import { AdminPanel } from './pages/Admin/AdminPanel';
import { Test } from './pages/Admin/Test';
import { Checkout } from './pages/Checkout';
import { Contact } from './pages/Contact';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { selectIsAuth } from './redux/auth/selectors';
import { fetchMe } from './redux/auth/slise';
import { fetchCategories } from './redux/shop/slice';
import { useAppDispatch } from './redux/store';

import './scss/style.scss';

function App() {
  const dispatch = useAppDispatch();
  const isAuth = useSelector(selectIsAuth);
  React.useEffect(() => {
    dispatch(fetchMe());
    dispatch(fetchCategories());
  }, []);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:id" element={<ShopDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/add-prod" element={<AddProduct />} />
        <Route path="/admin/add-cat" element={<AddCategory />} />
        <Route path="/admin/add-subcat" element={<AddSubcategory />} />
        <Route path="/admin/test" element={<Test />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
