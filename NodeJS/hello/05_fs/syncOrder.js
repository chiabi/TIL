const fs = require("fs");
const util = require("util");

const readFilePromise = util.promisify(fs.readFile);

console.log("시작");
const readFile2 = async () => {
  try {
    let data = await readFilePromise("./readme2.txt");
    console.log("1번", data.toString());
    data = await readFilePromise("./readme2.txt");
    console.log("2번", data.toString());
    data = await readFilePromise("./readme2.txt");
    console.log("3번", data.toString());
  } catch (err) {
    throw err;
  }
};
readFile2();
console.log("끝");
