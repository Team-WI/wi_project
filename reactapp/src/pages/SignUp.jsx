/* 회원가입 페이지
회원가입 POST 요청, 아이디,이메일 중복확인 POST 요청 포함. 
*/

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './SignUp.css'

function SignUp({ onSignUp }) {     // onSignUp props로 handleSignUp 함수를 전달
  const [errors, setErrors] = useState({});
  const [checked, setChecked] = useState(false);
  const [message, setMessage] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  const [user, setUser] = useState({
    loginId: '',
    password: '',
    passwordVerify: '',
    username: '',
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
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
    validateField(name, value)
  }

  // 유효성 검사
  const validateField = (name, value) => {
    let inputError = {};

    // 정규식 패턴
    const regLoginId = /^[0-9a-z]{4,16}$/;
    const regPw = /^[0-9a-zA-Z]{8,16}$/;
    const regName =  /^[가-힣a-zA-Z]+$/;
    const regEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regPhone = /^[0-9]{10,11}$/;
  

    // 아이디
    if (name === 'loginId' && !regLoginId.test(value)) {
      inputError.loginId = "4-16자 영어 소문자+숫자로 작성하세요.";
    }
    // 비밀번호
    if (name === 'password' && !regPw.test(value)) {
      inputError.password = "8-16자 영어+숫자로 작성하세요.";
    }
    // 비밀번호 확인
    if (name === 'passwordVerify' && value !== user.password) {
      inputError.passwordVerify = "비밀번호가 일치하지 않습니다.";
    }
    // 이름
    if (name === 'username' && !regName.test(value)) {
      inputError.username = "이름은 한글 또는 영어로 입력하세요.";
    }
     // 이메일
    if (name === 'email' && !regEmail.test(value)) {
      inputError.email = "올바른 이메일 형식을 입력하세요.";
    }
    // 핸드폰번호
    if (name === 'phone' && !regPhone.test(value)) {
      inputError.phone = "올바른 핸드폰번호를 입력하세요."; // 자동 하이픈?
    }

    if (Object.keys(inputError).length === 0 && Object.values(user).some(field => field === '')) {
      inputError.general = "모든 필드는 필수입니다.";
    }
    setErrors(inputError);  // 각 필드별 에러메시지들을 errors에 저장

    return inputError;
  }

  // 아이디 중복확인
  const dupIdCheck = async () => {
    try {
      const response = await axios.post('http://43.203.208.22:3000/api/users/checkId', { loginId: user.loginId });
      if (response.data.available) {
        alert('사용 가능한 아이디입니다.');
      } else {
        alert('이미 사용 중인 아이디입니다.');
      }
    } catch (error) {
      console.error('중복 확인 중 오류 발생:', error);
      alert('중복 확인 중 오류가 발생했습니다.');
    }
  };

  // 이메일 중복확인
  const dupEmailCheck = async () => {
    try {
      const response = await axios.post('http://43.203.208.22:3000/api/users/checkEmail', { email: user.email });
      if (response.data.available) {
        alert('사용 가능한 이메일입니다.');
      } else {
        alert('이미 사용 중인 이메일입니다.');
      }
    } catch (error) {
      console.error('중복 확인 중 오류 발생:', error);
      alert('중복 확인 중 오류가 발생했습니다.');
    }
  };

  // 이용약관 동의 체크박스 
  const handleCheck = (e) => {
    setChecked(e.target.checked);
  };

  // 회원가입 버튼 클릭시 axios를 통해 api 통신
  const handleSubmit = async (event) => {
    event.preventDefault(); // 제출 방지
    console.log('오류:', Object.keys(message));

    // 유효성 검사 후 제출하기
    if (validateField() && checked) {
      if (Object.keys(message).length === 0 && checked) {
      
      const input={
        loginId: user.loginId,
        name: user.username,
        password: user.password,
        email: user.email,
        phone: user.phone
      };
console.log('입력:', input)
      try {
        const response = await axios
        .post('http://43.203.208.22:3000/api/users', input);;

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
}

  return (
    <div className="page">
      <div className="titleWrap">회원가입</div>
      {message && <div className="messageWrap">{message}</div>}
      <form onSubmit={handleSubmit} className="contentWrap">
      
        <div className="userInputFrame">
          <p className="infoOptionalText">* 는 필수 입력 사항입니다.</p>
          <div className="inputGroup">
            <label className="infoLabelText">*아이디</label>
              <input
              className='userInput'
              type="text"
              placeholder="4-16자 영어 소문자+숫자"
              value={user.loginId}
              name="loginId"
              onChange={handleChange} 
              />
              <div className='buttonWrap'>
                <button type="button" onClick={dupIdCheck}>중복확인</button>
              </div>
              <div className={`errorMessageWrap ${errors.loginId ? 'visible' : ''}`}>
              {errors.loginId}
              </div>
          </div>
          
          <div className="inputGroup">
            <label className="infoLabelText">*비밀번호</label>
              <input
            className='userInput'
            type="password"
            placeholder="8-16자 영어+숫자"
            value={user.password}
            name="password"
            onChange={handleChange}
            />
            
            <div className={`errorMessageWrap ${errors.password ? 'visible' : ''}`}>
              {errors.password}
            </div>
          </div>
          <div className="inputGroup">
            <label className="infoLabelText">*비밀번호 확인</label>
              <input
            className='userInput'
            type="password"
            placeholder="비밀번호 확인"
            value={user.passwordVerify}
            name="passwordVerify"
            onChange={handleChange}
            />
            
            <div className={`errorMessageWrap ${errors.passwordVerify ? 'visible' : ''}`}>
              {errors.passwordVerify}
            </div>
          </div>
          <div className="inputGroup">
            <label className="infoLabelText">*이름</label>
              <input
            className='userInput'
            type="text"
            placeholder="이름"
            value={user.username}
            name="username"
            onChange={handleChange} />
            
            <div className={`errorMessageWrap ${errors.username ? 'visible' : ''}`}>
              {errors.username}
            </div>
          </div>
          <div className="inputGroup">
            <label className="infoLabelText">*이메일</label>
              <input
            className='userInput'
            type="email"
            placeholder="example@email.com"
            value={user.email}
            name="email"
            onChange={handleChange}
            />
            <div className='buttonWrap'>
              <button type="button" onClick={dupEmailCheck}>중복확인</button>
            </div>
            <div className={`errorMessageWrap ${errors.email ? 'visible' : ''}`}>
              {errors.email}
            </div>
          </div>
          <div className="inputGroup">
            <label className="infoLabelText">*핸드폰번호</label>
              <input
              className='userInput'
              type="text"
              placeholder="010-0000-0000"
              value={user.phone}
              name="phone"
              onChange={handleChange}
            />
            
            <div className={`errorMessageWrap ${errors.phone ? 'visible' : ''}`}>
              {errors.phone}
            </div>
          </div>
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
        {errors.general && <div className="errorMessageWrap">{errors.general}</div>}
      </form>


      {/* <div>SNS 간편로그인
    <Link href="http://test_url/auth/kakao">
      <a>
        <RiKakaoTalkFill className="kakao-btn" />
      </a>
    </Link>
    <Link href="http://localhost:3051/auth/google">
      <a>
        <RiGoogleFill className="google-btn" />
      </a>
    </Link>
  </div> */}
    </div>
  );
};

export default SignUp;