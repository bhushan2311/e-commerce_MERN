import React from 'react';
// import { ProductList } from './features/product-list/ProductList';
import './App.css';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
function App() {
  return (
    <div className="App">
      {/* <Home/> */}
      {/* <LoginPage></LoginPage> */}
      <SignupPage></SignupPage>
    </div>
  );
}

export default App;
