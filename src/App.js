import React from "react";
// import { ProductList } from './features/product-list/ProductList';
import "./App.css";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import { useEffect } from "react";
import CartPage from "./pages/CartPage";
// import ProductDetails from './features/product-list/components/ProductDetails';
import ProductDetailsPage from "./pages/ProductDetailsPage";
import Checkout from "./pages/Checkout";
import { Protected } from "./features/auth/components/Protected";
import { useDispatch, useSelector } from "react-redux";
import { fetchItemsbyUserIdAsync } from "./features/cart/cartSlice";
import PageNotFound from "./pages/404";
import { OrderSuccessPage } from "./pages/OrderSuccessPage";
import { UserOrders } from "./features/user/components/UserOrders";
import UserProfilePage from "./pages/UserProfilePage";
import {
  fetchLoggedInUserAsync,
  selectUserInfo,
} from "./features/user/userSlice";
import {
  checkAuthAsync,
  selectLoggedInUser,
  selectuserChecked,
} from "./features/auth/authSlice";
import UserOrderPage from "./pages/UserOrderPage";
import Logout from "./features/auth/components/Logout";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
// import UserOrdersPage from './pages/userOrdersPage';
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import Footer from "./features/common/Footer";
import { resetOrder, selectCurrentOrder } from "./features/order/orderSlice";

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home />
      </Protected>
    ),
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/cart",
    element: (
      <Protected>
        <CartPage />
      </Protected>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Protected>
        <Checkout></Checkout>
      </Protected>
    ),
  },
  {
    path: "/product-detail/:id",
    element: (
      <Protected>
        <ProductDetailsPage />
      </Protected>
    ),
  },
  {
    path: "*",
    element: <PageNotFound></PageNotFound>,
  },
  {
    path: "/order-success/:id",
    element: <OrderSuccessPage></OrderSuccessPage>,
  },
  {
    path: "/orders",
    element: <UserOrderPage></UserOrderPage>, // time stamp: 4:53:35 not created file in page as UserOrderPage, see accordingly
  },
  {
    path: "/profile",
    element: <UserProfilePage></UserProfilePage>,
  },
  {
    path: "/logout",
    element: <Logout></Logout>,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage></ForgotPasswordPage>,
  },
]);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser); // selectLoggedInUser is used only to get token(changed id to token) not the whole info and for whole info we will be using selectUserInfo
  console.log(user);
  const userChecked = useSelector(selectuserChecked);

  useEffect(() => {
    dispatch(checkAuthAsync());

  }, []);
  
  useEffect(() => {
    //reset currentOrder
    dispatch(resetOrder());
  }, [])
  

  useEffect(() => {
    if (user) {
      dispatch(fetchItemsbyUserIdAsync());
      dispatch(fetchLoggedInUserAsync()); // we can get req.user by token on backend so no need to give in frontend
    }
  }, [dispatch, user]);

  return (
    <>
    <div className="App bg-gray-100">
      {/* <Home/> */}
      {/* <LoginPage></LoginPage> */}
      {/* <SignupPage></SignupPage> */}
      <Provider template={AlertTemplate} {...options}>
        {userChecked && <RouterProvider router={router} />}
      </Provider>
    </div>
      <Footer></Footer>
    </>
  );
}

export default App;
