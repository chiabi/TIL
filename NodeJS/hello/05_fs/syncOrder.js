const fs = require("fs");
const util = require("util");

console.log("시작");
const readFile2 = util.promisify(fs.readFile);
readFile2("./readme2.txt")
  .then(data => {
    console.log("1번", data.toString());
    return readFile2("./readme2.txt");
  })
  .then(data => {
    console.log("2번", data.toString());
    return readFile2("./readme2.txt");
  })
  .then(data => {
    console.log("3번", data.toString());
  })
  .catch(err => {
    throw err;
  });
console.log("끝");
