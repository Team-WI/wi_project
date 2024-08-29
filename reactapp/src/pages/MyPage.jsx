import React, { useState, useEffect } from 'react';
//import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../components/Sidebar'; 
import './MyPage.css';
import { Link } from 'react-router-dom';


const MyPage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const [changeInfo, setChangeInfo] = useState({
    newname:'',
    newphone:'',
    chkpw:'',
  });

  const [changePw, setChangePw] = useState({
  pw: '',
  newpw: ''
});
  

useEffect(() => {
  const id = sessionStorage.getItem('id') 

  const getUser = async () => {
    try {
      const response = await axios.get(`http://43.203.208.22:3000/api/users/${id}`, {
        headers: { Authorization: sessionStorage.getItem('accessToken'),
        },
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


// 개인정보 update submit
const UpdateInfo = () => {
  axios.put('http://43.203.208.22:3000/api/users/edit', {userInfo})
  .then(response => {
    console.log(response.data);
    alert('정보가 정상적으로 변경되었습니다.')
  }).catch(error => error.message)
  console.log('put error: ',error); 
  alert('비밀번호가 일치하지 않습니다.');
};


const UpdatePw = () => {
  axios.put('http://43.203.208.22:3000/api/users/edit', {changePw})
  .then(response => {
    console.log(response.data);
    alert('정보가 정상적으로 변경되었습니다.')
  }).catch(error => error.message)
  console.log(changePw);
  console.log('put error: ',error); 
  alert('비밀번호가 일치하지 않습니다.');
};

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
        <label>이름 변경<input className='input-section' placeholder={userInfo.name} name='name' value={changeInfo.newname} onChange={userInfoChange}/></label>
        <label>연락처 변경<input className='input-section' placeholder={userInfo.phone} name='phone' value={changeInfo.newphone} onChange={userInfoChange}/></label>
        <label>비밀번호 <input className='input-section' placeholder='비밀번호 입력' name='password' value={changeInfo.chkpw} onChange={userInfoChange}/></label>
        <button className='submit-login-btn' onSubmit={UpdateInfo}>비밀번호 인증으로 수정</button>
       <span>비밀번호 재설정</span>
        <label>현재 비밀번호 <input className='input-section' placeholder='현재 비밀번호 입력' name='password' value={changePw.pw} onChange={passwordChange}/></label>
        <label>새비밀번호 <input className='input-section' placeholder='새 비밀번호 입력' name='newpassword' value={changePw.newpw} onChange={passwordChange}/></label>
       
        <button className='submit-login-btn' onSubmit={UpdatePw}>비밀번호 변경</button>
        </div>
        <Link to='/MyPage/DelAccount' className='del-account'>탈퇴하기</Link>
        </div> 
       </div>
    
  );
};
// <label>새비밀번호 확인 <input className='input-section' placeholder='새 비밀번호 확인' /></label> 
export default MyPage;
