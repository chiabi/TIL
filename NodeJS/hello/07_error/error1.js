setInterval(() => {
  console.log("시작");
  try {
    // 에러를 강제로 내보자
    throw new Error("서버를 고장낸다");
  } catch (err) {
    console.log(err);
  }
}, 1000);
