import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import Login from "./pages/Login";
import "antd/dist/reset.css";
import { ConfigProvider } from "antd";
import Signup from "./pages/Signup";
import AdminSignup from "./pages/AdminSignup";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import AppProvider from "./providers/App";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin/signup",
    element: <AdminSignup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/admin/inventory",
    element: <Inventory />,
  },
  {
    path: "/admin/orders",
    element: <Orders />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AppProvider>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#E07C24",
          },
        }}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
    </AppProvider>
  </React.StrictMode>
);
