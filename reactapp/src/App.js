// src/App.js 
import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Main from "./pages/Main";
import MyLike from "./pages/MyLike";
import MyPage from "./pages/MyPage";
import ShoppingCart from "./pages/ShoppingCart";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import 'bootstrap/dist/css/bootstrap.min.css'; // 부트스트랩 설치
import {PrivateRoute} from './components/PrivateRoute';
import './App.css';
import Category from "./components/Category";




const App = () => {
  return (    
    <Router>
      < div className="main-container">
      <div className="landing-page">
        <Navbar />
        <Category />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/MyLike" element={<PrivateRoute element={<MyLike />} />} />
          <Route path="/MyPage" element={<PrivateRoute element={<MyPage />} />} />
          <Route path="/ShoppingCart" element={<PrivateRoute element={<ShoppingCart />} />}  />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} /> 
        </Routes>
        <Footer />
        </div>
      </div>
    </Router>
    
  );
};

export default App;
