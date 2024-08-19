// "등록하기" 버튼에 클릭 이벤트 리스너 추가
document.getElementById("submit").addEventListener("click", function (event) {
  event.preventDefault(); // 기본 동작 방지 (페이지 새로고침 등)
  console.log("호출완료");
  // 사용자가 입력한 id와 name 값을 가져오기
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const chkInfo = document.getElementById("chk_info").checked
    ? document.getElementById("chk_info").value
    : null;

  // 서버로 보낼 데이터 객체 생성
  const data = { title: title, Content: content, ChkInfo: chkInfo };

  // 서버로 POST 요청 보내기
  fetch("http://localhost:3000//api//review", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // 전송할 데이터가 json인것을 명시.
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("서버에서 오류 응답을 받았습니다.");
      }
      return res.json();
    })
    .then((data) => {
      console.log("서버에서 받은 응답:", data);
      // 서버에서 받은 데이터에 대한 추가 처리 가능
    })
    .catch((error) => {
      console.error("오류 발생:", error.message);
      // 오류 처리
    });
});
