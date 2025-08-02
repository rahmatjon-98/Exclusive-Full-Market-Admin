import { lazy } from "react";

export const Layout = lazy(() => import("./Layout"));
export const Dashboard = lazy(() => import("./dashboard"));
export const Login = lazy(() => import("./login"));
export const Orders = lazy(() => import("./orders"));
export const Others = lazy(() => import("./others"));
export const OthersCategories = lazy(() => import("./othersCategories"));
export const OthersSubCategories = lazy(() => import("./OthersSubCategories"));
export const OthersColors = lazy(() => import("./othersColors"));
export const Products = lazy(() => import("./products"));
export const ProductsAdd = lazy(() => import("./productsAdd"));
export const ProductsEdit = lazy(() => import("./productsEdit"));
export const ResetPassword = lazy(() => import("./resetPassword"));
export const ForgotPassword = lazy(() => import("./forgotPassword"));
