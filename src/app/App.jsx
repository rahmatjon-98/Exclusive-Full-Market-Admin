import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router";
import {
  Dashboard,
  ForgotPassword,
  Layout,
  Login,
  Orders,
  Others,
  Products,
  ProductsAdd,
  ProductsEdit,
  ResetPassword,
} from "./pages/lazy";
// import Layout from "./pages/Layout";
// import Login from "./pages/login";
// import Dashboard from "./pages/dashboard";
// import Orders from "./pages/orders";
// import Others from "./pages/others";
// import Products from "./pages/products";
// import ForgotPassword from "./pages/forgotPassword";
// import ResetPassword from "./pages/resetPassword";
// import ProductsAdd from "./pages/productsAdd";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="login" element={<Login />} />
        <Route path="forgotPassword" element={<ForgotPassword />} />
        <Route path="resetPassword" element={<ResetPassword />} />
        <Route path="orders" element={<Orders />} />
        <Route path="others" element={<Others />} />
        <Route path="products" element={<Products />} />
        <Route path="productsAdd" element={<ProductsAdd />} />
        <Route path="productsEdit" element={<ProductsEdit />} />
      </Route>
    </Routes>
  );
}

export default App;
