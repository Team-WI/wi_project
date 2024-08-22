/* 회원가입 페이지
*/

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUp({ onSignUp }) {     // onSignUp props로 handleSignUp 함수를 전달
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: '',
    password: '',
    passwordVerify: '',
    email: '',
    phone: ''
  });

  // 모든 필드가 채워졌는지 확인
  useEffect(() => {
    const allFieldsFilled = Object.values(user).every(field => field !== '');
    setIsFormValid(allFieldsFilled);
  }, [user]);

  // onChange 함수
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  // 유효성 검사
  const validate = () => {
    let inputError = {};
    // 정규식 패턴
    const regName = /^[0-9a-z]{4,16}$/;
    const regPw = /^[0-9a-zA-Z]{8,16}$/;
    const regPhone = /^[0-9]{10,11}$/;

    // 아이디
    if (!regName.test(user.username)) {
      inputError.username = "4-16자 영어 소문자+숫자로 작성하세요.";
    }
    // 비밀번호
    if (!regPw.test(user.password)) {
      inputError.password = "8-16자 영어+숫자로 작성하세요.";
    }
    // 비밀번호 확인
    if (user.password !== user.passwordVerify) {
      inputError.passwordVerify = "비밀번호가 일치하지 않습니다.";
    }
    // 핸드폰번호
    if (!regPhone.test(user.phone)) {
      inputError.phone = "올바른 핸드폰번호를 입력하세요."; // 자동 하이픈?
    }
    // 입력 누락 확인
    if (!username || !password || !passwordVerify || !email || !phone) {
      alert("모든 필드는 필수입니다.");
    }

    setErrors(inputError);
    return Object.keys(inputError).length === 0;
  }

  // 이용약관 동의 체크박스 
  const [checked, setChecked] = useState(false);

  const handleCheck = (e) => {
    setChecked(e.target.checked);
  };

  // 회원가입 버튼 클릭시 axios를 통해 api 통신
  const handleSubmit = async (event) => {
    event.preventDefault(); // 제출 방지

    if (validate() && checked) {
      
      const input={
        username: user.username,
        password: user.password,
        email: user.email,
        phone: '010-1111-1111'
      }

      onSignUp(input);
      
      try {
        const response = await axios
        .post('http://43.203.208.22:3000/api/users/signup', user);;

      console.log('회원가입 성공:', response.data);
      alert('회원가입에 성공했습니다. 로그인 페이지로 이동합니다.');
      onSignUp(input);

      // 로그인 페이지로 리다이렉트
      navigate('http://43.203.208.22:3000/api/users/login');

    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message || '회원가입 실패');
      } else if (error.request) {
        setMessage('서버 연결 오류');
      } else {
        setMessage('요청 중 오류 발생');
      }
    }
  } else if (!checked) {
    setErrors({ terms: '이용약관에 동의해주세요.' });
    }
  }
      

  return (
    <div className="page">
      <div className="titleWrap">회원가입</div>
      <form onSubmit={handleSubmit} className="contentWrap">
        <div className="userInputFrame">
          <p className="infoOptionalText">아래에 정보를 입력해주세요.</p>
          <input
            className='userInput'
            type="text"
            placeholder="아이디"
            value={user.username}
            name="username"
            onChange={handleChange} />
          <button type="button" id="dupUserCheck" onClick={dupUserCheck}>중복확인</button>
            {errors.username && <div className="errorMessageWrap">{errors.username}</div>}
          <input
            className='userInput'
            type="password"
            placeholder="비밀번호"
            value={user.password}
            name="password"
            onChange={handleChange}
          />
          {errors.password && <div className="errorMessageWrap">{errors.password}</div>}
          <input
            className='userInput'
            type="password"
            placeholder="비밀번호 확인"
            value={user.passwordVerify}
            name="passwordVerify"
            onChange={handleChange}
          />
          {errors.passwordVerify && <div className="errorMessageWrap">{errors.passwordVerify}</div>}
          <input
            className='userInput'
            type="email"
            placeholder="이메일"
            value={user.email}
            name="email"
            onChange={handleChange}
          />
          {errors.email && <div className="errorMessageWrap">{errors.email}</div>}
          <input
            className='userInput'
            type="text"
            placeholder="핸드폰번호"
            value={user.phone}
            name="phone"
            onChange={handleChange}
          />
          {errors.phone && <div className="errorMessageWrap">{errors.phone}</div>}
        </div>
        <div>
          <hr/>
          <label className='infoOptionalText'>
            이용약관 및 개인정보수집 및 이용에 동의합니다.
            <input type="checkbox" checked={checked} onChange={handleCheck} />
          </label>
          {errors.terms && <div className="errorMessageWrap">{errors.terms}</div>}
          <hr/>
        </div>
        <div>
          <button
            type='submit'
            disabled={!isFormValid || !checked}
            >
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;