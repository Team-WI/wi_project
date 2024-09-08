import app from './app.js';

const PORT = process.env.PORT || 3000;

// 서버 생성 및 실행
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});