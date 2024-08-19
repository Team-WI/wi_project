function submitForm() {
  const form = document.getElementById("reviewForm");
  const formData = new FormData(form);
  const formObject = {};

  formData.forEach((value, key) => {
    if (!formObject[key]) {
      formObject[key] = [];
    }

    if (key === "option") {
      formObject[key] = value;
    } else {
      formObject[key].push(value);
    }
  });

  const json = JSON.stringify(formObject); // JSON.stringify로 변환

  fetch("http://localhost:3000/api/review", {
    // URL 경로 수정
    method: "POST", // HTTP 메서드 명시
    headers: {
      "Content-Type": "application/json",
    },
    body: json, // JSON 데이터 전송
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("서버에서 오류 응답을 받았습니다.");
      }
      return res.json();
    })
    .then((json) => {
      console.log("서버에서 받은 응답:", json);
      // 서버에서 받은 데이터에 대한 추가 처리 가능
    })
    .catch((error) => {
      console.error("오류 발생:", error.message);
      // 오류 처리
    });
}
