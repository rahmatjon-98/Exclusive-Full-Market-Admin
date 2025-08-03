import { Route, Routes } from "react-router";
import "./App.css";
// import { Route, Routes } from "react-router";
// import Layout from "./pages/Layout";
// import Dashboard from "./pages/dashboard";
// import Login from "./pages/login";
// import ForgotPassword from "./pages/forgotPassword";
// import ResetPassword from "./pages/resetPassword";
// import Others from "./pages/others";
// import Orders from "./pages/orders";
// import OthersCategories from "./pages/othersCategories";
// import Products from "./pages/products";
// import ProductsEdit from "./pages/productsEdit";
// import OthersSubCategories from "./pages/OthersSubCategories";
// import OthersColors from "./pages/othersColors";
// import ProductsAdd from "./pages/productsAdd";
import {
  Dashboard,
  ForgotPassword,
  Layout,
  Login,
  Orders,
  Others,
  OthersCategories,
  OthersColors,
  OthersSubCategories,
  Products,
  ProductsAdd,
  ProductsEdit,
  ResetPassword,
} from "./pages/lazy";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="login" element={<Login />} />

        <Route path="forgotPassword" element={<ForgotPassword />} />
        <Route path="resetPassword" element={<ResetPassword/>} />

        <Route path="others" element={<Others />} />
        <Route path="orders" element={<Orders />} />
        <Route path="othersCategories" element={<OthersCategories />} />
        <Route path="othersSubCategories" element={<OthersSubCategories />} />
        <Route path="othersColors" element={<OthersColors />} />

        <Route path="products" element={<Products />} />
        <Route path="productsAdd" element={<ProductsAdd />} />
        <Route path="/productsEdit/:id" element={<ProductsEdit />} />
      </Route>
    </Routes>
  );
}

export default App;
