const fs = require("fs");
const util = require("util");

// ※ 노드 10버전에서는 fs 모듈을 프로미스 형식으로 사용하는 방법이 추가되었음
// 실험적인 기능임
// const fsPromise = require('fs').promises;
const promisifyFs = method => {
  return util.promisify(method);
};

const fsCreate = async () => {
  try {
    try {
      await promisifyFs(fs.access)(
        "./folder",
        fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK
      );
    } catch (err) {
      if (err.code === "ENOENT") {
        console.log("폴더 없음");
      }
    }
    await promisifyFs(fs.mkdir)("./folder");
    console.log("폴더 만들기 성공");
    const fd = await promisifyFs(fs.open)("./folder/file.js", "w");
    console.log("빈 파일 만들기 성공", fd);
    await promisifyFs(fs.rename)("./folder/file.js", "./folder/newfile.js");
    console.log("이름 바꾸기 성공");
  } catch (err) {
    console.log("이미 폴더 있음");
    throw err;
  }
};
fsCreate();
