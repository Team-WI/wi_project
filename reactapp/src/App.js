/* 
src/App.js
*/

import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/Layout/Header";
import Footer from "./components/Footer";
import MainPage from "./pages/MainPage";
import {PrivateRoute} from './components/PrivateRoute';
import Wishlist from "./pages/Wishlist";
import MyPage from "./pages/MyPage";
import DelAccount from './pages/DelAccount'
import Inquiries from "./pages/Inquiries";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ProductList from "./components/ProductList";
import ProductDetail from "./pages/ProductDetail";
import ShoppingCart from "./pages/ShoppingCart";
import Checkout from "./pages/Checkout";
import SearchResult from "./pages/SearchResult";

import 'bootstrap/dist/css/bootstrap.min.css'; // 부트스트랩 설치
import './App.css';


// 추가
import Notice from "./pages/Notice";
import {MyOrder} from "./pages/MyOrder";
import MyOrderDetail from "./pages/MyOrderDetail";
import CancelList from "./pages/CancelList";

const App = () => {
  return (    
    <Router>
      <div className="main-container">
      <div className="landing-page">
        <Header />
        <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/Wishlist" element={<PrivateRoute element={<Wishlist />} />} />
        <Route path="/MyPage" element={<PrivateRoute element={<MyPage />} />} />
        <Route path="/MyPage/DelAccount" element={<DelAccount/>} />
        <Route path="/MyPage/Inquiries" element={<Inquiries />} /> 
        <Route path="/MyPage/Notice" element={<Notice />} /> 
        <Route path="/MyPage/MyOrder" element={<MyOrder />} />
        <Route path="/MyPage/MyOrder/MyOrderDetail/:orderid" element={<MyOrderDetail />} />
        <Route path="/MyPage/CancelList" element={<CancelList />} />
        <Route path="/ShoppingCart" element={<PrivateRoute element={<ShoppingCart />} />}  />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} /> 
        <Route path="/categories/:category" element={<ProductList/>} />
        <Route path="/categories/:category/:item" element={<ProductList />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/search" element={<SearchResult/>} />
        <Route path="/Checkout/:productId" element={<Checkout />} />
        </Routes>
        <Footer />
        </div>
      </div>
    </Router>
    
  );
};

export default App;
