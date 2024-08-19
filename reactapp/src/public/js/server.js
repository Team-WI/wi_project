// express 모듈 불러오기
const express = require("express");
// express 사용
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(bodyParser.json());
app.get("/api/review", function (req, res) {
  res.sendFile("C:\\Users\\EZEN\\Project\\review_modify.html");
});
/*
app.post("/api/review", (req, res) => {
  // 클라이언트에서 전송한 데이터
  const { title, content, chkInfo } = req.body;
  // 간단히 전송된 데이터를 로깅
  console.log(`제목: ${title}, 내용: ${content}, 정보 동의 여부: ${chkInfo}`);
  // 클라이언트에게 응답 보내기
  res.send({ message: "리뷰가 성공적으로 등록되었습니다.congratulations : )" });
});
*/
app.listen(3000);
