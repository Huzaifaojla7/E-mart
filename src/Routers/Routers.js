import { Routes, Route, Navigate } from 'react-router-dom'

import Home from '../Pages/Home';
import Login from '../Pages/Login';
import Cart from '../Pages/Cart';
import ProductDetail from '../Pages/ProductDetail';
import Shop from '../Pages/Shop';
import Checkout from '../Pages/Checkout';
import Signup from '../Pages/Signup';
import ProtectedRoute from './ProtectedRoute';
import AddProduct from '../Admin/AddProduct';
import AllProduct from '../Admin/AllProduct';
import Dashboard from '../Admin/Dashboard';
import Users from '../Admin/Users';

const Routers = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to={'home'} />} />
      <Route path='home' element={<Home />} />
      <Route path='login' element={<Login />} />
      <Route path='cart' element={<Cart />} />
      <Route path='shop' element={<Shop />} />
      <Route path='shop/:id' element={<ProductDetail />} />

      <Route path='/*' element={<ProtectedRoute />}>
        <Route path='checkout' element={<Checkout />} />
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='dashboard/all-products' element={<AllProduct />} />
        <Route path='dashboard/add-product' element={<AddProduct />} />
        <Route path='dashboard/users' element={<Users />} />
        <Route />
      </Route>

      <Route path='Signup' element={<Signup />} />
    </Routes>
  )
}

export default Routers
