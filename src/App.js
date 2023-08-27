import React from 'react';
// import { ProductList } from './features/product-list/ProductList';
import './App.css';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { createBrowserRouter,RouterProvider,Route } from 'react-router-dom';
import CartPage from './pages/CartPage';
// import ProductDetails from './features/product-list/components/ProductDetails';
import ProductDetailsPage from './pages/ProductDetailsPage';
const router = createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },
  {
    path:"/signup",
    element:<SignupPage/>
  },
  {
    path:"/signin",
    element:<LoginPage/>
  },
  {
    path:"/cart",
    element:<CartPage/>
  },
  // {
  //   path:"/cart",
  //   element:<CartPage/>
  // },
  {
    path:"/product-detail",
    element:<ProductDetailsPage/>
  },
])

function App() {
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
