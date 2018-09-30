console.log("타이머");

const timeout = setTimeout(() => {
  console.log("1.5초 이후 실행");
}, 1500);

const interval = setInterval(() => {
  console.log("1초마다 실행");
}, 1000);

const timeout2 = setTimeout(() => {
  console.log("실행되지 않는다");
}, 3000);

setTimeout(() => {
  clearTimeout(timeout2);
  clearInterval(interval);
}, 2500);

const immediate = setImmediate(() => {
  console.log("즉시 실행");
});

console.log("타이머111");

const immediate2 = setImmediate(() => {
  console.log("실행되지 않는다.");
});

clearImmediate(immediate2);
