 // 아이디, 이메일 중복확인

 import React from 'react';
 
 const dupUserCheck = async () => {
  const API_URL = process.env.REACT_APP_API_URL;

  try {
    const response = await axios.post(`${API_URL}/api/users/check-username`, { username: user.username });
    if (response.data.available) {
      alert('사용 가능한 아이디입니다.');
    } else {
      alert('이미 사용 중인 아이디입니다.');
    }
  } catch (error) {
    console.error('중복 확인 중 오류 발생:', error);
    alert('중복 확인 중 오류가 발생했습니다.');
  }

  return (
    <div>
      
    </div>
  );
 };
 
 export default dupUserCheck;
 