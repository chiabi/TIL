const util = require("util");
const crypto = require("crypto");

const dontUseMe = util.deprecate((x, y) => {
  console.log(x + y);
}, "dontUseMe 함수는 deprecated 되었으니 더이상 사용하지 마세요!");
dontUseMe(1, 2);

const randomBytePromise = util.promisify(crypto.randomBytes);

// randomBytePromise(64)
//   .then(buf => {
//     console.log(buf.toString("base64"));
//   })
//   .catch(error => {
//     console.log(error);
//   });

const randomTo64String = async () => {
  try {
    const to64 = await randomBytePromise(64);
    console.log(to64.toString("base64"));
  } catch (error) {
    console.log(error);
  }
};
randomTo64String();
