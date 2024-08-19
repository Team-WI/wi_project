import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar'; 
import './pages.css';


const MyPage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  

useEffect(() => {
  const id = sessionStorage.getItem('id') 

  const getUser = async () => {
    try {
      const response = await axios.get(`api/users/${id}`, {
        headers: { Authorization: sessionStorage.getItem('accessToken'),
        },
      }); 
      setUserInfo(response.data);
      console.log(setUserInfo);
      console.log(response.data[0]);
    } catch (error) {
      setError(error.message);
    }
  };
} ,[]);

  return (
      <div className='mypage'>
      <h1 className='headline'>{userInfo}</h1>
      <Sidebar />
        <table className='mypage-tb'>
          <thead>
            <tr>
          <th>id 가져와야함</th>
          <th>Level 가져와야함</th>
          <th>Mileage 가져와야함</th>
          </tr>
          </thead>
        </table>
       <div className='correction'>
        <h1>회원정보 수정</h1>
       </div>
      </div>
  );
};

export default MyPage;
