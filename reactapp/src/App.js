/* 
src/App.jsx
실제 렌더링 되는 App.js
[ ] 상품 상세 ProductDetail.jsx 작성 예정
*/

import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NavBar from "./components/Layout/NavBar";
import Footer from "./components/Footer";
import MainPage from "./pages/MainPage";
import {PrivateRoute} from './components/PrivateRoute';
import MyLike from "./pages/MyLike";
import MyPage from "./pages/MyPage";
import ShoppingCart from "./pages/ShoppingCart";
import Inquiries from "./pages/Inquiries";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ProductList from "./components/ProductList";
import ProductDetail from "./pages/ProductDetail";

import 'bootstrap/dist/css/bootstrap.min.css'; // 부트스트랩 설치
import './App.css';




const App = () => {
  return (    
    <Router>
      <div className="main-container">
      <div className="landing-page">
        <NavBar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/MyLike" element={<PrivateRoute element={<MyLike />} />} />
          <Route path="/MyPage" element={<PrivateRoute element={<MyPage />} />} />
          <Route path="/MyPage/Inquiries" element={<Inquiries />} /> 
          <Route path="/ShoppingCart" element={<PrivateRoute element={<ShoppingCart />} />}  />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} /> 
          <Route path="/categories/:category" element={<ProductList/>} />
          <Route path="/categories/:category/:item" element={<ProductList />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
        </Routes>
        <Footer />
        </div>
      </div>
    </Router>
    
  );
};

export default App;
