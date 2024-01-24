import React from 'react';
// import { ProductList } from './features/product-list/ProductList';
import './App.css';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { createBrowserRouter,RouterProvider,Route } from 'react-router-dom';
import { useEffect } from 'react';
import CartPage from './pages/CartPage';
// import ProductDetails from './features/product-list/components/ProductDetails';
import ProductDetailsPage from './pages/ProductDetailsPage';
import Checkout from './pages/Checkout';
import {Protected} from './features/auth/components/Protected';
import { useDispatch,useSelector } from 'react-redux';
import { fetchItemsbyUserIdAsync } from './features/cart/cartSlice';
import { selectLoggedInUser } from './features/auth/authSlice';
import PageNotFound from './pages/404';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { UserOrders } from './features/user/components/UserOrders';
import UserProfilePage from './pages/UserProfilePage';
// import UserOrdersPage from './pages/userOrdersPage';




const router = createBrowserRouter([

  {
    path:"/",
    element:<Protected><Home/></Protected>
  },
  {
    path:"/signup",
    element:<SignupPage/>
  },
  {
    path:"/login",
    element:<LoginPage/>
  },
  {
    path:"/cart",
    element:<Protected><CartPage/></Protected> 
  },
  { 
    path: '/checkout',
    element:<Protected><Checkout></Checkout></Protected>,
  },
  {
    path:"/product-detail/:id",
    element:<Protected><ProductDetailsPage/></Protected>
  },
  {
    path:"*",
    element:<PageNotFound></PageNotFound>
  },
  {
    path:"/order-success/:id",
    element:<OrderSuccessPage></OrderSuccessPage>
  },
  {
    path:"/orders",
    // element:<UserOrderPage></UserOrderPage>  // time stamp: 4:53:35 not created file in page as UserOrderPage, see accordingly
    element:<UserOrders></UserOrders>  
  },
  {
    path:"/profile",
    element:<UserProfilePage></UserProfilePage>
  },
])

function App() {

  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  console.log(user);
  useEffect(() => {
    if(user){
      dispatch(fetchItemsbyUserIdAsync(user.id));
    }
  }, [dispatch,user])
  

  return (
    <div className="App">
      {/* <Home/> */}
      {/* <LoginPage></LoginPage> */}
      {/* <SignupPage></SignupPage> */}
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
