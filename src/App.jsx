import React, { useState } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Link,
} from "react-router-dom";
import "./App.css";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Login from "./pages/Login";
import CartProvider from "./CartContext";
import Shop from "./pages/Shop";
import { QueryClient, QueryClientProvider } from "react-query";
import FoodDetails from "./components/FoodDetails";
import CartPage from "./pages/CartPage";
import PaymentPage from "./pages/PaymentPage";
import OrderConfirmation from "./pages/OrderConfirmation";

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="shop" element={<Shop />} />
      <Route path="shop/:productId" element={<FoodDetails />} />
      <Route path="cart" element={<CartPage />} />
      <Route path="payment" element={<PaymentPage />} />
      <Route path="success" element={<OrderConfirmation />} />

      <Route path="login" element={<Login />} />
    </Route>
  )
);

export default function App() {
  return (
    <CartProvider>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </QueryClientProvider>
    </CartProvider>
  );
}
