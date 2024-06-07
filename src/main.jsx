import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import Home from './Pages/Home/Home';
import Root from './Root/Root';
import ProductDetails from './Pages/ProductDetails/ProductDetails';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Provider from './Pages/Provider/Provider';
import { NextUIProvider } from '@nextui-org/react';
import Cart from './Pages/Cart/Cart';
import Payment from './Pages/Payment/Payment';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/product/:id",
        element: <ProductDetails></ProductDetails>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/myCart",
        element: <Cart></Cart>,
      },
      {
        path: "/payment",
        element: <Payment></Payment>,
      },
    ]
  },

]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider>
      <Provider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </Provider>
    </NextUIProvider>


  </React.StrictMode>,
)
