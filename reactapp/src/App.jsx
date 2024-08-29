/* 
src/App.jsx
실제 렌더링 되는 App은 App.js임 주의
*/

import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from "./components/Layout/NavBar";
import Footer from "./components/Footer";
import MainPage from "./pages/MainPage";
import {PrivateRoute} from './components/PrivateRoute';
import MyLike from "./pages/MyLike";
import MyPage from "./pages/MyPage";
import ShoppingCart from "./pages/ShoppingCart";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ProductList from "./components/ProductList";

import 'bootstrap/dist/css/bootstrap.min.css'; // 부트스트랩 설치
import './App.css';




const App = () => {
  return (    
    <Router>
      < div className="main-container">
      <div className="landing-page">
        <NavBar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/MyLike" element={<PrivateRoute element={<MyLike />} />} />
          <Route path="/MyPage" element={<PrivateRoute element={<MyPage />} />} />
          <Route path="/ShoppingCart" element={<PrivateRoute element={<ShoppingCart />} />}  />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} /> 
          <Route path="/ProductList" element={<ProductList />} />
          <Route path="/ProductList/:productId" element={<ProductList />} />
          
        </Routes>
        <Footer />
        </div>
      </div>
    </Router>
    
  );
};

export default App;
