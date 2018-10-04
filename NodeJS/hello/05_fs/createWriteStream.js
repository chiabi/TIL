const fs = require("fs");

const writeStream = fs.createWriteStream("./writeme2.txt");
writeStream.on("finish", () => {
  console.log("파일 쓰기 완료");
});

writeStream.write("이 글을 쓴다. \n");
writeStream.write("한 번 더 쓴다.");
writeStream.end();
