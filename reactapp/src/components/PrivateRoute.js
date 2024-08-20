// components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';


// 
export const isLogin = () => {
  return !!sessionStorage.getItem('accessToken'); //!! 이중부정연산자 - 어떤값이든 불리언으로 변환.(존재:true 부재:false)
};

export const PrivateRoute = ({element}) => {
if (!isLogin()) {
// 로그인 인증이 안되어있는 경우, 로그인페이지로 리디렉션.
return <Navigate to="/SignIn" replace />;
}
return element;
};




