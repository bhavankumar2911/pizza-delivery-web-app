import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import Login from "./pages/Login";
import "antd/dist/reset.css";
import { ConfigProvider } from "antd";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import AppProvider from "./providers/App";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "react-query";
import VerifyEmail from "./pages/VerifyEmail";

const queryClient = new QueryClient();

axios.interceptors.request.use((request) => {
  request.baseURL = "http://localhost:9000";
  request.withCredentials = true;

  return request;
});

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
    path: "/dashboard/:id",
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
  {
    path: "/verify/:id",
    element: <VerifyEmail />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  </React.StrictMode>
);
