// 경로 : src/api/auth.js

// JSON 데이터 생성


const auth = async (id, password) => {


    try {
      const response = await fetch('http://43.203.208.22:3000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, password }),
      });
      
      if (!response.ok) {
        throw new Error('로그인 실패');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('로그인 에러:', error);
      throw error;
    }
  };

  export default auth;