// 경로 : src/pages/SignIn.js
import React, { useState,useNavigate } from 'react';
import './pages.css';
import axios from 'axios'; // axios를 불러옵니다.
//import { Link } from 'react-router-dom'; // react-router-dom의 Link를 불러옵니다.



const SignIn = () => {
  const [id, setId] = useState(''); // 이메일 입력값을 저장할 상태
  const [password, setPassword] = useState(''); // 비밀번호 입력값을 저장할 상태
  
  
  const idChange = (event) => {
    setId(event.target.value);
  }; 

  const pwChange = (event) => {
    setPassword(event.target.value);
  };

  let body = {
    id: id,
    password: password,
  }
  const handleSubmit = async (event) => {
    event.preventDefault(); // 페이지 새로 고침 방지
// post로 요청보내기
try {
const response = await axios.post(
  'http://43.203.208.22:3000/api/users/login',
  body,
  {
    headers: { "Content-Type": "application/json" },
  }
);
console.log(response);
console.log(response.data);
console.log(response.data.data); // 받은 토큰이 {date: token} 형식임..
// axios 응답에서 데이터 가져오기

 if (response.data.data !== null) {
     sessionStorage.clear();
     sessionStorage.setItem("id", id); // 로그인시 상단바에 띄우기 위한 id
     sessionStorage.setItem("accessToken", response.data.data);
     console.log("id:  " + id);
     console.log("response.data.data:  " + response.data.data);


// 로그인 승인되면 메인으로 이동 - 이코드 주석 달거나 설명 글 쓰기,,
        window.location.replace("/");
      } else {
        setId("");
        setPassword("");
        sessionStorage.clear();
      }

} catch(error) {
  console.error('로그인 오류', error.message);
  alert(
    "회원 정보가 일치 하지 않습니다. 아이디와 비민번호를 다시 확인해 주세요!"
  );
 }
};

  return (
    <div className='log-in'>
        <form 
        className="login-form" 
        onSubmit={handleSubmit}>
            <h1 className="login-headline">WI에 오신것을 환영해요!</h1>
                <label >아이디</label>
                <input className='input-section' type="text" placeholder="아이디 입력" name="id" value={id} onChange={idChange}/>
                <label>비밀번호</label>
                <input  className='input-section' type="password" placeholder="비밀번호 입력" name="password" value={password} onChange={pwChange}/>
            <button type="submit" className='submit-login-btn'>
            로그인
            </button>   
            <hr className="custom-line"/>
            <button className='signup-btn'>회원가입</button>
        </form>
    </div>

);
};

export default SignIn;
 