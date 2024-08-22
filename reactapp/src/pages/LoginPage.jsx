/* 
로그인 페이지
*/

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// import '../assets/styles/Login.css';

function Login() {
  const [user, setUser] = useState({
    userEmail: '',
    password: ''
  });

  const handleChange = (e) => {
    // setUser(e.target.value);
    setUser(1, 2)
  };

  const handleSubmit = (e) => {
    // 새로고침 방지
    e.preventDefault();
    console.log(user.email);
  };

  return (
    <div>
      <h1 className="titleWrap">Login</h1>
      <form className="userInputFrame" onSubmit={handleSubmit}>
        <input name="email" type="email" value={user.email} onChange={handleChange} placeholder="이메일" />
        <input name="password" type="password" value={user.password} onChange={handleChange} placeholder="비밀번호" />
        <input className="btn" type="submit" value="Login" />

        <p>SNS 계정으로 로그인하기</p>
        <Link to="/signup">
          <button>회원가입 하기</button>
        </Link>
        <button>비회원 주문조회</button>
        <div>아이디(이메일) 찾기</div>
        <div>비밀번호 찾기</div>
        <div>로그인/회원가입 문의</div>
      </form>
    </div>
  )
};

export default Login;