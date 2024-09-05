import React, { useState, useEffect } from 'react';
//import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../components/Sidebar'; 
import './MyPage.css';
import { Link } from 'react-router-dom';


const MyPage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const loginId = sessionStorage.getItem('id'); 
  const [changeInfo, setChangeInfo] = useState({
    name:'',
    phone:'',
    password:'',
  });

  const [changePw, setChangePw] = useState({
  pw: '',
  newpw: ''
});

const [chkPw, setChkPw] = useState('');
  

useEffect(() => {
  
  const getUser = async () => {
    try {
      const response = await axios.get(`http://43.203.208.22:3000/api/users/${loginId}`, {
        headers: { Authorization: sessionStorage.getItem('accessToken'),},
      }); 
     
      if (response.data && response.data.data) {
        const { name, loginId, grade, phone } = response.data.data;
        setUserInfo({ name, loginId, grade, phone }); // 사용자 정보 상태 업데이트
      } else {
        setError("No data found"); // 데이터가 없을 때 에러 메시지 설정
      }
    } catch (error) {
      setError(error.message); // API 호출 실패 시 에러 메시지 설정
    }
  };

  getUser(); // getUser 함수 호출
}, []); // 빈 배열을 의존성 배열로 사용하여 컴포넌트 마운트 시 한 번만 호출됨

if (error) {
  return <div>Error: {error}</div>; // 에러가 발생한 경우 화면에 에러 메시지 표시
}

// userInfo가 null일 때는 로딩 메시지를 표시
if (!userInfo) {
  return <div>Loading...</div>;
}

// 업데이트할 사용자 정보 onChange 핸들러
const userInfoChange = (e) => {
  const { name, value } = e.target;
  setChangeInfo({
    ...userInfo,
    [name]: value,
  });
};

// 업데이트할 사용자 비밀번호 onChange 핸들러
const passwordChange = (e) => {
  const { name, value } = e.target;
  setChangePw({
    ...changePw,
    [name]: value,
  });
}

const chkpwChange = (e) => {
  setChkPw(e.target.value);
}

// 개인정보 update submit 
//put 오류 - 404 api 문제인가
const UpdateInfo = () => {
  axios.put(`http://43.203.208.22:3000/api/user${loginId}`, {userInfo})
  .then(response => {
    console.log(response.data);
    alert('정보가 정상적으로 변경되었습니다.')
  }).catch(error => error.message)
  console.log('put error: ',error); 
  alert('비밀번호가 일치하지 않습니다.');
};


const UpdatePw = () => {
  if (chkPw === changePw.newpassword) {
    axios.put(`http://43.203.208.22:3000/api/user${loginId}`, changePw)
      .then(response => {
        console.log(response.data);
        alert('정보가 정상적으로 변경되었습니다.');
      })
      .catch(error => {
        console.log('put error: ', error); 
        alert('비밀번호 변경 중 오류가 발생했습니다.');
      });
  } else {
    alert('새비밀번호가 일치하지 않습니다.');
  }
};

const HandleAlert = () => {
  alert(userInfo.name+'님, 계정을 삭제하면 보유하신 마일리지는 전부 삭제됩니다. 그래도 탈퇴하시겠습니까?');
}

  return (
      <div className='mypage'>
         <Sidebar />
         <div className='mypage-section'>
         <h1 className='user-name'>{userInfo.name}님 환영합니다.</h1>
         <table className='mypage-tb'>
          <thead>
            <tr>
          <th className='th-Id'>{userInfo.loginId}</th>
          <th className='th-grade'>{userInfo.grade}</th>
          </tr>
          </thead>
        </table>
        <h3 className='update-headline'>회원정보 수정</h3>
       <div className='update-section'>
        <label>이름 변경<input className='input-section' placeholder={userInfo.name} name='name' value={changeInfo.name} onChange={userInfoChange}/></label>
        <label>연락처 변경<input className='input-section' placeholder={userInfo.phone} name='phone' value={changeInfo.phone} onChange={userInfoChange}/></label>
        <label>비밀번호 <input className='input-section' placeholder='비밀번호 입력' name='password' value={changeInfo.password} onChange={userInfoChange}/></label>
        <button className='submit-login-btn' onClick={UpdateInfo}>비밀번호 인증으로 수정</button>
       <span>비밀번호 재설정</span>
        <label>현재 비밀번호 <input className='input-section' placeholder='현재 비밀번호 입력' name='pw' value={changePw.pw} onChange={passwordChange}/></label>
        <label>새비밀번호 <input className='input-section' placeholder='새 비밀번호 입력' name='newpw' value={changePw.newpw} onChange={passwordChange}/></label>
        <label>새비밀번호 확인 <input className='input-section' placeholder='새 비밀번호 확인' name='chkpw' value={chkPw} onChange={chkpwChange}/></label> 
        <button className='submit-login-btn' onSubmit={UpdatePw}>비밀번호 변경</button>
        <Link to='/MyPage/DelAccount' className='del-account' onClick={HandleAlert}>탈퇴하기</Link>
        </div>
        </div> 
       </div>
    
  );
};

export default MyPage;
